'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { menuCategories, bestSellers } from '@/data/menu';
import type { MenuItem } from '@/data/menu';

// Pull best seller items from menu data
const bestSellerItems: MenuItem[] = bestSellers
  .map((id) => {
    for (const cat of menuCategories) {
      const item = cat.items.find((i) => i.id === id);
      if (item) return item;
    }
    return null;
  })
  .filter(Boolean) as MenuItem[];

export default function BestSellers() {
  const { lang, t } = useLang();
  const { cart, addItem, updateQty } = useCart();

  const getQty = (id: string) => cart.find((c) => c.item.id === id)?.qty ?? 0;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#4a1a2c] to-[#6e2a42] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">⭐</div>
        <div className="absolute bottom-10 right-10 text-9xl">⭐</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#f5b232] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            {t('Customer Favourites', 'ग्राहकांचे आवडते')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`font-playfair font-bold text-white text-3xl md:text-4xl lg:text-5xl ${lang === 'mr' ? 'font-mr' : ''}`}
          >
            {t('Best Sellers', 'बेस्ट सेलर्स')}
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto mt-4">
            <span className="text-[#f5b232] text-lg">★</span>
          </div>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {bestSellerItems.map((item, i) => {
            const qty = getQty(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#f5b232]/50 transition-all group flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(item.id)}
                </div>

                {/* Veg badge */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="veg-badge" aria-label="Vegetarian" />
                </div>

                {/* Name */}
                <h3 className={`text-white font-semibold text-sm leading-tight mb-1 ${lang === 'mr' ? 'font-mr' : ''}`}>
                  {lang === 'mr' ? item.mr : item.en}
                </h3>

                {/* Price */}
                <p className="text-[#f5b232] font-bold text-lg mb-3">₹{item.price}</p>

                {/* Add/Remove */}
                {qty === 0 ? (
                  <button
                    onClick={() => addItem(item)}
                    aria-label={`Add ${item.en} to cart`}
                    className="w-full bg-[#f5b232] hover:bg-[#d49520] text-[#4a1a2c] font-bold text-sm py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-[#f5b232]/30 focus:outline-none focus:ring-2 focus:ring-[#f5b232]"
                  >
                    {t('Add +', '+ जोडा')}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, qty - 1)}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 rounded-full bg-[#4a1a2c] text-[#f5b232] font-bold text-lg flex items-center justify-center hover:bg-[#6e2a42] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f5b232]"
                    >
                      −
                    </button>
                    <span className="text-white font-bold text-sm w-6 text-center">{qty}</span>
                    <button
                      onClick={() => addItem(item)}
                      aria-label="Increase quantity"
                      className="w-8 h-8 rounded-full bg-[#f5b232] text-[#4a1a2c] font-bold text-lg flex items-center justify-center hover:bg-[#d49520] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f5b232]"
                    >
                      +
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="#menu"
            className={`inline-flex items-center gap-2 border-2 border-[#f5b232] text-[#f5b232] hover:bg-[#f5b232] hover:text-[#4a1a2c] font-bold px-8 py-3 rounded-full transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f5b232] ${lang === 'mr' ? 'font-mr' : ''}`}
          >
            {t('View Full Menu →', 'पूर्ण मेनू पाहा →')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function getCategoryIcon(id: string): string {
  if (id.startsWith('snack')) return '🥙';
  if (id.startsWith('sand')) return '🥪';
  if (id.startsWith('chaat')) return '🌶️';
  if (id.startsWith('fries')) return '🍟';
  if (id.startsWith('shake')) return '🥛';
  if (id.startsWith('moj')) return '🍹';
  if (id.startsWith('coffee')) return '☕';
  if (id.startsWith('tea')) return '🍵';
  if (id.startsWith('ice')) return '🍦';
  if (id.startsWith('juice')) return '🍊';
  if (id.startsWith('pasta')) return '🍝';
  if (id.startsWith('maggi')) return '🍜';
  return '🍴';
}
