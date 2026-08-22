import React, { useState } from 'react';
import { FIT_QUIZ_QUESTIONS, PRODUCTS } from '../data/storeData';
import { Product } from '../types';
import { PillButton } from './PillButton';
import { X, Sparkles, Check, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';

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

  if (!isOpen) return null;

  const currentQ = FIT_QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (recommendedId: string) => {
    const updated = [...selectedAnswers, recommendedId];
    setSelectedAnswers(updated);

    if (currentStep < FIT_QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate best recommendation based on user selections
      const targetId = updated[0] || 'heavyweight-boxy-tee';
      const matched = PRODUCTS.find((p) => p.id === targetId) || PRODUCTS[0];
      setRecommendedProduct(matched);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setRecommendedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono-banzook">
      <div className="relative w-full max-w-2xl bg-[#F5F4F1] rounded-[20px] border border-[#111111] overflow-hidden shadow-2xl">
        
        {/* HEADER */}
        <div className="p-4 bg-white border-b border-[#111111] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A35843]" />
            <span className="font-bold text-xs uppercase tracking-widest text-[#111111]">
              FIT &amp; PROPORTION FINDER
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full border border-[#111111] hover:bg-[#F5F4F1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#111111]" />
          </button>
        </div>

        {/* QUIZ BODY */}
        <div className="p-6 sm:p-10">
          {!recommendedProduct ? (
            <div className="space-y-6">
              
              {/* STEP PROGRESS */}
              <div className="flex items-center justify-between text-xs text-[#666660]">
                <span>QUESTION {currentStep + 1} OF {FIT_QUIZ_QUESTIONS.length}</span>
                <span className="text-[#A35843] font-bold">SILHOUETTE DIAGNOSTIC</span>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#111111] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / FIT_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* QUESTION */}
              <div className="space-y-1">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#111111] tracking-tight">
                  {currentQ.question}
                </h3>
                <p className="text-xs text-[#666660] font-sans">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* OPTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.recommendedProductId)}
                    className="p-4 bg-white rounded-2xl border border-[#111111] hover:bg-[#111111] hover:text-white transition-all text-left group cursor-pointer space-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#111111] group-hover:text-white">
                        {opt.label}
                      </div>
                      <div className="text-xs text-[#666660] group-hover:text-neutral-300 font-sans mt-1">
                        {opt.desc}
                      </div>
                    </div>
                    <div className="pt-2 text-right">
                      <span className="text-[10px] uppercase font-bold text-[#A35843] group-hover:text-[#F5F4F1] inline-flex items-center gap-1">
                        Select <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* RESULT STAGE */
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-[#A35843] uppercase tracking-widest">
                  IDEAL SILHOUETTE MATCH
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#111111] tracking-tight">
                  Your Signature Banzook Foundation
                </h3>
                <p className="text-xs text-[#666660] font-sans max-w-md mx-auto">
                  Based on your movement habits and drape preference, this piece provides optimum weight and geometry.
                </p>
              </div>

              {/* PRODUCT CARD */}
              <div className="bg-white p-5 rounded-2xl border border-[#111111] flex flex-col sm:flex-row gap-5 items-center">
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name}
                  className="w-32 h-40 object-cover rounded-xl border border-neutral-200 bg-[#F5F4F1]"
                />

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#111111] text-white">
                    {recommendedProduct.badge || 'RECOMMENDED'}
                  </span>
                  
                  <h4 className="font-display font-bold text-xl text-[#111111]">
                    {recommendedProduct.name}
                  </h4>
                  
                  <div className="text-xs font-bold text-[#A35843]">
                    ${recommendedProduct.price} · {recommendedProduct.tagline}
                  </div>

                  <p className="text-xs text-[#666660] font-sans">
                    {recommendedProduct.fit}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => {
                        onAddToCart(recommendedProduct, 'M', recommendedProduct.colors[0]?.name || 'Standard');
                        onClose();
                      }}
                      className="px-5 py-2 rounded-full bg-[#111111] text-white text-xs font-bold uppercase hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Bag (Size M)
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onQuickView(recommendedProduct);
                      }}
                      className="px-4 py-2 rounded-full border border-[#111111] bg-white text-xs font-bold uppercase hover:bg-[#F5F4F1] transition-colors cursor-pointer"
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              </div>

              {/* RESTART */}
              <div className="text-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-[#666660] hover:text-[#111111] underline cursor-pointer inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Retake Fit Quiz
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
