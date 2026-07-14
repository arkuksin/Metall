/* Vom Feuer geformt — Führung durch die Zeitreise.
   Die Seite funktioniert vollständig ohne dieses Script;
   hier kommen Sprache, Jahreszähler, Farbdramaturgie und Feinheiten dazu. */

(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const motionOK = !reducedMotion.matches;
  if (motionOK) root.classList.add("js-motion");

  /* ---------- Sprache / Locale ----------
     Früh deklariert, damit renderYear jederzeit sicher aufgerufen werden kann. */

  const SUPPORTED = ["de", "en", "ru"];
  const LOCALE = {
    de: { intl: "de-DE", bce: "v. Chr.", ce: "n. Chr." },
    en: { intl: "en",    bce: "BCE",          ce: "CE" },
    ru: { intl: "ru-RU", bce: "до н. э.", ce: "н. э." },
  };
  let currentLang = "de";
  let fmt = new Intl.NumberFormat(LOCALE.de.intl);

  const yearValue = document.getElementById("year-value");
  const yearEra = document.getElementById("year-era");
  let lastYear = -9500;

  function renderYear(year) {
    const y = Math.round(year);
    const loc = LOCALE[currentLang] || LOCALE.de;
    if (y < 0) {
      /* Vorgeschichte: große Zahlen mit Tausendertrennung je Sprache */
      yearValue.textContent = fmt.format(-y);
      yearEra.textContent = loc.bce;
    } else if (y < 1000) {
      yearValue.textContent = String(Math.max(y, 1));
      yearEra.textContent = loc.ce;
    } else {
      /* Jahreszahlen ohne Trennzeichen — „2026", nicht „2.026" */
      yearValue.textContent = String(y);
      yearEra.textContent = "";
    }
  }

  /* ---------- Theme-Toggle ---------- */

  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("vff-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    root.dataset.theme = storedTheme;
  }
  themeToggle?.addEventListener("click", () => {
    const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.dataset.theme || (systemDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("vff-theme", next);
  });

  /* ---------- Sprachumschaltung ----------
     Deutsch lebt im HTML und wird als Baseline aus dem DOM erfasst;
     i18n.js liefert nur Englisch und Russisch. */

  const I18N = window.I18N || {};
  I18N.de = I18N.de || {};
  const i18nNodes = [...document.querySelectorAll("[data-i18n], [data-i18n-alt], [data-i18n-aria]")];

  for (const el of i18nNodes) {
    const k = el.dataset.i18n, ka = el.dataset.i18nAlt, kr = el.dataset.i18nAria;
    if (k && !(k in I18N.de)) I18N.de[k] = el.innerHTML;
    if (ka && !(ka in I18N.de)) I18N.de[ka] = el.getAttribute("alt") || "";
    if (kr && !(kr in I18N.de)) I18N.de[kr] = el.getAttribute("aria-label") || "";
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (!("meta.title" in I18N.de)) I18N.de["meta.title"] = document.title;
  if (!("meta.desc" in I18N.de)) I18N.de["meta.desc"] = metaDesc ? metaDesc.getAttribute("content") : "";

  const langButtons = [...document.querySelectorAll(".lang-btn")];

  function t(lang, key) {
    const table = I18N[lang];
    if (table && key in table) return table[key];
    return I18N.de[key];
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = "de";
    currentLang = lang;
    root.lang = lang;
    try { localStorage.setItem("vff-lang", lang); } catch (e) { /* privater Modus */ }
    fmt = new Intl.NumberFormat(LOCALE[lang].intl);

    for (const el of i18nNodes) {
      if (el.dataset.i18n) {
        const v = t(lang, el.dataset.i18n);
        if (v != null) el.innerHTML = v;
      }
      if (el.dataset.i18nAlt) {
        const v = t(lang, el.dataset.i18nAlt);
        if (v != null) el.setAttribute("alt", v);
      }
      if (el.dataset.i18nAria) {
        const v = t(lang, el.dataset.i18nAria);
        if (v != null) el.setAttribute("aria-label", v);
      }
    }

    const mt = t(lang, "meta.title");
    if (mt != null) document.title = mt;
    const md = t(lang, "meta.desc");
    if (metaDesc && md != null) metaDesc.setAttribute("content", md);

    langButtons.forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    renderYear(lastYear);
  }

  langButtons.forEach((b) => {
    b.addEventListener("click", () => {
      /* Offene Karte schließen, bevor ihr Inhalt getauscht wird */
      document.querySelectorAll("[popover]").forEach((p) => p.hidePopover?.());
      applyLang(b.dataset.lang);
    });
  });

  /* Anfangssprache: gespeicherte Wahl > Browsersprache > Deutsch */
  let initialLang = null;
  try {
    const s = localStorage.getItem("vff-lang");
    if (SUPPORTED.includes(s)) initialLang = s;
  } catch (e) { /* ignorieren */ }
  if (!initialLang) {
    const nav = (navigator.language || "de").slice(0, 2).toLowerCase();
    initialLang = SUPPORTED.includes(nav) ? nav : "de";
  }
  applyLang(initialLang);

  /* ---------- Zeitreise: Kapitel beobachten ---------- */

  const sections = [...document.querySelectorAll("[data-year-start]")];
  const railLinks = [...document.querySelectorAll(".rail a[data-chapter]")];
  const CHAPTER_COUNT = 9;

  let activeChapter = 0;

  function setActiveChapter(num) {
    if (num === activeChapter) return;
    activeChapter = num;

    railLinks.forEach((a) => {
      a.classList.toggle("is-active", Number(a.dataset.chapter) === num);
    });

    if (num >= 1) {
      root.style.setProperty("--epoch-active", `var(--e${num})`);
      /* Das Papier kuehlt im Lauf der Geschichte ab */
      const warmth = Math.round(100 - ((num - 1) / (CHAPTER_COUNT - 1)) * 100);
      root.style.setProperty(
        "--paper",
        `color-mix(in oklab, var(--paper-warm) ${warmth}%, var(--paper-cool))`
      );
    } else {
      root.style.setProperty("--epoch-active", "var(--e1)");
      root.style.setProperty("--paper", "var(--paper-warm)");
    }
  }

  function update() {
    const anchorY = innerHeight * 0.5;
    let current = null;

    for (const sec of sections) {
      const r = sec.getBoundingClientRect();
      if (r.top <= anchorY && r.bottom >= anchorY) { current = sec; break; }
      if (r.top > anchorY) break;
    }

    if (current) {
      const r = current.getBoundingClientRect();
      const t2 = Math.min(1, Math.max(0, (anchorY - r.top) / Math.max(r.height, 1)));
      const y0 = Number(current.dataset.yearStart);
      const y1 = Number(current.dataset.yearEnd);
      lastYear = y0 + (y1 - y0) * t2;

      const num = Number(current.dataset.chapter || 0);
      if (current.classList.contains("epilog")) setActiveChapter(CHAPTER_COUNT);
      else setActiveChapter(num);
    }

    renderYear(lastYear);
  }

  /* Offene Info-Karten schliessen, sobald gescrollt wird —
     sie sind am Viewport verankert und wuerden sonst „mitfliegen" */
  let openPopover = null;
  document.addEventListener("toggle", (e) => {
    if (e.target.matches?.("[popover]")) {
      openPopover = e.newState === "open" ? e.target : null;
    }
  }, true);

  let ticking = false;
  function requestUpdate() {
    if (openPopover) { openPopover.hidePopover?.(); openPopover = null; }
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }

  addEventListener("scroll", requestUpdate, { passive: true });
  addEventListener("resize", requestUpdate, { passive: true });
  update();

  /* ---------- Aufsteigen der Texte + Fortschrittslinie ---------- */

  if (motionOK) {
    const revealables = document.querySelectorAll(
      ".ch-head, .ch-body, .artefact-card, .tech-card, .epilog-text"
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );
    revealables.forEach((el) => io.observe(el));
  }

  const progress = document.querySelector(".progress");
  if (progress) {
    const updateProgress = () => {
      const max = root.scrollHeight - innerHeight;
      progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    };
    addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- Popover-Karten neben ihrem Ausloeser platzieren ----------
     Der Auslöser wird beim Öffnen frisch gesucht statt gecacht: So bleibt
     die Positionierung korrekt, auch nachdem ein Sprachwechsel die
     Glossar-Buttons im Text neu erzeugt hat. */

  const GAP = 10;

  document.querySelectorAll("[popover]").forEach((card) => {
    card.addEventListener("toggle", (e) => {
      if (e.newState !== "open") return;

      const trigger = document.querySelector(`[popovertarget="${CSS.escape(card.id)}"]`);
      if (!trigger) return;

      const b = trigger.getBoundingClientRect();
      card.style.maxWidth = `min(300px, ${innerWidth - 16}px)`;
      const c = card.getBoundingClientRect();

      let left = b.left + b.width / 2 - c.width / 2;
      left = Math.max(8, Math.min(left, innerWidth - c.width - 8));

      let top = b.bottom + GAP;
      if (top + c.height > innerHeight - 8) {
        top = b.top - c.height - GAP;
        if (top < 8) top = Math.max(8, innerHeight - c.height - 8);
      }

      card.style.left = `${Math.round(left)}px`;
      card.style.top = `${Math.round(top)}px`;
    });
  });
})();
