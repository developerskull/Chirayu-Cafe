'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { siteConfig } from '@/config/site';

const events = [
  { icon: '🎂', titleEn: 'Birthday Celebrations', titleMr: 'वाढदिवस सेलिब्रेशन', descEn: 'Make your birthday unforgettable with our special decorations, cakes & party setup.', descMr: 'आमच्या विशेष डेकोरेशन, केक आणि पार्टी सेटअपसह तुमचा वाढदिवस अविस्मरणीय बनवा.' },
  { icon: '👩‍👧‍👦', titleEn: 'Kitty Party', titleMr: 'किटी पार्टी', descEn: 'Perfect venue for ladies kitty parties with delicious snacks & drinks.', descMr: 'स्वादिष्ट स्नॅक्स आणि पेयांसह महिलांच्या किटी पार्टीसाठी परिपूर्ण ठिकाण.' },
  { icon: '💍', titleEn: 'Anniversary Celebration', titleMr: 'ॲनिव्हर्सरी सेलिब्रेशन', descEn: 'Celebrate your special moments with your loved ones in a beautifully decorated setting.', descMr: 'सुंदर सजावटीत तुमच्या प्रियजनांसोबत तुमचे खास क्षण साजरे करा.' },
  { icon: '🎊', titleEn: 'Party Hall Decoration', titleMr: 'पार्टी हॉल डेकोरेशन', descEn: 'Professional decoration services for any event — balloons, streamers, themes & more.', descMr: 'कोणत्याही कार्यक्रमासाठी व्यावसायिक सजावट सेवा — फुगे, थीम आणि बरेच काही.' },
];

const eventTypes = ['Birthday', 'Kitty Party', 'Anniversary', 'Celebration', 'Party Hall Decoration', 'Other'];

const packages = [
  {
    id: 'silver',
    nameEn: 'Silver Package',
    nameMr: 'सिल्व्हर पॅकेज',
    idealEn: '10–15 Guests',
    idealMr: '१०–१५ पाहुणे',
    icon: '🎈',
    tagEn: 'Mini Gathering',
    tagMr: 'मिनी पार्टी',
    inclusionsEn: [
      'Circular Balloon Arch / Ring Setup',
      'Dedicated Cake Table & Prop Area',
      'Party Music & Ambiance',
      'Welcome Cold Drink / Tea for all',
    ],
    inclusionsMr: [
      'सर्क्युलर बलून रिंग डेकोरेशन',
      'केक टेबल आणि स्पेशल सेटअप',
      'पार्टी म्युझिक आणि वातावरण',
      'सर्वांसाठी वेलकम कोल्ड्रिंक / चहा',
    ],
  },
  {
    id: 'gold',
    nameEn: 'Gold Package (Popular)',
    nameMr: 'गोल्ड पॅकेज (लोकप्रिय)',
    idealEn: '15–25 Guests',
    idealMr: '१५–२५ पाहुणे',
    icon: '🎂',
    tagEn: 'Most Popular',
    tagMr: 'सर्वाधिक पसंती',
    highlight: true,
    inclusionsEn: [
      'Themed Backdrop with Neon Sign',
      'Balloon Garland & Photo Props',
      'Full Reserved Cafe Party Zone',
      'Complimentary Snack Platter for Guests',
    ],
    inclusionsMr: [
      'थीम बॅकड्रॉप + एलईडी निऑन साईन',
      'बलून गार्लंड आणि फोटो प्रॉप्स',
      'संपूर्ण रिझर्व्ह पार्टी हॉल झोन',
      'पाहुण्यांसाठी कॉम्प्लिमेंटरी स्नॅक्स प्लॅटर',
    ],
  },
  {
    id: 'diamond',
    nameEn: 'Diamond VIP Package',
    nameMr: 'डायमंड व्हीआयपी पॅकेज',
    idealEn: '25–40+ Guests',
    idealMr: '२५–४०+ पाहुणे',
    icon: '👑',
    tagEn: 'Grand Celebration',
    tagMr: 'ग्रँड सेलिब्रेशन',
    inclusionsEn: [
      'Grand Hall Decoration & Thematic Styling',
      'Party Sound System & Color Lighting',
      'Customized Photo Booth Setup',
      'Multi-course Cafe Feast & Mojito Service',
    ],
    inclusionsMr: [
      'भव्य पार्टी हॉल डेकोरेशन व थीम स्टाइलिंग',
      'पार्टी साऊंड सिस्टीम व स्पेशल लाइट्स',
      'कस्टमाइज्ड फोटो बूथ सेटअप',
      'मल्टी-कोर्स कॅफे स्नॅक्स व मोजिटो सर्व्हिस',
    ],
  },
];

