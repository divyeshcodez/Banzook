import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES = [
  { id: 'tops', label: 'TOPS', src: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80' },
  { id: 'bottoms', label: 'BOTTOMS', src: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80' },
  { id: 'outerwear', label: 'OUTERWEAR', src: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80' },
  { id: 'bundles', label: 'BULK ORDERS', src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80' },
];

export const AboutCategoryTiles: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F4F1] border-b border-[#111111] py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            hidden: { opacity: 0 }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          
          {CATEGORIES.map((cat) => (
            <motion.div 
              key={cat.id} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="group cursor-pointer flex flex-col gap-3"
            >
              <div className="w-full aspect-[4/5] rounded-[16px] overflow-hidden border border-[#111111] bg-white">
                <img 
                  src={cat.src} 
                  alt={cat.label} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[10%]"
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="font-mono-banzook font-bold text-xs uppercase tracking-widest text-[#111111]">
                  {cat.label}
                </span>
                <ArrowRight className="w-4 h-4 text-[#111111] group-hover:text-[#1D3557] group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};
