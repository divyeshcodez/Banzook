import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [laTime, setLaTime] = useState('');

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        
        {/* Main Footer Top Grid */}
        <div className={styles.topGrid}>
          
          {/* Column 1: Brand & Manifesto */}
          <div className={styles.brandCol}>
            <h2 className={styles.brandTitle}>OFFCUT®</h2>
            <p className={styles.manifesto}>
              An independent streetwear label constructing serialized garments from deadstock fabric surplus. 
              Small batch runs, zero restocks, thread-red precision.
            </p>
            
            <div className={styles.locationRow}>
              <span className="font-mono-spec" style={{ color: 'var(--accent-red)', fontSize: '0.72rem' }}>
                LOCATION: LOS ANGELES, CA
              </span>
              <span className="font-mono-spec" style={{ color: 'var(--muted-grey)', fontSize: '0.72rem' }}>
                TIME: {laTime || '07:00:00 AM'}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className={styles.linksCol}>
            <span className="font-mono-spec" style={{ color: 'var(--accent-red)', fontSize: '0.7rem' }}>
              // INDEX NAVIGATION
            </span>
            <ul className={styles.linkList}>
              <li>
                <a href="#batch" className={styles.footerLink} onClick={(e) => { e.preventDefault(); onNavigate('batch'); }}>
                  CURRENT BATCH #001
                </a>
              </li>
              <li>
                <a href="#process" className={styles.footerLink} onClick={(e) => { e.preventDefault(); onNavigate('process'); }}>
                  CUTTING PROCESS
                </a>
              </li>
              <li>
                <a href="#hero" className={styles.footerLink} onClick={(e) => { e.preventDefault(); onNavigate('hero'); }}>
                  FABRIC LABORATORY
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social & Press Links */}
          <div className={styles.linksCol}>
            <span className="font-mono-spec" style={{ color: 'var(--accent-red)', fontSize: '0.7rem' }}>
              // CONNECT / SOCIAL
            </span>
            <ul className={styles.linkList}>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  YOUTUBE FILM
                </a>
              </li>
              <li>
                <a href="mailto:contact@offcut-lab.com" className={styles.footerLink}>
                  CONTACT@OFFCUT-LAB.COM
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className={styles.bottomBar}>
          <span className="font-mono-spec" style={{ fontSize: '0.7rem', color: 'var(--muted-grey)' }}>
            ©2026 OFFCUT LABORATORY. ALL PATTERNS RESERVED.
          </span>

          <button className={styles.scrollTopBtn} onClick={scrollToTop} aria-label="Scroll to top">
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
};