export default function Celebrations() {
  const { lang, t } = useLang();
  const [selectedPackage, setSelectedPackage] = useState<string>('gold');
  const [form, setForm] = useState({
    name: '', phone: '', event: 'Birthday', date: '', guests: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setForm((prev) => ({
      ...prev,
      message: prev.message ? `${prev.message} | Selected: ${pkgName}` : `Selected Package: ${pkgName}`,
    }));
  };

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPkg = packages.find(p => p.id === selectedPackage);
    const pkgTitle = currentPkg ? (lang === 'mr' ? currentPkg.nameMr : currentPkg.nameEn) : '';

    const msg = [
      '🎉 *Party Booking Enquiry — Chirayu Cafe*',
      '',
      `*Name:* ${form.name || 'Not specified'}`,
      `*Phone:* ${form.phone || 'Not specified'}`,
      `*Event Type:* ${form.event}`,
      pkgTitle ? `*Selected Package:* ${pkgTitle}` : '',
      `*Date:* ${form.date || 'TBD'}`,
      `*Guests:* ${form.guests || 'TBD'}`,
      form.message ? `*Message:* ${form.message}` : '',
      '',
      '_Sent from ChirayuCafe.in_',
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="celebrations" className="py-16 md:py-24 bg-gradient-to-b from-[#fff6e5] to-[#fde8c0]" aria-label="Celebrations & Parties">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#e8891d] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            {t('Events & Parties', 'इव्हेंट्स आणि पार्ट्या')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`section-title text-3xl md:text-4xl lg:text-5xl mb-2 ${lang === 'mr' ? 'font-mr' : ''}`}
          >
            {t('Celebrate With Us', 'आमच्यासोबत साजरे करा')}
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto">
            <span className="text-[#f5b232] text-lg">🎉</span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-[#6e2a42]/70 mt-3 max-w-2xl mx-auto ${lang === 'mr' ? 'font-mr' : ''}`}
          >
            {t(
              'वाढदिवस सेलिब्रेशन, किटी पार्टी, ॲनिव्हर्सरी सेलिब्रेशन, पार्टी हॉल डेकोरेशन करून मिळेल.',
              'वाढदिवस सेलिब्रेशन, किटी पार्टी, ॲनिव्हर्सरी सेलिब्रेशन, पार्टी हॉल डेकोरेशन करून मिळेल.'
            )}
          </motion.p>
        </div>

        {/* 3 Celebration Packages Section */}
        <div className="mb-14">
          <div className="text-center mb-6">
            <h3 className={`text-xl md:text-2xl font-bold font-playfair text-[#6e2a42] ${lang === 'mr' ? 'font-mr' : ''}`}>
              {t('Curated Party Packages', 'खास पार्टी पॅकेजेस')}
            </h3>
            <p className="text-gray-600 text-xs md:text-sm">
              {t('Select a package to automatically include it in your enquiry', 'तुमच्या आवडीचे पॅकेज निवडा')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`relative rounded-3xl p-6 transition-all cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-white border-[#f5b232] shadow-xl ring-2 ring-[#f5b232]/50 scale-[1.02]'
                      : 'bg-white/90 border-[#6e2a42]/10 hover:border-[#6e2a42]/30 shadow-card hover:shadow-card-hover'
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f5b232] text-[#4a1a2c] text-xs font-black px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
                      ★ {lang === 'mr' ? pkg.tagMr : pkg.tagEn} ★
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-4xl">{pkg.icon}</span>
                    <span className="text-xs font-bold text-[#6e2a42] bg-[#fff6e5] border border-[#6e2a42]/20 px-3 py-1 rounded-full">
                      👥 {lang === 'mr' ? pkg.idealMr : pkg.idealEn}
                    </span>
                  </div>

                  <h4 className={`text-lg font-bold font-playfair text-[#4a1a2c] mb-3 ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {lang === 'mr' ? pkg.nameMr : pkg.nameEn}
                  </h4>

                  <ul className="space-y-2 mb-6">
                    {(lang === 'mr' ? pkg.inclusionsMr : pkg.inclusionsEn).map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                        <span className="text-[#f5b232] font-black mt-0.5">✓</span>
                        <span className={lang === 'mr' ? 'font-mr' : ''}>{inc}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPackage(pkg.id);
                    }}
                    className={`w-full py-2.5 rounded-full text-xs font-black transition-all ${
                      isSelected
                        ? 'bg-[#6e2a42] text-white shadow-md'
                        : 'bg-[#fff6e5] text-[#6e2a42] hover:bg-[#6e2a42] hover:text-white border border-[#6e2a42]/20'
                    }`}
                  >
                    {isSelected
                      ? `✓ ${t('Package Selected', 'पॅकेज निवडले आहे')}`
                      : t('Select Package', 'हे पॅकेज निवडा')}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Event cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all border border-[#6e2a42]/10"
              >
                <div className="text-4xl mb-3">{ev.icon}</div>
                <h3 className={`font-bold text-[#6e2a42] text-lg mb-2 ${lang === 'mr' ? 'font-mr font-playfair' : 'font-playfair'}`}>
                  {lang === 'mr' ? ev.titleMr : ev.titleEn}
                </h3>
                <p className={`text-gray-500 text-sm leading-relaxed ${lang === 'mr' ? 'font-mr' : ''}`}>
                  {lang === 'mr' ? ev.descMr : ev.descEn}
                </p>
              </motion.div>
            ))}

            {/* Call buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sm:col-span-2 grid grid-cols-2 gap-3"
            >
              <a
                href={`tel:${siteConfig.phones.reshma.number}`}
                className={`flex flex-col items-center justify-center gap-1 bg-[#6e2a42] text-white rounded-2xl py-4 hover:bg-[#8c3654] transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f5b232]`}
              >
                <span className="text-2xl">📞</span>
                <span className="font-bold text-sm">{t('Call Reshma', 'रेश्माला कॉल करा')}</span>
                <span className="text-[#f5b232] text-xs">{siteConfig.phones.reshma.display}</span>
              </a>
              <a
                href={`tel:${siteConfig.phones.sachin.number}`}
                className={`flex flex-col items-center justify-center gap-1 bg-[#4a1a2c] text-white rounded-2xl py-4 hover:bg-[#6e2a42] transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f5b232]`}
              >
                <span className="text-2xl">📞</span>
                <span className="font-bold text-sm">{t('Call Sachin', 'सचिनला कॉल करा')}</span>
                <span className="text-[#f5b232] text-xs">{siteConfig.phones.sachin.display}</span>
              </a>
            </motion.div>
          </div>

          {/* Enquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-[#6e2a42]/10"
          >
            <h3 className={`font-playfair font-bold text-[#6e2a42] text-2xl mb-6 ${lang === 'mr' ? 'font-mr' : ''}`}>
              {t('Book Your Party 🎊', 'पार्टी बुक करा 🎊')}
            </h3>

            <form onSubmit={handleEnquiry} className="space-y-4" noValidate>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enquiry-name" className={`text-xs font-semibold text-[#6e2a42] uppercase tracking-wider ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {t('Name *', 'नाव *')}
                  </label>
                  <input
                    id="enquiry-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 w-full border border-[#6e2a42]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#6e2a42] text-[#4a1a2c]"
                    placeholder={t('Your name', 'तुमचे नाव')}
                  />
                </div>
                <div>
                  <label htmlFor="enquiry-phone" className={`text-xs font-semibold text-[#6e2a42] uppercase tracking-wider ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {t('Phone *', 'फोन *')}
                  </label>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 w-full border border-[#6e2a42]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#6e2a42] text-[#4a1a2c]"
                    placeholder="9XXXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="enquiry-event" className={`text-xs font-semibold text-[#6e2a42] uppercase tracking-wider ${lang === 'mr' ? 'font-mr' : ''}`}>
                  {t('Event Type *', 'कार्यक्रम प्रकार *')}
                </label>
                <select
                  id="enquiry-event"
                  name="event"
                  required
                  value={form.event}
                  onChange={handleChange}
                  className="mt-1 w-full border border-[#6e2a42]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#6e2a42] text-[#4a1a2c] bg-white"
                >
                  <option value="">{t('Select event type', 'कार्यक्रम निवडा')}</option>
                  {eventTypes.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enquiry-date" className={`text-xs font-semibold text-[#6e2a42] uppercase tracking-wider ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {t('Date', 'दिनांक')}
                  </label>
                  <input
                    id="enquiry-date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="mt-1 w-full border border-[#6e2a42]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#6e2a42] text-[#4a1a2c]"
                  />
                </div>
                <div>
                  <label htmlFor="enquiry-guests" className={`text-xs font-semibold text-[#6e2a42] uppercase tracking-wider ${lang === 'mr' ? 'font-mr' : ''}`}>
                    {t('Guests', 'पाहुणे')}
                  </label>
                  <input
                    id="enquiry-guests"
                    name="guests"
                    type="number"
                    min={1}
                    value={form.guests}
                    onChange={handleChange}
                    className="mt-1 w-full border border-[#6e2a42]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#6e2a42] text-[#4a1a2c]"
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="enquiry-message" className={`text-xs font-semibold text-[#6e2a42] uppercase tracking-wider ${lang === 'mr' ? 'font-mr' : ''}`}>
                  {t('Message (optional)', 'संदेश (ऐच्छिक)')}
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1 w-full border border-[#6e2a42]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#6e2a42] text-[#4a1a2c] resize-none"
                  placeholder={t('Any special requirements...', 'कोणत्याही विशेष गरजा...')}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className={lang === 'mr' ? 'font-mr' : ''}>
                  {t('Send Enquiry on WhatsApp', 'व्हाट्सॲपवर चौकशी पाठवा')}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
