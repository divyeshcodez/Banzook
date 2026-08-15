import React, { useState } from 'react';
import { X, ArrowRight, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || 'L');
  const [show3D, setShow3D] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const { addToCart, triggerToast } = useCart();

  if (!product) return null;

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
          <X size={28} />
        </button>

        <div className={styles.dossierGrid}>
          
          {/* ── LEFT VISUAL AREA (EDITORIAL DOSSIER) ───────────────────────── */}
          <div className={styles.leftVisualArea}>
            <div className={styles.mainMediaFrame}>
              
              <AnimatePresence mode="wait">
                {show3D ? (
                  <motion.div 
                    key="3d" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
                  >
                    <TShirt3DViewer
                      imageUrl={modelFront}
                      backImageUrl={modelBack}
                      baseColor={PRODUCT_BASE_COLORS[product.id] || '#161616'}
                    />
                  </motion.div>
                ) : (
                  <motion.img
                    key={`img-${activeImageIdx}`}
                    src={galleryImages[activeImageIdx]}
                    alt={product.name}
                    className={styles.mainMediaImg}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

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
              <span className={styles.accent}>LIMITED RELEASE</span>
              <span>•</span>
              <span>DROP 001</span>
              <span>•</span>
              <span className={styles.accent}>AVAILABLE NOW</span>
            </div>

            <h1 className={styles.dossierTitle}>{product.name}</h1>
            <span className={styles.subTitleQuote}>"CHALLENGE ACCEPTED"</span>

            <div className={styles.priceTag}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <p className={styles.editorialStoryText}>
              A BOXED FIT. A LOUD GRAPHIC. ZERO SUBTLETY. THE KIND OF TEE THAT DOESN'T ASK TO BE NOTICED. CONSTRUCTED FROM 300+ GSM HEAVYWEIGHT COMBED ORGANIC COTTON.
            </p>

            {/* Specifications Grid */}
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Weight</span>
                <span className={styles.specValue}>300+ GSM</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Material</span>
                <span className={styles.specValue}>Organic Cotton</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Fit</span>
                <span className={styles.specValue}>Boxy / Oversized</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className={styles.sizeGroup}>
              <div className={styles.sizeTitle}>
                <span>SELECT SIZE</span>
                <span className={styles.sizeGuideLink}>SIZE GUIDE</span>
              </div>
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
              {!isAdded && <ArrowRight size={20} />}
            </button>

            {/* Expandable Accordions */}
            <div className={styles.accordionsGroup}>
              
              <div className={styles.accordionItem}>
                <button className={styles.accordionTrigger} onClick={() => toggleAccordion('mat')}>
                  <span>MATERIAL &amp; CONSTRUCTION</span>
                  {openAccordion === 'mat' ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                <AnimatePresence>
                  {openAccordion === 'mat' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.accordionContent}>
                        100% Organic Heavyweight Combed Cotton (300 GSM). Custom high-density silicone front print with vintage acid wash treatment. Handcrafted in Mumbai.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.accordionItem}>
                <button className={styles.accordionTrigger} onClick={() => toggleAccordion('fit')}>
                  <span>FIT &amp; SIZING</span>
                  {openAccordion === 'fit' ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                <AnimatePresence>
                  {openAccordion === 'fit' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.accordionContent}>
                        Boxy, oversized streetwear silhouette. Dropped shoulders with relaxed arm openings. Order true to size for signature oversized fit, or size down for tailored fit.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.accordionItem}>
                <button className={styles.accordionTrigger} onClick={() => toggleAccordion('ship')}>
                  <span>SHIPPING &amp; RETURNS</span>
                  {openAccordion === 'ship' ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                <AnimatePresence>
                  {openAccordion === 'ship' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.accordionContent}>
                        Ships within 24-48 hours via express courier across India. 7-day hassle-free size exchanges and returns on unworn items.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
