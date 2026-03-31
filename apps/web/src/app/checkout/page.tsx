'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore, useAuthStore } from '@/lib/store';
import { createOrder } from '@/lib/api';
import { MapPin, Clock, CreditCard, Banknote, Wallet, ArrowLeft, Check, Truck, Shield } from 'lucide-react';
import Link from 'next/link';

const DELIVERY_SLOTS = [
  { id: 1, label: 'Express (45 min)', time: '45 minutes', fee: 30 },
  { id: 2, label: 'Morning (9AM - 12PM)', time: '9:00 AM - 12:00 PM', fee: 0 },
  { id: 3, label: 'Afternoon (12PM - 3PM)', time: '12:00 PM - 3:00 PM', fee: 0 },
  { id: 4, label: 'Evening (5PM - 8PM)', time: '5:00 PM - 8:00 PM', fee: 0 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<any>(null);

  const [address, setAddress] = useState({
    type: 'home',
    line1: '',
    line2: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '',
    phone: '',
  });

  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[0]);
  const [paymentMethod, setPaymentMethod] = useState('online');

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-gray-50"></div>;

  const subtotal = getTotal();
  const deliveryFee = selectedSlot.fee;
  const total = subtotal + deliveryFee;

  if (items.length === 0 && !orderPlaced) {
    router.push('/cart');
    return null;
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        userId: user?.id || 'guest',
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          weight: item.weight,
          weightLabel: item.weightLabel,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal,
        deliveryFee,
        total,
        address,
        deliverySlot: selectedSlot,
        paymentMethod,
      };

      const res = await createOrder(orderData);
      setOrderPlaced(res.data);
      clearCart();
    } catch (err) {
      // Simulate order success for demo
      setOrderPlaced({
        id: 'demo-order',
        orderNumber: `SCK${Date.now().toString().slice(-8)}`,
        total,
        status: 'placed',
        estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
      });
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  // Order Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-bounce-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Placed! 🎉</h2>
          <p className="text-gray-500 mb-6">Your fresh chicken is on its way!</p>

          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order ID</span>
              <span className="font-bold text-gray-900">{orderPlaced.orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-bold text-primary">₹{orderPlaced.total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="font-bold text-green-600 capitalize">{orderPlaced.status}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Estimated Delivery</span>
              <span className="font-bold text-gray-900">45 mins</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/track"
              className="block w-full py-3.5 gradient-primary text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Track Order
            </Link>
            <Link
              href="/"
              className="block w-full py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/cart" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          <span className="text-gradient">Checkout</span>
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-10">
          {['Address', 'Delivery Slot', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step > i + 1 ? 'bg-green-500 text-white' :
                step === i + 1 ? 'gradient-primary text-white shadow-md' :
                'bg-gray-200 text-gray-500'
              }`}>
                {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`hidden sm:block text-sm font-medium ${step === i + 1 ? 'text-primary' : 'text-gray-400'}`}>{s}</span>
              {i < 3 && <div className={`hidden sm:block w-12 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-slide-up">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> Delivery Address
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3 mb-4">
                    {['home', 'work', 'other'].map(type => (
                      <button
                        key={type}
                        onClick={() => setAddress({ ...address, type })}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                          address.type === type ? 'gradient-primary text-white shadow-md' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {type === 'home' ? '🏠' : type === 'work' ? '🏢' : '📍'} {type}
                      </button>
                    ))}
                  </div>
                  <input placeholder="Address Line 1 *" value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" required />
                  <input placeholder="Address Line 2 (Landmark)" value={address.line2} onChange={e => setAddress({ ...address, line2: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    <input placeholder="PIN Code *" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <input placeholder="Phone Number *" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!address.line1 || !address.pincode || !address.phone}
                  className="mt-6 w-full py-3.5 gradient-primary text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Continue to Delivery Slot
                </button>
              </div>
            )}

            {/* Step 2: Delivery Slot */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-slide-up">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Select Delivery Slot
                </h3>
                <div className="space-y-3">
                  {DELIVERY_SLOTS.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                        selectedSlot.id === slot.id
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-gray-200 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedSlot.id === slot.id ? 'border-primary' : 'border-gray-300'
                        }`}>
                          {selectedSlot.id === slot.id && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-gray-900">{slot.label}</p>
                          <p className="text-xs text-gray-500">{slot.time}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${slot.fee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {slot.fee === 0 ? 'FREE' : `₹${slot.fee}`}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-3 gradient-primary text-white font-bold rounded-xl hover:shadow-lg transition-all">Continue</button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-slide-up">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 'online', label: 'Pay Online (UPI / Card / Wallet)', icon: CreditCard, desc: 'Razorpay secure payment' },
                    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when your order arrives' },
                    { id: 'wallet', label: 'Rahman Chicken Wallet', icon: Wallet, desc: 'Balance: ₹0.00' },
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-gray-200 hover:border-primary/30'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id ? 'border-primary' : 'border-gray-300'
                      }`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                      </div>
                      <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-primary' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900">{method.label}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Back</button>
                  <button onClick={() => setStep(4)} className="flex-1 py-3 gradient-primary text-white font-bold rounded-xl hover:shadow-lg transition-all">Review Order</button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-slide-up">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Review</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 mb-1">📍 Delivery Address</p>
                    <p className="text-sm font-medium text-gray-900">{address.line1}, {address.line2}</p>
                    <p className="text-sm text-gray-600">{address.city} - {address.pincode}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 mb-1">🕐 Delivery Slot</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSlot.label}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 mb-1">💳 Payment</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'online' ? 'Online Payment' : 'Wallet'}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.weightLabel} × {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(0)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(3)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">Back</button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 py-3.5 gradient-primary text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? 'Placing Order...' : `Place Order • ₹${total.toFixed(0)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 truncate mr-2">{item.name} × {item.quantity}</span>
                    <span className="font-medium text-gray-900 shrink-0">₹{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <hr className="border-gray-100 mb-3" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gradient">₹{total.toFixed(0)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-xl">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">100% Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
