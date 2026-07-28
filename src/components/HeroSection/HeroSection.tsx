import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

interface DropItem {
  id: string;
  number: string;
  title: string;
  leftHeadline: string;
  leftSubline: string;
  rightHeadline: string;
  rightSubline: string;
  mainImage: string;
  leftImage: string;
  rightImage: string;
  price: string;
  productId: string;
}

const BANZOOK_DROPS: DropItem[] = [
  {
    id: 'd-1',
    number: '01',
    title: 'NO SMOKING',
    leftHeadline: 'STRATEGIC THINKERS.',
    leftSubline: 'SMART STRATEGY.',
    rightHeadline: 'THOUGHTFUL EXECUTION.',
    rightSubline: 'BOLD BRANDS.',
    mainImage: '/images/tshirts/tshirt_nosmoking.jpg',
    leftImage: '/models/l.png',
    rightImage: '/models/r.png',
    price: '₹1,299',
    productId: 'prod-14'
  },
  {
    id: 'd-2',
    number: '02',
    title: 'BROKEN SYSTEM',
    leftHeadline: 'RAW INDUSTRIAL.',
    leftSubline: 'HEAVYWEIGHT FLEECE.',
    rightHeadline: 'NO SHORTCUTS.',
    rightSubline: 'CONSTRUCTED IN MUMBAI.',
    mainImage: '/images/tshirts/tshirt_brokensystem.jpg',
    leftImage: '/models/l1.png',
    rightImage: '/models/r2.png',
    price: '₹2,499',
    productId: 'prod-17'
  },
  {
    id: 'd-3',
    number: '03',
    title: 'BAD HABITS',
    leftHeadline: 'SPEAKS IN PRINTS.',
    leftSubline: 'HIGH DENSITY SILICONE.',
    rightHeadline: 'LIMITED MICRO-RUNS.',
    rightSubline: 'COLLECTOR EDITIONS.',
    mainImage: '/images/tshirts/tshirt_blue.jpg',
    leftImage: '/models/l3.png',
    rightImage: '/models/r3.png',
    price: '₹1,299',
    productId: 'prod-14'
  },
  {
    id: 'd-4',
    number: '04',
    title: 'REBEL YOUTH',
    leftHeadline: 'ANARCHIST REBEL.',
    leftSubline: 'VINTAGE WASHED BLACK.',
    rightHeadline: 'CULTURAL CHAPTERS.',
    rightSubline: 'BEYOND INVENTORY.',
    mainImage: '/images/tshirts/tshirt_green.jpg',
    leftImage: '/models/l4.png',
    rightImage: '/models/r4.png',
    price: '₹1,399',
    productId: 'prod-17'
  },
  {
    id: 'd-5',
    number: '05',
    title: 'CHALLENGE ACCEPTED',
    leftHeadline: 'CHALLENGE ACCEPTED.',
    leftSubline: 'SPEEDWAY COLLAB.',
    rightHeadline: 'RAGLAN BOX-FIT.',
    rightSubline: 'FLAME CHEST BRANDING.',
    mainImage: '/images/tshirts/tshirt_hotwheels.jpg',
    leftImage: '/models/l5.png',
    rightImage: '/models/r5.png',
    price: '₹1,499',
    productId: 'prod-13'
  },
  {
    id: 'd-6',
    number: '06',
    title: 'HOT WHEELS RACING',
    leftHeadline: 'MOTOR CLUB VINTAGE.',
    leftSubline: 'SPEEDWAY RETRO SUNSET.',
    rightHeadline: 'LEGENDS NEVER DIE.',
    rightSubline: 'TIMELESS CANVASES.',
    mainImage: '/images/tshirts/tshirt_legends.jpg',
    leftImage: '/models/l6.png',
    rightImage: '/models/r6.png',
    price: '₹1,499',
    productId: 'prod-16'
  },
  {
    id: 'd-7',
    number: '07',
    title: 'KIND TO YOUR MIND',
    leftHeadline: 'KIND TO YOUR MIND.',
    leftSubline: 'WHITE COTTON BOX-FIT.',
    rightHeadline: 'SOFT WATERCOLOR.',
    rightSubline: 'HUMANIST STATEMENT.',
    mainImage: '/images/tshirts/tshirt_kindmind.jpg',
    leftImage: '/models/l7.png',
    rightImage: '/models/r7.png',
    price: '₹1,299',
    productId: 'prod-15'
  },
  {
    id: 'd-8',
    number: '08',
    title: 'MUMBAI EDITORIAL',
    leftHeadline: 'MUMBAI CULTURE.',
    leftSubline: 'EDITORIAL FASHION ARCHIVE.',
    rightHeadline: 'EXPERIMENTAL DIGITAL.',
    rightSubline: 'CREATIVE PORTFOLIO INDEX.',
    mainImage: '/images/tshirts/tshirt_orange.jpg',
    leftImage: '/models/l8.png',
    rightImage: '/models/r8.png',
    price: '₹1,399',
    productId: 'prod-14'
  },
  {
    id: 'd-9',
    number: '09',
    title: 'BANZOOK HEAVY',
    leftHeadline: 'SIGNATURE CUTS.',
    leftSubline: '300GSM ORGANIC FLEECE.',
    rightHeadline: 'PERSONAL ARMOR.',
    rightSubline: 'NO COMPROMISES.',
    mainImage: '/images/tshirts/tshirt_gold.jpg',
    leftImage: '/models/l9.png',
    rightImage: '/models/r9.png',
    price: '₹1,499',
    productId: 'prod-13'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  const [activeIndex, setActiveIndex] = useState(2); // Billie Converse at index 2
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const centerModelRef = useRef<HTMLDivElement>(null);
  const leftSupportRef = useRef<HTMLDivElement>(null);
  const rightSupportRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  const { addToCart, triggerToast } = useCart();
  const activeDrop = BANZOOK_DROPS[activeIndex];

  // Global Mouse Move Listener for Circular Cursor Badge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Mouse Wheel Vertical Scroll Converted to Horizontal Drop Progress
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isCoolingDown = false;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 20 && !isCoolingDown) {
        isCoolingDown = true;

        if (e.deltaY > 0) {
          setActiveIndex((prev) => (prev + 1) % BANZOOK_DROPS.length);
        } else {
          setActiveIndex((prev) => (prev === 0 ? BANZOOK_DROPS.length - 1 : prev - 1));
        }

        setTimeout(() => {
          isCoolingDown = false;
        }, 320);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setActiveIndex((prev) => (prev + 1) % BANZOOK_DROPS.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActiveIndex((prev) => (prev === 0 ? BANZOOK_DROPS.length - 1 : prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Asymmetrical Image Collage Animation Physics on Active Drop Change
  useEffect(() => {
    const centerModel = centerModelRef.current;
    const leftSupport = leftSupportRef.current;
    const rightSupport = rightSupportRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;

    if (centerModel) {
      gsap.fromTo(
        centerModel,
        { scale: 0.88, opacity: 0.6, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
      );
    }

    if (leftSupport) {
      gsap.fromTo(
        leftSupport,
        { x: -25, rotate: -14, opacity: 0.3 },
        { x: 0, rotate: -10, opacity: 0.95, duration: 0.55, ease: 'power2.out' }
      );
    }

    if (rightSupport) {
      gsap.fromTo(
        rightSupport,
        { x: 25, rotate: 14, opacity: 0.3 },
        { x: 0, rotate: 10, opacity: 0.95, duration: 0.55, ease: 'power2.out' }
      );
    }

    if (leftText) {
      gsap.fromTo(
        leftText,
        { x: -15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
    }

    if (rightText) {
      gsap.fromTo(
        rightText,
        { x: 15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  // Center active pill in horizontal track
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const activePill = track.children[activeIndex] as HTMLElement;
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? BANZOOK_DROPS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % BANZOOK_DROPS.length);
  };

  const handleCardClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const product = PRODUCTS.find((p) => p.id === activeDrop.productId);
      if (product) {
        addToCart(product, 'L', 1);
      } else {
        triggerToast(`ADDED TO BAG: ${activeDrop.title} ✓`);
      }
    }
  };

  return (
    <section id="hero" ref={containerRef} className={styles.hero}>
      
      {/* Background Canvas Grid */}
      <div className={styles.bgCanvas}>
        <div className={styles.bgGrid} />
      </div>

      {/* Circular Hover Cursor Badge ("OPEN THE PROJECT") */}
      <div
        className={`${styles.cursorBadge} ${isCursorVisible ? styles.cursorBadgeVisible : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      >
        <span>OPEN</span>
        <span>THE PROJECT</span>
      </div>

      {/* Central Editorial Collage Stage */}
      <div className={styles.collageStage}>

        {/* Left Side Bold Editorial Copy */}
        <div ref={leftTextRef} className={styles.leftEditorialText}>
          <h2 className={styles.editorialHeadline}>{activeDrop.leftHeadline}</h2>
          <div className={styles.editorialSubline}>{activeDrop.leftSubline}</div>
        </div>

        {/* Left Rotated Image Behind/Left */}
        <div
          ref={leftSupportRef}
          className={styles.leftRotatedSupport}
          onMouseEnter={() => setIsCursorVisible(true)}
          onMouseLeave={() => setIsCursorVisible(false)}
          onClick={handleCardClick}
        >
          <img src={activeDrop.leftImage} alt="" className={styles.supportCardImage} />
        </div>

        {/* Center Primary Photorealistic Model Container */}
        <div
          ref={centerModelRef}
          className={styles.centerModelContainer}
          onMouseEnter={() => setIsCursorVisible(true)}
          onMouseLeave={() => setIsCursorVisible(false)}
          onClick={handleCardClick}
        >
          <img
            src={activeDrop.mainImage}
            alt={`BANZOOK Model wearing ${activeDrop.title}`}
            className={styles.centerModelImage}
          />
        </div>

        {/* Right Rotated Image Behind/Right */}
        <div
          ref={rightSupportRef}
          className={styles.rightRotatedSupport}
          onMouseEnter={() => setIsCursorVisible(true)}
          onMouseLeave={() => setIsCursorVisible(false)}
          onClick={handleCardClick}
        >
          <img src={activeDrop.rightImage} alt="" className={styles.supportCardImage} />
        </div>

        {/* Right Side Bold Editorial Copy */}
        <div ref={rightTextRef} className={styles.rightEditorialText}>
          <h2 className={styles.editorialHeadline}>{activeDrop.rightHeadline}</h2>
          <div className={styles.editorialSubline}>{activeDrop.rightSubline}</div>
        </div>

      </div>

      {/* Bottom Double-Ruler Ticks & Horizontal Scroll Track System */}
      <div className={styles.bottomCarouselContainer}>
        
        {/* Top Ruler Track of Ticks */}
        <div className={styles.rulerTrackContainer}>
          <div className={styles.rulerLine} />
          <div className={styles.rulerCenterPointer} />
          <div className={styles.rulerTicksWrapper}>
            {Array.from({ length: 90 }).map((_, idx) => (
              <div
                key={idx}
                className={idx % 5 === 0 ? styles.rulerTickMajor : styles.rulerTick}
              />
            ))}
          </div>
        </div>

        {/* Horizontal Drop Titles Scroll Track */}
        <div ref={trackRef} className={styles.carouselTrack}>
          {BANZOOK_DROPS.map((drop, idx) => (
            <button
              key={drop.id}
              className={`${styles.carouselItem} ${activeIndex === idx ? styles.carouselItemActive : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <span>{drop.title}</span>
            </button>
          ))}
        </div>

        {/* Bottom Ruler Track of Ticks */}
        <div className={styles.rulerTrackContainer}>
          <div className={styles.rulerLine} />
          <div className={styles.rulerCenterPointer} />
          <div className={styles.rulerTicksWrapper}>
            {Array.from({ length: 90 }).map((_, idx) => (
              <div
                key={idx}
                className={idx % 5 === 0 ? styles.rulerTickMajor : styles.rulerTick}
              />
            ))}
          </div>
        </div>

        {/* Fixed Bottom Footer HUD */}
        <div className={styles.fixedBottomFooter}>
          <div style={{ flex: 1 }} />

          <div className={styles.counterCenter}>
            <button className={styles.counterArrowBtn} onClick={handlePrev} aria-label="Previous">
              ◀◀
            </button>

            <span>0{activeIndex + 1} &nbsp;&nbsp;//&nbsp;&nbsp; 0{BANZOOK_DROPS.length}</span>

            <button className={styles.counterArrowBtn} onClick={handleNext} aria-label="Next">
              ▶▶
            </button>
          </div>

          <div style={{ flex: 1 }} />
        </div>

      </div>

    </section>
  );
};
