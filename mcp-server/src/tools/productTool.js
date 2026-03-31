/**
 * Product Tool - MCP Tool for product management
 * Handles CRUD operations, category filtering, weight-based pricing
 */

const { v4: uuidv4 } = require('uuid');

// In-memory store (replace with MongoDB in production)
let products = [
  {
    id: '1',
    name: 'Fresh Whole Chicken',
    description: 'Farm-fresh whole broiler chicken, cleaned and ready to cook. Tender and juicy meat perfect for roasting or curry.',
    category: 'fresh-chicken',
    pricePerKg: 220,
    unit: 'kg',
    image: '/images/whole-chicken.jpg',
    weights: [
      { label: '500g', value: 0.5, price: 110 },
      { label: '1 kg', value: 1, price: 220 },
      { label: '2 kg', value: 2, price: 440 },
    ],
    inStock: true,
    stockQty: 50,
    rating: 4.5,
    reviews: 128,
    tags: ['bestseller', 'farm-fresh'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Chicken Breast (Boneless)',
    description: 'Premium boneless chicken breast, perfect for grilling, stir-fry, or healthy meal prep. Low fat, high protein.',
    category: 'cuts-pieces',
    pricePerKg: 350,
    unit: 'kg',
    image: '/images/chicken-breast.jpg',
    weights: [
      { label: '250g', value: 0.25, price: 87.5 },
      { label: '500g', value: 0.5, price: 175 },
      { label: '1 kg', value: 1, price: 350 },
    ],
    inStock: true,
    stockQty: 30,
    rating: 4.7,
    reviews: 95,
    tags: ['premium', 'boneless'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Chicken Wings',
    description: 'Juicy chicken wings, perfect for frying, baking, or making spicy buffalo wings. Party favorite!',
    category: 'cuts-pieces',
    pricePerKg: 280,
    unit: 'kg',
    image: '/images/chicken-wings.jpg',
    weights: [
      { label: '500g', value: 0.5, price: 140 },
      { label: '1 kg', value: 1, price: 280 },
    ],
    inStock: true,
    stockQty: 25,
    rating: 4.3,
    reviews: 67,
    tags: ['popular', 'party'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Chicken Drumsticks',
    description: 'Meaty chicken drumsticks with bone, ideal for tandoori, grilling, or traditional curry preparations.',
    category: 'cuts-pieces',
    pricePerKg: 300,
    unit: 'kg',
    image: '/images/chicken-drumstick.jpg',
    weights: [
      { label: '500g', value: 0.5, price: 150 },
      { label: '1 kg', value: 1, price: 300 },
      { label: '2 kg', value: 2, price: 600 },
    ],
    inStock: true,
    stockQty: 40,
    rating: 4.6,
    reviews: 112,
    tags: ['bestseller'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Country Chicken (Desi)',
    description: 'Free-range country chicken, known for its rich flavor and firm texture. Perfect for traditional recipes.',
    category: 'fresh-chicken',
    pricePerKg: 550,
    unit: 'kg',
    image: '/images/country-chicken.jpg',
    weights: [
      { label: '500g', value: 0.5, price: 275 },
      { label: '1 kg', value: 1, price: 550 },
    ],
    inStock: true,
    stockQty: 15,
    rating: 4.8,
    reviews: 89,
    tags: ['premium', 'free-range', 'desi'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Chicken Keema (Mince)',
    description: 'Finely minced chicken, perfect for kebabs, kofta, parathas, and various other delicious preparations.',
    category: 'cuts-pieces',
    pricePerKg: 320,
    unit: 'kg',
    image: '/images/chicken-keema.jpg',
    weights: [
      { label: '250g', value: 0.25, price: 80 },
      { label: '500g', value: 0.5, price: 160 },
      { label: '1 kg', value: 1, price: 320 },
    ],
    inStock: true,
    stockQty: 20,
    rating: 4.4,
    reviews: 56,
    tags: ['versatile'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Chicken Lollipop (Ready to Cook)',
    description: 'Pre-marinated chicken lollipops, ready to fry. Restaurant-style appetizer in minutes!',
    category: 'ready-to-cook',
    pricePerKg: 420,
    unit: 'kg',
    image: '/images/chicken-lollipop.jpg',
    weights: [
      { label: '500g (8-10 pcs)', value: 0.5, price: 210 },
      { label: '1 kg (16-20 pcs)', value: 1, price: 420 },
    ],
    inStock: true,
    stockQty: 18,
    rating: 4.6,
    reviews: 78,
    tags: ['ready-to-cook', 'appetizer'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Tandoori Chicken (Marinated)',
    description: 'Authentic tandoori marinated chicken, ready to grill or bake. Spiced with traditional blend of spices.',
    category: 'ready-to-cook',
    pricePerKg: 450,
    unit: 'kg',
    image: '/images/tandoori-chicken.jpg',
    weights: [
      { label: '500g', value: 0.5, price: 225 },
      { label: '1 kg', value: 1, price: 450 },
    ],
    inStock: true,
    stockQty: 12,
    rating: 4.7,
    reviews: 92,
    tags: ['ready-to-cook', 'marinated', 'bestseller'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Family Chicken Combo',
    description: 'Perfect family pack: 1kg whole chicken + 500g boneless breast + 500g wings. Great value!',
    category: 'combos-offers',
    pricePerKg: 280,
    unit: 'pack',
    image: '/images/family-combo.jpg',
    weights: [
      { label: 'Family Pack (2kg)', value: 2, price: 560 },
    ],
    originalPrice: 680,
    inStock: true,
    stockQty: 10,
    rating: 4.8,
    reviews: 145,
    tags: ['combo', 'value-pack', 'bestseller'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'BBQ Party Pack',
    description: 'Everything you need for a BBQ: wings, drumsticks, and seekh kebab. Feeds 4-6 people.',
    category: 'combos-offers',
    pricePerKg: 380,
    unit: 'pack',
    image: '/images/bbq-pack.jpg',
    weights: [
      { label: 'Party Pack (2.5kg)', value: 2.5, price: 950 },
    ],
    originalPrice: 1150,
    inStock: true,
    stockQty: 8,
    rating: 4.9,
    reviews: 67,
    tags: ['combo', 'party', 'offer'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'Chicken Liver',
    description: 'Fresh chicken liver, rich in iron and protein. Great for frying or making traditional liver fry.',
    category: 'cuts-pieces',
    pricePerKg: 180,
    unit: 'kg',
    image: '/images/chicken-liver.jpg',
    weights: [
      { label: '250g', value: 0.25, price: 45 },
      { label: '500g', value: 0.5, price: 90 },
    ],
    inStock: true,
    stockQty: 15,
    rating: 4.2,
    reviews: 34,
    tags: ['organ-meat'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'Chicken Seekh Kebab (Ready to Cook)',
    description: 'Spiced minced chicken on skewers, ready to grill. Authentic Mughlai flavor!',
    category: 'ready-to-cook',
    pricePerKg: 480,
    unit: 'kg',
    image: '/images/seekh-kebab.jpg',
    weights: [
      { label: '500g (6 pcs)', value: 0.5, price: 240 },
      { label: '1 kg (12 pcs)', value: 1, price: 480 },
    ],
    inStock: true,
    stockQty: 14,
    rating: 4.5,
    reviews: 61,
    tags: ['ready-to-cook', 'kebab'],
    createdAt: new Date().toISOString(),
  },
];

const productTool = {
  description: 'Manage chicken products - CRUD operations, filtering, and pricing',

  getAll: async (params = {}) => {
    let result = [...products];

    if (params.category) {
      result = result.filter(p => p.category === params.category);
    }
    if (params.search) {
      const search = params.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.tags?.some(t => t.toLowerCase().includes(search))
      );
    }
    if (params.inStock !== undefined) {
      result = result.filter(p => p.inStock === (params.inStock === 'true' || params.inStock === true));
    }
    if (params.tag) {
      result = result.filter(p => p.tags?.includes(params.tag));
    }
    if (params.minPrice) {
      result = result.filter(p => p.pricePerKg >= Number(params.minPrice));
    }
    if (params.maxPrice) {
      result = result.filter(p => p.pricePerKg <= Number(params.maxPrice));
    }
    if (params.sort === 'price_asc') {
      result.sort((a, b) => a.pricePerKg - b.pricePerKg);
    } else if (params.sort === 'price_desc') {
      result.sort((a, b) => b.pricePerKg - a.pricePerKg);
    } else if (params.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (params.sort === 'popular') {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  },

  getById: async ({ id }) => {
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  getCategories: async () => {
    return [
      { id: 'fresh-chicken', name: 'Fresh Chicken', icon: '🐔', description: 'Farm-fresh whole chickens and cuts', count: products.filter(p => p.category === 'fresh-chicken').length },
      { id: 'cuts-pieces', name: 'Cuts & Pieces', icon: '🍖', description: 'Boneless, wings, drumsticks & more', count: products.filter(p => p.category === 'cuts-pieces').length },
      { id: 'ready-to-cook', name: 'Ready to Cook', icon: '🍳', description: 'Marinated & pre-prepared items', count: products.filter(p => p.category === 'ready-to-cook').length },
      { id: 'combos-offers', name: 'Combos & Offers', icon: '🎉', description: 'Value packs & special deals', count: products.filter(p => p.category === 'combos-offers').length },
    ];
  },

  create: async (data) => {
    const newProduct = {
      id: uuidv4(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    products.push(newProduct);
    return newProduct;
  },

  update: async ({ id, ...data }) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    products[index] = { ...products[index], ...data, updatedAt: new Date().toISOString() };
    return products[index];
  },

  remove: async ({ id }) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    const removed = products.splice(index, 1);
    return { success: true, removed: removed[0] };
  },
};

module.exports = productTool;
