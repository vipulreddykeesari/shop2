import { create } from 'zustand';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  pricePerKg: number;
  weight: number;
  weightLabel: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const { items } = get();
    const existingIndex = items.findIndex(
      (i) => i.productId === item.productId && i.weight === item.weight
    );

    if (existingIndex >= 0) {
      const newItems = [...items];
      newItems[existingIndex].quantity += 1;
      set({ items: newItems });
    } else {
      set({ items: [...items, { ...item, id: `${item.productId}-${item.weight}`, quantity: 1 }] });
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((item) => item.id !== id) });
    } else {
      set({
        items: get().items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      });
    }
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));

// Auth Store
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  addresses?: any[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (userData) => {
    const { user } = get();
    if (user) {
      const updated = { ...user, ...userData };
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updated));
      }
      set({ user: updated });
    }
  },
}));

// UI Store
interface UIState {
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  toggleDarkMode: () => void;
  toggleMobileMenu: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isDarkMode: false,
  isMobileMenuOpen: false,
  isCartOpen: false,

  toggleDarkMode: () => set({ isDarkMode: !get().isDarkMode }),
  toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),
  toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
  setCartOpen: (open) => set({ isCartOpen: open }),
}));
