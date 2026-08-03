import React from 'react';
import { motion } from 'framer-motion';

export const FinalCTA: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  return (
    <section className="py-32 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-h-[50vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black font-condensed uppercase tracking-tighter mb-12">
          YOUR STYLE.<br />
          <span className="text-gray-400">YOUR RULES.</span>
        </h2>
        <button 
          onClick={onExploreClick}
          className="bg-[#111111] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FF4D1A] hover:scale-105 transition-all duration-300 shadow-xl"
        >
          EXPLORE THE DROP →
        </button>
      </motion.div>
    </section>
  );
};
