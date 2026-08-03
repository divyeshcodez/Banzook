import React from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    id: 1,
    title: 'T-SHIRTS',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'HOODIES',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'ESSENTIALS',
    image: 'https://images.unsplash.com/photo-1489987707023-af816086bb5e?auto=format&fit=crop&q=80',
  }
];

export const ShopByCategory: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-black font-condensed uppercase tracking-tighter">
          SHOP BY CATEGORY
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[70vh] min-h-[500px]">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative group rounded-3xl overflow-hidden cursor-pointer bg-gray-200"
          >
            <img 
              src={cat.image} 
              alt={cat.title} 
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-75 group-hover:brightness-50"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
               <h3 className="text-white text-3xl md:text-4xl font-black font-condensed uppercase tracking-tighter mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">
                 {cat.title}
               </h3>
               <span className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                 SHOP NOW <span>→</span>
               </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
