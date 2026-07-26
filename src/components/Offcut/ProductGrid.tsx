import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, ArrowRight, AlertTriangle } from 'lucide-react';
import { OFFCUT_PRODUCTS } from '../../data/offcutProducts';
import type { OffcutProduct } from '../../data/offcutProducts';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  onAddToCart: (product: OffcutProduct) => void;
  onHoverProduct: (label: string) => void;
}

// Individual Product Card Component for Video Lifecycle & Image Error Safeguards
const ProductCard: React.FC<{
  product: OffcutProduct;
  index: number;
  onAddToCart: (product: OffcutProduct) => void;
  onHoverProduct: (label: string) => void;
}> = ({ product, index, onAddToCart, onHoverProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isHoverCapable, setIsHoverCapable] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Check hover capability via matchMedia
  useEffect(() => {
    const isCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setIsHoverCapable(isCapable);
  }, []);

  // Handle Video Play & Pause safely with try/catch
  useEffect(() => {
    if (!isHoverCapable || videoError) return;

    const video = videoRef.current;
    if (isHovered && video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay blocked by browser or video load issue
          console.warn('Autoplay prevented on product video:', err);
          setVideoError(true);
        });
      }
    } else if (video) {
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [isHovered, isHoverCapable, videoError]);

  const delayClass = `delay-${(index % 4) + 1}`;

  return (
    <article
      className={`${styles.card} reveal-init ${delayClass}`}
      onMouseEnter={() => {
        if (isHoverCapable) {
          setIsHovered(true);
          onHoverProduct(`${product.gsm} // ${product.batchNumber}`);
        }
      }}
      onMouseLeave={() => {
        if (isHoverCapable) {
          setIsHovered(false);
          onHoverProduct('OFFCUT // PATTERN #42');
        }
      }}
    >
      {/* Media Container with explicit aspect-ratio to prevent CLS */}
      <div className={styles.mediaWrapper}>
        
        {/* Static Image with Fallback */}
        {!imgError ? (
          <img
            src={product.staticImage}
            alt={`${product.name} — ${product.batchNumber} (${product.gsm})`}
            width={400}
            height={500}
            loading={index > 1 ? "lazy" : "eager"}
            className={`${styles.staticImg} ${isHovered && isHoverCapable && !videoError ? styles.staticImgHidden : ''}`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.mediaFallback}>
            <AlertTriangle size={24} style={{ color: 'var(--accent-red)' }} />
            <span className="font-mono-spec" style={{ fontSize: '0.65rem', marginTop: '0.5rem' }}>
              IMAGE UNAVAILABLE
            </span>
          </div>
        )}

        {/* Video Element (rendered conditionally on hover capability, preload="none", poster fallback) */}
        {isHoverCapable && !videoError && (
          <video
            ref={videoRef}
            src={product.hoverVideo}
            poster={product.staticImage}
            preload="none"
            loop
            muted
            playsInline
            className={`${styles.hoverVideo} ${isHovered ? styles.hoverVideoVisible : ''}`}
            onError={() => setVideoError(true)}
          />
        )}

        {/* Scanline Overlay */}
        <div className="scanline-overlay" aria-hidden="true" />

        {/* Batch Tag Overlay */}
        <div className={styles.batchTagOverlay}>
          <span className="font-mono-spec">{product.batchNumber}</span>
        </div>

        {/* GSM Spec Overlay */}
        <div className={styles.gsmTagOverlay}>
          <span className="font-mono-spec">{product.gsm}</span>
        </div>

        {/* Units Remaining Overlay */}
        <div className={styles.unitsLeftTag}>
          <span className={styles.redDot} aria-hidden="true" />
          <span className="font-mono-spec">{product.unitsLeft} UNITS LEFT</span>
        </div>

        {/* Quick Add Overlay */}
        <div className={styles.hoverActionOverlay}>
          <button 
            className={styles.quickAddBtn}
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to shopping bag for $${product.price}`}
          >
            <ShoppingBag size={15} />
            <span>ADD TO BAG — ${product.price}</span>
          </button>
        </div>

      </div>

      {/* Card Content & Details */}
      <div className={styles.cardContent}>
        <div className={styles.metaTop}>
          <span className="font-mono-spec" style={{ fontSize: '0.68rem', color: 'var(--muted-grey)' }}>
            {product.fabricOrigin}
          </span>
          <span className="font-mono-spec" style={{ fontSize: '0.9rem', color: 'var(--accent-red)', fontWeight: 700 }}>
            ${product.price}
          </span>
        </div>

        <h3 className={styles.productName}>{product.name}</h3>

        <p className={styles.compositionText}>{product.composition}</p>

        <div className={styles.cardFooterRow}>
          <button 
            className={styles.detailBtn}
            onClick={() => onAddToCart(product)}
            aria-label={`Claim piece ${product.name}`}
          >
            <span>CLAIM PIECE</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </article>
  );
};

export const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart, onHoverProduct }) => {
  return (
    <section id="batch" className={styles.section} aria-label="Current Batch Drop">
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={`${styles.headerRow} reveal-init`}>
          <div>
            <span className="font-mono-spec" style={{ color: 'var(--accent-red)', fontSize: '0.75rem' }}>
              // CURRENT BATCH DROP
            </span>
            <h2 className={styles.sectionTitle}>
              SURPLUS FABRIC RUN #001
            </h2>
          </div>
          
          <div className={styles.headerRight}>
            <p className="font-mono-spec" style={{ fontSize: '0.75rem', color: 'var(--muted-grey)' }}>
              4 LIMITED SILHOUETTES • RESTOCKED NEVER
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className={styles.productGrid}>
          {OFFCUT_PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={onAddToCart}
              onHoverProduct={onHoverProduct}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
