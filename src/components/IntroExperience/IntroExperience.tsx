import React, { useEffect, useRef, useState } from 'react';
import styles from './IntroExperience.module.css';

interface IntroExperienceProps {
  onEnterComplete: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onEnterComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [useImg, setUseImg] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [devMode, setDevMode] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  
  // Dev stats refs
  const dSrcRef = useRef<HTMLElement>(null);
  const dPxRef = useRef<HTMLElement>(null);
  const dFpsRef = useRef<HTMLElement>(null);
  const dStRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hasEnteredBefore = sessionStorage.getItem('banzook_entered');
    if (hasEnteredBefore) {
      setIsVisible(false);
      onEnterComplete();
      return;
    }

    if (!isVisible) return;

    // Config and State inside useEffect
    const CFG = {
      DESKTOP  : 2200,
      TABLET   : 1100,
      MOBILE   : 500,
      ANIM_MS  : 1500,
      NAV_MS   : 1750,
      VEIL_MS  : 420,
      SPEED_MIN  : 0.8,
      SPEED_MAX  : 6.2,
      GRAVITY    : 0.042,
      DRAG       : 0.967,
      TURB       : 0.10,
      UP_MIN     : -2.1,
      UP_MAX     : -0.2,
      SCATTER    : Math.PI * 0.56,
      SZ_MIN     : 0.7,
      SZ_MAX     : 2.4,
      FADE_START : 0.28,
      STAGGER    : 0.17,
      FONT_FB    : '"Bebas Neue", Impact, sans-serif',
    };

    const S = { IDLE: 0, ANIM: 1, DONE: 2 };
    let state = S.IDLE;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fpsBuf: number[] = [];
    let lastStamp = 0;
    let devModeLocal = false;

