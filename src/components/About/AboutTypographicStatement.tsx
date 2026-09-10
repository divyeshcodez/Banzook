import React from 'react';
import { motion } from 'motion/react';

export const AboutTypographicStatement: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="w-full bg-[#F5F4F1] border-b border-[#111111] overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
        
        {/* Large Typographic Block */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center justify-center text-center font-display font-extrabold text-[#111111] text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-[0.85] tracking-tight uppercase select-none"
        >
          
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8">
            <motion.span variants={itemVariants}>WE</motion.span>
            <motion.span variants={itemVariants}>DESIGN</motion.span>
            <motion.div variants={itemVariants} className="relative inline-block w-24 h-32 md:w-40 md:h-56 mx-2 -rotate-6 z-10 transition-transform hover:rotate-0 duration-500">
              <img 
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80" 
                alt="Garment on hanger" 
                className="w-full h-full object-cover rounded-[16px] border border-[#111111]"
              />
            </motion.div>
            <motion.span variants={itemVariants}>WITH</motion.span>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 mt-2 md:mt-6">
            <motion.span variants={itemVariants}>INTENT</motion.span>
            <motion.div variants={itemVariants} className="relative inline-block w-20 h-28 md:w-32 md:h-48 mx-2 rotate-3 z-10 transition-transform hover:rotate-0 duration-500">
              <img 
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80" 
                alt="Fabric swatch tag" 
                className="w-full h-full object-cover rounded-[12px] border border-[#111111]"
              />
              <span className="absolute -bottom-6 -right-16 text-[10px] font-mono-banzook text-[#111111] font-bold tracking-widest whitespace-nowrap hidden md:block">
                TO GIVE IT NEW FORM.
              </span>
            </motion.div>
            <motion.span variants={itemVariants}>TO</motion.span>
            <motion.span variants={itemVariants}>GIVE</motion.span>
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 mt-2 md:mt-6">
            <motion.span variants={itemVariants}>IT</motion.span>
            <motion.div variants={itemVariants} className="relative inline-block w-28 h-20 md:w-48 md:h-32 mx-2 -rotate-3 z-10 transition-transform hover:rotate-0 duration-500">
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80" 
                alt="Folded shirt stack" 
                className="w-full h-full object-cover rounded-[16px] border border-[#111111]"
              />
            </motion.div>
            <motion.span variants={itemVariants}>NEW</motion.span>
            <motion.span variants={itemVariants}>FORM</motion.span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
