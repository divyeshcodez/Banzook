import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturedDrop } from './FeaturedDrop';
import { BrandStatement } from './BrandStatement';
import { ShopByCategory } from './ShopByCategory';
import { FinalCTA } from './FinalCTA';

interface HomePageProps {
  onNavigateToShop: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToShop }) => {
  return (
    <div className="bg-[#F8F7F5] min-h-screen text-[#111111] overflow-hidden">
      <HeroSection onExploreClick={onNavigateToShop} />
      <FeaturedDrop onViewPiece={onNavigateToShop} />
      <BrandStatement />
      <ShopByCategory />
      <FinalCTA onExploreClick={onNavigateToShop} />
    </div>
  );
};
