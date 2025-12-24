/* app.ui.js — vollständig angepasst
   Änderungen:
   1) Breakpoint-Konsistenz: isSmallScreen() nutzt matchMedia (<= 900px) wie render.js.
   2) Doppel-Render vermeiden: navigateToTimeline / navigateToBestiary rufen NICHT mehr renderAll()
      (setView rendert die jeweilige View bereits). Optional wird renderHeader() leichtgewichtig nachgezogen.
*/

(function () {
  const app = window.GlossaryApp;
  if (!app) return;

  const { state } = app;

  const BREAKPOINT_SMALL = 900;

  // -----------------------------
  // DOM Cache (Basis)
  // -----------------------------
  const dom = {
    app: document.querySelector(".app"),

    // Header (NEU)
    headerTitle: document.getElementById("header-title"),
    headerSubtitle: document.getElementById("header-subtitle"),

    // Sidebar / Listen
    sidebar: document.getElementById("sidebar"),
    sidebarBackdrop: document.getElementById("sidebar-backdrop"),
    categoryList: document.getElementById("category-list"),

    // Glossary
    glossaryView: document.getElementById("glossary-view"),
    entryList: document.getElementById("entry-list"),
    searchInput: document.getElementById("search-input"),
    sortSelect: document.getElementById("sort-select"),
    tagFilter: document.getElementById("tag-filter"),
    toolbarMeta: document.getElementById("toolbar-meta"),

    // Views
    dashboard: document.getElementById("dashboard"),
    timelineView: document.getElementById("timeline-view"),
    timelineList: document.getElementById("timeline-list"),

    // Bestiary (NEU)
    bestiaryView: document.getElementById("bestiary-view"),
    bestiaryBook: document.getElementById("bestiary-book"),
    bestiarySearch: document.getElementById("bestiary-search"),
    bestiaryMeta: document.getElementById("bestiary-meta"),
    bestiaryTocButton: document.getElementById("bestiary-toc-button"),
    bestiaryToc: document.getElementById("bestiary-toc"),
    bestiaryTocBackdrop: document.getElementById("bestiary-toc-backdrop"),
    bestiaryTocPanel: document.getElementById("bestiary-toc-panel"),
    bestiaryTocClose: document.getElementById("bestiary-toc-close"),
    bestiaryTocSearch: document.getElementById("bestiary-toc-search"),
    bestiaryTocList: document.getElementById("bestiary-toc-list"),

    // Dashboard
    dashboardProgressFill: document.getElementById("dashboard-progress-fill"),
    dashboardProgressLabel: document.getElementById("dashboard-progress-label"),
    dashboardNote: document.getElementById("dashboard-note"),

    dashboardQuestsSuccess: document.getElementById("dashboard-quests-success"),
    dashboardQuestsFailed: document.getElementById("dashboard-quests-failed"),

    dashboardLinkQuestsSuccess: document.getElementById("dashboard-link-quests-success"),
    dashboardLinkQuestsFailed: document.getElementById("dashboard-link-quests-failed"),

    dashboardNewUnseen: document.getElementById("dashboard-new-unseen"),
    dashboardNewTotal: document.getElementById("dashboard-new-total"),
    dashboardLinkNewUnseen: document.getElementById("dashboard-link-new-unseen"),
    dashboardLinkNewTotal: document.getElementById("dashboard-link-new-total"),
    dashboardLinkTimeline: document.getElementById("dashboard-link-timeline"),

    dashboardRecentList: document.getElementById("dashboard-recent-list"),
    dashboardQuickLinks: document.getElementById("dashboard-quick-links"),

    dashboardLatestCard: document.getElementById("dashboard-latest-card"),
    dashboardLatestList:
      document.getElementById("dashboard-latest-list") ||
      document.getElementById("dashboard-latest-links") ||
      null,

    // Menü / FAB
    menuFab: document.getElementById("menu-fab"),
    menuToggle: document.getElementById("menu-toggle"),
    navHome: document.getElementById("nav-home"),
    navCategories: document.getElementById("nav-categories"),
    navBestiary: document.getElementById("nav-bestiary"),
    navTimeline: document.getElementById("nav-timeline"),

    // Category Sheet (Mobile)
    categorySheet: document.getElementById("category-sheet"),
    categorySheetBackdrop: document.getElementById("category-sheet-backdrop"),
    categorySheetPanel: document.getElementById("category-sheet-panel"),
    categorySheetClose: document.getElementById("category-sheet-close"),
    categorySheetContent: document.getElementById("category-sheet-content"),

    // Detail Overlay
    detailOverlay: document.getElementById("detail-overlay"),
    detailBackdrop: document.getElementById("detail-backdrop"),
    detailPanel: document.getElementById("detail-panel"),
    detailBackButton: document.getElementById("detail-back-button"),
    detailContent: document.getElementById("detail-content"),

    // Tag Overlay
    tagOverlay: document.getElementById("tag-overlay"),
    tagOverlayBackdrop: document.getElementById("tag-overlay-backdrop"),
    tagOverlayPanel: document.getElementById("tag-overlay-panel"),
    tagOverlayClose: document.getElementById("tag-overlay-close"),
    tagOverlayChips: document.getElementById("tag-overlay-chips"),

    // Settings Overlay
    settingsToggle: document.getElementById("settings-toggle"),
    settingsOverlay: document.getElementById("settings-overlay"),
    settingsBackdrop: document.getElementById("settings-backdrop"),
    settingsPanel: document.getElementById("settings-panel"),
    settingsSave: document.getElementById("settings-save"),
    settingsCancel: document.getElementById("settings-cancel"),
    settingsThemeRadios: document.querySelectorAll('input[name="settings-theme"]'),
    settingsHandRadios: document.querySelectorAll('input[name="settings-hand"]'),

    // Settings (NEU)
    settingsOwnerNameInput: document.getElementById("settings-owner-name"),

    // Theme Picker
    themePicker: document.getElementById("theme-picker"),
    themeTabLight: document.getElementById("theme-tab-light"),
    themeTabDark: document.getElementById("theme-tab-dark"),
    themeKindLightRadio: document.getElementById("theme-kind-light"),
    themeKindDarkRadio: document.getElementById("theme-kind-dark"),
    themePageLight: document.getElementById("theme-page-light"),
    themePageDark: document.getElementById("theme-page-dark"),
  };

  // Zentral verfügbar machen (Render/Overlays greifen darauf zu)
  app.dom = dom;

  // -----------------------------
  // Helpers
  // -----------------------------
  const viewScroll = { dashboard: 0, glossary: 0, timeline: 0, bestiary: 0 };

  function normalizeView(v) {
    return v === "glossary"
      ? "glossary"
      : v === "timeline"
      ? "timeline"
      : v === "bestiary"
      ? "bestiary"
      : "dashboard";
  }

  function getCurrentView() {
    return normalizeView(state.view);
  }

  function callIfFn(fn, ...args) {
    if (typeof fn === "function") return fn(...args);
  }

  // ✅ Konsistent zu app.ui.render.js (<= 900px)
  function isSmallScreen() {
    try {
      return (
        window.matchMedia &&
        window.matchMedia(`(max-width: ${BREAKPOINT_SMALL}px)`).matches
      );
    } catch {
      return (window.innerWidth || 0) <= BREAKPOINT_SMALL;
    }
  }

  // -----------------------------
  // Timeline UI Defaults (Option A)
  // -----------------------------
  function ensureTimelineUiDefaults() {
    const ui = (app._ui = app._ui || {});
    ui.timeline = ui.timeline || {};

    if (!ui.timeline.laneVisibility || typeof ui.timeline.laneVisibility !== "object") {
      ui.timeline.laneVisibility = {};
    }
    if (typeof ui.timeline.zoom !== "number" || !Number.isFinite(ui.timeline.zoom)) {
      ui.timeline.zoom = 1;
    }

    // Option A: Story/List ist Default
    if (!ui.timeline.mode) ui.timeline.mode = "list";

    // Responsive Guard (mobile nie axis erzwingen)
    const small = isSmallScreen();
    if (small && ui.timeline.mode === "axis") {
      ui.timeline._restoreModeLarge = ui.timeline._restoreModeLarge || "axis";
      ui.timeline.mode = "list";
    } else if (!small && ui.timeline.mode === "list" && ui.timeline._restoreModeLarge === "axis") {
      ui.timeline.mode = "axis";
      ui.timeline._restoreModeLarge = null;
    }

    return ui.timeline;
  }

  function closeSettingsIfOpenFallback() {
    // bevorzugt: zentrale API aus app.ui.overlays.js
    if (typeof app.closeSettings === "function") return app.closeSettings();
    if (typeof app.closeSettingsOverlay === "function") return app.closeSettingsOverlay();

    // Fallback: nur wenn das Overlay existiert und sichtbar ist
    if (!dom.settingsOverlay) return;

    const isOpen =
      dom.settingsOverlay.classList.contains("open") ||
      dom.settingsOverlay.getAttribute("aria-hidden") === "false";

    if (!isOpen) return;

    dom.settingsOverlay.classList.remove("open");
    dom.settingsOverlay.setAttribute("aria-hidden", "true");
  }

  function closeEphemeralUi() {
    // Alle "Layer" schließen – robust (Overlays können in anderen Dateien definiert sein)
    setSidebarOpen(false);
    callIfFn(app.closeCategorySheet);
    setNavMenuOpen(false);
    callIfFn(app.closeTagOverlay);

    // Bestiary-TOC (neu, optional)
    callIfFn(app.closeBestiaryToc);

    closeSettingsIfOpenFallback();
  }

  // -----------------------------
  // Sidebar & Menü
  // -----------------------------
  function setSidebarOpen(open) {
    state.sidebarOpen = !!open;
    if (dom.app) dom.app.classList.toggle("sidebar-open", state.sidebarOpen);

    // Wenn Sidebar (Desktop) geöffnet wird → mobiles Sheet sicher schließen
    if (state.sidebarOpen) callIfFn(app.closeCategorySheet);
  }

  function toggleSidebar() {
    setSidebarOpen(!state.sidebarOpen);
  }

  function setNavMenuOpen(open) {
    state.navMenuOpen = !!open;

    if (dom.menuFab) dom.menuFab.classList.toggle("open", state.navMenuOpen);

    if (dom.menuToggle) {
      dom.menuToggle.classList.toggle("is-open", state.navMenuOpen);
      dom.menuToggle.setAttribute(
        "aria-label",
        state.navMenuOpen ? "Navigation schließen" : "Navigation öffnen"
      );
    }
  }

  function toggleNavMenu() {
    setNavMenuOpen(!state.navMenuOpen);
  }

  // -----------------------------
  // View Switching
  // -----------------------------
  function setView(view) {
    const next = normalizeView(view);
    const prev = getCurrentView();

    // Scroll merken
    viewScroll[prev] = window.scrollY || 0;

    state.view = next;

    // Sichtbarkeit
    if (dom.dashboard) dom.dashboard.hidden = next !== "dashboard";
    if (dom.glossaryView) dom.glossaryView.hidden = next !== "glossary";
    if (dom.timelineView) dom.timelineView.hidden = next !== "timeline";
    if (dom.bestiaryView) dom.bestiaryView.hidden = next !== "bestiary";

    // Klassen fürs Layout
    if (dom.app) {
      dom.app.classList.toggle("view-dashboard", next === "dashboard");
      dom.app.classList.toggle("view-glossary", next === "glossary");
      dom.app.classList.toggle("view-timeline", next === "timeline");
      dom.app.classList.toggle("view-bestiary", next === "bestiary");
    }

    // Layer schließen (macht Viewwechsel stabil)
    closeEphemeralUi();

    // Timeline Defaults (Option A) setzen, bevor gerendert wird
    if (next === "timeline") ensureTimelineUiDefaults();

    // Optional: view-spezifisches Rendern (kommt aus app.ui.render.js / bestiary renderer)
    if (next === "dashboard") callIfFn(app.renderDashboard);
    if (next === "timeline") callIfFn(app.renderTimeline);
    if (next === "bestiary") callIfFn(app.renderBestiary);

    // Scroll wiederherstellen
    const restore = viewScroll[next] || 0;
    window.scrollTo(0, restore);
  }

  // -----------------------------
  // Navigation Helper
  // -----------------------------
  function navigateToCategory(categoryId, options) {
    const id = categoryId || "all";
    const opts = options && typeof options === "object" ? options : {};

    setView("glossary");

    // Spezialfilter standardmäßig zurücksetzen
    if (!opts.preserveSpecialFilters) callIfFn(app.clearSpecialFilters);

    // Filter/State setzen
    state.activeCategoryId = id;
    state.searchQuery = "";
    state.activeTag = null;

    // selectedEntryId sinnvoll setzen
    const entries = Array.isArray(app.entries) ? app.entries : [];
    const isVisible = typeof app.isEntryVisible === "function" ? app.isEntryVisible : () => true;

    const inCat = entries.filter((e) => e && isVisible(e) && (id === "all" || e.categoryId === id));
    state.selectedEntryId = inCat.length ? inCat[0].id : null;

    // UI schließen
    setSidebarOpen(false);
    callIfFn(app.closeCategorySheet);

    // Render
    callIfFn(app.renderAll);

    if (!opts.keepScroll) window.scrollTo(0, 0);
  }

  function navigateToEntry(entryId) {
    if (!entryId) return;
    window.location.hash = `#entry-${entryId}`;
  }

  function navigateToNewList(mode) {
    const m = mode === "unseen" ? "unseen" : "all";

    // Spezialfilter clean setzen
    if (typeof app.setNewFilter === "function") {
      callIfFn(app.clearSpecialFilters);
      app.setNewFilter(m);
    } else {
      // Fallback (falls core ohne setNewFilter)
      state.onlyNew = true;
      state.onlyUnseenNew = m === "unseen";
    }

    // sinnvoll: neueste oben
    state.sortBy = "updated-desc";

    // "Neu" ist am logischsten in "Alle"
    navigateToCategory("all", { preserveSpecialFilters: true });
  }

  function navigateToTimeline(options) {
    const opts = options && typeof options === "object" ? options : {};
    // setView("timeline") rendert bereits renderTimeline() + setzt Defaults
    setView("timeline");
    // optional: Header schnell nachziehen (leichtgewichtig)
    callIfFn(app.renderHeader);
    if (!opts.keepScroll) window.scrollTo(0, 0);
  }

  function navigateToBestiary(options) {
    const opts = options && typeof options === "object" ? options : {};
    // setView("bestiary") rendert bereits renderBestiary()
    setView("bestiary");
    // optional: Header schnell nachziehen (leichtgewichtig)
    callIfFn(app.renderHeader);
    if (!opts.keepScroll) window.scrollTo(0, 0);
  }

  // -----------------------------
  // Dashboard Quick Actions
  // -----------------------------
  function bindDashboardQuickActionsOnce() {
    const bind = (el, fn) => {
      if (!el || !fn) return;
      if (el.dataset.bound === "1") return;
      el.dataset.bound = "1";
      el.addEventListener("click", (ev) => {
        if (ev) ev.preventDefault();
        fn();
      });
    };

    bind(dom.dashboardLinkQuestsSuccess, () => navigateToCategory("quests-success"));
    bind(dom.dashboardLinkQuestsFailed, () => navigateToCategory("quests-failed"));

    bind(dom.dashboardLinkNewUnseen, () => navigateToNewList("unseen"));
    bind(dom.dashboardLinkNewTotal, () => navigateToNewList("all"));

    // Timeline: Hash nutzen, damit Routing + Refresh sauber ist
    bind(dom.dashboardLinkTimeline, () => {
      window.location.hash = "#timeline";
    });
  }

  // -----------------------------
  // FAB Nav Buttons (nur neue Actions hier binden)
  // -----------------------------
  function bindFabNavOnce() {
    const bind = (el, fn) => {
      if (!el || !fn) return;
      if (el.dataset.bound === "1") return;
      el.dataset.bound = "1";
      el.addEventListener("click", (ev) => {
        if (ev) ev.preventDefault();
        fn();
      });
    };

    // Bestiarium (neu): Hash nutzen, damit app.main.js Routing der Single Source of Truth ist
    bind(dom.navBestiary, () => {
      window.location.hash = "#bestiary";
    });
  }

  // Direkt binden (robust, auch wenn app.main.js später die restlichen Buttons übernimmt)
  bindFabNavOnce();

  // -----------------------------
  // Resize: Timeline-Modus stabil halten
  // -----------------------------
  let _resizeT = null;
  window.addEventListener("resize", () => {
    if (_resizeT) window.clearTimeout(_resizeT);
    _resizeT = window.setTimeout(() => {
      _resizeT = null;

      if (getCurrentView() !== "timeline") return;

      const ui = (app._ui = app._ui || {});
      const before = ui.timeline && ui.timeline.mode ? ui.timeline.mode : null;

      ensureTimelineUiDefaults();

      const after = ui.timeline && ui.timeline.mode ? ui.timeline.mode : null;
      if (before !== after) {
        callIfFn(app.renderTimeline);
      }
    }, 120);
  });

  // -----------------------------
  // Export (Basis-API)
  // -----------------------------
  Object.assign(app, {
    dom,

    isSmallScreen,
    ensureTimelineUiDefaults,

    setSidebarOpen,
    toggleSidebar,

    setNavMenuOpen,
    toggleNavMenu,

    setView,

    navigateToCategory,
    navigateToEntry,
    navigateToNewList,
    navigateToTimeline,
    navigateToBestiary,

    bindDashboardQuickActionsOnce,
  });
})();
