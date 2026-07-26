import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './FeaturedProductSection.module.css';

interface Variant {
  id: string;
  name: string;
  price: string;
  desc: string;
  image: string;
  colorName: string;
  hex: string;
}

const VARIANTS: Variant[] = [
  {
    id: 'prod-13',
    name: 'BANZOOK x HOT WHEELS "CHALLENGE ACCEPTED" TEE',
    price: '₹1,499',
    desc: 'Custom raglan boxy-fit tee featuring the iconic Hot Wheels flame branding on the chest, paired with a high-density vintage racing sports car graphic across the back.',
    image: '/images/tshirt_hotwheels.jpg',
    colorName: 'Hot Wheels',
    hex: '#ffcc00'
  },
  {
    id: 'prod-14',
    name: 'BANZOOK "NO SMOKING" TEE',
    price: '₹1,299',
    desc: 'Ultra-heavyweight 300GSM organic cotton tee promoting healthy living. Silkscreened blue slogan "KILL YOUR BAD HABITS, NOT YOURSELF" on front and bold "NO SMOKING, BREATHE FREELY" design on back.',
    image: '/images/tshirt_nosmoking.jpg',
    colorName: 'No Smoking',
    hex: '#0055ff'
  },
  {
    id: 'prod-15',
    name: 'BANZOOK "KIND TO YOUR MIND" TEE',
    price: '₹1,299',
    desc: 'Drop-shoulder boxy fit tee in clean white cotton, featuring a soft pink watercolor heart graphic reading "be kind to your mind." on front chest and enlarged on the back.',
    image: '/images/tshirt_kindmind.jpg',
    colorName: 'Be Kind',
    hex: '#ff85a2'
  },
  {
    id: 'prod-16',
    name: 'BANZOOK "LEGENDS NEVER DIE" MOTOR TEE',
    price: '₹1,499',
    desc: 'Vintage washed cream tee featuring Speedway Motor Club flags on front, and a classic retro muscle car sunset illustration reading "LEGENDS NEVER DIE - Born To Drive" on the back.',
    image: '/images/tshirt_legends.jpg',
    colorName: 'Legends',
    hex: '#a63a2b'
  },
  {
    id: 'prod-17',
    name: 'BANZOOK "BROKEN SYSTEM" REBEL TEE',
    price: '₹1,399',
    desc: 'Anarchist theme graphic tee in vintage black. Features "REBEL YOUTH" chest print and a detailed distressed classic statue print overlaid with an anarchy symbol on the back.',
    image: '/images/tshirt_brokensystem.jpg',
    colorName: 'Broken System',
    hex: '#e63946'
  }
];

interface FeaturedProductSectionProps {
  onCtaClick?: () => void;
}

export const FeaturedProductSection: React.FC<FeaturedProductSectionProps> = ({ onCtaClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeVariant = VARIANTS[currentIndex];
  const nextVariant = VARIANTS[(currentIndex + 1) % VARIANTS.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? VARIANTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % VARIANTS.length);
  };

  return (
    <section id="shop" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Product Visual */}
          <div className={styles.imageWrapper}>
            <img
              src={activeVariant.image}
              alt={activeVariant.name}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageOverlay}>
              HOVER TO INSPECT TEXTURES
            </div>
          </div>

          {/* Right Column: Copy & Checkout CTA */}
          <div className={styles.info}>
            <span className={styles.tag} style={{ color: activeVariant.hex }}>
              NEW BRAND DROP
            </span>
            <h2 className={styles.title}>{activeVariant.name}</h2>
            <div className={styles.price}>{activeVariant.price}</div>
            <p className={styles.desc}>{activeVariant.desc}</p>
            
            {/* T-Shirt Navigation Arrows */}
            <div className={styles.navSelector}>
              <span className={styles.navLabel}>
                NEXT T-SHIRT: <strong style={{ color: nextVariant.hex }}>{nextVariant.colorName}</strong>
              </span>
              
              <div className={styles.navArrowsGroup}>
                <button
                  className={styles.navArrowBtn}
                  onClick={handlePrev}
                  title="Previous T-Shirt"
                  aria-label="Previous T-Shirt"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className={styles.stepCounter}>
                  0{currentIndex + 1} / 0{VARIANTS.length}
                </div>

                <button
                  className={`${styles.navArrowBtn} ${styles.navArrowBtnPrimary}`}
                  onClick={handleNext}
                  title="Next T-Shirt"
                  aria-label="Next T-Shirt"
                >
                  <span>NEXT T-SHIRT</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <button className="btn-primary" onClick={onCtaClick}>
              DISCOVER IN SHOP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
