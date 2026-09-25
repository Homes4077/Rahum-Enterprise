import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: {},

  // Add 1 to item quantity or initialize it if it doesn't exist
  addItem: (id) =>
    set((state) => ({
      cart: { ...state.cart, [id]: (state.cart[id] || 0) + 1 },
    })),

  // Decrement quantity by 1; removes the key entirely if quantity drops to 0
  removeItem: (id) =>
    set((state) => {
      const updated = { ...state.cart };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return { cart: updated };
    }),

  // Explicitly delete an item regardless of quantity
  deleteItem: (id) =>
    set((state) => {
      const updated = { ...state.cart };
      delete updated[id];
      return { cart: updated };
    }),

  // Clear all items from the cart
  clearCart: () => set({ cart: {} }),

  // Return total count of all items combined
  getTotalCount: () => {
    const cart = get().cart;
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  },

  // Calculate grand total price given the products array
  getTotalPrice: (products = []) => {
    const cart = get().cart;
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find((p) => p.id === id);
      return total + (product ? product.price * qty : 0);
    }, 0);
  },
}));