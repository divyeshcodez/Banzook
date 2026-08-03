import React from 'react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  {
    id: 1,
    number: '01',
    name: 'OVERSIZED GRAPHIC TEE',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    number: '02',
    name: 'SIGNATURE HEAVYWEIGHT HOODIE',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    number: '03',
    name: 'ORIGINAL STREET TEE',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80',
  }
];

export const FeaturedDrop: React.FC<{ onViewPiece: () => void }> = ({ onViewPiece }) => {
  return (
    <section className="pt-[110px] pb-[120px] px-4 md:px-8 lg:px-12 w-full max-w-[1400px] mx-auto bg-[#0B0B0C] text-white">
      
      {/* Premium Transition / Section Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/10 pt-16">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF4D1A] block mb-6">
            FEATURED DROP
          </span>
          <h2 
            className="text-4xl md:text-5xl uppercase tracking-tighter text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            DROP 01 — BUILT DIFFERENT
          </h2>
        </div>
      </div>

      {/* Product Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRODUCTS.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group cursor-pointer flex flex-col relative"
            onClick={onViewPiece}
          >
            {/* Product Image */}
            <div className="aspect-[3/4] overflow-hidden bg-[#151515] mb-6 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] filter contrast-110 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-black/20 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col relative h-[60px]">
              <span className="text-[11px] text-white/50 font-mono tracking-widest mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                {product.number} —
              </span>
              <h3 className="font-bold uppercase tracking-widest text-[13px] leading-tight text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#FF4D1A]">
                {product.name}
              </h3>
              
              {/* Hover CTA */}
              <div className="absolute bottom-0 left-0 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                 <span className="text-[10px] font-bold tracking-[0.12em] uppercase flex items-center gap-2 text-white">
                   VIEW PIECE <span className="text-[#FF4D1A] transform group-hover:translate-x-1 transition-transform">→</span>
                 </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
