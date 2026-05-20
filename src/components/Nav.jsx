import { useEffect, useRef, useState } from 'react';
import { nav, meta } from '../data/content';

/**
 * Top-rail Nav — editorial chrome.
 * Слева: callsign и classification (mono).
 * Справа: пронумерованные секции (§ 00 — Manifest и т.д.).
 * Никаких pink gradient logo, никакого backdrop-blur по умолчанию.
 */
export default function Nav() {
  const [active, setActive] = useState('00');
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const doc = document.documentElement;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const p = Math.max(0, Math.min(1, y / max));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      // expose scroll progress globally for WebGL reactivity
      window.__webcardScroll = p;
    };
    const sections = nav.items
      .map((it) => ({ id: it.id, el: document.querySelector(it.href) }))
      .filter((s) => s.el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const match = sections.find((s) => s.el === e.target);
            if (match) setActive(match.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s.el));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner shell-wide">
        <a href="#manifest" className="nav-brand" aria-label="К началу">
          <span className="t-mono nav-brand-sym">D.</span>
          <span className="t-meta nav-brand-class">{meta.classification}</span>
        </a>

        <nav className="nav-index" aria-label="Разделы">
          {nav.items.map((it) => (
            <a
              key={it.id}
              href={it.href}
              className={`nav-item ${active === it.id ? 'is-active' : ''}`}
            >
              <span className="t-mono nav-num">§{it.id}</span>
              <span className="nav-label">{it.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav-status">
          <span className="status-dot" />
          <span className="t-meta">{meta.status}</span>
        </div>
      </div>
      <div className="nav-progress" aria-hidden>
        <span ref={progressRef} className="nav-progress-fill" />
      </div>

      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          padding-block: 1.1rem;
          transition: background var(--dur-base) var(--ease-out-quart),
                      border-color var(--dur-base) var(--ease-out-quart);
          border-bottom: 1px solid transparent;
        }
        .nav.is-scrolled {
          background: color-mix(in oklch, var(--ink-0) 78%, transparent);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border-bottom-color: var(--hairline);
        }
        .nav-inner {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 2rem;
        }
        .nav-brand {
          display: inline-flex; align-items: baseline; gap: 0.6rem;
          color: var(--paper-0);
        }
        .nav-brand-sym {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-variation-settings: 'opsz' 144, 'wght' 480;
          letter-spacing: -0.04em;
        }
        .nav-brand-class { color: var(--paper-3); }

        .nav-index {
          display: flex;
          justify-content: center;
          gap: clamp(0.6rem, 1.6vw, 1.4rem);
        }
        .nav-item {
          display: inline-flex;
          align-items: baseline;
          gap: 0.35rem;
          padding: 0.4rem 0.6rem;
          color: var(--paper-2);
          transition: color var(--dur-fast) var(--ease-out-quart);
          position: relative;
        }
        .nav-item:hover { color: var(--paper-0); }
        .nav-num {
          font-size: var(--t-mono-xs);
          color: var(--paper-3);
          letter-spacing: 0.06em;
        }
        .nav-label {
          font-size: var(--t-mono-sm);
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
        }
        .nav-item.is-active { color: var(--paper-0); }
        .nav-item.is-active .nav-num { color: var(--amber); }
        .nav-item.is-active::after {
          content: '';
          position: absolute;
          left: 0.6rem; right: 0.6rem; bottom: 0.2rem;
          height: 1px;
          background: var(--amber);
          transform-origin: left;
          animation: ink-line var(--dur-base) var(--ease-out-quart);
        }
        @keyframes ink-line {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .nav-status {
          display: inline-flex; align-items: center; gap: 0.5rem;
        }
        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--amber);
          box-shadow: 0 0 0 0 color-mix(in oklch, var(--amber) 60%, transparent);
          animation: pulse-dot 2.4s var(--ease-in-out) infinite;
        }

        .nav-progress {
          position: absolute;
          bottom: 0;
          left: 0; right: 0;
          height: 1px;
          background: var(--hairline);
          overflow: hidden;
        }
        .nav-progress-fill {
          display: block;
          width: 100%;
          height: 100%;
          background: var(--amber);
          transform: scaleX(0);
          transform-origin: left;
          will-change: transform;
        }

        @media (max-width: 900px) {
          .nav-inner { grid-template-columns: auto 1fr auto; gap: 1rem; }
          .nav-brand-class { display: none; }
          .nav-index { gap: 0.3rem; overflow-x: auto; scrollbar-width: none; }
          .nav-index::-webkit-scrollbar { display: none; }
          .nav-label { display: none; }
          .nav-item { padding: 0.4rem 0.4rem; }
        }
        @media (max-width: 600px) {
          .nav-status { display: none; }
        }
      `}</style>
    </header>
  );
}
