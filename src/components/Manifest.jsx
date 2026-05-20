import { useEffect, useRef, lazy, Suspense } from 'react';
import { manifest } from '../data/content';
import SectionRule from './SectionRule';

/** Lazy-load the WebGL canvas so the initial paint doesn't carry Three.js. */
const WebGLStage = lazy(() => import('./WebGLStage'));

/* ═══════════════════════════════════════════════════════════════════
   § 00 — MANIFEST
   Editorial hero with mask-reveal typography and a procedural
   wireframe object on the right.
   Layout:
     [meta col-3]  [headline+abstract+CTA col-6]  [WebGL stage col-3]
   ═══════════════════════════════════════════════════════════════════ */

/** Word-level mask reveal — each word slides up from below its own clip. */
function RevealHeadline({ lines, baseDelay = 200, perLineDelay = 110 }) {
  return (
    <h1 className="manifest-headline t-display">
      {lines.map((word, i) => (
        <span
          key={i}
          className={`mh-word mh-word-${i}`}
          style={{ '--reveal-delay': `${baseDelay + i * perLineDelay}ms` }}
        >
          <span className="mh-mask">
            <span className="mh-text">{word}</span>
          </span>
          {i < lines.length - 1 ? ' ' : ''}
        </span>
      ))}
    </h1>
  );
}

/** Live clock running in the side-meta column (UTC for honesty). */
function LiveClock() {
  const ref = useRef(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, '0');
      const mm = String(d.getUTCMinutes()).padStart(2, '0');
      const ss = String(d.getUTCSeconds()).padStart(2, '0');
      if (ref.current) ref.current.textContent = `${hh}:${mm}:${ss} UTC`;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span ref={ref} className="t-mono">--:--:-- UTC</span>;
}

