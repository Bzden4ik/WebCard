import { signal, meta } from '../data/content';
import SectionRule from './SectionRule';
import useReveal from '../hooks/useReveal';

/* ═══════════════════════════════════════════════════════════════════
   § 04 — SIGNAL (Contact)
   Massive typographic decision-prompt + 3 channels.
   Layout:
     ┌─────────────────────────────────────────────────┐
     │  ЕСЛИ У ВАС [italic-amber:есть] ЗАДАЧА —        │
     │  НАПИШИТЕ.                                       │
     │  [sub]                                           │
     │                                                  │
     │  CH-01 ─ GITHUB    github.com/Bzden4ik     →     │
     │  CH-02 ─ TELEGRAM  @Bzden4ikkk             →     │
     │  CH-03 ─ EMAIL     bzdenbzden4ik@gmail     →     │
     │                                                  │
     │  status: open · response: 24h · 2026             │
     └─────────────────────────────────────────────────┘
   ═══════════════════════════════════════════════════════════════════ */

export default function Signal() {
  const [ref] = useReveal();

  return (
    <section id="signal" ref={ref} className="section signal">
      <div className="shell">
        <SectionRule chapter={signal.chapter} label={signal.chapterLabel} right={signal.rightTag} />

        <div className="grid-12 sig-grid">
          {/* ─── Big typographic statement ─── */}
          <div className="sig-callout-wrap col-9">
            <h2 className="t-display sig-callout">
              {signal.callout.map((w, i) => (
                <span key={i} className={`sig-word w-${i}`}>
                  <span className="sig-mask"><span className="sig-text">{w}</span></span>
                  {i < signal.callout.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>

            <p className="t-lead sig-sub">{signal.sub}</p>
          </div>

          {/* ─── Status badge in the right column ─── */}
          <aside className="sig-status col-3">
            <div className="sig-status-inner">
              <div className="sig-status-row">
                <span className="t-meta">STATUS</span>
                <span className="t-mono amb">{meta.status}</span>
              </div>
              <div className="sig-status-row">
                <span className="t-meta">RESPONSE</span>
                <span className="t-mono">{'<'} 24 h</span>
              </div>
              <div className="sig-status-row">
                <span className="t-meta">LANG</span>
                <span className="t-mono">{meta.langs.join(' · ')}</span>
              </div>
              <div className="sig-status-row">
                <span className="t-meta">TIMEZONE</span>
                <span className="t-mono">{meta.station}</span>
              </div>
            </div>

            <div className="sig-pulse" aria-hidden>
              <span className="sig-pulse-dot" />
              <span className="sig-pulse-label t-mono">CHANNELS OPEN</span>
            </div>
          </aside>

          {/* ─── Channels — large row-style ─── */}
          <ul className="sig-channels col-12">
            {signal.channels.map((c, i) => (
              <li key={c.code} className="sig-channel" style={{ '--ci': i }}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <span className="t-mono ch-code">{c.code}</span>
                  <span className="ch-label t-meta">{c.label}</span>
                  <span className="ch-handle">{c.handle}</span>
                  <span className="ch-cta t-mono">SEND →</span>
                </a>
              </li>
            ))}
          </ul>

          {/* ─── Footer — colophon ─── */}
          <footer className="sig-foot col-12">
            <div className="sig-foot-left">
              <span className="t-meta">{signal.footnote} · {new Date().getFullYear()}</span>
            </div>
            <div className="sig-foot-center">
              <span className="t-mono">D · OP</span>
              <span className="sig-foot-dot" aria-hidden />
              <span className="t-mono">CARD №{meta.cardNumber}</span>
              <span className="sig-foot-dot" aria-hidden />
              <span className="t-mono">{meta.callsign}</span>
            </div>
            <div className="sig-foot-right">
              <a href="#manifest" className="t-mono sig-up">RETURN TO TOP ↑</a>
            </div>
          </footer>
        </div>
      </div>

      <style>{`
        /* ═══════ reveal ═══════ */
        .sig-callout-wrap, .sig-status, .sig-channels, .sig-foot {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 900ms var(--ease-out-quart), transform 900ms var(--ease-out-quart);
        }
        .signal.is-in .sig-callout-wrap { opacity: 1; transform: none; transition-delay: 80ms; }
        .signal.is-in .sig-status       { opacity: 1; transform: none; transition-delay: 200ms; }
        .signal.is-in .sig-channels     { opacity: 1; transform: none; transition-delay: 340ms; }
        .signal.is-in .sig-foot         { opacity: 1; transform: none; transition-delay: 480ms; }

        .sig-grid { row-gap: 3.5rem; column-gap: clamp(2rem, 4vw, 4rem); }

        /* ═══════ huge callout ═══════ */
        .sig-callout {
          font-size: clamp(3rem, 10vw, 10rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          font-variation-settings: 'opsz' 144, 'SOFT' 30, 'wght' 360;
          color: var(--paper-0);
          margin-bottom: 1.6rem;
          max-width: 16ch;
        }
        .sig-word { display: inline; }
        .sig-mask {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          line-height: inherit;
          padding-bottom: 0.06em;
        }
        .sig-text {
          display: inline-block;
          transform: translateY(102%);
          will-change: transform;
        }
        .signal.is-in .sig-text {
          animation: sig-up 1100ms var(--ease-out-quint) forwards;
          animation-delay: calc(150ms + var(--word-i, 0) * 90ms);
        }
        .signal.is-in .w-0 .sig-text { animation-delay: 200ms; }
        .signal.is-in .w-1 .sig-text { animation-delay: 290ms; }
        .signal.is-in .w-2 .sig-text { animation-delay: 380ms; }
        .signal.is-in .w-3 .sig-text { animation-delay: 470ms; }
        .signal.is-in .w-4 .sig-text { animation-delay: 560ms; }
        .signal.is-in .w-5 .sig-text { animation-delay: 660ms; }
        @keyframes sig-up { to { transform: translateY(0); } }

        /* word accents */
        .w-3 .sig-text {
          font-style: italic;
          font-variation-settings: 'opsz' 144, 'SOFT' 100, 'wght' 320;
          color: var(--amber);
        }
        .w-5 .sig-text {
          color: var(--paper-2);
        }

        .sig-sub {
          color: var(--paper-1);
          max-width: 56ch;
        }

        /* ═══════ status card ═══════ */
        .sig-status {
          align-self: end;
          display: flex; flex-direction: column;
          gap: 0.6rem;
        }
        .sig-status-inner {
          display: grid; gap: 0.4rem;
          padding: 1rem 1.1rem;
          border: 1px solid var(--hairline-strong);
          background: color-mix(in oklch, var(--ink-1) 70%, var(--ink-0) 30%);
        }
        .sig-status-row {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 0.6rem;
          padding-block: 0.35rem;
          border-bottom: 1px dashed var(--hairline);
        }
        .sig-status-row:last-child { border-bottom: 0; }
        .sig-status-row .amb { color: var(--amber); }

        .sig-pulse {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 0.5rem 0.8rem;
          border: 1px solid var(--hairline-amber);
          background: color-mix(in oklch, var(--amber) 4%, transparent);
          align-self: flex-start;
        }
        .sig-pulse-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--amber);
          box-shadow: 0 0 0 0 color-mix(in oklch, var(--amber) 60%, transparent);
          animation: pulse-dot 2s var(--ease-in-out) infinite;
        }
        .sig-pulse-label { color: var(--amber); }

        /* ═══════ channels ═══════ */
        .sig-channels {
          list-style: none;
          border-top: 1px solid var(--hairline-strong);
          border-bottom: 1px solid var(--hairline-strong);
        }
        .sig-channel a {
          display: grid;
          grid-template-columns: 80px 120px 1fr 120px;
          gap: 1.2rem;
          align-items: center;
          padding: 1.4rem 0.4rem;
          border-bottom: 1px solid var(--hairline);
          transition:
            padding-left var(--dur-base) var(--ease-out-quart),
            background var(--dur-base) var(--ease-out-quart);
          position: relative;
        }
        .sig-channel:last-child a { border-bottom: 0; }
        .sig-channel a::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--amber);
          transform: scaleY(0);
          transform-origin: center;
          transition: transform var(--dur-base) var(--ease-out-quart);
        }
        .sig-channel a:hover {
          padding-left: 1.4rem;
          background: color-mix(in oklch, var(--amber) 3%, transparent);
        }
        .sig-channel a:hover::before { transform: scaleY(1); }
        .sig-channel a:hover .ch-handle { color: var(--amber); }
        .sig-channel a:hover .ch-cta { color: var(--amber); transform: translateX(6px); }

        .ch-code { color: var(--paper-3); }
        .ch-label { color: var(--paper-2); }
        .ch-handle {
          font-family: var(--font-display);
          font-variation-settings: 'opsz' 30, 'wght' 400;
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          color: var(--paper-0);
          letter-spacing: -0.015em;
          word-break: break-all;
          transition: color var(--dur-fast) var(--ease-out-quart);
        }
        .ch-cta {
          font-size: var(--t-mono-xs);
          letter-spacing: 0.1em;
          color: var(--paper-2);
          text-align: right;
          transition: color var(--dur-fast) var(--ease-out-quart),
                      transform var(--dur-fast) var(--ease-out-quart);
        }

        /* ═══════ colophon footer ═══════ */
        .sig-foot {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1rem;
          padding-top: 2rem;
          align-items: center;
        }
        .sig-foot-left { justify-self: start; }
        .sig-foot-center {
          display: inline-flex; align-items: center;
          gap: 0.8rem;
          color: var(--paper-2);
        }
        .sig-foot-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: var(--amber);
        }
        .sig-foot-right { justify-self: end; }
        .sig-up {
          color: var(--paper-2);
          letter-spacing: 0.1em;
          font-size: var(--t-mono-xs);
        }
        .sig-up:hover { color: var(--amber); }

        @media (max-width: 900px) {
          .sig-callout-wrap, .sig-status { grid-column: 1 / -1; }
          .sig-status { align-self: start; }
          .sig-channel a {
            grid-template-columns: auto 1fr auto;
          }
          .sig-channel .ch-code { display: none; }
          .sig-foot {
            grid-template-columns: 1fr;
            text-align: center;
            row-gap: 0.6rem;
          }
          .sig-foot-left, .sig-foot-right { justify-self: center; }
        }
      `}</style>
    </section>
  );
}
