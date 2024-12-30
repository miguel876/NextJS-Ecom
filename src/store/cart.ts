import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/interfaces/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              total: state.items.reduce(
                (sum, item) =>
                  sum +
                  (item.id === product.id
                    ? (item.quantity + quantity) * Number(item.price)
                    : item.quantity * Number(item.price)),
                0
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity }],
            total: state.total + Number(product.price) * quantity,
          };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
          total: state.items.reduce(
            (sum, item) =>
              sum +
              (item.id === productId
                ? quantity * Number(item.price)
                : item.quantity * Number(item.price)),
            0
          ),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
          total: state.items
            .filter((item) => item.id !== productId)
            .reduce((sum, item) => sum + item.quantity * Number(item.price), 0),
        })),
      clearCart: () => set({ items: [], total: 0 }),
      total: 0,
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
    }
  )
);
