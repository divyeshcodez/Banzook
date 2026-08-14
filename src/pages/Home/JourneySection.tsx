import React from 'react';
import { ChevronRight } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    step: '01',
    category: 'CONCEPT',
    title: 'THE ARCHITECT',
    subtitle: 'RAW MATERIALS & IDEATION',
    quote: 'We don\'t follow trends, we build foundations.',
    bubble: 'Initial sketches from the Tokyo studio',
    image: '/images/model_brokensystem.png',
    productId: 1,
  },
  {
    step: '02',
    category: 'FABRIC',
    title: '500 GSM',
    subtitle: 'CUSTOM MILLED TERRY',
    quote: 'Weight is the ultimate luxury.',
    bubble: 'Sourced directly from Okayama',
    image: '/images/model_hotwheels.jpg',
    productId: null,
  },
  {
    step: '03',
    category: 'PATTERN',
    title: 'THE CUT',
    subtitle: 'ENGINEERED PROPORTIONS',
    quote: 'Every seam serves a purpose.',
    bubble: 'Drop shoulder, cropped body. The signature fit.',
    image: '/images/model_kindmind.png',
    productId: 3,
  },
  {
    step: '04',
    category: 'PROCESS',
    title: 'WASH & DYE',
    subtitle: 'ENZYME TREATMENT',
    quote: 'Aged to perfection before day one.',
    bubble: 'Vintage wash formula #04',
    image: '/images/model_legends.png',
    productId: null,
  },
  {
    step: '05',
    category: 'DELIVERY',
    title: 'THE DROP',
    subtitle: 'SEALED IN WAX PARCHMENT PAPER',
    quote: 'Limited to 500 units globally!',
    bubble: 'Hand numbered certificate included',
    image: '/images/model_nosmoking_front.jpg',
    productId: 2,
  }
];

export const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="bg-[#080808] text-white py-24 md:py-40 px-6 md:px-12 lg:px-8 overflow-hidden relative w-full">
      
      {/* Background Texture (Subtle) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`
        }}
      />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-40">
          <div className="flex items-center gap-2 text-[#FF4B1F] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6">
            FROM CONCEPT TO CREATION
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[100px] font-condensed font-black tracking-normal uppercase text-white mb-6 leading-none">
            THE <span className="text-[#FF4B1F] drop-shadow-[0_0_15px_rgba(255,75,31,0.2)]">JOURNEY.</span>
          </h2>
          <p className="text-[#A39E98] text-sm md:text-base lg:text-lg tracking-wide max-w-lg leading-relaxed">
            From concept to creation. Explore the journey behind every BANZOOK piece.
          </p>
        </div>

        {/* Vertical Editorial Flow */}
        <div className="flex flex-col gap-32 md:gap-52 lg:gap-64">
          {JOURNEY_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-16 lg:gap-24 w-full`}
              >
                
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative group">
                  <div className="relative rounded-[24px] overflow-hidden w-full bg-[#111] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]" style={{ aspectRatio: '4/5' }}>
                    <img
                      src={step.image}
                      alt={step.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05] grayscale-[0.2] group-hover:grayscale-0 will-change-transform"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 border border-white/5 rounded-[24px] pointer-events-none z-10" />
                  </div>
                  
                  {/* Handwritten Bubble */}
                  <div className={`absolute ${isEven ? '-right-4 md:-right-8' : '-left-4 md:-left-8'} top-12 bg-[#F4F0E8] text-black text-[10px] md:text-xs px-4 py-2.5 rounded-lg border border-black/10 shadow-[4px_6px_0px_0px_rgba(255,75,31,0.9)] z-20 transform ${isEven ? 'rotate-[4deg]' : '-rotate-[4deg]'} font-mono font-bold max-w-[160px] md:max-w-[200px] text-center leading-tight transition-transform duration-300 group-hover:scale-105`}>
                    "{step.bubble}"
                  </div>
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-1/2 flex flex-col justify-center ${isEven ? 'md:items-start text-left' : 'md:items-end text-left md:text-right'}`}>
                  
                  <div className="mb-8 md:mb-12">
                    <span className="text-[#FF4B1F] text-[10px] font-bold tracking-[0.25em] uppercase border border-[#FF4B1F]/30 px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(255,75,31,0.1)]">
                      STEP {step.step} // {step.category}
                    </span>
                  </div>
                  
                  <h3 className="text-5xl md:text-6xl lg:text-8xl font-black text-white font-condensed tracking-normal mb-4 uppercase leading-none drop-shadow-xl">
                    {step.title}
                  </h3>
                  
                  <p className="text-[#FF4B1F] text-sm md:text-base font-bold tracking-[0.2em] uppercase leading-relaxed mb-8">
                    {step.subtitle}
                  </p>
                  
                  <p className="text-[#A39E98] text-lg md:text-xl lg:text-2xl font-serif italic font-medium leading-relaxed max-w-md">
                    "{step.quote}"
                  </p>
                  
                  <button 
                    onClick={() => {
                      const targetId = step.productId ? `product-${step.productId}` : 'shop-collection';
                      const element = document.getElementById(targetId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        if (step.productId) {
                          element.style.transition = 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out';
                          element.style.boxShadow = '0 0 0 2px #FF4B1F, 0 0 40px rgba(255, 75, 31, 0.4)';
                          element.style.transform = 'scale(1.02)';
                          setTimeout(() => {
                            element.style.boxShadow = '';
                            element.style.transform = '';
                          }, 1500);
                        }
                      }
                    }}
                    className={`mt-12 group flex items-center justify-center gap-4 bg-transparent transition-all duration-300 ${isEven ? '' : 'flex-row-reverse'}`}
                  >
                    <span className="text-white group-hover:text-[#FF4B1F] text-xs font-bold tracking-widest uppercase transition-colors">Explore Piece</span>
                    <div className="w-10 h-10 rounded-full border border-[#2A2A27] bg-[#161616] flex items-center justify-center text-white group-hover:border-[#FF4B1F] group-hover:text-[#FF4B1F] group-hover:shadow-[0_0_15px_rgba(255,75,31,0.3)] transition-all duration-300">
                      <ChevronRight size={18} strokeWidth={2.5} className={isEven ? '' : 'rotate-180'} />
                    </div>
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
