import React from 'react';
import { ChevronLeft } from 'lucide-react';
import styles from './SidebarFilter.module.css';

export interface FilterConfig {
  categories: {
    level1: string;
    level2: string;
    level3: string[];
  };
  priceRanges: string[];
  deals: string[];
  discounts: string[];
  brands: string[];
  flags: string[];
  conditions: string[];
  newArrivals: string[];
  availability: string[];
}

export interface ActiveFilters {
  priceRanges: string[];
  minPrice: string;
  maxPrice: string;
  deals: string[];
  discounts: string[];
  brands: string[];
  flags: string[];
  conditions: string[];
  newArrivals: string[];
  availability: string[];
  category: string;
  reviewStars: number | null;
}

const DEFAULT_CONFIG: FilterConfig = {
  categories: {
    level1: 'Any Department',
    level2: 'Apparel',
    level3: ['Outerwear', 'T-Shirts', 'Hoodies & Sweatshirts', 'Bottoms', 'Accessories']
  },
  priceRanges: ['Under ₹2,500', '₹2,500 - ₹7,000', '₹7,000 - ₹10,500', '₹10,500 - ₹14,000', 'Over ₹14,000'],
  deals: ['All Discounts', 'Today\'s Deals'],
  discounts: ['10% Off or more', '25% Off or more', '35% Off or more', '50% Off or more', '60% Off or more'],
  brands: ['BANZOOK Originals', 'BANZOOK Code', 'B-Series'],
  flags: ['Eligible for Pay On Delivery'],
  conditions: ['New', 'Refurbished', 'Used'],
  newArrivals: ['Last 30 days', 'Last 90 days'],
  availability: ['Include Out of Stock']
};

interface SidebarFilterProps {
  config?: Partial<FilterConfig>;
  activeFilters: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({ config: userConfig, activeFilters, onChange }) => {
  const config = { ...DEFAULT_CONFIG, ...userConfig };

  const handleToggleArrayItem = (key: keyof ActiveFilters, value: string) => {
    const currentArray = activeFilters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    onChange({ ...activeFilters, [key]: newArray });
  };

  const handleSetCategory = (cat: string) => {
    onChange({ ...activeFilters, category: cat });
  };

  const renderStars = (filled: number) => {
    return (
      <div className={styles.starRating}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" className={i < filled ? styles.star : styles.starEmpty}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
        <span className={styles.ratingText}>& Up</span>
      </div>
    );
  };

  return (
    <aside className={styles.sidebar}>
      
      {/* 1. Customer Reviews */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Customer Reviews</h3>
        <div className={styles.filterList}>
          {[4, 3, 2, 1].map((stars) => (
            <button 
              key={stars} 
              className={styles.filterLink}
              style={{ color: activeFilters.reviewStars === stars ? 'var(--orange)' : undefined }}
              onClick={() => onChange({ ...activeFilters, reviewStars: activeFilters.reviewStars === stars ? null : stars })}
            >
              {renderStars(stars)}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Price */}
      {config.priceRanges && config.priceRanges.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Price</h3>
          <div className={styles.filterList}>
            {config.priceRanges.map((range, idx) => (
              <button 
                key={idx} 
                className={styles.filterLink}
                style={{ color: activeFilters.priceRanges.includes(range) ? 'var(--orange)' : undefined }}
                onClick={() => handleToggleArrayItem('priceRanges', range)}
              >
                {range}
              </button>
            ))}
          </div>
          <div className={styles.priceInputs}>
            <input 
              type="text" 
              placeholder="Min" 
              className={styles.priceInput}
              value={activeFilters.minPrice}
              onChange={(e) => onChange({ ...activeFilters, minPrice: e.target.value })}
            />
            <span style={{ color: '#666' }}>-</span>
            <input 
              type="text" 
              placeholder="Max" 
              className={styles.priceInput}
              value={activeFilters.maxPrice}
              onChange={(e) => onChange({ ...activeFilters, maxPrice: e.target.value })}
            />
            <button className={styles.priceGoBtn} onClick={() => { /* triggers re-render via state */ }}>Go</button>
          </div>
        </div>
      )}

      {/* 3. Deals & Discounts */}
      {config.deals && config.deals.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Deals & Discounts</h3>
          <div className={styles.filterList}>
            {config.deals.map((deal, idx) => (
              <button 
                key={idx} 
                className={styles.filterLink}
                style={{ color: activeFilters.deals.includes(deal) ? 'var(--orange)' : undefined }}
                onClick={() => handleToggleArrayItem('deals', deal)}
              >
                {deal}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Discount Percentage */}
      {config.discounts && config.discounts.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Discount</h3>
          <div className={styles.filterList}>
            {config.discounts.map((discount, idx) => (
              <button 
                key={idx} 
                className={styles.filterLink}
                style={{ color: activeFilters.discounts.includes(discount) ? 'var(--orange)' : undefined }}
                onClick={() => handleToggleArrayItem('discounts', discount)}
              >
                {discount}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. Top Brands */}
      {config.brands && config.brands.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Top Brands</h3>
          <div className={styles.filterList}>
            {config.brands.map((brand, idx) => (
              <label key={idx} className={styles.filterItem}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox} 
                  checked={activeFilters.brands.includes(brand)}
                  onChange={() => handleToggleArrayItem('brands', brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 6. Pay On Delivery / Flags */}
      {config.flags && config.flags.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Order Options</h3>
          <div className={styles.filterList}>
            {config.flags.map((flag, idx) => (
              <label key={idx} className={styles.filterItem}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox} 
                  checked={activeFilters.flags.includes(flag)}
                  onChange={() => handleToggleArrayItem('flags', flag)}
                />
                {flag}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 7. Item Condition */}
      {config.conditions && config.conditions.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Item Condition</h3>
          <div className={styles.filterList}>
            {config.conditions.map((condition, idx) => (
              <label key={idx} className={styles.filterItem}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox} 
                  checked={activeFilters.conditions.includes(condition)}
                  onChange={() => handleToggleArrayItem('conditions', condition)}
                />
                {condition}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 8. New Arrivals */}
      {config.newArrivals && config.newArrivals.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>New Arrivals</h3>
          <div className={styles.filterList}>
            {config.newArrivals.map((arrival, idx) => (
              <button 
                key={idx} 
                className={styles.filterLink}
                style={{ color: activeFilters.newArrivals.includes(arrival) ? 'var(--orange)' : undefined }}
                onClick={() => handleToggleArrayItem('newArrivals', arrival)}
              >
                {arrival}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 9. Availability */}
      {config.availability && config.availability.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Availability</h3>
          <div className={styles.filterList}>
            {config.availability.map((avail, idx) => (
              <label key={idx} className={styles.filterItem}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={activeFilters.availability.includes(avail)}
                  onChange={() => handleToggleArrayItem('availability', avail)}
                />
                {avail}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 10. Category Tree */}
      {config.categories && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Category</h3>
          <div className={styles.categoryTree}>
            <div 
              className={styles.catLevel1} 
              onClick={() => handleSetCategory('Any Department')}
              style={{ color: activeFilters.category === 'Any Department' ? 'var(--orange)' : undefined }}
            >
              <ChevronLeft size={14} /> {config.categories.level1}
            </div>
            <div 
              className={styles.catLevel2}
            >
              {config.categories.level2}
            </div>
            {config.categories.level3.map((cat, idx) => (
              <div 
                key={idx} 
                className={styles.catLevel3}
                onClick={() => handleSetCategory(cat)}
                style={{ color: activeFilters.category === cat ? 'var(--orange)' : undefined }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
};
