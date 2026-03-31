/**
 * Delivery Tool - MCP Tool for delivery management
 * Handles partner assignment, real-time tracking
 */

const { v4: uuidv4 } = require('uuid');

let deliveries = [];

const deliveryPartners = [
  { id: 'dp1', name: 'Raju Kumar', phone: '+91-9876543210', vehicle: 'Bike', rating: 4.8, available: true },
  { id: 'dp2', name: 'Suresh Reddy', phone: '+91-9876543211', vehicle: 'Bike', rating: 4.6, available: true },
  { id: 'dp3', name: 'Venkat Rao', phone: '+91-9876543212', vehicle: 'Scooter', rating: 4.9, available: true },
  { id: 'dp4', name: 'Prasad Naidu', phone: '+91-9876543213', vehicle: 'Bike', rating: 4.7, available: true },
  { id: 'dp5', name: 'Ramesh Babu', phone: '+91-9876543214', vehicle: 'Scooter', rating: 4.5, available: true },
];

const deliveryTool = {
  description: 'Manage deliveries - assign partners, track in real-time',

  assignPartner: async ({ orderId, address }) => {
    const availablePartner = deliveryPartners.find(p => p.available);
    if (!availablePartner) throw new Error('No delivery partners available');

    availablePartner.available = false;

    const delivery = {
      id: uuidv4(),
      orderId,
      partner: {
        id: availablePartner.id,
        name: availablePartner.name,
        phone: availablePartner.phone,
        vehicle: availablePartner.vehicle,
        rating: availablePartner.rating,
      },
      pickupLocation: { lat: 17.3250, lng: 78.5483, address: 'Rahman Chicken Center, Jai Hind Babu Gully, Vanasthalipuram, Hyderabad' },
      deliveryLocation: address,
      status: 'assigned',
      estimatedTime: '30-45 mins',
      currentLocation: { lat: 17.3850, lng: 78.4867 },
      statusHistory: [
        { status: 'assigned', timestamp: new Date().toISOString() },
      ],
      assignedAt: new Date().toISOString(),
    };

    deliveries.push(delivery);
    return delivery;
  },

  getTracking: async ({ orderId }) => {
    const delivery = deliveries.find(d => d.orderId === orderId);
    if (!delivery) throw new Error('Delivery not found for this order');
    return delivery;
  },

  updateLocation: async ({ orderId, location }) => {
    const delivery = deliveries.find(d => d.orderId === orderId);
    if (!delivery) throw new Error('Delivery not found');
    delivery.currentLocation = location;
    delivery.lastUpdated = new Date().toISOString();
    return delivery;
  },

  updateDeliveryStatus: async ({ orderId, status }) => {
    const delivery = deliveries.find(d => d.orderId === orderId);
    if (!delivery) throw new Error('Delivery not found');

    delivery.status = status;
    delivery.statusHistory.push({ status, timestamp: new Date().toISOString() });

    if (status === 'delivered') {
      const partner = deliveryPartners.find(p => p.id === delivery.partner.id);
      if (partner) partner.available = true;
      delivery.deliveredAt = new Date().toISOString();
    }

    return delivery;
  },

  getAvailablePartners: async () => {
    return deliveryPartners.filter(p => p.available);
  },

  getAllDeliveries: async () => {
    return deliveries.sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt));
  },
};

module.exports = deliveryTool;
