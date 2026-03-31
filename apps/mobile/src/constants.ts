export const COLORS = {
  primary: '#e63946',
  primaryDark: '#c62828',
  primaryLight: '#ff6659',
  accent: '#ff8a65',
  background: '#f8f9fa',
  surface: '#ffffff',
  card: '#ffffff',
  text: '#1a1a2e',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  star: '#f59e0b',
  dark: '#1a1a2e',
  darkCard: '#16213e',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  extrabold: 'System',
};

export const API_URL = 'http://10.0.2.2:4000'; // Android emulator
// export const API_URL = 'http://localhost:4000'; // iOS simulator

export const CATEGORIES = [
  { id: 'fresh-chicken', name: 'Fresh Chicken', icon: '🐔', color: '#ffe0e6' },
  { id: 'cuts-pieces', name: 'Cuts & Pieces', icon: '🍖', color: '#fff3e0' },
  { id: 'ready-to-cook', name: 'Ready to Cook', icon: '🍳', color: '#e8f5e9' },
  { id: 'combos-offers', name: 'Combos & Offers', icon: '🎉', color: '#e3f2fd' },
];

export const PRODUCTS = [
  { id: '1', name: 'Fresh Whole Chicken', description: 'Farm-fresh whole broiler chicken, cleaned and ready to cook. Tender & juicy.', category: 'fresh-chicken', pricePerKg: 220, unit: 'kg', image: '', weights: [{ label: '500g', value: 0.5, price: 110 }, { label: '1 kg', value: 1, price: 220 }, { label: '2 kg', value: 2, price: 440 }], inStock: true, stockQty: 50, rating: 4.5, reviews: 128, tags: ['bestseller'] },
  { id: '2', name: 'Chicken Breast (Boneless)', description: 'Premium boneless chicken breast, perfect for grilling, stir-fry, or healthy meals.', category: 'cuts-pieces', pricePerKg: 350, unit: 'kg', image: '', weights: [{ label: '250g', value: 0.25, price: 87.5 }, { label: '500g', value: 0.5, price: 175 }, { label: '1 kg', value: 1, price: 350 }], inStock: true, stockQty: 30, rating: 4.7, reviews: 95, tags: ['premium'] },
  { id: '3', name: 'Chicken Wings', description: 'Juicy chicken wings, perfect for frying, baking, or making spicy buffalo wings.', category: 'cuts-pieces', pricePerKg: 280, unit: 'kg', image: '', weights: [{ label: '500g', value: 0.5, price: 140 }, { label: '1 kg', value: 1, price: 280 }], inStock: true, stockQty: 25, rating: 4.3, reviews: 67, tags: ['popular'] },
  { id: '4', name: 'Chicken Drumsticks', description: 'Meaty chicken drumsticks with bone, ideal for tandoori, grilling, or curry.', category: 'cuts-pieces', pricePerKg: 300, unit: 'kg', image: '', weights: [{ label: '500g', value: 0.5, price: 150 }, { label: '1 kg', value: 1, price: 300 }, { label: '2 kg', value: 2, price: 600 }], inStock: true, stockQty: 40, rating: 4.6, reviews: 112, tags: ['bestseller'] },
  { id: '5', name: 'Country Chicken (Desi)', description: 'Free-range desi chicken with rich flavor. Perfect for traditional recipes.', category: 'fresh-chicken', pricePerKg: 550, unit: 'kg', image: '', weights: [{ label: '500g', value: 0.5, price: 275 }, { label: '1 kg', value: 1, price: 550 }], inStock: true, stockQty: 15, rating: 4.8, reviews: 89, tags: ['premium'] },
  { id: '6', name: 'Chicken Keema (Minced)', description: 'Fresh minced chicken, ready for keema curry, kebabs, or stuffing parathas.', category: 'cuts-pieces', pricePerKg: 320, unit: 'kg', image: '', weights: [{ label: '250g', value: 0.25, price: 80 }, { label: '500g', value: 0.5, price: 160 }, { label: '1 kg', value: 1, price: 320 }], inStock: true, stockQty: 20, rating: 4.4, reviews: 56, tags: ['popular'] },
  { id: '7', name: 'Chicken Lollipop', description: 'Ready to fry chicken lollipops. Restaurant-style appetizer at home.', category: 'ready-to-cook', pricePerKg: 420, unit: 'kg', image: '', weights: [{ label: '500g', value: 0.5, price: 210 }, { label: '1 kg', value: 1, price: 420 }], inStock: true, stockQty: 18, rating: 4.6, reviews: 78, tags: ['ready-to-cook'] },
  { id: '8', name: 'Tandoori Chicken', description: 'Marinated tandoori chicken, ready for oven or grill. Authentic spice blend.', category: 'ready-to-cook', pricePerKg: 450, unit: 'kg', image: '', weights: [{ label: '500g', value: 0.5, price: 225 }, { label: '1 kg', value: 1, price: 450 }], inStock: true, stockQty: 12, rating: 4.7, reviews: 92, tags: ['bestseller'] },
  { id: '9', name: 'Family Combo Pack', description: 'Value pack: 1kg whole chicken + 500g boneless + 500g wings. Great savings!', category: 'combos-offers', pricePerKg: 280, unit: 'pack', image: '', weights: [{ label: '2kg Pack', value: 2, price: 560 }], originalPrice: 680, inStock: true, stockQty: 10, rating: 4.8, reviews: 145, tags: ['combo'] },
  { id: '10', name: 'Chicken Tikka', description: 'Boneless chicken marinated in tikka spices. Ready to cook perfection.', category: 'ready-to-cook', pricePerKg: 400, unit: 'kg', image: '', weights: [{ label: '500g', value: 0.5, price: 200 }, { label: '1 kg', value: 1, price: 400 }], inStock: true, stockQty: 14, rating: 4.5, reviews: 63, tags: ['ready-to-cook'] },
];
