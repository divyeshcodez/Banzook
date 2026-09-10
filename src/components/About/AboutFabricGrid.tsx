import React from 'react';
import { motion } from 'motion/react';

const FABRICS = [
  { id: 1, name: 'Heavyweight Tee', tag: 'BEST SELLER', desc: 'SOFT, STRUCTURED, EVERYDAY.', comp: '100% Organic Cotton', color: 'bg-neutral-300' },
  { id: 2, name: 'Relaxed Hoodie', tag: '+ NEW', desc: 'LOOSE FIT, BRUSHED INTERIOR.', comp: 'Cotton + Recycled Poly', color: 'bg-[#1D3557]/20' },
  { id: 3, name: 'Structured Jacket', tag: null, desc: 'DURABLE TWILL, LIGHT WASH.', comp: '100% Cotton Twill', color: 'bg-amber-900/20' },
  { id: 4, name: 'Wide-Leg Pant', tag: null, desc: 'RELAXED DRAPE, MID-WEIGHT.', comp: 'Cotton + Elastane', color: 'bg-stone-400' },
  { id: 5, name: 'Everyday Crew', tag: 'BEST SELLER', desc: 'CLASSIC FIT, LOOPBACK FRENCH TERRY.', comp: '100% Cotton', color: 'bg-slate-300' },
  { id: 6, name: 'Cropped Fleece', tag: null, desc: 'BOXY, ULTRA-SOFT FLEECE.', comp: 'Organic Cotton + Modal', color: 'bg-rose-900/10' },
  { id: 7, name: 'Utility Pant', tag: '+ NEW', desc: 'WORKWEAR INSPIRED, TOUGH.', comp: 'Cotton Canvas', color: 'bg-emerald-900/10' },
  { id: 8, name: 'Signature Zip-Up', tag: null, desc: 'PERFECT LAYERING PIECE.', comp: 'Cotton + Elastane', color: 'bg-zinc-800/10' },
  { id: 9, name: 'Core Long Sleeve', tag: null, desc: 'BREATHABLE, SECOND-SKIN FEEL.', comp: 'Pima Cotton', color: 'bg-orange-900/10' },
];

export const AboutFabricGrid: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F4F1] py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[-0.02em]">
            THE BANZOOK FABRIC LINEUP
          </h2>
        </motion.div>

        {/* 3-Column Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            hidden: { opacity: 0 }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FABRICS.map((fabric) => (
            <motion.div 
              key={fabric.id}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
              }}
              className="relative p-6 bg-white border border-dashed border-[#111111] rounded-[16px] flex flex-col gap-4"
            >
              
              {/* Header: Dot + Name + Tag */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full blur-[2px] ${fabric.color}`}></div>
                  <h3 className="font-display font-bold text-[#111111] text-lg leading-none mt-1">
                    {fabric.name}
                  </h3>
                </div>
                {fabric.tag && (
                  <span className="bg-[#1D3557]/10 text-[#1D3557] px-2 py-0.5 rounded-full text-[9px] font-mono-banzook font-bold uppercase tracking-widest mt-1">
                    {fabric.tag}
                  </span>
                )}
              </div>

              {/* Descriptor & Composition */}
              <div className="flex flex-col gap-1 mt-2">
                <p className="font-mono-banzook text-[#111111] text-xs font-bold italic uppercase tracking-wider">
                  {fabric.desc}
                </p>
                <p className="font-mono-banzook text-[#666660] text-[10px] uppercase tracking-widest mt-2 border-t border-[#111111]/10 pt-3">
                  {fabric.comp}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
