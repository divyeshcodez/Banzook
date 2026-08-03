import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'BUILT DIFFERENT.',
    subtitle: 'GEN-Z STREETWEAR FOR THE ONES WHO DON’T FOLLOW THE CROWD.',
    collection: 'BANZOOK ORIGINALS / DROP 01',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=150',
    navTitle: 'BUILT DIFFERENT'
  },
  {
    id: 2,
    title: 'THE ORIGINAL.',
    subtitle: 'REDEFINING THE STANDARDS OF MODERN LUXURY.',
    collection: 'BANZOOK ORIGINALS / DROP 01',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=150',
    navTitle: 'THE ORIGINAL'
  },
  {
    id: 3,
    title: 'NO RULES.',
    subtitle: 'UNAPOLOGETIC DESIGN FOR THE BOLD.',
    collection: 'BANZOOK ORIGINALS / DROP 01',
    image: 'https://images.unsplash.com/photo-1512353087810-254cb3617d1d?auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1512353087810-254cb3617d1d?auto=format&fit=crop&q=80&w=150',
    navTitle: 'NO RULES'
  },
  {
    id: 4,
    title: 'STREET FORM.',
    subtitle: 'ELEVATED SILHOUETTES, RAW AESTHETICS.',
    collection: 'BANZOOK ORIGINALS / DROP 01',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&q=80&w=150',
    navTitle: 'STREET FORM'
  },
  {
    id: 5,
    title: 'DROP 01.',
    subtitle: 'THE GENESIS OF A NEW ERA IN STREETWEAR.',
    collection: 'BANZOOK ORIGINALS / DROP 01',
    image: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&q=80&w=150',
    navTitle: 'DROP 01'
  }
];

export const HeroSection: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slide = SLIDES[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const setSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.8 }
    })
  };

  const textVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.2 }
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 20 : -20,
      opacity: 0,
      transition: { duration: 0.4 }
    })
  };

  return (
    <section className="relative w-full min-h-screen pt-24 pb-12 px-4 md:px-8 lg:px-12 flex flex-col justify-center bg-[#F8F7F5]">
      {/* Main Editorial Frame */}
      <div className="relative w-full max-w-7xl mx-auto bg-white rounded-3xl p-6 md:p-12 shadow-2xl border border-gray-200 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center overflow-hidden min-h-[70vh]">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full z-10">
          <div className="flex items-center justify-between mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">BANZOOK — EST. 2026</span>
            <span className="text-sm font-mono font-medium">{String(currentIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
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
                <h1 className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.85] font-black uppercase tracking-tighter text-[#111111] mb-6 font-condensed">
                  {slide.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      <br />
                    </React.Fragment>
                  ))}
                </h1>
                <p className="text-sm md:text-base text-gray-600 max-w-sm font-medium tracking-wide leading-relaxed">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Content - Campaign Image */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-full min-h-[400px] relative rounded-2xl overflow-hidden bg-gray-100 group">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 mix-blend-multiply" />
            </motion.div>
          </AnimatePresence>

          {/* Overlay Text */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20">
            <span className="text-white text-xs font-bold tracking-widest uppercase mix-blend-difference">{slide.collection}</span>
            <button 
              onClick={onExploreClick}
              className="group/btn flex items-center gap-2 text-white text-xs font-bold tracking-widest uppercase hover:text-[#FF4D1A] transition-colors mix-blend-difference"
            >
              EXPLORE DROP
              <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Navigation Arrows for Mobile (Absolute center) */}
        <div className="lg:hidden absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between pointer-events-none z-30">
           <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center pointer-events-auto shadow-lg hover:bg-white transition-colors">
              <ChevronLeft size={20} />
           </button>
           <button onClick={handleNext} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center pointer-events-auto shadow-lg hover:bg-white transition-colors">
              <ChevronRight size={20} />
           </button>
        </div>

      </div>

      {/* Bottom Lookbook Navigation */}
      <div className="w-full max-w-7xl mx-auto mt-8 px-2 md:px-0 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 w-full no-scrollbar snap-x snap-mandatory">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSlide(idx)}
              className={`relative flex-shrink-0 flex flex-col gap-2 group snap-center transition-all duration-500 ${
                idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-40 scale-95 hover:opacity-70'
              }`}
            >
              <span className="text-[10px] font-mono font-medium text-gray-500 text-left">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className={`w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden transition-all duration-500 ${
                idx === currentIndex ? 'ring-2 ring-offset-2 ring-[#FF4D1A]' : ''
              }`}>
                <img 
                  src={s.thumbnail} 
                  alt={s.navTitle} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <span className="text-xs font-bold tracking-tight uppercase text-center mt-1">
                {s.navTitle}
              </span>
            </button>
          ))}
        </div>
        
        {/* Progress Bar (Desktop) */}
        <div className="hidden md:flex flex-col gap-2 w-48 shrink-0">
          <div className="h-[2px] w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#111111]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / SLIDES.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-gray-400">
             <span>01</span>
             <span>{String(SLIDES.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
