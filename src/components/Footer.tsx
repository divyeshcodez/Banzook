import React from 'react';
import { ArrowUp, Globe } from 'lucide-react';

interface FooterProps {
  onNavigateCategory: (category: string) => void;
  onOpenSizeGuide: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateCategory,
  onOpenSizeGuide,
  onOpenQuiz
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#111111] bg-[#111111] text-[#F5F4F1] pt-16 pb-12 font-mono-banzook">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 4 COLUMNS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-xs">
          
          {/* COLUMN 1: SHOP */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-widest text-[11px] border-b border-neutral-800 pb-2">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigateCategory('new')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('bestsellers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('tops')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tops &amp; Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('bottoms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bottoms &amp; Trousers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('outerwear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Outerwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('bundles')}
                  className="hover:text-white transition-colors cursor-pointer text-[#A35843]"
                >
                  Core Bundles (Save $)
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: HELP */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-widest text-[11px] border-b border-neutral-800 pb-2">
              HELP
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Size &amp; Fit Guide
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Shipping &amp; Delivery
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  30-Day Free Returns
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Track Your Order
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Contact Support
                </span>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: LEARN */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-widest text-[11px] border-b border-neutral-800 pb-2">
              LEARN
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  About Banzook
                </span>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Take the Fit Quiz
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Fabric &amp; GSM Guide
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Store Locator (LA &amp; NY)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Sustainability Standards
                </span>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: CONNECT */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-widest text-[11px] border-b border-neutral-800 pb-2">
              CONNECT
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram (@banzook.la)
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Spotify Radio
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Community Rewards
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Press Inquiries
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* LARGE WORDMARK LOGO & SCROLL TO TOP */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="font-display font-extrabold text-3xl sm:text-4xl tracking-[-0.04em] text-white uppercase">
              BANZOOK
            </div>
            <p className="text-[10px] text-neutral-400 tracking-widest uppercase mt-0.5">
              Dressed for the way you move. EST. LOS ANGELES.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full border border-neutral-700 bg-neutral-900 text-xs text-neutral-300 hover:text-white hover:border-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* COPYRIGHT & COMPLIANCE BAR */}
        <div className="border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} BANZOOK APPAREL CO. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline hover:underline cursor-pointer">PRIVACY POLICY</span>
            <span className="hidden md:inline hover:underline cursor-pointer">TERMS OF SERVICE</span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-400">
            <Globe className="w-3 h-3" />
            <span>USD ($) · UNITED STATES · ENGLISH</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
