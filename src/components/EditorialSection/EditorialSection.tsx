import React from 'react';
import styles from './EditorialSection.module.css';

export const EditorialSection: React.FC = () => {
  return (
    <section id="editorial" className={styles.section}>
      <div className={styles.container}>


        <h2 className={styles.title}>THE WORLD OF BANZOOK</h2>

        <div className={styles.grid}>
          {/* Main Visual: Mumbai Campaign */}
          <div className={styles.mainCol}>
            <div className={styles.mainImageWrapper}>
              <img
                src="/images/editorial_mumbai.png"
                alt="BANZOOK Editorial Campaign - Mumbai Street Style"
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.overlayLabel}>CAMPAIGN 001</div>
            </div>
          </div>

          {/* Side Narrative & Details */}
          <div className={styles.sideCol}>
            <div className={styles.detailCard}>
              <div className={styles.cardHeader}>
                <span className={styles.locLabel}>MUMBAI / INDIA</span>
                <span className={styles.dropLabel}>DROP 001</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>BUILT DIFFERENT</h3>
                <p>
                  Rooted in the energy of chaotic Indian cities, BANZOOK merges global streetwear codes with local creative rebellion. We manufacture in limited batches utilizing premium heavy fibers to claim individual space.
                </p>
              </div>
            </div>

            <div className={styles.sideImageWrapper}>
              <img
                src="/images/hero_campaign.png"
                alt="BANZOOK Streetwear Close-up Details"
                className={styles.image}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
