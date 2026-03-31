'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { login, register, sendOtp, verifyOtp } from '@/lib/api';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Smartphone } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [tab, setTab] = useState<'login' | 'register' | 'otp'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login({ email: form.email, password: form.password });
      setAuth(res.data.user, res.data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await register({ name: form.name, email: form.email, password: form.password, phone: form.phone });
      setAuth(res.data.user, res.data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await sendOtp(form.phone);
      setOtpSent(true);
      
      // Temporary: Show OTP in an alert since SMS isn't set up yet!
      if (res.data?.debug_otp) {
        alert(`TEST OTP: ${res.data.debug_otp}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await verifyOtp(form.phone, otpValue);
      setAuth(res.data.user, res.data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-all">
              🍗
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-extrabold text-gray-900">Rahman Chicken</h1>
              <p className="text-sm text-primary font-medium">Center • Fresh & Delivered</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {[
              { key: 'login', label: 'Login', icon: Mail },
              { key: 'register', label: 'Register', icon: User },
              { key: 'otp', label: 'OTP', icon: Smartphone },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key as any); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all ${
                  tab === t.key
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 animate-slide-up">
                ⚠️ {error}
              </div>
            )}

            {/* Login Form */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Enter password"
                      required
                      className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 gradient-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Logging in...' : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                </button>

                <p className="text-center text-xs text-gray-400 mt-2">
                  Demo: admin@smartchicken.com / password
                </p>
              </form>
            )}

            {/* Register Form */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Create password" required className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3.5 gradient-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? 'Creating account...' : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}

            {/* OTP Login */}
            {tab === 'otp' && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                    />
                  </div>
                </div>
                {otpSent ? (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Enter OTP</label>
                      <input
                        type="text"
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-center tracking-widest text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                      />
                    </div>
                    <button
                      onClick={handleVerifyOtp}
                      disabled={loading}
                      className="w-full py-3.5 gradient-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Verifying...' : <>Verify & Login <ArrowRight className="w-4 h-4" /></>}
                    </button>
                    <button onClick={() => setOtpSent(false)} className="w-full text-sm text-gray-500 hover:text-primary transition-colors">
                      Change number
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSendOtp}
                    disabled={loading || !form.phone}
                    className="w-full py-3.5 gradient-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending OTP...' : <>Send OTP <ArrowRight className="w-4 h-4" /></>}
                  </button>
                )}
              </div>
            )}

            {/* Google Login */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <span className="text-lg">🔐</span>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
