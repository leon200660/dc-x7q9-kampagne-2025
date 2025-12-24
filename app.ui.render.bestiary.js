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
    tocOpen: false,
    _bound: false,
    _lastRenderKey: "",

    // TOC lifecycle
    _tocCloseTimer: null,
    _tocPrevFocus: null,
  };

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

    dom.bestiaryTocButton = dom.bestiaryTocButton || document.getElementById("bestiary-toc-button");
    dom.bestiaryToc = dom.bestiaryToc || document.getElementById("bestiary-toc");
    dom.bestiaryTocBackdrop = dom.bestiaryTocBackdrop || document.getElementById("bestiary-toc-backdrop");
    dom.bestiaryTocPanel = dom.bestiaryTocPanel || document.getElementById("bestiary-toc-panel");
    dom.bestiaryTocClose = dom.bestiaryTocClose || document.getElementById("bestiary-toc-close");
    dom.bestiaryTocSearch = dom.bestiaryTocSearch || document.getElementById("bestiary-toc-search");
    dom.bestiaryTocList = dom.bestiaryTocList || document.getElementById("bestiary-toc-list");

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

    return (
      title.includes(query) ||
      summary.includes(query) ||
      tags.includes(query) ||
      chapter.includes(query) ||
      body.includes(query)
    );
  }

  function sortMonsters(monsters) {
    return (monsters || []).slice().sort((a, b) => {
      const ac = norm(a && (a.chapterName || a.chapterId));
      const bc = norm(b && (b.chapterName || b.chapterId));
      if (ac !== bc) return ac.localeCompare(bc);

      const at = norm(a && a.title);
      const bt = norm(b && b.title);
      if (at !== bt) return at.localeCompare(bt);

      const ai = typeof a._index === "number" ? a._index : 0;
      const bi = typeof b._index === "number" ? b._index : 0;
      return ai - bi;
    });
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
      map.set(id, { id, name, icon: toNonEmptyString(c.icon), items: [] });
      order.push(id);
    });

    list.forEach((m) => {
      const cid = toNonEmptyString(m.chapterId) || "";
      if (cid) {
        if (!map.has(cid)) {
          map.set(cid, { id: cid, name: toNonEmptyString(m.chapterName) || cid, icon: "", items: [] });
          order.push(cid);
        }
        map.get(cid).items.push(m);
        return;
      }

      const t = toNonEmptyString(m.title) || "";
      const key = t ? t[0].toUpperCase() : "#";
      const gid = "__alpha__" + key;
      if (!map.has(gid)) {
        map.set(gid, { id: gid, name: key, icon: "", items: [] });
        order.push(gid);
      }
      map.get(gid).items.push(m);
    });

    const out = [];
    order.forEach((id) => {
      const g = map.get(id);
      if (!g || !g.items || !g.items.length) return;
      g.items = g.items.slice().sort((a, b) => norm(a.title).localeCompare(norm(b.title)));
      out.push(g);
    });

    return out;
  }

  function setMetaText(text) {
    const dom = getDom();
    if (!dom.bestiaryMeta) return;
    dom.bestiaryMeta.textContent = text || "";
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
        <img class="bestiary-hero-image" src="${app.escapeHtml(src)}" alt="${app.escapeHtml(alt)}" loading="lazy" />
        ${caption ? `<figcaption class="bestiary-hero-caption">${app.escapeHtml(caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  function buildGalleryHtml(title, images) {
    if (!images || images.length <= 1 || typeof app.buildImageUrl !== "function") return "";

    const rest = images.slice(1);
    const cards = rest
      .map((raw) => {
        const src = app.buildImageUrl(raw);
        if (!src) return "";
        const alt = `${title} – ${raw}`;
        return `
          <figure class="bestiary-image-card">
            <img class="bestiary-image" src="${app.escapeHtml(src)}" alt="${app.escapeHtml(alt)}" loading="lazy" />
            <figcaption class="bestiary-image-caption">${app.escapeHtml(raw)}</figcaption>
          </figure>
        `;
      })
      .filter(Boolean)
      .join("");

    if (!cards) return "";

    return `
      <details class="bestiary-details bestiary-details--images">
        <summary class="bestiary-details-summary">Bilder anzeigen (${rest.length})</summary>
        <div class="bestiary-details-content">
          <section class="bestiary-images">
            <div class="bestiary-images-grid">${cards}</div>
          </section>
        </div>
      </details>
    `;
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

  function buildQuickfactsHtml(m) {
    const facts = [];

    const type = pickFirst(m, ["type", "kind", "creatureType"]);
    const size = pickFirst(m, ["size"]);
    const cr = pickFirst(m, ["cr", "challenge", "challengeRating"]);
    const ac = pickFirst(m, ["ac", "armorClass"]);
    const hp = pickFirst(m, ["hp", "hitPoints"]);
    const speed = pickFirst(m, ["speed", "movement"]);
    const alignment = pickFirst(m, ["alignment"]);

    if (type) facts.push({ k: "Typ", v: type });
    if (size) facts.push({ k: "Größe", v: size });
    if (cr) facts.push({ k: "CR", v: cr });
    if (ac) facts.push({ k: "AC", v: ac });
    if (hp) facts.push({ k: "HP", v: hp });
    if (speed) facts.push({ k: "Speed", v: speed });
    if (alignment) facts.push({ k: "Gesinnung", v: alignment });

    if (!facts.length) return "";

    const rows = facts
      .map(
        (f) => `
        <div class="bestiary-quickfact">
          <span class="bestiary-quickfact-key">${app.escapeHtml(f.k)}</span>
          <span class="bestiary-quickfact-val">${app.escapeHtml(f.v)}</span>
        </div>
      `
      )
      .join("");

    return `
      <section class="bestiary-section bestiary-section--quickfacts" aria-label="Kurzwerte">
        <div class="bestiary-quickfacts">${rows}</div>
      </section>
    `;
  }

  function buildDetailsSectionHtml(opts) {
    const title = toNonEmptyString(opts && opts.title);
    const bodyHtml = toNonEmptyString(opts && opts.bodyHtml);
    const className = toNonEmptyString(opts && opts.className);
    const countLabel = toNonEmptyString(opts && opts.countLabel);
    const open = !!(opts && opts.open);

    if (!title || !bodyHtml) return "";

    const label = countLabel ? `${title} (${countLabel})` : title;

    return `
      <details class="bestiary-details ${className ? app.escapeHtml(className) : ""}" ${open ? "open" : ""}>
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

  function buildExtrasDetailsHtml(m) {
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

  function buildHarvestInnerHtml(m) {
    const rows = getMonsterHarvest(m);
    if (!rows.length) return "";

    const itemsHtml = rows
      .map((row) => {
        const dc = row.dc;
        const yields = Array.isArray(row.yields) ? row.yields : [];
        if (!dc || !yields.length) return "";

        const yieldsHtml = yields.map((y) => `<li>${app.escapeHtml(y)}</li>`).join("");

        return `
          <div class="bestiary-harvest-row">
            <div class="bestiary-harvest-dc">
              <span class="bestiary-pill">SG ${app.escapeHtml(String(dc))}</span>
            </div>
            <div class="bestiary-harvest-yields">
              <ul class="bestiary-harvest-list">${yieldsHtml}</ul>
            </div>
          </div>
        `;
      })
      .filter(Boolean)
      .join("");

    if (!itemsHtml) return "";
    return `<div class="bestiary-harvest-table">${itemsHtml}</div>`;
  }

  function buildHarvestDetailsHtml(m) {
    const inner = buildHarvestInnerHtml(m);
    if (!inner) return "";
    return buildDetailsSectionHtml({
      title: "Ernte",
      className: "bestiary-details--harvest",
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

    // Force “from closed -> open” Transition
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

  // -----------------------------
  // Rendering: Pages
  // -----------------------------
  function buildCoverPage(meta, totalCount) {
    const title = meta && meta.title ? meta.title : "Bestiarium";
    const subtitle = meta && meta.subtitle ? meta.subtitle : "";

    const wrapper = document.createElement("article");
    wrapper.className = "bestiary-page bestiary-page--cover";
    wrapper.dataset.monsterId = "__cover__";
    wrapper.tabIndex = 0;

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
            Wische horizontal, um umzublättern — oder öffne „Inhalt“.
          </p>
          <div class="bestiary-cover-actions">
            <button type="button" class="filter-chip" data-action="open-toc">📜 Inhalt öffnen</button>
          </div>
        </div>
      </div>
    `;

    const btn = wrapper.querySelector('[data-action="open-toc"]');
    if (btn) btn.addEventListener("click", () => openBestiaryToc());

    return wrapper;
  }

  function buildMonsterPage(monster, idx, total) {
    const m = monster || {};
    const id = getMonsterId(m, idx);
    const title = toNonEmptyString(m.title) || "Monster";
    const summary = toNonEmptyString(m.summary);
    const body = toNonEmptyString(m.body);
    const chapter = toNonEmptyString(m.chapterName) || toNonEmptyString(m.chapterId);
    const lastUpdated = toNonEmptyString(m.lastUpdated);

    const tags = Array.isArray(m.tags) ? m.tags.map(toNonEmptyString).filter(Boolean) : [];
    const tagsHtml = tags.length
      ? `<div class="bestiary-tags">${tags.map((t) => `<span class="tag">${app.escapeHtml(t)}</span>`).join("")}</div>`
      : "";

    const images = getMonsterImages(m);
    const heroHtml = buildHeroImageHtml(title, images);
    const galleryHtml = buildGalleryHtml(title, images);

    const quickfactsHtml = buildQuickfactsHtml(m);

    const { preview, rest } = splitPreviewAndRest(body, { minCharsForFold: 700 });
    const previewHtml = preview ? renderTextBlocks(preview) : "";
    const restHtml = rest ? renderTextBlocks(rest) : "";

    const descriptionHtml =
      previewHtml || restHtml
        ? `
          <section class="bestiary-section bestiary-section--description">
            <h4 class="bestiary-section-title">Beschreibung</h4>

            ${previewHtml ? `<div class="bestiary-body bestiary-body--preview">${previewHtml}</div>` : ""}

            ${
              restHtml
                ? `
                  <details class="bestiary-details bestiary-details--body">
                    <summary class="bestiary-details-summary">Mehr anzeigen</summary>
                    <div class="bestiary-details-content">
                      <div class="bestiary-body bestiary-body--rest">
                        ${restHtml}
                      </div>
                    </div>
                  </details>
                `
                : ""
            }
          </section>
        `
        : "";

    const statblockHtml = buildStatblockHtml(m);
    const actionsHtml = buildActionsHtml(m);
    const notesHtml = buildNotesHtml(m);
    const harvestDetailsHtml = buildHarvestDetailsHtml(m);

    // NEU: Zusatzinfos aus data.js (monster.extras)
    const extrasDetailsHtml = buildExtrasDetailsHtml(m);

    const statblockDetails = buildDetailsSectionHtml({
      title: "Statblock / Werte",
      className: "bestiary-details--statblock",
      bodyHtml: statblockHtml,
    });

    const actionsDetails = buildDetailsSectionHtml({
      title: "Fähigkeiten / Aktionen",
      className: "bestiary-details--actions",
      bodyHtml: actionsHtml,
    });

    const notesDetails = buildDetailsSectionHtml({
      title: "Notizen",
      className: "bestiary-details--notes",
      bodyHtml: notesHtml,
    });

    const relIds = Array.isArray(m.relatedEntryIds) ? m.relatedEntryIds.map(toNonEmptyString).filter(Boolean) : [];
    const relEntries =
      typeof app.findEntryById === "function" ? relIds.map((rid) => app.findEntryById(rid)).filter(Boolean) : [];

    const selfEntry = typeof app.findEntryById === "function" ? app.findEntryById(id) : null;

    const relatedHtml = relEntries.length
      ? `
        <section class="bestiary-related">
          <h4 class="bestiary-section-title">Siehe auch</h4>
          <div class="bestiary-related-list">
            ${relEntries
              .map((e) => {
                const cat = typeof app.getCategoryById === "function" ? app.getCategoryById(e.categoryId) : null;
                const icon = cat ? cat.icon || "📁" : "📁";
                return `
                  <button type="button" class="related-link" data-entry-id="${app.escapeHtml(e.id)}">
                    <span aria-hidden="true">${app.escapeHtml(icon)}</span>
                    <span>${app.escapeHtml(e.title || e.id)}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
      `
      : "";

    const openInGlossaryHtml = selfEntry
      ? `
        <div class="bestiary-open-glossary">
          <button type="button" class="filter-chip" data-entry-id="${app.escapeHtml(id)}">📚 Im Glossar öffnen</button>
        </div>
      `
      : "";

    const wrapper = document.createElement("article");
    wrapper.className = "bestiary-page";
    wrapper.dataset.monsterId = id;
    wrapper.tabIndex = 0;

    wrapper.style.setProperty("--bestiary-flip", "0deg");
    wrapper.style.setProperty("--bestiary-shadow", "0");
    wrapper.style.setProperty("--bestiary-origin", "right");

    wrapper.innerHTML = `
      <div class="bestiary-page-inner">
        <header class="bestiary-page-header">
          <div class="bestiary-page-kicker">
            <span class="bestiary-page-count">Seite ${app.escapeHtml(String(idx))} / ${app.escapeHtml(String(total))}</span>
            ${chapter ? `<span class="bestiary-page-chapter">📍 ${app.escapeHtml(chapter)}</span>` : ""}
            ${lastUpdated ? `<span class="bestiary-page-updated">🕒 ${app.escapeHtml(lastUpdated)}</span>` : ""}
          </div>

          <h3 class="bestiary-page-title">${app.escapeHtml(title)}</h3>
          ${summary ? `<p class="bestiary-page-summary">${app.escapeHtml(summary)}</p>` : ""}
          ${tagsHtml}
        </header>

        ${heroHtml}
        ${quickfactsHtml}
        ${openInGlossaryHtml}
        ${descriptionHtml}

        ${statblockDetails}
        ${actionsDetails}
        ${harvestDetailsHtml}
        ${notesDetails}
        ${extrasDetailsHtml}

        ${galleryHtml}
        ${relatedHtml}
      </div>
    `;

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

    wrapper.addEventListener("click", (ev) => {
      const btn = ev.target.closest("button[data-entry-id]");
      if (!btn) return;
      const entryId = btn.getAttribute("data-entry-id");
      if (!entryId) return;
      ev.preventDefault();
      callIfFn(app.navigateToEntry, entryId);
    });

    return wrapper;
  }

  function renderPages(dom, monsters, meta) {
    if (!dom.bestiaryBook) return;

    dom.bestiaryBook.innerHTML = "";
    dom.bestiaryBook.classList.toggle("bestiary-book--reduced-motion", hasReducedMotion());

    const totalMonsters = monsters.length;

    dom.bestiaryBook.appendChild(buildCoverPage(meta, totalMonsters));

    const totalPages = totalMonsters;
    monsters.forEach((m, i) => {
      const page = buildMonsterPage(m, i + 1, totalPages);
      dom.bestiaryBook.appendChild(page);
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
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = "<p>Keine Monster im Inhaltsverzeichnis gefunden.</p>";
      dom.bestiaryTocList.appendChild(empty);
      return;
    }

    groups.forEach((g) => {
      const section = document.createElement("section");
      section.className = "bestiary-toc-group";

      const h = document.createElement("div");
      h.className = "bestiary-toc-group-title";
      h.innerHTML = `${g.icon ? `<span aria-hidden="true">${app.escapeHtml(g.icon)}</span> ` : ""}<span>${app.escapeHtml(
        g.name
      )}</span>`;
      section.appendChild(h);

      const list = document.createElement("div");
      list.className = "bestiary-toc-items";

      g.items.forEach((m) => {
        const id = getMonsterId(m, typeof m._index === "number" ? m._index : 0);
        const title = toNonEmptyString(m.title) || id;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "bestiary-toc-item";
        if (ui.bestiary.activeId && ui.bestiary.activeId === id) btn.classList.add("is-active");

        const tags = Array.isArray(m.tags) ? m.tags.map(toNonEmptyString).filter(Boolean) : [];
        const tagsLine = tags.length ? tags.slice(0, 3).join(" · ") : "";

        const type = pickFirst(m, ["type", "kind", "creatureType"]);
        const cr = pickFirst(m, ["cr", "challenge", "challengeRating"]);
        const factsLine = [type ? type : "", cr ? `CR ${cr}` : ""].filter(Boolean).join(" · ");

        const subLine = factsLine || tagsLine;

        btn.innerHTML = `
          <div class="bestiary-toc-item-main">
            <div class="bestiary-toc-item-title">${app.escapeHtml(title)}</div>
            ${subLine ? `<div class="bestiary-toc-item-sub">${app.escapeHtml(subLine)}</div>` : ""}
          </div>
          <div class="bestiary-toc-item-icon" aria-hidden="true">›</div>
        `;

        btn.addEventListener("click", () => {
          ui.bestiary.activeId = id;
          closeBestiaryToc();
          scrollToMonster(id, { smooth: !hasReducedMotion() });
        });

        list.appendChild(btn);
      });

      section.appendChild(list);
      dom.bestiaryTocList.appendChild(section);
    });
  }

  // -----------------------------
  // Scrolling / Active Page + Flip Vars
  // -----------------------------
  function scrollToMonster(id, options) {
    const dom = getDom();
    if (!dom.bestiaryBook) return;

    const sid = toNonEmptyString(id);
    if (!sid) return;

    const esc = safeEscapeSelector(sid);
    const page = dom.bestiaryBook.querySelector(`.bestiary-page[data-monster-id="${esc}"]`);
    if (!page) return;

    try {
      page.scrollIntoView({
        behavior: options && options.smooth ? "smooth" : "auto",
        block: "nearest",
        inline: "start",
      });
    } catch {
      try {
        const left = page.offsetLeft || 0;
        dom.bestiaryBook.scrollLeft = left;
      } catch {}
    }

    requestAnimationFrame(() => updateActiveFromScroll());
  }

  let _scrollRaf = null;
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
          updateActiveFromScroll();
        });
      },
      { passive: true }
    );
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
          updateActiveFromScroll();
        });
      },
      { passive: true }
    );
  }

  const FLIP_MAX_DEG = 14;
  const DEADZONE = 0.08;
  const SHADOW_GAMMA = 0.85;

  function updateActiveFromScroll() {
    const dom = getDom();
    if (!dom.bestiaryBook) return;
    if (dom.bestiaryBook.offsetParent === null) return;

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
      setMetaText(`${total} Monster · Titelseite`);
      return;
    }

    const idx = allMonsterPages.findIndex((p) => p === best);
    const currentIndex = idx >= 0 ? idx + 1 : 1;
    setMetaText(`${total} Monster · Seite ${currentIndex}/${total}`);
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
        const sorted = sortMonsters(monsters);
        renderToc(getDom(), sorted, chapters);
      });
    }

    window.addEventListener("keydown", (ev) => {
      if (!ev || ev.key !== "Escape") return;
      if (isBestiaryTocOpen()) {
        ev.preventDefault();
        closeBestiaryToc();
      }
    });

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

    const { monsters, chapters, meta } = getBestiaryData();
    const q = ui.bestiary.query || "";
    const filtered = sortMonsters(monsters.filter((m) => matchesQuery(m, q)));

    const renderKey = JSON.stringify({
      v: 6, // bump, damit Extras sicher neu gerendert werden
      q,
      tq: ui.bestiary.tocQuery || "",
      n: filtered.length,
      mt: meta && meta.title ? meta.title : "",
      ms: meta && meta.subtitle ? meta.subtitle : "",
    });

    const shouldFullRender = ui.bestiary._lastRenderKey !== renderKey;

    if (shouldFullRender) {
      renderPages(dom, filtered, meta);
      renderToc(dom, filtered, chapters);
      ui.bestiary._lastRenderKey = renderKey;

      setMetaText(`${filtered.length} Monster`);

      // activeId nur scrollen, wenn Seite existiert
      if (ui.bestiary.activeId) {
        requestAnimationFrame(() => {
          const esc = safeEscapeSelector(ui.bestiary.activeId);
          const exists = dom.bestiaryBook && dom.bestiaryBook.querySelector(`.bestiary-page[data-monster-id="${esc}"]`);
          if (exists) scrollToMonster(ui.bestiary.activeId, { smooth: false });
          updateActiveFromScroll();
        });
      } else {
        requestAnimationFrame(() => updateActiveFromScroll());
      }
    } else {
      renderToc(dom, filtered, chapters);
      requestAnimationFrame(() => updateActiveFromScroll());
    }
  }

  // -----------------------------
  // Export
  // -----------------------------
  Object.assign(app, {
    renderBestiary,

    openBestiaryToc,
    closeBestiaryToc,
    toggleBestiaryToc,
    isBestiaryTocOpen,
  });
})();
