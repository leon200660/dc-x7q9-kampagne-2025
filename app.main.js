(function () {
  const app = window.GlossaryApp;
  if (!app) return;

  const { state, dom } = app;

  const BREAKPOINT_SMALL = 900;

  // Merkt sich, aus welcher View ein Detail geöffnet wurde (für "Zurück" nach Overlay)
  let lastViewBeforeDetail = "dashboard";
  let currentDetailEntryId = null;

  function stopEvent(ev) {
    if (!ev) return;
    ev.preventDefault();
    ev.stopPropagation();
  }

  function isElOpen(el, className) {
    return !!(el && el.classList && el.classList.contains(className));
  }

  // Minimal "bind once" (für Main-Listener, um Doppelbindungen zu vermeiden)
  const BOUND = "__glossaryMainBound__";
  function bindOnce(el, type, handler, options) {
    if (!el || typeof handler !== "function") return;
    el[BOUND] = el[BOUND] || {};
    const key = `${type}:${handler.name || "anon"}:${options && options.capture ? "cap" : "bub"}`;
    if (el[BOUND][key]) return;
    el.addEventListener(type, handler, options);
    el[BOUND][key] = true;
  }

  function getRouteFromHash() {
    const hash = window.location.hash || "";

    const m = hash.match(/^#entry-(.+)$/);
    if (m) return { type: "entry", id: m[1] };

    if (hash === "#timeline") return { type: "timeline" };
    if (hash === "#bestiary") return { type: "bestiary" };
    if (hash === "#glossary") return { type: "glossary" };
    if (hash === "#dashboard") return { type: "dashboard" };

    return { type: "none" };
  }

  function closeNavMenuIfOpen() {
    if (state.navMenuOpen) app.setNavMenuOpen(false);
  }

  function closeCategorySheetIfOpen() {
    if (typeof app.isCategorySheetOpen === "function" && app.isCategorySheetOpen()) {
      if (typeof app.closeCategorySheet === "function") app.closeCategorySheet();
      return true;
    }
    return false;
  }

  function closeSidebarIfOpen() {
    if (state.sidebarOpen) {
      app.setSidebarOpen(false);
      return true;
    }
    return false;
  }

  function closeAllPanels(options) {
    const opts = options || {};
    const closeSheet = opts.categorySheet !== false;
    const closeSidebar = opts.sidebar !== false;
    const closeNav = opts.navMenu !== false;

    if (closeSheet) closeCategorySheetIfOpen();
    if (closeSidebar) closeSidebarIfOpen();
    if (closeNav) closeNavMenuIfOpen();

    // Bestiarium-TOC (neu, optional)
    if (typeof app.closeBestiaryToc === "function") {
      try {
        app.closeBestiaryToc();
      } catch {}
    }
  }

  function clearSpecialFiltersIfAvailable() {
    if (typeof app.clearSpecialFilters === "function") {
      app.clearSpecialFilters();
      return;
    }
    // Fallback (falls core nicht aktualisiert ist)
    state.onlyNew = false;
    state.onlyUnseenNew = false;
    state.activeTag = null;
  }

  function desiredHashForView(view) {
    if (view === "timeline") return "#timeline";
    if (view === "bestiary") return "#bestiary";
    if (view === "glossary") return "#glossary";
    // Dashboard: sauber ohne Hash
    return "";
  }

  function safeCloseDetailOverlay() {
    const hash = window.location.hash || "";

    // Wenn ein #entry-... Hash da ist: bevorzugt auf Ursprung-View zurück (Hash passend setzen)
    if (hash.startsWith("#entry-")) {
      // Overlay sofort schließen (UX), Routing macht den Rest
      if (typeof app.hideDetailOverlay === "function") {
        try {
          app.hideDetailOverlay();
        } catch {}
      }

      const target = desiredHashForView(lastViewBeforeDetail);

      // Hash setzen (triggert handleHashChange)
      if (target) {
        window.location.hash = target;
      } else {
        // Hash entfernen
        window.location.hash = "";
      }
      return;
    }

    // Fallback
    try {
      window.history.back();
    } catch {
      // ignore
    }
  }

  function handleHashChange() {
    const route = getRouteFromHash();

    // Route: Timeline
    if (route.type === "timeline") {
      currentDetailEntryId = null;
      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();

      closeAllPanels();

      // Timeline ist eine eigene View – Filter sind dort nicht sinnvoll
      clearSpecialFiltersIfAvailable();
      state.searchQuery = "";
      state.activeTag = null;

      app.setView("timeline");
      app.renderAll();
      return;
    }

    // Route: Bestiary (neu)
    if (route.type === "bestiary") {
      currentDetailEntryId = null;
      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();

      closeAllPanels();

      // Bestiarium ist eine eigene View – Glossar-Filter sind dort nicht sinnvoll
      clearSpecialFiltersIfAvailable();
      state.searchQuery = "";
      state.activeTag = null;

      app.setView("bestiary");
      app.renderAll();
      return;
    }

    // Route: Glossary (optional)
    if (route.type === "glossary") {
      currentDetailEntryId = null;
      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();

      closeAllPanels();

      app.setView("glossary");
      app.renderAll();
      return;
    }

    // Route: Dashboard (optional)
    if (route.type === "dashboard") {
      currentDetailEntryId = null;
      goHome();
      return;
    }

    // Kein Entry-Hash -> Detail schließen + ggf. View wiederherstellen
    if (route.type !== "entry") {
      const hadDetail = !!currentDetailEntryId;
      currentDetailEntryId = null;

      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();

      if (hadDetail) {
        // Zurück in die View, aus der das Detail geöffnet wurde
        if (lastViewBeforeDetail && state.view !== lastViewBeforeDetail) {
          app.setView(lastViewBeforeDetail);
        }
        closeAllPanels();
      }

      app.renderAll();
      return;
    }

    // Entry öffnen
    const id = route.id;
    if (!id) {
      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();
      return;
    }

    // Ursprung merken (nur beim "ersten" Öffnen)
    if (!currentDetailEntryId) {
      lastViewBeforeDetail =
        state.view === "timeline"
          ? "timeline"
          : state.view === "bestiary"
          ? "bestiary"
          : state.view === "dashboard"
          ? "dashboard"
          : "glossary";
    }
    currentDetailEntryId = id;

    const entry = typeof app.findEntryById === "function" ? app.findEntryById(id) : null;
    if (!entry) {
      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();
      return;
    }

    // Wenn wir NICHT aus Glossary kommen (z.B. Timeline/Dashboard/Bestiary), dann Filter zurücksetzen,
    // damit der Eintrag "sicher" in der Liste sichtbar ist.
    const openedFromGlossary = lastViewBeforeDetail === "glossary";
    if (!openedFromGlossary) {
      clearSpecialFiltersIfAvailable();
      state.searchQuery = "";
      state.activeTag = null;
    }

    // "Neu"-Spezialfilter: wenn aktiv, aber Entry passt nicht -> löschen
    if (state.onlyNew) {
      const fitsNewFilter = (function () {
        if (!entry.isNew) return false;
        if (!state.onlyUnseenNew) return true;
        if (typeof app.isEntryNew === "function") return app.isEntryNew(entry);
        return true;
      })();

      if (!fitsNewFilter) clearSpecialFiltersIfAvailable();
    }

    // Beim Öffnen: Glossary, Panels zu
    app.setView("glossary");
    closeAllPanels({ sidebar: true, categorySheet: true, navMenu: true });

    state.activeCategoryId = entry.categoryId || "all";
    state.selectedEntryId = entry.id;

    // "Neu" als gesehen markieren (damit Badge verschwindet), dann re-render
    try {
      if (typeof app.markEntryNewSeen === "function")
        app.markEntryNewSeen(entry, { skipRender: true });
    } catch {}

    app.renderAll();

    if (typeof app.showDetailOverlay === "function") app.showDetailOverlay(entry);
  }

  function onSearchChange(event) {
    state.searchQuery = (event && event.target && event.target.value) || "";
    app.renderAll();
  }

  function onSortChange(event) {
    state.sortBy = (event && event.target && event.target.value) || "default";
    app.renderAll();
  }

  // Click-outside für FAB-Menü (Pointerdown ist auf Mobile stabiler)
  function onDocumentPointerDown(ev) {
    if (!state.navMenuOpen) return;
    if (!dom.menuFab) return;

    const target = ev && ev.target;

    // Klick innerhalb des Menü-Clusters? dann nichts schließen
    if (target && dom.menuFab.contains(target)) return;

    // Wenn ein Overlay offen ist, lassen wir die Overlay-Logik entscheiden
    if (isElOpen(dom.settingsOverlay, "open")) return;
    if (isElOpen(dom.tagOverlay, "is-open")) return;
    if (isElOpen(dom.detailOverlay, "is-open")) return;

    // Bestiary-TOC: wenn offen, soll dessen Backdrop/Close handeln – nicht hier
    if (typeof app.isBestiaryTocOpen === "function" && app.isBestiaryTocOpen()) return;
    if (dom.bestiaryToc && (dom.bestiaryToc.getAttribute("aria-hidden") === "false" || dom.bestiaryToc.hidden === false))
      return;

    // Category-Sheet: wenn offen, soll dessen Backdrop closen – nicht hier
    if (typeof app.isCategorySheetOpen === "function" && app.isCategorySheetOpen()) return;

    app.setNavMenuOpen(false);
  }

  function goHome() {
    // Hash sauber schließen
    if (window.location.hash) window.location.hash = "";

    currentDetailEntryId = null;

    clearSpecialFiltersIfAvailable();
    state.searchQuery = "";
    state.activeTag = null;

    app.setView("dashboard");
    closeAllPanels();
    app.renderAll();
  }

  function hasCategorySheet() {
    return !!(app.dom && app.dom.categorySheet);
  }

  function isSmallScreen() {
    return (window.innerWidth || 0) < BREAKPOINT_SMALL;
  }

  function toggleCategories() {
    // Fix: Beim Öffnen des Kategorien-Menüs/Sheets NICHT automatisch auf "glossary" wechseln.
    app.setNavMenuOpen(false);

    const small = isSmallScreen();
    const sheetAvailable = hasCategorySheet();

    // Mobile: Bottom-Sheet bevorzugen
    if (small) {
      closeSidebarIfOpen();

      if (sheetAvailable && typeof app.toggleCategorySheet === "function") {
        app.toggleCategorySheet();
        return;
      }

      // Fallback: Sidebar (falls Sheet nicht existiert)
      app.setSidebarOpen(!state.sidebarOpen);
      return;
    }

    // Desktop: Sheet sicher schließen + Sidebar togglen
    closeCategorySheetIfOpen();
    app.setSidebarOpen(!state.sidebarOpen);
  }

  function initEvents() {
    if (dom.searchInput) dom.searchInput.addEventListener("input", onSearchChange);
    if (dom.sortSelect) dom.sortSelect.addEventListener("change", onSortChange);

    // Haupt-Button: öffnet/schließt das Nav-Menü
    if (dom.menuToggle) {
      dom.menuToggle.addEventListener("click", (ev) => {
        stopEvent(ev);

        // erst andere Layer schließen, dann FAB togglen
        closeCategorySheetIfOpen();
        closeSidebarIfOpen();

        app.toggleNavMenu();
      });

      dom.menuToggle.addEventListener("pointerdown", (ev) => {
        if (ev) ev.stopPropagation();
      });
    }

    // Nav-Buttons im Menü-Cluster
    if (dom.navHome) {
      dom.navHome.addEventListener("click", (ev) => {
        stopEvent(ev);
        goHome();
      });
      dom.navHome.addEventListener("pointerdown", (ev) => ev && ev.stopPropagation());
    }

    if (dom.navCategories) {
      dom.navCategories.addEventListener("click", (ev) => {
        stopEvent(ev);
        toggleCategories();
      });
      dom.navCategories.addEventListener("pointerdown", (ev) => ev && ev.stopPropagation());
    }

    // Timeline-Button
    const navTimeline = (dom && dom.navTimeline) || document.getElementById("nav-timeline") || null;
    if (navTimeline) {
      navTimeline.addEventListener("click", (ev) => {
        stopEvent(ev);
        closeAllPanels();
        window.location.hash = "#timeline";
      });
      navTimeline.addEventListener("pointerdown", (ev) => ev && ev.stopPropagation());
    }

    // Bestiary-Button:
    // nicht zwingend hier binden (app.ui.js bindet bereits), aber pointerdown stopPropagation ist hilfreich
    const navBestiary = (dom && dom.navBestiary) || document.getElementById("nav-bestiary") || null;
    if (navBestiary) {
      navBestiary.addEventListener("pointerdown", (ev) => ev && ev.stopPropagation());
    }

    // Settings-Button:
    // NICHT hier binden (macht app.ui.overlays.js inkl. Toggle).
    // Nur Pointerdown-StopPropagation ist optional – stört nicht, hilft aber gegen "weird" bubbling.
    const settingsToggle =
      (dom && dom.settingsToggle) || document.getElementById("settings-toggle") || null;
    if (settingsToggle) {
      settingsToggle.addEventListener("pointerdown", (ev) => ev && ev.stopPropagation());
    }

    // Dashboard Quick Actions:
    // Werden in app.ui.overlays.js gebunden (bindDashboardQuickActionsOnce).
    if (typeof app.bindDashboardQuickActionsOnce === "function") {
      try {
        app.bindDashboardQuickActionsOnce();
      } catch {}
    }

    // Sidebar Backdrop
    if (dom.sidebarBackdrop) {
      dom.sidebarBackdrop.addEventListener("click", () => {
        app.setSidebarOpen(false);
      });
    }

    // Detail overlay close muss Hash entfernen (Routing)
    // IMPORTANT: Capture-Listener, damit wir Overlays-Bindings überstimmen (ohne doppeltes Verhalten)
    if (dom.detailBackButton) {
      bindOnce(
        dom.detailBackButton,
        "click",
        function onDetailBackCapture(ev) {
          stopEvent(ev);
          safeCloseDetailOverlay();
        },
        { capture: true }
      );
    }
    if (dom.detailBackdrop) {
      bindOnce(
        dom.detailBackdrop,
        "click",
        function onDetailBackdropCapture(ev) {
          stopEvent(ev);
          safeCloseDetailOverlay();
        },
        { capture: true }
      );
    }

    // Resize behavior
    window.addEventListener("resize", () => {
      if ((window.innerWidth || 0) >= BREAKPOINT_SMALL) {
        app.setSidebarOpen(false);
        closeCategorySheetIfOpen();
      }
    });

    // Hash routing
    window.addEventListener("hashchange", handleHashChange);

    // Click-outside fürs FAB-Menü
    document.addEventListener("pointerdown", onDocumentPointerDown, { passive: true });
  }

  function init() {
    if (!dom.app) return;

    const initialTheme =
      typeof app.detectInitialTheme === "function" ? app.detectInitialTheme() : "light";
    if (typeof app.applyTheme === "function") app.applyTheme(initialTheme);

    const initialHandedness =
      typeof app.detectInitialHandedness === "function" ? app.detectInitialHandedness() : "right";
    if (typeof app.applyHandedness === "function") app.applyHandedness(initialHandedness);

    // NEU: Owner/Charaktername aus Storage laden (vor dem ersten Render!)
    try {
      if (typeof app.detectInitialOwnerName === "function" && typeof app.applyOwnerName === "function") {
        const initialOwnerName = app.detectInitialOwnerName();
        app.applyOwnerName(initialOwnerName, { skipRender: true });
      }
    } catch {
      // ignore
    }

    if (typeof app.loadNewSeenMap === "function") app.loadNewSeenMap();

    initEvents();

    // Start-View abhängig vom Hash
    const route = getRouteFromHash();
    if (route.type === "timeline") {
      app.setView("timeline");
    } else if (route.type === "bestiary") {
      app.setView("bestiary");
    } else if (route.type === "glossary" || route.type === "entry") {
      app.setView("glossary");
    } else {
      app.setView("dashboard");
    }

    app.renderAll();

    // Falls die Seite bereits mit #entry-... / #timeline etc. geladen wurde
    handleHashChange();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
