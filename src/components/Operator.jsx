import { operator, meta } from '../data/content';
import SectionRule from './SectionRule';
import useReveal from '../hooks/useReveal';

/* ═══════════════════════════════════════════════════════════════════
   § 01 — OPERATOR (About)
   Editorial dossier spread:
     ┌─────────┬──────────────────────────────┐
     │ DOSSIER │ big pull-quote               │
     │ CARD    │                              │
     │         ├──────────────┬───────────────┤
     │ (left)  │ body         │ stats grid    │
     │         ├──────────────┴───────────────┤
     │         │ timeline                     │
     │         ├──────────────────────────────┤
     │         │ principles  ×  refuse list   │
     └─────────┴──────────────────────────────┘
   ═══════════════════════════════════════════════════════════════════ */

export default function Operator() {
  const [ref] = useReveal();

  return (
    <section id="operator" ref={ref} className="section operator">
      <div className="shell">
        <SectionRule
          chapter={operator.chapter}
          label={operator.chapterLabel}
          right={operator.rightTag}
        />

        <div className="grid-12 op-grid">
          {/* ─── DOSSIER CARD (sticky on desktop) ─── */}
          <aside className="op-card col-3">
            <div className="op-card-inner">
              <div className="op-card-head">
                <span className="t-meta">DOSSIER №000</span>
                <span className="t-mono op-card-stamp">CLASSIFIED · OPEN</span>
              </div>

              <div className="op-portrait" aria-hidden>
                <div className="op-portrait-grid">
                  {Array.from({ length: 8 * 12 }).map((_, i) => (
                    <i key={i} style={{ '--ci': i }} />
                  ))}
                </div>
                <div className="op-portrait-mark">D.</div>
                <div className="op-portrait-scan" />
              </div>

              <dl className="op-card-list">
                <div><dt>OPERATOR</dt><dd>{meta.callsign}</dd></div>
                <div><dt>CLASS</dt><dd>{meta.classification}</dd></div>
                <div><dt>STATION</dt><dd>{meta.station}</dd></div>
                <div><dt>STATUS</dt><dd className="amber">{meta.status}</dd></div>
                <div><dt>LANG</dt><dd>{meta.langs.join(' · ')}</dd></div>
                <div><dt>FILE</dt><dd>OPENED {meta.fileOpened}</dd></div>
              </dl>

              <div className="op-card-foot">
                <span className="t-meta">SEAL</span>
                <svg className="op-seal" viewBox="0 0 60 60" aria-hidden>
                  <circle cx="30" cy="30" r="27" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                  <circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="0.4"/>
                  <text x="30" y="33" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="currentColor">D · OP</text>
                  <path d="M30 8 L30 13 M30 47 L30 52 M8 30 L13 30 M47 30 L52 30" stroke="currentColor" strokeWidth="0.8"/>
                </svg>
              </div>
            </div>
          </aside>

          {/* ─── CONTENT ─── */}
          <div className="op-content col-9">
            <blockquote className="op-pull t-display-italic">
              <span aria-hidden className="op-pull-mark">"</span>
              {operator.pull}
            </blockquote>

            <div className="op-grid-mid">
              <div className="op-body">
                {operator.body.map((p, i) => (
                  <p key={i} className="t-body op-body-p">{p}</p>
                ))}
              </div>

              <div className="op-stats">
                {operator.stats.map((s) => (
                  <div key={s.code} className="op-stat">
                    <span className="t-meta op-stat-label">{s.code} · {s.label}</span>
                    <span className="op-stat-val">
                      <span className="num tabular">{s.value}</span>
                      <span className="unit">{s.unit}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── TIMELINE ─── */}
            <div className="op-timeline">
              <div className="t-meta op-section-label">TIMELINE / 2024 — PRESENT</div>
              <ol className="op-timeline-list">
                {operator.timeline.map((t, i) => (
                  <li key={i} className="op-timeline-item">
                    <span className="ot-year t-mono">{t.year}</span>
                    <span className="ot-tick" aria-hidden />
                    <span className="ot-label t-mono">{t.label}</span>
                    <span className="ot-text">{t.text}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* ─── PRINCIPLES × REFUSE ─── */}
            <div className="op-grid-bot">
              <div className="op-principles">
                <div className="t-meta op-section-label amber">PRINCIPLES — DO</div>
                <ol>
                  {operator.principles.map((p) => (
                    <li key={p.n}>
                      <span className="t-mono p-n">{p.n}</span>
                      <span className="p-text">{p.text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="op-refuse">
                <div className="t-meta op-section-label signal">REFUSE — DO NOT</div>
                <ul>
                  {operator.refuse.map((r, i) => (
                    <li key={i}>
                      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                        <path d="M1 1 L9 9 M9 1 L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
                      </svg>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ═══════ enter reveals — staggered groups ═══════ */
        .op-card,
        .op-pull,
        .op-body,
        .op-stats,
        .op-timeline,
        .op-grid-bot {
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 900ms var(--ease-out-quart),
            transform 900ms var(--ease-out-quart);
        }
        .operator.is-in .op-card     { opacity: 1; transform: none; transition-delay: 60ms; }
        .operator.is-in .op-pull     { opacity: 1; transform: none; transition-delay: 180ms; }
        .operator.is-in .op-body     { opacity: 1; transform: none; transition-delay: 320ms; }
        .operator.is-in .op-stats    { opacity: 1; transform: none; transition-delay: 380ms; }
        .operator.is-in .op-timeline { opacity: 1; transform: none; transition-delay: 460ms; }
        .operator.is-in .op-grid-bot { opacity: 1; transform: none; transition-delay: 540ms; }

        .op-grid { row-gap: 0; column-gap: clamp(2rem, 4vw, 4rem); }

        /* ═══════ DOSSIER CARD ═══════ */
        .op-card { position: relative; }
        .op-card-inner {
          position: sticky;
          top: 6rem;
          padding: 1.2rem 1.2rem 1.4rem;
          border: 1px solid var(--hairline-strong);
          background: linear-gradient(180deg,
            var(--ink-2) 0%,
            color-mix(in oklch, var(--ink-1) 60%, var(--ink-2) 40%) 100%);
        }
        .op-card-head {
          display: flex; justify-content: space-between; align-items: baseline;
          padding-bottom: 0.7rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--hairline);
        }
        .op-card-stamp {
          font-size: var(--t-mono-xs);
          color: var(--amber);
          letter-spacing: 0.1em;
        }

        /* ─── portrait placeholder — generated grid + scan line ─── */
        .op-portrait {
          position: relative;
          aspect-ratio: 3 / 4;
          background: var(--ink-0);
          overflow: hidden;
          margin-bottom: 1.2rem;
          border: 1px solid var(--hairline);
        }
        .op-portrait-grid {
          position: absolute; inset: 0;
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-rows: repeat(12, 1fr);
        }
        .op-portrait-grid i {
          display: block;
          background: color-mix(in oklch, var(--paper-0) calc((var(--ci) % 7) * 1.4%), transparent);
        }
        .op-portrait-mark {
          position: absolute; inset: 0;
          display: grid; place-items: center;
          font-family: var(--font-display);
          font-size: 8rem;
          font-variation-settings: 'opsz' 144, 'wght' 320;
          color: var(--paper-0);
          letter-spacing: -0.06em;
          mix-blend-mode: difference;
        }
        .op-portrait-scan {
          position: absolute; left: 0; right: 0; top: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--amber), transparent);
          animation: scan 6s linear infinite;
        }
        @keyframes scan {
          0%   { transform: translateY(0); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(calc(var(--scan-h, 360px) * 1)); opacity: 0; }
        }
        .op-portrait { --scan-h: 100cqh; }

        .op-card-list {
          display: grid; gap: 0.55rem;
          margin-bottom: 1.2rem;
        }
        .op-card-list > div {
          display: grid;
          grid-template-columns: 78px 1fr;
          gap: 0.6rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px dashed var(--hairline);
        }
        .op-card-list > div:last-child { border-bottom: 0; }
        .op-card-list dt {
          font-family: var(--font-mono);
          font-size: var(--t-mono-xs);
          color: var(--paper-3);
          letter-spacing: 0.08em;
        }
        .op-card-list dd {
          font-family: var(--font-mono);
          font-size: var(--t-mono-sm);
          color: var(--paper-0);
          letter-spacing: 0;
        }
        .op-card-list dd.amber { color: var(--amber); }

        .op-card-foot {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 0.8rem;
          border-top: 1px solid var(--hairline);
        }
        .op-seal {
          width: 56px; height: 56px;
          color: var(--amber);
        }

        /* ═══════ CONTENT ═══════ */
        .op-content {
          display: flex; flex-direction: column;
          gap: clamp(2.5rem, 5vh, 4rem);
        }

        .op-pull {
          font-size: clamp(1.8rem, 3.6vw, 3.2rem);
          line-height: 1.15;
          color: var(--paper-0);
          position: relative;
          padding-left: 1.6rem;
          font-variation-settings: 'opsz' 144, 'SOFT' 100, 'wght' 320;
          max-width: 24ch;
        }
        .op-pull-mark {
          position: absolute;
          left: 0; top: -0.2em;
          font-size: 2em;
          color: var(--amber);
          line-height: 1;
        }

        /* body × stats split */
        .op-grid-mid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: clamp(1.6rem, 3vw, 2.6rem);
        }
        .op-body {
          display: flex; flex-direction: column;
          gap: 1.15rem;
        }
        .op-body-p { color: var(--paper-1); }
        .op-body-p:first-of-type::first-letter {
          font-family: var(--font-display);
          font-variation-settings: 'opsz' 144, 'wght' 480;
          font-size: 3.2em;
          float: left;
          line-height: 0.86;
          padding-right: 0.12em;
          padding-top: 0.05em;
          color: var(--paper-0);
        }

        .op-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          align-content: start;
        }
        .op-stat {
          display: flex; flex-direction: column;
          gap: 0.4rem;
          padding: 1rem 0.9rem 0.9rem;
          background: var(--ink-2);
          border: 1px solid var(--hairline);
          min-height: 6.5rem;
          position: relative;
          overflow: hidden;
        }
        .op-stat::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 24px; height: 1.5px;
          background: var(--amber);
        }
        .op-stat-label { font-size: 0.6875rem; }
        .op-stat-val {
          display: flex; align-items: baseline; gap: 0.2rem;
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 3.2vw, 2.8rem);
          font-variation-settings: 'opsz' 144, 'SOFT' 30, 'wght' 380;
          line-height: 1;
          color: var(--paper-0);
          margin-top: auto;
        }
        .op-stat-val .unit {
          font-size: 0.95rem;
          color: var(--amber);
          font-family: var(--font-mono);
          font-weight: 500;
        }

        /* ─── TIMELINE ─── */
        .op-section-label {
          margin-bottom: 1rem;
          display: block;
        }
        .op-section-label.amber { color: var(--amber); }
        .op-section-label.signal { color: var(--signal); }

        .op-timeline {
          padding-top: 0.5rem;
          border-top: 1px solid var(--hairline-strong);
        }
        .op-timeline-list {
          list-style: none;
          position: relative;
          padding-left: 0;
        }
        .op-timeline-list::before {
          content: '';
          position: absolute;
          left: 60px;
          top: 8px; bottom: 8px;
          width: 1px;
          background: var(--hairline-strong);
        }
        .op-timeline-item {
          display: grid;
          grid-template-columns: 60px 24px 130px 1fr;
          gap: 0;
          align-items: baseline;
          padding-block: 0.7rem;
          position: relative;
        }
        .ot-year { color: var(--amber); font-size: var(--t-mono-sm); }
        .ot-tick {
          position: relative;
          width: 24px;
        }
        .ot-tick::before {
          content: '';
          position: absolute;
          left: 0; top: 0.45rem;
          width: 12px; height: 12px;
          background: var(--ink-0);
          border: 1.5px solid var(--amber);
        }
        .ot-label {
          font-size: var(--t-mono-xs);
          color: var(--paper-2);
          letter-spacing: 0.05em;
        }
        .ot-text {
          font-family: var(--font-body);
          font-size: var(--t-body-sm);
          color: var(--paper-1);
          line-height: 1.55;
        }

        /* ─── PRINCIPLES × REFUSE ─── */
        .op-grid-bot {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.6rem, 3vw, 2.6rem);
          padding-top: 1.2rem;
          border-top: 1px solid var(--hairline-strong);
        }
        .op-principles ol,
        .op-refuse ul {
          list-style: none;
          display: flex; flex-direction: column;
          gap: 0.95rem;
        }
        .op-principles li {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.8rem;
          align-items: start;
          padding-bottom: 0.7rem;
          border-bottom: 1px dashed var(--hairline);
        }
        .op-principles .p-n {
          color: var(--amber);
          font-size: var(--t-mono-xs);
          letter-spacing: 0.06em;
          padding-top: 0.18rem;
        }
        .op-principles .p-text {
          font-family: var(--font-body);
          font-size: var(--t-body-sm);
          color: var(--paper-1);
          line-height: 1.55;
        }

        .op-refuse li {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.8rem;
          align-items: start;
          padding-bottom: 0.7rem;
          border-bottom: 1px dashed var(--hairline);
        }
        .op-refuse svg {
          color: var(--signal);
          margin-top: 0.32rem;
        }
        .op-refuse span {
          font-family: var(--font-body);
          font-size: var(--t-body-sm);
          color: var(--paper-1);
          line-height: 1.55;
        }

        @media (max-width: 900px) {
          .op-card-inner { position: static; }
          .op-grid-mid { grid-template-columns: 1fr; }
          .op-stats { grid-template-columns: 1fr 1fr; }
          .op-grid-bot { grid-template-columns: 1fr; }
          .op-timeline-item {
            grid-template-columns: 60px 24px 100px 1fr;
          }
        }
        @media (max-width: 600px) {
          .op-timeline-item {
            grid-template-columns: 60px 1fr;
          }
          .ot-tick, .ot-label { display: none; }
          .op-timeline-list::before { display: none; }
        }
      `}</style>
    </section>
  );
}
