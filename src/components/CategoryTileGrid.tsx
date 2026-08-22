import React from 'react';
import { CATEGORIES_DATA } from '../data/storeData';
import { ArrowRight } from 'lucide-react';

interface CategoryTileGridProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryTileGrid: React.FC<CategoryTileGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-[#111111] gap-2">
        <div>
          <span className="text-[11px] font-mono-banzook text-[#A35843] uppercase tracking-widest font-semibold">
            SHOP BY CATEGORY
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111111] tracking-tight">
            Curated Departmental Index
          </h2>
        </div>
        <span className="text-xs font-mono-banzook text-[#666660] uppercase">
          04 CORE CATEGORIES
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group cursor-pointer flex flex-col"
          >
            {/* IMAGE TILE CONTAINER */}
            <div className="relative aspect-[4/5] bg-white rounded-[20px] border border-[#111111] overflow-hidden transition-all duration-150 group-hover:border-[#A35843]">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center transition-opacity duration-200 group-hover:opacity-90"
              />
              <div className="absolute top-3 right-3 bg-[#F5F4F1] border border-[#111111] text-[#111111] text-[10px] font-mono-banzook font-bold px-2 py-0.5 rounded-full">
                {cat.count}
              </div>
            </div>

            {/* SIMPLE ARROW-LINK LABEL BELOW */}
            <div className="mt-3 flex items-center justify-between px-1">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#111111] tracking-tight group-hover:text-[#A35843] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-[#666660] font-mono-banzook line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
              <div className="w-7 h-7 rounded-full border border-[#111111] flex items-center justify-center bg-white group-hover:bg-[#111111] group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
