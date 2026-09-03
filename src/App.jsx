import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, CATEGORIES } from './data/products';
import { ProductCard } from './components/ProductCard';
import { InquiryDrawer } from './components/InquiryDrawer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100 pb-36 relative overflow-hidden">
      {/* Moving Background Glow Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <header className="sticky top-0 z-40 bg-[#05070e]/80 backdrop-blur-2xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20">
              R
            </div>
            <div>
              <h1 className="text-lg font-black tracking-wider text-white">
                RAHUM <span className="text-amber-400">ENTERPRISES</span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">Githurai 45 • Wholesale & Retail Drinks</p>
            </div>
          </div>
          <a 
            href="tel:0729764026" 
            className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-all flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            0729 764 026
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-12 pb-6 max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block text-xs font-extrabold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 mb-4">
            Direct WhatsApp Inventory
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Select Products & <br />
            <span className="gold-gradient-text">Build Your Order</span>
          </h2>
        </motion.div>

        {/* Category Filters with Sliding Active Pill */}
        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat ? 'text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-amber-400 rounded-xl shadow-lg shadow-amber-500/25"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Staggered Animated Grid Display */}
      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
        {filteredProducts.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </main>

      <InquiryDrawer />
    </div>
  );
}