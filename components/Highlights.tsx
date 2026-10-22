'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';

const highlights = [
  {
    icon: '🥪',
    titleEn: 'Snacks & Street Food',
    titleMr: 'स्नॅक्स',
    descEn: 'Vadapav, Sandwiches, Chaat, Fries, Bhajis & more hot snacks.',
    descMr: 'वडापाव, सँडविच, चाट, फ्राईज, भजी आणि बरेच काही.',
    gradient: 'from-[#6e2a42] to-[#8c3654]',
  },
  {
    icon: '🍦',
    titleEn: 'Ice-Cream Parlour',
    titleMr: 'आईस्क्रीम',
    descEn: 'Mango, Butterscotch, Cookies & Cream, Rajbhog & 10+ flavours.',
    descMr: 'मँगो, बटर स्कॉच, कुकीज अँड क्रीम, राजभोग आणि १०+ फ्लेवर्स.',
    gradient: 'from-[#e8891d] to-[#f5b232]',
  },
  {
    icon: '🍊',
    titleEn: 'Fresh Juices & Mojitos',
    titleMr: 'ताजे ज्युस व मोजिटो',
    descEn: 'Freshly squeezed juices and refreshing Blue, Mint & Berry Mojitos.',
    descMr: 'ताजे पिळलेले ज्युस आणि ताजेतवाने ब्लू, मिंट आणि बेरी मोजिटो.',
    gradient: 'from-[#1a6b3c] to-[#25a55e]',
  },
  {
    icon: '🎊',
    titleEn: 'Relax & Celebrate',
    titleMr: 'रिलॅक्स पॉईंट',
    descEn: 'Birthday parties, Kitty parties, Anniversary & Party Hall Decoration.',
    descMr: 'वाढदिवस, किटी पार्टी, ॲनिव्हर्सरी आणि पार्टी हॉल डेकोरेशन.',
    gradient: 'from-[#4a1a2c] to-[#6e2a42]',
  },
];

const cardVariants: import('framer-motion').Variants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function Highlights() {
  const { lang, t } = useLang();

  return (
    <section className="py-16 md:py-24 bg-[#fff6e5] doodle-bg" aria-label="Our Highlights">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#e8891d] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            {t('What We Offer', 'आम्ही काय देतो')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`section-title text-3xl md:text-4xl lg:text-5xl ${lang === 'mr' ? 'font-mr' : ''}`}
          >
            {t('Everything You Crave', 'तुम्हाला जे हवे ते सर्व')}
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto mt-4">
            <span className="text-[#f5b232] text-lg">✦</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90`} />

              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col items-center text-center h-full min-h-[220px]">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {item.icon}
                </motion.div>

                <h3 className={`text-white font-bold text-xl mb-2 ${lang === 'mr' ? 'font-mr' : 'font-playfair'}`}>
                  {lang === 'mr' ? item.titleMr : item.titleEn}
                </h3>

                <p className={`text-white/75 text-sm leading-relaxed ${lang === 'mr' ? 'font-mr' : ''}`}>
                  {lang === 'mr' ? item.descMr : item.descEn}
                </p>
              </div>

              {/* Hover shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
