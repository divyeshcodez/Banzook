import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { b2bCategories } from '../../data/b2bData';
import type { B2BCategory } from '../../data/b2bData';
import { B2BConfigurator } from './B2BConfigurator';
import styles from './B2B.module.css';

export const B2BPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<B2BCategory | null>(null);

  if (selectedCategory) {
    return (
      <div className={styles.container}>
        <div className="px-[5%] max-w-[1400px] mx-auto">
          <button 
            className={styles.backButton}
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Categories
          </button>
        </div>
        <B2BConfigurator product={selectedCategory} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.heroTitle}>Bulk Orders Made Simple</h1>
        <p className={styles.heroSubtitle}>
          Premium apparel for businesses, brands, colleges, events, teams, and organizations.
        </p>
        <button className="btn-red" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
          Start Your Bulk Order
        </button>
      </motion.div>

      <div className={styles.grid}>
        {b2bCategories.map((category, index) => (
          <motion.div
            key={category.id}
            className={styles.card}
            onClick={() => setSelectedCategory(category)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div className={styles.cardImagePlaceholder}>
              {category.name} Image
            </div>
            <h3 className={styles.cardTitle}>{category.name}</h3>
            <p className={styles.cardDesc}>{category.description}</p>
            <div className="btn-outline w-full" style={{ padding: '12px' }}>
              Customize Bulk Order
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
