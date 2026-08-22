import React, { useState } from 'react';
import { TESTIMONIAL_QUOTES } from '../data/storeData';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const QuoteSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIAL_QUOTES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIAL_QUOTES.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIAL_QUOTES[currentIndex];

  return (
    <section className="border-y border-[#111111] bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-8">
        
        {/* UPPER LABEL */}
        <span className="text-[11px] font-mono-banzook text-[#A35843] uppercase tracking-widest font-semibold">
          TESTED &amp; VERIFIED IN ROTATION
        </span>

        {/* LARGE CENTERED QUOTE */}
        <blockquote className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#111111] tracking-tight leading-[1.3] max-w-3xl">
          &ldquo;{current.quote}&rdquo;
        </blockquote>

        {/* NAME AND DETAILS BELOW */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-display font-bold text-sm text-[#111111]">
            <span>{current.author}</span>
            <span className="text-[#666660] font-normal font-mono-banzook text-xs">· {current.location}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono-banzook text-[#666660]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#111111]" />
            <span>Verified Owner of {current.itemPurchased}</span>
          </div>
        </div>

        {/* MINIMAL ARROW + DOT CONTROLS */}
        <div className="pt-4 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIAL_QUOTES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-6 bg-[#111111]' : 'w-1.5 bg-neutral-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
