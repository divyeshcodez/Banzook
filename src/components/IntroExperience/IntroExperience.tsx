import React, { useState, useEffect } from 'react';
import styles from './IntroExperience.module.css';

interface IntroExperienceProps {
  onEnterComplete: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onEnterComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if the user already visited during this browser session
    const hasEnteredBefore = sessionStorage.getItem('banzook_entered');
    if (hasEnteredBefore) {
      setIsVisible(false);
      onEnterComplete();
    }
  }, [onEnterComplete]);

  const handleEnter = () => {
    setIsExiting(true);
    sessionStorage.setItem('banzook_entered', 'true');
    // Match the transition duration in CSS (1.2s)
    setTimeout(() => {
      setIsVisible(false);
      onEnterComplete();
    }, 1200);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.container} ${isExiting ? styles.exit : ''}`}>


      <div className={styles.content}>
        <h1 className={styles.wordmark}>BANZOOK</h1>
        <p className={styles.philosophy}>SPEAKS IN PRINTS.</p>
        <div className={styles.cta}>
          <button className="btn-primary" onClick={handleEnter}>
            ENTER THE MOVEMENT
          </button>
        </div>
      </div>

      <button className={styles.skipBtn} onClick={handleEnter}>
        SKIP INTRO
      </button>
    </div>
  );
};
