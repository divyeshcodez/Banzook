import React from 'react';
import styles from './DropIntroduction.module.css';

export const DropIntroduction: React.FC = () => {
  return (
    <section id="drop-introduction" className={styles.section}>
      <div className={styles.label}>
        <span className={styles.labelDot} />
        AVAILABLE NOW
      </div>
      
      <h3 className={styles.title}>DROP 001</h3>
      
      <p className={styles.description}>
        A LIMITED COLLECTION FOR THOSE WHO REFUSE TO BLEND IN.
      </p>
    </section>
  );
};
