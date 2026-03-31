'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/api';
import { ArrowRight, Truck, Shield, Clock, Leaf, Star, Zap, ChevronRight, Gift, Percent, Users, Phone } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        // Use fallback data if API is not available
        setProducts(getFallbackProducts());
        setCategories(getFallbackCategories());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-slide-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary-light text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Farm Fresh • Delivered in 45 mins</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6">
                Fresh Chicken,{' '}
                <span className="text-gradient">Delivered</span>{' '}
                to Your Door
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                Premium farm-fresh chicken, expertly cut & delivered. From whole chickens to ready-to-cook delights. 
                <span className="text-primary-light font-semibold"> Quality you can taste!</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="group flex items-center justify-center gap-2 px-8 py-4 gradient-primary text-white text-lg font-bold rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  Order Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products?category=combos-offers"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white text-lg font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Gift className="w-5 h-5" />
                  View Offers
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 mt-10">
                {[
                  { icon: '🐔', label: 'Farm Fresh' },
                  { icon: '⚡', label: '45 Min Delivery' },
                  { icon: '✅', label: 'FSSAI Certified' },
                  { icon: '🔒', label: 'Secure Payment' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xl">{badge.icon}</span>
                    <span className="text-sm text-gray-400 font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Area */}
            <div className="relative hidden lg:flex items-center justify-center animate-slide-in-right">
              <div className="relative w-96 h-96">
                {/* Main Hero Image */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-8 border-white/10 shadow-2xl z-20 animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=1000" 
                    alt="Delicious Fresh Chicken" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative rings */}
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse z-10"></div>
                <div className="absolute inset-4 border-2 border-primary/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-8 border-2 border-primary/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Floating badges */}
                <div className="absolute -top-2 -right-8 bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 animate-float shadow-xl" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <div>
                      <p className="text-white font-bold text-sm">4.8 Rating</p>
                      <p className="text-gray-400 text-xs">10K+ Reviews</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-8 bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 animate-float shadow-xl" style={{ animationDelay: '0.7s' }}>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-bold text-sm">Free Delivery</p>
                      <p className="text-gray-400 text-xs">Orders above ₹500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Shop by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-gray-500 text-lg">Choose from our wide range of fresh chicken products</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(categories.length > 0 ? categories : getFallbackCategories()).map((cat: any, index: number) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`group relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 ${
                  index === 0 ? 'bg-gradient-to-br from-red-50 to-orange-50' :
                  index === 1 ? 'bg-gradient-to-br from-amber-50 to-yellow-50' :
                  index === 2 ? 'bg-gradient-to-br from-green-50 to-emerald-50' :
                  'bg-gradient-to-br from-purple-50 to-pink-50'
                }`}></div>
                <div className="relative z-10">
                  <span className="text-4xl sm:text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">{cat.description}</p>
                  <div className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Shop Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                Our <span className="text-gradient">Bestsellers</span>
              </h2>
              <p className="text-gray-500">Fresh and premium quality chicken products</p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-2 px-6 py-3 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'gradient-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All
            </button>
            {(categories.length > 0 ? categories : getFallbackCategories()).map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'gradient-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-10 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product: any, index: number) => (
                <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Why Choose <span className="text-gradient">Rahman Chicken</span>?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">We bring you the freshest chicken with unmatched quality and convenience</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: 'Farm Fresh', desc: 'Directly sourced from certified farms. No preservatives, no chemicals.', color: 'bg-green-50 text-green-600' },
              { icon: Truck, title: 'Express Delivery', desc: '45-minute delivery guaranteed. Track your order in real-time.', color: 'bg-blue-50 text-blue-600' },
              { icon: Shield, title: 'Quality Assured', desc: 'FSSAI certified. Temperature controlled supply chain.', color: 'bg-purple-50 text-purple-600' },
              { icon: Clock, title: 'Fresh Everyday', desc: 'Procured daily. Never frozen. Always fresh and hygienic.', color: 'bg-amber-50 text-amber-600' },
            ].map((feature, i) => (
              <div key={i} className="group p-6 sm:p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-warm p-8 sm:p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
                  <Percent className="w-4 h-4" />
                  Limited Time Offer
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                  Weekend Special! <br />Get 30% OFF
                </h2>
                <p className="text-white/80 text-lg mb-6">
                  Use code <span className="font-bold text-white bg-white/20 px-3 py-1 rounded-lg">WEEKEND30</span> on orders above ₹300
                </p>
                <Link
                  href="/products?category=combos-offers"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  Shop Offers
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="text-[12rem] animate-float">🎉</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '50K+', label: 'Happy Customers', icon: Users },
              { number: '10K+', label: 'Orders Delivered', icon: Truck },
              { number: '4.8', label: 'Customer Rating', icon: Star },
              { number: '24/7', label: 'Customer Support', icon: Phone },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{stat.number}</h3>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  Get the App! <br />
                  <span className="text-gradient">Order on the Go</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8">Download our mobile app for exclusive deals, faster ordering, and real-time delivery tracking.</p>
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all">
                    <span className="text-2xl">🍎</span>
                    <div className="text-left">
                      <p className="text-xs text-gray-400">Download on the</p>
                      <p className="font-semibold">App Store</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all">
                    <span className="text-2xl">▶️</span>
                    <div className="text-left">
                      <p className="text-xs text-gray-400">Get it on</p>
                      <p className="font-semibold">Google Play</p>
                    </div>
                  </button>
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="text-[10rem] animate-float">📱</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Fallback data when API is not available
function getFallbackCategories() {
  return [
    { id: 'fresh-chicken', name: 'Fresh Chicken', icon: '🐔', description: 'Farm-fresh whole chickens and cuts', count: 2 },
    { id: 'cuts-pieces', name: 'Cuts & Pieces', icon: '🍖', description: 'Boneless, wings, drumsticks & more', count: 4 },
    { id: 'ready-to-cook', name: 'Ready to Cook', icon: '🍳', description: 'Marinated & pre-prepared items', count: 3 },
    { id: 'combos-offers', name: 'Combos & Offers', icon: '🎉', description: 'Value packs & special deals', count: 2 },
  ];
}

function getFallbackProducts() {
  return [
    { id: '1', name: 'Fresh Whole Chicken', description: 'Farm-fresh whole broiler chicken, cleaned and ready to cook.', category: 'fresh-chicken', pricePerKg: 220, unit: 'kg', image: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 110 }, { label: '1 kg', value: 1, price: 220 }, { label: '2 kg', value: 2, price: 440 }], inStock: true, stockQty: 50, rating: 4.5, reviews: 128, tags: ['bestseller', 'farm-fresh'] },
    { id: '2', name: 'Chicken Breast (Boneless)', description: 'Premium boneless chicken breast, perfect for grilling.', category: 'cuts-pieces', pricePerKg: 350, unit: 'kg', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=800', weights: [{ label: '250g', value: 0.25, price: 87.5 }, { label: '500g', value: 0.5, price: 175 }, { label: '1 kg', value: 1, price: 350 }], inStock: true, stockQty: 30, rating: 4.7, reviews: 95, tags: ['premium', 'boneless'] },
    { id: '3', name: 'Chicken Wings', description: 'Juicy chicken wings, perfect for frying or baking.', category: 'cuts-pieces', pricePerKg: 280, unit: 'kg', image: 'https://images.unsplash.com/photo-1628296338029-450eb9dd0a9c?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 140 }, { label: '1 kg', value: 1, price: 280 }], inStock: true, stockQty: 25, rating: 4.3, reviews: 67, tags: ['popular', 'party'] },
    { id: '4', name: 'Chicken Drumsticks', description: 'Meaty chicken drumsticks, ideal for tandoori or curry.', category: 'cuts-pieces', pricePerKg: 300, unit: 'kg', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 150 }, { label: '1 kg', value: 1, price: 300 }, { label: '2 kg', value: 2, price: 600 }], inStock: true, stockQty: 40, rating: 4.6, reviews: 112, tags: ['bestseller'] },
    { id: '5', name: 'Country Chicken (Desi)', description: 'Free-range country chicken with rich flavor.', category: 'fresh-chicken', pricePerKg: 550, unit: 'kg', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 275 }, { label: '1 kg', value: 1, price: 550 }], inStock: true, stockQty: 15, rating: 4.8, reviews: 89, tags: ['premium', 'free-range'] },
    { id: '7', name: 'Chicken Lollipop (Ready to Cook)', description: 'Pre-marinated chicken lollipops, ready to fry.', category: 'ready-to-cook', pricePerKg: 420, unit: 'kg', image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 210 }, { label: '1 kg', value: 1, price: 420 }], inStock: true, stockQty: 18, rating: 4.6, reviews: 78, tags: ['ready-to-cook', 'appetizer'] },
    { id: '8', name: 'Tandoori Chicken (Marinated)', description: 'Authentic tandoori marinated chicken, ready to grill.', category: 'ready-to-cook', pricePerKg: 450, unit: 'kg', image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 225 }, { label: '1 kg', value: 1, price: 450 }], inStock: true, stockQty: 12, rating: 4.7, reviews: 92, tags: ['ready-to-cook', 'bestseller'] },
    { id: '9', name: 'Family Chicken Combo', description: 'Perfect family pack: whole chicken + boneless + wings.', category: 'combos-offers', pricePerKg: 280, unit: 'pack', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=800', weights: [{ label: 'Family Pack (2kg)', value: 2, price: 560 }], originalPrice: 680, inStock: true, stockQty: 10, rating: 4.8, reviews: 145, tags: ['combo', 'bestseller'] },
  ];
}
