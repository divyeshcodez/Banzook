import React from 'react';
import { motion } from 'motion/react';

export const AboutPlayWithFabric: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F4F1] border-b border-[#111111] overflow-hidden py-32 md:py-48 flex justify-center">
      <div className="relative max-w-5xl w-full px-4 sm:px-6 lg:px-8 flex flex-col items-start font-display font-extrabold text-[#111111] leading-[0.8] tracking-tighter uppercase text-[100px] sm:text-[120px] md:text-[140px] lg:text-[160px] select-none">
        
        {/* Row 1: WE + Sneaker + PLAY */}
        <div className="flex w-full justify-between items-end relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
          >
            WE
          </motion.span>
          
          {/* Sneaker Image & Caption */}
          <div className="absolute left-[30%] md:left-[35%] top-[10%] md:top-[15%] w-36 md:w-56 z-0 flex flex-col items-start gap-3 md:gap-4">
            <motion.img 
              src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80" 
              alt="Denim and sneakers" 
              className="w-full h-auto rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
              initial={{ opacity: 0, x: 30, rotate: 20 }}
              whileInView={{ opacity: 1, x: 0, rotate: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            />
            <motion.span 
              className="text-[#111111] font-mono-banzook font-bold text-[10px] md:text-[11px] leading-tight whitespace-nowrap text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            >
              TO GIVE IT<br/>NEW FORM
            </motion.span>
          </div>

          <motion.span 
            className="mr-[5%] md:mr-[10%] relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
          >
            PLAY
          </motion.span>
        </div>
        
        {/* Row 2: WITH */}
        <div className="flex w-full mt-4 md:mt-8 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          >
            WITH
          </motion.span>
        </div>
        
        {/* Row 3: FABRIC & Tee */}
        <div className="flex w-full justify-end mt-16 md:mt-24 relative z-10">
          <div className="relative inline-flex items-center">
            
            {/* Tee Image */}
            <motion.img 
              src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80" 
              alt="Person in black tee" 
              className="absolute -left-[55%] md:-left-[60%] -top-[30%] md:-top-[20%] w-40 md:w-64 h-auto rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] z-0"
              initial={{ opacity: 0, x: -30, rotate: -20 }}
              whileInView={{ opacity: 1, x: 0, rotate: -10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            />

            <motion.span 
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              FABRIC
            </motion.span>

          </div>
        </div>

      </div>
    </section>
  );
};

