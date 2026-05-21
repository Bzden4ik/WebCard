import { useEffect, useMemo, useRef } from 'react';

/**
 * Global background — three layers:
 *   1. canvas-bg     warm radial gradient + base ink colour
 *   2. canvas-stars  sparse static star field (DOM divs), gentle scroll-parallax,
 *                    ~35% of stars softly pulse on independent schedules,
 *                    plus an occasional comet that streaks across the viewport
 *   3. canvas-grain  film-grain SVG overlay (mix-blend overlay)
 *
 * No purple/cyan. Just warm-bone glow + pinhole stars + a rare comet.
 * Deterministic star positions (no SSR flicker). Reduced-motion respected.
 */

const PRM = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

function useStars(count = 110) {
  return useMemo(() => {
    // mulberry32 seeded PRNG — stable across renders, no SSR flicker
    let s = 0x6f1d27ce;
    const rand = () => {
      s |= 0; s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: count }, () => {
      const depth = rand();
      const r = depth < 0.65
        ? 1 + rand() * 1.2
        : 1.5 + rand() * 1.6;
      const baseOp = 0.18 + (1 - depth) * 0.34 + rand() * 0.12;
      const pulses = rand() < 0.34;  // ~one in three stars pulses
      return {
        x: rand() * 100,                                  // %
        y: rand() * 100,                                  // %
        r,                                                // px
        opacity: baseOp,
        amber: rand() < 0.10,                             // 10% amber, 90% bone
        depth,
        pulses,
        pulseMin: Math.max(0.08, baseOp - 0.18).toFixed(3),
        pulseMax: Math.min(0.95, baseOp + 0.32).toFixed(3),
        pulseDuration: (6 + rand() * 6).toFixed(2),       // 6..12s — never in sync
        pulseDelay: (rand() * 9).toFixed(2),              // 0..9s — desync starts
      };
    });
  }, [count]);
}

