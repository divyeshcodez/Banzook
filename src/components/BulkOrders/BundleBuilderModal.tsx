import React, { useState } from 'react';
import { Product } from '../../types';
import { X, Heart } from 'lucide-react';
import { PRODUCTS } from '../../data/storeData';

interface BundleBuilderModalProps {
  product: Product;
  onClose: () => void;
}

// Configurator options based on prompt
const BUILDER_ITEMS = [
  { id: 'item-1', name: 'Heavyweight Cotton Tee', desc: 'SOFT, STRUCTURED, EVERYDAY.', comp: '100% Organic Cotton', tag: 'BEST SELLER', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', category: 'TOP' },
  { id: 'item-2', name: 'Relaxed Fit Hoodie', desc: 'LOOSE FIT, BRUSHED INTERIOR.', comp: 'Cotton + Recycled Poly', tag: '+ NEW', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80', category: 'OUTERWEAR' },
  { id: 'item-3', name: 'Core Crewneck', desc: 'CLASSIC FIT, LOOPBACK TERRY.', comp: '100% Cotton', tag: null, image: 'https://images.unsplash.com/photo-1572495532056-8583af1cbf91?auto=format&fit=crop&w=800&q=80', category: 'TOP' },
  { id: 'item-4', name: 'Utility Jacket', desc: 'WORKWEAR INSPIRED, TOUGH.', comp: 'Cotton Canvas', tag: null, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80', category: 'OUTERWEAR' },
  { id: 'item-5', name: 'Wide-Leg Pant', desc: 'RELAXED DRAPE, MID-WEIGHT.', comp: 'Cotton + Elastane', tag: 'BEST SELLER', image: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&w=800&q=80', category: 'BOTTOM' },
];

export const BundleBuilderModal: React.FC<BundleBuilderModalProps> = ({ product, onClose }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activePreviewId, setActivePreviewId] = useState<string>(BUILDER_ITEMS[0].id);

  const REQUIRED_ITEMS = 3;
  const progressPercent = Math.min((selectedItems.length / REQUIRED_ITEMS) * 100, 100);

  const handleToggleItem = (id: string) => {
    setActivePreviewId(id);
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      }
      if (prev.length < REQUIRED_ITEMS) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const activeItem = BUILDER_ITEMS.find(item => item.id === activePreviewId) || BUILDER_ITEMS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#111111]/40 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Main Container */}
      <div className="w-full max-w-[1200px] max-h-[95vh] bg-[#F5F4F1] border border-[#111111] flex flex-col relative overflow-hidden shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors z-20"
        >
          <X className="w-5 h-5 text-[#111111]" />
        </button>

        {/* --- 1. TOP ZONE (Breadcrumb + Title) --- */}
        <div className="flex-shrink-0 p-6 md:p-8 border-b border-[#111111]">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            
            <div className="flex-1 max-w-2xl">
              <div className="font-mono-banzook text-[10px] md:text-xs text-[#666660] uppercase tracking-widest mb-4">
                BULK ORDERS // {product.name}
              </div>
              <div className="font-mono-banzook text-xs font-bold text-[#111111] uppercase tracking-widest mb-2">
                BUILD UR OWN
              </div>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[#111111] uppercase tracking-tight leading-none mb-4">
                {product.name}
              </h1>
              <p className="font-sans text-sm md:text-base text-[#111111] leading-relaxed mb-4">
                {product.description} A wardrobe starter for everywhere you go — home, work, or travel. Get a taste of what it's like to build your everyday rotation with our best-selling basics. Wear it, layer it, wash it on repeat.
              </p>
              <button className="font-mono-banzook text-xs text-[#666660] underline underline-offset-4 hover:text-[#111111] transition-colors">
                Need help sizing? See our fit guide.
              </button>
            </div>

            <div className="flex flex-col items-start md:items-end shrink-0">
              {product.originalPrice && (
                <div className="font-mono-banzook text-sm text-[#666660] line-through mb-1">
                  ${product.originalPrice.toFixed(2)}
                </div>
              )}
              <div className="font-display font-bold text-3xl text-[#111111]">
                ${product.price.toFixed(2)}
              </div>
              <div className="font-mono-banzook text-[10px] text-[#666660] mt-1">
                Tax included.
              </div>
            </div>

          </div>
        </div>

        {/* --- MIDDLE ZONE (Build Progress + Item Selection) --- */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
          
          {/* Middle-Left: Build Progress & Preview */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-[#111111]">
            <div className="font-mono-banzook text-xs font-bold text-[#111111] uppercase tracking-widest mb-4 flex justify-between items-center">
              <span>{Math.round(progressPercent)}% COMPLETE</span>
              <span className="text-[#666660]">{selectedItems.length} / {REQUIRED_ITEMS} SELECTED</span>
            </div>
            
            {/* Image Preview Panel */}
            <div className="relative w-full aspect-[4/5] bg-white border border-[#111111] mb-6 overflow-hidden group">
              <div className="absolute top-4 left-4 z-10 font-mono-banzook text-[10px] font-bold bg-white/90 backdrop-blur-sm px-2 py-1 border border-[#111111]">
                {activeItem.category}
              </div>
              <img 
                src={activeItem.image} 
                alt={activeItem.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-[#EBEBEB] relative">
              <div 
                className="absolute top-0 left-0 h-full bg-[#A35843] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Middle-Right: Scrollable Item Selection List */}
          <div className="w-full md:w-1/2 flex flex-col">
            
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {BUILDER_ITEMS.map((item, idx) => {
                const isSelected = selectedItems.includes(item.id);
                const isMaxReached = selectedItems.length >= REQUIRED_ITEMS && !isSelected;

                return (
                  <div 
                    key={item.id}
                    onClick={() => !isMaxReached && handleToggleItem(item.id)}
                    className={`flex items-center gap-4 p-6 border-b border-[#111111] cursor-pointer transition-colors ${
                      isSelected ? 'bg-white' : 'hover:bg-white/50'
                    } ${isMaxReached ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    
                    {/* Radio */}
                    <div className="shrink-0 flex items-center justify-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'border-[#A35843] bg-[#A35843]' : 'border-[#111111]'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-[#F5F4F1] rounded-full" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-display font-bold text-[#111111] text-lg uppercase leading-tight">
                          {item.name}
                        </span>
                        {item.tag && (
                          <span className={`shrink-0 px-2 py-0.5 text-[9px] font-mono-banzook font-bold uppercase tracking-widest ${
                            item.tag === 'BEST SELLER' ? 'bg-[#FFD166] text-[#111111]' : 'bg-[#D3E4CD] text-[#111111]'
                          }`}>
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <span className="font-mono-banzook text-[10px] text-[#666660] italic uppercase tracking-wider mb-1">
                        {item.desc}
                      </span>
                      <span className="font-mono-banzook text-[10px] text-[#111111] uppercase tracking-widest">
                        {item.comp}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Summary Panel (Bottom of right column) */}
            <div className="p-6 bg-[#EBEBEB] border-t border-[#111111]">
              <h4 className="font-mono-banzook text-xs font-bold text-[#111111] uppercase tracking-widest mb-2">
                WHAT YOU GET
              </h4>
              <p className="font-sans text-sm text-[#111111] leading-relaxed mb-2">
                The {product.name} includes any {REQUIRED_ITEMS} items of your choice from the list above. Perfect for building a cohesive rotation.
              </p>
              <p className="font-sans text-xs text-[#666660] italic">
                (Because our bundles are already discounted, additional codes and discounts can't be applied.)
              </p>
            </div>

          </div>

        </div>

        {/* --- BOTTOM CTA ZONE --- */}
        <div className="flex-shrink-0 w-full border-t border-[#111111] bg-[#F5F4F1] flex">
          <button 
            disabled={selectedItems.length < REQUIRED_ITEMS}
            className={`flex-1 flex items-center justify-center p-5 font-display font-bold uppercase tracking-widest text-sm transition-colors ${
              selectedItems.length === REQUIRED_ITEMS 
                ? 'bg-[#111111] text-[#F5F4F1] hover:bg-[#333]' 
                : 'bg-[#EBEBEB] text-[#666660] cursor-not-allowed'
            }`}
          >
            {selectedItems.length === REQUIRED_ITEMS 
              ? `CHOOSE UR SIZE — $${product.price.toFixed(2)}` 
              : `SELECT ${REQUIRED_ITEMS - selectedItems.length} MORE ITEMS`}
          </button>
          
          <button className="shrink-0 w-[60px] md:w-[72px] flex items-center justify-center bg-[#A35843] hover:bg-[#8A4A38] text-[#F5F4F1] transition-colors border-l border-[#111111]">
            <Heart className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
