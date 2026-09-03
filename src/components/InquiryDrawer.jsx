import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS } from '../data/products';

export const InquiryDrawer = () => {
  const { cart, getTotalCount, getTotalPrice } = useCartStore();
  
  const totalCount = getTotalCount();
  const estimatedTotal = getTotalPrice(PRODUCTS);

  return (
    <AnimatePresence>
      {totalCount > 0 && (
        <motion.div 
          initial={{ y: 120, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="fixed bottom-6 left-0 right-0 z-50 px-4 max-w-xl mx-auto"
        >
          <div className="rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-amber-500/50 p-4 shadow-2xl shadow-amber-500/10 text-white relative overflow-hidden">
            {/* Glowing Scan Line Animation */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none"
            />

            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
                  <p className="text-[11px] uppercase tracking-wider font-extrabold text-amber-400">Order Inquiry List</p>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  <span className="font-bold text-white">{totalCount} items</span> selected
                </p>
                {/* On-Screen Customer Expected Total */}
                <p className="text-lg font-black text-amber-300 mt-0.5">
                  Est. Total: KES {estimatedTotal.toLocaleString()}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  const phone = "254729764026";
                  let message = "Hello Rahum Enterprises, I would like to inquire about/order:\n";
                  Object.entries(cart).forEach(([id, qty]) => {
                    const product = PRODUCTS.find((p) => p.id === id);
                    if (product) message += `- ${qty}x ${product.name}\n`;
                  });
                  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <span>WhatsApp Order</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001l-1.416 5.169 5.291-1.387c1.468.8 3.12 1.221 4.78 1.222h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.037-5.176-2.922-7.062a9.927 9.927 0 00-7.058-2.943zm0 1.831a8.12 8.12 0 015.782 2.41 8.12 8.12 0 012.392 5.743c0 4.502-3.663 8.163-8.168 8.163h-.003c-1.468 0-2.903-.396-4.155-1.144l-.298-.178-3.088.81.824-3.008-.195-.312a8.12 8.12 0 01-1.246-4.327c0-4.502 3.664-8.163 8.165-8.163z"/>
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};