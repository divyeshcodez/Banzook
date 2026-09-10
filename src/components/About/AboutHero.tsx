import React from 'react';
import { motion } from 'motion/react';

export const AboutHero: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F4F1] border-b border-[#111111] overflow-hidden">
      
      {/* 1. Hero statement */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display font-extrabold text-[#111111] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.95] max-w-[90%]"
        >
          We make clothes<br />to live in
        </motion.h1>
      </div>

      {/* 2. Full-width lifestyle/product banner image with annotations */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-200 overflow-hidden border-t border-[#111111]">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=2400&q=80" 
          alt="Banzook garments flatlay" 
          className="w-full h-full object-cover grayscale-[10%]"
        />
        
        {/* Overlay Annotations */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
          
          {/* Annotation 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-[20%] left-[15%]"
          >
            <div className="relative">
              <div className="absolute top-1/2 -right-16 w-16 h-[1px] bg-[#111111]"></div>
              <div className="absolute top-1/2 -right-16 w-1.5 h-1.5 rounded-full bg-[#111111] -translate-y-1/2"></div>
              <span className="bg-white/80 backdrop-blur-md px-2 py-1 text-[10px] font-mono-banzook uppercase font-bold text-[#111111] border border-[#111111]">
                MACHINE WASH OR HAND WASH
              </span>
            </div>
          </motion.div>

          {/* Annotation 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-[30%] left-[25%]"
          >
            <div className="relative">
              <div className="absolute -top-12 left-1/2 w-[1px] h-12 bg-[#111111]"></div>
              <div className="absolute -top-12 left-1/2 w-1.5 h-1.5 rounded-full bg-[#111111] -translate-x-1/2"></div>
              <span className="bg-white/80 backdrop-blur-md px-2 py-1 text-[10px] font-mono-banzook uppercase font-bold text-[#111111] border border-[#111111]">
                USE LESS DETERGENT
              </span>
            </div>
          </motion.div>

          {/* Annotation 3 */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute top-[40%] right-[30%]"
          >
            <div className="relative">
              <div className="absolute -bottom-16 left-1/2 w-[1px] h-16 bg-[#111111]"></div>
              <div className="absolute -bottom-16 left-1/2 w-1.5 h-1.5 rounded-full bg-[#111111] -translate-x-1/2"></div>
              <span className="bg-white/80 backdrop-blur-md px-2 py-1 text-[10px] font-mono-banzook uppercase font-bold text-[#111111] border border-[#111111]">
                MADE TO LAST
              </span>
            </div>
          </motion.div>

          {/* Annotation 4 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="absolute bottom-[20%] right-[10%]"
          >
            <div className="relative">
              <div className="absolute top-1/2 -left-20 w-20 h-[1px] bg-[#111111]"></div>
              <div className="absolute top-1/2 -left-20 w-1.5 h-1.5 rounded-full bg-[#111111] -translate-y-1/2"></div>
              <span className="bg-white/80 backdrop-blur-md px-2 py-1 text-[10px] font-mono-banzook uppercase font-bold text-[#111111] border border-[#111111]">
                RECYCLABLE PACKAGING
              </span>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
};
