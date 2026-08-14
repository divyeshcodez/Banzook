import React from 'react';
import { Truck, Sparkles, ShieldCheck, RefreshCcw } from 'lucide-react';

export const GridHeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#080808] flex flex-col justify-between items-center text-white overflow-hidden min-h-screen">
      
      {/* Background Graffiti / Texture (Subtle) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`
        }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-5 flex flex-col justify-around items-center overflow-hidden z-0">
         {/* Subtle background text as graffiti */}
         <div className="text-[14vw] font-black font-condensed tracking-normal text-white transform -rotate-12 translate-x-1/2 opacity-10 select-none">BUILT DIFFERENT</div>
         <div className="text-[14vw] font-black font-condensed tracking-normal text-white transform rotate-6 -translate-x-1/3 opacity-10 select-none" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>CREATE STATEMENTS</div>
         <div className="text-[16vw] font-black font-condensed tracking-normal text-[#FF4B1F] transform -rotate-6 translate-x-1/4 opacity-10 select-none">BANZOOK</div>
      </div>

      {/* Main Hero Content - Perfectly Centered Block */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center px-4 pt-32 pb-16 min-h-[80vh]">
        
        {/* The Text Block (Left aligned internally, centered externally) */}
        <div className="flex flex-col items-start font-black text-white font-condensed text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] tracking-normal uppercase relative z-10">
          
          {/* WE DON'T CHASE */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <span>WE DON'T&nbsp;</span>
            <div className="relative inline-block mt-2 md:mt-0">
              <span className="relative z-10 text-[#FF4B1F] block drop-shadow-[0_0_15px_rgba(255,75,31,0.4)]">CHASE</span>
            </div>
          </div>

          {/* TRENDS. */}
          <div className="mt-2 md:mt-3 text-transparent" style={{ WebkitTextStroke: 'clamp(1px, 0.2vw, 2px) white' }}>
            TRENDS.
          </div>

          {/* WE CREATE */}
          <div className="mt-2 md:mt-3 text-white">
            WE CREATE
          </div>

          {/* STATEMENTS. */}
          <div className="relative mt-2 md:mt-3 text-[#FF4B1F] flex items-center drop-shadow-[0_0_15px_rgba(255,75,31,0.4)]">
            STATEMENTS.
            {/* Orange Arrow Graphic */}
            <div className="absolute -right-6 md:-right-16 top-[-30%] w-[50px] md:w-[80px] text-[#FF4B1F] hidden md:block opacity-90 drop-shadow-none">
              <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto transform rotate-[15deg]">
                <path d="M2 15C15 5 40 2 55 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M45 25L55 25L50 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

        </div>

        {/* Supporting Text */}
        <p className="mt-12 md:mt-16 text-[#A39E98] text-sm md:text-base lg:text-lg font-medium tracking-wide text-center max-w-sm md:max-w-md mx-auto leading-relaxed relative z-10">
          Streetwear that speaks your mindset.<br/>
          Designed to stand out. Built to last.
        </p>

        {/* CTA Button */}
        <button className="mt-12 md:mt-16 relative z-10 group flex items-center justify-center gap-5 border-[1.5px] border-[#FF4B1F] bg-transparent rounded-[32px] px-10 py-4 shadow-[0_0_8px_rgba(255,75,31,0.2)] hover:bg-[#FF4B1F] hover:shadow-[0_0_15px_rgba(255,75,31,0.35)] transition-all duration-300">
          <span className="text-[#FF4B1F] group-hover:text-black font-black font-condensed tracking-[0.25em] text-sm uppercase transition-colors">SHOP NOW</span>
          <span className="text-[#FF4B1F] group-hover:text-black text-lg transition-transform group-hover:translate-x-1.5 leading-none mt-[-2px]">→</span>
        </button>

      </div>

      {/* Feature Strip - Pushed to Bottom */}
      <div className="w-full border-t border-[rgba(255,255,255,0.1)] bg-[#0B0B0C] relative z-20 mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x-0 md:divide-x divide-[rgba(255,255,255,0.1)]">
            
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:px-6">
              <div className="text-[#FF4D1A] shrink-0">
                <Truck size={28} strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-white font-bold text-xs md:text-sm tracking-wider uppercase mb-1">FREE SHIPPING</h4>
                <p className="text-gray-400 text-[10px] md:text-xs font-medium">Above ₹2,999</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:px-6">
              <div className="text-[#FF4D1A] shrink-0">
                <Sparkles size={28} strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-white font-bold text-xs md:text-sm tracking-wider uppercase mb-1">LIMITED EDITION</h4>
                <p className="text-gray-400 text-[10px] md:text-xs font-medium">New Drops Only</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:px-6">
              <div className="text-[#FF4D1A] shrink-0">
                <ShieldCheck size={28} strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-white font-bold text-xs md:text-sm tracking-wider uppercase mb-1">PREMIUM QUALITY</h4>
                <p className="text-gray-400 text-[10px] md:text-xs font-medium">Built To Last</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:px-6">
              <div className="text-[#FF4D1A] shrink-0">
                <RefreshCcw size={28} strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-white font-bold text-xs md:text-sm tracking-wider uppercase mb-1">EASY RETURNS</h4>
                <p className="text-gray-400 text-[10px] md:text-xs font-medium">Hassle Free</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </section>
  );
};
