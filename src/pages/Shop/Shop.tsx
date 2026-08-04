import React, { useState, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { PRODUCTS, type Product as ProductType } from '../../data/products';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import { SidebarFilter, type ActiveFilters } from '../../components/SidebarFilter/SidebarFilter';
import styles from './Shop.module.css';

interface ShopProps {
  onNavigateToProduct?: () => void;
}

const SHOWROOM_CATEGORIES = [
  'ALL',
  'NEW',
  'DROP 01',
  'DROP 02',
  'TEES',
  'HOODIES',
  'OUTERWEAR',
  'ARCHIVE'
] as const;
type ShowroomFilter = typeof SHOWROOM_CATEGORIES[number];

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

export const ShopPage: React.FC<ShopProps> = () => {
  const [activeFilter, setActiveFilter] = useState<ShowroomFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sidebar Filter State
  const [sidebarFilters, setSidebarFilters] = useState<ActiveFilters>({
    priceRanges: [],
    minPrice: '',
    maxPrice: '',
    deals: [],
    discounts: [],
    brands: [],
    flags: [],
    conditions: [],
    newArrivals: [],
    availability: [],
    category: 'Any Department',
    reviewStars: null,
  });

  // Quick View Detail Modal State
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      // Category filter (Top Nav)
      if (activeFilter === 'TEES' && prod.category !== 'Tees') return false;
      if (activeFilter === 'HOODIES' && prod.category !== 'Hoodies') return false;
      if (activeFilter === 'OUTERWEAR' && prod.category !== 'Outerwear') return false;
      if (activeFilter === 'DROP 01' && prod.collection !== 'Drop 001') return false;
      if (activeFilter === 'NEW' && !prod.isNew) return false;
      if (activeFilter === 'ARCHIVE' && !prod.isLimited) return false;

      // Sidebar Category
      if (sidebarFilters.category !== 'Any Department' && sidebarFilters.category !== 'Apparel') {
        if (sidebarFilters.category === 'T-Shirts' && prod.category !== 'Tees') return false;
        if (sidebarFilters.category === 'Hoodies & Sweatshirts' && prod.category !== 'Hoodies') return false;
        if (sidebarFilters.category === 'Outerwear' && prod.category !== 'Outerwear') return false;
        if (sidebarFilters.category === 'Accessories' && prod.category !== 'Accessories') return false;
        if (sidebarFilters.category === 'Bottoms' && prod.category !== 'Bottoms' as any) return false;
      }

      // Sidebar Price
      let matchesPrice = true;
      if (sidebarFilters.priceRanges.length > 0 || sidebarFilters.minPrice || sidebarFilters.maxPrice) {
        matchesPrice = false;
        
        if (sidebarFilters.priceRanges.includes('Under ₹2,500') && prod.price < 2500) matchesPrice = true;
        if (sidebarFilters.priceRanges.includes('₹2,500 - ₹7,000') && prod.price >= 2500 && prod.price <= 7000) matchesPrice = true;
        if (sidebarFilters.priceRanges.includes('₹7,000 - ₹10,500') && prod.price > 7000 && prod.price <= 10500) matchesPrice = true;
        if (sidebarFilters.priceRanges.includes('₹10,500 - ₹14,000') && prod.price > 10500 && prod.price <= 14000) matchesPrice = true;
        if (sidebarFilters.priceRanges.includes('Over ₹14,000') && prod.price > 14000) matchesPrice = true;
        
        const minP = parseInt(sidebarFilters.minPrice);
        const maxP = parseInt(sidebarFilters.maxPrice);
        if (!isNaN(minP) && !isNaN(maxP)) {
          if (prod.price >= minP && prod.price <= maxP) matchesPrice = true;
        } else if (!isNaN(minP) && prod.price >= minP) {
          matchesPrice = true;
        } else if (!isNaN(maxP) && prod.price <= maxP) {
          matchesPrice = true;
        }
      }
      if (!matchesPrice) return false;

      // Sidebar Availability (assuming we hide sold-out unless checked)
      if (!sidebarFilters.availability.includes('Include Out of Stock') && prod.availability === 'sold-out') {
        return false;
      }

      // Sidebar New Arrivals
      if (sidebarFilters.newArrivals.length > 0 && !prod.isNew) {
        return false;
      }

      // Sidebar Top Brands
      if (sidebarFilters.brands.length > 0 && !sidebarFilters.brands.includes(prod.brand)) {
        return false;
      }

      // Sidebar Item Condition
      if (sidebarFilters.conditions.length > 0 && !sidebarFilters.conditions.includes(prod.condition)) {
        return false;
      }

      // Sidebar Deals & Discounts
      if (sidebarFilters.deals.length > 0) {
        if (!prod.deals || !sidebarFilters.deals.some(deal => prod.deals?.includes(deal))) {
          return false;
        }
      }

      // Sidebar Discount Percentage
      // For example, '10% Off or more', '25% Off or more'
      if (sidebarFilters.discounts.length > 0) {
        let meetsDiscount = false;
        const prodDiscount = prod.discount || 0;
        for (const discLabel of sidebarFilters.discounts) {
          const requiredMatch = discLabel.match(/(\d+)%/);
          if (requiredMatch) {
            const requiredDiscount = parseInt(requiredMatch[1], 10);
            if (prodDiscount >= requiredDiscount) {
              meetsDiscount = true;
              break;
            }
          }
        }
        if (!meetsDiscount) return false;
      }

      // Sidebar Order Options (Flags) like 'Eligible for Pay On Delivery'
      if (sidebarFilters.flags.length > 0) {
        if (!prod.flags || !sidebarFilters.flags.some(flag => prod.flags?.includes(flag))) {
          return false;
        }
      }

      // Sidebar Customer Reviews (Stars)
      if (sidebarFilters.reviewStars !== null) {
        if (prod.reviewStars < sidebarFilters.reviewStars) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesDesc = prod.description.toLowerCase().includes(query);
        const matchesTag = prod.collection.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }
      return true;
    });
  }, [activeFilter, searchQuery, sidebarFilters]);

  const handleOpenDetail = (product: ProductType) => {
    setSelectedProduct(product);
  };

  const featuredHeroProduct = filteredProducts[0] || PRODUCTS[0];
  const secondaryProducts = filteredProducts.slice(1);

  return (
    <div className={styles.shopShowroom}>
      
      {/* ── 1. Showroom Entrance Header ───────────────────────────────────── */}
      <section className={styles.showroomEntry}>
        <div className={styles.container}>
          <div className={styles.entryMetaRow}>
            <span className={styles.entryBadge}>DIGITAL STREETWEAR SHOWROOM</span>
            <span className={styles.entrySubtext}>CURATED ARCHIVE // 07.2026</span>
          </div>
          <h1 className={styles.entryTitle}>
            THE BANZOOK<br />
            <span style={{ color: 'var(--orange)' }}>SHOWROOM.</span>
          </h1>
          <p className={styles.entryDesc}>
            Explore our spatial fashion exhibition. Every product is a numbered micro-run constructed from 300+ GSM heavyweight combed organic cotton.
          </p>
        </div>
      </section>

      {/* ── 2. The Drop Wall Hero Feature Area ────────────────────────────── */}
      <section className={styles.dropWallSection}>
        <div className={styles.container}>
          <div className={styles.dropWallCard}>
            <img
              src="/images/banzook_model_cinematic_hero.png"
              alt="The Drop Wall Hero Campaign"
              className={styles.dropWallBgImg}
            />

            <div className={styles.dropWallContent}>
              <span className={styles.dropWallTag}>THE DROP WALL // FEATURED EXHIBIT</span>
              <h2 className={styles.dropWallHeadline}>
                DROP 001<br />
                BUILT DIFFERENT.
              </h2>
              <p className={styles.dropWallText}>
                Raw industrial graphics, high-density silicone chest emblems, and custom vintage-washed black fabric cuts.
              </p>
              
              <button className={styles.dropWallBtn} onClick={() => handleOpenDetail(featuredHeroProduct)}>
                <span>EXPLORE FEATURED PIECE</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Dedicated Category Filter & Search Bar ─────────────────────── */}
      <nav className={styles.showroomNavSection}>
        <div className={styles.container}>
          <div className={styles.navRow}>
            
            {/* Showroom Categories */}
            <div className={styles.categoriesGroup}>
              {SHOWROOM_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.categoryBtn} ${activeFilter === cat ? styles.categoryBtnActive : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search */}
            <div className={styles.searchSortGroup}>
              <div className={styles.searchInputWrapper}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="SEARCH SHOWROOM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* ── 4. Spatial Showroom Display System ────────────────────────────── */}
      <section className={styles.showroomDisplaySection}>
        <div className={styles.container}>
          <div className={styles.shopLayoutGrid}>
            {/* Sidebar Column */}
            <div className={styles.sidebarColumn}>
              <SidebarFilter activeFilters={sidebarFilters} onChange={setSidebarFilters} />
            </div>
            
            {/* Main Products Column */}
            <div className={styles.mainColumn}>
              {filteredProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', color: '#666666' }}>
                  <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.75rem', marginBottom: '1rem', color: '#FFFFFF' }}>
                    NO PIECES MATCH YOUR SEARCH
                  </h2>
                  <p style={{ marginBottom: '2rem' }}>Try clearing filters or adjusting your search phrase.</p>
                  <button className="btn-primary" onClick={() => { setActiveFilter('ALL'); setSearchQuery(''); }}>
                    RESET SHOWROOM FILTERS
                  </button>
                </div>
              ) : (
                <div className={styles.spatialLayoutGrid}>
                  
                  {/* Featured Large Module (Spans 8 columns) */}
                  {featuredHeroProduct && (
                    <div className={styles.heroModule} onClick={() => handleOpenDetail(featuredHeroProduct)}>
                      <div className={styles.heroModuleMedia}>
                        <img src={featuredHeroProduct.images[0]} alt={featuredHeroProduct.name} className={styles.moduleImg} />
                        <img
                          src={PRODUCT_MODEL_IMAGES[featuredHeroProduct.id]?.front || featuredHeroProduct.images[1]}
                          alt={featuredHeroProduct.name}
                          className={styles.moduleImgHover}
                        />

                        <div className={styles.sizeChipsRow}>
                          {featuredHeroProduct.sizes.map((sz) => (
                            <span key={sz} className={styles.sizeChip}>{sz}</span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--orange)', letterSpacing: '0.12em' }}>
                            FEATURED EXHIBIT // {featuredHeroProduct.collection}
                          </span>
                          <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.4rem', fontWeight: 900, color: '#111111', margin: '0.2rem 0' }}>
                            {featuredHeroProduct.name}
                          </h3>
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: '#111111' }}>
                          ₹{featuredHeroProduct.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Secondary Lookbook Module (Spans 4 columns) */}
                  {secondaryProducts[0] && (
                    <div className={styles.portraitModule} onClick={() => handleOpenDetail(secondaryProducts[0])}>
                      <div className={styles.portraitModuleMedia}>
                        <img src={secondaryProducts[0].images[0]} alt={secondaryProducts[0].name} className={styles.moduleImg} />
                        <img
                          src={PRODUCT_MODEL_IMAGES[secondaryProducts[0].id]?.front || secondaryProducts[0].images[1]}
                          alt={secondaryProducts[0].name}
                          className={styles.moduleImgHover}
                        />

                        <div className={styles.sizeChipsRow}>
                          {secondaryProducts[0].sizes.map((sz) => (
                            <span key={sz} className={styles.sizeChip}>{sz}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: 'var(--orange)', letterSpacing: '0.1em' }}>
                          {secondaryProducts[0].collection}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.1rem', fontWeight: 900, color: '#111111', margin: '0.2rem 0' }}>
                          {secondaryProducts[0].name}
                        </h3>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: '#555555' }}>
                          ₹{secondaryProducts[0].price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Remaining Showroom Modules (Spans 6 columns each) */}
                  {secondaryProducts.slice(1).map((prod) => {
                    const hoverImg = PRODUCT_MODEL_IMAGES[prod.id]?.front || prod.images[1] || prod.images[0];
                    return (
                      <div key={prod.id} className={styles.mediumModule} onClick={() => handleOpenDetail(prod)}>
                        <div className={styles.mediumModuleMedia}>
                          <img src={prod.images[0]} alt={prod.name} className={styles.moduleImg} />
                          <img src={hoverImg} alt={prod.name} className={styles.moduleImgHover} />

                          <div className={styles.sizeChipsRow}>
                            {prod.sizes.map((sz) => (
                              <span key={sz} className={styles.sizeChip}>{sz}</span>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: 'var(--orange)', letterSpacing: '0.1em' }}>
                              {prod.collection}
                            </span>
                            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.1rem', fontWeight: 900, color: '#111111', margin: '0.2rem 0' }}>
                              {prod.name}
                            </h3>
                          </div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: '#555555' }}>
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. The BANZOOK Constellation Section ───────────────────────────── */}
      <section className={styles.constellationSection}>
        <div className={styles.container}>
          <div className={styles.constellationHeader}>
            <span className={styles.constellationTag}>INTERACTIVE PRODUCT UNIVERSE</span>
            <h2 className={styles.constellationTitle}>THE BANZOOK CONSTELLATION</h2>
          </div>

          <div className={styles.constellationCanvas}>
            {PRODUCTS.slice(0, 3).map((prod, idx) => (
              <div key={prod.id} className={styles.constellationNode} onClick={() => handleOpenDetail(prod)}>
                <span className={styles.nodeTag}>NODE 0{idx + 1} // {prod.collection}</span>
                <h3 className={styles.nodeTitle}>{prod.name}</h3>
                <img src={prod.images[0]} alt={prod.name} className={styles.nodeImg} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={styles.nodePrice}>₹{prod.price.toLocaleString('en-IN')}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--orange)', fontWeight: 800 }}>
                    EXPLORE NODE →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. BANZOOK Product Dossier Modal ──────────────────────────────── */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};

export const Shop = ShopPage;
