'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { menuCategories, comboDeals } from '@/data/menu';
import type { MenuItem, MenuCategory, ComboDeal } from '@/data/menu';

function getCategoryIcon(id: string): string {
  const icons: Record<string, string> = {
    tea: '🍵', coffee: '☕', milkshake: '🥛', icecream: '🍦',
    mojito: '🍹', sandwich: '🥪', pasta: '🍝', snacks: '🥙',
    juice: '🍊', chaat: '🌶️', fries: '🍟', maggi: '🍜',
  };
  return icons[id] || '🍴';
}

function MenuItemCard({ item, lang }: { item: MenuItem; lang: string }) {
  const { cart, addItem, updateQty } = useCart();
  const qty = cart.find((c) => c.item.id === item.id)?.qty ?? 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-center justify-between bg-white rounded-xl p-3.5 md:p-4 shadow-sm hover:shadow-md transition-all border border-[#6e2a42]/10 hover:border-[#6e2a42]/30 group"
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {/* Pure Veg Indicator */}
        <span
          className="w-4 h-4 rounded-sm border-2 border-emerald-600 flex items-center justify-center flex-shrink-0 mt-1"
          title="100% Vegetarian"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className={`font-semibold text-[#4a1a2c] text-sm md:text-base leading-tight group-hover:text-[#6e2a42] transition-colors ${lang === 'mr' ? 'font-mr' : ''}`}>
              {lang === 'mr' ? item.mr : item.en}
            </p>
            {item.badge && (
              <span className="bg-[#f5b232]/25 text-[#4a1a2c] border border-[#f5b232]/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {lang === 'mr' ? (item.badgeMr || item.badge) : item.badge}
              </span>
            )}
          </div>

          {lang === 'en' && item.mr !== item.en && (
            <p className="text-gray-400 text-xs font-mr mt-0.5 leading-tight">{item.mr}</p>
          )}

          {item.descEn && (
            <p className="text-gray-500 text-xs mt-1 leading-snug">
              {lang === 'mr' ? (item.descMr || item.descEn) : item.descEn}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0 ml-3">
        <span className="text-[#6e2a42] font-black text-base md:text-lg">₹{item.price}</span>
        {qty === 0 ? (
          <button
            onClick={() => addItem(item)}
            aria-label={`Add ${item.en}`}
            className="w-8 h-8 rounded-full bg-[#6e2a42] text-[#f5b232] font-bold text-lg flex items-center justify-center hover:bg-[#8c3654] transition-all hover:scale-105 shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#f5b232]"
          >
            +
          </button>
        ) : (
          <div className="flex items-center gap-1.5 bg-[#fff6e5] px-1 py-0.5 rounded-full border border-[#6e2a42]/20">
            <button
              onClick={() => updateQty(item.id, qty - 1)}
              aria-label="Decrease"
              className="w-6 h-6 rounded-full bg-white text-[#6e2a42] font-bold text-sm flex items-center justify-center hover:bg-[#6e2a42] hover:text-white transition-colors focus:outline-none"
            >
              −
            </button>
            <span className="text-[#4a1a2c] font-black text-sm w-4 text-center">{qty}</span>
            <button
              onClick={() => addItem(item)}
              aria-label="Increase"
              className="w-6 h-6 rounded-full bg-[#6e2a42] text-[#f5b232] font-bold text-sm flex items-center justify-center hover:bg-[#8c3654] transition-colors focus:outline-none"
            >
              +
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  const { lang, t } = useLang();
  const { totalItems, addItem, setIsOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [quickFilter, setQuickFilter] = useState<'all' | 'bestsellers' | 'under50' | 'cheese'>('all');
  const [search, setSearch] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  // Filter items across all categories based on search and quickFilter
  const filteredCategories = useMemo(() => {
    let result = menuCategories;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.en.toLowerCase().includes(q) ||
              item.mr.includes(search)
          ),
        }))
        .filter((cat) => cat.items.length > 0);
    } else if (quickFilter === 'bestsellers') {
      result = result
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) => item.badge === 'Best Seller' || item.badge === 'Popular'),
        }))
        .filter((cat) => cat.items.length > 0);
    } else if (quickFilter === 'under50') {
      result = result
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) => item.price <= 50),
        }))
        .filter((cat) => cat.items.length > 0);
    } else if (quickFilter === 'cheese') {
      result = result
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) =>
            item.en.toLowerCase().includes('cheese') || item.mr.includes('चीज')
          ),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    return result;
  }, [search, quickFilter]);

  // Scroll active tab into view horizontally inside the tabs container (without scrolling the window)
  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;
    const activeTab = tabs.querySelector(`[data-cat="${activeCategory}"]`) as HTMLElement;
    if (activeTab) {
      const scrollLeft = activeTab.offsetLeft - tabs.clientWidth / 2 + activeTab.clientWidth / 2;
      tabs.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
    }
  }, [activeCategory]);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = sectionRefs.current[catId];
    if (el) {
      const offset = 140; // navbar + tabs height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="bg-[#fff6e5] relative" aria-label="Full Menu">
      {/* Sticky top area */}
      <div className="sticky top-[64px] md:top-[80px] z-30 bg-[#fff6e5]/95 backdrop-blur-md border-b border-[#6e2a42]/10 shadow-sm">
        {/* Section header (hidden when sticky) */}
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-3">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto mb-3">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e2a42]/50"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              id="menu-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('Search menu items...', 'मेनू शोधा...')}
              className={`w-full pl-9 pr-4 py-2.5 rounded-full border-2 border-[#6e2a42]/20 bg-white focus:border-[#6e2a42] focus:outline-none text-sm text-[#4a1a2c] placeholder-gray-400 transition-colors ${lang === 'mr' ? 'font-mr' : ''}`}
              aria-label="Search menu"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6e2a42]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-2">
            {[
              { id: 'all', en: 'All Items', mr: 'सर्व पदार्थ', icon: '🍽️' },
              { id: 'bestsellers', en: '🔥 Bestsellers', mr: '🔥 बेस्ट सेलर', icon: '' },
              { id: 'under50', en: '🏷️ Under ₹50', mr: '🏷️ ₹५० च्या आत', icon: '' },
              { id: 'cheese', en: '🧀 Cheese Lovers', mr: '🧀 चीज स्पेशल', icon: '' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setQuickFilter(f.id as any);
                  if (search) setSearch('');
                }}
                className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                  quickFilter === f.id && !search
                    ? 'bg-[#f5b232] text-[#4a1a2c] shadow-sm font-bold scale-105'
                    : 'bg-white/80 text-[#6e2a42] hover:bg-white border border-[#6e2a42]/15'
                } ${lang === 'mr' ? 'font-mr' : ''}`}
              >
                {lang === 'mr' ? f.mr : f.en}
              </button>
            ))}
          </div>

          {/* Category tabs */}
          {!search && quickFilter === 'all' && (
            <div
              ref={tabsRef}
              className="category-tabs flex gap-2 overflow-x-auto pb-1"
              role="tablist"
              aria-label="Menu categories"
            >
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  data-cat={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#f5b232] ${
                    activeCategory === cat.id
                      ? 'bg-[#6e2a42] text-white shadow-md'
                      : 'bg-white text-[#6e2a42] hover:bg-[#6e2a42]/10 border border-[#6e2a42]/20'
                  } ${lang === 'mr' ? 'font-mr' : ''}`}
                >
                  <span>{cat.icon}</span>
                  <span>{lang === 'mr' ? cat.mr : cat.en}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Menu content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`section-title text-3xl md:text-4xl lg:text-5xl mb-2 ${lang === 'mr' ? 'font-mr' : ''}`}
          >
            {t('Our Full Menu', 'आमचा पूर्ण मेनू')}
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto">
            <span className="text-[#f5b232]">🍽️</span>
          </div>

          {/* Assurance badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              {t('100% Pure Vegetarian', '१००% शुद्ध शाकाहारी')}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#6e2a42] bg-[#f5b232]/15 border border-[#f5b232]/30 text-xs font-semibold px-3 py-1 rounded-full">
              ⚡ {t('Prepared Fresh on Order', 'ऑर्डरनुसार ताजे तयार')}
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full">
              ✨ {t('Jain Options on Request', 'जैन पर्याय उपलब्ध')}
            </span>
          </div>
        </div>

        {/* Chirayu Special Combos banner (shows when no search and all items) */}
        {!search && quickFilter === 'all' && (
          <div className="mb-12 bg-gradient-to-r from-[#4a1a2c] via-[#6e2a42] to-[#4a1a2c] rounded-2xl p-5 md:p-6 text-white shadow-xl border border-[#f5b232]/30">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className={`text-lg md:text-xl font-bold font-playfair text-[#f5b232] ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {t('Chirayu Celebration Combos', 'चिरायु सेलिब्रेशन कॉम्बो ऑफर्स')}
                  </h3>
                  <p className="text-white/70 text-xs">
                    {t('Special pairing deals — delicious savings!', 'खास कॉम्बो जोड्या — अधिक बचत, अधिक आनंद!')}
                  </p>
                </div>
              </div>
              <span className="bg-[#f5b232] text-[#4a1a2c] text-xs font-black px-3 py-1 rounded-full shadow-sm">
                {t('BEST VALUE', 'सर्वोत्तम बचत')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {comboDeals.map((combo) => (
                <div
                  key={combo.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 flex flex-col justify-between hover:border-[#f5b232]/50 transition-all hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-2xl">{combo.emoji}</span>
                      <span className="bg-[#f5b232]/25 text-[#f5b232] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#f5b232]/30">
                        {lang === 'mr' ? combo.badgeMr : combo.badgeEn}
                      </span>
                    </div>
                    <p className={`font-bold text-white text-sm leading-snug mb-1 ${lang === 'mr' ? 'font-mr' : ''}`}>
                      {lang === 'mr' ? combo.mr : combo.en}
                    </p>
                    <p className={`text-white/70 text-xs leading-snug mb-3 ${lang === 'mr' ? 'font-mr' : ''}`}>
                      {lang === 'mr' ? combo.descMr : combo.descEn}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <span className="text-white/50 line-through text-xs mr-1.5">₹{combo.originalPrice}</span>
                      <span className="text-[#f5b232] font-black text-base">₹{combo.dealPrice}</span>
                    </div>
                    <button
                      onClick={() =>
                        addItem({
                          id: combo.id,
                          en: `${combo.en} (Combo)`,
                          mr: `${combo.mr} (कॉम्बो)`,
                          price: combo.dealPrice,
                          veg: true,
                          badge: 'Combo Deal',
                          badgeMr: 'कॉम्बो ऑफर',
                        })
                      }
                      className="bg-[#f5b232] hover:bg-[#d49520] text-[#4a1a2c] text-xs font-black px-3 py-1.5 rounded-full transition-transform active:scale-95 shadow-sm"
                    >
                      + {t('Add', 'जोडा')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search results label */}
        {search && (
          <p className={`text-[#6e2a42] font-medium mb-4 ${lang === 'mr' ? 'font-mr' : ''}`}>
            {filteredCategories.reduce((sum, c) => sum + c.items.length, 0)}{' '}
            {t(`result(s) for "${search}"`, `"${search}" साठी निकाल`)}
          </p>
        )}

        {/* Category sections */}
        <div className="space-y-10">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              ref={(el) => { if (el) sectionRefs.current[cat.id] = el; }}
              id={`cat-${cat.id}`}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className={`font-playfair font-bold text-[#6e2a42] text-xl md:text-2xl ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {lang === 'mr' ? cat.mr : cat.en}
                  </h3>
                  {lang === 'en' && (
                    <p className="text-[#6e2a42]/50 text-xs font-mr">{cat.mr}</p>
                  )}
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[#f5b232]/60 to-transparent ml-2" />
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <AnimatePresence>
                  {cat.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} lang={lang} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <p className={`text-[#6e2a42] font-semibold text-lg ${lang === 'mr' ? 'font-mr' : ''}`}>
              {t('No items found. Try another search.', 'कोणतेही पदार्थ सापडले नाहीत.')}
            </p>
          </div>
        )}
      </div>

      {/* Floating cart button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:bottom-8"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-3 bg-[#6e2a42] text-white px-6 py-3.5 rounded-full shadow-2xl shadow-[#6e2a42]/40 hover:bg-[#8c3654] transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f5b232]"
            >
              <span className="relative">
                🛒
                <span className="absolute -top-2 -right-2 bg-[#f5b232] text-[#4a1a2c] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              </span>
              <span className={`font-bold ${lang === 'mr' ? 'font-mr' : ''}`}>
                {t('View Order', 'ऑर्डर पाहा')}
              </span>
              <span className="text-[#f5b232] font-bold">
                ↑
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
