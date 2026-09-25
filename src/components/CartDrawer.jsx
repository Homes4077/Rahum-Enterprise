import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS } from '../data/products';

export function CartDrawer({ isOpen, onClose }) {
  const { cart, addItem, removeItem, clearCart, getTotalPrice, getTotalCount } = useCartStore();

  const totalCount = getTotalCount();
  const totalPrice = getTotalPrice(PRODUCTS);
  const cartEntries = Object.entries(cart); // [ [id, quantity], ... ]

  const handleWhatsAppCheckout = () => {
    if (cartEntries.length === 0) return;

    const itemsText = cartEntries
      .map(([id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product) return null;
        return `• ${product.name} x${qty} - KSh ${(product.price * qty).toLocaleString()}`;
      })
      .filter(Boolean)
      .join('\n');

    const message = `Hello! I would like to order the following:\n\n${itemsText}\n\n*Total Amount:* KSh ${totalPrice.toLocaleString()}`;
    const encoded = encodeURIComponent(message);
    
    // Replace with Rahum's phone number or generic target number
    window.open(`https://wa.me/254718898492?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 z-50 flex flex-col p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold">Edit Cart</h2>
                <span className="bg-amber-500/20 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                  {totalCount} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cartEntries.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-4xl mb-2">🛒</p>
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                cartEntries.map(([id, qty]) => {
                  const product = PRODUCTS.find((p) => p.id === id);
                  if (!product) return null;

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg border border-slate-700"
                        />
                        <div>
                          <h4 className="font-semibold text-sm line-clamp-1">{product.name}</h4>
                          <p className="text-xs text-amber-400 font-bold">
                            KSh {(product.price * qty).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Modifier (+ / -) */}
                      <div className="flex items-center bg-slate-900 rounded-lg border border-slate-700">
                        <button
                          onClick={() => removeItem(id)}
                          className="px-3 py-1 text-slate-300 hover:text-red-400 font-bold transition"
                        >
                          -
                        </button>
                        <span className="px-1 text-xs font-bold text-amber-400">{qty}</span>
                        <button
                          onClick={() => addItem(id)}
                          className="px-3 py-1 text-slate-300 hover:text-emerald-400 font-bold transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cartEntries.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Clear All
                  </button>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Total</span>
                    <span className="text-lg font-bold text-amber-400">
                      KSh {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-900/30"
                >
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}