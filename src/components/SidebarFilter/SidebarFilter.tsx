import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import styles from './SidebarFilter.module.css';

export const SidebarFilter: React.FC = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

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
          <button className={styles.filterLink}>{renderStars(4)}</button>
          <button className={styles.filterLink}>{renderStars(3)}</button>
          <button className={styles.filterLink}>{renderStars(2)}</button>
          <button className={styles.filterLink}>{renderStars(1)}</button>
        </div>
      </div>

      {/* 2. Price */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Price</h3>
        <div className={styles.filterList}>
          <button className={styles.filterLink}>Under ₹2,500</button>
          <button className={styles.filterLink}>₹2,500 - ₹7,000</button>
          <button className={styles.filterLink}>₹7,000 - ₹10,500</button>
          <button className={styles.filterLink}>₹10,500 - ₹14,000</button>
          <button className={styles.filterLink}>Over ₹14,000</button>
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

      {/* 3. Deals & Discounts */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Deals & Discounts</h3>
        <div className={styles.filterList}>
          <button className={styles.filterLink}>All Discounts</button>
          <button className={styles.filterLink}>Today's Deals</button>
        </div>
      </div>

      {/* 4. Discount Percentage */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Discount</h3>
        <div className={styles.filterList}>
          <button className={styles.filterLink}>10% Off or more</button>
          <button className={styles.filterLink}>25% Off or more</button>
          <button className={styles.filterLink}>35% Off or more</button>
          <button className={styles.filterLink}>50% Off or more</button>
          <button className={styles.filterLink}>60% Off or more</button>
        </div>
      </div>

      {/* 5. Top Brands */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Top Brands</h3>
        <div className={styles.filterList}>
          <label className={styles.filterItem}>
            <input type="checkbox" className={styles.checkbox} />
            BANZOOK Originals
          </label>
          <label className={styles.filterItem}>
            <input type="checkbox" className={styles.checkbox} />
            BANZOOK Code
          </label>
          <label className={styles.filterItem}>
            <input type="checkbox" className={styles.checkbox} />
            B-Series
          </label>
        </div>
      </div>

      {/* 6. Pay On Delivery */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Pay On Delivery</h3>
        <div className={styles.filterList}>
          <label className={styles.filterItem}>
            <input type="checkbox" className={styles.checkbox} />
            Eligible for Pay On Delivery
          </label>
        </div>
      </div>

      {/* 7. Item Condition */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Item Condition</h3>
        <div className={styles.filterList}>
          <label className={styles.filterItem}>
            <input type="checkbox" className={styles.checkbox} />
            New
          </label>
        </div>
      </div>

      {/* 8. New Arrivals */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>New Arrivals</h3>
        <div className={styles.filterList}>
          <button className={styles.filterLink}>Last 30 days</button>
          <button className={styles.filterLink}>Last 90 days</button>
        </div>
      </div>

      {/* 9. Availability */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Availability</h3>
        <div className={styles.filterList}>
          <label className={styles.filterItem}>
            <input type="checkbox" className={styles.checkbox} />
            Include Out of Stock
          </label>
        </div>
      </div>

      {/* 10. Category Tree */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Category</h3>
        <div className={styles.categoryTree}>
          <div className={styles.catLevel1}>
            <ChevronLeft size={14} /> Any Department
          </div>
          <div className={styles.catLevel2}>Apparel</div>
          <div className={styles.catLevel3}>Outerwear</div>
          <div className={styles.catLevel3}>T-Shirts</div>
          <div className={styles.catLevel3}>Hoodies & Sweatshirts</div>
          <div className={styles.catLevel3}>Bottoms</div>
          <div className={styles.catLevel3}>Accessories</div>
        </div>
      </div>

    </aside>
  );
};
