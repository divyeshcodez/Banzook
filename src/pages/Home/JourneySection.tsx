import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import removed

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-[#111111] text-white py-20 px-8 md:px-12 lg:px-8 overflow-hidden relative border-t border-b border-[#2A2A27] flex flex-col items-center w-full">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#FF4D1A] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-5">
              FROM CONCEPT TO CREATION
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-condensed font-black tracking-tighter uppercase text-white mb-4">
              THE <span className="text-[#FF4D1A]">JOURNEY.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base tracking-wide max-w-md leading-relaxed">
              From concept to creation. Explore the journey behind every BANZOOK piece.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="hidden md:flex gap-3 shrink-0 mb-2">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 md:w-12 md:h-12 rounded-xl border border-[#2A2A27] bg-[#161616] text-white flex items-center justify-center hover:bg-[#222] transition-transform cursor-pointer shadow-sm hover:shadow-md"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 md:w-12 md:h-12 rounded-xl border border-[#FF4D1A] bg-[#FF4D1A] text-black flex items-center justify-center hover:bg-[#e04316] hover:border-[#e04316] transition-transform cursor-pointer shadow-sm hover:shadow-md"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Cards Scroll Container */}
        <div
          ref={scrollRef}
          className="flex xl:grid xl:grid-cols-5 gap-5 md:gap-7 lg:gap-8 overflow-x-auto pb-12 pt-6 no-scrollbar snap-x snap-mandatory items-stretch w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {JOURNEY_STEPS.map((step, idx) => (
            <div
              key={idx}
              onClick={() => {
                const targetId = step.productId ? `product-${step.productId}` : 'shop-collection';
                const element = document.getElementById(targetId);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  if (step.productId) {
                    element.style.transition = 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out';
                    element.style.boxShadow = '0 0 0 2px #FF4D1A, 0 0 40px rgba(255, 77, 26, 0.4)';
                    element.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                      element.style.boxShadow = '';
                      element.style.transform = '';
                    }, 1500);
                  }
                }
              }}
              className="group shrink-0 w-[280px] md:w-[340px] xl:w-auto bg-[#161616] rounded-[16px] p-5 lg:p-6 flex flex-col snap-start border border-[#2A2A27] hover:border-gray-600 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] h-full relative cursor-pointer"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-[#FF4D1A] text-[9px] font-bold tracking-[0.15em] uppercase bg-[#FF4D1A]/10 px-2.5 py-1.5 rounded-md mt-1 border border-[#FF4D1A]/20">
                  STEP {step.step} // {step.category}
                </span>
                <span className="text-5xl font-black text-[#262626] font-condensed leading-none select-none transition-colors duration-300 group-hover:text-[#333]">
                  {step.step}
                </span>
              </div>

              {/* Image Area */}
              <div className="relative mb-7 w-full shrink-0">
                <div className="relative rounded-xl overflow-hidden w-full bg-[#111]" style={{ aspectRatio: '4/5' }}>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] will-change-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none z-10" />
                </div>
                
                {/* Handwritten Bubble */}
                <div className="absolute -top-3 -right-2 md:-right-4 bg-[#F4F0E8] text-black text-[9px] px-2.5 py-1.5 rounded-md border border-black/10 shadow-[2px_3px_0px_0px_rgba(0,0,0,0.85)] z-20 transform rotate-[3deg] font-mono font-bold max-w-[120px] text-center leading-tight transition-transform duration-300 group-hover:rotate-[5deg]">
                  "{step.bubble}"
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col grow justify-between items-center text-center mt-2">
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl font-black text-white font-condensed tracking-tight mb-2 uppercase transition-colors group-hover:text-[#FF4D1A]">{step.title}</h3>
                  <p className="text-gray-400 text-[10px] md:text-[11px] font-medium tracking-[0.08em] uppercase leading-relaxed mb-6">{step.subtitle}</p>
                </div>
                
                {/* Footer Action */}
                <div className="flex justify-center items-center mt-auto pt-5 border-t border-[#2A2A27] w-full gap-3">
                  <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase transition-colors group-hover:text-gray-300">Explore</span>
                  <div className="w-8 h-8 rounded-full bg-[#FF4D1A]/10 flex items-center justify-center text-[#FF4D1A] group-hover:bg-[#FF4D1A] group-hover:text-black transition-colors duration-300">
                    <ChevronRight size={14} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden justify-center gap-4 mt-8">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-xl border border-[#2A2A27] bg-[#161616] flex items-center justify-center hover:bg-[#222] transition-colors cursor-pointer text-white"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-xl border border-[#FF4D1A] bg-[#FF4D1A] text-black flex items-center justify-center hover:bg-[#e04316] transition-colors cursor-pointer"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};
