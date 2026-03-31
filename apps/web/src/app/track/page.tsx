'use client';

import { useState } from 'react';
import { Search, Package, CheckCircle, Truck, Clock, MapPin } from 'lucide-react';

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    setLoading(true);
    // Simulate tracking data
    setTimeout(() => {
      setTracking({
        orderNumber: orderId || 'SCK12345678',
        status: 'out-for-delivery',
        items: ['Fresh Whole Chicken (1kg)', 'Chicken Wings (500g)'],
        total: 500,
        partner: { name: 'Raju Kumar', phone: '+91-9876543210', vehicle: 'Bike' },
        estimatedTime: '15 mins',
        statusHistory: [
          { status: 'placed', time: '10:00 AM', done: true },
          { status: 'confirmed', time: '10:02 AM', done: true },
          { status: 'preparing', time: '10:10 AM', done: true },
          { status: 'out-for-delivery', time: '10:30 AM', done: true },
          { status: 'delivered', time: 'Arriving soon', done: false },
        ],
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Track Your <span className="text-gradient">Order</span>
        </h1>
        <p className="text-gray-500 mb-8">Enter your order ID to see real-time status</p>

        {/* Search */}
        <div className="flex gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g., SCK12345678)"
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
            />
          </div>
          <button
            onClick={handleTrack}
            disabled={loading}
            className="px-8 py-4 gradient-primary text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50"
          >
            {loading ? 'Tracking...' : 'Track'}
          </button>
        </div>

        {/* Tracking Result */}
        {tracking && (
          <div className="animate-slide-up">
            {/* Order Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Order #{tracking.orderNumber}</h3>
                  <p className="text-sm text-gray-500">Estimated: {tracking.estimatedTime}</p>
                </div>
                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-xl capitalize">
                  {tracking.status.replace(/-/g, ' ')}
                </span>
              </div>

              {/* Progress Steps */}
              <div className="relative">
                {tracking.statusHistory.map((step: any, i: number) => (
                  <div key={i} className="flex items-start gap-4 mb-6 last:mb-0">
                    <div className="relative flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                        step.done
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step.status === 'placed' && <Package className="w-5 h-5" />}
                        {step.status === 'confirmed' && <CheckCircle className="w-5 h-5" />}
                        {step.status === 'preparing' && <Clock className="w-5 h-5" />}
                        {step.status === 'out-for-delivery' && <Truck className="w-5 h-5" />}
                        {step.status === 'delivered' && <MapPin className="w-5 h-5" />}
                      </div>
                      {i < tracking.statusHistory.length - 1 && (
                        <div className={`w-0.5 h-8 ${step.done ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                    <div className="pt-2">
                      <p className={`text-sm font-semibold capitalize ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.status.replace(/-/g, ' ')}
                      </p>
                      <p className="text-xs text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Partner */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Delivery Partner</h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-white text-xl font-bold">
                  {tracking.partner.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{tracking.partner.name}</p>
                  <p className="text-sm text-gray-500">{tracking.partner.vehicle}</p>
                </div>
                <a
                  href={`tel:${tracking.partner.phone}`}
                  className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors"
                >
                  📞
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-3">🗺️</div>
                  <p className="text-sm text-gray-500 font-medium">Live tracking map</p>
                  <p className="text-xs text-gray-400">Integration with Google Maps</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Info */}
        {!tracking && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {[
              { icon: '📦', title: 'Real-Time Tracking', desc: 'Track your order from preparation to delivery' },
              { icon: '🚴', title: 'Live Location', desc: 'See your delivery partner on the map' },
              { icon: '📱', title: 'Push Notifications', desc: 'Get instant updates on your phone' },
            ].map((info, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <span className="text-4xl mb-3 block">{info.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                <p className="text-xs text-gray-500">{info.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
