'use client';

import { useState, useEffect } from 'react';
import { getAdminStats, getProducts, getInventory, updateOrderStatus } from '@/lib/api';
import { Package, ShoppingBag, DollarSign, TrendingUp, Users, Clock, BarChart3, Settings, Plus, Edit, Trash2, Eye, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [statsRes, prodsRes, invRes] = await Promise.all([
        getAdminStats().catch(() => ({ data: getDefaultStats() })),
        getProducts().catch(() => ({ data: getDefaultProducts() })),
        getInventory().catch(() => ({ data: getDefaultInventory() })),
      ]);
      setStats(statsRes.data);
      setProducts(prodsRes.data);
      setInventory(invRes.data);
    } catch {
      setStats(getDefaultStats());
      setProducts(getDefaultProducts());
      setInventory(getDefaultInventory());
    } finally {
      setLoading(false);
    }
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'inventory', label: 'Inventory', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-gray-500 mt-1">Manage your chicken shop</p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-primary/30 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'gradient-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/30'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="animate-slide-up">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Total Revenue', value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: 'from-green-500 to-emerald-600', change: '+12.5%', up: true },
                { title: 'Total Orders', value: stats?.totalOrders || 0, icon: ShoppingBag, color: 'from-blue-500 to-indigo-600', change: '+8.2%', up: true },
                { title: 'Today Orders', value: stats?.todayOrders || 0, icon: Clock, color: 'from-amber-500 to-orange-600', change: '+5.1%', up: true },
                { title: 'Products', value: stats?.totalProducts || products.length, icon: Package, color: 'from-purple-500 to-pink-600', change: '+2', up: true },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Items</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(stats?.recentOrders || []).length > 0 ? (
                      stats.recentOrders.map((order: any) => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{order.items?.length || 0} items</td>
                          <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{order.total}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              order.status === 'out-for-delivery' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {order.status?.replace(/-/g, ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-primary hover:text-primary-dark text-sm font-medium">View</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                          No orders yet. Orders will appear here when customers place them.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">All Products ({products.length})</h3>
              <button className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price/kg</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: any) => (
                      <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center text-lg">🍗</div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-500">{product.tags?.join(', ')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 capitalize">{product.category?.replace(/-/g, ' ')}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{product.pricePerKg}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            product.stockQty > 20 ? 'bg-green-100 text-green-700' :
                            product.stockQty > 5 ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {product.stockQty} kg
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">⭐ {product.rating}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                            <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="animate-slide-up">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Order Management</h3>
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <span className="text-6xl mb-4 block">📦</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Orders Dashboard</h3>
              <p className="text-gray-500 mb-4">Manage incoming orders, update statuses, and track deliveries.</p>
              <p className="text-sm text-gray-400">Orders from the web app and mobile app will appear here.</p>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="animate-slide-up">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Inventory Management</h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stock (kg)</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Min Stock</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item: any) => (
                      <tr key={item.productId} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.productName}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  item.stockKg > item.minStockKg * 2 ? 'bg-green-500' :
                                  item.stockKg > item.minStockKg ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min((item.stockKg / 50) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{item.stockKg} kg</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.minStockKg} kg</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            item.isOutOfStock ? 'bg-red-100 text-red-700' :
                            item.isLowStock ? 'bg-amber-100 text-amber-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {item.isOutOfStock ? 'Out of Stock' : item.isLowStock ? 'Low Stock' : 'In Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-primary font-medium hover:text-primary-dark">Restock</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getDefaultStats() {
  return { totalOrders: 0, totalProducts: 12, totalRevenue: 0, todayOrders: 0, todayRevenue: 0, recentOrders: [] };
}

function getDefaultProducts() {
  return [
    { id: '1', name: 'Fresh Whole Chicken', category: 'fresh-chicken', pricePerKg: 220, stockQty: 50, rating: 4.5, tags: ['bestseller'] },
    { id: '2', name: 'Chicken Breast (Boneless)', category: 'cuts-pieces', pricePerKg: 350, stockQty: 30, rating: 4.7, tags: ['premium'] },
    { id: '3', name: 'Chicken Wings', category: 'cuts-pieces', pricePerKg: 280, stockQty: 25, rating: 4.3, tags: ['popular'] },
    { id: '4', name: 'Chicken Drumsticks', category: 'cuts-pieces', pricePerKg: 300, stockQty: 40, rating: 4.6, tags: ['bestseller'] },
    { id: '5', name: 'Country Chicken', category: 'fresh-chicken', pricePerKg: 550, stockQty: 15, rating: 4.8, tags: ['premium'] },
  ];
}

function getDefaultInventory() {
  return [
    { productId: '1', productName: 'Fresh Whole Chicken', stockKg: 50, minStockKg: 5, isLowStock: false, isOutOfStock: false },
    { productId: '2', productName: 'Chicken Breast', stockKg: 30, minStockKg: 3, isLowStock: false, isOutOfStock: false },
    { productId: '3', productName: 'Chicken Wings', stockKg: 25, minStockKg: 3, isLowStock: false, isOutOfStock: false },
    { productId: '4', productName: 'Chicken Drumsticks', stockKg: 40, minStockKg: 5, isLowStock: false, isOutOfStock: false },
    { productId: '5', productName: 'Country Chicken', stockKg: 15, minStockKg: 2, isLowStock: false, isOutOfStock: false },
    { productId: '6', productName: 'Chicken Keema', stockKg: 20, minStockKg: 2, isLowStock: false, isOutOfStock: false },
    { productId: '7', productName: 'Chicken Lollipop', stockKg: 18, minStockKg: 2, isLowStock: false, isOutOfStock: false },
    { productId: '8', productName: 'Tandoori Chicken', stockKg: 12, minStockKg: 2, isLowStock: false, isOutOfStock: false },
  ];
}
