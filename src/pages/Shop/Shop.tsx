import React, { useState, useMemo } from 'react';
import { PRODUCTS, type Product as ProductType } from '../../data/products';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import styles from './Shop.module.css';
import { ChevronDown, ChevronUp, X, Filter } from 'lucide-react';

interface ShopProps {
  onNavigateToProduct?: () => void;
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

type SortOption = 'newest' | 'price-low' | 'price-high';

export const ShopPage: React.FC<ShopProps> = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Simplified filter state
  const [filters, setFilters] = useState({
    category: [] as string[],
    collection: [] as string[],
    size: [] as string[],
    availability: [] as string[],
  });

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    category: true,
    collection: true,
    size: true,
    availability: true
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const toggleFilter = (group: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const current = prev[group];
      const updated = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      return { ...prev, [group]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      collection: [],
      size: [],
      availability: [],
    });
  };

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    let result = PRODUCTS.filter(prod => {
      if (filters.category.length > 0 && !filters.category.includes(prod.category)) return false;
      if (filters.collection.length > 0 && !filters.collection.includes(prod.collection)) return false;
      if (filters.availability.length > 0 && !filters.availability.includes(prod.availability)) return false;
      
      if (filters.size.length > 0) {
        const hasSize = prod.sizes.some(s => filters.size.includes(s));
        if (!hasSize) return false;
      }
      
      return true;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className={styles.shopPage}>
      <div className={styles.container}>
        
        {/* Header */}
        <header className={styles.shopHeader}>
          <div className={styles.headerLeft}>
            <h1>SHOP ALL</h1>
            <span className={styles.headerSubtitle}>Streetwear made to stand out.</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.productCount}>[{processedProducts.length}] ITEMS</span>
            <select 
              className={styles.sortSelect} 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="newest">SORT BY: NEWEST</option>
              <option value="price-low">PRICE: LOW - HIGH</option>
              <option value="price-high">PRICE: HIGH - LOW</option>
            </select>
            <button className={styles.mobileFilterBtn} onClick={() => setIsMobileFilterOpen(true)}>
              <Filter size={16} /> FILTERS
            </button>
          </div>
        </header>

        {/* Layout */}
        <div className={styles.mainLayout}>
          
          {/* Sidebar */}
          <aside className={`${styles.sidebar} ${isMobileFilterOpen ? styles.mobileOpen : ''}`}>
            {isMobileFilterOpen && (
              <button className={styles.clearAllBtn} style={{ marginBottom: '2rem' }} onClick={() => setIsMobileFilterOpen(false)}>
                <X size={20} /> CLOSE FILTERS
              </button>
            )}
            
            <div className={styles.sidebarHeader}>
              <h2>FILTERS</h2>
              <button className={styles.clearAllBtn} onClick={clearFilters}>CLEAR ALL</button>
            </div>

            {/* Category Filter */}
            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle} onClick={() => toggleGroup('category')}>
                CATEGORY {expandedGroups.category ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </div>
              {expandedGroups.category && (
                <div className={styles.filterList}>
                  {['Tees', 'Hoodies', 'Outerwear', 'Accessories'].map(cat => (
                    <label key={cat} className={styles.filterCheckbox}>
                      <input 
                        type="checkbox" 
                        checked={filters.category.includes(cat)}
                        onChange={() => toggleFilter('category', cat)}
                      />
                      {cat.toUpperCase()}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Collection Filter */}
            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle} onClick={() => toggleGroup('collection')}>
                COLLECTION {expandedGroups.collection ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </div>
              {expandedGroups.collection && (
                <div className={styles.filterList}>
                  {['Drop 001', 'Drop 002', 'Archive', 'Essentials'].map(col => (
                    <label key={col} className={styles.filterCheckbox}>
                      <input 
                        type="checkbox" 
                        checked={filters.collection.includes(col)}
                        onChange={() => toggleFilter('collection', col)}
                      />
                      {col.toUpperCase()}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Size Filter */}
            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle} onClick={() => toggleGroup('size')}>
                SIZE {expandedGroups.size ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </div>
              {expandedGroups.size && (
                <div className={styles.filterChipsRow}>
                  {['S', 'M', 'L', 'XL', 'XXL', 'OS'].map(sz => (
                    <button 
                      key={sz}
                      className={`${styles.filterChip} ${filters.size.includes(sz) ? styles.active : ''}`}
                      onClick={() => toggleFilter('size', sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Availability Filter */}
            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle} onClick={() => toggleGroup('availability')}>
                AVAILABILITY {expandedGroups.availability ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </div>
              {expandedGroups.availability && (
                <div className={styles.filterList}>
                  <label className={styles.filterCheckbox}>
                    <input 
                      type="checkbox" 
                      checked={filters.availability.includes('in-stock')}
                      onChange={() => toggleFilter('availability', 'in-stock')}
                    />
                    IN STOCK
                  </label>
                  <label className={styles.filterCheckbox}>
                    <input 
                      type="checkbox" 
                      checked={filters.availability.includes('sold-out')}
                      onChange={() => toggleFilter('availability', 'sold-out')}
                    />
                    SOLD OUT
                  </label>
                </div>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <main className={styles.productGrid}>
            {processedProducts.length === 0 ? (
              <div className={styles.noResults}>
                <h2>NOTHING FOUND</h2>
                <p>We couldn't find any pieces matching your current filters.</p>
                <button onClick={clearFilters}>CLEAR ALL FILTERS</button>
              </div>
            ) : (
              processedProducts.map(prod => {
                const hoverImg = PRODUCT_MODEL_IMAGES[prod.id]?.front || prod.images[1] || prod.images[0];
                return (
                  <div key={prod.id} className={styles.productCard} onClick={() => setSelectedProduct(prod)}>
                    
                    <div className={styles.imageWrapper}>
                      <img src={prod.images[0]} alt={prod.name} className={styles.productImg} />
                      <img src={hoverImg} alt={prod.name} className={styles.productImgHover} />
                      
                      <div className={styles.badges}>
                        {prod.isNew && <span className={`${styles.badge} ${styles.new}`}>NEW</span>}
                        {prod.isLimited && <span className={styles.badge}>LIMITED</span>}
                      </div>

                      <div className={styles.hoverOverlay}>
                        <div className={styles.sizePills}>
                          {prod.sizes.map(sz => <span key={sz} className={styles.sizePill}>{sz}</span>)}
                        </div>
                        <button className={styles.quickAddBtn} onClick={(e) => { e.stopPropagation(); setSelectedProduct(prod); }}>
                          QUICK ADD
                        </button>
                      </div>
                    </div>

                    <div className={styles.productInfo}>
                      <span className={styles.collectionLabel}>{prod.collection}</span>
                      <h3 className={styles.productName}>{prod.name}</h3>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>₹{prod.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </main>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export const Shop = ShopPage;
