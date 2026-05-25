/* ═══════════════════════════════════════════════════════════════════
   CONTENT — Operator's Manifest
   Tone: technical, factual, no marketing prose. Short sentences.
   Markers `TODO: confirm` highlight values that need real data.
   ═══════════════════════════════════════════════════════════════════ */

export const meta = {
  callsign: "DENIS / BZDEN4IK",
  classification: "FULL-STACK ENGINEER",
  cardNumber: "000",
  // TODO: confirm — реальный год начала карьеры
  fileOpened: "2024",
  // TODO: confirm — реальный город / часовой пояс
  station: "EU-RU · UTC+3",
  // TODO: confirm — текущий статус: open-to-work / contract / closed
  status: "OPEN TO ENGAGEMENTS",
  langs: ["RU", "EN"],
};

export const nav = {
  brand: "D.",
  brandFull: "DENIS.OP",
  items: [
    { id: "00", label: "Manifest", href: "#manifest" },
    { id: "01", label: "Operator", href: "#operator" },
    { id: "02", label: "Craft",    href: "#craft" },
    { id: "03", label: "Work",     href: "#work" },
    { id: "04", label: "Signal",   href: "#signal" },
  ],
};

/* ───────────────────────── § 00 — MANIFEST (Hero) ───────────────────────── */
export const manifest = {
  chapter: "§ 00",
  chapterLabel: "Manifest",
  // Headline в двух уровнях: главная фраза + подпись (раздельно для разной типографики)
  headlinePrimary:   ["Производственные", "веб-системы."],
  headlineSecondary: ["От интерфейса", "до инфраструктуры."],
  // Краткое определение под заголовком (без тире, без жаргона)
  abstract: "Full-stack engineer. Пишу production-ready интерфейсы, бэкенд и инфраструктуру для проектов, которым нужно работать каждый день, а не выглядеть на демке.",
  // Метаданные для боковой колонки (mono)
  sideMeta: [
    { key: "FILE",       value: "DOSSIER №000" },
    { key: "OPERATOR",   value: "DENIS / BZDEN4IK" },
    { key: "STATION",    value: "UTC+3" },         // TODO: confirm
    { key: "ACTIVE",     value: "2024 — PRESENT" }, // TODO: confirm
    { key: "AVAILABILITY", value: "OPEN" },         // TODO: confirm
  ],
  // CTA — без розовых градиентов и glow shadow
  primaryCta:   { label: "Открыть досье", href: "#operator" },
  secondaryCta: { label: "Канал связи",   href: "#signal" },
};

