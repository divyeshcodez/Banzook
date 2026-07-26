import React from 'react';
import styles from './AntiGridProductShowcase.module.css';

interface ShowcaseProduct {
  id: string;
  index: string;
  name: string;
  price: string;
  collection: string;
  image: string;
  layoutClass: string;
}

const PRODUCTS: ShowcaseProduct[] = [
  {
    id: 'prod-17',
    index: '01',
    name: 'BANZOOK "BROKEN SYSTEM" REBEL TEE',
    price: '₹1,399',
    collection: 'DROP 001 / GRAPHIC',
    image: '/images/model_brokensystem.png',
    layoutClass: styles.item1,
  },
  {
    id: 'prod-13',
    index: '02',
    name: 'BANZOOK x HOT WHEELS "CHALLENGE ACCEPTED" TEE',
    price: '₹1,499',
    collection: 'DROP 001 / GRAPHIC',
    image: '/images/model_hotwheels.jpg',
    layoutClass: styles.item2,
  },
  {
    id: 'prod-16',
    index: '03',
    name: 'BANZOOK "LEGENDS NEVER DIE" MOTOR TEE',
    price: '₹1,499',
    collection: 'DROP 001 / GRAPHIC',
    image: '/images/model_legends.png',
    layoutClass: styles.item3,
  },
];

export const AntiGridProductShowcase: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>


        <div className={styles.grid}>
          {PRODUCTS.map((prod) => (
            <div 
              key={prod.id} 
              className={`${styles.item} ${prod.layoutClass}`}
            >
              <div className={styles.imageWrapper}>
                <div className={styles.indexTag}>{prod.index}</div>
                <img
                  src={prod.image}
                  alt={prod.name}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.details}>
                <div className={styles.meta}>
                  <span className={styles.collection}>{prod.collection}</span>
                  <h4 className={styles.name}>{prod.name}</h4>
                </div>
                <span className={styles.price}>{prod.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
