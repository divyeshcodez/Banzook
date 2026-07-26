import React from 'react';
import { ArrowRight, Scissors } from 'lucide-react';
import styles from './Hero.module.css';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section id="hero" className={styles.heroSection}>
      {/* Background Subtle Pattern Grid */}
      <div className={styles.bgGrid} />

      <div className={styles.container}>
        
        {/* Monospace Batch Tag Callout */}
        <div className={`${styles.batchTag} reveal-init`}>
          <Scissors size={14} className={styles.scissorsTagIcon} />
          <span className="font-mono-spec">OFFCUT FABRIC LABORATORY // LA, CA</span>
        </div>

        {/* Display Headline */}
        <h1 className={`${styles.headline} reveal-init delay-1`}>
          BUILT FROM THE CUTTINGS.<br />
          <span className={styles.accentText}>RESTOCKED NEVER.</span>
        </h1>

        {/* One-Line Brand Thesis */}
        <p className={`${styles.thesis} reveal-init delay-2`}>
          An independent streetwear label constructed entirely from high-grade deadstock mills surplus offcuts. 
          Every piece is produced in a numbered micro-batch. When it’s gone, the pattern is retired forever.
        </p>

        {/* CTA Actions */}
        <div className={`${styles.ctaRow} reveal-init delay-3`}>
          <button className="btn-red" onClick={onCtaClick}>
            <span>EXPLORE BATCH 001</span>
            <ArrowRight size={16} />
          </button>
          
          <a href="#process" className="btn-outline">
            <span>THE CUTTING MODEL</span>
          </a>
        </div>

        {/* Fabric Spec Meta Grid */}
        <div className={`${styles.specGrid} reveal-init delay-4`}>
          <div className={styles.specItem}>
            <span className="font-mono-spec" style={{ fontSize: '0.68rem', color: 'var(--muted-grey)' }}>CURRENT BATCH</span>
            <span className="font-mono-spec" style={{ fontSize: '0.9rem', color: 'var(--text-bone)', fontWeight: 700 }}>BATCH #001</span>
          </div>
          <div className={styles.specDivider} />
          <div className={styles.specItem}>
            <span className="font-mono-spec" style={{ fontSize: '0.68rem', color: 'var(--muted-grey)' }}>FABRIC WEIGHT</span>
            <span className="font-mono-spec" style={{ fontSize: '0.9rem', color: 'var(--text-bone)', fontWeight: 700 }}>380-420 GSM</span>
          </div>
          <div className={styles.specDivider} />
          <div className={styles.specItem}>
            <span className="font-mono-spec" style={{ fontSize: '0.68rem', color: 'var(--muted-grey)' }}>FABRIC ORIGIN</span>
            <span className="font-mono-spec" style={{ fontSize: '0.9rem', color: 'var(--accent-red)', fontWeight: 700 }}>100% SALVAGED SURPLUS</span>
          </div>
        </div>

      </div>
    </section>
  );
};
