'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/api';
import { SlidersHorizontal, Search, ChevronDown } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([getProducts(), getCategories()]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch {
        setProducts(getFallbackProducts());
        setCategories(getFallbackCategories());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  let filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p: any) => p.category === activeCategory);

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p: any) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortBy === 'price_asc') filteredProducts.sort((a: any, b: any) => a.pricePerKg - b.pricePerKg);
  else if (sortBy === 'price_desc') filteredProducts.sort((a: any, b: any) => b.pricePerKg - a.pricePerKg);
  else if (sortBy === 'rating') filteredProducts.sort((a: any, b: any) => b.rating - a.rating);
  else filteredProducts.sort((a: any, b: any) => b.reviews - a.reviews);

  const categoryName = activeCategory === 'all' ? 'All Products' : categories.find((c: any) => c.id === activeCategory)?.name || 'Products';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            {categoryName === 'All Products' ? <>Our <span className="text-gradient">Products</span></> : <span className="text-gradient">{categoryName}</span>}
          </h1>
          <p className="text-gray-500">{filteredProducts.length} products available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === 'all' ? 'gradient-primary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/30'
              }`}
            >
              All Products
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat.id ? 'gradient-primary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/30'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🍗</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product: any, i: number) => (
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-pulse text-2xl">Loading...</div></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function getFallbackCategories() {
  return [
    { id: 'fresh-chicken', name: 'Fresh Chicken', icon: '🐔', description: 'Farm-fresh whole chickens', count: 2 },
    { id: 'cuts-pieces', name: 'Cuts & Pieces', icon: '🍖', description: 'Boneless, wings & more', count: 4 },
    { id: 'ready-to-cook', name: 'Ready to Cook', icon: '🍳', description: 'Marinated items', count: 3 },
    { id: 'combos-offers', name: 'Combos & Offers', icon: '🎉', description: 'Value packs', count: 2 },
  ];
}

function getFallbackProducts() {
  return [
    { id: '1', name: 'Fresh Whole Chicken', description: 'Farm-fresh whole broiler chicken.', category: 'fresh-chicken', pricePerKg: 220, unit: 'kg', image: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 110 }, { label: '1 kg', value: 1, price: 220 }], inStock: true, stockQty: 50, rating: 4.5, reviews: 128, tags: ['bestseller'] },
    { id: '2', name: 'Chicken Breast (Boneless)', description: 'Premium boneless breast.', category: 'cuts-pieces', pricePerKg: 350, unit: 'kg', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 175 }, { label: '1 kg', value: 1, price: 350 }], inStock: true, stockQty: 30, rating: 4.7, reviews: 95, tags: ['premium'] },
    { id: '3', name: 'Chicken Wings', description: 'Juicy wings for frying.', category: 'cuts-pieces', pricePerKg: 280, unit: 'kg', image: 'https://images.unsplash.com/photo-1628296338029-450eb9dd0a9c?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 140 }, { label: '1 kg', value: 1, price: 280 }], inStock: true, stockQty: 25, rating: 4.3, reviews: 67, tags: ['popular'] },
    { id: '4', name: 'Chicken Drumsticks', description: 'Meaty drumsticks.', category: 'cuts-pieces', pricePerKg: 300, unit: 'kg', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 150 }, { label: '1 kg', value: 1, price: 300 }], inStock: true, stockQty: 40, rating: 4.6, reviews: 112, tags: ['bestseller'] },
    { id: '5', name: 'Country Chicken', description: 'Free-range desi chicken.', category: 'fresh-chicken', pricePerKg: 550, unit: 'kg', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 275 }, { label: '1 kg', value: 1, price: 550 }], inStock: true, stockQty: 15, rating: 4.8, reviews: 89, tags: ['premium'] },
    { id: '7', name: 'Chicken Lollipop', description: 'Ready to fry lollipops.', category: 'ready-to-cook', pricePerKg: 420, unit: 'kg', image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 210 }, { label: '1 kg', value: 1, price: 420 }], inStock: true, stockQty: 18, rating: 4.6, reviews: 78, tags: ['ready-to-cook'] },
    { id: '8', name: 'Tandoori Chicken', description: 'Marinated tandoori.', category: 'ready-to-cook', pricePerKg: 450, unit: 'kg', image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&q=80&w=800', weights: [{ label: '500g', value: 0.5, price: 225 }, { label: '1 kg', value: 1, price: 450 }], inStock: true, stockQty: 12, rating: 4.7, reviews: 92, tags: ['bestseller'] },
    { id: '9', name: 'Family Combo', description: 'Value family pack.', category: 'combos-offers', pricePerKg: 280, unit: 'pack', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=800', weights: [{ label: '2kg Pack', value: 2, price: 560 }], originalPrice: 680, inStock: true, stockQty: 10, rating: 4.8, reviews: 145, tags: ['combo'] },
  ];
}
