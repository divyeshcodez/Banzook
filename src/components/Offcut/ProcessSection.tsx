import React from 'react';
import { Layers, Scissors, Disc } from 'lucide-react';
import styles from './ProcessSection.module.css';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01 // SOURCE',
      title: 'DEADSTOCK MILLS SURPLUS',
      icon: Layers,
      description: 'We intercept luxury mills surplus fleece, heavyweight twill, and deadstock cotton rolls from Milan, Tokyo, and Portugal before they reach incinerators.',
      spec: 'ZERO NEW RAW FABRIC PRODUCED'
    },
    {
      number: '02 // CUT',
      title: 'PATTERN EDGE MAPPING',
      icon: Scissors,
      description: 'Master cutters lay patterns by hand, sculpting garment panels directly around the unique cut-offs of each fabric roll. No two seam placements are identical.',
      spec: 'HAND-CUT IN LIMITED BATCHES'
    },
    {
      number: '03 // STITCH',
      title: 'THREAD-RED REINFORCEMENT',
      icon: Disc,
      description: 'Stitched using 4-needle flatlock seamers. Stress points are reinforced with our signature thread-red bartacks and stamped with an immutable batch number.',
      spec: 'SERIALIZED & RESTOCKED NEVER'
    }
  ];

  return (
    <section id="process" className={styles.section}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={`${styles.headerRow} reveal-init`}>
          <span className="font-mono-spec" style={{ color: 'var(--accent-red)', fontSize: '0.75rem' }}>
            // THE OFF-CUT METHODOLOGY
          </span>
          <h2 className={styles.title}>
            CIRCULAR STREETWEAR ARCHITECTURE
          </h2>
          <p className={styles.subtitle}>
            Traditional fashion generates 92 million tons of fabric waste annually. We transform high-grade mill cutoffs into numbered wearable artifacts.
          </p>
        </div>

        {/* 3-Step Breakdown */}
        <div className={styles.stepsGrid}>
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const delayClass = `delay-${idx + 1}`;

            return (
              <div key={step.number} className={`${styles.stepCard} reveal-init ${delayClass}`}>
                <div className={styles.cardHeader}>
                  <span className="font-mono-spec" style={{ color: 'var(--accent-red)', fontSize: '0.75rem', fontWeight: 700 }}>
                    {step.number}
                  </span>
                  <IconComponent size={20} className={styles.stepIcon} />
                </div>

                <h3 className={styles.stepTitle}>{step.title}</h3>

                <p className={styles.stepDesc}>{step.description}</p>

                <div className={styles.cardFooter}>
                  <span className="font-mono-spec" style={{ fontSize: '0.65rem', color: 'var(--muted-grey)' }}>
                    {step.spec}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
