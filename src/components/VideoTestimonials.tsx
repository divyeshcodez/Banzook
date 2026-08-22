import React from 'react';
import { UGC_STYLE_CHECKS } from '../data/storeData';
import { Product } from '../types';
import { PRODUCTS } from '../data/storeData';
import { Check, ShoppingBag, ArrowRight, UserCheck } from 'lucide-react';

interface VideoTestimonialsProps {
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({
  onAddToCart,
  onQuickView
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#111111] gap-2">
        <div>
          <span className="text-[11px] font-mono-banzook text-[#A35843] uppercase tracking-widest font-semibold">
            REAL-WORLD FIT CHECKS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111111] tracking-tight">
            The Community in Motion
          </h2>
        </div>
        <p className="text-xs font-mono-banzook text-[#666660] uppercase">
          TAG @BANZOOK.LA TO BE FEATURED
        </p>
      </div>

      {/* HORIZONTAL SCROLL ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {UGC_STYLE_CHECKS.map((item) => {
          const matchedProduct = PRODUCTS.find((p) => p.id === item.taggedProductId) || PRODUCTS[0];

          return (
            <div
              key={item.id}
              className="bg-white rounded-[20px] border border-[#111111] overflow-hidden flex flex-col justify-between"
            >
              {/* IMAGE STAGE */}
              <div className="relative aspect-[3/4] bg-[#F5F4F1] overflow-hidden border-b border-[#111111]">
                <img
                  src={item.image}
                  alt={item.creator}
                  className="w-full h-full object-cover object-center"
                />
                
                <div className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-mono-banzook font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  <span>{item.stats}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm border border-[#111111] p-2.5 rounded-xl text-[11px] font-mono-banzook text-[#111111]">
                  <span className="font-bold text-[#A35843] block">FIT VERDICT:</span>
                  <span>{item.fitVerdict}</span>
                </div>
              </div>

              {/* CAPTION & CREATOR */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono-banzook">
                    <span className="font-bold text-[#111111]">{item.creator}</span>
                    <span className="text-[#666660]">{item.handle}</span>
                  </div>
                  <p className="text-xs text-[#111111]/80 leading-relaxed font-normal">
                    &ldquo;{item.caption}&rdquo;
                  </p>
                </div>

                {/* TAGGED PRODUCT PILL */}
                <div className="pt-2 border-t border-neutral-200">
                  <div
                    onClick={() => onQuickView(matchedProduct)}
                    className="p-2 bg-[#F5F4F1] rounded-xl border border-neutral-200 hover:border-[#111111] flex items-center justify-between gap-2 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={item.taggedProductImage}
                        alt={item.taggedProductName}
                        className="w-8 h-8 rounded-lg object-cover border border-neutral-300"
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono-banzook font-bold text-[#111111] truncate">
                          {item.taggedProductName}
                        </div>
                        <div className="text-[10px] font-mono-banzook text-[#A35843]">
                          ${item.taggedProductPrice}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(matchedProduct, 'M');
                      }}
                      className="p-1.5 rounded-full border border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer shrink-0"
                      title="Quick Add to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
