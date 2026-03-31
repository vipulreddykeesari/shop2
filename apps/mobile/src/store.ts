import { create } from 'zustand';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  weight: number;
  weightLabel: string;
  price: number;
  pricePerKg: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existing = get().items.find(i => i.id === item.id);
    if (existing) {
      set({ items: get().items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
  updateQuantity: (id, qty) => {
    if (qty <= 0) {
      set({ items: get().items.filter(i => i.id !== id) });
    } else {
      set({ items: get().items.map(i => i.id === id ? { ...i, quantity: qty } : i) });
    }
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));

interface AuthStore {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
