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

  function encodeRouteToken(value) {
    const s = toNonEmptyString(value);
    if (!s) return "";
    try {
      return encodeURIComponent(s);
    } catch {
      return s;
    }
  }

  function decodeRouteToken(value) {
    const s = toNonEmptyString(value);
    if (!s) return "";
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  }

  function getEntryRouteHash(id) {
    const token = encodeRouteToken(id);
    return token ? `#entry-${token}` : "#glossary";
  }

  function getBestiaryMonsterRouteHash(id) {
    const token = encodeRouteToken(id);
    return token ? `#monster-${token}` : "#bestiary";
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
  const ENTRY_RECENT_STORAGE_KEY = "dnd-glossar-entry-recent";
  const BESTIARY_USER_STORAGE_KEY = "dnd-glossar-bestiary-user";

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
  // Heroes / Heldenakten
  // -----------------------------
  let rawHeroes =
    window.heroes && typeof window.heroes === "object" ? window.heroes : null;

  const HERO_ABILITY_KEYS = ["str", "dex", "con", "int", "wis", "cha"];

  function normalizeComparableText(raw) {
    const s = toNonEmptyString(raw);
    if (!s) return "";
    return s
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .trim()
      .toLowerCase();
  }

  function normalizeHeroAliasList(raw, fallbackValues) {
    const values = [];
    const push = (value) => {
      const normalized = normalizeComparableText(value);
      if (!normalized) return;
      values.push(normalized);
    };

    normalizeStringList(raw, { allowComma: true }).forEach(push);
    (Array.isArray(fallbackValues) ? fallbackValues : []).forEach(push);

    const seen = new Set();
    return values.filter((value) => {
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }

  function parseFiniteNumber(raw, fallback) {
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    const s = toNonEmptyString(raw);
    if (!s) return typeof fallback === "number" ? fallback : 0;
    const match = s.match(/-?\d+(?:[.,]\d+)?/);
    if (!match) return typeof fallback === "number" ? fallback : 0;
    const value = Number(match[0].replace(",", "."));
    return Number.isFinite(value) ? value : typeof fallback === "number" ? fallback : 0;
  }

  function parseNullableNumber(raw) {
    if (raw == null || raw === "") return null;
    const value = parseFiniteNumber(raw, Number.NaN);
    return Number.isFinite(value) ? value : null;
  }

  function normalizeAbilityMap(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    const out = {};
    HERO_ABILITY_KEYS.forEach((key) => {
      const value =
        source[key] != null
          ? source[key]
          : source[key.toUpperCase()] != null
          ? source[key.toUpperCase()]
          : null;
      out[key] = parseFiniteNumber(value, 10);
    });
    return out;
  }

  function normalizeHeroSaves(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    const out = {};
    Object.keys(source).forEach((key) => {
      const value = source[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        out[key] = {
          bonus: parseFiniteNumber(value.bonus, 0),
          proficient: value.proficient === true,
        };
        return;
      }
      out[key] = {
        bonus: parseFiniteNumber(value, 0),
        proficient: false,
      };
    });
    return out;
  }

  function normalizeHeroSkills(raw) {
    const src = Array.isArray(raw) ? raw : [];
    return src
      .map((item, index) => {
        const obj = item && typeof item === "object" ? item : null;
        if (!obj) return null;
        const label =
          toNonEmptyString(obj.label) ||
          toNonEmptyString(obj.name) ||
          toNonEmptyString(obj.id) ||
          "Fertigkeit " + (index + 1);
        const id = toNonEmptyString(obj.id) || slugifyId(label) || "skill-" + (index + 1);
        return {
          id,
          label,
          bonus: parseFiniteNumber(obj.bonus, 0),
          proficient: obj.proficient === true,
          expertise: obj.expertise === true,
        };
      })
      .filter(Boolean);
  }

  function normalizeCombatDamageParts(raw) {
    const src = Array.isArray(raw) ? raw : raw && typeof raw === "object" ? [raw] : [];
    return src
      .map((item, index) => {
        const obj = item && typeof item === "object" ? item : null;
        if (!obj) return null;
        const formula = pickFirstNonEmpty(obj, ["formula", "dice", "damage", "roll"]);
        if (!formula) return null;
        return {
          id: toNonEmptyString(obj.id) || "damage-" + (index + 1),
          formula,
          type: pickFirstNonEmpty(obj, ["type", "damageType"]) || "Unbekannt",
          bonus: parseNullableNumber(obj.bonus),
          notes: pickFirstNonEmpty(obj, ["notes", "note"]),
        };
      })
      .filter(Boolean);
  }

  const COMBAT_ACTION_TYPES = new Set(["attack", "save", "heal", "effect", "multiattack", "utility"]);
  const COMBAT_ACTION_COSTS = new Set(["action", "bonusAction", "reaction", "legendary", "lair", "none"]);
  const COMBAT_TARGET_MODES = new Set(["single", "multiple", "area", "self", "all"]);
  const COMBAT_TARGET_SIDES = new Set(["enemies", "allies", "self", "any"]);
  const COMBAT_SAVE_SUCCESS = new Set(["none", "half", "negates", "custom"]);

  function normalizeCombatActionType(raw, fallback) {
    const value = (toNonEmptyString(raw) || fallback || "attack").toLowerCase();
    return COMBAT_ACTION_TYPES.has(value) ? value : "attack";
  }

  function normalizeCombatActionCost(raw) {
    const value = (toNonEmptyString(raw) || "action").replace(/[\s_-]+/g, "").toLowerCase();
    const mapped =
      value === "bonusaction"
        ? "bonusAction"
        : value === "free"
        ? "none"
        : value;
    return COMBAT_ACTION_COSTS.has(mapped) ? mapped : "action";
  }

  function normalizeCombatResourceCost(raw) {
    const obj = raw && typeof raw === "object" ? raw : null;
    if (!obj) return null;

    const type = pickFirstNonEmpty(obj, ["type", "resourceType", "kind"]);
    if (!type) return null;

    const amount = parseFiniteNumber(obj.amount != null ? obj.amount : obj.cost, 1);
    return {
      type,
      level: parseNullableNumber(obj.level),
      amount: amount > 0 ? amount : 1,
      resourceId: pickFirstNonEmpty(obj, ["resourceId", "id"]),
      consume: obj.consume !== false,
      notes: pickFirstNonEmpty(obj, ["notes", "note"]),
    };
  }

  function normalizeHeroSpellSlots(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    const out = {};
    Object.keys(source).forEach((key) => {
      const level = String(parseFiniteNumber(key, 0));
      if (!level || level === "0") return;
      const value = source[key];
      const obj = value && typeof value === "object" ? value : { max: value, current: value };
      const max = parseFiniteNumber(obj.max, 0);
      const current = parseFiniteNumber(obj.current != null ? obj.current : max, max);
      if (max <= 0 && current <= 0) return;
      out[level] = {
        current: Math.max(0, Math.min(max || current, current)),
        max: Math.max(0, max || current),
      };
    });
    return out;
  }

  function normalizeHeroSpellcasting(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    const ability = toNonEmptyString(source.ability || source.stat).toLowerCase();
    const normalizedAbility = HERO_ABILITY_KEYS.includes(ability) ? ability : "";
    const slots = normalizeHeroSpellSlots(source.slots || source.spellSlots);
    const hasSpellcasting =
      !!normalizedAbility ||
      parseNullableNumber(source.spellSaveDc != null ? source.spellSaveDc : source.saveDc) != null ||
      parseNullableNumber(
        source.spellAttackBonus != null ? source.spellAttackBonus : source.attackBonus
      ) != null ||
      Object.keys(slots).length > 0;

    if (!hasSpellcasting) {
      return {
        ability: "",
        spellSaveDc: null,
        spellAttackBonus: null,
        slots: {},
      };
    }

    return {
      ability: normalizedAbility,
      spellSaveDc: parseNullableNumber(source.spellSaveDc != null ? source.spellSaveDc : source.saveDc),
      spellAttackBonus: parseNullableNumber(
        source.spellAttackBonus != null ? source.spellAttackBonus : source.attackBonus
      ),
      slots,
      notes: pickFirstNonEmpty(source, ["notes", "note"]),
    };
  }

  function normalizeHeroSpellbook(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    const levels = source.levels && typeof source.levels === "object" ? source.levels : {};
    const listFor = (value) => normalizeStringList(value, { allowComma: true });

    const spellbook = {
      cantrips: listFor(
        source.cantrips != null
          ? source.cantrips
          : source.tricks != null
          ? source.tricks
          : source.zaubertricks != null
          ? source.zaubertricks
          : levels.cantrips
      ),
      level1: listFor(
        source.level1 != null ? source.level1 : source.grad1 != null ? source.grad1 : levels["1"]
      ),
      level2: listFor(
        source.level2 != null ? source.level2 : source.grad2 != null ? source.grad2 : levels["2"]
      ),
      level3: listFor(
        source.level3 != null ? source.level3 : source.grad3 != null ? source.grad3 : levels["3"]
      ),
      level4: listFor(
        source.level4 != null ? source.level4 : source.grad4 != null ? source.grad4 : levels["4"]
      ),
      level5: listFor(
        source.level5 != null ? source.level5 : source.grad5 != null ? source.grad5 : levels["5"]
      ),
      level6: listFor(
        source.level6 != null ? source.level6 : source.grad6 != null ? source.grad6 : levels["6"]
      ),
      level7: listFor(
        source.level7 != null ? source.level7 : source.grad7 != null ? source.grad7 : levels["7"]
      ),
      level8: listFor(
        source.level8 != null ? source.level8 : source.grad8 != null ? source.grad8 : levels["8"]
      ),
      level9: listFor(
        source.level9 != null ? source.level9 : source.grad9 != null ? source.grad9 : levels["9"]
      ),
      notes: pickFirstNonEmpty(source, ["notes", "note"]),
    };

    const hasEntries = Object.keys(spellbook).some((key) => key !== "notes" && Array.isArray(spellbook[key]) && spellbook[key].length);
    return hasEntries || spellbook.notes ? spellbook : {};
  }

  function normalizeCombatTarget(raw, actionType) {
    const obj = raw && typeof raw === "object" ? raw : {};
    const mode = (toNonEmptyString(obj.mode) || "single").toLowerCase();
    const side = (toNonEmptyString(obj.side) || (actionType === "heal" ? "allies" : "enemies")).toLowerCase();
    const maxTargets = parseNullableNumber(obj.maxTargets);

    return {
      mode: COMBAT_TARGET_MODES.has(mode) ? mode : "single",
      side: COMBAT_TARGET_SIDES.has(side) ? side : "enemies",
      maxTargets: maxTargets != null && maxTargets > 0 ? maxTargets : null,
      radius: parseNullableNumber(obj.radius),
      range: pickFirstNonEmpty(obj, ["range", "reach"]),
      shape: pickFirstNonEmpty(obj, ["shape", "areaShape"]),
      notes: pickFirstNonEmpty(obj, ["notes", "note"]),
    };
  }

  function normalizeCombatSave(raw) {
    const obj = raw && typeof raw === "object" ? raw : null;
    if (!obj) return null;

    const ability = toNonEmptyString(obj.ability || obj.stat).toLowerCase();
    const dc = parseNullableNumber(obj.dc != null ? obj.dc : obj.sg);
    const success = (toNonEmptyString(obj.success || obj.onSuccess) || "half").toLowerCase();

    return {
      ability: HERO_ABILITY_KEYS.includes(ability) ? ability : "dex",
      dc: dc != null ? dc : null,
      success: COMBAT_SAVE_SUCCESS.has(success) ? success : "half",
      failure: pickFirstNonEmpty(obj, ["failure", "onFailure"]),
      notes: pickFirstNonEmpty(obj, ["notes", "note"]),
    };
  }

  function normalizeCombatEffects(raw) {
    const src = Array.isArray(raw) ? raw : raw && typeof raw === "object" ? [raw] : [];
    return src
      .map((item, index) => {
        const obj = item && typeof item === "object" ? item : null;
        if (!obj) return null;
        const id =
          toNonEmptyString(obj.id) ||
          slugifyId(pickFirstNonEmpty(obj, ["name", "condition", "type"])) ||
          "effect-" + (index + 1);
        return {
          id,
          name: pickFirstNonEmpty(obj, ["name", "label", "condition"]) || id,
          type: pickFirstNonEmpty(obj, ["type", "kind"]) || "condition",
          condition: pickFirstNonEmpty(obj, ["condition", "conditionId", "status"]),
          applyOn: (pickFirstNonEmpty(obj, ["applyOn", "when", "trigger"]) || "failure").toLowerCase(),
          duration: obj.duration && typeof obj.duration === "object" ? { ...obj.duration } : null,
          notes: pickFirstNonEmpty(obj, ["notes", "note", "description"]),
        };
      })
      .filter(Boolean);
  }

  function normalizeCombatActions(raw) {
    const src = Array.isArray(raw) ? raw : [];
    return src
      .map((item, index) => {
        const obj = item && typeof item === "object" ? item : null;
        if (!obj) return null;
        const name =
          pickFirstNonEmpty(obj, ["name", "title", "label"]) || "Angriff " + (index + 1);
        const id = toNonEmptyString(obj.id) || slugifyId(name) || "action-" + (index + 1);
        const damage = normalizeCombatDamageParts(obj.damage || obj.damageParts || obj.parts);
        const inferredType =
          toNonEmptyString(obj.type) ||
          (obj.save && typeof obj.save === "object"
            ? "save"
            : obj.healing || obj.heal
            ? "heal"
            : obj.effects || obj.effect
            ? "effect"
            : "attack");
        const type = normalizeCombatActionType(inferredType);
        return {
          id,
          name,
          type,
          actionCost: normalizeCombatActionCost(obj.actionCost || obj.cost),
          resourceCost: normalizeCombatResourceCost(obj.resourceCost || obj.resource),
          target: normalizeCombatTarget(obj.target, type),
          attackBonusSource: pickFirstNonEmpty(obj, ["attackBonusSource", "toHitSource"]),
          saveDcSource: pickFirstNonEmpty(obj, ["saveDcSource", "dcSource"]),
          spellLevel: parseNullableNumber(
            obj.spellLevel != null
              ? obj.spellLevel
              : obj.level != null
              ? obj.level
              : obj.resourceCost && obj.resourceCost.level != null
              ? obj.resourceCost.level
              : null
          ),
          attackBonus: parseFiniteNumber(
            obj.attackBonus != null ? obj.attackBonus : obj.hitBonus != null ? obj.hitBonus : obj.toHit,
            0
          ),
          save: normalizeCombatSave(obj.save),
          damage,
          healing: normalizeCombatDamageParts(obj.healing || obj.heal || obj.healingParts),
          effects: normalizeCombatEffects(obj.effects || obj.effect),
          children: normalizeCombatActions(obj.children || obj.actions || obj.steps),
          notes: pickFirstNonEmpty(obj, ["notes", "note"]),
        };
      })
      .filter((action) => action && (action.type !== "attack" || action.damage.length));
  }

  function normalizeCombatAttacks(raw) {
    return normalizeCombatActions(raw).filter(
      (action) => action && action.type === "attack" && Array.isArray(action.damage) && action.damage.length
    );
  }

  function normalizeHeroResources(raw) {
    const src = Array.isArray(raw) ? raw : [];
    return src
      .map((item, index) => {
        const obj = item && typeof item === "object" ? item : null;
        if (!obj) return null;
        const name =
          pickFirstNonEmpty(obj, ["name", "label", "title"]) || "Ressource " + (index + 1);
        return {
          id: toNonEmptyString(obj.id) || slugifyId(name) || "resource-" + (index + 1),
          name,
          current: parseNullableNumber(obj.current),
          max: parseNullableNumber(obj.max),
          recharge: pickFirstNonEmpty(obj, ["recharge", "refresh"]),
          notes: pickFirstNonEmpty(obj, ["notes", "note"]),
        };
      })
      .filter(Boolean);
  }

  function normalizeArenaVisualConfig(raw, fallbackOptions) {
    const source = raw && typeof raw === "object" ? raw : {};
    const opts = fallbackOptions && typeof fallbackOptions === "object" ? fallbackOptions : {};
    const sprite =
      pickFirstNonEmpty(source, ["sprite", "arenaSprite", "image", "portrait"]) ||
      toNonEmptyString(opts.defaultSprite) ||
      "";
    const backgrounds = normalizeStringList(
      source.backgrounds != null
        ? source.backgrounds
        : source.arenaBackgrounds != null
        ? source.arenaBackgrounds
        : source.background != null
        ? source.background
        : source.stageImage != null
        ? source.stageImage
        : source.arenaStage,
      { mode: "images", allowComma: true }
    );
    const fallbackBackgrounds = normalizeStringList(opts.defaultBackgrounds, {
      mode: "images",
      allowComma: true,
    });
    return {
      sprite,
      backgrounds: backgrounds.length ? backgrounds : fallbackBackgrounds,
    };
  }

  function normalizeHeroes(raw) {
    const obj = raw && typeof raw === "object" ? raw : null;
    const metaObj = obj && typeof obj.meta === "object" ? obj.meta : null;
    const meta = {
      title: toNonEmptyString(metaObj && metaObj.title) || "Heldenakten",
      subtitle:
        toNonEmptyString(metaObj && metaObj.subtitle) ||
        "Persönliche Chroniken bekannter Helden",
    };

    const src = Array.isArray(obj && obj.heroes) ? obj.heroes : Array.isArray(raw) ? raw : [];
    const heroes = [];
    const seen = new Set();

    for (let i = 0; i < src.length; i += 1) {
      const item = src[i];
      const hero = item && typeof item === "object" ? item : null;
      if (!hero) continue;

      const fallbackId = "hero-" + (i + 1);
      const baseId =
        toNonEmptyString(hero.id) ||
        slugifyId(pickFirstNonEmpty(hero, ["name", "title", "playerName"])) ||
        fallbackId;

      let id = baseId;
      if (seen.has(id)) {
        let n = 2;
        while (seen.has(baseId + "-" + n)) n += 1;
        id = baseId + "-" + n;
      }
      seen.add(id);

      const name = pickFirstNonEmpty(hero, ["name", "title"]) || id;
      const playerName = pickFirstNonEmpty(hero, ["playerName", "player"]);
      const aliases = normalizeHeroAliasList(hero.aliases, [name, id]);
      const playerAliases = normalizeHeroAliasList(hero.playerAliases, [playerName]);
      const vitalsSource = hero.vitals && typeof hero.vitals === "object" ? hero.vitals : {};
      const hpMax = parseFiniteNumber(vitalsSource.hpMax != null ? vitalsSource.hpMax : hero.hpMax, 0);
      const hpCurrent = parseFiniteNumber(
        vitalsSource.hpCurrent != null ? vitalsSource.hpCurrent : hero.hpCurrent,
        hpMax
      );
      const combatActions = normalizeCombatActions(
        Array.isArray(hero.actions)
          ? hero.actions
          : Array.isArray(hero.combatActions)
          ? hero.combatActions
          : hero.attacks
      );

      heroes.push({
        id,
        name,
        aliases,
        playerName,
        playerAliases,
        className: pickFirstNonEmpty(hero, ["className", "class"]),
        subclass: pickFirstNonEmpty(hero, ["subclass", "archetype"]),
        level: parseFiniteNumber(hero.level, 1),
        species: pickFirstNonEmpty(hero, ["species", "race", "folk"]),
        title: pickFirstNonEmpty(hero, ["title", "epithet", "byname"]),
        image: pickFirstNonEmpty(hero, ["image", "portrait"]),
        arena: normalizeArenaVisualConfig(hero.arena, {
          defaultSprite: pickFirstNonEmpty(hero, ["image", "portrait"]),
        }),
        vitals: {
          armorClass: parseFiniteNumber(
            vitalsSource.armorClass != null ? vitalsSource.armorClass : hero.armorClass,
            10
          ),
          hpCurrent,
          hpMax,
          initiativeMod: parseFiniteNumber(
            vitalsSource.initiativeMod != null ? vitalsSource.initiativeMod : hero.initiativeMod,
            0
          ),
          speed: pickFirstNonEmpty(vitalsSource, ["speed"]) || pickFirstNonEmpty(hero, ["speed"]),
          passivePerception: parseFiniteNumber(
            vitalsSource.passivePerception != null
              ? vitalsSource.passivePerception
              : hero.passivePerception,
            10
          ),
          proficiencyBonus: parseFiniteNumber(
            vitalsSource.proficiencyBonus != null
              ? vitalsSource.proficiencyBonus
              : hero.proficiencyBonus,
            2
          ),
        },
        abilities: normalizeAbilityMap(hero.abilities),
        saves: normalizeHeroSaves(hero.saves),
        skills: normalizeHeroSkills(hero.skills),
        spellcasting: normalizeHeroSpellcasting(hero.spellcasting),
        spellbook: normalizeHeroSpellbook(hero.spellbook || hero.spells || hero.spellList),
        actions: combatActions,
        combatActions,
        attacks: combatActions.filter((action) => action.type === "attack"),
        resources: normalizeHeroResources(hero.resources),
        notes: pickFirstNonEmpty(hero, ["notes", "note"]),
        background: pickFirstNonEmpty(hero, ["background", "history", "bio"]),
        visible: hero.visible !== false,
        _index: i,
      });
    }

    return { meta, heroes };
  }

  let heroesConfig = normalizeHeroes(rawHeroes);

  function getHeroes() {
    return heroesConfig && Array.isArray(heroesConfig.heroes) ? heroesConfig.heroes.slice() : [];
  }

  function getHeroById(id) {
    const sid = toNonEmptyString(id);
    if (!sid) return null;
    const heroes = heroesConfig && Array.isArray(heroesConfig.heroes) ? heroesConfig.heroes : [];
    return heroes.find((hero) => hero && hero.id === sid) || null;
  }

  function findHeroByAlias(rawName) {
    const needle = normalizeComparableText(rawName);
    if (!needle) return null;
    const heroes = heroesConfig && Array.isArray(heroesConfig.heroes) ? heroesConfig.heroes : [];
    return (
      heroes.find((hero) => {
        if (!hero || hero.visible === false) return false;
        const aliases = []
          .concat(Array.isArray(hero.aliases) ? hero.aliases : [])
          .concat(Array.isArray(hero.playerAliases) ? hero.playerAliases : []);
        return aliases.includes(needle);
      }) || null
    );
  }

  function getHeroesMeta() {
    const meta = heroesConfig && heroesConfig.meta ? heroesConfig.meta : null;
    return {
      title: meta && typeof meta.title === "string" ? meta.title : "Heldenakten",
      subtitle:
        meta && typeof meta.subtitle === "string"
          ? meta.subtitle
          : "Persönliche Chroniken bekannter Helden",
    };
  }

  function getRecognizedHero() {
    const recognizedId =
      state && typeof state.recognizedHeroId === "string" && state.recognizedHeroId
        ? state.recognizedHeroId
        : "";
    if (recognizedId) return getHeroById(recognizedId);
    const owner = state && typeof state.ownerName === "string" ? state.ownerName : "";
    return findHeroByAlias(owner);
  }

  function createEmptyArenaState() {
    return {
      selectedHeroId: null,
      selectedMonsterId: null,
      battle: null,
      lastResult: "",
      log: [],
    };
  }

  function syncHeroState(options) {
    const opts = options && typeof options === "object" ? options : {};
    const recognized = findHeroByAlias(state && state.ownerName);
    const recognizedId = recognized && recognized.id ? recognized.id : null;
    state.recognizedHeroId = recognizedId;

    const visibleHeroes = getHeroes().filter((hero) => hero && hero.visible !== false);
    const firstHeroId = visibleHeroes.length ? visibleHeroes[0].id : null;
    const selectedHero = state.selectedHeroId ? getHeroById(state.selectedHeroId) : null;

    if (!selectedHero) {
      state.selectedHeroId = recognizedId || firstHeroId || null;
    } else if (opts.preferRecognized && recognizedId) {
      state.selectedHeroId = recognizedId;
    }

    state.arena =
      state.arena && typeof state.arena === "object" ? state.arena : createEmptyArenaState();
    if (!state.arena.selectedHeroId || !getHeroById(state.arena.selectedHeroId)) {
      state.arena.selectedHeroId = state.selectedHeroId || recognizedId || firstHeroId || null;
    }
    if (
      !state.arena.selectedMonsterId ||
      !findBestiaryMonsterById(state.arena.selectedMonsterId)
    ) {
      state.arena.selectedMonsterId = state.bestiarySelectedMonsterId || null;
    }
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
    "visible","visibility","fieldVisibility","visibilityMap",
    "tags","images","image","heroImage",
    "arena","arenaSprite","arenaBackgrounds","stageImage","arenaStage",
    "chapterId","chapter","regionId","chapterName","region","lastUpdated",
    "relatedEntryIds","relatedIds",
    "habitat","environment","biome",
    "dangerTags","threatTags","danger","hazardTags",
    "threatClass","dangerClass","dangerLevel","threatLevel",
    "status","state","condition","discoveryStatus","knowledgeStatus","knowledgeLevel","discovery",
    "fieldNote","fieldnote","quote","fieldQuote","quoteText",
    "traceTags","traces","signs",
    "warningSigns","warnings","warnSigns",
    "behavior","verhalten",
    "tactics","strategy","taktik","recommendedTactic",
    "lastSighting","lastSeen","sighting","recentSighting",
    "type","kind","creatureType","monsterType","size","cr","challenge","challengeRating","ac","armorClass","hp","hitPoints","speed","movement","alignment",
    "statblock","statBlock","stats","attributes","values",
    "actions","aktionen","attacks","attacken",
    "notes","notizen","special","specials",
    "harvest","harvesting","harvestTable",
    "combat",
    "extras",
  ]);

  const BESTIARY_ENTRY_FALLBACK_KNOWN_KEYS = new Set([
    "id","title","name","summary","body","visible","categoryId",
    "visibility","fieldVisibility","visibilityMap",
    "region","session","status","lastUpdated","isNew","relatedIds",
    "tags","images",
    "arena","arenaSprite","arenaBackgrounds","stageImage","arenaStage",
    "habitat","environment","biome",
    "dangerTags","threatTags","danger","hazardTags",
    "threatClass","dangerClass","dangerLevel","threatLevel",
    "monsterStatus","discoveryStatus","knowledgeStatus","knowledgeLevel","discovery",
    "fieldNote","fieldnote","quote","fieldQuote","quoteText",
    "traceTags","traces","signs",
    "warningSigns","warnings","warnSigns",
    "behavior","verhalten",
    "tactics","strategy","taktik","recommendedTactic",
    "lastSighting","lastSeen","sighting","recentSighting",
    "type","kind","creatureType","monsterType","size","cr","challenge","challengeRating","ac","armorClass","hp","hitPoints","speed","movement","alignment",
    "statblock","statBlock","stats","attributes","values",
    "actions","aktionen","attacks","attacken",
    "notes","notizen","special","specials",
    "harvest","harvesting","harvestTable",
    "combat",
    "extras",
  ]);

  function normalizeMonsterCombat(rawCombat, fallbackMonster) {
    const source = rawCombat && typeof rawCombat === "object" ? rawCombat : {};
    const fallback = fallbackMonster && typeof fallbackMonster === "object" ? fallbackMonster : {};
    const abilities = normalizeAbilityMap(
      source.abilities && typeof source.abilities === "object" ? source.abilities : {}
    );
    const actions = normalizeCombatActions(
      Array.isArray(source.actions)
        ? source.actions
        : Array.isArray(source.combatActions)
        ? source.combatActions
        : source.attacks
    );
    const attacks = actions.filter((action) => action.type === "attack");
    const preferredActionId =
      toNonEmptyString(source.defaultActionId) || toNonEmptyString(source.defaultAttackId);
    const defaultActionId = actions.some((action) => action.id === preferredActionId)
      ? preferredActionId
      : actions.length
      ? actions[0].id
      : "";

    const armorClass = parseNullableNumber(
      source.armorClass != null ? source.armorClass : source.ac != null ? source.ac : fallback.ac
    );
    const hpMax = parseNullableNumber(
      source.hpMax != null
        ? source.hpMax
        : source.maxHp != null
        ? source.maxHp
        : source.hitPoints != null
        ? source.hitPoints
        : fallback.hp
    );
    const initiativeMod = parseFiniteNumber(
      source.initiativeMod != null ? source.initiativeMod : source.initiative != null ? source.initiative : 0,
      0
    );
    const enabled = source.enabled === true;
    const hasCoreStats = armorClass != null && hpMax != null;
    const attackReady = !!(attacks.length && hasCoreStats);
    const actionReady = !!(actions.length && hasCoreStats);

    return {
      enabled,
      ready: actionReady,
      attackReady,
      actionReady,
      v2Ready: actionReady,
      initiativeMod,
      armorClass,
      hpMax,
      abilities,
      actions,
      combatActions: actions,
      attacks,
      defaultActionId,
      notes: pickFirstNonEmpty(source, ["notes", "note"]),
    };
  }

  const BESTIARY_VISIBILITY_DEFAULTS = Object.freeze({
    title: true,
    summary: true,
    images: true,
    meta: true,
    body: true,
    fieldNote: true,
    traceTags: true,
    warningSigns: true,
    behavior: true,
    tactics: true,
    lastSighting: true,
    statblock: true,
    actions: true,
    harvest: true,
    notes: true,
    extras: true,
    links: true,
  });

  function normalizeBestiaryVisibility(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    const out = {};
    Object.keys(BESTIARY_VISIBILITY_DEFAULTS).forEach((key) => {
      out[key] = source[key] !== false;
    });
    return out;
  }

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
      const arena = normalizeArenaVisualConfig(obj.arena, {
        defaultSprite: images.length ? images[0] : "",
      });

      let chapterId =
        toNonEmptyString(obj.chapterId) ||
        toNonEmptyString(obj.chapter) ||
        toNonEmptyString(obj.regionId) ||
        "";
      const chapterName = toNonEmptyString(obj.chapterName) || toNonEmptyString(obj.region) || "";
      if (!chapterId && chapterName) {
        chapterId = slugifyId(chapterName);
      }

      const lastUpdated = toNonEmptyString(obj.lastUpdated) || "";
      const relatedEntryIds = normalizeStringList(
        obj.relatedEntryIds != null ? obj.relatedEntryIds : obj.relatedIds,
        { allowComma: true }
      );
      const visible = obj.visible !== false;
      const visibility = normalizeBestiaryVisibility(
        obj.visibility != null
          ? obj.visibility
          : obj.fieldVisibility != null
          ? obj.fieldVisibility
          : obj.visibilityMap
      );

      const habitat = pickFirstNonEmpty(obj, ["habitat", "environment", "biome"]);
      const dangerTags = normalizeStringList(
        obj.dangerTags != null
          ? obj.dangerTags
          : obj.threatTags != null
          ? obj.threatTags
          : obj.danger != null
          ? obj.danger
          : obj.hazardTags,
        { allowComma: true }
      );
      const threatClass = pickFirstNonEmpty(obj, ["threatClass", "dangerClass", "dangerLevel", "threatLevel"]);
      const status = pickFirstNonEmpty(obj, ["status", "state", "condition"]);
      const discoveryStatus = pickFirstNonEmpty(obj, [
        "discoveryStatus",
        "knowledgeStatus",
        "knowledgeLevel",
        "discovery",
      ]);
      const fieldNote = pickFirstNonEmpty(obj, ["fieldNote", "fieldnote", "quote", "fieldQuote", "quoteText"]);
      const traceTags = normalizeStringList(
        obj.traceTags != null ? obj.traceTags : obj.traces != null ? obj.traces : obj.signs,
        { allowComma: true }
      );
      const warningSigns = normalizeStringList(
        obj.warningSigns != null ? obj.warningSigns : obj.warnings != null ? obj.warnings : obj.warnSigns,
        { allowComma: true }
      );
      const behavior = pickFirstNonEmpty(obj, ["behavior", "verhalten"]);
      const tactics = pickFirstNonEmpty(obj, ["tactics", "strategy", "taktik", "recommendedTactic"]);
      const lastSighting = pickFirstNonEmpty(obj, ["lastSighting", "lastSeen", "sighting", "recentSighting"]);

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
      const combat = normalizeMonsterCombat(obj.combat, obj);

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
        visible,
        visibility,

        tags,
        images,
        arena,

        chapterId,
        chapterName,

        type,
        size,
        cr,
        habitat,
        dangerTags,
        threatClass,
        status,
        discoveryStatus,
        fieldNote,
        traceTags,
        warningSigns,
        behavior,
        tactics,
        lastSighting,
        ac,
        hp,
        speed,
        alignment,

        statblock: statblock != null ? statblock : "",
        actions: actions != null ? actions : "",
        notes: notes != null ? notes : "",

        harvest,
        combat,
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

      const chapter = JSON.parse(JSON.stringify(obj));
      const name = toNonEmptyString(chapter.name) || id;
      const icon = toNonEmptyString(chapter.icon) || "";
      const summary =
        toNonEmptyString(chapter.summary) ||
        toNonEmptyString(chapter.description) ||
        toNonEmptyString(chapter.flavor) ||
        "";

      out.push({
        ...chapter,
        id,
        name,
        icon,
        summary,
        _index: i,
      });
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
        const combat = normalizeMonsterCombat(e.combat, e);

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
          visible: e.visible !== false,
          visibility: normalizeBestiaryVisibility(
            e.visibility != null
              ? e.visibility
              : e.fieldVisibility != null
              ? e.fieldVisibility
              : e.visibilityMap
          ),
          tags: normalizeStringList(e.tags, { allowComma: true }),
          images: normalizeStringList(e.images, { mode: "images", allowComma: true }),
          chapterId,
          chapterName: region,

          type: pickFirstNonEmpty(e, ["type", "kind", "creatureType", "monsterType"]),
          size: pickFirstNonEmpty(e, ["size"]),
          cr: pickFirstNonEmpty(e, ["cr", "challenge", "challengeRating"]),
          habitat: pickFirstNonEmpty(e, ["habitat", "environment", "biome"]),
          dangerTags: normalizeStringList(
            e.dangerTags != null
              ? e.dangerTags
              : e.threatTags != null
              ? e.threatTags
              : e.danger != null
              ? e.danger
              : e.hazardTags,
            { allowComma: true }
          ),
          threatClass: pickFirstNonEmpty(e, ["threatClass", "dangerClass", "dangerLevel", "threatLevel"]),
          status: pickFirstNonEmpty(e, ["monsterStatus", "status", "state", "condition"]),
          discoveryStatus: pickFirstNonEmpty(e, [
            "discoveryStatus",
            "knowledgeStatus",
            "knowledgeLevel",
            "discovery",
          ]),
          fieldNote: pickFirstNonEmpty(e, ["fieldNote", "fieldnote", "quote", "fieldQuote", "quoteText"]),
          traceTags: normalizeStringList(
            e.traceTags != null ? e.traceTags : e.traces != null ? e.traces : e.signs,
            { allowComma: true }
          ),
          warningSigns: normalizeStringList(
            e.warningSigns != null ? e.warningSigns : e.warnings != null ? e.warnings : e.warnSigns,
            { allowComma: true }
          ),
          behavior: pickFirstNonEmpty(e, ["behavior", "verhalten"]),
          tactics: pickFirstNonEmpty(e, ["tactics", "strategy", "taktik", "recommendedTactic"]),
          lastSighting: pickFirstNonEmpty(e, ["lastSighting", "lastSeen", "sighting", "recentSighting"]),
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
          combat,
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

    const chaptersById = new Map(chapters.map((c) => [c.id, c]));
    monsters.forEach((m) => {
      if (!m || typeof m !== "object") return;
      const cid = toNonEmptyString(m.chapterId);
      if (!cid) return;
      const chapter = chaptersById.get(cid);
      if (chapter && !toNonEmptyString(m.chapterName)) {
        m.chapterName = toNonEmptyString(chapter.name) || cid;
      }
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

  function setBestiarySelectedMonsterId(id) {
    const sid = toNonEmptyString(id);
    const monster = sid ? findBestiaryMonsterById(sid) : null;
    if (monster) {
      state.bestiarySelectedMonsterId = monster.id;
      if (state.arena && typeof state.arena === "object") {
        state.arena.selectedMonsterId = monster.id;
      }
      return monster.id;
    }

    const monsters =
      bestiaryConfig && Array.isArray(bestiaryConfig.monsters) ? bestiaryConfig.monsters : [];
    state.bestiarySelectedMonsterId = monsters.length ? monsters[0].id : null;
    if (state.arena && typeof state.arena === "object") {
      state.arena.selectedMonsterId = state.bestiarySelectedMonsterId;
    }
    return state.bestiarySelectedMonsterId;
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

  // -----------------------------
  // Crafting / Handwerkskodex
  // -----------------------------
  let rawCrafting =
    window.crafting && typeof window.crafting === "object" ? window.crafting : null;

  const CRAFTING_PROFESSION_BLUEPRINTS = [
    {
      id: "alchemist",
      name: "Alchemist",
      icon: "⚗️",
      summary: "",
      codexSections: ["Tränke", "Öle", "Gifte", "Toxine", "Säuren", "Bomben"],
      specializations: [
        { id: "toxikalchemie", name: "Toxikalchemie" },
        { id: "vitaalchemie", name: "Vitaalchemie" },
        { id: "arkanoalchemie", name: "Arkanoalchemie" },
      ],
    },
    {
      id: "artifex",
      name: "Artifex",
      icon: "🪄",
      summary: "",
      codexSections: ["Pigmente", "Fortuna-Werke", "Cantorum-Werke"],
      specializations: [
        { id: "artifex-pigmenta", name: "Artifex Pigmenta" },
        { id: "artifex-fortunae", name: "Artifex Fortunae" },
        { id: "artifex-cantorum", name: "Artifex Cantorum" },
      ],
    },
    {
      id: "kesselmagus",
      name: "Kesselmagus",
      icon: "🍲",
      summary: "",
      codexSections: ["Gerichte", "Getränke", "Grundrezepte"],
      specializations: [
        { id: "kesselmagus-kueche", name: "Kesselmagus der Küche" },
        { id: "kesselmagus-braukeller", name: "Kesselmagus des Braukellers" },
      ],
    },
    {
      id: "kriegsschmied",
      name: "Kriegsschmied",
      icon: "⚒️",
      summary: "",
      codexSections: ["Waffen", "Rüstungen", "Ballistik"],
      specializations: [
        { id: "ballistikschmied", name: "Ballistikschmied" },
        { id: "ruestungsschmied", name: "Rüstungsschmied" },
        { id: "waffenschmied", name: "Waffenschmied" },
      ],
    },
    {
      id: "runenschmied",
      name: "Runenschmied",
      icon: "ᚱ",
      summary: "",
      codexSections: ["Runen", "Runenträger", "Bindungen"],
      specializations: [
        { id: "akademischer-runenschmied", name: "Akademischer Runenschmied" },
        { id: "archaeologischer-runenschmied", name: "Archäologischer Runenschmied" },
        { id: "wilder-runenschmied", name: "Wilder Runenschmied" },
      ],
    },
    {
      id: "schneider",
      name: "Schneider",
      icon: "🧵",
      summary: "",
      codexSections: ["Gewänder", "Leichte Rüstungen", "Mittlere Rüstungen", "Banner"],
      specializations: [
        { id: "gewandschneider", name: "Gewandschneider" },
        { id: "lederschneider", name: "Lederschneider" },
        { id: "ruestungsschneider", name: "Rüstungsschneider" },
      ],
    },
    {
      id: "skriptor",
      name: "Skriptor",
      icon: "✒️",
      summary: "",
      codexSections: ["Karten", "Verträge", "Siegel", "Schriftrollen"],
      specializations: [
        { id: "skriptor-kalligraphie", name: "Skriptor der Kalligraphie" },
        { id: "skriptor-kartographie", name: "Skriptor der Kartographie" },
        { id: "skriptor-sigillographie", name: "Skriptor der Sigillographie" },
      ],
    },
  ];

  const CRAFTING_SHARED_RANK_BLUEPRINTS = [
    { id: "apprentice-1", label: "Lehrling I", level: 1, order: 1 },
    { id: "apprentice-2", label: "Lehrling II", level: 2, order: 2 },
    { id: "apprentice-3", label: "Lehrling III", level: 3, order: 3 },
    { id: "apprentice-4", label: "Lehrling IV", level: 4, order: 4 },
    { id: "apprentice-5", label: "Lehrling V", level: 5, order: 5 },
    { id: "apprentice-6", label: "Lehrling VI", level: 6, order: 6 },
  ];

  const CRAFTING_SPECIALIZATION_RANK_BLUEPRINTS = [
    { id: "journeyman-1", stageId: "journeyman", stageName: "Geselle", label: "Geselle I", level: 7, order: 1 },
    { id: "journeyman-2", stageId: "journeyman", stageName: "Geselle", label: "Geselle II", level: 8, order: 2 },
    { id: "journeyman-3", stageId: "journeyman", stageName: "Geselle", label: "Geselle III", level: 9, order: 3 },
    { id: "journeyman-4", stageId: "journeyman", stageName: "Geselle", label: "Geselle IV", level: 10, order: 4 },
    { id: "master", stageId: "master", stageName: "Meister", label: "Meister", level: 11, order: 5 },
    { id: "grandmaster", stageId: "grandmaster", stageName: "Großmeister", label: "Großmeister", level: 12, order: 6 },
  ];

  const CRAFTING_LEGEND_RANK_BLUEPRINT = {
    id: "legend",
    stageId: "legend",
    stageName: "Legende",
    label: "Legende",
    level: 13,
    order: 7,
  };

  function cloneData(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function buildCraftingProfessionDefaults() {
    return CRAFTING_PROFESSION_BLUEPRINTS.map((profession, index) => ({
      id: profession.id,
      name: profession.name,
      icon: profession.icon,
      summary: profession.summary || "",
      order: index + 1,
    }));
  }

  function buildCraftingSpecializationDefaults() {
    const out = [];
    CRAFTING_PROFESSION_BLUEPRINTS.forEach((profession) => {
      profession.specializations.forEach((specialization, index) => {
        out.push({
          id: specialization.id,
          professionId: profession.id,
          name: specialization.name,
          icon: specialization.icon || "",
          summary: specialization.summary || "",
          order: index + 1,
        });
      });
    });
    return out;
  }

  function buildCraftingCodexSectionDefaults() {
    const out = [];
    CRAFTING_PROFESSION_BLUEPRINTS.forEach((profession) => {
      const sections = Array.isArray(profession.codexSections) ? profession.codexSections : [];
      sections.forEach((name, index) => {
        const id = `${profession.id}-${slugifyId(name) || "section-" + (index + 1)}`;
        out.push({
          id,
          professionId: profession.id,
          specializationId: "",
          name,
          summary: "",
          kind: "catalog",
          order: index + 1,
        });
      });
    });
    return out;
  }

  function buildCraftingNodeDefaults() {
    const out = [];

    CRAFTING_PROFESSION_BLUEPRINTS.forEach((profession, professionIndex) => {
      CRAFTING_SHARED_RANK_BLUEPRINTS.forEach((rank) => {
        out.push({
          id: `${profession.id}-${rank.id}`,
          professionId: profession.id,
          specializationId: "",
          stageId: "apprentice",
          stageName: "Lehrling",
          label: rank.label,
          level: rank.level,
          order: rank.order,
          branchOrder: 0,
          title: "",
          summary: "",
          unlockText: "",
          milestoneText: "",
          visible: true,
        });
      });

      profession.specializations.forEach((specialization, specializationIndex) => {
        CRAFTING_SPECIALIZATION_RANK_BLUEPRINTS.forEach((rank) => {
          out.push({
            id: `${specialization.id}-${rank.id}`,
            professionId: profession.id,
            specializationId: specialization.id,
            stageId: rank.stageId,
            stageName: rank.stageName,
            label: rank.label,
            level: rank.level,
            order: rank.level,
            branchOrder: specializationIndex + 1,
            title: "",
            summary: "",
            unlockText: "",
            milestoneText: "",
            visible: true,
          });
        });
      });

      out.push({
        id: `${profession.id}-${CRAFTING_LEGEND_RANK_BLUEPRINT.id}`,
        professionId: profession.id,
        specializationId: "",
        stageId: CRAFTING_LEGEND_RANK_BLUEPRINT.stageId,
        stageName: CRAFTING_LEGEND_RANK_BLUEPRINT.stageName,
        label: CRAFTING_LEGEND_RANK_BLUEPRINT.label,
        level: CRAFTING_LEGEND_RANK_BLUEPRINT.level,
        order: CRAFTING_LEGEND_RANK_BLUEPRINT.level,
        branchOrder: professionIndex + 1,
        title: "",
        summary: "",
        unlockText: "",
        milestoneText: "",
        visible: true,
        requiresAllSpecializations: true,
      });
    });

    return out;
  }

  function createDefaultCrafting() {
    return {
      meta: {
        title: "Handwerkskodex",
        subtitle: "Berufe, Spezialisierungen und Freischaltungen",
      },
      rules: {
        rankBands: [
          { id: "apprentice", name: "Lehrling", fromLevel: 1, toLevel: 6 },
          { id: "journeyman", name: "Geselle", fromLevel: 7, toLevel: 10 },
          { id: "master", name: "Meister", fromLevel: 11, toLevel: 11 },
          { id: "grandmaster", name: "Großmeister", fromLevel: 12, toLevel: 12 },
          { id: "legend", name: "Legende", fromLevel: 13, toLevel: 13 },
        ],
        sharedRanks: cloneData(CRAFTING_SHARED_RANK_BLUEPRINTS),
        specializationRanks: cloneData(CRAFTING_SPECIALIZATION_RANK_BLUEPRINTS),
        legendRank: cloneData(CRAFTING_LEGEND_RANK_BLUEPRINT),
        bookPrices: [],
        teacherPrices: [],
        notes: [],
      },
      professions: buildCraftingProfessionDefaults(),
      specializations: buildCraftingSpecializationDefaults(),
      nodes: buildCraftingNodeDefaults(),
      codexSections: buildCraftingCodexSectionDefaults(),
      works: [],
      materials: [],
      referenceSheets: [],
      books: [],
      unlockLinks: [],
    };
  }

  function mergeCraftingListById(defaultList, rawList, fallbackPrefix) {
    const defaults = Array.isArray(defaultList) ? defaultList.map((item) => cloneData(item)) : [];
    const source = Array.isArray(rawList) ? rawList : [];
    const rawById = new Map();
    const extras = [];

    source.forEach((item, index) => {
      const obj = item && typeof item === "object" ? cloneData(item) : null;
      if (!obj) return;
      const id = toNonEmptyString(obj.id) || `${fallbackPrefix}-${index + 1}`;
      obj.id = id;
      if (!rawById.has(id)) rawById.set(id, obj);
      else extras.push(obj);
    });

    const merged = defaults.map((item) => {
      const id = toNonEmptyString(item && item.id);
      if (!id) return item;
      const raw = rawById.get(id);
      if (!raw) return item;
      rawById.delete(id);
      return { ...item, ...raw };
    });

    rawById.forEach((item) => merged.push(item));
    extras.forEach((item) => merged.push(item));
    return merged;
  }

  function normalizeCrafting(raw) {
    const base = createDefaultCrafting();
    const source = raw && typeof raw === "object" ? cloneData(raw) : null;
    if (!source) return base;

    const normalized = { ...base, ...source };
    const meta = source.meta && typeof source.meta === "object" ? source.meta : {};
    const rules = source.rules && typeof source.rules === "object" ? source.rules : {};

    normalized.meta = { ...base.meta, ...meta };
    normalized.rules = {
      ...base.rules,
      ...rules,
      rankBands: mergeCraftingListById(base.rules.rankBands, rules.rankBands, "rank-band"),
      sharedRanks: mergeCraftingListById(base.rules.sharedRanks, rules.sharedRanks, "shared-rank"),
      specializationRanks: mergeCraftingListById(
        base.rules.specializationRanks,
        rules.specializationRanks,
        "specialization-rank"
      ),
      legendRank:
        rules.legendRank && typeof rules.legendRank === "object"
          ? { ...base.rules.legendRank, ...rules.legendRank }
          : cloneData(base.rules.legendRank),
      bookPrices: Array.isArray(rules.bookPrices) ? cloneData(rules.bookPrices) : [],
      teacherPrices: Array.isArray(rules.teacherPrices) ? cloneData(rules.teacherPrices) : [],
      notes: Array.isArray(rules.notes) ? cloneData(rules.notes) : [],
    };

    normalized.professions = mergeCraftingListById(base.professions, source.professions, "profession");
    normalized.specializations = mergeCraftingListById(
      base.specializations,
      source.specializations,
      "specialization"
    );
    normalized.nodes = mergeCraftingListById(base.nodes, source.nodes, "craft-node").map((node) => ({
      ...node,
      milestoneText: toNonEmptyString(
        node && (
          node.milestoneText != null
            ? node.milestoneText
            : node.milestone != null
            ? node.milestone
            : node.requirementText
        )
      ),
      visible: !node || node.visible !== false,
    }));
    normalized.codexSections = mergeCraftingListById(
      base.codexSections,
      source.codexSections,
      "codex-section"
    );
    normalized.works = Array.isArray(source.works) ? cloneData(source.works) : [];
    normalized.materials = Array.isArray(source.materials) ? cloneData(source.materials) : [];
    normalized.referenceSheets = Array.isArray(source.referenceSheets)
      ? cloneData(source.referenceSheets)
      : [];
    normalized.books = Array.isArray(source.books) ? cloneData(source.books) : [];
    normalized.unlockLinks = Array.isArray(source.unlockLinks) ? cloneData(source.unlockLinks) : [];

    return normalized;
  }

  function computeCraftingConfig(raw) {
    return normalizeCrafting(raw);
  }

  let craftingConfig = computeCraftingConfig(rawCrafting);

  function getCraftingProfessions() {
    return craftingConfig && Array.isArray(craftingConfig.professions)
      ? craftingConfig.professions.map((profession) => ({ ...profession }))
      : [];
  }

  function getCraftingProfessionById(id) {
    const sid = toNonEmptyString(id);
    if (!sid) return null;
    const professions =
      craftingConfig && Array.isArray(craftingConfig.professions) ? craftingConfig.professions : [];
    return professions.find((profession) => profession && profession.id === sid) || null;
  }

  function getCraftingSpecializations() {
    return craftingConfig && Array.isArray(craftingConfig.specializations)
      ? craftingConfig.specializations.map((specialization) => ({ ...specialization }))
      : [];
  }

  function getCraftingSpecializationById(id) {
    const sid = toNonEmptyString(id);
    if (!sid) return null;
    const specializations =
      craftingConfig && Array.isArray(craftingConfig.specializations)
        ? craftingConfig.specializations
        : [];
    return specializations.find((specialization) => specialization && specialization.id === sid) || null;
  }

  function getCraftingSpecializationsForProfession(professionId) {
    const sid = toNonEmptyString(professionId);
    if (!sid) return [];
    const specializations =
      craftingConfig && Array.isArray(craftingConfig.specializations)
        ? craftingConfig.specializations
        : [];
    return specializations
      .filter((specialization) => specialization && specialization.professionId === sid)
      .map((specialization) => ({ ...specialization }));
  }

  function getCraftingNodes(options) {
    const opts = options && typeof options === "object" ? options : {};
    const professionId = toNonEmptyString(opts.professionId);
    const specializationId = toNonEmptyString(opts.specializationId);
    const nodes = craftingConfig && Array.isArray(craftingConfig.nodes) ? craftingConfig.nodes : [];

    return nodes
      .filter((node) => {
        if (!node || typeof node !== "object") return false;
        if (professionId && node.professionId !== professionId) return false;
        if (specializationId && node.specializationId !== specializationId) return false;
        return true;
      })
      .map((node) => ({ ...node }));
  }

  function getCraftingCodexSections(professionId) {
    const sid = toNonEmptyString(professionId);
    const sections =
      craftingConfig && Array.isArray(craftingConfig.codexSections)
        ? craftingConfig.codexSections
        : [];
    const filtered = sid ? sections.filter((section) => section && section.professionId === sid) : sections;
    return filtered.map((section) => ({ ...section }));
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

  const initialSelectedHeroId = (function () {
    const heroes =
      heroesConfig && Array.isArray(heroesConfig.heroes) ? heroesConfig.heroes : [];
    const firstVisible = heroes.find((hero) => hero && hero.visible !== false);
    return firstVisible && firstVisible.id ? firstVisible.id : null;
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
    recentEntryIds: [],
    bestiaryUserState: {
      favorites: {},
      recentIds: [],
      knowledge: {},
    },

    ownerName: "",
    recognizedHeroId: null,
    selectedHeroId: initialSelectedHeroId,

    categorySheetOpen: false,

    onlyNew: false,
    onlyUnseenNew: false,

    view: "dashboard",
    dashboard: dashboardConfig,
    timeline: timelineConfig,

    bestiary: bestiaryConfig,
    heroes: heroesConfig,
    crafting: craftingConfig,
    bestiarySearchQuery: "",
    bestiarySelectedMonsterId: initialSelectedMonsterId,
    arena: createEmptyArenaState(),

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
    syncHeroState({ preferRecognized: true });

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

  // --- Eintragsverlauf ("Zuletzt angesehen") ---

  function loadRecentEntryIds() {
    try {
      const raw = window.localStorage.getItem(ENTRY_RECENT_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const source = Array.isArray(parsed) ? parsed : [];
      const seen = new Set();
      const next = [];

      source.forEach((id) => {
        const sid = toNonEmptyString(id);
        if (!sid || seen.has(sid) || !findEntryById(sid)) return;
        seen.add(sid);
        next.push(sid);
      });

      state.recentEntryIds = next.slice(0, 12);
    } catch {
      state.recentEntryIds = [];
    }

    return state.recentEntryIds.slice();
  }

  function saveRecentEntryIds() {
    try {
      window.localStorage.setItem(
        ENTRY_RECENT_STORAGE_KEY,
        JSON.stringify(Array.isArray(state.recentEntryIds) ? state.recentEntryIds.slice(0, 12) : [])
      );
    } catch {}
  }

  function markEntryViewed(entry) {
    if (!entry || !entry.id) return [];

    const visibleEntry = findEntryById(entry.id);
    if (!visibleEntry) return Array.isArray(state.recentEntryIds) ? state.recentEntryIds.slice() : [];

    const prev = Array.isArray(state.recentEntryIds) ? state.recentEntryIds : [];
    const next = [visibleEntry.id, ...prev.filter((id) => id !== visibleEntry.id)].slice(0, 12);
    state.recentEntryIds = next;
    saveRecentEntryIds();
    return next.slice();
  }

  function getRecentViewedEntryIds(limit) {
    const ids = Array.isArray(state.recentEntryIds) ? state.recentEntryIds.slice() : [];
    const max = typeof limit === "number" && limit > 0 ? limit : ids.length;
    return ids.slice(0, max);
  }

  function getRecentViewedEntries(limit) {
    return getRecentViewedEntryIds(limit)
      .map((id) => findEntryById(id))
      .filter(Boolean);
  }

  // --- Bestiary User State (Favoriten / Verlauf / Wissen) ---

  function createEmptyBestiaryUserState() {
    return {
      favorites: {},
      recentIds: [],
      knowledge: {},
    };
  }

  function normalizeBestiaryKnowledgeState(value) {
    const s = toNonEmptyString(value).toLowerCase();
    if (!s) return "unknown";
    if (s === "known" || s === "bekannt") return "known";
    if (s === "partial" || s === "teilweise" || s === "partially-known") return "partial";
    if (s === "researched" || s === "erforscht" || s === "known-full") return "researched";
    return "unknown";
  }

  function normalizeBestiaryUserState(raw) {
    const src = raw && typeof raw === "object" ? raw : null;
    const base = createEmptyBestiaryUserState();
    const validIds = new Set(getBestiaryMonsters().map((monster) => toNonEmptyString(monster && monster.id)).filter(Boolean));

    const favorites = src && src.favorites && typeof src.favorites === "object" ? src.favorites : {};
    Object.keys(favorites).forEach((id) => {
      const sid = toNonEmptyString(id);
      if (!sid || !validIds.has(sid) || !favorites[id]) return;
      base.favorites[sid] = true;
    });

    const recentIds = Array.isArray(src && src.recentIds) ? src.recentIds : [];
    const seenRecent = new Set();
    recentIds.forEach((id) => {
      const sid = toNonEmptyString(id);
      if (!sid || !validIds.has(sid)) return;
      if (seenRecent.has(sid)) return;
      seenRecent.add(sid);
      base.recentIds.push(sid);
    });
    if (base.recentIds.length > 12) {
      base.recentIds = base.recentIds.slice(0, 12);
    }

    const knowledge = src && src.knowledge && typeof src.knowledge === "object" ? src.knowledge : {};
    Object.keys(knowledge).forEach((id) => {
      const sid = toNonEmptyString(id);
      if (!sid || !validIds.has(sid)) return;
      base.knowledge[sid] = normalizeBestiaryKnowledgeState(knowledge[id]);
    });

    return base;
  }

  function loadBestiaryUserState() {
    try {
      const raw = window.localStorage.getItem(BESTIARY_USER_STORAGE_KEY);
      if (!raw) {
        state.bestiaryUserState = normalizeBestiaryUserState(null);
        return state.bestiaryUserState;
      }
      state.bestiaryUserState = normalizeBestiaryUserState(JSON.parse(raw));
      return state.bestiaryUserState;
    } catch {
      state.bestiaryUserState = normalizeBestiaryUserState(null);
      return state.bestiaryUserState;
    }
  }

  function saveBestiaryUserState() {
    state.bestiaryUserState = normalizeBestiaryUserState(state.bestiaryUserState);
    try {
      window.localStorage.setItem(BESTIARY_USER_STORAGE_KEY, JSON.stringify(state.bestiaryUserState));
    } catch {}
    return state.bestiaryUserState;
  }

  function isBestiaryFavorite(id) {
    const sid = toNonEmptyString(id);
    if (!sid) return false;
    const store = state.bestiaryUserState || createEmptyBestiaryUserState();
    return !!(store.favorites && store.favorites[sid]);
  }

  function setBestiaryFavorite(id, value) {
    const sid = toNonEmptyString(id);
    if (!sid || !findBestiaryMonsterById(sid)) return false;

    if (!state.bestiaryUserState || typeof state.bestiaryUserState !== "object") {
      state.bestiaryUserState = createEmptyBestiaryUserState();
    }
    if (!state.bestiaryUserState.favorites || typeof state.bestiaryUserState.favorites !== "object") {
      state.bestiaryUserState.favorites = {};
    }

    if (value) state.bestiaryUserState.favorites[sid] = true;
    else delete state.bestiaryUserState.favorites[sid];

    saveBestiaryUserState();
    return !!value;
  }

  function toggleBestiaryFavorite(id) {
    const next = !isBestiaryFavorite(id);
    return setBestiaryFavorite(id, next);
  }

  function getBestiaryKnowledgeState(id, fallbackValue) {
    return normalizeBestiaryKnowledgeState(fallbackValue);
  }

  function setBestiaryKnowledgeState(id, value) {
    const sid = toNonEmptyString(id);
    if (!sid || !findBestiaryMonsterById(sid)) return "unknown";

    if (!state.bestiaryUserState || typeof state.bestiaryUserState !== "object") {
      state.bestiaryUserState = createEmptyBestiaryUserState();
    }
    if (!state.bestiaryUserState.knowledge || typeof state.bestiaryUserState.knowledge !== "object") {
      state.bestiaryUserState.knowledge = {};
    }

    const next = normalizeBestiaryKnowledgeState(value);
    state.bestiaryUserState.knowledge[sid] = next;
    saveBestiaryUserState();
    return next;
  }

  function getBestiaryRecentMonsterIds(limit) {
    const store = state.bestiaryUserState || createEmptyBestiaryUserState();
    const ids = Array.isArray(store.recentIds) ? store.recentIds.slice() : [];
    const max = typeof limit === "number" && limit > 0 ? limit : ids.length;
    return ids.slice(0, max);
  }

  function getBestiaryFavoriteMonsterIds(limit) {
    const ids = Object.keys((state.bestiaryUserState && state.bestiaryUserState.favorites) || {}).filter((id) => isBestiaryFavorite(id));
    ids.sort((a, b) => {
      const ma = findBestiaryMonsterById(a);
      const mb = findBestiaryMonsterById(b);
      const at = toNonEmptyString(ma && ma.title) || a;
      const bt = toNonEmptyString(mb && mb.title) || b;
      return at.localeCompare(bt, "de", { sensitivity: "base" });
    });
    const max = typeof limit === "number" && limit > 0 ? limit : ids.length;
    return ids.slice(0, max);
  }

  function markBestiaryMonsterViewed(id) {
    const sid = toNonEmptyString(id);
    if (!sid || !findBestiaryMonsterById(sid)) return [];

    if (!state.bestiaryUserState || typeof state.bestiaryUserState !== "object") {
      state.bestiaryUserState = createEmptyBestiaryUserState();
    }

    const prev = Array.isArray(state.bestiaryUserState.recentIds) ? state.bestiaryUserState.recentIds : [];
    const next = [sid, ...prev.filter((item) => item !== sid)].slice(0, 12);

    if (prev.length === next.length && prev.every((item, index) => item === next[index])) {
      return next.slice();
    }

    state.bestiaryUserState.recentIds = next;
    saveBestiaryUserState();
    return next.slice();
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

    if (Array.isArray(n.heroes)) {
      rawHeroes = { heroes: n.heroes.slice() };
      window.heroes = rawHeroes;
    } else if (n.heroes && typeof n.heroes === "object") {
      rawHeroes = n.heroes;
      window.heroes = rawHeroes;
    } else if (n.heroes === null) {
      rawHeroes = null;
      window.heroes = null;
    }

    if (n.crafting && typeof n.crafting === "object") {
      rawCrafting = n.crafting;
      window.crafting = rawCrafting;
    } else if (n.crafting === null) {
      rawCrafting = null;
      window.crafting = null;
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
    state.bestiaryUserState = normalizeBestiaryUserState(state.bestiaryUserState);

    heroesConfig = normalizeHeroes(rawHeroes);
    state.heroes = heroesConfig;

    craftingConfig = computeCraftingConfig(rawCrafting);
    state.crafting = craftingConfig;

    const monsterOk =
      state.bestiarySelectedMonsterId && findBestiaryMonsterById(state.bestiarySelectedMonsterId);
    if (!monsterOk) {
      const ms =
        bestiaryConfig && Array.isArray(bestiaryConfig.monsters) ? bestiaryConfig.monsters : [];
      state.bestiarySelectedMonsterId = ms.length ? ms[0].id : null;
    }

    syncHeroState({ preferRecognized: true });

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
      appObj.heroes = getHeroes();

      appObj.rawDashboard = rawDashboard;
      appObj.dashboardConfig = dashboardConfig;

      appObj.rawTimeline = rawTimeline;
      appObj.rawTimelineMeta = rawTimelineMeta;
      appObj.timelineMeta = timelineConfig && timelineConfig.meta ? timelineConfig.meta : null;
      appObj.timelineConfig = timelineConfig;

      appObj.rawBestiary = rawBestiary;
      appObj.bestiaryConfig = bestiaryConfig;

      appObj.rawHeroes = rawHeroes;
      appObj.heroesConfig = heroesConfig;

      appObj.rawCrafting = rawCrafting;
      appObj.craftingConfig = craftingConfig;

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
  loadRecentEntryIds();
  loadBestiaryUserState();
  state.ownerName = detectInitialOwnerName();
  syncHeroState({ preferRecognized: true });
  state.theme = detectInitialTheme();
  applyTheme(state.theme);
  state.handedness = detectInitialHandedness();
  applyHandedness(state.handedness);

  // Globale App-API bereitstellen
  window.GlossaryApp = {
    categories,
    entries,
    heroes: getHeroes(),

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
    normalizeCombatDamageParts,
    normalizeCombatResourceCost,
    normalizeCombatTarget,
    normalizeCombatSave,
    normalizeCombatEffects,
    normalizeCombatActions,
    normalizeCombatAttacks,
    normalizeMonsterCombat,
    getBestiaryMonsters,
    findBestiaryMonsterById,
    setBestiarySelectedMonsterId,
    getBestiaryChapters,
    getBestiaryChapterById,
    getBestiaryMeta,

    rawHeroes,
    heroesConfig,
    normalizeHeroes,
    getHeroes,
    getHeroById,
    findHeroByAlias,
    getHeroesMeta,
    getRecognizedHero,
    createEmptyArenaState,

    slugifyId,
    encodeRouteToken,
    decodeRouteToken,
    getEntryRouteHash,
    getBestiaryMonsterRouteHash,

    rawCrafting,
    craftingConfig,
    CRAFTING_PROFESSION_BLUEPRINTS,
    createDefaultCrafting,
    normalizeCrafting,
    computeCraftingConfig,
    getCraftingProfessions,
    getCraftingProfessionById,
    getCraftingSpecializations,
    getCraftingSpecializationById,
    getCraftingSpecializationsForProfession,
    getCraftingNodes,
    getCraftingCodexSections,

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
    loadRecentEntryIds,
    saveRecentEntryIds,
    markEntryViewed,
    getRecentViewedEntryIds,
    getRecentViewedEntries,
    BESTIARY_USER_STORAGE_KEY,
    loadBestiaryUserState,
    saveBestiaryUserState,
    isBestiaryFavorite,
    setBestiaryFavorite,
    toggleBestiaryFavorite,
    getBestiaryKnowledgeState,
    setBestiaryKnowledgeState,
    getBestiaryRecentMonsterIds,
    getBestiaryFavoriteMonsterIds,
    markBestiaryMonsterViewed,

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
