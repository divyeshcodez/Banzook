import React, { useState } from 'react';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  currentPage?: 'home' | 'shop' | 'drops' | 'about';
  onPageChange?: (page: 'home' | 'shop' | 'drops' | 'about') => void;
  onOpenHelp?: (tab: 'returns' | 'size-guide' | 'faq') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home', onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();

  const handleNavClick = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onPageChange && (page === 'home' || page === 'shop' || page === 'drops' || page === 'about')) {
      onPageChange(page as any);
    }
  };

  const navLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'SHOP', id: 'shop' },
    { name: 'DROPS', id: 'drops' },
    { name: 'LOOKBOOK', id: 'lookbook' },
    { name: 'ABOUT', id: 'about' }
  ];

  return (
    <>
      <header 
        className={`sticky top-0 w-full z-[100] transition-all duration-300 h-[72px] flex items-center bg-[#0B0B0C]/80 backdrop-blur-md border-b border-white/10`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Left - Logo */}
          <div className="flex-1">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick('home', e)}
              className="text-2xl font-black font-condensed tracking-tighter text-white"
            >
              BANZOOK
            </a>
          </div>

          {/* Center - Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`text-xs font-bold tracking-widest uppercase transition-colors ${
                  currentPage === link.id ? 'text-[#FF4D1A]' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right - Actions */}
          <div className="flex-1 flex justify-end items-center gap-4 lg:gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-[#FF4D1A] transition-colors"
            >
              <Search size={20} strokeWidth={2} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-white hover:text-[#FF4D1A] transition-colors flex items-center gap-1"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              <span className="text-xs font-bold font-mono">({cartCount})</span>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-[#FF4D1A] transition-colors"
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
             <a href="#home" onClick={(e) => handleNavClick('home', e)} className="text-2xl font-black font-condensed tracking-tighter">
              BANZOOK
            </a>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={28} strokeWidth={2} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-3xl font-black font-condensed tracking-tighter">
             {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(link.id, e)}
                className={currentPage === link.id ? 'text-[#FF4D1A]' : 'text-[#111111]'}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
