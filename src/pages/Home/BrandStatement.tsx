import React from 'react';
import { motion } from 'framer-motion';

export const BrandStatement: React.FC = () => {
  return (
    <section className="w-full bg-[#F3F0EA] text-[#111111] py-32 md:py-48 flex items-center justify-center px-4 md:px-8 text-center relative overflow-hidden">
      
      {/* Subtle Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <h2 
          className="text-6xl md:text-[8vw] lg:text-[120px] leading-[0.85] font-normal uppercase tracking-tight text-[#111111]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          WE DON'T FOLLOW THE CULTURE.<br/>
          WE HELP <span className="text-[#FF4D1A] relative inline-block">CREATE<div className="absolute -bottom-2 left-0 w-full h-[4px] bg-[#FF4D1A]" /></span> IT.
        </h2>
      </motion.div>
    </section>
  );
};
