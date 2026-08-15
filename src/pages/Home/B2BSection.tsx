import React from 'react';
import { motion } from 'framer-motion';

interface B2BSectionProps {
  onNavigateToB2B: () => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ onNavigateToB2B }) => {
  return (
    <section className="bg-[#0B0B0C] text-white py-24 md:py-32 w-full relative overflow-hidden flex flex-col items-center border-t border-[rgba(255,255,255,0.08)]">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black uppercase mb-6"
          style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.02em', color: '#F4F0E8' }}
        >
          Bulk Orders & B2B
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-[#8A8577] max-w-2xl mx-auto mb-10"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Premium apparel for businesses, brands, colleges, events, teams, and organizations. Start customizing your bulk order today with our easy-to-use configurator.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button 
            onClick={onNavigateToB2B}
            className="group relative px-8 py-4 bg-[#FF4D1A] text-[#0B0B0D] uppercase font-bold text-sm tracking-widest overflow-hidden transition-transform hover:scale-105"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <div className="absolute inset-0 bg-[#F4F0E8] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative z-10 group-hover:text-[#FF4D1A] transition-colors duration-300">Start Your Bulk Order</span>
          </button>
        </motion.div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF4D1A] opacity-[0.03] rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};
