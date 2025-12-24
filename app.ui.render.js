(function () {
  const app = window.GlossaryApp;
  if (!app) return;

  const { state } = app;

  const callIfFn = (fn, ...args) => (typeof fn === "function" ? fn(...args) : undefined);

  const BREAKPOINT_NARROW = 900;

  // ---------------------------------------
  // Header / Personalisierung (NEU)
  // ---------------------------------------
  const OWNER_STORAGE_KEY = "dnd-glossar-owner-name";
  const HEADER_DEFAULT_TITLE = "Das Handbuch des Wanderers";
  const HEADER_DEFAULT_SUBTITLE = "Ein Nachschlagewerk von Duria";

  function getOwnerNameFromStorageFallback() {
    try {
      const raw = window.localStorage.getItem(OWNER_STORAGE_KEY);
      return typeof raw === "string" ? raw.trim() : "";
    } catch {
      return "";
    }
  }

  function normalizeOwnerName(name) {
    const s = typeof name === "string" ? name.trim() : "";
    return s;
  }

  function makePossessive(name) {
    const n = normalizeOwnerName(name);
    if (!n) return "";

    // hübscher: Felix’ statt Felix’s (Endungen)
    const last = n.slice(-1).toLowerCase();
    const needsOnlyApostrophe = last === "s" || last === "x" || last === "z" || last === "ß";

    // typografischer Apostroph
    const apostrophe = "’";
    return needsOnlyApostrophe ? `${n}${apostrophe}` : `${n}${apostrophe}s`;
  }

  function computeHeaderSubtitle() {
    // bevorzugt: zentrale API aus core (bauen wir gleich nach)
    const viaFn =
      typeof app.getOwnerName === "function"
        ? normalizeOwnerName(app.getOwnerName())
        : typeof state.ownerName === "string"
        ? normalizeOwnerName(state.ownerName)
        : normalizeOwnerName(getOwnerNameFromStorageFallback());

    if (!viaFn) return HEADER_DEFAULT_SUBTITLE;

    return `${makePossessive(viaFn)} Nachschlagewerk von Duria`;
  }

  function renderHeader() {
    const dom = app.dom || {};
    if (!dom.headerTitle && !dom.headerSubtitle) return;

    if (dom.headerTitle) dom.headerTitle.textContent = HEADER_DEFAULT_TITLE;
    if (dom.headerSubtitle) dom.headerSubtitle.textContent = computeHeaderSubtitle();
  }

  // UI-State für Category-Sheet Accordion (persistiert über Re-Renders)
  const ui = (app._ui = app._ui || {});
  ui.categorySheet = ui.categorySheet || { collapsed: {} };

  // UI-State für Timeline (persistiert über Re-Renders)
  // mode: "list" | "axis"  (Option A: list ist Standard)
  ui.timeline = ui.timeline || { laneVisibility: {}, zoom: 1, mode: "list" };

  // Dashboard UI state
  ui.dashboard = ui.dashboard || { layoutReady: false };

  // ---------------------------------------
  // Timeline Helpers
  // ---------------------------------------

  function toNonEmptyString(v) {
    const s = typeof v === "string" ? v.trim() : String(v || "").trim();
    return s ? s : "";
  }

  function isNarrowViewport() {
    try {
      return window.matchMedia && window.matchMedia(`(max-width: ${BREAKPOINT_NARROW}px)`).matches;
    } catch (e) {
      return (window.innerWidth || 0) <= BREAKPOINT_NARROW;
    }
  }

  function ensureTimelineModeDefault() {
    // Einzige Quelle für Timeline-Defaults: app.ensureTimelineUiDefaults() (aus app.ui.js),
    // falls vorhanden. Sonst Fallback hier.
    if (typeof app.ensureTimelineUiDefaults === "function") {
      app.ensureTimelineUiDefaults();
      return;
    }

    // Fallback:
    if (isNarrowViewport()) {
      ui.timeline.mode = "list";
      return;
    }
    const m = toNonEmptyString(ui.timeline.mode);
    if (m !== "list" && m !== "axis") ui.timeline.mode = "list";
  }

  function getItemLaneId(item) {
    // unterstützt alte/verschiedene Feldnamen
    return (
      toNonEmptyString(
        item && (item.laneId || item.scopeId || item.lane || item.countryId || item.groupId)
      ) || "world"
    );
  }

  function getTimelineMetaFromAny(cfg) {
    // bevorzugt: app.getTimelineMeta()
    const viaFn = callIfFn(app.getTimelineMeta);
    if (viaFn && typeof viaFn === "object") return viaFn;

    // dann: cfg.meta / cfg.timelineMeta / window.timelineMeta
    if (cfg && typeof cfg.meta === "object") return cfg.meta;
    if (cfg && typeof cfg.timelineMeta === "object") return cfg.timelineMeta;
    if (window.timelineMeta && typeof window.timelineMeta === "object") return window.timelineMeta;

    // dann: cfg selbst, falls jemand meta direkt dort abgelegt hat
    return null;
  }

  // ✅ NEU: Start-Label robust aus meta/cfg ziehen (meta.start kann Objekt sein)
  function getTimelineStartLabel(meta, cfg) {
    const m = meta && typeof meta === "object" ? meta : null;

    const ms = m ? m.start : null;
    if (typeof ms === "string") return toNonEmptyString(ms);
    if (ms && typeof ms === "object") {
      const label = toNonEmptyString(ms.label || ms.start || ms.value);
      if (label) return label;
    }

    // Fallbacks (alt)
    if (typeof (m && m.begin) === "string") return toNonEmptyString(m.begin);
    if (typeof (m && m.origin) === "string") return toNonEmptyString(m.origin);

    const cs = cfg && (cfg.start || cfg.begin || cfg.origin);
    if (typeof cs === "string") return toNonEmptyString(cs);

    return "";
  }

  function normalizeLanes(cfg, items) {
    // 1) bevorzugt: app.getTimelineLanes()
    let lanes =
      typeof app.getTimelineLanes === "function"
        ? app.getTimelineLanes()
        : cfg && Array.isArray(cfg.lanes)
        ? cfg.lanes
        : cfg && Array.isArray(cfg.scopes)
        ? cfg.scopes
        : [];

    // 2) sonst aus meta.scopes
    if (!Array.isArray(lanes) || !lanes.length) {
      const meta = getTimelineMetaFromAny(cfg);
      if (meta && Array.isArray(meta.scopes)) lanes = meta.scopes;
    }

    // 3) sonst: aus Items ableiten (mindestens world/campari)
    if (!Array.isArray(lanes) || !lanes.length) {
      const used = new Set();
      (items || []).forEach((it) => used.add(getItemLaneId(it)));

      // defaults
      const defaults = [
        { id: "world", name: "Weltgeschichte", icon: "🌍", color: "#6b7280" },
        { id: "campari", name: "Campari", icon: "🏰", color: "#1fa58b" },
      ];

      const derived = [];
      defaults.forEach((d) => {
        if (used.has(d.id)) derived.push(d);
      });

      // rest
      Array.from(used)
        .filter((id) => !derived.some((l) => l.id === id))
        .forEach((id) => {
          derived.push({ id, name: id, icon: "🏷️", color: "#999999" });
        });

      lanes = derived;
    }

    // Normalize / sanitize
    const out = [];
    const seen = new Set();
    lanes.forEach((l) => {
      const obj = l && typeof l === "object" ? l : null;
      if (!obj) return;
      const id = toNonEmptyString(obj.id);
      if (!id || seen.has(id)) return;
      seen.add(id);

      out.push({
        id,
        name: toNonEmptyString(obj.name) || id,
        icon: toNonEmptyString(obj.icon),
        color: toNonEmptyString(obj.color),
      });
    });

    // Stelle sicher, dass alle verwendeten LaneIds vorhanden sind
    const usedIds = new Set();
    (items || []).forEach((it) => usedIds.add(getItemLaneId(it)));
    usedIds.forEach((id) => {
      if (!out.some((l) => l.id === id)) {
        out.push({ id, name: id, icon: "🏷️", color: "#999999" });
      }
    });

    return out;
  }

  function parseEraValue(raw) {
    // nutzt app.parseTimelinePosition, wenn vorhanden
    const p =
      typeof app.parseTimelinePosition === "function"
        ? app.parseTimelinePosition(raw)
        : { kind: "none", value: Number.POSITIVE_INFINITY };

    // ✅ Variante B: p.value ist der Achsenwert (NGT hat KEINEN Offset mehr)
    if (p && p.kind === "era" && typeof p.value === "number" && Number.isFinite(p.value)) return p.value;
    return null;
  }

  function getItemEraStartEnd(item) {
    // bevorzugt interne _startPos/_endPos aus app.core
    const sp = item && item._startPos ? item._startPos : null;
    const ep = item && item._endPos ? item._endPos : null;

    let s =
      sp && sp.kind === "era" && typeof sp.value === "number" && Number.isFinite(sp.value)
        ? sp.value
        : parseEraValue(item && item.start);

    let e =
      ep && ep.kind === "era" && typeof ep.value === "number" && Number.isFinite(ep.value)
        ? ep.value
        : parseEraValue(item && item.end);

    if (s == null) return null;
    if (e == null) e = s;

    // swap wenn gedreht
    if (e < s) {
      const tmp = s;
      s = e;
      e = tmp;
    }

    return { startVal: s, endVal: e };
  }

  function formatEraYear(year) {
    // Achtung: wird für Achsen-Ticks genutzt (nur numerisch)
    if (typeof year !== "number" || Number.isNaN(year)) return "";
    if (year === 0) return "0 GT";
    if (year < 0) return `${Math.abs(year)} VGT`;
    return `${year} NGT`;
  }

  // ✅ NEU: Für Gruppen-Labels Events (wenn parseTimelinePosition era/GT/NGT liefert)
  function formatEraLabelFromParsed(p) {
    if (!p || p.kind !== "era") return "";
    const y = typeof p.year === "number" && Number.isFinite(p.year) ? p.year : null;
    const era = toNonEmptyString(p.era).toUpperCase();

    if (y == null) {
      if (typeof p.value === "number" && Number.isFinite(p.value)) return formatEraYear(p.value);
      return "";
    }

    if (y === 0) return "0 GT";
    if (era === "VGT") return `${y} VGT`;
    if (era === "GT") return `${y} GT`;
    // default: NGT
    return `${y} NGT`;
  }

  function chooseEraTickStep(range) {
    const r = Math.abs(range || 0);
    if (r <= 50) return 5;
    if (r <= 120) return 10;
    if (r <= 300) return 25;
    if (r <= 800) return 50;
    if (r <= 2000) return 100;
    return 200;
  }

  function computePxPerUnitForEra(range) {
    const r = Math.abs(range || 0);
    if (r <= 200) return 8;
    if (r <= 600) return 5;
    if (r <= 1200) return 3;
    return 2;
  }

  function assignTracksForLane(events) {
    // events: [{ startVal, endVal, ... }]
    const sorted = events
      .slice()
      .sort((a, b) => {
        if (a.startVal !== b.startVal) return a.startVal - b.startVal;
        // länger zuerst
        return b.endVal - b.startVal - (a.endVal - a.startVal);
      });

    const trackEnd = [];
    sorted.forEach((ev) => {
      let placed = false;
      for (let t = 0; t < trackEnd.length; t += 1) {
        // >= = back-to-back ist ok, kein Overlap
        if (ev.startVal >= trackEnd[t]) {
          ev._track = t;
          trackEnd[t] = ev.endVal;
          placed = true;
          break;
        }
      }
      if (!placed) {
        ev._track = trackEnd.length;
        trackEnd.push(ev.endVal);
      }
    });

    return { events: sorted, trackCount: Math.max(1, trackEnd.length) };
  }

  function formatTimelineRange(item) {
    const start = (item && item.start ? String(item.start).trim() : "") || "";
    const end = (item && item.end ? String(item.end).trim() : "") || "";
    if (start && end) return `${start} – ${end}`;
    if (start) return start;
    if (end) return end;
    return "";
  }

  function getParsedStart(item) {
    if (!item) return null;
    if (item._startPos && typeof item._startPos === "object") return item._startPos;
    return typeof app.parseTimelinePosition === "function" ? app.parseTimelinePosition(item.start) : null;
  }

  function kindRank(p) {
    if (!p || !p.kind) return 9;
    if (p.kind === "era") return 0;
    if (p.kind === "date") return 1;
    if (p.kind === "session") return 2;
    if (p.kind === "text") return 3;
    return 9;
  }

  function groupLabelForItem(item) {
    const p = getParsedStart(item);
    if (!p || !p.kind) return "Ohne Datum";

    // ✅ Variante B: NGT wird nicht mehr als 100xxxx angezeigt, weil wir NICHT p.sortValue labeln.
    if (p.kind === "era") {
      const lab = formatEraLabelFromParsed(p);
      if (lab) return lab;
      if (typeof p.value === "number" && Number.isFinite(p.value)) return formatEraYear(p.value);
      return "Epoche";
    }

    if (p.kind === "date" && typeof p.value === "number" && Number.isFinite(p.value)) {
      try {
        const d = new Date(p.value);
        const y = d.getFullYear();
        return Number.isFinite(y) ? String(y) : "Datum";
      } catch (e) {
        return "Datum";
      }
    }
    if (p.kind === "session") return toNonEmptyString(item.start) || "Session";
    if (p.kind === "text") return "Sonstiges";
    return "Ohne Datum";
  }

  function ensureLaneVisibilityDefaults(lanes) {
    const vis = ui.timeline.laneVisibility || (ui.timeline.laneVisibility = {});
    (lanes || []).forEach((lane) => {
      if (!lane || !lane.id) return;
      if (vis[lane.id] == null) vis[lane.id] = true;
    });
    return vis;
  }

  // ---- simple readable text color for bars (hex/rgb/rgba) ----
  function parseCssColorToRgb(input) {
    const s = String(input || "").trim();
    if (!s) return null;

    // #rgb / #rrggbb
    const hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hex) {
      let h = hex[1];
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      const n = parseInt(h, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }

    // rgb/rgba
    const rgb = s.match(
      /^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)$/i
    );
    if (rgb) {
      return { r: Number(rgb[1]) || 0, g: Number(rgb[2]) || 0, b: Number(rgb[3]) || 0 };
    }

    return null;
  }

  function pickTextColor(bg) {
    const rgb = parseCssColorToRgb(bg);
    if (!rgb) return "rgba(255,255,255,0.95)";
    // relative luminance approximation
    const lum = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
    return lum > 0.62 ? "rgba(17,24,39,0.92)" : "rgba(255,255,255,0.95)";
  }

  function makeChip(label, isActive, onClick, extraClass) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-chip" + (extraClass ? " " + extraClass : "");
    if (isActive) btn.classList.add("is-active");
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  // ---------------------------------------
  // Category Sheet Rendering
  // ---------------------------------------
  function renderCategorySheet() {
    const dom = app.dom || {};
    if (!dom.categorySheetContent) return;

    const counts = callIfFn(app.computeCategoryCounts) || {};

    dom.categorySheetContent.innerHTML = "";

    const quick = document.createElement("div");
    quick.className = "category-sheet-quick";

    const makeQuickBtn = (label, icon, count, onClick, isActive) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-sheet-cat-btn";
      if (isActive) btn.classList.add("is-active");

      btn.innerHTML = `
        <span class="category-sheet-cat-left">
          <span class="category-sheet-cat-icon" aria-hidden="true">${app.escapeHtml(icon || "📁")}</span>
          <span class="category-sheet-cat-name">${app.escapeHtml(label)}</span>
        </span>
        <span class="category-sheet-cat-meta">
          ${
            count != null
              ? `<span class="category-sheet-cat-count">${app.escapeHtml(String(count))}</span>`
              : ""
          }
        </span>
      `;
      btn.addEventListener("click", onClick);
      return btn;
    };

    // "Alle"
    quick.appendChild(
      makeQuickBtn(
        "Alle Einträge",
        "📚",
        counts.all != null ? counts.all : null,
        () => {
          callIfFn(app.closeCategorySheet);
          callIfFn(app.navigateToCategory, "all");
        },
        state.activeCategoryId === "all" && !state.onlyNew
      )
    );

    // "Neu (ungesehen)"
    if (typeof app.computeNewStats === "function") {
      const ns = app.computeNewStats() || { totalNew: 0, unseenNew: 0 };
      const unseen = ns.unseenNew || 0;
      if (unseen > 0) {
        quick.appendChild(
          makeQuickBtn(
            "Neu (ungesehen)",
            "✨",
            unseen,
            () => {
              callIfFn(app.closeCategorySheet);
              callIfFn(app.navigateToNewList, "unseen");
            },
            !!state.onlyNew && !!state.onlyUnseenNew
          )
        );
      }
    }

    dom.categorySheetContent.appendChild(quick);

    // Gruppen (categoryGroups) oder Fallback
    const groups = Array.isArray(app.categoryGroups) ? app.categoryGroups : [];
    const used = new Set();
    const collapsed = ui.categorySheet.collapsed;

    const addGroup = (group) => {
      const gid = group.id || "group";
      const gname = group.name || "Gruppe";
      const gicon = group.icon || "";

      const wrapper = document.createElement("section");
      wrapper.className = "category-sheet-group";
      if (collapsed[gid]) wrapper.classList.add("is-collapsed");

      const headerBtn = document.createElement("button");
      headerBtn.type = "button";
      headerBtn.className = "category-sheet-group-header";
      headerBtn.style.border = "none";
      headerBtn.style.background = "transparent";
      headerBtn.style.width = "100%";
      headerBtn.style.textAlign = "left";

      headerBtn.innerHTML = `
        <span class="category-sheet-group-title">
          ${
            gicon
              ? `<span class="category-sheet-group-icon" aria-hidden="true">${app.escapeHtml(gicon)}</span>`
              : `<span class="category-sheet-group-icon" aria-hidden="true">📁</span>`
          }
          <span>${app.escapeHtml(gname)}</span>
        </span>
        <span class="category-sheet-group-toggle" aria-hidden="true">▾</span>
      `;

      headerBtn.addEventListener("click", () => {
        collapsed[gid] = !collapsed[gid];
        renderCategorySheet();
      });

      const catsWrap = document.createElement("div");
      catsWrap.className = "category-sheet-cats";

      (group.categoryIds || []).forEach((id) => {
        const cat = callIfFn(app.getCategoryById, id);
        if (!cat || cat.id === "all") return;

        used.add(cat.id);

        const count = counts[cat.id] != null ? counts[cat.id] : null;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "category-sheet-cat-btn";
        if (cat.id === state.activeCategoryId && !state.onlyNew) btn.classList.add("is-active");
        btn.dataset.categoryId = cat.id;

        btn.innerHTML = `
          <span class="category-sheet-cat-left">
            <span class="category-sheet-cat-icon" aria-hidden="true">${app.escapeHtml(cat.icon || "📁")}</span>
            <span class="category-sheet-cat-name">${app.escapeHtml(cat.name || cat.id)}</span>
          </span>
          <span class="category-sheet-cat-meta">
            ${
              count != null
                ? `<span class="category-sheet-cat-count">${app.escapeHtml(String(count))}</span>`
                : ""
            }
          </span>
        `;

        btn.addEventListener("click", () => {
          callIfFn(app.closeCategorySheet);
          callIfFn(app.navigateToCategory, cat.id);
        });

        catsWrap.appendChild(btn);
      });

      wrapper.appendChild(headerBtn);
      wrapper.appendChild(catsWrap);
      dom.categorySheetContent.appendChild(wrapper);
    };

    if (groups.length) {
      groups.forEach(addGroup);

      const allCats = Array.isArray(app.allCategories) ? app.allCategories : [];
      const remaining = allCats.filter((c) => c && c.id !== "all" && !used.has(c.id));
      if (remaining.length) {
        addGroup({
          id: "remaining",
          name: "Weitere",
          icon: "➕",
          categoryIds: remaining.map((c) => c.id),
        });
      }
      return;
    }

    const allCats = Array.isArray(app.allCategories) ? app.allCategories : [];
    addGroup({
      id: "allcats",
      name: "Kategorien",
      icon: "📚",
      categoryIds: allCats.filter((c) => c && c.id !== "all").map((c) => c.id),
    });
  }

  // ---------------------------------------
  // Dashboard Rendering (Option A Layout)
  // ---------------------------------------
  // (unverändert)
  function ensureDashboardOptionALayout() {
    const dom = app.dom || {};
    const dash = dom.dashboard;
    if (!dash) return;

    const grid = dash.querySelector(".dashboard-grid");
    if (!grid) return;

    // Shell anlegen (nach dem Titel), falls nicht vorhanden
    let shell = dash.querySelector(".dashboard-shell");
    if (!shell) {
      shell = document.createElement("div");
      shell.className = "dashboard-shell";

      const title = dash.querySelector(".dashboard-title");
      if (title && title.parentNode === dash) {
        if (title.nextSibling) dash.insertBefore(shell, title.nextSibling);
        else dash.appendChild(shell);
      } else {
        dash.insertBefore(shell, grid);
      }
    }

    // Sections anlegen
    let hero = shell.querySelector(".dashboard-hero");
    if (!hero) {
      hero = document.createElement("section");
      hero.className = "dashboard-hero";
      shell.appendChild(hero);
    }

    let quick = shell.querySelector(".dashboard-quick-actions");
    if (!quick) {
      quick = document.createElement("section");
      quick.className = "dashboard-quick-actions";
      shell.appendChild(quick);
    }

    let quickRow = quick.querySelector(".dashboard-quick-actions-row");
    if (!quickRow) {
      quickRow = document.createElement("div");
      quickRow.className = "dashboard-quick-actions-row";
      quick.appendChild(quickRow);
    }

    // Cards finden
    const progressCard =
      dom.dashboardProgressFill && dom.dashboardProgressFill.closest(".dashboard-card")
        ? dom.dashboardProgressFill.closest(".dashboard-card")
        : null;

    const questsCard = document.getElementById("dashboard-quests-card");
    const newCard = document.getElementById("dashboard-new-card");
    const timelineCard = document.getElementById("dashboard-timeline-card");

    // Hero: Progress Card
    if (progressCard) {
      progressCard.classList.add("dashboard-hero-card");
      if (!hero.contains(progressCard)) hero.appendChild(progressCard);
    }

    // Quick Actions Row: Quests / Neu / Timeline
    [questsCard, newCard, timelineCard].forEach((card) => {
      if (!card) return;
      card.classList.add("dashboard-mini-card");
      if (!quickRow.contains(card)) quickRow.appendChild(card);
    });

    // Rest-Grid ans Ende der Shell hängen (falls noch draußen)
    if (grid.parentNode !== shell) {
      shell.appendChild(grid);
    }

    ui.dashboard.layoutReady = true;
  }

  // ... Dashboard helpers bleiben unverändert ...
  function ensureDashboardLatestList() {
    const dom = app.dom || {};
    if (dom.dashboardLatestList) return dom.dashboardLatestList;

    const byId =
      document.getElementById("dashboard-latest-list") ||
      document.getElementById("dashboard-latest-links") ||
      null;

    if (byId) {
      dom.dashboardLatestList = byId;
      return byId;
    }

    if (dom.dashboardLatestCard) {
      const list = document.createElement("div");
      list.id = "dashboard-latest-list";
      list.className = "dashboard-latest-links-list entry-detail-related-list";
      dom.dashboardLatestCard.appendChild(list);
      dom.dashboardLatestList = list;
      return list;
    }

    return null;
  }

  function renderDashboardLatest() {
    const list = ensureDashboardLatestList();
    if (!list) return;

    list.innerHTML = "";

    let recap = null;
    let patch = null;

    if (typeof app.computeLatestDashboardLinks === "function") {
      const latest = app.computeLatestDashboardLinks() || {};
      recap = latest.recap || null;
      patch = latest.patch || null;
    } else if (typeof app.findLatestEntryInCategory === "function") {
      recap = app.findLatestEntryInCategory("recaps");
      patch = app.findLatestEntryInCategory("patch-notes");
    }

    if (!recap && !patch) {
      const p = document.createElement("p");
      p.className = "dashboard-note";
      p.textContent = "Noch keine Recaps oder Patch Notes gefunden.";
      list.appendChild(p);
      return;
    }

    const makeBtn = (label, entry, iconFallback) => {
      if (!entry) return null;

      const cat = callIfFn(app.getCategoryById, entry.categoryId);
      const icon = cat ? cat.icon || iconFallback : iconFallback;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "related-link";
      btn.innerHTML = `
        <span aria-hidden="true">${app.escapeHtml(icon)}</span>
        <span><strong>${app.escapeHtml(label)}:</strong> ${app.escapeHtml(entry.title || "Ohne Titel")}</span>
      `;
      btn.addEventListener("click", () => callIfFn(app.navigateToEntry, entry.id));
      return btn;
    };

    const recapBtn = makeBtn("Letzter Recap", recap, "📜");
    const patchBtn = makeBtn("Letzter Patch", patch, "🧩");
    if (recapBtn) list.appendChild(recapBtn);
    if (patchBtn) list.appendChild(patchBtn);
  }

  function renderDashboardRecent() {
    const dom = app.dom || {};
    if (!dom.dashboardRecentList) return;

    const recent = callIfFn(app.computeRecentUpdates, 5) || [];

    dom.dashboardRecentList.innerHTML = "";

    if (!recent.length) {
      const p = document.createElement("p");
      p.className = "dashboard-note";
      p.textContent = "Noch keine Aktualisierungen gefunden.";
      dom.dashboardRecentList.appendChild(p);
      return;
    }

    recent.forEach((entry) => {
      const cat = callIfFn(app.getCategoryById, entry.categoryId);
      const icon = cat ? cat.icon || "📁" : "📁";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "related-link";
      btn.innerHTML = `
        <span aria-hidden="true">${app.escapeHtml(icon)}</span>
        <span>${app.escapeHtml(entry.title || "Ohne Titel")}</span>
      `;
      btn.addEventListener("click", () => callIfFn(app.navigateToEntry, entry.id));

      dom.dashboardRecentList.appendChild(btn);
    });
  }

  function renderDashboardQuickLinks() {
    const dom = app.dom || {};
    if (!dom.dashboardQuickLinks) return;

    const counts = callIfFn(app.computeCategoryCounts) || {};
    dom.dashboardQuickLinks.innerHTML = "";

    const preferred = [
      "cities",
      "npcs",
      "factions",
      "monsters",
      "items",
      "quests-success",
      "quests-failed",
      "recaps",
      "patch-notes",
      "tutorials",
    ];

    const getCat = (id) => callIfFn(app.getCategoryById, id);
    const existing = preferred.map(getCat).filter(Boolean);

    const allCats = Array.isArray(app.allCategories) ? app.allCategories : [];
    const fallback = allCats.filter((c) => c && c.id !== "all").slice(0, 8);

    const list = existing.length ? existing.slice(0, 8) : fallback;

    list.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-chip";

      const count = counts[cat.id] != null ? counts[cat.id] : null;

      btn.innerHTML = `${app.escapeHtml(cat.icon || "📁")} ${app.escapeHtml(
        cat.name || cat.id
      )}${count != null ? ` <strong style="margin-left:0.25rem">(${count})</strong>` : ""}`;

      btn.addEventListener("click", () => callIfFn(app.navigateToCategory, cat.id));
      dom.dashboardQuickLinks.appendChild(btn);
    });

    const allBtn = document.createElement("button");
    allBtn.type = "button";
    allBtn.className = "filter-chip";

    const allCount = counts.all != null ? counts.all : null;
    allBtn.innerHTML = `📚 Alle${
      allCount != null ? ` <strong style="margin-left:0.25rem">(${allCount})</strong>` : ""
    }`;

    allBtn.addEventListener("click", () => callIfFn(app.navigateToCategory, "all"));
    dom.dashboardQuickLinks.appendChild(allBtn);
  }

  function renderDashboard() {
    const dom = app.dom || {};
    if (!dom.dashboard) return;

    ensureDashboardOptionALayout();

    const cfg = state.dashboard || {};
    let percentRaw = cfg.progressPercent;

    if (typeof percentRaw === "string") {
      const parsed = parseFloat(percentRaw.replace(",", "."));
      percentRaw = Number.isFinite(parsed) ? parsed : 0;
    }

    let percent = typeof percentRaw === "number" ? percentRaw : 0;
    if (!Number.isFinite(percent)) percent = 0;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    if (dom.dashboardProgressFill) {
      if (state.lastDashboardPercent == null || state.lastDashboardPercent !== percent) {
        dom.dashboardProgressFill.style.width = percent + "%";
        dom.dashboardProgressFill.setAttribute("aria-valuenow", String(Math.round(percent)));
        state.lastDashboardPercent = percent;
      }
    }

    if (dom.dashboardProgressLabel) dom.dashboardProgressLabel.textContent = cfg.progressLabel || "";

    if (dom.dashboardNote) {
      const notes = Array.isArray(cfg.notes) && cfg.notes.length ? cfg.notes : null;
      if (notes) {
        dom.dashboardNote.innerHTML = notes.map((line) => `<div>${app.escapeHtml(line)}</div>`).join("");
      } else {
        dom.dashboardNote.textContent = cfg.note || "";
      }
    }

    if (typeof app.computeQuestStats === "function") {
      const { success, failed } = app.computeQuestStats();
      if (dom.dashboardQuestsSuccess) dom.dashboardQuestsSuccess.textContent = String(success);
      if (dom.dashboardQuestsFailed) dom.dashboardQuestsFailed.textContent = String(failed);
    }

    if (typeof app.computeNewStats === "function") {
      const { totalNew, unseenNew } = app.computeNewStats();
      if (dom.dashboardNewTotal) dom.dashboardNewTotal.textContent = String(totalNew);
      if (dom.dashboardNewUnseen) dom.dashboardNewUnseen.textContent = String(unseenNew);
    }

    renderDashboardLatest();
    renderDashboardRecent();
    renderDashboardQuickLinks();

    // ✅ Wichtig: Dashboard-Quick-Buttons zuverlässig verdrahten (kommt aus app.ui.js)
    callIfFn(app.bindDashboardQuickActionsOnce);
  }

  // ---------------------------------------
  // Timeline Rendering
  // ---------------------------------------
  function ensureTimelineHost() {
    const dom = app.dom || {};
    if (dom.timelineHost) return dom.timelineHost;

    const byId = document.getElementById("timeline-list");
    if (byId) {
      dom.timelineHost = byId;
      return byId;
    }

    if (dom.timelineView) {
      const host = document.createElement("div");
      host.id = "timeline-list";
      host.className = "timeline-root";
      dom.timelineView.appendChild(host);
      dom.timelineHost = host;
      return host;
    }

    return null;
  }

  function ensureTimelineToolbar() {
    const dom = app.dom || {};
    if (dom.timelineToolbar) return dom.timelineToolbar;

    const byId = document.getElementById("timeline-toolbar");
    if (byId) {
      dom.timelineToolbar = byId;
      return byId;
    }
    return null;
  }

  function hasHeaderModeToggle() {
    return !!(
      document.getElementById("timeline-mode-story") &&
      document.getElementById("timeline-mode-axis")
    );
  }

  function bindTimelineHeaderModeToggleOnce() {
    const story = document.getElementById("timeline-mode-story");
    const axis = document.getElementById("timeline-mode-axis");
    if (!story || !axis) return;

    if (story.dataset.bound === "1" && axis.dataset.bound === "1") return;
    story.dataset.bound = "1";
    axis.dataset.bound = "1";

    story.addEventListener("click", () => {
      ui.timeline.mode = "list";
      renderTimeline();
    });

    axis.addEventListener("click", () => {
      ui.timeline.mode = "axis";
      renderTimeline();
    });
  }

  function syncTimelineHeaderModeToggle(hasEra) {
    const story = document.getElementById("timeline-mode-story");
    const axis = document.getElementById("timeline-mode-axis");
    if (!story || !axis) return;

    const isMobile = isNarrowViewport();
    const axisAllowed = !isMobile && !!hasEra;

    axis.hidden = isMobile;

    axis.disabled = !axisAllowed;
    axis.setAttribute("aria-disabled", String(!axisAllowed));

    if (ui.timeline.mode === "axis" && !axisAllowed) ui.timeline.mode = "list";

    const isAxis = ui.timeline.mode === "axis" && axisAllowed;

    story.classList.toggle("is-active", !isAxis);
    axis.classList.toggle("is-active", isAxis);

    story.setAttribute("aria-pressed", String(!isAxis));
    axis.setAttribute("aria-pressed", String(isAxis));
  }

  function renderTimelineListItems(host, items, lanesById, opts) {
    const options = opts && typeof opts === "object" ? opts : {};
    const group = options.group !== false;
    const showLaneLine = options.showLaneLine !== false;
    const compact = !!options.compact;

    host.className = compact ? "timeline-list timeline-list--compact" : "timeline-list";
    host.innerHTML = "";

    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML =
        "<p>Noch keine Timeline-Events vorhanden. Füge im Editor unter „Timeline“ Events hinzu.</p>";
      host.appendChild(empty);
      return;
    }

    const sorted = items.slice().sort((a, b) => {
      const ap = getParsedStart(a);
      const bp = getParsedStart(b);

      const ar = kindRank(ap);
      const br = kindRank(bp);
      if (ar !== br) return ar - br;

      // ✅ Variante B: sortiere nach sortValue (falls vorhanden), NICHT nach value
      const av =
        ap && typeof ap.sortValue === "number" && Number.isFinite(ap.sortValue)
          ? ap.sortValue
          : ap && typeof ap.value === "number" && Number.isFinite(ap.value)
          ? ap.value
          : Number.POSITIVE_INFINITY;

      const bv =
        bp && typeof bp.sortValue === "number" && Number.isFinite(bp.sortValue)
          ? bp.sortValue
          : bp && typeof bp.value === "number" && Number.isFinite(bp.value)
          ? bp.value
          : Number.POSITIVE_INFINITY;

      if (av !== bv) return av - bv;

      const ai = typeof a._index === "number" ? a._index : 0;
      const bi = typeof b._index === "number" ? b._index : 0;
      return ai - bi;
    });

    const groups = [];
    if (group) {
      const map = new Map();
      sorted.forEach((it) => {
        const label = groupLabelForItem(it);
        if (!map.has(label)) map.set(label, []);
        map.get(label).push(it);
      });
      map.forEach((list, label) => groups.push({ label, list }));
    } else {
      groups.push({ label: "", list: sorted });
    }

    groups.forEach((g) => {
      if (g.label) {
        const gh = document.createElement("div");
        gh.className = "timeline-group-header";
        gh.textContent = g.label;
        host.appendChild(gh);
      }

      g.list.forEach((item) => {
        const entry = typeof app.resolveTimelineEntry === "function" ? app.resolveTimelineEntry(item) : null;

        const range = formatTimelineRange(item);
        const title = (item && item.title ? String(item.title) : "").trim() || "Event";
        const note = (item && item.note ? String(item.note) : "").trim();
        const type = (item && item.type ? String(item.type) : "").trim();

        const laneId = getItemLaneId(item);
        const lane = laneId ? lanesById.get(laneId) : null;
        const laneLabel = lane ? lane.name || lane.id : "";
        const laneIcon = lane ? lane.icon || "" : "";
        const laneColor = lane ? lane.color || "" : "";

        const isRange = !!(
          item &&
          item.start &&
          item.end &&
          String(item.start).trim() !== String(item.end).trim()
        );

        const row = document.createElement(entry ? "button" : "div");
        if (entry) row.type = "button";

        row.className = "timeline-item";
        if (entry) row.classList.add("is-clickable");
        if (type) row.dataset.type = type;

        if (laneColor) row.style.setProperty("--tl-color", laneColor);

        row.innerHTML = `
          <div class="timeline-marker" aria-hidden="true" ${
            laneColor ? `style="background:${app.escapeHtml(laneColor)}"` : ""
          }></div>
          <div class="timeline-card">
            <div class="timeline-card-header">
              <div class="timeline-title">${app.escapeHtml(title)}</div>
              <div class="timeline-card-meta">
                ${range ? `<div class="timeline-range">${app.escapeHtml(range)}</div>` : ""}
                ${
                  isRange
                    ? `<span class="timeline-badge timeline-badge-range" title="Zeitraum">⏳</span>`
                    : ""
                }
                ${type ? `<span class="timeline-badge timeline-badge-type">${app.escapeHtml(type)}</span>` : ""}
              </div>
            </div>

            ${
              showLaneLine && laneLabel
                ? `<div class="timeline-lane-line">🏷️ ${app.escapeHtml(
                    (laneIcon ? laneIcon + " " : "") + laneLabel
                  )}</div>`
                : ""
            }

            ${note ? `<div class="timeline-note">${app.escapeHtml(note)}</div>` : ""}

            ${
              entry
                ? `<div class="timeline-linkhint">↪ Öffnen: ${app.escapeHtml(entry.title || entry.id)}</div>`
                : item && item.entryId
                ? `<div class="timeline-linkhint is-missing">⚠ Verknüpftes Entry nicht gefunden: ${app.escapeHtml(
                    item.entryId
                  )}</div>`
                : ""
            }
          </div>
        `;

        if (entry) {
          row.addEventListener("click", () => callIfFn(app.navigateToEntry, entry.id));
        }

        host.appendChild(row);
      });
    });
  }

  function renderTimelineList(host, cfg, items, lanes, hasEra) {
    host.className = "timeline-root timeline-root--list";
    host.innerHTML = "";

    const toolbar = ensureTimelineToolbar();
    if (toolbar) toolbar.innerHTML = "";

    const lanesById = new Map((lanes || []).filter(Boolean).map((l) => [l.id, l]));
    const vis = ensureLaneVisibilityDefaults(lanes);

    const controls = document.createElement("div");
    controls.className = "timeline-controls timeline-controls--list";

    controls.style.display = "flex";
    controls.style.flexWrap = "wrap";
    controls.style.gap = "0.5rem";
    controls.style.alignItems = "center";
    controls.style.justifyContent = "space-between";

    const left = document.createElement("div");
    left.className = "timeline-controls-left";
    left.style.display = "flex";
    left.style.flexWrap = "wrap";
    left.style.gap = "0.4rem";
    left.style.alignItems = "center";

    const right = document.createElement("div");
    right.className = "timeline-controls-right";
    right.style.display = "flex";
    right.style.flexWrap = "wrap";
    right.style.gap = "0.4rem";
    right.style.alignItems = "center";

    const canAxis = !!hasEra;
    const isMobile = isNarrowViewport();

    if (!hasHeaderModeToggle() && !isMobile && canAxis) {
      right.appendChild(
        makeChip(
          "Liste",
          ui.timeline.mode === "list",
          () => {
            ui.timeline.mode = "list";
            renderTimeline();
          },
          "timeline-mode-chip"
        )
      );
      right.appendChild(
        makeChip(
          "Achse",
          ui.timeline.mode === "axis",
          () => {
            ui.timeline.mode = "axis";
            renderTimeline();
          },
          "timeline-mode-chip"
        )
      );
    }

    const legendLabel = document.createElement("span");
    legendLabel.className = "timeline-legend-label";
    legendLabel.textContent = "Filter:";
    legendLabel.style.opacity = "0.85";
    left.appendChild(legendLabel);

    lanes.forEach((lane) => {
      if (!lane || !lane.id) return;

      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "filter-chip timeline-lane-chip";
      if (vis[lane.id]) chip.classList.add("is-active");

      chip.style.display = "inline-flex";
      chip.style.alignItems = "center";
      chip.style.gap = "0.35rem";

      chip.innerHTML = `
        <span aria-hidden="true" style="display:inline-block;width:0.7rem;height:0.7rem;border-radius:999px;background:${app.escapeHtml(
          lane.color || "#999"
        )};"></span>
        <span>${app.escapeHtml((lane.icon ? lane.icon + " " : "") + (lane.name || lane.id))}</span>
      `;

      chip.addEventListener("click", () => {
        vis[lane.id] = !vis[lane.id];
        renderTimeline();
      });

      left.appendChild(chip);
    });

    const meta = getTimelineMetaFromAny(cfg);
    const startRaw = getTimelineStartLabel(meta, cfg);
    if (startRaw) {
      const startInfo = document.createElement("span");
      startInfo.className = "timeline-start-info";
      startInfo.textContent = `Start: ${startRaw}`;
      startInfo.style.opacity = "0.85";
      right.appendChild(startInfo);
    }

    controls.appendChild(left);
    controls.appendChild(right);

    if (toolbar) toolbar.appendChild(controls);
    else host.appendChild(controls);

    const visibleLaneIds = new Set(lanes.filter((l) => l && l.id && vis[l.id]).map((l) => l.id));
    const filtered = (items || []).filter((it) => visibleLaneIds.has(getItemLaneId(it)));

    const listWrap = document.createElement("div");
    host.appendChild(listWrap);

    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = "<p>Keine Events sichtbar. Aktiviere oben mindestens eine Spur.</p>";
      host.appendChild(empty);
      return;
    }

    renderTimelineListItems(listWrap, filtered, lanesById, {
      group: true,
      showLaneLine: true,
      compact: false,
    });
  }

  function renderTimelineCanvas(host, cfg, items, lanes) {
    host.className = "timeline-root timeline-root--axis";
    host.innerHTML = "";

    const toolbar = ensureTimelineToolbar();
    if (toolbar) toolbar.innerHTML = "";

    const controls = document.createElement("div");
    controls.className = "timeline-controls";

    controls.style.display = "flex";
    controls.style.flexWrap = "wrap";
    controls.style.gap = "0.5rem";
    controls.style.alignItems = "center";
    controls.style.justifyContent = "space-between";

    const left = document.createElement("div");
    left.className = "timeline-controls-left";
    left.style.display = "flex";
    left.style.flexWrap = "wrap";
    left.style.gap = "0.4rem";
    left.style.alignItems = "center";

    const right = document.createElement("div");
    right.className = "timeline-controls-right";
    right.style.display = "flex";
    right.style.gap = "0.4rem";
    right.style.flexWrap = "wrap";
    right.style.alignItems = "center";

    if (!hasHeaderModeToggle() && !isNarrowViewport()) {
      right.appendChild(
        makeChip(
          "Liste",
          ui.timeline.mode === "list",
          () => {
            ui.timeline.mode = "list";
            renderTimeline();
          },
          "timeline-mode-chip"
        )
      );
      right.appendChild(
        makeChip(
          "Achse",
          ui.timeline.mode === "axis",
          () => {
            ui.timeline.mode = "axis";
            renderTimeline();
          },
          "timeline-mode-chip"
        )
      );
    }

    const legendLabel = document.createElement("span");
    legendLabel.className = "timeline-legend-label";
    legendLabel.textContent = "Spuren:";
    legendLabel.style.opacity = "0.85";
    left.appendChild(legendLabel);

    const vis = ensureLaneVisibilityDefaults(lanes);

    lanes.forEach((lane) => {
      if (!lane || !lane.id) return;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-chip timeline-lane-chip";
      if (vis[lane.id]) btn.classList.add("is-active");

      btn.style.display = "inline-flex";
      btn.style.alignItems = "center";
      btn.style.gap = "0.35rem";

      btn.innerHTML = `
        <span aria-hidden="true" style="display:inline-block;width:0.7rem;height:0.7rem;border-radius:999px;background:${app.escapeHtml(
          lane.color || "#999"
        )};"></span>
        <span>${app.escapeHtml((lane.icon ? lane.icon + " " : "") + (lane.name || lane.id))}</span>
      `;

      btn.addEventListener("click", () => {
        vis[lane.id] = !vis[lane.id];
        renderTimeline();
      });

      left.appendChild(btn);
    });

    const zoom = typeof ui.timeline.zoom === "number" ? ui.timeline.zoom : 1;
    ui.timeline.zoom = zoom;

    const zoomOut = document.createElement("button");
    zoomOut.type = "button";
    zoomOut.className = "filter-chip";
    zoomOut.textContent = "−";
    zoomOut.title = "Zoom out";
    zoomOut.addEventListener("click", () => {
      ui.timeline.zoom = Math.max(0.5, Math.round((ui.timeline.zoom - 0.1) * 10) / 10);
      renderTimeline();
    });

    const zoomIn = document.createElement("button");
    zoomIn.type = "button";
    zoomIn.className = "filter-chip";
    zoomIn.textContent = "+";
    zoomIn.title = "Zoom in";
    zoomIn.addEventListener("click", () => {
      ui.timeline.zoom = Math.min(2.0, Math.round((ui.timeline.zoom + 0.1) * 10) / 10);
      renderTimeline();
    });

    const zoomReadout = document.createElement("span");
    zoomReadout.className = "timeline-zoom-readout";
    zoomReadout.textContent = `${Math.round(zoom * 100)}%`;
    zoomReadout.style.opacity = "0.85";
    zoomReadout.style.minWidth = "3.5rem";
    zoomReadout.style.textAlign = "center";

    const meta = getTimelineMetaFromAny(cfg);
    const startRaw = getTimelineStartLabel(meta, cfg);

    const startInfo = document.createElement("span");
    startInfo.className = "timeline-start-info";
    startInfo.textContent = startRaw ? `Start: ${startRaw}` : "";
    startInfo.style.opacity = "0.85";

    right.appendChild(startInfo);
    right.appendChild(zoomOut);
    right.appendChild(zoomReadout);
    right.appendChild(zoomIn);

    controls.appendChild(left);
    controls.appendChild(right);

    if (toolbar) toolbar.appendChild(controls);
    else host.appendChild(controls);

    // --- Build Canvas ---
    const scroll = document.createElement("div");
    scroll.className = "timeline-scroll";

    scroll.style.overflowX = "auto";
    scroll.style.overflowY = "hidden";
    scroll.style.borderRadius = "12px";
    scroll.style.border = "1px solid rgba(255,255,255,0.08)";
    scroll.style.marginTop = "0.75rem";

    const inner = document.createElement("div");
    inner.className = "timeline-inner";
    inner.style.position = "relative";

    const labelWidth = 220;
    const trackHeight = 26;
    const lanePaddingTop = 8;
    const lanePaddingBottom = 10;

    const visibleLaneIds = new Set(lanes.filter((l) => l && l.id && vis[l.id]).map((l) => l.id));

    const itemsForCanvas = (items || [])
      .map((it) => {
        if (!it) return null;
        const laneId = getItemLaneId(it);
        if (!visibleLaneIds.has(laneId)) return null;

        const era = getItemEraStartEnd(it);
        if (!era) return null;

        return { item: it, laneId, startVal: era.startVal, endVal: era.endVal };
      })
      .filter(Boolean);

    let min = typeof cfg._min === "number" && Number.isFinite(cfg._min) ? cfg._min : null;
    let max = typeof cfg._max === "number" && Number.isFinite(cfg._max) ? cfg._max : null;

    if (min == null || max == null) {
      if (itemsForCanvas.length) {
        min = itemsForCanvas.reduce((acc, ev) => Math.min(acc, ev.startVal), Number.POSITIVE_INFINITY);
        max = itemsForCanvas.reduce((acc, ev) => Math.max(acc, ev.endVal), Number.NEGATIVE_INFINITY);
      } else {
        min = 0;
        max = 0;
      }
    }

    if (min === max) {
      min = min - 25;
      max = max + 25;
    }

    const range = max - min;

    const basePx = computePxPerUnitForEra(range);
    const pxPerUnit = basePx * (typeof ui.timeline.zoom === "number" ? ui.timeline.zoom : 1);

    // ✅ Fix: keine doppelte Zusatzbreite
    const contentWidth = Math.max(900, Math.round(Math.abs(range) * pxPerUnit + 40));
    const totalWidth = labelWidth + contentWidth;

    inner.style.width = totalWidth + "px";

    const axis = document.createElement("div");
    axis.className = "timeline-axis";
    axis.style.position = "relative";
    axis.style.height = "44px";
    axis.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
    inner.appendChild(axis);

    const axisLine = document.createElement("div");
    axisLine.className = "timeline-axis-line";
    axisLine.style.position = "absolute";
    axisLine.style.left = labelWidth + "px";
    axisLine.style.right = "10px";
    axisLine.style.top = "28px";
    axisLine.style.height = "2px";
    axisLine.style.background = "rgba(255,255,255,0.10)";
    axis.appendChild(axisLine);

    const step = chooseEraTickStep(range);
    const major = step * 2;

    const floorToStep = (v, st) => Math.floor(v / st) * st;
    const ceilToStep = (v, st) => Math.ceil(v / st) * st;

    const startTick = floorToStep(min, step);
    const endTick = ceilToStep(max, step);

    const xForVal = (val) => labelWidth + Math.round((val - min) * pxPerUnit);

    const addTick = (val, isMajor, labelOverride) => {
      const x = xForVal(val);

      const tick = document.createElement("div");
      tick.className = "timeline-tick";
      tick.style.position = "absolute";
      tick.style.left = x + "px";
      tick.style.top = "16px";
      tick.style.width = "1px";
      tick.style.height = isMajor ? "18px" : "12px";
      tick.style.background = "rgba(255,255,255,0.18)";
      axis.appendChild(tick);

      if (isMajor || labelOverride) {
        const lab = document.createElement("div");
        lab.className = "timeline-tick-label";
        lab.textContent = labelOverride || formatEraYear(val);
        lab.style.position = "absolute";
        lab.style.left = x + "px";
        lab.style.top = "0px";
        lab.style.transform = "translateX(-50%)";
        lab.style.fontSize = "0.8rem";
        lab.style.opacity = "0.85";
        axis.appendChild(lab);
      }

      if (isMajor) {
        const gl = document.createElement("div");
        gl.className = "timeline-grid-line";
        gl.style.position = "absolute";
        gl.style.left = x + "px";
        gl.style.top = "44px";
        gl.style.bottom = "0px";
        gl.style.width = "1px";
        gl.style.background = "rgba(255,255,255,0.06)";
        inner.appendChild(gl);
      }
    };

    for (let v = startTick; v <= endTick; v += step) {
      const isMajor = v % major === 0;
      addTick(v, isMajor, null);
    }

    if (min <= 0 && max >= 0) {
      const x0 = xForVal(0);
      const m0 = document.createElement("div");
      m0.className = "timeline-marker-gt0";
      m0.style.position = "absolute";
      m0.style.left = x0 + "px";
      m0.style.top = "0px";
      m0.style.bottom = "0px";
      m0.style.width = "2px";
      m0.style.background = "rgba(255,255,255,0.22)";
      inner.appendChild(m0);

      const lbl0 = document.createElement("div");
      lbl0.textContent = "Große Teilung (0 GT)";
      lbl0.className = "timeline-marker-gt0-label";
      lbl0.style.position = "absolute";
      lbl0.style.left = x0 + "px";
      lbl0.style.top = "46px";
      lbl0.style.transform = "translateX(-50%)";
      lbl0.style.fontSize = "0.8rem";
      lbl0.style.opacity = "0.85";
      inner.appendChild(lbl0);
    }

    let startVal = null;

    // ✅ Startposition robust (meta.start.position aus core, falls vorhanden)
    const startFromMeta =
      meta && meta.start && typeof meta.start === "object" && meta.start.position
        ? meta.start.position
        : null;

    const startPos =
      startFromMeta &&
      startFromMeta.kind === "era" &&
      typeof startFromMeta.value === "number" &&
      Number.isFinite(startFromMeta.value)
        ? startFromMeta.value
        : cfg && cfg._startPos && cfg._startPos.kind === "era" && typeof cfg._startPos.value === "number"
        ? cfg._startPos.value
        : startRaw
        ? parseEraValue(startRaw)
        : null;

    if (typeof startPos === "number" && Number.isFinite(startPos)) startVal = startPos;

    if (startVal != null && startVal >= min && startVal <= max) {
      const xs = xForVal(startVal);
      const ms = document.createElement("div");
      ms.className = "timeline-marker-start";
      ms.style.position = "absolute";
      ms.style.left = xs + "px";
      ms.style.top = "0px";
      ms.style.bottom = "0px";
      ms.style.width = "2px";
      ms.style.background = "rgba(34,197,94,0.35)";
      inner.appendChild(ms);

      const lstart = document.createElement("div");
      lstart.className = "timeline-marker-start-label";
      lstart.textContent = startRaw || "Start";
      lstart.style.position = "absolute";
      lstart.style.left = xs + "px";
      lstart.style.top = "6px";
      lstart.style.transform = "translateX(-50%)";
      lstart.style.fontSize = "0.78rem";
      lstart.style.opacity = "0.85";
      inner.appendChild(lstart);
    }

    const lanesWrap = document.createElement("div");
    lanesWrap.className = "timeline-lanes";
    inner.appendChild(lanesWrap);

    const byLane = new Map();
    itemsForCanvas.forEach((ev) => {
      const lid = ev.laneId || "world";
      if (!byLane.has(lid)) byLane.set(lid, []);
      byLane.get(lid).push(ev);
    });

    lanes
      .filter((l) => l && l.id && visibleLaneIds.has(l.id))
      .forEach((lane) => {
        const laneEventsRaw = byLane.get(lane.id) || [];
        const { events: laneEvents, trackCount } = assignTracksForLane(laneEventsRaw);

        const laneRow = document.createElement("div");
        laneRow.className = "timeline-lane-row";
        laneRow.style.position = "relative";

        const laneHeight = lanePaddingTop + lanePaddingBottom + trackCount * trackHeight;
        laneRow.style.height = laneHeight + "px";
        laneRow.style.borderBottom = "1px solid rgba(255,255,255,0.06)";

        const label = document.createElement("div");
        label.className = "timeline-lane-label";
        label.style.position = "absolute";
        label.style.left = "0px";
        label.style.top = "0px";
        label.style.bottom = "0px";
        label.style.width = "220px";
        label.style.padding = "10px 12px";
        label.style.display = "flex";
        label.style.alignItems = "flex-start";
        label.style.gap = "0.5rem";
        label.style.boxSizing = "border-box";
        label.style.opacity = "0.95";

        label.innerHTML = `
          <span aria-hidden="true" style="display:inline-block;width:0.8rem;height:0.8rem;border-radius:999px;background:${app.escapeHtml(
            lane.color || "#999"
          )};margin-top:0.25rem;"></span>
          <div>
            <div style="font-weight:700;line-height:1.1">${app.escapeHtml(
              (lane.icon ? lane.icon + " " : "") + (lane.name || lane.id)
            )}</div>
            <div style="opacity:.75;font-size:.85rem;line-height:1.2">${app.escapeHtml(lane.id)}</div>
          </div>
        `;

        laneRow.appendChild(label);

        const area = document.createElement("div");
        area.className = "timeline-lane-area";
        area.style.position = "absolute";
        area.style.left = "220px";
        area.style.right = "0px";
        area.style.top = "0px";
        area.style.bottom = "0px";
        area.style.boxSizing = "border-box";

        laneRow.appendChild(area);

        laneEvents.forEach((ev) => {
          const it = ev.item;
          const entry = typeof app.resolveTimelineEntry === "function" ? app.resolveTimelineEntry(it) : null;

          const title = (it && it.title ? String(it.title) : "").trim() || "Event";
          const note = (it && it.note ? String(it.note) : "").trim();
          const rangeLabel = formatTimelineRange(it);

          const leftPx = Math.round((ev.startVal - min) * pxPerUnit);
          const rawW = Math.round((ev.endVal - ev.startVal) * pxPerUnit);
          const widthPx = Math.max(10, rawW || 10);

          const topPx = lanePaddingTop + (ev._track || 0) * trackHeight;

          const bar = document.createElement(entry ? "button" : "div");
          if (entry) bar.type = "button";
          bar.className = "timeline-bar";
          if (entry) bar.classList.add("is-clickable");
          if (it && it.type) bar.dataset.type = String(it.type);

          const bg = lane.color || "rgba(255,255,255,0.15)";
          const fg = pickTextColor(bg);

          bar.style.position = "absolute";
          bar.style.left = leftPx + "px";
          bar.style.top = topPx + "px";
          bar.style.height = "20px";
          bar.style.width = widthPx + "px";
          bar.style.borderRadius = "10px";
          bar.style.background = bg;
          bar.style.border = "1px solid rgba(0,0,0,0.25)";
          bar.style.boxSizing = "border-box";
          bar.style.padding = "0 10px";
          bar.style.display = "flex";
          bar.style.alignItems = "center";
          bar.style.whiteSpace = "nowrap";
          bar.style.overflow = "hidden";
          bar.style.textOverflow = "ellipsis";
          bar.style.cursor = entry ? "pointer" : "default";
          bar.style.color = fg;

          bar.textContent = title;

          const tooltipParts = [];
          if (rangeLabel) tooltipParts.push(rangeLabel);
          tooltipParts.push(title);
          if (note) tooltipParts.push(note);
          if (entry) tooltipParts.push("↪ Öffnen: " + (entry.title || entry.id));
          bar.title = tooltipParts.join("\n");

          if (entry) {
            bar.addEventListener("click", () => callIfFn(app.navigateToEntry, entry.id));
          }

          area.appendChild(bar);
        });

        lanesWrap.appendChild(laneRow);
      });

    if (!lanesWrap.childNodes.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.style.padding = "1rem";
      empty.innerHTML = "<p>Keine Spuren aktiv. Aktiviere oben mindestens eine Spur.</p>";
      inner.appendChild(empty);
    }

    scroll.appendChild(inner);
    host.appendChild(scroll);

    const leftovers = (items || []).filter((it) => {
      if (!it) return true;
      return !getItemEraStartEnd(it);
    });

    if (leftovers.length) {
      const hint = document.createElement("div");
      hint.className = "timeline-leftovers";
      hint.style.marginTop = "0.75rem";
      hint.style.opacity = "0.9";

      hint.innerHTML = `
        <div style="font-weight:700;margin-bottom:0.25rem">Nicht auf der Achse darstellbar</div>
        <div style="opacity:.8;font-size:.9rem;margin-bottom:0.5rem">
          Diese Events haben keinen Start im Format „600 VGT / 0 GT / 12 NGT“ (oder nutzen eine andere Skala).
        </div>
      `;
      host.appendChild(hint);

      const lanesById = new Map((lanes || []).map((l) => [l.id, l]));
      const wrap = document.createElement("div");
      host.appendChild(wrap);
      renderTimelineListItems(wrap, leftovers, lanesById, {
        group: false,
        compact: true,
        showLaneLine: true,
      });
    }
  }

  function renderTimeline() {
    const dom = app.dom || {};
    if (!dom.timelineView) return;

    const host = ensureTimelineHost();
    if (!host) return;

    ensureTimelineModeDefault();
    bindTimelineHeaderModeToggleOnce();

    const cfg = state.timeline || app.timelineConfig || {};
    const items =
      typeof app.getTimelineItems === "function"
        ? app.getTimelineItems()
        : cfg && Array.isArray(cfg.items)
        ? cfg.items
        : [];

    const lanes = normalizeLanes(cfg, items);

    if (!items.length) {
      const toolbar = ensureTimelineToolbar();
      if (toolbar) toolbar.innerHTML = "";

      host.className = "timeline-root";
      host.innerHTML = "";
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML =
        "<p>Noch keine Timeline-Events vorhanden. Füge im Editor unter „Timeline“ Events hinzu.</p>";
      host.appendChild(empty);

      syncTimelineHeaderModeToggle(false);
      return;
    }

    const kind = cfg && cfg._scaleKind ? String(cfg._scaleKind) : "";
    const hasEra =
      kind === "era" ||
      items.some((it) => {
        const era = getItemEraStartEnd(it);
        return !!era;
      });

    syncTimelineHeaderModeToggle(hasEra);

    if (isNarrowViewport()) {
      ui.timeline.mode = "list";
      renderTimelineList(host, cfg, items, lanes, hasEra);
      return;
    }

    const mode = ui.timeline.mode === "axis" ? "axis" : "list";

    if (mode === "axis" && hasEra) {
      renderTimelineCanvas(host, cfg, items, lanes);
      return;
    }

    renderTimelineList(host, cfg, items, lanes, hasEra);
  }

  // ---------------------------------------
  // Sidebar Categories + Glossary Rendering
  // ---------------------------------------
  // (rest unverändert)
  function buildCategoryButton(cat, isActive) {
    const li = document.createElement("li");
    li.className = "category-item";
    li.dataset.categoryId = cat.id;
    if (isActive) li.classList.add("is-active");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-button";

    const iconSpan = document.createElement("span");
    iconSpan.className = "category-icon";
    iconSpan.textContent = cat.icon || "📁";

    const nameSpan = document.createElement("span");
    nameSpan.className = "category-name";
    nameSpan.textContent = cat.name || cat.id;

    button.appendChild(iconSpan);
    button.appendChild(nameSpan);

    button.addEventListener("click", () => callIfFn(app.navigateToCategory, cat.id));

    li.appendChild(button);
    return li;
  }

  function renderCategories() {
    const dom = app.dom || {};
    if (!dom.categoryList) return;

    dom.categoryList.innerHTML = "";

    const allCats = Array.isArray(app.allCategories) ? app.allCategories : [];
    const allCat =
      allCats.find((c) => c && c.id === "all") || { id: "all", name: "Alle Einträge", icon: "📚" };

    dom.categoryList.appendChild(buildCategoryButton(allCat, allCat.id === state.activeCategoryId));

    const groups = Array.isArray(app.categoryGroups) ? app.categoryGroups : [];
    const used = new Set();

    if (groups.length) {
      groups.forEach((g) => {
        const label = document.createElement("li");
        label.className = "category-group-label";
        label.innerHTML = `<div class="category-group-label-inner">${
          g.icon ? `<span aria-hidden="true">${app.escapeHtml(g.icon)}</span> ` : ""
        }<span>${app.escapeHtml(g.name || "Gruppe")}</span></div>`;
        dom.categoryList.appendChild(label);

        (g.categoryIds || []).forEach((id) => {
          const cat = callIfFn(app.getCategoryById, id);
          if (!cat || cat.id === "all") return;
          used.add(cat.id);
          dom.categoryList.appendChild(buildCategoryButton(cat, cat.id === state.activeCategoryId));
        });
      });

      const remaining = allCats.filter((c) => c && c.id !== "all" && !used.has(c.id));
      if (remaining.length) {
        const label = document.createElement("li");
        label.className = "category-group-label";
        label.innerHTML = `<div class="category-group-label-inner"><span>Weitere</span></div>`;
        dom.categoryList.appendChild(label);

        remaining.forEach((cat) => {
          dom.categoryList.appendChild(buildCategoryButton(cat, cat.id === state.activeCategoryId));
        });
      }
      return;
    }

    allCats
      .filter((c) => c && c.id !== "all")
      .forEach((cat) => dom.categoryList.appendChild(buildCategoryButton(cat, cat.id === state.activeCategoryId)));
  }

  function renderTagFilter() {
    const dom = app.dom || {};
    if (!dom.tagFilter) return;

    if (state.view !== "glossary") {
      dom.tagFilter.innerHTML = "";
      return;
    }

    dom.tagFilter.innerHTML = "";

    const isAllCategory = state.activeCategoryId === "all";
    const tags =
      typeof app.getAvailableTagsForActiveCategory === "function"
        ? app.getAvailableTagsForActiveCategory()
        : [];

    if (isAllCategory) {
      if (state.activeTag && tags.length && !tags.includes(state.activeTag)) state.activeTag = null;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tag-filter-toggle";
      btn.innerHTML = `<span>Tag-Filter öffnen</span><span aria-hidden="true">🔍</span>`;
      btn.addEventListener("click", () => callIfFn(app.openTagOverlay));
      dom.tagFilter.appendChild(btn);

      if (state.activeTag) {
        const info = document.createElement("span");
        info.className = "tag-filter-active-info";
        info.textContent = `Aktiver Tag: „${state.activeTag}“`;
        dom.tagFilter.appendChild(info);
      }
      return;
    }

    if (!tags.length) {
      state.activeTag = null;
      return;
    }

    if (state.activeTag && !tags.includes(state.activeTag)) state.activeTag = null;

    const allChip = document.createElement("button");
    allChip.type = "button";
    allChip.className = "filter-chip";
    if (!state.activeTag) allChip.classList.add("is-active");
    allChip.textContent = "Alle";
    allChip.addEventListener("click", () => {
      state.activeTag = null;
      renderAll();
    });
    dom.tagFilter.appendChild(allChip);

    tags.forEach((tag) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "filter-chip";
      chip.textContent = tag;
      if (state.activeTag === tag) chip.classList.add("is-active");

      chip.addEventListener("click", () => {
        state.activeTag = state.activeTag === tag ? null : tag;
        renderAll();
      });
      dom.tagFilter.appendChild(chip);
    });
  }

  function renderToolbarMeta() {
    const dom = app.dom || {};
    if (!dom.toolbarMeta) return;

    if (state.view !== "glossary") {
      dom.toolbarMeta.textContent = "";
      return;
    }

    const filtered = callIfFn(app.getFilteredEntries) || [];
    const inCategory = callIfFn(app.getEntriesInActiveCategory) || [];

    const allCats = Array.isArray(app.allCategories) ? app.allCategories : [];
    const category = allCats.find((c) => c && c.id === state.activeCategoryId) || null;

    const visibleCount = filtered.length;
    const totalCount = inCategory.length;

    let text = `${visibleCount} / ${totalCount || 0} Einträge sichtbar`;
    if (category && category.id !== "all") text += ` in „${category.name}“`;
    if ((state.searchQuery || "").trim()) text += ` (Suche: „${(state.searchQuery || "").trim()}“)`;
    if (state.activeTag) text += ` (Tag: „${state.activeTag}“)`;
    if (state.onlyNew) text += state.onlyUnseenNew ? ` (Neu: ungesehen)` : ` (Neu: alle)`;

    const sortLabelMap = {
      "name-asc": "Name A–Z",
      "name-desc": "Name Z–A",
      "session-asc": "Session (aufsteigend)",
      "updated-desc": "Zuletzt aktualisiert (neu → alt)",
    };
    if (state.sortBy && state.sortBy !== "default") {
      const label = sortLabelMap[state.sortBy] || state.sortBy;
      text += ` – sortiert nach ${label}`;
    }

    dom.toolbarMeta.textContent = text;
  }

  function renderEntryList() {
    const dom = app.dom || {};
    if (!dom.entryList) return;

    if (state.view !== "glossary") {
      dom.entryList.innerHTML = "";
      return;
    }

    const filtered = callIfFn(app.getFilteredEntries) || [];
    dom.entryList.innerHTML = "";

    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = "<p>Keine Einträge gefunden. Passe Kategorie, Suche oder Tag-Filter an.</p>";
      dom.entryList.appendChild(empty);
      return;
    }

    const selected = filtered.find((e) => e && e.id === state.selectedEntryId) || filtered[0];
    state.selectedEntryId = selected ? selected.id : null;

    filtered.forEach((entry) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "entry-card";
      card.dataset.entryId = entry.id;

      if (entry.id === state.selectedEntryId) card.classList.add("is-selected");

      const category = callIfFn(app.getCategoryById, entry.categoryId);
      const entryIsNew = typeof app.isEntryNew === "function" ? app.isEntryNew(entry) : false;

      const tagsHtml = (entry.tags || []).map((tag) => `<span class="tag">${app.escapeHtml(tag)}</span>`).join("");

      card.innerHTML = `
        <div class="entry-card-header">
          <div>
            <h3 class="entry-card-title">
              ${app.escapeHtml(entry.title || "Ohne Titel")}
              ${entryIsNew ? '<span class="entry-card-badge entry-card-badge-new">Neu</span>' : ""}
            </h3>
            ${entry.summary ? `<p class="entry-card-summary">${app.escapeHtml(entry.summary)}</p>` : ""}
          </div>
          ${category ? `<span class="entry-card-category-pill">${app.escapeHtml(category.name)}</span>` : ""}
        </div>
        ${tagsHtml ? `<div class="entry-card-tags">${tagsHtml}</div>` : ""}
      `;

      card.addEventListener("click", () => {
        window.location.hash = `#entry-${entry.id}`;
      });

      dom.entryList.appendChild(card);
    });
  }

  function renderAll() {
    const dom = app.dom || {};

    // NEU: Header immer synchron halten
    renderHeader();

    renderCategories();
    renderTagFilter();
    renderEntryList();
    renderToolbarMeta();

    if (dom.sortSelect) dom.sortSelect.value = state.sortBy || "default";

    if (state.view === "dashboard") renderDashboard();
    if (state.view === "timeline") renderTimeline();

    // ✅ NEU: Bestiary render hook (klein halten!)
    if (state.view === "bestiary") {
      callIfFn(app.renderBestiary);
    }

    if (typeof app.isCategorySheetOpen === "function" && app.isCategorySheetOpen()) {
      renderCategorySheet();
    }
  }

  // Exports
  Object.assign(app, {
    // Header (NEU)
    renderHeader,
    computeHeaderSubtitle,

    renderCategorySheet,

    renderDashboard,
    renderTimeline,

    renderCategories,
    renderTagFilter,
    renderToolbarMeta,
    renderEntryList,
    renderAll,
  });
})();
