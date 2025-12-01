(function () {
  const categories = Array.isArray(window.categories) ? window.categories.slice() : [];
  const entries = Array.isArray(window.entries) ? window.entries.slice() : [];

  const THEME_STORAGE_KEY = "dnd-glossar-theme";

  const state = {
    activeCategoryId: "all",
    searchQuery: "",
    selectedEntryId: entries.length ? entries[0].id : null,
    sidebarOpen: false,
    theme: "dark",
    sortBy: "default",      // Sortierung
    activeTag: null         // Tag-Filter
  };

  const dom = {
    app: document.querySelector(".app"),
    categoryList: document.getElementById("category-list"),
    entryList: document.getElementById("entry-list"),
    searchInput: document.getElementById("search-input"),
    toolbarMeta: document.getElementById("toolbar-meta"),
    menuToggle: document.getElementById("menu-toggle"),
    sidebarBackdrop: document.getElementById("sidebar-backdrop"),
    themeToggle: document.getElementById("theme-toggle"),
    themeToggleIcon: document.getElementById("theme-toggle-icon"),
    themeToggleLabel: document.getElementById("theme-toggle-label"),
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
    tagOverlayChips: document.getElementById("tag-overlay-chips")
  };

  const allCategories = [
    { id: "all", name: "Alle Einträge", icon: "📚" },
    ...categories,
  ];

  function getCategoryById(id) {
    if (!id) return null;
    return allCategories.find((c) => c.id === id) || null;
  }

  function findEntryById(id) {
    if (!id) return null;
    return entries.find((e) => e.id === id) || null;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // --- Theme Handling ---

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

  function updateThemeToggleUi(theme) {
    if (!dom.themeToggleIcon || !dom.themeToggleLabel) return;
    if (theme === "dark") {
      dom.themeToggleIcon.textContent = "🌙";
      dom.themeToggleLabel.textContent = "Dunkel";
    } else {
      dom.themeToggleIcon.textContent = "☀️";
      dom.themeToggleLabel.textContent = "Hell";
    }
  }

  function applyTheme(theme) {
    state.theme = theme === "light" ? "light" : "dark";
    const root = document.documentElement;
    root.setAttribute("data-theme", state.theme);
    updateThemeToggleUi(state.theme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, state.theme);
    } catch {
      // Ignorieren, wenn localStorage nicht verfügbar ist
    }
  }

  function onThemeToggleClick() {
    const next = state.theme === "dark" ? "light" : "dark";
    applyTheme(next);
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

    // Kategorie & Auswahl anpassen, aber Filter (Suche/Tag) unverändert lassen
    state.activeCategoryId = entry.categoryId || "all";
    state.selectedEntryId = entry.id;
    renderAll();
    showDetailOverlay(entry);
  }

  // --- Tag-Overlay-Helfer ---

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

  function getEntriesInActiveCategory() {
    return entries.filter((entry) => {
      if (state.activeCategoryId === "all") return true;
      return entry.categoryId === state.activeCategoryId;
    });
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
    const collator = typeof Intl !== "undefined"
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

    // Für alle anderen Kategorien: wie bisher Tag-Chips direkt anzeigen
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
        if (e.cityId === entry.id) addById(e.id);
      });
    } else if (entry.cityId) {
      addById(entry.cityId);
    }

    // Fraktions-Verknüpfungen
    if (entry.categoryId === "factions") {
      entries.forEach((e) => {
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

    return `
      <header class="entry-detail-header">
        <div>
          <h2 class="entry-detail-title"${titleIdAttr}>${escapeHtml(
            entry.title || "Ohne Titel"
          )}</h2>
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

      const tagsHtml = (entry.tags || [])
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join("");

      card.innerHTML = `
        <div class="entry-card-header">
          <div>
            <h3 class="entry-card-title">${escapeHtml(
              entry.title || "Ohne Titel"
            )}</h3>
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
        // Statt scrollIntoView: Hash setzen → Overlay öffnen
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

  // --- Events ---

  function onDetailClick(event) {
    const btn = event.target.closest(".related-link");
    if (!btn) return;
    const entryId = btn.getAttribute("data-entry-id");
    if (!entryId) return;
    // Detail über Hash öffnen
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

    if (dom.themeToggle) {
      dom.themeToggle.addEventListener("click", onThemeToggleClick);
    }

    if (dom.detailContent) {
      dom.detailContent.addEventListener("click", onDetailClick);
    }

    if (dom.detailBackButton) {
      dom.detailBackButton.addEventListener("click", function () {
        // Spezifikation: Zurück-Taste nutzt history.back()
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

    // ESC schließt zuerst Tag-Overlay, dann Detail-Overlay
    window.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" && event.key !== "Esc") return;
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
  }

  // --- Init ---

  function init() {
    if (!dom.app) return;

    const initialTheme = detectInitialTheme();
    applyTheme(initialTheme);

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
