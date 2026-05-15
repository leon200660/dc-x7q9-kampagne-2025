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

  function decodeRouteId(raw) {
    if (typeof app.decodeRouteToken === "function") {
      return app.decodeRouteToken(raw);
    }
    try {
      return decodeURIComponent(String(raw || ""));
    } catch {
      return String(raw || "");
    }
  }

  function parseHashQuery(raw) {
    const query = typeof raw === "string" ? raw.trim() : "";
    if (!query) return {};
    return query.split("&").reduce((acc, part) => {
      const chunk = String(part || "").trim();
      if (!chunk) return acc;
      const eqIndex = chunk.indexOf("=");
      const rawKey = eqIndex >= 0 ? chunk.slice(0, eqIndex) : chunk;
      const rawValue = eqIndex >= 0 ? chunk.slice(eqIndex + 1) : "";
      const key = decodeRouteId(rawKey);
      if (!key) return acc;
      acc[key] = decodeRouteId(rawValue);
      return acc;
    }, {});
  }

  function getRouteFromHash() {
    const hash = window.location.hash || "";
    const cleanHash = hash.startsWith("#") ? hash.slice(1) : hash;
    const qIndex = cleanHash.indexOf("?");
    const routePart = qIndex >= 0 ? cleanHash.slice(0, qIndex) : cleanHash;
    const queryPart = qIndex >= 0 ? cleanHash.slice(qIndex + 1) : "";
    const routeHash = routePart ? "#" + routePart : "";
    const params = parseHashQuery(queryPart);

    const m = routeHash.match(/^#entry-(.+)$/);
    if (m) return { type: "entry", id: decodeRouteId(m[1]), params };

    const monster = routeHash.match(/^#monster-(.+)$/);
    if (monster) return { type: "monster", id: decodeRouteId(monster[1]), params };

    const craftingProfession = routeHash.match(/^#handwerk-(.+)$/);
    if (craftingProfession)
      return { type: "craftingProfession", id: decodeRouteId(craftingProfession[1]), params };

    if (routeHash === "#heldenakte")
      return { type: "heroes", heroId: decodeRouteId(params.hero || ""), params };
    if (routeHash === "#kampfprobe")
      return {
        type: "arena",
        heroId: decodeRouteId(params.hero || ""),
        monsterId: decodeRouteId(params.monster || ""),
        params,
      };
    if (routeHash === "#handwerk") return { type: "crafting", params };
    if (routeHash === "#timeline") return { type: "timeline", params };
    if (routeHash === "#bestiary") return { type: "bestiary", params };
    if (routeHash === "#glossary") return { type: "glossary", params };
    if (routeHash === "#dashboard") return { type: "dashboard", params };

    return { type: "none", params };
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

  function getActiveBestiaryHash() {
    const selectedId =
      state && state.bestiarySelectedMonsterId ? String(state.bestiarySelectedMonsterId).trim() : "";
    const uiActiveId =
      app && app._ui && app._ui.bestiary && app._ui.bestiary.activeId
        ? String(app._ui.bestiary.activeId).trim()
        : "";
    const monsterId = uiActiveId || selectedId;
    if (!monsterId) return "#bestiary";
    if (typeof app.getBestiaryMonsterRouteHash === "function") {
      return app.getBestiaryMonsterRouteHash(monsterId);
    }
    return `#monster-${encodeURIComponent(monsterId)}`;
  }

  function getActiveCraftingHash() {
    const activeProfessionId =
      app && app._ui && app._ui.crafting && app._ui.crafting.activeProfessionId
        ? String(app._ui.crafting.activeProfessionId).trim()
        : "";
    if (!activeProfessionId) return "#handwerk";
    const token =
      typeof app.encodeRouteToken === "function"
        ? app.encodeRouteToken(activeProfessionId)
        : encodeURIComponent(activeProfessionId);
    return token ? `#handwerk-${token}` : "#handwerk";
  }

  function desiredHashForView(view) {
    if (view === "timeline") return "#timeline";
    if (view === "heroes") {
      return typeof app.getHeroRecordHash === "function" && state.selectedHeroId
        ? app.getHeroRecordHash(state.selectedHeroId)
        : "#heldenakte";
    }
    if (view === "arena") {
      return typeof app.getArenaBattleHash === "function"
        ? app.getArenaBattleHash(
            state.arena && state.arena.selectedHeroId,
            state.arena && state.arena.selectedMonsterId
          )
        : "#kampfprobe";
    }
    if (view === "crafting") return getActiveCraftingHash();
    if (view === "bestiary") return getActiveBestiaryHash();
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

    // Route: Handwerk Übersicht
    // Route: Heldenakte
    if (route.type === "heroes") {
      currentDetailEntryId = null;
      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();

      closeAllPanels();
      clearSpecialFiltersIfAvailable();
      state.searchQuery = "";
      state.activeTag = null;

      const requestedHeroId = route.heroId ? String(route.heroId).trim() : "";
      if (requestedHeroId && typeof app.getHeroById === "function" && app.getHeroById(requestedHeroId)) {
        state.selectedHeroId = requestedHeroId;
      }

      app.setView("heroes");
      app.renderAll();
      return;
    }

    // Route: Kampfprobe
    if (route.type === "arena") {
      currentDetailEntryId = null;
      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();

      closeAllPanels();
      clearSpecialFiltersIfAvailable();
      state.searchQuery = "";
      state.activeTag = null;

      state.arena =
        state.arena && typeof state.arena === "object" ? state.arena : { battle: null, log: [] };

      const requestedHeroId = route.heroId ? String(route.heroId).trim() : "";
      const requestedMonsterId = route.monsterId ? String(route.monsterId).trim() : "";

      if (requestedHeroId && typeof app.getHeroById === "function" && app.getHeroById(requestedHeroId)) {
        state.selectedHeroId = requestedHeroId;
        state.arena.selectedHeroId = requestedHeroId;
      }

      if (
        requestedMonsterId &&
        typeof app.findBestiaryMonsterById === "function" &&
        app.findBestiaryMonsterById(requestedMonsterId)
      ) {
        state.bestiarySelectedMonsterId = requestedMonsterId;
        state.arena.selectedMonsterId = requestedMonsterId;
      }

      app.setView("arena");
      app.renderAll();
      return;
    }

    if (route.type === "crafting") {
      currentDetailEntryId = null;
      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();

      closeAllPanels();
      clearSpecialFiltersIfAvailable();
      state.searchQuery = "";
      state.activeTag = null;

      if (app._ui) {
        app._ui.crafting = app._ui.crafting || {};
        app._ui.crafting.activeProfessionId = "";
      }

      app.setView("crafting");
      app.renderAll();
      return;
    }

    // Route: einzelner Handwerksberuf
    if (route.type === "craftingProfession") {
      currentDetailEntryId = null;
      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();

      closeAllPanels();
      clearSpecialFiltersIfAvailable();
      state.searchQuery = "";
      state.activeTag = null;

      const requestedProfessionId = route.id ? String(route.id).trim() : "";
      if (app._ui) {
        app._ui.crafting = app._ui.crafting || {};
        app._ui.crafting.activeProfessionId = requestedProfessionId;
      }

      app.setView("crafting");
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

    // Route: einzelnes Monster im Bestiarium
    if (route.type === "monster") {
      currentDetailEntryId = null;
      if (typeof app.hideDetailOverlay === "function") app.hideDetailOverlay();

      closeAllPanels();

      clearSpecialFiltersIfAvailable();
      state.searchQuery = "";
      state.activeTag = null;

      const requestedMonsterId = route.id ? String(route.id).trim() : "";
      const activeMonsterId = requestedMonsterId
        ? typeof app.setBestiarySelectedMonsterId === "function"
          ? app.setBestiarySelectedMonsterId(requestedMonsterId)
          : requestedMonsterId
        : "";

      if (activeMonsterId) {
        if (typeof app.focusBestiaryMonster === "function") {
          app.focusBestiaryMonster(activeMonsterId, { scroll: false });
        } else {
          const ui = (app._ui = app._ui || {});
          ui.bestiary = ui.bestiary || {};
          ui.bestiary.activeId = activeMonsterId;
        }
      }

      app.setView("bestiary");
      app.renderAll();

      if (activeMonsterId && typeof app.focusBestiaryMonster === "function") {
        try {
          app.focusBestiaryMonster(activeMonsterId, { scroll: true });
        } catch {}
      }
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
          : state.view === "crafting"
          ? "crafting"
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
      if (typeof app.markEntryViewed === "function") app.markEntryViewed(entry);
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

    const navHeroes = (dom && dom.navHeroes) || document.getElementById("nav-heroes") || null;
    if (navHeroes) {
      navHeroes.addEventListener("pointerdown", (ev) => ev && ev.stopPropagation());
    }

    const navCrafting = (dom && dom.navCrafting) || document.getElementById("nav-crafting") || null;
    if (navCrafting) {
      navCrafting.addEventListener("pointerdown", (ev) => ev && ev.stopPropagation());
    }

    const navArena = (dom && dom.navArena) || document.getElementById("nav-arena") || null;
    if (navArena) {
      navArena.addEventListener("pointerdown", (ev) => ev && ev.stopPropagation());
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
    } else if (route.type === "heroes") {
      app.setView("heroes");
    } else if (route.type === "arena") {
      app.setView("arena");
    } else if (route.type === "crafting" || route.type === "craftingProfession") {
      app.setView("crafting");
    } else if (route.type === "bestiary" || route.type === "monster") {
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
