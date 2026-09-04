import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

export const ProductCard = ({ product, index }) => {
  const { cart, addItem, removeItem } = useCartStore();
  const quantity = cart[product.id] || 0;

  return (
    <motion.div 
      /* Staggered Frame-by-Frame Grid Entrance */
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08, // Stagger effect per item frame
        ease: [0.215, 0.610, 0.355, 1.000] 
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass-card relative rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 group overflow-hidden"
    >
      {/* Animated Floating Ambient Background Light */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-[11px] font-extrabold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          {product.category}
        </span>
        {product.badge && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="text-[10px] font-bold text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md uppercase tracking-wider shadow-md shadow-amber-400/20"
          >
            {product.badge}
          </motion.span>
        )}
      </div>

      {/* Image Container configured for Local Bottle Assets */}
      <div className="relative w-full h-52 my-2 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900/50 border border-white/5">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="h-44 w-full object-contain p-2 rounded-xl"
          whileHover={{ scale: 1.1, rotate: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-xs px-3 py-1.5 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Title & Price */}
      <div className="relative z-10 mt-2">
        <h3 className="text-white font-bold text-base line-clamp-1 group-hover:text-amber-300 transition-colors">
          {product.name}
        </h3>
        <p className="text-xl font-black text-amber-400 mt-1">
          KES {product.price.toLocaleString()}
        </p>
      </div>

      {/* Frame-by-Frame Animated Cart Actions */}
      <div className="relative z-10 mt-4 pt-3 border-t border-white/10">
        <AnimatePresence mode="wait">
          {quantity === 0 ? (
            <motion.button
              key="add-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addItem(product.id)}
              disabled={!product.inStock}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all disabled:opacity-40"
            >
              + Add to Order List
            </motion.button>
          ) : (
            <motion.div 
              key="qty-controls"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between w-full bg-slate-900/90 rounded-xl p-1.5 border border-amber-500/40"
            >
              <motion.button 
                whileTap={{ scale: 0.75 }} 
                onClick={() => removeItem(product.id)}
                className="w-9 h-9 rounded-lg bg-white/10 text-white font-bold text-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                -
              </motion.button>

              {/* Frame-by-Frame Number Pop Animation */}
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={quantity}
                  initial={{ y: -12, opacity: 0, scale: 1.4 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 12, opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="text-amber-400 font-black text-lg px-3"
                >
                  {quantity}
                </motion.span>
              </AnimatePresence>

              <motion.button 
                whileTap={{ scale: 0.75 }} 
                onClick={() => addItem(product.id)}
                className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 font-bold text-lg flex items-center justify-center hover:bg-amber-400 transition-colors"
              >
                +
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};