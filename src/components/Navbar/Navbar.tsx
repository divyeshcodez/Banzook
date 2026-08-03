import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  currentPage?: 'home' | 'shop' | 'drops' | 'about';
  onPageChange?: (page: 'home' | 'shop' | 'drops' | 'about') => void;
  onOpenHelp?: (tab: 'returns' | 'size-guide' | 'faq') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home', onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

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
      {/* 
        DESKTOP & MOBILE HEADER
        Height: 96px (desktop) / 76px (mobile)
        Padding: 0 64px (desktop) / 0 20px (mobile)
      */}
      <header 
        className="sticky top-0 w-full z-[1000] flex items-center bg-[#09090B]/90 backdrop-blur-[18px]"
        style={{ 
          borderBottom: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <div className="w-full h-[76px] md:h-[96px] px-[20px] md:px-[64px] grid grid-cols-[1fr_auto_1fr] items-center">
          
          {/* LEFT: Logo */}
          <div className="flex justify-start items-center">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick('home', e)}
              className="flex items-center gap-[12px] group focus:outline-none"
            >
              {/* Orange Square Accent */}
              <div className="w-[10px] h-[10px] bg-[#FF4D1A] group-hover:scale-110 transition-transform duration-300" />
              {/* Logo Text */}
              <span 
                className="text-[#F5F1E8] text-[18px] md:text-[24px] uppercase"
                style={{ 
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif", 
                  fontWeight: 800, 
                  letterSpacing: '0.22em' 
                }}
              >
                BANZOOK
              </span>
            </a>
          </div>

          {/* CENTER: Navigation (Desktop Only) */}
          <nav className="hidden md:flex items-center justify-center gap-[42px]">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(link.id, e)}
                  className="relative group py-2 focus:outline-none"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.65)'
                  }}
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {link.name}
                  </span>
                  
                  {/* Animated underline */}
                  <span 
                    className="absolute bottom-0 left-0 h-[1px] bg-[#FF4D1A] transition-all duration-300 ease-out"
                    style={{
                      width: isActive ? '100%' : '0%',
                      opacity: isActive ? 1 : 0
                    }}
                  />
                  {/* Hover underline effect */}
                  <span 
                    className={`absolute bottom-0 left-0 h-[1px] bg-[#FF4D1A] transition-all duration-300 ease-out ${isActive ? 'hidden' : ''}`}
                    style={{ width: '0%' }}
                  />
                  <style>{`
                    a:hover span:last-child {
                      width: 100% !important;
                    }
                  `}</style>
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex justify-end items-center gap-[24px]">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-[#FF4D1A] transition-colors focus:outline-none flex items-center justify-center"
            >
              <Search size={22} strokeWidth={2} />
            </button>
            
            {/* Bag Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="group flex items-center justify-center h-[42px] px-[18px] transition-all duration-300 focus:outline-none"
              style={{
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '0px',
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FF4D1A';
                e.currentTarget.style.borderColor = '#FF4D1A';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <span 
                className="text-white group-hover:text-black transition-colors duration-300"
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
            
            {/* Custom 2-Line Hamburger Menu */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              onMouseEnter={() => setIsHoveringMenu(true)}
              onMouseLeave={() => setIsHoveringMenu(false)}
              className="text-white hover:text-[#FF4D1A] transition-colors focus:outline-none flex flex-col justify-center items-center gap-[6px] w-[22px] h-[22px] md:w-[24px] md:h-[24px] overflow-hidden"
            >
              <div 
                className="w-full h-[2px] bg-current transition-transform duration-300 ease-out"
                style={{ transform: isHoveringMenu ? 'translateX(4px)' : 'translateX(0)' }}
              />
              <div 
                className="w-full h-[2px] bg-current transition-transform duration-300 ease-out"
                style={{ transform: isHoveringMenu ? 'translateX(-4px)' : 'translateX(0)' }}
              />
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-[2000] bg-[#09090B] flex flex-col p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center mb-16 h-[52px]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[10px] h-[10px] bg-[#FF4D1A]" />
            <span 
              className="text-[#F5F1E8] text-[18px] uppercase"
              style={{ 
                fontFamily: "'Space Grotesk', 'Inter', sans-serif", 
                fontWeight: 800, 
                letterSpacing: '0.22em' 
              }}
            >
              BANZOOK
            </span>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-white hover:text-[#FF4D1A] transition-colors flex flex-col justify-center items-center w-[24px] h-[24px] relative"
          >
            <div className="w-full h-[2px] bg-current absolute rotate-45 transition-transform" />
            <div className="w-full h-[2px] bg-current absolute -rotate-45 transition-transform" />
          </button>
        </div>
        
        <nav className="flex flex-col gap-8 px-4 h-full overflow-y-auto">
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(link.id, e)}
              className="text-white uppercase transition-colors hover:text-[#FF4D1A] transform hover:translate-x-2 duration-300"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '12vw',
                lineHeight: '0.9',
                letterSpacing: '0.02em',
                transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};
