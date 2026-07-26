import React, { useState } from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { PRODUCTS, type Product as ProductType } from '../../data/products';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import styles from './Drops.module.css';

interface DropsProps {
  onNavigateToShop?: () => void;
}

const PRODUCT_MODEL_IMAGES: Record<string, { front: string; back: string }> = {
  'prod-13': {
    front: '/images/model_hotwheels.jpg',
    back: '/images/tshirt_hotwheels.jpg',
  },
  'prod-14': {
    front: '/images/model_nosmoking_front.jpg',
    back: '/images/model_nosmoking_back.jpg',
  },
  'prod-15': {
    front: '/images/model_kindmind.png',
    back: '/images/tshirt_kindmind.jpg',
  },
  'prod-16': {
    front: '/images/model_legends.png',
    back: '/images/tshirt_legends.jpg',
  },
  'prod-17': {
    front: '/images/model_brokensystem.png',
    back: '/images/tshirt_brokensystem.jpg',
  },
};

export const DropsPage: React.FC<DropsProps> = ({ onNavigateToShop }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const dropProducts = PRODUCTS.slice(0, 4);

  const handleBuyProduct = (product: ProductType, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
  };

  return (
    <div className={styles.dropPage}>
      
      {/* ── 1. Cinematic Campaign Hero ────────────────────────────────────── */}
      <section className={styles.campaignHero}>
        <img
          src="/images/banzook_model_cinematic_hero.png"
          alt="BANZOOK Campaign Hero Model"
          className={styles.campaignHeroBg}
        />

        <div className={styles.container}>
          <div className={styles.campaignHeroContent}>
            <div className={styles.campaignBadge}>
              <span className={styles.pulseDot} />
              <span>ACTIVE CAMPAIGN // DROP 001</span>
            </div>

            <h1 className={styles.campaignTitle}>
              DROP 01<br />
              <span style={{ color: 'var(--orange)' }}>BUILT DIFFERENT.</span>
            </h1>

            <p className={styles.campaignTagline}>
              A COLLECTION FOR THOSE WHO MOVE DIFFERENT.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Visual Story & Sticky Parallax Section ────────────────────── */}
      <section className={styles.visualStorySection}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.stickyVisualCard}>
              <img
                src="/images/model_hotwheels.jpg"
                alt="Model Campaign Story"
                className={styles.stickyVisualImg}
              />
            </div>

            <div className={styles.storyTextGroup}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--orange)', letterSpacing: '0.2em', fontWeight: 800 }}>
                CAMPAIGN FILM CHAPTER 01
              </span>
              <h2 className={styles.storyHeading}>
                HEAVYWEIGHT<br />
                COTTON.<br />
                HIGH-DENSITY<br />
                <span style={{ color: 'var(--orange)' }}>SILICONE.</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Collection Story Block ─────────────────────────────────────── */}
      <section className={styles.collectionStoryBlock}>
        <span className={styles.storyBlockTag}>COLLECTION INCEPTION</span>
        <h2 className={styles.storyBlockHeadline}>
          DROP 01 WAS BUILT AROUND ONE IDEA:<br />
          <span style={{ color: 'var(--orange)' }}>DON'T WAIT FOR PERMISSION.</span>
        </h2>
      </section>

      {/* ── 4. One-by-One Editorial Product Reveal ─────────────────────────── */}
      <section className={styles.productRevealSection}>
        <div className={styles.container}>
          {dropProducts.map((product, idx) => {
            const modelImg = PRODUCT_MODEL_IMAGES[product.id]?.front || product.images[1] || product.images[0];
            return (
              <div key={product.id} className={styles.productRevealCard}>
                <div className={styles.revealMedia}>
                  <img src={modelImg} alt={product.name} className={styles.revealImg} />
                </div>

                <div className={styles.revealDetails}>
                  <span className={styles.revealTag}>PIECE 0{idx + 1} // {product.collection}</span>
                  <h3 className={styles.revealTitle}>{product.name}</h3>
                  <span className={styles.revealPrice}>₹{product.price.toLocaleString('en-IN')}</span>

                  <p className={styles.revealDesc}>{product.description}</p>

                  <div style={{ marginTop: '1rem' }}>
                    <button className="btn-primary" onClick={(e) => handleBuyProduct(product, e)}>
                      <ShoppingBag size={16} />
                      <span>ADD TO BAG — ₹{product.price}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 5. Collection Lookbook Section ────────────────────────────────── */}
      <section className={styles.lookbookSection}>
        <div className={styles.container}>
          <div className={styles.lookbookHeader}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--orange)', letterSpacing: '0.25em', fontWeight: 800, textTransform: 'uppercase' }}>
              DIGITAL MAGAZINE
            </span>
            <h2 className={styles.lookbookTitle}>DROP 01 LOOKBOOK</h2>
          </div>

          <div className={styles.lookbookGrid}>
            <div className={styles.lookbookItem}>
              <img src="/images/model_nosmoking_front.jpg" alt="Look 01" className={styles.lookbookImg} />
            </div>
            <div className={styles.lookbookItem}>
              <img src="/images/model_kindmind.png" alt="Look 02" className={styles.lookbookImg} />
            </div>
            <div className={styles.lookbookItem}>
              <img src="/images/model_legends.png" alt="Look 03" className={styles.lookbookImg} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Full Collection Selection ──────────────────────────────────── */}
      <section className={styles.selectionSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--orange)', letterSpacing: '0.25em', fontWeight: 800, textTransform: 'uppercase' }}>
              COLLECTION CATALOG
            </span>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', color: '#FFFFFF', marginTop: '0.5rem' }}>
              DROP 01 PIECES
            </h2>
          </div>

          <div className={styles.selectionGrid}>
            {PRODUCTS.slice(0, 4).map((product) => (
              <div key={product.id} className={styles.selectionCard} onClick={(e) => handleBuyProduct(product, e)}>
                <img src={product.images[0]} alt={product.name} className={styles.selectionImg} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: 'var(--orange)', letterSpacing: '0.1em' }}>
                    {product.collection}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                    {product.name}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 800, color: '#888888' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Final Campaign Moment CTA ──────────────────────────────────── */}
      <section className={styles.finalCampaignMoment}>
        <div className={styles.container}>
          <h2 className={styles.finalTitle}>
            DROP 01<br />
            <span style={{ color: 'var(--orange)' }}>BUILT DIFFERENT.</span>
          </h2>

          {onNavigateToShop && (
            <div>
              <button className="btn-primary" onClick={onNavigateToShop}>
                <span>EXPLORE ALL SHOWROOM PIECES</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── BANZOOK Product Dossier Modal ───────────────────────────────── */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};

export const Drops = DropsPage;
