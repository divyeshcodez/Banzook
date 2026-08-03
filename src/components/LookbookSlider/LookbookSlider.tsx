import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    id: 1,
    title: 'BUILT\nDIFFERENT.',
    subtitle: 'STREETWEAR FOR THE ONES\nWHO CREATE THEIR OWN RULES.',
    collection: 'BANZOOK / DROP 01',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'OWN THE\nSTREET.',
    subtitle: 'REDEFINING THE STANDARDS\nOF MODERN LUXURY.',
    collection: 'BANZOOK / ORIGINALS',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'NO\nRULES.',
    subtitle: 'UNAPOLOGETIC DESIGN\nFOR THE BOLD.',
    collection: 'BANZOOK / STREET CODE',
    image: 'https://images.unsplash.com/photo-1512353087810-254cb3617d1d?auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'MADE TO\nSTAND OUT.',
    subtitle: 'ELEVATED SILHOUETTES,\nRAW AESTHETICS.',
    collection: 'BANZOOK / LIMITED DROP',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'THE NEXT\nFORM.',
    subtitle: 'THE GENESIS OF A NEW\nERA IN STREETWEAR.',
    collection: 'BANZOOK / FUTURE EDITION',
    image: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&q=80',
  }
];

export const LookbookSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = SLIDES[currentIndex];

  const textVariants = {
    enter: { opacity: 0, y: 10 },
    center: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.4 } }
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 1.04 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full bg-[#0A0A0B] flex flex-col items-center select-none">
      
      {/* Hero Card Container */}
      <div 
        className="relative bg-[#EDE9E1] rounded-[24px] overflow-hidden"
        style={{ 
          width: 'min(1400px, calc(100vw - 80px))', 
          height: '720px', 
          margin: '40px auto 110px auto'
        }}
      >
        
        {/* Two-Column Layout */}
        <div className="grid h-full w-full" style={{ gridTemplateColumns: '48% 52%' }}>
          
          {/* LEFT EDITORIAL PANEL */}
          <div className="flex flex-col justify-center h-full relative" style={{ padding: '72px' }}>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col w-full absolute top-[72px]"
              >
                {/* Top Label */}
                <span 
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    color: '#77716A',
                    textTransform: 'uppercase'
                  }}
                >
                  {slide.collection}
                </span>

                {/* Slide Number */}
                <span 
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: '#111111',
                    marginTop: '48px'
                  }}
                >
                  {String(currentIndex + 1).padStart(2, '0')} — {String(SLIDES.length).padStart(2, '0')}
                </span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col w-full mt-[-20px]"
              >
                {/* Main Headline */}
                <h1 
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(100px, 9vw, 155px)',
                    lineHeight: '0.80',
                    letterSpacing: '-0.025em',
                    color: '#111111',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {slide.title}
                </h1>
                
                {/* Description */}
                <p 
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    lineHeight: '1.7',
                    letterSpacing: '0.12em',
                    color: '#65605A',
                    maxWidth: '300px',
                    marginTop: '30px',
                    textTransform: 'uppercase',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {slide.subtitle}
                </p>

                {/* Explore Button */}
                <div className="mt-[30px]">
                  <button className="group flex flex-col items-start focus:outline-none">
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="transition-colors duration-300 group-hover:text-[#FF4D1A]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          color: '#111111',
                          textTransform: 'uppercase'
                        }}
                      >
                        EXPLORE DROP
                      </span>
                      <span className="text-[#111111] group-hover:text-[#FF4D1A] transform group-hover:translate-x-[6px] transition-all duration-300">
                        →
                      </span>
                    </div>
                    <div className="w-full h-[1px] bg-[#FF4D1A] opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Slide Navigation */}
            <div className="absolute bottom-[72px] left-[72px] flex gap-[10px] z-20">
              {SLIDES.map((s, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentIndex(idx)}
                    className="flex flex-col items-start gap-2 focus:outline-none"
                  >
                    <span 
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '10px',
                        fontWeight: isActive ? 700 : 500,
                        letterSpacing: '0.12em',
                        color: isActive ? '#111111' : '#A4A09B'
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div 
                      className="w-[72px] h-[52px] rounded-[2px] overflow-hidden transition-all duration-300"
                      style={{
                        opacity: isActive ? 1 : 0.35,
                        filter: isActive ? 'grayscale(0)' : 'grayscale(100%)',
                        border: isActive ? '2px solid #FF4D1A' : 'none',
                        boxSizing: 'border-box'
                      }}
                    >
                      <img 
                        src={s.image} 
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT IMAGE PANEL */}
          <div className="h-full w-full relative overflow-hidden bg-[#d3d0c9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 z-10"
              >
                <img
                  src={slide.image}
                  alt={slide.title.replace('\n', ' ')}
                  className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95"
                />
                
                {/* Subtle dark gradient at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent mix-blend-multiply" />
              </motion.div>
            </AnimatePresence>

            {/* Small vertical label */}
            <div 
              className="absolute bottom-[40px] right-[40px] z-20 transform flex flex-col items-end"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: 'rgba(255, 255, 255, 0.70)',
                textTransform: 'uppercase',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)'
              }}
            >
              BANZOOK<br/>ORIGINALS
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
