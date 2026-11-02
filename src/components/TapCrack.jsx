import { useEffect, useState } from 'react';
import { playCrack, unlockAudio } from '../crackSound.js';

const INTERACTIVE = 'a, button, input, select, textarea, label, summary, [role="button"]';

/**
 * Every tap or click anywhere plays a coconut-breaking sound and shows a
 * small burst of shell and white coconut flecks where you touched.
 */
export default function TapCrack() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let n = 0;
    // 'click' fires for taps and clicks but not when the finger is scrolling
    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.detail === 0 && e.clientX === 0 && e.clientY === 0) return; // keyboard-triggered
      unlockAudio();
      const hitControl = e.target.closest && e.target.closest(INTERACTIVE);
      playCrack(hitControl ? 1 : 0.6);
      if (reduce) return;
      const id = ++n;
      setBursts((b) => [...b.slice(-5), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 700);
    };
    window.addEventListener('click', onDown, { capture: true, passive: true });
    return () => window.removeEventListener('click', onDown, { capture: true });
  }, []);

  return (
    <div className="tap-layer" aria-hidden="true">
      {bursts.map((b) => (
        <div key={b.id} className="tap-burst" style={{ left: b.x, top: b.y }}>
          <span className="tap-burst__shell tap-burst__shell--l" />
          <span className="tap-burst__shell tap-burst__shell--r" />
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className="tap-burst__fleck" style={{ '--a': `${i * 51 + 10}deg` }} />
          ))}
        </div>
      ))}
    </div>
  );
}
