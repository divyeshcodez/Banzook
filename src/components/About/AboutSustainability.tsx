import React from 'react';
import { motion } from 'motion/react';

export const AboutSustainability: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F4F1] border-b border-[#111111]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left: Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              hidden: { opacity: 0 }
            }}
            className="flex flex-col space-y-12 order-2 md:order-1"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
              className="font-mono-banzook font-bold text-[#111111] text-sm md:text-base uppercase tracking-widest text-left md:text-right leading-loose"
            >
              THE ONLY<br />
              THOUGHTFULLY-MADE<br />
              CLOTHING BRAND
            </motion.h2>
            
            <div className="space-y-10 text-[#111111] text-sm md:text-base leading-relaxed font-sans md:ml-auto md:max-w-md">
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
                className="space-y-3"
              >
                <h3 className="font-mono-banzook font-bold text-xs uppercase tracking-widest text-[#1D3557]">
                  MATERIALS
                </h3>
                <p>
                  All of our garments are made with responsibly-sourced, breathable fabrics. They're built to last, with construction that holds up to real wear and repeated washing.
                </p>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
                className="space-y-3"
              >
                <h3 className="font-mono-banzook font-bold text-xs uppercase tracking-widest text-[#1D3557]">
                  CARBON NEUTRAL
                </h3>
                <p>
                  Our manufacturing and warehousing facilities are certified carbon-neutral through verified carbon offsets, funding projects like reforestation and renewable energy to reduce our footprint.
                </p>
              </motion.div>

            </div>
          </motion.div>

          {/* Right: Soft Rounded Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-lg mx-auto md:mx-0 order-1 md:order-2"
          >
            <div className="aspect-square rounded-[24px] overflow-hidden bg-white border border-[#111111]">
              <img 
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" 
                alt="Natural material details flatlay" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
