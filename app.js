/* ------------------------------------------------------------------
   EWEM · Semester 5 — page renderer
   Content lives in data.js. This file only draws and filters it.
   ------------------------------------------------------------------ */
/* global SITE, ASSIGNMENTS, PROJECTS, THEMES */

(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const pad = (number) => String(number).padStart(2, "0");

  const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ESCAPES[character]);

  const ARROW = `<svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 10h13M11 5l5 5-5 5"/></svg>`;
  const ARROW_UP = `<svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 15 15 5M7 5h8v8"/></svg>`;

  const SHORT_TITLES = {
    0: "Course Insights",
    1: "MP E-Waste Ledger",
    2: "Elemental Blueprint",
    3: "Kerala Landscape",
    4: "Plasma Arc",
    5: "EPR Review",
    6: "Policy Briefing",
    7: "E-Waste Week",
    8: "Green Buildings",
    9: "SWaCH Model",
    10: "Cartify"
  };

  const themeIndex = new Map();
  THEMES.forEach((theme, index) => {
    theme.assignments.forEach((code) => themeIndex.set(Number(code.slice(1)), index));
  });
  const themeKeys = THEMES.map((theme) => theme.title.toLowerCase());

  /* --- Theme toggle ---------------------------------------------------- */
  const root = document.documentElement;
  const themeButton = $("#themeToggle");
  const themeColour = $('meta[name="theme-color"]');

  const readTheme = () => {
    try {
      const saved = window.localStorage.getItem("ewem-theme");
      return saved === "dark" || saved === "light" ? saved : null;
    } catch (error) {
      return null;
    }
  };

  const savedTheme = readTheme();
  if (savedTheme) root.dataset.theme = savedTheme;

  function syncThemeButton() {
    const isDark = root.dataset.theme === "dark";
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    if (themeColour) themeColour.setAttribute("content", isDark ? "#121612" : "#f2ede2");
  }

  themeButton.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      window.localStorage.setItem("ewem-theme", next);
    } catch (error) {
      /* A blocked storage API should never break the switch. */
    }
    syncThemeButton();
  });

  syncThemeButton();

  /* --- Archive --------------------------------------------------------- */
  const archiveGrid = $("#archiveGrid");
  const filterCount = $("#filterCount");
  const emptyState = $("#emptyState");
  const searchInput = $("#archiveSearch");

  const state = { type: "all", theme: "all", query: "" };

  const searchIndex = new Map(
    ASSIGNMENTS.map((assignment) => [
      assignment.id,
      [
        assignment.title,
        assignment.kicker,
        assignment.description,
        assignment.type,
        assignment.dateLabel,
        ...assignment.tags,
        ...(assignment.group || []),
        ...assignment.files.map((file) => `${file.label} ${file.meta || ""} ${file.note || ""}`)
      ]
        .join(" ")
        .toLowerCase()
    ])
  );

  function fileSummary(assignment) {
    const documents = assignment.files.filter((file) => file.kind !== "LINK").length;
    const links = assignment.files.filter((file) => file.kind === "LINK").length;
    return [
      documents ? `${documents} file${documents === 1 ? "" : "s"}` : "",
      links ? `${links} live link${links === 1 ? "" : "s"}` : ""
    ]
      .filter(Boolean)
      .join(" · ");
  }

  function themeFor(assignment) {
    const index = themeIndex.get(assignment.id);
    return index === undefined ? "" : themeKeys[index];
  }

  function createCard(assignment, index) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = String(assignment.id);
    card.dataset.type = assignment.type.toLowerCase();
    card.dataset.themes = themeFor(assignment);
    card.style.setProperty("--d", `${(index % 3) * 55}ms`);
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${assignment.type} assignment ${pad(assignment.id)}: ${assignment.title}`);

    card.innerHTML = `
      <div class="card__cover">
        <img src="${esc(assignment.cover.src)}" alt="${esc(assignment.cover.alt)}" loading="lazy" decoding="async">
        <span class="card__index">${pad(assignment.id)}</span>
        <span class="card__type"><i aria-hidden="true"></i>${esc(assignment.type)}</span>
        <span class="card__view">Open ${ARROW}</span>
      </div>
      <div class="card__body">
        <p class="card__kicker">${esc(assignment.kicker)}</p>
        <h3 class="card__title">${esc(assignment.title)}</h3>
        <p class="card__desc">${esc(assignment.description)}</p>
        <ul class="tag-list" aria-label="Tags">
          ${assignment.tags.slice(0, 4).map((tag) => `<li>${esc(tag)}</li>`).join("")}
        </ul>
        <div class="card__foot">
          <span class="card__date"><i class="status-dot" aria-hidden="true"></i>${esc(assignment.status)} · ${esc(assignment.dateLabel || "In class")}</span>
          <span class="card__files">${esc(fileSummary(assignment))}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openDetail(assignment.id));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetail(assignment.id);
      }
    });

    return card;
  }

  ASSIGNMENTS.forEach((assignment, index) => {
    archiveGrid.appendChild(createCard(assignment, index));
  });

  function applyFilters() {
    const query = state.query.trim().toLowerCase();
    let shown = 0;

    $$(".card", archiveGrid).forEach((card) => {
      const id = Number(card.dataset.id);
      const typeMatches = state.type === "all" || card.dataset.type === state.type;
      const themeMatches = state.theme === "all" || card.dataset.themes.split(" ").includes(state.theme);
      const queryMatches = !query || (searchIndex.get(id) || "").includes(query);
      const visible = typeMatches && themeMatches && queryMatches;

      card.classList.toggle("is-filtered", !visible);
      if (visible) shown += 1;
    });

    filterCount.textContent = String(shown);
    emptyState.hidden = shown !== 0;
  }

  function setPressed(buttons, activeButton) {
    buttons.forEach((button) => {
      const active = button === activeButton;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  $$("[data-filter-type]").forEach((button) => {
    button.addEventListener("click", () => {
      state.type = button.dataset.filterType;
      setPressed($$("[data-filter-type]"), button);
      applyFilters();
    });
  });

  $$("[data-filter-theme]").forEach((button) => {
    button.addEventListener("click", () => {
      state.theme = button.dataset.filterTheme;
      setPressed($$("[data-filter-theme]"), button);
      applyFilters();
    });
  });

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    applyFilters();
  });

  function resetFilters() {
    state.type = "all";
    state.theme = "all";
    state.query = "";
    searchInput.value = "";
    const allType = $('[data-filter-type="all"]');
    const allTheme = $('[data-filter-theme="all"]');
    setPressed($$("[data-filter-type]"), allType);
    setPressed($$("[data-filter-theme]"), allTheme);
    applyFilters();
  }

  $("#filterReset").addEventListener("click", resetFilters);
  $("#emptyReset").addEventListener("click", resetFilters);

  /* --- Hero ring ------------------------------------------------------- */
  const SVG_NS = "http://www.w3.org/2000/svg";
  const ring = $("#ring");
  const ringWrap = $("#ringWrap");
  const ringCenter = $("#ringCenter");
  const ringNumber = $("#ringNumber");
  const ringLabel = $("#ringLabel");

  function buildRing() {
    const background = document.createElementNS(SVG_NS, "g");
    background.setAttribute("aria-hidden", "true");
    background.innerHTML = `
      <circle class="ring-orbit ring-orbit--inner" cx="300" cy="300" r="171"></circle>
      <g class="ring-spin">
        <circle class="ring-orbit" cx="300" cy="300" r="255"></circle>
      </g>
      <circle class="ring-disc" cx="300" cy="300" r="146"></circle>
    `;

    for (let i = 0; i < 60; i += 1) {
      const angle = (i / 60) * Math.PI * 2;
      const inner = 262;
      const outer = i % 5 === 0 ? 270 : 266;
      const tick = document.createElementNS(SVG_NS, "line");
      tick.setAttribute("class", "ring-tick");
      tick.setAttribute("x1", String(300 + Math.cos(angle) * inner));
      tick.setAttribute("y1", String(300 + Math.sin(angle) * inner));
      tick.setAttribute("x2", String(300 + Math.cos(angle) * outer));
      tick.setAttribute("y2", String(300 + Math.sin(angle) * outer));
      background.appendChild(tick);
    }
    ring.appendChild(background);

    ASSIGNMENTS.forEach((assignment, index) => {
      const angle = (-90 + (index * 360) / ASSIGNMENTS.length) * (Math.PI / 180);
      const radius = 218;
      const x = 300 + Math.cos(angle) * radius;
      const y = 300 + Math.sin(angle) * radius;

      const node = document.createElementNS(SVG_NS, "g");
      node.setAttribute("class", `ring-node ring-node--${assignment.type.toLowerCase()}`);
      node.setAttribute("transform", `translate(${x} ${y})`);
      node.setAttribute("tabindex", "0");
      node.setAttribute("role", "button");
      node.setAttribute("aria-label", `Open assignment ${pad(assignment.id)}: ${assignment.title}`);
      node.dataset.id = String(assignment.id);

      const title = document.createElementNS(SVG_NS, "title");
      title.textContent = `A${pad(assignment.id)} · ${assignment.title}`;

      const trace = document.createElementNS(SVG_NS, "line");
      trace.setAttribute("class", "ring-node__trace");
      trace.setAttribute("x1", String(-Math.cos(angle) * 25));
      trace.setAttribute("y1", String(-Math.sin(angle) * 25));
      trace.setAttribute("x2", String(-Math.cos(angle) * 58));
      trace.setAttribute("y2", String(-Math.sin(angle) * 58));

      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("r", "21");

      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dy", "3.4");
      text.textContent = pad(assignment.id);

      node.append(title, trace, circle, text);

      const focusNode = () => {
        ringNumber.textContent = `A${pad(assignment.id)}`;
        ringLabel.textContent = assignment.title;
        ringCenter.classList.add("is-detail");
        node.classList.add("is-active");
      };
      const blurNode = () => {
        node.classList.remove("is-active");
        if (!ring.querySelector(".ring-node:focus")) {
          ringNumber.textContent = "11";
          ringLabel.textContent = "submissions";
          ringCenter.classList.remove("is-detail");
        }
      };

      node.addEventListener("pointerenter", focusNode);
      node.addEventListener("pointerleave", blurNode);
      node.addEventListener("focus", focusNode);
      node.addEventListener("blur", blurNode);
      node.addEventListener("click", () => openDetail(assignment.id));
      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetail(assignment.id);
        }
      });

      ring.appendChild(node);
    });
  }

  /* --- Ticker ---------------------------------------------------------- */
  function buildTicker() {
    const track = $("#tickerTrack");
    if (!track) return;
    const sequence = ASSIGNMENTS.map(
      (assignment) => `<span>${pad(assignment.id)} · ${esc(assignment.title)}</span><i aria-hidden="true">✳</i>`
    ).join("");
    track.innerHTML = `
      <div class="ticker__set">${sequence}</div>
      <div class="ticker__set" aria-hidden="true">${sequence}</div>
    `;
  }

  /* --- Timeline -------------------------------------------------------- */
  function timelineItem(assignment, undated = false) {
    return `
      <button class="tl-item" type="button" data-id="${assignment.id}" aria-label="Open ${esc(assignment.type)} assignment ${pad(assignment.id)}: ${esc(assignment.title)}">
        <span class="tl-day" aria-hidden="true">A${pad(assignment.id)}</span>
        <span class="tl-body">
          <span class="tl-title">${esc(assignment.title)}</span>
          <span class="tl-meta">A${pad(assignment.id)} · ${esc(assignment.type)} · ${esc(assignment.status)}${undated ? " · In class" : ""}</span>
        </span>
      </button>
    `;
  }

  function buildTimeline() {
    const months = [
      { key: "2026-07", number: "07", name: "July" },
      { key: "2026-08", number: "08", name: "August" },
      { key: "2026-09", number: "09", name: "September" },
      { key: "2026-10", number: "10", name: "October" }
    ];
    const dated = ASSIGNMENTS.filter((assignment) => assignment.date).sort((a, b) => a.date.localeCompare(b.date));

    $("#timelineMonths").innerHTML = months
      .map((month) => {
        const entries = dated.filter((assignment) => assignment.date.startsWith(month.key));
        return `
          <section class="month" aria-label="${month.name} 2026">
            <header class="month__head">
              <span class="month__num">${month.number}</span>
              <h3 class="month__name">${month.name}</h3>
              <span class="month__year">2026 · ${entries.length} ${entries.length === 1 ? "entry" : "entries"}</span>
            </header>
            <div class="month__items">${entries.map((assignment) => timelineItem(assignment)).join("")}</div>
          </section>
        `;
      })
      .join("");

    const undated = ASSIGNMENTS.filter((assignment) => !assignment.date);
    $("#timelineUndated").innerHTML = `
      <p class="timeline__undated-label"><span>In class</span>No fixed date</p>
      <div class="timeline__undated-list">${undated.map((assignment) => timelineItem(assignment, true)).join("")}</div>
    `;
  }

  /* --- Live projects --------------------------------------------------- */
  function buildProjects() {
    $("#projectsGrid").innerHTML = PROJECTS.map(
      (project, index) => `
        <a class="project-card" href="${esc(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(project.title)} — ${esc(project.cta)} (opens in a new tab)">
          <span class="project-card__num" aria-hidden="true">${pad(index + 1)}</span>
          <span class="project-card__assignment">${esc(project.assignment)} · Live</span>
          <h3>${esc(project.title)}</h3>
          <span class="project-card__subtitle">${esc(project.subtitle)}</span>
          <p>${esc(project.description)}</p>
          <span class="project-card__cta">${esc(project.cta)} ${ARROW_UP}</span>
        </a>
      `
    ).join("");
  }

  /* --- Themes ---------------------------------------------------------- */
  function buildThemes() {
    $("#themesList").innerHTML = THEMES.map((theme) => {
      const chips = theme.assignments
        .map((code) => {
          const id = Number(code.slice(1));
          const assignment = ASSIGNMENTS.find((item) => item.id === id);
          return `<button class="chip" type="button" data-id="${id}" aria-label="Open ${esc(assignment.title)}"><b>${code}</b><span>${esc(SHORT_TITLES[id])}</span></button>`;
        })
        .join("");

      return `
        <article class="theme">
          <div class="theme__num" aria-hidden="true">${esc(theme.number)}</div>
          <div class="theme__head">
            <h3>${esc(theme.title)}</h3>
            <span class="theme__count">${theme.assignments.length} submissions</span>
          </div>
          <p class="theme__desc">${esc(theme.description)}</p>
          <div class="theme__map" aria-label="${esc(theme.title)} assignments">${chips}</div>
        </article>
      `;
    }).join("");
  }

  /* --- Detail dialog --------------------------------------------------- */
  const detail = $("#detail");
  const detailMedia = $("#detailMedia");
  const detailCover = $("#detailCover");
  const detailType = $("#detailType");
  const detailKicker = $("#detailKicker");
  const detailTitle = $("#detailTitle");
  const detailDesc = $("#detailDesc");
  const detailMeta = $("#detailMeta");
  const detailCount = $("#detailCount");
  const detailFiles = $("#detailFiles");
  const detailVideoWrap = $("#detailVideoWrap");
  const detailVideo = $("#detailVideo");
  const detailClose = $("#detailClose");
  const detailPrev = $("#detailPrev");
  const detailNext = $("#detailNext");

  let currentId = null;
  let lastFocus = null;

  function officeViewer(path) {
    const absolute = new URL(path, window.location.href).href;
    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(absolute)}`;
  }

  function fileRow(file) {
    if (file.kind === "LINK") {
      return `
        <li class="file-row file-row--link">
          <span class="file-kind">Live</span>
          <div class="file-info">
            <a class="file-link" href="${esc(file.url)}" target="_blank" rel="noopener noreferrer">${esc(file.label)} <span aria-hidden="true">↗</span></a>
            <span class="file-note">${esc(file.note || "External live site")} · opens in a new tab</span>
          </div>
          <div class="file-actions">
            <a class="file-action" href="${esc(file.url)}" target="_blank" rel="noopener noreferrer">Visit</a>
          </div>
        </li>
      `;
    }

    const href = file.office ? officeViewer(file.path) : file.path;
    const action = file.office ? "Preview" : "Open";
    const download = file.office
      ? `<a class="file-action" href="${esc(file.path)}" download>Download</a>`
      : "";

    return `
      <li class="file-row">
        <span class="file-kind">${esc(file.kind)}</span>
        <div class="file-info">
          <a class="file-link" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(file.label)} <span aria-hidden="true">↗</span></a>
          <span class="file-note">${esc(file.meta || "")}${file.office ? " · Microsoft online viewer" : ""}</span>
        </div>
        <div class="file-actions">
          <a class="file-action" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${action}</a>
          ${download}
        </div>
      </li>
    `;
  }

  function openDetail(id) {
    const assignment = ASSIGNMENTS.find((item) => item.id === id);
    if (!assignment) return;

    const wasOpen = detail.open;
    if (!wasOpen) lastFocus = document.activeElement;
    currentId = id;

    detailCover.src = assignment.cover.src;
    detailCover.alt = assignment.cover.alt;
    detailMedia.style.setProperty("--cover-image", `url("${assignment.cover.src}")`);
    detailType.textContent = `${assignment.type} · A${pad(assignment.id)}`;
    detailKicker.textContent = assignment.kicker;
    detailTitle.textContent = assignment.title;
    detailDesc.textContent = assignment.description;

    const thread = themeIndex.get(assignment.id);
    const contributors = assignment.group && assignment.group.length ? assignment.group.join(", ") : "Individual submission";
    const documents = assignment.files.filter((file) => file.kind !== "LINK").length;
    const links = assignment.files.filter((file) => file.kind === "LINK").length;

    detailMeta.innerHTML = `
      <div><dt>Assessment</dt><dd>${esc(assignment.type)} · ${assignment.type === "ISA" ? "In-semester" : "End-semester"}</dd></div>
      <div><dt>Recorded</dt><dd>${esc(assignment.dateLabel || "In class · no fixed date")}</dd></div>
      <div><dt>Status</dt><dd><span class="status-dot" aria-hidden="true"></span>${esc(assignment.status)}</dd></div>
      <div><dt>Thread</dt><dd>${thread === undefined ? "—" : esc(THEMES[thread].title)}</dd></div>
      <div><dt>Contributors</dt><dd>${esc(contributors)}</dd></div>
      <div><dt>Format</dt><dd>${documents} file${documents === 1 ? "" : "s"}${links ? ` · ${links} live link${links === 1 ? "" : "s"}` : ""}</dd></div>
    `;

    detailVideo.pause();
    detailVideo.removeAttribute("src");
    detailVideo.removeAttribute("poster");
    detailVideo.load();

    if (assignment.feature === "video") {
      const film = assignment.files.find((file) => file.video);
      if (film) {
        detailVideo.src = film.path;
        detailVideo.poster = assignment.cover.src;
        detailVideo.load();
        detailVideoWrap.hidden = false;
      } else {
        detailVideoWrap.hidden = true;
      }
    } else {
      detailVideoWrap.hidden = true;
    }

    detailFiles.innerHTML = assignment.files.map(fileRow).join("");
    detailCount.textContent = [
      documents ? `${documents} file${documents === 1 ? "" : "s"}` : "",
      links ? `${links} live link${links === 1 ? "" : "s"}` : ""
    ]
      .filter(Boolean)
      .join(" · ");

    const index = ASSIGNMENTS.findIndex((item) => item.id === assignment.id);
    const previous = ASSIGNMENTS[(index - 1 + ASSIGNMENTS.length) % ASSIGNMENTS.length];
    const next = ASSIGNMENTS[(index + 1) % ASSIGNMENTS.length];
    detailPrev.setAttribute("aria-label", `Previous: A${pad(previous.id)} ${previous.title}`);
    detailNext.setAttribute("aria-label", `Next: A${pad(next.id)} ${next.title}`);

    if (!wasOpen) {
      detail.showModal();
      document.body.classList.add("modal-open");
      detailClose.focus({ preventScroll: true });
    }
  }

  function stepDetail(direction) {
    if (currentId === null) return;
    const index = ASSIGNMENTS.findIndex((item) => item.id === currentId);
    if (index === -1) return;
    const next = ASSIGNMENTS[(index + direction + ASSIGNMENTS.length) % ASSIGNMENTS.length];
    openDetail(next.id);
  }

  detailClose.addEventListener("click", () => detail.close());
  detailPrev.addEventListener("click", () => stepDetail(-1));
  detailNext.addEventListener("click", () => stepDetail(1));

  detail.addEventListener("click", (event) => {
    if (event.target === detail) detail.close();
  });

  detail.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    detailVideo.pause();
    detailVideo.removeAttribute("src");
    detailVideo.load();
    currentId = null;
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus({ preventScroll: true });
    }
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const trigger = event.target.closest(".tl-item, .chip");
    if (trigger && trigger.dataset.id !== undefined) {
      openDetail(Number(trigger.dataset.id));
    }
  });

  /* --- Reveal, counters, scroll --------------------------------------- */
  function observeReveals() {
    const elements = $$("[data-reveal], .card");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    elements.forEach((element) => observer.observe(element));
  }

  function animateCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      counters.forEach((counter) => {
        counter.textContent = counter.dataset.count;
      });
      return;
    }

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count);
      if (!Number.isFinite(target)) return;
      const duration = 900;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progress < 1) window.requestAnimationFrame(tick);
      };

      window.requestAnimationFrame(tick);
    });
  }

  function initScrollChrome() {
    const header = $("#siteHead");
    const progress = $("#scrollProgress");
    let frame = null;

    const update = () => {
      frame = null;
      const top = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle("is-scrolled", top > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, top / max) : 0})`;
      if (top < 240) {
        $$(".site-nav a").forEach((link) => link.removeAttribute("aria-current"));
      }
    };

    const queue = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();

    const navLinks = $$(".site-nav a");
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${entry.target.id}`) {
                link.setAttribute("aria-current", "true");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          });
        },
        { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
      );
      sections.forEach((section) => spy.observe(section));
    }
  }

  /* --- Init ------------------------------------------------------------ */
  buildRing();
  buildTicker();
  buildTimeline();
  buildProjects();
  buildThemes();
  observeReveals();
  initScrollChrome();
  applyFilters();
  animateCounters();
})();
