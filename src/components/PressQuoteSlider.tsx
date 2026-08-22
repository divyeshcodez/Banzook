import React, { useState } from 'react';
import { PRESS_QUOTES } from '../data/storeData';

export const PressQuoteSlider: React.FC = () => {
  const [activeOutletIndex, setActiveOutletIndex] = useState(0);

  const current = PRESS_QUOTES[activeOutletIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center mb-8">
        <span className="text-[11px] font-mono-banzook text-[#A35843] uppercase tracking-widest font-semibold">
          CRITICAL ACCLAIM
        </span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111111] tracking-tight">
          What the Industry Is Saying
        </h2>
      </div>

      <div className="bg-white rounded-[20px] border border-[#111111] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
        
        {/* OUTLET SELECTOR TABS */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-neutral-200 pb-5">
          {PRESS_QUOTES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveOutletIndex(idx)}
              className={`px-4 py-1.5 rounded-full font-display font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-colors cursor-pointer border ${
                activeOutletIndex === idx
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-[#F5F4F1] text-[#666660] border-transparent hover:text-[#111111]'
              }`}
            >
              {item.outlet}
            </button>
          ))}
        </div>

        {/* ACTIVE QUOTE */}
        <blockquote className="font-display font-medium text-lg sm:text-xl md:text-2xl text-[#111111] tracking-tight leading-relaxed max-w-2xl mx-auto min-h-[90px] flex items-center justify-center">
          {current.quote}
        </blockquote>

        {/* ISSUE DETAILS */}
        <div className="text-xs font-mono-banzook text-[#666660] uppercase">
          {current.outlet} — {current.authorOrDate}
        </div>

      </div>

    </section>
  );
};
