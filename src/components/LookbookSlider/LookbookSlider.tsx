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
    enter: { opacity: 0, y: 5 },
    center: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.3 } }
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 0.98 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full flex items-center justify-center py-16 bg-transparent">
      
      {/* Main Rounded Rectangular Card */}
      <div className="w-[92%] max-w-[1450px] h-[650px] bg-[#F5F3EE] rounded-[28px] border border-gray-300 shadow-lg p-10 lg:p-12 relative overflow-hidden box-border">
        
        {/* Two-Column Layout Container */}
        <div className="flex w-full h-full justify-between relative z-10">
          
          {/* LEFT COLUMN (52%) */}
          <div className="w-[52%] h-full flex flex-col pt-2 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col"
              >
                {/* Labels */}
                <div className="mb-8">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 block mb-2">
                    {slide.collection}
                  </span>
                  <span className="text-xs font-mono font-medium text-gray-400">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Headline (Extra Bold Condensed) */}
                <h1 
                  className="text-[80px] xl:text-[100px] leading-[0.85] font-black uppercase tracking-[-0.03em] text-[#111111] mb-6 whitespace-pre-line"
                  style={{ fontFamily: "'Oswald', 'Anton', Impact, sans-serif", transform: 'scaleY(1.1)', transformOrigin: 'left top' }}
                >
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-xs xl:text-sm text-[#444] max-w-md font-bold tracking-widest leading-relaxed uppercase mt-4">
                  "{slide.subtitle}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN (42%) */}
          <div className="w-[42%] h-full flex justify-end items-start relative z-10">
            {/* The main portrait image is given a fixed aspect ratio and allowed to fill the height up to a max, matching 4:5 */}
            <div className="w-full max-w-[420px] h-[550px] rounded-[4px] overflow-hidden relative shadow-xl border border-gray-200/50">
              
              {/* Subtle orange-red cinematic glow behind/around the image container */}
              <div className="absolute inset-0 bg-[#FF4D1A] blur-3xl opacity-20 scale-[1.15] z-0 mix-blend-screen pointer-events-none" />
              
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
                    className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.97]"
                  />
                  {/* Very subtle color grading overlay */}
                  <div className="absolute inset-0 bg-[#FF4D1A] mix-blend-overlay opacity-[0.06] pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* BOTTOM AREA: Thumbnail Tab Bar */}
        {/* Fixed absolutely to the bottom-left of the padding box */}
        <div className="absolute bottom-10 lg:bottom-12 left-10 lg:left-12 flex gap-4 md:gap-5 z-20">
          {SLIDES.map((s, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                className="flex flex-col items-start gap-2 group transition-all duration-300 ease-out shrink-0 focus:outline-none"
              >
                <span className={`text-[10px] font-mono transition-colors duration-300 ${isActive ? 'text-[#111111] font-bold' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                
                <div 
                  className={`w-[90px] h-[65px] xl:w-[100px] xl:h-[75px] rounded-[4px] overflow-hidden transition-all duration-300 ${
                    isActive 
                      ? 'opacity-100 ring-[1.5px] ring-offset-2 ring-[#FF4D1A] brightness-100 shadow-md transform scale-[1.02]' 
                      : 'opacity-[0.35] grayscale-[40%] hover:opacity-70 brightness-[0.85]'
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
