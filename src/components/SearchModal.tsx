import React, { useState } from 'react';
import { PRODUCTS } from '../data/storeData';
import { Product } from '../types';
import { Search, X, ArrowRight, Eye } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.fabricDetails.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  const quickSearches = ['Heavyweight Tee', 'Wide-Leg Pleated', 'Loopback Hoodie', 'Wool Bomber', 'Bundles'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs font-mono-banzook">
      <div className="relative w-full max-w-2xl bg-[#F5F4F1] rounded-[20px] border border-[#111111] overflow-hidden shadow-2xl">
        
        {/* SEARCH INPUT BAR */}
        <div className="p-4 bg-white border-b border-[#111111] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#111111]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PRODUCTS, FABRICS (GSM), SIZES..."
            className="flex-1 text-sm bg-transparent border-none text-[#111111] focus:outline-none placeholder:text-neutral-400 uppercase tracking-wider"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-[#111111] cursor-pointer"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full border border-[#111111] hover:bg-[#F5F4F1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#111111]" />
          </button>
        </div>

        {/* QUICK PILLS */}
        <div className="px-5 py-3 bg-[#EBE7DF] border-b border-neutral-300 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-[#666660] font-bold">POPULAR:</span>
          {quickSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-0.5 rounded-full bg-white border border-neutral-300 hover:border-[#111111] text-[#111111] cursor-pointer whitespace-nowrap"
            >
              {term}
            </button>
          ))}
        </div>

        {/* RESULTS LIST */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="text-xs text-[#666660] uppercase mb-2">
            {query.trim() ? `SEARCH RESULTS (${results.length})` : 'FEATURED APPAREL'}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#666660]">
              No garments found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="bg-white p-3 rounded-2xl border border-neutral-300 hover:border-[#111111] flex items-center justify-between gap-4 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-14 object-cover rounded-xl border border-neutral-200 bg-[#F5F4F1]"
                  />
                  <div>
                    <div className="font-display font-bold text-sm text-[#111111]">
                      {product.name}
                    </div>
                    <div className="text-[11px] text-[#666660]">
                      {product.tagline}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#111111]">
                    ${product.price}
                  </span>
                  <div className="w-7 h-7 rounded-full border border-[#111111] flex items-center justify-center bg-[#F5F4F1]">
                    <Eye className="w-3.5 h-3.5 text-[#111111]" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
