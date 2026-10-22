'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { siteConfig } from '@/config/site';

export default function Contact() {
  const { lang, t } = useLang();

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-[#fde8c0] to-[#fff6e5]" aria-label="Contact Information">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#e8891d] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            {t('Find Us', 'आम्हाला शोधा')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`section-title text-3xl md:text-4xl lg:text-5xl ${lang === 'mr' ? 'font-mr' : ''}`}
          >
            {t('Visit Us', 'भेट द्या')}
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto mt-4">
            <span className="text-[#f5b232]">📍</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-[#6e2a42]/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#6e2a42]/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <h3 className={`font-bold text-[#6e2a42] mb-1 ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {t('Address', 'पत्ता')}
                  </h3>
                  <p className={`text-gray-600 text-sm leading-relaxed ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {lang === 'mr' ? siteConfig.address.mr : siteConfig.address.en}
                  </p>
                  <a
                    href={siteConfig.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-[#6e2a42] font-semibold text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-[#f5b232] rounded"
                  >
                    🗺️ {t('Get Directions', 'दिशा मिळवा')} →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone numbers */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-[#6e2a42]/10">
              <h3 className={`font-bold text-[#6e2a42] mb-4 ${lang === 'mr' ? 'font-mr' : ''}`}>
                {t('Call Us', 'कॉल करा')}
              </h3>
              <div className="space-y-3">
                {Object.values(siteConfig.phones).map((phone) => (
                  <a
                    key={phone.number}
                    href={`tel:${phone.number}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#6e2a42]/5 transition-colors group focus:outline-none focus:ring-2 focus:ring-[#f5b232]"
                  >
                    <div className="w-10 h-10 bg-[#6e2a42] rounded-full flex items-center justify-center text-white text-lg group-hover:bg-[#8c3654] transition-colors">
                      📞
                    </div>
                    <div>
                      <p className={`font-semibold text-[#4a1a2c] text-sm ${lang === 'mr' ? 'font-mr' : ''}`}>
                        {lang === 'mr' ? phone.nameMr : phone.name}
                      </p>
                      <p className="text-[#6e2a42] font-bold">{phone.display}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Opening hours & Live Status */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-[#6e2a42]/10">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className={`font-bold text-[#6e2a42] text-lg ${lang === 'mr' ? 'font-mr' : ''}`}>
                  {t('Opening Hours', 'कॅफेची वेळ')}
                </h3>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t('Open Daily • 8 AM – 12 AM', 'दररोज सुरू • स. ८ ते रा. १२')}
                </span>
              </div>
              <div className="space-y-2.5">
                {siteConfig.hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-[#6e2a42]/10 last:border-0">
                    <span className="text-gray-600 text-sm font-medium">{h.day}</span>
                    <span className="text-[#6e2a42] font-bold text-sm bg-[#fff6e5] px-2.5 py-0.5 rounded-md">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp Action */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hi Reshma ji / Sachin ji, I have an enquiry regarding Chirayu Cafe Nashik!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-2xl transition-all hover:shadow-lg font-bold group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="text-sm font-bold leading-tight">
                    {t('Chat Directly on WhatsApp', 'व्हाट्सॲपवर थेट बोला')}
                  </p>
                  <p className="text-xs text-white/80 font-normal">
                    {t('Instant response for table booking & takeaway', 'ऑर्डर व पार्टी बुकिंगसाठी लगेच संपर्क करा')}
                  </p>
                </div>
              </div>
              <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* Amenities & Payment Badges */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-[#6e2a42]/10">
              <h3 className={`font-bold text-[#6e2a42] text-sm uppercase tracking-wider mb-3 ${lang === 'mr' ? 'font-mr' : ''}`}>
                {t('Cafe Amenities & Highlights', 'कॅफेच्या सुविधा')}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { icon: '🛵', en: 'Free Bike Parking', mr: 'मोफत पार्किंग' },
                  { icon: '💳', en: 'UPI & Cash Accepted', mr: 'फोनपे / जीपे / रोख' },
                  { icon: '❄️', en: 'Cozy Cafe Seating', mr: 'उत्तम बैठक व्यवस्था' },
                  { icon: '🎉', en: 'Party Hall Space', mr: 'पार्टी हॉल उपलब्ध' },
                  { icon: '🚰', en: 'Pure Filtered Water', mr: 'शुद्ध पिण्याचे पाणी' },
                  { icon: '⚡', en: 'Quick Table Service', mr: 'जलद सेवा' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#fff6e5]/80 text-[#4a1a2c]">
                    <span>{item.icon}</span>
                    <span className="font-medium">{lang === 'mr' ? item.mr : item.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-[#6e2a42] rounded-2xl p-6 text-white shadow-md">
              <h3 className={`font-bold mb-3 ${lang === 'mr' ? 'font-mr' : ''}`}>
                {t('Services Available', 'उपलब्ध सेवा')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(lang === 'mr' ? siteConfig.services.mr : siteConfig.services.en).map((service, i) => (
                  <span
                    key={i}
                    className={`bg-white/15 text-white/95 px-3 py-1 rounded-full text-xs font-medium ${lang === 'mr' ? 'font-mr' : ''}`}
                  >
                    ✓ {service}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <a
              href={siteConfig.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden shadow-card border border-[#6e2a42]/10 min-h-[400px] relative group"
            >
              {/* Static map placeholder */}
              <div className="w-full min-h-[400px] bg-[#fff6e5] flex flex-col items-center justify-center gap-4">
                <span className="text-6xl">🗺️</span>
                <div className="text-center px-6">
                  <p className="font-bold text-[#6e2a42] text-lg">Chirayu Cafe</p>
                  <p className="text-gray-500 text-sm mt-1">Shop No. 03, Lotus Avenue Apartment,</p>
                  <p className="text-gray-500 text-sm">Dindori Road, Nashik – 422004</p>
                </div>
                <span className="mt-2 inline-flex items-center gap-2 bg-[#6e2a42] text-white px-5 py-2.5 rounded-full font-semibold text-sm group-hover:bg-[#8c3654] transition-colors">
                  📍 Open in Google Maps →
                </span>
              </div>
            </a>
            <a
              href={siteConfig.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 flex items-center justify-center gap-2 bg-[#6e2a42] hover:bg-[#8c3654] text-white font-bold py-4 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f5b232] ${lang === 'mr' ? 'font-mr' : ''}`}
            >
              🗺️ {t('Open in Google Maps', 'गूगल मॅप्समध्ये उघडा')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
