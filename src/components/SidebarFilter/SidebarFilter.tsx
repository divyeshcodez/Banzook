import React, { useState } from 'react';
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
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({ config: userConfig }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const config = { ...DEFAULT_CONFIG, ...userConfig };

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
      
      {/* 1. Customer Reviews (Always static logic for 4 to 1 stars) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Customer Reviews</h3>
        <div className={styles.filterList}>
          {[4, 3, 2, 1].map((stars) => (
            <button key={stars} className={styles.filterLink}>{renderStars(stars)}</button>
          ))}
        </div>
      </div>

      {/* 2. Price */}
      {config.priceRanges && config.priceRanges.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Price</h3>
          <div className={styles.filterList}>
            {config.priceRanges.map((range, idx) => (
              <button key={idx} className={styles.filterLink}>{range}</button>
            ))}
          </div>
          <div className={styles.priceInputs}>
            <input 
              type="text" 
              placeholder="Min" 
              className={styles.priceInput}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <span style={{ color: '#666' }}>-</span>
            <input 
              type="text" 
              placeholder="Max" 
              className={styles.priceInput}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button className={styles.priceGoBtn}>Go</button>
          </div>
        </div>
      )}

      {/* 3. Deals & Discounts */}
      {config.deals && config.deals.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Deals & Discounts</h3>
          <div className={styles.filterList}>
            {config.deals.map((deal, idx) => (
              <button key={idx} className={styles.filterLink}>{deal}</button>
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
              <button key={idx} className={styles.filterLink}>{discount}</button>
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
                <input type="checkbox" className={styles.checkbox} />
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
                <input type="checkbox" className={styles.checkbox} />
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
                <input type="checkbox" className={styles.checkbox} />
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
              <button key={idx} className={styles.filterLink}>{arrival}</button>
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
                <input type="checkbox" className={styles.checkbox} />
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
            <div className={styles.catLevel1}>
              <ChevronLeft size={14} /> {config.categories.level1}
            </div>
            <div className={styles.catLevel2}>{config.categories.level2}</div>
            {config.categories.level3.map((cat, idx) => (
              <div key={idx} className={styles.catLevel3}>{cat}</div>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
};
