import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  unitsRemaining: number;
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  unitsRemaining, 
  cartCount, 
  onOpenCart, 
  onNavigate 
}) => {
  const [laTime, setLaTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Live LA Clock Update
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setLaTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Header Scroll Blur Listener with rAF Throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard Accessibility: Escape Key closes Mobile Menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNav = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          
          {/* Brand Logo */}
          <a href="#hero" className={styles.logo} onClick={(e) => handleNav('hero', e)} aria-label="OFFCUT Home">
            OFFCUT®
          </a>

          {/* Desktop Nav Links */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <a href="#batch" className={styles.navLink} onClick={(e) => handleNav('batch', e)}>
              SHOP
            </a>
            <a href="#process" className={styles.navLink} onClick={(e) => handleNav('process', e)}>
              PROCESS
            </a>
            <a href="#contact" className={styles.navLink} onClick={(e) => handleNav('contact', e)}>
              CONTACT
            </a>
          </nav>

          {/* Live Indicators & Bag */}
          <div className={styles.headerRight}>
            
            {/* Live LA Time Clock */}
            <div className={styles.clockContainer} aria-label={`Current LA local time: ${laTime}`}>
              <span className={styles.clockDot} aria-hidden="true" />
              <span className="font-mono-spec" style={{ fontSize: '0.7rem', color: 'var(--muted-grey)' }}>
                LA {laTime || '07:00:00 AM'}
              </span>
            </div>

            {/* Live Units Remaining Badge */}
            <div className={styles.unitsBadge} aria-label={`${unitsRemaining} units remaining in current batch`}>
              <span className={styles.redPulseDot} aria-hidden="true" />
              <span className="font-mono-spec" style={{ fontSize: '0.72rem', color: 'var(--accent-red)', fontWeight: 700 }}>
                {unitsRemaining} UNITS REMAINING
              </span>
            </div>

            {/* Cart Button with Accessible ARIA Label */}
            <button 
              className={styles.bagBtn} 
              onClick={onOpenCart} 
              aria-label={`Shopping bag containing ${cartCount} items`}
            >
              <ShoppingBag size={18} />
              <span className={styles.bagCount} aria-hidden="true">{cartCount}</span>
            </button>

            {/* Mobile Menu Toggle with Accessible ARIA Label */}
            <button 
              className={styles.mobileMenuBtn} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Drawer Overlay */}
      <div 
        className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.mobileDrawerOpen : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={styles.mobileDrawerContent}>
          <nav aria-label="Mobile Navigation">
            <a href="#batch" className={styles.mobileNavLink} onClick={(e) => handleNav('batch', e)}>
              SHOP [BATCH 001]
            </a>
            <a href="#process" className={styles.mobileNavLink} onClick={(e) => handleNav('process', e)}>
              THE PROCESS
            </a>
            <a href="#contact" className={styles.mobileNavLink} onClick={(e) => handleNav('contact', e)}>
              CONTACT / ARCHIVE
            </a>
          </nav>

          <div className={styles.mobileMeta}>
            <span className="font-mono-spec" style={{ color: 'var(--accent-red)' }}>
              {unitsRemaining} UNITS REMAINING IN CURRENT BATCH
            </span>
            <span className="font-mono-spec" style={{ color: 'var(--muted-grey)', marginTop: '0.5rem' }}>
              LOS ANGELES, CA // {laTime}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
