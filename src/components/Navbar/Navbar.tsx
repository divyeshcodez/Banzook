import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  currentPage?: 'home' | 'shop' | 'drops' | 'about';
  onPageChange?: (page: 'home' | 'shop' | 'drops' | 'about') => void;
  onOpenHelp?: (tab: 'returns' | 'size-guide' | 'faq') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage = 'home', onPageChange, onOpenHelp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { 
    cartCount, 
    setIsCartOpen, 
    setIsSearchOpen, 
    setIsAccountOpen 
  } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (sectionId === 'size-guide') {
      if (onOpenHelp) {
        onOpenHelp('size-guide');
      }
      return;
    }

    const page = (sectionId === 'shop' || sectionId === 'drops' || sectionId === 'about') ? sectionId : 'home';

    if (onPageChange) {
      onPageChange(page);
    }
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const isTransparentNav = currentPage === 'drops';

  return (
    <>
      <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isTransparentNav ? styles.navbarTransparent : ''}`}>
        {/* Desktop Navigation */}
        <div className={styles.container}>
          
          {/* Floating Black Capsule Pill Navigation Bar */}
          <nav className={styles.blackNavPill}>
            <a 
              href="#shop" 
              className={`${styles.pillLink} ${currentPage === 'shop' ? styles.pillLinkActive : ''}`} 
              onClick={(e) => handleNavClick('shop', e)}
            >
              SHOP
            </a>
            <a 
              href="#drops" 
              className={`${styles.pillLink} ${currentPage === 'drops' ? styles.pillLinkActive : ''}`} 
              onClick={(e) => handleNavClick('drops', e)}
            >
              DROPS
            </a>
            <a 
              href="#about" 
              className={`${styles.pillLink} ${currentPage === 'about' ? styles.pillLinkActive : ''}`} 
              onClick={(e) => handleNavClick('about', e)}
            >
              ABOUT
            </a>
          </nav>

          {/* Centered Logo */}
          <a href="#" className={styles.logo} onClick={(e) => handleNavClick('home', e)}>
            BANZOOK®
          </a>

          {/* Right Side Utility Actions */}
          <div className={styles.navActionsRight}>
            <button 
              className={styles.actionButton} 
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={18} strokeWidth={2} />
            </button>
            <button 
              className={styles.actionButton} 
              aria-label="Account"
              onClick={() => setIsAccountOpen(true)}
            >
              <User size={18} strokeWidth={2} />
            </button>
            <button 
              className={styles.actionButton} 
              aria-label={`Shopping Bag containing ${cartCount} items`}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={18} strokeWidth={2} />
              <span className={styles.cartCount}>{cartCount}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation */}
        <div className={styles.mobileContainer}>
          <button 
            className={styles.actionButton} 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>

          <a href="#" className={styles.logo} onClick={(e) => handleNavClick('home', e)}>
            BANZOOK
          </a>

          <button 
            className={styles.actionButton} 
            aria-label={`Shopping Bag containing ${cartCount} items`}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={22} strokeWidth={2.5} />
            <span className={styles.cartCount}>{cartCount}</span>
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu Drawer */}
      <div className={`${styles.drawer} ${isMobileMenuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <a href="#" className={styles.logo} onClick={(e) => handleNavClick('home', e)}>
            BANZOOK
          </a>
          <button 
            className={styles.actionButton} 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={26} strokeWidth={2.5} />
          </button>
        </div>

        <nav className={styles.drawerNav}>
          <a 
            href="#shop" 
            className={styles.drawerNavLink} 
            style={currentPage === 'shop' ? { color: 'var(--orange)' } : {}}
            onClick={(e) => handleNavClick('shop', e)}
          >
            SHOP
          </a>
          <a 
            href="#drops" 
            className={styles.drawerNavLink} 
            style={currentPage === 'drops' ? { color: 'var(--orange)' } : {}}
            onClick={(e) => handleNavClick('drops', e)}
          >
            DROPS
          </a>
          <a 
            href="#search" 
            className={styles.drawerNavLink} 
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
          >
            SEARCH
          </a>
          <a 
            href="#account" 
            className={styles.drawerNavLink} 
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setIsAccountOpen(true);
            }}
          >
            ACCOUNT
          </a>
          <a 
            href="#story" 
            className={styles.drawerNavLink} 
            onClick={(e) => handleNavClick('story', e)}
          >
            LATEST DROP
          </a>
          <a 
            href="#about" 
            className={styles.drawerNavLink} 
            style={currentPage === 'about' ? { color: 'var(--orange)' } : {}}
            onClick={(e) => handleNavClick('about', e)}
          >
            ABOUT
          </a>
          <a 
            href="#" 
            className={styles.drawerNavLink} 
            onClick={(e) => handleNavClick('size-guide', e)}
          >
            SIZE GUIDE
          </a>
          <a 
            href="#footer" 
            className={styles.drawerNavLink} 
            onClick={(e) => handleNavClick('footer', e)}
          >
            CONTACT
          </a>
        </nav>

        <div className={styles.drawerFooter}>
          <div className={styles.drawerSocials}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.drawerSocialLink}>
              INSTAGRAM
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.drawerSocialLink}>
              YOUTUBE
            </a>
          </div>
          <div className={styles.drawerMeta}>
            <span>MUMBAI / INDIA</span>
            <span>SPEAKS IN PRINTS.</span>
          </div>
        </div>
      </div>
    </>
  );
};