    function resize() {
      if (!canvas || !ctx) return;
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    function targetN() {
      const w = window.innerWidth;
      return w < 600 ? CFG.MOBILE : w < 1024 ? CFG.TABLET : CFG.DESKTOP;
    }

    function sampleImage(img: HTMLImageElement) {
      const W = window.innerWidth, H = window.innerHeight;
      const off = document.createElement('canvas');
      off.width = W; off.height = H;
      const oc = off.getContext('2d', { willReadFrequently: true });
      if (!oc) return null;

      const maxW = Math.min(W * 0.78, 640);
      const scale = maxW / img.naturalWidth;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (W - dw) / 2;
      const dy = (H - dh) / 2;

      oc.drawImage(img, dx, dy, dw, dh);

      let data;
      try {
        data = oc.getImageData(0, 0, W, H).data;
      } catch (_) {
        return null;
      }

      const lit: number[] = [];
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          if (data[i] > 110 && data[i + 3] > 80) lit.push(x, y);
        }
      }
      return subsample(lit, targetN());
    }

    function sampleText() {
      const W = window.innerWidth, H = window.innerHeight;
      const fs = Math.min(Math.max(72, W * 0.19), 224);
      const off = document.createElement('canvas');
      off.width = W; off.height = H;
      const oc = off.getContext('2d', { willReadFrequently: true });
      if (!oc) return [];
      oc.fillStyle = '#fff';
      oc.font = `${fs}px ${CFG.FONT_FB}`;
      oc.textAlign = 'center'; oc.textBaseline = 'middle';
      oc.fillText('BANZOOK', W / 2, H / 2);
      const data = oc.getImageData(0, 0, W, H).data;
      const lit: number[] = [];
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          if (data[i + 3] > 100) lit.push(x, y);
        }
      }
      return subsample(lit, targetN());
    }

    function subsample(flat: number[], N: number) {
      const total = flat.length / 2;
      const step = Math.max(1, Math.floor(total / N));
      const out: number[] = [];
      for (let i = 0; i < total; i += step) out.push(flat[i * 2], flat[i * 2 + 1]);
      return out;
    }

    interface Particle {
      x: number; y: number; vx: number; vy: number; sz: number; a0: number; ls: number; dl: number;
    }

    function buildParticles(flat: number[]): Particle[] {
      if (!flat || flat.length === 0) return [];
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const maxD = Math.hypot(cx, cy);
      const n = flat.length / 2;
      const out = new Array(n);
      for (let i = 0; i < n; i++) {
        const px = flat[i * 2], py = flat[i * 2 + 1];
        const dx = px - cx, dy = py - cy;
        const d = Math.hypot(dx, dy) || 1;
        const ang = Math.atan2(dy, dx) + (Math.random() - 0.5) * 2 * CFG.SCATTER;
        const spd = CFG.SPEED_MIN + Math.random() * (CFG.SPEED_MAX - CFG.SPEED_MIN) * (0.35 + (d / maxD) * 0.65);
        const up = CFG.UP_MIN + Math.random() * (CFG.UP_MAX - CFG.UP_MIN);
        out[i] = {
          x: px, y: py,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd + up,
          sz: CFG.SZ_MIN + Math.random() * (CFG.SZ_MAX - CFG.SZ_MIN),
          a0: 0.5 + Math.random() * 0.5,
          ls: 0.7 + Math.random() * 0.3,
          dl: Math.random() * CFG.STAGGER,
        };
      }
      return out;
    }

    let particles: Particle[] = [];
    let animStart: number | null = null;
    let rafId: number | null = null;
    let navDone = false;
    let prePixels: number[] | null = null;

    function loop(stamp: number) {
      if (!animStart) animStart = stamp;
      const t = (stamp - animStart) / 1000;
      const dur = CFG.ANIM_MS / 1000;

      if (lastStamp) { fpsBuf.push(1000 / (stamp - lastStamp)); if (fpsBuf.length > 30) fpsBuf.shift(); }
      lastStamp = stamp;

      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

      let alive = false;
      for (let i = 0, n = particles.length; i < n; i++) {
        const p = particles[i];
        const pt = Math.max(0, t - p.dl);
        const prg = pt / (dur * p.ls);
        if (prg >= 1) continue;
        alive = true;

        const ease = Math.min(1, pt / 0.10);
        p.vx += (Math.random() - 0.5) * CFG.TURB;
        p.vy += CFG.GRAVITY;
        p.vx *= CFG.DRAG;
        p.vy *= CFG.DRAG;
        p.x += p.vx * ease;
        p.y += p.vy * ease;

        const alpha = prg < CFG.FADE_START
          ? p.a0
          : p.a0 * (1 - (prg - CFG.FADE_START) / (1 - CFG.FADE_START));
        if (alpha < 0.01) continue;

        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = '#ffffff';
        const s = p.sz;
        ctx!.fillRect(p.x - s * .5, p.y - s * .5, s, s);
      }
      ctx!.globalAlpha = 1;

      if (devModeLocal) {
        const fps = fpsBuf.length ? Math.round(fpsBuf.reduce((a, b) => a + b, 0) / fpsBuf.length) : '—';
        if (dPxRef.current) dPxRef.current.textContent = String(particles.length);
        if (dFpsRef.current) dFpsRef.current.textContent = String(fps);
        if (dStRef.current) dStRef.current.textContent = (state === S.ANIM ? 'animating' : 'done') + ' / ' + t.toFixed(2) + 's';
      }

      if (!navDone && t >= CFG.NAV_MS / 1000) {
        navDone = true;
        navigate();
      }

      if (alive || t < dur) rafId = requestAnimationFrame(loop);
      else ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function navigate() {
      if (state === S.DONE) return;
      state = S.DONE;
      if (veilRef.current) veilRef.current.classList.add(styles.on);
      setTimeout(() => { 
        sessionStorage.setItem('banzook_entered', 'true');
        setIsVisible(false);
        onEnterComplete(); 
      }, CFG.VEIL_MS + 40);
    }

    function trigger() {
      if (state !== S.IDLE) return;
      state = S.ANIM;
      
      const hintEl = document.getElementById('hint-el');
      const skipEl = document.getElementById('skip-el');
      if (hintEl) {
        hintEl.style.transition = 'opacity 0.15s ease';
        hintEl.style.opacity = '0';
      }
      if (skipEl) skipEl.style.display = 'none';

      if (reduced) { navigate(); return; }

      let px = prePixels;
      if (!px) {
        const imgActive = logoImgRef.current && logoImgRef.current.classList.contains(styles.loaded);
        px = imgActive ? (sampleImage(logoImgRef.current!) || sampleText()) : sampleText();
      }
      particles = buildParticles(px);

      if (logoImgRef.current) logoImgRef.current.classList.add(styles.hidden);
      const fallback = document.getElementById('logo-fallback-el');
      if (fallback) fallback.classList.add(styles.hidden);

      navDone = false; animStart = null; lastStamp = 0;
      rafId = requestAnimationFrame(loop);
    }

    function skip() {
      if (state === S.DONE) return;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
      navigate();
    }

    function precompute() {
      if (reduced) return;
      const imgActive = logoImgRef.current && logoImgRef.current.classList.contains(styles.loaded);
      prePixels = imgActive ? (sampleImage(logoImgRef.current!) || sampleText()) : sampleText();
      if (devModeLocal && dPxRef.current) {
        dPxRef.current.textContent = (prePixels?.length / 2 || 0) + ' (cached)';
      }
    }

    // Handlers
    const handleClick = () => trigger();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
      if (e.key === 'd' || e.key === 'D') { 
        devModeLocal = !devModeLocal; 
        setDevMode(devModeLocal);
      }
      if (e.key === 'Escape') skip();
    };
    const handleResize = () => {
      resize();
      if (state === S.IDLE) prePixels = null;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    const clickZone = document.getElementById('click-zone-el');
    if (clickZone) {
      clickZone.addEventListener('click', handleClick);
    }
    
    const tId = setTimeout(() => {
        if (!imgLoaded && !imgFailed && logoImgRef.current) {
            if (logoImgRef.current.complete) {
                if (logoImgRef.current.naturalWidth > 0) {
                    setImgLoaded(true);
                    setUseImg(true);
                    setTimeout(precompute, 120);
                } else {
                    setImgFailed(true);
                    document.fonts.ready.then(() => { setTimeout(precompute, 120); });
                }
            }
        }
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      if (clickZone) clickZone.removeEventListener('click', handleClick);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(tId);
    };
  }, [isVisible, onEnterComplete, imgLoaded, imgFailed]);

  if (!isVisible) return null;

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.stage} aria-hidden="true"></canvas>

      <div className={styles.logoLayer}>
        <img 
          ref={logoImgRef}
          className={`${styles.logoImg} ${imgLoaded ? styles.loaded : ''} ${imgFailed ? styles.hidden : ''}`}
          src="/assets/logo.png"
          alt="Banzook — Speak in Prints" 
          onLoad={() => { setUseImg(true); setImgLoaded(true); }}
          onError={() => { setUseImg(false); setImgFailed(true); }}
          style={{ display: imgFailed ? 'none' : 'block' }}
        />
        <span 
          id="logo-fallback-el"
          className={`${styles.logoFallback} ${imgFailed ? styles.show + ' ' + styles.loaded : ''}`} 
          aria-hidden="true"
        >
          BANZOOK
        </span>
      </div>

      <button 
        id="click-zone-el"
        className={styles.clickZone}
        aria-label="Click anywhere to enter Banzook"
      ></button>

      <p id="hint-el" className={styles.hint} aria-hidden="true">Click anywhere to enter</p>
      
      <button 
        id="skip-el"
        className={styles.skip}
        aria-label="Skip intro"
        onClick={() => {
            const ev = new KeyboardEvent('keydown', {key: 'Escape'});
            window.dispatchEvent(ev);
        }}
      >
        Skip
      </button>

      <div ref={veilRef} className={styles.veil} aria-hidden="true"></div>

      <div className={`${styles.dev} ${devMode ? styles.on : ''}`}>
        <div><b>BANZOOK DEV</b></div>
        <div>Source : <b ref={dSrcRef}>{imgFailed ? 'text fallback (Bebas Neue)' : (imgLoaded ? 'image (assets/logo.png)' : '—')}</b></div>
        <div>Pixels : <b ref={dPxRef}>—</b></div>
        <div>FPS    : <b ref={dFpsRef}>—</b></div>
        <div>State  : <b ref={dStRef}>idle</b></div>
        <div style={{ marginTop: '5px', color: '#333' }}>
          D=toggle · Spc=trigger · Esc=skip
        </div>
      </div>
    </div>
  );
};
