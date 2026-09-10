import React from 'react';
import type { Product } from '../types';
import { ShopHeroStrip } from '../components/Shop/ShopHeroStrip';
import { ShopGrid } from '../components/Shop/ShopGrid';
import { QuizCTA } from '../components/Shop/QuizCTA';
import { UGCClub } from '../components/Shop/UGCClub';

interface ShopPageProps {
  onAddToCart: (product: Product, size: string, color?: string) => void;
  onQuickView: (product: Product) => void;
  onOpenQuiz: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ 
  onAddToCart, 
  onQuickView,
  onOpenQuiz
}) => {
  return (
    <div className="w-full flex flex-col bg-[#F5F4F1] min-h-screen">
      <ShopHeroStrip />
      <ShopGrid onAddToCart={onAddToCart} onQuickView={onQuickView} />
      <QuizCTA onOpenQuiz={onOpenQuiz} />
      <UGCClub />
    </div>
  );
};
