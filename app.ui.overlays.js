(function () {
  const app = window.GlossaryApp;
  if (!app) return;

  const { state } = app;

  const callIfFn = (fn, ...args) => (typeof fn === "function" ? fn(...args) : undefined);

  // ------------------------------------------------------------
  // Helpers: "bind once" (verhindert Doppel-Bindings)
  // ------------------------------------------------------------
  const BOUND = "__glossaryBound__";
  function bindOnce(el, type, handler, options) {
    if (!el || typeof handler !== "function") return;
    el[BOUND] = el[BOUND] || {};
    const key = `${type}:${handler.name || "anon"}`;
    if (el[BOUND][key]) return;
    el.addEventListener(type, handler, options);
    el[BOUND][key] = true;
  }

  // ------------------------------------------------------------
  // Owner Name (NEU): Storage + Settings-Input
  // ------------------------------------------------------------
  const OWNER_STORAGE_KEY = "dnd-glossar-owner-name";

  function normalizeOwnerName(v) {
    return typeof v === "string" ? v.trim() : "";
  }

  function getOwnerName() {
    if (typeof state.ownerName === "string" && state.ownerName.trim()) return state.ownerName.trim();
    try {
      const raw = window.localStorage.getItem(OWNER_STORAGE_KEY);
      return normalizeOwnerName(raw);
    } catch {
      return "";
    }
  }

  function setOwnerName(nextName, options) {
    const opts = options && typeof options === "object" ? options : {};
    const name = normalizeOwnerName(nextName);

    state.ownerName = name;

    try {
      if (!name) window.localStorage.removeItem(OWNER_STORAGE_KEY);
      else window.localStorage.setItem(OWNER_STORAGE_KEY, name);
    } catch {}

    // Header direkt updaten, wenn vorhanden
    if (!opts.skipRender) {
      callIfFn(app.renderHeader);
      // renderAll ist safe, aber optional
      callIfFn(app.renderAll);
    }
  }

  function ensureHeaderDomCache() {
    // Falls app.ui.js die Header-Elemente nicht cached, hier robust nachziehen
    const dom = (app.dom = app.dom || {});
    if (!dom.headerTitle) {
      dom.headerTitle =
        document.getElementById("header-title") ||
        document.querySelector(".app-header .header-title") ||
        document.querySelector(".app-header h1") ||
        null;
    }
    if (!dom.headerSubtitle) {
      dom.headerSubtitle =
        document.getElementById("header-subtitle") ||
        document.querySelector(".app-header .header-subtitle") ||
        document.querySelector(".app-header p") ||
        null;
    }
    return dom;
  }

  function findOwnerNameInput() {
    const dom = (app.dom = app.dom || {});
    if (dom.settingsOwnerNameInput) return dom.settingsOwnerNameInput;

    const el =
      document.getElementById("settings-owner-name") ||
      document.querySelector('input[name="settings-owner-name"]') ||
      document.querySelector('input[data-setting="owner-name"]') ||
      null;

    dom.settingsOwnerNameInput = el;
    return el;
  }

  function syncOwnerNameInputFromState() {
    const input = findOwnerNameInput();
    if (!input) return;
    const current = getOwnerName();
    if (input.value !== current) input.value = current;
  }

  // ------------------------------------------------------------
  // Category Sheet: Sichtbarkeit / Fokus / Timer
  // ------------------------------------------------------------
  let categorySheetHideTimer = null;
  let lastFocusBeforeCategorySheet = null;
  const CATEGORY_SHEET_HIDE_DELAY = 220;

  function isCategorySheetOpen() {
    const dom = app.dom || {};
    return !!(dom.categorySheet && dom.categorySheet.classList.contains("is-open"));
  }

  function openCategorySheet() {
    const dom = app.dom || {};
    if (!dom.categorySheet) return;

    if (categorySheetHideTimer) {
      clearTimeout(categorySheetHideTimer);
      categorySheetHideTimer = null;
    }
    dom.categorySheet.hidden = false;

    // andere Overlays schließen
    callIfFn(app.setSidebarOpen, false);
    callIfFn(app.setNavMenuOpen, false);
    callIfFn(app.closeSettings);
    callIfFn(app.closeTagOverlay);
    callIfFn(app.hideDetailOverlay);

    callIfFn(app.renderCategorySheet);

    lastFocusBeforeCategorySheet = document.activeElement;

    requestAnimationFrame(() => {
      if (!dom.categorySheet) return;
      dom.categorySheet.classList.add("is-open");
      dom.categorySheet.setAttribute("aria-hidden", "false");
      state.categorySheetOpen = true;

      if (dom.categorySheetPanel && typeof dom.categorySheetPanel.focus === "function") {
        try {
          dom.categorySheetPanel.focus({ preventScroll: true });
        } catch {
          try {
            dom.categorySheetPanel.focus();
          } catch {}
        }
      }
    });
  }

  function closeCategorySheet() {
    const dom = app.dom || {};
    if (!dom.categorySheet) return;

    dom.categorySheet.classList.remove("is-open");
    dom.categorySheet.setAttribute("aria-hidden", "true");
    state.categorySheetOpen = false;

    // Fokus zurück
    const prev = lastFocusBeforeCategorySheet;
    lastFocusBeforeCategorySheet = null;
    if (prev && typeof prev.focus === "function") {
      try {
        prev.focus({ preventScroll: true });
      } catch {
        try {
          prev.focus();
        } catch {}
      }
    }

    if (categorySheetHideTimer) clearTimeout(categorySheetHideTimer);
    categorySheetHideTimer = window.setTimeout(() => {
      if (!dom.categorySheet) return;
      if (!dom.categorySheet.classList.contains("is-open")) dom.categorySheet.hidden = true;
    }, CATEGORY_SHEET_HIDE_DELAY);
  }

  function toggleCategorySheet() {
    if (isCategorySheetOpen()) closeCategorySheet();
    else openCategorySheet();
  }

  function openCategoriesUI() {
    const small = typeof app.isSmallScreen === "function" ? app.isSmallScreen() : (window.innerWidth || 0) < 900;
    if (small) openCategorySheet();
    else callIfFn(app.setSidebarOpen, true);
  }

  function toggleCategoriesUI() {
    const small = typeof app.isSmallScreen === "function" ? app.isSmallScreen() : (window.innerWidth || 0) < 900;
    if (small) toggleCategorySheet();
    else callIfFn(app.toggleSidebar);
  }

  function bindCategorySheetOnce() {
    const dom = app.dom || {};
    if (!dom.categorySheet) return;

    bindOnce(dom.categorySheetBackdrop, "click", function onSheetBackdrop() {
      closeCategorySheet();
    });

    bindOnce(dom.categorySheetClose, "click", function onSheetClose() {
      closeCategorySheet();
    });

    bindOnce(dom.categorySheetPanel, "click", function onSheetPanel(ev) {
      ev.stopPropagation();
    });

    bindOnce(window, "resize", function onResizeCategorySheet() {
      const small = typeof app.isSmallScreen === "function" ? app.isSmallScreen() : (window.innerWidth || 0) < 900;
      if (!small && isCategorySheetOpen()) closeCategorySheet();
    });
  }
  bindCategorySheetOnce();

  // ------------------------------------------------------------
  // Settings / Theme Picker
  // ------------------------------------------------------------
  function getThemeKind(themeId) {
    if (typeof app.getThemeDefinition === "function") {
      const def = app.getThemeDefinition(themeId);
      if (def && (def.kind === "light" || def.kind === "dark")) return def.kind;
    }
    return themeId === "light" ? "light" : "dark";
  }

  function setThemeKind(kind) {
    const dom = app.dom || {};
    const k = kind === "light" ? "light" : "dark";
    const lightActive = k === "light";

    // neues Markup (Buttons)
    if (dom.themeTabLight && dom.themeTabDark) {
      dom.themeTabLight.classList.toggle("is-active", lightActive);
      dom.themeTabDark.classList.toggle("is-active", !lightActive);
      dom.themeTabLight.setAttribute("aria-selected", lightActive ? "true" : "false");
      dom.themeTabDark.setAttribute("aria-selected", !lightActive ? "true" : "false");
    }

    // altes Markup (Radios)
    if (dom.themeKindLightRadio && dom.themeKindDarkRadio) {
      dom.themeKindLightRadio.checked = lightActive;
      dom.themeKindDarkRadio.checked = !lightActive;
    }

    // pages
    if (dom.themePageLight) {
      dom.themePageLight.classList.toggle("is-active", lightActive);
      dom.themePageLight.hidden = !lightActive;
    }
    if (dom.themePageDark) {
      dom.themePageDark.classList.toggle("is-active", !lightActive);
      dom.themePageDark.hidden = lightActive;
    }
  }

  function syncThemeTilesActiveState() {
    const dom = app.dom || {};
    if (!dom.themePicker) return;

    const tiles = dom.themePicker.querySelectorAll(".theme-tile[data-theme]");
    tiles.forEach((tile) => {
      const id = tile.getAttribute("data-theme");
      tile.classList.toggle("is-active", id === state.theme);
    });
  }

  let themePickerBound = false;
  function bindThemePickerOnce() {
    if (themePickerBound) return;
    themePickerBound = true;

    const dom = app.dom || {};
    if (!dom.themePicker) return;

    if (dom.themeTabLight && dom.themeTabDark) {
      bindOnce(dom.themeTabLight, "click", function onThemeTabLight() {
        setThemeKind("light");
      });
      bindOnce(dom.themeTabDark, "click", function onThemeTabDark() {
        setThemeKind("dark");
      });
    }

    if (dom.themeKindLightRadio && dom.themeKindDarkRadio) {
      bindOnce(dom.themeKindLightRadio, "change", function onThemeRadioLight() {
        if (dom.themeKindLightRadio.checked) setThemeKind("light");
      });
      bindOnce(dom.themeKindDarkRadio, "change", function onThemeRadioDark() {
        if (dom.themeKindDarkRadio.checked) setThemeKind("dark");
      });
    }

    const radios = dom.themePicker.querySelectorAll('input[name="settings-theme"]');
    radios.forEach((r) => {
      bindOnce(r, "change", function onThemeValueChange() {
        if (r.checked) setThemeKind(getThemeKind(r.value));
        syncThemeTilesActiveState();
      });
    });

    setThemeKind(getThemeKind(state.theme));
    syncThemeTilesActiveState();
  }

  function isSettingsOpen() {
    const dom = app.dom || {};
    return !!(dom.settingsOverlay && dom.settingsOverlay.classList.contains("open"));
  }

  let lastFocusBeforeSettings = null;

  function openSettings() {
    const dom = app.dom || {};
    if (!dom.settingsOverlay) return;

    bindThemePickerOnce();

    // andere Overlays schließen
    callIfFn(app.setNavMenuOpen, false);
    callIfFn(app.setSidebarOpen, false);
    closeCategorySheet();
    closeTagOverlay();
    hideDetailOverlay();

    lastFocusBeforeSettings = document.activeElement;

    dom.settingsOverlay.classList.add("open");
    dom.settingsOverlay.setAttribute("aria-hidden", "false");

    // Radios syncen
    if (dom.settingsThemeRadios && dom.settingsThemeRadios.length) {
      dom.settingsThemeRadios.forEach((radio) => {
        radio.checked = radio.value === state.theme;
      });
    }

    setThemeKind(getThemeKind(state.theme));
    syncThemeTilesActiveState();

    if (dom.settingsHandRadios && dom.settingsHandRadios.length) {
      dom.settingsHandRadios.forEach((radio) => {
        radio.checked = radio.value === state.handedness;
      });
    }

    // NEU: Owner Name Input vorbefüllen
    syncOwnerNameInputFromState();

    if (dom.settingsPanel && typeof dom.settingsPanel.focus === "function") {
      try {
        dom.settingsPanel.focus({ preventScroll: true });
      } catch {
        try {
          dom.settingsPanel.focus();
        } catch {}
      }
    }
  }

  function closeSettings() {
    const dom = app.dom || {};
    if (!dom.settingsOverlay) return;

    dom.settingsOverlay.classList.remove("open");
    dom.settingsOverlay.setAttribute("aria-hidden", "true");

    const prev = lastFocusBeforeSettings;
    lastFocusBeforeSettings = null;
    if (prev && typeof prev.focus === "function") {
      try {
        prev.focus({ preventScroll: true });
      } catch {
        try {
          prev.focus();
        } catch {}
      }
    }
  }

  function saveSettingsFromForm() {
    const dom = app.dom || {};
    let selectedTheme = state.theme;
    let selectedHand = state.handedness;

    if (dom.settingsThemeRadios && dom.settingsThemeRadios.length) {
      dom.settingsThemeRadios.forEach((radio) => {
        if (radio.checked) selectedTheme = radio.value;
      });
    }

    if (dom.settingsHandRadios && dom.settingsHandRadios.length) {
      dom.settingsHandRadios.forEach((radio) => {
        if (radio.checked) selectedHand = radio.value;
      });
    }

    // NEU: Owner Name übernehmen
    const ownerInput = findOwnerNameInput();
    if (ownerInput) {
      setOwnerName(ownerInput.value, { skipRender: true }); // wir rendern gesammelt unten
    }

    callIfFn(app.applyTheme, selectedTheme);
    callIfFn(app.applyHandedness, selectedHand);

    syncThemeTilesActiveState();

    // Header-Cache ggf. nachziehen und danach aktualisieren
    ensureHeaderDomCache();
    callIfFn(app.renderHeader);
    callIfFn(app.renderAll);

    closeSettings();
  }

  function bindSettingsOverlayOnce() {
    const dom = app.dom || {};
    if (!dom.settingsOverlay) return;

    // Toggle / Open
    bindOnce(dom.settingsToggle, "click", function onSettingsToggle() {
      if (isSettingsOpen()) closeSettings();
      else openSettings();
    });

    // Backdrop / Cancel / Save
    bindOnce(dom.settingsBackdrop, "click", function onSettingsBackdrop() {
      closeSettings();
    });

    bindOnce(dom.settingsCancel, "click", function onSettingsCancel() {
      closeSettings();
    });

    bindOnce(dom.settingsSave, "click", function onSettingsSave() {
      saveSettingsFromForm();
    });

    // Klicks im Panel nicht "durchreichen"
    bindOnce(dom.settingsPanel, "click", function onSettingsPanel(ev) {
      ev.stopPropagation();
    });
  }
  bindSettingsOverlayOnce();

  // ------------------------------------------------------------
  // Tag Overlay
  // ------------------------------------------------------------
  function isTagOverlayOpen() {
    const dom = app.dom || {};
    return !!(dom.tagOverlay && dom.tagOverlay.classList.contains("is-open"));
  }

  let lastFocusBeforeTagOverlay = null;

  function openTagOverlay() {
    const dom = app.dom || {};
    if (!dom.tagOverlay || !dom.tagOverlayChips) return;

    // andere Overlays schließen
    callIfFn(app.setNavMenuOpen, false);
    closeSettings();
    closeCategorySheet();
    hideDetailOverlay();

    lastFocusBeforeTagOverlay = document.activeElement;

    const tags =
      typeof app.getAvailableTagsForActiveCategory === "function"
        ? app.getAvailableTagsForActiveCategory()
        : [];

    dom.tagOverlayChips.innerHTML = "";

    if (!tags.length) {
      const info = document.createElement("p");
      info.className = "tag-overlay-hint";
      info.textContent = "Aktuell sind keine Tags verfügbar.";
      dom.tagOverlayChips.appendChild(info);
    } else {
      const allChip = document.createElement("button");
      allChip.type = "button";
      allChip.className = "filter-chip";
      allChip.textContent = "Alle";
      if (!state.activeTag) allChip.classList.add("is-active");

      allChip.addEventListener("click", () => {
        state.activeTag = null;
        callIfFn(app.renderAll);
        closeTagOverlay();
      });
      dom.tagOverlayChips.appendChild(allChip);

      tags.forEach((tag) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "filter-chip";
        chip.textContent = tag;
        if (state.activeTag === tag) chip.classList.add("is-active");

        chip.addEventListener("click", () => {
          state.activeTag = state.activeTag === tag ? null : tag;
          callIfFn(app.renderAll);
          closeTagOverlay();
        });
        dom.tagOverlayChips.appendChild(chip);
      });
    }

    dom.tagOverlay.classList.add("is-open");
    dom.tagOverlay.setAttribute("aria-hidden", "false");

    if (dom.tagOverlayPanel && typeof dom.tagOverlayPanel.focus === "function") {
      try {
        dom.tagOverlayPanel.focus({ preventScroll: true });
      } catch {
        try {
          dom.tagOverlayPanel.focus();
        } catch {}
      }
    }
  }

  function closeTagOverlay() {
    const dom = app.dom || {};
    if (!dom.tagOverlay) return;

    dom.tagOverlay.classList.remove("is-open");
    dom.tagOverlay.setAttribute("aria-hidden", "true");

    const prev = lastFocusBeforeTagOverlay;
    lastFocusBeforeTagOverlay = null;
    if (prev && typeof prev.focus === "function") {
      try {
        prev.focus({ preventScroll: true });
      } catch {
        try {
          prev.focus();
        } catch {}
      }
    }
  }

  function bindTagOverlayOnce() {
    const dom = app.dom || {};
    if (!dom.tagOverlay) return;

    bindOnce(dom.tagOverlayBackdrop, "click", function onTagBackdrop() {
      closeTagOverlay();
    });

    bindOnce(dom.tagOverlayClose, "click", function onTagClose() {
      closeTagOverlay();
    });

    bindOnce(dom.tagOverlayPanel, "click", function onTagPanel(ev) {
      ev.stopPropagation();
    });
  }
  bindTagOverlayOnce();

  // ------------------------------------------------------------
  // Image Viewer (Lightbox)
  // ------------------------------------------------------------
  const imageViewer = {
    root: null,
    backdrop: null,
    panel: null,
    inner: null,
    img: null,
    closeBtn: null,
    zoomInBtn: null,
    zoomOutBtn: null,
    resetBtn: null,
    scale: 1,
    baseScale: 1,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    imgStartX: 0,
    imgStartY: 0,
    isPinching: false,
    pinchStartDistance: 0,
    pinchStartScale: 1,
    activePointers: {},
    historyPushed: false,
    _setScale: null,
    _popstateBound: false,
  };

  function ensureImageViewerDom() {
    if (imageViewer.root) return;

    const root = document.createElement("div");
    root.className = "image-viewer";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = `
      <div class="image-viewer-backdrop"></div>
      <div class="image-viewer-panel">
        <div class="image-viewer-toolbar">
          <button type="button" class="icon-button image-viewer-close" aria-label="Bild schließen">✕</button>
          <div class="image-viewer-toolbar-spacer"></div>
          <button type="button" class="icon-button image-viewer-zoom-out" aria-label="Herauszoomen">−</button>
          <button type="button" class="icon-button image-viewer-zoom-in" aria-label="Heranzoomen">+</button>
          <button type="button" class="icon-button image-viewer-reset" aria-label="Zoom zurücksetzen">⟳</button>
        </div>
        <div class="image-viewer-inner">
          <img class="image-viewer-image" src="" alt="" />
        </div>
      </div>
    `;
    document.body.appendChild(root);

    imageViewer.root = root;
    imageViewer.backdrop = root.querySelector(".image-viewer-backdrop");
    imageViewer.panel = root.querySelector(".image-viewer-panel");
    imageViewer.inner = root.querySelector(".image-viewer-inner");
    imageViewer.img = root.querySelector(".image-viewer-image");
    imageViewer.closeBtn = root.querySelector(".image-viewer-close");
    imageViewer.zoomInBtn = root.querySelector(".image-viewer-zoom-in");
    imageViewer.zoomOutBtn = root.querySelector(".image-viewer-zoom-out");
    imageViewer.resetBtn = root.querySelector(".image-viewer-reset");

    const updateTransform = () => {
      if (!imageViewer.img) return;
      imageViewer.img.style.transform = `translate(${imageViewer.translateX}px, ${imageViewer.translateY}px) scale(${imageViewer.scale})`;
    };

    const setScale = (next, options) => {
      const base = imageViewer.baseScale || 1;
      const minScale = Math.max(0.1, base * 0.5);
      const maxScale = 4;
      const clamped = Math.min(maxScale, Math.max(minScale, next));
      imageViewer.scale = clamped;

      if (options && options.resetTranslation) {
        imageViewer.translateX = 0;
        imageViewer.translateY = 0;
      }
      updateTransform();
    };

    const handleImageLoad = () => {
      if (!imageViewer.img || !imageViewer.inner) return;

      const vw = imageViewer.inner.clientWidth || window.innerWidth || 1;
      const vh = imageViewer.inner.clientHeight || window.innerHeight || 1;
      const iw = imageViewer.img.naturalWidth || 1;
      const ih = imageViewer.img.naturalHeight || 1;

      let fitScale = Math.min(vw / iw, vh / ih);
      if (!isFinite(fitScale) || fitScale <= 0) fitScale = 1;
      if (fitScale > 1) fitScale = 1;

      imageViewer.baseScale = fitScale;
      imageViewer.translateX = 0;
      imageViewer.translateY = 0;
      imageViewer.scale = fitScale;
      updateTransform();
    };

    const onClose = () => closeImageViewer();

    bindOnce(imageViewer.backdrop, "click", onClose);
    bindOnce(imageViewer.closeBtn, "click", onClose);

    bindOnce(imageViewer.zoomInBtn, "click", function onZoomIn() {
      setScale(imageViewer.scale + 0.25);
    });
    bindOnce(imageViewer.zoomOutBtn, "click", function onZoomOut() {
      setScale(imageViewer.scale - 0.25);
    });
    bindOnce(imageViewer.resetBtn, "click", function onReset() {
      setScale(imageViewer.baseScale || 1, { resetTranslation: true });
    });

    bindOnce(imageViewer.inner, "pointerdown", function onPointerDown(ev) {
      if (!imageViewer.img) return;
      ev.preventDefault();

      try {
        imageViewer.img.setPointerCapture(ev.pointerId);
      } catch {}

      imageViewer.activePointers[ev.pointerId] = { x: ev.clientX, y: ev.clientY };
      const ids = Object.keys(imageViewer.activePointers);

      if (ids.length === 2) {
        imageViewer.isPinching = true;
        imageViewer.isDragging = false;

        const p1 = imageViewer.activePointers[ids[0]];
        const p2 = imageViewer.activePointers[ids[1]];
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1;

        imageViewer.pinchStartDistance = dist;
        imageViewer.pinchStartScale = imageViewer.scale || imageViewer.baseScale || 1;
      } else if (ids.length === 1) {
        imageViewer.isDragging = true;
        imageViewer.isPinching = false;

        imageViewer.dragStartX = ev.clientX;
        imageViewer.dragStartY = ev.clientY;
        imageViewer.imgStartX = imageViewer.translateX;
        imageViewer.imgStartY = imageViewer.translateY;
      }
    });

    bindOnce(imageViewer.inner, "pointermove", function onPointerMove(ev) {
      if (!imageViewer.img) return;
      if (!imageViewer.isDragging && !imageViewer.isPinching) return;
      ev.preventDefault();

      if (imageViewer.activePointers[ev.pointerId]) {
        imageViewer.activePointers[ev.pointerId].x = ev.clientX;
        imageViewer.activePointers[ev.pointerId].y = ev.clientY;
      }

      if (imageViewer.isPinching) {
        const ids = Object.keys(imageViewer.activePointers);
        if (ids.length >= 2) {
          const p1 = imageViewer.activePointers[ids[0]];
          const p2 = imageViewer.activePointers[ids[1]];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1;

          if (imageViewer.pinchStartDistance > 0) {
            const factor = dist / imageViewer.pinchStartDistance;
            setScale(imageViewer.pinchStartScale * factor);
          }
        }
      } else {
        const dx = ev.clientX - imageViewer.dragStartX;
        const dy = ev.clientY - imageViewer.dragStartY;
        imageViewer.translateX = imageViewer.imgStartX + dx;
        imageViewer.translateY = imageViewer.imgStartY + dy;
        updateTransform();
      }
    });

    const endPointer = (ev) => {
      delete imageViewer.activePointers[ev.pointerId];
      try {
        if (imageViewer.img) imageViewer.img.releasePointerCapture(ev.pointerId);
      } catch {}

      const ids = Object.keys(imageViewer.activePointers);
      if (ids.length < 2) imageViewer.isPinching = false;
      if (ids.length === 0) imageViewer.isDragging = false;
    };

    bindOnce(imageViewer.inner, "pointerup", endPointer);
    bindOnce(imageViewer.inner, "pointercancel", endPointer);

    bindOnce(
      imageViewer.inner,
      "wheel",
      function onWheel(ev) {
        ev.preventDefault();
        const delta = ev.deltaY || 0;
        if (delta < 0) setScale(imageViewer.scale + 0.1);
        else if (delta > 0) setScale(imageViewer.scale - 0.1);
      },
      { passive: false }
    );

    imageViewer._setScale = setScale;
    if (imageViewer.img) bindOnce(imageViewer.img, "load", handleImageLoad);

    // Browser-Back soll Viewer schließen
    if (!imageViewer._popstateBound) {
      imageViewer._popstateBound = true;
      window.addEventListener("popstate", () => {
        if (isImageViewerOpen()) closeImageViewer({ fromHistory: true });
      });
    }
  }

  function openImageViewer(src, alt) {
    if (!src) return;
    ensureImageViewerDom();
    if (!imageViewer.root || !imageViewer.img) return;

    // andere Overlays schließen (Detail bleibt absichtlich offen)
    closeSettings();
    closeTagOverlay();
    closeCategorySheet();

    try {
      if (!imageViewer.historyPushed && window.history && window.history.pushState) {
        window.history.pushState({ imageViewer: true }, "");
        imageViewer.historyPushed = true;
      }
    } catch {}

    imageViewer.scale = 1;
    imageViewer.baseScale = 1;
    imageViewer.translateX = 0;
    imageViewer.translateY = 0;
    imageViewer.isDragging = false;
    imageViewer.isPinching = false;
    imageViewer.activePointers = {};

    imageViewer.root.classList.add("open");
    imageViewer.root.setAttribute("aria-hidden", "false");

    imageViewer.img.src = src;
    imageViewer.img.alt = alt || "";

    if (imageViewer._setScale) imageViewer._setScale(1, { resetTranslation: true });
  }

  function isImageViewerOpen() {
    return !!(imageViewer.root && imageViewer.root.classList.contains("open"));
  }

  function closeImageViewer(options) {
    const fromHistory = options && options.fromHistory;

    if (!imageViewer.root) return;
    imageViewer.root.classList.remove("open");
    imageViewer.root.setAttribute("aria-hidden", "true");
    imageViewer.isDragging = false;
    imageViewer.isPinching = false;
    imageViewer.activePointers = {};

    if (fromHistory) {
      imageViewer.historyPushed = false;
      return;
    }

    if (imageViewer.historyPushed && window.history && window.history.back) {
      imageViewer.historyPushed = false;
      try {
        window.history.back();
      } catch {}
    }
  }

  // ------------------------------------------------------------
  // Detail Overlay (Entry Detail) + Clicks
  // ------------------------------------------------------------
  function isDetailOverlayOpen() {
    const dom = app.dom || {};
    return !!(dom.detailOverlay && dom.detailOverlay.classList.contains("is-open"));
  }

  function buildEntryDetailHtml(entry, options = {}) {
    if (!entry) {
      return `
        <div class="placeholder">
          <h2>Keine Einträge</h2>
          <p>Füge in <code>data.js</code> neue Einträge hinzu, um sie hier zu sehen.</p>
        </div>
      `;
    }

    const { titleId } = options;

    const category = callIfFn(app.getCategoryById, entry.categoryId);
    const tagsHtml = (entry.tags || []).map((tag) => `<span class="tag">${app.escapeHtml(tag)}</span>`).join("");

    const meta = [];
    if (entry.session) meta.push(`<span class="meta-label">Session: <strong>${app.escapeHtml(entry.session)}</strong></span>`);
    if (entry.status) meta.push(`<span class="meta-label">Status: <strong>${app.escapeHtml(entry.status)}</strong></span>`);
    if (entry.region) meta.push(`<span class="meta-label">Region: <strong>${app.escapeHtml(entry.region)}</strong></span>`);
    if (entry.lastUpdated) meta.push(`<span class="meta-label">Stand: <strong>${app.escapeHtml(entry.lastUpdated)}</strong></span>`);

    const relatedEntries = typeof app.computeRelatedEntries === "function" ? app.computeRelatedEntries(entry) : [];

    const images = Array.isArray(entry.images) ? entry.images : [];
    let imagesHtml = "";
    if (images.length && typeof app.buildImageUrl === "function") {
      const imageCards = images
        .map((imgName) => {
          const src = app.buildImageUrl(imgName);
          if (!src) return "";
          const alt = `${entry.title || "Bild"} – ${imgName}`;
          return `
            <figure class="entry-detail-image-card">
              <img src="${app.escapeHtml(src)}" alt="${app.escapeHtml(alt)}" loading="lazy" />
              <figcaption>${app.escapeHtml(imgName)}</figcaption>
            </figure>
          `;
        })
        .filter(Boolean)
        .join("");

      if (imageCards) {
        imagesHtml = `
          <section class="entry-detail-images">
            <h3 class="entry-detail-images-title">Bilder</h3>
            <div class="entry-detail-images-grid">
              ${imageCards}
            </div>
          </section>
        `;
      }
    }

    const relatedHtml = relatedEntries
      .map((rel) => {
        const cat = callIfFn(app.getCategoryById, rel.categoryId);
        const catIcon = cat ? cat.icon || "📁" : "📁";
        return `<button type="button" class="related-link" data-entry-id="${app.escapeHtml(rel.id)}">
          <span aria-hidden="true">${app.escapeHtml(catIcon)}</span>
          <span>${app.escapeHtml(rel.title || "Ohne Titel")}</span>
        </button>`;
      })
      .join("");

    const titleIdAttr = titleId ? ` id="${app.escapeHtml(titleId)}"` : "";
    const newBadgeHtml =
      typeof app.isEntryNew === "function" && app.isEntryNew(entry)
        ? '<span class="entry-detail-badge entry-detail-badge-new">Neu</span>'
        : "";

    return `
      <header class="entry-detail-header">
        <div>
          <h2 class="entry-detail-title"${titleIdAttr}>
            ${app.escapeHtml(entry.title || "Ohne Titel")}
            ${newBadgeHtml}
          </h2>
          ${category ? `<p class="entry-detail-category">${app.escapeHtml(category.name)}</p>` : ""}
        </div>
      </header>
      ${meta.length ? `<div class="entry-detail-meta">${meta.join("")}</div>` : ""}
      ${tagsHtml ? `<div class="entry-detail-tags">${tagsHtml}</div>` : ""}
      <div class="entry-detail-body">${app.escapeHtml(entry.body || "")}</div>
      ${imagesHtml}
      ${
        relatedEntries.length
          ? `<section class="entry-detail-related">
              <h3 class="entry-detail-related-title">Siehe auch</h3>
              <div class="entry-detail-related-list">
                ${relatedHtml}
              </div>
            </section>`
          : ""
      }
    `;
  }

  function renderOverlayDetail(entry) {
    const dom = app.dom || {};
    if (!dom.detailContent) return;
    dom.detailContent.innerHTML = buildEntryDetailHtml(entry, { titleId: "detail-overlay-title" });
  }

  let lastFocusBeforeDetail = null;

  function showDetailOverlay(entry) {
    const dom = app.dom || {};
    if (!dom.detailOverlay) return;

    // andere Overlays schließen
    callIfFn(app.setNavMenuOpen, false);
    closeSettings();
    closeTagOverlay();
    closeCategorySheet();

    lastFocusBeforeDetail = document.activeElement;

    try {
      callIfFn(app.markEntryNewSeen, entry, { skipRender: true });
    } catch {}

    dom.detailOverlay.classList.add("is-open");
    dom.detailOverlay.setAttribute("aria-hidden", "false");
    renderOverlayDetail(entry);

    if (dom.detailPanel && typeof dom.detailPanel.focus === "function") {
      try {
        dom.detailPanel.focus({ preventScroll: true });
      } catch {
        try {
          dom.detailPanel.focus();
        } catch {}
      }
    }
  }

  function hideDetailOverlay() {
    const dom = app.dom || {};
    if (!dom.detailOverlay) return;

    dom.detailOverlay.classList.remove("is-open");
    dom.detailOverlay.setAttribute("aria-hidden", "true");

    const prev = lastFocusBeforeDetail;
    lastFocusBeforeDetail = null;
    if (prev && typeof prev.focus === "function") {
      try {
        prev.focus({ preventScroll: true });
      } catch {
        try {
          prev.focus();
        } catch {}
      }
    }
  }

  function onDetailContentClick(event) {
    const img = event.target.closest(".entry-detail-images img");
    if (img) {
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt") || "";
      openImageViewer(src, alt);
      return;
    }

    const btn = event.target.closest(".related-link");
    if (!btn) return;

    const entryId = btn.getAttribute("data-entry-id");
    if (!entryId) return;

    window.location.hash = `#entry-${entryId}`;
  }

  function bindDetailOverlayOnce() {
    const dom = app.dom || {};
    if (!dom.detailOverlay) return;

    bindOnce(dom.detailBackdrop, "click", function onDetailBackdrop() {
      hideDetailOverlay();
    });

    bindOnce(dom.detailBackButton, "click", function onDetailBack() {
      hideDetailOverlay();
    });

    bindOnce(dom.detailPanel, "click", function onDetailPanel(ev) {
      ev.stopPropagation();
    });

    bindOnce(dom.detailContent, "click", function onDetailContent(ev) {
      onDetailContentClick(ev);
    });
  }
  bindDetailOverlayOnce();

  // ------------------------------------------------------------
  // Dashboard Buttons (einmalig) — Export für render.js
  // ------------------------------------------------------------
  let dashboardQuickActionsBound = false;
  function bindDashboardQuickActionsOnce() {
    if (dashboardQuickActionsBound) return;
    dashboardQuickActionsBound = true;

    const dom = app.dom || {};

    if (dom.dashboardLinkQuestsSuccess) {
      bindOnce(dom.dashboardLinkQuestsSuccess, "click", function onDashQuestSuccess() {
        callIfFn(app.navigateToCategory, "quests-success");
      });
    }

    if (dom.dashboardLinkQuestsFailed) {
      bindOnce(dom.dashboardLinkQuestsFailed, "click", function onDashQuestFailed() {
        callIfFn(app.navigateToCategory, "quests-failed");
      });
    }

    if (dom.dashboardLinkNewUnseen) {
      bindOnce(dom.dashboardLinkNewUnseen, "click", function onDashNewUnseen() {
        callIfFn(app.navigateToNewList, "unseen");
      });
    }

    if (dom.dashboardLinkNewTotal) {
      bindOnce(dom.dashboardLinkNewTotal, "click", function onDashNewTotal() {
        callIfFn(app.navigateToNewList, "all");
      });
    }

    if (dom.dashboardLinkTimeline) {
      bindOnce(dom.dashboardLinkTimeline, "click", function onDashTimeline() {
        callIfFn(app.navigateToTimeline);
      });
    }
  }
  // direkt einmal ausführen (wie bisher), bleibt aber auch safe für spätere Calls
  bindDashboardQuickActionsOnce();

  // ------------------------------------------------------------
  // Global: ESC schließt Overlays in sinnvoller Reihenfolge
  // ------------------------------------------------------------
  bindOnce(window, "keydown", function onGlobalKeyDown(ev) {
    if (ev.key !== "Escape") return;

    if (isImageViewerOpen()) return closeImageViewer();
    if (isSettingsOpen()) return closeSettings();
    if (isTagOverlayOpen()) return closeTagOverlay();
    if (isCategorySheetOpen()) return closeCategorySheet();
    if (isDetailOverlayOpen()) return hideDetailOverlay();
  });

  // ------------------------------------------------------------
  // Exports
  // ------------------------------------------------------------
  Object.assign(app, {
    // Owner Name (NEU)
    getOwnerName,
    setOwnerName,

    // Category Sheet
    openCategorySheet,
    closeCategorySheet,
    toggleCategorySheet,
    isCategorySheetOpen,
    openCategoriesUI,
    toggleCategoriesUI,

    // Settings
    openSettings,
    closeSettings,
    saveSettingsFromForm,
    isSettingsOpen,

    // Tag Overlay
    openTagOverlay,
    closeTagOverlay,
    isTagOverlayOpen,

    // Image Viewer
    openImageViewer,
    closeImageViewer,
    isImageViewerOpen,

    // Detail Overlay
    buildEntryDetailHtml,
    renderOverlayDetail,
    showDetailOverlay,
    hideDetailOverlay,
    onDetailContentClick,
    isDetailOverlayOpen,

    // Dashboard
    bindDashboardQuickActionsOnce,
  });
})();
