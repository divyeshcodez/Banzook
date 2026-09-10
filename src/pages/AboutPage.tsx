import React from 'react';
import { AboutHero } from '../components/About/AboutHero';
import { AboutMission } from '../components/About/AboutMission';
import { AboutTypographicStatement } from '../components/About/AboutTypographicStatement';
import { AboutCategoryTiles } from '../components/About/AboutCategoryTiles';
import { AboutSustainability } from '../components/About/AboutSustainability';
import { AboutMaterialsLineup } from '../components/About/AboutMaterialsLineup';
import { AboutFabricGrid } from '../components/About/AboutFabricGrid';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-[#F5F4F1] min-h-screen">
      <AboutHero />
      <AboutMission />
      <AboutTypographicStatement />
      <AboutCategoryTiles />
      <AboutSustainability />
      <AboutMaterialsLineup />
      <AboutFabricGrid />
    </div>
  );
};
