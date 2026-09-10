import React from 'react';
import { PillButton } from '../PillButton';

interface QuizCTAProps {
  onOpenQuiz: () => void;
}

export const QuizCTA: React.FC<QuizCTAProps> = ({ onOpenQuiz }) => {
  return (
    <section className="w-full bg-[#F5F4F1] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#111111]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text */}
        <div className="flex flex-col items-start space-y-6">
          <h2 className="font-display font-extrabold text-[#111111] text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em] max-w-md">
            NOT SURE WHERE TO START?
          </h2>
          <p className="font-mono-banzook text-[#111111] text-sm tracking-widest font-bold">
            FIND UR PERFECT FIT + GET 15% OFF
          </p>
          <button 
            onClick={onOpenQuiz}
            className="px-6 py-2.5 rounded-full border border-[#111111] bg-white text-[#111111] font-mono-banzook uppercase font-semibold text-xs hover:bg-[#111111] hover:text-white transition-colors"
          >
            TAKE THE QUIZ
          </button>
        </div>

        {/* Right Side: Organic Blob & Shelf */}
        <div className="relative w-full h-[400px] flex items-center justify-center">
          {/* Organic blob outline */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-[120%] h-[120%] text-[#111111]/20 stroke-current opacity-50" fill="transparent" strokeWidth="1">
              <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.7,-0.7C87.3,14.8,82,29.7,73.1,41.9C64.2,54.1,51.8,63.7,37.8,70.9C23.8,78.2,8.1,83.1,-7.2,81.4C-22.5,79.7,-37.5,71.3,-50.2,60.6C-62.9,50,-73.4,37,-79.8,22.1C-86.2,7.2,-88.4,-9.7,-83.4,-24.1C-78.4,-38.5,-66.2,-50.4,-52.3,-57.6C-38.4,-64.8,-22.8,-67.2,-7.5,-66.8C7.8,-66.4,15.6,-63.1,30.5,-73.6" transform="translate(100 100) scale(1.1)" />
            </svg>
          </div>

          {/* Product image */}
          <div className="relative z-10 w-[70%] max-w-[320px] aspect-square rounded-[24px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80" 
              alt="Curated clothing stack"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Accent-colored shelf line */}
          <div className="absolute bottom-[15%] left-[5%] right-[5%] h-px bg-[#1D3557] z-0 opacity-40"></div>
        </div>

      </div>
    </section>
  );
};
