import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'BUILT DIFFERENT.',
    subtitle: 'STREETWEAR FOR THE ONES WHO CREATE THEIR OWN RULES.',
    collection: 'BANZOOK ORIGINALS / DROP 01',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80',
    navTitle: 'BUILT DIFFERENT'
  },
  {
    id: 2,
    title: 'ORIGINAL FORM.',
    subtitle: 'REDEFINING THE STANDARDS OF MODERN LUXURY.',
    collection: 'BANZOOK ORIGINALS / DROP 01',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80',
    navTitle: 'ORIGINAL FORM'
  },
  {
    id: 3,
    title: 'NO RULES.',
    subtitle: 'UNAPOLOGETIC DESIGN FOR THE BOLD.',
    collection: 'BANZOOK ORIGINALS / DROP 01',
    image: 'https://images.unsplash.com/photo-1512353087810-254cb3617d1d?auto=format&fit=crop&q=80',
    navTitle: 'NO RULES'
  },
  {
    id: 4,
    title: 'STREET CODE.',
    subtitle: 'ELEVATED SILHOUETTES, RAW AESTHETICS.',
    collection: 'BANZOOK ORIGINALS / DROP 01',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&q=80',
    navTitle: 'STREET CODE'
  },
  {
    id: 5,
    title: 'DROP 01.',
    subtitle: 'THE GENESIS OF A NEW ERA IN STREETWEAR.',
    collection: 'BANZOOK ORIGINALS / DROP 01',
    image: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&q=80',
    navTitle: 'DROP 01'
  }
];

export const LookbookSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slide = SLIDES[currentIndex];

  const setSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 40 : -40,
      opacity: 0,
      scale: 1.02,
      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] }
    })
  };

  const textVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
    })
  };

  return (
    <div className="w-[94%] max-w-[1400px] bg-[#F5F3EE] rounded-[32px] border border-gray-200 shadow-sm relative overflow-hidden flex flex-col h-[85vh] max-h-[900px] min-h-[680px]">
      
      {/* Top Left Badge */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
          BANZOOK / DROP 01
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row w-full h-full pt-20 pb-28 md:pt-12 md:pb-32 px-8 md:px-12 relative">
        
        {/* Left Side: Typography */}
        <div className="w-full md:w-[55%] h-full flex flex-col justify-center relative z-10 pr-0 md:pr-12">
          
          <div className="mb-8">
            <span className="text-sm font-mono font-medium text-gray-400">
              {String(currentIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          <div className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col"
              >
                <h1 className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[8.5rem] leading-[0.85] font-black uppercase tracking-tighter text-[#111111] mb-8 font-condensed">
                  {slide.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      {i !== slide.title.split(' ').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h1>
                <p className="text-xs md:text-sm text-gray-500 max-w-sm font-bold tracking-widest uppercase leading-relaxed">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Editorial Image */}
        <div className="hidden md:flex w-[45%] h-full flex-col justify-center items-end relative z-10">
          <div className="w-full max-w-[480px] h-[75%] max-h-[600px] relative rounded-lg overflow-hidden bg-gray-200">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
                />
                {/* Subtle Orange-Red glow overlay to match brand aesthetic */}
                <div className="absolute inset-0 bg-[#FF4D1A] mix-blend-overlay opacity-10" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side captions */}
          <div className="w-full max-w-[480px] flex justify-between items-center mt-6">
             <span className="text-[10px] font-bold tracking-widest uppercase text-[#111111]">
               {slide.collection}
             </span>
             <button className="text-[10px] font-bold tracking-widest uppercase text-[#111111] hover:text-[#FF4D1A] transition-colors flex items-center gap-2 group">
               VIEW DROP <span className="transform group-hover:translate-x-1 transition-transform">→</span>
             </button>
          </div>
        </div>

        {/* Mobile Image (Visible only on small screens) */}
        <div className="flex md:hidden w-full h-[50vh] mt-8 relative rounded-lg overflow-hidden">
          <AnimatePresence custom={direction} initial={false}>
             <motion.div
                key={currentIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
                />
                <div className="absolute inset-0 bg-[#FF4D1A] mix-blend-overlay opacity-10" />
              </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Thumbnail Navigation */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 border-t border-gray-200/60 bg-white/40 backdrop-blur-sm flex items-center px-4 md:px-12">
        <div className="flex-1 flex items-center gap-2 md:gap-6 overflow-x-auto no-scrollbar py-2">
          {SLIDES.map((s, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => setSlide(idx)}
                className={`relative flex flex-col justify-center items-center gap-2 flex-shrink-0 transition-all duration-500 ease-out group ${
                  isActive ? 'w-24 md:w-32 opacity-100' : 'w-16 md:w-20 opacity-40 hover:opacity-70'
                }`}
              >
                {/* Active Line Indicator above thumb */}
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#111111] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                <div className="text-[10px] font-mono text-gray-500 mb-1 w-full text-left hidden md:block">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                
                <div className={`w-full aspect-square rounded overflow-hidden transition-all duration-500 ${
                  isActive ? 'ring-1 ring-offset-2 ring-[#FF4D1A] shadow-md scale-100 filter-none' : 'scale-95 grayscale-[50%] blur-[1px] group-hover:blur-none'
                }`}>
                  <img 
                    src={s.image} 
                    alt={s.navTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {isActive && (
                  <div className="absolute -bottom-6 w-[200%] text-center text-[9px] font-bold tracking-widest uppercase text-[#111111]">
                    {s.navTitle}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Arrow Controls */}
        <div className="hidden md:flex items-center gap-2 pl-8 border-l border-gray-200/60 h-full">
           <button onClick={handlePrev} className="p-2 text-gray-400 hover:text-[#111111] transition-colors">
              <ChevronLeft size={20} strokeWidth={1.5} />
           </button>
           <button onClick={handleNext} className="p-2 text-gray-400 hover:text-[#111111] transition-colors">
              <ChevronRight size={20} strokeWidth={1.5} />
           </button>
        </div>
      </div>
    </div>
  );
};
