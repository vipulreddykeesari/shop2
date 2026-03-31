const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

// Tools
const productTool = require('./tools/productTool');
const orderTool = require('./tools/orderTool');
const paymentTool = require('./tools/paymentTool');
const deliveryTool = require('./tools/deliveryTool');
const inventoryTool = require('./tools/inventoryTool');
const notificationTool = require('./tools/notificationTool');

dotenv.config();

const app = express();
const server = http.createServer(app);

// WebSocket server for real-time features
const wss = new WebSocketServer({ server, path: '/ws' });

app.use(cors());
app.use(express.json());

// Store active WebSocket connections
const wsClients = new Map();

wss.on('connection', (ws, req) => {
  const clientId = uuidv4();
  wsClients.set(clientId, ws);
  console.log(`WebSocket client connected: ${clientId}`);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      handleWsMessage(clientId, data, ws);
    } catch (err) {
      ws.send(JSON.stringify({ error: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    wsClients.delete(clientId);
    console.log(`WebSocket client disconnected: ${clientId}`);
  });

  ws.send(JSON.stringify({ type: 'connected', clientId }));
});

function handleWsMessage(clientId, data, ws) {
  switch (data.type) {
    case 'subscribe_order':
      ws.orderId = data.orderId;
      ws.send(JSON.stringify({ type: 'subscribed', orderId: data.orderId }));
      break;
    case 'ping':
      ws.send(JSON.stringify({ type: 'pong' }));
      break;
    default:
      ws.send(JSON.stringify({ type: 'unknown_message_type' }));
  }
}

// Broadcast order updates to subscribed clients
function broadcastOrderUpdate(orderId, update) {
  wsClients.forEach((ws) => {
    if (ws.orderId === orderId && ws.readyState === 1) {
      ws.send(JSON.stringify({ type: 'order_update', orderId, ...update }));
    }
  });
}

// MCP Tool Registry
const toolRegistry = {
  product: productTool,
  order: orderTool,
  payment: paymentTool,
  delivery: deliveryTool,
  inventory: inventoryTool,
  notification: notificationTool,
};

// MCP Tool Execution Endpoint
app.post('/mcp/execute', async (req, res) => {
  try {
    const { tool, action, params } = req.body;

    if (!toolRegistry[tool]) {
      return res.status(400).json({ error: `Unknown tool: ${tool}` });
    }

    if (!toolRegistry[tool][action]) {
      return res.status(400).json({ error: `Unknown action: ${action} for tool: ${tool}` });
    }

    const result = await toolRegistry[tool][action](params);

    // Broadcast if order-related
    if (tool === 'order' && action === 'updateStatus') {
      broadcastOrderUpdate(params.orderId, result);
    }
    if (tool === 'delivery' && action === 'updateLocation') {
      broadcastOrderUpdate(params.orderId, { type: 'location_update', location: params.location });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('MCP execution error:', error);
    res.status(500).json({ error: error.message });
  }
});

// MCP Tool Discovery
app.get('/mcp/tools', (req, res) => {
  const tools = Object.entries(toolRegistry).map(([name, tool]) => ({
    name,
    description: tool.description,
    actions: Object.keys(tool).filter(k => k !== 'description'),
  }));
  res.json({ tools });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mcp-server', timestamp: new Date().toISOString() });
});

// ===== REST API ROUTES (Proxy to MCP tools) =====

// Products
app.get('/api/products', async (req, res) => {
  try {
    const result = await toolRegistry.product.getAll(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/categories', async (req, res) => {
  try {
    const result = await toolRegistry.product.getCategories();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const result = await toolRegistry.product.getById({ id: req.params.id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const result = await toolRegistry.product.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const result = await toolRegistry.product.update({ id: req.params.id, ...req.body });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const result = await toolRegistry.product.remove({ id: req.params.id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Orders
app.post('/api/orders', async (req, res) => {
  try {
    const result = await toolRegistry.order.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const result = await toolRegistry.order.getAll(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const result = await toolRegistry.order.getById({ id: req.params.id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const result = await toolRegistry.order.updateStatus({ orderId: req.params.id, ...req.body });
    broadcastOrderUpdate(req.params.id, result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auth
app.post('/api/auth/register', async (req, res) => {
  try {
    const axios = require('axios');
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL || 'http://localhost:5001'}/api/auth/register`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const axios = require('axios');
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL || 'http://localhost:5001'}/api/auth/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const axios = require('axios');
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL || 'http://localhost:5001'}/api/auth/send-otp`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const axios = require('axios');
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL || 'http://localhost:5001'}/api/auth/verify-otp`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

// Payments
app.post('/api/payments/create-order', async (req, res) => {
  try {
    const result = await toolRegistry.payment.createOrder(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/payments/verify', async (req, res) => {
  try {
    const result = await toolRegistry.payment.verifyPayment(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delivery
app.post('/api/delivery/assign', async (req, res) => {
  try {
    const result = await toolRegistry.delivery.assignPartner(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/delivery/:orderId/track', async (req, res) => {
  try {
    const result = await toolRegistry.delivery.getTracking({ orderId: req.params.orderId });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inventory
app.get('/api/inventory', async (req, res) => {
  try {
    const result = await toolRegistry.inventory.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/inventory/:productId', async (req, res) => {
  try {
    const result = await toolRegistry.inventory.updateStock({ productId: req.params.productId, ...req.body });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin - Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const orders = await toolRegistry.order.getAll({});
    const products = await toolRegistry.product.getAll({});
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const todayOrders = orders.filter(o => {
      const orderDate = new Date(o.createdAt);
      const today = new Date();
      return orderDate.toDateString() === today.toDateString();
    });

    res.json({
      totalOrders: orders.length,
      totalProducts: products.length,
      totalRevenue,
      todayOrders: todayOrders.length,
      todayRevenue: todayOrders.reduce((sum, o) => sum + (o.total || 0), 0),
      recentOrders: orders.slice(-10).reverse(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Coupons
app.post('/api/coupons/validate', async (req, res) => {
  try {
    const { code, cartTotal } = req.body;
    const coupons = {
      'FIRST50': { discount: 50, type: 'flat', minOrder: 200, description: '₹50 off on first order' },
      'CHICKEN20': { discount: 20, type: 'percent', minOrder: 500, maxDiscount: 150, description: '20% off up to ₹150' },
      'WEEKEND30': { discount: 30, type: 'percent', minOrder: 300, maxDiscount: 200, description: '30% off weekend special' },
      'FRESH100': { discount: 100, type: 'flat', minOrder: 600, description: '₹100 off on orders above ₹600' },
    };

    const coupon = coupons[code?.toUpperCase()];
    if (!coupon) return res.status(400).json({ error: 'Invalid coupon code' });
    if (cartTotal < coupon.minOrder) return res.status(400).json({ error: `Minimum order of ₹${coupon.minOrder} required` });

    let discountAmount = coupon.type === 'percent'
      ? Math.min(cartTotal * coupon.discount / 100, coupon.maxDiscount || Infinity)
      : coupon.discount;

    res.json({ valid: true, discount: discountAmount, description: coupon.description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🐔 MCP Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready on ws://localhost:${PORT}/ws`);
});

module.exports = { app, server, broadcastOrderUpdate };
