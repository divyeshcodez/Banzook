import React, { useState } from 'react';
import { FIT_QUIZ_QUESTIONS, PRODUCTS } from '../data/storeData';
import { Product } from '../types';
import { X, Sparkles, ArrowRight, ArrowLeft, RotateCcw, ShoppingBag, Check, Copy, Sliders, ShieldCheck, Zap, Layers } from 'lucide-react';

interface FitQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onQuickView: (product: Product) => void;
}

export const FitQuizModal: React.FC<FitQuizModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onQuickView
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [copiedPromo, setCopiedPromo] = useState(false);
  const [addedNotification, setAddedNotification] = useState(false);

  if (!isOpen) return null;

  const currentQ = FIT_QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (recommendedId: string) => {
    const updated = [...selectedAnswers, recommendedId];
    setSelectedAnswers(updated);

    if (currentStep < FIT_QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Find most frequent or primary recommendation
      const counts: Record<string, number> = {};
      updated.forEach((id) => {
        counts[id] = (counts[id] || 0) + 1;
      });
      let bestId = updated[0] || 'heavyweight-boxy-tee';
      let maxCount = 0;
      Object.entries(counts).forEach(([id, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestId = id;
        }
      });

      const matched = PRODUCTS.find((p) => p.id === bestId) || PRODUCTS[0];
      setRecommendedProduct(matched);
      if (matched.colors.length > 0) {
        setSelectedColor(matched.colors[0].name);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswers(selectedAnswers.slice(0, -1));
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setRecommendedProduct(null);
    setSelectedSize('M');
    setCopiedPromo(false);
    setAddedNotification(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BANZOOK15');
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2500);
  };

  const handleAddToCartWithSelection = () => {
    if (!recommendedProduct) return;
    onAddToCart(recommendedProduct, selectedSize, selectedColor || recommendedProduct.colors[0]?.name || 'Standard');
    setAddedNotification(true);
    setTimeout(() => {
      setAddedNotification(false);
      onClose();
    }, 900);
  };

  // Archetype profile generator based on product matched
  const getArchetype = (product: Product) => {
    switch (product.id) {
      case 'heavyweight-boxy-tee':
        return {
          title: 'THE 280 GSM STREET CURATOR',
          badge: '99.4% DRAPE MATCH',
          tagline: 'Clean boxy architecture · Anti-cling heavyweight drape · High-retention rib collar',
          vibeRating: 'Minimal High-Street Core',
          drapeScore: '9.9 / 10'
        };
      case 'wide-leg-pleated-trouser':
        return {
          title: 'THE ARCHITECTURAL MINIMALIST',
          badge: '98.8% PROPORTION MATCH',
          tagline: 'Deep front pleats · Fluid Japanese twill · Clean puddle stack over sneakers',
          vibeRating: 'Editorial Tailored Streetwear',
          drapeScore: '9.7 / 10'
        };
      case 'heavyweight-loopback-hoodie':
        return {
          title: 'THE COZY ARMOR PURIST',
          badge: '99.1% HEFT MATCH',
          tagline: '480 GSM organic cotton · Standing crossover hood · Heavyweight structured silhouette',
          vibeRating: 'Ultra-Dense Slow Luxury',
          drapeScore: '10.0 / 10'
        };
      case 'core-uniform-bundle':
        return {
          title: 'THE EFFORTLESS CAPSULE FOUNDER',
          badge: '99.8% UNIFORM MATCH',
          tagline: 'Full synchronized rotation · Zero daily decision fatigue · 100% natural luxury fibers',
          vibeRating: 'Complete Modular System',
          drapeScore: '9.9 / 10'
        };
      case 'minimalist-wool-bomber':
        return {
          title: 'THE GALLERY NIGHTS CONNOISSEUR',
          badge: '98.2% LAYER MATCH',
          tagline: '700 GSM Melton wool · Cupro satin interior · Sculptural minimalist outerwear',
          vibeRating: 'High-Elevation Minimalism',
          drapeScore: '9.6 / 10'
        };
      default:
        return {
          title: 'THE MODERN SILHOUETTE CURATOR',
          badge: '98.5% FIT MATCH',
          tagline: 'Understated genderless essentials engineered for effortless movement.',
          vibeRating: 'Elevated Daily Uniform',
          drapeScore: '9.8 / 10'
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F5F4F1] rounded-[24px] border-2 border-[#111111] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col max-h-[92vh]">
        
        {/* TOP BAR / HEADER */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#111111] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#111111] text-[#F5F4F1] flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#E65F2B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-banzook font-extrabold text-[11px] uppercase tracking-widest text-[#111111]">
                  BANZOOK // FIT ENGINE 2.0
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#111111]/5 text-[9px] font-mono-banzook uppercase font-bold text-[#666660]">
                  GEN-Z &amp; PRO CALIBRATION
                </span>
              </div>
              <p className="text-[10px] text-[#666660] font-sans">
                Aesthetic &amp; Silhouette Diagnostic System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!recommendedProduct && (
              <span className="font-mono-banzook text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F5F4F1] border border-[#111111]/20 text-[#111111]">
                STEP 0{currentStep + 1} / 0{FIT_QUIZ_QUESTIONS.length}
              </span>
            )}
            <button
              onClick={onClose}
              aria-label="Close fit quiz"
              className="p-2 rounded-full border border-[#111111] hover:bg-[#111111] hover:text-white transition-all cursor-pointer group"
            >
              <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
            </button>
          </div>
        </div>

        {/* PROGRESS BAR */}
        {!recommendedProduct && (
          <div className="w-full h-1.5 bg-[#E5E4DE] relative overflow-hidden shrink-0">
            <div
              className="h-full bg-gradient-to-r from-[#111111] via-[#E65F2B] to-[#111111] transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / FIT_QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        )}

        {/* QUIZ CONTENT BODY */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          {!recommendedProduct ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
              
              {/* CATEGORY & SUBHEADER */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#111111] text-white font-mono-banzook text-[10px] font-bold tracking-widest uppercase">
                  {currentQ.category || `PHASE 0${currentStep + 1}`}
                </span>
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="text-xs font-mono-banzook font-bold text-[#666660] hover:text-[#111111] inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                )}
              </div>

              {/* QUESTION TITLE & DESCRIPTION */}
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111111] leading-[1.05] tracking-tight">
                  {currentQ.question}
                </h3>
                <p className="text-xs sm:text-sm text-[#666660] font-sans leading-relaxed">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* OPTIONS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.recommendedProductId)}
                    className="group relative p-5 bg-white rounded-2xl border-2 border-[#111111] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200 text-left cursor-pointer flex flex-col justify-between shadow-[2px_2px_0px_#111111] hover:shadow-[4px_4px_0px_#E65F2B] hover:-translate-y-0.5"
                  >
                    <div className="space-y-2">
                      {/* OPTION BADGE */}
                      <div className="flex items-center justify-between">
                        {opt.badge ? (
                          <span className="text-[9px] font-mono-banzook font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F5F4F1] group-hover:bg-white/15 text-[#111111] group-hover:text-white border border-[#111111]/10">
                            {opt.badge}
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono-banzook font-bold text-[#666660] group-hover:text-neutral-400">
                            OPTION 0{idx + 1}
                          </span>
                        )}
                        <span className="w-5 h-5 rounded-full border border-[#111111] group-hover:border-white flex items-center justify-center text-[10px] font-mono-banzook group-hover:bg-white group-hover:text-[#111111] transition-all">
                          →
                        </span>
                      </div>

                      {/* LABEL */}
                      <div className="font-display font-bold text-base sm:text-lg text-[#111111] group-hover:text-white tracking-tight leading-snug">
                        {opt.label}
                      </div>

                      {/* DESC */}
                      <p className="text-xs text-[#666660] group-hover:text-neutral-300 font-sans leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>

                    {/* METRIC FOOTER */}
                    {opt.metric && (
                      <div className="pt-3 mt-3 border-t border-[#111111]/10 group-hover:border-white/15 flex items-center justify-between">
                        <span className="text-[10px] font-mono-banzook text-[#E65F2B] group-hover:text-[#F5F4F1] font-bold">
                          {opt.metric}
                        </span>
                        <span className="text-[10px] font-mono-banzook uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          Select <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* FOOTER NOTE */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-mono-banzook text-[#666660]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" />
                <span>Zero polyester guarantee · Tested on 500+ diverse body frames</span>
              </div>

            </div>
          ) : (
            /* RESULT STAGE */
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              
              {/* TOP MATCH BANNER */}
              {(() => {
                const archetype = getArchetype(recommendedProduct);
                return (
                  <div className="bg-gradient-to-br from-[#111111] to-[#222222] text-white p-5 sm:p-6 rounded-2xl border-2 border-[#111111] space-y-3 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/20 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#E65F2B] text-white font-mono-banzook text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        {archetype.badge}
                      </span>
                      <span className="font-mono-banzook text-[11px] text-neutral-400">
                        DIAGNOSTIC ID: #BZK-{(recommendedProduct.id).substring(0, 6).toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F4F1] tracking-tight">
                        {archetype.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                        {archetype.tagline}
                      </p>
                    </div>

                    {/* VIBE & DRAPE BADGES */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10 text-xs font-mono-banzook">
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-[10px] text-neutral-400 block">VIBE PROFILE</span>
                        <span className="font-bold text-white">{archetype.vibeRating}</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-[10px] text-neutral-400 block">DRAPE PHYSICS</span>
                        <span className="font-bold text-[#E65F2B]">{archetype.drapeScore}</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-neutral-400 block">CLOTHING CLASS</span>
                        <span className="font-bold text-white">Heavyweight Organic</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* PRODUCT SHOWCASE CARD */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#111111] space-y-5 shadow-[4px_4px_0px_#111111]">
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  
                  {/* PRODUCT IMAGE */}
                  <div className="w-full sm:w-44 aspect-3/4 rounded-xl overflow-hidden border border-[#111111]/20 bg-[#F5F4F1] shrink-0 relative group">
                    <img
                      src={recommendedProduct.image}
                      alt={recommendedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-[#111111] text-white text-[9px] font-mono-banzook font-bold px-2 py-0.5 rounded-full uppercase">
                      {recommendedProduct.badge || 'YOUR MATCH'}
                    </div>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="flex-1 space-y-3.5 w-full">
                    <div>
                      <span className="text-[10px] font-mono-banzook font-bold text-[#666660] uppercase tracking-wider">
                        RECOMMENDED APPAREL FOUNDATION
                      </span>
                      <h4 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111] tracking-tight">
                        {recommendedProduct.name}
                      </h4>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="font-display font-bold text-lg text-[#111111]">
                          ₹{recommendedProduct.price.toLocaleString('en-IN')}
                        </span>
                        {recommendedProduct.originalPrice && (
                          <span className="line-through text-xs font-mono-banzook text-[#666660]">
                            ₹{recommendedProduct.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-[11px] font-mono-banzook font-bold text-[#E65F2B] bg-[#E65F2B]/10 px-2 py-0.5 rounded-md">
                          {recommendedProduct.tagline}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#666660] font-sans leading-relaxed">
                      {recommendedProduct.description}
                    </p>

                    {/* INTERACTIVE COLOR SWITCHER */}
                    {recommendedProduct.colors && recommendedProduct.colors.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[11px] font-mono-banzook">
                          <span className="text-[#666660]">COLORWAY:</span>
                          <span className="font-bold text-[#111111]">{selectedColor || recommendedProduct.colors[0].name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {recommendedProduct.colors.map((c, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedColor(c.name)}
                              className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                                (selectedColor || recommendedProduct.colors[0].name) === c.name
                                  ? 'border-[#111111] scale-110 shadow-xs'
                                  : 'border-neutral-300 hover:scale-105'
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            >
                              {(selectedColor || recommendedProduct.colors[0].name) === c.name && (
                                <Check className={`w-3 h-3 ${c.hex.toLowerCase() === '#ffffff' || c.hex.toLowerCase() === '#f5f4f1' ? 'text-black' : 'text-white'}`} />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* INTERACTIVE SIZE SELECTOR */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px] font-mono-banzook">
                        <span className="text-[#666660]">TARGET SIZE (CALIBRATED):</span>
                        <span className="font-bold text-[#E65F2B]">
                          {selectedSize === 'M' ? 'Standard Boxy Fit' : selectedSize === 'L' || selectedSize === 'XL' ? 'Dramatic Street Drape' : 'Clean Cropped'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono-banzook font-bold uppercase transition-all cursor-pointer ${
                              selectedSize === sz
                                ? 'bg-[#111111] text-white border border-[#111111] shadow-xs'
                                : 'bg-[#F5F4F1] text-[#111111] border border-neutral-300 hover:border-[#111111]'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* PROMO BOX */}
                <div className="p-3.5 bg-[#F5F4F1] rounded-xl border border-[#111111]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-8 h-8 rounded-full bg-[#E65F2B]/15 text-[#E65F2B] flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono-banzook font-bold text-[#111111]">
                        FIT QUIZ PERK: 15% OFF THIS PIECE
                      </div>
                      <div className="text-[11px] text-[#666660] font-sans">
                        Use code <span className="font-mono-banzook font-bold text-[#111111]">BANZOOK15</span> at checkout
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-white border border-[#111111] text-xs font-mono-banzook font-bold uppercase hover:bg-[#111111] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {copiedPromo ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Code Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Code
                      </>
                    )}
                  </button>
                </div>

                {/* PRIMARY ACTIONS */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCartWithSelection}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#111111] text-white font-mono-banzook text-xs font-extrabold uppercase hover:bg-[#E65F2B] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5"
                  >
                    {addedNotification ? (
                      <>
                        <Check className="w-4 h-4 text-white" /> Added to Bag!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Bag (Size {selectedSize} · {selectedColor || 'Standard'})
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onQuickView(recommendedProduct);
                    }}
                    className="py-3.5 px-5 rounded-full border-2 border-[#111111] bg-white text-[#111111] font-mono-banzook text-xs font-extrabold uppercase hover:bg-[#F5F4F1] transition-colors cursor-pointer text-center"
                  >
                    View Specs
                  </button>
                </div>

              </div>

              {/* RETAKE FOOTER */}
              <div className="text-center pt-1">
                <button
                  onClick={handleReset}
                  className="text-xs font-mono-banzook text-[#666660] hover:text-[#111111] underline cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Diagnostic with Different Vibe
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
