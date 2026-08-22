import React, { useState } from 'react';
import { LIFESTYLE_OUTFITS } from '../data/storeData';
import { PillButton } from './PillButton';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface LifestyleCarouselProps {
  onExplorePiece: (productId: string) => void;
  onExploreAll: () => void;
}

export const LifestyleCarousel: React.FC<LifestyleCarouselProps> = ({
  onExplorePiece,
  onExploreAll
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? LIFESTYLE_OUTFITS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === LIFESTYLE_OUTFITS.length - 1 ? 0 : prev + 1));
  };

  const current = LIFESTYLE_OUTFITS[activeSlide];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* SECTION HEADER & CONTEXT TABS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#111111] gap-4">
        <div>
          <span className="text-[11px] font-mono-banzook text-[#A35843] uppercase tracking-widest font-semibold">
            WARDROBE ARCHITECTURE
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111111] tracking-tight">
            Engineered for Every Context
          </h2>
        </div>

        {/* CONTEXT SELECTOR PILLS */}
        <div className="flex items-center gap-2">
          {LIFESTYLE_OUTFITS.map((outfit, idx) => (
            <button
              key={outfit.id}
              onClick={() => setActiveSlide(idx)}
              className={`px-4 py-2 rounded-full text-xs font-mono-banzook uppercase font-semibold transition-colors cursor-pointer border ${
                activeSlide === idx
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#111111] border-[#111111]/30 hover:border-[#111111]'
              }`}
            >
              {outfit.contextTag}
            </button>
          ))}
        </div>
      </div>

      {/* BORDERED CONTAINER WITH IMAGE + COPY */}
      <div className="bg-white rounded-[20px] border border-[#111111] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* IMAGE SIDE (Col 1-7) */}
        <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto min-h-[380px] sm:min-h-[480px] bg-[#F5F4F1] border-b lg:border-b-0 lg:border-r border-[#111111]">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover object-center transition-opacity duration-300"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-[#111111] px-3 py-1 rounded-full text-[10px] font-mono-banzook font-bold uppercase text-[#111111]">
            {current.contextTag}
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-[#111111] px-3 py-1 rounded-full text-[10px] font-mono-banzook text-[#666660]">
            {current.modelDetails}
          </div>
        </div>

        {/* COPY & KEY PIECES SIDE (Col 8-12) */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <span className="text-[11px] font-mono-banzook text-[#A35843] uppercase tracking-wider font-semibold">
              {current.tagline}
            </span>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#111111] tracking-tight leading-snug">
              {current.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#666660] leading-relaxed">
              {current.description}
            </p>

            {/* KEY PIECES BREAKDOWN */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-mono-banzook text-[#111111] font-bold uppercase tracking-wider block">
                KEY ENSEMBLE PIECES:
              </span>

              <div className="space-y-1.5">
                {current.keyPieces.map((piece, pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() => onExplorePiece(piece.productId)}
                    className="p-2.5 rounded-xl border border-neutral-200 hover:border-[#111111] bg-[#F5F4F1] flex items-center justify-between text-xs font-mono-banzook cursor-pointer transition-colors"
                  >
                    <span className="font-medium text-[#111111] truncate">{piece.name}</span>
                    <span className="text-[#A35843] font-bold shrink-0 ml-2">${piece.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER OF CARD: DOTS + ARROWS + BUTTON */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            {/* Minimal dot navigation */}
            <div className="flex items-center gap-2">
              {LIFESTYLE_OUTFITS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveSlide(dotIdx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeSlide === dotIdx ? 'w-6 bg-[#111111]' : 'w-2 bg-neutral-300'
                  }`}
                  aria-label={`Context slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                aria-label="Previous context"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                aria-label="Next context"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
