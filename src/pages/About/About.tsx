import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './About.module.css';

interface AboutProps {
  onNavigateToShop?: () => void;
}

export const AboutPage: React.FC<AboutProps> = ({ onNavigateToShop }) => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        
        {/* ── 1. Opening — The Dream ────────────────────────────────────────── */}
        <section className={styles.openingHero}>
          <div className={styles.heroTag}>
            <span className={styles.pulseDot} />
            <span>FOUNDERS' STORY // EST. 2026</span>
          </div>

          <h1 className={styles.heroHeadline}>
            THREE FRIENDS.<br />
            ONE DREAM.
          </h1>

          <div className={styles.heroBrandName}>BANZOOK®</div>
        </section>

        {/* ── 2. Section 1 — Before BANZOOK ─────────────────────────────────── */}
        <section className={styles.beforeBanzookSection}>
          <h2 className={styles.sectionTitle}>
            IT STARTED WITH<br />
            THREE FRIENDS.
          </h2>

          <div className={styles.storyParagraphBlock}>
            <p>Three friends. Different personalities. Different ideas. One shared dream.</p>
            <p>We always wanted to build something of our own. Something that felt like us.</p>
            <p className={styles.quoteHighlight}>
              SOMETHING WE COULD LOOK AT ONE DAY AND SAY:<br />
              <span style={{ color: 'var(--orange)' }}>"WE BUILT THIS."</span>
            </p>
          </div>
        </section>

        {/* ── 3. Section 2 — The Dream ──────────────────────────────────────── */}
        <section className={styles.dreamBuildingSection}>
          <div className={styles.dreamGrid}>
            <div className={styles.dreamMedia}>
              <img
                src="/images/banzook_model_cinematic_hero.png"
                alt="Building The Brand"
                className={styles.dreamImg}
              />
            </div>

            <div className={styles.dreamTypography}>
              WE DIDN'T<br />
              JUST WANT<br />
              TO WEAR<br />
              A BRAND.<br />
              <span style={{ color: 'var(--orange)' }}>WE WANTED<br />TO BUILD ONE.</span>
            </div>
          </div>
        </section>

        {/* ── 4. Section 3 — Why BANZOOK ────────────────────────────────────── */}
        <section className={styles.whyBanzookSection}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--orange)', letterSpacing: '0.25em', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>
            THE PHILOSOPHY
          </span>

          <h2 className={styles.whyHeadline}>
            BANZOOK STARTED WITH A SIMPLE IDEA.<br />
            CLOTHES SHOULD FEEL LIKE MORE THAN CLOTHES.<br />
            <span style={{ color: 'var(--orange)' }}>THEY SHOULD FEEL LIKE A STATEMENT.</span>
          </h2>

          <p className={styles.whyText}>
            We wanted to create pieces that people could wear with confidence. Not because they needed to fit in, but because they wanted to stand out.
          </p>
          <p className={styles.whyText}>
            BANZOOK is built around individuality, creativity, and the courage to create your own path.
          </p>
        </section>

        {/* ── 5. Section 4 — Three Friends Founder Composition ──────────────── */}
        <section className={styles.threeFriendsSection}>
          <div className={styles.friendsHeader}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--orange)', letterSpacing: '0.25em', fontWeight: 800, textTransform: 'uppercase' }}>
              FOUNDING PILLARS
            </span>
            <h2 className={styles.friendsTitle}>THREE FRIENDS // ONE BRAND</h2>
          </div>

          <div className={styles.friendsCompositionGrid}>
            
            {/* Pillar 01 */}
            <div className={styles.friendCard}>
              <div>
                <span className={styles.friendRoleTag}>PILLAR 01</span>
                <h3 className={styles.friendHeadline}>THE VISION &amp; CREATIVE DIRECTION</h3>
                <img src="/images/model_hotwheels.jpg" alt="Pillar 01 Vision" className={styles.friendImg} />
              </div>
              <p className={styles.friendDesc}>CRAFTING THE RAW VISUAL LANGUAGE, SILHOUETTES, AND STREETWEAR IDENTITY.</p>
            </div>

            {/* Pillar 02 */}
            <div className={styles.friendCard}>
              <div>
                <span className={styles.friendRoleTag}>PILLAR 02</span>
                <h3 className={styles.friendHeadline}>THE CRAFT &amp; EXECUTION</h3>
                <img src="/images/model_nosmoking_front.jpg" alt="Pillar 02 Craft" className={styles.friendImg} />
              </div>
              <p className={styles.friendDesc}>MANUFACTURING 300+ GSM HEAVYWEIGHT COTTON FABRICS AND CUSTOM PRINTING IN MUMBAI.</p>
            </div>

            {/* Pillar 03 */}
            <div className={styles.friendCard}>
              <div>
                <span className={styles.friendRoleTag}>PILLAR 03</span>
                <h3 className={styles.friendHeadline}>THE CULTURE &amp; ENERGY</h3>
                <img src="/images/model_legends.png" alt="Pillar 03 Culture" className={styles.friendImg} />
              </div>
              <p className={styles.friendDesc}>DRIVING THE UNAPOLOGETIC COMMUNITY MINDSET AND DROP EXPERIENCES.</p>
            </div>

          </div>
        </section>

        {/* ── 6. Section 5 — Building Something From Nothing ────────────────── */}
        <section className={styles.buildingNothingSection}>
          <h2 className={styles.nothingHeadline}>
            NO BIG OFFICE.<br />
            NO PERFECT PLAN.<br />
            JUST AN IDEA.<br />
            <span style={{ color: 'var(--orange)' }}>AND THE DECISION TO START.</span>
          </h2>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: '#555555', letterSpacing: '0.15em', fontWeight: 800, textTransform: 'uppercase' }}>
            WE ARE STILL BUILDING.
          </p>
        </section>

        {/* ── 7. Section 6 — The BANZOOK Mindset ─────────────────────────────── */}
        <section className={styles.mindsetSection}>
          <div className={styles.mindsetTicker}>
            <div className={styles.mindsetTickerContent}>
              ★ CREATE YOUR OWN LANE &nbsp;&nbsp;·&nbsp;&nbsp; DON'T WAIT FOR PERMISSION &nbsp;&nbsp;·&nbsp;&nbsp; START BEFORE YOU ARE READY &nbsp;&nbsp;·&nbsp;&nbsp; MAKE SOMETHING THAT IS YOURS &nbsp;&nbsp;·&nbsp;&nbsp; MOVE DIFFERENT ★
            </div>
          </div>
        </section>

        {/* ── 8. Section 7 & Final Conclusion ───────────────────────────────── */}
        <section className={styles.finalSection}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--orange)', letterSpacing: '0.25em', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>
            THIS IS ONLY THE BEGINNING
          </span>

          <h2 className={styles.finalStatement}>
            THREE FRIENDS.<br />
            ONE DREAM.<br />
            ONE BRAND.<br />
            <span style={{ color: 'var(--orange)' }}>BANZOOK.</span>
          </h2>

          <p className={styles.finalStarted}>
            AND WE'RE JUST GETTING STARTED.
          </p>

          {onNavigateToShop && (
            <div style={{ marginTop: '3.5rem' }}>
              <button className="btn-primary" onClick={onNavigateToShop}>
                <span>EXPLORE THE DIGITAL SHOWROOM</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export const About = AboutPage;
