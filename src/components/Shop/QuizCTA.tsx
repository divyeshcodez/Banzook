import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Sliders, CheckCircle2 } from 'lucide-react';

interface QuizCTAProps {
  onOpenQuiz: () => void;
}

export const QuizCTA: React.FC<QuizCTAProps> = ({ onOpenQuiz }) => {
  return (
    <section className="w-full bg-[#F5F4F1] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-white rounded-[32px] border-2 border-[#111111] p-6 sm:p-10 lg:p-14 shadow-[8px_8px_0px_#111111] overflow-hidden">
          
          {/* Subtle geometric background grid line & glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E65F2B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#111111]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* LEFT COLUMN: Editorial & Gen Z Copy */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* TOP MARQUEE BADGE */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111] text-white font-mono-banzook text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E65F2B] animate-pulse" />
                <span>BANZOOK SILHOUETTE SCAN // 30-SEC ENGINE</span>
              </div>

              {/* HEADLINE */}
              <div className="space-y-2">
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#111111] leading-[0.98] tracking-tight">
                  NOT SURE HOW TO SIZE YOUR DRAPE?
                </h2>
                <p className="font-mono-banzook text-xs sm:text-sm font-bold text-[#E65F2B] tracking-wide">
                  FIND UR SIGNATURE SILHOUETTE + UNLOCK 15% OFF YOUR ROTATION
                </p>
              </div>

              {/* EDITORIAL PARAGRAPH */}
              <p className="font-sans text-xs sm:text-sm text-[#666660] leading-relaxed max-w-xl">
                Take our 4-question proportion diagnostic. We calculate exact shoulder drop, GSM fabric heft, and anti-cling geometry tailored for your movement.
              </p>

              {/* KEY HIGHLIGHT PILLS */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono-banzook text-[11px] text-[#111111]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F4F1] border border-[#111111]/15 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 99.4% Fit Accuracy
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F4F1] border border-[#111111]/15 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" /> Zero Polyester Cling
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F4F1] border border-[#111111]/15 font-bold">
                  <Zap className="w-3.5 h-3.5 text-[#E65F2B]" /> Instant Size Prescription
                </span>
              </div>

              {/* PRIMARY ACTION BUTTON */}
              <div className="pt-3">
                <button
                  onClick={onOpenQuiz}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#111111] text-white font-mono-banzook text-xs sm:text-sm font-extrabold uppercase tracking-wider hover:bg-[#E65F2B] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 group"
                >
                  <Sliders className="w-4 h-4 text-[#E65F2B] group-hover:text-white transition-colors" />
                  <span>START FIT DIAGNOSTIC (30S)</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Visual Card Stack */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-sm space-y-3">
                
                {/* PREVIEW CARD 1 */}
                <div className="bg-[#F5F4F1] p-4 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="w-14 h-16 rounded-xl bg-white border border-[#111111]/20 overflow-hidden shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80"
                      alt="Boxy Tee"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono-banzook font-black text-[#E65F2B] uppercase">MATCH 99.4%</span>
                      <span className="text-[9px] font-mono-banzook font-bold text-[#666660]">280 GSM</span>
                    </div>
                    <div className="font-display font-bold text-sm text-[#111111] truncate">Heavyweight Boxy Tee</div>
                    <div className="text-[11px] text-[#666660] font-sans">Engineered drop shoulder</div>
                  </div>
                </div>

                {/* PREVIEW CARD 2 */}
                <div className="bg-white p-4 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="w-14 h-16 rounded-xl bg-[#F5F4F1] border border-[#111111]/20 overflow-hidden shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80"
                      alt="Pleated Trouser"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono-banzook font-black text-[#111111] uppercase">MATCH 98.8%</span>
                      <span className="text-[9px] font-mono-banzook font-bold text-[#666660]">JAPANESE TWILL</span>
                    </div>
                    <div className="font-display font-bold text-sm text-[#111111] truncate">Wide-Leg Pleated Trouser</div>
                    <div className="text-[11px] text-[#666660] font-sans">Deep double-pleated drape</div>
                  </div>
                </div>

                {/* LIVE TICKER CALLOUT */}
                <div className="p-3 bg-[#111111] text-white rounded-xl border border-[#111111] flex items-center justify-between font-mono-banzook text-[10px]">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    LIVE FITTING ENGINE
                  </span>
                  <span className="font-bold text-[#E65F2B]">OVER 4,200+ QUIZZES TAKEN</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