export default function CanvasBg() {
  const fieldRef = useRef(null);
  const cometRef = useRef(null);
  const stars = useStars(110);

  /* ─── scroll-parallax for star field ─── */
  useEffect(() => {
    if (PRM) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const el = fieldRef.current;
      if (el) el.style.transform = `translate3d(0, ${-y * 0.05}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ─── rare comet streaks — Web Animations API, on-screen only ─── */
  useEffect(() => {
    if (PRM) return;
    let timer = null;
    let cancelled = false;

    const fireComet = () => {
      const el = cometRef.current;
      if (!el || document.hidden) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // 1) start in the top portion of the viewport so it reads as "shooting star"
      //    rather than crossing through the body of the page
      const startX = vw * (0.05 + Math.random() * 0.55);   // 5..60% from left
      const startY = vh * (0.05 + Math.random() * 0.30);   // top 5..35%

      // 2) angle in a tight diagonal arc — never vertical, never horizontal
      const angleDeg = 18 + Math.random() * 22;            // 18..40° down-right
      const angleRad = (angleDeg * Math.PI) / 180;
      const distance = vw * (0.55 + Math.random() * 0.35); // ~55-90% of viewport width

      const endX = startX + Math.cos(angleRad) * distance;
      const endY = startY + Math.sin(angleRad) * distance;

      // 3) keep endpoints visible — bail if they'd go off-screen badly
      if (endX > vw * 1.05 || endY > vh * 0.95) {
        // re-aim to a shorter trajectory rather than dropping the streak entirely
        const d2 = Math.min(vw - startX - 20, vh - startY - 20) * 0.85;
        const ex = startX + Math.cos(angleRad) * d2;
        const ey = startY + Math.sin(angleRad) * d2;
        el.style.setProperty('--c-rot', `${angleDeg}deg`);
        el.animate(
          [
            { transform: `translate(${startX}px, ${startY}px) rotate(${angleDeg}deg) scaleX(0.5)`, opacity: 0 },
            { offset: 0.10, opacity: 1, transform: `translate(${startX + (ex - startX) * 0.1}px, ${startY + (ey - startY) * 0.1}px) rotate(${angleDeg}deg) scaleX(1)` },
            { offset: 0.88, opacity: 1 },
            { transform: `translate(${ex}px, ${ey}px) rotate(${angleDeg}deg) scaleX(1.1)`, opacity: 0 },
          ],
          { duration: 1500 + Math.random() * 600, easing: 'cubic-bezier(0.2, 0.65, 0.35, 1)', fill: 'forwards' }
        );
        return;
      }

      el.style.setProperty('--c-rot', `${angleDeg}deg`);
      el.animate(
        [
          { transform: `translate(${startX}px, ${startY}px) rotate(${angleDeg}deg) scaleX(0.5)`, opacity: 0 },
          { offset: 0.10, opacity: 1, transform: `translate(${startX + (endX - startX) * 0.1}px, ${startY + (endY - startY) * 0.1}px) rotate(${angleDeg}deg) scaleX(1)` },
          { offset: 0.85, opacity: 1 },
          { transform: `translate(${endX}px, ${endY}px) rotate(${angleDeg}deg) scaleX(1.1)`, opacity: 0 },
        ],
        { duration: 1700 + Math.random() * 700, easing: 'cubic-bezier(0.2, 0.65, 0.35, 1)', fill: 'forwards' }
      );
    };

    const scheduleNext = () => {
      if (cancelled) return;
      // 22..48 seconds between streaks — rare, never crowded
      const wait = 22000 + Math.random() * 26000;
      timer = setTimeout(() => {
        fireComet();
        scheduleNext();
      }, wait);
    };

    // first comet 6..11 seconds in, then schedule on cadence
    timer = setTimeout(() => {
      fireComet();
      scheduleNext();
    }, 6000 + Math.random() * 5000);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="canvas-bg" aria-hidden />

      <div className="canvas-stars" aria-hidden>
        <div ref={fieldRef} className="cstars-field">
          {stars.map((s, i) => (
            <span
              key={i}
              className={`cstar ${s.amber ? 'is-amber' : ''} ${s.pulses ? 'is-pulse' : ''}`}
              style={{
                left:    `${s.x}%`,
                top:     `${s.y}%`,
                width:   `${s.r}px`,
                height:  `${s.r}px`,
                opacity: s.opacity,
                '--cs-op-min':     s.pulseMin,
                '--cs-op-max':     s.pulseMax,
                animationDuration: s.pulses ? `${s.pulseDuration}s` : undefined,
                animationDelay:    s.pulses ? `${s.pulseDelay}s` : undefined,
              }}
            />
          ))}
        </div>

        {/* single re-used comet element — Web Animations API drives it */}
        <span ref={cometRef} className="comet" aria-hidden />
      </div>

      <div className="canvas-grain" aria-hidden />

      <style>{`
        .canvas-stars {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 95% 90% at 50% 50%, #000 55%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 95% 90% at 50% 50%, #000 55%, transparent 100%);
        }
        .cstars-field {
          position: absolute;
          inset: -10% -3%;
          will-change: transform;
        }
        .cstar {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: var(--paper-0);
          transform: translate3d(-50%, -50%, 0);
        }
        .cstar.is-amber {
          background: var(--amber);
          box-shadow: 0 0 4px color-mix(in oklch, var(--amber) 60%, transparent);
        }

        /* ─── independent pulse — ~34% of stars, each with its own delay/duration ─── */
        .cstar.is-pulse {
          animation-name: cstar-pulse;
          animation-timing-function: var(--ease-in-out);
          animation-iteration-count: infinite;
          animation-fill-mode: both;
          /* duration + delay are inlined via React style — never sync */
        }
        .cstar.is-amber.is-pulse {
          animation-name: cstar-pulse-amber;
        }
        @keyframes cstar-pulse {
          0%, 100% { opacity: var(--cs-op-min, 0.15); }
          50%      { opacity: var(--cs-op-max, 0.55); }
        }
        @keyframes cstar-pulse-amber {
          0%, 100% {
            opacity: var(--cs-op-min, 0.18);
            box-shadow: 0 0 3px color-mix(in oklch, var(--amber) 40%, transparent);
          }
          50%      {
            opacity: var(--cs-op-max, 0.65);
            box-shadow: 0 0 8px color-mix(in oklch, var(--amber) 75%, transparent);
          }
        }

        /* ─── comet — single reusable element, JS drives transform/opacity ─── */
        .comet {
          position: fixed;
          top: 0; left: 0;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--paper-0);
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
          box-shadow:
            0 0 8px  color-mix(in oklch, var(--paper-0) 80%, transparent),
            0 0 22px color-mix(in oklch, var(--paper-0) 35%, transparent),
            0 0 38px color-mix(in oklch, var(--amber)   18%, transparent);
        }
        /* main hot tail — bone white */
        .comet::before {
          content: '';
          position: absolute;
          right: 100%;
          top: 50%;
          width: 180px;
          height: 1px;
          margin-top: -0.5px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            color-mix(in oklch, var(--paper-0) 0%, transparent) 5%,
            color-mix(in oklch, var(--paper-0) 45%, transparent) 70%,
            color-mix(in oklch, var(--paper-0) 95%, transparent) 100%
          );
          transform-origin: right center;
        }
        /* soft amber afterglow under the tail */
        .comet::after {
          content: '';
          position: absolute;
          right: 100%;
          top: 50%;
          width: 90px;
          height: 4px;
          margin-top: -2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            color-mix(in oklch, var(--amber) 0%, transparent) 30%,
            color-mix(in oklch, var(--amber) 30%, transparent) 80%,
            color-mix(in oklch, var(--amber) 65%, transparent) 100%
          );
          filter: blur(2.5px);
          transform-origin: right center;
        }

        @media (prefers-reduced-motion: reduce) {
          .cstar.is-pulse { animation: none; }
          .cstars-field   { transform: none !important; }
          .comet          { display: none; }
        }
      `}</style>
    </>
  );
}
