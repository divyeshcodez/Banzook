import React from 'react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  {
    id: 1,
    name: 'OVERSIZED GRAPHIC TEE',
    price: '$65',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'HEAVYWEIGHT HOODIE',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'SIGNATURE STREETWEAR TEE',
    price: '$55',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80',
  }
];

export const FeaturedDrop: React.FC<{ onViewPiece: () => void }> = ({ onViewPiece }) => {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black font-condensed uppercase tracking-tighter mb-2">
            DROP 01 —<br/>BUILT DIFFERENT
          </h2>
        </div>
        <button onClick={onViewPiece} className="text-sm font-bold tracking-widest uppercase hover:text-[#FF4D1A] transition-colors flex items-center gap-2 group border-b border-black pb-1">
          VIEW ALL PIECES <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRODUCTS.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group cursor-pointer flex flex-col"
            onClick={onViewPiece}
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-6 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-110"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-bold uppercase tracking-tight text-lg leading-tight group-hover:text-[#FF4D1A] transition-colors">{product.name}</h3>
              <span className="font-mono text-sm text-gray-500">{product.price}</span>
            </div>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                 VIEW PIECE <span>→</span>
               </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
