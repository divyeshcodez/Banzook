import React, { useState } from 'react';
import { X, ArrowRight, Plus, Minus } from 'lucide-react';
import { type Product as ProductType } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { TShirt3DViewer } from '../TShirt3DViewer/TShirt3DViewer';
import styles from './ProductModal.module.css';

interface ProductModalProps {
  product: ProductType | null;
  onClose: () => void;
}

const PRODUCT_BASE_COLORS: Record<string, string> = {
  'prod-13': '#161616',
  'prod-14': '#EAEAEA',
  'prod-15': '#F9F6F0',
  'prod-16': '#F5F2EA',
  'prod-17': '#1E1E1E',
};

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

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'L');
  const [show3D, setShow3D] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const { addToCart, triggerToast } = useCart();

  const modelFront = PRODUCT_MODEL_IMAGES[product.id]?.front || product.images[0];
  const modelBack = PRODUCT_MODEL_IMAGES[product.id]?.back || product.images[1] || product.images[0];

  const galleryImages = [
    product.images[0],
    modelFront,
    modelBack,
    product.images[1] || product.images[0],
  ];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
    setIsAdded(true);
    triggerToast(`ADDED TO BAG: ${product.name} (${selectedSize}) ✓`);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className={styles.dossierOverlay} onClick={onClose}>
      <div className={styles.dossierModal} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close Dossier">
          <X size={24} />
        </button>

        <div className={styles.dossierGrid}>
          
          {/* ── LEFT VISUAL AREA (EDITORIAL DOSSIER) ───────────────────────── */}
          <div className={styles.leftVisualArea}>
            <div className={styles.mainMediaFrame}>
              
              {show3D ? (
                <TShirt3DViewer
                  imageUrl={modelFront}
                  backImageUrl={modelBack}
                  baseColor={PRODUCT_BASE_COLORS[product.id] || '#161616'}
                />
              ) : (
                <img
                  src={galleryImages[activeImageIdx]}
                  alt={product.name}
                  className={styles.mainMediaImg}
                />
              )}

              {/* Editorial Badges */}
              <span className={styles.dossierTopBadge}>
                {product.collection} // DOSSIER 0{activeImageIdx + 1}
              </span>
              
              <span className={styles.dossierCounterBadge}>
                0{activeImageIdx + 1} / 0{galleryImages.length}
              </span>

              <span className={styles.verticalWatermark}>
                BANZOOK ARCHIVE / 2026
              </span>

              {/* 3D Model Toggle */}
              <button className={styles.toggle3dPill} onClick={() => setShow3D(!show3D)}>
                <span>{show3D ? 'VIEW 2D IMAGE' : 'INTERACTIVE 3D MODEL'}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className={styles.thumbnailRow}>
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`${styles.thumbnailBtn} ${activeImageIdx === idx && !show3D ? styles.thumbnailBtnActive : ''}`}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setShow3D(false);
                  }}
                >
                  <img src={img} alt={`Frame 0${idx + 1}`} className={styles.thumbnailImg} />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT INFORMATION AREA (EDITORIAL HIERARCHY) ─────────────── */}
          <div className={styles.rightInfoArea}>
            
            <div className={styles.metadataRow}>
              <span>LIMITED RELEASE</span>
              <span>•</span>
              <span>01 / 50 UNITS</span>
              <span>•</span>
              <span>AVAILABLE NOW</span>
            </div>

            <span className={styles.dropTag}>{product.collection}</span>

            <h1 className={styles.dossierTitle}>{product.name}</h1>
            <span className={styles.subTitleQuote}>"CHALLENGE ACCEPTED"</span>

            <div className={styles.priceTag}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            {/* Short Editorial Product Story */}
            <div className={styles.editorialStoryBox}>
              <div className={styles.editorialStoryHeadline}>BUILT FOR SPEED.</div>
              <p className={styles.editorialStoryText}>
                A BOXED FIT. A LOUD GRAPHIC. ZERO SUBTLETY. THE KIND OF TEE THAT DOESN'T ASK TO BE NOTICED. CONSTRUCTED FROM 300+ GSM HEAVYWEIGHT COMBED ORGANIC COTTON.
              </p>
            </div>

            {/* Size Selector */}
            <div className={styles.sizeGroup}>
              <span className={styles.sizeTitle}>SELECT SIZE</span>
              <div className={styles.sizePillsRow}>
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    className={`${styles.sizeBtn} ${selectedSize === sz ? styles.sizeBtnActive : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag Action */}
            <button
              className={`${styles.addToBagBtn} ${isAdded ? styles.addedState : ''}`}
              onClick={handleAddToCart}
            >
              <span>{isAdded ? 'ADDED TO BAG ✓' : `ADD TO BAG — ₹${product.price}`}</span>
              {!isAdded && <ArrowRight size={18} />}
            </button>

            {/* Expandable Accordions */}
            <div className={styles.accordionsGroup}>
              
              <div className={styles.accordionItem}>
                <button className={styles.accordionTrigger} onClick={() => toggleAccordion('mat')}>
                  <span>+ MATERIAL &amp; CONSTRUCTION</span>
                  {openAccordion === 'mat' ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                {openAccordion === 'mat' && (
                  <div className={styles.accordionContent}>
                    100% Organic Heavyweight Combed Cotton (300 GSM). Custom high-density silicone front print with vintage acid wash treatment. Handcrafted in Mumbai.
                  </div>
                )}
              </div>

              <div className={styles.accordionItem}>
                <button className={styles.accordionTrigger} onClick={() => toggleAccordion('fit')}>
                  <span>+ FIT &amp; SIZING</span>
                  {openAccordion === 'fit' ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                {openAccordion === 'fit' && (
                  <div className={styles.accordionContent}>
                    Boxy, oversized streetwear silhouette. Dropped shoulders with relaxed arm openings. Order true to size for signature oversized fit, or size down for tailored fit.
                  </div>
                )}
              </div>

              <div className={styles.accordionItem}>
                <button className={styles.accordionTrigger} onClick={() => toggleAccordion('ship')}>
                  <span>+ SHIPPING &amp; RETURNS</span>
                  {openAccordion === 'ship' ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                {openAccordion === 'ship' && (
                  <div className={styles.accordionContent}>
                    Ships within 24-48 hours via express courier across India. 7-day hassle-free size exchanges and returns on unworn items.
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
