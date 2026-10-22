'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { siteConfig } from '@/config/site';

const floatingItems = [
  { emoji: '☕', size: 'text-6xl', top: '15%', left: '8%', delay: 0, rotate: -15 },
  { emoji: '🥪', size: 'text-5xl', top: '25%', right: '10%', delay: 0.3, rotate: 10 },
  { emoji: '🍦', size: 'text-7xl', top: '60%', left: '5%', delay: 0.6, rotate: 5 },
  { emoji: '🍹', size: 'text-5xl', top: '50%', right: '8%', delay: 0.9, rotate: -8 },
  { emoji: '🍟', size: 'text-4xl', top: '75%', right: '15%', delay: 1.2, rotate: 12 },
  { emoji: '🎂', size: 'text-6xl', top: '80%', left: '12%', delay: 1.5, rotate: -5 },
];

export default function Hero() {
  const { lang, t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4a1a2c] via-[#6e2a42] to-[#8c3654]"
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#f5b232]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#e8891d]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5b232]/5 rounded-full blur-3xl" />
      </div>

      {/* Floating food items */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        {floatingItems.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.size} select-none`}
            style={{
              top: item.top,
              left: 'left' in item ? item.left : undefined,
              right: 'right' in item ? item.right : undefined,
              rotate: item.rotate,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [item.rotate, item.rotate + 5, item.rotate],
            }}
            transition={{
              duration: 4 + i * 0.5,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: item.delay,
            }}
          >
            <span style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>{item.emoji}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Particle bubbles with deterministic values */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 8, left: '10%', duration: 6, delay: 0 },
          { size: 5, left: '22%', duration: 7.5, delay: 1.5 },
          { size: 10, left: '35%', duration: 5.5, delay: 0.8 },
          { size: 6, left: '48%', duration: 7, delay: 2.2 },
          { size: 9, left: '58%', duration: 6.2, delay: 3 },
          { size: 4, left: '68%', duration: 8, delay: 0.5 },
          { size: 7, left: '78%', duration: 6.8, delay: 1.8 },
          { size: 11, left: '88%', duration: 5.8, delay: 2.7 },
          { size: 6, left: '15%', duration: 7.2, delay: 4 },
          { size: 8, left: '42%', duration: 6.5, delay: 3.5 },
          { size: 5, left: '62%', duration: 8.2, delay: 4.5 },
          { size: 9, left: '82%', duration: 5.9, delay: 1.2 },
        ].map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#f5b232]"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              bottom: '-20px',
              opacity: 0.3,
            }}
            animate={{
              y: [0, -700],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        {/* Live Open Status & Pure Veg Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#f5b232]/20 border border-[#f5b232]/40 text-[#f5b232] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className={lang === 'mr' ? 'font-mr' : ''}>
              {t('Open Now • 9:00 AM – 10:30 PM', 'सुरू आहे • सकाळी ९ ते रात्री १०:३०')}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md">
            <span className="inline-block w-2.5 h-2.5 rounded-full border border-emerald-400 p-0.5">
              <span className="block w-full h-full rounded-full bg-emerald-400" />
            </span>
            <span className={lang === 'mr' ? 'font-mr' : ''}>
              {t('100% Pure Veg', '१००% शुद्ध शाकाहारी')}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-[#f5b232] px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md">
            <span>📍</span>
            <span className={lang === 'mr' ? 'font-mr' : ''}>
              {t('Mhasrul, Nashik', 'म्हसरूळ, नाशिक')}
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-playfair font-black text-white mb-2 leading-tight drop-shadow-md"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.2rem)' }}
        >
          {lang === 'mr' ? (
            <span className="font-mr">चिरायु कॅफे</span>
          ) : (
            <>
              <span className="text-[#f5b232]">Chirayu</span>{' '}
              <span>Cafe</span>
            </>
          )}
        </motion.h1>

        {/* Tagline with shimmer */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`shimmer-text font-bold mb-4 ${lang === 'mr' ? 'font-mr' : 'font-playfair'}`}
          style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)' }}
        >
          {t('Real Time To Celebrate', 'खऱ्या अर्थाने सेलिब्रेट करण्याची वेळ')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`text-white/85 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed ${lang === 'mr' ? 'font-mr' : ''}`}
        >
          {t(
            'Snacks • Sandwiches • Ice-Cream • Juices • Mojito • Maggi • Fries • Birthday & Party Hall Celebrations',
            'सर्व प्रकारचे स्नॅक्स, वाढदिवस सेलिब्रेशन, किटी पार्टी, ॲनिव्हर्सरी, ज्युस, आईस्क्रीम इत्यादी सर्व मिळेल.'
          )}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-10"
        >
          <a
            href="#menu"
            className="btn-shine bg-[#f5b232] hover:bg-[#d49520] text-[#4a1a2c] font-bold px-7 py-3.5 rounded-full text-base transition-all hover:shadow-xl hover:shadow-[#f5b232]/40 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f5b232]"
          >
            <span className={`flex items-center gap-2 ${lang === 'mr' ? 'font-mr' : ''}`}>
              🍽️ {t('Explore Menu', 'पूर्ण मेनू पाहा')}
            </span>
          </a>

          <a
            href="#celebrations"
            className={`btn-shine bg-white/10 hover:bg-[#f5b232] text-[#f5b232] hover:text-[#4a1a2c] border-2 border-[#f5b232] font-bold px-6 py-3.5 rounded-full text-base transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f5b232] ${lang === 'mr' ? 'font-mr' : ''}`}
          >
            🎊 {t('Book Party Hall', 'पार्टी हॉल बुक करा')}
          </a>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.phones.reshma.number}`}
              className={`flex items-center gap-1.5 bg-[#6e2a42]/80 hover:bg-[#4a1a2c] text-white border border-white/20 px-4 py-3 rounded-full text-sm font-semibold transition-all hover:border-[#f5b232] focus:outline-none focus:ring-2 focus:ring-[#f5b232] ${lang === 'mr' ? 'font-mr' : ''}`}
              title="Call Reshma Ghuge"
            >
              📞 {lang === 'mr' ? 'रेश्मा' : 'Reshma'}: 7030736393
            </a>
            <a
              href={`tel:${siteConfig.phones.sachin.number}`}
              className={`hidden sm:flex items-center gap-1.5 bg-[#6e2a42]/80 hover:bg-[#4a1a2c] text-white border border-white/20 px-4 py-3 rounded-full text-sm font-semibold transition-all hover:border-[#f5b232] focus:outline-none focus:ring-2 focus:ring-[#f5b232] ${lang === 'mr' ? 'font-mr' : ''}`}
              title="Call Sachin Ghuge"
            >
              📞 {lang === 'mr' ? 'सचिन' : 'Sachin'}: 8007316837
            </a>
          </div>
        </motion.div>

        {/* Quick Highlights / Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2 pb-6"
        >
          {[
            { icon: '⭐', labelEn: '4.9 Star Rated', labelMr: '४.९ स्टार रेटिंग', subEn: 'Customer Love', subMr: 'ग्राहकांचे प्रेम' },
            { icon: '🎂', labelEn: '500+ Parties', labelMr: '५००+ सेलिब्रेशन', subEn: 'Hall Bookings', subMr: 'यशस्वी पार्ट्या' },
            { icon: '🥪', labelEn: '60+ Delights', labelMr: '६०+ पदार्थ', subEn: 'Snacks & Drinks', subMr: 'स्नॅक्स व पेये' },
            { icon: '🌿', labelEn: '100% Veg', labelMr: '१००% शाकाहारी', subEn: 'Fresh Ingredients', subMr: 'ताजे व पौष्टिक' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-black/25 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center hover:border-[#f5b232]/40 transition-colors"
            >
              <div className="text-xl mb-0.5">{stat.icon}</div>
              <p className={`text-[#f5b232] font-bold text-sm ${lang === 'mr' ? 'font-mr' : ''}`}>
                {lang === 'mr' ? stat.labelMr : stat.labelEn}
              </p>
              <p className={`text-white/60 text-xs ${lang === 'mr' ? 'font-mr' : ''}`}>
                {lang === 'mr' ? stat.subMr : stat.subEn}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Steam cup decoration */}
        <div className="mt-4 flex justify-center">
          <div className="relative text-5xl select-none">
            ☕
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 flex gap-1">
              <div className="w-1 h-5 bg-white/30 rounded-full steam-1" style={{ borderRadius: '100%' }} />
              <div className="w-1 h-7 bg-white/30 rounded-full steam-2" style={{ borderRadius: '100%' }} />
              <div className="w-1 h-4 bg-white/30 rounded-full steam-3" style={{ borderRadius: '100%' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Golden Marquee Strip along bottom of Hero */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#35121f]/90 border-t border-[#f5b232]/30 py-2.5 overflow-hidden z-20 backdrop-blur-sm">
        <div className="animate-marquee whitespace-nowrap text-xs md:text-sm text-[#f5b232] font-medium tracking-wide">
          <span className="mx-4">🎉 Real Time To Celebrate</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4 font-mr">वाढदिवस सेलिब्रेशन व किटी पार्टी हॉल</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4">Vadapav ₹10 • Sandwich from ₹30</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4 font-mr">१००% शुद्ध शाकाहारी</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4">Party Hall Decoration Available</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4 font-mr">कॉल करा: ७०३०७३६३९३ / ८००७३१६८३७</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4">Near Reliance Petrol Pump, Mhasrul, Nashik</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4">🎉 Real Time To Celebrate</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4 font-mr">वाढदिवस सेलिब्रेशन व किटी पार्टी हॉल</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4">Vadapav ₹10 • Sandwich from ₹30</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4 font-mr">१००% शुद्ध शाकाहारी</span>
          <span className="mx-2 text-white/40">✦</span>
          <span className="mx-4">Party Hall Decoration Available</span>
          <span className="mx-2 text-white/40">✦</span>
        </div>
      </div>
    </section>
  );
}
