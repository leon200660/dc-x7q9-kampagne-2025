/* app.ui.render.bestiary.js */
(function () {
  const app = window.GlossaryApp;
  if (!app) return;

  const { state } = app;

  const callIfFn = (fn, ...args) => (typeof fn === "function" ? fn(...args) : undefined);

  const ui = (app._ui = app._ui || {});
  ui.bestiary = ui.bestiary || {
    query: "",
    tocQuery: "",
    activeId: "",
    mode: "list",
    tocOpen: false,
    filtersOpen: false,
    filters: {
      chapterId: "",
      habitat: "",
      type: "",
      dangerTag: "",
      knowledge: "",
      sortBy: "",
    },
    harvestSelections: {},
    detailsOpen: {},
    shareState: {},
    _bound: false,
    _lastRenderKey: "",

    // TOC lifecycle
    _tocCloseTimer: null,
    _tocPrevFocus: null,
    _pageModels: [],
    _pageIndexByMonsterId: {},
    _windowedPages: false,
  };

  const BESTIARY_WINDOWED_MONSTER_THRESHOLD = 6;
  const BESTIARY_WINDOW_RADIUS_MOBILE = 2;
  const BESTIARY_WINDOW_RADIUS_DESKTOP = 3;

  ui.bestiary.mode =
    ui.bestiary.mode === "detail" || ui.bestiary.mode === "book" ? "detail" : "list";
  ui.bestiary.filtersOpen = !!ui.bestiary.filtersOpen;
  ui.bestiary.filters =
    ui.bestiary.filters && typeof ui.bestiary.filters === "object"
      ? {
          chapterId: toNonEmptyString(ui.bestiary.filters.chapterId),
          habitat: toNonEmptyString(ui.bestiary.filters.habitat),
          type: toNonEmptyString(ui.bestiary.filters.type),
          dangerTag: toNonEmptyString(ui.bestiary.filters.dangerTag),
          knowledge: toNonEmptyString(ui.bestiary.filters.knowledge),
          sortBy: toNonEmptyString(ui.bestiary.filters.sortBy),
        }
      : { chapterId: "", habitat: "", type: "", dangerTag: "", knowledge: "", sortBy: "" };
  ui.bestiary.harvestSelections =
    ui.bestiary.harvestSelections && typeof ui.bestiary.harvestSelections === "object"
      ? ui.bestiary.harvestSelections
      : {};
  ui.bestiary.detailsOpen =
    ui.bestiary.detailsOpen && typeof ui.bestiary.detailsOpen === "object" ? ui.bestiary.detailsOpen : {};
  ui.bestiary.shareState =
    ui.bestiary.shareState && typeof ui.bestiary.shareState === "object" ? ui.bestiary.shareState : {};
  ui.bestiary._pageModels = Array.isArray(ui.bestiary._pageModels) ? ui.bestiary._pageModels : [];
  ui.bestiary._pageIndexByMonsterId =
    ui.bestiary._pageIndexByMonsterId && typeof ui.bestiary._pageIndexByMonsterId === "object"
      ? ui.bestiary._pageIndexByMonsterId
      : {};
  ui.bestiary._windowedPages = !!ui.bestiary._windowedPages;

  // -----------------------------
  // Helpers
  // -----------------------------
  function toNonEmptyString(v) {
    const s = typeof v === "string" ? v.trim() : String(v || "").trim();
    return s ? s : "";
  }

  function norm(s) {
    return toNonEmptyString(s).toLowerCase();
  }

  function clamp(n, a, b) {
    const x = Number(n);
    if (!Number.isFinite(x)) return a;
    return Math.max(a, Math.min(b, x));
  }

  function isScrollableOverflowValue(value) {
    return /(auto|scroll|overlay)/i.test(String(value || ""));
  }

  function getElementFromEventTarget(target) {
    if (!target) return null;
    if (target.nodeType === 1) return target;
    return target.parentElement || null;
  }

  function findNestedScrollableAncestor(target, root) {
    let node = getElementFromEventTarget(target);
    while (node && node !== root) {
      if (node.nodeType !== 1) {
        node = node.parentElement || null;
        continue;
      }

      const style = window.getComputedStyle ? window.getComputedStyle(node) : null;
      const canScrollY =
        !!style && isScrollableOverflowValue(style.overflowY) && node.scrollHeight > node.clientHeight + 1;
      const canScrollX =
        !!style && isScrollableOverflowValue(style.overflowX) && node.scrollWidth > node.clientWidth + 1;

      if (canScrollY || canScrollX) return node;
      node = node.parentElement || null;
    }
    return null;
  }

  function canWheelScrollElement(node, deltaX, deltaY) {
    if (!node) return false;

    const absX = Math.abs(Number(deltaX) || 0);
    const absY = Math.abs(Number(deltaY) || 0);
    const preferY = absY >= absX;

    if (preferY) {
      const maxTop = Math.max(0, node.scrollHeight - node.clientHeight);
      if (!maxTop) return false;
      if (deltaY > 0) return node.scrollTop < maxTop - 1;
      if (deltaY < 0) return node.scrollTop > 1;
      return false;
    }

    const maxLeft = Math.max(0, node.scrollWidth - node.clientWidth);
    if (!maxLeft) return false;
    if (deltaX > 0) return node.scrollLeft < maxLeft - 1;
    if (deltaX < 0) return node.scrollLeft > 1;
    return false;
  }

  function isDesktopViewport() {
    try {
      return window.matchMedia && window.matchMedia("(min-width: 900px)").matches;
    } catch {
      return false;
    }
  }

  function getBookWindowRadius() {
    return isDesktopViewport() ? BESTIARY_WINDOW_RADIUS_DESKTOP : BESTIARY_WINDOW_RADIUS_MOBILE;
  }

  function getBestiaryMode() {
    return ui.bestiary.mode === "detail" ? "detail" : "list";
  }

  function getBestiaryScrollContainer() {
    const dom = getDom();
    if (getBestiaryMode() === "detail" && dom.bestiaryView) return dom.bestiaryView;
    return dom.bestiaryBook || dom.bestiaryView || null;
  }

  function getBestiaryDetailBucket(monsterId, create) {
    const sid = toNonEmptyString(monsterId);
    if (!sid) return null;

    const source =
      ui.bestiary.detailsOpen && typeof ui.bestiary.detailsOpen === "object" ? ui.bestiary.detailsOpen : {};
    ui.bestiary.detailsOpen = source;

    if (!source[sid] && create) source[sid] = {};
    const bucket = source[sid];
    return bucket && typeof bucket === "object" ? bucket : null;
  }

  function getBestiaryDetailState(monsterId, detailKey, fallbackOpen) {
    const key = toNonEmptyString(detailKey);
    if (!key) return !!fallbackOpen;

    const bucket = getBestiaryDetailBucket(monsterId, false);
    if (bucket && Object.prototype.hasOwnProperty.call(bucket, key)) return !!bucket[key];
    return !!fallbackOpen;
  }

  function setBestiaryDetailState(monsterId, detailKey, isOpen) {
    const key = toNonEmptyString(detailKey);
    if (!key) return;

    const bucket = getBestiaryDetailBucket(monsterId, true);
    if (!bucket) return;
    bucket[key] = !!isOpen;
  }

  function getBestiaryFilters() {
    const filters = ui.bestiary.filters && typeof ui.bestiary.filters === "object" ? ui.bestiary.filters : {};
    ui.bestiary.filters = {
      chapterId: toNonEmptyString(filters.chapterId),
      habitat: toNonEmptyString(filters.habitat),
      type: toNonEmptyString(filters.type),
      dangerTag: toNonEmptyString(filters.dangerTag),
      knowledge: toNonEmptyString(filters.knowledge),
      sortBy: toNonEmptyString(filters.sortBy),
    };
    return ui.bestiary.filters;
  }

  function hasActiveBestiaryFilters() {
    const filters = getBestiaryFilters();
    return !!(filters.chapterId || filters.habitat || filters.type || filters.dangerTag || filters.knowledge);
  }

  function hasReducedMotion() {
    try {
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  }

  function safeEscapeSelector(value) {
    const v = toNonEmptyString(value);
    if (!v) return "";
    try {
      if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(v);
    } catch {}
    return v.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  function getMaxTransitionMs(el) {
    if (!el || !window.getComputedStyle) return 0;
    const cs = window.getComputedStyle(el);

    // transition-duration + delay können multiple Werte haben
    const dur = String(cs.transitionDuration || "").split(",").map((x) => x.trim());
    const del = String(cs.transitionDelay || "").split(",").map((x) => x.trim());

    const parseMs = (s) => {
      if (!s) return 0;
      if (s.endsWith("ms")) return Number.parseFloat(s) || 0;
      if (s.endsWith("s")) return (Number.parseFloat(s) || 0) * 1000;
      return Number.parseFloat(s) || 0;
    };

    const n = Math.max(dur.length, del.length, 1);
    let max = 0;
    for (let i = 0; i < n; i++) {
      const d = parseMs(dur[i % dur.length]);
      const l = parseMs(del[i % del.length]);
      max = Math.max(max, d + l);
    }
    return max;
  }

  function getDom() {
    const dom = (app.dom = app.dom || {});
    dom.bestiaryView = dom.bestiaryView || document.getElementById("bestiary-view");
    dom.bestiaryBook = dom.bestiaryBook || document.getElementById("bestiary-book");
    dom.bestiarySearch = dom.bestiarySearch || document.getElementById("bestiary-search");
    dom.bestiaryMeta = dom.bestiaryMeta || document.getElementById("bestiary-meta");
    dom.bestiaryFilterButton = dom.bestiaryFilterButton || document.getElementById("bestiary-filter-button");
    dom.bestiaryFilterSummary = dom.bestiaryFilterSummary || document.getElementById("bestiary-filter-summary");
    dom.bestiaryPositionChip = dom.bestiaryPositionChip || document.getElementById("bestiary-position-chip");
    dom.bestiaryModeList = dom.bestiaryModeList || document.getElementById("bestiary-mode-list");
    dom.bestiaryModeDetail = dom.bestiaryModeDetail || document.getElementById("bestiary-mode-detail");

    dom.bestiaryTocButton = dom.bestiaryTocButton || document.getElementById("bestiary-toc-button");
    dom.bestiaryToc = dom.bestiaryToc || document.getElementById("bestiary-toc");
    dom.bestiaryTocBackdrop = dom.bestiaryTocBackdrop || document.getElementById("bestiary-toc-backdrop");
    dom.bestiaryTocPanel = dom.bestiaryTocPanel || document.getElementById("bestiary-toc-panel");
    dom.bestiaryTocClose = dom.bestiaryTocClose || document.getElementById("bestiary-toc-close");
    dom.bestiaryTocSearch = dom.bestiaryTocSearch || document.getElementById("bestiary-toc-search");
    dom.bestiaryTocList = dom.bestiaryTocList || document.getElementById("bestiary-toc-list");

    if (dom.bestiaryBook && dom.bestiaryBook.tabIndex < 0) {
      dom.bestiaryBook.tabIndex = 0;
    }

    return dom;
  }

  function getBestiaryData() {
    const monstersRaw = typeof app.getBestiaryMonsters === "function" ? app.getBestiaryMonsters() : [];
    const chaptersRaw = typeof app.getBestiaryChapters === "function" ? app.getBestiaryChapters() : [];
    const meta =
      typeof app.getBestiaryMeta === "function" ? app.getBestiaryMeta() : { title: "Bestiarium", subtitle: "" };

    const monsters = Array.isArray(monstersRaw) ? monstersRaw : [];
    const chapters = Array.isArray(chaptersRaw) ? chaptersRaw : [];

    // Stabiler Index (nur setzen, wenn nicht vorhanden)
    monsters.forEach((m, i) => {
      if (!m || typeof m !== "object") return;
      if (typeof m._index !== "number") m._index = i;
    });

    return { monsters, chapters, meta };
  }

  // Stable Monster ID (TOC + Pages müssen identisch arbeiten)
  function getMonsterId(m, fallbackIndex) {
    if (!m) return toNonEmptyString(fallbackIndex) ? `monster-${fallbackIndex}` : "monster";
    const explicit = toNonEmptyString(m.id);
    if (explicit) return explicit;

    const cached = toNonEmptyString(m._bestiaryId);
    if (cached) return cached;

    const title = toNonEmptyString(m.title);
    const base = title
      ? title
          .toLowerCase()
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 48)
      : "monster";

    const idx = typeof m._index === "number" ? m._index : Number.isFinite(fallbackIndex) ? fallbackIndex : 0;
    const gen = `${base}-${idx}`;

    // Cache (mutiert Objekt, aber nur intern)
    if (m && typeof m === "object") m._bestiaryId = gen;
    return gen;
  }

  function matchesQuery(monster, q) {
    const query = norm(q);
    if (!query) return true;

    const title = norm(monster && monster.title);
    const summary = norm(monster && monster.summary);
    const body = norm(monster && monster.body);
    const chapter = norm(monster && (monster.chapterName || monster.chapterId));
    const tags = Array.isArray(monster && monster.tags) ? monster.tags.map(norm).join(" ") : "";
    const habitat = norm(getMonsterHabitatLabel(monster));
    const status = norm(monster && monster.status);
    const discoveryStatus = norm(monster && monster.discoveryStatus);
    const dangerTags = getMonsterDangerTags(monster).map(norm).join(" ");
    const threatClass = norm(getMonsterThreatClass(monster));
    const fieldNote = norm(getMonsterFieldNote(monster));
    const traces = getMonsterTraceDetails(monster).map(norm).join(" ");
    const warnings = getMonsterWarningSigns(monster).map(norm).join(" ");
    const behavior = norm(getMonsterBehavior(monster));
    const tactics = norm(getMonsterTactics(monster));
    const lastSighting = norm(getMonsterLastSighting(monster));
    const type = norm(getMonsterType(monster));
    const size = norm(pickFirst(monster, ["size"]));
    const cr = norm(getMonsterCr(monster));

    return (
      title.includes(query) ||
      summary.includes(query) ||
      tags.includes(query) ||
      habitat.includes(query) ||
      status.includes(query) ||
      discoveryStatus.includes(query) ||
      dangerTags.includes(query) ||
      threatClass.includes(query) ||
      fieldNote.includes(query) ||
      traces.includes(query) ||
      warnings.includes(query) ||
      behavior.includes(query) ||
      tactics.includes(query) ||
      lastSighting.includes(query) ||
      type.includes(query) ||
      size.includes(query) ||
      cr.includes(query) ||
      chapter.includes(query) ||
      body.includes(query)
    );
  }

  function sortMonsters(monsters) {
    const sortBy = getBestiaryFilters().sortBy || "chapter-title";
    const recentIds = typeof app.getBestiaryRecentMonsterIds === "function" ? app.getBestiaryRecentMonsterIds(64) : [];
    const recentRank = new Map(recentIds.map((id, index) => [toNonEmptyString(id), index]));

    const parseCrValue = (monster) => {
      const raw = toNonEmptyString(getMonsterCr(monster));
      if (!raw) return -1;
      if (raw.includes("/")) {
        const parts = raw.split("/");
        const a = Number.parseFloat(parts[0]);
        const b = Number.parseFloat(parts[1]);
        if (Number.isFinite(a) && Number.isFinite(b) && b !== 0) return a / b;
      }
      const value = Number.parseFloat(raw.replace(",", "."));
      return Number.isFinite(value) ? value : -1;
    };

    const defaultCompare = (a, b) => {
      const ac = norm(a && (a.chapterName || a.chapterId));
      const bc = norm(b && (b.chapterName || b.chapterId));
      if (ac !== bc) return ac.localeCompare(bc);

      const at = norm(a && a.title);
      const bt = norm(b && b.title);
      if (at !== bt) return at.localeCompare(bt);

      const ai = typeof a._index === "number" ? a._index : 0;
      const bi = typeof b._index === "number" ? b._index : 0;
      return ai - bi;
    };

    return (monsters || []).slice().sort((a, b) => {
      if (sortBy === "name-asc") {
        const at = norm(a && a.title);
        const bt = norm(b && b.title);
        return at !== bt ? at.localeCompare(bt) : defaultCompare(a, b);
      }

      if (sortBy === "cr-desc") {
        const av = parseCrValue(a);
        const bv = parseCrValue(b);
        if (av !== bv) return bv - av;
        return defaultCompare(a, b);
      }

      if (sortBy === "recent-desc") {
        const ar = recentRank.has(getMonsterId(a, a && a._index)) ? recentRank.get(getMonsterId(a, a && a._index)) : 9999;
        const br = recentRank.has(getMonsterId(b, b && b._index)) ? recentRank.get(getMonsterId(b, b && b._index)) : 9999;
        if (ar !== br) return ar - br;
        return defaultCompare(a, b);
      }

      if (sortBy === "favorites-first") {
        const af = typeof app.isBestiaryFavorite === "function" ? app.isBestiaryFavorite(getMonsterId(a, a && a._index)) : false;
        const bf = typeof app.isBestiaryFavorite === "function" ? app.isBestiaryFavorite(getMonsterId(b, b && b._index)) : false;
        if (af !== bf) return af ? -1 : 1;
        return defaultCompare(a, b);
      }

      return defaultCompare(a, b);
    });
  }

  function getMonsterHabitatLabel(monster) {
    return pickFirst(monster, ["habitat", "environment", "biome"]) || pickFirst(monster, ["chapterName", "chapterId"]);
  }

  function groupForToc(monsters, chapters) {
    const list = monsters || [];
    const ch = Array.isArray(chapters) ? chapters : [];

    const map = new Map();
    const order = [];

    ch.forEach((c) => {
      const id = toNonEmptyString(c.id);
      if (!id) return;
      const name = toNonEmptyString(c.name) || id;
      map.set(id, {
        id,
        kind: "chapter",
        name,
        icon: toNonEmptyString(c.icon),
        summary: toNonEmptyString(c.summary),
        items: [],
      });
      order.push(id);
    });

    list.forEach((m) => {
      const cid = toNonEmptyString(m.chapterId) || "";
      if (cid) {
        if (!map.has(cid)) {
          map.set(cid, {
            id: cid,
            kind: "chapter",
            name: toNonEmptyString(m.chapterName) || cid,
            icon: "",
            summary: "",
            items: [],
          });
          order.push(cid);
        }
        map.get(cid).items.push(m);
        return;
      }

      const t = toNonEmptyString(m.title) || "";
      const key = t ? t[0].toUpperCase() : "#";
      const gid = "__alpha__" + key;
      if (!map.has(gid)) {
        map.set(gid, { id: gid, kind: "alpha", name: key, icon: "", summary: "", items: [] });
        order.push(gid);
      }
      map.get(gid).items.push(m);
    });

    const out = [];
    order.forEach((id) => {
      const g = map.get(id);
      if (!g || !g.items || !g.items.length) return;
      g.items = g.items.slice().sort((a, b) => norm(a.title).localeCompare(norm(b.title)));
      g.count = g.items.length;
      out.push(g);
    });

    return out;
  }

  function buildFilterSections(monsters, chapters) {
    const chapterGroups = groupForToc(monsters, chapters).filter((group) => group.kind === "chapter");
    const habitatMap = new Map();
    const typeMap = new Map();
    const dangerMap = new Map();
    const knowledgeMap = new Map();

    monsters.forEach((monster) => {
      const habitat = getMonsterHabitatLabel(monster);
      if (habitat) {
        const key = norm(habitat);
        const prev = habitatMap.get(key) || { value: habitat, label: habitat, count: 0 };
        prev.count += 1;
        habitatMap.set(key, prev);
      }

      const type = getMonsterType(monster);
      if (type) {
        const key = norm(type);
        const prev = typeMap.get(key) || { value: type, label: type, count: 0 };
        prev.count += 1;
        typeMap.set(key, prev);
      }

      getMonsterDangerTags(monster).forEach((tag) => {
        const key = norm(tag);
        if (!key) return;
        const prev = dangerMap.get(key) || { value: tag, label: tag, count: 0 };
        prev.count += 1;
        dangerMap.set(key, prev);
      });

      const monsterId = getMonsterId(monster, typeof monster._index === "number" ? monster._index : 0);
      const knowledge =
        typeof app.getBestiaryKnowledgeState === "function"
          ? app.getBestiaryKnowledgeState(monsterId, getMonsterKnowledgeFallback(monster))
          : getMonsterKnowledgeFallback(monster);
      const key =
        knowledge === "researched" ? "researched" : knowledge === "partial" ? "partial" : "unknown";
      const prev = knowledgeMap.get(key) || { value: key, label: getMonsterKnowledgeLabel(key), count: 0 };
      prev.count += 1;
      knowledgeMap.set(key, prev);
    });

    const sections = [];

    sections.push({
      key: "sortBy",
      title: "Sortierung",
      allowAll: false,
      options: [
        { value: "chapter-title", label: "Kapitel / Name" },
        { value: "name-asc", label: "Name A–Z" },
        { value: "cr-desc", label: "CR hoch zuerst" },
        { value: "recent-desc", label: "Kürzlich angesehen" },
        { value: "favorites-first", label: "Favoriten zuerst" },
      ],
    });

    if (chapterGroups.length) {
      sections.push({
        key: "chapterId",
        title: "Kapitel",
        options: chapterGroups.map((group) => ({
          value: group.id,
          label: group.name,
          icon: group.icon,
          count: group.count || group.items.length || 0,
        })),
      });
    }

    if (habitatMap.size) {
      sections.push({
        key: "habitat",
        title: "Gebiet",
        options: Array.from(habitatMap.values()).sort((a, b) => norm(a.label).localeCompare(norm(b.label))),
      });
    }

    if (typeMap.size) {
      sections.push({
        key: "type",
        title: "Typ",
        options: Array.from(typeMap.values()).sort((a, b) => norm(a.label).localeCompare(norm(b.label))),
      });
    }

    if (dangerMap.size) {
      sections.push({
        key: "dangerTag",
        title: "Gefahr",
        options: Array.from(dangerMap.values()).sort((a, b) => norm(a.label).localeCompare(norm(b.label))),
      });
    }

    if (knowledgeMap.size) {
      sections.push({
        key: "knowledge",
        title: "Wissen",
        options: Array.from(knowledgeMap.values()).sort((a, b) => {
          if (a.value === b.value) return 0;
          const order = { researched: 0, partial: 1, unknown: 2 };
          if ((order[a.value] || 9) !== (order[b.value] || 9)) return (order[a.value] || 9) - (order[b.value] || 9);
          return norm(a.label).localeCompare(norm(b.label));
        }),
      });
    }

    return sections;
  }

  function getChapterLabelById(chapters, monsters, chapterId) {
    const id = toNonEmptyString(chapterId);
    if (!id) return "";

    const found = (chapters || []).find((chapter) => toNonEmptyString(chapter && chapter.id) === id);
    if (found) return toNonEmptyString(found.name) || id;

    const fromMonster = (monsters || []).find((monster) => toNonEmptyString(monster && monster.chapterId) === id);
    return toNonEmptyString(fromMonster && fromMonster.chapterName) || id;
  }

  function getFilteredMonsters(monsters) {
    const searched = (monsters || []).filter((monster) => matchesQuery(monster, ui.bestiary.query || ""));
    const filtered = sortMonsters(searched.filter((monster) => matchesFilters(monster, getBestiaryFilters())));
    return { searched, filtered };
  }

  function buildBookModels(monsters, chapters, meta) {
    const totalMonsters = Array.isArray(monsters) ? monsters.length : 0;
    const groups = groupForToc(monsters, chapters);
    const chapterGroups = groups.filter((group) => group.kind === "chapter");
    const models = [];

    models.push({
      pageIndex: 0,
      pageType: "cover",
      monsterId: "__cover__",
      render: () => buildCoverPage(meta, totalMonsters),
    });

    let chapterIndex = 0;
    let monsterIndex = 0;

    groups.forEach((group) => {
      if (group.kind === "chapter") {
        chapterIndex += 1;
        const currentChapterIndex = chapterIndex;
        const chapterId = toNonEmptyString(group && group.id) || `chapter-${currentChapterIndex}`;
        const chapterName = toNonEmptyString(group && group.name) || `Kapitel ${currentChapterIndex}`;
        const pageIndex = models.length;

        models.push({
          pageIndex,
          pageType: "chapter",
          monsterId: `__chapter__${chapterId}`,
          chapterId,
          chapterName,
          render: () => buildChapterPage(group, currentChapterIndex, Math.max(1, chapterGroups.length)),
        });
      }

      (group.items || []).forEach((monster) => {
        monsterIndex += 1;
        const currentMonsterIndex = monsterIndex;
        const monsterId = getMonsterId(monster, typeof monster._index === "number" ? monster._index : currentMonsterIndex);
        const title = toNonEmptyString(monster && monster.title) || monsterId;
        const summary = toNonEmptyString(monster && monster.summary);
        const chapterName = toNonEmptyString(monster && (monster.chapterName || monster.chapterId));
        const pageIndex = models.length;

        models.push({
          pageIndex,
          pageType: "monster",
          monsterId,
          monsterIndex: currentMonsterIndex,
          totalMonsters,
          title,
          summary,
          chapterName,
          render: () => buildMonsterPage(monster, currentMonsterIndex, totalMonsters),
        });
      });
    });

    return models;
  }

  function shouldWindowBookModels(models) {
    const monsterCount = (models || []).filter((model) => model && model.pageType === "monster").length;
    return monsterCount >= BESTIARY_WINDOWED_MONSTER_THRESHOLD;
  }

  function getInitialBookPageIndex(models) {
    const activeId = toNonEmptyString(ui.bestiary.activeId);
    if (activeId) {
      const found = (models || []).find((model) => model && model.pageType === "monster" && model.monsterId === activeId);
      if (found && Number.isFinite(found.pageIndex)) return found.pageIndex;
    }
    return 0;
  }

  function getBookWindowRange(centerPageIndex, totalPages) {
    const safeTotal = Math.max(0, Number(totalPages) || 0);
    const safeCenter = clamp(centerPageIndex, 0, Math.max(0, safeTotal - 1));
    const radius = getBookWindowRadius();
    return {
      start: Math.max(0, safeCenter - radius),
      end: Math.min(safeTotal - 1, safeCenter + radius),
    };
  }

  function applyPageModelMetadata(page, model, renderState) {
    if (!page || !model) return page;

    page.dataset.pageType = model.pageType || page.dataset.pageType || "";
    page.dataset.pageIndex = String(model.pageIndex);
    page.dataset.renderState = renderState || "full";

    if (model.monsterId) page.dataset.monsterId = model.monsterId;
    if (model.chapterName) page.dataset.chapterName = model.chapterName;
    if (Number.isFinite(model.monsterIndex)) page.dataset.monsterIndex = String(model.monsterIndex);

    return page;
  }

  function buildPlaceholderPage(model) {
    const wrapper = document.createElement("article");
    wrapper.className = "bestiary-page bestiary-page--placeholder";
    wrapper.tabIndex = 0;
    wrapper.style.setProperty("--bestiary-flip", "0deg");
    wrapper.style.setProperty("--bestiary-shadow", "0");
    wrapper.style.setProperty("--bestiary-origin", "right");

    const title = toNonEmptyString(model && model.title) || "Monster";
    const summary = toNonEmptyString(model && model.summary);
    const chapter = toNonEmptyString(model && model.chapterName);
    const total = Number(model && model.totalMonsters) || 0;
    const index = Number(model && model.monsterIndex) || 0;

    wrapper.innerHTML = `
      <div class="bestiary-page-inner">
        <section class="bestiary-page-placeholder" aria-label="Monsterseite wird geladen">
          <div class="bestiary-page-placeholder-kicker">
            ${chapter ? `<span>${app.escapeHtml(chapter)}</span>` : ""}
            ${index && total ? `<span>Seite ${app.escapeHtml(String(index))} / ${app.escapeHtml(String(total))}</span>` : ""}
          </div>
          <h3 class="bestiary-page-placeholder-title">${app.escapeHtml(title)}</h3>
          ${
            summary
              ? `<p class="bestiary-page-placeholder-summary">${app.escapeHtml(summary)}</p>`
              : `<p class="bestiary-page-placeholder-summary">Diese Seite wird geladen, sobald du näher heranscrollst.</p>`
          }
          <div class="bestiary-page-placeholder-lines" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
      </div>
    `;

    wrapper.setAttribute(
      "aria-label",
      index && total ? `Monster ${index} von ${total}: ${title}` : `Monsterseite ${title}`
    );

    return wrapper;
  }

  function buildBookPageFromModel(model, full) {
    const page = full && model && typeof model.render === "function" ? model.render() : buildPlaceholderPage(model);
    return applyPageModelMetadata(page, model, full ? "full" : "placeholder");
  }

  function syncBestiaryActiveState(activeMonsterId) {
    const dom = getDom();
    const activeId = toNonEmptyString(activeMonsterId);

    if (dom.bestiaryTocList) {
      dom.bestiaryTocList.querySelectorAll(".bestiary-toc-item").forEach((item) => {
        const isActive = activeId && item.getAttribute("data-monster-id") === activeId;
        item.classList.toggle("is-active", !!isActive);
        item.setAttribute("aria-current", isActive ? "true" : "false");
      });
    }

    if (dom.bestiaryBook) {
      dom.bestiaryBook.querySelectorAll(".bestiary-list-card").forEach((card) => {
        const isActive = activeId && card.getAttribute("data-monster-id") === activeId;
        card.classList.toggle("is-active", !!isActive);
        card.setAttribute("aria-current", isActive ? "true" : "false");
      });

      dom.bestiaryBook.querySelectorAll('.bestiary-page[data-page-type="monster"]').forEach((page) => {
        const isActive = activeId && page.getAttribute("data-monster-id") === activeId;
        page.classList.toggle("is-active", !!isActive);
        page.setAttribute("aria-current", isActive ? "page" : "false");
      });
    }
  }

  function hydrateBookWindow(centerPageIndex) {
    const dom = getDom();
    const models = Array.isArray(ui.bestiary._pageModels) ? ui.bestiary._pageModels : [];
    if (!ui.bestiary._windowedPages || !dom.bestiaryBook || !models.length) return false;

    const { start, end } = getBookWindowRange(centerPageIndex, models.length);
    const pages = Array.from(dom.bestiaryBook.querySelectorAll(".bestiary-page"));
    let changed = false;

    for (let i = start; i <= end; i += 1) {
      const model = models[i];
      const current = pages[i];
      if (!model || !current) continue;
      if (current.dataset.renderState === "full") continue;

      const next = buildBookPageFromModel(model, true);
      if (current.classList.contains("is-active")) next.classList.add("is-active");
      current.replaceWith(next);
      changed = true;
    }

    if (changed) syncBestiaryActiveState(ui.bestiary.activeId);
    return changed;
  }

  function ensureBookWindowForMonsterId(monsterId) {
    const id = toNonEmptyString(monsterId);
    if (!id) return false;
    const pageIndex = ui.bestiary._pageIndexByMonsterId ? ui.bestiary._pageIndexByMonsterId[id] : null;
    if (!Number.isFinite(pageIndex)) return false;
    return hydrateBookWindow(pageIndex);
  }

  function maybeHydrateNearestBookPage() {
    const dom = getDom();
    if (!ui.bestiary._windowedPages || !dom.bestiaryBook || getBestiaryMode() !== "book") return false;

    const pages = Array.from(dom.bestiaryBook.querySelectorAll(".bestiary-page"));
    if (!pages.length) return false;

    const boxWidth = Math.max(1, dom.bestiaryBook.clientWidth);
    const cx = dom.bestiaryBook.scrollLeft + boxWidth * 0.5;
    let bestIndex = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    pages.forEach((page) => {
      const pageIndex = parseInt(page.dataset.pageIndex || "", 10);
      if (!Number.isFinite(pageIndex)) return;

      const px = (page.offsetLeft || 0) + (page.offsetWidth || 0) * 0.5;
      const dist = Math.abs(px - cx);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = pageIndex;
      }
    });

    return hydrateBookWindow(bestIndex);
  }

  function updateModeUi() {
    const dom = getDom();
    const mode = getBestiaryMode();
    const rootApp = (app.dom && app.dom.app) || document.querySelector(".app");

    if (dom.bestiaryView) dom.bestiaryView.dataset.bestiaryMode = mode;
    if (rootApp) {
      rootApp.classList.toggle("bestiary-detail-open", mode === "detail" && !!(dom.bestiaryView && !dom.bestiaryView.hidden));
      rootApp.classList.toggle("bestiary-list-open", mode === "list" && !!(dom.bestiaryView && !dom.bestiaryView.hidden));
    }
    if (dom.bestiaryBook) {
      dom.bestiaryBook.classList.toggle("bestiary-book--list-mode", mode === "list");
      dom.bestiaryBook.classList.toggle("bestiary-book--detail-mode", mode === "detail");
    }
    if (dom.bestiaryModeList) {
      const active = mode === "list";
      dom.bestiaryModeList.classList.toggle("is-active", active);
      dom.bestiaryModeList.setAttribute("aria-pressed", active ? "true" : "false");
    }
    if (dom.bestiaryModeDetail) {
      const active = mode === "detail";
      dom.bestiaryModeDetail.classList.toggle("is-active", active);
      dom.bestiaryModeDetail.setAttribute("aria-pressed", active ? "true" : "false");
    }
    if (dom.bestiaryFilterButton) {
      dom.bestiaryFilterButton.setAttribute("aria-pressed", ui.bestiary.filtersOpen ? "true" : "false");
    }
    if (dom.bestiaryFilterSummary) {
      dom.bestiaryFilterSummary.classList.toggle("is-open", ui.bestiary.filtersOpen);
    }
  }

  function setBestiaryMode(mode) {
    const next = mode === "detail" ? "detail" : "list";
    if (ui.bestiary.mode === next) return;
    ui.bestiary.mode = next;
    ui.bestiary._lastRenderKey = "";
    updateModeUi();
    callIfFn(app.renderBestiary);
  }

  function syncBestiaryModeFromRoute() {
    const hash = String(window.location.hash || "").trim();
    const next = /^#monster-/.test(hash) ? "detail" : "list";
    if (ui.bestiary.mode !== next) {
      ui.bestiary.mode = next;
      ui.bestiary._lastRenderKey = "";
    }
    return next;
  }

  function setMetaText(text) {
    const dom = getDom();
    if (!dom.bestiaryMeta) return;
    dom.bestiaryMeta.textContent = text || "";
  }

  function setPositionText(text) {
    const dom = getDom();
    if (!dom.bestiaryPositionChip) return;
    dom.bestiaryPositionChip.textContent = text || "Liste";
  }

  function clearBestiarySearch() {
    ui.bestiary.query = "";
    const dom = getDom();
    if (dom.bestiarySearch) dom.bestiarySearch.value = "";
  }

  function resetBestiaryFilters() {
    const filters = getBestiaryFilters();
    filters.chapterId = "";
    filters.habitat = "";
    filters.type = "";
    filters.dangerTag = "";
    filters.knowledge = "";
  }

  function createBestiaryEmptyState(options) {
    const opts = options && typeof options === "object" ? options : {};
    const icon = toNonEmptyString(opts.icon) || "📁";
    const title = toNonEmptyString(opts.title) || "Nichts gefunden";
    const text = toNonEmptyString(opts.text);
    const note = toNonEmptyString(opts.note);
    const actions = Array.isArray(opts.actions) ? opts.actions : [];

    const section = document.createElement("section");
    section.className = "bestiary-empty-state empty-state";
    section.innerHTML = `
      <div class="bestiary-empty-state-mark" aria-hidden="true">${app.escapeHtml(icon)}</div>
      <div class="bestiary-empty-state-copy">
        <h4 class="bestiary-empty-state-title">${app.escapeHtml(title)}</h4>
        ${text ? `<p class="bestiary-empty-state-text">${app.escapeHtml(text)}</p>` : ""}
        ${note ? `<p class="bestiary-empty-state-note">${app.escapeHtml(note)}</p>` : ""}
      </div>
      ${
        actions.length
          ? `
            <div class="bestiary-empty-state-actions">
              ${actions
                .map((action) => {
                  const id = toNonEmptyString(action && action.id);
                  const label = toNonEmptyString(action && action.label);
                  if (!id || !label) return "";
                  return `
                    <button type="button" class="filter-chip bestiary-empty-state-button" data-empty-action="${app.escapeHtml(id)}">
                      ${app.escapeHtml(label)}
                    </button>
                  `;
                })
                .join("")}
            </div>
          `
          : ""
      }
    `;
    return section;
  }

  function applyBestiaryStage(root, selector, startIndex) {
    const host = root && root.querySelectorAll ? root : null;
    if (!host || !selector) return;
    const base = Number.isFinite(startIndex) ? startIndex : 0;
    Array.from(host.querySelectorAll(selector)).forEach((node, index) => {
      if (!node || !node.style) return;
      node.style.setProperty("--bestiary-stagger", String(base + index));
    });
  }

  function renderTextBlocks(raw) {
    const text = toNonEmptyString(raw);
    if (!text) return "";

    const escaped = app.escapeHtml(text);

    const parts = escaped
      .split(/\n\s*\n/g)
      .map((p) => p.trim())
      .filter(Boolean);

    if (!parts.length) return "";

    return parts.map((p) => `<p class="bestiary-paragraph">${p.replace(/\n/g, "<br />")}</p>`).join("");
  }

  function splitPreviewAndRest(raw, opts) {
    const text = toNonEmptyString(raw);
    const options = opts && typeof opts === "object" ? opts : {};
    const minCharsForFold = typeof options.minCharsForFold === "number" ? options.minCharsForFold : 700;

    if (!text) return { preview: "", rest: "" };

    const paras = text
      .split(/\n\s*\n/g)
      .map((p) => p.trim())
      .filter(Boolean);

    if (text.length < minCharsForFold && paras.length <= 2) {
      return { preview: text, rest: "" };
    }

    let preview = paras[0] || text;
    let startIndex = 1;

    if (preview.length < 220 && paras.length > 1) {
      preview = preview + "\n\n" + paras[1];
      startIndex = 2;
    }

    const rest = paras.slice(startIndex).join("\n\n");
    if (!rest.trim()) return { preview: text, rest: "" };

    return { preview, rest };
  }

  function getMonsterImages(m) {
    const raw = m && m.images;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map(toNonEmptyString).filter(Boolean);
    const s = toNonEmptyString(raw);
    return s ? [s] : [];
  }

  function buildHeroImageHtml(title, images) {
    if (!images || !images.length || typeof app.buildImageUrl !== "function") return "";

    const first = images[0];
    const src = app.buildImageUrl(first);
    if (!src) return "";

    const alt = `${title}`;
    const caption = toNonEmptyString(first);

    return `
      <figure class="bestiary-hero">
        <div class="bestiary-hero-frame">
          <img
            class="bestiary-hero-image"
            src="${app.escapeHtml(src)}"
            alt="${app.escapeHtml(alt)}"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </div>
        <figcaption class="bestiary-hero-caption">
          <span class="bestiary-hero-caption-kicker">Archivabbildung</span>
          <span class="bestiary-hero-caption-text">${app.escapeHtml(caption || title)}</span>
        </figcaption>
      </figure>
    `;
  }

  function buildGalleryHtml(title, images, monsterId) {
    if (!images || images.length <= 1 || typeof app.buildImageUrl !== "function") return "";

    const rest = images.slice(1);
    const cards = rest
      .map((raw) => {
        const src = app.buildImageUrl(raw);
        if (!src) return "";
        const alt = `${title} – ${raw}`;
        return `
          <figure class="bestiary-image-card">
            <img
              class="bestiary-image"
              src="${app.escapeHtml(src)}"
              alt="${app.escapeHtml(alt)}"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
            <figcaption class="bestiary-image-caption">${app.escapeHtml(raw)}</figcaption>
          </figure>
        `;
      })
      .filter(Boolean)
      .join("");

    if (!cards) return "";

    return buildDetailsSectionHtml({
      title: "Bilder",
      className: "bestiary-details--images",
      countLabel: String(rest.length),
      monsterId,
      stateKey: "images",
      bodyHtml: `
        <section class="bestiary-images">
          <div class="bestiary-images-grid">${cards}</div>
        </section>
      `,
    });
  }

  // -----------------------------
  // Quickfacts / Structured Blocks
  // -----------------------------
  function pickFirst(m, keys) {
    for (const k of keys) {
      const v = m && m[k];
      const s = toNonEmptyString(v);
      if (s) return s;
    }
    return "";
  }

  function getMonsterType(monster) {
    return pickFirst(monster, ["type", "kind", "creatureType"]);
  }

  function getMonsterCr(monster) {
    return pickFirst(monster, ["cr", "challenge", "challengeRating"]);
  }

  function getMonsterDangerTags(monster) {
    return normalizeStringOrArray(monster && monster.dangerTags);
  }

  function getMonsterDangerTone(monster) {
    const tags = getMonsterDangerTags(monster).map(norm);
    if (!tags.length) return "standard";
    if (tags.some((tag) => /boss|legend|myth|uralt|prime|erz/.test(tag))) return "high";
    if (tags.some((tag) => /nekrot|untot|dämon|fiend|horror|blight|fluch/.test(tag))) return "blight";
    if (tags.some((tag) => /arkan|mag|rune|psion|void|astral/.test(tag))) return "arcane";
    if (tags.some((tag) => /alpha|jagd|rudel|bestie|elite|wild/.test(tag))) return "hunt";
    return "standard";
  }

  function getMonsterDangerLabel(monster) {
    switch (getMonsterDangerTone(monster)) {
      case "high":
        return "Warnstufe";
      case "blight":
        return "Verderbnis";
      case "arcane":
        return "Arkane Gefahr";
      case "hunt":
        return "Jagdprofil";
      default:
        return "Gefahrenstufe";
    }
  }

  function getMonsterTraceTags(monster) {
    const directTags = Array.isArray(monster && monster.tags) ? monster.tags : [];
    const fallbackTags = getMonsterDangerTags(monster);
    const source = directTags.length ? directTags : fallbackTags;
    const seen = new Set();
    return source
      .map(toNonEmptyString)
      .filter(Boolean)
      .filter((tag) => {
        const key = norm(tag);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 3);
  }

  function getMonsterVisibility(monster) {
    const source =
      monster && typeof monster === "object"
        ? monster.visibility && typeof monster.visibility === "object"
          ? monster.visibility
          : monster.fieldVisibility && typeof monster.fieldVisibility === "object"
          ? monster.fieldVisibility
          : monster.visibilityMap && typeof monster.visibilityMap === "object"
          ? monster.visibilityMap
          : {}
        : {};

    return {
      visible: !(monster && monster.visible === false),
      title: source.title !== false,
      summary: source.summary !== false,
      images: source.images !== false,
      meta: source.meta !== false,
      body: source.body !== false,
      fieldNote: source.fieldNote !== false,
      traceTags: source.traceTags !== false,
      warningSigns: source.warningSigns !== false,
      behavior: source.behavior !== false,
      tactics: source.tactics !== false,
      lastSighting: source.lastSighting !== false,
      statblock: source.statblock !== false,
      actions: source.actions !== false,
      harvest: source.harvest !== false,
      notes: source.notes !== false,
      extras: source.extras !== false,
      links: source.links !== false,
    };
  }

  function hasMonsterRevealValue(monster, key) {
    const m = monster || {};
    switch (key) {
      case "title":
        return !!toNonEmptyString(m.title);
      case "summary":
        return !!toNonEmptyString(m.summary);
      case "images":
        return getMonsterImages(m).length > 0;
      case "meta":
        return !![
          getMonsterType(m),
          pickFirst(m, ["size"]),
          getMonsterCr(m),
          getMonsterHabitatLabel(m),
          getMonsterThreatClass(m),
          pickFirst(m, ["status", "state", "condition"]),
        ].filter(Boolean).length;
      case "body":
        return !!toNonEmptyString(m.body);
      case "fieldNote":
        return !!toNonEmptyString(getMonsterFieldNote(m));
      case "traceTags":
        return getMonsterTraceDetails(m).length > 0;
      case "warningSigns":
        return getMonsterWarningSigns(m).length > 0;
      case "behavior":
        return !!toNonEmptyString(getMonsterBehavior(m));
      case "tactics":
        return !!toNonEmptyString(getMonsterTactics(m));
      case "lastSighting":
        return !!toNonEmptyString(getMonsterLastSighting(m));
      case "statblock":
        return !!buildStatblockHtml(m);
      case "actions":
        return !!buildActionsHtml(m);
      case "harvest":
        return Array.isArray(m.harvest) && m.harvest.length > 0;
      case "notes":
        return !!buildNotesHtml(m);
      case "extras":
        return !!(m.extras && ((typeof m.extras === "object" && Object.keys(m.extras).length) || typeof m.extras !== "object"));
      case "links":
        return Array.isArray(m.relatedEntryIds) && m.relatedEntryIds.some((item) => !!toNonEmptyString(item));
      default:
        return false;
    }
  }

  function isMonsterFieldVisible(monster, key) {
    const visibility = getMonsterVisibility(monster);
    return visibility.visible !== false && visibility[key] !== false;
  }

  function getMonsterHiddenInfoHtml(text) {
    return `<div class="bestiary-locked-copy">${app.escapeHtml(text || "Dir fehlt noch Wissen, um diesen Abschnitt freizuschalten.")}</div>`;
  }

  function getMonsterMaskedTitle(monster) {
    if (!isMonsterFieldVisible(monster, "title")) return "Versiegelte Jagdakte";
    return toNonEmptyString(monster && monster.title) || "Monster";
  }

  function getMonsterKnowledgeFallback(monster) {
    const visibility = getMonsterVisibility(monster);
    if (!visibility.visible || !visibility.title) return "unknown";

    const keys = [
      "summary",
      "images",
      "meta",
      "body",
      "fieldNote",
      "traceTags",
      "warningSigns",
      "behavior",
      "tactics",
      "lastSighting",
      "statblock",
      "actions",
      "harvest",
      "notes",
      "extras",
      "links",
    ];

    let visibleCount = 0;
    let hiddenCount = 0;
    keys.forEach((key) => {
      if (!hasMonsterRevealValue(monster, key)) return;
      if (visibility[key] === false) hiddenCount += 1;
      else visibleCount += 1;
    });

    if (!visibleCount) return "unknown";
    if (hiddenCount) return "partial";
    return "researched";
  }

  function getMonsterKnowledgeLabel(stateValue) {
    if (stateValue === "partial") return "Teilweise bekannt";
    if (stateValue === "researched") return "Erforscht";
    return "Unbekannt";
  }

  function getMonsterFavoriteLabel(isFavorite) {
    return isFavorite ? "Favorit" : "Nicht favorisiert";
  }

  function getRelativeRecentLabel(monsterId) {
    if (!monsterId || typeof app.getBestiaryRecentMonsterIds !== "function") return "";
    const recent = app.getBestiaryRecentMonsterIds(12);
    const index = recent.indexOf(monsterId);
    if (index === -1) return "";
    if (index === 0) return "Zuletzt angesehen";
    return `Kürzlich angesehen (${index + 1})`;
  }

  function getMonsterShareUrl(monsterId) {
    const hash =
      typeof app.getBestiaryMonsterRouteHash === "function"
        ? app.getBestiaryMonsterRouteHash(monsterId)
        : `#monster-${encodeURIComponent(monsterId)}`;

    try {
      return new URL(hash, window.location.href).toString();
    } catch {
      const base = String(window.location.href || "").split("#")[0];
      return base + hash;
    }
  }

  function getMonsterShareState(monsterId) {
    const sid = toNonEmptyString(monsterId);
    if (!sid) return "";
    return toNonEmptyString(ui.bestiary.shareState && ui.bestiary.shareState[sid]);
  }

  function setMonsterShareState(monsterId, text) {
    const sid = toNonEmptyString(monsterId);
    if (!sid) return;
    if (!ui.bestiary.shareState || typeof ui.bestiary.shareState !== "object") {
      ui.bestiary.shareState = {};
    }
    const value = toNonEmptyString(text);
    if (value) ui.bestiary.shareState[sid] = value;
    else delete ui.bestiary.shareState[sid];
  }

  function scheduleMonsterShareStateReset(monsterId) {
    window.setTimeout(() => {
      if (getMonsterShareState(monsterId)) {
        setMonsterShareState(monsterId, "");
        ui.bestiary._lastRenderKey = "";
        callIfFn(app.renderBestiary);
      }
    }, 1800);
  }

  function requestBestiaryRefresh() {
    ui.bestiary._lastRenderKey = "";
    callIfFn(app.renderBestiary);
  }

  function makeHarvestSelectionKey(dc, yieldName) {
    return `${String(dc)}::${toNonEmptyString(yieldName)}`;
  }

  function getMonsterHarvestSelections(monsterId) {
    const sid = toNonEmptyString(monsterId);
    if (!sid) return [];
    const raw = ui.bestiary.harvestSelections && ui.bestiary.harvestSelections[sid];
    return Array.isArray(raw) ? raw.slice() : [];
  }

  function isHarvestSelected(monsterId, dc, yieldName) {
    const key = makeHarvestSelectionKey(dc, yieldName);
    return getMonsterHarvestSelections(monsterId).includes(key);
  }

  function toggleHarvestSelection(monsterId, dc, yieldName) {
    const sid = toNonEmptyString(monsterId);
    if (!sid) return [];
    if (!ui.bestiary.harvestSelections || typeof ui.bestiary.harvestSelections !== "object") {
      ui.bestiary.harvestSelections = {};
    }

    const key = makeHarvestSelectionKey(dc, yieldName);
    const prev = getMonsterHarvestSelections(sid);
    const has = prev.includes(key);
    const next = has ? prev.filter((item) => item !== key) : prev.concat(key);
    ui.bestiary.harvestSelections[sid] = next;
    return next.slice();
  }

  function matchesFilters(monster, filters) {
    const active = filters || getBestiaryFilters();

    if (active.chapterId && toNonEmptyString(monster && monster.chapterId) !== active.chapterId) return false;
    if (active.habitat && norm(getMonsterHabitatLabel(monster)) !== norm(active.habitat)) return false;
    if (active.type && norm(getMonsterType(monster)) !== norm(active.type)) return false;

    if (active.dangerTag) {
      const tags = getMonsterDangerTags(monster).map(norm);
      if (!tags.includes(norm(active.dangerTag))) return false;
    }

    if (active.knowledge) {
      const monsterId = getMonsterId(monster, typeof (monster && monster._index) === "number" ? monster._index : 0);
      const knowledge =
        typeof app.getBestiaryKnowledgeState === "function"
          ? app.getBestiaryKnowledgeState(monsterId, getMonsterKnowledgeFallback(monster))
          : getMonsterKnowledgeFallback(monster);
      if (norm(knowledge) !== norm(active.knowledge)) return false;
    }

    return true;
  }

  function buildQuickfactsHtml(m, opts) {
    const options = opts && typeof opts === "object" ? opts : {};
    const omit = new Set(normalizeStringOrArray(options.omit).map(norm));
    if (!isMonsterFieldVisible(m, "meta")) {
      if (options.allowHiddenPlaceholder === false) return "";
      return `
        <section class="bestiary-section bestiary-section--quickfacts" aria-label="Kurzwerte">
          ${getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um den Steckbrief dieser Kreatur freizuschalten.")}
        </section>
      `;
    }
    const facts = [];

    const type = getMonsterType(m);
    const size = pickFirst(m, ["size"]);
    const cr = getMonsterCr(m);
    const ac = pickFirst(m, ["ac", "armorClass"]);
    const hp = pickFirst(m, ["hp", "hitPoints"]);
    const speed = pickFirst(m, ["speed", "movement"]);
    const alignment = pickFirst(m, ["alignment"]);
    const habitat = pickFirst(m, ["habitat", "environment", "biome"]);
    const threatClass = getMonsterThreatClass(m);
    const status = pickFirst(m, ["status", "state", "condition"]);
    const discoveryStatus = getMonsterKnowledgeLabel(getMonsterKnowledgeFallback(m));
    const dangerTags = getMonsterDangerTags(m);

    if (type && !omit.has("type")) facts.push({ k: "Typ", v: type });
    if (size && !omit.has("size")) facts.push({ k: "Größe", v: size });
    if (cr && !omit.has("cr")) facts.push({ k: "CR", v: cr });
    if (ac && !omit.has("ac")) facts.push({ k: "AC", v: ac });
    if (hp && !omit.has("hp")) facts.push({ k: "HP", v: hp });
    if (speed && !omit.has("speed")) facts.push({ k: "Tempo", v: speed });
    if (alignment && !omit.has("alignment")) facts.push({ k: "Gesinnung", v: alignment });
    if (habitat && !omit.has("habitat")) facts.push({ k: "Habitat", v: habitat });
    if (threatClass && !omit.has("threat") && !omit.has("threatclass")) facts.push({ k: "Bedrohung", v: threatClass });
    if (status && !omit.has("status")) facts.push({ k: "Status", v: status });
    if (discoveryStatus && !omit.has("wissen") && !omit.has("discoverystatus")) {
      facts.push({ k: "Wissen", v: discoveryStatus });
    }

    if (!facts.length && (!dangerTags.length || omit.has("danger"))) return "";

    const rows = facts
      .map((f) => {
        const keyLabel = f.k;
        const factKey = norm(keyLabel);
        const toneClass =
          factKey === "cr" || factKey === "ac" || factKey === "hp" || factKey === "tempo"
            ? " bestiary-quickfact--metric"
            : factKey === "gesinnung"
            ? " bestiary-quickfact--lore"
            : "";
        return `
        <div class="bestiary-quickfact${toneClass}">
          <span class="bestiary-quickfact-key">${app.escapeHtml(keyLabel)}</span>
          <span class="bestiary-quickfact-val">${app.escapeHtml(f.v)}</span>
        </div>
      `;
      })
      .join("");

    return `
      <section class="bestiary-section bestiary-section--quickfacts" aria-label="Kurzwerte">
        <div class="bestiary-quickfacts">
          ${rows}
          ${
            dangerTags.length && !omit.has("danger")
              ? `
                <div class="bestiary-quickfact bestiary-quickfact--wide">
                  <span class="bestiary-quickfact-key">Gefahr</span>
                  <span class="bestiary-quickfact-val">${app.escapeHtml(dangerTags.join(" / "))}</span>
                </div>
              `
              : ""
          }
        </div>
      </section>
    `;
  }

  function buildMonsterShortcutShelf(title, ids) {
    const list = Array.isArray(ids) ? ids : [];
    if (!list.length) return "";

    const buttons = list
      .map((id) => {
        const monster = typeof app.findBestiaryMonsterById === "function" ? app.findBestiaryMonsterById(id) : null;
        if (!monster) return "";
        const label = getMonsterMaskedTitle(monster) || id;
        return `
          <button
            type="button"
            class="filter-chip bestiary-shortcut-chip"
            data-monster-id="${app.escapeHtml(id)}"
          >
            ${app.escapeHtml(label)}
          </button>
        `;
      })
      .filter(Boolean)
      .join("");

    if (!buttons) return "";

    return `
      <section class="bestiary-shortcut-shelf">
        <h4 class="bestiary-shortcut-title">${app.escapeHtml(title)}</h4>
        <div class="bestiary-shortcut-row">${buttons}</div>
      </section>
    `;
  }

  function getPreferredArenaHeroId() {
    const selectedArena =
      state && state.arena && typeof state.arena === "object" ? toNonEmptyString(state.arena.selectedHeroId) : "";
    if (selectedArena) return selectedArena;

    const selectedHero = state ? toNonEmptyString(state.selectedHeroId) : "";
    if (selectedHero) return selectedHero;

    const recognized = typeof app.getRecognizedHero === "function" ? app.getRecognizedHero() : null;
    if (recognized && recognized.id) return toNonEmptyString(recognized.id);

    const heroes = typeof app.getHeroes === "function" ? app.getHeroes() : [];
    const firstVisible = heroes.find((hero) => hero && hero.visible !== false);
    return firstVisible && firstVisible.id ? toNonEmptyString(firstVisible.id) : "";
  }

  function getArenaRouteForMonster(monsterId) {
    const heroId = getPreferredArenaHeroId();
    if (typeof app.getArenaBattleHash === "function") {
      return app.getArenaBattleHash(heroId, monsterId);
    }
    return "#kampfprobe";
  }

  function buildMonsterUtilityBar(monster, monsterId) {
    const favorite = typeof app.isBestiaryFavorite === "function" ? app.isBestiaryFavorite(monsterId) : false;
    const knowledgeState = getMonsterKnowledgeFallback(monster);
    const recentLabel = getRelativeRecentLabel(monsterId);
    const shareLabel = getMonsterShareState(monsterId);
    const combat = monster && monster.combat && typeof monster.combat === "object" ? monster.combat : null;
    const arenaReady = !!(combat && combat.enabled === true && combat.ready === true);

    return `
      <section class="bestiary-monster-tools" aria-label="Monster Aktionen">
        <div class="bestiary-monster-tools-head">
          <span class="bestiary-monster-tools-kicker">Status & Markierungen</span>
          <span class="bestiary-monster-tools-note">Für diese Jagdakte</span>
        </div>
        <div class="bestiary-monster-actions">
          <button
            type="button"
            class="filter-chip bestiary-action-button ${favorite ? "is-active" : ""}"
            data-action="toggle-favorite"
            data-monster-id="${app.escapeHtml(monsterId)}"
            aria-pressed="${favorite ? "true" : "false"}"
          >
            ${favorite ? "Favorit" : "Favorisieren"}
          </button>
          <button
            type="button"
            class="filter-chip bestiary-action-button"
            data-action="share-monster"
            data-monster-id="${app.escapeHtml(monsterId)}"
          >
            Link teilen
          </button>
          <button
            type="button"
            class="filter-chip bestiary-action-button ${arenaReady ? "is-active" : ""}"
            data-action="start-arena"
            data-monster-id="${app.escapeHtml(monsterId)}"
            ${arenaReady ? "" : "disabled"}
          >
            ⚔ Kampfprobe gegen dieses Wesen starten
          </button>
        </div>
        <div class="bestiary-monster-statusline">
          <span class="bestiary-status-pill">${app.escapeHtml(getMonsterKnowledgeLabel(knowledgeState))}</span>
          ${recentLabel ? `<span class="bestiary-status-pill">${app.escapeHtml(recentLabel)}</span>` : ""}
          ${shareLabel ? `<span class="bestiary-status-pill bestiary-status-pill--accent">${app.escapeHtml(shareLabel)}</span>` : ""}
          ${
            !arenaReady
              ? '<span class="bestiary-status-pill">Kampfprofil unvollständig</span>'
              : ""
          }
        </div>
      </section>
    `;
  }

  function buildRecordBlockHtml(title, bodyHtml, className) {
    const label = toNonEmptyString(title);
    const inner = toNonEmptyString(bodyHtml);
    if (!inner) return "";
    return `
      <section class="bestiary-record-block ${className ? app.escapeHtml(className) : ""}">
        ${label ? `<h5 class="bestiary-record-block-title">${app.escapeHtml(label)}</h5>` : ""}
        <div class="bestiary-record-block-body">
          ${inner}
        </div>
      </section>
    `;
  }

  function buildDossierProfileHtml(monster, options) {
    const m = monster || {};
    const opts = options && typeof options === "object" ? options : {};
    const title = isMonsterFieldVisible(m, "title") ? toNonEmptyString(opts.title) || "Monster" : "Versiegelte Jagdakte";
    const chapter = toNonEmptyString(opts.chapter);
    const lastUpdated = toNonEmptyString(opts.lastUpdated);
    const heroHtml = isMonsterFieldVisible(m, "images") ? toNonEmptyString(opts.heroHtml) : "";
    const summary = isMonsterFieldVisible(m, "summary") ? toNonEmptyString(opts.summary) : "";
    const tagsHtml = toNonEmptyString(opts.tagsHtml);

    const danger = getMonsterDangerTags(m);
    const type = getMonsterType(m);
    const size = pickFirst(m, ["size"]);
    const habitat = pickFirst(m, ["habitat", "environment", "biome"]) || chapter;
    const status = pickFirst(m, ["status", "state", "condition"]);
    const discoveryStatus = pickFirst(m, ["discoveryStatus", "knowledgeStatus", "knowledgeLevel", "discovery"]);
    const headerStatus = status || discoveryStatus;
    const dossierKicker = [type, size].filter(Boolean).join(" · ");
    const dangerTone = getMonsterDangerTone(m);
    const dangerLabel = getMonsterDangerLabel(m);

    const metaCards = (isMonsterFieldVisible(m, "meta")
      ? [
          type ? { kind: "type", label: "Typ", value: type } : null,
          size ? { kind: "size", label: "Größe", value: size } : null,
          habitat ? { kind: "habitat", label: "Gebiet", value: habitat } : null,
          headerStatus ? { kind: "status", label: "Status", value: headerStatus } : null,
        ]
      : []
    )
      .filter(Boolean)
      .map(
        (item) => `
          <div class="bestiary-dossier-meta-card bestiary-dossier-meta-card--${app.escapeHtml(item.kind || "default")}">
            <span class="bestiary-dossier-meta-label">${app.escapeHtml(item.label)}</span>
            <span class="bestiary-dossier-meta-value">${app.escapeHtml(item.value)}</span>
          </div>
        `
      )
      .join("");

    const topMeta = [
      `<button type="button" class="filter-chip bestiary-dossier-back" data-action="back-to-list">← Liste</button>`,
      `<span class="bestiary-dossier-stamp">Jagdakte</span>`,
      chapter ? `<span class="bestiary-dossier-topmeta">Gebiet: ${app.escapeHtml(chapter)}</span>` : "",
      lastUpdated ? `<span class="bestiary-dossier-topmeta">Stand: ${app.escapeHtml(lastUpdated)}</span>` : "",
    ]
      .filter(Boolean)
      .join("");

    const dangerHtml = danger.length
      ? `
        <div class="bestiary-dossier-alerts">
          <div class="bestiary-dossier-seal bestiary-dossier-seal--${app.escapeHtml(dangerTone)}">
            <span class="bestiary-dossier-seal-label">${app.escapeHtml(dangerLabel)}</span>
            <strong class="bestiary-dossier-seal-value">${app.escapeHtml(danger.join(" / "))}</strong>
          </div>
        </div>
      `
      : "";

    const mediaHtml = heroHtml
      ? `
        <div class="bestiary-dossier-media">
          <div class="bestiary-dossier-media-note">Illustration aus dem Jagdarchiv</div>
          ${heroHtml}
        </div>
      `
      : `
        <div class="bestiary-dossier-media bestiary-dossier-media--empty" aria-hidden="true">
          <span>${app.escapeHtml(isMonsterFieldVisible(m, "title") ? (title || "?").slice(0, 1).toUpperCase() : "?")}</span>
        </div>
      `;

    return `
      <header class="bestiary-dossier-header">
        <div class="bestiary-dossier-topline">${topMeta}</div>
        <div class="bestiary-dossier-hero">
          ${mediaHtml}
          <div class="bestiary-dossier-copy">
            ${dangerHtml}
            ${isMonsterFieldVisible(m, "meta") && dossierKicker ? `<p class="bestiary-dossier-kicker">${app.escapeHtml(dossierKicker)}</p>` : ""}
            <h3 class="bestiary-dossier-title">${app.escapeHtml(title)}</h3>
            ${
              summary
                ? `<p class="bestiary-dossier-summary">${app.escapeHtml(summary)}</p>`
                : !isMonsterFieldVisible(m, "summary")
                ? getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um die Kurzbeschreibung dieser Akte zu lesen.")
                : ""
            }
            ${isMonsterFieldVisible(m, "summary") ? tagsHtml : ""}
            ${
              metaCards
                ? `<div class="bestiary-dossier-meta-grid">${metaCards}</div>`
                : !isMonsterFieldVisible(m, "meta")
                ? getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um den Steckbrief dieser Kreatur freizuschalten.")
                : ""
            }
          </div>
        </div>
      </header>
    `;
  }

  function buildListCardMediaHtml(monster, title) {
    if (!isMonsterFieldVisible(monster, "images")) {
      return `
        <div class="bestiary-list-card-media bestiary-list-card-media--placeholder" aria-hidden="true">
          <span>?</span>
        </div>
      `;
    }
    const images = getMonsterImages(monster);
    const first = images.length ? images[0] : "";
    const src = first && typeof app.buildImageUrl === "function" ? app.buildImageUrl(first) : "";
    if (src) {
      return `
        <div class="bestiary-list-card-media">
          <img
            class="bestiary-list-card-thumb"
            src="${app.escapeHtml(src)}"
            alt="${app.escapeHtml(title)}"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
        </div>
      `;
    }

    const fallback = (title || "?").slice(0, 1).toUpperCase();
    return `
      <div class="bestiary-list-card-media bestiary-list-card-media--placeholder" aria-hidden="true">
        <span>${app.escapeHtml(fallback)}</span>
      </div>
    `;
  }

  function buildGlossaryLinksHtml(monsterId, selfEntry, relatedEntries) {
    const monster = typeof app.findBestiaryMonsterById === "function" ? app.findBestiaryMonsterById(monsterId) : null;
    if (!isMonsterFieldVisible(monster, "links")) {
      return buildDetailsSectionHtml({
        title: "Glossar-Links",
        className: "bestiary-details--links",
        monsterId,
        stateKey: "links",
        bodyHtml: getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um diese Querverweise freizuschalten."),
      });
    }

    const buttons = [];

    if (selfEntry) {
      buttons.push(`
        <button type="button" class="related-link" data-entry-id="${app.escapeHtml(monsterId)}">
          <span class="related-link-label">Glossar-Eintrag</span>
          <span class="related-link-title">${app.escapeHtml(selfEntry.title || selfEntry.id)}</span>
        </button>
      `);
    }

    (relatedEntries || []).forEach((entry) => {
      if (!entry) return;
      const cat = typeof app.getCategoryById === "function" ? app.getCategoryById(entry.categoryId) : null;
      const kicker = toNonEmptyString(cat && cat.name) || "Verknüpft";
      buttons.push(`
        <button type="button" class="related-link" data-entry-id="${app.escapeHtml(entry.id)}">
          <span class="related-link-label">${app.escapeHtml(kicker)}</span>
          <span class="related-link-title">${app.escapeHtml(entry.title || entry.id)}</span>
        </button>
      `);
    });

    if (!buttons.length) return "";

    return buildDetailsSectionHtml({
      title: "Glossar-Links",
      className: "bestiary-details--links",
      countLabel: String(buttons.length),
      monsterId,
      stateKey: "links",
      bodyHtml: `
        <section class="bestiary-related">
          <div class="bestiary-related-list">${buttons.join("")}</div>
        </section>
      `,
    });
  }

  async function shareMonsterLink(monsterId, title) {
    const sid = toNonEmptyString(monsterId);
    if (!sid) return false;

    const url = getMonsterShareUrl(sid);
    const shareData = { title: toNonEmptyString(title) || "Bestiarium", url };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setMonsterShareState(sid, "Geteilt");
        requestBestiaryRefresh();
        scheduleMonsterShareStateReset(sid);
        return true;
      }
    } catch (error) {
      if (error && error.name === "AbortError") return false;
    }

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(url);
        setMonsterShareState(sid, "Link kopiert");
        requestBestiaryRefresh();
        scheduleMonsterShareStateReset(sid);
        return true;
      }
    } catch {}

    try {
      const input = document.createElement("input");
      input.type = "text";
      input.value = url;
      input.setAttribute("readonly", "readonly");
      input.style.position = "absolute";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setMonsterShareState(sid, "Link kopiert");
      requestBestiaryRefresh();
      scheduleMonsterShareStateReset(sid);
      return true;
    } catch {}

    try {
      window.prompt("Monster-Link", url);
    } catch {}
    setMonsterShareState(sid, "Link bereit");
    requestBestiaryRefresh();
    scheduleMonsterShareStateReset(sid);
    return false;
  }

  function buildDetailsSectionHtml(opts) {
    const title = toNonEmptyString(opts && opts.title);
    const bodyHtml = toNonEmptyString(opts && opts.bodyHtml);
    const className = toNonEmptyString(opts && opts.className);
    const countLabel = toNonEmptyString(opts && opts.countLabel);
    const monsterId = toNonEmptyString(opts && opts.monsterId);
    const stateKey = toNonEmptyString(opts && opts.stateKey);
    const open = getBestiaryDetailState(monsterId, stateKey, !!(opts && opts.open));

    if (!title || !bodyHtml) return "";

    const label = countLabel ? `${title} (${countLabel})` : title;
    const stateAttrs =
      monsterId && stateKey
        ? ` data-monster-id="${app.escapeHtml(monsterId)}" data-detail-key="${app.escapeHtml(stateKey)}"`
        : "";

    return `
      <details class="bestiary-details ${className ? app.escapeHtml(className) : ""}"${stateAttrs} ${open ? "open" : ""}>
        <summary class="bestiary-details-summary">${app.escapeHtml(label)}</summary>
        <div class="bestiary-details-content">
          ${bodyHtml}
        </div>
      </details>
    `;
  }

  function normalizeStringOrArray(v) {
    if (!v) return [];
    if (Array.isArray(v)) return v.map(toNonEmptyString).filter(Boolean);
    const s = toNonEmptyString(v);
    if (!s) return [];
    if (s.includes("\n")) return s.split(/\n+/g).map(toNonEmptyString).filter(Boolean);
    if (s.includes(";")) return s.split(/\s*;\s*/g).map(toNonEmptyString).filter(Boolean);
    return [s];
  }

  function buildListHtml(items, cls) {
    const arr = (items || []).map(toNonEmptyString).filter(Boolean);
    if (!arr.length) return "";
    return `
      <ul class="${app.escapeHtml(cls || "bestiary-list")}">
        ${arr.map((x) => `<li>${app.escapeHtml(x)}</li>`).join("")}
      </ul>
    `;
  }

  function buildStatblockHtml(m) {
    const raw = (m && (m.statblock || m.statBlock || m.stats || m.attributes || m.values)) || null;
    if (!raw) return "";

    if (typeof raw === "string") {
      const html = renderTextBlocks(raw);
      return html ? `<section class="bestiary-statblock">${html}</section>` : "";
    }

    if (Array.isArray(raw)) {
      const kv = raw
        .map((x) => {
          if (!x) return null;
          if (typeof x === "string") return { k: "", v: x };
          const k = toNonEmptyString(x.k || x.key || x.name || "");
          const v = toNonEmptyString(x.v || x.val || x.value || x.text || "");
          if (!k && !v) return null;
          return { k, v };
        })
        .filter(Boolean);

      if (!kv.length) return "";

      const keyedCount = kv.filter((x) => x.k).length;
      if (keyedCount === 0) {
        return `<section class="bestiary-statblock">${buildListHtml(kv.map((x) => x.v), "bestiary-statblock-list")}</section>`;
      }

      const dl = kv
        .map((x) => {
          const k = x.k ? `<dt>${app.escapeHtml(x.k)}</dt>` : `<dt class="sr-only">Wert</dt>`;
          const v = x.v ? `<dd>${app.escapeHtml(x.v)}</dd>` : `<dd></dd>`;
          return `${k}${v}`;
        })
        .join("");

      return dl ? `<dl class="bestiary-statblock-dl">${dl}</dl>` : "";
    }

    if (raw && typeof raw === "object") {
      const entries = Object.keys(raw)
        .map((k) => {
          const key = toNonEmptyString(k);
          const val = raw[k];
          const s = Array.isArray(val)
            ? val.map(toNonEmptyString).filter(Boolean).join(", ")
            : toNonEmptyString(val);
          if (!key || !s) return null;
          return { k: key, v: s };
        })
        .filter(Boolean);

      if (!entries.length) return "";

      const dl = entries.map((e) => `<dt>${app.escapeHtml(e.k)}</dt><dd>${app.escapeHtml(e.v)}</dd>`).join("");
      return `<dl class="bestiary-statblock-dl">${dl}</dl>`;
    }

    return "";
  }

  function buildActionsHtml(m) {
    const raw = (m && (m.actions || m.aktionen || m.attacks || m.attacken)) || null;
    if (!raw) return "";

    if (typeof raw === "string") {
      const html = renderTextBlocks(raw);
      return html ? `<section class="bestiary-actions">${html}</section>` : "";
    }

    const items = normalizeStringOrArray(raw);
    const list = buildListHtml(items, "bestiary-actions-list");
    return list ? `<section class="bestiary-actions">${list}</section>` : "";
  }

  function buildNotesHtml(m) {
    const raw = (m && (m.notes || m.notizen || m.special || m.specials)) || "";
    const html = renderTextBlocks(raw);
    return html ? `<section class="bestiary-notes">${html}</section>` : "";
  }

  function getMonsterThreatClass(m) {
    return pickFirst(m, ["threatClass", "dangerClass", "dangerLevel", "threatLevel"]);
  }

  function getMonsterFieldNote(m) {
    return pickFirst(m, ["fieldNote", "fieldnote", "quote", "fieldQuote", "quoteText"]);
  }

  function getMonsterBehavior(m) {
    return pickFirst(m, ["behavior", "verhalten"]);
  }

  function getMonsterTactics(m) {
    return pickFirst(m, ["tactics", "strategy", "taktik", "recommendedTactic"]);
  }

  function getMonsterLastSighting(m) {
    return pickFirst(m, ["lastSighting", "lastSeen", "sighting", "recentSighting"]);
  }

  function getMonsterTraceDetails(m) {
    const explicit = normalizeStringOrArray(m && (m.traceTags != null ? m.traceTags : m.traces));
    return explicit.length ? explicit : getMonsterTraceTags(m);
  }

  function getMonsterWarningSigns(m) {
    return normalizeStringOrArray(m && (m.warningSigns != null ? m.warningSigns : m.warnings != null ? m.warnings : m.warnSigns));
  }

  function buildSignalChipsHtml(items, className) {
    const chips = (items || [])
      .map(toNonEmptyString)
      .filter(Boolean)
      .map(
        (item) =>
          `<span class="${app.escapeHtml(className || "bestiary-signal-chip")}">${app.escapeHtml(item)}</span>`
      )
      .join("");
    return chips ? `<div class="bestiary-signal-chips">${chips}</div>` : "";
  }

  function buildDossierSignalsHtml(m) {
    const visibility = getMonsterVisibility(m);
    const fieldNote = getMonsterFieldNote(m);
    const lastSighting = getMonsterLastSighting(m);
    const threatClass = getMonsterThreatClass(m);

    const cards = [];

    if (fieldNote && visibility.fieldNote !== false && visibility.visible !== false) {
      const noteHtml = renderTextBlocks(fieldNote);
      if (noteHtml) {
        cards.push(`
          <section class="bestiary-dossier-signal bestiary-dossier-signal--quote">
            <div class="bestiary-dossier-signal-kicker">Feldnotiz</div>
            <div class="bestiary-dossier-signal-body">${noteHtml}</div>
          </section>
        `);
      }
    } else if (fieldNote) {
      cards.push(`
        <section class="bestiary-dossier-signal bestiary-dossier-signal--quote bestiary-dossier-signal--locked">
          <div class="bestiary-dossier-signal-kicker">Feldnotiz</div>
          ${getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um diese Feldnotiz freizuschalten.")}
        </section>
      `);
    }

    if (lastSighting && visibility.lastSighting !== false && visibility.visible !== false) {
      cards.push(`
        <section class="bestiary-dossier-signal bestiary-dossier-signal--sighting">
          <div class="bestiary-dossier-signal-kicker">Zuletzt gesichtet</div>
          <div class="bestiary-dossier-signal-value">${app.escapeHtml(lastSighting)}</div>
        </section>
      `);
    } else if (lastSighting) {
      cards.push(`
        <section class="bestiary-dossier-signal bestiary-dossier-signal--sighting bestiary-dossier-signal--locked">
          <div class="bestiary-dossier-signal-kicker">Zuletzt gesichtet</div>
          ${getMonsterHiddenInfoHtml("Der letzte Sichtungsort ist noch verborgen.")}
        </section>
      `);
    }

    if (threatClass && visibility.meta !== false && visibility.visible !== false) {
      cards.push(`
        <section class="bestiary-dossier-signal bestiary-dossier-signal--threat">
          <div class="bestiary-dossier-signal-kicker">Bedrohungsklasse</div>
          <div class="bestiary-dossier-signal-value">${app.escapeHtml(threatClass)}</div>
        </section>
      `);
    } else if (threatClass) {
      cards.push(`
        <section class="bestiary-dossier-signal bestiary-dossier-signal--threat bestiary-dossier-signal--locked">
          <div class="bestiary-dossier-signal-kicker">Bedrohungsklasse</div>
          ${getMonsterHiddenInfoHtml("Diese Einordnung ist noch nicht freigeschaltet.")}
        </section>
      `);
    }

    if (!cards.length) return "";

    return `
      <section class="bestiary-dossier-signals" aria-label="Jagdnotizen">
        ${cards.join("")}
      </section>
    `;
  }

  function buildLoreListDetailsHtml(opts) {
    const options = opts && typeof opts === "object" ? opts : {};
    const items = Array.isArray(options.items) ? options.items.map(toNonEmptyString).filter(Boolean) : [];
    if (!items.length) return "";

    const chipClass = toNonEmptyString(options.chipClass);
    const listHtml = chipClass
      ? buildSignalChipsHtml(items, chipClass)
      : buildListHtml(items, toNonEmptyString(options.listClass) || "bestiary-list");

    if (!listHtml) return "";

    return buildDetailsSectionHtml({
      title: toNonEmptyString(options.title),
      className: toNonEmptyString(options.className),
      countLabel: String(items.length),
      monsterId: toNonEmptyString(options.monsterId),
      stateKey: toNonEmptyString(options.stateKey),
      bodyHtml: `<section class="bestiary-dossier-lorelist">${listHtml}</section>`,
    });
  }

  // -----------------------------
  // Extras (NEU) – Anzeige für alle zusätzlichen Felder aus data.js
  // -----------------------------
  const EXTRAS_KEY_BLACKLIST = new Set([
    "_index",
    "_fromEntry",
    "_bestiaryId",
  ]);

  function isEmptyValue(v) {
    if (v == null) return true;
    if (typeof v === "string") return v.trim() === "";
    if (typeof v === "number") return !Number.isFinite(v);
    if (typeof v === "boolean") return false;
    if (Array.isArray(v)) return v.length === 0 || v.every((x) => isEmptyValue(x));
    if (typeof v === "object") {
      const keys = Object.keys(v);
      if (!keys.length) return true;
      return keys.every((k) => isEmptyValue(v[k]));
    }
    return false;
  }

  function looksLikeUrl(s) {
    const t = toNonEmptyString(s);
    if (!t) return false;
    return /^(https?:)?\/\/\S+/i.test(t) || /^mailto:\S+/i.test(t);
  }

  function looksLikeFilePath(s) {
    const t = toNonEmptyString(s);
    if (!t) return false;
    // simple heuristic: has a dot-extension and no spaces
    if (/\s/.test(t)) return false;
    return /\.(pdf|png|jpg|jpeg|webp|gif|txt|md|json|zip)$/i.test(t) || t.includes("/") || t.startsWith("./");
  }

  function safeJsonStringify(value) {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      try {
        return String(value);
      } catch {
        return "";
      }
    }
  }

  function renderExtrasValueHtml(v) {
    if (v == null) return "";

    // primitives
    if (typeof v === "string") {
      const s = v.trim();
      if (!s) return "";
      if (looksLikeUrl(s)) {
        return `<a class="bestiary-link" href="${app.escapeHtml(s)}" target="_blank" rel="noopener noreferrer">${app.escapeHtml(
          s
        )}</a>`;
      }
      if (looksLikeFilePath(s)) {
        // Viele Projekte packen Dateien/Anhänge relativ mit in /assets oder ähnlich.
        // Wir rendern es als Link, damit man es zumindest öffnen kann.
        return `<a class="bestiary-link" href="${app.escapeHtml(s)}" target="_blank" rel="noopener noreferrer">${app.escapeHtml(
          s
        )}</a>`;
      }
      return `<span>${app.escapeHtml(s)}</span>`;
    }

    if (typeof v === "number" || typeof v === "boolean") {
      return `<span>${app.escapeHtml(String(v))}</span>`;
    }

    // arrays
    if (Array.isArray(v)) {
      const items = v
        .map((x) => x)
        .filter((x) => !isEmptyValue(x));

      if (!items.length) return "";

      // If array of primitives -> list; else -> JSON
      const allPrimitive = items.every(
        (x) => x == null || typeof x === "string" || typeof x === "number" || typeof x === "boolean"
      );

      if (allPrimitive) {
        const lis = items
          .map((x) => {
            const html = renderExtrasValueHtml(x);
            return html ? `<li>${html}</li>` : "";
          })
          .filter(Boolean)
          .join("");

        return lis ? `<ul class="bestiary-extras-list">${lis}</ul>` : "";
      }

      const json = safeJsonStringify(items);
      if (!json) return "";
      return `<pre class="bestiary-code">${app.escapeHtml(json)}</pre>`;
    }

    // objects
    if (typeof v === "object") {
      // try: render compact dl if simple object with primitive values
      const keys = Object.keys(v).filter((k) => !EXTRAS_KEY_BLACKLIST.has(k));
      if (!keys.length) return "";

      const allPrimitive = keys.every((k) => {
        const x = v[k];
        return x == null || typeof x === "string" || typeof x === "number" || typeof x === "boolean";
      });

      if (allPrimitive) {
        const dl = keys
          .map((k) => {
            const valHtml = renderExtrasValueHtml(v[k]);
            if (!valHtml) return "";
            return `<dt>${app.escapeHtml(k)}</dt><dd>${valHtml}</dd>`;
          })
          .filter(Boolean)
          .join("");
        return dl ? `<dl class="bestiary-extras-dl">${dl}</dl>` : "";
      }

      const json = safeJsonStringify(v);
      if (!json) return "";
      return `<pre class="bestiary-code">${app.escapeHtml(json)}</pre>`;
    }

    // fallback
    const s = toNonEmptyString(v);
    return s ? `<span>${app.escapeHtml(s)}</span>` : "";
  }

  function buildExtrasDetailsHtml(m, monsterId) {
    const raw = m && m.extras;
    const obj = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : null;
    if (!obj) return "";

    const keys = Object.keys(obj)
      .filter((k) => k && !EXTRAS_KEY_BLACKLIST.has(k) && !k.startsWith("_"))
      .filter((k) => !isEmptyValue(obj[k]))
      .sort((a, b) => a.localeCompare(b, "de", { sensitivity: "base" }));

    if (!keys.length) return "";

    const rows = keys
      .map((k) => {
        const valueHtml = renderExtrasValueHtml(obj[k]);
        if (!valueHtml) return "";
        return `
          <div class="bestiary-extras-row">
            <div class="bestiary-extras-key">${app.escapeHtml(k)}</div>
            <div class="bestiary-extras-val">${valueHtml}</div>
          </div>
        `;
      })
      .filter(Boolean)
      .join("");

    if (!rows) return "";

    return buildDetailsSectionHtml({
      title: "Zusatzinfos",
      className: "bestiary-details--extras",
      countLabel: String(keys.length),
      monsterId,
      stateKey: "extras",
      bodyHtml: `<section class="bestiary-extras"><div class="bestiary-extras-grid">${rows}</div></section>`,
    });
  }

  // -----------------------------
  // Harvest
  // -----------------------------
  function getMonsterHarvest(m) {
    const raw = m && m.harvest;

    if (Array.isArray(raw)) {
      return raw
        .map((row) => {
          const dc = row && row.dc != null ? row.dc : row && row.sg != null ? row.sg : null;
          const yields =
            row && Array.isArray(row.yields) ? row.yields : row && Array.isArray(row.items) ? row.items : null;

          const dcNum = typeof dc === "number" ? dc : parseInt(String(dc || ""), 10);
          const ys = Array.isArray(yields) ? yields.map(toNonEmptyString).filter(Boolean) : [];
          if (!Number.isFinite(dcNum) || dcNum <= 0) return null;
          if (!ys.length) return null;
          return { dc: dcNum, yields: ys };
        })
        .filter(Boolean)
        .sort((a, b) => a.dc - b.dc);
    }

    if (raw && typeof raw === "object" && typeof app.normalizeBestiaryHarvest === "function") {
      return app.normalizeBestiaryHarvest(raw);
    }

    return [];
  }

  function buildHarvestInnerHtml(m, monsterId) {
    const rows = getMonsterHarvest(m);
    if (!rows.length) return "";

    const selectedItems = [];
    rows.forEach((row) => {
      const yields = Array.isArray(row.yields) ? row.yields : [];
      yields.forEach((yieldName) => {
        if (isHarvestSelected(monsterId, row.dc, yieldName)) {
          selectedItems.push({ dc: row.dc, yield: yieldName });
        }
      });
    });

    const totalDc = selectedItems.reduce((sum, item) => sum + item.dc, 0);
    const plannerSummary = `
      <div class="bestiary-harvest-planner">
        <div class="bestiary-harvest-planner-head">
          <div>
            <div class="bestiary-harvest-planner-title">Ernteplanung</div>
            <div class="bestiary-harvest-planner-sub">Wähle Komponenten aus und addiere ihre SG live.</div>
          </div>
          <div class="bestiary-harvest-planner-total">
            <span class="bestiary-pill bestiary-pill--harvest-total">Gesamt SG ${app.escapeHtml(String(totalDc))}</span>
          </div>
        </div>
        <div class="bestiary-harvest-planner-meta">
          <span>${app.escapeHtml(String(selectedItems.length))} Komponenten markiert</span>
          ${
            selectedItems.length
              ? `
                <button
                  type="button"
                  class="filter-chip bestiary-harvest-reset"
                  data-action="clear-harvest-plan"
                  data-monster-id="${app.escapeHtml(monsterId)}"
                >
                  Auswahl löschen
                </button>
              `
              : ""
          }
        </div>
        ${
          selectedItems.length
            ? `
              <div class="bestiary-harvest-selected">
                ${selectedItems
                  .map(
                    (item) => `
                      <span class="bestiary-harvest-selected-item">
                        <span class="bestiary-harvest-selected-name">${app.escapeHtml(item.yield)}</span>
                        <strong class="bestiary-harvest-selected-dc">SG ${app.escapeHtml(String(item.dc))}</strong>
                      </span>
                    `
                  )
                  .join("")}
              </div>
            `
            : ""
        }
      </div>
    `;

    const itemsHtml = rows
      .map((row) => {
        const dc = row.dc;
        const yields = Array.isArray(row.yields) ? row.yields : [];
        if (!dc || !yields.length) return "";
        const rowActive = yields.some((yieldName) => isHarvestSelected(monsterId, dc, yieldName));

        const yieldsHtml = yields
          .map((y) => {
            const active = isHarvestSelected(monsterId, dc, y);
            return `
              <button
                type="button"
                class="bestiary-harvest-choice ${active ? "is-active" : ""}"
                data-action="toggle-harvest-item"
                data-monster-id="${app.escapeHtml(monsterId)}"
                data-harvest-dc="${app.escapeHtml(String(dc))}"
                data-harvest-yield="${app.escapeHtml(y)}"
                aria-pressed="${active ? "true" : "false"}"
              >
                <span class="bestiary-harvest-choice-name">${app.escapeHtml(y)}</span>
                <span class="bestiary-harvest-choice-dc">SG ${app.escapeHtml(String(dc))}</span>
              </button>
            `;
          })
          .join("");

        return `
          <div class="bestiary-harvest-row ${rowActive ? "is-active" : ""}">
            <div class="bestiary-harvest-dc">
              <span class="bestiary-pill bestiary-pill--harvest-dc">SG ${app.escapeHtml(String(dc))}</span>
            </div>
            <div class="bestiary-harvest-yields">
              <div class="bestiary-harvest-choices">${yieldsHtml}</div>
            </div>
          </div>
        `;
      })
      .filter(Boolean)
      .join("");

    if (!itemsHtml) return "";
    return `<div class="bestiary-harvest-table">${plannerSummary}${itemsHtml}</div>`;
  }

  function buildHarvestDetailsHtml(m, monsterId) {
    const inner = buildHarvestInnerHtml(m, monsterId);
    if (!inner) return "";
    return buildDetailsSectionHtml({
      title: "Ernte",
      className: "bestiary-details--harvest",
      monsterId,
      stateKey: "harvest",
      bodyHtml: `<section class="bestiary-harvest">${inner}</section>`,
    });
  }

  // -----------------------------
  // TOC Overlay (fix: Transition + robust focus)
  // -----------------------------
  function isBestiaryTocOpen() {
    const dom = getDom();
    return !!(dom.bestiaryToc && !dom.bestiaryToc.hidden && dom.bestiaryToc.classList.contains("is-open"));
  }

  function openBestiaryToc() {
    const dom = getDom();
    if (!dom.bestiaryToc) return;

    if (ui.bestiary.filtersOpen) {
      ui.bestiary.filtersOpen = false;
      updateModeUi();
      callIfFn(app.renderBestiary);
    }

    // cancel pending close
    if (ui.bestiary._tocCloseTimer) {
      clearTimeout(ui.bestiary._tocCloseTimer);
      ui.bestiary._tocCloseTimer = null;
    }

    // sync input value (falls state schon was hat)
    if (dom.bestiaryTocSearch && dom.bestiaryTocSearch.value !== (ui.bestiary.tocQuery || "")) {
      dom.bestiaryTocSearch.value = ui.bestiary.tocQuery || "";
    }

    ui.bestiary._tocPrevFocus = document.activeElement;

    dom.bestiaryToc.hidden = false;
    dom.bestiaryToc.setAttribute("aria-hidden", "false");

    // Force "from closed -> open" Transition
    dom.bestiaryToc.classList.remove("is-open");
    requestAnimationFrame(() => {
      dom.bestiaryToc.classList.add("is-open");
      ui.bestiary.tocOpen = true;

      requestAnimationFrame(() => {
        const target = dom.bestiaryTocSearch || dom.bestiaryTocPanel;
        if (target && typeof target.focus === "function") {
          try {
            target.focus({ preventScroll: true });
          } catch {
            try {
              target.focus();
            } catch {}
          }
        }
      });
    });
  }

  function closeBestiaryToc() {
    const dom = getDom();
    if (!dom.bestiaryToc) return;
    if (dom.bestiaryToc.hidden) return;

    dom.bestiaryToc.classList.remove("is-open");
    dom.bestiaryToc.setAttribute("aria-hidden", "true");
    ui.bestiary.tocOpen = false;

    const ms = Math.max(240, getMaxTransitionMs(dom.bestiaryTocPanel || dom.bestiaryToc));
    if (ui.bestiary._tocCloseTimer) clearTimeout(ui.bestiary._tocCloseTimer);

    ui.bestiary._tocCloseTimer = setTimeout(() => {
      ui.bestiary._tocCloseTimer = null;
      dom.bestiaryToc.hidden = true;

      // Fokus zurück
      const preferred = dom.bestiaryTocButton || ui.bestiary._tocPrevFocus;
      const el = preferred && typeof preferred.focus === "function" ? preferred : null;
      if (el) {
        try {
          el.focus({ preventScroll: true });
        } catch {
          try {
            el.focus();
          } catch {}
        }
      }
      ui.bestiary._tocPrevFocus = null;
    }, ms);
  }

  function toggleBestiaryToc() {
    if (isBestiaryTocOpen()) closeBestiaryToc();
    else openBestiaryToc();
  }

  function navigateToMonsterRoute(id) {
    const sid = toNonEmptyString(id);
    if (!sid) return;

    if (typeof app.setBestiarySelectedMonsterId === "function") {
      app.setBestiarySelectedMonsterId(sid);
    } else if (state) {
      state.bestiarySelectedMonsterId = sid;
    }

    ui.bestiary.activeId = sid;
    ui.bestiary.mode = "detail";
    callIfFn(app.markBestiaryMonsterViewed, sid);

    const hash =
      typeof app.getBestiaryMonsterRouteHash === "function"
        ? app.getBestiaryMonsterRouteHash(sid)
        : `#monster-${encodeURIComponent(sid)}`;

    if (window.location.hash !== hash) {
      window.location.hash = hash;
      return;
    }

    focusBestiaryMonster(sid, { scroll: true, smooth: !hasReducedMotion(), focus: true });
  }

  // -----------------------------
  // Rendering: Pages
  // -----------------------------
  function buildCoverPage(meta, totalCount) {
    const title = meta && meta.title ? meta.title : "Bestiarium";
    const subtitle = meta && meta.subtitle ? meta.subtitle : "";
    const recentIds = typeof app.getBestiaryRecentMonsterIds === "function" ? app.getBestiaryRecentMonsterIds(4) : [];
    const favoriteIds =
      typeof app.getBestiaryFavoriteMonsterIds === "function" ? app.getBestiaryFavoriteMonsterIds(4) : [];
    const recentHtml = buildMonsterShortcutShelf("Zuletzt angesehen", recentIds);
    const favoriteHtml = buildMonsterShortcutShelf("Favoriten", favoriteIds);

    const wrapper = document.createElement("article");
    wrapper.className = "bestiary-page bestiary-page--cover";
    wrapper.dataset.monsterId = "__cover__";
    wrapper.dataset.pageType = "cover";
    wrapper.tabIndex = 0;
    wrapper.setAttribute("aria-label", `${title} Titelseite`);

    wrapper.style.setProperty("--bestiary-flip", "0deg");
    wrapper.style.setProperty("--bestiary-shadow", "0");
    wrapper.style.setProperty("--bestiary-origin", "right");

    wrapper.innerHTML = `
      <div class="bestiary-page-inner">
        <div class="bestiary-cover">
          <div class="bestiary-cover-badge" aria-hidden="true">🐉</div>
          <h3 class="bestiary-cover-title">${app.escapeHtml(title)}</h3>
          ${subtitle ? `<p class="bestiary-cover-subtitle">${app.escapeHtml(subtitle)}</p>` : ""}
          <p class="bestiary-cover-note">
            Enthält <strong>${app.escapeHtml(String(totalCount))}</strong> Kreaturen.<br/>
            Wische horizontal, um umzublättern oder öffne „Inhalt“.
          </p>
          <div class="bestiary-cover-actions">
            <button type="button" class="filter-chip" data-action="open-toc">Inhalt öffnen</button>
          </div>
          ${recentHtml}
          ${favoriteHtml}
        </div>
      </div>
    `;

    const btn = wrapper.querySelector('[data-action="open-toc"]');
    if (btn) btn.addEventListener("click", () => openBestiaryToc());
    wrapper.querySelectorAll("[data-monster-id]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        navigateToMonsterRoute(button.getAttribute("data-monster-id"));
      });
    });

    return wrapper;
  }

  function buildChapterPage(group, chapterIndex, totalChapters) {
    const title = toNonEmptyString(group && group.name) || `Kapitel ${chapterIndex}`;
    const icon = toNonEmptyString(group && group.icon) || "*";
    const summary = toNonEmptyString(group && group.summary);
    const items = Array.isArray(group && group.items) ? group.items : [];
    const count = items.length;
    const wrapper = document.createElement("article");

    wrapper.className = "bestiary-page bestiary-page--chapter";
    wrapper.dataset.monsterId = `__chapter__${toNonEmptyString(group && group.id) || chapterIndex}`;
    wrapper.dataset.pageType = "chapter";
    wrapper.dataset.chapterName = title;
    wrapper.dataset.chapterIndex = String(chapterIndex);
    wrapper.dataset.chapterCount = String(count);
    wrapper.tabIndex = 0;
    wrapper.setAttribute("aria-label", `${title} Kapitel`);

    wrapper.style.setProperty("--bestiary-flip", "0deg");
    wrapper.style.setProperty("--bestiary-shadow", "0");
    wrapper.style.setProperty("--bestiary-origin", "right");

    wrapper.innerHTML = `
      <div class="bestiary-page-inner">
        <section class="bestiary-chapter">
          <div class="bestiary-chapter-icon" aria-hidden="true">${app.escapeHtml(icon)}</div>
          <p class="bestiary-chapter-overline">Kapitel ${app.escapeHtml(String(chapterIndex))} / ${app.escapeHtml(
      String(totalChapters)
    )}</p>
          <h3 class="bestiary-chapter-title">${app.escapeHtml(title)}</h3>
          ${
            summary
              ? `<p class="bestiary-chapter-summary">${app.escapeHtml(summary)}</p>`
              : `<p class="bestiary-chapter-summary">Direkte Sprünge zu den ersten Kreaturen dieses Kapitels.</p>`
          }
          <div class="bestiary-chapter-meta">
            <span class="bestiary-chapter-count">${app.escapeHtml(String(count))} Monster</span>
          </div>
          <div class="bestiary-chapter-links">
            ${items
              .slice(0, 4)
              .map((monster, index) => {
                const id = getMonsterId(monster, typeof monster._index === "number" ? monster._index : index);
                const monsterTitle = toNonEmptyString(monster && monster.title) || id;
                return `
                  <button type="button" class="filter-chip bestiary-chapter-link" data-monster-id="${app.escapeHtml(id)}">
                    ${app.escapeHtml(monsterTitle)}
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
      </div>
    `;

    wrapper.querySelectorAll("[data-monster-id]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        navigateToMonsterRoute(button.getAttribute("data-monster-id"));
      });
    });

    return wrapper;
  }

  function buildMonsterPage(monster, idx, total) {
    const m = monster || {};
    const id = getMonsterId(m, typeof m._index === "number" ? m._index : idx);
    const visibility = getMonsterVisibility(m);
    const knowledgeState = getMonsterKnowledgeFallback(m);
    const isSealedRecord = !visibility.visible || visibility.title === false;
    const title = getMonsterMaskedTitle(m);
    const summary = isMonsterFieldVisible(m, "summary") ? toNonEmptyString(m.summary) : "";
    const body = isMonsterFieldVisible(m, "body") ? toNonEmptyString(m.body) : "";
    const chapter = toNonEmptyString(m.chapterName) || toNonEmptyString(m.chapterId);
    const lastUpdated = toNonEmptyString(m.lastUpdated);

    const tags = isMonsterFieldVisible(m, "summary")
      ? Array.isArray(m.tags) ? m.tags.map(toNonEmptyString).filter(Boolean) : []
      : [];
    const tagsHtml = tags.length
      ? `<div class="bestiary-tags">${tags.map((t) => `<span class="tag">${app.escapeHtml(t)}</span>`).join("")}</div>`
      : "";

    const images = getMonsterImages(m);
    const heroHtml = buildHeroImageHtml(title, images);
    const galleryHtml = buildGalleryHtml(title, images, id);

    const dossierHeaderHtml = buildDossierProfileHtml(m, {
      title,
      summary,
      chapter,
      lastUpdated,
      heroHtml,
      tagsHtml,
    });
    const quickfactsHtml = buildQuickfactsHtml(m, {
      omit: ["type", "size", "habitat", "status", "wissen", "discoverystatus", "danger"],
    });
    const utilityHtml = buildMonsterUtilityBar(m, id);
    const signalsHtml = buildDossierSignalsHtml(m);

    const descriptionText = body || summary;
    const descriptionHtml = descriptionText ? renderTextBlocks(descriptionText) : "";
    const descriptionDetails = buildDetailsSectionHtml({
      title: "Beschreibung",
      className: "bestiary-details--description",
      bodyHtml:
        visibility.body !== false
          ? descriptionHtml
            ? `<section class="bestiary-description">${descriptionHtml}</section>`
            : ""
          : descriptionText
          ? getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um diese Beschreibung freizuschalten.")
          : "",
      monsterId: id,
      stateKey: "description",
      open: true,
    });
    const traceItems = getMonsterTraceDetails(m);
    const tracesDetails = visibility.traceTags !== false
      ? buildLoreListDetailsHtml({
          title: "Spuren",
          className: "bestiary-details--traces",
          monsterId: id,
          stateKey: "traces",
          items: traceItems,
          chipClass: "bestiary-signal-chip bestiary-signal-chip--trace",
        })
      : traceItems.length
      ? buildDetailsSectionHtml({
          title: "Spuren",
          className: "bestiary-details--traces",
          monsterId: id,
          stateKey: "traces",
          bodyHtml: getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um diese Spuren zu deuten."),
        })
      : "";
    const warningItems = getMonsterWarningSigns(m);
    const warningDetails = visibility.warningSigns !== false
      ? buildLoreListDetailsHtml({
          title: "Warnzeichen",
          className: "bestiary-details--warnings",
          monsterId: id,
          stateKey: "warnings",
          items: warningItems,
          listClass: "bestiary-warning-list",
        })
      : warningItems.length
      ? buildDetailsSectionHtml({
          title: "Warnzeichen",
          className: "bestiary-details--warnings",
          monsterId: id,
          stateKey: "warnings",
          bodyHtml: getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um diese Warnzeichen zu erkennen."),
        })
      : "";
    const behaviorHtml = renderTextBlocks(getMonsterBehavior(m));
    const behaviorDetails = buildDetailsSectionHtml({
      title: "Verhalten",
      className: "bestiary-details--behavior",
      monsterId: id,
      stateKey: "behavior",
      bodyHtml:
        visibility.behavior !== false
          ? behaviorHtml
            ? `<section class="bestiary-dossier-textblock">${behaviorHtml}</section>`
            : ""
          : behaviorHtml
          ? getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um das Verhalten dieser Kreatur zu lesen.")
          : "",
    });
    const tacticsHtml = renderTextBlocks(getMonsterTactics(m));
    const tacticsDetails = buildDetailsSectionHtml({
      title: "Empfohlene Taktik",
      className: "bestiary-details--tactics",
      monsterId: id,
      stateKey: "tactics",
      bodyHtml:
        visibility.tactics !== false
          ? tacticsHtml
            ? `<section class="bestiary-dossier-textblock">${tacticsHtml}</section>`
            : ""
          : tacticsHtml
          ? getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um diese Taktik freizuschalten.")
          : "",
    });

    const statblockHtml = buildStatblockHtml(m);
    const actionsHtml = buildActionsHtml(m);
    const notesHtml = buildNotesHtml(m);
    const harvestBaseHtml = buildHarvestDetailsHtml(m, id);
    const harvestDetailsHtml =
      visibility.harvest !== false
        ? harvestBaseHtml
        : harvestBaseHtml
        ? buildDetailsSectionHtml({
            title: "Ernte",
            className: "bestiary-details--harvest",
            monsterId: id,
            stateKey: "harvest",
            bodyHtml: getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um die möglichen Erträge dieser Kreatur freizuschalten."),
          })
        : "";

    // NEU: Zusatzinfos aus data.js (monster.extras)
    const extrasBaseHtml = buildExtrasDetailsHtml(m, id);
    const extrasDetailsHtml =
      visibility.extras !== false
        ? extrasBaseHtml
        : extrasBaseHtml
        ? buildDetailsSectionHtml({
            title: "Zusatzinfos",
            className: "bestiary-details--extras",
            monsterId: id,
            stateKey: "extras",
            bodyHtml: getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um diese Zusatzinfos freizuschalten."),
          })
        : "";

    const combatBodyHtml = `
      ${visibility.statblock !== false ? buildRecordBlockHtml("Werte", statblockHtml, "bestiary-record-block--statblock") : statblockHtml ? getMonsterHiddenInfoHtml("Die Werte dieser Kreatur sind noch verborgen.") : ""}
      ${visibility.actions !== false ? buildRecordBlockHtml("Fähigkeiten / Aktionen", actionsHtml, "bestiary-record-block--actions") : actionsHtml ? getMonsterHiddenInfoHtml("Die Aktionen dieser Kreatur sind noch verborgen.") : ""}
    `;
    const combatDetails = buildDetailsSectionHtml({
      title: "Kampf",
      className: "bestiary-details--combat",
      monsterId: id,
      stateKey: "combat",
      bodyHtml: combatBodyHtml,
    });

    const notesDetails = buildDetailsSectionHtml({
      title: "Notizen",
      className: "bestiary-details--notes",
      monsterId: id,
      stateKey: "notes",
      bodyHtml: visibility.notes !== false ? notesHtml : notesHtml ? getMonsterHiddenInfoHtml("Dir fehlt noch Wissen, um diese Notizen freizuschalten.") : "",
    });

    const relIds = Array.isArray(m.relatedEntryIds) ? m.relatedEntryIds.map(toNonEmptyString).filter(Boolean) : [];
    const relEntries =
      typeof app.findEntryById === "function" ? relIds.map((rid) => app.findEntryById(rid)).filter(Boolean) : [];

    const selfEntry = typeof app.findEntryById === "function" ? app.findEntryById(id) : null;
    const glossaryLinksHtml = buildGlossaryLinksHtml(id, selfEntry, relEntries);

    const wrapper = document.createElement("article");
    wrapper.className = "bestiary-page bestiary-page--dossier";
    if (isSealedRecord) wrapper.classList.add("bestiary-page--sealed");
    else if (knowledgeState === "partial") wrapper.classList.add("bestiary-page--partial");
    wrapper.dataset.monsterId = id;
    wrapper.dataset.pageType = "monster";
    wrapper.dataset.monsterIndex = String(idx);
    wrapper.dataset.monsterTotal = String(total || 0);
    if (chapter) wrapper.dataset.chapterName = chapter;
    wrapper.tabIndex = 0;
    wrapper.setAttribute("aria-label", total ? `${title}, Akte ${idx} von ${total}` : title);

    wrapper.style.setProperty("--bestiary-flip", "0deg");
    wrapper.style.setProperty("--bestiary-shadow", "0");
    wrapper.style.setProperty("--bestiary-origin", "right");

    wrapper.innerHTML = `
      <div class="bestiary-page-inner">
        ${dossierHeaderHtml}
        ${utilityHtml}
        ${quickfactsHtml}
        ${signalsHtml}
        ${descriptionDetails}
        ${tracesDetails}
        ${warningDetails}
        ${behaviorDetails}
        ${tacticsDetails}
        ${combatDetails}
        ${harvestDetailsHtml}
        ${notesDetails}
        ${extrasDetailsHtml}

        ${visibility.images !== false ? galleryHtml : ""}
        ${glossaryLinksHtml}
      </div>
    `;

    wrapper.dataset.knowledge =
      typeof app.getBestiaryKnowledgeState === "function"
        ? app.getBestiaryKnowledgeState(id, knowledgeState)
        : knowledgeState;
    wrapper.dataset.favorite =
      typeof app.isBestiaryFavorite === "function" && app.isBestiaryFavorite(id) ? "true" : "false";

    applyBestiaryStage(wrapper, ".bestiary-dossier-header", 0);
    applyBestiaryStage(
      wrapper,
      ".bestiary-monster-tools, .bestiary-section--quickfacts, .bestiary-dossier-signals, .bestiary-details, .bestiary-shortcut-shelf",
      1
    );

    const imgs = wrapper.querySelectorAll("img.bestiary-image, img.bestiary-hero-image");
    if (imgs && imgs.length) {
      imgs.forEach((img) => {
        img.addEventListener("click", () => {
          const src = img.getAttribute("src");
          const alt = img.getAttribute("alt") || "";
          if (src && typeof app.openImageViewer === "function") app.openImageViewer(src, alt);
        });
      });
    }

    const detailSections = wrapper.querySelectorAll("details[data-detail-key]");
    if (detailSections.length) {
      detailSections.forEach((detailsEl) => {
        detailsEl.addEventListener("toggle", () => {
          const detailKey = toNonEmptyString(detailsEl.getAttribute("data-detail-key"));
          const detailMonsterId = toNonEmptyString(detailsEl.getAttribute("data-monster-id")) || id;
          if (!detailKey || !detailMonsterId) return;
          setBestiaryDetailState(detailMonsterId, detailKey, !!detailsEl.open);
        });
      });
    }

    wrapper.addEventListener("click", (ev) => {
      const actionButton = ev.target.closest("[data-action]");
      if (actionButton) {
        const action = actionButton.getAttribute("data-action");
        const monsterId = actionButton.getAttribute("data-monster-id") || id;

        if (action === "toggle-favorite") {
          ev.preventDefault();
          callIfFn(app.toggleBestiaryFavorite, monsterId);
          requestBestiaryRefresh();
          return;
        }

        if (action === "toggle-knowledge") {
          ev.preventDefault();
          const current =
            typeof app.getBestiaryKnowledgeState === "function"
              ? app.getBestiaryKnowledgeState(monsterId, getMonsterKnowledgeFallback(m))
              : getMonsterKnowledgeFallback(m);
          const next = current === "known" ? "unknown" : "known";
          callIfFn(app.setBestiaryKnowledgeState, monsterId, next);
          requestBestiaryRefresh();
          return;
        }

        if (action === "share-monster") {
          ev.preventDefault();
          shareMonsterLink(monsterId, title);
          return;
        }

        if (action === "start-arena") {
          ev.preventDefault();
          if (state && state.arena && typeof state.arena === "object") {
            state.arena.selectedMonsterId = monsterId;
            const heroId = getPreferredArenaHeroId();
            if (heroId) state.arena.selectedHeroId = heroId;
            state.arena.battle = null;
            state.arena.log = [];
            state.arena.lastResult = "";
          }
          state.bestiarySelectedMonsterId = monsterId;
          const arenaHash = getArenaRouteForMonster(monsterId);
          if (window.location.hash !== arenaHash) {
            window.location.hash = arenaHash;
          } else if (typeof app.setView === "function") {
            app.setView("arena");
            callIfFn(app.renderArena);
          }
          return;
        }

        if (action === "back-to-list") {
          ev.preventDefault();
          if (window.location.hash !== "#bestiary") {
            window.location.hash = "#bestiary";
          } else {
            setBestiaryMode("list");
            requestBestiaryRefresh();
          }
          return;
        }

        if (action === "toggle-harvest-item") {
          ev.preventDefault();
          const dc = parseInt(actionButton.getAttribute("data-harvest-dc") || "", 10);
          const yieldName = actionButton.getAttribute("data-harvest-yield") || "";
          toggleHarvestSelection(monsterId, dc, yieldName);
          requestBestiaryRefresh();
          return;
        }

        if (action === "clear-harvest-plan") {
          ev.preventDefault();
          if (ui.bestiary.harvestSelections && ui.bestiary.harvestSelections[monsterId]) {
            delete ui.bestiary.harvestSelections[monsterId];
          }
          requestBestiaryRefresh();
          return;
        }
      }

      const monsterButton = ev.target.closest("button[data-monster-id]");
      if (monsterButton) {
        ev.preventDefault();
        navigateToMonsterRoute(monsterButton.getAttribute("data-monster-id"));
        return;
      }

      const btn = ev.target.closest("button[data-entry-id]");
      if (!btn) return;
      const entryId = btn.getAttribute("data-entry-id");
      if (!entryId) return;
      ev.preventDefault();
      callIfFn(app.navigateToEntry, entryId);
    });

    return wrapper;
  }

  function buildListCard(monster, index, total) {
    const m = monster || {};
    const id = getMonsterId(m, typeof m._index === "number" ? m._index : index);
    const visibility = getMonsterVisibility(m);
    const title = getMonsterMaskedTitle(m);
    const summary = isMonsterFieldVisible(m, "summary") ? toNonEmptyString(m.summary) : "";
    const habitat = isMonsterFieldVisible(m, "meta") ? getMonsterHabitatLabel(m) : "";
    const type = isMonsterFieldVisible(m, "meta") ? getMonsterType(m) : "";
    const cr = isMonsterFieldVisible(m, "meta") ? getMonsterCr(m) : "";
    const size = isMonsterFieldVisible(m, "meta") ? pickFirst(m, ["size"]) : "";
    const dangerTags = isMonsterFieldVisible(m, "meta") ? getMonsterDangerTags(m) : [];
    const dangerTone = getMonsterDangerTone(m);
    const favorite = typeof app.isBestiaryFavorite === "function" ? app.isBestiaryFavorite(id) : false;
    const knowledgeState = getMonsterKnowledgeFallback(m);
    const isSealedRecord = !visibility.visible || visibility.title === false;
    const recentLabel = getRelativeRecentLabel(id);
    const traceTags = isMonsterFieldVisible(m, "traceTags") ? getMonsterTraceTags(m) : [];
    const chips = [];
    const subtitleParts = [];

    if (type) subtitleParts.push(type);
    if (habitat) subtitleParts.push(habitat);
    if (cr) chips.push(`CR ${cr}`);
    if (size) chips.push(size);

    const mediaHtml = buildListCardMediaHtml(m, title);

    const button = document.createElement("button");
    button.type = "button";
    button.className = `bestiary-list-card bestiary-list-card--tone-${app.escapeHtml(dangerTone)}`;
    if (isSealedRecord) button.classList.add("bestiary-list-card--sealed");
    else if (knowledgeState === "partial") button.classList.add("bestiary-list-card--partial");
    button.dataset.monsterId = id;
    button.dataset.pageType = "monster";
    button.dataset.monsterIndex = String(index);
    button.dataset.dangerTone = dangerTone;
    button.dataset.knowledge = knowledgeState;
    button.setAttribute("aria-label", total ? `${title}, Monster ${index} von ${total}` : title);
    button.setAttribute("aria-current", "false");

    button.innerHTML = `
      <div class="bestiary-list-card-shell">
        ${mediaHtml}
        <div class="bestiary-list-card-body">
          <div class="bestiary-list-card-top">
            <span class="bestiary-list-card-count">Jagdakte ${app.escapeHtml(String(index))} / ${app.escapeHtml(String(total))}</span>
            <span class="bestiary-list-card-status">
              ${favorite ? `<span class="bestiary-list-card-status-pill bestiary-list-card-status-pill--favorite">Favorit</span>` : ""}
              <span class="bestiary-list-card-status-pill bestiary-list-card-status-pill--knowledge">${app.escapeHtml(getMonsterKnowledgeLabel(knowledgeState))}</span>
              ${recentLabel ? `<span class="bestiary-list-card-status-pill bestiary-list-card-status-pill--recent">${app.escapeHtml(recentLabel)}</span>` : ""}
            </span>
            <span class="bestiary-list-card-jump" aria-hidden="true">›</span>
          </div>
          <div class="bestiary-list-card-heading">
            <div class="bestiary-list-card-titlewrap">
              <div class="bestiary-list-card-title">${app.escapeHtml(title)}</div>
              ${
                subtitleParts.length
                  ? `<div class="bestiary-list-card-subtitle">${app.escapeHtml(subtitleParts.join(" · "))}</div>`
                  : ""
              }
            </div>
            ${
              dangerTags.length
                ? `<span class="bestiary-list-card-danger bestiary-list-card-danger--${app.escapeHtml(dangerTone)}">${app.escapeHtml(dangerTags.join(" / "))}</span>`
                : ""
            }
          </div>
          ${
            summary
              ? `<div class="bestiary-list-card-summary">${app.escapeHtml(summary)}</div>`
              : !visibility.visible || visibility.summary === false
              ? `<div class="bestiary-list-card-summary bestiary-list-card-summary--locked">Dir fehlt noch Wissen, um diese Akte vollständig zu lesen.</div>`
              : ""
          }
          ${
            chips.length
              ? `<div class="bestiary-list-card-facts">${chips
                  .map((chip) => `<span class="bestiary-list-card-fact">${app.escapeHtml(chip)}</span>`)
                  .join("")}</div>`
              : ""
          }
          ${
            traceTags.length
              ? `<div class="bestiary-list-card-traces">${traceTags
                  .map((tag) => `<span class="bestiary-list-card-trace">${app.escapeHtml(tag)}</span>`)
                  .join("")}</div>`
              : !visibility.visible || visibility.traceTags === false
              ? `<div class="bestiary-list-card-traces"><span class="bestiary-list-card-trace bestiary-list-card-trace--locked">Spuren verborgen</span></div>`
              : ""
          }
        </div>
      </div>
    `;

    button.addEventListener("click", (event) => {
      event.preventDefault();
      navigateToMonsterRoute(id);
    });

    return button;
  }

  function renderList(dom, monsters, chapters) {
    if (!dom.bestiaryBook) return;

    const groups = groupForToc(monsters, chapters);
    const indexById = new Map();
    monsters.forEach((monster, index) => {
      const id = getMonsterId(monster, typeof monster._index === "number" ? monster._index : index);
      indexById.set(id, index + 1);
    });

    dom.bestiaryBook.innerHTML = "";
    dom.bestiaryBook.classList.add("bestiary-book--list-mode");
    dom.bestiaryBook.classList.remove("bestiary-book--detail-mode");
    dom.bestiaryBook.classList.toggle("bestiary-book--reduced-motion", hasReducedMotion());
    dom.bestiaryBook.dataset.windowed = "false";
    ui.bestiary._windowedPages = false;

    if (!monsters.length) {
      const empty = createBestiaryEmptyState({
        icon: "🔎",
        title: "Keine Spuren im Register",
        text: "Für die aktuelle Suche oder Filterkombination wurde keine passende Kreatur im Jagdarchiv gefunden.",
        note: hasActiveBestiaryFilters() || ui.bestiary.query ? "Lösche Suche oder Filter und durchforste das Register erneut." : "",
        actions: [
          ui.bestiary.query ? { id: "clear-search", label: "Suche leeren" } : null,
          hasActiveBestiaryFilters() ? { id: "clear-filters", label: "Filter löschen" } : null,
        ].filter(Boolean),
      });
      empty.querySelectorAll("[data-empty-action]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const action = button.getAttribute("data-empty-action");
          if (action === "clear-search") clearBestiarySearch();
          if (action === "clear-filters") resetBestiaryFilters();
          ui.bestiary._lastRenderKey = "";
          callIfFn(app.renderBestiary);
        });
      });
      dom.bestiaryBook.appendChild(empty);
      return;
    }

    const recentIds = typeof app.getBestiaryRecentMonsterIds === "function" ? app.getBestiaryRecentMonsterIds(5) : [];
    const favoriteIds =
      typeof app.getBestiaryFavoriteMonsterIds === "function" ? app.getBestiaryFavoriteMonsterIds().slice(0, 5) : [];
    const recentHtml = buildMonsterShortcutShelf("Zuletzt angesehen", recentIds);
    const favoriteHtml = buildMonsterShortcutShelf("Favoriten", favoriteIds);

    if (recentHtml || favoriteHtml) {
      const preface = document.createElement("section");
      preface.className = "bestiary-list-preface";
      preface.innerHTML = `${recentHtml}${favoriteHtml}`;
      preface.querySelectorAll("[data-monster-id]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          navigateToMonsterRoute(button.getAttribute("data-monster-id"));
        });
      });
      dom.bestiaryBook.appendChild(preface);
    }

    groups.forEach((group) => {
      const section = document.createElement("section");
      section.className = "bestiary-list-group";
      section.dataset.groupName = group.name;
      section.dataset.groupKind = toNonEmptyString(group.kind) || "chapter";
      section.classList.toggle("bestiary-list-group--chapter", group.kind === "chapter");

      const titleRow = document.createElement("div");
      titleRow.className = "bestiary-list-group-head";
      titleRow.innerHTML = `
        <div class="bestiary-list-group-heading">
          <div class="bestiary-list-group-kicker">${group.kind === "chapter" ? "Jagdregister" : "Archivreihe"}</div>
          <div class="bestiary-list-group-title">
            ${group.icon ? `<span class="bestiary-list-group-icon" aria-hidden="true">${app.escapeHtml(group.icon)}</span>` : ""}
            <span>${app.escapeHtml(group.name)}</span>
          </div>
        </div>
        <div class="bestiary-list-group-count">${app.escapeHtml(String(group.items.length))}</div>
      `;
      section.appendChild(titleRow);

      const allHabitats = Array.from(new Set((group.items || []).map((item) => getMonsterHabitatLabel(item)).filter(Boolean)));
      const habitatParts = allHabitats.slice(0, 4);
      const summaryParts = [];
      if (group.summary) summaryParts.push(group.summary);
      if (habitatParts.length) {
        summaryParts.push(`Reviere: ${habitatParts.join(", ")}${allHabitats.length > habitatParts.length ? " ..." : ""}`);
      }

      if (summaryParts.length) {
        const summary = document.createElement("p");
        summary.className = "bestiary-list-group-summary";
        summary.textContent = summaryParts.join(" · ");
        section.appendChild(summary);
      }

      const cards = document.createElement("div");
      cards.className = "bestiary-list-group-cards";

      group.items.forEach((monster, groupIndex) => {
        const id = getMonsterId(monster, typeof monster._index === "number" ? monster._index : groupIndex);
        const index = indexById.get(id) || groupIndex + 1;
        cards.appendChild(buildListCard(monster, index, monsters.length));
      });

      section.appendChild(cards);
      section.style.setProperty("--bestiary-stagger", String(dom.bestiaryBook.querySelectorAll(".bestiary-list-group").length + 1));
      dom.bestiaryBook.appendChild(section);
    });

    applyBestiaryStage(dom.bestiaryBook, ".bestiary-list-preface .bestiary-shortcut-shelf", 0);
    applyBestiaryStage(dom.bestiaryBook, ".bestiary-list-group", 1);
    applyBestiaryStage(dom.bestiaryBook, ".bestiary-list-card", 2);
  }

  function getDetailMonsterContext(allMonsters, filteredMonsters) {
    const all = Array.isArray(allMonsters) ? allMonsters : [];
    const filtered = Array.isArray(filteredMonsters) ? filteredMonsters : [];
    const activeId =
      toNonEmptyString(ui.bestiary.activeId) ||
      toNonEmptyString(state && state.bestiarySelectedMonsterId) ||
      "";

    const findById = (list, id) => {
      const sid = toNonEmptyString(id);
      if (!sid) return null;
      return list.find((monster, index) => getMonsterId(monster, typeof monster._index === "number" ? monster._index : index) === sid) || null;
    };

    const preferred =
      findById(filtered, activeId) ||
      findById(all, activeId) ||
      (filtered.length ? filtered[0] : all.length ? all[0] : null);

    if (!preferred) return null;

    const selectedId = getMonsterId(
      preferred,
      typeof preferred._index === "number" ? preferred._index : Math.max(0, all.indexOf(preferred))
    );
    const inFiltered = !!findById(filtered, selectedId);
    const source = inFiltered ? filtered : all;
    const index = Math.max(
      0,
      source.findIndex(
        (monster, listIndex) =>
          getMonsterId(monster, typeof monster._index === "number" ? monster._index : listIndex) === selectedId
      )
    );

    return {
      monster: preferred,
      id: selectedId,
      source,
      index: index + 1,
      total: source.length,
      usesFallbackSource: !inFiltered && !!filtered.length,
    };
  }

  function renderDetail(dom, allMonsters, filteredMonsters) {
    if (!dom.bestiaryBook) return;

    const context = getDetailMonsterContext(allMonsters, filteredMonsters);
    dom.bestiaryBook.innerHTML = "";
    dom.bestiaryBook.classList.remove("bestiary-book--list-mode");
    dom.bestiaryBook.classList.add("bestiary-book--detail-mode");
    dom.bestiaryBook.classList.toggle("bestiary-book--reduced-motion", hasReducedMotion());
    dom.bestiaryBook.dataset.windowed = "false";
    ui.bestiary._windowedPages = false;

    if (!context || !context.monster) {
      const empty = createBestiaryEmptyState({
        icon: "?",
        title: "Keine passende Monsterakte",
        text: "Der direkte Link verweist aktuell auf kein verfügbares Wesen mehr.",
        note: "Wechsle zurück zur Liste oder öffne das Inhaltsverzeichnis.",
        actions: [{ id: "back-to-list", label: "Zur Liste" }],
      });
      empty.querySelectorAll("[data-empty-action]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          if (window.location.hash !== "#bestiary") window.location.hash = "#bestiary";
          else {
            setBestiaryMode("list");
            ui.bestiary._lastRenderKey = "";
            callIfFn(app.renderBestiary);
          }
        });
      });
      dom.bestiaryBook.appendChild(empty);
      setMetaText("0 Monster");
      setPositionText("Leer");
      return;
    }

    syncSelectedMonsterId(context.id);
    const page = buildMonsterPage(context.monster, context.index, context.total);
    page.classList.add("bestiary-page--detail-record");
    page.setAttribute("aria-current", "true");
    dom.bestiaryBook.appendChild(page);

    const chapter = toNonEmptyString(context.monster.chapterName) || toNonEmptyString(context.monster.chapterId);
    const metaParts = [];
    if (context.usesFallbackSource) metaParts.push("Direktansicht");
    metaParts.push(`${context.total} Monster`);
    if (chapter) metaParts.push(chapter);
    metaParts.push(`Akte ${context.index}/${context.total}`);

    setMetaText(metaParts.join(" / "));
    setPositionText(`Akte ${context.index}/${context.total}`);
    syncBestiaryActiveState(context.id);
  }

  function renderPages(dom, monsters, chapters, meta) {
    if (!dom.bestiaryBook) return;

    dom.bestiaryBook.innerHTML = "";
    dom.bestiaryBook.classList.toggle("bestiary-book--reduced-motion", hasReducedMotion());
    dom.bestiaryBook.classList.remove("bestiary-book--list-mode");
    dom.bestiaryBook.classList.remove("bestiary-book--detail-mode");

    const models = buildBookModels(monsters, chapters, meta);
    const initialPageIndex = getInitialBookPageIndex(models);
    const windowed = shouldWindowBookModels(models);
    const initialRange = windowed ? getBookWindowRange(initialPageIndex, models.length) : null;

    ui.bestiary._pageModels = models;
    ui.bestiary._pageIndexByMonsterId = {};
    ui.bestiary._windowedPages = windowed;
    dom.bestiaryBook.dataset.windowed = windowed ? "true" : "false";

    models.forEach((model) => {
      if (model && model.pageType === "monster" && model.monsterId) {
        ui.bestiary._pageIndexByMonsterId[model.monsterId] = model.pageIndex;
      }

      const full =
        !windowed ||
        model.pageType !== "monster" ||
        (initialRange && model.pageIndex >= initialRange.start && model.pageIndex <= initialRange.end);

      dom.bestiaryBook.appendChild(buildBookPageFromModel(model, !!full));
    });

    requestAnimationFrame(() => updateActiveFromScroll());
  }

  // -----------------------------
  // Rendering: TOC
  // -----------------------------
  function renderToc(dom, monsters, chapters) {
    if (!dom.bestiaryTocList) return;

    // sync input value with state
    if (dom.bestiaryTocSearch && dom.bestiaryTocSearch.value !== (ui.bestiary.tocQuery || "")) {
      dom.bestiaryTocSearch.value = ui.bestiary.tocQuery || "";
    }

    const q = ui.bestiary.tocQuery || "";
    const filtered = monsters.filter((m) => matchesQuery(m, q));
    const groups = groupForToc(filtered, chapters);

    dom.bestiaryTocList.innerHTML = "";

    if (!filtered.length) {
      const empty = createBestiaryEmptyState({
        icon: "≡",
        title: "Kein Eintrag im Inhaltsverzeichnis",
        text: "Für diese Suche wurde im Register kein Monster gefunden.",
        actions: [q ? { id: "clear-toc-search", label: "Suche leeren" } : null].filter(Boolean),
      });
      empty.querySelectorAll("[data-empty-action]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          ui.bestiary.tocQuery = "";
          if (dom.bestiaryTocSearch) dom.bestiaryTocSearch.value = "";
          renderToc(dom, monsters, chapters);
        });
      });
      dom.bestiaryTocList.appendChild(empty);
      return;
    }

    groups.forEach((g) => {
      const section = document.createElement("section");
      section.className = "bestiary-toc-group";

      const h = document.createElement("div");
      h.className = "bestiary-toc-group-title";
      h.innerHTML = `
        <span class="bestiary-toc-group-title-main">
          ${g.icon ? `<span aria-hidden="true">${app.escapeHtml(g.icon)}</span>` : ""}
          <span>${app.escapeHtml(g.name)}</span>
        </span>
        <span class="bestiary-toc-group-count">${app.escapeHtml(String(g.count || g.items.length || 0))}</span>
      `;
      section.appendChild(h);

      const list = document.createElement("div");
      list.className = "bestiary-toc-items";

      g.items.forEach((m) => {
        const id = getMonsterId(m, typeof m._index === "number" ? m._index : 0);
        const title = toNonEmptyString(m.title) || id;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "bestiary-toc-item";
        btn.dataset.monsterId = id;
        if (ui.bestiary.activeId && ui.bestiary.activeId === id) btn.classList.add("is-active");
        btn.setAttribute("aria-current", ui.bestiary.activeId && ui.bestiary.activeId === id ? "true" : "false");

        const visibility = getMonsterVisibility(m);
        const knowledgeState = getMonsterKnowledgeFallback(m);
        const tags = visibility.summary !== false ? Array.isArray(m.tags) ? m.tags.map(toNonEmptyString).filter(Boolean) : [] : [];
        const tagsLine = tags.length ? tags.slice(0, 3).join(" / ") : "";

        const type = visibility.meta !== false ? getMonsterType(m) : "";
        const cr = visibility.meta !== false ? getMonsterCr(m) : "";
        const factsLine = [type ? type : "", cr ? `CR ${cr}` : ""].filter(Boolean).join(" / ");

        const subLine = factsLine || tagsLine || (visibility.visible !== false && visibility.title !== false ? "" : "Eintrag versiegelt");
        if (visibility.visible === false || visibility.title === false) btn.classList.add("is-sealed");
        else if (knowledgeState === "partial") btn.classList.add("is-partial");

        btn.innerHTML = `
          <div class="bestiary-toc-item-main">
            <div class="bestiary-toc-item-title">${app.escapeHtml(getMonsterMaskedTitle(m))}</div>
            ${subLine ? `<div class="bestiary-toc-item-sub">${app.escapeHtml(subLine)}</div>` : ""}
          </div>
          <div class="bestiary-toc-item-icon" aria-hidden="true">›</div>
        `;

        btn.addEventListener("click", () => {
          closeBestiaryToc();
          navigateToMonsterRoute(id);
        });

        list.appendChild(btn);
      });

      section.appendChild(list);
      dom.bestiaryTocList.appendChild(section);
    });
  }

  function renderFilterSummary(dom, searchedMonsters, filteredMonsters, chapters, totalCount) {
    if (!dom.bestiaryFilterSummary) return;

    const filters = getBestiaryFilters();
    const sections = buildFilterSections(searchedMonsters, chapters);
    const activeFilters = [];
    const chapterLabel = filters.chapterId ? getChapterLabelById(chapters, searchedMonsters, filters.chapterId) : "";
    const sortSection = sections.find((section) => section.key === "sortBy");
    const sortOption =
      sortSection && Array.isArray(sortSection.options)
        ? sortSection.options.find((option) => toNonEmptyString(option.value) === (filters.sortBy || "chapter-title"))
        : null;

    if (filters.chapterId) activeFilters.push({ key: "chapterId", label: `Kapitel: ${chapterLabel || filters.chapterId}` });
    if (filters.habitat) activeFilters.push({ key: "habitat", label: `Gebiet: ${filters.habitat}` });
    if (filters.type) activeFilters.push({ key: "type", label: `Typ: ${filters.type}` });
    if (filters.dangerTag) activeFilters.push({ key: "dangerTag", label: `Gefahr: ${filters.dangerTag}` });
    if (filters.knowledge) {
      activeFilters.push({
        key: "knowledge",
        label: `Wissen: ${getMonsterKnowledgeLabel(filters.knowledge)}`,
      });
    }

    if (dom.bestiaryFilterButton) {
      dom.bestiaryFilterButton.textContent = activeFilters.length ? `Filter (${activeFilters.length})` : "Filter";
      dom.bestiaryFilterButton.setAttribute("aria-expanded", ui.bestiary.filtersOpen ? "true" : "false");
    }

    const summaryChips = [
      `<span class="bestiary-active-filter bestiary-active-filter--result">${app.escapeHtml(
        `${filteredMonsters.length} / ${totalCount} Monster`
      )}</span>`,
      `<span class="bestiary-active-filter bestiary-active-filter--passive">Sortierung: ${app.escapeHtml(
        (sortOption && sortOption.label) || "Kapitel / Name"
      )}</span>`,
    ];

    if (activeFilters.length) {
      activeFilters.forEach((filter) => {
        summaryChips.push(`
          <button type="button" class="bestiary-active-filter" data-clear-filter="${app.escapeHtml(filter.key)}">
            ${app.escapeHtml(filter.label)} <span aria-hidden="true">x</span>
          </button>
        `);
      });
    } else {
      summaryChips.push(`<span class="bestiary-active-filter bestiary-active-filter--passive">Keine Extra-Filter aktiv</span>`);
    }

    if (hasActiveBestiaryFilters()) {
      summaryChips.push(`
        <button type="button" class="bestiary-active-filter" data-action="clear-all-filters">
          Filter löschen
        </button>
      `);
    }

    let groupsHtml = "";
    if (ui.bestiary.filtersOpen) {
      groupsHtml = sections.length
        ? `
          <div class="bestiary-filter-groups-inline">
            ${sections
              .map((section) => {
                const selectedValue =
                  section.key === "sortBy"
                    ? toNonEmptyString(filters[section.key]) || "chapter-title"
                    : toNonEmptyString(filters[section.key]);
                const allCount = searchedMonsters.length;
                const showAll = section.allowAll !== false;
                return `
                  <section class="bestiary-filter-group-inline">
                    <div class="bestiary-filter-group-inline-title">${app.escapeHtml(section.title)}</div>
                    <div class="bestiary-filter-chip-row">
                      ${
                        showAll
                          ? `
                            <button
                              type="button"
                              class="filter-chip bestiary-filter-option ${selectedValue ? "" : "is-active"}"
                              data-filter-key="${app.escapeHtml(section.key)}"
                              data-filter-value=""
                            >
                              Alle <span class="bestiary-filter-option-count">${app.escapeHtml(String(allCount))}</span>
                            </button>
                          `
                          : ""
                      }
                      ${section.options
                        .map((option) => {
                          const isActive = selectedValue && selectedValue === toNonEmptyString(option.value);
                          const label = option.icon ? `${option.icon} ${option.label}` : option.label;
                          const countHtml =
                            typeof option.count === "number"
                              ? `<span class="bestiary-filter-option-count">${app.escapeHtml(String(option.count))}</span>`
                              : "";
                          return `
                            <button
                              type="button"
                              class="filter-chip bestiary-filter-option ${isActive ? "is-active" : ""}"
                              data-filter-key="${app.escapeHtml(section.key)}"
                              data-filter-value="${app.escapeHtml(option.value)}"
                            >
                              ${app.escapeHtml(label)}
                              ${countHtml}
                            </button>
                          `;
                        })
                        .join("")}
                    </div>
                  </section>
                `;
              })
              .join("")}
          </div>
        `
        : `<div class="bestiary-filter-empty">Keine zusätzlichen Filter verfügbar.</div>`;
    }

    dom.bestiaryFilterSummary.innerHTML = `
      <div class="bestiary-filter-summary-top">${summaryChips.join("")}</div>
      ${groupsHtml}
    `;

    updateModeUi();
  }

  // -----------------------------
  // Scrolling / Active Page + Flip Vars
  // -----------------------------
  function scrollToMonster(id, options) {
    const dom = getDom();
    if (!dom.bestiaryBook) return;

    const sid = toNonEmptyString(id);
    if (!sid) return;

    if (getBestiaryMode() === "book") ensureBookWindowForMonsterId(sid);

    const esc = safeEscapeSelector(sid);
    const selector =
      getBestiaryMode() === "list"
        ? `.bestiary-list-card[data-monster-id="${esc}"]`
        : `.bestiary-page[data-monster-id="${esc}"]`;
    const target = dom.bestiaryBook.querySelector(selector);
    if (!target) return;
    const scrollContainer = getBestiaryScrollContainer() || dom.bestiaryBook;

    try {
      target.scrollIntoView({
        behavior: options && options.smooth ? "smooth" : "auto",
        block: getBestiaryMode() === "list" ? "start" : "nearest",
        inline: getBestiaryMode() === "list" ? "nearest" : "start",
      });
    } catch {
      try {
        if (getBestiaryMode() === "list") {
          scrollContainer.scrollTop = target.offsetTop || 0;
        } else {
          scrollContainer.scrollTop = target.offsetTop || 0;
        }
      } catch {}
    }

    if (options && options.focus && target && typeof target.focus === "function") {
      requestAnimationFrame(() => {
        try {
          target.focus({ preventScroll: true });
        } catch {
          try {
            target.focus();
          } catch {}
        }
      });
    }

    requestAnimationFrame(() => updateActiveFromScroll());
  }

  function focusBestiaryMonster(id, options) {
    const sid = toNonEmptyString(id);
    if (!sid) return false;

    const monster =
      typeof app.findBestiaryMonsterById === "function" ? app.findBestiaryMonsterById(sid) : null;
    if (!monster) return false;

    if (/^#monster-/.test(String(window.location.hash || ""))) {
      ui.bestiary.mode = "detail";
    }
    syncSelectedMonsterId(monster.id);

    if (!(options && options.scroll === false)) {
      scrollToMonster(monster.id, { smooth: !!(options && options.smooth), focus: !!(options && options.focus) });
    } else if (options && options.focus) {
      scrollToMonster(monster.id, { smooth: false, focus: true });
    }

    return true;
  }

  let _scrollRaf = null;
  function handleBestiaryWheel(event) {
    const dom = getDom();
    if (!event || event.defaultPrevented || !dom.bestiaryBook || !dom.bestiaryView) return;
    if (dom.bestiaryView.hidden || dom.bestiaryBook.offsetParent === null) return;

    const container = getBestiaryScrollContainer();
    if (!container) return;

    const targetEl = getElementFromEventTarget(event.target);
    if (!targetEl || (!dom.bestiaryView.contains(targetEl) && !dom.bestiaryBook.contains(targetEl))) return;

    const deltaFactor = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? Math.max(container.clientHeight, 1) : 1;
    const deltaX = (Number(event.deltaX) || 0) * deltaFactor;
    const deltaY = (Number(event.deltaY) || 0) * deltaFactor;
    const nestedScrollable = findNestedScrollableAncestor(targetEl, container);

    if (nestedScrollable && canWheelScrollElement(nestedScrollable, deltaX, deltaY)) {
      return;
    }

    if (getBestiaryMode() === "list" || getBestiaryMode() === "detail") {
      const delta = Math.abs(deltaY) >= Math.abs(deltaX) ? deltaY : deltaX;
      if (!delta) return;

      const maxScrollTop = Math.max(0, container.scrollHeight - container.clientHeight);
      if (!maxScrollTop) return;

      const nextTop = clamp(container.scrollTop + delta, 0, maxScrollTop);
      if (Math.abs(nextTop - container.scrollTop) < 1) return;

      event.preventDefault();
      container.scrollTop = nextTop;
      return;
    }

    const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
    if (!delta) return;

    const maxScrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
    if (!maxScrollLeft) return;

    const nextLeft = clamp(container.scrollLeft + delta, 0, maxScrollLeft);
    if (Math.abs(nextLeft - container.scrollLeft) < 1) return;

    event.preventDefault();
    container.scrollLeft = nextLeft;
  }

  function bindBookScrollOnce() {
    const dom = getDom();
    if (!dom.bestiaryBook) return;

    if (dom.bestiaryBook.dataset.boundScroll === "1") return;
    dom.bestiaryBook.dataset.boundScroll = "1";

    dom.bestiaryBook.addEventListener(
      "scroll",
      () => {
        if (_scrollRaf) return;
        _scrollRaf = requestAnimationFrame(() => {
          _scrollRaf = null;
          maybeHydrateNearestBookPage();
          updateActiveFromScroll();
        });
      },
      { passive: true }
    );

    dom.bestiaryBook.addEventListener(
      "wheel",
      handleBestiaryWheel,
      { passive: false, capture: true }
    );

    if (dom.bestiaryView && dom.bestiaryView.dataset.boundWheel !== "1") {
      dom.bestiaryView.dataset.boundWheel = "1";
      dom.bestiaryView.addEventListener("wheel", handleBestiaryWheel, { passive: false, capture: true });
    }

    if (dom.bestiaryView && dom.bestiaryView.dataset.boundScroll !== "1") {
      dom.bestiaryView.dataset.boundScroll = "1";
      dom.bestiaryView.addEventListener(
        "scroll",
        () => {
          if (_scrollRaf) return;
          _scrollRaf = requestAnimationFrame(() => {
            _scrollRaf = null;
            maybeHydrateNearestBookPage();
            updateActiveFromScroll();
          });
        },
        { passive: true }
      );
    }
  }

  let _resizeRaf = null;
  function bindResizeOnce() {
    if (window.__bestiaryResizeBound) return;
    window.__bestiaryResizeBound = true;

    window.addEventListener(
      "resize",
      () => {
        if (_resizeRaf) return;
        _resizeRaf = requestAnimationFrame(() => {
          _resizeRaf = null;
          maybeHydrateNearestBookPage();
          updateActiveFromScroll();
        });
      },
      { passive: true }
    );
  }

  const FLIP_MAX_DEG = 14;
  const DEADZONE = 0.08;
  const SHADOW_GAMMA = 0.85;

  function syncSelectedMonsterId(id) {
    const sid = toNonEmptyString(id);
    if (!sid) return;

    ui.bestiary.activeId = sid;
    if (typeof app.setBestiarySelectedMonsterId === "function") {
      app.setBestiarySelectedMonsterId(sid);
    } else if (state) {
      state.bestiarySelectedMonsterId = sid;
    }

    syncBestiaryActiveState(sid);
    callIfFn(app.markBestiaryMonsterViewed, sid);
  }

  function updateActiveFromList() {
    const dom = getDom();
    const cards = Array.from(dom.bestiaryBook.querySelectorAll(".bestiary-list-card"));

    if (!cards.length) {
      setMetaText("0 Monster");
      setPositionText("Leer");
      return;
    }

    const targetY = dom.bestiaryBook.scrollTop + 88;
    let best = null;
    let bestDist = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const cardY = card.offsetTop || 0;
      const dist = Math.abs(cardY - targetY);
      if (dist < bestDist) {
        bestDist = dist;
        best = card;
      }
    });

    cards.forEach((card) => card.classList.remove("is-active"));
    if (best) best.classList.add("is-active");
    if (!best) return;

    const bestId = toNonEmptyString(best.dataset.monsterId);
    const total = cards.length;
    const index = parseInt(best.dataset.monsterIndex || "", 10);
    const currentIndex = Number.isFinite(index) && index > 0 ? index : 1;
    const group = best.closest(".bestiary-list-group");
    const groupName = toNonEmptyString(group && group.dataset.groupName);

    if (bestId) syncSelectedMonsterId(bestId);

    setPositionText(`${currentIndex}/${total}`);
    syncBestiaryActiveState(bestId);
    setMetaText(groupName ? `${total} Monster / ${groupName} / ${currentIndex}/${total}` : `${total} Monster / ${currentIndex}/${total}`);
  }

  function updateActiveFromDetail() {
    const dom = getDom();
    const page = dom.bestiaryBook ? dom.bestiaryBook.querySelector('.bestiary-page[data-page-type="monster"], .bestiary-page[data-monster-id]') : null;
    if (!page) return;

    const monsterId = toNonEmptyString(page.dataset.monsterId);
    const total = parseInt(page.dataset.monsterTotal || page.dataset.monsterCount || "", 10);
    const index = parseInt(page.dataset.monsterIndex || "", 10);

    if (monsterId) syncSelectedMonsterId(monsterId);
    page.classList.add("is-active");

    const chapter = toNonEmptyString(page.dataset.chapterName);
    const resolvedTotal = Number.isFinite(total) && total > 0 ? total : Math.max(1, index || 1);
    const resolvedIndex = Number.isFinite(index) && index > 0 ? index : 1;
    const metaParts = [`${resolvedTotal} Monster`];
    if (chapter) metaParts.push(chapter);
    metaParts.push(`Akte ${resolvedIndex}/${resolvedTotal}`);
    setMetaText(metaParts.join(" / "));
    setPositionText(`Akte ${resolvedIndex}/${resolvedTotal}`);
    syncBestiaryActiveState(monsterId);
  }

  function updateActiveFromBook() {
    const dom = getDom();
    const pages = Array.from(dom.bestiaryBook.querySelectorAll(".bestiary-page"));
    if (!pages.length) return;

    const reduced = hasReducedMotion();
    dom.bestiaryBook.classList.toggle("bestiary-book--reduced-motion", reduced);

    const boxWidth = Math.max(1, dom.bestiaryBook.clientWidth);
    const cx = dom.bestiaryBook.scrollLeft + boxWidth * 0.5;

    let best = null;
    let bestDist = Number.POSITIVE_INFINITY;

    pages.forEach((page) => {
      const px = (page.offsetLeft || 0) + (page.offsetWidth || 0) * 0.5;
      const dist = Math.abs(px - cx);
      if (dist < bestDist) {
        bestDist = dist;
        best = page;
      }

      if (reduced) {
        page.style.setProperty("--bestiary-flip", "0deg");
        page.style.setProperty("--bestiary-shadow", "0");
        page.style.setProperty("--bestiary-origin", "right");
        return;
      }

      const dx = (px - cx) / boxWidth;
      let t = clamp(dx * 2, -1, 1);
      if (Math.abs(t) < DEADZONE) t = 0;

      const flipDeg = clamp(-t * FLIP_MAX_DEG, -FLIP_MAX_DEG, FLIP_MAX_DEG);
      const intensity = clamp(Math.pow(Math.abs(t), SHADOW_GAMMA), 0, 1);

      page.style.setProperty("--bestiary-flip", `${flipDeg.toFixed(3)}deg`);
      page.style.setProperty("--bestiary-shadow", intensity.toFixed(4));
      page.style.setProperty("--bestiary-origin", t > 0 ? "left" : "right");
    });

    pages.forEach((page) => page.classList.remove("is-active"));
    if (best) best.classList.add("is-active");
    if (!best) return;

    const pageIndex = parseInt(best.dataset.pageIndex || "", 10);
    const monsterPages = pages.filter((page) => page.dataset.pageType === "monster");
    const total = monsterPages.length;
    const pageType = best.dataset.pageType || "";
    const bestId = toNonEmptyString(best.dataset.monsterId);

    if (!total) {
      setMetaText("0 Monster");
      setPositionText("Titel");
      return;
    }

    if (pageType === "cover" || bestId === "__cover__") {
      setMetaText(`${total} Monster / Titelseite`);
      setPositionText("Titel");
      return;
    }

    if (pageType === "chapter") {
      const chapterName = toNonEmptyString(best.dataset.chapterName) || "Kapitel";
      setMetaText(`${total} Monster / Kapitel ${chapterName}`);
      setPositionText("Kapitel");
      return;
    }

    if (bestId) syncSelectedMonsterId(bestId);

    const idx = parseInt(best.dataset.monsterIndex || "", 10);
    const currentIndex = Number.isFinite(idx) && idx > 0 ? idx : Math.max(1, monsterPages.findIndex((page) => page === best) + 1);
    setMetaText(`${total} Monster / Seite ${currentIndex}/${total}`);
    setPositionText(`${currentIndex}/${total}`);
  }

  function updateActiveFromScroll() {
    const dom = getDom();
    if (!dom.bestiaryBook) return;
    if (dom.bestiaryBook.offsetParent === null) return;

    if (getBestiaryMode() === "list") {
      updateActiveFromList();
      return;
    }

    if (getBestiaryMode() === "detail") {
      updateActiveFromDetail();
      return;
    }

    updateActiveFromBook();
    return;

    const pages = Array.from(dom.bestiaryBook.querySelectorAll(".bestiary-page"));
    if (!pages.length) return;

    const reduced = hasReducedMotion();
    dom.bestiaryBook.classList.toggle("bestiary-book--reduced-motion", reduced);

    // Perf: statt getBoundingClientRect() pro Seite -> scrollLeft + offsetLeft
    const boxWidth = Math.max(1, dom.bestiaryBook.clientWidth);
    const cx = dom.bestiaryBook.scrollLeft + boxWidth * 0.5;

    let best = null;
    let bestDist = Number.POSITIVE_INFINITY;

    pages.forEach((p) => {
      const px = (p.offsetLeft || 0) + (p.offsetWidth || 0) * 0.5;
      const d = Math.abs(px - cx);
      if (d < bestDist) {
        bestDist = d;
        best = p;
      }

      if (reduced) {
        p.style.setProperty("--bestiary-flip", "0deg");
        p.style.setProperty("--bestiary-shadow", "0");
        p.style.setProperty("--bestiary-origin", "right");
        return;
      }

      const dx = (px - cx) / boxWidth;
      let t = clamp(dx * 2, -1, 1);

      if (Math.abs(t) < DEADZONE) t = 0;

      const flipDeg = clamp(-t * FLIP_MAX_DEG, -FLIP_MAX_DEG, FLIP_MAX_DEG);
      const abs = Math.abs(t);
      const intensity = clamp(Math.pow(abs, SHADOW_GAMMA), 0, 1);

      p.style.setProperty("--bestiary-flip", `${flipDeg.toFixed(3)}deg`);
      p.style.setProperty("--bestiary-shadow", intensity.toFixed(4));
      p.style.setProperty("--bestiary-origin", t > 0 ? "left" : "right");
    });

    pages.forEach((p) => p.classList.remove("is-active"));
    if (best) best.classList.add("is-active");

    if (!best) return;

    const bestId = best.dataset.monsterId || "";
    const allMonsterPages = pages.filter((p) => (p.dataset.monsterId || "") !== "__cover__");
    const total = allMonsterPages.length;

    if (bestId && bestId !== "__cover__") ui.bestiary.activeId = bestId;

    if (!total) {
      setMetaText("0 Monster");
      return;
    }

    if (bestId === "__cover__") {
      setMetaText(`${total} Monster / Titelseite`);
      return;
    }

    const idx = allMonsterPages.findIndex((p) => p === best);
    const currentIndex = idx >= 0 ? idx + 1 : 1;
    setMetaText(`${total} Monster / Seite ${currentIndex}/${total}`);
  }

  // -----------------------------
  // Bindings (Once)
  // -----------------------------
  function bindOnce() {
    const dom = getDom();
    if (ui.bestiary._bound) return;
    ui.bestiary._bound = true;

    if (dom.bestiarySearch) {
      if (toNonEmptyString(dom.bestiarySearch.value) && !ui.bestiary.query) {
        ui.bestiary.query = toNonEmptyString(dom.bestiarySearch.value);
      } else if (ui.bestiary.query && dom.bestiarySearch.value !== ui.bestiary.query) {
        dom.bestiarySearch.value = ui.bestiary.query;
      }

      dom.bestiarySearch.addEventListener("input", () => {
        ui.bestiary.query = toNonEmptyString(dom.bestiarySearch.value);
        callIfFn(app.renderBestiary);
      });
    }

    if (dom.bestiaryModeList) {
      dom.bestiaryModeList.addEventListener("click", () => {
        setBestiaryMode("list");
        if (window.location.hash !== "#bestiary") {
          window.location.hash = "#bestiary";
          return;
        }
        callIfFn(app.renderBestiary);
      });
    }

    if (dom.bestiaryModeDetail) {
      dom.bestiaryModeDetail.addEventListener("click", () => {
        const { monsters } = getBestiaryData();
        const { filtered } = getFilteredMonsters(monsters);
        const context = getDetailMonsterContext(monsters, filtered);
        if (context && context.id) {
          navigateToMonsterRoute(context.id);
          return;
        }
        setBestiaryMode("detail");
      });
    }

    if (dom.bestiaryFilterButton) {
      dom.bestiaryFilterButton.addEventListener("click", () => {
        ui.bestiary.filtersOpen = !ui.bestiary.filtersOpen;
        updateModeUi();
        callIfFn(app.renderBestiary);
      });
    }

    if (dom.bestiaryFilterSummary) {
      dom.bestiaryFilterSummary.addEventListener("click", (event) => {
        const clearBtn = event.target.closest("[data-clear-filter]");
        if (clearBtn) {
          const key = toNonEmptyString(clearBtn.getAttribute("data-clear-filter"));
          if (key) {
            const filters = getBestiaryFilters();
            filters[key] = "";
            ui.bestiary._lastRenderKey = "";
            callIfFn(app.renderBestiary);
          }
          return;
        }

        const clearAllBtn = event.target.closest('[data-action="clear-all-filters"]');
        if (clearAllBtn) {
          resetBestiaryFilters();
          ui.bestiary._lastRenderKey = "";
          callIfFn(app.renderBestiary);
          return;
        }

        const optionBtn = event.target.closest("[data-filter-key]");
        if (!optionBtn) return;

        const key = toNonEmptyString(optionBtn.getAttribute("data-filter-key"));
        const value = toNonEmptyString(optionBtn.getAttribute("data-filter-value"));
        if (!key) return;

        const filters = getBestiaryFilters();
        filters[key] = filters[key] === value ? "" : value;
        ui.bestiary._lastRenderKey = "";
        callIfFn(app.renderBestiary);
      });
    }

    if (dom.bestiaryTocButton) {
      dom.bestiaryTocButton.addEventListener("click", (ev) => {
        if (ev) ev.preventDefault();
        toggleBestiaryToc();
      });
    }

    if (dom.bestiaryTocBackdrop) dom.bestiaryTocBackdrop.addEventListener("click", () => closeBestiaryToc());
    if (dom.bestiaryTocClose) dom.bestiaryTocClose.addEventListener("click", () => closeBestiaryToc());
    if (dom.bestiaryTocPanel) dom.bestiaryTocPanel.addEventListener("click", (ev) => ev.stopPropagation());

    if (dom.bestiaryTocSearch) {
      dom.bestiaryTocSearch.addEventListener("input", () => {
        ui.bestiary.tocQuery = toNonEmptyString(dom.bestiaryTocSearch.value);
        const { monsters, chapters } = getBestiaryData();
        const { filtered } = getFilteredMonsters(monsters);
        renderToc(getDom(), filtered, chapters);
      });
    }

    if (dom.bestiaryBook) {
      dom.bestiaryBook.addEventListener("keydown", (event) => {
        if (!event) return;
        const scrollContainer = getBestiaryScrollContainer() || dom.bestiaryBook;

        if (getBestiaryMode() === "list") {
          if (event.key === "Home") {
            event.preventDefault();
            scrollContainer.scrollTop = 0;
          } else if (event.key === "End") {
            event.preventDefault();
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          }
          return;
        }

        if (getBestiaryMode() === "detail") {
          if (event.key === "Home") {
            event.preventDefault();
            scrollContainer.scrollTop = 0;
            return;
          }

          if (event.key === "End") {
            event.preventDefault();
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          }
          return;
        }

        const step = Math.max(220, Math.round(dom.bestiaryBook.clientWidth * 0.9));
        const smoothBehavior = hasReducedMotion() ? "auto" : "smooth";

        if (event.key === "ArrowRight" || event.key === "PageDown") {
          event.preventDefault();
          dom.bestiaryBook.scrollBy({ left: step, behavior: smoothBehavior });
          return;
        }

        if (event.key === "ArrowLeft" || event.key === "PageUp") {
          event.preventDefault();
          dom.bestiaryBook.scrollBy({ left: -step, behavior: smoothBehavior });
          return;
        }

        if (event.key === "Home") {
          event.preventDefault();
          dom.bestiaryBook.scrollTo({ left: 0, behavior: smoothBehavior });
          return;
        }

        if (event.key === "End") {
          event.preventDefault();
          dom.bestiaryBook.scrollTo({ left: dom.bestiaryBook.scrollWidth, behavior: smoothBehavior });
        }
      });
    }

    window.addEventListener("keydown", (ev) => {
      if (!ev || ev.key !== "Escape") return;
      if (ui.bestiary.filtersOpen) {
        ui.bestiary.filtersOpen = false;
        updateModeUi();
        callIfFn(app.renderBestiary);
        return;
      }
      if (isBestiaryTocOpen()) {
        ev.preventDefault();
        closeBestiaryToc();
      }
    });

    updateModeUi();
    bindBookScrollOnce();
    bindResizeOnce();
  }

  // -----------------------------
  // Main Render
  // -----------------------------
  function renderBestiary() {
    const dom = getDom();
    if (!dom.bestiaryView || dom.bestiaryView.hidden) return;

    bindOnce();
    syncBestiaryModeFromRoute();
    updateModeUi();

    if (!ui.bestiary.activeId && state && state.bestiarySelectedMonsterId) {
      ui.bestiary.activeId = toNonEmptyString(state.bestiarySelectedMonsterId);
    }

    const { monsters, chapters, meta } = getBestiaryData();
    const { searched, filtered } = getFilteredMonsters(monsters);
    const mode = getBestiaryMode();
    const filters = getBestiaryFilters();

    if (dom.bestiaryBook) {
      dom.bestiaryBook.setAttribute("aria-busy", "true");
      dom.bestiaryBook.setAttribute(
        "aria-label",
        mode === "list" ? "Bestiarium Listenansicht" : "Bestiarium Monsterakte"
      );
    }

    const renderKey = JSON.stringify({
      v: 9,
      mode,
      activeId: toNonEmptyString(ui.bestiary.activeId) || toNonEmptyString(state && state.bestiarySelectedMonsterId),
      q: ui.bestiary.query || "",
      tq: ui.bestiary.tocQuery || "",
      f: filters,
      n: filtered.length,
      mt: meta && meta.title ? meta.title : "",
      ms: meta && meta.subtitle ? meta.subtitle : "",
    });

    const shouldFullRender = ui.bestiary._lastRenderKey !== renderKey;

    if (shouldFullRender) {
      if (mode === "list") {
        dom.bestiaryBook.classList.add("bestiary-book--list-mode");
        renderList(dom, filtered, chapters);
      } else {
        renderDetail(dom, monsters, filtered);
      }
      renderToc(dom, filtered, chapters);
      renderFilterSummary(dom, searched, filtered, chapters, monsters.length);
      ui.bestiary._lastRenderKey = renderKey;

      if (mode === "list") {
        setMetaText(`${filtered.length} Monster`);
        if (!filtered.length) setPositionText("Leer");
        syncBestiaryActiveState(ui.bestiary.activeId);
      }

      if (ui.bestiary.activeId) {
        requestAnimationFrame(() => {
          const esc = safeEscapeSelector(ui.bestiary.activeId);
          const selector =
            mode === "list"
              ? `.bestiary-list-card[data-monster-id="${esc}"]`
              : `.bestiary-page[data-monster-id="${esc}"]`;
          const exists = dom.bestiaryBook && dom.bestiaryBook.querySelector(selector);
          if (exists) scrollToMonster(ui.bestiary.activeId, { smooth: false });
          updateActiveFromScroll();
          if (dom.bestiaryBook) dom.bestiaryBook.setAttribute("aria-busy", "false");
        });
      } else {
        requestAnimationFrame(() => {
          maybeHydrateNearestBookPage();
          updateActiveFromScroll();
          if (dom.bestiaryBook) dom.bestiaryBook.setAttribute("aria-busy", "false");
        });
      }
    } else {
      renderToc(dom, filtered, chapters);
      renderFilterSummary(dom, searched, filtered, chapters, monsters.length);
      requestAnimationFrame(() => {
        maybeHydrateNearestBookPage();
        updateActiveFromScroll();
        if (dom.bestiaryBook) dom.bestiaryBook.setAttribute("aria-busy", "false");
      });
    }
  }

  // -----------------------------
  // Export
  // -----------------------------
  Object.assign(app, {
    renderBestiary,
    focusBestiaryMonster,
    scrollToMonster,

    openBestiaryToc,
    closeBestiaryToc,
    toggleBestiaryToc,
    isBestiaryTocOpen,
  });
})();

