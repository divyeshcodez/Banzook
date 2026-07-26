import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Overlays.module.css';

interface HelpOverlayProps {
  activeTab: 'returns' | 'size-guide' | 'faq' | null;
  onClose: () => void;
  setActiveTab: (tab: 'returns' | 'size-guide' | 'faq') => void;
}

export const HelpOverlay: React.FC<HelpOverlayProps> = ({ activeTab, onClose, setActiveTab }) => {
  const isOpen = activeTab !== null;

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlayContainer} ${styles.overlayVisible}`}>
      <div 
        className={styles.overlayBg} 
        onClick={onClose} 
        aria-hidden="true" 
      />
      <div className={styles.helpPanel}>
        <div className={styles.panelHeader}>
          <div className={styles.helpTabs}>
            <button 
              className={`${styles.helpTabBtn} ${activeTab === 'returns' ? styles.helpTabBtnActive : ''}`}
              onClick={() => setActiveTab('returns')}
            >
              RETURNS
            </button>
            <button 
              className={`${styles.helpTabBtn} ${activeTab === 'size-guide' ? styles.helpTabBtnActive : ''}`}
              onClick={() => setActiveTab('size-guide')}
            >
              SIZE GUIDE
            </button>
            <button 
              className={`${styles.helpTabBtn} ${activeTab === 'faq' ? styles.helpTabBtnActive : ''}`}
              onClick={() => setActiveTab('faq')}
            >
              FAQ
            </button>
          </div>
          <button 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close help panel"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.panelBody}>
          {activeTab === 'returns' && (
            <div className={styles.helpContent}>
              <h3 className={styles.helpTitle}>NO RETURN POLICY</h3>
              <p className={styles.helpText}>
                Because we manufacture and customize clothing in strictly limited, numbered micro-runs, <strong>we enforce a strict NO RETURNS and NO EXCHANGES policy</strong>. All sales are final.
              </p>
              <p className={styles.helpText}>
                We encourage you to inspect our <strong>Size Guide</strong> carefully before placing an order to ensure the intended oversized look matches your fit preference.
              </p>
              <p className={styles.helpText}>
                If you receive an incorrect print or a damaged garment, please notify our support team within <strong>7 days of delivery</strong> at <a href="mailto:support@banzook.com" className={styles.helpLink}>support@banzook.com</a> with photo proof, and we will arrange a replacement.
              </p>
            </div>
          )}

          {activeTab === 'size-guide' && (
            <div className={styles.helpContent}>
              <h3 className={styles.helpTitle}>SIZE CHART</h3>
              <p className={styles.helpText}>
                Our shirts are designed with an <strong>oversized, boxy streetwear fit</strong>, featuring dropped shoulders and wider chests. We recommend ordering your true size, or sizing down for a more standard fit.
              </p>
              
              <div className={styles.tableWrapper}>
                <table className={styles.sizeTable}>
                  <thead>
                    <tr>
                      <th>SIZE</th>
                      <th>CHEST (IN)</th>
                      <th>LENGTH (IN)</th>
                      <th>SHOULDER (IN)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>S</td>
                      <td>44"</td>
                      <td>28"</td>
                      <td>19.5"</td>
                    </tr>
                    <tr>
                      <td>M</td>
                      <td>46"</td>
                      <td>29"</td>
                      <td>20"</td>
                    </tr>
                    <tr>
                      <td>L</td>
                      <td>48"</td>
                      <td>30"</td>
                      <td>21"</td>
                    </tr>
                    <tr>
                      <td>XL</td>
                      <td>50"</td>
                      <td>31"</td>
                      <td>22"</td>
                    </tr>
                    <tr>
                      <td>XXL</td>
                      <td>52"</td>
                      <td>32"</td>
                      <td>23"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className={styles.helpSubText}>
                *Measurements are taken flat and may vary by +/- 0.5 inches due to the custom-made nature of organic cotton fabrics.
              </p>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className={styles.helpContent}>
              <h3 className={styles.helpTitle}>SETUP FAQ</h3>
              
              <div className={styles.faqList}>
                <div className={styles.faqItem}>
                  <h4 className={styles.faqQuestion}>Q: How long does shipping take?</h4>
                  <p className={styles.faqAnswer}>
                    Orders are processed and dispatched within 24-48 hours. Delivery takes 3-5 business days across India. Mumbai-based orders typically arrive within 2 days.
                  </p>
                </div>
                
                <div className={styles.faqItem}>
                  <h4 className={styles.faqQuestion}>Q: Can I change or cancel my order?</h4>
                  <p className={styles.faqAnswer}>
                    Since we run custom micro-runs, printing and packaging begins immediately after checkout. Cancellations or modifications are not possible once the order is placed.
                  </p>
                </div>

                <div className={styles.faqItem}>
                  <h4 className={styles.faqQuestion}>Q: How should I wash my BANZOOK shirts?</h4>
                  <p className={styles.faqAnswer}>
                    To preserve the high-density silicone prints, machine wash cold inside-out, tumble dry low or hang dry in shade. Avoid ironing directly on the printed artwork.
                  </p>
                </div>

                <div className={styles.faqItem}>
                  <h4 className={styles.faqQuestion}>Q: What is a limited micro-run?</h4>
                  <p className={styles.faqAnswer}>
                    It means we only print a strict quantity of each design (e.g., 50 units). Once a design is sold out, we do not restock it. This keeps your clothing exclusive.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
