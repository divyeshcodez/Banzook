import React, { useState } from 'react';
import { PRODUCTS } from '../data/storeData';
import { Product, ProductCategory } from '../types';
import { PillButton } from './PillButton';
import { Star, Eye, ShoppingBag, Check } from 'lucide-react';

interface BestSellersProps {
  onAddToCart: (product: Product, size: string, color?: string) => void;
  onQuickView: (product: Product) => void;
  activeCategoryFilter: string;
  onFilterChange: (category: string) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  onAddToCart,
  onQuickView,
  activeCategoryFilter,
  onFilterChange
}) => {
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filterTabs = [
    { label: 'ALL ESSENTIALS', value: 'all' },
    { label: 'TOPS', value: 'tops' },
    { label: 'BOTTOMS', value: 'bottoms' },
    { label: 'OUTERWEAR', value: 'outerwear' },
    { label: 'ACCESSORIES', value: 'accessories' },
    { label: 'BUNDLES', value: 'bundles' }
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'bestsellers') return p.isBestseller;
    if (activeCategoryFilter === 'new') return p.isNew;
    return p.category === activeCategoryFilter;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0]?.size || 'M';
    const defaultColor = product.colors[0]?.name || 'Standard';
    onAddToCart(product, defaultSize, defaultColor);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1200);
  };

  return (
    <section id="best-sellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
      
      {/* SECTION HEADER & FILTER TABS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#111111] gap-4">
        <div>
          <span className="text-[11px] font-mono-banzook text-[#A35843] uppercase tracking-widest font-semibold">
            ENGINEERED APPAREL
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111111] tracking-tight">
            Best Sellers &amp; Core Uniform
          </h2>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {filterTabs.map((tab) => {
            const isActive = activeCategoryFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => onFilterChange(tab.value)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono-banzook uppercase font-semibold transition-colors cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#111111] border-[#111111]/30 hover:border-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4-COLUMN DESKTOP PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isHovered = hoveredProductId === product.id;
          const displayImage = isHovered && product.hoverImage ? product.hoverImage : product.image;
          const isAdded = recentlyAddedId === product.id;

          return (
            <div
              key={product.id}
              onClick={() => onQuickView(product)}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              className="group bg-white rounded-[20px] border border-[#111111] overflow-hidden flex flex-col justify-between transition-colors duration-150 cursor-pointer"
            >
              {/* IMAGE STAGE */}
              <div className="relative aspect-[3/4] bg-[#F5F4F1] overflow-hidden border-b border-[#111111]">
                <img
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-opacity duration-200"
                />

                {/* BADGE (Minimal NEW or CORE) */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-mono-banzook font-bold px-2.5 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}

                {/* QUICK VIEW TRIGGER ICON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(product);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* CARD DETAILS */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  {/* Rating & Review count */}
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-banzook text-[#666660]">
                    <div className="flex text-[#111111]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current stroke-none" />
                      ))}
                    </div>
                    <span>({product.reviewCount})</span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-[#111111] tracking-tight group-hover:text-[#A35843] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#666660] font-mono-banzook">
                    {product.tagline}
                  </p>
                </div>

                {/* COLOR SWATCHES & PRICE */}
                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                  {/* Color dots */}
                  <div className="flex items-center gap-1.5">
                    {product.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-3 h-3 rounded-full border border-black/30"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                    {product.colors.length > 0 && (
                      <span className="text-[10px] font-mono-banzook text-[#666660] ml-0.5">
                        {product.colors.length} {product.colors.length === 1 ? 'col' : 'cols'}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-sm font-mono-banzook font-bold text-[#111111]">
                    {product.originalPrice ? (
                      <div className="flex items-center gap-1.5">
                        <span className="line-through text-[#666660] font-normal text-xs">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span>₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                    ) : (
                      <span>₹{product.price.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>

                {/* ADD TO BAG ACTION */}
                <div className="pt-1">
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    disabled={isAdded}
                    className={`w-full py-2.5 rounded-full border border-[#111111] text-xs font-mono-banzook uppercase font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      isAdded
                        ? 'bg-[#111111] text-white'
                        : 'bg-white text-[#111111] hover:bg-[#111111] hover:text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>QUICK ADD</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
