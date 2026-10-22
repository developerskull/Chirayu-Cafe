'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';

const galleryItems = [
  { id: 1, src: '/images/gallery/Food1.jpeg', alt: 'Chirayu Cafe Food', category: 'Food' },
  { id: 2, src: '/images/gallery/Food2.jpeg', alt: 'Chirayu Cafe Food', category: 'Food' },
  { id: 3, src: '/images/gallery/Food3.jpeg', alt: 'Chirayu Cafe Food', category: 'Food' },
  { id: 4, src: '/images/gallery/drinks.jpeg', alt: 'Chirayu Cafe Drinks', category: 'Drinks' },
  { id: 5, src: '/images/gallery/celebration1.jpeg', alt: 'Celebration at Chirayu Cafe', category: 'Celebrations' },
  { id: 6, src: '/images/gallery/Celebration2.jpeg', alt: 'Celebration at Chirayu Cafe', category: 'Celebrations' },
  { id: 7, src: '/images/gallery/Decoration1.jpeg', alt: 'Decoration at Chirayu Cafe', category: 'Decorations' },
  { id: 8, src: '/images/gallery/ambiance.jpeg', alt: 'Chirayu Cafe Ambiance', category: 'Ambiance' },
  { id: 9 , src: '/images/gallery/cafe.jpeg', alt: 'Chirayu Cafe Ambiance', category: 'Ambiance' },
];

export default function Gallery() {
  const { lang, t } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#4a1a2c]" aria-label="Photo Gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#f5b232] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            {t('Our Space & Creations', 'आमची जागा आणि निर्मिती')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-playfair font-bold text-white text-3xl md:text-4xl lg:text-5xl ${lang === 'mr' ? 'font-mr' : ''}`}
          >
            {t('Gallery', 'गॅलरी')}
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto mt-4">
            <span className="text-[#f5b232]">📸</span>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setLightboxIndex(i)}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl"
                style={{ paddingBottom: i % 3 === 0 ? '75%' : i % 3 === 1 ? '100%' : '60%' }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Category badge */}
                <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {item.category}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-3xl"
              style={{ aspectRatio: '4/3' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].alt}
                fill
                className="object-contain rounded-2xl"
                sizes="90vw"
              />
            </motion.div>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : galleryItems.length - 1));
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white text-2xl rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! < galleryItems.length - 1 ? prev! + 1 : 0));
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white text-2xl rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
