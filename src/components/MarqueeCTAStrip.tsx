import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MarqueeCTAStripProps {
  onOpenQuiz: () => void;
}

export const MarqueeCTAStrip: React.FC<MarqueeCTAStripProps> = ({ onOpenQuiz }) => {
  const phrase = 'FIND UR SIGNATURE SILHOUETTE · 30-SEC FIT & DRAPE ENGINE 2.0 · GET 15% OFF';

  return (
    <aside
      aria-label="Fit Quiz Marquee"
      onClick={onOpenQuiz}
      className="w-full bg-[#111111] text-[#F5F4F1] py-3.5 overflow-hidden border-y-2 border-[#111111] cursor-pointer hover:bg-neutral-900 transition-colors group select-none"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(6)].map((_, repeatIdx) => (
          <div key={repeatIdx} className="flex items-center gap-8 px-4">
            <span className="inline-flex items-center gap-6 font-mono-banzook font-bold text-xs sm:text-sm tracking-widest uppercase">
              <span>{phrase}</span>
              <span className="w-2 h-2 rounded-full bg-[#E65F2B] animate-ping" />
              <span className="underline decoration-[#E65F2B] underline-offset-4 group-hover:text-[#E65F2B] transition-colors inline-flex items-center gap-1.5 font-extrabold">
                <Sparkles className="w-3.5 h-3.5 text-[#E65F2B]" /> START SCAN <ArrowRight className="w-3.5 h-3.5 inline" />
              </span>
              <span className="text-neutral-500">•</span>
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};
