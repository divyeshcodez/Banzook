import React, { useState } from 'react';
import styles from './NewsletterSection.module.css';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('ENTER A VALID EMAIL ADDRESS');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <h2 className={styles.title}>GET THE NEXT DROP FIRST.</h2>
        <p className={styles.desc}>
          New releases, limited drops, and everything happening inside BANZOOK. Enter the movement.
        </p>

        {isSubmitted ? (
          <div className={styles.success}>
            YOU ARE IN. WELCOME TO THE MOVEMENT.
          </div>
        ) : (
          <form 
            className={`${styles.form} ${isFocused ? styles.formFocused : ''}`}
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className={styles.input}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-label="Email Address"
              required
            />
            <button type="submit" className={styles.submitBtn}>
              JOIN BANZOOK
            </button>
          </form>
        )}

        {error && (
          <div style={{ color: 'var(--orange)', fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', marginTop: '0.5rem' }}>
            {error}
          </div>
        )}
      </div>
    </section>
  );
};
