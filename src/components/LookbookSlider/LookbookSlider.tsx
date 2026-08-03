import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    id: 1,
    title: 'BUILT\nDIFFERENT.',
    subtitle: 'STREETWEAR FOR THE ONES\nWHO CREATE THEIR OWN RULES.',
    collection: 'BANZOOK / DROP 01',
    image: '/images/banzook_model_cinematic_hero.png',
  },
  {
    id: 2,
    title: 'OWN THE\nSTREET.',
    subtitle: 'REDEFINING THE STANDARDS\nOF MODERN LUXURY.',
    collection: 'BANZOOK / ORIGINALS',
    image: '/images/model_brokensystem.png',
  },
  {
    id: 3,
    title: 'NO\nRULES.',
    subtitle: 'UNAPOLOGETIC DESIGN\nFOR THE BOLD.',
    collection: 'BANZOOK / STREET CODE',
    image: '/images/model_nosmoking_front.jpg',
  },
  {
    id: 4,
    title: 'MADE TO\nSTAND OUT.',
    subtitle: 'ELEVATED SILHOUETTES,\nRAW AESTHETICS.',
    collection: 'BANZOOK / LIMITED DROP',
    image: '/images/model_hotwheels.jpg',
  },
  {
    id: 5,
    title: 'THE NEXT\nFORM.',
    subtitle: 'THE GENESIS OF A NEW\nERA IN STREETWEAR.',
    collection: 'BANZOOK / FUTURE EDITION',
    image: '/images/hero_campaign.png',
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
        className="relative bg-[#EDE9E1] rounded-[16px] md:rounded-[24px] overflow-hidden w-[calc(100vw-32px)] md:w-[calc(100vw-80px)] max-w-[1400px] mx-auto mt-[120px] mb-[60px] md:mt-[180px] md:mb-[110px]"
        style={{ minHeight: '650px' }}
      >
        
        {/* Two-Column Layout */}
        <div className="grid h-full w-full grid-cols-1 md:grid-cols-[48%_52%]">
          
          {/* LEFT EDITORIAL PANEL */}
          <div className="flex flex-col justify-center h-full relative order-2 md:order-1 p-[32px] md:p-[72px]">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col w-full absolute top-[32px] md:top-[72px]"
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
                    fontSize: 'clamp(56px, 12vw, 155px)',
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
            <div className="absolute bottom-[24px] left-[24px] md:bottom-[35px] md:left-[72px] flex gap-[8px] md:gap-[10px] z-20 w-[calc(100vw-80px)] overflow-x-auto overflow-y-hidden pb-4 md:pb-0 hide-scrollbar">
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
                      className="w-[50px] h-[36px] md:w-[72px] md:h-[52px] rounded-[2px] overflow-hidden transition-all duration-300 flex-shrink-0"
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
          <div className="h-[350px] md:h-full w-full relative overflow-hidden bg-[#111111] order-1 md:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                {/* Ambient Blurred Background to Fill Empty Space */}
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover filter blur-[40px] opacity-70 scale-110"
                />
                
                {/* Foreground Image - Contained so no cropping occurs */}
                <img
                  src={slide.image}
                  alt={slide.title.replace('\n', ' ')}
                  className="relative z-10 w-full h-full object-contain object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] filter contrast-[1.05] brightness-95"
                />
                
                {/* Subtle dark gradient at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent mix-blend-multiply z-20 pointer-events-none" />
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
