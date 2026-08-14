import React from 'react';
import { GridHeroSection } from './GridHeroSection';
import { JourneySection } from './JourneySection';
import { ShopCollectionSection } from './ShopCollectionSection';

interface HomePageProps {
  onNavigateToShop: () => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white w-full flex flex-col">
      <GridHeroSection />
      <JourneySection />
      <ShopCollectionSection />
    </div>
  );
};
