import React from 'react';
import { PillButton } from './PillButton';
import { ArrowRight, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNewArrivals: () => void;
  onOpenQuiz: () => void;
  onExploreDrops: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopNewArrivals,
  onOpenQuiz,
  onExploreDrops
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* LEFT PANEL: MAIN EDITORIAL HERO (Col 1-8 / 65%) */}
        <div className="lg:col-span-8 relative bg-white rounded-[20px] border border-[#111111] overflow-hidden flex flex-col justify-between min-h-[540px] sm:min-h-[600px] p-6 sm:p-10">
          
          {/* Background Lifestyle Image with clean opacity overlay for text contrast */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
              alt="Banzook Minimalist Apparel Drop"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F4F1] via-[#F5F4F1]/40 to-transparent sm:bg-gradient-to-r sm:from-[#F5F4F1] sm:via-[#F5F4F1]/70 sm:to-transparent" />
          </div>

          {/* TOP TAGS */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-banzook font-semibold uppercase px-3 py-1 rounded-full bg-[#111111] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A35843]" />
              DROP 04 / TRANSIT COLLECTION
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono-banzook text-[#666660] uppercase">
              LOS ANGELES, CA
            </span>
          </div>

          {/* BOTTOM CONTENT */}
          <div className="relative z-10 max-w-xl space-y-4 pt-32 sm:pt-40">
            <div className="space-y-2">
              <span className="text-xs font-mono-banzook tracking-widest text-[#A35843] uppercase font-semibold">
                DRESSED FOR THE WAY YOU MOVE
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-[-0.03em] leading-[1.05]">
                New drop dropping soon.
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#111111]/80 max-w-md leading-relaxed font-normal">
              Heavyweight 280–480 GSM organic carded cottons and Japanese twills. Uncompromising cuts engineered for understated movement and longevity.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <PillButton
                variant="black"
                size="md"
                withArrow
                onClick={onShopNewArrivals}
              >
                Shop New Arrivals
              </PillButton>
              <PillButton
                variant="outline"
                size="md"
                onClick={onOpenQuiz}
              >
                Find Your Fit
              </PillButton>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: TWO CONCISE PROMO CARDS (Col 9-12 / 35%) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* TOP CARD: FREE RETURNS ALWAYS */}
          <div className="flex-1 bg-white rounded-[20px] border border-[#111111] p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center bg-[#F5F4F1]">
                <RotateCcw className="w-4 h-4 text-[#111111]" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono-banzook text-[#A35843] uppercase tracking-wider font-semibold">
                  ALL SALES FINAL
                </span>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#111111] tracking-tight">
                  No returns or exchanges.
                </h2>
              </div>
              <p className="text-xs text-[#666660] leading-relaxed">
                Please review your order carefully before purchasing. Once sold, items cannot be exchanged or returned.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreDrops}
                className="group inline-flex items-center gap-2 text-xs font-mono-banzook uppercase font-semibold text-[#111111] hover:text-[#A35843] transition-colors cursor-pointer"
              >
                <span>Explore Core Drops</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* BOTTOM CARD: FABRIC INTEGRITY */}
          <div className="bg-[#F5F4F1] rounded-[20px] border border-[#111111] p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono-banzook text-[#666660] uppercase tracking-wider font-semibold">
                MATERIAL STANDARD
              </span>
              <h3 className="font-display font-bold text-lg text-[#111111] tracking-tight">
                Quality over noise.
              </h3>
              <p className="text-xs text-[#666660] leading-relaxed">
                Zero synthetic fillers. Pre-shrunk high-gauge knits designed to retain collar tension through hundreds of wears.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-neutral-300 pt-3 text-[11px] font-mono-banzook">
              <span className="text-[#111111] font-bold">100% ORGANIC</span>
              <span className="text-[#A35843] font-bold">280–700 GSM</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