/* ───────────────────────── § 01 — OPERATOR (About) ───────────────────────── */
export const operator = {
  chapter: "§ 01",
  chapterLabel: "Operator",
  rightTag: "DOSSIER / IDENTITY",

  // Большая цитата вверху секции (Fraunces, разреженная). Без тире в тексте.
  pull: "Лучшая архитектура та, которую можно объяснить за пять минут, и которая выдержит пять лет.",

  // Двухколоночный body в стиле журнальной верстки. Без тире в тексте.
  body: [
    "Денис, full-stack инженер. Работаю на стеке React, Node.js, PostgreSQL. Веду проект от первого экрана интерфейса до миграций базы, конфигов nginx и продакшен-деплоя.",
    "Подход инженерный, не «давайте быстро накидаем прототип». Каждое решение оценивается по тому, как оно будет жить через год: читаемость кода, простота отката, стоимость поддержки.",
    "Беру проекты на полный цикл, а также отдельные участки: рефакторинг production-системы, проектирование схемы базы, настройка инфраструктуры, code review. Работаю с теми, кому важен долгий срок жизни продукта.",
  ],

  // Реальные, честные stats
  stats: [
    { code: "01", label: "PROJECTS / TOTAL",      value: "15", unit: ""   },
    { code: "02", label: "PRODUCTION / SHIPPED",  value: "09", unit: ""   },
    { code: "03", label: "GITHUB REPOS / OPEN",   value: "07", unit: ""   },
    { code: "04", label: "RESPONSE / WINDOW",     value: "24", unit: "h"  },
  ],

  // Принципы — короткие, без воды
  principles: [
    { n: "01", text: "Сначала работает, потом красиво. Но обязательно — и то, и другое." },
    { n: "02", text: "Чтение кода важнее, чем его написание. Поэтому всё пишу под чтение." },
    { n: "03", text: "Лучшая зависимость — отсутствующая." },
    { n: "04", text: "Если фича требует комментария — её надо переписать, а не комментировать." },
  ],

  // Timeline — короткие записи "когда что". TODO: confirm — пользователь подтверждает реальные даты.
  timeline: [
    { year: "2024", label: "ENTRY",        text: "Первые проекты на React и Node в production-режиме. GotIt, LinkTime." },
    { year: "2025", label: "GAMEDEV",      text: "SPT mod-стек на C#/BepInEx: MortalStrike, SptLauncher, SPTManagerMods." },
    { year: "2025", label: "DESKTOP",      text: "Electron-инструменты: YouDownload, nekto-controller, Remote Desktop." },
    { year: "2026", label: "COMMERCIAL",   text: "Коммерческие заказы (DanilaThx), сложные web-системы (VtuberKombat)." },
  ],

  // "Не беру" — антипортфолио: что НЕ делаю. Полезнее чем "делаю всё".
  refuse: [
    "Низкокачественный быстрый прототип без понимания, куда это пойдёт дальше.",
    "Срочные \"за вечер\" задачи без брифа и доступа к репозиторию.",
    "Поддержку чужого legacy без рефакторинга — только переписывание или совместная работа.",
    "Технологии, в которых не разбираюсь на уровне отладки — это нечестно по отношению к клиенту.",
  ],
};

/* ───────────────────────── § 02 — CRAFT (Skills) ───────────────────────── */
export const craft = {
  chapter: "§ 02",
  chapterLabel: "Craft",
  rightTag: "TECHNICAL SPECIFICATION",
  preamble: 'Стек, которым работаю в production. Не «знаю в общих чертах», а именно — пишу, поддерживаю, дебажу.',

  // Каждая технология как карточка спецификации (как в каталоге компонентов)
  // Поля: code (порядковый), name, role (что делает в моём стеке), since (когда начал), tier (core/working/familiar)
  table: [
    // FRONTEND
    { code: "FE-01", name: "React",          role: "Hooks, RSC, Suspense",                since: "2024", tier: "core",    column: "FRONTEND" },
    { code: "FE-02", name: "TypeScript",     role: "Strict mode, generics, narrowing",    since: "2024", tier: "core",    column: "FRONTEND" },
    { code: "FE-03", name: "Vite",           role: "Build, HMR, lib mode",                since: "2024", tier: "core",    column: "FRONTEND" },
    { code: "FE-04", name: "Framer Motion",  role: "Production motion, gestures",         since: "2024", tier: "working", column: "FRONTEND" },
    { code: "FE-05", name: "Three.js / R3F", role: "WebGL, shaders, post-processing",     since: "2024", tier: "working", column: "FRONTEND" },
    { code: "FE-06", name: "GSAP",           role: "ScrollTrigger, timelines",            since: "2024", tier: "working", column: "FRONTEND" },
    { code: "FE-07", name: "Tailwind CSS",   role: "Token-based design systems",          since: "2024", tier: "working", column: "FRONTEND" },

    // BACKEND
    { code: "BE-01", name: "Node.js",        role: "API, async pipelines",                since: "2024", tier: "core",    column: "BACKEND"  },
    { code: "BE-02", name: "Express / Fastify", role: "REST routing, middleware",         since: "2024", tier: "core",    column: "BACKEND"  },
    { code: "BE-03", name: "PostgreSQL",     role: "Schema, indexes, migrations",         since: "2024", tier: "core",    column: "BACKEND"  },
    { code: "BE-04", name: "MongoDB",        role: "Document modeling, aggregations",     since: "2024", tier: "working", column: "BACKEND"  },
    { code: "BE-05", name: "WebSocket",      role: "Realtime channels, pub/sub",          since: "2024", tier: "working", column: "BACKEND"  },
    { code: "BE-06", name: "Python",         role: "Scripts, data processing",            since: "2024", tier: "familiar",column: "BACKEND"  },

    // OPS & TOOLING
    { code: "OP-01", name: "Git",            role: "Trunk-based, rebase workflow",        since: "2024", tier: "core",    column: "OPS"     },
    { code: "OP-02", name: "Docker",         role: "Compose, multi-stage builds",         since: "2024", tier: "working", column: "OPS"     },
    { code: "OP-03", name: "Linux",          role: "Server admin, systemd, nginx",        since: "2024", tier: "working", column: "OPS"     },
    { code: "OP-04", name: "CI/CD",          role: "GitHub Actions, deploy pipelines",    since: "2024", tier: "working", column: "OPS"     },
    { code: "OP-05", name: "Figma",          role: "Design tokens, dev handoff",          since: "2024", tier: "familiar",column: "OPS"     },
  ],

  legend: [
    { tier: "core",     label: "PRIMARY",   desc: "Ежедневный инструмент" },
    { tier: "working",  label: "WORKING",   desc: "Использую в проектах" },
    { tier: "familiar", label: "FAMILIAR",  desc: "Читаю код, могу править" },
  ],
};

