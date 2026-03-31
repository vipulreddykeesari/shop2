'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { Package, Eye, ArrowLeft } from 'lucide-react';

export default function OrdersPage() {
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-gray-50"></div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-500 mb-6">Please login to view your orders</p>
          <Link href="/login" className="inline-flex px-8 py-4 gradient-primary text-white font-bold rounded-2xl hover:shadow-lg transition-all">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  // Demo orders
  const orders = [
    {
      id: 'SCK87654321',
      date: 'March 30, 2026',
      items: ['Fresh Whole Chicken (1kg)', 'Chicken Wings (500g)', 'Tandoori Chicken (500g)'],
      total: 725,
      status: 'delivered',
    },
    {
      id: 'SCK87654320',
      date: 'March 28, 2026',
      items: ['Family Chicken Combo (2kg)'],
      total: 560,
      status: 'delivered',
    },
    {
      id: 'SCK87654319',
      date: 'March 25, 2026',
      items: ['Chicken Breast Boneless (1kg)', 'Chicken Keema (500g)'],
      total: 510,
      status: 'delivered',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/profile" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Profile
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          My <span className="text-gradient">Orders</span>
        </h1>

        <div className="space-y-4">
          {orders.map((order, i) => (
            <div key={order.id} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    ✅ {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1 mb-4">
                {order.items.map((item, j) => (
                  <p key={j} className="text-sm text-gray-600">• {item}</p>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">
                    <Eye className="w-4 h-4" /> Details
                  </button>
                  <Link href="/products" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white gradient-primary rounded-xl hover:shadow-md transition-all">
                    Reorder
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
