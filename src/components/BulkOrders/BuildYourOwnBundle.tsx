import React from 'react';
import { ArrowRight } from 'lucide-react';

export const BuildYourOwnBundle: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F4F1] border-b border-[#111111] py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
        
        {/* Left: Text Content */}
        <div className="flex flex-col items-start gap-6 max-w-lg">
          <h2 className="font-display font-extrabold text-[#111111] text-5xl md:text-6xl uppercase leading-[0.9] tracking-tighter">
            BUILD YOUR<br/>OWN BUNDLE
          </h2>
          <p className="font-mono-banzook text-[#666660] text-sm md:text-base leading-relaxed">
            Buy 3+ full-size items and automatically save <span className="font-bold text-[#A35843]">15%</span> at checkout. Mix and match across all categories to create your perfect rotation.
          </p>
          <button className="mt-4 flex items-center gap-3 bg-white text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-[#F5F4F1] transition-all duration-300 font-display font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full group">
            <span>LET'S BUILD</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right: Blob Image */}
        <div className="w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-[500px] aspect-square group">
            {/* Outline decorative blob */}
            <div 
              className="absolute inset-0 border border-[#111111] translate-x-4 translate-y-4 transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6"
              style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
            />
            {/* Main image blob */}
            <div 
              className="absolute inset-0 overflow-hidden bg-white z-10 transition-transform duration-700 group-hover:-translate-y-2 group-hover:-translate-x-2"
              style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=1000&q=80" 
                alt="Build your own bundle flatlay" 
                className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Secondary floating element */}
            <div className="absolute -bottom-4 -left-8 w-24 h-24 z-20 border border-[#111111] overflow-hidden bg-[#F5F4F1] animate-[spin_20s_linear_infinite]"
                 style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}>
              <img 
                src="https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=300&q=80" 
                alt="Tag" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
