import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  currentPage?: 'home' | 'shop' | 'drops' | 'about' | 'b2b';
  onPageChange?: (page: 'home' | 'shop' | 'drops' | 'about' | 'b2b') => void;
  onOpenHelp?: (tab: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home', onPageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const { cartCount, setIsCartOpen, setIsSearchOpen, setIsAccountOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, () => {
      // Do nothing, just to keep the auth listener if needed
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (page === 'signin') {
      setIsAccountOpen(true);
      return;
    }

    if (onPageChange && ['home', 'shop', 'drops', 'about', 'b2b'].includes(page)) {
      onPageChange(page as any);
    }
  };

  const navLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'SHOP', id: 'shop' },
    { name: 'COLLECTIONS', id: 'collections' },
    { name: 'ABOUT', id: 'about' },
    { name: 'BULK ORDERS', id: 'b2b' },
    { name: 'CONTACT', id: 'contact' }
  ];

  return (
    <>
      {/* INITIAL LOAD ANIMATION WRAPPER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 w-full z-[1000] flex flex-col"
      >
        {/* MAIN NAVBAR */}
        <header
          className="w-full flex items-center transition-all duration-300"
          style={{
            height: isScrolled ? '78px' : '110px',
            backgroundColor: isScrolled ? 'rgba(11,11,13,0.96)' : '#0B0B0D',
            backdropFilter: isScrolled ? 'blur(18px)' : 'none',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {/* Container padding is 0 70px on desktop, 0 22px on mobile */}
          <div className="w-full px-[32px] md:px-[90px] grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-full">

            {/* LEFT: Logo */}
            <div className="flex justify-start items-center pl-10 md:pl-16">
              <style>{`
                .banzook-logo-text {
                  transition: color 0.3s ease, text-shadow 0.3s ease;
                }
                .logo-group:hover .banzook-logo-text {
                  color: #FF4D1A;
                  text-shadow: 0 0 20px rgba(255, 77, 26, 0.4);
                }
              `}</style>
              <motion.a
                href="#home"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick('home', e)}
                className="flex items-center gap-[12px] logo-group focus:outline-none"
                style={{
                  marginLeft: '40px',
                  transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
                  transformOrigin: 'left center',
                  transition: 'transform 0.3s ease',
                  textDecoration: 'none'
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              >
                {/* Logo Text */}
                <div className="flex flex-col">
                  <span
                    className="text-[#F4F0E8] uppercase leading-none banzook-logo-text text-[32px] md:text-[40px] pl-2"
                    style={{
                      fontFamily: "Impact, 'Archivo Black', sans-serif",
                      fontWeight: 900,
                      letterSpacing: '0.01em',
                      transform: 'scaleY(1.05)',
                      transformOrigin: 'bottom'
                    }}
                  >
                    BANZOOK
                  </span>
                </div>
              </motion.a>
            </div>

            {/* CENTER: Navigation (Desktop Only) */}
            <nav className="hidden md:flex justify-center items-center gap-[32px]">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id || (link.id === 'home' && currentPage === 'home');
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(link.id, e)}
                    className="group relative focus:outline-none transition-colors duration-300"
                    style={{ textDecoration: 'none' }}
                  >
                    <span
                      className={`transition-colors duration-300 ${isActive ? 'text-[#FF4D1A]' : 'text-[#F4F0E8] group-hover:text-[#FF4D1A]'}`}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        fontWeight: 800,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {link.name}
                    </span>
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF4D1A] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>
            {/* RIGHT: Actions */}
            <div className="flex justify-end items-center gap-[12px] md:gap-[24px]">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-[#FF4D1A] transition-colors focus:outline-none flex items-center justify-center hidden md:flex cursor-pointer"
              >
                <Search size={20} strokeWidth={2} />
              </button>

              {/* Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="group flex items-center justify-center transition-all duration-300 focus:outline-none rounded-[4px] border-none outline-none cursor-pointer"
                style={{
                  width: '90px',
                  height: '38px',
                  background: '#F4F0E8',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FF4D1A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F4F0E8';
                }}
              >
                <span
                  className="text-[#0B0B0D] group-hover:text-white transition-colors duration-300"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase'
                  }}
                >
                  BAG {String(cartCount).padStart(2, '0')}
                </span>
              </button>

              {/* Custom 3-Line Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                onMouseEnter={() => setIsHoveringMenu(true)}
                onMouseLeave={() => setIsHoveringMenu(false)}
                className="text-[#F4F0E8] hover:text-[#FF4D1A] transition-colors focus:outline-none flex flex-col justify-between items-end w-[32px] h-[14px] bg-transparent border-none outline-none p-0 ml-2 cursor-pointer"
              >
                <div
                  className="h-[2px] bg-current transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] origin-right"
                  style={{ width: '100%' }}
                />
                <div
                  className="h-[2px] bg-current transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] origin-right"
                  style={{ width: isHoveringMenu ? '60%' : '100%' }}
                />
                <div
                  className="h-[2px] bg-current transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] origin-right"
                  style={{ width: isHoveringMenu ? '100%' : '100%' }}
                />
              </button>

            </div>
          </div>
        </header>

        {/* FASHION TICKER */}
        <div className="w-full h-[30px] bg-[#FF4D1A] overflow-hidden flex items-center relative">
          <div className="whitespace-nowrap flex" style={{ animation: 'ticker-scroll 25s linear infinite' }}>
            {Array(4).fill('NEW DROP 01 — BUILT DIFFERENT — FREE SHIPPING ABOVE ₹2,999 — LIMITED EDITION — ').map((text, i) => (
              <span
                key={i}
                className="inline-block px-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  fontWeight: 800,
                  letterSpacing: '0.20em',
                  color: '#000000',
                  textTransform: 'uppercase'
                }}
              >
                {text}
              </span>
            ))}
          </div>
          <style>{`
            @keyframes ticker-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </motion.div>

      {/* MENU BACKDROP DIMMER */}
      <div
        className={`fixed inset-0 z-[1999] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* LEFT DRAWER MENU */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-full md:w-[500px] z-[2000] bg-[#09090B] border-r border-[rgba(255,255,255,0.08)] flex flex-col p-[32px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center mb-16 h-[60px]">
          <div className="flex items-center gap-[12px]">
            <div className="flex flex-col">
              <span
                className="text-[#F4F0E8] uppercase leading-none"
                style={{
                  fontFamily: "Impact, 'Archivo Black', sans-serif",
                  fontSize: '32px',
                  fontWeight: 900,
                  letterSpacing: '0.01em',
                  transform: 'scaleY(1.05)',
                  transformOrigin: 'bottom'
                }}
              >
                BANZOOK
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-[#FF4D1A] transition-colors flex flex-col justify-center items-center w-[30px] h-[30px] relative focus:outline-none"
          >
            <div className="w-[30px] h-[2px] bg-current absolute rotate-45 transition-transform" />
            <div className="w-[30px] h-[2px] bg-current absolute -rotate-45 transition-transform" />
          </button>
        </div>

        <nav className="flex flex-col h-full overflow-y-auto mt-4 pb-12">
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(link.id, e)}
              className="group flex items-center gap-6 uppercase transition-all duration-500 focus:outline-none w-full border-b border-[rgba(255,255,255,0.06)] py-6"
              style={{
                textDecoration: 'none',
                transitionDelay: isMobileMenuOpen ? `${i * 80 + 100}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <span
                className="group-hover:text-[#FF4D1A] transition-colors duration-500"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.25)',
                }}
              >
                0{i + 1}
              </span>
              <div className="relative overflow-hidden w-full flex items-center">
                {/* Default Outline Text */}
                <span
                  className="transition-all duration-500 block transform group-hover:translate-y-[-100%] absolute"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(48px, 10vw, 72px)',
                    lineHeight: '0.85',
                    letterSpacing: '0.02em',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.4)',
                  }}
                >
                  {link.name}
                </span>
                {/* Hover Solid Text */}
                <span
                  className="transition-all duration-500 block transform translate-y-[100%] group-hover:translate-y-0"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(48px, 10vw, 72px)',
                    lineHeight: '0.85',
                    letterSpacing: '0.02em',
                    color: '#F4F0E8',
                  }}
                >
                  {link.name}
                </span>
              </div>

              <span className="text-[#FF4D1A] opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-3xl ml-auto mb-2">
                →
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};
