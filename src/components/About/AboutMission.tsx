import React from 'react';
import { motion } from 'motion/react';

export const AboutMission: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F4F1] border-b border-[#111111]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left: Portrait Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-md mx-auto md:mx-0"
          >
            <div className="aspect-[3/4] rounded-[24px] overflow-hidden border border-[#111111]">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" 
                alt="Banzook lifestyle candid" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Mission Copy */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              hidden: { opacity: 0 }
            }}
            className="flex flex-col space-y-8"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="font-display font-extrabold text-[#111111] text-4xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.02em] leading-[0.95]"
            >
              WHAT WE<br />STAND FOR
            </motion.h2>
            
            <div className="space-y-6 text-[#111111] text-base md:text-lg leading-relaxed font-sans max-w-lg">
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                Banzook is a clothing brand built for how people actually move through their day. We're on a mission to make quality basics that don't ask you to choose between comfort and style. We believe everyone should have a wardrobe that fits their life beyond the hanger — from what you wear to work, to what you throw on for a flight, to what you sleep in.
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                The rigid seasonal cycles of fast fashion have been overdue for a rethink. Banzook offers a solution: fewer, better pieces designed to be mixed, layered, and worn for years — not one season. Our entire collection is designed around versatility, celebrating personal style over trend-chasing.
              </motion.p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
