'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import { siteConfig } from '@/config/site';

export default function CartDrawer() {
  const { cart, updateQty, clearCart, totalPrice, isOpen, setIsOpen } = useCart();
  const { lang, t } = useLang();
  const [name, setName] = useState('');
  const [orderType, setOrderType] = useState<'Takeaway' | 'Dine In'>('Takeaway');
  const [tableNo, setTableNo] = useState('');
  const [instructions, setInstructions] = useState('');

  const buildWhatsAppMessage = () => {
    const lines = cart.map(
      (c) => `• ${c.item.en} (${c.item.mr}) × ${c.qty} = ₹${c.item.price * c.qty}`
    );
    const msg = [
      '☕ *ORDER FROM CHIRAYU CAFE (चिरायु कॅफे)*',
      '─────────────────────────',
      ...lines,
      '─────────────────────────',
      `*Total Amount: ₹${totalPrice}*`,
      `*Order Type:* ${orderType}${orderType === 'Dine In' && tableNo ? ` (Table #${tableNo})` : ''}`,
      name ? `*Customer Name:* ${name}` : '',
      instructions ? `*Special Request:* ${instructions}` : '',
      '─────────────────────────',
      '📍 _Mhasrul, Nashik | Near Reliance Petrol Pump_',
      '🙏 _Thank you for celebrating with us!_',
    ]
      .filter(Boolean)
      .join('\n');
    return encodeURIComponent(msg);
  };

  const handleSendOrder = () => {
    if (cart.length === 0) return;
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${buildWhatsAppMessage()}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            role="dialog"
            aria-label="Your order"
            aria-modal="true"
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#6e2a42] text-white">
              <div>
                <h2 className={`font-bold text-lg ${lang === 'mr' ? 'font-mr' : 'font-playfair'}`}>
                  {t('Your Order', 'तुमची ऑर्डर')}
                </h2>
                <p className="text-white/70 text-xs">
                  {t('Chirayu Cafe — Mhasrul, Nashik', 'चिरायु कॅफे — म्हसरूळ, नाशिक')}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
                className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#f5b232]"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart items & Order details (scrollable) */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-6xl mb-4">🛒</p>
                  <p className={`text-[#6e2a42] font-semibold text-lg ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {t('Your cart is empty', 'तुमची कार्ट रिकामी आहे')}
                  </p>
                  <p className={`text-gray-400 text-sm mt-2 ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {t('Add items from the menu below', 'खालील मेनूमधून पदार्थ जोडा')}
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 bg-[#6e2a42] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#8c3654] transition-colors"
                  >
                    {t('Browse Menu', 'मेनू पाहा')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Items list */}
                  <div className="space-y-3">
                    <AnimatePresence>
                      {cart.map((cartItem) => (
                        <motion.div
                          key={cartItem.item.id}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          className="flex items-center gap-3 bg-[#fff6e5] rounded-xl p-3"
                        >
                          <div className="flex-1 min-w-0">
                            <p className={`font-semibold text-[#4a1a2c] text-sm leading-tight ${lang === 'mr' ? 'font-mr' : ''}`}>
                              {lang === 'mr' ? cartItem.item.mr : cartItem.item.en}
                            </p>
                            <p className="text-[#6e2a42] font-bold text-sm mt-0.5">
                              ₹{cartItem.item.price} × {cartItem.qty} = ₹{cartItem.item.price * cartItem.qty}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => updateQty(cartItem.item.id, cartItem.qty - 1)}
                              aria-label="Decrease"
                              className="w-8 h-8 rounded-full bg-[#6e2a42]/10 text-[#6e2a42] font-bold flex items-center justify-center hover:bg-[#6e2a42] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#6e2a42]"
                            >
                              −
                            </button>
                            <span className="font-bold text-[#4a1a2c] w-6 text-center">{cartItem.qty}</span>
                            <button
                              onClick={() => updateQty(cartItem.item.id, cartItem.qty + 1)}
                              aria-label="Increase"
                              className="w-8 h-8 rounded-full bg-[#6e2a42] text-white font-bold flex items-center justify-center hover:bg-[#8c3654] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6e2a42]"
                            >
                              +
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Order Options Form */}
                  <div className="pt-4 border-t border-[#6e2a42]/10 space-y-3">
                    <div>
                      <label htmlFor="customer-name" className={`text-xs font-semibold text-[#6e2a42] uppercase tracking-wider ${lang === 'mr' ? 'font-mr' : ''}`}>
                        {t('Your Name (optional)', 'तुमचे नाव (ऐच्छिक)')}
                      </label>
                      <input
                        id="customer-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('e.g. Rahul', 'उदा. राहुल')}
                        className="mt-1 w-full border border-[#6e2a42]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#6e2a42] text-[#4a1a2c]"
                      />
                    </div>

                    <div>
                      <p className={`text-xs font-semibold text-[#6e2a42] uppercase tracking-wider mb-2 ${lang === 'mr' ? 'font-mr' : ''}`}>
                        {t('Dining Option', 'ऑर्डर प्रकार')}
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setOrderType('Takeaway')}
                          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 transition-all ${
                            orderType === 'Takeaway'
                              ? 'bg-[#6e2a42] text-white border-[#6e2a42] shadow-sm'
                              : 'border-[#6e2a42]/20 text-[#6e2a42] hover:border-[#6e2a42]/50'
                          } ${lang === 'mr' ? 'font-mr' : ''}`}
                        >
                          🛍️ {t('Takeaway / Parcel', 'पार्सल / टेकअवे')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderType('Dine In')}
                          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 transition-all ${
                            orderType === 'Dine In'
                              ? 'bg-[#6e2a42] text-white border-[#6e2a42] shadow-sm'
                              : 'border-[#6e2a42]/20 text-[#6e2a42] hover:border-[#6e2a42]/50'
                          } ${lang === 'mr' ? 'font-mr' : ''}`}
                        >
                          🍽️ {t('Dine In', 'डाईन इन')}
                        </button>
                      </div>

                      {orderType === 'Dine In' && (
                        <div className="mt-2.5">
                          <label htmlFor="table-number" className={`text-xs text-gray-600 ${lang === 'mr' ? 'font-mr' : ''}`}>
                            {t('Table Number (optional)', 'टेबल नंबर (ऐच्छिक)')}
                          </label>
                          <input
                            id="table-number"
                            type="text"
                            value={tableNo}
                            onChange={(e) => setTableNo(e.target.value)}
                            placeholder="e.g. 4"
                            className="mt-1 w-full border border-[#6e2a42]/20 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#6e2a42] text-[#4a1a2c]"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="customer-instructions" className={`text-xs font-semibold text-[#6e2a42] uppercase tracking-wider ${lang === 'mr' ? 'font-mr' : ''}`}>
                        {t('Special Request / Instructions', 'विशेष सूचना / पसंती')}
                      </label>
                      <input
                        id="customer-instructions"
                        type="text"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder={t('e.g. Jain, Extra spicy, Less ice...', 'उदा. जैन, जास्त तिखट, कमी बर्फ...')}
                        className="mt-1 w-full border border-[#6e2a42]/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#6e2a42] text-[#4a1a2c]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pinned checkout actions */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-3.5 space-y-3 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
                {/* Bill Breakdown */}
                <div className="bg-[#fff6e5] rounded-xl p-3 border border-[#6e2a42]/10 space-y-1 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('Item Subtotal', 'पदार्थांची एकूण रक्कम')}</span>
                    <span className="font-semibold text-gray-800">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>{t('Packaging / Parcel Charges', 'पार्किंग / पार्सल शुल्क')}</span>
                    <span className="font-bold">FREE (₹0)</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>{t('Taxes & Surcharges', 'कर / अधिभार')}</span>
                    <span className="font-bold">₹0</span>
                  </div>
                  <div className="border-t border-[#6e2a42]/15 pt-1.5 mt-0.5 flex justify-between items-center text-sm">
                    <span className={`font-bold text-[#4a1a2c] ${lang === 'mr' ? 'font-mr' : ''}`}>
                      {t('Total Payable', 'एकूण देय रक्कम')}
                    </span>
                    <span className="text-[#6e2a42] font-black text-xl">₹{totalPrice}</span>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={handleSendOrder}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className={lang === 'mr' ? 'font-mr' : ''}>
                    {t('Send Order on WhatsApp', 'व्हाट्सॲपवर ऑर्डर पाठवा')}
                  </span>
                </button>

                <button
                  onClick={clearCart}
                  className={`w-full text-center text-[#6e2a42]/50 hover:text-[#6e2a42] text-xs py-0.5 transition-colors ${lang === 'mr' ? 'font-mr' : ''}`}
                >
                  {t('Clear Cart', 'कार्ट रिकामी करा')}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
