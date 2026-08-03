import React from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    id: 1,
    title: 'T-SHIRTS',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'HOODIES',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'ESSENTIALS',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80',
  }
];

export const ShopByCategory: React.FC = () => {
  return (
    <section className="w-full bg-[#0B0B0C] py-24 md:py-32 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <h2 
            className="text-4xl md:text-5xl uppercase tracking-tighter text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((category, idx) => (
            <motion.a
              href={`#${category.title.toLowerCase()}`}
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[4px] cursor-pointer"
            >
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              
              {/* Subtle Dark Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
              
              {/* Text Content at Bottom */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end transform transition-transform duration-500">
                <h3 
                  className="text-4xl md:text-5xl uppercase text-white mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
                >
                  {category.title}
                </h3>
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-white group-hover:text-[#FF4D1A] transition-colors flex items-center gap-2">
                  SHOP NOW <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