/* ───────────────────────── § 03 — WORK (Projects) ─────────────────────────
   15 проектов, разделены на 4 tier'а:
     featured  — флагман, full-width разворот с детальным case study
     production — компактная карточка в каталоге
     utility    — мини-блок утилит
     archive    — одна строка в архиве
   ─────────────────────────────────────────────────────────────────────── */
export const work = {
  chapter: "§ 03",
  chapterLabel: "Work",
  rightTag: "SHIPPED / 15 ENTRIES",
  preamble:
    'Каталог из пятнадцати проектов: web в production, gamedev-моды на C#, Electron-утилиты, заказы. Подобраны те, где было что решать — не «hello world по туториалу».',

  /* ─── FLAGSHIP (3) — большие развороты ─── */
  flagship: [
    {
      code: "PRJ-001",
      title: "VTUBER KOMBAT",
      tagline: "Сайт-визитка пиксельного 2D-файтинга с защищённой админкой",
      year: "2024 — 2026",
      role: "Solo · Full-stack",
      live: "https://vtuberkombat.bzden4ik.ru/",
      repo: null,
      kind: "Web · Production",
      // 2-3 короткие колонки текста — проблематика, что решал
      brief: [
        "Не просто статичный лендинг. За интерфейсом — SQLite-БД с WAL, защищённая admin-панель с rate-limit-зонами на двух уровнях (nginx + express), audit_log и JWT-cookie auth. Бэкенд работает как systemd unit за nginx + Cloudflare proxy с origin certs.",
        "Frontend разделён по бандлам: основной сайт не качает admin SPA, тот грузится lazy-чанком. CSP/HSTS/Permissions-Policy заданы на уровне nginx. Релизы — атомарным `release.sh`.",
      ],
      // Спецификации в виде таблицы
      specs: [
        { row: "FRONT",  values: ["React 18", "Vite 5", "Framer Motion", "CSS modules"] },
        { row: "BACK",   values: ["Express 4", "better-sqlite3", "helmet", "zod", "jsonwebtoken"] },
        { row: "AUTH",   values: ["bcrypt", "JWT HttpOnly", "audit_log", "2-level rate-limit"] },
        { row: "INFRA",  values: ["nginx + TLS", "systemd", "Cloudflare proxy", "atomic release.sh"] },
      ],
      preview: "live-embed",
    },
    {
      code: "PRJ-002",
      title: "YouDownload",
      tagline: "Десктопный YouTube/yt-dlp загрузчик с двумя UI-темами",
      year: "2025",
      role: "Solo · Desktop",
      live: null,
      repo: "https://github.com/warfa/YouDownload",
      kind: "Desktop · v1.1.5",
      brief: [
        "Electron-приложение поверх yt-dlp. Поддерживает 1000+ сайтов, авто-слияние видео+аудио через ffmpeg, очередь загрузок, историю до 200 записей, RU/EN. Бинарь распространяется через GitHub Releases.",
        "Особенность — две полноценные темы UI: FleetWatch (deep black + green HUD) и Vulnerable Apathy (glassmorphism + neon orbs). Темы выбираются in-app, все настройки персистятся между запусками через electron-store.",
      ],
      specs: [
        { row: "RUNTIME", values: ["Electron 33", "electron-vite", "TypeScript"] },
        { row: "ENGINE",  values: ["yt-dlp-wrap", "ffmpeg auto-merge"] },
        { row: "UI",      values: ["React 18", "electron-store persistence", "2 themes / RU+EN"] },
        { row: "BUILD",   values: ["electron-builder", "GitHub Releases", "auto-update target"] },
      ],
      preview: "app-mock",
    },
    {
      code: "PRJ-003",
      title: "YouDesktopUploader",
      tagline: "SFTP/FTP клиент с visual-diff просмотром перед синком",
      year: "2024",
      role: "Solo · Desktop",
      live: null,
      repo: null,
      kind: "Desktop · v1.0.0 BICYCLE BUILD",
      brief: [
        "Electron-приложение для синхронизации локальной папки с удалённым SFTP/FTP-сервером. Перед загрузкой показывает полный diff каждого изменённого файла: добавленные/удалённые строки, side-by-side сравнение через diff2html. Никаких слепых перезаписей.",
        "Файловый наблюдатель (chokidar) ловит изменения в реальном времени, parallelism-pool (p-limit) ограничивает одновременные SFTP-операции до 3, electron-store хранит подключения и mappings, zustand для UI-state. Connection profiles шифруются.",
      ],
      specs: [
        { row: "RUNTIME",  values: ["Electron 31", "Vite 5", "React 18"] },
        { row: "TRANSPORT", values: ["ssh2-sftp-client", "basic-ftp", "chokidar fs watcher"] },
        { row: "DIFF",     values: ["diff", "diff2html", "side-by-side viewer"] },
        { row: "STATE",    values: ["zustand", "electron-store", "p-limit pool"] },
      ],
      preview: "uploader-mock",
    },
    {
      code: "PRJ-004",
      title: "GotIt",
      tagline: "Парсер wishlist-стримеров с fetta.app, Telegram-бот, real-time уведомления",
      year: "2024",
      role: "Solo · Full-stack distributed",
      live: null,
      repo: "https://github.com/Bzden4ik/GotIt",
      kind: "Web + Bot + Scheduler",
      brief: [
        "Шесть подсистем общаются между собой: React-фронт на GitHub Pages, REST API на VPS, SQLite-БД с миграциями, парсер fetta.app (HTML scraping с retry/backoff), cron-scheduler по cron-выражению, Telegram-бот с login widget и push-нотификациями.",
        "Парсер обходит rate-limit fetta.app через jittered intervals, scheduler не дублирует уведомления через dedup-кеш в SQLite, бот аутентифицирует через Telegram Login Widget без хранения паролей. Каждая часть может упасть и подняться независимо.",
      ],
      specs: [
        { row: "FRONT",     values: ["React", "GitHub Pages", "Telegram Login Widget"] },
        { row: "API",       values: ["Node.js", "Express", "SQLite (better-sqlite3)"] },
        { row: "PIPELINE",  values: ["cron-scheduler", "HTML parser (cheerio)", "dedup cache"] },
        { row: "BOT",       values: ["Telegram Bot API", "push notifications", "deep links"] },
      ],
      preview: "architecture",
    },
  ],

  /* ─── PRODUCTION (6) — компактный каталог ─── */
  production: [
    {
      code: "PRJ-004",
      title: "SPTManagerMods",
      kind: "Electron · SPT mod manager",
      year: "2025",
      summary: "Каталог forge.sp-tarkov.com, авто-зависимости, SSH-деплой серверных модов.",
      stack: ["Electron 32", "React 18", "Python", "SSH/SFTP"],
      repo: "https://github.com/Bzden4ik/SPTManagerMods",
    },
    {
      code: "PRJ-005",
      title: "SptLauncher",
      kind: "C# server + Electron launcher",
      year: "2025",
      summary: "Server plugin раздаёт мод-манифест с SHA-256, лаунчер синхронизирует BepInEx.",
      stack: ["C# .NET 9", "Electron", "React", "TypeScript"],
      repo: "https://github.com/Bzden4ik/SptLauncher",
    },
    {
      code: "PRJ-006",
      title: "MortalStrike",
      kind: "C# BepInEx mod · SPT",
      year: "2025",
      summary: "Динамическая артиллерия в рейдах SPT, эскалация Event 2, Fika multiplayer sync.",
      stack: ["C# / .NET", "BepInEx 5", "Fika packets", "audio mixing"],
      repo: "https://github.com/Bzden4ik/SPTMod.MortalStrike",
    },
    {
      code: "PRJ-007",
      title: "LinkTime",
      kind: "Web + Desktop agent",
      year: "2024",
      summary: "Учёт рабочего времени с WebSocket-синком и desktop-агентом для авто-паузы при AFK.",
      stack: ["JS", "WebSocket", "Electron agent", "Local-first storage"],
      repo: "https://github.com/Bzden4ik/LinkTime",
    },
    {
      code: "PRJ-008",
      title: "Remote Desktop (Shhs)",
      kind: "P2P WebRTC + Electron",
      year: "2025",
      summary: "P2P-удалённый доступ к Windows через разные сети. Signaling-relay + robotjs control.",
      stack: ["Electron", "WebRTC", "robotjs", "Node signaling relay"],
      repo: null,
    },
    {
      code: "PRJ-009",
      title: "DanilaThx",
      kind: "Commercial · Portfolio",
      year: "2026",
      summary: "Заказное портфолио для GTA RP контент-мейкера. PM2 + nginx, домен danilathx.work.",
      stack: ["React 18", "Vite", "Express", "Framer Motion", "PM2"],
      live: "http://danilathx.work/",
      repo: null,
    },
  ],

  /* ─── UTILITIES (2) — мини-блоки ─── */
  utilities: [
    {
      code: "UTIL-01",
      title: "nekto-controller",
      year: "2025",
      summary: "Electron-обёртка для nekto.me с глобальными хоткеями (Alt+S/D/N), трей, NumPad.",
      stack: ["Electron", "Global shortcuts"],
      repo: null,
    },
    {
      code: "UTIL-02",
      title: "Create-Arm-Limit",
      year: "2025",
      summary: "NeoForge-аддон для Minecraft (Create mod): item-limit и filter-slot на мехруку.",
      stack: ["Kotlin / Java", "NeoForge 21", "Gradle"],
      repo: "https://github.com/Bzden4ik/Create-Arm-Limit",
    },
  ],

  /* ─── ARCHIVE (3) — одна строка ─── */
  archive: [
    { code: "ARC-01", title: "TwitchOverlayApp",      year: "2024", note: "Electron Twitch chat overlay builder",         stack: "Electron" },
    { code: "ARC-02", title: "YouOBSRemote",          year: "2024", note: "OBS Studio remote control web UI",              stack: "Node · Vite" },
    { code: "ARC-03", title: "TwitchChat",            year: "2023", note: "Pure HTML/CSS pixel-чат для OBS overlay",       stack: "HTML · CSS" },
  ],
};

/* ───────────────────────── § 04 — SIGNAL (Contact) ───────────────────────── */
export const signal = {
  chapter: "§ 04",
  chapterLabel: "Signal",
  rightTag: "TRANSMIT / CHANNELS OPEN",

  // Огромная типографическая фраза — главный элемент секции
  callout: [
    "Если",
    "у",
    "вас",
    "есть",
    "задача —",
    "напишите.",
  ],
  sub: "Беру задачи на разработку, консультации, code review. Отвечаю в течение 24 часов.",

  channels: [
    { code: "CH-01", label: "GITHUB",   handle: "github.com/Bzden4ik",   href: "https://github.com/Bzden4ik" },
    { code: "CH-02", label: "TELEGRAM", handle: "@Bzden4ikkk",           href: "https://t.me/Bzden4ikkk" },
    { code: "CH-03", label: "EMAIL",    handle: "bzdenbzden4ik@gmail.com", href: "mailto:bzdenbzden4ik@gmail.com" },
  ],

  footnote: "Архивная карточка №000 · cборка локальная · обновлено",
};
