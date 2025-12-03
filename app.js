(function () {
  const categories = Array.isArray(window.categories)
    ? window.categories.slice()
    : [];
  const entries = Array.isArray(window.entries)
    ? window.entries.slice()
    : [];

  const THEME_STORAGE_KEY = "dnd-glossar-theme";
  const HAND_STORAGE_KEY = "dnd-glossar-handedness";
  const NEW_SEEN_STORAGE_KEY = "dnd-glossar-new-seen";

  const state = {
    activeCategoryId: "all",
    searchQuery: "",
    selectedEntryId: entries.length ? entries[0].id : null,
    sidebarOpen: false,
    theme: "dark",
    sortBy: "default", // Sortierung
    activeTag: null, // Tag-Filter
    handedness: "right", // Links-/Rechtshänder
    newSeenMap: {}, // id -> lastUpdated, für „Neu“ bereits gesehen
  };

  const dom = {
    app: document.querySelector(".app"),
    categoryList: document.getElementById("category-list"),
    entryList: document.getElementById("entry-list"),
    searchInput: document.getElementById("search-input"),
    toolbarMeta: document.getElementById("toolbar-meta"),

    menuToggle: document.getElementById("menu-toggle"),
    sidebarBackdrop: document.getElementById("sidebar-backdrop"),

    // Einstellungs-Overlay
    settingsToggle: document.getElementById("settings-toggle"),
    settingsOverlay: document.getElementById("settings-overlay"),
    settingsBackdrop: document.getElementById("settings-backdrop"),
    settingsPanel: document.getElementById("settings-panel"),
    settingsSave: document.getElementById("settings-save"),
    settingsCancel: document.getElementById("settings-cancel"),
    settingsThemeRadios: document.querySelectorAll(
      'input[name="settings-theme"]'
    ),
    settingsHandRadios: document.querySelectorAll(
      'input[name="settings-hand"]'
    ),

    // Filter & Detail-Overlay
    sortSelect: document.getElementById("sort-select"),
    tagFilter: document.getElementById("tag-filter"),
    detailOverlay: document.getElementById("detail-overlay"),
    detailBackdrop: document.getElementById("detail-backdrop"),
    detailPanel: document.getElementById("detail-panel"),
    detailBackButton: document.getElementById("detail-back-button"),
    detailContent: document.getElementById("detail-content"),
    // Tag-Overlay
    tagOverlay: document.getElementById("tag-overlay"),
    tagOverlayBackdrop: document.getElementById("tag-overlay-backdrop"),
    tagOverlayPanel: document.getElementById("tag-overlay-panel"),
    tagOverlayClose: document.getElementById("tag-overlay-close"),
    tagOverlayChips: document.getElementById("tag-overlay-chips"),
  };

  // einfacher Lightbox-Viewer für Bilder
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
  };

  const allCategories = [
    { id: "all", name: "Alle Einträge", icon: "📚" },
    ...categories,
  ];

  function getCategoryById(id) {
    if (!id) return null;
    return allCategories.find((c) => c.id === id) || null;
  }

  function isEntryVisible(entry) {
    // fehlendes visible -> sichtbar; visible === false -> versteckt
    return !!entry && entry.visible !== false;
  }

  function findEntryById(id) {
    if (!id) return null;
    const e = entries.find((entry) => entry.id === id) || null;
    return isEntryVisible(e) ? e : null;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Bild-URL aufbauen: Standard ist "images/<dateiname>", aber Pfade/URLs erlaubt
  function buildImageUrl(raw) {
    const value = String(raw || "").trim();
    if (!value) return "";
    // absolute oder data-URL
    if (/^(https?:)?\/\//.test(value) || value.startsWith("data:")) {
      return value;
    }
    // eigener Pfad im String
    if (value.includes("/")) {
      return value;
    }
    // nur Dateiname → Standard images-Ordner
    return "images/" + value;
  }

  // --- Theme & Handedness Handling ---

  function detectInitialTheme() {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        return stored;
      }
    } catch {
      // Ignorieren, wenn localStorage nicht verfügbar ist
    }

    if (window.matchMedia) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    }

    return "dark";
  }

  function detectInitialHandedness() {
    try {
      const stored = window.localStorage.getItem(HAND_STORAGE_KEY);
      if (stored === "left" || stored === "right") {
        return stored;
      }
    } catch {
      // Ignorieren, wenn localStorage nicht verfügbar ist
    }
    return "right"; // Standard: Rechtshänder
  }

  function applyTheme(theme) {
    state.theme = theme === "light" ? "light" : "dark";
    const root = document.documentElement;
    root.setAttribute("data-theme", state.theme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, state.theme);
    } catch {
      // Ignorieren, wenn localStorage nicht verfügbar ist
    }
  }

  function applyHandedness(hand) {
    const value = hand === "left" ? "left" : "right";
    state.handedness = value;

    if (!dom.app) return;

    dom.app.classList.toggle("hand-left", value === "left");
    dom.app.classList.toggle("hand-right", value === "right");

    try {
      window.localStorage.setItem(HAND_STORAGE_KEY, value);
    } catch {
      // Ignorieren, wenn localStorage nicht verfügbar ist
    }
  }

  // --- "Neu"-Status Handling ---

  function loadNewSeenMap() {
    try {
      const raw = window.localStorage.getItem(NEW_SEEN_STORAGE_KEY);
      if (!raw) {
        state.newSeenMap = {};
        return;
      }
      const obj = JSON.parse(raw);
      if (obj && typeof obj === "object") {
        state.newSeenMap = obj;
      } else {
        state.newSeenMap = {};
      }
    } catch {
      state.newSeenMap = {};
    }
  }

  function saveNewSeenMap() {
    try {
      window.localStorage.setItem(
        NEW_SEEN_STORAGE_KEY,
        JSON.stringify(state.newSeenMap || {})
      );
    } catch {
      // ignorieren
    }
  }

  // soll dieser Eintrag aktuell als "Neu" angezeigt werden?
  function isEntryNew(entry) {
    if (!entry || !entry.isNew) return false;
    const ref = entry.lastUpdated || "";
    const map = state.newSeenMap || {};
    const stored = map[entry.id];
    if (!stored) return true;
    // wenn lastUpdated sich geändert hat, wieder als "Neu" anzeigen
    return stored !== ref;
  }

  // beim Öffnen eines Eintrags auf "gesehen" setzen
  function markEntryNewSeen(entry, options) {
    if (!entry || !entry.isNew) return;
    const ref = entry.lastUpdated || "";
    if (!state.newSeenMap) state.newSeenMap = {};
    if (state.newSeenMap[entry.id] === ref) return;
    state.newSeenMap[entry.id] = ref;
    saveNewSeenMap();
    if (!options || !options.skipRender) {
      renderAll();
    }
  }

  // --- Einstellungs-Overlay ---

  function openSettings() {
    if (!dom.settingsOverlay) return;
    dom.settingsOverlay.classList.add("open");
    dom.settingsOverlay.setAttribute("aria-hidden", "false");

    // Theme-Radios mit aktuellem State vorbelegen
    if (dom.settingsThemeRadios && dom.settingsThemeRadios.length) {
      dom.settingsThemeRadios.forEach((radio) => {
        radio.checked = radio.value === state.theme;
      });
    }
    // Hand-Radios mit aktuellem State vorbelegen
    if (dom.settingsHandRadios && dom.settingsHandRadios.length) {
      dom.settingsHandRadios.forEach((radio) => {
        radio.checked = radio.value === state.handedness;
      });
    }
  }

  function closeSettings() {
    if (!dom.settingsOverlay) return;
    dom.settingsOverlay.classList.remove("open");
    dom.settingsOverlay.setAttribute("aria-hidden", "true");
  }

  function saveSettingsFromForm() {
    let selectedTheme = state.theme;
    let selectedHand = state.handedness;

    if (dom.settingsThemeRadios && dom.settingsThemeRadios.length) {
      dom.settingsThemeRadios.forEach((radio) => {
        if (radio.checked) {
          selectedTheme = radio.value;
        }
      });
    }

    if (dom.settingsHandRadios && dom.settingsHandRadios.length) {
      dom.settingsHandRadios.forEach((radio) => {
        if (radio.checked) {
          selectedHand = radio.value;
        }
      });
    }

    applyTheme(selectedTheme);
    applyHandedness(selectedHand);
    closeSettings();
  }

  // --- Hash / Detail-Overlay-Helfer ---

  function getEntryIdFromHash() {
    const hash = window.location.hash || "";
    const match = hash.match(/^#entry-(.+)$/);
    return match ? match[1] : null;
  }

  function showDetailOverlay(entry) {
    if (!dom.detailOverlay || !dom.detailContent) return;
    dom.detailOverlay.classList.add("is-open");
    dom.detailOverlay.setAttribute("aria-hidden", "false");
    renderOverlayDetail(entry);
  }

  function hideDetailOverlay() {
    if (!dom.detailOverlay) return;
    dom.detailOverlay.classList.remove("is-open");
    dom.detailOverlay.setAttribute("aria-hidden", "true");
  }

  function handleHashChange() {
    const id = getEntryIdFromHash();
    if (!id) {
      hideDetailOverlay();
      return;
    }

    const entry = findEntryById(id);
    if (!entry) {
      hideDetailOverlay();
      return;
    }

    // Kategorie & Auswahl anpassen
    state.activeCategoryId = entry.categoryId || "all";
    state.selectedEntryId = entry.id;

    // "Neu" beim Öffnen als gesehen markieren
    markEntryNewSeen(entry, { skipRender: true });
    renderAll();
    showDetailOverlay(entry);
  }

  // --- Tag-Overlay-Helfer ---

  function getEntriesInActiveCategory() {
    return entries.filter((entry) => {
      if (!isEntryVisible(entry)) return false;
      if (state.activeCategoryId === "all") return true;
      return entry.categoryId === state.activeCategoryId;
    });
  }

  function getAvailableTagsForActiveCategory() {
    const inCategory = getEntriesInActiveCategory();
    const tagSet = new Set();
    inCategory.forEach((entry) => {
      (entry.tags || []).forEach((tag) => {
        if (tag) tagSet.add(tag);
      });
    });
    return Array.from(tagSet).sort((a, b) =>
      a.localeCompare(b, "de", { sensitivity: "base" })
    );
  }

  function openTagOverlay() {
    if (!dom.tagOverlay || !dom.tagOverlayChips) return;

    const tags = getAvailableTagsForActiveCategory();
    dom.tagOverlayChips.innerHTML = "";

    if (!tags.length) {
      const info = document.createElement("p");
      info.className = "tag-overlay-hint";
      info.textContent = "Aktuell sind keine Tags verfügbar.";
      dom.tagOverlayChips.appendChild(info);
    } else {
      // "Alle"-Chip
      const allChip = document.createElement("button");
      allChip.type = "button";
      allChip.className = "filter-chip";
      allChip.textContent = "Alle";
      if (!state.activeTag) {
        allChip.classList.add("is-active");
      }
      allChip.addEventListener("click", () => {
        state.activeTag = null;
        renderAll();
        closeTagOverlay();
      });
      dom.tagOverlayChips.appendChild(allChip);

      // Tag-Chips
      tags.forEach((tag) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "filter-chip";
        chip.textContent = tag;
        if (state.activeTag === tag) {
          chip.classList.add("is-active");
        }
        chip.addEventListener("click", () => {
          state.activeTag = state.activeTag === tag ? null : tag;
          renderAll();
          closeTagOverlay();
        });
        dom.tagOverlayChips.appendChild(chip);
      });
    }

    dom.tagOverlay.classList.add("is-open");
    dom.tagOverlay.setAttribute("aria-hidden", "false");
  }

  function closeTagOverlay() {
    if (!dom.tagOverlay) return;
    dom.tagOverlay.classList.remove("is-open");
    dom.tagOverlay.setAttribute("aria-hidden", "true");
  }

  // --- State & Filtering / Sorting ---

  function onSearchChange(event) {
    state.searchQuery = event.target.value || "";
    renderAll();
  }

  function onSortChange(event) {
    state.sortBy = event.target.value || "default";
    renderAll();
  }

  function setSidebarOpen(open) {
    state.sidebarOpen = open;
    if (!dom.app) return;
    if (open) {
      dom.app.classList.add("sidebar-open");
    } else {
      dom.app.classList.remove("sidebar-open");
    }
  }

  function toggleSidebar() {
    setSidebarOpen(!state.sidebarOpen);
  }

  function getFilteredEntries() {
    const query = state.searchQuery.trim().toLowerCase();

    let filtered = getEntriesInActiveCategory().filter((entry) => {
      if (!query) return true;

      const parts = [
        entry.title,
        entry.summary,
        entry.body,
        entry.region,
        entry.session,
        entry.status,
        ...(entry.tags || []),
        ...(entry.images || []), // Bild-Dateinamen in die Suche einbeziehen
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return parts.includes(query);
    });

    // Tag-Filter anwenden
    if (state.activeTag) {
      filtered = filtered.filter((entry) =>
        (entry.tags || []).includes(state.activeTag)
      );
    }

    // Sortierung anwenden
    const collator =
      typeof Intl !== "undefined"
        ? new Intl.Collator("de", { sensitivity: "base" })
        : null;

    function compareTitles(a, b) {
      const aTitle = (a.title || "").toString();
      const bTitle = (b.title || "").toString();
      if (collator) {
        return collator.compare(aTitle, bTitle);
      }
      return aTitle.localeCompare(bTitle);
    }

    function parseSession(entry) {
      if (!entry.session) return Number.POSITIVE_INFINITY;
      const s = String(entry.session);
      const match = s.match(/\d+/);
      if (match) {
        const num = parseInt(match[0], 10);
        if (!Number.isNaN(num)) return num;
      }
      return Number.POSITIVE_INFINITY;
    }

    function parseLastUpdated(entry) {
      if (!entry.lastUpdated) return 0;
      const t = Date.parse(entry.lastUpdated);
      if (Number.isNaN(t)) return 0;
      return t;
    }

    switch (state.sortBy) {
      case "name-asc":
        filtered.sort((a, b) => compareTitles(a, b));
        break;
      case "name-desc":
        filtered.sort((a, b) => compareTitles(b, a));
        break;
      case "session-asc":
        filtered.sort((a, b) => {
          const aVal = parseSession(a);
          const bVal = parseSession(b);
          if (aVal !== bVal) return aVal - bVal;
          return compareTitles(a, b);
        });
        break;
      case "updated-desc":
        filtered.sort((a, b) => {
          const aVal = parseLastUpdated(a);
          const bVal = parseLastUpdated(b);
          if (aVal !== bVal) return bVal - aVal; // neu → alt
          return compareTitles(a, b);
        });
        break;
      case "default":
      default:
        // Original-Reihenfolge beibehalten
        break;
    }

    return filtered;
  }

  // --- Rendering: Kategorien, Filter, Meta ---

  function renderCategories() {
    if (!dom.categoryList) return;

    dom.categoryList.innerHTML = "";

    allCategories.forEach((cat) => {
      const li = document.createElement("li");
      li.className = "category-item";
      li.dataset.categoryId = cat.id;

      if (cat.id === state.activeCategoryId) {
        li.classList.add("is-active");
      }

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

      button.addEventListener("click", () => {
        state.activeCategoryId = cat.id;
        state.selectedEntryId = null;
        state.activeTag = null; // Tag-Filter zurücksetzen bei Kategorie-Wechsel
        closeTagOverlay();
        renderAll();
        if (window.innerWidth < 900) {
          setSidebarOpen(false);
        }
      });

      li.appendChild(button);
      dom.categoryList.appendChild(li);
    });
  }

  function renderTagFilter() {
    if (!dom.tagFilter) return;

    dom.tagFilter.innerHTML = "";

    const isAllCategory = state.activeCategoryId === "all";

    if (isAllCategory) {
      // Für "Alle": kein Chip-Spam → nur Button + Info
      const tags = getAvailableTagsForActiveCategory();
      if (state.activeTag && tags.length && !tags.includes(state.activeTag)) {
        state.activeTag = null;
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tag-filter-toggle";
      btn.innerHTML = `<span>Tag-Filter öffnen</span><span aria-hidden="true">🔍</span>`;
      btn.addEventListener("click", () => {
        openTagOverlay();
      });
      dom.tagFilter.appendChild(btn);

      if (state.activeTag) {
        const info = document.createElement("span");
        info.className = "tag-filter-active-info";
        info.textContent = `Aktiver Tag: „${state.activeTag}“`;
        dom.tagFilter.appendChild(info);
      }

      return;
    }

    // Für alle anderen Kategorien: Tag-Chips direkt anzeigen
    const tags = getAvailableTagsForActiveCategory();

    if (!tags.length) {
      state.activeTag = null;
      return;
    }

    if (state.activeTag && !tags.includes(state.activeTag)) {
      state.activeTag = null;
    }

    // "Alle"-Chip
    const allChip = document.createElement("button");
    allChip.type = "button";
    allChip.className = "filter-chip";
    if (!state.activeTag) {
      allChip.classList.add("is-active");
    }
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
      if (state.activeTag === tag) {
        chip.classList.add("is-active");
      }
      chip.addEventListener("click", () => {
        state.activeTag = state.activeTag === tag ? null : tag;
        renderAll();
      });
      dom.tagFilter.appendChild(chip);
    });
  }

  function renderToolbarMeta() {
    if (!dom.toolbarMeta) return;

    const filtered = getFilteredEntries();
    const inCategory = getEntriesInActiveCategory();

    const category =
      allCategories.find((c) => c.id === state.activeCategoryId) || null;

    const visibleCount = filtered.length;
    const totalCount = inCategory.length;

    let text = `${visibleCount} / ${totalCount || 0} Einträge sichtbar`;
    if (category && category.id !== "all") {
      text += ` in „${category.name}“`;
    }
    if (state.searchQuery.trim()) {
      text += ` (Suche: „${state.searchQuery.trim()}“)`;
    }
    if (state.activeTag) {
      text += ` (Tag: „${state.activeTag}“)`;
    }

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

  // --- Related-Entries-Berechnung ---

  function computeRelatedEntries(entry) {
    const map = new Map();

    const addById = (id) => {
      if (!id) return;
      if (map.has(id)) return;
      const target = findEntryById(id);
      if (target && target.id !== entry.id) {
        map.set(id, target);
      }
    };

    // Explizite Verknüpfungen
    if (Array.isArray(entry.relatedIds)) {
      entry.relatedIds.forEach(addById);
    }

    // Stadt-Verknüpfungen
    if (entry.categoryId === "cities") {
      entries.forEach((e) => {
        if (!isEntryVisible(e)) return;
        if (e.cityId === entry.id) addById(e.id);
      });
    } else if (entry.cityId) {
      addById(entry.cityId);
    }

    // Fraktions-Verknüpfungen
    if (entry.categoryId === "factions") {
      entries.forEach((e) => {
        if (!isEntryVisible(e)) return;
        if (e.factionId === entry.id) addById(e.id);
      });
    } else if (entry.factionId) {
      addById(entry.factionId);
    }

    return Array.from(map.values());
  }

  // --- Detail-HTML (für Overlay) ---

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

    const category = getCategoryById(entry.categoryId);
    const tagsHtml = (entry.tags || [])
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join("");

    const meta = [];
    if (entry.session) {
      meta.push(
        `<span class="meta-label">Session: <strong>${escapeHtml(
          entry.session
        )}</strong></span>`
      );
    }
    if (entry.status) {
      meta.push(
        `<span class="meta-label">Status: <strong>${escapeHtml(
          entry.status
        )}</strong></span>`
      );
    }
    if (entry.region) {
      meta.push(
        `<span class="meta-label">Region: <strong>${escapeHtml(
          entry.region
        )}</strong></span>`
      );
    }
    if (entry.lastUpdated) {
      meta.push(
        `<span class="meta-label">Stand: <strong>${escapeHtml(
          entry.lastUpdated
        )}</strong></span>`
      );
    }

    const relatedEntries = computeRelatedEntries(entry);

    // Bilder-Block
    const images = Array.isArray(entry.images) ? entry.images : [];
    let imagesHtml = "";
    if (images.length) {
      const imageCards = images
        .map((imgName) => {
          const src = buildImageUrl(imgName);
          if (!src) return "";
          const alt = `${entry.title || "Bild"} – ${imgName}`;
          return `
            <figure class="entry-detail-image-card">
              <img src="${escapeHtml(
                src
              )}" alt="${escapeHtml(alt)}" loading="lazy" />
              <figcaption>${escapeHtml(imgName)}</figcaption>
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
        const cat = getCategoryById(rel.categoryId);
        const catIcon = cat ? cat.icon || "📁" : "📁";
        return `<button type="button" class="related-link" data-entry-id="${escapeHtml(
          rel.id
        )}">
          <span aria-hidden="true">${escapeHtml(catIcon)}</span>
          <span>${escapeHtml(rel.title || "Ohne Titel")}</span>
        </button>`;
      })
      .join("");

    const titleIdAttr = titleId ? ` id="${escapeHtml(titleId)}"` : "";
    const newBadgeHtml = isEntryNew(entry)
      ? '<span class="entry-detail-badge entry-detail-badge-new">Neu</span>'
      : "";

    return `
      <header class="entry-detail-header">
        <div>
          <h2 class="entry-detail-title"${titleIdAttr}>
            ${escapeHtml(entry.title || "Ohne Titel")}
            ${newBadgeHtml}
          </h2>
          ${
            category
              ? `<p class="entry-detail-category">${escapeHtml(
                  category.name
                )}</p>`
              : ""
          }
        </div>
      </header>
      ${
        meta.length
          ? `<div class="entry-detail-meta">${meta.join("")}</div>`
          : ""
      }
      ${tagsHtml ? `<div class="entry-detail-tags">${tagsHtml}</div>` : ""}
      <div class="entry-detail-body">${escapeHtml(entry.body || "")}</div>
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
    if (!dom.detailContent) return;
    dom.detailContent.innerHTML = buildEntryDetailHtml(entry, {
      titleId: "detail-overlay-title",
    });
  }

  // --- Eintragsliste ---

  function renderEntryList() {
    if (!dom.entryList) return;

    const filtered = getFilteredEntries();
    dom.entryList.innerHTML = "";

    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML =
        "<p>Keine Einträge gefunden. Passe Kategorie, Suche oder Tag-Filter an.</p>";
      dom.entryList.appendChild(empty);
      return;
    }

    let selected =
      filtered.find((e) => e.id === state.selectedEntryId) || filtered[0];
    state.selectedEntryId = selected ? selected.id : null;

    filtered.forEach((entry) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "entry-card";
      card.dataset.entryId = entry.id;

      if (entry.id === state.selectedEntryId) {
        card.classList.add("is-selected");
      }

      const category = getCategoryById(entry.categoryId);
      const entryIsNew = isEntryNew(entry);

      const tagsHtml = (entry.tags || [])
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join("");

      card.innerHTML = `
        <div class="entry-card-header">
          <div>
            <h3 class="entry-card-title">
              ${escapeHtml(entry.title || "Ohne Titel")}
              ${
                entryIsNew
                  ? '<span class="entry-card-badge entry-card-badge-new">Neu</span>'
                  : ""
              }
            </h3>
            ${
              entry.summary
                ? `<p class="entry-card-summary">${escapeHtml(
                    entry.summary
                  )}</p>`
                : ""
            }
          </div>
          ${
            category
              ? `<span class="entry-card-category-pill">${escapeHtml(
                  category.name
                )}</span>`
              : ""
          }
        </div>
        ${tagsHtml ? `<div class="entry-card-tags">${tagsHtml}</div>` : ""}
      `;

      card.addEventListener("click", () => {
        // Öffnen über Hash → handleHashChange übernimmt „Neu“-Update
        window.location.hash = `#entry-${entry.id}`;
      });

      dom.entryList.appendChild(card);
    });
  }

  function renderAll() {
    renderCategories();
    renderTagFilter();
    renderEntryList();
    renderToolbarMeta();

    // Sort-Auswahl optisch mit State synchronisieren
    if (dom.sortSelect) {
      dom.sortSelect.value = state.sortBy || "default";
    }
  }

  // --- Bild-Viewer (Lightbox) ---

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
      if (!isFinite(fitScale) || fitScale <= 0) {
        fitScale = 1;
      }
      if (fitScale > 1) {
        // nicht automatisch größer skalieren als Original
        fitScale = 1;
      }

      imageViewer.baseScale = fitScale;
      imageViewer.translateX = 0;
      imageViewer.translateY = 0;
      imageViewer.scale = fitScale;
      updateTransform();
    };

    const onClose = () => {
      closeImageViewer();
    };

    imageViewer.backdrop.addEventListener("click", onClose);
    imageViewer.closeBtn.addEventListener("click", onClose);

    imageViewer.zoomInBtn.addEventListener("click", () => {
      setScale(imageViewer.scale + 0.25);
    });

    imageViewer.zoomOutBtn.addEventListener("click", () => {
      setScale(imageViewer.scale - 0.25);
    });

    imageViewer.resetBtn.addEventListener("click", () => {
      const targetScale = imageViewer.baseScale || 1;
      setScale(targetScale, { resetTranslation: true });
    });

    // Drag / Pinch zum Verschieben / Zoomen
    imageViewer.inner.addEventListener("pointerdown", (ev) => {
      if (!imageViewer.img) return;
      ev.preventDefault();

      try {
        imageViewer.img.setPointerCapture(ev.pointerId);
      } catch {
        // ignore
      }

      if (!imageViewer.activePointers) {
        imageViewer.activePointers = {};
      }
      imageViewer.activePointers[ev.pointerId] = {
        x: ev.clientX,
        y: ev.clientY,
      };

      const ids = Object.keys(imageViewer.activePointers);

      if (ids.length === 2) {
        // Pinch startet
        imageViewer.isPinching = true;
        imageViewer.isDragging = false;
        const p1 = imageViewer.activePointers[ids[0]];
        const p2 = imageViewer.activePointers[ids[1]];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.hypot(dx, dy) || 1;
        imageViewer.pinchStartDistance = dist;
        imageViewer.pinchStartScale =
          imageViewer.scale || imageViewer.baseScale || 1;
      } else if (ids.length === 1) {
        // Einfaches Draggen
        imageViewer.isDragging = true;
        imageViewer.isPinching = false;
        imageViewer.dragStartX = ev.clientX;
        imageViewer.dragStartY = ev.clientY;
        imageViewer.imgStartX = imageViewer.translateX;
        imageViewer.imgStartY = imageViewer.translateY;
      }
    });

    imageViewer.inner.addEventListener("pointermove", (ev) => {
      if (!imageViewer.img) return;
      if (!imageViewer.isDragging && !imageViewer.isPinching) return;
      ev.preventDefault();

      if (imageViewer.isPinching) {
        if (
          imageViewer.activePointers &&
          imageViewer.activePointers[ev.pointerId]
        ) {
          imageViewer.activePointers[ev.pointerId].x = ev.clientX;
          imageViewer.activePointers[ev.pointerId].y = ev.clientY;
        }
        const ids = Object.keys(imageViewer.activePointers || {});
        if (ids.length >= 2) {
          const p1 = imageViewer.activePointers[ids[0]];
          const p2 = imageViewer.activePointers[ids[1]];
          if (p1 && p2) {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (imageViewer.pinchStartDistance > 0) {
              const factor = dist / imageViewer.pinchStartDistance;
              const nextScale = imageViewer.pinchStartScale * factor;
              setScale(nextScale);
            }
          }
        }
      } else if (imageViewer.isDragging) {
        const dx = ev.clientX - imageViewer.dragStartX;
        const dy = ev.clientY - imageViewer.dragStartY;
        imageViewer.translateX = imageViewer.imgStartX + dx;
        imageViewer.translateY = imageViewer.imgStartY + dy;
        updateTransform();
      }
    });

    const endPointer = (ev) => {
      if (imageViewer.activePointers) {
        delete imageViewer.activePointers[ev.pointerId];
      }
      try {
        if (imageViewer.img) {
          imageViewer.img.releasePointerCapture(ev.pointerId);
        }
      } catch {
        // ignore
      }
      const ids = Object.keys(imageViewer.activePointers || {});
      if (ids.length < 2) {
        imageViewer.isPinching = false;
      }
      if (ids.length === 0) {
        imageViewer.isDragging = false;
      }
    };

    imageViewer.inner.addEventListener("pointerup", (ev) => {
      endPointer(ev);
    });
    imageViewer.inner.addEventListener("pointercancel", (ev) => {
      endPointer(ev);
    });

    // Zoom per Scrollrad
    imageViewer.inner.addEventListener(
      "wheel",
      (ev) => {
        ev.preventDefault();
        const delta = ev.deltaY || 0;
        if (delta < 0) {
          setScale(imageViewer.scale + 0.1);
        } else if (delta > 0) {
          setScale(imageViewer.scale - 0.1);
        }
      },
      { passive: false }
    );

    // helper, damit andere Funktionen Scale setzen können
    imageViewer._setScale = setScale;

    // Bild nach dem Laden automatisch einpassen
    if (imageViewer.img) {
      imageViewer.img.addEventListener("load", handleImageLoad);
    }
  }

  function openImageViewer(src, alt) {
    if (!src) return;
    ensureImageViewerDom();
    if (!imageViewer.root || !imageViewer.img) return;

    // History-Eintrag hinzufügen, damit die Zurück-Taste den Viewer schließen kann
    try {
      if (
        !imageViewer.historyPushed &&
        window.history &&
        window.history.pushState
      ) {
        window.history.pushState({ imageViewer: true }, "");
        imageViewer.historyPushed = true;
      }
    } catch {
      // ignorieren
    }

    // Zustand zurücksetzen
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

    if (imageViewer._setScale) {
      imageViewer._setScale(1, { resetTranslation: true });
    }
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
      // Viewer wurde durch Browser-Zurück geschlossen, keinen weiteren history.back() ausführen
      imageViewer.historyPushed = false;
      return;
    }

    if (imageViewer.historyPushed && window.history && window.history.back) {
      imageViewer.historyPushed = false;
      try {
        window.history.back();
      } catch {
        // ignorieren
      }
    }
  }

  // --- Events ---

  function onDetailContentClick(event) {
    // 1) Bild-Klick → Viewer öffnen
    const img = event.target.closest(".entry-detail-images img");
    if (img) {
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt") || "";
      openImageViewer(src, alt);
      return;
    }

    // 2) Related-Link-Klick → anderen Eintrag öffnen
    const btn = event.target.closest(".related-link");
    if (!btn) return;
    const entryId = btn.getAttribute("data-entry-id");
    if (!entryId) return;
    window.location.hash = `#entry-${entryId}`;
  }

  function initEvents() {
    if (dom.searchInput) {
      dom.searchInput.addEventListener("input", onSearchChange);
    }

    if (dom.sortSelect) {
      dom.sortSelect.addEventListener("change", onSortChange);
    }

    if (dom.menuToggle) {
      dom.menuToggle.addEventListener("click", toggleSidebar);
    }

    if (dom.sidebarBackdrop) {
      dom.sidebarBackdrop.addEventListener("click", function () {
        setSidebarOpen(false);
      });
    }

    // Settings-Overlay
    if (dom.settingsToggle) {
      dom.settingsToggle.addEventListener("click", openSettings);
    }
    if (dom.settingsBackdrop) {
      dom.settingsBackdrop.addEventListener("click", closeSettings);
    }
    if (dom.settingsCancel) {
      dom.settingsCancel.addEventListener("click", closeSettings);
    }
    if (dom.settingsSave) {
      dom.settingsSave.addEventListener("click", saveSettingsFromForm);
    }

    if (dom.detailContent) {
      dom.detailContent.addEventListener("click", onDetailContentClick);
    }

    if (dom.detailBackButton) {
      dom.detailBackButton.addEventListener("click", function () {
        // Zurück-Taste nutzt history.back()
        window.history.back();
      });
    }

    if (dom.detailBackdrop) {
      dom.detailBackdrop.addEventListener("click", function () {
        window.history.back();
      });
    }

    // Tag-Overlay schließen
    if (dom.tagOverlayClose) {
      dom.tagOverlayClose.addEventListener("click", function () {
        closeTagOverlay();
      });
    }
    if (dom.tagOverlayBackdrop) {
      dom.tagOverlayBackdrop.addEventListener("click", function () {
        closeTagOverlay();
      });
    }

    // ESC: erst Bild-Viewer, dann Settings, Tag, Detail
    window.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" && event.key !== "Esc") return;

      if (isImageViewerOpen()) {
        closeImageViewer();
        return;
      }

      if (
        dom.settingsOverlay &&
        dom.settingsOverlay.classList.contains("open")
      ) {
        closeSettings();
        return;
      }

      if (dom.tagOverlay && dom.tagOverlay.classList.contains("is-open")) {
        closeTagOverlay();
        return;
      }

      if (dom.detailOverlay && dom.detailOverlay.classList.contains("is-open")) {
        window.history.back();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) {
        setSidebarOpen(false);
      }
    });

    window.addEventListener("hashchange", handleHashChange);

    // Browser-Zurück-Taste: falls Bild-Viewer offen ist, zuerst diesen schließen
    window.addEventListener("popstate", function () {
      if (isImageViewerOpen()) {
        closeImageViewer({ fromHistory: true });
      }
    });
  }

  // --- Init ---

  function init() {
    if (!dom.app) return;

    const initialTheme = detectInitialTheme();
    applyTheme(initialTheme);

    const initialHandedness = detectInitialHandedness();
    applyHandedness(initialHandedness);

    loadNewSeenMap();
    initEvents();
    renderAll();

    // Falls die Seite bereits mit #entry-... geladen wurde
    handleHashChange();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
