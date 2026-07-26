import React, { useState } from 'react';
import styles from './WhoAreYou.module.css';

interface Persona {
  id: string;
  title: string;
  tagline: string;
  image: string;
}

const PERSONAS: Persona[] = [
  {
    id: 'rebel',
    title: 'THE REBEL',
    tagline: 'CLAIM YOUR SPACE / DISRUPT THE ORDER',
    image: '/images/rebel_bg.png',
  },
  {
    id: 'creator',
    title: 'THE CREATOR',
    tagline: 'SHAPE THE CULTURE / DEFINE THE FUTURE',
    image: '/images/creator_bg.png',
  },
  {
    id: 'outsider',
    title: 'THE OUTSIDER',
    tagline: 'WALK IN EXCLUSIVITY / REFUSE TO FIT IN',
    image: '/images/outsider_bg.png',
  },
];

export const WhoAreYou: React.FC = () => {
  const [activePersona, setActivePersona] = useState<string>('rebel');

  return (
    <section className={styles.section}>
      {/* Background Media Layer */}
      <div className={styles.bgWrapper}>
        {PERSONAS.map((persona) => (
          <img
            key={persona.id}
            src={persona.image}
            alt={persona.title}
            className={`${styles.bgImage} ${activePersona === persona.id ? styles.bgActive : ''}`}
            loading="lazy"
          />
        ))}
      </div>



      {/* Interactive Columns Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.subtitle}>DISCOVER YOURSELF</div>
          <h2 className={styles.title}>WHO ARE YOU?</h2>
        </div>

        <div className={styles.grid}>
          {PERSONAS.map((persona) => (
            <div
              key={persona.id}
              className={`${styles.column} ${activePersona === persona.id ? styles.columnActive : ''}`}
              onMouseEnter={() => setActivePersona(persona.id)}
              onClick={() => setActivePersona(persona.id)}
            >
              <h3 className={styles.columnTitle}>{persona.title}</h3>
              <p className={styles.columnDesc}>{persona.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
