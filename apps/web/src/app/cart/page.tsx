'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Shield, ArrowLeft } from 'lucide-react';
import { validateCoupon } from '@/lib/api';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<any>(null);
  const [couponError, setCouponError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-gray-50"></div>;

  const subtotal = getTotal();
  const deliveryFee = subtotal > 500 ? 0 : 30;
  const discount = couponApplied?.discount || 0;
  const total = subtotal + deliveryFee - discount;

  const handleApplyCoupon = async () => {
    setCouponError('');
    try {
      const res = await validateCoupon(couponCode, subtotal);
      setCouponApplied(res.data);
    } catch (err: any) {
      setCouponError(err.response?.data?.error || 'Invalid coupon');
      setCouponApplied(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any products yet. Browse our fresh selection!</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/25 transition-all group"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/products" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900">Shopping <span className="text-gradient">Cart</span></h1>
            <p className="text-gray-500 mt-1">{items.length} item{items.length > 1 ? 's' : ''} in your cart</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl flex items-center justify-center text-4xl shrink-0">
                    🍗
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Weight: {item.weightLabel}</p>
                    <p className="text-sm text-gray-500">₹{item.pricePerKg}/kg</p>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex flex-col items-end gap-3">
                    <p className="text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(0)}</p>

                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow transition-all text-gray-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow transition-all text-gray-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Have a coupon?</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 uppercase"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 gradient-primary text-white text-sm font-bold rounded-xl hover:shadow-md transition-all"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                {couponApplied && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-700 font-medium">✅ {couponApplied.description}</p>
                    <button onClick={() => { setCouponApplied(null); setCouponCode(''); }} className="text-xs text-red-500">Remove</button>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  {['FIRST50', 'CHICKEN20', 'WEEKEND30'].map(code => (
                    <button
                      key={code}
                      onClick={() => setCouponCode(code)}
                      className="px-2.5 py-1 text-xs border border-dashed border-primary/40 text-primary rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="font-medium text-green-600">-₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <hr className="border-gray-100" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gradient">₹{total.toFixed(0)}</span>
                </div>
              </div>

              {/* Free delivery info */}
              {deliveryFee > 0 && (
                <div className="mb-4 p-3 bg-amber-50 rounded-xl">
                  <p className="text-xs text-amber-700 font-medium">
                    🚚 Add ₹{(500 - subtotal).toFixed(0)} more for free delivery!
                  </p>
                  <div className="mt-2 h-2 bg-amber-200 rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}></div>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="block w-full py-4 gradient-primary text-white text-center text-lg font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.01]"
              >
                Proceed to Checkout
              </Link>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Shield className="w-3.5 h-3.5" /> Secure
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Truck className="w-3.5 h-3.5" /> Fast Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
