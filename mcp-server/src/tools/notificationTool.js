/**
 * Notification Tool - MCP Tool for sending notifications
 * Handles SMS, push notifications, and email alerts
 */

const { v4: uuidv4 } = require('uuid');

let notifications = [];

const notificationTool = {
  description: 'Send notifications - SMS, push, email for order updates',

  sendSMS: async ({ phone, message }) => {
    // In production, integrate with Twilio:
    // const twilio = require('twilio')(accountSid, authToken);
    // await twilio.messages.create({ body: message, from: twilioPhone, to: phone });

    const notification = {
      id: uuidv4(),
      type: 'sms',
      to: phone,
      message,
      status: 'sent',
      sentAt: new Date().toISOString(),
    };
    notifications.push(notification);
    console.log(`📱 SMS sent to ${phone}: ${message}`);
    return notification;
  },

  sendPush: async ({ userId, title, body, data }) => {
    // In production, use Firebase Cloud Messaging or similar
    const notification = {
      id: uuidv4(),
      type: 'push',
      userId,
      title,
      body,
      data: data || {},
      status: 'sent',
      sentAt: new Date().toISOString(),
    };
    notifications.push(notification);
    console.log(`🔔 Push notification sent to ${userId}: ${title}`);
    return notification;
  },

  sendEmail: async ({ email, subject, body }) => {
    // In production, use nodemailer or similar
    const notification = {
      id: uuidv4(),
      type: 'email',
      to: email,
      subject,
      body,
      status: 'sent',
      sentAt: new Date().toISOString(),
    };
    notifications.push(notification);
    console.log(`📧 Email sent to ${email}: ${subject}`);
    return notification;
  },

  sendOrderUpdate: async ({ orderId, userId, status, phone, email }) => {
    const messages = {
      'placed': 'Your order has been placed successfully! 🎉',
      'confirmed': 'Your order has been confirmed and is being prepared. 👨‍🍳',
      'preparing': 'Your fresh chicken order is being prepared with care! 🍗',
      'out-for-delivery': 'Your order is out for delivery! The delivery partner is on the way. 🚴',
      'delivered': 'Your order has been delivered! Enjoy your fresh chicken! 🎊',
      'cancelled': 'Your order has been cancelled. Refund will be processed shortly.',
    };

    const message = messages[status] || `Order status updated to: ${status}`;
    const results = [];

    if (phone) {
      results.push(await notificationTool.sendSMS({ phone, message: `Rahman Chicken Center: ${message} Order ID: ${orderId}` }));
    }
    if (email) {
      results.push(await notificationTool.sendEmail({ email, subject: `Order Update - ${status}`, body: message }));
    }
    results.push(await notificationTool.sendPush({ userId, title: 'Order Update', body: message, data: { orderId, status } }));

    return results;
  },

  getAll: async ({ userId, type, limit = 50 }) => {
    let result = [...notifications];
    if (userId) result = result.filter(n => n.userId === userId);
    if (type) result = result.filter(n => n.type === type);
    return result.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt)).slice(0, limit);
  },
};

module.exports = notificationTool;
