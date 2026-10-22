'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';

// PLACEHOLDER REVIEWS — Replace these with real customer testimonials
// Ask customers on WhatsApp/Google for their reviews and update here
const testimonials = [
  {
    nameEn: 'Priya Sharma',
    nameMr: 'प्रिया शर्मा',
    text: {
      en: "Best cafe in Mhasrul! The Chirayu Special Sandwich is absolutely delicious and the Cold Coffee is to die for. Love the cozy atmosphere!",
      mr: "म्हसरूळमधील सर्वोत्तम कॅफे! चिरायू स्पेशल सँडविच अत्यंत स्वादिष्ट आहे आणि कोल्ड कॉफी अप्रतिम आहे.",
    },
    rating: 5,
    avatar: '👩',
    location: 'Mhasrul, Nashik',
    isPlaceholder: true,
  },
  {
    nameEn: 'Rahul Patil',
    nameMr: 'राहुल पाटील',
    text: {
      en: "We celebrated our anniversary here and it was perfect! The party hall decoration was beautiful, staff was very helpful. Highly recommended!",
      mr: "आम्ही आमचा वर्धापन दिन येथे साजरा केला आणि ते परिपूर्ण होते! पार्टी हॉल डेकोरेशन सुंदर होती.",
    },
    rating: 5,
    avatar: '👨',
    location: 'Nashik',
    isPlaceholder: true,
  },
  {
    nameEn: 'Sneha Jadhav',
    nameMr: 'स्नेहा जाधव',
    text: {
      en: "The Blue Mojito here is the best I've had! Great snacks, affordable prices and wonderful service. Our go-to spot for family outings.",
      mr: "येथील ब्लू मोजिटो सर्वोत्तम आहे! उत्कृष्ट स्नॅक्स, परवडणाऱ्या किंमती आणि अद्भुत सेवा.",
    },
    rating: 5,
    avatar: '👩',
    location: 'Kala Nagar, Nashik',
    isPlaceholder: true,
  },
];

export default function Testimonials() {
  const { lang, t } = useLang();

  return (
    <section className="py-16 md:py-24 bg-[#fff6e5]" aria-label="Customer Reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#e8891d] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            {t('Customer Love', 'ग्राहकांचे प्रेम')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`section-title text-3xl md:text-4xl lg:text-5xl ${lang === 'mr' ? 'font-mr' : ''}`}
          >
            {t('What People Say', 'लोक काय म्हणतात')}
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto mt-4">
            <span className="text-[#f5b232]">💬</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all border border-[#6e2a42]/10 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-5 text-[#f5b232]/20 font-playfair font-black text-6xl leading-none select-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                {[...Array(review.rating)].map((_, j) => (
                  <span key={j} className="text-[#f5b232] text-lg">★</span>
                ))}
              </div>

              {/* Text */}
              <p className={`text-gray-600 text-sm leading-relaxed mb-4 relative z-10 ${lang === 'mr' ? 'font-mr' : ''}`}>
                {lang === 'mr' ? review.text.mr : review.text.en}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#6e2a42]/10">
                <div className="w-10 h-10 rounded-full bg-[#6e2a42]/10 flex items-center justify-center text-2xl">
                  {review.avatar}
                </div>
                <div>
                  <p className={`font-semibold text-[#4a1a2c] text-sm ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {lang === 'mr' ? review.nameMr : review.nameEn}
                  </p>
                  <p className="text-gray-400 text-xs">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className={`text-[#6e2a42]/70 text-sm mb-4 ${lang === 'mr' ? 'font-mr' : ''}`}>
            {t('Loved your visit? Leave us a review!', 'आमची भेट आवडली? आम्हाला रिव्ह्यू द्या!')}
          </p>
          <a
            href="https://g.page/r/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border-2 border-[#6e2a42]/20 text-[#6e2a42] hover:border-[#6e2a42] hover:bg-[#6e2a42] hover:text-white font-semibold px-6 py-3 rounded-full transition-all text-sm"
          >
            <span>⭐</span>
            {t('Write a Google Review', 'गूगल रिव्ह्यू लिहा')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
