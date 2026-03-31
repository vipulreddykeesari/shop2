/**
 * Order Tool - MCP Tool for order management
 * Handles order creation, status updates, and tracking
 */

const { v4: uuidv4 } = require('uuid');

let orders = [];

const ORDER_STATUSES = ['placed', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];

const orderTool = {
  description: 'Manage orders - create, update status, track deliveries',

  create: async (data) => {
    const order = {
      id: uuidv4(),
      orderNumber: `SCK${Date.now().toString().slice(-8)}`,
      userId: data.userId,
      items: data.items,
      subtotal: data.subtotal,
      deliveryFee: data.deliveryFee || 30,
      discount: data.discount || 0,
      total: data.total,
      address: data.address,
      deliverySlot: data.deliverySlot,
      paymentMethod: data.paymentMethod,
      paymentStatus: 'pending',
      status: 'placed',
      statusHistory: [
        { status: 'placed', timestamp: new Date().toISOString(), note: 'Order placed successfully' },
      ],
      deliveryPartner: null,
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    return order;
  },

  getAll: async (params = {}) => {
    let result = [...orders];
    if (params.userId) {
      result = result.filter(o => o.userId === params.userId);
    }
    if (params.status) {
      result = result.filter(o => o.status === params.status);
    }
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getById: async ({ id }) => {
    const order = orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) throw new Error('Order not found');
    return order;
  },

  updateStatus: async ({ orderId, status, note }) => {
    const order = orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) throw new Error('Order not found');
    if (!ORDER_STATUSES.includes(status)) throw new Error('Invalid status');

    order.status = status;
    order.statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Order ${status}`,
    });

    if (status === 'delivered') {
      order.deliveredAt = new Date().toISOString();
    }

    return order;
  },

  updatePaymentStatus: async ({ orderId, paymentStatus, paymentId }) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');
    order.paymentStatus = paymentStatus;
    if (paymentId) order.paymentId = paymentId;
    return order;
  },

  cancel: async ({ orderId, reason }) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');
    if (['delivered', 'out-for-delivery'].includes(order.status)) {
      throw new Error('Cannot cancel order in current status');
    }
    order.status = 'cancelled';
    order.cancelReason = reason;
    order.statusHistory.push({
      status: 'cancelled',
      timestamp: new Date().toISOString(),
      note: reason || 'Order cancelled by user',
    });
    return order;
  },

  getDailyStats: async () => {
    const today = new Date().toDateString();
    const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
    return {
      totalOrders: todayOrders.length,
      revenue: todayOrders.reduce((sum, o) => sum + (o.total || 0), 0),
      delivered: todayOrders.filter(o => o.status === 'delivered').length,
      pending: todayOrders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length,
      cancelled: todayOrders.filter(o => o.status === 'cancelled').length,
    };
  },
};

module.exports = orderTool;
