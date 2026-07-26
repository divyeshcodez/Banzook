import React from 'react';
import styles from './CommunitySection.module.css';

export const CommunitySection: React.FC = () => {
  return (
    <section id="community" className={styles.section}>
      <div className={styles.container}>


        {/* Left Column: Polaroid Community Visual */}
        <div className={styles.imageWrapper}>
          <img
            src="/images/community_grid.png"
            alt="BANZOOK Community wearing black and grey heavy fleece streetwear"
            className={styles.image}
            loading="lazy"
          />
        </div>

        {/* Right Column: Narrative & CTA */}
        <div className={styles.info}>
          <span className={styles.label}>OUR COMMUNITY</span>
          <h2 className={styles.title}>WORN BY THE DIFFERENT.</h2>
          <p className={styles.desc}>
            We do not fit in templates. We make our own. BANZOOK is worn by creators, rebels, artists, and outsiders worldwide. Share your fit to enter the index.
          </p>
          <div className={styles.handle}>
            @BANZOOK
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            FOLLOW THE MOVEMENT
          </a>
        </div>
      </div>
    </section>
  );
};
