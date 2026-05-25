import { useEffect, useRef, useState } from 'react';
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

/**
 * LiveEmbed — mock browser chrome wrapping a real iframe to the live site.
 * Used for VTUBER KOMBAT (vtuberkombat.bzden4ik.ru).
 * iframe is scaled down so a larger virtual viewport fits in the preview box.
 */
function LiveEmbed({ url, label }) {
  const [loaded, setLoaded] = useState(false);
  const [tick, setTick] = useState(0); // bump to force iframe reload
  const iframeRef = useRef(null);
  const wrapRef = useRef(null);

  // Lazy mount — load iframe only when section enters viewport, saves CPU on initial paint
  const [shouldMount, setShouldMount] = useState(false);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          setShouldMount(true);
          io.disconnect();
        }
      }),
      { rootMargin: '300px 0px 300px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reload = () => {
    setLoaded(false);
    setTick((t) => t + 1);
  };

  return (
    <div className="fp fp-embed" ref={wrapRef}>
      {/* browser chrome */}
      <div className="emb-chrome">
        <div className="emb-traffic">
          <span className="emb-dot emb-red" />
          <span className="emb-dot emb-yel" />
          <span className="emb-dot emb-grn" />
        </div>
        <div className="emb-urlbar">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <path d="M3 5V3a2 2 0 0 1 4 0v2M2 5h6v4H2z"
                  fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square"/>
          </svg>
          <span className="emb-host t-mono">{url.replace(/^https?:\/\//, '')}</span>
          <span className="emb-status t-mono">200 · {loaded ? 'LOADED' : 'PROBING'}</span>
        </div>
        <button className="emb-reload" onClick={reload} aria-label="Reload preview">
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path d="M10 6a4 4 0 1 1-1.17-2.83M10 2v3H7"
                  fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
          </svg>
        </button>
      </div>

      {/* viewport — scaled iframe gives more virtual real estate */}
      <div className="emb-viewport">
        {!loaded && (
          <div className="emb-skeleton" aria-hidden>
            <span className="emb-skeleton-pulse" />
            <span className="t-meta emb-skeleton-label">{shouldMount ? 'CONNECTING' : 'STANDBY'} · {label}</span>
          </div>
        )}
        {shouldMount && (
          <iframe
            key={tick}
            ref={iframeRef}
            src={url}
            title={label}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0 }}
          />
        )}
      </div>

      {/* footer rail */}
      <div className="emb-foot">
        <span className="t-meta emb-foot-tag">
          <span className="emb-live-dot" /> LIVE PRODUCTION
        </span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="emb-foot-link t-mono">
          OPEN IN TAB ↗
        </a>
      </div>

      <div className="fp-corner t-meta">LIVE_EMBED · {url.replace(/^https?:\/\//, '')}</div>
    </div>
  );
}

/**
 * UploaderMock — pixel-perfect replica of YouDesktopUploader-3.
 * Pure visual showcase (no interaction). Auto-cycles through 3 screens:
 *   1) Gateway (Connect)
 *   2) Directories (FolderMapping)
 *   3) Changes (Diff viewer)
 * Genre: psychedelic cyber-brutalist · neon green/magenta/orange · scanlines.
 * Source: F:\ProjectHub\archive\YouDekstopUploader-3 (src/styles/globals.css)
 */
function UploaderMock() {
  const [screen, setScreen] = useState(0); // 0=connect, 1=mapping, 2=changes

  // auto-cycle every 9s — slower, calmer browsing
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setScreen((s) => (s + 1) % 3), 9000);
    return () => clearInterval(id);
  }, []);

  const isConnected = screen >= 1;

  return (
    <div className="fp fp-uploader">
      {/* scanline overlay */}
      <div className="upl-scanlines" aria-hidden />

      {/* ─── title bar ─── */}
      <div className="upl-titlebar">
        <div className="upl-tb-left">
          <span className="upl-hex">⬡</span>
          <span className="upl-appname">YOUDESKTOPUPLOADER</span>
          <span className={`upl-conn ${isConnected ? 'is-on' : ''}`}>
            <span className="upl-conn-dot" />
            <span>operator@demo-host</span>
            <span className="upl-conn-proto">[SFTP]</span>
          </span>
        </div>
        <div className="upl-tb-drag" />
        <div className="upl-tb-right">
          {isConnected && (
            <button className="upl-btn-disconnect">DISCONNECT</button>
          )}
          <button className="upl-wc">─</button>
          <button className="upl-wc">□</button>
          <button className="upl-wc upl-wc-close">✕</button>
        </div>
      </div>

      {/* ─── nav tabs (smooth slide-down when connected) ─── */}
      <div className={`upl-navbar ${isConnected ? 'is-on' : ''}`}>
        <button className={`upl-nav-tab ${screen === 1 ? 'upl-nav-tab-on' : ''}`}>DIRECTORIES</button>
        <button className={`upl-nav-tab ${screen === 2 ? 'upl-nav-tab-on' : ''}`}>
          CHANGES <span className="upl-change-badge">4</span>
        </button>
      </div>

      {/* ─── content — all 3 slots stay mounted, crossfade via opacity ─── */}
      <div className="upl-content">
        <div className={`upl-screen-slot ${screen === 0 ? 'is-on' : ''}`} aria-hidden={screen !== 0}>
          <UploaderConnectScreen />
        </div>
        <div className={`upl-screen-slot ${screen === 1 ? 'is-on' : ''}`} aria-hidden={screen !== 1}>
          <UploaderMappingScreen />
        </div>
        <div className={`upl-screen-slot ${screen === 2 ? 'is-on' : ''}`} aria-hidden={screen !== 2}>
          <UploaderChangesScreen />
        </div>
      </div>

      {/* ─── bottom bar ─── */}
      <div className="upl-bottombar">
        <button className="upl-console-toggle">▲ CONSOLE</button>
        <span className="upl-version">v1.0.0 // BICYCLE BUILD</span>
      </div>

      <div className="fp-corner t-meta upl-corner">PREVIEW · CYBER-BRUTALIST · SFTP/FTP SYNC</div>
    </div>
  );
}

/* ── SCREEN 1: CONNECT (The Gateway) — centered, MOUNT button ── */
function UploaderConnectScreen() {
  return (
    <div className="upl-screen upl-screen-connect">
      <div className="upl-conn-center">
        <div className="upl-hex-strip" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => {
            const op = i === 1 ? 0.95 : i === 2 ? 0.7 : i === 3 ? 0.55 : 0.18;
            return <span key={i} className="upl-hex-dot" style={{ opacity: op }}>⬡</span>;
          })}
        </div>
        <h1 className="upl-title-h1">THE GATEWAY</h1>
        <p className="upl-title-sub">// Establish uplink to remote host</p>

        <div className="upl-conn-card">
          <div className="upl-section-label">SAVED PROFILES</div>
          <div className="upl-profile-stack">
            {[
              { name: 'PRODUCTION',  host: '203.0.113.42:22',  proto: 'SFTP', active: true  },
              { name: 'STAGING',     host: '198.51.100.18:22', proto: 'SFTP', active: false },
            ].map((p) => (
              <div key={p.name} className={`upl-profile-card ${p.active ? 'is-active' : ''}`}>
                <div>
                  <div className="upl-profile-name">{p.name}</div>
                  <div className="upl-profile-meta">{p.host} [{p.proto}]</div>
                </div>
                <button className="upl-delete-btn">✕</button>
              </div>
            ))}
          </div>

          <div className="upl-section-label upl-section-label-spaced">PROTOCOL</div>
          <div className="upl-protocol-toggle">
            <button className="upl-proto-opt upl-proto-opt-on">SFTP</button>
            <button className="upl-proto-opt">FTP</button>
          </div>

          <div className="upl-form-row upl-form-row-spaced">
            <div className="upl-field upl-field-grow">
              <label className="upl-field-label">HOST / IP</label>
              <input className="upl-field-input upl-field-ghost" defaultValue="192.168.1.100" readOnly />
            </div>
            <div className="upl-field upl-field-port">
              <label className="upl-field-label">PORT</label>
              <input className="upl-field-input" defaultValue="22" readOnly />
            </div>
          </div>

          <div className="upl-form-row">
            <div className="upl-field upl-field-grow">
              <label className="upl-field-label">USERNAME</label>
              <input className="upl-field-input upl-field-ghost" defaultValue="root" readOnly />
            </div>
            <div className="upl-field upl-field-grow">
              <label className="upl-field-label">PASSWORD</label>
              <input className="upl-field-input upl-field-ghost" type="password" defaultValue="••••••••••" readOnly />
            </div>
          </div>

          <label className="upl-save-profile">
            <span className="upl-checkbox-box" data-on="false" />
            <span>SAVE PROFILE</span>
          </label>

          <div className="upl-actions">
            <button className="upl-btn upl-btn-outline">TEST CONNECTION</button>
            <button className="upl-btn upl-btn-mount">MOUNT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SCREEN 2: MAPPING (Directories) — per real screenshot ── */
function UploaderMappingScreen() {
  return (
    <div className="upl-screen upl-screen-mapping">
      <div className="upl-mapping-head">
        <h2 className="upl-mapping-title">THE MAPPING</h2>
        <p className="upl-mapping-sub">// Link local directory to remote host</p>
      </div>

      <div className="upl-recent">
        <div className="upl-recent-label">
          RECENT MAPPINGS <span className="upl-recent-hint">— click to open directly</span>
        </div>
        {[
          { l: 'C:\\Users\\operator\\Projects\\portal-app',       r: '/var/www/portal' },
          { l: 'C:\\Users\\operator\\Projects\\billing-api',      r: '/opt/billing-api' },
          { l: 'C:\\Users\\operator\\Projects\\worker-queue',     r: '/opt/worker-queue' },
          { l: 'C:\\Users\\operator\\Projects\\relay-server',     r: '/root/relay-server' },
          { l: 'C:\\Users\\operator\\Projects\\partner-site',     r: '/opt/partner-site' },
          { l: 'C:\\Users\\operator\\Projects\\staging-deploy',   r: '/opt/staging' },
          { l: 'C:\\Users\\operator\\Projects\\stream-overlay',   r: '/opt/stream-overlay' },
        ].map((m, i) => (
          <div key={i} className="upl-recent-row">
            <span className="upl-recent-local">{m.l}</span>
            <span className="upl-recent-arrow">⟷</span>
            <span className="upl-recent-remote">{m.r}</span>
            <button className="upl-recent-action" title="Edit">✎</button>
            <button className="upl-recent-action upl-recent-action-x" title="Remove">✕</button>
          </div>
        ))}
      </div>

      <div className="upl-pair">
        {/* LOCAL */}
        <div className="upl-panel">
          <div className="upl-panel-head">
            <span className="upl-panel-tag-text">LOCAL MACHINE</span>
            <span className="upl-panel-badge">YOUR PC</span>
          </div>
          <div className="upl-panel-body upl-panel-empty">
            <span className="upl-panel-empty-text">No folder selected</span>
          </div>
          <div className="upl-panel-foot-flat">
            <button className="upl-browse-btn">BROWSE FOLDER</button>
          </div>
        </div>

        <div className="upl-pair-dot" aria-hidden />

        {/* REMOTE */}
        <div className="upl-panel">
          <div className="upl-panel-head">
            <span className="upl-panel-tag-text">REMOTE HOST</span>
            <span className="upl-panel-badge is-cyan">SERVER</span>
          </div>
          <div className="upl-panel-body">
            <div className="upl-path-bar">
              <span className="upl-path-up">↑ ..</span>
              <span className="upl-path-current">/</span>
            </div>
            <div className="upl-tree">
              {['bin.usr-is-merged', 'boot', 'cdrom', 'dev', 'etc', 'home', 'lib.usr-is-merged'].map((n) => (
                <div key={n} className="upl-tree-row">
                  <span className="upl-tree-arrow">▸</span>
                  <span className="upl-tree-name">{n}</span>
                </div>
              ))}
            </div>
            <div className="upl-tree-selected">
              <span className="upl-tree-selected-label">Selected:</span>
              <span className="upl-tree-selected-path">/</span>
            </div>
          </div>
        </div>
      </div>

      <button className="upl-btn upl-btn-mount upl-btn-wide">
        <span className="upl-link-glyph">⊙</span> LINK &amp; CONTINUE
      </button>
    </div>
  );
}

