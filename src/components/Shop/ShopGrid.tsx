import React, { useState } from 'react';
import type { Product } from '../../types';
import { PRODUCTS } from '../../data/storeData';
import { ChevronDown, Star } from 'lucide-react';

interface ShopGridProps {
  onAddToCart: (product: Product, size: string, color?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShopGrid: React.FC<ShopGridProps> = ({ onAddToCart, onQuickView }) => {
  const [activeTab, setActiveTab] = useState<string>('ALL');

  const filterTabs = [
    'ALL', 'NEW', 'BEST SELLERS <3', 'TOPS', 'BOTTOMS', 
    'OUTERWEAR', 'ACCESSORIES', 'BULK ORDERS', 'SALE'
  ];

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0]?.size || 'M';
    const defaultColor = product.colors[0]?.name || 'Standard';
    onAddToCart(product, defaultSize, defaultColor);
  };

  return (
    <section className="w-full bg-[#F5F4F1] pb-24">
      
      {/* Header & Filter Bar Area */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="pt-16 pb-8">
          <div className="flex items-baseline gap-4">
            <h1 className="font-display font-extrabold text-[#111111] text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Shop All Products
            </h1>
            <span className="font-mono-banzook text-[#666660] text-sm font-bold bg-black/5 px-2.5 py-0.5 rounded-full">
              {PRODUCTS.length}
            </span>
          </div>
        </div>

        {/* Filter Tabs & Sort Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111] pb-0 gap-4">
          
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pt-2">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 text-[11px] font-mono-banzook uppercase font-semibold whitespace-nowrap transition-colors ${
                    isActive ? 'text-[#1D3557]' : 'text-[#666660] hover:text-[#111111]'
                  }`}
                >
                  {tab}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D3557]"></div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pb-3 flex-shrink-0">
            <span className="text-[10px] font-mono-banzook text-[#666660] uppercase font-bold">
              Sort by:
            </span>
            <button className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#111111] bg-white text-[#111111] text-[10px] font-mono-banzook font-semibold uppercase hover:bg-black/5 transition-colors">
              <span>Featured</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-[#111111]">
          {PRODUCTS.map((product) => {
            const hasSale = product.originalPrice && product.originalPrice > product.price;
            
            return (
              <div 
                key={product.id}
                onClick={() => onQuickView(product)}
                className="group relative border-r border-b border-[#111111] bg-white cursor-pointer flex flex-col justify-between"
              >
                
                {/* Image Area */}
                <div className="relative aspect-[4/5] bg-[#F5F4F1] border-b border-[#111111] overflow-hidden rounded-t-[16px]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#1D3557]/10 text-[#1D3557] border border-[#1D3557]/20 px-2.5 py-1 rounded-full text-[9px] font-mono-banzook font-bold uppercase tracking-widest backdrop-blur-md">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Hover Add To Cart Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <button 
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="w-full bg-[#1D3557] text-white py-3.5 text-xs font-mono-banzook font-bold uppercase tracking-wider text-center"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 flex flex-col gap-1 bg-white rounded-b-[16px] z-20 relative">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-bold text-sm text-[#111111] leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="text-right flex-shrink-0 flex flex-col items-end">
                      {hasSale && (
                        <span className="text-[10px] font-mono-banzook text-[#666660] line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className={`text-sm font-mono-banzook font-bold ${hasSale ? 'text-[#1D3557]' : 'text-[#111111]'}`}>
                        ${product.price}
                      </span>
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex text-[#666660]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono-banzook text-[#666660] uppercase mt-0.5">
                      {product.reviewCount} Reviews
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
