'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { User, MapPin, Package, Heart, Bell, LogOut, ChevronRight, Edit, Plus } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-gray-50"></div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-500 mb-6">Please login to view your profile</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white font-bold rounded-2xl hover:shadow-lg transition-all">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-extrabold text-gray-900">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              {user?.phone && <p className="text-gray-400 text-sm">{user.phone}</p>}
              <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full capitalize">
                {user?.role || 'Customer'}
              </span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {[
            { icon: Package, label: 'My Orders', desc: 'View order history', href: '/orders', color: 'bg-blue-50 text-blue-600' },
            { icon: MapPin, label: 'Saved Addresses', desc: 'Manage delivery addresses', href: '#', color: 'bg-green-50 text-green-600' },
            { icon: Heart, label: 'Wishlist', desc: 'Your favorite items', href: '#', color: 'bg-red-50 text-red-600' },
            { icon: Bell, label: 'Notifications', desc: 'Manage notification preferences', href: '#', color: 'bg-amber-50 text-amber-600' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-primary/10 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}

          <button
            onClick={logout}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-red-200 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-red-600">Logout</h3>
              <p className="text-sm text-gray-500">Sign out of your account</p>
            </div>
          </button>
        </div>

        {/* Saved Addresses */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Saved Addresses</h3>
            <button className="flex items-center gap-1 text-sm text-primary font-medium hover:text-primary-dark transition-colors">
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-gray-300" />
            <p className="text-sm text-gray-500">No addresses saved yet</p>
            <p className="text-xs text-gray-400 mt-1">Add an address for faster checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
