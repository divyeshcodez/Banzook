import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  currentPage?: 'home' | 'shop' | 'drops' | 'about' | 'b2b';
  onPageChange?: (page: 'home' | 'shop' | 'drops' | 'about' | 'b2b') => void;
  onNavigate?: (sectionId: string) => void;
  onOpenHelp?: (tab: 'returns' | 'size-guide' | 'faq') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, onPageChange, onNavigate, onOpenHelp }) => {
  const isTransparent = currentPage === 'drops';

  const handleHelpClick = (tab: 'returns' | 'size-guide' | 'faq', e: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onOpenHelp) {
      onOpenHelp(tab);
    }
  };
  const handleLinkClick = (page: 'home' | 'shop' | 'drops' | 'about' | 'b2b', sectionId?: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onPageChange) {
      onPageChange(page);
    }
    if (sectionId) {
      setTimeout(() => {
        if (onNavigate) {
          onNavigate(sectionId);
        } else {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className={`${styles.footer} ${isTransparent ? styles.footerTransparent : ''}`}>
      <div className={styles.container}>
        <div className={styles.brandColumn}>
          <div>
            <a 
              href="#" 
              className={styles.brandLogo}
              onClick={(e) => handleLinkClick('home', undefined, e)}
            >
              BANZOOK
            </a>
            <p className={styles.philosophy}>
              SPEAKS IN PRINTS.<br />
              An independent streetwear label designed by young creators for those who claim their own lane.
            </p>
          </div>
        </div>

        <div>
          <h4 className={styles.columnTitle}>SHOP</h4>
          <ul className={styles.linkList}>
            <li><a href="#shop" className={styles.link} onClick={(e) => handleLinkClick('shop', undefined, e)}>LATEST DROP</a></li>
            <li><a href="#shop" className={styles.link} onClick={(e) => handleLinkClick('shop', undefined, e)}>ALL PRODUCTS</a></li>
            <li><a href="#shop" className={styles.link} onClick={(e) => handleLinkClick('shop', undefined, e)}>ACCESSORIES</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.columnTitle}>ABOUT</h4>
          <ul className={styles.linkList}>
            <li><a href="#story" className={styles.link} onClick={(e) => handleLinkClick('home', 'story', e)}>OUR STORY</a></li>
            <li><a href="#editorial" className={styles.link} onClick={(e) => handleLinkClick('home', 'editorial', e)}>CAMPAIGN 001</a></li>
            <li><a href="#footer" className={styles.link} onClick={(e) => handleLinkClick('home', 'footer', e)}>CONTACT</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.columnTitle}>HELP</h4>
          <ul className={styles.linkList}>
            <li><a href="#" className={styles.link} onClick={(e) => handleHelpClick('returns', e)}>RETURNS</a></li>
            <li><a href="#" className={styles.link} onClick={(e) => handleHelpClick('size-guide', e)}>SIZE GUIDE</a></li>
            <li><a href="#" className={styles.link} onClick={(e) => handleHelpClick('faq', e)}>FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.columnTitle}>FOLLOW</h4>
          <ul className={styles.linkList}>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.link}>
                INSTAGRAM
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.link}>
                YOUTUBE
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className={styles.link}>
                TIKTOK
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} BANZOOK. ALL RIGHTS RESERVED.
        </span>
        <div className={styles.legalLinks}>
          <a href="#" className={styles.legalLink}>PRIVACY POLICY</a>
          <a href="#" className={styles.legalLink}>TERMS & CONDITIONS</a>
        </div>
      </div>
    </footer>
  );
};
