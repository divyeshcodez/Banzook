import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BrandStatementSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export const BrandStatementSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const brand = brandRef.current;

    if (!container || !line1 || !line2 || !brand) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Setup simple layout for reduced motion
      gsap.set(line1, { opacity: 0 });
      gsap.set(line2, { opacity: 0 });
      gsap.set(brand, { opacity: 1, scale: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%', // Pin duration
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Move text apart and fade it, then scale up BANZOOK
    tl.to(line1, {
      x: '-30%',
      opacity: 0,
      duration: 1,
    })
    .to(line2, {
      x: '30%',
      opacity: 0,
      duration: 1,
    }, '-=1')
    .to(brand, {
      opacity: 1,
      scale: 1,
      duration: 1,
    }, '-=0.3');

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.section}>


      <div className={styles.textContainer}>
        {/* Slidewords */}
        <div ref={line1Ref} className={styles.wordLine}>
          SPEAKS
        </div>
        <div ref={line2Ref} className={`${styles.wordLine} ${styles.orangeText}`}>
          IN PRINTS.
        </div>

        {/* Morph brand reveal */}
        <div ref={brandRef} className={styles.brandOverlay}>
          BANZOOK
        </div>
      </div>
    </section>
  );
};
