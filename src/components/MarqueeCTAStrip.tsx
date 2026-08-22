import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MarqueeCTAStripProps {
  onOpenQuiz: () => void;
}

export const MarqueeCTAStrip: React.FC<MarqueeCTAStripProps> = ({ onOpenQuiz }) => {
  const phrase = 'FIND YOUR FIT · 60-SEC STYLE & PROPORTION QUIZ';

  return (
    <aside
      aria-label="Fit Quiz Marquee"
      onClick={onOpenQuiz}
      className="w-full bg-[#111111] text-[#F5F4F1] py-4 overflow-hidden border-y border-[#111111] cursor-pointer hover:bg-neutral-900 transition-colors group select-none"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(6)].map((_, repeatIdx) => (
          <div key={repeatIdx} className="flex items-center gap-8 px-4">
            <span className="inline-flex items-center gap-6 font-mono-banzook font-bold text-xs sm:text-sm tracking-widest uppercase">
              <span>{phrase}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A35843]" />
              <span className="underline decoration-[#A35843] underline-offset-4 group-hover:text-[#A35843] transition-colors inline-flex items-center gap-1">
                START QUIZ <ArrowRight className="w-3.5 h-3.5 inline" />
              </span>
              <span className="text-neutral-500">•</span>
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};
