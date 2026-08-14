import React, { useRef, useState, useEffect } from 'react';

interface CustomCursorProps {
  label?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ label = 'OFFCUT // PATTERN #42' }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
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
          if (cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
          }
          setIsVisible((prev) => {
            if (!prev) return true;
            return prev;
          });
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
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef}
      className="custom-cursor-label"
      aria-hidden="true"
      style={{ 
        left: `-200px`, 
        top: `-200px` 
      }}
    >
      <span>{label}</span>
    </div>
  );
};
