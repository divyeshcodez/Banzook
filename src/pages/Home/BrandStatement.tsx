import React from 'react';
import { motion } from 'framer-motion';

export const BrandStatement: React.FC = () => {
  return (
    <section className="py-32 px-4 md:px-8 lg:px-12 flex justify-center items-center overflow-hidden bg-[#111111] text-[#F8F7F5] rounded-[3rem] mx-4 md:mx-8 lg:mx-12 my-12">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl text-center"
      >
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black font-condensed uppercase tracking-tighter leading-[0.9] text-center">
          BANZOOK IS NOT MADE<br />
          <span className="text-[#FF4D1A] italic pr-2">TO FIT IN.</span><br />
          IT IS MADE TO<br />
          STAND OUT.
        </h2>
      </motion.div>
    </section>
  );
};
