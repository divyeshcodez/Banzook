import React from 'react';
import { LookbookSlider } from '../../components/LookbookSlider/LookbookSlider';
import { FeaturedDrop } from './FeaturedDrop';
import { BrandStatement } from './BrandStatement';
import { ShopByCategory } from './ShopByCategory';
import { FinalCTA } from './FinalCTA';

interface HomePageProps {
  onNavigateToShop: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToShop }) => {
  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white w-full flex flex-col">
      <LookbookSlider />
      <FeaturedDrop onViewPiece={onNavigateToShop} />
      <BrandStatement />
      <ShopByCategory />
      <FinalCTA onExploreClick={onNavigateToShop} />
    </div>
  );
};
