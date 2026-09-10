import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/storeData';
import { BulkOrderGrid } from '../components/BulkOrders/BulkOrderGrid';
import { BulkPromoBanner } from '../components/BulkOrders/BulkPromoBanner';
import { BuildYourOwnBundle } from '../components/BulkOrders/BuildYourOwnBundle';
import { EmailSignup } from '../components/EmailSignup';

interface BulkOrdersPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onOpenBundle: (product: Product) => void;
}

export const BulkOrdersPage: React.FC<BulkOrdersPageProps> = ({ onAddToCart, onOpenBundle }) => {
  // Get all bundle products
  const bulkProducts = PRODUCTS.filter(p => p.category === 'bundles');
  
  // Split for the two grids
  const topGridProducts = bulkProducts.slice(0, 4);
  const bottomGridProducts = bulkProducts.slice(4);

  return (
    <div className="w-full flex flex-col bg-[#F5F4F1] min-h-screen">
      
      {/* Page Heading */}
      <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto w-full flex items-start gap-4">
        <h1 className="font-display font-extrabold text-[#111111] text-6xl md:text-8xl uppercase tracking-tighter leading-none">
          Bulk Orders
        </h1>
        <span className="font-mono-banzook font-bold text-xs bg-[#111111] text-white px-2 py-1 rounded-full mt-2">
          {bulkProducts.length}
        </span>
      </div>

      <BulkOrderGrid 
        products={topGridProducts} 
        onAddToCart={onAddToCart} 
        onQuickView={onOpenBundle} 
      />

      <BulkPromoBanner />

      <BulkOrderGrid 
        products={bottomGridProducts} 
        onAddToCart={onAddToCart} 
        onQuickView={onOpenBundle}
        hideFilters={true}
      />

      <BuildYourOwnBundle />

      <EmailSignup onCouponClaimed={() => {}} />

    </div>
  );
};
