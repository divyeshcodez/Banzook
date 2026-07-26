import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HorizontalStorySection.module.css';

gsap.registerPlugin(ScrollTrigger);

interface PanelData {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  number: string;
}

const STORY_PANELS: PanelData[] = [
  {
    id: 'canvas',
    tag: 'THE CANVAS',
    title: '300GSM HEAVYWEIGHT',
    description: 'We don\'t make simple garments; we build canvases. Cut from ultra-heavy organic French Terry with dropped shoulders and a boxy silhouette designed to hold structure and reclaim space.',
    image: '/images/banzook_model_centerpiece.png',
    number: '01',
  },
  {
    id: 'details',
    tag: 'THE IMPRESSION',
    title: 'HIGH-DENSITY PRINTS',
    description: 'Streetwear is a visual dialogue. Every design is screenprinted in Mumbai using thick, high-density silicone gels and plastisols so you can feel the textured ridges of the artwork on the fabric.',
    image: '/images/model_nosmoking_pose.jpg',
    number: '02',
  },
  {
    id: 'philosophy',
    tag: 'THE PHILOSOPHY',
    title: 'CULTURE OVER COMMERCE',
    description: 'We reject mass production. BANZOOK drops are released in strictly limited, numbered micro-runs. We believe in creating premium pieces that stand the test of time for those who claim their own lane.',
    image: '/images/banzook_phone_model.png',
    number: '03',
  },
];

export const HorizontalStorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;

    if (!section || !wrapper) return;

    // Check media queries for horizontal pin: only on screen widths > 768px
    const mQuery = window.matchMedia('(min-width: 769px)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let triggerInstance: ScrollTrigger | null = null;

    const initGsapPin = () => {
      if (prefersReducedMotion) return;

      const scrollWidth = wrapper.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      if (amountToScroll <= 0) return;

      triggerInstance = ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'top top',
        end: () => `+=${amountToScroll}`,
        scrub: 1,
        anticipatePin: 1,
        animation: gsap.to(wrapper, {
          x: -amountToScroll,
          ease: 'none',
        }),
      });
    };

    if (mQuery.matches) {
      initGsapPin();
    }

    const handleResize = () => {
      if (triggerInstance) {
        triggerInstance.kill();
        triggerInstance = null;
      }
      if (mQuery.matches) {
        initGsapPin();
      } else {
        // Reset transform if returning to mobile
        gsap.set(wrapper, { x: 0 });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (triggerInstance) {
        triggerInstance.kill();
      }
    };
  }, []);

  return (
    <section id="story" ref={sectionRef} className={styles.container}>
      <div className={styles.pinContainer}>

        
        <div ref={wrapperRef} className={styles.scrollWrapper}>
          
          {/* Header Panel */}
          <div className={styles.headerPanel}>
            <div className={styles.label}>THE MOVEMENT</div>
            <h2 className={styles.title}>MOVE<br />DIFFERENT.</h2>
            <div className={styles.storyIndicator}>
              <span>SCROLL TO PROGRESS</span>
              <div className={styles.arrowLine} />
            </div>
          </div>

          {/* Story Panels */}
          {STORY_PANELS.map((panel) => (
            <div key={panel.id} className={styles.panel}>
              <div className={styles.panelGrid}>
                <div className={styles.imageContainer}>
                  <img
                    src={panel.image}
                    alt={panel.title}
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
                <div className={styles.textContent}>
                  <span className={styles.panelTag}>{panel.tag}</span>
                  <h3 className={styles.panelTitle}>{panel.title}</h3>
                  <p className={styles.panelDesc}>{panel.description}</p>
                </div>
              </div>
              <div className={styles.panelNumber}>{panel.number}</div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
