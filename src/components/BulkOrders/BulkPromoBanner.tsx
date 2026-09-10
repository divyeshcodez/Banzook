import React from 'react';
import { ArrowRight } from 'lucide-react';

export const BulkPromoBanner: React.FC = () => {
  return (
    <div className="w-full border-b border-[#111111] bg-[#111111] relative overflow-hidden group">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=2000&q=80" 
          alt="Bulk Promo Background" 
          className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
        />
      </div>

      <div className="relative z-10 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 flex flex-col items-start justify-end min-h-[500px]">
        
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-[#F5F4F1] text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter mb-4">
            BUILD YOUR DREAM BUNDLE
          </h2>
          <p className="font-mono-banzook font-bold text-[#FFD166] text-xl md:text-2xl uppercase tracking-widest mb-10">
            15% OFF 3+ ITEMS
          </p>

          <div className="flex items-center gap-4">
            <button className="bg-[#F5F4F1] text-[#111111] hover:bg-white hover:scale-105 transition-all duration-300 font-display font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full">
              GET STARTED
            </button>
            <button className="bg-[#F5F4F1] text-[#111111] hover:bg-white hover:scale-105 transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
