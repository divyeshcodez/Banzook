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
        className="sticky top-0 w-full z-[100] h-[76px] flex items-center bg-[rgba(10,10,11,0.92)] backdrop-blur-[16px]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}
      >
        <div className="w-full px-[24px] md:px-[56px] flex items-center justify-between">
          
          {/* Left - Logo */}
          <div className="flex-1">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick('home', e)}
              className="text-white hover:text-white/80 transition-colors focus:outline-none"
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '18px', 
                fontWeight: 800, 
                letterSpacing: '0.12em' 
              }}
            >
              BANZOOK
            </a>
          </div>

          {/* Center - Links (Desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-[36px]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`uppercase transition-colors focus:outline-none ${
                  currentPage === link.id ? 'text-white' : 'text-white/65 hover:text-white'
                }`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.14em'
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right - Actions */}
          <div className="flex-1 flex justify-end items-center gap-[24px]">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-white/80 transition-colors focus:outline-none"
            >
              <Search size={20} strokeWidth={2} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-white hover:text-white/80 transition-colors flex items-center gap-[8px] focus:outline-none"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              <span 
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.14em'
                }}
              >
                BAG ({cartCount})
              </span>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-[#FF4D1A] transition-colors focus:outline-none"
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0B] flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
             <a href="#home" onClick={(e) => handleNavClick('home', e)} className="text-white text-xl font-black tracking-widest">
              BANZOOK
            </a>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
              <X size={28} strokeWidth={2} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-2xl font-bold tracking-widest">
             {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(link.id, e)}
                className={currentPage === link.id ? 'text-[#FF4D1A]' : 'text-white'}
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
