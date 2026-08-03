import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'BUILT\nDIFFERENT.',
    subtitle: 'STREETWEAR FOR THE ONES WHO CREATE THEIR OWN RULES.',
    collection: 'BANZOOK / DROP 01',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'OWN THE\nSTREET.',
    subtitle: 'REDEFINING THE STANDARDS OF MODERN LUXURY.',
    collection: 'BANZOOK / ORIGINALS',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'NO\nRULES.',
    subtitle: 'UNAPOLOGETIC DESIGN FOR THE BOLD.',
    collection: 'BANZOOK / STREET CODE',
    image: 'https://images.unsplash.com/photo-1512353087810-254cb3617d1d?auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'MADE TO\nSTAND OUT.',
    subtitle: 'ELEVATED SILHOUETTES, RAW AESTHETICS.',
    collection: 'BANZOOK / LIMITED DROP',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'THE NEXT\nFORM.',
    subtitle: 'THE GENESIS OF A NEW ERA IN STREETWEAR.',
    collection: 'BANZOOK / FUTURE EDITION',
    image: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&q=80',
  }
];

export const LookbookSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = SLIDES[currentIndex];

  const textVariants = {
    enter: { opacity: 0, y: 15 },
    center: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.4 } }
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 1.03 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
    exit: { opacity: 0, scale: 0.97, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full bg-transparent font-['Inter',sans-serif] relative z-10 pt-32 pb-24 border-b border-white/5">
      
      {/* Main Luxury Card Container */}
      <div 
        className="relative w-[calc(100%-32px)] lg:w-[calc(100%-64px)] max-w-[1400px] h-auto lg:h-[680px] bg-[#F1EEE8] rounded-[28px] mx-auto overflow-hidden flex flex-col lg:block shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
        style={{ margin: '32px auto 100px auto' }}
      >
        
        {/* Subtle warm paper grain/noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-0" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        {/* CSS Grid for Desktop Layout */}
        <div className="lg:grid h-full w-full relative z-10 flex flex-col" style={{ gridTemplateColumns: '1.05fr 0.75fr', columnGap: '80px' }}>
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center px-6 pt-12 lg:pt-0 lg:px-0 lg:pl-[72px] h-full lg:pb-[90px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col select-none"
              >
                {/* Label */}
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6D675F] mb-6">
                  {slide.collection}
                </span>
                
                {/* Slide Number */}
                <span className="text-[13px] font-semibold tracking-[0.08em] text-[#111111] mb-6">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                </span>

                {/* Headline (Bebas Neue) */}
                <h1 
                  className="font-normal uppercase text-[#111111] mb-8 whitespace-pre-line"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif", 
                    fontSize: 'clamp(68px, 9vw, 155px)',
                    lineHeight: '0.78',
                    letterSpacing: '-0.035em'
                  }}
                >
                  {slide.title}
                </h1>

                {/* Description */}
                <p 
                  className="text-[13px] font-normal uppercase text-[#68635C] max-w-[360px] whitespace-pre-line"
                  style={{ lineHeight: '1.6', letterSpacing: '0.08em' }}
                >
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtle Vertical Divider */}
          <div className="hidden lg:block absolute left-[56%] top-[15%] bottom-[20%] w-[1px] bg-[rgba(0,0,0,0.08)] z-0" />

          {/* RIGHT COLUMN */}
          <div className="flex justify-center lg:justify-start items-center h-full px-6 py-10 lg:p-0">
            <div 
              className="relative rounded-[4px] overflow-hidden bg-[#e8e6e1] shadow-[0_20px_45px_rgba(0,0,0,0.16)] w-full lg:w-[420px]"
              style={{ aspectRatio: '4/5', height: 'auto', maxHeight: '520px' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <img
                    src={slide.image}
                    alt={slide.title.replace('\n', ' ')}
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* BOTTOM TAB STRIP */}
        <div className="lg:absolute bottom-[28px] left-0 w-full px-6 pb-8 lg:pb-0 lg:px-[72px] flex flex-col lg:flex-row justify-between items-start lg:items-end z-20">
          
          <div className="flex flex-col w-full lg:w-auto">
            {/* Orange Progress Line */}
            <div className="w-full h-[1px] bg-[rgba(0,0,0,0.08)] mb-4 relative">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-[#FF4D1A]" 
                 initial={{ width: 0 }}
                 animate={{ width: `${((currentIndex + 1) / SLIDES.length) * 100}%` }}
                 transition={{ duration: 0.5 }}
               />
            </div>
            
            {/* Thumbnails Row */}
            <div className="flex gap-[12px] overflow-x-auto no-scrollbar pb-2 lg:pb-0 w-full snap-x">
              {SLIDES.map((s, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentIndex(idx)}
                    className="flex flex-col items-start gap-1 group focus:outline-none shrink-0 snap-start"
                  >
                    <span 
                      className={`text-[9px] font-medium transition-colors duration-350 ${isActive ? 'text-[#111111]' : 'text-[#68635C]'}`}
                      style={{ letterSpacing: '0.12em' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    
                    <div 
                      className={`w-[92px] h-[62px] rounded-[3px] overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive 
                          ? 'opacity-100 grayscale-0 scale-100' 
                          : 'opacity-30 grayscale-[70%] scale-[0.96] group-hover:opacity-75 group-hover:scale-[1.03]'
                      }`}
                      style={{ border: isActive ? '2px solid #FF4D1A' : '2px solid transparent' }}
                    >
                      <img 
                        src={s.image} 
                        alt={`Tab ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side CTA */}
          <button className="hidden lg:flex items-center gap-2 group focus:outline-none mt-6 lg:mt-0 pb-2">
            <span 
              className="text-[10px] font-bold text-[#111111] group-hover:text-[#FF4D1A] transition-colors duration-300 uppercase"
              style={{ letterSpacing: '0.12em' }}
            >
              EXPLORE DROP
            </span>
            <ArrowRight size={14} className="text-[#111111] group-hover:text-[#FF4D1A] transform group-hover:translate-x-[5px] transition-all duration-300" />
          </button>
        </div>

      </div>
    </div>
  );
};
