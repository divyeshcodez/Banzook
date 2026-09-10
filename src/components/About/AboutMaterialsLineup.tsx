import React from 'react';
import { motion } from 'motion/react';

export const AboutMaterialsLineup: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F4F1] border-b border-[#111111] py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-neutral-200 rounded-[24px] overflow-hidden border border-[#111111]">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=2400&q=80" 
            alt="Banzook materials scattered" 
            className="w-full h-full object-cover grayscale-[10%]"
          />
          
          {/* Overlay Annotations */}
          <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
            
            {/* Annotation 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute top-[25%] left-[20%]"
            >
              <div className="relative">
                <div className="absolute top-1/2 -right-16 w-16 h-[1px] bg-[#111111]"></div>
                <div className="absolute top-1/2 -right-16 w-1.5 h-1.5 rounded-full bg-[#1D3557] -translate-y-1/2"></div>
                <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono-banzook uppercase font-bold text-[#111111] border border-[#111111] rounded-full shadow-sm">
                  ORGANIC COTTON
                </span>
              </div>
            </motion.div>

            {/* Annotation 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-[25%] left-[35%]"
            >
              <div className="relative">
                <div className="absolute -top-12 left-1/2 w-[1px] h-12 bg-[#111111]"></div>
                <div className="absolute -top-12 left-1/2 w-1.5 h-1.5 rounded-full bg-[#1D3557] -translate-x-1/2"></div>
                <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono-banzook uppercase font-bold text-[#111111] border border-[#111111] rounded-full shadow-sm">
                  BIODEGRADABLE PACKAGING
                </span>
              </div>
            </motion.div>

            {/* Annotation 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute top-[35%] right-[35%]"
            >
              <div className="relative">
                <div className="absolute -bottom-16 left-1/2 w-[1px] h-16 bg-[#111111]"></div>
                <div className="absolute -bottom-16 left-1/2 w-1.5 h-1.5 rounded-full bg-[#1D3557] -translate-x-1/2"></div>
                <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono-banzook uppercase font-bold text-[#111111] border border-[#111111] rounded-full shadow-sm">
                  LOW-IMPACT DYES
                </span>
              </div>
            </motion.div>

            {/* Annotation 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute bottom-[30%] right-[15%]"
            >
              <div className="relative">
                <div className="absolute top-1/2 -left-20 w-20 h-[1px] bg-[#111111]"></div>
                <div className="absolute top-1/2 -left-20 w-1.5 h-1.5 rounded-full bg-[#1D3557] -translate-y-1/2"></div>
                <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono-banzook uppercase font-bold text-[#111111] border border-[#111111] rounded-full shadow-sm">
                  BUILT TO LAST
                </span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
