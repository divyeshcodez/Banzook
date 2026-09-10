import React, { useState } from 'react';
import { Product } from '../types';
import { PillButton } from './PillButton';
import { X, Star, Check, ShieldCheck, Ruler, Sparkles, Layers } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const currentSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleAdd = () => {
    onAddToCart(product, currentSize.size, currentColor.name);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-[#F5F4F1] rounded-[20px] border border-[#111111] overflow-hidden shadow-2xl flex flex-col font-mono-banzook max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-4 bg-white border-b border-[#111111] flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#A35843]">
            GARMENT SPECIFICATION
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full border border-[#111111] hover:bg-[#F5F4F1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#111111]" />
          </button>
        </div>

        {/* CONTENT GRID */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          
          {/* IMAGE STAGE (left 5 cols) */}
          <div className="sm:col-span-5 bg-white rounded-2xl border border-[#111111] overflow-hidden aspect-[3/4] relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#111111] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* DETAILS & ACTIONS (right 7 cols) */}
          <div className="sm:col-span-7 space-y-4">
            
            <div>
              {/* Rating */}
              <div className="flex items-center gap-1.5 text-xs mb-1">
                <div className="flex text-[#111111]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current stroke-none" />
                  ))}
                </div>
                <span className="font-bold text-[#666660]">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#111111] tracking-tight">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-[#111111] font-mono-banzook">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#666660] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[10px] text-[#A35843] font-bold uppercase ml-2">
                  {product.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#666660] leading-relaxed font-sans">
              {product.description}
            </p>

            {/* COLOR SELECTOR */}
            {product.colors.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#111111] uppercase">COLOR:</span>
                  <span className="text-[#666660] font-medium">{currentColor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                        selectedColorIndex === idx
                          ? 'border-[#111111] scale-110'
                          : 'border-transparent hover:border-neutral-400'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/30 block"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZE SELECTOR */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#111111] uppercase">SELECT SIZE:</span>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-[10px] text-[#A35843] underline hover:text-[#111111] cursor-pointer flex items-center gap-1"
                >
                  <Ruler className="w-3 h-3" /> Size Guide
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((s, idx) => (
                  <button
                    key={idx}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-2 rounded-xl border text-xs font-bold text-center transition-colors cursor-pointer ${
                      !s.inStock
                        ? 'opacity-30 bg-neutral-200 border-neutral-300 cursor-not-allowed line-through'
                        : selectedSizeIndex === idx
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-white text-[#111111] border-neutral-300 hover:border-[#111111]'
                    }`}
                  >
                    <div>{s.size}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* TEXTILE & FIT NOTE CARD */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-300 text-xs space-y-1.5">
              <div className="font-bold text-[#111111] uppercase flex items-center gap-1.5 text-[11px]">
                <Layers className="w-3.5 h-3.5 text-[#A35843]" /> TEXTILE &amp; SILHOUETTE:
              </div>
              <p className="text-[11px] text-[#666660] font-sans leading-relaxed">
                {product.fabricDetails}
              </p>
              <div className="text-[11px] text-[#111111] font-bold">
                Fit Note: <span className="font-normal text-[#666660] font-sans">{product.fit}</span>
              </div>
            </div>

            {/* ADD TO BAG BUTTON */}
            <div className="pt-2">
              <button
                onClick={handleAdd}
                disabled={added || !currentSize.inStock}
                className={`w-full py-3 rounded-full border border-[#111111] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  added
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-[#111111] hover:bg-neutral-800 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <span>ADD TO BAG — ₹{currentSize.price.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
