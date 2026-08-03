import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white py-20 overflow-hidden">
      
      {/* Main Rounded Rectangular Card */}
      <div className="w-[92%] max-w-[1450px] h-[650px] bg-[#F5F3EE] rounded-[28px] border border-gray-200 shadow-sm p-10 md:p-14 relative flex flex-col justify-between">
        
        {/* Two-Column Layout Container */}
        <div className="flex w-full h-[80%] justify-between">
          
          {/* LEFT COLUMN (52%) */}
          <div className="w-[52%] h-full flex flex-col justify-center mt-4">
            <div className="h-full flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col h-full"
                >
                  <div className="mb-8">
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 block mb-2">
                      {slide.collection}
                    </span>
                    <span className="text-sm font-mono font-medium text-gray-400">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                    </span>
                  </div>

                  <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.85] font-black uppercase tracking-tighter text-[#111111] mb-8 font-condensed whitespace-pre-line">
                    {slide.title}
                  </h1>

                  <p className="text-xs md:text-sm text-gray-600 max-w-sm font-medium tracking-wide leading-relaxed">
                    "{slide.subtitle}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN (40-42%) */}
          <div className="w-[42%] h-full flex justify-end items-center relative">
            <div className="w-full max-w-[360px] aspect-[4/5] rounded-[4px] overflow-hidden relative shadow-lg">
              {/* Subtle orange-red cinematic glow behind/around the image container */}
              <div className="absolute inset-0 bg-[#FF4D1A] blur-3xl opacity-20 scale-110 z-0 mix-blend-screen" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 z-10 bg-[#e8e6e1]"
                >
                  <img
                    src={slide.image}
                    alt="Campaign Model"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95"
                  />
                  {/* Very subtle color grading overlay */}
                  <div className="absolute inset-0 bg-[#FF4D1A] mix-blend-overlay opacity-10 pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* BOTTOM AREA: Thumbnail Tab Bar */}
        <div className="w-[52%] flex items-end gap-3 md:gap-5 mt-auto pt-4 relative z-20">
          {SLIDES.map((s, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                className="flex flex-col items-start gap-2 group transition-all duration-300 ease-out"
              >
                <span className={`text-[10px] font-mono transition-colors duration-300 ${isActive ? 'text-[#111111] font-bold' : 'text-gray-400'}`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                
                <div 
                  className={`w-[100px] h-[75px] rounded-[4px] overflow-hidden transition-all duration-300 ${
                    isActive 
                      ? 'opacity-100 ring-2 ring-offset-2 ring-[#FF4D1A] brightness-100 shadow-md' 
                      : 'opacity-40 grayscale-[30%] hover:opacity-70 brightness-90'
                  }`}
                >
                  <img 
                    src={s.image} 
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
