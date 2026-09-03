import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: {},

  addItem: (id) => set((state) => ({
    cart: { ...state.cart, [id]: (state.cart[id] || 0) + 1 }
  })),

  removeItem: (id) => set((state) => {
    const updated = { ...state.cart };
    if (updated[id] > 1) {
      updated[id] -= 1;
    } else {
      delete updated[id];
    }
    return { cart: updated };
  }),

  clearCart: () => set({ cart: {} }),

  getTotalCount: () => {
    const cart = get().cart;
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  },

  getTotalPrice: (products) => {
    const cart = get().cart;
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find((p) => p.id === id);
      return total + (product ? product.price * qty : 0);
    }, 0);
  }
}));