/* ── SCREEN 3: CHANGES — left sidebar (files + deploy) + main diff per real UI ── */
function UploaderChangesScreen() {
  const files = [
    { n: 'index.html', sub: 'desktop-agent/webapp', on: true, focus: true },
    { n: 'sw.js',      sub: 'desktop-agent/webapp', on: true },
    { n: 'app.js',     sub: 'desktop-agent/webapp', on: true },
    { n: 'style.css',  sub: 'desktop-agent/webapp', on: true },
  ];
  const diffLines = [
    { ln1: '803', ln2: '803', ty: 'ctx', text: '</div>' },
    { ln1: '804', ln2: '804', ty: 'ctx', text: '' },
    { ln1: '805', ln2: '805', ty: 'ctx', text: '<!-- ===== BOARD IFRAME OVERLAY ===== -->' },
    { ln1: '806', ln2: '806', ty: 'ctx', text: '<div id="board-overlay" style="display:none;position:fixed;inset:0;z-index:9999;…' },
    { ln1: '807', ln2: '',    ty: 'del', text: '  <iframe id="board-iframe" style="width:100%;height:100%;border:none" src="about:blank"></iframe>' },
    { ln1: '',    ln2: '807', ty: 'add', text: '  <!-- Minimal titlebar для Electron когда открыта доска -->' },
    { ln1: '',    ln2: '808', ty: 'add', text: '  <div class="board-titlebar" id="boardTitlebar">' },
    { ln1: '',    ln2: '809', ty: 'add', text: '    <button class="board-titlebar-back" id="boardTitlebarBack" title="Назад">' },
    { ln1: '',    ln2: '810', ty: 'add', text: '      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="curr…' },
    { ln1: '',    ln2: '811', ty: 'add', text: '    </button>' },
    { ln1: '',    ln2: '812', ty: 'add', text: '    <div class="board-titlebar-logo">' },
    { ln1: '',    ln2: '813', ty: 'add', text: '      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="curr…' },
    { ln1: '',    ln2: '814', ty: 'add', text: '      <span>Доска</span>' },
    { ln1: '',    ln2: '815', ty: 'add', text: '    </div>' },
    { ln1: '',    ln2: '816', ty: 'add', text: '    <div class="board-titlebar-drag"></div>' },
    { ln1: '',    ln2: '817', ty: 'add', text: '    <div class="board-titlebar-controls">' },
    { ln1: '',    ln2: '818', ty: 'add', text: '      <button class="winctl-btn" id="boardWinMin" title="Свернуть">' },
    { ln1: '',    ln2: '819', ty: 'add', text: '        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M…' },
    { ln1: '',    ln2: '820', ty: 'add', text: '      </button>' },
    { ln1: '808', ln2: '831', ty: 'ctx', text: '</div>' },
    { ln1: '809', ln2: '832', ty: 'ctx', text: '<style>' },
    { ln1: '810', ln2: '833', ty: 'ctx', text: '@keyframes boardFadeIn{from{opacity:0;transform:scale(.98)}to{opacity:1;transfo…' },
    { ln1: '811', ln2: '834', ty: 'ctx', text: '</style>' },
  ];

  return (
    <div className="upl-screen-changes-wrap">
      {/* LEFT SIDEBAR */}
      <aside className="upl-chg-side">
        <div className="upl-chg-side-head">
          <span className="upl-chg-side-h">CHANGES</span>
          <span className="upl-chg-side-meta">4 files <span className="upl-chg-refresh">↻</span></span>
        </div>

        <div className="upl-chg-ignored">
          <div className="upl-chg-ignored-head">
            <span className="upl-chg-ignored-label">IGNORED: 4 patterns</span>
            <button className="upl-chg-ignored-clear">clear</button>
          </div>
        </div>

        <div className="upl-chg-selected-row">
          <span className="upl-checkbox-box" data-on="true" />
          <span className="upl-chg-selected-label">4/4 selected</span>
        </div>

        <div className="upl-chg-file-list">
          {files.map((f, i) => (
            <div key={i} className={`upl-chg-file ${f.focus ? 'is-focus' : ''}`}>
              <span className="upl-checkbox-box" data-on={f.on ? 'true' : 'false'} />
              <span className="upl-chg-file-mark">M</span>
              <div className="upl-chg-file-meta">
                <span className="upl-chg-file-name">{f.n}</span>
                <span className="upl-chg-file-sub">{f.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="upl-chg-deploy">
          <div className="upl-chg-deploy-label">POST-DEPLOY COMMAND</div>
          <div className="upl-chg-deploy-row">
            <input className="upl-chg-deploy-input" placeholder="e.g. cd /app && pm2 restart app" readOnly />
            <button className="upl-chg-deploy-save">SAVE</button>
          </div>
          <button className="upl-btn upl-btn-mount upl-btn-deploy">↑ DEPLOY (4)</button>
          <button className="upl-chg-sync">⇄ SYNC MANIFEST FROM SERVER</button>
        </div>
      </aside>

      {/* MAIN DIFF */}
      <div className="upl-diff-main">
        <div className="upl-diff-topbar">
          <span className="upl-diff-file">
            <span className="upl-diff-icon">▤</span> desktop-agent/webapp/index.html
          </span>
          <span className="upl-diff-badge upl-diff-badge-mod">MODIFIED</span>
        </div>

        <div className="upl-diff-renamed">
          <span className="upl-diff-icon">▤</span>
          <span className="upl-diff-renamed-text">desktop-agent/webapp/&#123;index.html Server (remote) → index.html Local&#125;</span>
          <span className="upl-diff-badge upl-diff-badge-rename">RENAMED</span>
        </div>

        <div className="upl-diff-body">
          <div className="upl-diff-hunk">@@ -803,9 +803,32 @@</div>
          {diffLines.map((line, i) => (
            <div key={i} className={`upl-diff-line upl-diff-${line.ty}`}>
              <span className="upl-diff-num">{line.ln1}</span>
              <span className="upl-diff-num">{line.ln2}</span>
              <span className="upl-diff-marker">{line.ty === 'add' ? '+' : line.ty === 'del' ? '−' : ' '}</span>
              <code className="upl-diff-code">{line.text}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Real YouDownload logo — 8-pointed star with two concentric rings ── */
function YDLogo({ size = 22, themed = true }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 256 256"
      aria-hidden
      className={`yd-logo ${themed ? 'yd-logo-themed' : ''}`}
    >
      <circle cx="128" cy="128" r="100" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.28"/>
      <circle cx="128" cy="128" r="80"  fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.14"/>
      <path d="M128 18 L140 116 L238 128 L140 140 L128 238 L116 140 L18 128 L116 116 Z" fill="currentColor"/>
      <circle cx="128" cy="128" r="6" fill="var(--yd-bg0)"/>
    </svg>
  );
}

/* ── YouDownload nav items (icons match the real app) ── */
const YD_NAV = [
  { id: 'download', icon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 16l-4-4h2.5V4h3v8H16l-4 4z"/><path d="M20 18H4"/>
    </svg>
  ) },
  { id: 'stream', icon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
    </svg>
  ) },
  { id: 'history', icon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>
    </svg>
  ) },
  { id: 'settings', icon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ) },
];

const YD_LABELS = {
  ru: {
    nav: { download: 'Скачать', stream: 'Стрим', history: 'История', settings: 'Настройки' },
    ready:    'Готов',
    eyebrow:  'СКАЧАТЬ',
    urlPh:    'Вставьте ссылку на YouTube видео…',
    paste:    'Вставить',
    fetch:    'Загрузить',
    fetching: 'Получение',
    hint:     'Поддерживается YouTube, YouTube Music, плейлисты',
    video:    'Видео',
    audio:    'Аудио',
    dlNow:    'СКАЧАТЬ СЕЙЧАС',
    queue:    'Очередь загрузки',
    downloading: 'Загрузка',
    complete: 'Завершено',
    views:    'просмотров',
    // Stream stub
    streamTitle: 'Стрим-режим',
    streamDesc:  'Запись Twitch и YouTube-стримов в реальном времени, маркеры, нарезка по таймкодам. Доступно только в desktop-версии — браузер не поддерживает прямой захват HLS/WebSocket-потоков.',
    streamFeatures: [
      'Запись активного стрима в фоне без обрыва',
      'Маркеры событий с привязкой к таймкодам',
      'Нарезка клипов по диапазону маркеров',
      'Twitch login через OAuth · YouTube cookies',
    ],
    streamCta: 'Скачать desktop-версию',
    // History
    histTitle: 'История загрузок',
    histItems: 'записей',
    histClear: 'Очистить',
    // Settings
    setTitle: 'Настройки',
    setTheme: 'Тема оформления',
    setFolder: 'Папка для загрузок',
    setBrowse: 'Обзор',
    setConcurrent: 'Одновременных загрузок',
    setCookies: 'Cookies из браузера',
    setCookiesHint: 'Используется для приватных видео, region-lock и age-restricted контента.',
    setCookiesNone: 'не использовать',
    setCookiesExtract: 'Извлечь',
    setEngine: 'Движок загрузки',
    setUpdate: 'Обновить',
  },
  en: {
    nav: { download: 'Download', stream: 'Stream', history: 'History', settings: 'Settings' },
    ready:    'Ready',
    eyebrow:  'DOWNLOAD',
    urlPh:    'Paste YouTube URL…',
    paste:    'Paste',
    fetch:    'Fetch',
    fetching: 'Fetching',
    hint:     'YouTube, YouTube Music, playlists supported',
    video:    'Video',
    audio:    'Audio',
    dlNow:    'DOWNLOAD NOW',
    queue:    'Download queue',
    downloading: 'Downloading',
    complete: 'Complete',
    views:    'views',
    // Stream stub
    streamTitle: 'Stream mode',
    streamDesc:  'Real-time Twitch and YouTube stream recording, markers, clip slicing by timecodes. Desktop-only — browsers cannot directly capture HLS/WebSocket streams.',
    streamFeatures: [
      'Background recording of live streams without dropouts',
      'Event markers with timecode anchors',
      'Slice clips by marker range',
      'Twitch OAuth login · YouTube cookies',
    ],
    streamCta: 'Download desktop build',
    // History
    histTitle: 'Download history',
    histItems: 'items',
    histClear: 'Clear',
    // Settings
    setTitle: 'Settings',
    setTheme: 'Theme',
    setFolder: 'Download folder',
    setBrowse: 'Browse',
    setConcurrent: 'Concurrent downloads',
    setCookies: 'Browser cookies',
    setCookiesHint: 'Used for private videos, region-locked and age-restricted content.',
    setCookiesNone: 'do not use',
    setCookiesExtract: 'Extract',
    setEngine: 'Download engine',
    setUpdate: 'Update',
  },
};

/* ── Sample completed history items for the History view ── */
const YD_FAKE_HISTORY = [
  { id: 'h1', title: 'Lo-fi mix · winter focus · 4K visualizer',  fmt: '4K · MP4 · 740 MB',     status: 'complete', seed: 0  },
  { id: 'h2', title: 'Building a Vite plugin from scratch',       fmt: '1080p · MP4 · 320 MB',  status: 'complete', seed: 7  },
  { id: 'h3', title: 'Why every CSS box has trauma',              fmt: '1080p · MP4 · 180 MB',  status: 'complete', seed: 14 },
  { id: 'h4', title: 'Berlin to Tokyo · drone footage [4K]',      fmt: '4K · MP4 · 980 MB',     status: 'complete', seed: 21 },
  { id: 'h5', title: 'Talk: edge cases in async pipelines',       fmt: '720p · MP4 · 142 MB',   status: 'complete', seed: 28 },
  { id: 'h6', title: 'Live · age-restricted (cookies missing)',   fmt: '— · failed',            status: 'error',    seed: 35 },
  { id: 'h7', title: 'Music mix · ambient · sleep playlist',      fmt: 'MP3 · 320 kbps · 88 MB', status: 'complete', seed: 42 },
  { id: 'h8', title: 'Stream VOD · cancelled by user',            fmt: '1080p · cancelled',     status: 'cancelled', seed: 49 },
];

/**
 * AppMock — pixel-perfect replica of the actual YouDownload application.
 *   - title bar (38px) with traffic-light + Orbitron wordmark
 *   - left sidebar (220px) with YOU/DOWNLOAD logo, 4 nav items
 *     (download/stream/history/settings), RU/EN lang toggle, status row, version
 *   - main area: URL section with paste/fetch, video info card 130×73 thumb,
 *     format tabs (video/audio), quality grid (4K / 1440p / 1080p / 720p / 480p / 360p),
 *     DOWNLOAD NOW button with sheen sweep, queue with active dl-card
 *   - two themes: FleetWatch (green/blue neon) & Vulnerable Apathy
 *     (pink/blue glassmorphism with drifting orbs)
 * Source: github.com/warfa/YouDownload — src/renderer/src/globals.css + App.tsx
 */
function AppMock() {
  const [theme, setTheme] = useState('fleet'); // 'fleet' | 'apathy'
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | analyzing | ready | downloading | complete
  const [video, setVideo] = useState(null);
  const [quality, setQuality] = useState('1080p');
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [eta, setEta] = useState(0);
  const [lang, setLang] = useState('RU');
  const [navView, setNavView] = useState('download');
  const userInteracted = useRef(false);

  const sample = SAMPLE_URLS[0];

  /* ─── analyze: simulate metadata probe ─── */
  useEffect(() => {
    if (phase !== 'analyzing') return;
    const t = setTimeout(() => {
      setVideo(generateVideo(url || sample));
      setPhase('ready');
    }, 900 + Math.random() * 400);
    return () => clearTimeout(t);
  }, [phase, url, sample]);

  /* ─── download: progress 0 → 100 over ~8s, jittery speed ─── */
  useEffect(() => {
    if (phase !== 'downloading') return;
    const startedAt = performance.now();
    const totalDur = 7200 + Math.random() * 1600;
    const totalMB = video ? video.sizeMB : 420;
    let raf = 0;
    const step = (now) => {
      const t = Math.min(1, (now - startedAt) / totalDur);
      const eased = 1 - Math.pow(1 - t, 1.4);
      const p = Math.floor(eased * 100);
      setProgress(p);
      // speed jitter — peaks ~ 18-22 MB/s, lulls ~ 8-11
      const baseSpeed = 14 + Math.sin(t * 7) * 5;
      const jitter = (Math.random() - 0.5) * 2.4;
      setSpeed(Math.max(2, baseSpeed + jitter));
      const remainingMB = totalMB * (1 - eased);
      setEta(Math.ceil(remainingMB / Math.max(2, baseSpeed + jitter)));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setPhase('complete');
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase, video]);

  /* ─── complete: linger for 2.5s on the finished card, then reset ─── */
  useEffect(() => {
    if (phase !== 'complete' || !video) return;
    const t = setTimeout(() => {
      setUrl('');
      setVideo(null);
      setProgress(0);
      setPhase('idle');
    }, 2400);
    return () => clearTimeout(t);
  }, [phase, video]);

  /* ─── auto-demo: if user hasn't touched anything, run a loop ─── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let to = null;
    let urlIdx = 0;

    const typeUrl = (target) => {
      let i = 0;
      const typed = () => {
        if (cancelled || userInteracted.current) return;
        if (i <= target.length) {
          setUrl(target.slice(0, i));
          i++;
          to = setTimeout(typed, 28 + Math.random() * 32);
        } else {
          to = setTimeout(() => { if (!userInteracted.current) setPhase('analyzing'); }, 480);
        }
      };
      typed();
    };

    const loop = () => {
      if (cancelled || userInteracted.current) return;
      // pick next sample
      const target = SAMPLE_URLS[urlIdx % SAMPLE_URLS.length];
      urlIdx++;
      typeUrl(target);
    };

    // initial pause then start
    to = setTimeout(loop, 1800);

    // schedule next cycle after each complete
    return () => { cancelled = true; if (to) clearTimeout(to); };
  }, []);

  /* When phase reaches 'ready', auto-press download in demo mode */
  useEffect(() => {
    if (phase === 'ready' && !userInteracted.current) {
      const t = setTimeout(() => {
        if (!userInteracted.current) setPhase('downloading');
      }, 900);
      return () => clearTimeout(t);
    }
  }, [phase]);

  /* When phase resets to 'idle' in demo, schedule another loop */
  useEffect(() => {
    if (phase !== 'idle') return;
    if (userInteracted.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let urlIdx = Math.floor(Math.random() * SAMPLE_URLS.length);
    const target = SAMPLE_URLS[urlIdx];
    let i = 0;
    let to = setTimeout(function typed() {
      if (userInteracted.current) return;
      if (i <= target.length) {
        setUrl(target.slice(0, i));
        i++;
        to = setTimeout(typed, 28 + Math.random() * 32);
      } else {
        to = setTimeout(() => { if (!userInteracted.current) setPhase('analyzing'); }, 480);
      }
    }, 2400);
    return () => clearTimeout(to);
  }, [phase]);

  const handleInput = (e) => {
    userInteracted.current = true;
    setUrl(e.target.value);
  };

  const handleAnalyze = () => {
    userInteracted.current = true;
    if (!url || phase !== 'idle') return;
    setPhase('analyzing');
  };

  const handleDownload = () => {
    userInteracted.current = true;
    if (phase !== 'ready') return;
    setPhase('downloading');
  };

  const toggleTheme = () => {
    userInteracted.current = true;
    setTheme((t) => (t === 'fleet' ? 'apathy' : 'fleet'));
  };

  const toggleLang = () => { userInteracted.current = true; setLang((l) => (l === 'RU' ? 'EN' : 'RU')); };

  const L = lang === 'RU' ? YD_LABELS.ru : YD_LABELS.en;

  return (
    <div className={`fp fp-app yd-root yd-theme-${theme}`} data-yd-theme={theme}>
      {/* drifting glow orbs — apathy theme only */}
      {theme === 'apathy' && (
        <div className="yd-orbs" aria-hidden>
          <div className="yd-orb yd-orb-1" />
          <div className="yd-orb yd-orb-2" />
          <div className="yd-orb yd-orb-3" />
        </div>
      )}

      {/* ─── title bar ─── */}
      <div className="yd-titlebar">
        <div className="yd-tb-drag">
          <span className="yd-tb-star"><YDLogo size={14} /></span>
          <span className="yd-tb-name">YOUDOWNLOAD</span>
          <button className="yd-theme-toggle" onClick={toggleTheme} title={`Theme: ${theme === 'fleet' ? 'FleetWatch' : 'Vulnerable Apathy'}`}>
            <span className="yd-theme-name">{theme === 'fleet' ? 'FleetWatch' : 'Vulnerable Apathy'}</span>
            <span className="yd-theme-dot" />
          </button>
        </div>
        <div className="yd-tb-ctrls">
          <button className="yd-wc-btn" aria-label="Minimize">
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 5h10" stroke="currentColor"/></svg>
          </button>
          <button className="yd-wc-btn" aria-label="Maximize">
            <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor"/></svg>
          </button>
          <button className="yd-wc-btn yd-wc-close" aria-label="Close">
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 0L10 10M10 0L0 10" stroke="currentColor"/></svg>
          </button>
        </div>
      </div>

      <div className="yd-body">
        {/* ─── sidebar ─── */}
        <aside className="yd-sidebar">
          <div className="yd-sb-logo">
            <span className="yd-sb-star"><YDLogo size={24} /></span>
            <div className="yd-sb-wordmark">
              <span className="yd-sb-you">YOU</span>
              <span className="yd-sb-dl">DOWNLOAD</span>
            </div>
          </div>

          <div className="yd-sb-divider" />

          <nav className="yd-sb-nav">
            {YD_NAV.map((it) => (
              <button
                key={it.id}
                className={`yd-sb-item ${navView === it.id ? 'yd-sb-item-active' : ''}`}
                onClick={() => { userInteracted.current = true; setNavView(it.id); }}
              >
                <span className="yd-sb-indicator" />
                <span className="yd-sb-icon">{it.icon}</span>
                <span className="yd-sb-label">{L.nav[it.id]}</span>
                {it.id === 'download' && phase === 'downloading' && <span className="yd-sb-badge">1</span>}
              </button>
            ))}
          </nav>

          <div className="yd-sb-footer">
            <button className="yd-lang-toggle" onClick={toggleLang}>
              <span className={`yd-lang-opt ${lang === 'RU' ? 'yd-lang-opt-on' : ''}`}>RU</span>
              <span className="yd-lang-sep" />
              <span className={`yd-lang-opt ${lang === 'EN' ? 'yd-lang-opt-on' : ''}`}>EN</span>
            </button>
            <div className="yd-sb-status-row">
              <span className="yd-sb-dot" />
              <span className="yd-sb-ready">{L.ready}</span>
            </div>
            <div className="yd-sb-version">v1.1.5</div>
          </div>
        </aside>

        {/* ─── main panel — switches by navView ─── */}
        <main className="yd-main">
          {navView !== 'download' && (
            <div className="yd-eyebrow">
              <span>{L.nav[navView].toUpperCase()}</span>
              <span className="yd-eb-line" />
            </div>
          )}

          {/* ─── STREAM (stub) ─── */}
          {navView === 'stream' && (
            <div className="yd-stream-stub">
              <div className="yd-stub-logo"><YDLogo size={64} /></div>
              <h2 className="yd-stub-title">{L.streamTitle}</h2>
              <p className="yd-stub-desc">{L.streamDesc}</p>
              <div className="yd-stub-features">
                {L.streamFeatures.map((f, i) => (
                  <div key={i} className="yd-stub-feat">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <polyline points="2 6 5 9 10 3"/>
                    </svg>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://github.com/warfa/YouDownload/releases"
                target="_blank" rel="noopener noreferrer"
                className="yd-stub-cta"
                onClick={(e) => { userInteracted.current = true; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 16l-4-4h2.5V4h3v8H16l-4 4zM20 18H4"/></svg>
                {L.streamCta}
              </a>
            </div>
          )}

          {/* ─── HISTORY ─── */}
          {navView === 'history' && (
            <div className="yd-hist-view">
              <div className="yd-hist-head">
                <h2 className="yd-section-title">{L.histTitle}</h2>
                <span className="yd-hist-count">{YD_FAKE_HISTORY.length} {L.histItems}</span>
                <button className="yd-hist-clear">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
                  </svg>
                  {L.histClear}
                </button>
              </div>
              <div className="yd-hist-list">
                {YD_FAKE_HISTORY.map((h) => (
                  <div key={h.id} className={`yd-hist-item yd-hist-${h.status}`}>
                    <div className="yd-hist-thumb">
                      <div className="yd-thumb-grid yd-thumb-grid-mini">
                        {Array.from({ length: 6 * 4 }).map((_, i) => <i key={i} style={{ '--gi': i + h.seed }} />)}
                      </div>
                    </div>
                    <div className="yd-hist-meta">
                      <span className="yd-hist-title">{h.title}</span>
                      <span className="yd-hist-fmt">{h.fmt}</span>
                    </div>
                    <span className={`yd-hist-icon yd-hist-icon-${h.status}`}>
                      {h.status === 'complete' ? '✓' : h.status === 'error' ? '✗' : '–'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SETTINGS ─── */}
          {navView === 'settings' && (
            <div className="yd-set-view">
              <h2 className="yd-section-title">{L.setTitle}</h2>

              {/* Theme cards */}
              <div className="yd-set-group">
                <div className="yd-set-label">{L.setTheme}</div>
                <div className="yd-theme-cards">
                  <button
                    className={`yd-tc ${theme === 'fleet' ? 'yd-tc-on' : ''}`}
                    onClick={() => { userInteracted.current = true; setTheme('fleet'); }}
                  >
                    <div className="yd-tc-preview yd-tc-fleet">
                      <div className="yd-tc-sb">
                        <div className="yd-tc-dot" />
                        <div className="yd-tc-line yd-tc-line-on" />
                        <div className="yd-tc-line" />
                        <div className="yd-tc-line" />
                      </div>
                      <div className="yd-tc-main">
                        <div className="yd-tc-bar"><div className="yd-tc-bar-fill" /></div>
                        <div className="yd-tc-accent" />
                        <div className="yd-tc-bar" style={{ width: '70%' }}>
                          <div className="yd-tc-bar-fill" style={{ width: '35%', background: '#38BDF8' }} />
                        </div>
                      </div>
                    </div>
                    <div className="yd-tc-foot">
                      <span className="yd-tc-name">FleetWatch</span>
                      {theme === 'fleet' && <span className="yd-tc-check"><svg viewBox="0 0 10 8" fill="none"><polyline points="1 4 3.5 6.5 9 1" stroke="#000" strokeWidth="1.5"/></svg></span>}
                    </div>
                  </button>

                  <button
                    className={`yd-tc ${theme === 'apathy' ? 'yd-tc-on' : ''}`}
                    onClick={() => { userInteracted.current = true; setTheme('apathy'); }}
                  >
                    <div className="yd-tc-preview yd-tc-apathy">
                      <div className="yd-tc-ap-orb1" />
                      <div className="yd-tc-ap-orb2" />
                      <div className="yd-tc-sb">
                        <div className="yd-tc-dot" style={{ background: '#FF3B7C' }} />
                        <div className="yd-tc-line yd-tc-line-on" style={{ background: '#FF3B7C' }} />
                        <div className="yd-tc-line" />
                        <div className="yd-tc-line" />
                      </div>
                      <div className="yd-tc-main">
                        <div className="yd-tc-bar"><div className="yd-tc-bar-fill" style={{ background: '#FF3B7C' }} /></div>
                        <div className="yd-tc-accent" style={{ background: '#FF3B7C' }} />
                        <div className="yd-tc-bar" style={{ width: '70%' }}>
                          <div className="yd-tc-bar-fill" style={{ width: '35%', background: '#4D7CFF' }} />
                        </div>
                      </div>
                    </div>
                    <div className="yd-tc-foot">
                      <span className="yd-tc-name">Vulnerable Apathy</span>
                      {theme === 'apathy' && <span className="yd-tc-check"><svg viewBox="0 0 10 8" fill="none"><polyline points="1 4 3.5 6.5 9 1" stroke="#000" strokeWidth="1.5"/></svg></span>}
                    </div>
                  </button>
                </div>
              </div>

              {/* Folder */}
              <div className="yd-set-group">
                <div className="yd-set-label">{L.setFolder}</div>
                <div className="yd-set-row">
                  <input className="yd-set-input" value="C:\Users\Denis\Downloads\YouDownload" readOnly />
                  <button className="yd-set-browse">{L.setBrowse}</button>
                </div>
              </div>

              {/* Concurrent */}
              <div className="yd-set-group">
                <div className="yd-set-label">{L.setConcurrent}</div>
                <div className="yd-set-radios">
                  {[1, 2, 3, 5, 10, 20].map((n) => (
                    <button key={n} className={`yd-set-radio ${n === 3 ? 'yd-set-radio-on' : ''}`}>{n}</button>
                  ))}
                  <button className="yd-set-radio">∞</button>
                </div>
              </div>

              {/* Cookies */}
              <div className="yd-set-group">
                <div className="yd-set-label">{L.setCookies}</div>
                <p className="yd-set-hint">{L.setCookiesHint}</p>
                <div className="yd-set-row">
                  <select className="yd-set-input" defaultValue="chrome">
                    <option value="none">— {L.setCookiesNone} —</option>
                    <option value="chrome">Chrome</option>
                    <option value="firefox">Firefox</option>
                    <option value="edge">Edge</option>
                    <option value="brave">Brave</option>
                  </select>
                  <button className="yd-set-browse">{L.setCookiesExtract}</button>
                </div>
              </div>

              {/* yt-dlp version */}
              <div className="yd-set-group">
                <div className="yd-set-label">{L.setEngine}</div>
                <div className="yd-set-row">
                  <input className="yd-set-input" value="yt-dlp 2024.11.04 · ffmpeg 7.1" readOnly />
                  <button className="yd-set-browse">{L.setUpdate}</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── DOWNLOAD (the default view) ─── */}
          {navView === 'download' && <>
          <div className="yd-eyebrow">
            <span>{L.eyebrow}</span>
            <span className="yd-eb-line" />
          </div>

          {/* URL SECTION */}
          <div className="yd-url-section">
            <div className="yd-url-row">
              <span className="yd-url-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>
              </span>
              <input
                type="text"
                value={url}
                onChange={handleInput}
                placeholder={L.urlPh}
                className="yd-url-input"
                disabled={phase === 'analyzing' || phase === 'downloading'}
              />
              <button className="yd-btn-paste" onClick={() => { userInteracted.current = true; setUrl(SAMPLE_URLS[0]); }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="3" width="10" height="4" rx="1"/><path d="M5 7h14v14H5z"/></svg>
                {L.paste}
              </button>
              <button
                className="yd-btn-fetch"
                onClick={handleAnalyze}
                disabled={!url || phase !== 'idle'}
              >
                {phase === 'analyzing' ? <span className="yd-spin" /> : (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                )}
                {phase === 'analyzing' ? L.fetching : L.fetch}
              </button>
            </div>
            <div className="yd-url-hint">{L.hint}</div>
          </div>

          {/* VIDEO INFO CARD */}
          {(phase === 'analyzing' || video) && (
            phase === 'analyzing' && !video ? (
              <div className="yd-vi-card yd-vi-skel">
                <div className="yd-skel-thumb" />
                <div className="yd-skel-body">
                  <div className="yd-skel-line yd-w80" />
                  <div className="yd-skel-line yd-w55" />
                  <div className="yd-skel-line yd-w35" />
                </div>
              </div>
            ) : (
              <div className="yd-vi-card">
                <div className="yd-vi-thumb-wrap">
                  <div className="yd-vi-thumb-ph">
                    <div className="yd-thumb-grid">
                      {Array.from({ length: 8 * 5 }).map((_, i) => <i key={i} style={{ '--gi': i }} />)}
                    </div>
                  </div>
                  <span className="yd-vi-dur">{video?.duration}</span>
                </div>
                <div className="yd-vi-meta">
                  <div className="yd-vi-title">{video?.title}</div>
                  <div className="yd-vi-stats">
                    <span className="yd-vi-channel">{video?.channel}</span>
                    <span className="yd-vi-dot">●</span>
                    <span className="yd-vi-views">{video?.views} {L.views}</span>
                    <span className="yd-vi-dot">●</span>
                    <span className="yd-vi-channel">{video?.uploaded}</span>
                  </div>
                </div>
              </div>
            )
          )}

          {/* FORMAT SECTION */}
          {video && phase === 'ready' && (
            <div className="yd-fmt-section">
              <div className="yd-fmt-tabs">
                <button className="yd-fmt-tab yd-fmt-tab-on">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-4v12l-6-4z"/></svg>
                  {L.video}
                </button>
                <button className="yd-fmt-tab">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V6l12-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                  {L.audio}
                </button>
              </div>

              <div className="yd-quality-grid">
                {[
                  { q: '4K',    fmt: 'MP4', sub: '~720MB' },
                  { q: '1440p', fmt: 'MP4', sub: '~480MB' },
                  { q: '1080p', fmt: 'MP4', sub: '~320MB' },
                  { q: '720p',  fmt: 'MP4', sub: '~180MB' },
                  { q: '480p',  fmt: 'MP4', sub: '~95MB'  },
                  { q: '360p',  fmt: 'MP4', sub: '~50MB'  },
                ].map((qq) => (
                  <button
                    key={qq.q}
                    className={`yd-q-btn ${quality === qq.q ? 'yd-q-btn-on' : ''}`}
                    onClick={() => { userInteracted.current = true; setQuality(qq.q); }}
                  >
                    <span className="yd-q-main">{qq.q}</span>
                    <span className="yd-q-badge">{qq.fmt}</span>
                    <span className="yd-q-sub">{qq.sub}</span>
                  </button>
                ))}
              </div>

              <button className="yd-dl-now-btn" onClick={handleDownload}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 16l-4-4h2.5V4h3v8H16l-4 4zM20 18H4"/></svg>
                {L.dlNow}
                <span className="yd-dl-now-q">{quality}</span>
              </button>
            </div>
          )}

          {/* QUEUE — only when downloading or complete */}
          {(phase === 'downloading' || phase === 'complete') && video && (
            <div className="yd-queue-section">
              <div className="yd-queue-head">
                <span className="yd-eyebrow-sm">{L.queue}</span>
                <span className="yd-queue-badge">1</span>
              </div>
              <div className="yd-queue-list">
                <div className={`yd-dl-card ${phase === 'complete' ? 'yd-dl-complete' : 'yd-dl-downloading'}`}>
                  <div className="yd-dl-thumb">
                    <div className="yd-thumb-grid yd-thumb-grid-mini">
                      {Array.from({ length: 6 * 4 }).map((_, i) => <i key={i} style={{ '--gi': i }} />)}
                    </div>
                  </div>
                  <div className="yd-dl-body">
                    <div className="yd-dl-top">
                      <div className="yd-dl-title">{video.title}</div>
                      <div className="yd-dl-acts">
                        <button className="yd-dl-act">
                          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 0L10 10M10 0L0 10" stroke="currentColor" strokeWidth="1.4"/></svg>
                        </button>
                      </div>
                    </div>
                    <div className="yd-dl-info-row">
                      <span className="yd-dl-fmt">{quality} · MP4</span>
                      <span className="yd-dl-status-tag">
                        <span className="yd-dl-sdot" style={{ background: phase === 'complete' ? 'var(--yd-g)' : 'var(--yd-g)' }} />
                        {phase === 'complete' ? L.complete : L.downloading}
                      </span>
                      <span className="yd-dl-speed">{speed.toFixed(1)} MB/s</span>
                      <span className="yd-dl-eta">ETA {String(Math.floor(eta / 60)).padStart(2, '0')}:{String(eta % 60).padStart(2, '0')}</span>
                      <span className="yd-dl-pct">{progress}%</span>
                    </div>
                    <div className="yd-dl-track">
                      <div className="yd-dl-bar" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </>}
        </main>
      </div>

      <div className="fp-corner t-meta">REPLICA · {`yt-dlp v2024.11.04 · ffmpeg 7.1`}</div>
    </div>
  );
}

const SAMPLE_URLS = [
  'https://youtube.com/watch?v=dQw4w9WgXcQ',
  'https://youtu.be/jNQXAC9IVRw',
  'https://youtube.com/watch?v=lWA2pjMjpBs',
  'https://youtube.com/playlist?list=PLxA687tYuMWi5JqJlH8VxKshLpEqf3HhU',
];
const SAMPLE_VIDEOS = [
  { title: 'Lo-fi mix · winter focus · 4K visualizer', channel: 'midnight-static',  views: '847K', uploaded: '2 weeks',  duration: '1:42:18', fmt: 'MP4 · 2160p', sizeMB: 740 },
  { title: 'Building a Vite plugin from scratch',     channel: 'compose-dev',       views: '23K',  uploaded: '3 days',   duration: '47:02',   fmt: 'MP4 · 1080p', sizeMB: 320 },
  { title: 'Why every CSS box has trauma',            channel: 'web-archaeology',   views: '156K', uploaded: '5 months', duration: '12:38',   fmt: 'MP4 · 1080p', sizeMB: 180 },
  { title: 'Berlin to Tokyo · drone footage [4K]',    channel: 'sky-passage',       views: '1.2M', uploaded: '1 year',   duration: '23:45',   fmt: 'MP4 · 2160p', sizeMB: 980 },
];
function generateVideo(url) {
  const idx = Math.floor(Math.random() * SAMPLE_VIDEOS.length);
  const base = SAMPLE_VIDEOS[idx];
  return { ...base, id: Math.random().toString(36).slice(2), url };
}
/* (YD_NAV / YD_LABELS moved above AppMock — JS const has no hoisting) */

/**
 * ArchitectureDiagram — SVG of distributed-system nodes with animated
 * data-flow particles riding along the connection paths, plus a live
 * activity log driven by a setInterval ticker.
 * Used for GotIt — its story IS the architecture.
 */
function ArchitectureDiagram() {
  const [events, setEvents] = useState(() => seedInitialEvents());
  const [time, setTime] = useState(() => fmtClock(new Date()));

  // tick clock every second
  useEffect(() => {
    const id = setInterval(() => setTime(fmtClock(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  // emit a new event every 3.5-5.5s — staggered, not metronomic
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let to = null;
    const tick = () => {
      if (cancelled) return;
      setEvents((prev) => [generateEvent(), ...prev].slice(0, 14));
      to = setTimeout(tick, 3500 + Math.random() * 2000);
    };
    to = setTimeout(tick, 2200);
    return () => { cancelled = true; if (to) clearTimeout(to); };
  }, []);

  return (
    <div className="fp fp-arch">
      <div className="arch-head">
        <span className="t-meta arch-head-l">ARCHITECTURE / 06 NODES</span>
        <span className="t-mono arch-head-r tabular">{time}</span>
      </div>

      <svg className="arch-svg" viewBox="0 0 360 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          {/* flow paths — invisible by themselves, particles ride along them */}
          <path id="f-user-front"  d="M 38 50 L 92 50" />
          <path id="f-front-api"   d="M 132 50 L 178 50" />
          <path id="f-api-db"      d="M 222 50 L 268 50" />
          <path id="f-sched-api"   d="M 200 92 L 200 70" />
          <path id="f-sched-parse" d="M 222 100 L 268 100" />
          <path id="f-parse-db"    d="M 290 92 L 290 70" />
          <path id="f-api-bot"     d="M 200 70 L 200 142" />
          <path id="f-bot-tg"      d="M 222 150 L 268 150" />
          <path id="f-tg-front"    d="M 290 142 L 290 80 L 112 80 L 112 60" />
        </defs>

        {/* connection lines — render the path data inline so they're visible */}
        <g className="arch-lines" stroke="var(--paper-3)" strokeWidth="0.4" fill="none" strokeLinecap="square">
          <path d="M 38 50 L 92 50" />
          <path d="M 132 50 L 178 50" />
          <path d="M 222 50 L 268 50" />
          <path d="M 200 92 L 200 70" />
          <path d="M 222 100 L 268 100" />
          <path d="M 290 92 L 290 70" />
          <path d="M 200 70 L 200 142" />
          <path d="M 222 150 L 268 150" />
          <path d="M 290 142 L 290 80 L 112 80 L 112 60" />
        </g>

        {/* arrowheads */}
        <g className="arch-arrows" fill="var(--paper-3)">
          <polygon points="92,48 96,50 92,52" />
          <polygon points="178,48 182,50 178,52" />
          <polygon points="268,48 272,50 268,52" />
          <polygon points="198,70 200,66 202,70" />
          <polygon points="268,98 272,100 268,102" />
          <polygon points="288,70 290,66 292,70" />
          <polygon points="198,142 200,146 202,142" />
          <polygon points="268,148 272,150 268,152" />
          <polygon points="110,60 112,56 114,60" />
        </g>

        {/* nodes — each is a labeled rect */}
        {[
          { x: 8,   y: 38, w: 30, h: 24, code: 'U',   label: 'USER',    cls: 'edge' },
          { x: 92,  y: 38, w: 40, h: 24, code: 'FE',  label: 'FRONT',   cls: 'core' },
          { x: 178, y: 38, w: 44, h: 24, code: 'API', label: 'REST',    cls: 'core' },
          { x: 268, y: 38, w: 42, h: 24, code: 'DB',  label: 'SQLITE',  cls: 'core' },
          { x: 178, y: 92, w: 44, h: 16, code: 'SCH', label: 'CRON',    cls: 'service' },
          { x: 268, y: 92, w: 42, h: 16, code: 'PRS', label: 'PARSER',  cls: 'service' },
          { x: 178, y: 142,w: 44, h: 16, code: 'BOT', label: 'TG-BOT',  cls: 'service' },
          { x: 268, y: 142,w: 42, h: 16, code: 'TGU', label: 'TG USR',  cls: 'edge' },
        ].map((n) => (
          <g key={n.code} className={`arch-node arch-node-${n.cls}`}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="0" />
            <text x={n.x + n.w / 2} y={n.y + n.h / 2 - 2} className="arch-code">{n.code}</text>
            <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 6} className="arch-label">{n.label}</text>
          </g>
        ))}

        {/* particles — bone for user-facing, amber for service flows */}
        {[
          { path: 'f-user-front',  dur: 1.4, delay: 0,   colour: 'paper' },
          { path: 'f-front-api',   dur: 1.2, delay: 0.4, colour: 'paper' },
          { path: 'f-api-db',      dur: 1.0, delay: 0.7, colour: 'paper' },
          { path: 'f-sched-api',   dur: 1.6, delay: 0.1, colour: 'amber' },
          { path: 'f-sched-parse', dur: 1.3, delay: 0.5, colour: 'amber' },
          { path: 'f-parse-db',    dur: 1.1, delay: 0.9, colour: 'amber' },
          { path: 'f-api-bot',     dur: 1.8, delay: 0.3, colour: 'amber' },
          { path: 'f-bot-tg',      dur: 1.3, delay: 0.6, colour: 'amber' },
          { path: 'f-tg-front',    dur: 2.4, delay: 0.2, colour: 'paper' },
        ].map((p, i) => (
          <circle
            key={i}
            r="1.8"
            fill={p.colour === 'amber' ? 'var(--amber)' : 'var(--paper-0)'}
            className="arch-particle"
          >
            <animateMotion dur={`${p.dur * 2.1}s`} begin={`${p.delay}s`} repeatCount="indefinite">
              <mpath href={`#${p.path}`} />
            </animateMotion>
          </circle>
        ))}

        {/* edge label — "fetta.app" attached to PRS */}
        <text x="332" y="103" className="arch-side-label" textAnchor="middle">fetta.app</text>
        <line x1="312" y1="100" x2="324" y2="100" stroke="var(--paper-3)" strokeWidth="0.4" strokeDasharray="1 1.5" />
      </svg>

      {/* live activity log */}
      <div className="arch-log">
        <div className="arch-log-head">
          <span className="t-meta">LIVE / 00:00:01 STREAM</span>
          <span className="t-meta">EVENTS</span>
        </div>
        <ul className="arch-log-list">
          {events.map((e, i) => (
            <li key={e.id} className="arch-log-row" style={{ '--ri': i }}>
              <span className="t-mono arch-log-time">{e.t}</span>
              <span className={`t-mono arch-log-tag tag-${e.source}`}>[{e.source}]</span>
              <span className="arch-log-msg">{e.msg}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="fp-corner t-meta">DATA_FLOW · GOTIT</div>
    </div>
  );
}

/** ─── activity log helpers ─── */
function fmtClock(d) {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}
const EVENT_TEMPLATES = [
  { source: 'scheduler', tpl: () => `tick · ${24 + Math.floor(Math.random() * 12)} wishlists queued` },
  { source: 'parser',    tpl: () => `fetta.app/${pickStreamer()} (+${1 + Math.floor(Math.random() * 4)} new items)` },
  { source: 'parser',    tpl: () => `retry @ fetta.app/${pickStreamer()} — backoff 4s` },
  { source: 'db',        tpl: () => `inserted ${1 + Math.floor(Math.random() * 5)} rows into wishlist_items` },
  { source: 'db',        tpl: () => `dedup hit · skipping 2 known items` },
  { source: 'bot',       tpl: () => `sent ${2 + Math.floor(Math.random() * 8)} push to ${5 + Math.floor(Math.random() * 18)} users` },
  { source: 'bot',       tpl: () => `auth ok · @${pickHandle()} via Telegram login widget` },
  { source: 'api',       tpl: () => `GET /streamers · 200 · ${20 + Math.floor(Math.random() * 80)}ms` },
];
function pickStreamer() {
  const list = ['jane-stream', 'kuro_ch', 'ametrine', 'noxxxy', 'tatra', 'iku_live', 'fox-vrtuber', 'kage-yume'];
  return list[Math.floor(Math.random() * list.length)];
}
function pickHandle() {
  const list = ['bzden4ik', 'kage', 'nekro', 'ametrine', 'kuro', 'jane_w'];
  return list[Math.floor(Math.random() * list.length)];
}
function generateEvent() {
  const t = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
  return { id: Math.random().toString(36).slice(2), t: fmtClock(new Date()), source: t.source, msg: t.tpl() };
}
function seedInitialEvents() {
  const base = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(base.getTime() - (i + 1) * (1500 + Math.random() * 3000));
    const t = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
    return { id: Math.random().toString(36).slice(2), t: fmtClock(d), source: t.source, msg: t.tpl() };
  });
}

/** Custom preview blocks — pure CSS/SVG, no fake screenshots. */
function FlagshipPreview({ kind, item }) {
  if (kind === 'live-embed') {
    return <LiveEmbed url={item.live} label={item.title} />;
  }
  if (kind === 'architecture') {
    return <ArchitectureDiagram />;
  }
  if (kind === 'app-mock') {
    return <AppMock />;
  }
  if (kind === 'uploader-mock') {
    return <UploaderMock />;
  }

  if (kind === 'fighting') {
    // Frame data — generic but plausible for a 2D fighter.
    // Format: move | startup (frames before attack hits) | active | recovery | on-block advantage
    const frames = [
      { m: '5L',  s: '4',  a: '2', r: '10', adv: '+2',  hl: false },
      { m: '5M',  s: '7',  a: '3', r: '14', adv: '−1',  hl: false },
      { m: '5H',  s: '12', a: '4', r: '20', adv: '−5',  hl: false },
      { m: '236M',s: '18', a: '6', r: '22', adv: 'KD',  hl: true  },
      { m: '623H',s: '9',  a: '8', r: '34', adv: '−18', hl: false },
      { m: 'j.S', s: '11', a: '∞', r: '6',  adv: '—',   hl: false },
    ];
    return (
      <div className="fp fp-fight">
        <div className="fp-grid" aria-hidden>
          {Array.from({ length: 12 * 6 }).map((_, i) => (
            <i key={i} style={{ '--gi': i }} />
          ))}
        </div>

        {/* ─── HUD ─── */}
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

        {/* ─── ROUND BAND ─── */}
        <div className="fp-round">
          <span className="fp-round-l t-mono">vt-05 / NEKRO</span>
          <span className="fp-round-mid t-mono">ROUND 02 · FT2</span>
          <span className="fp-round-r t-mono">vt-10 / KAGE</span>
        </div>

        {/* ─── FRAME DATA TABLE ─── */}
        <div className="fp-frames">
          <div className="fp-frames-head">
            <span className="t-meta">MOVE</span>
            <span className="t-meta">STR</span>
            <span className="t-meta">ACT</span>
            <span className="t-meta">REC</span>
            <span className="t-meta right">ADV</span>
          </div>
          <ul className="fp-frames-list">
            {frames.map((f, i) => (
              <li key={i} className={`fp-frame ${f.hl ? 'hl' : ''}`}>
                <span className="t-mono fp-f-move">{f.m}</span>
                <span className="t-mono">{f.s}</span>
                <span className="t-mono">{f.a}</span>
                <span className="t-mono">{f.r}</span>
                <span className={`t-mono right ${f.adv.startsWith('−') ? 'neg' : f.adv.startsWith('+') ? 'pos' : ''}`}>{f.adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── INPUT READER ─── */}
        <div className="fp-input">
          <span className="t-meta">INPUT</span>
          <span className="fp-input-chips">
            <span className="fp-chip">236</span>
            <span className="fp-chip">+</span>
            <span className="fp-chip amb">M</span>
            <span className="fp-arrow">→</span>
            <span className="fp-input-name t-mono amb">SHADOW FANG</span>
          </span>
          <span className="t-mono fp-input-dmg">280<span className="dim">dmg</span></span>
        </div>

        {/* ─── ROSTER ─── */}
        <div className="fp-roster">
          {['vt-01','vt-02','vt-03','vt-04','vt-05','vt-06','vt-07','vt-08','vt-09','vt-10','vt-11','vt-12','vt-13'].map((id, i) => (
            <span key={id} className={`fp-slot t-mono ${i === 4 || i === 9 ? 'is-active' : ''}`} style={{ '--si': i }}>
              {id}
            </span>
          ))}
        </div>

        <div className="fp-corner t-meta">FRAME_DATA · 13_FIGHTERS · 4_STAGES</div>
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
          <FlagshipPreview kind={item.preview} item={item} />
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
            <div className="work-count"><span className="t-meta">FLAGSHIP</span><span className="num tabular t-display">04</span></div>
            <div className="work-count"><span className="t-meta">PRODUCTION</span><span className="num tabular t-display">06</span></div>
            <div className="work-count"><span className="t-meta">UTILITY</span><span className="num tabular t-display">02</span></div>
            <div className="work-count"><span className="t-meta">ARCHIVE</span><span className="num tabular t-display">03</span></div>
          </div>
        </div>

        {/* ─── FLAGSHIP ─── */}
        <div className="tier-rule">
          <span className="t-meta">TIER I — FLAGSHIP</span>
          <span className="t-meta">04 ENTRIES</span>
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
        /* Alternating L-R-L-R rhythm for editorial flow */
        .fl-1 .fl-info,
        .fl-3 .fl-info    { order: 2; }
        .fl-1 .fl-preview,
        .fl-3 .fl-preview { order: 1; }
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

        /* ════════════════════════════════════════════════
           APP MOCK (YouDownload) — pixel-perfect replica
           Replicates real classes/colors from
           src/renderer/src/globals.css of github.com/warfa/YouDownload
           ════════════════════════════════════════════════ */
        .fp-app {
          padding: 0;
          isolation: isolate;
          position: relative;
          overflow: hidden;
        }

        /* ─── theme tokens — FleetWatch (default) ─── */
        .yd-root.yd-theme-fleet {
          --yd-bg0: #05050A;
          --yd-bg1: #0A0A14;
          --yd-bg2: #0F0F1C;
          --yd-bg3: #161624;
          --yd-bg4: #1E1E30;
          --yd-border:  rgba(255,255,255,0.055);
          --yd-border2: rgba(255,255,255,0.1);
          --yd-g: #4ADE80;
          --yd-b: #38BDF8;
          --yd-r: #EF4444;
          --yd-t0: #F1F5F9;
          --yd-t1: #94A3B8;
          --yd-t2: #475569;
          --yd-t3: #2D3A4E;
          --yd-glow-g: 0 0 14px rgba(74,222,128,0.28);
          --yd-radius: 8px;
          --yd-ff-ui:   'Barlow Condensed', system-ui, sans-serif;
          --yd-ff-logo: 'Orbitron', system-ui, sans-serif;
          --yd-ff-mono: 'Azeret Mono', 'JetBrains Mono', monospace;
        }
        /* ─── Vulnerable Apathy ─── */
        .yd-root.yd-theme-apathy {
          --yd-bg0: #0A0A0C;
          --yd-bg1: #141418;
          --yd-bg2: #1A1A20;
          --yd-bg3: #1F1F28;
          --yd-bg4: #26262F;
          --yd-border:  rgba(255,255,255,0.04);
          --yd-border2: rgba(255,255,255,0.09);
          --yd-g: #FF3B7C;
          --yd-b: #4D7CFF;
          --yd-r: #FF3B7C;
          --yd-t0: #E2E2E5;
          --yd-t1: #8A8A96;
          --yd-t2: #5A5A64;
          --yd-t3: #2E2E38;
          --yd-glow-g: 0 0 18px rgba(255,59,124,0.32);
          --yd-radius: 4px;
          --yd-ff-ui:   'Space Grotesk', system-ui, sans-serif;
          --yd-ff-logo: 'Syncopate', system-ui, sans-serif;
          --yd-ff-mono: 'Azeret Mono', monospace;
        }

        .yd-root {
          background: var(--yd-bg0);
          color: var(--yd-t0);
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 540px;
          font-family: var(--yd-ff-ui);
          font-size: 13.5px;
          line-height: 1.4;
          transition: background 0.7s var(--ease-in-out);
        }

        /* ── glow orbs (apathy theme background) ── */
        .yd-orbs {
          position: absolute; inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .yd-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          animation: yd-orb-drift linear infinite;
        }
        .yd-orb-1 { width: 300px; height: 300px; background: #FF3B7C; top: -80px;  left: -60px;  animation-duration: 28s; }
        .yd-orb-2 { width: 260px; height: 260px; background: #4D7CFF; bottom: -40px; right: -40px; animation-duration: 34s; animation-delay: -8s; }
        .yd-orb-3 { width: 180px; height: 180px; background: #FF3B7C; top: 38%; left: 55%; opacity: 0.12; animation-duration: 22s; animation-delay: -4s; }
        @keyframes yd-orb-drift {
          0%   { transform: translate(0, 0)     scale(1); }
          25%  { transform: translate(20px, -16px) scale(1.06); }
          50%  { transform: translate(-12px, 28px) scale(0.95); }
          75%  { transform: translate(28px, 12px) scale(1.04); }
          100% { transform: translate(0, 0)     scale(1); }
        }

        /* ════════════════════════════════════════════════
           TITLE BAR
           ════════════════════════════════════════════════ */
        .yd-titlebar {
          height: 36px;
          background: var(--yd-bg1);
          border-bottom: 1px solid var(--yd-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px 0 12px;
          flex-shrink: 0;
          position: relative;
          z-index: 4;
        }
        .yd-theme-apathy .yd-titlebar {
          background: rgba(10,10,12,0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .yd-titlebar::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--yd-g) 40%, var(--yd-b) 60%, transparent 100%);
          opacity: 0.3;
        }
        .yd-theme-apathy .yd-titlebar::after { opacity: 0.45; }

        .yd-tb-drag {
          display: flex; align-items: center; gap: 6px;
        }
        .yd-tb-star { color: var(--yd-g); }
        .yd-theme-apathy .yd-tb-star { filter: drop-shadow(0 0 6px rgba(255,59,124,0.55)); }
        .yd-tb-name {
          font-family: var(--yd-ff-logo);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--yd-t1);
          margin-right: 8px;
        }
        .yd-theme-apathy .yd-tb-name {
          letter-spacing: 0.22em;
          font-size: 9px;
        }

        /* theme switcher pill embedded in titlebar */
        .yd-theme-toggle {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 3px 7px;
          background: var(--yd-bg2);
          border: 1px solid var(--yd-border);
          border-radius: 6px;
          color: var(--yd-t2);
          font-family: var(--yd-ff-mono);
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.18s ease;
        }
        .yd-theme-toggle:hover { color: var(--yd-g); border-color: var(--yd-border2); }
        .yd-theme-name { letter-spacing: 0.08em; }
        .yd-theme-dot {
          width: 7px; height: 7px;
          background: var(--yd-g);
          box-shadow: 0 0 6px var(--yd-g);
          border-radius: 50%;
        }

        .yd-tb-ctrls { display: flex; gap: 1px; }
        .yd-wc-btn {
          width: 30px; height: 36px;
          background: transparent; border: 0;
          color: var(--yd-t2);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.18s, color 0.18s;
        }
        .yd-wc-btn:hover { background: var(--yd-bg3); color: var(--yd-t0); }
        .yd-wc-close:hover { background: rgba(239,68,68,0.15); color: var(--yd-r); }

        /* ════════════════════════════════════════════════
           BODY (sidebar + main)
           ════════════════════════════════════════════════ */
        .yd-body {
          display: flex;
          flex: 1;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        /* ─── sidebar ─── */
        .yd-sidebar {
          width: 168px;
          background: var(--yd-bg1);
          border-right: 1px solid var(--yd-border);
          flex-shrink: 0;
          padding: 16px 0 12px;
          display: flex; flex-direction: column;
          position: relative;
        }
        .yd-theme-apathy .yd-sidebar {
          background: rgba(14,14,18,0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-right: 1px solid rgba(255,255,255,0.05);
        }
        .yd-sidebar::after {
          content: '';
          position: absolute;
          top: 0; right: -1px; bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent 0%, var(--yd-g) 40%, var(--yd-b) 70%, transparent 100%);
          opacity: 0.18;
        }

        .yd-sb-logo {
          display: flex; align-items: center; gap: 9px;
          padding: 0 14px 18px;
        }
        .yd-sb-star {
          color: var(--yd-g);
          filter: drop-shadow(0 0 6px rgba(74,222,128,0.5));
        }
        .yd-theme-apathy .yd-sb-star {
          filter: drop-shadow(0 0 10px rgba(255,59,124,0.55));
        }
        .yd-sb-wordmark { display: flex; flex-direction: column; line-height: 1; }
        .yd-sb-you {
          font-family: var(--yd-ff-logo);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--yd-t0);
        }
        .yd-sb-dl {
          font-family: var(--yd-ff-logo);
          font-size: 8px; font-weight: 400;
          letter-spacing: 0.2em;
          color: var(--yd-g);
          margin-top: 1px;
        }
        .yd-theme-apathy .yd-sb-you {
          font-size: 11px;
          letter-spacing: 0.14em;
        }
        .yd-theme-apathy .yd-sb-dl {
          font-size: 7px;
          letter-spacing: 0.22em;
        }

        .yd-sb-divider {
          height: 1px;
          background: var(--yd-border);
          margin: 0 12px 12px;
        }

        .yd-sb-nav {
          flex: 1;
          display: flex; flex-direction: column;
          gap: 2px;
          padding: 0 8px;
        }
        .yd-sb-item {
          display: flex; align-items: center; gap: 9px;
          padding: 8px 10px;
          background: transparent; border: 0;
          border-radius: var(--yd-radius);
          cursor: pointer;
          color: var(--yd-t1);
          font-family: var(--yd-ff-ui);
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-align: left;
          position: relative;
          transition: background 0.18s, color 0.18s;
        }
        .yd-sb-item:hover { background: var(--yd-bg3); color: var(--yd-t0); }
        .yd-sb-item-active {
          background: rgba(74,222,128,0.07);
          color: var(--yd-t0);
        }
        .yd-theme-apathy .yd-sb-item-active { background: rgba(255,59,124,0.07); }
        .yd-sb-indicator {
          position: absolute;
          left: -8px;
          width: 3px; height: 16px;
          border-radius: 2px;
          background: var(--yd-g);
          opacity: 0;
          transform: scaleY(0.3);
          transition: opacity 0.18s, transform 0.18s;
        }
        .yd-sb-item-active .yd-sb-indicator {
          opacity: 1; transform: scaleY(1);
          box-shadow: 0 0 8px rgba(74,222,128,0.55);
        }
        .yd-theme-apathy .yd-sb-item-active .yd-sb-indicator {
          box-shadow: 0 0 12px rgba(255,59,124,0.6), 0 0 24px rgba(255,59,124,0.3);
        }
        .yd-sb-item-active .yd-sb-icon { color: var(--yd-g); }
        .yd-sb-icon { display: flex; align-items: center; flex-shrink: 0; }
        .yd-sb-label { flex: 1; line-height: 1; }
        .yd-sb-badge {
          background: var(--yd-g);
          color: #000;
          font-family: var(--yd-ff-mono);
          font-size: 9px; font-weight: 600;
          padding: 1px 5px;
          border-radius: 9px;
          min-width: 16px;
          text-align: center;
        }
        .yd-theme-apathy .yd-sb-badge {
          background: rgba(255,59,124,0.15);
          color: #FF3B7C;
          border: 1px solid rgba(255,59,124,0.3);
        }

        /* footer */
        .yd-sb-footer {
          padding: 12px 14px 0;
          border-top: 1px solid var(--yd-border);
          margin-top: 8px;
          display: flex; flex-direction: column;
          gap: 8px;
        }
        .yd-lang-toggle {
          display: flex; align-items: center; gap: 0;
          background: var(--yd-bg2);
          border: 1px solid var(--yd-border);
          border-radius: 6px;
          padding: 2px;
          cursor: pointer;
          width: 100%;
          justify-content: center;
        }
        .yd-lang-opt {
          flex: 1;
          text-align: center;
          padding: 4px 0;
          font-family: var(--yd-ff-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: var(--yd-t2);
          border-radius: 4px;
          transition: all 0.18s;
          line-height: 1;
        }
        .yd-lang-opt-on {
          background: var(--yd-bg4);
          color: var(--yd-g);
          box-shadow: 0 0 6px rgba(74,222,128,0.15);
        }
        .yd-theme-apathy .yd-lang-opt-on {
          background: rgba(255,59,124,0.1);
          color: #FF3B7C;
          box-shadow: 0 0 8px rgba(255,59,124,0.15);
        }
        .yd-lang-sep { width: 1px; height: 12px; background: var(--yd-border); flex-shrink: 0; }

        .yd-sb-status-row {
          display: flex; align-items: center; gap: 5px;
        }
        .yd-sb-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--yd-g);
          box-shadow: 0 0 6px var(--yd-g);
          animation: yd-pulse 2.5s ease-in-out infinite;
        }
        @keyframes yd-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px var(--yd-g); }
          50%      { opacity: 0.45; box-shadow: 0 0 2px var(--yd-g); }
        }
        .yd-sb-ready {
          font-size: 10.5px;
          color: var(--yd-t2);
          letter-spacing: 0.04em;
        }
        .yd-sb-version {
          font-family: var(--yd-ff-mono);
          font-size: 9px;
          color: var(--yd-t3);
          letter-spacing: 0.08em;
        }

        /* ════════════════════════════════════════════════
           MAIN
           ════════════════════════════════════════════════ */
        .yd-main {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px 24px;
          background: var(--yd-bg0);
          display: flex; flex-direction: column;
          gap: 14px;
          min-width: 0;
        }
        .yd-theme-apathy .yd-main { background: transparent; }

        .yd-eyebrow {
          display: flex; align-items: center; gap: 9px;
          font-family: var(--yd-ff-mono);
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: var(--yd-t2);
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .yd-theme-apathy .yd-eyebrow {
          font-family: var(--yd-ff-ui);
          letter-spacing: 0.22em;
        }
        .yd-eb-line {
          flex: 1; height: 1px;
          background: var(--yd-border);
        }
        .yd-eyebrow-sm {
          font-family: var(--yd-ff-mono);
          font-size: 9.5px;
          letter-spacing: 0.16em;
          color: var(--yd-t2);
          text-transform: uppercase;
        }

        /* URL section */
        .yd-url-section {
          background: var(--yd-bg1);
          border: 1px solid var(--yd-border);
          border-radius: 10px;
          padding: 14px 14px 10px;
        }
        .yd-theme-apathy .yd-url-section {
          background: rgba(20,20,24,0.45);
          backdrop-filter: blur(12px);
          border-color: rgba(255,255,255,0.06);
        }
        .yd-url-row {
          display: flex; align-items: center; gap: 5px;
          background: var(--yd-bg2);
          border: 1px solid var(--yd-border);
          border-radius: var(--yd-radius);
          padding: 2px 4px 2px 9px;
          margin-bottom: 8px;
          transition: border-color 0.18s;
        }
        .yd-url-row:focus-within {
          border-color: rgba(74,222,128,0.35);
        }
        .yd-theme-apathy .yd-url-row:focus-within { border-color: rgba(255,59,124,0.4); }
        .yd-url-icon { color: var(--yd-t2); display: flex; flex-shrink: 0; }
        .yd-url-input {
          flex: 1;
          background: transparent; border: 0; outline: none;
          color: var(--yd-t0);
          font-family: var(--yd-ff-mono);
          font-size: 11.5px;
          font-weight: 300;
          letter-spacing: 0.03em;
          padding: 7px 0;
          min-width: 0;
        }
        .yd-url-input::placeholder { color: var(--yd-t2); }

        .yd-btn-paste, .yd-btn-fetch {
          display: flex; align-items: center; gap: 4px;
          border: 0;
          border-radius: 5px;
          cursor: pointer;
          font-family: var(--yd-ff-ui);
          font-size: 11px; font-weight: 500;
          padding: 5px 9px;
          flex-shrink: 0;
          letter-spacing: 0.04em;
          transition: all 0.18s;
        }
        .yd-btn-paste {
          background: var(--yd-bg4);
          color: var(--yd-t1);
        }
        .yd-btn-paste:hover { background: var(--yd-bg3); color: var(--yd-t0); }
        .yd-btn-fetch {
          background: rgba(74,222,128,0.12);
          color: var(--yd-g);
          border: 1px solid rgba(74,222,128,0.25);
        }
        .yd-theme-apathy .yd-btn-fetch {
          background: rgba(255,59,124,0.12);
          color: #FF3B7C;
          border-color: rgba(255,59,124,0.25);
        }
        .yd-btn-fetch:hover:not(:disabled) {
          background: rgba(74,222,128,0.2);
          box-shadow: var(--yd-glow-g);
        }
        .yd-theme-apathy .yd-btn-fetch:hover:not(:disabled) {
          background: rgba(255,59,124,0.2);
        }
        .yd-btn-fetch:disabled { opacity: 0.4; cursor: not-allowed; }

        .yd-url-hint {
          font-size: 10.5px;
          color: var(--yd-t2);
          letter-spacing: 0.04em;
          padding-left: 2px;
        }

        .yd-spin {
          width: 11px; height: 11px;
          border: 1.5px solid rgba(74,222,128,0.3);
          border-top-color: var(--yd-g);
          border-radius: 50%;
          animation: yd-spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes yd-spin { to { transform: rotate(360deg); } }

        /* Video info card */
        .yd-vi-card {
          display: flex; gap: 12px;
          background: var(--yd-bg1);
          border: 1px solid var(--yd-border);
          border-radius: 10px;
          padding: 12px;
          animation: yd-fade-up 0.3s ease both;
        }
        .yd-theme-apathy .yd-vi-card {
          background: rgba(20,20,24,0.45);
          backdrop-filter: blur(12px);
          border-color: rgba(255,255,255,0.06);
        }
        @keyframes yd-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
        .yd-vi-thumb-wrap {
          position: relative;
          flex-shrink: 0;
          width: 116px; height: 65px;
          border-radius: 5px;
          overflow: hidden;
          background: var(--yd-bg3);
        }
        .yd-vi-thumb-ph { width: 100%; height: 100%; position: relative; }
        .yd-thumb-grid {
          position: absolute; inset: 0;
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-rows: repeat(5, 1fr);
          gap: 1px;
        }
        .yd-thumb-grid-mini {
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(4, 1fr);
        }
        .yd-thumb-grid i {
          background: color-mix(in oklch, var(--yd-t0) calc((var(--gi) % 6) * 1.4%), transparent);
        }
        .yd-vi-dur {
          position: absolute;
          bottom: 4px; right: 4px;
          background: rgba(0,0,0,0.78);
          color: var(--yd-t0);
          font-family: var(--yd-ff-mono);
          font-size: 9.5px;
          padding: 1px 4px;
          border-radius: 3px;
        }
        .yd-vi-meta { flex: 1; min-width: 0; padding-top: 2px; }
        .yd-vi-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--yd-t0);
          line-height: 1.4;
          margin-bottom: 7px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .yd-vi-stats {
          display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
        }
        .yd-vi-channel, .yd-vi-views {
          font-family: var(--yd-ff-mono);
          font-size: 10px;
          color: var(--yd-t2);
          letter-spacing: 0;
        }
        .yd-vi-dot { color: var(--yd-t3); font-size: 4px; }

        /* skeleton */
        .yd-vi-skel { pointer-events: none; }
        .yd-skel-thumb {
          width: 116px; height: 65px;
          border-radius: 5px;
          background: var(--yd-bg3);
          flex-shrink: 0;
          animation: yd-skel 1.4s ease infinite;
        }
        .yd-skel-body {
          flex: 1; display: flex; flex-direction: column; gap: 7px; padding-top: 3px;
        }
        .yd-skel-line {
          height: 9px; border-radius: 4px;
          background: var(--yd-bg3);
          animation: yd-skel 1.4s ease infinite;
        }
        .yd-w80 { width: 80%; } .yd-w55 { width: 55%; } .yd-w35 { width: 35%; }
        @keyframes yd-skel {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 0.9; }
        }

        /* Format section */
        .yd-fmt-section {
          background: var(--yd-bg1);
          border: 1px solid var(--yd-border);
          border-radius: 10px;
          padding: 14px;
          display: flex; flex-direction: column;
          gap: 12px;
          animation: yd-fade-up 0.35s ease 0.05s both;
        }
        .yd-theme-apathy .yd-fmt-section {
          background: rgba(20,20,24,0.45);
          backdrop-filter: blur(12px);
          border-color: rgba(255,255,255,0.06);
        }
        .yd-fmt-tabs {
          display: flex; gap: 4px;
          background: var(--yd-bg2);
          border-radius: 7px;
          padding: 3px;
          width: fit-content;
        }
        .yd-fmt-tab {
          display: flex; align-items: center; gap: 5px;
          padding: 5px 12px;
          background: transparent; border: 0;
          border-radius: 5px;
          cursor: pointer;
          font-family: var(--yd-ff-ui);
          font-size: 11.5px; font-weight: 500;
          color: var(--yd-t1);
          letter-spacing: 0.04em;
          transition: all 0.18s;
        }
        .yd-fmt-tab:hover { color: var(--yd-t0); }
        .yd-fmt-tab-on {
          background: var(--yd-bg4);
          color: var(--yd-t0);
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .yd-quality-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 5px;
        }
        .yd-q-btn {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 7px 6px;
          background: var(--yd-bg2);
          border: 1px solid var(--yd-border);
          border-radius: 6px;
          cursor: pointer;
          gap: 1px;
          transition: all 0.18s;
        }
        .yd-q-btn:hover { background: var(--yd-bg3); border-color: var(--yd-border2); }
        .yd-q-btn-on {
          background: rgba(74,222,128,0.1);
          border-color: rgba(74,222,128,0.4);
          box-shadow: 0 0 0 1px rgba(74,222,128,0.1);
        }
        .yd-theme-apathy .yd-q-btn-on {
          background: rgba(255,59,124,0.1);
          border-color: rgba(255,59,124,0.4);
          box-shadow: 0 0 0 1px rgba(255,59,124,0.12);
        }
        .yd-q-main {
          font-family: var(--yd-ff-ui);
          font-size: 12px; font-weight: 600;
          color: var(--yd-t0);
        }
        .yd-q-btn-on .yd-q-main { color: var(--yd-g); }
        .yd-q-badge {
          font-family: var(--yd-ff-mono);
          font-size: 8px; font-weight: 500;
          color: var(--yd-t2);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .yd-q-btn-on .yd-q-badge { color: rgba(74,222,128,0.7); }
        .yd-theme-apathy .yd-q-btn-on .yd-q-badge { color: rgba(255,59,124,0.7); }
        .yd-q-sub {
          font-family: var(--yd-ff-mono);
          font-size: 8px;
          color: var(--yd-t2);
          letter-spacing: 0.04em;
        }

        /* Download Now button */
        .yd-dl-now-btn {
          display: flex; align-items: center; gap: 9px;
          padding: 10px 16px;
          background: color-mix(in srgb, var(--yd-g) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--yd-g) 30%, transparent);
          border-radius: 8px;
          cursor: pointer;
          color: var(--yd-g);
          font-family: var(--yd-ff-ui);
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.18s;
          width: 100%;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .yd-dl-now-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--yd-g) 14%, transparent) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
          pointer-events: none;
        }
        .yd-dl-now-btn:hover::before { transform: translateX(100%); }
        .yd-dl-now-btn:hover {
          background: color-mix(in srgb, var(--yd-g) 16%, transparent);
          border-color: color-mix(in srgb, var(--yd-g) 50%, transparent);
          box-shadow: var(--yd-glow-g);
        }
        .yd-dl-now-q {
          background: color-mix(in srgb, var(--yd-g) 15%, transparent);
          color: color-mix(in srgb, var(--yd-g) 90%, transparent);
          font-family: var(--yd-ff-mono);
          font-size: 9.5px;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: auto;
          letter-spacing: 0.05em;
        }

        /* Queue */
        .yd-queue-section {
          display: flex; flex-direction: column; gap: 7px;
        }
        .yd-queue-head {
          display: flex; align-items: center; gap: 9px;
          margin-bottom: 2px;
        }
        .yd-queue-badge {
          background: rgba(74,222,128,0.12);
          color: var(--yd-g);
          font-family: var(--yd-ff-mono);
          font-size: 9.5px;
          padding: 2px 7px;
          border-radius: 9px;
          border: 1px solid rgba(74,222,128,0.25);
        }
        .yd-theme-apathy .yd-queue-badge {
          background: rgba(255,59,124,0.12);
          color: #FF3B7C;
          border-color: rgba(255,59,124,0.25);
        }
        .yd-queue-list { display: flex; flex-direction: column; gap: 5px; }

        /* Download card */
        .yd-dl-card {
          display: flex;
          background: var(--yd-bg1);
          border: 1px solid var(--yd-border);
          border-radius: 9px;
          overflow: hidden;
          animation: yd-slide-in 0.25s ease both;
        }
        @keyframes yd-slide-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: none; }
        }
        .yd-dl-downloading, .yd-dl-complete { border-left: 2px solid var(--yd-g); }
        .yd-dl-thumb {
          width: 62px; height: 38px;
          flex-shrink: 0;
          align-self: center;
          margin: 8px 0 8px 8px;
          border-radius: 3px;
          background: var(--yd-bg3);
          position: relative;
          overflow: hidden;
        }
        .yd-dl-thumb .yd-thumb-grid { position: absolute; inset: 0; }
        .yd-dl-body { flex: 1; padding: 8px 10px; min-width: 0; }
        .yd-dl-top {
          display: flex; align-items: flex-start; gap: 6px; margin-bottom: 5px;
        }
        .yd-dl-title {
          flex: 1;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--yd-t0);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4;
        }
        .yd-dl-acts { display: flex; gap: 3px; flex-shrink: 0; }
        .yd-dl-act {
          width: 20px; height: 20px;
          background: var(--yd-bg3);
          border: 1px solid var(--yd-border);
          border-radius: 4px;
          cursor: pointer;
          color: var(--yd-t1);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.18s;
        }
        .yd-dl-act:hover {
          background: rgba(239,68,68,0.15);
          color: var(--yd-r);
          border-color: rgba(239,68,68,0.3);
        }
        .yd-dl-info-row {
          display: flex; align-items: center; gap: 8px;
          flex-wrap: wrap; margin-bottom: 6px;
        }
        .yd-dl-fmt {
          font-family: var(--yd-ff-mono);
          font-size: 9.5px;
          color: var(--yd-t2);
          background: var(--yd-bg3);
          padding: 1px 5px;
          border-radius: 3px;
        }
        .yd-dl-status-tag {
          display: flex; align-items: center; gap: 4px;
          font-family: var(--yd-ff-mono);
          font-size: 9.5px;
          letter-spacing: 0.04em;
          color: var(--yd-g);
        }
        .yd-dl-sdot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .yd-dl-speed, .yd-dl-eta {
          font-family: var(--yd-ff-mono);
          font-size: 9.5px;
          color: var(--yd-t2);
        }
        .yd-dl-pct {
          font-family: var(--yd-ff-mono);
          font-size: 9.5px;
          font-weight: 500;
          color: var(--yd-g);
          margin-left: auto;
        }
        .yd-dl-track {
          height: 3px;
          background: var(--yd-bg3);
          border-radius: 2px;
          overflow: hidden;
        }
        .yd-dl-bar {
          height: 100%;
          background: var(--yd-g);
          box-shadow: 0 0 6px rgba(74,222,128,0.45);
          transition: width 80ms linear;
        }
        .yd-theme-apathy .yd-dl-bar {
          background: #FF3B7C;
          box-shadow: 0 0 8px rgba(255,59,124,0.5);
        }

        .fp-app .fp-corner {
          z-index: 3;
          bottom: 0.4rem;
          color: var(--yd-t3);
        }

        /* ─── YDLogo themed colour pickup (currentColor) ─── */
        .yd-tb-star, .yd-sb-star { display: inline-flex; }
        .yd-tb-star { color: var(--yd-g); }
        .yd-sb-star {
          color: var(--yd-g);
          filter: drop-shadow(0 0 5px color-mix(in oklch, var(--yd-g) 60%, transparent));
        }

        /* ═══════════════════════════════════════
           STREAM (stub view)
           ═══════════════════════════════════════ */
        .yd-stream-stub {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 2rem 1.5rem;
          text-align: center;
          animation: yd-fade-up 0.35s ease both;
        }
        .yd-stub-logo {
          color: var(--yd-g);
          filter: drop-shadow(0 0 12px color-mix(in oklch, var(--yd-g) 50%, transparent));
          margin-bottom: 0.3rem;
        }
        .yd-stub-title {
          font-family: var(--yd-ff-logo);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--yd-t0);
          text-transform: uppercase;
        }
        .yd-stub-desc {
          font-family: var(--yd-ff-ui);
          font-size: 12.5px;
          line-height: 1.55;
          color: var(--yd-t1);
          max-width: 38ch;
        }
        .yd-stub-features {
          display: grid; gap: 0.4rem;
          padding-top: 0.8rem;
          width: 100%;
          max-width: 360px;
          border-top: 1px dashed var(--yd-border);
        }
        .yd-stub-feat {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: var(--yd-ff-ui);
          font-size: 11.5px;
          color: var(--yd-t1);
          text-align: left;
        }
        .yd-stub-feat svg { color: var(--yd-g); flex-shrink: 0; }
        .yd-stub-cta {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 1rem;
          padding: 9px 16px;
          background: color-mix(in srgb, var(--yd-g) 12%, transparent);
          color: var(--yd-g);
          border: 1px solid color-mix(in srgb, var(--yd-g) 35%, transparent);
          border-radius: 7px;
          font-family: var(--yd-ff-ui);
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: all 0.18s;
        }
        .yd-stub-cta:hover {
          background: color-mix(in srgb, var(--yd-g) 20%, transparent);
          box-shadow: var(--yd-glow-g);
        }

        /* ═══════════════════════════════════════
           HISTORY view
           ═══════════════════════════════════════ */
        .yd-section-title {
          font-family: var(--yd-ff-logo);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--yd-t0);
          margin-bottom: 12px;
        }
        .yd-theme-apathy .yd-section-title { letter-spacing: 0.1em; }

        .yd-hist-view {
          display: flex; flex-direction: column;
          animation: yd-fade-up 0.35s ease both;
        }
        .yd-hist-head {
          display: flex; align-items: baseline;
          gap: 10px;
          margin-bottom: 12px;
        }
        .yd-hist-count {
          font-family: var(--yd-ff-mono);
          font-size: 10px;
          color: var(--yd-t2);
          letter-spacing: 0.08em;
        }
        .yd-hist-clear {
          margin-left: auto;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 9px;
          background: var(--yd-bg3);
          color: var(--yd-t1);
          border: 1px solid var(--yd-border);
          border-radius: 5px;
          font-family: var(--yd-ff-ui);
          font-size: 11px;
          letter-spacing: 0.04em;
          transition: all 0.18s;
        }
        .yd-hist-clear:hover {
          background: rgba(239,68,68,0.12);
          color: var(--yd-r);
          border-color: rgba(239,68,68,0.3);
        }

        .yd-hist-list {
          display: flex; flex-direction: column;
          gap: 5px;
        }
        .yd-hist-item {
          display: flex; align-items: center;
          gap: 10px;
          padding: 7px 10px;
          background: var(--yd-bg1);
          border: 1px solid var(--yd-border);
          border-radius: 7px;
          transition: border-color 0.18s;
        }
        .yd-hist-item:hover { border-color: var(--yd-border2); }
        .yd-theme-apathy .yd-hist-item {
          background: rgba(20,20,24,0.45);
          backdrop-filter: blur(10px);
          border-color: rgba(255,255,255,0.06);
        }
        .yd-hist-complete  { border-left: 2px solid var(--yd-g); }
        .yd-hist-error     { border-left: 2px solid var(--yd-r); }
        .yd-hist-cancelled { border-left: 2px solid var(--yd-t3); opacity: 0.7; }

        .yd-hist-thumb {
          width: 48px; height: 30px;
          border-radius: 3px;
          background: var(--yd-bg3);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .yd-hist-thumb .yd-thumb-grid { position: absolute; inset: 0; }

        .yd-hist-meta {
          flex: 1;
          display: flex; flex-direction: column;
          min-width: 0;
        }
        .yd-hist-title {
          font-family: var(--yd-ff-ui);
          font-size: 12px;
          color: var(--yd-t0);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.3;
        }
        .yd-hist-fmt {
          font-family: var(--yd-ff-mono);
          font-size: 9.5px;
          color: var(--yd-t2);
          letter-spacing: 0.03em;
          margin-top: 1px;
        }
        .yd-hist-icon {
          width: 18px; height: 18px;
          display: inline-flex;
          align-items: center; justify-content: center;
          font-family: var(--yd-ff-mono);
          font-size: 12px;
          font-weight: 700;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .yd-hist-icon-complete  { color: var(--yd-g);  background: color-mix(in srgb, var(--yd-g) 12%, transparent); }
        .yd-hist-icon-error     { color: var(--yd-r);  background: color-mix(in srgb, var(--yd-r) 12%, transparent); }
        .yd-hist-icon-cancelled { color: var(--yd-t2); background: var(--yd-bg3); }

        /* ═══════════════════════════════════════
           SETTINGS view
           ═══════════════════════════════════════ */
        .yd-set-view {
          display: flex; flex-direction: column;
          gap: 16px;
          animation: yd-fade-up 0.35s ease both;
        }
        .yd-set-group {
          display: flex; flex-direction: column;
          gap: 6px;
        }
        .yd-set-label {
          font-family: var(--yd-ff-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--yd-t2);
        }
        .yd-set-hint {
          font-family: var(--yd-ff-ui);
          font-size: 11px;
          line-height: 1.4;
          color: var(--yd-t2);
          max-width: 50ch;
        }
        .yd-set-row {
          display: flex; gap: 6px;
        }
        .yd-set-input {
          flex: 1;
          padding: 7px 10px;
          background: var(--yd-bg2);
          color: var(--yd-t0);
          border: 1px solid var(--yd-border);
          border-radius: var(--yd-radius);
          font-family: var(--yd-ff-mono);
          font-size: 11px;
          outline: none;
          min-width: 0;
        }
        .yd-set-input:focus { border-color: rgba(74,222,128,0.4); }
        .yd-set-browse {
          padding: 7px 12px;
          background: var(--yd-bg3);
          color: var(--yd-t1);
          border: 1px solid var(--yd-border);
          border-radius: var(--yd-radius);
          font-family: var(--yd-ff-ui);
          font-size: 11px;
          letter-spacing: 0.05em;
          transition: all 0.18s;
        }
        .yd-set-browse:hover {
          background: var(--yd-bg4);
          color: var(--yd-t0);
        }

        .yd-set-radios {
          display: flex; flex-wrap: wrap; gap: 4px;
        }
        .yd-set-radio {
          min-width: 38px;
          padding: 6px 11px;
          background: var(--yd-bg2);
          color: var(--yd-t1);
          border: 1px solid var(--yd-border);
          border-radius: 6px;
          font-family: var(--yd-ff-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          transition: all 0.18s;
        }
        .yd-set-radio:hover {
          background: var(--yd-bg3);
          color: var(--yd-t0);
        }
        .yd-set-radio-on {
          background: rgba(74,222,128,0.1);
          color: var(--yd-g);
          border-color: rgba(74,222,128,0.4);
        }
        .yd-theme-apathy .yd-set-radio-on {
          background: rgba(255,59,124,0.1);
          color: #FF3B7C;
          border-color: rgba(255,59,124,0.4);
        }

        /* ── Theme cards ── */
        .yd-theme-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .yd-tc {
          display: flex; flex-direction: column;
          padding: 0;
          background: var(--yd-bg1);
          border: 1.5px solid var(--yd-border);
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.18s;
        }
        .yd-tc:hover { border-color: var(--yd-border2); }
        .yd-tc-on {
          border-color: var(--yd-g);
          box-shadow: 0 0 0 1px var(--yd-g), 0 0 12px color-mix(in srgb, var(--yd-g) 25%, transparent);
        }
        .yd-theme-apathy .yd-tc-on {
          border-color: #FF3B7C;
          box-shadow: 0 0 0 1px #FF3B7C, 0 0 14px rgba(255,59,124,0.3);
        }

        .yd-tc-preview {
          position: relative;
          aspect-ratio: 16 / 9;
          display: grid;
          grid-template-columns: 22% 1fr;
          overflow: hidden;
        }
        .yd-tc-fleet { background: #05050A; }
        .yd-tc-apathy { background: #0A0A0C; }
        .yd-tc-ap-orb1 {
          position: absolute;
          width: 60%; height: 100%;
          background: radial-gradient(circle at 30% 50%, rgba(255,59,124,0.5), transparent 65%);
          top: 0; left: -20%;
          filter: blur(10px);
        }
        .yd-tc-ap-orb2 {
          position: absolute;
          width: 50%; height: 100%;
          background: radial-gradient(circle at 70% 50%, rgba(77,124,255,0.45), transparent 65%);
          top: 0; right: -20%;
          filter: blur(10px);
        }
        .yd-tc-sb {
          background: rgba(255,255,255,0.03);
          padding: 6px 5px;
          display: flex; flex-direction: column;
          gap: 4px;
          position: relative;
          z-index: 2;
        }
        .yd-tc-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4ADE80;
          box-shadow: 0 0 4px #4ADE80;
          margin-bottom: 4px;
        }
        .yd-tc-line {
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.08);
        }
        .yd-tc-line-on {
          background: #4ADE80;
          opacity: 0.7;
        }
        .yd-tc-main {
          padding: 6px 8px;
          display: flex; flex-direction: column;
          gap: 5px;
          position: relative;
          z-index: 2;
        }
        .yd-tc-bar {
          height: 5px;
          border-radius: 2px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .yd-tc-bar-fill {
          height: 100%;
          width: 60%;
          background: #4ADE80;
        }
        .yd-tc-accent {
          height: 8px;
          width: 28px;
          border-radius: 3px;
          background: #4ADE80;
          opacity: 0.45;
        }

        .yd-tc-foot {
          display: flex; justify-content: space-between; align-items: center;
          padding: 6px 9px;
          background: var(--yd-bg2);
          border-top: 1px solid var(--yd-border);
        }
        .yd-tc-name {
          font-family: var(--yd-ff-ui);
          font-size: 11px;
          font-weight: 600;
          color: var(--yd-t0);
          letter-spacing: 0.04em;
        }
        .yd-tc-check {
          width: 14px; height: 14px;
          border-radius: 50%;
          background: var(--yd-g);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .yd-tc-check svg { width: 8px; height: 7px; }
        .yd-theme-apathy .yd-tc-on .yd-tc-check { background: #FF3B7C; }

        /* ════════════════════════════════════════════════
           UPLOADER MOCK (YouDesktopUploader-3)
           Genre: psychedelic cyber-brutalist
           Source: F:\ProjectHub\archive\YouDekstopUploader-3
           ════════════════════════════════════════════════ */
        .fp-uploader {
          --ul-void:    #050505;
          --ul-surface: #111111;
          --ul-elev:    #1a1a1a;
          --ul-panel:   #141414;
          --ul-green:   #39FF14;
          --ul-green-d: rgba(57,255,20,0.15);
          --ul-magenta: #FF00FF;
          --ul-orange:  #FF6B1A;
          --ul-cyan:    #00FFFF;
          --ul-red:     #FF3333;
          --ul-t0:      #e0e0e0;
          --ul-t1:      #888888;
          --ul-t2:      #444444;
          --ul-border:  rgba(57,255,20,0.15);
          --ul-mono:    'JetBrains Mono', 'Fira Code', Consolas, monospace;

          display: grid;
          grid-template-rows: 38px auto 1fr 24px;
          padding: 0;
          background: var(--ul-void);
          color: var(--ul-t0);
          font-family: var(--ul-mono);
          font-size: 12px;
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        /* scanline overlay — signature look */
        .upl-scanlines {
          position: absolute; inset: 0;
          z-index: 10;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent 0,
            transparent 2px,
            rgba(0,0,0,0.18) 2px,
            rgba(0,0,0,0.18) 4px
          );
        }

        /* ─── title bar ─── */
        .upl-titlebar {
          display: flex; align-items: center;
          background: var(--ul-surface);
          border-bottom: 1px solid var(--ul-border);
          padding: 0 8px 0 12px;
          z-index: 2;
        }
        .upl-tb-left {
          display: flex; align-items: center; gap: 10px;
        }
        .upl-hex {
          color: var(--ul-green);
          font-size: 16px;
          line-height: 1;
          filter: drop-shadow(0 0 4px var(--ul-green));
        }
        .upl-appname {
          color: var(--ul-green);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
        }
        .upl-conn {
          display: flex; align-items: center; gap: 6px;
          color: var(--ul-t1);
          font-size: 10px;
          letter-spacing: 0.04em;
          padding-left: 12px;
          border-left: 1px solid var(--ul-border);
          margin-left: 4px;
        }
        .upl-conn-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--ul-green);
          box-shadow: 0 0 4px var(--ul-green);
          animation: upl-blink 2s ease-in-out infinite;
        }
        @keyframes upl-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
        .upl-conn-proto {
          color: var(--ul-cyan);
          font-size: 9.5px;
        }
        .upl-tb-drag { flex: 1; }
        .upl-tb-right {
          display: flex; align-items: center; gap: 4px;
        }
        .upl-btn-disconnect {
          background: transparent;
          border: 1px solid rgba(255,51,51,0.3);
          color: var(--ul-red);
          font-family: var(--ul-mono);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 3px 9px;
          border-radius: 2px;
          margin-right: 6px;
          transition: all 0.18s;
        }
        .upl-btn-disconnect:hover {
          background: rgba(255,51,51,0.1);
          border-color: var(--ul-red);
        }
        .upl-wc {
          width: 26px; height: 26px;
          background: transparent;
          color: var(--ul-t2);
          font-family: var(--ul-mono);
          font-size: 12px;
          display: inline-flex;
          align-items: center; justify-content: center;
          border-radius: 2px;
          transition: all 0.18s;
        }
        .upl-wc:hover { color: var(--ul-t0); background: var(--ul-elev); }
        .upl-wc-close:hover { color: var(--ul-red); background: rgba(255,51,51,0.15); }

        /* ─── nav tabs ─── */
        .upl-navbar {
          display: flex;
          background: var(--ul-surface);
          border-bottom: 1px solid var(--ul-border);
          z-index: 2;
        }
        .upl-nav-tab {
          background: transparent;
          color: var(--ul-t1);
          font-family: var(--ul-mono);
          font-size: 10.5px;
          letter-spacing: 0.12em;
          padding: 8px 18px;
          border-bottom: 2px solid transparent;
          transition: color 0.18s, border-color 0.18s;
          display: inline-flex; align-items: center; gap: 7px;
        }
        .upl-nav-tab:hover { color: var(--ul-t0); }
        .upl-nav-tab-on {
          color: var(--ul-green);
          border-bottom-color: var(--ul-green);
          font-weight: 700;
        }
        .upl-change-badge {
          background: var(--ul-orange);
          color: #000;
          font-size: 9px;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 2px;
        }

        /* ─── main content with crossfade slots ─── */
        .upl-content {
          position: relative;
          overflow: hidden;
          z-index: 1;
          min-height: 0;
        }
        .upl-screen-slot {
          position: absolute;
          inset: 0;
          overflow: auto;
          opacity: 0;
          transform: translateY(10px) scale(0.997);
          pointer-events: none;
          transition:
            opacity 700ms cubic-bezier(0.4, 0, 0.2, 1),
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .upl-screen-slot.is-on {
          opacity: 1;
          transform: none;
          pointer-events: auto;
          transition:
            opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 60ms,
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 60ms;
        }
        @keyframes upl-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* nav tabs — smooth slide-in when connected */
        .upl-navbar {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          padding: 0;
          transition:
            max-height 520ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 360ms ease,
            padding 520ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .upl-navbar.is-on {
          max-height: 40px;
          opacity: 1;
        }
        .upl-nav-tab {
          transition:
            color 360ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 420ms cubic-bezier(0.16, 1, 0.3, 1),
            font-weight 320ms ease;
        }

        /* connection status in titlebar — fade in/out */
        .upl-conn {
          opacity: 0;
          max-width: 0;
          overflow: hidden;
          white-space: nowrap;
          padding-left: 0 !important;
          margin-left: 0 !important;
          border-left-width: 0 !important;
          transition:
            opacity 480ms cubic-bezier(0.16, 1, 0.3, 1) 120ms,
            max-width 600ms cubic-bezier(0.16, 1, 0.3, 1),
            padding 600ms cubic-bezier(0.16, 1, 0.3, 1),
            margin 600ms cubic-bezier(0.16, 1, 0.3, 1),
            border-width 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .upl-conn.is-on {
          opacity: 1;
          max-width: 320px;
          padding-left: 12px !important;
          margin-left: 4px !important;
          border-left-width: 1px !important;
        }

        /* DISCONNECT button + window controls — softer transitions */
        .upl-btn-disconnect {
          transition:
            background 320ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 320ms cubic-bezier(0.16, 1, 0.3, 1),
            color 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* CHANGES badge in nav — gentle scale-in */
        .upl-change-badge {
          display: inline-block;
          transform-origin: center;
          animation: upl-badge-pop 480ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes upl-badge-pop {
          0%   { transform: scale(0.4); opacity: 0; }
          70%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* tab indicator — smooth underline */
        .upl-nav-tab {
          position: relative;
        }
        .upl-nav-tab::after {
          content: '';
          position: absolute;
          left: 18px; right: 18px;
          bottom: 0;
          height: 2px;
          background: var(--ul-green);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 480ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .upl-nav-tab.upl-nav-tab-on::after {
          transform: scaleX(1);
        }
        /* hide the original border-bottom on active since we use ::after now */
        .upl-nav-tab-on { border-bottom-color: transparent; }

        /* ─── SCREEN 1: connect ─── */
        .upl-screen { padding: 18px 22px; }
        .upl-conn-header {
          position: relative;
          padding: 12px 0 16px;
          border-bottom: 1px solid var(--ul-border);
          margin-bottom: 14px;
          overflow: hidden;
        }
        .upl-hex-grid {
          position: absolute; inset: 0;
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          align-items: center;
          padding: 0 0.5rem;
          color: var(--ul-green);
          font-size: 28px;
          pointer-events: none;
        }
        .upl-hex-bg { text-align: center; }
        .upl-title-h1 {
          font-family: var(--ul-mono);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--ul-green);
          position: relative;
          z-index: 1;
          text-shadow: 0 0 8px rgba(57,255,20,0.45);
        }
        .upl-title-sub {
          color: var(--ul-t1);
          font-size: 10.5px;
          letter-spacing: 0.08em;
          margin-top: 4px;
          position: relative;
          z-index: 1;
        }

        .upl-conn-body {
          display: flex; flex-direction: column;
          gap: 8px;
        }
        .upl-section-label {
          color: var(--ul-t1);
          font-size: 9.5px;
          letter-spacing: 0.18em;
          padding-bottom: 4px;
        }
        .upl-section-label-spaced { margin-top: 10px; }
        .upl-profile-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .upl-profile-card {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 10px;
          background: var(--ul-panel);
          border: 1px solid var(--ul-border);
          border-radius: 2px;
          transition: all 0.18s;
        }
        .upl-profile-card:hover {
          border-color: rgba(57,255,20,0.45);
          background: var(--ul-elev);
        }
        .upl-profile-card.is-active {
          border-color: var(--ul-green);
          background: rgba(57,255,20,0.06);
          box-shadow: 0 0 0 1px var(--ul-green), 0 0 12px rgba(57,255,20,0.18);
        }
        .upl-profile-name {
          color: var(--ul-green);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .upl-profile-meta {
          color: var(--ul-t2);
          font-size: 9.5px;
          letter-spacing: 0.03em;
          margin-top: 1px;
        }
        .upl-delete-btn {
          background: transparent;
          color: var(--ul-t2);
          font-size: 11px;
          padding: 2px 4px;
          transition: color 0.18s;
        }
        .upl-delete-btn:hover { color: var(--ul-red); }

        .upl-form { display: flex; flex-direction: column; gap: 8px; }
        .upl-form-row { display: flex; gap: 8px; }
        .upl-field {
          display: flex; flex-direction: column;
          gap: 3px;
        }
        .upl-field-grow { flex: 1; min-width: 0; }
        .upl-field-port { width: 80px; flex-shrink: 0; }
        .upl-field-label {
          color: var(--ul-t1);
          font-size: 9px;
          letter-spacing: 0.14em;
        }
        .upl-field-input {
          background: var(--ul-panel);
          border: 1px solid var(--ul-border);
          color: var(--ul-green);
          font-family: var(--ul-mono);
          font-size: 11.5px;
          padding: 6px 9px;
          border-radius: 2px;
          outline: none;
        }
        .upl-field-input:focus { border-color: var(--ul-green); }

        .upl-protocol-toggle {
          display: flex;
          background: var(--ul-panel);
          border: 1px solid var(--ul-border);
          border-radius: 2px;
          padding: 2px;
          width: fit-content;
        }
        .upl-proto-opt {
          background: transparent;
          color: var(--ul-t1);
          font-family: var(--ul-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 5px 14px;
          transition: all 0.18s;
        }
        .upl-proto-opt-on {
          background: rgba(57,255,20,0.12);
          color: var(--ul-green);
          box-shadow: inset 0 0 0 1px rgba(57,255,20,0.35);
        }

        .upl-actions {
          display: flex; gap: 8px;
          margin-top: 6px;
        }
        .upl-btn {
          background: transparent;
          border: 1px solid var(--ul-border);
          color: var(--ul-t1);
          font-family: var(--ul-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 7px 14px;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.18s;
        }
        .upl-btn:hover { color: var(--ul-t0); border-color: rgba(57,255,20,0.4); }
        .upl-btn-secondary { color: var(--ul-cyan); border-color: rgba(0,255,255,0.25); }
        .upl-btn-secondary:hover { background: rgba(0,255,255,0.08); color: var(--ul-cyan); border-color: var(--ul-cyan); }
        .upl-btn-primary {
          background: rgba(57,255,20,0.1);
          color: var(--ul-green);
          border-color: var(--ul-green);
          flex: 1;
          animation: upl-pulse-glow 2.4s ease-in-out infinite;
        }
        .upl-btn-primary:hover {
          background: rgba(57,255,20,0.18);
          box-shadow: 0 0 12px var(--ul-green-d);
        }
        @keyframes upl-pulse-glow {
          0%, 100% { box-shadow: 0 0 4px var(--ul-green), 0 0 8px rgba(57,255,20,0.3); }
          50%      { box-shadow: 0 0 12px var(--ul-green), 0 0 22px rgba(57,255,20,0.4); }
        }
        .upl-btn-tiny { padding: 4px 10px; font-size: 10px; }

        /* ─── SCREEN 2: mapping ─── */
        .upl-screen-mapping { display: flex; flex-direction: column; gap: 10px; padding-bottom: 14px; }
        .upl-mapping-head {
          padding-bottom: 10px;
          border-bottom: 1px solid var(--ul-border);
        }
        .upl-screen-title {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--ul-green);
          font-family: var(--ul-mono);
        }
        .upl-screen-sub {
          color: var(--ul-t1);
          font-size: 10.5px;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }

        .upl-mapping-cols {
          display: grid;
          grid-template-columns: 1fr 50px 1fr;
          gap: 4px;
          align-items: stretch;
          min-height: 0;
        }
        .upl-panel {
          display: flex; flex-direction: column;
          background: var(--ul-panel);
          border: 1px solid var(--ul-border);
          border-radius: 2px;
          min-height: 0;
        }
        .upl-panel-head {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 10px;
          background: rgba(57,255,20,0.05);
          border-bottom: 1px solid var(--ul-border);
        }
        .upl-panel-tag {
          color: var(--ul-green);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          padding: 1px 6px;
          background: rgba(57,255,20,0.12);
          border: 1px solid rgba(57,255,20,0.35);
          border-radius: 1px;
        }
        .upl-panel-tag.is-remote {
          color: var(--ul-cyan);
          background: rgba(0,255,255,0.1);
          border-color: rgba(0,255,255,0.35);
        }
        .upl-panel-path {
          color: var(--ul-t1);
          font-size: 10.5px;
          letter-spacing: 0.02em;
        }

        .upl-tree {
          flex: 1;
          padding: 5px 0;
          font-size: 10.5px;
          overflow: auto;
        }
        .upl-tree-row {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          align-items: center;
          padding: 2px 10px;
          color: var(--ul-t0);
          letter-spacing: 0.02em;
          line-height: 1.55;
          transition: background 0.12s;
        }
        .upl-tree-row:hover { background: rgba(57,255,20,0.06); }
        .upl-tree-row.is-dim { color: var(--ul-t1); }
        .upl-tree-i {
          color: var(--ul-green);
          font-size: 9px;
          letter-spacing: 0;
          white-space: pre;
        }
        .upl-tree-row.is-dim .upl-tree-i { color: var(--ul-t2); }
        .upl-tree-n { color: inherit; }
        .upl-tree-ext { color: var(--ul-t2); font-size: 9.5px; }

        .upl-panel-foot {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 10px;
          background: var(--ul-elev);
          border-top: 1px solid var(--ul-border);
          color: var(--ul-t1);
          font-size: 9px;
          letter-spacing: 0.1em;
        }
        .upl-foot-spacer { flex: 1; }
        .upl-foot-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--ul-green);
          box-shadow: 0 0 4px var(--ul-green);
          animation: upl-blink 1.8s infinite;
        }
        .upl-foot-dot-cyan { background: var(--ul-cyan); box-shadow: 0 0 4px var(--ul-cyan); }

        .upl-mapping-arrow {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 4px;
          color: var(--ul-green);
        }
        .upl-arrow-line {
          flex: 1;
          width: 1px;
          background: linear-gradient(180deg, transparent, var(--ul-green), transparent);
          min-height: 20px;
        }
        .upl-arrow-glyph {
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
          text-shadow: 0 0 8px var(--ul-green);
        }
        .upl-arrow-meta {
          color: var(--ul-t1);
          font-size: 8px;
          letter-spacing: 0.2em;
          margin-top: 4px;
        }

        .upl-mapping-actions {
          display: flex; gap: 8px;
          padding-top: 6px;
        }

        /* ─── SCREEN 3: changes (diff) ─── */
        .upl-screen-changes {
          display: flex; flex-direction: column;
          gap: 10px;
          padding-bottom: 14px;
        }
        .upl-changes-head {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--ul-border);
        }
        .upl-changes-count {
          color: var(--ul-orange);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          margin-left: 8px;
        }
        .upl-changes-actions { display: flex; gap: 6px; }

        .upl-changes-cols {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 4px;
          align-items: stretch;
          min-height: 0;
        }

        .upl-changes-list {
          background: var(--ul-panel);
          border: 1px solid var(--ul-border);
          border-radius: 2px;
          padding: 4px 0;
          overflow: auto;
          font-size: 10.5px;
        }
        .upl-chg-row {
          display: grid;
          grid-template-columns: 16px 14px 1fr auto;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          color: var(--ul-t1);
          transition: background 0.12s;
        }
        .upl-chg-row:hover { background: rgba(57,255,20,0.06); }
        .upl-chg-row.is-on { color: var(--ul-t0); }
        .upl-chg-row.is-focus {
          background: rgba(57,255,20,0.12);
          border-left: 2px solid var(--ul-green);
          padding-left: 6px;
        }
        .upl-chg-checkbox {
          color: var(--ul-green);
          font-size: 10px;
        }
        .upl-chg-checkbox[data-on="false"] { color: var(--ul-t2); }
        .upl-chg-mark {
          font-weight: 700;
          font-size: 11px;
          text-align: center;
        }
        .upl-chg-mark-add { color: var(--ul-green); }
        .upl-chg-mark-del { color: var(--ul-red); }
        .upl-chg-mark-mod { color: var(--ul-orange); }
        .upl-chg-name {
          font-size: 10.5px;
          letter-spacing: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .upl-chg-diff {
          display: inline-flex; gap: 5px;
          font-size: 9px;
        }
        .upl-chg-add { color: var(--ul-green); }
        .upl-chg-del { color: var(--ul-red); }

        .upl-diff {
          display: flex; flex-direction: column;
          background: var(--ul-panel);
          border: 1px solid var(--ul-border);
          border-radius: 2px;
          min-height: 0;
        }
        .upl-diff-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 6px 10px;
          background: rgba(57,255,20,0.05);
          border-bottom: 1px solid var(--ul-border);
        }
        .upl-diff-path {
          color: var(--ul-green);
          font-size: 10.5px;
          letter-spacing: 0.02em;
        }
        .upl-diff-counts {
          display: inline-flex; gap: 8px;
          font-size: 10px;
          font-weight: 700;
        }
        .upl-diff-body {
          overflow: auto;
          padding: 4px 0;
          font-size: 10.5px;
          line-height: 1.5;
          background: #0a0a0a;
        }
        .upl-diff-line {
          display: grid;
          grid-template-columns: 16px 30px 1fr;
          gap: 4px;
          padding: 1px 10px;
          align-items: baseline;
        }
        .upl-diff-add {
          background: rgba(57,255,20,0.08);
          color: var(--ul-green);
        }
        .upl-diff-del {
          background: rgba(255,51,51,0.08);
          color: var(--ul-red);
          opacity: 0.85;
        }
        .upl-diff-ctx { color: var(--ul-t1); }
        .upl-diff-ln {
          color: inherit;
          font-weight: 700;
          font-size: 10px;
          text-align: center;
          opacity: 0.6;
        }
        .upl-diff-num {
          color: var(--ul-t2);
          font-size: 9.5px;
          text-align: right;
        }
        .upl-diff-code {
          color: inherit;
          font-family: var(--ul-mono);
          font-size: 10.5px;
          white-space: pre;
          letter-spacing: 0;
        }

        /* ─── bottom bar ─── */
        .upl-bottombar {
          display: flex;
          justify-content: space-between; align-items: center;
          padding: 0 12px;
          background: var(--ul-surface);
          border-top: 1px solid var(--ul-border);
          z-index: 2;
        }
        .upl-console-toggle {
          background: transparent;
          color: var(--ul-t2);
          font-family: var(--ul-mono);
          font-size: 9.5px;
          letter-spacing: 0.1em;
          padding: 0;
          transition: color 0.18s;
        }
        .upl-console-toggle:hover { color: var(--ul-green); }
        .upl-screen-meta {
          color: var(--ul-cyan);
          font-size: 9.5px;
          letter-spacing: 0.14em;
        }
        .upl-version {
          color: var(--ul-t2);
          font-size: 9.5px;
          letter-spacing: 0.06em;
        }

        .fp-uploader .fp-corner {
          z-index: 11;
          bottom: 1.8rem;
          color: var(--ul-t2);
        }

        /* ═══════ v2 ADDITIONS — match real screenshots ═══════ */

        /* — bottom bar without screen indicator — */
        .upl-bottombar { grid-template-columns: auto 1fr; }

        /* — Connect: centered card layout — */
        .upl-conn-center {
          max-width: 540px;
          margin: 0 auto;
          padding: 28px 18px 24px;
        }
        .upl-hex-strip {
          display: flex; justify-content: center; gap: 9px;
          margin-bottom: 18px;
        }
        .upl-hex-dot {
          color: var(--ul-green);
          font-size: 14px;
          line-height: 1;
        }
        .upl-conn-card {
          padding: 18px;
          background: rgba(20,20,20,0.55);
          border: 1px solid var(--ul-border);
          border-radius: 2px;
          margin-top: 18px;
        }
        .upl-profile-stack {
          display: flex; flex-direction: column;
          gap: 6px;
          margin-bottom: 4px;
        }
        .upl-profile-stack .upl-profile-card {
          width: 100%;
          padding: 10px 12px;
        }
        .upl-protocol-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          gap: 0;
          padding: 0;
          background: var(--ul-panel);
          border: 1px solid var(--ul-border);
        }
        .upl-protocol-toggle .upl-proto-opt {
          padding: 10px 0;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-align: center;
          border-radius: 0;
        }
        .upl-protocol-toggle .upl-proto-opt-on {
          background: var(--ul-green-d);
          color: var(--ul-green);
          box-shadow: inset 0 0 0 1px rgba(57,255,20,0.5);
          text-shadow: 0 0 6px rgba(57,255,20,0.55);
        }

        .upl-form-row-spaced { margin-top: 8px; }
        .upl-field-ghost { color: var(--ul-t1) !important; }

        .upl-save-profile {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 14px;
          color: var(--ul-t1);
          font-size: 11px;
          letter-spacing: 0.1em;
          cursor: pointer;
        }
        .upl-checkbox-box {
          width: 14px; height: 14px;
          display: inline-flex;
          background: var(--ul-panel);
          border: 1px solid var(--ul-border);
          border-radius: 1px;
          flex-shrink: 0;
        }
        .upl-checkbox-box[data-on="true"] {
          background: var(--ul-green);
          border-color: var(--ul-green);
          box-shadow: 0 0 6px rgba(57,255,20,0.5);
        }
        .upl-conn-card .upl-actions {
          margin-top: 16px;
        }
        .upl-btn-outline {
          background: transparent;
          border: 1px solid var(--ul-border);
          color: var(--ul-t1);
          flex: 0 0 auto;
          padding: 10px 18px;
        }
        .upl-btn-outline:hover {
          color: var(--ul-t0);
          border-color: rgba(57,255,20,0.4);
        }
        .upl-btn-mount {
          flex: 1;
          background: var(--ul-green);
          color: #000;
          border: 0;
          padding: 11px 18px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          box-shadow: 0 0 14px rgba(57,255,20,0.5), 0 0 26px rgba(57,255,20,0.25);
          transition: filter 0.18s, transform 0.12s;
          animation: none;
        }
        .upl-btn-mount:hover {
          filter: brightness(1.1);
          box-shadow: 0 0 18px rgba(57,255,20,0.7), 0 0 36px rgba(57,255,20,0.35);
        }
        .upl-btn-wide {
          width: 100%;
          padding: 14px 18px;
          margin-top: 10px;
        }
        .upl-link-glyph {
          color: #000;
          margin-right: 6px;
        }

        /* — Mapping: recent + pair panels — */
        .upl-mapping-head { text-align: center; padding-bottom: 14px; border-bottom: 1px solid var(--ul-border); margin-bottom: 16px; }
        .upl-mapping-title {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.32em;
          color: var(--ul-cyan);
          text-shadow: 0 0 8px rgba(0,255,255,0.5);
        }
        .upl-mapping-sub { margin-top: 4px; }

        .upl-recent {
          margin-bottom: 14px;
        }
        .upl-recent-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          color: var(--ul-t1);
          padding-bottom: 8px;
        }
        .upl-recent-hint { color: var(--ul-t2); font-size: 9.5px; }
        .upl-recent-row {
          display: grid;
          grid-template-columns: 1fr 30px 1fr 24px 24px;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          background: var(--ul-panel);
          border: 1px solid var(--ul-border);
          margin-bottom: 4px;
          font-size: 10.5px;
          color: var(--ul-t0);
          letter-spacing: 0.01em;
        }
        .upl-recent-row:hover {
          border-color: rgba(57,255,20,0.4);
          background: var(--ul-elev);
        }
        .upl-recent-local { color: var(--ul-green); }
        .upl-recent-arrow { color: var(--ul-cyan); text-align: center; }
        .upl-recent-remote { color: var(--ul-t1); text-align: right; }
        .upl-recent-action {
          width: 22px; height: 22px;
          background: transparent;
          color: var(--ul-t2);
          font-size: 11px;
          border: 1px solid var(--ul-border);
          border-radius: 1px;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .upl-recent-action:hover { color: var(--ul-green); border-color: rgba(57,255,20,0.35); }
        .upl-recent-action-x:hover { color: var(--ul-red); border-color: rgba(255,51,51,0.35); }

        .upl-pair {
          display: grid;
          grid-template-columns: 1fr 18px 1fr;
          gap: 0;
          align-items: stretch;
          margin-bottom: 12px;
          min-height: 200px;
        }
        .upl-pair-dot {
          align-self: center; justify-self: center;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--ul-green);
          box-shadow: 0 0 8px var(--ul-green);
          animation: upl-blink 1.6s infinite;
        }
        .upl-panel-tag-text {
          color: var(--ul-t1);
          font-size: 11px;
          letter-spacing: 0.16em;
          font-weight: 600;
        }
        .upl-panel-badge {
          background: var(--ul-green);
          color: #000;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          padding: 2px 7px;
          border-radius: 1px;
        }
        .upl-panel-badge.is-cyan { background: var(--ul-cyan); }
        .upl-panel-body {
          flex: 1;
          padding: 10px 12px;
          font-size: 10.5px;
          overflow: auto;
        }
        .upl-panel-empty {
          display: flex; align-items: center; justify-content: center;
          color: var(--ul-t2);
          font-size: 11px;
          letter-spacing: 0.04em;
        }
        .upl-panel-foot-flat {
          padding: 8px 10px;
          border-top: 1px solid var(--ul-border);
        }
        .upl-browse-btn {
          width: 100%;
          background: transparent;
          color: var(--ul-t0);
          border: 1px solid var(--ul-border);
          font-family: var(--ul-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          padding: 8px 12px;
          border-radius: 1px;
          transition: all 0.18s;
        }
        .upl-browse-btn:hover {
          background: var(--ul-elev);
          border-color: rgba(57,255,20,0.4);
        }
        .upl-path-bar {
          display: inline-flex; align-items: center; gap: 6px;
          margin-bottom: 8px;
          padding: 4px 8px;
          background: var(--ul-elev);
          border: 1px solid var(--ul-border);
          font-size: 10px;
        }
        .upl-path-up {
          background: transparent;
          color: var(--ul-t1);
          border: 1px solid var(--ul-border);
          padding: 2px 6px;
          border-radius: 1px;
        }
        .upl-path-current { color: var(--ul-green); font-size: 11px; }
        .upl-tree-arrow { color: var(--ul-green); }
        .upl-tree-name { color: var(--ul-t0); }
        .upl-tree-selected {
          margin-top: 6px;
          padding: 4px 0 0;
          border-top: 1px dashed var(--ul-border);
          font-size: 10px;
          color: var(--ul-t2);
        }
        .upl-tree-selected-label { letter-spacing: 0.06em; }
        .upl-tree-selected-path { color: var(--ul-cyan); margin-left: 4px; }

        /* — Changes: sidebar + diff — */
        .upl-screen-changes-wrap {
          display: grid;
          grid-template-columns: 200px 1fr;
          align-items: stretch;
          height: 100%;
          background: var(--ul-void);
        }
        .upl-chg-side {
          background: var(--ul-surface);
          border-right: 1px solid var(--ul-border);
          display: flex; flex-direction: column;
          font-size: 10.5px;
          min-height: 0;
        }
        .upl-chg-side-head {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 10px 12px;
          border-bottom: 1px solid var(--ul-border);
        }
        .upl-chg-side-h {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--ul-t0);
        }
        .upl-chg-side-meta { color: var(--ul-t2); font-size: 10px; letter-spacing: 0.04em; }
        .upl-chg-refresh { color: var(--ul-cyan); margin-left: 4px; }

        .upl-chg-ignored {
          padding: 8px 12px;
          border-bottom: 1px solid var(--ul-border);
        }
        .upl-chg-ignored-head {
          display: flex; justify-content: space-between;
          font-size: 9.5px;
          letter-spacing: 0.12em;
        }
        .upl-chg-ignored-label { color: var(--ul-orange); }
        .upl-chg-ignored-clear {
          background: transparent;
          color: var(--ul-t1);
          font-family: var(--ul-mono);
          font-size: 9.5px;
          letter-spacing: 0.06em;
          text-transform: lowercase;
          text-decoration: underline;
          padding: 0;
        }

        .upl-chg-selected-row {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px;
          border-bottom: 1px solid var(--ul-border);
          color: var(--ul-green);
          font-size: 10.5px;
          letter-spacing: 0.04em;
        }

        .upl-chg-file-list {
          flex: 1;
          overflow: auto;
          padding: 4px 0;
        }
        .upl-chg-file {
          display: grid;
          grid-template-columns: 14px 14px 1fr;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          color: var(--ul-t1);
          transition: background 0.12s, color 0.12s;
        }
        .upl-chg-file:hover { background: rgba(57,255,20,0.05); color: var(--ul-t0); }
        .upl-chg-file.is-focus {
          background: rgba(57,255,20,0.1);
          border-left: 2px solid var(--ul-green);
          padding-left: 10px;
          color: var(--ul-t0);
        }
        .upl-chg-file-mark { color: var(--ul-orange); font-weight: 700; text-align: center; }
        .upl-chg-file-meta { display: flex; flex-direction: column; min-width: 0; }
        .upl-chg-file-name {
          color: inherit;
          font-size: 11px;
          letter-spacing: 0.02em;
          white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .upl-chg-file-sub {
          color: var(--ul-t2);
          font-size: 9.5px;
        }

        .upl-chg-deploy {
          padding: 10px 12px 14px;
          border-top: 1px solid var(--ul-border);
          display: flex; flex-direction: column; gap: 6px;
        }
        .upl-chg-deploy-label {
          color: var(--ul-cyan);
          font-size: 9.5px;
          letter-spacing: 0.14em;
        }
        .upl-chg-deploy-row { display: flex; gap: 4px; }
        .upl-chg-deploy-input {
          flex: 1;
          background: var(--ul-panel);
          border: 1px solid var(--ul-border);
          color: var(--ul-t0);
          font-family: var(--ul-mono);
          font-size: 10px;
          padding: 5px 8px;
          border-radius: 1px;
          min-width: 0;
        }
        .upl-chg-deploy-save {
          background: var(--ul-elev);
          color: var(--ul-t1);
          border: 1px solid var(--ul-border);
          font-family: var(--ul-mono);
          font-size: 9.5px;
          letter-spacing: 0.08em;
          padding: 5px 10px;
          border-radius: 1px;
        }
        .upl-btn-deploy {
          width: 100%;
          padding: 11px 12px;
          font-size: 12px;
          letter-spacing: 0.18em;
          margin-top: 6px;
        }
        .upl-chg-sync {
          background: transparent;
          color: var(--ul-t1);
          border: 1px solid var(--ul-border);
          font-family: var(--ul-mono);
          font-size: 9.5px;
          letter-spacing: 0.12em;
          padding: 7px 8px;
          border-radius: 1px;
        }
        .upl-chg-sync:hover {
          color: var(--ul-cyan);
          border-color: rgba(0,255,255,0.35);
        }

        /* — Diff main — */
        .upl-diff-main {
          display: flex; flex-direction: column;
          background: var(--ul-void);
          min-height: 0;
          overflow: hidden;
        }
        .upl-diff-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 14px;
          border-bottom: 1px solid var(--ul-border);
        }
        .upl-diff-file {
          color: var(--ul-t0);
          font-size: 11px;
          letter-spacing: 0.02em;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .upl-diff-icon { color: var(--ul-t2); font-size: 12px; }
        .upl-diff-badge {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          padding: 2px 7px;
          border-radius: 1px;
        }
        .upl-diff-badge-mod {
          background: rgba(255,107,26,0.15);
          color: var(--ul-orange);
          border: 1px solid rgba(255,107,26,0.4);
        }
        .upl-diff-badge-rename {
          background: rgba(0,255,255,0.12);
          color: var(--ul-cyan);
          border: 1px solid rgba(0,255,255,0.35);
        }

        .upl-diff-renamed {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 14px;
          border-bottom: 1px solid var(--ul-border);
          background: var(--ul-surface);
          font-size: 10px;
          color: var(--ul-t1);
        }
        .upl-diff-renamed-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .upl-diff-body {
          flex: 1;
          overflow: auto;
          padding: 0;
          font-size: 10px;
          line-height: 1.55;
          background: #060606;
        }
        .upl-diff-hunk {
          padding: 4px 14px;
          color: var(--ul-cyan);
          font-size: 10px;
          letter-spacing: 0.02em;
          background: rgba(0,255,255,0.04);
        }
        .upl-diff-line {
          display: grid;
          grid-template-columns: 36px 36px 16px 1fr;
          gap: 0;
          align-items: baseline;
          padding-left: 4px;
        }
        .upl-diff-add {
          background: rgba(57,255,20,0.1);
          color: var(--ul-green);
        }
        .upl-diff-del {
          background: rgba(255,51,51,0.1);
          color: var(--ul-red);
        }
        .upl-diff-ctx { color: var(--ul-t1); background: transparent; }
        .upl-diff-num {
          text-align: right;
          padding-right: 8px;
          color: var(--ul-t2);
          font-size: 9.5px;
          letter-spacing: 0;
        }
        .upl-diff-marker {
          text-align: center;
          font-weight: 700;
          opacity: 0.7;
        }
        .upl-diff-code {
          padding-left: 6px;
          white-space: pre;
          font-family: var(--ul-mono);
          font-size: 10.5px;
          letter-spacing: 0;
          color: inherit;
          overflow: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .upl-scanlines { opacity: 0.5; }
          .upl-btn-primary, .upl-btn-mount { animation: none; }
          .upl-conn-dot, .upl-foot-dot, .upl-pair-dot { animation: none; }
        }

        /* legacy class shim so the rest of the FlagshipPreview "apparmor" still works */
        .fp-app {
          display: flex;
          flex-direction: column;
          /* defer height so titlebar+body+footer stack naturally */
          --app-bg:        oklch(11% 0.008 220);
          --app-surface:   oklch(14% 0.010 215);
          --app-surface-2: oklch(18% 0.012 215);
          --app-text:      oklch(94% 0.012 200);
          --app-dim:       oklch(58% 0.015 215);
          --app-edge:      color-mix(in oklch, var(--app-text) 8%, transparent);
          --app-accent:    oklch(78% 0.155 145);    /* HUD green */
          --app-glow:      color-mix(in oklch, var(--app-accent) 50%, transparent);
        }
        .fp-app.theme-apathy {
          --app-bg:        oklch(13% 0.020 290);
          --app-surface:   color-mix(in oklch, oklch(20% 0.030 290) 70%, oklch(18% 0.015 320) 30%);
          --app-surface-2: color-mix(in oklch, oklch(26% 0.040 290) 70%, oklch(22% 0.020 320) 30%);
          --app-text:      oklch(95% 0.018 320);
          --app-dim:       oklch(64% 0.030 320);
          --app-edge:      color-mix(in oklch, oklch(85% 0.150 340) 25%, transparent);
          --app-accent:    oklch(72% 0.220 340);    /* hot pink */
          --app-glow:      color-mix(in oklch, oklch(70% 0.200 245) 60%, transparent); /* electric blue glow */
        }

        .fp-app {
          background: var(--app-bg);
          color: var(--app-text);
          transition: background var(--dur-base) var(--ease-out-quart),
                      color var(--dur-base) var(--ease-out-quart);
        }
        .fp-app.theme-apathy {
          background:
            radial-gradient(ellipse 60% 80% at 25% 30%, oklch(60% 0.25 340 / 0.22) 0%, transparent 60%),
            radial-gradient(ellipse 50% 70% at 80% 70%, oklch(60% 0.25 245 / 0.18) 0%, transparent 60%),
            var(--app-bg);
        }

        /* window chrome */
        .app-chrome {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.8rem;
          align-items: center;
          padding: 0.55rem 0.9rem;
          background: var(--app-surface);
          border-bottom: 1px solid var(--app-edge);
        }
        .app-traffic { display: inline-flex; gap: 0.35rem; }
        .app-title {
          display: inline-flex; align-items: baseline; gap: 0.5rem;
          color: var(--app-text);
        }
        .app-title .t-mono {
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          font-weight: 600;
        }
        .app-title .dim { color: var(--app-dim); font-size: var(--t-mono-xs); }
        .app-theme-tog {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.3rem 0.6rem;
          color: var(--app-dim);
          border: 1px solid var(--app-edge);
          transition: color var(--dur-fast) var(--ease-out-quart),
                      border-color var(--dur-fast) var(--ease-out-quart);
        }
        .app-theme-tog:hover { color: var(--app-accent); border-color: var(--app-accent); }
        .app-theme-swatch {
          width: 8px; height: 8px;
          background: var(--app-accent);
          box-shadow: 0 0 6px var(--app-glow);
          border-radius: 50%;
        }

        /* body */
        .app-body {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 0;
          min-height: 380px;
        }

        /* sidebar */
        .app-side {
          padding: 0.7rem 0.8rem;
          background: color-mix(in oklch, var(--app-surface) 80%, var(--app-bg) 20%);
          border-right: 1px solid var(--app-edge);
          display: flex; flex-direction: column; gap: 0.6rem;
        }
        .app-side-h {
          color: var(--app-dim);
          padding-bottom: 0.4rem;
          border-bottom: 1px dashed var(--app-edge);
        }
        .app-side-list { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .app-side-row {
          display: grid;
          grid-template-columns: auto 1fr;
          row-gap: 0.1rem;
          column-gap: 0.5rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid color-mix(in oklch, var(--app-text) 4%, transparent);
        }
        .app-side-q {
          font-size: 0.6rem;
          color: var(--app-accent);
          letter-spacing: 0.05em;
        }
        .app-side-title {
          font-family: var(--font-display);
          font-size: 0.75rem;
          color: var(--app-text);
          letter-spacing: -0.01em;
          line-height: 1.2;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .app-side-time {
          grid-column: 1 / -1;
          font-size: 0.6rem;
          color: var(--app-dim);
        }
        .app-side-stat {
          margin-top: auto;
          padding-top: 0.6rem;
          border-top: 1px solid var(--app-edge);
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem;
        }
        .app-side-stat > div {
          display: flex; flex-direction: column; gap: 0.1rem;
        }
        .app-side-stat .t-mono {
          font-size: 0.85rem;
          color: var(--app-text);
          font-weight: 600;
        }
        .app-side-stat .t-meta { color: var(--app-dim); }

        /* main panel */
        .app-main {
          padding: 0.9rem 1rem 0.7rem;
          display: flex; flex-direction: column;
          gap: 0.8rem;
          min-width: 0;
        }
        .app-url-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.5rem;
        }
        .app-url-label { color: var(--app-dim); }
        .app-input-wrap { position: relative; }
        .app-input {
          width: 100%;
          padding: 0.5rem 0.7rem;
          background: var(--app-surface);
          border: 1px solid var(--app-edge);
          color: var(--app-text);
          font-size: var(--t-mono-sm);
          letter-spacing: 0;
          transition: border-color var(--dur-fast) var(--ease-out-quart);
        }
        .app-input:focus { outline: none; border-color: var(--app-accent); }
        .app-input::placeholder { color: var(--app-dim); }
        .app-input-pulse {
          position: absolute; right: 0.6rem; top: 50%; margin-top: -3px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--app-accent);
          animation: app-pulse 1.2s var(--ease-in-out) infinite;
        }
        @keyframes app-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.4); }
        }
        .app-cta {
          padding: 0.5rem 0.9rem;
          background: var(--app-surface-2);
          color: var(--app-dim);
          border: 1px solid var(--app-edge);
          font-size: var(--t-mono-xs);
          letter-spacing: 0.1em;
          transition: all var(--dur-fast) var(--ease-out-quart);
        }
        .app-cta.is-ready {
          background: var(--app-accent);
          color: var(--app-bg);
          border-color: var(--app-accent);
          box-shadow: 0 0 12px var(--app-glow);
        }
        .app-cta:disabled { cursor: not-allowed; }

        /* video card */
        .app-video {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 0.8rem;
          padding: 0.7rem;
          background: var(--app-surface);
          border: 1px solid var(--app-edge);
          opacity: 0.65;
          transition: opacity var(--dur-base) var(--ease-out-quart);
        }
        .app-video.is-loaded { opacity: 1; }
        .app-video.is-loading .app-video-thumb { animation: app-pulse 1.4s var(--ease-in-out) infinite; }

        .app-video-thumb {
          position: relative;
          aspect-ratio: 16 / 9;
          background: var(--app-bg);
          overflow: hidden;
          border: 1px solid var(--app-edge);
        }
        .app-thumb-grid {
          position: absolute; inset: 0;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: repeat(5, 1fr);
          gap: 1px;
        }
        .app-thumb-grid i {
          background: color-mix(in oklch, var(--app-text) calc((var(--gi) % 5) * 1.4%), transparent);
        }
        .app-thumb-duration {
          position: absolute;
          bottom: 4px; right: 4px;
          padding: 0.1rem 0.3rem;
          background: color-mix(in oklch, var(--app-bg) 85%, transparent);
          color: var(--app-text);
          font-size: 0.6rem;
        }
        .app-thumb-fmt {
          position: absolute;
          top: 4px; left: 4px;
          padding: 0.1rem 0.3rem;
          background: var(--app-accent);
          color: var(--app-bg);
          font-size: 0.55rem;
          letter-spacing: 0.04em;
        }

        .app-video-info { display: flex; flex-direction: column; gap: 0.45rem; min-width: 0; }
        .app-video-title {
          font-family: var(--font-display);
          font-size: 1rem;
          letter-spacing: -0.015em;
          color: var(--app-text);
          line-height: 1.18;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .app-video-meta {
          display: inline-flex; flex-wrap: wrap; align-items: baseline; gap: 0.35rem;
          font-size: var(--t-mono-xs);
          color: var(--app-dim);
        }
        .app-video-meta .dim { color: var(--app-dim); opacity: 0.5; }

        .app-quality { display: flex; flex-direction: column; gap: 0.3rem; margin-top: auto; }
        .app-q-chips { display: flex; flex-wrap: wrap; gap: 0.25rem; }
        .app-q-chip {
          padding: 0.18rem 0.45rem;
          font-size: var(--t-mono-xs);
          background: var(--app-bg);
          color: var(--app-dim);
          border: 1px solid var(--app-edge);
          letter-spacing: 0.04em;
          transition: all var(--dur-fast) var(--ease-out-quart);
        }
        .app-q-chip:hover { color: var(--app-text); border-color: var(--app-text); }
        .app-q-chip.is-on {
          color: var(--app-bg);
          background: var(--app-accent);
          border-color: var(--app-accent);
        }

        /* progress */
        .app-progress {
          display: none;
          flex-direction: column;
          gap: 0.4rem;
          padding: 0.7rem;
          background: var(--app-surface);
          border: 1px solid var(--app-edge);
        }
        .app-progress.is-active { display: flex; }
        .app-progress-head {
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .app-progress-pct {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-variation-settings: 'opsz' 144, 'wght' 400;
          color: var(--app-accent);
        }
        .app-progress-bar {
          height: 5px;
          background: var(--app-bg);
          overflow: hidden;
          border: 1px solid var(--app-edge);
        }
        .app-progress-bar span {
          display: block;
          height: 100%;
          background: var(--app-accent);
          box-shadow: 0 0 8px var(--app-glow);
          transition: width 80ms linear;
        }
        .app-progress-foot {
          display: flex; justify-content: space-between;
          color: var(--app-dim);
          font-size: var(--t-mono-xs);
        }

        .app-download-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.6rem 1rem;
          background: var(--app-accent);
          color: var(--app-bg);
          font-size: var(--t-mono-xs);
          letter-spacing: 0.1em;
          align-self: flex-start;
          box-shadow: 0 0 14px var(--app-glow);
          transition: transform var(--dur-fast) var(--ease-out-quart);
        }
        .app-download-btn:hover { transform: translateY(-1px); }

        /* status bar */
        .app-status {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.8rem;
          align-items: center;
          padding: 0.45rem 0.9rem;
          background: var(--app-surface);
          border-top: 1px solid var(--app-edge);
        }
        .app-status-l { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--app-text); }
        .app-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--app-dim);
        }
        .app-status-dot.is-active {
          background: var(--app-accent);
          box-shadow: 0 0 6px var(--app-glow);
          animation: app-pulse 1.4s var(--ease-in-out) infinite;
        }
        .app-status-dot.is-idle  { background: var(--app-dim); }
        .app-status-dot.is-warn  { background: var(--app-accent); }
        .app-status .dim { color: var(--app-dim); }

        /* toast */
        .app-toast {
          position: absolute;
          right: 1rem; bottom: 3.2rem;
          padding: 0.5rem 0.8rem;
          background: var(--app-accent);
          color: var(--app-bg);
          font-size: var(--t-mono-xs);
          letter-spacing: 0.05em;
          box-shadow: 0 0 18px var(--app-glow);
          z-index: 4;
          animation: app-toast-in 320ms var(--ease-out-quart);
        }
        @keyframes app-toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .app-toast-mark {
          display: inline-block;
          margin-right: 0.4rem;
          font-weight: 800;
        }

        .fp-app .fp-corner {
          z-index: 3;
          bottom: 2.4rem;
          color: var(--app-dim);
        }

        /* ─── ARCHITECTURE (GotIt) ─── */
        .fp-arch {
          display: grid;
          grid-template-rows: auto auto 1fr;
          padding: 0;
        }
        .arch-head {
          display: flex; justify-content: space-between;
          padding: 0.7rem 1rem;
          border-bottom: 1px solid var(--hairline-strong);
          background: linear-gradient(180deg, var(--ink-2), var(--ink-1));
        }
        .arch-head-l { color: var(--paper-2); }
        .arch-head-r { color: var(--amber); }

        .arch-svg {
          width: 100%;
          height: auto;
          aspect-ratio: 360 / 200;
          padding: 0.8rem 1rem 0.4rem;
          color: var(--paper-0);
          background:
            radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--amber) 4%, transparent) 0%, transparent 65%);
        }

        /* nodes */
        .arch-node rect {
          fill: var(--ink-2);
          stroke: var(--hairline-strong);
          stroke-width: 0.4;
        }
        .arch-node-core rect {
          fill: color-mix(in oklch, var(--amber) 5%, var(--ink-2) 95%);
          stroke: color-mix(in oklch, var(--amber) 35%, transparent);
        }
        .arch-node-service rect {
          stroke-dasharray: 1.5 1.5;
        }
        .arch-node-edge rect {
          fill: var(--ink-1);
        }
        .arch-code {
          font-family: var(--font-mono);
          font-size: 4.5px;
          fill: var(--paper-0);
          text-anchor: middle;
          letter-spacing: 0.4px;
          font-weight: 600;
        }
        .arch-node-core .arch-code { fill: var(--amber); }
        .arch-label {
          font-family: var(--font-mono);
          font-size: 3.2px;
          fill: var(--paper-3);
          text-anchor: middle;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }
        .arch-side-label {
          font-family: var(--font-mono);
          font-size: 3.4px;
          fill: var(--paper-3);
          letter-spacing: 0.2px;
        }

        /* arrowheads & lines already styled inline */
        .arch-particle {
          filter: drop-shadow(0 0 1.5px currentColor);
        }

        @media (prefers-reduced-motion: reduce) {
          .arch-particle { display: none; }
        }

        /* live log */
        .arch-log {
          display: grid;
          grid-template-rows: auto 1fr;
          padding: 0.6rem 1rem 1rem;
          border-top: 1px solid var(--hairline);
          background: color-mix(in oklch, var(--ink-0) 70%, var(--ink-1) 30%);
          min-height: 0;
          overflow: hidden;
        }
        .arch-log-head {
          display: flex; justify-content: space-between;
          padding-bottom: 0.4rem;
          border-bottom: 1px dashed var(--hairline);
        }
        .arch-log-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
          padding-top: 0.4rem;
          font-size: 0.7rem;
          line-height: 1.55;
          min-height: 0;
          overflow: hidden;
        }
        .arch-log-row {
          display: grid;
          grid-template-columns: 64px 80px 1fr;
          gap: 0.5rem;
          align-items: baseline;
          color: var(--paper-2);
          opacity: 0;
          transform: translateY(-4px);
          animation: arch-log-in 360ms var(--ease-out-quart) forwards;
        }
        @keyframes arch-log-in {
          to { opacity: 1; transform: none; }
        }
        .arch-log-row[style*='--ri: 0'] .arch-log-msg { color: var(--paper-0); }
        .arch-log-time { color: var(--paper-3); letter-spacing: 0; font-size: 0.65rem; }
        .arch-log-tag  { letter-spacing: 0; font-size: 0.65rem; }
        .tag-scheduler { color: var(--amber); }
        .tag-parser    { color: var(--paper-1); }
        .tag-db        { color: var(--paper-1); }
        .tag-bot       { color: var(--amber); }
        .tag-api       { color: var(--paper-1); }
        .arch-log-msg  { font-family: var(--font-mono); letter-spacing: 0; font-size: 0.7rem; }

        /* fade older rows */
        .arch-log-row[style*='--ri: 8'],
        .arch-log-row[style*='--ri: 9'],
        .arch-log-row[style*='--ri: 10'],
        .arch-log-row[style*='--ri: 11'],
        .arch-log-row[style*='--ri: 12'],
        .arch-log-row[style*='--ri: 13'] {
          opacity: 0.45;
        }

        /* ─── LIVE EMBED ─── */
        .fp-embed {
          display: grid;
          grid-template-rows: auto 1fr auto;
          padding: 0;
          background: var(--ink-0);
          isolation: isolate;
        }

        /* browser chrome bar */
        .emb-chrome {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.8rem;
          align-items: center;
          padding: 0.55rem 0.9rem;
          background: linear-gradient(180deg, var(--ink-2), var(--ink-1));
          border-bottom: 1px solid var(--hairline-strong);
        }
        .emb-traffic { display: inline-flex; gap: 0.35rem; }
        .emb-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          border: 1px solid color-mix(in oklch, #000 25%, transparent);
        }
        .emb-red { background: #e85d63; }
        .emb-yel { background: #d4a44d; }
        .emb-grn { background: #4ea466; }

        .emb-urlbar {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.35rem 0.7rem;
          background: color-mix(in oklch, var(--ink-0) 70%, var(--ink-2) 30%);
          border: 1px solid var(--hairline);
          color: var(--paper-2);
          min-width: 0;
        }
        .emb-urlbar svg { color: var(--amber); flex-shrink: 0; }
        .emb-host {
          color: var(--paper-0);
          font-size: var(--t-mono-sm);
          letter-spacing: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          flex: 1;
          min-width: 0;
        }
        .emb-status {
          color: var(--paper-3);
          font-size: var(--t-mono-xs);
          letter-spacing: 0.08em;
          flex-shrink: 0;
        }

        .emb-reload {
          padding: 0.35rem;
          color: var(--paper-2);
          transition: color var(--dur-fast) var(--ease-out-quart),
                      transform var(--dur-base) var(--ease-out-quart);
          line-height: 0;
        }
        .emb-reload:hover { color: var(--amber); transform: rotate(180deg); }

        /* viewport — scaled iframe */
        .emb-viewport {
          position: relative;
          overflow: hidden;
          background: var(--ink-0);
          min-height: 360px;
        }
        .emb-viewport iframe {
          position: absolute;
          inset: 0;
          width: 166.67%;            /* 1 / 0.6 */
          height: 166.67%;
          border: 0;
          transform: scale(0.6);
          transform-origin: top left;
          background: var(--ink-0);
          transition: opacity 320ms var(--ease-out-quart);
        }

        /* skeleton while loading */
        .emb-skeleton {
          position: absolute; inset: 0;
          display: grid; place-items: center;
          background:
            radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--amber) 6%, transparent) 0%, transparent 60%),
            var(--ink-1);
          z-index: 1;
        }
        .emb-skeleton-pulse {
          position: absolute;
          left: 50%; top: 50%;
          width: 10px; height: 10px;
          margin: -5px;
          background: var(--amber);
          border-radius: 50%;
          box-shadow: 0 0 0 0 var(--amber);
          animation: emb-pulse 1.6s var(--ease-in-out) infinite;
        }
        .emb-skeleton-label {
          position: absolute;
          bottom: 1.2rem; left: 0; right: 0;
          text-align: center;
          color: var(--paper-3);
        }
        @keyframes emb-pulse {
          0%, 100% { transform: scale(1);   box-shadow: 0 0 0 0 color-mix(in oklch, var(--amber) 50%, transparent); }
          50%      { transform: scale(1.4); box-shadow: 0 0 0 12px color-mix(in oklch, var(--amber) 0%, transparent); }
        }

        /* footer rail */
        .emb-foot {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.55rem 0.9rem;
          border-top: 1px solid var(--hairline);
          background: var(--ink-1);
        }
        .emb-foot-tag {
          display: inline-flex; align-items: center; gap: 0.5rem;
          color: var(--paper-2);
        }
        .emb-live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--amber);
          box-shadow: 0 0 0 0 var(--amber);
          animation: pulse-dot 2.4s var(--ease-in-out) infinite;
        }
        .emb-foot-link {
          color: var(--paper-2);
          letter-spacing: 0.1em;
          font-size: var(--t-mono-xs);
        }
        .emb-foot-link:hover { color: var(--amber); }

        /* the corner label sits over content — lift it above iframe */
        .fp-embed .fp-corner {
          z-index: 3;
          bottom: 3.2rem;
        }

        /* ─── FIGHTING ─── */
        .fp-fight {
          display: grid;
          grid-template-rows: auto auto 1fr auto auto;
          gap: 0;
        }
        .fp-grid {
          position: absolute; inset: 0;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(6, 1fr);
          gap: 1px;
          opacity: 0.18;
          z-index: 0;
          pointer-events: none;
        }
        .fp-grid i {
          background: color-mix(in oklch, var(--paper-0) calc((var(--gi) % 4) * 1.2%), transparent);
        }

        /* HUD */
        .fp-hud {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1rem;
          padding: 1.3rem 1.5rem 0.4rem;
          z-index: 2;
          align-items: center;
          position: relative;
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
          font-size: clamp(2.6rem, 4.2vw, 3.6rem);
          font-variation-settings: 'opsz' 144, 'wght' 380;
          color: var(--amber);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        /* round band */
        .fp-round {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 1.5rem 0.9rem;
          border-bottom: 1px dashed var(--hairline);
          z-index: 2;
          position: relative;
        }
        .fp-round-l, .fp-round-r {
          color: var(--paper-2);
          font-size: var(--t-mono-xs);
          letter-spacing: 0.1em;
        }
        .fp-round-r { text-align: right; }
        .fp-round-mid {
          color: var(--amber);
          font-size: var(--t-mono-xs);
          letter-spacing: 0.18em;
          padding: 0.25rem 0.6rem;
          border: 1px solid var(--hairline-amber);
        }

        /* frame data — the body of the preview */
        .fp-frames {
          margin: 1rem 1.5rem;
          background: color-mix(in oklch, var(--ink-0) 70%, transparent);
          border: 1px solid var(--hairline);
          z-index: 2;
          position: relative;
          align-self: stretch;
        }
        .fp-frames-head, .fp-frame {
          display: grid;
          grid-template-columns: 1.6fr 0.8fr 0.8fr 0.8fr 0.9fr;
          gap: 0.8rem;
          align-items: center;
          padding: 0.5rem 0.9rem;
        }
        .fp-frames-head {
          border-bottom: 1px solid var(--hairline);
          background: color-mix(in oklch, var(--ink-2) 60%, transparent);
        }
        .fp-frames-head .right, .fp-frame .right { text-align: right; }
        .fp-frames-list { list-style: none; }
        .fp-frame {
          border-bottom: 1px solid color-mix(in oklch, var(--paper-0) 3%, transparent);
          font-size: var(--t-mono-sm);
          color: var(--paper-1);
        }
        .fp-frame:last-child { border-bottom: 0; }
        .fp-frame.hl {
          background: color-mix(in oklch, var(--amber) 5%, transparent);
        }
        .fp-frame.hl .fp-f-move { color: var(--amber); }
        .fp-frame .pos { color: var(--amber); }
        .fp-frame .neg { color: var(--signal); }

        /* input reader */
        .fp-input {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.8rem;
          padding: 0.7rem 1.5rem;
          border-top: 1px solid var(--hairline);
          border-bottom: 1px dashed var(--hairline);
          z-index: 2;
          position: relative;
        }
        .fp-input-chips {
          display: inline-flex; align-items: center; gap: 0.4rem;
          flex-wrap: wrap;
        }
        .fp-chip {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: var(--t-mono-sm);
          padding: 0.15rem 0.45rem;
          border: 1px solid var(--hairline-strong);
          color: var(--paper-0);
          letter-spacing: 0;
        }
        .fp-chip.amb { color: var(--amber); border-color: var(--hairline-amber); }
        .fp-arrow {
          color: var(--paper-3);
          margin: 0 0.2rem;
        }
        .fp-input-name {
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: var(--t-mono-sm);
        }
        .fp-input-dmg {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-variation-settings: 'opsz' 144, 'wght' 400;
          color: var(--paper-0);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .fp-input-dmg .dim {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--paper-3);
          margin-left: 0.2rem;
          letter-spacing: 0.1em;
          vertical-align: super;
        }

        /* roster */
        .fp-roster {
          display: grid;
          grid-template-columns: repeat(13, 1fr);
          gap: 0.3rem;
          padding: 0.9rem 1.5rem 2rem;
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
          color: var(--paper-2);
          transition: color var(--dur-fast) var(--ease-out-quart),
                      border-color var(--dur-fast) var(--ease-out-quart);
        }
        .fp-slot.is-active {
          color: var(--amber);
          border-color: var(--hairline-amber);
          background: color-mix(in oklch, var(--amber) 6%, transparent);
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
          .fl-1 .fl-info,
          .fl-3 .fl-info    { order: 1; }
          .fl-1 .fl-preview,
          .fl-3 .fl-preview { order: 2; }
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
