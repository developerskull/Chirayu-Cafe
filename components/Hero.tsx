'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { siteConfig } from '@/config/site';
import CoffeeCup3D from './CoffeeCup3D';

const floatingItems = [
  { emoji: '☕', size: 'text-5xl', top: '18%', left: '4%', delay: 0, rotate: -15 },
  { emoji: '🥪', size: 'text-5xl', top: '18%', right: '4%', delay: 0.3, rotate: 10 },
  { emoji: '🍦', size: 'text-6xl', top: '65%', left: '4%', delay: 0.6, rotate: 5 },
  { emoji: '🍹', size: 'text-5xl', top: '65%', right: '4%', delay: 0.9, rotate: -8 },
  { emoji: '🍟', size: 'text-4xl', top: '82%', right: '12%', delay: 1.2, rotate: 12 },
  { emoji: '🎂', size: 'text-5xl', top: '82%', left: '10%', delay: 1.5, rotate: -5 },
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4a1a2c] via-[#6e2a42] to-[#8c3654] pt-20 pb-16 md:pt-24 md:pb-20"
    >
      {/* Subtle warm ambient ambient lighting in corners */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#f5b232]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#e8891d]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5b232]/5 rounded-full blur-3xl" />
      </div>

      {/* Floating food items (desktop only to prevent obscuring mobile text) */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none hidden md:block">
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
              y: [0, -18, 0],
              rotate: [item.rotate, item.rotate + 4, item.rotate],
            }}
            transition={{
              duration: 4.5 + i * 0.5,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: item.delay,
            }}
          >
            <span style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.35))' }}>{item.emoji}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 text-center lg:text-left">
          {/* Left Text & CTA Column */}
          <div className="flex-1 max-w-2xl">
            {/* Live Open Status & Pure Veg Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5"
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
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)' }}
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
              transition={{ delay: 0.4 }}
              className={`shimmer-text font-bold mb-3 ${lang === 'mr' ? 'font-mr' : 'font-playfair'}`}
              style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}
            >
              {t('Real Time To Celebrate', 'खऱ्या अर्थाने सेलिब्रेट करण्याची वेळ')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-white/85 text-sm sm:text-base md:text-lg mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed ${lang === 'mr' ? 'font-mr' : ''}`}
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
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <a
                href="#menu"
                className="btn-shine bg-[#f5b232] hover:bg-[#d49520] text-[#4a1a2c] font-bold px-6 py-3 rounded-full text-sm sm:text-base transition-all hover:shadow-xl hover:shadow-[#f5b232]/40 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f5b232]"
              >
                <span className={`flex items-center gap-2 ${lang === 'mr' ? 'font-mr' : ''}`}>
                  🍽️ {t('Explore Menu', 'पूर्ण मेनू पाहा')}
                </span>
              </a>

              <a
                href="#celebrations"
                className={`btn-shine bg-white/10 hover:bg-[#f5b232] text-[#f5b232] hover:text-[#4a1a2c] border-2 border-[#f5b232] font-bold px-5 py-3 rounded-full text-sm sm:text-base transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f5b232] ${lang === 'mr' ? 'font-mr' : ''}`}
              >
                🎊 {t('Book Party Hall', 'पार्टी हॉल बुक करा')}
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${siteConfig.phones.reshma.number}`}
                  className={`flex items-center gap-1.5 bg-[#6e2a42]/80 hover:bg-[#4a1a2c] text-white border border-white/20 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all hover:border-[#f5b232] focus:outline-none focus:ring-2 focus:ring-[#f5b232] ${lang === 'mr' ? 'font-mr' : ''}`}
                  title="Call Reshma Ghuge"
                >
                  📞 {lang === 'mr' ? 'रेश्मा' : 'Reshma'}: 7030736393
                </a>
                <a
                  href={`tel:${siteConfig.phones.sachin.number}`}
                  className={`hidden sm:flex items-center gap-1.5 bg-[#6e2a42]/80 hover:bg-[#4a1a2c] text-white border border-white/20 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all hover:border-[#f5b232] focus:outline-none focus:ring-2 focus:ring-[#f5b232] ${lang === 'mr' ? 'font-mr' : ''}`}
                  title="Call Sachin Ghuge"
                >
                  📞 {lang === 'mr' ? 'सचिन' : 'Sachin'}: 8007316837
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Three.js Interactive 3D Coffee Cup with Chirayu Cafe branding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex-shrink-0 flex flex-col items-center justify-center"
          >
            <CoffeeCup3D />
          </motion.div>
        </div>

        {/* Quick Highlights / Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 pb-4"
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
