import { useMemo } from 'react';
import { craft } from '../data/content';
import SectionRule from './SectionRule';
import useReveal from '../hooks/useReveal';

/* ═══════════════════════════════════════════════════════════════════
   § 02 — CRAFT (Skills)
   Engineering inventory: each technology is one row in a specification
   sheet. Columns by domain (FE / BE / OPS), tier-dots on the right.
   No glass cards. No colour-coded sections.
   ═══════════════════════════════════════════════════════════════════ */

function TierDots({ tier }) {
  const map = {
    core:     { filled: 3, label: '●●●' },
    working:  { filled: 2, label: '●●○' },
    familiar: { filled: 1, label: '●○○' },
  };
  const t = map[tier] || map.familiar;
  return (
    <span className="craft-tier" data-tier={tier} aria-label={`${t.filled} of 3`}>
      <span className="dot" data-on={t.filled >= 1} />
      <span className="dot" data-on={t.filled >= 2} />
      <span className="dot" data-on={t.filled >= 3} />
    </span>
  );
}

export default function Craft() {
  const [ref] = useReveal();

  /** group by column */
  const groups = useMemo(() => {
    return craft.table.reduce((acc, t) => {
      (acc[t.column] = acc[t.column] || []).push(t);
      return acc;
    }, {});
  }, []);

  /** tier totals */
  const totals = useMemo(() => {
    const t = { core: 0, working: 0, familiar: 0 };
    craft.table.forEach((row) => { t[row.tier]++; });
    return t;
  }, []);

  return (
    <section id="craft" ref={ref} className="section craft">
      <div className="shell">
        <SectionRule
          chapter={craft.chapter}
          label={craft.chapterLabel}
          right={craft.rightTag}
        />

        <div className="craft-intro grid-12">
          <p className="t-lead craft-preamble col-7">{craft.preamble}</p>

          <div className="craft-totals col-5">
            <div className="craft-total">
              <span className="t-meta">PRIMARY</span>
              <span className="craft-total-num t-display tabular">{String(totals.core).padStart(2,'0')}</span>
              <span className="t-mono dim">core</span>
            </div>
            <div className="craft-total">
              <span className="t-meta">WORKING</span>
              <span className="craft-total-num t-display tabular">{String(totals.working).padStart(2,'0')}</span>
              <span className="t-mono dim">in projects</span>
            </div>
            <div className="craft-total">
              <span className="t-meta">FAMILIAR</span>
              <span className="craft-total-num t-display tabular">{String(totals.familiar).padStart(2,'0')}</span>
              <span className="t-mono dim">reading</span>
            </div>
          </div>
        </div>

        <div className="craft-sheet">
          <div className="craft-sheet-head">
            <span className="t-mono">SECTION</span>
            <span className="t-mono">CODE</span>
            <span className="t-mono">TECHNOLOGY / ROLE</span>
            <span className="t-mono right">TIER</span>
          </div>

          {Object.entries(groups).map(([column, rows], gi) => (
            <div key={column} className="craft-group" style={{ '--gi': gi }}>
              <div className="craft-group-head">
                <span className="t-meta">{column}</span>
                <span className="craft-count tabular t-mono">×{String(rows.length).padStart(2, '0')}</span>
              </div>

              <ul className="craft-rows">
                {rows.map((r, ri) => (
                  <li
                    key={r.code}
                    className={`craft-row tier-${r.tier}`}
                    style={{ '--ri': ri }}
                  >
                    <span className="craft-marker" aria-hidden />
                    <span className="craft-code t-mono">{r.code}</span>
                    <div className="craft-name-wrap">
                      <span className="craft-name">{r.name}</span>
                      <span className="craft-role t-mono">{r.role}</span>
                    </div>
                    <TierDots tier={r.tier} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="craft-legend">
          {craft.legend.map((l) => (
            <div key={l.tier} className="craft-legend-item">
              <TierDots tier={l.tier} />
              <span className="t-mono craft-legend-label">{l.label}</span>
              <span className="craft-legend-desc">— {l.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ═══════ reveal ═══════ */
        .craft-intro, .craft-sheet, .craft-legend {
          opacity: 0; transform: translateY(18px);
          transition: opacity 800ms var(--ease-out-quart), transform 800ms var(--ease-out-quart);
        }
        .craft.is-in .craft-intro  { opacity: 1; transform: none; transition-delay: 80ms; }
        .craft.is-in .craft-sheet  { opacity: 1; transform: none; transition-delay: 200ms; }
        .craft.is-in .craft-legend { opacity: 1; transform: none; transition-delay: 320ms; }

        /* ═══════ intro ═══════ */
        .craft-intro {
          column-gap: clamp(2rem, 4vw, 4rem);
          row-gap: 1.5rem;
          align-items: end;
          margin-bottom: 2.5rem;
        }
        .craft-preamble { max-width: 56ch; }
        .craft-totals {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .craft-total {
          display: flex; flex-direction: column;
          padding: 0.9rem 1rem 0.9rem 1.2rem;
          border-left: 1px solid var(--hairline-strong);
          gap: 0.2rem;
        }
        .craft-total:first-child { border-left-color: var(--amber); }
        .craft-total-num {
          font-size: clamp(2rem, 3.6vw, 3rem);
          line-height: 1;
          color: var(--paper-0);
          font-variation-settings: 'opsz' 144, 'SOFT' 30, 'wght' 400;
          margin-block: 0.2rem 0.1rem;
        }
        .craft-total .dim { color: var(--paper-3); text-transform: uppercase; letter-spacing: 0.06em; font-size: var(--t-mono-xs); }

        /* ═══════ specification sheet ═══════ */
        .craft-sheet {
          border: 1px solid var(--hairline-strong);
          background: var(--ink-1);
        }
        .craft-sheet-head {
          display: grid;
          grid-template-columns: 110px 90px 1fr 100px;
          gap: 1rem;
          align-items: center;
          padding: 0.85rem 1.2rem;
          border-bottom: 1px solid var(--hairline-strong);
          background: var(--ink-2);
        }
        .craft-sheet-head span {
          font-size: var(--t-mono-xs);
          color: var(--paper-3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .craft-sheet-head .right { text-align: right; }

        .craft-group {
          border-bottom: 1px solid var(--hairline);
        }
        .craft-group:last-child { border-bottom: 0; }
        .craft-group-head {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 1.1rem 1.2rem 0.6rem;
        }
        .craft-count { color: var(--paper-3); }

        .craft-rows { list-style: none; }
        .craft-row {
          display: grid;
          grid-template-columns: 110px 90px 1fr 100px;
          gap: 1rem;
          align-items: center;
          padding: 0.9rem 1.2rem;
          border-top: 1px solid color-mix(in oklch, var(--paper-0) 3%, transparent);
          position: relative;
          transition: background var(--dur-fast) var(--ease-out-quart);
        }
        .craft-row:hover {
          background: color-mix(in oklch, var(--paper-0) 3.5%, transparent);
        }
        .craft-row.tier-core {
          background: color-mix(in oklch, var(--amber) 3%, transparent);
        }
        .craft-row.tier-core:hover {
          background: color-mix(in oklch, var(--amber) 6%, transparent);
        }
        .craft-marker {
          display: block;
          width: 14px; height: 1px;
          background: var(--paper-3);
        }
        .craft-row.tier-core .craft-marker { background: var(--amber); height: 1.5px; }

        .craft-code { color: var(--paper-3); }
        .craft-row.tier-core .craft-code { color: var(--amber); }

        .craft-name-wrap { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
        .craft-name {
          font-family: var(--font-display);
          font-variation-settings: 'opsz' 30, 'wght' 410;
          font-size: 1.08rem;
          color: var(--paper-0);
          letter-spacing: -0.01em;
        }
        .craft-role {
          font-family: var(--font-mono);
          font-size: var(--t-mono-xs);
          color: var(--paper-2);
          letter-spacing: 0;
          text-transform: none;
        }

        .craft-tier {
          display: inline-flex; gap: 4px; justify-content: flex-end;
        }
        .craft-tier .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--paper-3);
          opacity: 0.32;
          transition: background var(--dur-fast) var(--ease-out-quart), opacity var(--dur-fast) var(--ease-out-quart);
        }
        .craft-tier .dot[data-on='true'] { opacity: 1; }
        .craft-tier[data-tier='core']     .dot[data-on='true'] { background: var(--amber); }
        .craft-tier[data-tier='working']  .dot[data-on='true'] { background: var(--paper-0); }
        .craft-tier[data-tier='familiar'] .dot[data-on='true'] { background: var(--paper-2); }

        /* ═══════ legend ═══════ */
        .craft-legend {
          margin-top: 1.6rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1.4rem;
        }
        .craft-legend-item {
          display: inline-flex; align-items: baseline; gap: 0.6rem;
          font-size: var(--t-mono-xs);
        }
        .craft-legend-label {
          color: var(--paper-1);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .craft-legend-desc {
          color: var(--paper-3);
          font-family: var(--font-body);
        }

        @media (max-width: 900px) {
          .craft-intro { grid-template-columns: 1fr; }
          .craft-preamble, .craft-totals { grid-column: 1 / -1; }
          .craft-totals { width: 100%; }
          .craft-sheet-head { grid-template-columns: 90px 1fr 80px; }
          .craft-sheet-head span:first-child { display: none; }
          .craft-row { grid-template-columns: 14px 80px 1fr 80px; gap: 0.8rem; }
        }
        @media (max-width: 600px) {
          .craft-totals { grid-template-columns: 1fr; }
          .craft-total { border-left: 0; border-top: 1px solid var(--hairline-strong); padding: 0.6rem 0; }
          .craft-total:first-child { border-top-color: var(--amber); }
          .craft-sheet-head { display: none; }
          .craft-row {
            grid-template-columns: 70px 1fr 70px;
            padding: 0.75rem 0.8rem;
          }
          .craft-marker { display: none; }
        }
      `}</style>
    </section>
  );
}
