import React from 'react';
import { Product } from '../../types';
import { ChevronDown, Star } from 'lucide-react';

interface BulkOrderGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  hideFilters?: boolean;
}

export const BulkOrderGrid: React.FC<BulkOrderGridProps> = ({ products, onQuickView, onAddToCart, hideFilters }) => {
  const tabs = [
    'NEW', 'BEST SELLERS <3', 'TOPS', 'BOTTOMS', 'OUTERWEAR', 
    'ACCESSORIES', 'BULK ORDERS', 'SEASONAL PACKS', 
    'TEAM + GROUP ORDERS', 'REFILLS/BASICS'
  ];

  return (
    <div className="w-full bg-[#F5F4F1] font-mono-banzook">
      
      {/* Filters Bar */}
      {!hideFilters && (
        <div className="w-full border-b border-[#111111] px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-6 text-[11px] md:text-xs tracking-wider uppercase text-[#666660]">
            {tabs.map((tab) => (
              <button 
                key={tab}
                className={`whitespace-nowrap transition-colors hover:text-[#111111] ${
                  tab === 'BULK ORDERS' 
                    ? 'text-[#111111] font-bold underline decoration-1 underline-offset-4' 
                    : ''
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs uppercase shrink-0">
            <span className="text-[#666660]">SORT BY:</span>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#111111] rounded-full hover:bg-black/5 transition-colors">
              <span>FEATURED</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-[#111111]">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group relative border-b border-r border-[#111111] flex flex-col bg-[#F5F4F1] hover:bg-white transition-colors cursor-pointer"
            onClick={() => onQuickView(product)}
          >
            {/* Image */}
            <div className="w-full aspect-[4/5] relative overflow-hidden border-b border-[#111111]">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.hoverImage && (
                <img 
                  src={product.hoverImage} 
                  alt={`${product.name} alternate`}
                  className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              )}
              {product.badge && (
                <div className={`absolute top-3 left-3 px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full border border-[#111111] ${
                  product.badgeType === 'new' ? 'bg-[#D3E4CD] text-[#111111]' :
                  product.badgeType === 'bestseller' ? 'bg-[#FFD166] text-[#111111]' :
                  'bg-white text-[#111111]'
                }`}>
                  {product.badge}
                </div>
              )}
              
              {/* Quick Add Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                <button 
                  className="w-full bg-[#111111] text-[#F5F4F1] font-display font-bold uppercase text-xs tracking-widest py-3 rounded-full hover:bg-[#333] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(product);
                  }}
                >
                  QUICK ADD
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display font-bold uppercase text-sm leading-tight text-[#111111]">
                  {product.name}
                </h3>
                <div className="flex flex-col items-end gap-1 shrink-0 text-xs">
                  {product.originalPrice && (
                    <span className="text-[#666660] line-through">${product.originalPrice}</span>
                  )}
                  <span className="font-bold text-[#A35843]">${product.price}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-[#111111]">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-[10px] font-bold">{product.rating}</span>
                <span className="text-[10px] text-[#666660]">({product.reviewCount})</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
