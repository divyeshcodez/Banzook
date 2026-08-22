import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenQuiz: () => void;
  onOpenSizeGuide: () => void;
  onOpenAccount: () => void;
  onNavigateCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenQuiz,
  onOpenSizeGuide,
  onOpenAccount,
  onNavigateCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'SHOP', category: 'all' },
    { label: 'NEW', category: 'new' },
    { label: 'BEST SELLERS', category: 'bestsellers' },
    { label: 'BUNDLES', category: 'bundles' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F5F4F1]/95 backdrop-blur-md border-b border-[#111111] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* LEFT: DESKTOP NAVIGATION / MOBILE HAMBURGER */}
        <div className="flex items-center gap-6 lg:w-1/3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#111111] hover:text-[#A35843] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono-banzook tracking-wider uppercase text-[#111111]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigateCategory(link.category)}
                className="hover:text-[#A35843] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#111111] hover:after:w-full after:transition-all"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={onOpenQuiz}
              className="text-[#A35843] hover:text-[#111111] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>FIT QUIZ</span>
            </button>
          </nav>
        </div>

        {/* CENTER: MINIMALIST WORDMARK LOGO */}
        <div className="flex flex-col items-center justify-center lg:w-1/3 text-center cursor-pointer" onClick={() => onNavigateCategory('all')}>
          <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-[-0.04em] text-[#111111] leading-none uppercase select-none">
            BANZOOK
          </span>
          <span className="text-[9px] font-mono-banzook text-[#666660] tracking-[0.25em] uppercase mt-1">
            EST. LOS ANGELES
          </span>
        </div>

        {/* RIGHT: ICONS (SEARCH, SIZE GUIDE, ACCOUNT, CART) */}
        <div className="flex items-center justify-end gap-3 sm:gap-5 lg:w-1/3 text-xs font-mono-banzook">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#111111] hover:text-[#A35843] transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="Search clothing"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden xl:inline uppercase text-[11px]">SEARCH</span>
          </button>

          <button
            onClick={onOpenSizeGuide}
            className="hidden md:flex items-center gap-1 p-2 text-[#666660] hover:text-[#111111] transition-colors cursor-pointer text-[11px]"
            title="Size & Measurement Guide"
          >
            <span>SIZE GUIDE</span>
          </button>

          <button
            onClick={onOpenAccount}
            className="p-2 text-[#111111] hover:text-[#A35843] transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="User Account"
          >
            <User className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden xl:inline uppercase text-[11px]">ACCOUNT</span>
          </button>

          <button
            onClick={onOpenCart}
            className="p-2 pl-3 pr-4 rounded-full border border-[#111111] bg-white text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer flex items-center gap-2"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[1.75]" />
            <span className="font-bold text-[11px]">BAG ({cartCount})</span>
          </button>
        </div>

      </div>

      {/* MOBILE EXPANDED MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#111111] bg-[#F5F4F1] p-6 space-y-5 animate-in fade-in duration-150">
          <div className="space-y-3 font-mono-banzook text-sm uppercase">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigateCategory(link.category);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 border-b border-neutral-200 text-[#111111] hover:text-[#A35843] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2 font-mono-banzook text-xs">
            <button
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-full border border-[#111111] bg-[#111111] text-white flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A35843]" />
              FIND YOUR FIT (QUIZ)
            </button>
            <button
              onClick={() => {
                onOpenSizeGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full border border-[#111111] bg-white text-[#111111] text-center"
            >
              SIZE & MEASUREMENT GUIDE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
