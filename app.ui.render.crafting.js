(function () {
  const app = window.GlossaryApp;
  if (!app) return;

  const { state } = app;

  const callIfFn = (fn, ...args) => (typeof fn === "function" ? fn(...args) : undefined);

  function dom() {
    return app.dom || {};
  }

  function toNonEmptyString(value) {
    return typeof value === "string" ? value.trim() : String(value || "").trim();
  }

  function escapeText(value) {
    if (typeof app.escapeHtml === "function") return app.escapeHtml(value);
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeView(value) {
    return value === "crafting" ? "crafting" : toNonEmptyString(value);
  }

  function getCurrentView() {
    if (typeof app.getCurrentView === "function") return app.getCurrentView();
    return normalizeView(state && state.view);
  }

  function getUiState() {
    const ui = (app._ui = app._ui || {});
    ui.crafting = ui.crafting || {
      query: "",
      activeProfessionId: "",
      activeCodexSectionId: "",
      activeCodexContentType: "",
    };
    return ui.crafting;
  }

  function setCraftingQuery(value) {
    const ui = getUiState();
    ui.query = toNonEmptyString(value);
    const currentDom = dom();
    if (currentDom.craftingSearch && currentDom.craftingSearch.value !== ui.query) {
      currentDom.craftingSearch.value = ui.query;
    }
    return ui.query;
  }

  function setActiveProfessionId(value) {
    const ui = getUiState();
    const next = toNonEmptyString(value);
    if (ui.activeProfessionId !== next) {
      ui.activeProfessionId = next;
      ui.activeCodexSectionId = "";
      ui.activeCodexContentType = "";
    }
    return ui.activeProfessionId;
  }

  function getActiveProfessionId() {
    return toNonEmptyString(getUiState().activeProfessionId);
  }

  function setActiveCodexSectionId(value) {
    const ui = getUiState();
    ui.activeCodexSectionId = toNonEmptyString(value);
    return ui.activeCodexSectionId;
  }

  function getActiveCodexSectionId() {
    return toNonEmptyString(getUiState().activeCodexSectionId);
  }

  function setActiveCodexContentType(value) {
    const ui = getUiState();
    ui.activeCodexContentType = toNonEmptyString(value);
    return ui.activeCodexContentType;
  }

  function getActiveCodexContentType() {
    return toNonEmptyString(getUiState().activeCodexContentType);
  }

  function getOverviewHash() {
    return typeof app.getCraftingOverviewHash === "function"
      ? app.getCraftingOverviewHash()
      : "#handwerk";
  }

  function getProfessionHash(id) {
    return typeof app.getCraftingProfessionHash === "function"
      ? app.getCraftingProfessionHash(id)
      : "#handwerk";
  }

  function getEntryHash(id) {
    const value = toNonEmptyString(id);
    if (!value) return "";
    if (typeof app.getEntryRouteHash === "function") return app.getEntryRouteHash(value);
    try {
      return "#entry-" + encodeURIComponent(value);
    } catch {
      return "#entry-" + value;
    }
  }

  function getMonsterHash(id) {
    const value = toNonEmptyString(id);
    if (!value) return "";
    if (typeof app.getBestiaryMonsterRouteHash === "function") {
      return app.getBestiaryMonsterRouteHash(value);
    }
    try {
      return "#monster-" + encodeURIComponent(value);
    } catch {
      return "#monster-" + value;
    }
  }

  function getCraftingData() {
    return app.craftingConfig && typeof app.craftingConfig === "object" ? app.craftingConfig : {};
  }

  function cloneList(key) {
    const data = getCraftingData();
    const list = data && Array.isArray(data[key]) ? data[key] : [];
    return list.map((item) => ({ ...item }));
  }

  function getProfessions() {
    return typeof app.getCraftingProfessions === "function" ? app.getCraftingProfessions() : [];
  }

  function getProfessionById(id) {
    return typeof app.getCraftingProfessionById === "function"
      ? app.getCraftingProfessionById(id)
      : null;
  }

  function getSpecializations(professionId) {
    return typeof app.getCraftingSpecializationsForProfession === "function"
      ? app.getCraftingSpecializationsForProfession(professionId)
      : [];
  }

  function getAllSpecializations() {
    return typeof app.getCraftingSpecializations === "function"
      ? app.getCraftingSpecializations()
      : cloneList("specializations");
  }

  function getNodes(options) {
    return typeof app.getCraftingNodes === "function" ? app.getCraftingNodes(options) : [];
  }

  function getCodexSections(professionId) {
    return typeof app.getCraftingCodexSections === "function"
      ? app.getCraftingCodexSections(professionId)
      : [];
  }

  function getWorks() {
    return cloneList("works");
  }

  function getMaterials() {
    return cloneList("materials");
  }

  function getReferenceSheets() {
    return cloneList("referenceSheets");
  }

  function getEntryMap() {
    const map = new Map();
    const entries = Array.isArray(app.entries) ? app.entries : [];
    entries.forEach((entry) => {
      const id = toNonEmptyString(entry && entry.id);
      if (!id) return;
      map.set(id, entry);
    });
    return map;
  }

  function getMonsterMap() {
    const monsters = typeof app.getBestiaryMonsters === "function" ? app.getBestiaryMonsters() : [];
    const map = new Map();
    monsters.forEach((monster) => {
      const id = toNonEmptyString(monster && monster.id);
      if (!id) return;
      map.set(id, monster);
    });
    return map;
  }

  function sortByOrderThenName(items) {
    return (Array.isArray(items) ? items.slice() : []).sort((a, b) => {
      const ao = typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY;
      const bo = typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY;
      if (ao !== bo) return ao - bo;
      return String(a.name || a.label || "").localeCompare(String(b.name || b.label || ""), "de", {
        sensitivity: "base",
      });
    });
  }

  function sortNodes(nodes) {
    return (Array.isArray(nodes) ? nodes.slice() : []).sort((a, b) => {
      const al = typeof a.level === "number" ? a.level : Number.POSITIVE_INFINITY;
      const bl = typeof b.level === "number" ? b.level : Number.POSITIVE_INFINITY;
      if (al !== bl) return al - bl;
      const ao = typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY;
      const bo = typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY;
      if (ao !== bo) return ao - bo;
      return String(a.label || "").localeCompare(String(b.label || ""), "de", {
        sensitivity: "base",
      });
    });
  }

  function matchesQuery(query, values) {
    const normalized = toNonEmptyString(query).toLocaleLowerCase("de");
    if (!normalized) return true;
    return (Array.isArray(values) ? values : [])
      .filter(Boolean)
      .map((value) => String(value).toLocaleLowerCase("de"))
      .some((value) => value.includes(normalized));
  }

  function renderBadge() {
    if (typeof app.renderViewBadge === "function") {
      app.renderViewBadge();
      return;
    }

    const currentDom = dom();
    if (!currentDom.headerBadge) return;
    currentDom.headerBadge.textContent = getCurrentView() === "crafting" ? "Handwerk" : "";
  }

  function getProfessionStats(professionId) {
    const specializationCount = getSpecializations(professionId).length;
    const nodeCount = getNodes({ professionId }).length;
    const codexCount = getCodexSections(professionId).length;
    const workCount = getWorks().filter((item) => toNonEmptyString(item.professionId) === professionId).length;
    const materialCount = getMaterials().filter((item) => toNonEmptyString(item.professionId) === professionId).length;
    const referenceCount = getReferenceSheets().filter((item) => toNonEmptyString(item.professionId) === professionId).length;

    return {
      specializationCount,
      nodeCount,
      codexCount,
      workCount,
      materialCount,
      referenceCount,
      contentCount: workCount + materialCount + referenceCount,
    };
  }

  function renderJumpbar(activeProfessionId) {
    const currentDom = dom();
    if (!currentDom.craftingJumpbar) return;

    const professions = sortByOrderThenName(getProfessions());
    const buildJumpChip = (href, isActive, icon, label) =>
      `<a class="filter-chip crafting-jump-chip${isActive ? " is-active" : ""}" href="${href}" title="${escapeText(
        label
      )}" aria-label="${escapeText(label)}">
        <span class="crafting-jump-chip-icon" aria-hidden="true">${escapeText(icon || "•")}</span>
        <span class="crafting-jump-chip-label">${escapeText(label)}</span>
      </a>`;
    const chips = [buildJumpChip(getOverviewHash(), !activeProfessionId, "✦", "Alle")];

    professions.forEach((profession) => {
      const isActive = profession && profession.id === activeProfessionId;
      chips.push(
        buildJumpChip(
          getProfessionHash(profession && profession.id),
          isActive,
          (profession && profession.icon) || "•",
          (profession && profession.name) || (profession && profession.id) || "Beruf"
        )
      );
    });

    currentDom.craftingJumpbar.innerHTML = chips.join("");
  }

  function buildRankCards(nodes, emptyText) {
    const sorted = sortNodes(nodes);
    if (!sorted.length) {
      return `<div class="crafting-placeholder">${escapeText(
        emptyText || "Für diesen Bereich sind noch keine Rangknoten hinterlegt."
      )}</div>`;
    }

    return sorted
      .map((node) => {
        const isVisible = !node || node.visible !== false;
        const title = toNonEmptyString(node.title);
        const summary = toNonEmptyString(node.summary);
        const unlockText = toNonEmptyString(node.unlockText);
        const milestoneText = toNonEmptyString(
          node && (
            node.milestoneText != null
              ? node.milestoneText
              : node.milestone != null
              ? node.milestone
              : node.requirementText
          )
        );
        const description = isVisible
          ? title ||
            summary ||
            unlockText ||
            "Noch keine Freischaltungstexte hinterlegt. Diese Stufe dient aktuell als Platzhalter im Gerüst."
          : "Dir fehlt noch Wissen, um diese Stufe freizuschalten.";

        const requirement = node && node.requiresAllSpecializations
          ? `<p class="crafting-rank-note">Freischaltung erst nach allen Großmeister-Pfaden.</p>`
          : "";
        const milestoneLine = isVisible
          ? `<p class="crafting-rank-milestone">${
              milestoneText
                ? `Benötigter Meilenstein: ${escapeText(milestoneText)}`
                : "Benötigter Meilenstein: Noch nicht hinterlegt."
            }</p>`
          : `<p class="crafting-rank-milestone crafting-rank-milestone--locked">Dir fehlt noch Wissen, um den benötigten Meilenstein freizuschalten.</p>`;

        return `
          <article class="crafting-rank-card${isVisible ? "" : " crafting-rank-card--locked"}">
            <p class="crafting-rank-label">${escapeText(node.label || node.stageName || "Rang")}</p>
            <p class="crafting-kicker">Stufe ${escapeText(node.level != null ? node.level : "—")}</p>
            <p class="crafting-rank-meta">${escapeText(description)}</p>
            ${milestoneLine}
            ${requirement}
          </article>
        `;
      })
      .join("");
  }

  function buildSectionNav() {
    return `
      <nav class="crafting-section-nav" aria-label="Bereiche im Beruf">
        <button type="button" class="filter-chip crafting-section-chip" data-crafting-scroll="crafting-overview-section">Übersicht</button>
        <button type="button" class="filter-chip crafting-section-chip" data-crafting-scroll="crafting-tree-section">Baum</button>
        <button type="button" class="filter-chip crafting-section-chip" data-crafting-scroll="crafting-codex-section">Kodex</button>
      </nav>
    `;
  }

  function getSpecializationNameMap(professionId) {
    const map = new Map();
    getSpecializations(professionId).forEach((item) => {
      const id = toNonEmptyString(item && item.id);
      if (!id) return;
      map.set(id, item.name || id);
    });
    getAllSpecializations().forEach((item) => {
      const id = toNonEmptyString(item && item.id);
      if (!id || map.has(id)) return;
      map.set(id, item.name || id);
    });
    return map;
  }

  function getNodeMap(professionId) {
    const map = new Map();
    getNodes({ professionId }).forEach((item) => {
      const id = toNonEmptyString(item && item.id);
      if (!id) return;
      map.set(id, item);
    });
    return map;
  }

  function getSectionMap(professionId) {
    const map = new Map();
    getCodexSections(professionId).forEach((item) => {
      const id = toNonEmptyString(item && item.id);
      if (!id) return;
      map.set(id, item);
    });
    return map;
  }

  function formatValuePreview(value, fallbackText) {
    if (value == null) return fallbackText || "";
    if (Array.isArray(value)) {
      const lines = value
        .map((item) => {
          if (typeof item === "string") return item;
          if (item && typeof item === "object") {
            return (
              toNonEmptyString(item.name) ||
              toNonEmptyString(item.id) ||
              toNonEmptyString(item.label) ||
              JSON.stringify(item)
            );
          }
          return toNonEmptyString(item);
        })
        .filter(Boolean);
      return lines.join(" · ");
    }
    if (typeof value === "object") {
      try {
        return JSON.stringify(value);
      } catch {
        return fallbackText || "";
      }
    }
    return toNonEmptyString(value) || fallbackText || "";
  }

  function shortenText(value, maxLength) {
    const text = toNonEmptyString(value);
    const limit = typeof maxLength === "number" && maxLength > 0 ? maxLength : 180;
    if (!text || text.length <= limit) return text;
    return text.slice(0, limit - 1).trimEnd() + "…";
  }

  function normalizeIdList(value) {
    if (Array.isArray(value)) {
      return value.map((item) => toNonEmptyString(item)).filter(Boolean);
    }
    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  }

  function mergeIdLists(...values) {
    const out = [];
    values.forEach((value) => {
      normalizeIdList(value).forEach((id) => {
        if (id && !out.includes(id)) out.push(id);
      });
    });
    return out;
  }

  function buildRelatedLinkChips(entryIds, monsterIds) {
    const entryMap = getEntryMap();
    const monsterMap = getMonsterMap();
    const chips = [];

    mergeIdLists(entryIds).forEach((id) => {
      const entry = entryMap.get(id);
      if (!entry) return;
      const label = entry && entry.title ? entry.title : id;
      const hash = getEntryHash(id);
      if (!hash) return;
      chips.push(
        `<a class="crafting-link-chip" href="${hash}">Glossar: ${escapeText(label)}</a>`
      );
    });

    mergeIdLists(monsterIds).forEach((id) => {
      const monster = monsterMap.get(id);
      if (!monster) return;
      const label = monster && monster.title ? monster.title : id;
      const hash = getMonsterHash(id);
      if (!hash) return;
      chips.push(
        `<a class="crafting-link-chip" href="${hash}">Bestiarium: ${escapeText(label)}</a>`
      );
    });

    return chips.length ? `<div class="crafting-link-row">${chips.join("")}</div>` : "";
  }

  function buildMetaChips(chips) {
    const items = (Array.isArray(chips) ? chips : []).filter(Boolean);
    if (!items.length) return "";
    return `<div class="crafting-record-meta">${items
      .map((item) => `<span class="crafting-record-chip">${escapeText(item)}</span>`)
      .join("")}</div>`;
  }

  function buildWorkCard(work, nodeMap, specializationNameMap) {
    const summary = toNonEmptyString(work.summary);
    const resultPreview = shortenText(formatValuePreview(work.result, ""), 160);
    const ingredientPreview = shortenText(formatValuePreview(work.ingredients, ""), 160);
    const notePreview = shortenText(formatValuePreview(work.notes, ""), 140);
    const relatedEntries = mergeIdLists(work.relatedEntryIds, work.relatedEntryId);
    const relatedMonsters = mergeIdLists(work.relatedMonsterIds, work.relatedMonsterId);
    const requiredNode = nodeMap.get(toNonEmptyString(work.requiredNodeId));
    const specializationName = specializationNameMap.get(toNonEmptyString(work.specializationId));

    return `
      <article class="crafting-record-card">
        <div class="crafting-record-head">
          <div>
            <p class="crafting-kicker">Werk</p>
            <h4 class="crafting-card-title">${escapeText(work.name || work.id || "Werk")}</h4>
          </div>
          <span class="crafting-record-type">${escapeText(work.kind || "recipe")}</span>
        </div>

        ${buildMetaChips([
          specializationName ? `Pfad: ${specializationName}` : "",
          work.requiredLevel ? `Stufe ${work.requiredLevel}` : "",
          requiredNode ? `Freischaltung: ${requiredNode.label || requiredNode.title || requiredNode.id}` : "",
        ])}

        ${
          summary
            ? `<p class="crafting-card-subtitle">${escapeText(summary)}</p>`
            : `<p class="crafting-card-subtitle">Noch keine Kurzbeschreibung hinterlegt.</p>`
        }

        ${
          ingredientPreview
            ? `<div class="crafting-record-block"><p class="crafting-record-label">Zutaten</p><p class="crafting-record-text">${escapeText(
                ingredientPreview
              )}</p></div>`
            : ""
        }

        ${
          resultPreview
            ? `<div class="crafting-record-block"><p class="crafting-record-label">Ergebnis</p><p class="crafting-record-text">${escapeText(
                resultPreview
              )}</p></div>`
            : ""
        }

        ${
          notePreview
            ? `<div class="crafting-record-block"><p class="crafting-record-label">Notizen</p><p class="crafting-record-text">${escapeText(
                notePreview
              )}</p></div>`
            : ""
        }

        ${buildRelatedLinkChips(relatedEntries, relatedMonsters)}
      </article>
    `;
  }

  function buildMaterialCard(material, specializationNameMap) {
    const summary = toNonEmptyString(material.summary);
    const notePreview = shortenText(formatValuePreview(material.notes, ""), 140);
    const relatedEntries = mergeIdLists(material.relatedEntryIds, material.relatedEntryId);
    const relatedMonsters = mergeIdLists(material.relatedMonsterIds, material.relatedMonsterId);
    const specializationName = specializationNameMap.get(toNonEmptyString(material.specializationId));

    return `
      <article class="crafting-record-card">
        <div class="crafting-record-head">
          <div>
            <p class="crafting-kicker">Material</p>
            <h4 class="crafting-card-title">${escapeText(material.name || material.id || "Material")}</h4>
          </div>
          <span class="crafting-record-type">${escapeText(material.type || "material")}</span>
        </div>

        ${buildMetaChips([
          specializationName ? `Pfad: ${specializationName}` : "",
          material.rarity ? `Seltenheit: ${material.rarity}` : "",
          material.source ? `Quelle: ${material.source}` : "",
        ])}

        ${
          summary
            ? `<p class="crafting-card-subtitle">${escapeText(summary)}</p>`
            : `<p class="crafting-card-subtitle">Noch keine Kurzbeschreibung hinterlegt.</p>`
        }

        ${
          notePreview
            ? `<div class="crafting-record-block"><p class="crafting-record-label">Notizen</p><p class="crafting-record-text">${escapeText(
                notePreview
              )}</p></div>`
            : ""
        }

        ${buildRelatedLinkChips(relatedEntries, relatedMonsters)}
      </article>
    `;
  }

  function buildReferenceSheetCard(sheet, specializationNameMap) {
    const summary = toNonEmptyString(sheet.summary);
    const bodyPreview = shortenText(formatValuePreview(sheet.body, ""), 220);
    const relatedEntries = mergeIdLists(sheet.relatedEntryIds, sheet.relatedEntryId);
    const relatedMonsters = mergeIdLists(sheet.relatedMonsterIds, sheet.relatedMonsterId);
    const specializationName = specializationNameMap.get(toNonEmptyString(sheet.specializationId));

    return `
      <article class="crafting-record-card">
        <div class="crafting-record-head">
          <div>
            <p class="crafting-kicker">Regelseite</p>
            <h4 class="crafting-card-title">${escapeText(sheet.title || sheet.id || "Regelseite")}</h4>
          </div>
          <span class="crafting-record-type">${escapeText(sheet.kind || "rule")}</span>
        </div>

        ${buildMetaChips([
          specializationName ? `Pfad: ${specializationName}` : "",
          toNonEmptyString(sheet.kind) ? `Format: ${sheet.kind}` : "",
        ])}

        ${
          summary
            ? `<p class="crafting-card-subtitle">${escapeText(summary)}</p>`
            : ""
        }

        ${
          bodyPreview
            ? `<div class="crafting-record-block"><p class="crafting-record-label">Inhalt</p><p class="crafting-record-text">${escapeText(
                bodyPreview
              )}</p></div>`
            : `<div class="crafting-placeholder">Noch kein Regeltext hinterlegt.</div>`
        }

        ${buildRelatedLinkChips(relatedEntries, relatedMonsters)}
      </article>
    `;
  }

  function renderLandingPage() {
    const currentDom = dom();
    if (!currentDom.craftingContent) return;

    const query = setCraftingQuery(getUiState().query);
    const professions = sortByOrderThenName(getProfessions());
    const works = getWorks();
    const materials = getMaterials();
    const referenceSheets = getReferenceSheets();

    const visibleProfessions = professions.filter((profession) => {
      const specializations = getSpecializations(profession.id);
      const sections = getCodexSections(profession.id);
      const professionWorks = works.filter((item) => toNonEmptyString(item.professionId) === profession.id);
      const professionMaterials = materials.filter((item) => toNonEmptyString(item.professionId) === profession.id);
      const professionSheets = referenceSheets.filter((item) => toNonEmptyString(item.professionId) === profession.id);

      return matchesQuery(query, [
        profession.name,
        profession.summary,
        ...specializations.map((item) => item.name),
        ...sections.map((item) => item.name),
        ...professionWorks.map((item) => item.name || item.summary || item.id),
        ...professionMaterials.map((item) => item.name || item.summary || item.id),
        ...professionSheets.map((item) => item.title || item.summary || item.id),
      ]);
    });

    setActiveProfessionId("");
    renderJumpbar("");

    if (currentDom.craftingTitle) currentDom.craftingTitle.textContent = "Handwerkskodex";
    if (currentDom.craftingSubtitle) {
      currentDom.craftingSubtitle.textContent =
        "Berufe, Spezialisierungen und Freischaltungen. Wähle einen Beruf, um seinen Baum und seine Handwerksinhalte zu sehen.";
    }
    if (currentDom.craftingPositionChip) currentDom.craftingPositionChip.textContent = "Alle Berufe";
    if (currentDom.craftingMeta) {
      const specializationTotal = professions.reduce(
        (sum, profession) => sum + getSpecializations(profession.id).length,
        0
      );
      const totalContent = works.length + materials.length + referenceSheets.length;
      currentDom.craftingMeta.textContent = `${professions.length} Berufe · ${specializationTotal} Unterberufe · ${totalContent} Inhalte`;
    }
    if (currentDom.craftingOverviewButton) currentDom.craftingOverviewButton.hidden = true;

    if (!visibleProfessions.length) {
      currentDom.craftingContent.innerHTML = `
        <div class="crafting-empty-state">
          Kein Beruf passt zu deiner Suche.
          <button type="button" class="filter-chip crafting-reset-chip" data-crafting-reset-all="1">Suche zurücksetzen</button>
        </div>
      `;
      bindResetButtons();
      return;
    }

    const introCard = `
      <article class="dashboard-card crafting-card">
        <div class="crafting-card-top">
          <span class="crafting-icon">📘</span>
          <div>
            <p class="crafting-kicker">Übersicht</p>
            <h3 class="crafting-card-title">Handwerk als eigenes Nachschlagewerk</h3>
            <p class="crafting-card-subtitle">
              Jeder Beruf besitzt hier seinen gemeinsamen Lehrlingsstamm, feste Spezialisierungen und einen eigenen Kodex. Neue Werke, Materialien und Regelseiten erscheinen automatisch, sobald du sie im Editor pflegst.
            </p>
          </div>
        </div>
        <div class="crafting-stat-row">
          <span class="crafting-stat">📚 ${escapeText(professions.length)} Oberberufe</span>
          <span class="crafting-stat">🧭 ${escapeText(
            professions.reduce((sum, profession) => sum + getSpecializations(profession.id).length, 0)
          )} Unterberufe</span>
          <span class="crafting-stat">🪜 ${escapeText(
            professions.reduce((sum, profession) => sum + getNodes({ professionId: profession.id }).length, 0)
          )} Rangknoten</span>
          <span class="crafting-stat">🧪 ${escapeText(works.length)} Werke</span>
          <span class="crafting-stat">🌿 ${escapeText(materials.length)} Materialien</span>
          <span class="crafting-stat">📜 ${escapeText(referenceSheets.length)} Regelseiten</span>
        </div>
      </article>
    `;

    const cards = visibleProfessions
      .map((profession) => {
        const stats = getProfessionStats(profession.id);
        const specializations = sortByOrderThenName(getSpecializations(profession.id));
        const summaryText =
          toNonEmptyString(profession.summary) ||
          `Gemeinsamer Lehrlingsstamm, ${stats.specializationCount} Spezialisierungen und ${stats.codexCount} vorbereitete Kodex-Bereiche.`;

        return `
          <article class="dashboard-card crafting-card">
            <div class="crafting-card-top">
              <span class="crafting-icon">${escapeText(profession.icon || "•")}</span>
              <div>
                <p class="crafting-kicker">Beruf</p>
                <h3 class="crafting-card-title">${escapeText(profession.name || profession.id)}</h3>
                <p class="crafting-card-subtitle">${escapeText(summaryText)}</p>
              </div>
            </div>

            <div class="crafting-stat-row">
              <span class="crafting-stat">🧩 ${escapeText(stats.specializationCount)} Unterberufe</span>
              <span class="crafting-stat">🪜 ${escapeText(stats.nodeCount)} Knoten</span>
              <span class="crafting-stat">📖 ${escapeText(stats.codexCount)} Bereiche</span>
              <span class="crafting-stat">✨ ${escapeText(stats.contentCount)} Inhalte</span>
            </div>

            <div class="crafting-chip-row">
              ${specializations
                .map((item) => `<span class="crafting-stat">${escapeText(item.name || item.id)}</span>`)
                .join("")}
            </div>

            <div class="crafting-actions">
              <a class="filter-chip crafting-jump-chip" href="${getProfessionHash(profession.id)}">Beruf öffnen</a>
            </div>
          </article>
        `;
      })
      .join("");

    currentDom.craftingContent.innerHTML = `
      ${introCard}
      <div class="crafting-overview-grid">
        ${cards}
      </div>
    `;

    bindResetButtons();
  }

  function renderProfessionPage(professionId) {
    const currentDom = dom();
    if (!currentDom.craftingContent) return;

    const profession = getProfessionById(professionId);
    if (!profession) {
      renderLandingPage();
      return;
    }

    const query = setCraftingQuery(getUiState().query);
    const activeContentType = getActiveCodexContentType();
    setActiveProfessionId(profession.id);
    renderJumpbar(profession.id);

    const specializationsAll = sortByOrderThenName(getSpecializations(profession.id));
    const specializationNameMap = getSpecializationNameMap(profession.id);
    const nodesAll = getNodes({ professionId: profession.id });
    const nodeMap = getNodeMap(profession.id);
    const codexSectionsAll = sortByOrderThenName(getCodexSections(profession.id));
    const sectionMap = getSectionMap(profession.id);
    const worksAll = getWorks().filter((item) => toNonEmptyString(item.professionId) === profession.id);
    const materialsAll = getMaterials().filter((item) => toNonEmptyString(item.professionId) === profession.id);
    const referenceSheetsAll = getReferenceSheets().filter((item) => toNonEmptyString(item.professionId) === profession.id);

    const sharedNodes = nodesAll.filter(
      (node) => !toNonEmptyString(node.specializationId) && toNonEmptyString(node.stageId) !== "legend"
    );
    const legendNodes = nodesAll.filter((node) => toNonEmptyString(node.stageId) === "legend");

    const professionMatches = matchesQuery(query, [
      profession.name,
      profession.summary,
      ...specializationsAll.map((item) => item.name),
      ...codexSectionsAll.map((item) => item.name),
      ...worksAll.flatMap((item) => [
        item.id,
        item.name,
        item.summary,
        item.kind,
        formatValuePreview(item.ingredients),
        formatValuePreview(item.result),
        formatValuePreview(item.notes),
        ...mergeIdLists(item.relatedEntryIds, item.relatedEntryId),
        ...mergeIdLists(item.relatedMonsterIds, item.relatedMonsterId),
      ]),
      ...materialsAll.flatMap((item) => [
        item.id,
        item.name,
        item.summary,
        item.type,
        item.rarity,
        item.source,
        formatValuePreview(item.notes),
        ...mergeIdLists(item.relatedEntryIds, item.relatedEntryId),
        ...mergeIdLists(item.relatedMonsterIds, item.relatedMonsterId),
      ]),
      ...referenceSheetsAll.flatMap((item) => [
        item.id,
        item.title,
        item.summary,
        item.kind,
        formatValuePreview(item.body),
        ...mergeIdLists(item.relatedEntryIds, item.relatedEntryId),
        ...mergeIdLists(item.relatedMonsterIds, item.relatedMonsterId),
      ]),
    ]);

    const specializations = !query || professionMatches
      ? specializationsAll
      : specializationsAll.filter((item) => matchesQuery(query, [item.name, item.summary]));

    const requestedCodexSectionId = getActiveCodexSectionId();
    const hasRequestedCodexSection = codexSectionsAll.some((item) => item && item.id === requestedCodexSectionId);
    const activeCodexSectionId = hasRequestedCodexSection ? requestedCodexSectionId : "";
    if (!hasRequestedCodexSection && requestedCodexSectionId) {
      setActiveCodexSectionId("");
    }

    const filteredWorks = worksAll.filter((item) =>
      !query ||
      professionMatches ||
      matchesQuery(query, [
        item.id,
        item.name,
        item.summary,
        item.kind,
        formatValuePreview(item.ingredients),
        formatValuePreview(item.result),
        formatValuePreview(item.notes),
        ...mergeIdLists(item.relatedEntryIds, item.relatedEntryId),
        ...mergeIdLists(item.relatedMonsterIds, item.relatedMonsterId),
        specializationNameMap.get(toNonEmptyString(item.specializationId)),
      ])
    );

    const filteredMaterials = materialsAll.filter((item) =>
      !query ||
      professionMatches ||
      matchesQuery(query, [
        item.id,
        item.name,
        item.summary,
        item.type,
        item.rarity,
        item.source,
        formatValuePreview(item.notes),
        ...mergeIdLists(item.relatedEntryIds, item.relatedEntryId),
        ...mergeIdLists(item.relatedMonsterIds, item.relatedMonsterId),
        specializationNameMap.get(toNonEmptyString(item.specializationId)),
      ])
    );

    const filteredReferenceSheets = referenceSheetsAll.filter((item) =>
      !query ||
      professionMatches ||
      matchesQuery(query, [
        item.id,
        item.title,
        item.summary,
        item.kind,
        formatValuePreview(item.body),
        ...mergeIdLists(item.relatedEntryIds, item.relatedEntryId),
        ...mergeIdLists(item.relatedMonsterIds, item.relatedMonsterId),
        specializationNameMap.get(toNonEmptyString(item.specializationId)),
      ])
    );

    const visibleWorks = activeContentType && activeContentType !== "works" ? [] : filteredWorks;
    const visibleMaterials = activeContentType && activeContentType !== "materials" ? [] : filteredMaterials;
    const visibleReferenceSheets =
      activeContentType && activeContentType !== "reference" ? [] : filteredReferenceSheets;

    const contentCounts = {
      works: filteredWorks.length,
      materials: filteredMaterials.length,
      reference: filteredReferenceSheets.length,
    };

    if (currentDom.craftingTitle) currentDom.craftingTitle.textContent = profession.name || "Handwerk";
    if (currentDom.craftingSubtitle) {
      currentDom.craftingSubtitle.textContent =
        `Gemeinsamer Lehrlingsstamm, ${specializationsAll.length} Spezialisierungen und ein wachsender Kodex für ${profession.name}.`;
    }
    if (currentDom.craftingPositionChip) currentDom.craftingPositionChip.textContent = profession.name || "Beruf";
    if (currentDom.craftingMeta) {
      const totalContent = worksAll.length + materialsAll.length + referenceSheetsAll.length;
      currentDom.craftingMeta.textContent = `${specializationsAll.length} Unterberufe · ${nodesAll.length} Knoten · ${codexSectionsAll.length} Kodexbereiche · ${totalContent} Inhalte`;
    }
    if (currentDom.craftingOverviewButton) currentDom.craftingOverviewButton.hidden = false;

    const specializationCards = specializations.length
      ? specializations
          .map((specialization) => {
            const rankNodes = nodesAll.filter((node) => node.specializationId === specialization.id);
            return `
              <article class="crafting-branch-card">
                <div>
                  <p class="crafting-kicker">Unterberuf</p>
                  <h4 class="crafting-card-title">${escapeText(specialization.name || specialization.id)}</h4>
                  <p class="crafting-card-subtitle">${
                    escapeText(toNonEmptyString(specialization.summary) || "Noch keine Beschreibung hinterlegt.")
                  }</p>
                </div>
                <div class="crafting-tree-caption">
                  <span class="crafting-tree-badge">🪜 ${escapeText(rankNodes.length)} vorbereitete Ränge</span>
                </div>
                <div class="crafting-rank-list">
                  ${buildRankCards(rankNodes, "Für diesen Unterberuf sind noch keine Ränge vorbereitet.")}
                </div>
              </article>
            `;
          })
          .join("")
      : `<div class="crafting-empty-state">Kein Unterberuf passt zu deiner Suche.</div>`;

    const contentTypeChips = [
      { id: "", label: "Alles", count: contentCounts.works + contentCounts.materials + contentCounts.reference },
      { id: "works", label: "Werke", count: contentCounts.works },
      { id: "materials", label: "Materialien", count: contentCounts.materials },
      { id: "reference", label: "Regeln", count: contentCounts.reference },
    ]
      .map(
        (item) =>
          `<button type="button" class="filter-chip crafting-content-chip${
            activeContentType === item.id ? " is-active" : ""
          }" data-codex-content-type="${escapeText(item.id)}">${escapeText(item.label)} · ${escapeText(
            item.count
          )}</button>`
      )
      .join("");

    const sectionCounts = new Map();
    codexSectionsAll.forEach((section) => sectionCounts.set(section.id, 0));

    visibleWorks.forEach((item) => {
      const sectionId = toNonEmptyString(item.codexSectionId);
      if (sectionCounts.has(sectionId)) sectionCounts.set(sectionId, sectionCounts.get(sectionId) + 1);
    });
    visibleMaterials.forEach((item) => {
      const sectionId = toNonEmptyString(item.codexSectionId);
      if (sectionCounts.has(sectionId)) sectionCounts.set(sectionId, sectionCounts.get(sectionId) + 1);
    });
    visibleReferenceSheets.forEach((item) => {
      const sectionId = toNonEmptyString(item.codexSectionId);
      if (sectionCounts.has(sectionId)) sectionCounts.set(sectionId, sectionCounts.get(sectionId) + 1);
    });

    const codexFilterChips = [
      `<button type="button" class="filter-chip crafting-codex-chip${activeCodexSectionId ? "" : " is-active"}" data-codex-section-id="">Alle Bereiche</button>`,
      ...codexSectionsAll.map((section) => {
        const count = sectionCounts.get(section.id) || 0;
        return `<button type="button" class="filter-chip crafting-codex-chip${
          activeCodexSectionId === section.id ? " is-active" : ""
        }" data-codex-section-id="${escapeText(section.id)}">${escapeText(section.name || section.id)} · ${escapeText(
          count
        )}</button>`;
      }),
    ].join("");

    const renderedSectionCards = [];

    codexSectionsAll.forEach((section) => {
      if (activeCodexSectionId && section.id !== activeCodexSectionId) return;

      const sectionWorks = visibleWorks.filter(
        (item) => toNonEmptyString(item.codexSectionId) === toNonEmptyString(section.id)
      );
      const sectionMaterials = visibleMaterials.filter(
        (item) => toNonEmptyString(item.codexSectionId) === toNonEmptyString(section.id)
      );
      const sectionReferenceSheets = visibleReferenceSheets.filter(
        (item) => toNonEmptyString(item.codexSectionId) === toNonEmptyString(section.id)
      );

      const recordCards = [
        ...sectionWorks.map((item) => buildWorkCard(item, nodeMap, specializationNameMap)),
        ...sectionMaterials.map((item) => buildMaterialCard(item, specializationNameMap)),
        ...sectionReferenceSheets.map((item) => buildReferenceSheetCard(item, specializationNameMap)),
      ];

      const sectionMatches =
        !query ||
        professionMatches ||
        matchesQuery(query, [section.name, section.summary, section.kind]);

      if (!recordCards.length && query && !sectionMatches) {
        return;
      }

      renderedSectionCards.push(`
        <article class="crafting-codex-section-shell">
          <div class="crafting-record-head">
            <div>
              <p class="crafting-kicker">Kodexbereich</p>
              <h4 class="crafting-card-title">${escapeText(section.name || section.id)}</h4>
            </div>
            <span class="crafting-record-type">${escapeText(section.kind || "catalog")}</span>
          </div>

          ${
            toNonEmptyString(section.summary)
              ? `<p class="crafting-card-subtitle">${escapeText(section.summary)}</p>`
              : ""
          }

          ${
            recordCards.length
              ? `<div class="crafting-record-grid">${recordCards.join("")}</div>`
              : `<div class="crafting-placeholder">Noch keine Inhalte hinterlegt. Dieser Bereich ist vorbereitet und erscheint automatisch, sobald du im Editor Werke, Materialien oder Regelseiten zuordnest.</div>`
          }
        </article>
      `);
    });

    const unassignedWorks = visibleWorks.filter((item) => !toNonEmptyString(item.codexSectionId));
    const unassignedMaterials = visibleMaterials.filter((item) => !toNonEmptyString(item.codexSectionId));
    const unassignedReferenceSheets = visibleReferenceSheets.filter((item) => !toNonEmptyString(item.codexSectionId));

    if (!activeCodexSectionId && (unassignedWorks.length || unassignedMaterials.length || unassignedReferenceSheets.length)) {
      const orphanCards = [
        ...unassignedWorks.map((item) => buildWorkCard(item, nodeMap, specializationNameMap)),
        ...unassignedMaterials.map((item) => buildMaterialCard(item, specializationNameMap)),
        ...unassignedReferenceSheets.map((item) => buildReferenceSheetCard(item, specializationNameMap)),
      ];

      renderedSectionCards.push(`
        <article class="crafting-codex-section-shell crafting-codex-orphan-shell">
          <div class="crafting-record-head">
            <div>
              <p class="crafting-kicker">Freie Inhalte</p>
              <h4 class="crafting-card-title">Noch keinem Kodexbereich zugeordnet</h4>
            </div>
            <span class="crafting-record-type">Offen</span>
          </div>
          <p class="crafting-card-subtitle">
            Diese Inhalte sind bereits angelegt, aber noch keinem Bereich zugeordnet. Im Editor kannst du sie sauber einsortieren.
          </p>
          <div class="crafting-record-grid">${orphanCards.join("")}</div>
        </article>
      `);
    }

    const activeFilterBits = [];
    if (query) activeFilterBits.push(`Suche: ${query}`);
    if (activeContentType) {
      activeFilterBits.push(
        activeContentType === "works"
          ? "Nur Werke"
          : activeContentType === "materials"
          ? "Nur Materialien"
          : "Nur Regelseiten"
      );
    }
    if (activeCodexSectionId) {
      const activeSection = sectionMap.get(activeCodexSectionId);
      activeFilterBits.push(`Bereich: ${activeSection ? activeSection.name || activeSection.id : activeCodexSectionId}`);
    }

    const activeFilterSummary = activeFilterBits.length
      ? `<div class="crafting-filter-summary">
          <span class="crafting-filter-label">Aktive Filter</span>
          <span class="crafting-filter-text">${escapeText(activeFilterBits.join(" · "))}</span>
          <button type="button" class="filter-chip crafting-reset-chip" data-crafting-reset-all="1">Zurücksetzen</button>
        </div>`
      : "";

    const legendCard = `
      <article class="crafting-legend-shell">
        <div class="crafting-record-head">
          <div>
            <p class="crafting-kicker">Finale Stufe</p>
            <h4 class="crafting-card-title">Legendenpfad</h4>
          </div>
          <span class="crafting-record-type">Abschluss</span>
        </div>
        <p class="crafting-card-subtitle">
          Die Legenden-Stufe steht bewusst am Ende des Baums. Sie wird erst relevant, wenn alle Spezialisierungspfade ihren Großmeister-Rang erreicht haben.
        </p>
        <div class="crafting-rank-list">
          ${buildRankCards(
            legendNodes,
            "Der Legendenpfad ist vorgesehen, aber noch nicht weiter beschrieben."
          )}
        </div>
      </article>
    `;

    currentDom.craftingContent.innerHTML = `
      ${buildSectionNav()}

      <section class="crafting-section crafting-section-shell" id="crafting-overview-section">
        <div class="crafting-card-top">
          <span class="crafting-icon">${escapeText(profession.icon || "•")}</span>
          <div>
            <p class="crafting-kicker">Übersicht</p>
            <h3 class="crafting-card-title">${escapeText(profession.name || profession.id)}</h3>
            <p class="crafting-card-subtitle">${
              escapeText(
                toNonEmptyString(profession.summary) ||
                  "Das Grundgerüst steht. Freischaltungen, Regeln und konkrete Werke ergänzt du später im Editor pro Rang oder Kodexbereich."
              )
            }</p>
          </div>
        </div>

        <div class="crafting-stat-row">
          <span class="crafting-stat">🧩 ${escapeText(specializationsAll.length)} Unterberufe</span>
          <span class="crafting-stat">🪜 ${escapeText(nodesAll.length)} Rangknoten</span>
          <span class="crafting-stat">📖 ${escapeText(codexSectionsAll.length)} Kodexbereiche</span>
          <span class="crafting-stat">🧪 ${escapeText(worksAll.length)} Werke</span>
          <span class="crafting-stat">🌿 ${escapeText(materialsAll.length)} Materialien</span>
          <span class="crafting-stat">📜 ${escapeText(referenceSheetsAll.length)} Regelseiten</span>
        </div>

        <div class="crafting-placeholder">
          Diese Berufsseite ist in drei feste Bereiche geteilt: Übersicht für den schnellen Einstieg, Baum für die Progression und Kodex für spätere Rezepte, Werke, Materialarchive und Referenztabellen.
        </div>
      </section>

      <section class="crafting-section crafting-section-shell" id="crafting-tree-section">
        <div>
          <p class="crafting-kicker">Baum</p>
          <h3 class="crafting-section-title">Berufsbaum</h3>
          <p class="crafting-card-subtitle">
            Zuerst kommt der gemeinsame Lehrlingsstamm. Danach verzweigt sich der Beruf in seine Spezialisierungen. Die Legenden-Stufe liegt ganz am Ende als gemeinsamer Abschluss.
          </p>
        </div>

        <div class="crafting-tree-layout">
          <div class="crafting-card">
            <div class="crafting-tree-caption">
              <span class="crafting-tree-badge">Lehrling I–VI</span>
            </div>
            <div class="crafting-rank-list">
              ${buildRankCards(sharedNodes, "Für den Lehrlingsstamm sind noch keine Freischaltungstexte hinterlegt.")}
            </div>
          </div>

          <div class="crafting-tree-branches">
            ${specializationCards}
          </div>
        </div>

        ${legendCard}
      </section>

      <section class="crafting-section crafting-section-shell" id="crafting-codex-section">
        <div>
          <p class="crafting-kicker">Kodex</p>
          <h3 class="crafting-section-title">Kodex-Gerüst</h3>
          <p class="crafting-card-subtitle">
            Hier liegen die eigentlichen Inhalte des Berufs. Neue Werke, Materialien und Regelseiten erscheinen automatisch, sobald du sie im Editor anlegst.
          </p>
        </div>

        <div class="crafting-codex-summary">
          ${codexSectionsAll
            .map((section) => `<span class="crafting-stat">${escapeText(section.name || section.id)}</span>`)
            .join("")}
        </div>

        ${activeFilterSummary}

        <div class="crafting-codex-toolbar">
          <div class="crafting-content-filterbar" aria-label="Inhaltstyp filtern">
            ${contentTypeChips}
          </div>
          <div class="crafting-codex-filterbar" aria-label="Kodexbereiche filtern">
            ${codexFilterChips}
          </div>
        </div>

        <div class="crafting-codex-grid">
          ${
            renderedSectionCards.length
              ? renderedSectionCards.join("")
              : `<div class="crafting-empty-state crafting-codex-empty">
                   Kein Kodexinhalt passt zu deiner Suche oder dem aktiven Filter.
                   <button type="button" class="filter-chip crafting-reset-chip" data-crafting-reset-all="1">Filter zurücksetzen</button>
                 </div>`
          }
        </div>
      </section>
    `;

    bindSectionNav();
    bindCodexFilters();
    bindCodexContentFilters();
    bindResetButtons();
  }

  function scrollToSection(sectionId) {
    const currentDom = dom();
    if (!currentDom.craftingContent || !sectionId) return;
    const section = currentDom.craftingContent.querySelector(`#${sectionId}`);
    if (!section || typeof section.scrollIntoView !== "function") return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function bindSectionNav() {
    const currentDom = dom();
    if (!currentDom.craftingContent) return;

    const buttons = currentDom.craftingContent.querySelectorAll("[data-crafting-scroll]");
    buttons.forEach((button) => {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", (ev) => {
        if (ev) ev.preventDefault();
        scrollToSection(button.getAttribute("data-crafting-scroll"));
      });
    });
  }

  function bindCodexFilters() {
    const currentDom = dom();
    if (!currentDom.craftingContent) return;

    const buttons = currentDom.craftingContent.querySelectorAll("[data-codex-section-id]");
    buttons.forEach((button) => {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", (ev) => {
        if (ev) ev.preventDefault();
        setActiveCodexSectionId(button.getAttribute("data-codex-section-id"));
        renderCrafting();
      });
    });
  }

  function bindCodexContentFilters() {
    const currentDom = dom();
    if (!currentDom.craftingContent) return;

    const buttons = currentDom.craftingContent.querySelectorAll("[data-codex-content-type]");
    buttons.forEach((button) => {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", (ev) => {
        if (ev) ev.preventDefault();
        setActiveCodexContentType(button.getAttribute("data-codex-content-type"));
        renderCrafting();
      });
    });
  }

  function bindResetButtons() {
    const currentDom = dom();
    if (!currentDom.craftingContent) return;

    const buttons = currentDom.craftingContent.querySelectorAll("[data-crafting-reset-all]");
    buttons.forEach((button) => {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", (ev) => {
        if (ev) ev.preventDefault();
        setCraftingQuery("");
        setActiveCodexSectionId("");
        setActiveCodexContentType("");
        renderCrafting();
      });
    });
  }

  function bindControlsOnce() {
    const currentDom = dom();

    if (currentDom.craftingSearch && currentDom.craftingSearch.dataset.bound !== "1") {
      currentDom.craftingSearch.dataset.bound = "1";
      currentDom.craftingSearch.addEventListener("input", (ev) => {
        setCraftingQuery((ev && ev.target && ev.target.value) || "");
        renderCrafting();
      });
    }

    if (currentDom.craftingOverviewButton && currentDom.craftingOverviewButton.dataset.bound !== "1") {
      currentDom.craftingOverviewButton.dataset.bound = "1";
      currentDom.craftingOverviewButton.addEventListener("click", (ev) => {
        if (ev) ev.preventDefault();
        setActiveCodexSectionId("");
        setActiveCodexContentType("");
        window.location.hash = getOverviewHash();
      });
    }
  }

  function renderCrafting() {
    if (getCurrentView() !== "crafting") {
      renderBadge();
      return;
    }

    const currentDom = dom();
    if (!currentDom.craftingView) return;

    bindControlsOnce();

    const professionId = getActiveProfessionId();
    if (professionId) renderProfessionPage(professionId);
    else renderLandingPage();

    renderBadge();
  }

  function installRenderHook() {
    if (app.__craftingRenderHookInstalled) return;
    if (typeof app.renderAll !== "function") return;

    const originalRenderAll = app.renderAll;
    app.renderAll = function renderAllWithCrafting(...args) {
      const result = originalRenderAll.apply(this, args);
      if (getCurrentView() === "crafting") {
        renderCrafting();
      } else {
        renderBadge();
      }
      return result;
    };
    app.__craftingRenderHookInstalled = true;
  }

  installRenderHook();

  Object.assign(app, {
    renderCrafting,
    getCraftingUiState: getUiState,
    setCraftingQuery,
    setActiveCraftingProfessionId: setActiveProfessionId,
    getActiveCraftingProfessionId: getActiveProfessionId,
  });
})();
