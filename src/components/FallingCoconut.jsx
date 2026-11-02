import { useEffect, useRef, useState } from 'react';
import { Coconut } from './CoconutArt.jsx';
import { playCrack } from '../crackSound.js';

/**
 * A coconut that falls from the top of the page to the bottom as you scroll.
 * It spins and sways while falling, then cracks open with a sound when you
 * reach the end of the page. Scroll back up and it closes again.
 */
export default function FallingCoconut() {
  const wrapRef = useRef(null);
  const [landed, setLanded] = useState(false);
  const landedRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = wrapRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      const size = el.offsetWidth;
      const start = 88; // begin just below the sticky header
      const travel = window.innerHeight - size - 24 - start;

      const nowLanded = progress > 0.985;
      if (nowLanded !== landedRef.current) {
        landedRef.current = nowLanded;
        setLanded(nowLanded);
        if (nowLanded) playCrack(1);
      }

      if (reduce) {
        el.style.transform = `translate3d(0, ${start + travel}px, 0)`;
        return;
      }
      const fall = progress * progress * 0.35 + progress * 0.65;
      const y = start + fall * travel;
      const sway = Math.sin(progress * Math.PI * 6) * 18 * (1 - progress);
      // settle upright on landing so the split reads clearly
      const spin = nowLanded ? 0 : progress * 900;
      el.style.transform = `translate3d(${sway}px, ${y}px, 0) rotate(${spin}deg)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="falling-coconut" aria-hidden="true">
      <div ref={wrapRef} className="falling-coconut__body">
        <div className={landed ? 'falling-coconut__split is-landed' : 'falling-coconut__split'}>
          <span className="falling-coconut__meat" />
          <div className="falling-coconut__half falling-coconut__half--l"><Coconut size={80} seed={5} /></div>
          <div className="falling-coconut__half falling-coconut__half--r"><Coconut size={80} seed={5} /></div>
        </div>
      </div>
    </div>
  );
}
