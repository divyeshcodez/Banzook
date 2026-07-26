import React, { useState, useEffect } from 'react';

interface CustomCursorProps {
  label?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ label = 'OFFCUT // PATTERN #42' }) => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Production Hardening: Touch device and prefers-reduced-motion check via matchMedia
    const isHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isHoverCapable || prefersReducedMotion) {
      return;
    }

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setPos({ x: e.clientX, y: e.clientY });
          if (!isVisible) setIsVisible(true);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="custom-cursor-label"
      aria-hidden="true"
      style={{ 
        left: `${pos.x}px`, 
        top: `${pos.y}px` 
      }}
    >
      <span>{label}</span>
    </div>
  );
};
