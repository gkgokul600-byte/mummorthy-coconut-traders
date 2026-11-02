import { useEffect, useRef, useState } from 'react';
import { Coconut } from './CoconutArt.jsx';

/**
 * A coconut that falls from the top of the page to the bottom as you scroll.
 * It spins while falling, sways slightly like it is dropping through air,
 * and lands with a small bounce when you reach the end of the page.
 */
export default function FallingCoconut() {
  const wrapRef = useRef(null);
  const [landed, setLanded] = useState(false);

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
      const travel = window.innerHeight - size - 24;

      if (reduce) {
        el.style.transform = `translate3d(0, ${travel}px, 0)`;
        return;
      }
      // ease-in so it accelerates like gravity
      const fall = progress * progress * 0.35 + progress * 0.65;
      const y = 16 + fall * travel;
      const sway = Math.sin(progress * Math.PI * 6) * 18 * (1 - progress);
      const spin = progress * 900;
      el.style.transform = `translate3d(${sway}px, ${y}px, 0) rotate(${spin}deg)`;
      setLanded(progress > 0.985);
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
        <div className={landed ? 'falling-coconut__bounce is-landed' : 'falling-coconut__bounce'}>
          <Coconut size={72} />
        </div>
      </div>
    </div>
  );
}
