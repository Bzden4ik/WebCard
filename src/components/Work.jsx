import { useState } from 'react';
import { work } from '../data/content';
import SectionRule from './SectionRule';
import useReveal from '../hooks/useReveal';

/* ═══════════════════════════════════════════════════════════════════
   § 03 — WORK
   Four-tier layout:
     1. FLAGSHIP × 3 — full-width editorial spread with preview block
     2. PRODUCTION × 6 — compact spec-sheet rows
     3. UTILITIES × 2 — paired mini-block
     4. ARCHIVE × 4 — single-line catalogue
   ═══════════════════════════════════════════════════════════════════ */

/** Custom preview blocks — pure CSS/SVG, no fake screenshots. */
function FlagshipPreview({ kind, accentRef }) {
  if (kind === 'fighting') {
    return (
      <div className="fp fp-fight">
        <div className="fp-grid" aria-hidden>
          {Array.from({ length: 12 * 6 }).map((_, i) => (
            <i key={i} style={{ '--gi': i }} />
          ))}
        </div>
        <div className="fp-hud">
          <div className="fp-hp fp-hp-l">
            <span className="fp-label">P1</span>
            <span className="fp-bar"><span style={{ width: '82%' }} /></span>
          </div>
          <div className="fp-timer t-mono">59</div>
          <div className="fp-hp fp-hp-r">
            <span className="fp-label">P2</span>
            <span className="fp-bar"><span style={{ width: '64%' }} /></span>
          </div>
        </div>
        <div className="fp-roster">
          {['vt-01','vt-02','vt-03','vt-04','vt-05','vt-06','vt-07','vt-08','vt-09','vt-10','vt-11','vt-12','vt-13'].map((id, i) => (
            <span key={id} className="fp-slot t-mono" style={{ '--si': i, color: i === 4 || i === 9 ? 'var(--amber)' : 'var(--paper-2)' }}>
              {id}
            </span>
          ))}
        </div>
        <div className="fp-corner t-meta">FRAME_DATA / 13_FIGHTERS / 4_STAGES</div>
      </div>
    );
  }

  if (kind === 'terminal') {
    const lines = [
      { p: 'yt-dlp ', a: '--format', s: ' "bv*[height<=2160]+ba/b"' },
      { p: '       ', a: '--merge-output-format', s: ' mp4' },
      { p: '       ', a: '--add-metadata', s: '' },
      { p: '       ', a: 'https://youtube.com/watch?v=...' },
      { p: '' },
      { p: '[download] ', a: 'YouDownload', s: ' v1.1.5 · queue 03/07' },
      { p: '' },
    ];
    return (
      <div className="fp fp-term">
        <div className="fp-term-top">
          <span className="t-mono">~/YouDownload</span>
          <span className="t-mono">ELECTRON 33 · YT-DLP</span>
        </div>
        <pre className="fp-term-body t-mono">
{lines.map((l, i) => (
  <div key={i} className="fp-term-line">
    <span className="dim">{l.p}</span>
    <span className="amb">{l.a}</span>
    <span>{l.s}</span>
  </div>
))}
          <div className="fp-term-progress">
            <div className="fp-term-bar"><span style={{ width: '63%' }} /></div>
            <div className="fp-term-stat">
              <span>4K · 2160p</span>
              <span className="amb">63%</span>
              <span>12.4 MB/s · ETA 00:18</span>
            </div>
          </div>
        </pre>
        <div className="fp-corner t-meta">DOWNLOAD_QUEUE / RU·EN / 2_THEMES</div>
      </div>
    );
  }

  if (kind === 'map') {
    return (
      <div className="fp fp-map">
        <svg viewBox="0 0 200 130" className="fp-map-svg" aria-hidden>
          {/* grid */}
          <defs>
            <pattern id="mapgrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M10 0H0V10" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="200" height="130" fill="url(#mapgrid)" color="var(--paper-0)"/>

          {/* terrain outlines */}
          <path d="M20 24 L60 12 L96 28 L138 18 L176 36 L180 88 L150 110 L88 116 L34 100 L14 72 Z"
                fill="none" stroke="var(--paper-3)" strokeWidth="0.6"/>
          <path d="M58 50 L92 48 L120 62 L108 84 L74 80 Z"
                fill="none" stroke="var(--paper-3)" strokeWidth="0.4"/>

          {/* target reticles */}
          {[
            [44, 38], [78, 32], [122, 44], [156, 62], [98, 72],
            [62, 86], [134, 90], [50, 60], [110, 102]
          ].map(([x, y], i) => (
            <g key={i} className="fp-target" style={{ '--ti': i }}>
              <circle cx={x} cy={y} r="3.5" fill="none" stroke="var(--amber)" strokeWidth="0.6"/>
              <circle cx={x} cy={y} r="0.8" fill="var(--amber)"/>
              <path d={`M${x-6} ${y} L${x-2} ${y} M${x+2} ${y} L${x+6} ${y} M${x} ${y-6} L${x} ${y-2} M${x} ${y+2} L${x} ${y+6}`}
                    stroke="var(--amber)" strokeWidth="0.4"/>
            </g>
          ))}

          {/* signal point (player position) */}
          <g>
            <circle cx="92" cy="62" r="2" fill="var(--signal)"/>
            <circle cx="92" cy="62" r="6" fill="none" stroke="var(--signal)" strokeWidth="0.4">
              <animate attributeName="r" values="6;14;6" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite"/>
            </circle>
          </g>
        </svg>
        <div className="fp-map-meta">
          <div className="fp-map-row"><span className="t-meta">MAP</span><span className="t-mono">SHORELINE · DAY</span></div>
          <div className="fp-map-row"><span className="t-meta">EVENT</span><span className="t-mono amb">EVENT_2 / FULL_PURGE</span></div>
          <div className="fp-map-row"><span className="t-meta">TARGETS</span><span className="t-mono">09 ZONES · WAVE 02/04</span></div>
          <div className="fp-map-row"><span className="t-meta">WARN</span><span className="t-mono">+10 SEC · INCOMING</span></div>
        </div>
        <div className="fp-corner t-meta">ARTILLERY_LANDMARKS / 11_MAPS</div>
      </div>
    );
  }
  return null;
}