export default function Manifest() {
  return (
    <section id="manifest" className="section manifest">
      <div className="shell">
        <SectionRule
          chapter={manifest.chapter}
          label={manifest.chapterLabel}
          right={
            <>
              <span style={{ color: 'var(--paper-2)' }}>SIGNAL </span>
              <LiveClock />
            </>
          }
        />

        <div className="grid-12 manifest-grid">
          {/* ─── side meta — file card style ─── */}
          <aside className="manifest-meta col-3">
            <ol className="m-side-list">
              {manifest.sideMeta.map((m, i) => (
                <li key={m.key} className="m-side-row" style={{ '--ri': i }}>
                  <span className="t-meta m-side-key">{m.key}</span>
                  <span className="t-mono m-side-val">{m.value}</span>
                </li>
              ))}
            </ol>
            <div className="m-side-foot">
              <span className="t-meta">FILE CARD №000</span>
              <div className="m-bars" aria-hidden>
                {Array.from({ length: 24 }).map((_, i) => (
                  <i key={i} style={{ '--bi': i }} />
                ))}
              </div>
            </div>
          </aside>

          {/* ─── headline column ─── */}
          <div className="manifest-head col-6">
            <RevealHeadline lines={manifest.headline} />

            <div className="manifest-after">
              <p
                className="t-lead manifest-abstract"
                style={{ '--reveal-delay': '900ms' }}
              >
                {manifest.abstract}
              </p>

              <div
                className="manifest-cta"
                style={{ '--reveal-delay': '1100ms' }}
              >
                <a href={manifest.primaryCta.href} className="cta cta-primary">
                  <span>{manifest.primaryCta.label}</span>
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden>
                    <path d="M1 5h18M15 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                  </svg>
                </a>
                <a href={manifest.secondaryCta.href} className="cta cta-secondary">
                  <span>{manifest.secondaryCta.label}</span>
                </a>
              </div>
            </div>
          </div>

          {/* ─── WebGL stage — wireframe crystal ─── */}
          <div className="manifest-stage col-3">
            <div className="stage-frame">
              <div className="stage-corner tl" />
              <div className="stage-corner tr" />
              <div className="stage-corner bl" />
              <div className="stage-corner br" />
              <div className="stage-canvas">
                <Suspense fallback={<div className="stage-skeleton" aria-hidden />}>
                  <WebGLStage />
                </Suspense>
              </div>
              <div className="stage-meta">
                <span className="t-meta">OBJ — 000</span>
                <span className="t-meta">ICO · DET=2</span>
              </div>
            </div>
          </div>

          {/* ─── ticker rail at the bottom of hero ─── */}
          <div className="col-12 manifest-rail">
            <div className="rail-line" />
            <div className="rail-content">
              <span className="t-meta">ROLE</span>
              <span className="t-mono">FULL-STACK ENGINEER</span>
              <span className="rail-sep" />
              <span className="t-meta">FOCUS</span>
              <span className="t-mono">PRODUCTION SYSTEMS · INTERFACES · INFRA</span>
              <span className="rail-sep" />
              <span className="t-meta">STACK</span>
              <span className="t-mono">REACT · NODE · POSTGRES · WEBGL</span>
              <span className="rail-sep" />
              <span className="t-meta">YEAR</span>
              <span className="t-mono tabular">{new Date().getFullYear()}</span>
            </div>
            <div className="rail-line" />
          </div>
        </div>
      </div>

      <style>{`
        .manifest {
          padding-block: clamp(7.5rem, 16vh, 12rem) clamp(2rem, 5vh, 3.5rem);
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        .manifest-grid {
          row-gap: clamp(2.5rem, 5vh, 4rem);
          align-items: start;
        }

        /* ────────── side meta ────────── */
        .manifest-meta {
          padding-top: 0.25rem;
        }
        .m-side-list {
          list-style: none;
          display: flex; flex-direction: column;
          border-left: 1px solid var(--hairline-strong);
          padding-left: 1rem;
        }
        .m-side-row {
          display: flex; flex-direction: column;
          padding-block: 0.6rem;
          border-bottom: 1px dashed var(--hairline);
          opacity: 0;
          transform: translateX(-8px);
          animation: meta-in 600ms var(--ease-out-quart) forwards;
          animation-delay: calc(120ms + var(--ri) * 70ms);
        }
        .m-side-row:last-child { border-bottom: 0; }
        @keyframes meta-in {
          to { opacity: 1; transform: translateX(0); }
        }
        .m-side-key { margin-bottom: 0.18rem; }
        .m-side-val {
          color: var(--paper-0);
          font-size: var(--t-mono-sm);
          letter-spacing: 0.02em;
        }
        .m-side-foot {
          margin-top: 1.4rem;
          padding-top: 1rem;
          border-top: 1px solid var(--hairline);
          opacity: 0;
          animation: meta-in 600ms var(--ease-out-quart) 720ms forwards;
        }
        .m-bars {
          margin-top: 0.6rem;
          display: flex; gap: 2px; height: 22px; align-items: flex-end;
        }
        .m-bars i {
          flex: 1;
          background: var(--paper-2);
          height: calc(20% + (var(--bi) * 3%) % 80%);
          animation: bar-flicker 6s var(--ease-in-out) infinite;
          animation-delay: calc(var(--bi) * 70ms);
        }
        @keyframes bar-flicker {
          0%, 100% { opacity: 0.32; }
          50%      { opacity: 0.72; }
        }

        /* ────────── headline ────────── */
        .manifest-headline {
          font-size: clamp(3rem, 7.4vw, 8.2rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          font-variation-settings: 'opsz' 144, 'SOFT' 30, 'wght' 360;
          color: var(--paper-0);
          margin-bottom: 2.4rem;
          /* Allow words to break wherever they fit */
          word-break: keep-all;
        }
        .mh-word {
          display: inline;
        }
        .mh-mask {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          line-height: inherit;
          padding-bottom: 0.06em; /* descenders */
        }
        .mh-text {
          display: inline-block;
          transform: translateY(102%);
          will-change: transform;
        }
        .is-ready .mh-text {
          animation: mh-up 1100ms var(--ease-out-quint) forwards;
          animation-delay: var(--reveal-delay, 0ms);
        }
        @keyframes mh-up {
          0%   { transform: translateY(102%); }
          100% { transform: translateY(0); }
        }
        /* word-level accents — second word italic amber, fourth muted */
        .mh-word-1 .mh-text {
          font-style: italic;
          font-variation-settings: 'opsz' 144, 'SOFT' 100, 'wght' 320;
          color: var(--amber);
        }
        .mh-word-3 .mh-text {
          color: var(--paper-2);
        }

        /* ────────── abstract + CTA ────────── */
        .manifest-after {
          display: flex; flex-direction: column;
          gap: 2rem;
          max-width: 56ch;
        }
        .manifest-abstract,
        .manifest-cta {
          opacity: 0;
          transform: translateY(12px);
          animation-fill-mode: forwards;
        }
        .is-ready .manifest-abstract,
        .is-ready .manifest-cta {
          animation: rise-in 900ms var(--ease-out-quart) forwards;
          animation-delay: var(--reveal-delay, 0ms);
        }
        @keyframes rise-in {
          to { opacity: 1; transform: translateY(0); }
        }

        .manifest-cta {
          display: flex; gap: 0.75rem; flex-wrap: wrap;
          align-items: center;
        }
        .cta {
          display: inline-flex; align-items: center; gap: 0.75rem;
          padding: 0.95rem 1.3rem;
          font-family: var(--font-mono);
          font-size: var(--t-mono-sm);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition:
            background var(--dur-fast) var(--ease-out-quart),
            color var(--dur-fast) var(--ease-out-quart),
            border-color var(--dur-fast) var(--ease-out-quart),
            transform var(--dur-fast) var(--ease-out-quart);
          position: relative;
        }
        .cta-primary {
          background: var(--paper-0);
          color: var(--ink-0);
        }
        .cta-primary:hover {
          background: var(--amber);
          transform: translateY(-1px);
        }
        .cta-primary svg { transition: transform var(--dur-fast) var(--ease-out-quart); }
        .cta-primary:hover svg { transform: translateX(3px); }
        .cta-secondary {
          background: transparent;
          color: var(--paper-0);
          border: 1px solid var(--hairline-strong);
        }
        .cta-secondary:hover {
          border-color: var(--amber);
          color: var(--amber);
        }

        /* ────────── WebGL stage ────────── */
        .manifest-stage {
          align-self: stretch;
          min-height: 360px;
        }
        .stage-frame {
          position: relative;
          height: 100%;
          min-height: 460px;
          border: 1px solid var(--hairline);
          background:
            radial-gradient(ellipse at 50% 60%, color-mix(in oklch, var(--amber) 5%, transparent) 0%, transparent 65%),
            color-mix(in oklch, var(--ink-1) 50%, transparent);
        }
        .stage-canvas {
          position: absolute;
          inset: 1.2rem;
        }
        .stage-skeleton {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--amber) 4%, transparent) 0%, transparent 60%);
        }
        .stage-skeleton::after {
          content: '';
          position: absolute;
          left: 50%; top: 50%;
          width: 6px; height: 6px;
          margin: -3px;
          background: var(--amber);
          border-radius: 50%;
          animation: skel-pulse 1.4s var(--ease-in-out) infinite;
        }
        @keyframes skel-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%      { transform: scale(2.4); opacity: 1; }
        }
        .stage-corner {
          position: absolute;
          width: 14px; height: 14px;
          pointer-events: none;
        }
        .stage-corner.tl { top: -1px; left: -1px;  border-top: 1px solid var(--amber); border-left: 1px solid var(--amber); }
        .stage-corner.tr { top: -1px; right: -1px; border-top: 1px solid var(--amber); border-right: 1px solid var(--amber); }
        .stage-corner.bl { bottom: -1px; left: -1px;  border-bottom: 1px solid var(--amber); border-left: 1px solid var(--amber); }
        .stage-corner.br { bottom: -1px; right: -1px; border-bottom: 1px solid var(--amber); border-right: 1px solid var(--amber); }
        .stage-meta {
          position: absolute;
          bottom: 0.7rem; left: 0.9rem; right: 0.9rem;
          display: flex; justify-content: space-between;
          pointer-events: none;
        }

        /* ────────── bottom ticker rail ────────── */
        .manifest-rail {
          margin-top: clamp(2rem, 4vh, 3rem);
        }
        .rail-line {
          height: 1px;
          background: var(--hairline-strong);
        }
        .rail-content {
          display: flex; flex-wrap: wrap;
          align-items: center; gap: 0.8rem 1.2rem;
          padding-block: 0.9rem;
          font-size: var(--t-mono-xs);
        }
        .rail-content .t-meta { color: var(--paper-3); }
        .rail-content .t-mono { color: var(--paper-0); }
        .rail-sep {
          width: 4px; height: 4px;
          background: var(--amber);
          opacity: 0.7;
          border-radius: 50%;
        }

        /* ────────── responsive ────────── */
        @media (max-width: 900px) {
          .manifest-grid { row-gap: 2.5rem; }
          .manifest-stage { min-height: 340px; }
          .manifest-meta, .manifest-head, .manifest-stage { grid-column: 1 / -1; }
        }
      `}</style>
    </section>
  );
}
