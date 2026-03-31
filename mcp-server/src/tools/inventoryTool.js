/**
 * Inventory Tool - MCP Tool for stock management
 * Handles kg-based stock tracking, auto-availability updates
 */

const { v4: uuidv4 } = require('uuid');

let inventory = [
  { productId: '1', productName: 'Fresh Whole Chicken', stockKg: 50, minStockKg: 5, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '2', productName: 'Chicken Breast (Boneless)', stockKg: 30, minStockKg: 3, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '3', productName: 'Chicken Wings', stockKg: 25, minStockKg: 3, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '4', productName: 'Chicken Drumsticks', stockKg: 40, minStockKg: 5, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '5', productName: 'Country Chicken (Desi)', stockKg: 15, minStockKg: 2, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '6', productName: 'Chicken Keema (Mince)', stockKg: 20, minStockKg: 2, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '7', productName: 'Chicken Lollipop', stockKg: 18, minStockKg: 2, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '8', productName: 'Tandoori Chicken', stockKg: 12, minStockKg: 2, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '9', productName: 'Family Chicken Combo', stockKg: 20, minStockKg: 4, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '10', productName: 'BBQ Party Pack', stockKg: 20, minStockKg: 5, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '11', productName: 'Chicken Liver', stockKg: 15, minStockKg: 2, unit: 'kg', lastRestocked: new Date().toISOString() },
  { productId: '12', productName: 'Chicken Seekh Kebab', stockKg: 14, minStockKg: 2, unit: 'kg', lastRestocked: new Date().toISOString() },
];

let inventoryLogs = [];

const inventoryTool = {
  description: 'Manage inventory - track stock, update availability, log changes',

  getAll: async () => {
    return inventory.map(item => ({
      ...item,
      isLowStock: item.stockKg <= item.minStockKg,
      isOutOfStock: item.stockKg <= 0,
    }));
  },

  getByProduct: async ({ productId }) => {
    const item = inventory.find(i => i.productId === productId);
    if (!item) throw new Error('Inventory item not found');
    return {
      ...item,
      isLowStock: item.stockKg <= item.minStockKg,
      isOutOfStock: item.stockKg <= 0,
    };
  },

  updateStock: async ({ productId, quantityKg, operation = 'set', reason }) => {
    const item = inventory.find(i => i.productId === productId);
    if (!item) throw new Error('Inventory item not found');

    const previousStock = item.stockKg;

    switch (operation) {
      case 'add':
        item.stockKg += quantityKg;
        item.lastRestocked = new Date().toISOString();
        break;
      case 'subtract':
        item.stockKg = Math.max(0, item.stockKg - quantityKg);
        break;
      case 'set':
        item.stockKg = quantityKg;
        break;
      default:
        throw new Error('Invalid operation. Use add, subtract, or set.');
    }

    inventoryLogs.push({
      id: uuidv4(),
      productId,
      productName: item.productName,
      operation,
      previousStock,
      newStock: item.stockKg,
      change: item.stockKg - previousStock,
      reason: reason || 'Manual update',
      timestamp: new Date().toISOString(),
    });

    return {
      ...item,
      isLowStock: item.stockKg <= item.minStockKg,
      isOutOfStock: item.stockKg <= 0,
      previousStock,
    };
  },

  deductForOrder: async ({ items }) => {
    const results = [];
    for (const orderItem of items) {
      const invItem = inventory.find(i => i.productId === orderItem.productId);
      if (invItem) {
        const prev = invItem.stockKg;
        invItem.stockKg = Math.max(0, invItem.stockKg - (orderItem.weight || orderItem.quantity || 0));
        results.push({
          productId: orderItem.productId,
          deducted: prev - invItem.stockKg,
          remaining: invItem.stockKg,
        });
        inventoryLogs.push({
          id: uuidv4(),
          productId: orderItem.productId,
          operation: 'subtract',
          previousStock: prev,
          newStock: invItem.stockKg,
          change: invItem.stockKg - prev,
          reason: 'Order deduction',
          timestamp: new Date().toISOString(),
        });
      }
    }
    return results;
  },

  getLowStock: async () => {
    return inventory.filter(i => i.stockKg <= i.minStockKg).map(item => ({
      ...item,
      isLowStock: true,
      isOutOfStock: item.stockKg <= 0,
    }));
  },

  getLogs: async ({ productId, limit = 50 }) => {
    let logs = [...inventoryLogs];
    if (productId) {
      logs = logs.filter(l => l.productId === productId);
    }
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, limit);
  },
};

module.exports = inventoryTool;