function FlagshipCard({ item, idx }) {
  return (
    <article className={`fl fl-${idx}`}>
      <div className="fl-grid grid-12">
        <div className="fl-info col-5">
          <div className="fl-head">
            <span className="t-mono fl-code">{item.code}</span>
            <span className="t-meta fl-kind">{item.kind}</span>
          </div>

          <h3 className="fl-title t-display">{item.title}</h3>
          <p className="fl-tagline t-lead">{item.tagline}</p>

          <dl className="fl-meta">
            <div><dt>YEAR</dt><dd>{item.year}</dd></div>
            <div><dt>ROLE</dt><dd>{item.role}</dd></div>
            {item.live && <div><dt>LIVE</dt><dd className="amb"><a href={item.live} target="_blank" rel="noopener noreferrer">{item.live.replace(/^https?:\/\//, '')}</a></dd></div>}
            {item.repo && <div><dt>REPO</dt><dd><a href={item.repo} target="_blank" rel="noopener noreferrer">{item.repo.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</a></dd></div>}
          </dl>

          <div className="fl-brief">
            {item.brief.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="fl-specs">
            {item.specs.map((s) => (
              <div key={s.row} className="fl-spec-row">
                <span className="t-meta fl-spec-key">{s.row}</span>
                <span className="fl-spec-vals">
                  {s.values.map((v, i) => (
                    <span key={i} className="fl-spec-val t-mono">{v}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>

          <div className="fl-actions">
            {item.live && (
              <a className="cta cta-primary" href={item.live} target="_blank" rel="noopener noreferrer">
                <span>OPEN LIVE</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/></svg>
              </a>
            )}
            {item.repo && (
              <a className="cta cta-secondary" href={item.repo} target="_blank" rel="noopener noreferrer">
                <span>SOURCE</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/></svg>
              </a>
            )}
          </div>
        </div>

        <div className="fl-preview col-7">
          <FlagshipPreview kind={item.preview} />
        </div>
      </div>
    </article>
  );
}

function ProductionRow({ item }) {
  return (
    <article className="pr">
      <div className="pr-head">
        <span className="t-mono pr-code">{item.code}</span>
        <span className="t-meta pr-kind">{item.kind}</span>
        <span className="t-meta pr-year">{item.year}</span>
      </div>
      <h4 className="pr-title t-display">{item.title}</h4>
      <p className="pr-summary">{item.summary}</p>
      <ul className="pr-stack">
        {item.stack.map((s) => <li key={s} className="t-mono">{s}</li>)}
      </ul>
      <div className="pr-links">
        {item.live && (
          <a href={item.live} target="_blank" rel="noopener noreferrer" className="pr-link amb">
            <span>LIVE</span><svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square"/></svg>
          </a>
        )}
        {item.repo && (
          <a href={item.repo} target="_blank" rel="noopener noreferrer" className="pr-link">
            <span>REPO</span><svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square"/></svg>
          </a>
        )}
        {!item.live && !item.repo && (
          <span className="pr-link pr-link-disabled t-meta">PRIVATE</span>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  const [ref] = useReveal({ threshold: 0.08 });

  return (
    <section id="work" ref={ref} className="section work">
      <div className="shell">
        <SectionRule chapter={work.chapter} label={work.chapterLabel} right={work.rightTag} />

        <div className="grid-12 work-intro">
          <p className="t-lead work-preamble col-7">{work.preamble}</p>
          <div className="work-counts col-5">
            <div className="work-count"><span className="t-meta">FLAGSHIP</span><span className="num tabular t-display">03</span></div>
            <div className="work-count"><span className="t-meta">PRODUCTION</span><span className="num tabular t-display">06</span></div>
            <div className="work-count"><span className="t-meta">UTILITY</span><span className="num tabular t-display">02</span></div>
            <div className="work-count"><span className="t-meta">ARCHIVE</span><span className="num tabular t-display">04</span></div>
          </div>
        </div>

        {/* ─── FLAGSHIP ─── */}
        <div className="tier-rule">
          <span className="t-meta">TIER I — FLAGSHIP</span>
          <span className="t-meta">03 ENTRIES</span>
        </div>
        <div className="work-flagship">
          {work.flagship.map((item, i) => <FlagshipCard key={item.code} item={item} idx={i} />)}
        </div>

        {/* ─── PRODUCTION ─── */}
        <div className="tier-rule">
          <span className="t-meta">TIER II — PRODUCTION</span>
          <span className="t-meta">06 ENTRIES</span>
        </div>
        <div className="work-production">
          {work.production.map((item) => <ProductionRow key={item.code} item={item} />)}
        </div>

        {/* ─── UTILITIES ─── */}
        <div className="tier-rule">
          <span className="t-meta">TIER III — UTILITY</span>
          <span className="t-meta">02 ENTRIES</span>
        </div>
        <div className="work-utility">
          {work.utilities.map((item) => (
            <article key={item.code} className="ut">
              <div className="ut-head">
                <span className="t-mono ut-code">{item.code}</span>
                <span className="t-meta ut-year">{item.year}</span>
              </div>
              <h4 className="ut-title t-display">{item.title}</h4>
              <p className="ut-summary">{item.summary}</p>
              <div className="ut-stack">
                {item.stack.map((s) => <span key={s} className="t-mono">{s}</span>)}
              </div>
              {item.repo && (
                <a href={item.repo} target="_blank" rel="noopener noreferrer" className="ut-link t-mono">
                  REPO →
                </a>
              )}
            </article>
          ))}
        </div>

        {/* ─── ARCHIVE ─── */}
        <div className="tier-rule">
          <span className="t-meta">TIER IV — ARCHIVE</span>
          <span className="t-meta">04 ENTRIES</span>
        </div>
        <ul className="work-archive">
          {work.archive.map((a) => (
            <li key={a.code} className="ar-row">
              <span className="t-mono ar-code">{a.code}</span>
              <span className="ar-title">{a.title}</span>
              <span className="t-mono ar-stack">{a.stack}</span>
              <span className="t-mono ar-year">{a.year}</span>
              <span className="ar-note">{a.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        /* ═══════ reveal ═══════ */
        .work-intro, .tier-rule, .work-flagship, .work-production,
        .work-utility, .work-archive {
          opacity: 0; transform: translateY(20px);
          transition: opacity 800ms var(--ease-out-quart), transform 800ms var(--ease-out-quart);
        }
        .work.is-in .work-intro     { opacity: 1; transform: none; transition-delay: 80ms; }
        .work.is-in .tier-rule       { opacity: 1; transform: none; transition-delay: 200ms; }
        .work.is-in .work-flagship   { opacity: 1; transform: none; transition-delay: 280ms; }
        .work.is-in .work-production { opacity: 1; transform: none; transition-delay: 360ms; }
        .work.is-in .work-utility    { opacity: 1; transform: none; transition-delay: 440ms; }
        .work.is-in .work-archive    { opacity: 1; transform: none; transition-delay: 500ms; }

        /* ═══════ intro ═══════ */
        .work-intro { row-gap: 1.5rem; column-gap: clamp(2rem, 4vw, 4rem); margin-bottom: 3rem; align-items: end; }
        .work-preamble { max-width: 60ch; }
        .work-counts {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .work-count {
          display: flex; flex-direction: column; gap: 0.3rem;
          padding: 0.7rem 1rem;
          border-left: 1px solid var(--hairline-strong);
        }
        .work-count:first-child { border-left-color: var(--amber); }
        .work-count .num {
          font-size: clamp(1.8rem, 2.8vw, 2.6rem);
          line-height: 1;
          font-variation-settings: 'opsz' 144, 'SOFT' 30, 'wght' 400;
          color: var(--paper-0);
        }

        /* ═══════ tier-rule ═══════ */
        .tier-rule {
          display: flex; justify-content: space-between;
          padding-block: 1rem 0.6rem;
          border-bottom: 1px solid var(--hairline-strong);
          margin-bottom: 2rem;
          margin-top: 4rem;
        }
        .tier-rule:first-of-type { margin-top: 2rem; }
        .tier-rule .t-meta:first-child { color: var(--amber); }

        /* ═══════ FLAGSHIP ═══════ */
        .work-flagship {
          display: flex; flex-direction: column;
          gap: 5rem;
        }
        .fl-grid { row-gap: 2rem; column-gap: clamp(2rem, 4vw, 4rem); }
        .fl-1 .fl-info { order: 2; }
        .fl-1 .fl-preview { order: 1; }
        .fl-head {
          display: flex; align-items: baseline; gap: 1rem;
          margin-bottom: 0.8rem;
        }
        .fl-code { color: var(--amber); }
        .fl-title {
          font-size: clamp(2.5rem, 5.2vw, 4.4rem);
          line-height: 0.95;
          letter-spacing: -0.04em;
          font-variation-settings: 'opsz' 144, 'SOFT' 30, 'wght' 380;
          color: var(--paper-0);
          margin-bottom: 0.6rem;
        }
        .fl-tagline {
          color: var(--paper-1);
          margin-bottom: 1.5rem;
          max-width: 42ch;
        }
        .fl-meta {
          display: grid; gap: 0.4rem;
          margin-bottom: 1.4rem;
          padding-block: 0.8rem;
          border-block: 1px solid var(--hairline);
        }
        .fl-meta > div {
          display: grid; grid-template-columns: 80px 1fr; gap: 0.6rem;
        }
        .fl-meta dt {
          font-family: var(--font-mono);
          font-size: var(--t-mono-xs);
          color: var(--paper-3);
          letter-spacing: 0.08em;
        }
        .fl-meta dd {
          font-family: var(--font-mono);
          font-size: var(--t-mono-sm);
          color: var(--paper-0);
        }
        .fl-meta dd.amb { color: var(--amber); }
        .fl-meta dd a:hover { color: var(--amber); text-decoration: underline; }

        .fl-brief { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.4rem; }
        .fl-brief p {
          font-family: var(--font-body);
          font-size: var(--t-body-sm);
          line-height: 1.6;
          color: var(--paper-1);
          max-width: 56ch;
        }

        .fl-specs {
          display: flex; flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.6rem;
        }
        .fl-spec-row {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 0.8rem;
          padding-block: 0.4rem;
          border-bottom: 1px dashed var(--hairline);
        }
        .fl-spec-key { padding-top: 0.18rem; }
        .fl-spec-vals { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .fl-spec-val {
          padding: 0.18rem 0.5rem;
          font-size: var(--t-mono-xs);
          color: var(--paper-1);
          border: 1px solid var(--hairline);
          letter-spacing: 0;
        }

        .fl-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .fl-actions .cta {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.7rem 1rem;
          font-family: var(--font-mono);
          font-size: var(--t-mono-xs);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all var(--dur-fast) var(--ease-out-quart);
        }
        .fl-actions .cta-primary {
          background: var(--paper-0); color: var(--ink-0);
        }
        .fl-actions .cta-primary:hover { background: var(--amber); }
        .fl-actions .cta-secondary {
          background: transparent; color: var(--paper-0);
          border: 1px solid var(--hairline-strong);
        }
        .fl-actions .cta-secondary:hover { border-color: var(--amber); color: var(--amber); }

        /* ═══════ FLAGSHIP — preview blocks ═══════ */
        .fl-preview { align-self: stretch; min-height: 480px; }
        .fp {
          position: relative;
          height: 100%;
          min-height: 480px;
          border: 1px solid var(--hairline-strong);
          background:
            radial-gradient(ellipse at 30% 100%, color-mix(in oklch, var(--amber) 4%, transparent), transparent 65%),
            var(--ink-1);
          overflow: hidden;
        }
        .fp-corner {
          position: absolute;
          bottom: 0.8rem; left: 0.9rem; right: 0.9rem;
          display: flex; justify-content: flex-end;
          color: var(--paper-3);
          z-index: 4;
        }

        /* ─── FIGHTING ─── */
        .fp-fight { display: grid; grid-template-rows: auto 1fr auto; }
        .fp-grid {
          position: absolute; inset: 0;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(6, 1fr);
          gap: 1px;
          opacity: 0.3;
          z-index: 0;
        }
        .fp-grid i {
          background: color-mix(in oklch, var(--paper-0) calc((var(--gi) % 4) * 1.2%), transparent);
        }
        .fp-hud {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1rem;
          padding: 1.4rem 1.6rem;
          z-index: 2;
          align-items: center;
        }
        .fp-hp { display: flex; flex-direction: column; gap: 0.4rem; }
        .fp-hp-l .fp-bar span { background: linear-gradient(90deg, var(--amber), var(--signal)); }
        .fp-hp-r { align-items: flex-end; }
        .fp-hp-r .fp-bar { display: flex; justify-content: flex-end; }
        .fp-hp-r .fp-bar span { background: linear-gradient(270deg, var(--amber), var(--signal)); }
        .fp-label {
          font-family: var(--font-mono);
          font-size: var(--t-mono-xs);
          color: var(--paper-1);
          letter-spacing: 0.18em;
        }
        .fp-bar {
          height: 10px;
          background: var(--ink-3);
          border: 1px solid var(--hairline);
          width: min(220px, 100%);
          display: block;
        }
        .fp-bar span { display: block; height: 100%; }
        .fp-timer {
          font-family: var(--font-display);
          font-size: 4rem;
          font-variation-settings: 'opsz' 144, 'wght' 380;
          color: var(--amber);
          line-height: 1;
        }
        .fp-roster {
          display: grid;
          grid-template-columns: repeat(13, 1fr);
          gap: 0.3rem;
          padding: 1rem 1.6rem 1.8rem;
          z-index: 2;
          align-self: end;
        }
        .fp-slot {
          padding: 0.4rem 0.2rem;
          border: 1px solid var(--hairline);
          font-size: 0.6rem;
          text-align: center;
          letter-spacing: 0;
          background: color-mix(in oklch, var(--ink-2) 70%, transparent);
        }

        /* ─── TERMINAL ─── */
        .fp-term {
          display: flex; flex-direction: column;
          padding: 1.4rem 1.6rem 2rem;
        }
        .fp-term-top {
          display: flex; justify-content: space-between;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid var(--hairline);
          color: var(--paper-3);
        }
        .fp-term-body {
          margin-top: 1rem;
          font-size: 0.78rem;
          line-height: 1.7;
          color: var(--paper-0);
        }
        .fp-term-line { white-space: pre; }
        .fp-term-body .dim { color: var(--paper-3); }
        .fp-term-body .amb { color: var(--amber); }
        .fp-term-progress {
          margin-top: 1.4rem;
          padding: 1rem;
          border: 1px solid var(--hairline);
          background: var(--ink-0);
        }
        .fp-term-bar {
          height: 4px;
          background: var(--ink-3);
          overflow: hidden;
          margin-bottom: 0.6rem;
        }
        .fp-term-bar span {
          display: block;
          height: 100%;
          background: var(--amber);
          animation: fl-grow 2.6s var(--ease-out-quart) forwards;
        }
        @keyframes fl-grow {
          from { width: 0 !important; }
        }
        .fp-term-stat {
          display: flex; justify-content: space-between;
          font-size: var(--t-mono-xs);
          color: var(--paper-2);
        }
        .fp-term-stat .amb { color: var(--amber); }

        /* ─── MAP ─── */
        .fp-map { display: grid; grid-template-rows: 1fr auto; padding: 1.6rem; }
        .fp-map-svg {
          width: 100%; height: auto;
          color: var(--paper-0);
          align-self: stretch;
          max-height: 320px;
        }
        .fp-target {
          opacity: 0;
          animation: target-in 700ms var(--ease-out-quart) forwards;
          animation-delay: calc(var(--ti) * 120ms + 400ms);
        }
        @keyframes target-in {
          0%   { opacity: 0; transform: scale(0.5); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: scale(1); }
        }
        .fp-map-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4rem 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--hairline);
        }
        .fp-map-row {
          display: grid;
          grid-template-columns: 70px 1fr;
          gap: 0.4rem;
          align-items: baseline;
        }
        .fp-map-row .amb { color: var(--amber); }

        /* ═══════ PRODUCTION ═══════ */
        .work-production {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .pr {
          padding: 1.2rem 1.3rem 1.4rem;
          border: 1px solid var(--hairline-strong);
          background: var(--ink-1);
          display: flex; flex-direction: column;
          gap: 0.7rem;
          transition: background var(--dur-base) var(--ease-out-quart),
                      border-color var(--dur-base) var(--ease-out-quart);
        }
        .pr:hover {
          background: var(--ink-2);
          border-color: var(--hairline-amber);
        }
        .pr-head { display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; }
        .pr-code { color: var(--amber); }
        .pr-kind { color: var(--paper-2); }
        .pr-year { color: var(--paper-3); }
        .pr-title {
          font-size: clamp(1.5rem, 2.6vw, 2.2rem);
          font-variation-settings: 'opsz' 144, 'SOFT' 30, 'wght' 400;
          line-height: 1;
          color: var(--paper-0);
          letter-spacing: -0.025em;
        }
        .pr-summary {
          font-family: var(--font-body);
          font-size: var(--t-body-sm);
          line-height: 1.55;
          color: var(--paper-1);
        }
        .pr-stack { list-style: none; display: flex; flex-wrap: wrap; gap: 0.3rem; }
        .pr-stack li {
          padding: 0.18rem 0.5rem;
          font-size: var(--t-mono-xs);
          color: var(--paper-2);
          border: 1px solid var(--hairline);
          letter-spacing: 0;
        }
        .pr-links {
          margin-top: auto;
          padding-top: 0.7rem;
          border-top: 1px solid var(--hairline);
          display: flex; gap: 1.2rem;
        }
        .pr-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: var(--t-mono-xs);
          letter-spacing: 0.1em;
          color: var(--paper-0);
        }
        .pr-link.amb { color: var(--amber); }
        .pr-link:hover { color: var(--amber); }
        .pr-link-disabled { letter-spacing: 0.1em; }

        /* ═══════ UTILITIES ═══════ */
        .work-utility {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .ut {
          padding: 1rem 1.2rem 1.2rem;
          background: var(--ink-1);
          border: 1px dashed var(--hairline-strong);
          display: flex; flex-direction: column;
          gap: 0.5rem;
        }
        .ut-head { display: flex; justify-content: space-between; align-items: baseline; }
        .ut-code { color: var(--amber); font-size: var(--t-mono-xs); }
        .ut-year { color: var(--paper-3); }
        .ut-title {
          font-size: 1.5rem;
          font-variation-settings: 'opsz' 30, 'wght' 400;
          color: var(--paper-0);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .ut-summary {
          font-family: var(--font-body);
          font-size: var(--t-body-sm);
          line-height: 1.55;
          color: var(--paper-1);
        }
        .ut-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; color: var(--paper-2); font-size: var(--t-mono-xs); }
        .ut-stack span:not(:last-child)::after { content: '·'; margin-left: 0.5rem; color: var(--paper-3); }
        .ut-link {
          margin-top: auto;
          color: var(--paper-0);
          font-size: var(--t-mono-xs);
          letter-spacing: 0.1em;
        }
        .ut-link:hover { color: var(--amber); }

        /* ═══════ ARCHIVE ═══════ */
        .work-archive {
          list-style: none;
          border-top: 1px solid var(--hairline-strong);
        }
        .ar-row {
          display: grid;
          grid-template-columns: 80px 1fr 240px 60px 1fr;
          gap: 1.2rem;
          padding: 0.7rem 0.4rem;
          align-items: baseline;
          border-bottom: 1px solid var(--hairline);
        }
        .ar-code { color: var(--paper-3); }
        .ar-title {
          font-family: var(--font-display);
          font-variation-settings: 'opsz' 30, 'wght' 410;
          font-size: 1.05rem;
          color: var(--paper-1);
          letter-spacing: -0.015em;
        }
        .ar-stack { color: var(--paper-2); font-size: var(--t-mono-xs); letter-spacing: 0; }
        .ar-year { color: var(--paper-3); }
        .ar-note {
          font-family: var(--font-body);
          font-size: var(--t-body-sm);
          color: var(--paper-2);
        }

        /* ═══════ responsive ═══════ */
        @media (max-width: 1100px) {
          .fl-1 .fl-info { order: 1; }
          .fl-1 .fl-preview { order: 2; }
        }
        @media (max-width: 900px) {
          .work-counts { grid-template-columns: repeat(2, 1fr); }
          .work-production { grid-template-columns: 1fr; }
          .work-utility { grid-template-columns: 1fr; }
          .fl-preview { min-height: 380px; }
          .fp { min-height: 380px; }
          .ar-row { grid-template-columns: 60px 1fr 1fr; }
          .ar-stack, .ar-year { display: none; }
        }
        @media (max-width: 600px) {
          .work-counts { grid-template-columns: 1fr; }
          .work-count { border-left: 0; border-top: 1px solid var(--hairline-strong); padding: 0.6rem 0; }
          .work-count:first-child { border-top-color: var(--amber); }
          .fl-actions .cta { width: 100%; justify-content: center; }
          .ar-row { grid-template-columns: 1fr; gap: 0.2rem; padding-block: 0.9rem; }
        }
      `}</style>
    </section>
  );
}
