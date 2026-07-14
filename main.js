/* Vom Feuer geformt — Führung durch die Zeitreise.
   Die Seite funktioniert vollständig ohne dieses Script;
   hier kommen Jahreszähler, Farbdramaturgie und Feinheiten dazu. */

(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const motionOK = !reducedMotion.matches;
  if (motionOK) root.classList.add("js-motion");

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

  /* ---------- Zeitreise: Kapitel beobachten ---------- */

  const sections = [...document.querySelectorAll("[data-year-start]")];
  const railLinks = [...document.querySelectorAll(".rail a[data-chapter]")];
  const yearValue = document.getElementById("year-value");
  const yearEra = document.getElementById("year-era");
  const CHAPTER_COUNT = 9;

  const fmt = new Intl.NumberFormat("de-DE");

  function renderYear(year) {
    const y = Math.round(year);
    if (y < 0) {
      yearValue.textContent = fmt.format(-y);
      yearEra.textContent = "v. Chr.";
    } else if (y < 1000) {
      yearValue.textContent = String(Math.max(y, 1));
      yearEra.textContent = "n. Chr.";
    } else {
      yearValue.textContent = String(y);
      yearEra.textContent = "";
    }
  }

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

  let lastYear = -9500;

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
      const t = Math.min(1, Math.max(0, (anchorY - r.top) / Math.max(r.height, 1)));
      const y0 = Number(current.dataset.yearStart);
      const y1 = Number(current.dataset.yearEnd);
      lastYear = y0 + (y1 - y0) * t;

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
      ".ch-head, .ch-body, .artefact-card, .epilog-text"
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

  /* ---------- Popover-Karten neben ihrem Ausloeser platzieren ---------- */

  const GAP = 10;

  document.querySelectorAll("[popovertarget]").forEach((btn) => {
    const card = document.getElementById(btn.getAttribute("popovertarget"));
    if (!card) return;

    card.addEventListener("toggle", (e) => {
      if (e.newState !== "open") return;

      const b = btn.getBoundingClientRect();
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
