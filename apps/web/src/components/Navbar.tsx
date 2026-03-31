'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, User, Moon, Sun, Search, MapPin, ChevronDown } from 'lucide-react';
import { useCartStore, useAuthStore, useUIStore } from '@/lib/store';

export default function Navbar() {
  const { getItemCount } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode, isCartOpen, toggleCart } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl gradient-primary flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              🍗
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">Rahman Chicken</h1>
              <p className="text-xs text-primary font-medium -mt-0.5">Center • Fresh & Delivered</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'Products' },
              { href: '/products?category=combos-offers', label: 'Offers' },
              { href: '/track', label: 'Track Order' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search chicken, cuts, combos..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Location indicator */}
            <button className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-primary rounded-lg hover:bg-primary/5 transition-all">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Hyderabad</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-all text-gray-600 hover:text-primary"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl hover:bg-primary/5 transition-all text-gray-700 hover:text-primary"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User */}
            {mounted && isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-slide-up z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-all" onClick={() => setUserMenuOpen(false)}>
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    <Link href="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-all" onClick={() => setUserMenuOpen(false)}>
                      📦 My Orders
                    </Link>
                    {user?.role === 'admin' && (
                      <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-all" onClick={() => setUserMenuOpen(false)}>
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 animate-slide-up">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                />
              </div>
            </div>
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'All Products' },
              { href: '/products?category=combos-offers', label: 'Offers & Combos' },
              { href: '/track', label: 'Track Order' },
              { href: '/orders', label: 'My Orders' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
