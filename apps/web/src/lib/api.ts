import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Products
export const getProducts = (params?: Record<string, string>) => api.get('/api/products', { params });
export const getProduct = (id: string) => api.get(`/api/products/${id}`);
export const getCategories = () => api.get('/api/products/categories');
export const createProduct = (data: any) => api.post('/api/products', data);
export const updateProduct = (id: string, data: any) => api.put(`/api/products/${id}`, data);
export const deleteProduct = (id: string) => api.delete(`/api/products/${id}`);

// Auth
export const login = (data: { email: string; password: string }) => api.post('/api/auth/login', data);
export const register = (data: { name: string; email: string; password: string; phone?: string }) => api.post('/api/auth/register', data);
export const sendOtp = (phone: string) => api.post('/api/auth/send-otp', { phone });
export const verifyOtp = (phone: string, otp: string) => api.post('/api/auth/verify-otp', { phone, otp });

// Orders
export const createOrder = (data: any) => api.post('/api/orders', data);
export const getOrders = (params?: Record<string, string>) => api.get('/api/orders', { params });
export const getOrder = (id: string) => api.get(`/api/orders/${id}`);
export const updateOrderStatus = (id: string, data: any) => api.put(`/api/orders/${id}/status`, data);

// Payments
export const createPaymentOrder = (data: any) => api.post('/api/payments/create-order', data);
export const verifyPayment = (data: any) => api.post('/api/payments/verify', data);

// Delivery
export const assignDelivery = (data: any) => api.post('/api/delivery/assign', data);
export const trackDelivery = (orderId: string) => api.get(`/api/delivery/${orderId}/track`);

// Coupons
export const validateCoupon = (code: string, cartTotal: number) => api.post('/api/coupons/validate', { code, cartTotal });

// Admin
export const getAdminStats = () => api.get('/api/admin/stats');

// Inventory
export const getInventory = () => api.get('/api/inventory');
export const updateInventory = (productId: string, data: any) => api.put(`/api/inventory/${productId}`, data);

export default api;
