import React from 'react';
import { LookbookSlider } from '../../components/LookbookSlider/LookbookSlider';

interface HomePageProps {
  onNavigateToShop: () => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white w-full flex flex-col">
      <LookbookSlider />
    </div>
  );
};
