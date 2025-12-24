/* app.core.js — vollständig angepasst
   Änderungen ggü. deiner Version:
   1) Bestiary: `extras` aus data.js werden jetzt in ALLEN Typen unterstützt (object/array/string/number/bool),
      ohne dass sie verloren gehen. Wenn sowohl „collectedExtras“ (unbekannte Felder) als auch ein
      explizites `obj.extras` existieren und `obj.extras` NICHT object ist, wird es unter dem Key "Extras"
      mitgeführt.
   2) State-Hydration am Ende: theme/handedness/ownerName + newSeenMap werden beim Start geladen
      (ohne Early-Render), Theme wird direkt auf <html data-theme="..."> angewandt.
   3) Timeline (Variante B): Era-Parsing trennt jetzt sauber zwischen Achsenwert (`value`) und Sortierwert
      (`sortValue`). Dadurch wird z.B. „2100 NGT“ intern NICHT mehr als „1002100“ auf der Achse/Anzeige
      geführt, aber kann weiterhin (falls nötig) hinter „GT“ sortiert werden.
*/

(function () {
  let categories = Array.isArray(window.categories) ? window.categories.slice() : [];
  let entries = Array.isArray(window.entries) ? window.entries.slice() : [];

  // Dashboard-Konfiguration (optional aus data.js)
  let rawDashboard =
    window.dashboard && typeof window.dashboard === "object" ? window.dashboard : null;

  function computeDashboardConfig(raw) {
    const rd = raw && typeof raw === "object" ? raw : null;

    // ab v2: dashboard in data.js:
    // window.dashboard = {
    //   progress: { percent, label },
    //   notes: [...],
    //   help: { title, lines: [...] }
    // }
    const rawProgress = rd && typeof rd.progress === "object" ? rd.progress : null;

    return {
      // Prozentwert – unterstützt neue (progress.percent) und alte (progressPercent) Varianten
      progressPercent:
        rawProgress && rawProgress.percent != null
          ? rawProgress.percent
          : rd && rd.progressPercent != null
          ? rd.progressPercent
          : 0,

      // Label – kompatibel zu alt und neu
      progressLabel:
        rawProgress && typeof rawProgress.label === "string"
          ? rawProgress.label
          : rd && typeof rd.progressLabel === "string"
          ? rd.progressLabel
          : "Kampagne gestartet",

      // Einzelne Notiz (alte Variante)
      note: rd && typeof rd.note === "string" ? rd.note : "",

      // Neue Variante: mehrere Notizen
      notes:
        rd && Array.isArray(rd.notes)
          ? rd.notes.filter((line) => typeof line === "string" && line.trim() !== "")
          : [],

      // Optional: Help-Block für das Fragezeichen-Menü
      help:
        rd && typeof rd.help === "object"
          ? {
              title: typeof rd.help.title === "string" ? rd.help.title : "",
              lines: Array.isArray(rd.help.lines)
                ? rd.help.lines.filter((line) => typeof line === "string" && line.trim() !== "")
                : [],
            }
          : { title: "", lines: [] },
    };
  }

  let dashboardConfig = computeDashboardConfig(rawDashboard);

  // --- Timeline (optional) ---
  // data.js optional:
  // window.timeline = {
  //   items: [
  //     { id, title, start, end?, entryId?, note? }
  //   ]
  // }
  // Zusätzlich kompatibel: window.timeline = [ ... ] (Array direkt)
  let rawTimeline =
    window.timeline && typeof window.timeline === "object" ? window.timeline : null;

  // Optional (v2+): Timeline-Metadaten (Startpunkt, Scopes/Lanes, UI-Flags)
  // Kann entweder separat (window.timelineMeta) oder innerhalb von window.timeline (als Objekt) definiert sein.
  let rawTimelineMeta =
    window.timelineMeta && typeof window.timelineMeta === "object" ? window.timelineMeta : null;

  function toNonEmptyString(v) {
    const s = typeof v === "string" ? v.trim() : String(v || "").trim();
    return s ? s : "";
  }

  function isPlainObject(v) {
    return !!v && typeof v === "object" && !Array.isArray(v);
  }

  // --- Timeline Sort-Offset (Variante B) ---
  // Wichtig: Dieser Offset darf NIE auf der Achse/Anzeige landen.
  // Er ist ausschließlich ein Sortierhilfswert, falls GT & NGT parallel existieren.
  const ERA_SORT_NGT_OFFSET = 1000000;

  // Hilfsparser für Timeline-Sortierung/Typ-Erkennung (optional für späteres UI)
  // Unterstützt:
  // - ISO-Datum (Date.parse)
  // - Kampagnen-Epochen: "600 VGT", "12 GT", "3 NGT"
  // - "Sitzung 3" / "Session 12" etc.
  function parseTimelinePosition(raw) {
    const s = toNonEmptyString(raw);
    if (!s) {
      return {
        kind: "none",
        value: Number.POSITIVE_INFINITY,
        sortValue: Number.POSITIVE_INFINITY,
        raw: "",
      };
    }

    // 1) ISO-Datum / normales Datum
    const ts = Date.parse(s);
    if (!Number.isNaN(ts)) {
      return { kind: "date", value: ts, sortValue: ts, raw: s };
    }

    // 2) Kampagnen-Epochen (VGT/GT/NGT)
    // Variante B:
    // - value      = Achsenwert (tatsächliche Jahreszahl, z.B. 2100)
    // - sortValue  = Sortierwert (optional: trennt GT/NGT, ohne dass der Offset sichtbar wird)
    //
    // Achsenlogik:
    // - VGT zählt "rückwärts" -> negative Werte
    // - GT und NGT sind auf der Achse beide "nach 0" -> positive Werte
    const eraMatch = s.match(/^(-?\d+)\s*(VGT|GT|NGT)\b/i);
    if (eraMatch) {
      const y = parseInt(eraMatch[1], 10);
      const era = String(eraMatch[2] || "").toUpperCase();
      const year = Number.isFinite(y) ? Math.abs(y) : 0;

      const eraRank = era === "VGT" ? -1 : era === "NGT" ? 1 : 0;

      // ✅ Achsenwert (niemals Offset!)
      const axisValue = era === "VGT" ? -year : year;

      // ✅ Sortierwert (optional; UI kann damit GT vor NGT halten)
      const sortValue =
        era === "VGT" ? -year : era === "NGT" ? ERA_SORT_NGT_OFFSET + year : year;

      return {
        kind: "era",
        value: axisValue,
        sortValue,
        raw: s,
        era,
        year,
        eraRank,
      };
    }

    // 3) Sitzung/Session
    const sessMatch = s.match(/(?:sitzung|session)\s*(\d+)/i);
    if (sessMatch) {
      const num = parseInt(sessMatch[1], 10);
      if (!Number.isNaN(num)) return { kind: "session", value: num, sortValue: num, raw: s };
    }

    // 4) Fallback: erste Zahl als Sortierwert (z.B. "Kapitel 2")
    const match = s.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (!Number.isNaN(num)) {
        return { kind: "number", value: num, sortValue: num, raw: s };
      }
    }

    return { kind: "text", value: Number.POSITIVE_INFINITY, sortValue: Number.POSITIVE_INFINITY, raw: s };
  }

  // Normalisiert Timeline-Objekt auf Form { items: [...] }
  function normalizeTimeline(raw) {
    // erlaubt: Array direkt oder Objekt mit items
    const src = Array.isArray(raw)
      ? raw
      : raw && typeof raw === "object" && Array.isArray(raw.items)
      ? raw.items
      : [];

    if (!Array.isArray(src) || !src.length) return { items: [] };

    const seenIds = new Set();
    const normalizedItems = [];

    for (let i = 0; i < src.length; i += 1) {
      const it = src[i];
      const obj = it && typeof it === "object" ? it : null;
      if (!obj) continue;

      const fallbackId = "event-" + (i + 1);
      const id = toNonEmptyString(obj.id) || fallbackId;

      // IDs eindeutig machen
      let finalId = id;
      if (seenIds.has(finalId)) {
        let n = 2;
        while (seenIds.has(finalId + "-" + n)) n += 1;
        finalId = finalId + "-" + n;
      }
      seenIds.add(finalId);

      const title =
        toNonEmptyString(obj.title) ||
        toNonEmptyString(obj.name) ||
        "Event " + (i + 1);

      const start =
        toNonEmptyString(obj.start) ||
        toNonEmptyString(obj.startDate) ||
        toNonEmptyString(obj.date) ||
        "";

      const end =
        toNonEmptyString(obj.end) ||
        toNonEmptyString(obj.endDate) ||
        "";

      // entryId kann unter verschiedenen Namen kommen (Editor/Alt-Daten)
      const entryId =
        toNonEmptyString(obj.entryId) ||
        toNonEmptyString(obj.entry) ||
        toNonEmptyString(obj.linkedEntryId) ||
        "";

      // Optional: Icon (für Timeline-UI)
      const icon = toNonEmptyString(obj.icon);

      // Optional: Scope/Lane (z.B. Land / Weltgeschichte)
      const scopeId =
        toNonEmptyString(obj.scopeId) ||
        toNonEmptyString(obj.laneId) ||
        toNonEmptyString(obj.lane) ||
        toNonEmptyString(obj.countryId) ||
        "";

      // Notiz: unterstützt note/description/meta
      const note =
        toNonEmptyString(obj.note) ||
        toNonEmptyString(obj.description) ||
        toNonEmptyString(obj.meta) ||
        "";

      // Optionales Typ-/Kind-Feld (für Styling/Filter)
      const type = toNonEmptyString(obj.type) || toNonEmptyString(obj.kind);
      const kind = toNonEmptyString(obj.kind);

      const startPos = parseTimelinePosition(start);
      const endPos = parseTimelinePosition(end);

      normalizedItems.push({
        id: finalId,
        title,
        start,
        end,
        entryId,
        note,
        type,
        kind,
        icon,
        scopeId,

        // interne Metadaten (für später: Sort/Styling)
        _startPos: startPos,
        _endPos: endPos,
        _index: i,
      });
    }

    return { items: normalizedItems };
  }

  function normalizeTimelineMeta(rawTimelineValue, rawMetaValue) {
    const timelineObj =
      rawTimelineValue &&
      typeof rawTimelineValue === "object" &&
      !Array.isArray(rawTimelineValue)
        ? rawTimelineValue
        : null;

    const metaFromTimeline =
      timelineObj && typeof timelineObj.meta === "object"
        ? timelineObj.meta
        : timelineObj && typeof timelineObj.settings === "object"
        ? timelineObj.settings
        : timelineObj && typeof timelineObj.config === "object"
        ? timelineObj.config
        : timelineObj;

    // Merge: separate timelineMeta (falls vorhanden) überschreibt Timeline-internes Meta.
    const merged = {
      ...(metaFromTimeline || {}),
      ...(rawMetaValue && typeof rawMetaValue === "object" ? rawMetaValue : {}),
    };

    // Startpunkt
    let start = null;
    const startRaw = merged.start || merged.begin || merged.origin || null;

    if (typeof startRaw === "string") {
      const label = toNonEmptyString(startRaw);
      if (label) start = { label };
    } else if (startRaw && typeof startRaw === "object") {
      const label =
        toNonEmptyString(startRaw.label) ||
        toNonEmptyString(startRaw.start) ||
        toNonEmptyString(startRaw.value) ||
        "";
      if (label) {
        start = {
          label,
          description: toNonEmptyString(startRaw.description),
          epochId: toNonEmptyString(startRaw.epochId),
          year:
            typeof startRaw.year === "number" && Number.isFinite(startRaw.year)
              ? startRaw.year
              : null,
        };
      }
    }

    // Scopes/Lanes (z.B. Weltgeschichte + Länder)
    const scopesRaw = Array.isArray(merged.scopes)
      ? merged.scopes
      : Array.isArray(merged.lanes)
      ? merged.lanes
      : Array.isArray(merged.tracks)
      ? merged.tracks
      : [];

    const seen = new Set();
    const scopes = scopesRaw
      .map((s, idx) => {
        const obj = s && typeof s === "object" ? s : null;
        if (!obj) return null;

        const id = toNonEmptyString(obj.id) || "scope-" + (idx + 1);
        if (seen.has(id)) return null;
        seen.add(id);

        return {
          id,
          name: toNonEmptyString(obj.name) || id,
          color: toNonEmptyString(obj.color),
          icon: toNonEmptyString(obj.icon),
        };
      })
      .filter(Boolean);

    const defaultScopeId =
      toNonEmptyString(merged.defaultScopeId) || (scopes.length ? scopes[0].id : "");

    const ui = merged.ui && typeof merged.ui === "object" ? merged.ui : {};
    const uiFlags = {
      showLegend: ui.showLegend !== false,
      showScopeFilter: ui.showScopeFilter !== false,
      showStartMarker: ui.showStartMarker !== false,
    };

    const notes = Array.isArray(merged.notes)
      ? merged.notes.filter((x) => typeof x === "string" && x.trim() !== "")
      : [];

    // Startposition (für spätere Achse/Rendering)
    const startPos = start && start.label ? parseTimelinePosition(start.label) : null;
    if (start && startPos && startPos.kind !== "none") {
      start.position = startPos;
    }

    return { start, scopes, defaultScopeId, ui: uiFlags, notes };
  }

  function computeTimelineConfig(raw) {
    const normalized = normalizeTimeline(raw);
    const meta = normalizeTimelineMeta(raw, rawTimelineMeta);

    // Default Scope auf Items anwenden (wenn Item keinen hat)
    const fallbackScope = meta && meta.defaultScopeId ? meta.defaultScopeId : "";
    const items = (normalized.items || []).map((it) => ({
      ...it,
      scopeId: it.scopeId || fallbackScope || "",
    }));

    return { ...normalized, items, meta };
  }

  let timelineConfig = computeTimelineConfig(rawTimeline);

  function getTimelineItems() {
    return (
      timelineConfig && Array.isArray(timelineConfig.items) ? timelineConfig.items : []
    ).slice();
  }

  function getTimelineItemById(id) {
    if (!id) return null;
    const items =
      timelineConfig && Array.isArray(timelineConfig.items) ? timelineConfig.items : [];
    return items.find((x) => x && x.id === id) || null;
  }

  function resolveTimelineEntry(item) {
    if (!item || !item.entryId) return null;
    return findEntryById(item.entryId);
  }

  function getTimelineMeta() {
    const meta = timelineConfig && timelineConfig.meta ? timelineConfig.meta : null;
    if (!meta) {
      return {
        start: null,
        scopes: [],
        defaultScopeId: "",
        ui: { showLegend: true, showScopeFilter: true, showStartMarker: true },
        notes: [],
      };
    }
    return {
      start: meta.start ? { ...meta.start } : null,
      scopes: Array.isArray(meta.scopes) ? meta.scopes.map((s) => ({ ...s })) : [],
      defaultScopeId: typeof meta.defaultScopeId === "string" ? meta.defaultScopeId : "",
      ui:
        meta.ui && typeof meta.ui === "object"
          ? { ...meta.ui }
          : { showLegend: true, showScopeFilter: true, showStartMarker: true },
      notes: Array.isArray(meta.notes) ? meta.notes.slice() : [],
    };
  }

  function getTimelineScopes() {
    const meta = timelineConfig && timelineConfig.meta ? timelineConfig.meta : null;
    const scopes = meta && Array.isArray(meta.scopes) ? meta.scopes : [];
    return scopes.map((s) => ({ ...s }));
  }

  function getTimelineScopeById(id) {
    const sid = toNonEmptyString(id);
    if (!sid) return null;
    const meta = timelineConfig && timelineConfig.meta ? timelineConfig.meta : null;
    const scopes = meta && Array.isArray(meta.scopes) ? meta.scopes : [];
    return scopes.find((s) => s && s.id === sid) || null;
  }

  function getTimelineItemsByScope(scopeId) {
    const sid = toNonEmptyString(scopeId);
    const items =
      timelineConfig && Array.isArray(timelineConfig.items) ? timelineConfig.items : [];
    if (!sid) return items.slice();
    return items.filter((it) => it && it.scopeId === sid);
  }

  const THEME_STORAGE_KEY = "dnd-glossar-theme";
  const HAND_STORAGE_KEY = "dnd-glossar-handedness";
  const NEW_SEEN_STORAGE_KEY = "dnd-glossar-new-seen";

  // NEU: Owner/Charaktername für dynamischen Header
  const OWNER_NAME_STORAGE_KEY = "dnd-glossar-owner-name";

  // Theme-Metadaten (für Settings-UI: hell/dunkel + Namen)
  // CSS-Definitionen für neue Themes kommen in style.base.css dazu.
  const THEME_DEFINITIONS = [
    // Hell
    { id: "light", name: "Hell", kind: "light", description: "Klar, schlicht, gut lesbar." },
    { id: "parchment", name: "Pergament", kind: "light", description: "Papier-/Buchoptik, warm und ruhig." },
    { id: "sage", name: "Salbei", kind: "light", description: "Sanft-grün, wie Kräuter & Wiesen." },
    { id: "tavern", name: "Taverne", kind: "light", description: "Holz-warm, gemütliche Abendstimmung." },
    { id: "sky", name: "Himmelskarte", kind: "light", description: "Kühl & luftig, wie Kartenpapier und Himmel." },
    { id: "sunrise", name: "Sonnenaufgang", kind: "light", description: "Goldene Akzente, freundlich und lebendig." },

    // Dunkel
    { id: "dark", name: "Dunkel", kind: "dark", description: "Standard Dark-Mode." },
    { id: "forest", name: "Dämmerwald", kind: "dark", description: "Moosig, naturdunkel." },
    { id: "bloodmoon", name: "Blutmond", kind: "dark", description: "Dunkel mit roten Akzenten." },
    { id: "deepsea", name: "Tiefsee", kind: "dark", description: "Blaugrün, ruhig und dunkel." },
    { id: "arcane", name: "Arkanum", kind: "dark", description: "Violett-magisch, mystisch." },
    { id: "ember", name: "Glut", kind: "dark", description: "Schmiede-Feeling, warm-dunkel." },
  ];

  // Alle unterstützten Theme-IDs
  const AVAILABLE_THEMES = THEME_DEFINITIONS.map((t) => t.id);

  // Kategorien (inkl. "all")
  let allCategories = [{ id: "all", name: "Alle Einträge", icon: "📚" }, ...categories];

  function getCategoryById(id) {
    if (!id) return null;
    return allCategories.find((c) => c.id === id) || null;
  }

  // Schnelles Lookup nur für echte Kategorien (ohne "all")
  let categoryMap = new Map();
  function rebuildCategoryMap() {
    const map = new Map();
    categories.forEach((c) => {
      if (c && typeof c.id === "string") map.set(c.id, c);
    });
    categoryMap = map;
  }
  rebuildCategoryMap();

  function isEntryVisible(entry) {
    // fehlendes visible -> sichtbar; visible === false -> versteckt
    return !!entry && entry.visible !== false;
  }

  function findEntryById(id) {
    if (!id) return null;
    const e = entries.find((entry) => entry.id === id) || null;
    return isEntryVisible(e) ? e : null;
  }

  function getVisibleEntries() {
    return entries.filter((e) => isEntryVisible(e));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
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

  // -----------------------------
  // Bestiary (NEU)
  // -----------------------------
  let rawBestiary =
    window.bestiary && typeof window.bestiary === "object" ? window.bestiary : null;

  function slugifyId(raw) {
    const s = toNonEmptyString(raw).toLowerCase();
    if (!s) return "";
    return s
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "") // diacritics
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // robuste List-Parser (Tags/Images/etc.)
  function normalizeStringList(raw, options) {
    const opts = options && typeof options === "object" ? options : {};
    const mode = opts.mode === "images" ? "images" : "default"; // images: weniger aggressiv splitten
    const allowComma = opts.allowComma !== false;

    let arr = [];
    if (Array.isArray(raw)) {
      arr = raw.map((x) => toNonEmptyString(x)).filter(Boolean);
    } else if (typeof raw === "string") {
      const s = raw.trim();
      if (!s) arr = [];
      else if (s.includes("\n")) {
        arr = s.split(/\r?\n+/g).map((x) => toNonEmptyString(x)).filter(Boolean);
      } else if (mode !== "images" && s.includes(";")) {
        arr = s.split(/\s*;\s*/g).map((x) => toNonEmptyString(x)).filter(Boolean);
      } else if (allowComma && s.includes(",") && (mode !== "images" || !/https?:\/\//i.test(s))) {
        arr = s.split(/\s*,\s*/g).map((x) => toNonEmptyString(x)).filter(Boolean);
      } else {
        arr = [s];
      }
    } else if (raw != null) {
      const s = toNonEmptyString(raw);
      arr = s ? [s] : [];
    }

    // dedupe
    const seen = new Set();
    const out = [];
    arr.forEach((x) => {
      const key = x.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      out.push(x);
    });

    return out;
  }

  function pickFirstNonEmpty(obj, keys) {
    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];
      const v = obj && obj[k];
      const s = toNonEmptyString(v);
      if (s) return s;
    }
    return "";
  }

  // Harvest normalisieren (rein informativ)
  function normalizeBestiaryHarvest(raw) {
    if (!raw) return [];

    const out = [];
    const add = (dcValue, yieldsValue) => {
      const dcNum = typeof dcValue === "number" ? dcValue : parseInt(String(dcValue || ""), 10);
      if (!Number.isFinite(dcNum) || dcNum <= 0) return;

      let yields = [];
      if (Array.isArray(yieldsValue)) {
        yields = yieldsValue.map((x) => toNonEmptyString(x)).filter(Boolean);
      } else if (typeof yieldsValue === "string") {
        const s = yieldsValue.trim();
        if (!s) yields = [];
        else {
          yields = s
            .split(/\r?\n|,/g)
            .map((x) => toNonEmptyString(x))
            .filter(Boolean);
        }
      } else if (yieldsValue != null) {
        const s = toNonEmptyString(yieldsValue);
        if (s) yields = [s];
      }

      if (!yields.length) return;

      const seen = new Set();
      const finalYields = yields.filter((y) => {
        const key = y.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (!finalYields.length) return;

      out.push({ dc: dcNum, yields: finalYields });
    };

    if (Array.isArray(raw)) {
      raw.forEach((row) => {
        const obj = row && typeof row === "object" ? row : null;
        if (!obj) return;
        const dc =
          obj.dc != null ? obj.dc : obj.sg != null ? obj.sg : obj.DC != null ? obj.DC : obj.SG;
        const yields =
          obj.yields != null
            ? obj.yields
            : obj.items != null
            ? obj.items
            : obj.parts != null
            ? obj.parts
            : obj.loot;
        add(dc, yields);
      });
    } else if (raw && typeof raw === "object") {
      Object.keys(raw).forEach((key) => {
        add(key, raw[key]);
      });
    }

    if (!out.length) return [];

    const byDc = new Map();
    out.forEach((row) => {
      const dc = row.dc;
      const yields = Array.isArray(row.yields) ? row.yields : [];
      if (!byDc.has(dc)) {
        byDc.set(dc, yields.slice());
        return;
      }
      const existing = byDc.get(dc) || [];
      const seen = new Set(existing.map((x) => x.toLowerCase()));
      yields.forEach((y) => {
        const k = y.toLowerCase();
        if (seen.has(k)) return;
        seen.add(k);
        existing.push(y);
      });
      byDc.set(dc, existing);
    });

    const merged = Array.from(byDc.entries()).map(([dc, yields]) => ({ dc, yields }));
    merged.sort((a, b) => a.dc - b.dc);

    return merged;
  }

  // --- Extras sammeln ---
  function collectExtras(source, knownKeys) {
    const obj = source && typeof source === "object" ? source : null;
    const set = knownKeys && typeof knownKeys.has === "function" ? knownKeys : null;
    const out = {};
    if (!obj || !set) return out;

    Object.keys(obj).forEach((k) => {
      if (set.has(k)) return;
      out[k] = obj[k];
    });

    return out;
  }

  const BESTIARY_KNOWN_KEYS = new Set([
    "id","title","name","summary","teaser","fluff","body","description","text",
    "tags","images","image","heroImage",
    "chapterId","chapter","regionId","chapterName","region","lastUpdated",
    "relatedEntryIds","relatedIds",
    "type","kind","creatureType","monsterType","size","cr","challenge","challengeRating","ac","armorClass","hp","hitPoints","speed","movement","alignment",
    "statblock","statBlock","stats","attributes","values",
    "actions","aktionen","attacks","attacken",
    "notes","notizen","special","specials",
    "harvest","harvesting","harvestTable",
    "extras",
  ]);

  const BESTIARY_ENTRY_FALLBACK_KNOWN_KEYS = new Set([
    "id","title","name","summary","body","visible","categoryId",
    "region","session","status","lastUpdated","isNew","relatedIds",
    "tags","images",
    "type","kind","creatureType","monsterType","size","cr","challenge","challengeRating","ac","armorClass","hp","hitPoints","speed","movement","alignment",
    "statblock","statBlock","stats","attributes","values",
    "actions","aktionen","attacks","attacken",
    "notes","notizen","special","specials",
    "harvest","harvesting","harvestTable",
    "extras",
  ]);

  function normalizeBestiaryMonsters(rawList) {
    const src = Array.isArray(rawList) ? rawList : [];
    const out = [];
    const seen = new Set();

    for (let i = 0; i < src.length; i += 1) {
      const it = src[i];
      const obj = it && typeof it === "object" ? it : null;
      if (!obj) continue;

      const fallbackId = "monster-" + (i + 1);
      const id = toNonEmptyString(obj.id) || fallbackId;

      let finalId = id;
      if (seen.has(finalId)) {
        let n = 2;
        while (seen.has(finalId + "-" + n)) n += 1;
        finalId = finalId + "-" + n;
      }
      seen.add(finalId);

      const title = toNonEmptyString(obj.title) || toNonEmptyString(obj.name) || finalId;

      const summary =
        toNonEmptyString(obj.summary) ||
        toNonEmptyString(obj.teaser) ||
        toNonEmptyString(obj.fluff) ||
        "";
      const body =
        toNonEmptyString(obj.body) ||
        toNonEmptyString(obj.description) ||
        toNonEmptyString(obj.text) ||
        "";

      const tags = normalizeStringList(obj.tags, { allowComma: true });
      const images = normalizeStringList(
        obj.images != null ? obj.images : obj.image != null ? obj.image : obj.heroImage,
        { mode: "images", allowComma: true }
      );

      const chapterId =
        toNonEmptyString(obj.chapterId) ||
        toNonEmptyString(obj.chapter) ||
        toNonEmptyString(obj.regionId) ||
        "";
      const chapterName = toNonEmptyString(obj.chapterName) || toNonEmptyString(obj.region) || "";

      const lastUpdated = toNonEmptyString(obj.lastUpdated) || "";
      const relatedEntryIds = normalizeStringList(
        obj.relatedEntryIds != null ? obj.relatedEntryIds : obj.relatedIds,
        { allowComma: true }
      );

      const type = pickFirstNonEmpty(obj, ["type", "kind", "creatureType", "monsterType"]);
      const size = pickFirstNonEmpty(obj, ["size"]);
      const cr = pickFirstNonEmpty(obj, ["cr", "challenge", "challengeRating"]);
      const ac = pickFirstNonEmpty(obj, ["ac", "armorClass"]);
      const hp = pickFirstNonEmpty(obj, ["hp", "hitPoints"]);
      const speed = pickFirstNonEmpty(obj, ["speed", "movement"]);
      const alignment = pickFirstNonEmpty(obj, ["alignment"]);

      const statblock =
        obj.statblock != null
          ? obj.statblock
          : obj.statBlock != null
          ? obj.statBlock
          : obj.stats != null
          ? obj.stats
          : obj.attributes != null
          ? obj.attributes
          : obj.values != null
          ? obj.values
          : null;

      const actions =
        obj.actions != null
          ? obj.actions
          : obj.aktionen != null
          ? obj.aktionen
          : obj.attacks != null
          ? obj.attacks
          : obj.attacken != null
          ? obj.attacken
          : null;

      const notes =
        obj.notes != null
          ? obj.notes
          : obj.notizen != null
          ? obj.notizen
          : obj.special != null
          ? obj.special
          : obj.specials != null
          ? obj.specials
          : "";

      const harvestRaw =
        obj.harvest != null
          ? obj.harvest
          : obj.harvesting != null
          ? obj.harvesting
          : obj.harvestTable != null
          ? obj.harvestTable
          : null;

      const harvest = normalizeBestiaryHarvest(harvestRaw);

      // ✅ Anpassung: `extras` aus data.js in allen Typen mitnehmen
      const collectedExtras = collectExtras(obj, BESTIARY_KNOWN_KEYS);
      const explicitExtrasRaw = obj.extras;

      let extras = collectedExtras;

      if (explicitExtrasRaw != null) {
        if (isPlainObject(explicitExtrasRaw)) {
          extras = { ...collectedExtras, ...explicitExtrasRaw };
        } else {
          const hasCollected = collectedExtras && Object.keys(collectedExtras).length > 0;
          extras = hasCollected ? { ...collectedExtras, Extras: explicitExtrasRaw } : explicitExtrasRaw;
        }
      }

      out.push({
        id: finalId,
        title,
        summary,
        body,

        tags,
        images,

        chapterId,
        chapterName,

        type,
        size,
        cr,
        ac,
        hp,
        speed,
        alignment,

        statblock: statblock != null ? statblock : "",
        actions: actions != null ? actions : "",
        notes: notes != null ? notes : "",

        harvest,
        extras,

        lastUpdated,
        relatedEntryIds,

        _index: i,
      });
    }

    return out;
  }

  function normalizeBestiaryChapters(rawChapters) {
    const src = Array.isArray(rawChapters) ? rawChapters : [];
    const out = [];
    const seen = new Set();

    for (let i = 0; i < src.length; i += 1) {
      const it = src[i];
      const obj = it && typeof it === "object" ? it : null;
      if (!obj) continue;

      const id = toNonEmptyString(obj.id) || "chapter-" + (i + 1);
      if (seen.has(id)) continue;
      seen.add(id);

      const name = toNonEmptyString(obj.name) || id;
      const icon = toNonEmptyString(obj.icon) || "";

      out.push({ id, name, icon, _index: i });
    }

    return out;
  }

  function entriesToFallbackMonsters() {
    const src = Array.isArray(entries) ? entries : [];
    const monsters = src
      .filter((e) => e && isEntryVisible(e) && e.categoryId === "monsters")
      .map((e, idx) => {
        const region = toNonEmptyString(e.region);
        const chapterId = region ? slugifyId(region) : "";

        const harvest = normalizeBestiaryHarvest(e.harvest);

        // ✅ Anpassung: Entry-`extras` in allen Typen mitnehmen
        const collectedExtras = collectExtras(e, BESTIARY_ENTRY_FALLBACK_KNOWN_KEYS);
        const explicitExtrasRaw = e.extras;

        let extras = collectedExtras;
        if (explicitExtrasRaw != null) {
          if (isPlainObject(explicitExtrasRaw)) {
            extras = { ...collectedExtras, ...explicitExtrasRaw };
          } else {
            const hasCollected = collectedExtras && Object.keys(collectedExtras).length > 0;
            extras = hasCollected ? { ...collectedExtras, Extras: explicitExtrasRaw } : explicitExtrasRaw;
          }
        }

        return {
          id: toNonEmptyString(e.id) || "monster-fallback-" + (idx + 1),
          title: toNonEmptyString(e.title) || toNonEmptyString(e.name) || "Monster",
          summary: toNonEmptyString(e.summary) || "",
          body: toNonEmptyString(e.body) || "",
          tags: normalizeStringList(e.tags, { allowComma: true }),
          images: normalizeStringList(e.images, { mode: "images", allowComma: true }),
          chapterId,
          chapterName: region,

          type: pickFirstNonEmpty(e, ["type", "kind", "creatureType", "monsterType"]),
          size: pickFirstNonEmpty(e, ["size"]),
          cr: pickFirstNonEmpty(e, ["cr", "challenge", "challengeRating"]),
          ac: pickFirstNonEmpty(e, ["ac", "armorClass"]),
          hp: pickFirstNonEmpty(e, ["hp", "hitPoints"]),
          speed: pickFirstNonEmpty(e, ["speed", "movement"]),
          alignment: pickFirstNonEmpty(e, ["alignment"]),

          statblock:
            e.statblock != null
              ? e.statblock
              : e.statBlock != null
              ? e.statBlock
              : e.stats != null
              ? e.stats
              : "",
          actions:
            e.actions != null
              ? e.actions
              : e.aktionen != null
              ? e.aktionen
              : e.attacks != null
              ? e.attacks
              : "",
          notes: e.notes != null ? e.notes : e.notizen != null ? e.notizen : "",

          harvest,
          extras,

          lastUpdated: toNonEmptyString(e.lastUpdated) || "",
          relatedEntryIds: normalizeStringList(e.relatedIds, { allowComma: true }),
          _index: idx,
          _fromEntry: true,
        };
      });

    const chaptersMap = new Map();
    monsters.forEach((m) => {
      const cid = toNonEmptyString(m.chapterId);
      const cname = toNonEmptyString(m.chapterName);
      if (!cid || !cname) return;
      if (chaptersMap.has(cid)) return;
      chaptersMap.set(cid, { id: cid, name: cname, icon: "" });
    });

    const chapters = Array.from(chaptersMap.values());

    return { monsters, chapters, meta: { title: "Bestiarium", subtitle: "" }, _fallback: true };
  }

  function computeBestiaryConfig(raw) {
    const obj = raw && typeof raw === "object" ? raw : null;

    if (!obj) return entriesToFallbackMonsters();

    const monstersRaw = Array.isArray(obj) ? obj : Array.isArray(obj.monsters) ? obj.monsters : [];
    const monsters = normalizeBestiaryMonsters(monstersRaw);

    const metaObj =
      obj && typeof obj === "object" && !Array.isArray(obj) && typeof obj.meta === "object"
        ? obj.meta
        : null;

    const meta = {
      title: toNonEmptyString(metaObj && metaObj.title) || "Bestiarium",
      subtitle: toNonEmptyString(metaObj && metaObj.subtitle) || "",
    };

    let chapters = normalizeBestiaryChapters(obj && obj.chapters);
    if (!chapters.length) {
      const map = new Map();
      monsters.forEach((m) => {
        const cid = toNonEmptyString(m.chapterId);
        const cname = toNonEmptyString(m.chapterName);
        if (!cid) return;
        if (map.has(cid)) return;
        map.set(cid, { id: cid, name: cname || cid, icon: "" });
      });
      chapters = Array.from(map.values());
    }

    const chapterIds = new Set(chapters.map((c) => c.id));
    monsters.forEach((m) => {
      const cid = toNonEmptyString(m.chapterId);
      if (!cid) return;
      if (chapterIds.has(cid)) return;
      chapterIds.add(cid);
      chapters.push({ id: cid, name: toNonEmptyString(m.chapterName) || cid, icon: "" });
    });

    return { monsters, chapters, meta, _fallback: false };
  }

  let bestiaryConfig = computeBestiaryConfig(rawBestiary);

  function getBestiaryMonsters() {
    return bestiaryConfig && Array.isArray(bestiaryConfig.monsters)
      ? bestiaryConfig.monsters.slice()
      : [];
  }

  function findBestiaryMonsterById(id) {
    const sid = toNonEmptyString(id);
    if (!sid) return null;
    const monsters =
      bestiaryConfig && Array.isArray(bestiaryConfig.monsters) ? bestiaryConfig.monsters : [];
    return monsters.find((m) => m && m.id === sid) || null;
  }

  function getBestiaryChapters() {
    const chapters =
      bestiaryConfig && Array.isArray(bestiaryConfig.chapters) ? bestiaryConfig.chapters : [];
    return chapters.map((c) => ({ ...c }));
  }

  function getBestiaryChapterById(id) {
    const sid = toNonEmptyString(id);
    if (!sid) return null;
    const chapters =
      bestiaryConfig && Array.isArray(bestiaryConfig.chapters) ? bestiaryConfig.chapters : [];
    return chapters.find((c) => c && c.id === sid) || null;
  }

  function getBestiaryMeta() {
    const meta = bestiaryConfig && bestiaryConfig.meta ? bestiaryConfig.meta : null;
    return {
      title: meta && typeof meta.title === "string" ? meta.title : "Bestiarium",
      subtitle: meta && typeof meta.subtitle === "string" ? meta.subtitle : "",
    };
  }

  // --- Category Groups (optional) ---
  let rawCategoryGroups = Array.isArray(window.categoryGroups) ? window.categoryGroups : null;

  function normalizeCategoryGroups(groups) {
    if (!Array.isArray(groups) || !groups.length) return [];

    const allowedIds = new Set(categories.map((c) => c.id));

    const normalized = groups
      .map((g, index) => {
        const obj = g && typeof g === "object" ? g : null;
        if (!obj) return null;

        const id =
          typeof obj.id === "string" && obj.id.trim()
            ? obj.id.trim()
            : "group-" + index;

        const name =
          typeof obj.name === "string" && obj.name.trim()
            ? obj.name.trim()
            : "Gruppe " + (index + 1);

        const icon =
          typeof obj.icon === "string" && obj.icon.trim()
            ? obj.icon.trim()
            : "";

        const rawIds = Array.isArray(obj.categoryIds)
          ? obj.categoryIds
          : Array.isArray(obj.categories)
          ? obj.categories
          : Array.isArray(obj.items)
          ? obj.items
          : [];

        const seen = new Set();
        const categoryIds = rawIds
          .map((x) => String(x || "").trim())
          .filter(Boolean)
          .filter((cid) => allowedIds.has(cid))
          .filter((cid) => {
            if (seen.has(cid)) return false;
            seen.add(cid);
            return true;
          });

        return { id, name, icon, categoryIds };
      })
      .filter(Boolean);

    return normalized.filter((g) => Array.isArray(g.categoryIds) && g.categoryIds.length);
  }

  function computeCategoryGroups() {
    const normalized = normalizeCategoryGroups(rawCategoryGroups);

    const allIdsInOrder = categories.map((c) => c.id).filter(Boolean);

    if (!normalized.length) {
      return [
        {
          id: "__default__",
          name: "Kategorien",
          icon: "",
          categoryIds: allIdsInOrder.slice(),
          _auto: true,
        },
      ];
    }

    const used = new Set();
    normalized.forEach((g) => (g.categoryIds || []).forEach((id) => used.add(id)));

    const missing = allIdsInOrder.filter((id) => !used.has(id));

    if (missing.length) {
      let otherId = "__other__";
      const existingIds = new Set(normalized.map((g) => g.id));
      if (existingIds.has(otherId)) {
        let i = 2;
        while (existingIds.has(otherId + "_" + i)) i += 1;
        otherId = otherId + "_" + i;
      }

      normalized.push({
        id: otherId,
        name: "Weitere",
        icon: "➕",
        categoryIds: missing,
        _auto: true,
      });
    }

    return normalized;
  }

  let categoryGroups = computeCategoryGroups();

  function getCategoryGroups() {
    return categoryGroups.slice();
  }

  function getCategoryGroupById(groupId) {
    if (!groupId) return null;
    return categoryGroups.find((g) => g.id === groupId) || null;
  }

  function getCategoryGroupForCategoryId(categoryId) {
    if (!categoryId || categoryId === "all") return null;
    for (let i = 0; i < categoryGroups.length; i += 1) {
      const g = categoryGroups[i];
      if ((g.categoryIds || []).includes(categoryId)) return g;
    }
    return null;
  }

  function getCategoryGroupsResolved() {
    return categoryGroups.map((g) => {
      const resolved = (g.categoryIds || [])
        .map((id) => categoryMap.get(id))
        .filter(Boolean);
      return { ...g, categories: resolved };
    });
  }

  function getUngroupedCategoryIds() {
    const allIdsInOrder = categories.map((c) => c.id).filter(Boolean);
    const used = new Set();
    categoryGroups.forEach((g) => (g.categoryIds || []).forEach((id) => used.add(id)));
    return allIdsInOrder.filter((id) => !used.has(id));
  }

  // --- Parsing Helpers ---

  function parseLastUpdatedTs(entry) {
    if (!entry || !entry.lastUpdated) return 0;
    const t = Date.parse(entry.lastUpdated);
    if (Number.isNaN(t)) return 0;
    return t;
  }

  function parseSessionNumber(entry) {
    if (!entry || !entry.session) return Number.POSITIVE_INFINITY;
    const s = String(entry.session);
    const match = s.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (!Number.isNaN(num)) return num;
    }
    return Number.POSITIVE_INFINITY;
  }

  const initialSelectedId = (function () {
    const firstVisible = entries.find((e) => isEntryVisible(e));
    return firstVisible ? firstVisible.id : null;
  })();

  const initialSelectedMonsterId = (function () {
    const ms =
      bestiaryConfig && Array.isArray(bestiaryConfig.monsters) ? bestiaryConfig.monsters : [];
    const first = ms && ms.length ? ms[0] : null;
    return first && first.id ? first.id : null;
  })();

  const state = {
    activeCategoryId: "all",
    searchQuery: "",
    selectedEntryId: initialSelectedId,
    sidebarOpen: false,
    theme: "dark",
    sortBy: "default",
    activeTag: null,
    handedness: "right",
    newSeenMap: {},

    ownerName: "",

    categorySheetOpen: false,

    onlyNew: false,
    onlyUnseenNew: false,

    view: "dashboard",
    dashboard: dashboardConfig,
    timeline: timelineConfig,

    bestiary: bestiaryConfig,
    bestiarySearchQuery: "",
    bestiarySelectedMonsterId: initialSelectedMonsterId,

    lastDashboardPercent: null,
    navMenuOpen: false,
  };

  // --- Theme & Handedness Handling ---

  function detectInitialTheme() {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && AVAILABLE_THEMES.includes(stored)) {
        return stored;
      }
    } catch {}

    if (window.matchMedia) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
    } catch {}
    return "right";
  }

  function applyTheme(theme) {
    const fallback = "dark";
    const value = AVAILABLE_THEMES.includes(theme) ? theme : fallback;

    state.theme = value;
    const root = document.documentElement;
    root.setAttribute("data-theme", value);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {}
  }

  function applyHandedness(hand) {
    const value = hand === "left" ? "left" : "right";
    state.handedness = value;

    const appEl = document.querySelector(".app");
    if (appEl) {
      appEl.classList.toggle("hand-left", value === "left");
      appEl.classList.toggle("hand-right", value === "right");
    }

    try {
      window.localStorage.setItem(HAND_STORAGE_KEY, value);
    } catch {}
  }

  // --- Owner/Charaktername Handling ---

  function sanitizeOwnerName(value) {
    if (value == null) return "";
    if (typeof value === "string") return value.trim();
    return String(value).trim();
  }

  function detectInitialOwnerName() {
    try {
      const stored = window.localStorage.getItem(OWNER_NAME_STORAGE_KEY);
      return sanitizeOwnerName(stored);
    } catch {
      return "";
    }
  }

  function formatPossessive(name) {
    const n = sanitizeOwnerName(name);
    if (!n) return "";
    const lower = n.toLowerCase();
    const endsWithApostropheOnly =
      lower.endsWith("s") || lower.endsWith("ß") || lower.endsWith("x") || lower.endsWith("z");
    return endsWithApostropheOnly ? n + "’" : n + "’s";
  }

  function getHeaderSubtitle() {
    const n = sanitizeOwnerName(state.ownerName);
    if (!n) return "Ein Nachschlagewerk von Duria";
    return formatPossessive(n) + " Nachschlagewerk von Duria";
  }

  function applyOwnerName(name, options) {
    const opts = options && typeof options === "object" ? options : {};
    const value = sanitizeOwnerName(name);

    state.ownerName = value;

    try {
      if (value) window.localStorage.setItem(OWNER_NAME_STORAGE_KEY, value);
      else window.localStorage.removeItem(OWNER_NAME_STORAGE_KEY);
    } catch {}

    if (opts.skipRender) return;

    const appObj = window.GlossaryApp;
    if (appObj && typeof appObj.renderHeader === "function") {
      appObj.renderHeader();
    } else if (appObj && typeof appObj.renderAll === "function") {
      appObj.renderAll();
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
    } catch {}
  }

  function isEntryNew(entry) {
    if (!entry || !entry.isNew) return false;

    const ref = entry.lastUpdated || "";
    const map = state.newSeenMap || {};
    const stored = map[entry.id];

    if (!stored) return true;
    return stored !== ref;
  }

  function markEntryNewSeen(entry, options) {
    if (!entry || !entry.isNew) return;

    const ref = entry.lastUpdated || "";
    if (!state.newSeenMap) state.newSeenMap = {};

    if (state.newSeenMap[entry.id] === ref) return;

    state.newSeenMap[entry.id] = ref;
    saveNewSeenMap();

    if (!options || !options.skipRender) {
      const appObj = window.GlossaryApp;
      if (appObj && typeof appObj.renderAll === "function") {
        appObj.renderAll();
      }
    }
  }

  // --- Spezialfilter Helper ---

  function setNewFilter(mode) {
    const m = mode === "unseen" ? "unseen" : mode === "all" ? "all" : null;

    if (!m) {
      state.onlyNew = false;
      state.onlyUnseenNew = false;
      return;
    }

    state.onlyNew = true;
    state.onlyUnseenNew = m === "unseen";
  }

  function clearSpecialFilters() {
    state.onlyNew = false;
    state.onlyUnseenNew = false;
    state.activeTag = null;
  }

  function getActiveNewFilter() {
    if (!state.onlyNew) return null;
    return state.onlyUnseenNew ? "unseen" : "all";
  }

  // --- Dashboard / Stats ---

  function computeQuestStats() {
    const visibleEntries = getVisibleEntries();
    let success = 0;
    let failed = 0;

    visibleEntries.forEach((entry) => {
      if (entry.categoryId === "quests-success") success += 1;
      else if (entry.categoryId === "quests-failed") failed += 1;
    });

    return { success, failed };
  }

  function computeNewStats() {
    const visibleEntries = getVisibleEntries();
    let totalNew = 0;
    let unseenNew = 0;

    visibleEntries.forEach((entry) => {
      if (!entry.isNew) return;
      totalNew += 1;
      if (isEntryNew(entry)) unseenNew += 1;
    });

    return { totalNew, unseenNew };
  }

  function computeRecentUpdates(limit) {
    const n = typeof limit === "number" && limit > 0 ? Math.floor(limit) : 5;

    const visibleEntries = getVisibleEntries()
      .slice()
      .sort((a, b) => parseLastUpdatedTs(b) - parseLastUpdatedTs(a))
      .filter((e) => parseLastUpdatedTs(e) > 0);

    return visibleEntries.slice(0, n);
  }

  function findLatestEntryInCategory(categoryId) {
    if (!categoryId) return null;
    const visibleInCat = getVisibleEntries().filter((e) => e.categoryId === categoryId);
    if (!visibleInCat.length) return null;

    const sorted = visibleInCat
      .slice()
      .sort((a, b) => parseLastUpdatedTs(b) - parseLastUpdatedTs(a));

    const best = sorted[0];
    if (parseLastUpdatedTs(best) > 0) return best;

    return visibleInCat[0];
  }

  function getLatestRecapEntry() {
    return findLatestEntryInCategory("recaps");
  }

  function getLatestPatchEntry() {
    return findLatestEntryInCategory("patch-notes");
  }

  function computeLatestDashboardLinks() {
    return { recap: getLatestRecapEntry(), patch: getLatestPatchEntry() };
  }

  function computeCategoryCounts() {
    const visibleEntries = getVisibleEntries();
    const counts = {};
    visibleEntries.forEach((e) => {
      const id = e.categoryId || "unknown";
      counts[id] = (counts[id] || 0) + 1;
    });
    counts.all = visibleEntries.length;
    return counts;
  }

  function getNewEntries(options) {
    const opts = options && typeof options === "object" ? options : {};
    const unseenOnly = !!opts.unseenOnly;

    return getVisibleEntries().filter((e) => {
      if (!e.isNew) return false;
      if (!unseenOnly) return true;
      return isEntryNew(e);
    });
  }

  // --- Filtering / Sorting Helpers ---

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
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "de", { sensitivity: "base" }));
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
        ...(entry.images || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return parts.includes(query);
    });

    if (state.activeTag) {
      filtered = filtered.filter((entry) => (entry.tags || []).includes(state.activeTag));
    }

    if (state.onlyNew) {
      filtered = filtered.filter((entry) => {
        if (!entry.isNew) return false;
        if (!state.onlyUnseenNew) return true;
        return isEntryNew(entry);
      });
    }

    const collator =
      typeof Intl !== "undefined" ? new Intl.Collator("de", { sensitivity: "base" }) : null;

    function compareTitles(a, b) {
      const aTitle = (a.title || "").toString();
      const bTitle = (b.title || "").toString();
      if (collator) return collator.compare(aTitle, bTitle);
      return aTitle.localeCompare(bTitle);
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
          const aVal = parseSessionNumber(a);
          const bVal = parseSessionNumber(b);
          if (aVal !== bVal) return aVal - bVal;
          return compareTitles(a, b);
        });
        break;
      case "updated-desc":
        filtered.sort((a, b) => {
          const aVal = parseLastUpdatedTs(a);
          const bVal = parseLastUpdatedTs(b);
          if (aVal !== bVal) return bVal - aVal;
          return compareTitles(a, b);
        });
        break;
      case "default":
      default:
        break;
    }

    return filtered;
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

    if (Array.isArray(entry.relatedIds)) {
      entry.relatedIds.forEach(addById);
    }

    if (entry.categoryId === "cities") {
      entries.forEach((e) => {
        if (!isEntryVisible(e)) return;
        if (e.cityId === entry.id) addById(e.id);
      });
    } else if (entry.cityId) {
      addById(entry.cityId);
    }

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

  // Theme-Helper
  function getThemesByKind(kind) {
    const k = kind === "light" ? "light" : kind === "dark" ? "dark" : null;
    if (!k) return [];
    return THEME_DEFINITIONS.filter((t) => t.kind === k);
  }

  function getThemeDefinition(id) {
    if (!id) return null;
    return THEME_DEFINITIONS.find((t) => t.id === id) || null;
  }

  // --- Editor-Bridge: Data austauschen, ohne Reload ---
  function setData(next) {
    const n = next && typeof next === "object" ? next : {};

    if (Array.isArray(n.categories)) {
      categories = n.categories.slice();
      window.categories = categories.slice();
    }
    if (Array.isArray(n.entries)) {
      entries = n.entries.slice();
      window.entries = entries.slice();
    }

    if (n.dashboard && typeof n.dashboard === "object") {
      rawDashboard = n.dashboard;
      window.dashboard = rawDashboard;
    } else if (n.dashboard === null) {
      rawDashboard = null;
      window.dashboard = null;
    }

    if (Array.isArray(n.categoryGroups)) {
      rawCategoryGroups = n.categoryGroups.slice();
      window.categoryGroups = rawCategoryGroups.slice();
    } else if (n.categoryGroups === null) {
      rawCategoryGroups = null;
      window.categoryGroups = null;
    }

    if (Array.isArray(n.timeline)) {
      rawTimeline = { items: n.timeline.slice() };
      window.timeline = rawTimeline;
    } else if (n.timeline && typeof n.timeline === "object") {
      rawTimeline = n.timeline;
      window.timeline = rawTimeline;
    } else if (n.timeline === null) {
      rawTimeline = null;
      window.timeline = null;
    }

    if (n.timelineMeta && typeof n.timelineMeta === "object") {
      rawTimelineMeta = n.timelineMeta;
      window.timelineMeta = rawTimelineMeta;
    } else if (n.timelineMeta === null) {
      rawTimelineMeta = null;
      window.timelineMeta = null;
    }

    if (Array.isArray(n.bestiary)) {
      rawBestiary = { monsters: n.bestiary.slice() };
      window.bestiary = rawBestiary;
    } else if (n.bestiary && typeof n.bestiary === "object") {
      rawBestiary = n.bestiary;
      window.bestiary = rawBestiary;
    } else if (n.bestiary === null) {
      rawBestiary = null;
      window.bestiary = null;
    }

    allCategories = [{ id: "all", name: "Alle Einträge", icon: "📚" }, ...categories];
    rebuildCategoryMap();
    categoryGroups = computeCategoryGroups();

    dashboardConfig = computeDashboardConfig(rawDashboard);
    state.dashboard = dashboardConfig;
    state.lastDashboardPercent = null;

    timelineConfig = computeTimelineConfig(rawTimeline);
    state.timeline = timelineConfig;

    bestiaryConfig = computeBestiaryConfig(rawBestiary);
    state.bestiary = bestiaryConfig;

    const monsterOk =
      state.bestiarySelectedMonsterId && findBestiaryMonsterById(state.bestiarySelectedMonsterId);
    if (!monsterOk) {
      const ms =
        bestiaryConfig && Array.isArray(bestiaryConfig.monsters) ? bestiaryConfig.monsters : [];
      state.bestiarySelectedMonsterId = ms.length ? ms[0].id : null;
    }

    if (state.activeCategoryId !== "all" && !getCategoryById(state.activeCategoryId)) {
      state.activeCategoryId = "all";
    }

    const selectedOk = state.selectedEntryId && findEntryById(state.selectedEntryId);
    if (!selectedOk) {
      const firstInCat = entries.find((e) => {
        if (!isEntryVisible(e)) return false;
        if (state.activeCategoryId === "all") return true;
        return e.categoryId === state.activeCategoryId;
      });
      state.selectedEntryId = firstInCat ? firstInCat.id : null;
    }

    const appObj = window.GlossaryApp;
    if (appObj && typeof appObj === "object") {
      appObj.categories = categories;
      appObj.entries = entries;

      appObj.rawDashboard = rawDashboard;
      appObj.dashboardConfig = dashboardConfig;

      appObj.rawTimeline = rawTimeline;
      appObj.rawTimelineMeta = rawTimelineMeta;
      appObj.timelineMeta = timelineConfig && timelineConfig.meta ? timelineConfig.meta : null;
      appObj.timelineConfig = timelineConfig;

      appObj.rawBestiary = rawBestiary;
      appObj.bestiaryConfig = bestiaryConfig;

      appObj.rawCategoryGroups = rawCategoryGroups;
      appObj.categoryGroups = categoryGroups;
      appObj.allCategories = allCategories;
    }

    try {
      if (appObj && typeof appObj.renderAll === "function") {
        appObj.renderAll();
      }
    } catch {}
  }

  // ✅ Hydration beim Start (ohne Early-Render)
  loadNewSeenMap();
  state.ownerName = detectInitialOwnerName();
  state.theme = detectInitialTheme();
  applyTheme(state.theme);
  state.handedness = detectInitialHandedness();
  applyHandedness(state.handedness);

  // Globale App-API bereitstellen
  window.GlossaryApp = {
    categories,
    entries,

    rawDashboard,
    dashboardConfig,

    rawTimeline,
    rawTimelineMeta,
    timelineConfig,
    normalizeTimeline,
    normalizeTimelineMeta,
    computeTimelineConfig,
    parseTimelinePosition,
    getTimelineItems,
    getTimelineItemById,
    getTimelineItemsByScope,
    resolveTimelineEntry,
    getTimelineMeta,
    getTimelineScopes,
    getTimelineScopeById,

    // Timeline Era Sort-Konstante (UI kann sie bei Bedarf nutzen; Anzeige/Achse darf sie nicht verwenden)
    ERA_SORT_NGT_OFFSET,

    rawBestiary,
    bestiaryConfig,
    computeBestiaryConfig,
    normalizeBestiaryMonsters,
    normalizeBestiaryChapters,
    normalizeBestiaryHarvest,
    getBestiaryMonsters,
    findBestiaryMonsterById,
    getBestiaryChapters,
    getBestiaryChapterById,
    getBestiaryMeta,
    slugifyId,

    rawCategoryGroups,
    categoryGroups,
    normalizeCategoryGroups,
    computeCategoryGroups,
    getCategoryGroups,
    getCategoryGroupsResolved,
    getCategoryGroupById,
    getCategoryGroupForCategoryId,
    getUngroupedCategoryIds,

    state,
    allCategories,

    getCategoryById,
    isEntryVisible,
    findEntryById,
    getVisibleEntries,

    escapeHtml,
    buildImageUrl,

    THEME_DEFINITIONS,
    AVAILABLE_THEMES,
    getThemesByKind,
    getThemeDefinition,

    detectInitialTheme,
    detectInitialHandedness,
    applyTheme,
    applyHandedness,

    loadNewSeenMap,
    saveNewSeenMap,
    isEntryNew,
    markEntryNewSeen,

    OWNER_NAME_STORAGE_KEY,
    detectInitialOwnerName,
    applyOwnerName,
    formatPossessive,
    getHeaderSubtitle,

    setNewFilter,
    clearSpecialFilters,
    getActiveNewFilter,

    parseLastUpdatedTs,
    parseSessionNumber,
    computeQuestStats,
    computeNewStats,
    computeRecentUpdates,
    findLatestEntryInCategory,
    getLatestRecapEntry,
    getLatestPatchEntry,
    computeLatestDashboardLinks,
    computeCategoryCounts,
    getNewEntries,

    getEntriesInActiveCategory,
    getAvailableTagsForActiveCategory,
    getFilteredEntries,

    computeRelatedEntries,

    setData,
    replaceData: setData,
  };
})();
