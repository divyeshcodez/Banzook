import React from 'react';
import { GridHeroSection } from './GridHeroSection';
import { JourneySection } from './JourneySection';
import { ShopCollectionSection } from './ShopCollectionSection';
import { B2BSection } from './B2BSection';

interface HomePageProps {
  onNavigateToShop: () => void;
  onNavigateToB2B: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToB2B }) => {
  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white w-full flex flex-col">
      <GridHeroSection />
      <JourneySection />
      <ShopCollectionSection />
      <B2BSection onNavigateToB2B={onNavigateToB2B} />
    </div>
  );
};
