/**
 * Payment Tool - MCP Tool for payment processing
 * Handles Razorpay integration (UPI, cards, wallets)
 */

const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

let payments = [];

const paymentTool = {
  description: 'Process payments via Razorpay - create orders, verify payments',

  createOrder: async ({ amount, currency = 'INR', orderId, notes }) => {
    // In production, this would call Razorpay API:
    // const Razorpay = require('razorpay');
    // const instance = new Razorpay({ key_id, key_secret });
    // const order = await instance.orders.create({ amount: amount * 100, currency, receipt: orderId });

    const paymentOrder = {
      id: `pay_${uuidv4().replace(/-/g, '').slice(0, 14)}`,
      razorpayOrderId: `order_${uuidv4().replace(/-/g, '').slice(0, 14)}`,
      amount: amount,
      amountInPaise: amount * 100,
      currency,
      orderId,
      status: 'created',
      notes: notes || {},
      createdAt: new Date().toISOString(),
    };

    payments.push(paymentOrder);
    return {
      orderId: paymentOrder.razorpayOrderId,
      amount: paymentOrder.amountInPaise,
      currency: paymentOrder.currency,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo',
    };
  },

  verifyPayment: async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    // In production, verify signature:
    // const body = razorpay_order_id + '|' + razorpay_payment_id;
    // const expectedSignature = crypto.createHmac('sha256', key_secret).update(body).digest('hex');
    // const isValid = expectedSignature === razorpay_signature;

    // For demo, simulate verification
    const payment = payments.find(p => p.razorpayOrderId === razorpay_order_id);
    if (payment) {
      payment.status = 'paid';
      payment.razorpayPaymentId = razorpay_payment_id;
      payment.paidAt = new Date().toISOString();
    }

    return {
      verified: true,
      paymentId: razorpay_payment_id || `pay_${uuidv4().replace(/-/g, '').slice(0, 14)}`,
      status: 'paid',
    };
  },

  getPaymentStatus: async ({ paymentId }) => {
    const payment = payments.find(p => p.id === paymentId || p.razorpayPaymentId === paymentId);
    if (!payment) throw new Error('Payment not found');
    return payment;
  },

  refund: async ({ paymentId, amount, reason }) => {
    const payment = payments.find(p => p.id === paymentId || p.razorpayPaymentId === paymentId);
    if (!payment) throw new Error('Payment not found');

    payment.refundStatus = 'refunded';
    payment.refundAmount = amount || payment.amount;
    payment.refundReason = reason;
    payment.refundedAt = new Date().toISOString();

    return {
      refundId: `rfnd_${uuidv4().replace(/-/g, '').slice(0, 14)}`,
      amount: payment.refundAmount,
      status: 'refunded',
    };
  },

  getAllPayments: async () => {
    return payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
};

module.exports = paymentTool;
