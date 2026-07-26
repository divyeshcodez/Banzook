import React, { useState, useEffect } from 'react';
import { Scissors } from 'lucide-react';

export const CuttingLine: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="cutting-line-container" aria-hidden="true">
      {/* Dashed Pattern Cutting Guide Line */}
      <div className="cutting-line-bg" />

      {/* Red Thread-Filled Progress Line */}
      <div 
        className="cutting-line-fill" 
        style={{ height: `${scrollProgress}%` }}
      />

      {/* Moving Scissors Icon indicating current scroll position */}
      <div 
        className="scissors-icon"
        style={{ top: `${scrollProgress}%` }}
      >
        <Scissors size={14} style={{ transform: 'rotate(-90deg)' }} />
      </div>
    </div>
  );
};
