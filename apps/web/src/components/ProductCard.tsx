'use client';

import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Star, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store';

interface Weight {
  label: string;
  value: number;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerKg: number;
  unit: string;
  image: string;
  weights: Weight[];
  inStock: boolean;
  stockQty: number;
  rating: number;
  reviews: number;
  tags?: string[];
  originalPrice?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();

  const currentWeight = product.weights[selectedWeight];

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${currentWeight.value}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      pricePerKg: product.pricePerKg,
      weight: currentWeight.value,
      weightLabel: currentWeight.label,
      price: currentWeight.price,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - currentWeight.price * (product.originalPrice / (product.pricePerKg * currentWeight.value))) / product.originalPrice) * 100)
    : 0;

  const categoryEmojis: Record<string, string> = {
    'fresh-chicken': '🐔',
    'cuts-pieces': '🍖',
    'ready-to-cook': '🍳',
    'combos-offers': '🎉',
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-7xl sm:text-8xl opacity-80 group-hover:scale-110 transition-transform duration-500">
          {categoryEmojis[product.category] || '🍗'}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tags?.includes('bestseller') && (
            <span className="px-2.5 py-1 bg-primary text-white text-xs font-bold rounded-lg shadow-md">
              🔥 Bestseller
            </span>
          )}
          {product.tags?.includes('premium') && (
            <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-md">
              ⭐ Premium
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-lg shadow-md">
              {Math.round(((product.originalPrice - product.weights[0].price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg">Out of Stock</span>
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-gray-800">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Category */}
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1.5">
          {product.category.replace(/-/g, ' ')}
        </p>

        {/* Name */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Weight Selector */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.weights.map((w, i) => (
            <button
              key={i}
              onClick={() => setSelectedWeight(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedWeight === i
                  ? 'gradient-primary text-white shadow-md shadow-primary/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{currentWeight.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{Math.round(product.originalPrice * currentWeight.value / product.weights[product.weights.length - 1].value)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">₹{product.pricePerKg}/{product.unit}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              isAdded
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                : product.inStock
                  ? 'gradient-primary text-white hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-95'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
