(function () {
  const app = window.GlossaryApp;
  if (!app) return;

  const { state } = app;

  const ABILITY_ORDER = ["str", "dex", "con", "int", "wis", "cha"];
  const ABILITY_LABELS = {
    str: "Stärke",
    dex: "Geschicklichkeit",
    con: "Konstitution",
    int: "Intelligenz",
    wis: "Weisheit",
    cha: "Charisma",
  };
  const SPELLBOOK_SECTIONS = [
    { key: "cantrips", label: "Zaubertricks" },
    { key: "level1", label: "Zaubergrad 1" },
    { key: "level2", label: "Zaubergrad 2" },
    { key: "level3", label: "Zaubergrad 3" },
    { key: "level4", label: "Zaubergrad 4" },
    { key: "level5", label: "Zaubergrad 5" },
    { key: "level6", label: "Zaubergrad 6" },
    { key: "level7", label: "Zaubergrad 7" },
    { key: "level8", label: "Zaubergrad 8" },
    { key: "level9", label: "Zaubergrad 9" },
  ];
  const HERO_SELECTION_STORAGE_KEY = "dnd-glossar-selected-hero";

  function callIfFn(fn, ...args) {
    if (typeof fn === "function") return fn(...args);
    return undefined;
  }

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

  function getCurrentView() {
    return typeof app.getCurrentView === "function" ? app.getCurrentView() : state.view;
  }

  function getHeroesMeta() {
    return typeof app.getHeroesMeta === "function"
      ? app.getHeroesMeta()
      : {
          title: "Heldenakten",
          subtitle: "Persönliche Chroniken bekannter Helden",
        };
  }

  function getVisibleHeroes() {
    return (typeof app.getHeroes === "function" ? app.getHeroes() : []).filter(
      (hero) => hero && hero.visible !== false
    );
  }

  function getHeroById(id) {
    return typeof app.getHeroById === "function" ? app.getHeroById(id) : null;
  }

  function getRecognizedHero() {
    return typeof app.getRecognizedHero === "function" ? app.getRecognizedHero() : null;
  }

  function getOverviewHash() {
    return typeof app.getHeroesOverviewHash === "function" ? app.getHeroesOverviewHash() : "#heldenakte";
  }

  function getHeroHash(id) {
    return typeof app.getHeroRecordHash === "function" ? app.getHeroRecordHash(id) : getOverviewHash();
  }

  function readStoredHeroId() {
    try {
      return toNonEmptyString(window.localStorage.getItem(HERO_SELECTION_STORAGE_KEY));
    } catch {
      return "";
    }
  }

  function saveStoredHeroId(heroId) {
    const id = toNonEmptyString(heroId);
    try {
      if (id) window.localStorage.setItem(HERO_SELECTION_STORAGE_KEY, id);
      else window.localStorage.removeItem(HERO_SELECTION_STORAGE_KEY);
    } catch {}
  }

  function buildImageUrl(raw) {
    if (typeof app.buildImageUrl === "function") return app.buildImageUrl(raw);
    return toNonEmptyString(raw);
  }

  function formatSignedNumber(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return "±0";
    return (numeric >= 0 ? "+" : "") + numeric;
  }

  function formatNumber(value, fallback) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return String(numeric);
    return fallback || "—";
  }

  function formatCurrentMax(current, max) {
    const hasCurrent = Number.isFinite(Number(current));
    const hasMax = Number.isFinite(Number(max));
    if (hasCurrent && hasMax) return `${Number(current)} / ${Number(max)}`;
    if (hasMax) return `${Number(max)}`;
    if (hasCurrent) return `${Number(current)}`;
    return "—";
  }

  function getSpellSlotRows(spellcasting) {
    const slots = spellcasting && spellcasting.slots && typeof spellcasting.slots === "object" ? spellcasting.slots : {};
    return Object.keys(slots)
      .map((level) => Number(level))
      .filter((level) => Number.isFinite(level))
      .sort((a, b) => a - b)
      .map((level) => {
        const slot = slots[String(level)] || {};
        const current = Number(slot.current);
        const max = Number(slot.max);
        const hasMax = Number.isFinite(max) && max > 0;
        const fill = Number.isFinite(current) && hasMax ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;
        return { level, current: slot.current, max: slot.max, fill, hasMax };
      });
  }

  function computeAbilityModifier(score) {
    const numeric = Number(score);
    if (!Number.isFinite(numeric)) return 0;
    return Math.floor((numeric - 10) / 2);
  }

  function getHeroInitials(hero) {
    const name = toNonEmptyString(hero && hero.name);
    if (!name) return "🛡️";
    const parts = name.split(/\s+/).filter(Boolean);
    if (!parts.length) return "🛡️";
    const letters = parts.slice(0, 2).map((part) => part.charAt(0).toUpperCase());
    return letters.join("");
  }

  function renderParagraphs(raw) {
    const text = toNonEmptyString(raw);
    if (!text) return "";
    return text
      .split(/\n{2,}/)
      .map((part) => `<p>${escapeText(part).replace(/\n/g, "<br />")}</p>`)
      .join("");
  }

  function renderPlaceholder(label) {
    return `<p class="hero-placeholder">${escapeText(label)}</p>`;
  }

  function getSelectedHero(heroes, recognizedHero) {
    const visibleHeroes = Array.isArray(heroes) ? heroes : [];
    if (!visibleHeroes.length) {
      state.selectedHeroId = null;
      return null;
    }

    const current = state.selectedHeroId ? getHeroById(state.selectedHeroId) : null;
    const currentVisible = current && current.visible !== false ? current : null;
    const recognizedVisible =
      recognizedHero && recognizedHero.visible !== false ? recognizedHero : null;
    const storedHeroId = readStoredHeroId();
    const storedHero = storedHeroId ? getHeroById(storedHeroId) : null;
    const storedVisible = storedHero && storedHero.visible !== false ? storedHero : null;
    const next = currentVisible || recognizedVisible || storedVisible || visibleHeroes[0] || null;

    if (next && state.selectedHeroId !== next.id) {
      state.selectedHeroId = next.id;
    }

    if (state.arena && typeof state.arena === "object" && next) {
      if (!state.arena.selectedHeroId || !getHeroById(state.arena.selectedHeroId)) {
        state.arena.selectedHeroId = next.id;
      }
    }

    return next;
  }

  function renderRecognitionCard(selectedHero, recognizedHero, heroCount) {
    const ownerName = toNonEmptyString(state && state.ownerName);

    if (!heroCount) {
      return `
        <article class="hero-note hero-note--empty">
          <div class="hero-note-copy">
            <p class="hero-note-kicker">Archiv noch leer</p>
            <h3>Noch keine Heldenakten angelegt</h3>
            <p>
              Sobald die sechs bekannten Helden in <code>window.heroes</code> gepflegt sind,
              erscheint hier automatisch die persönliche Aktenansicht.
            </p>
          </div>
        </article>
      `;
    }

    if (recognizedHero && selectedHero && recognizedHero.id === selectedHero.id) {
      return `
        <article class="hero-note hero-note--recognized">
          <div class="hero-note-copy">
            <p class="hero-note-kicker">Persönlicher Treffer</p>
            <h3>Als dein Held erkannt</h3>
            <p>
              Der eingetragene Name ${ownerName ? `<strong>${escapeText(ownerName)}</strong>` : "in den Einstellungen"}
              wurde der Akte von <strong>${escapeText(recognizedHero.name)}</strong> zugeordnet.
            </p>
          </div>
          <span class="hero-note-seal" aria-hidden="true">🛡️</span>
        </article>
      `;
    }

    if (recognizedHero) {
      return `
        <article class="hero-note hero-note--recognized">
          <div class="hero-note-copy">
            <p class="hero-note-kicker">Persönlicher Treffer</p>
            <h3>${escapeText(recognizedHero.name)} wurde erkannt</h3>
            <p>
              Deine Akte wurde erkannt, du schaust gerade aber in eine andere Chronik.
              Wenn du willst, springe direkt zurück zu deinem Helden.
            </p>
          </div>
          <button
            type="button"
            class="hero-note-action"
            data-hero-jump="${escapeText(recognizedHero.id)}"
          >
            Meinen Helden öffnen
          </button>
        </article>
      `;
    }

    if (ownerName) {
      return `
        <article class="hero-note hero-note--hint">
          <div class="hero-note-copy">
            <p class="hero-note-kicker">Noch keine Zuordnung</p>
            <h3>Kein Held zu „${escapeText(ownerName)}“ gefunden</h3>
            <p>
              Du kannst unten trotzdem jede bekannte Heldenakte öffnen. Später lassen sich
              zusätzliche Aliase direkt in den Heldendaten hinterlegen.
            </p>
          </div>
          <button type="button" class="hero-note-action" data-hero-open-settings>
            Namen ändern
          </button>
        </article>
      `;
    }

    return `
      <article class="hero-note hero-note--hint">
        <div class="hero-note-copy">
          <p class="hero-note-kicker">Persönliche Zuordnung</p>
          <h3>Trage deinen Namen in den Einstellungen ein</h3>
          <p>
            Dann wird beim Öffnen der Heldenakte automatisch der passende Held vorgewählt.
            Alle Akten bleiben trotzdem weiterhin frei einsehbar.
          </p>
        </div>
        <button type="button" class="hero-note-action" data-hero-open-settings>
          Einstellungen öffnen
        </button>
      </article>
    `;
  }

  function renderHeroSelector(heroes, selectedHero, recognizedHero) {
    if (!Array.isArray(heroes) || !heroes.length) return "";

    const selectedId = selectedHero && selectedHero.id ? selectedHero.id : "";
    const recognizedId = recognizedHero && recognizedHero.id ? recognizedHero.id : "";

    return heroes
      .map((hero) => {
        const isActive = hero.id === selectedId;
        const isRecognized = hero.id === recognizedId;
        return `
          <button
            type="button"
            class="filter-chip hero-selector-chip${isActive ? " is-active" : ""}"
            data-hero-select="${escapeText(hero.id)}"
            aria-pressed="${isActive ? "true" : "false"}"
          >
            <span class="hero-selector-name">${escapeText(hero.name)}</span>
            ${isRecognized ? '<span class="hero-selector-badge">dein Held</span>' : ""}
          </button>
        `;
      })
      .join("");
  }

  function renderPortrait(hero) {
    const image = buildImageUrl(hero && hero.image);
    if (image) {
      return `
        <div class="hero-portrait">
          <img src="${escapeText(image)}" alt="Porträt von ${escapeText(hero.name)}" loading="lazy" />
        </div>
      `;
    }

    return `
      <div class="hero-portrait hero-portrait--fallback" aria-hidden="true">
        <span>${escapeText(getHeroInitials(hero))}</span>
      </div>
    `;
  }

  function renderMetaChips(hero) {
    const chips = [];
    if (hero.className) chips.push(`<span class="hero-meta-chip">${escapeText(hero.className)}</span>`);
    if (hero.subclass) chips.push(`<span class="hero-meta-chip">${escapeText(hero.subclass)}</span>`);
    chips.push(`<span class="hero-meta-chip">Stufe ${formatNumber(hero.level, "—")}</span>`);
    if (hero.species) chips.push(`<span class="hero-meta-chip">${escapeText(hero.species)}</span>`);
    if (hero.playerName) chips.push(`<span class="hero-meta-chip">Spieler: ${escapeText(hero.playerName)}</span>`);
    return chips.join("");
  }

  function renderHeroHeader(hero, recognizedHero) {
    const vitals = hero && hero.vitals ? hero.vitals : {};
    const isRecognized = !!(recognizedHero && recognizedHero.id === hero.id);
    return `
      <article class="hero-dossier-top">
        <div class="hero-summary-card">
          ${renderPortrait(hero)}
          <div class="hero-summary-copy">
            <p class="hero-record-kicker">Persönliche Akte${isRecognized ? " · erkannt" : ""}</p>
            <h3 class="hero-record-title">${escapeText(hero.name)}</h3>
            ${
              hero.title
                ? `<p class="hero-record-byline">${escapeText(hero.title)}</p>`
                : `<p class="hero-record-byline">Akteneintrag der bekannten Reisegefährten</p>`
            }
            <div class="hero-meta-row">${renderMetaChips(hero)}</div>
            <div class="hero-summary-line">
              <span class="hero-summary-pill">RK ${formatNumber(vitals.armorClass, "—")}</span>
              <span class="hero-summary-pill">LP ${formatCurrentMax(vitals.hpCurrent, vitals.hpMax)}</span>
              <span class="hero-summary-pill">Ini ${formatSignedNumber(vitals.initiativeMod)}</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderVitalCards(hero) {
    const vitals = hero && hero.vitals ? hero.vitals : {};
    const cards = [
      ["Rüstungsklasse", formatNumber(vitals.armorClass, "—"), "Schutz"],
      ["Lebenspunkte", formatCurrentMax(vitals.hpCurrent, vitals.hpMax), "Ausdauer"],
      ["Initiative", formatSignedNumber(vitals.initiativeMod), "Reaktion"],
      ["Bewegung", toNonEmptyString(vitals.speed) || "—", "Tempo"],
      ["Passive Wahrnehmung", formatNumber(vitals.passivePerception, "—"), "Wachsamkeit"],
      ["Übungsbonus", formatSignedNumber(vitals.proficiencyBonus), "Routine"],
    ];

    return `
      <section class="hero-section hero-section--vitals">
        <div class="hero-section-heading">
          <p class="hero-section-kicker">Kernwerte</p>
          <h3 class="hero-section-title">Vitals und Bereitschaft</h3>
        </div>
        <div class="hero-vitals-grid">
          ${cards
            .map(
              ([label, value, hint]) => `
                <article class="hero-vital-card">
                  <p class="hero-vital-label">${escapeText(label)}</p>
                  <strong class="hero-vital-value">${escapeText(value)}</strong>
                  <span class="hero-vital-hint">${escapeText(hint)}</span>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderAbilities(hero) {
    const abilities = hero && hero.abilities ? hero.abilities : {};
    return `
      <section class="hero-section">
        <div class="hero-section-heading">
          <p class="hero-section-kicker">Grundprofil</p>
          <h3 class="hero-section-title">Attribute</h3>
        </div>
        <div class="hero-ability-grid">
          ${ABILITY_ORDER.map((key) => {
            const score = Number(abilities[key]);
            const hasScore = Number.isFinite(score);
            const modifier = computeAbilityModifier(score);
            return `
              <article class="hero-ability-card">
                <p class="hero-ability-label">${escapeText(ABILITY_LABELS[key])}</p>
                <strong class="hero-ability-score">${hasScore ? score : "—"}</strong>
                <span class="hero-ability-mod">${formatSignedNumber(modifier)}</span>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderSaves(hero) {
    const saves = hero && hero.saves && typeof hero.saves === "object" ? hero.saves : {};
    const rows = Object.keys(saves)
      .map((key) => {
        const entry = saves[key] && typeof saves[key] === "object" ? saves[key] : null;
        if (!entry) return "";
        const label = ABILITY_LABELS[key] || key;
        return `
          <li class="hero-list-row">
            <span>${escapeText(label)}</span>
            <strong>${formatSignedNumber(entry.bonus)}</strong>
            ${entry.proficient ? '<span class="hero-inline-tag">geübt</span>' : ""}
          </li>
        `;
      })
      .filter(Boolean)
      .join("");

    return `
      <section class="hero-section">
        <div class="hero-section-heading">
          <p class="hero-section-kicker">Verteidigung</p>
          <h3 class="hero-section-title">Rettungswürfe</h3>
        </div>
        ${rows ? `<ul class="hero-list">${rows}</ul>` : renderPlaceholder("Noch keine Rettungswürfe eingetragen.")}
      </section>
    `;
  }

  function renderSkills(hero) {
    const skills = Array.isArray(hero && hero.skills) ? hero.skills : [];
    const rows = skills
      .map((skill) => {
        const badges = [];
        if (skill.proficient) badges.push("geübt");
        if (skill.expertise) badges.push("Expertise");
        return `
          <li class="hero-list-row">
            <span>${escapeText(skill.label || skill.name || skill.id || "Fertigkeit")}</span>
            <strong>${formatSignedNumber(skill.bonus)}</strong>
            <span class="hero-inline-tag-row">
              ${badges.map((badge) => `<span class="hero-inline-tag">${escapeText(badge)}</span>`).join("")}
            </span>
          </li>
        `;
      })
      .join("");

    return `
      <section class="hero-section">
        <div class="hero-section-heading">
          <p class="hero-section-kicker">Talente</p>
          <h3 class="hero-section-title">Fertigkeiten</h3>
        </div>
        ${rows ? `<ul class="hero-list">${rows}</ul>` : renderPlaceholder("Noch keine Fertigkeiten eingetragen.")}
      </section>
    `;
  }

  function renderAttacks(hero) {
    const attacks = Array.isArray(hero && hero.attacks) ? hero.attacks : [];
    const items = attacks
      .map((attack) => {
        const damage = Array.isArray(attack.damage) ? attack.damage : [];
        const attackBonus =
          attack.attackBonusSource === "spell" &&
          hero &&
          hero.spellcasting &&
          Number.isFinite(Number(hero.spellcasting.spellAttackBonus))
            ? hero.spellcasting.spellAttackBonus
            : attack.attackBonus;
        return `
          <article class="hero-card-list-item">
            <div class="hero-card-list-head">
              <div>
                <h4>${escapeText(attack.name || "Angriff")}</h4>
                <p>${escapeText(attack.notes || "Kampftechnik")}</p>
              </div>
              <span class="hero-hit-badge">${formatSignedNumber(attackBonus)} auf Treffer</span>
            </div>
            <div class="hero-damage-row">
              ${
                attack.resourceCost && attack.resourceCost.type === "spellSlot"
                  ? `<span class="hero-damage-chip hero-damage-chip--spell">Zauberplatz Grad ${escapeText(String(attack.resourceCost.level || 1))}</span>`
                  : ""
              }
              ${damage
                .map(
                  (part) => `
                    <span class="hero-damage-chip">
                      ${escapeText(part.formula || "—")} · ${escapeText(part.type || "Unbekannt")}
                    </span>
                  `
                )
                .join("")}
            </div>
          </article>
        `;
      })
      .join("");

    return `
      <section class="hero-section hero-section--wide">
        <div class="hero-section-heading">
          <p class="hero-section-kicker">Kampfakte</p>
          <h3 class="hero-section-title">Angriffe und Kampftechniken</h3>
        </div>
        ${items ? `<div class="hero-card-list">${items}</div>` : renderPlaceholder("Noch keine Angriffe hinterlegt.")}
      </section>
    `;
  }

  function renderSpellcasting(hero) {
    const spellcasting = hero && hero.spellcasting && typeof hero.spellcasting === "object" ? hero.spellcasting : {};
    const slots = getSpellSlotRows(spellcasting);
    const hasSpellcasting =
      toNonEmptyString(spellcasting.ability) ||
      Number.isFinite(Number(spellcasting.spellSaveDc)) ||
      Number.isFinite(Number(spellcasting.spellAttackBonus)) ||
      slots.length > 0;

    if (!hasSpellcasting) return "";

    const abilityLabel = ABILITY_LABELS[spellcasting.ability] || spellcasting.ability || "—";
    const slotCards = slots
      .map(
        (slot) => `
          <article class="hero-spell-slot-card">
            <div class="hero-resource-head">
              <h4>Grad ${escapeText(String(slot.level))}</h4>
              <strong>${escapeText(formatCurrentMax(slot.current, slot.max))}</strong>
            </div>
            ${
              slot.hasMax
                ? `<div class="hero-resource-bar hero-resource-bar--spell" aria-hidden="true"><span style="width:${slot.fill}%"></span></div>`
                : ""
            }
          </article>
        `
      )
      .join("");

    return `
      <section class="hero-section">
        <div class="hero-section-heading">
          <p class="hero-section-kicker">Magie</p>
          <h3 class="hero-section-title">Zauberwirken</h3>
        </div>
        <div class="hero-spellcasting-grid">
          <span><strong>Attribut</strong>${escapeText(abilityLabel)}</span>
          <span><strong>Zauber-SG</strong>${escapeText(formatNumber(spellcasting.spellSaveDc, "—"))}</span>
          <span><strong>Zauberangriff</strong>${escapeText(Number.isFinite(Number(spellcasting.spellAttackBonus)) ? formatSignedNumber(spellcasting.spellAttackBonus) : "—")}</span>
        </div>
        ${slotCards ? `<div class="hero-spell-slot-list">${slotCards}</div>` : renderPlaceholder("Keine Zauberplätze hinterlegt.")}
        ${spellcasting.notes ? `<p class="hero-resource-meta">${escapeText(spellcasting.notes)}</p>` : ""}
      </section>
    `;
  }

  function renderSpellbook(hero) {
    const spellbook = hero && hero.spellbook && typeof hero.spellbook === "object" ? hero.spellbook : {};
    const sections = SPELLBOOK_SECTIONS.map((entry) => {
      const values = Array.isArray(spellbook[entry.key])
        ? spellbook[entry.key].map((value) => toNonEmptyString(value)).filter(Boolean)
        : [];
      return { ...entry, values };
    }).filter((entry) => entry.values.length);

    const notes = toNonEmptyString(spellbook.notes);
    if (!sections.length && !notes) return "";

    const items = sections
      .map((section) => {
        return `
          <article class="hero-card-list-item">
            <div class="hero-card-list-head">
              <div>
                <h4>${escapeText(section.label)}</h4>
              </div>
              <span class="hero-hit-badge">${escapeText(String(section.values.length))}</span>
            </div>
            <div class="hero-damage-row">
              ${section.values
                .map(
                  (spell) => `
                    <span class="hero-damage-chip">
                      ${escapeText(spell)}
                    </span>
                  `
                )
                .join("")}
            </div>
          </article>
        `;
      })
      .join("");

    return `
      <section class="hero-section hero-section--wide">
        <div class="hero-section-heading">
          <p class="hero-section-kicker">Arkanes Register</p>
          <h3 class="hero-section-title">Vollständige Zauberliste</h3>
        </div>
        ${items ? `<div class="hero-card-list">${items}</div>` : ""}
        ${notes ? `<p class="hero-resource-meta">${escapeText(notes)}</p>` : ""}
      </section>
    `;
  }

  function renderResources(hero) {
    const resources = Array.isArray(hero && hero.resources) ? hero.resources : [];
    const items = resources
      .map((resource) => {
        const current = Number(resource.current);
        const max = Number(resource.max);
        const hasCurrent = Number.isFinite(current);
        const hasMax = Number.isFinite(max) && max > 0;
        const fill = hasCurrent && hasMax ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;
        return `
          <article class="hero-resource-card">
            <div class="hero-resource-head">
              <h4>${escapeText(resource.name || "Ressource")}</h4>
              <strong>${escapeText(formatCurrentMax(resource.current, resource.max))}</strong>
            </div>
            ${
              hasMax
                ? `<div class="hero-resource-bar" aria-hidden="true"><span style="width:${fill}%"></span></div>`
                : ""
            }
            <p class="hero-resource-meta">
              ${resource.recharge ? `Regeneration: ${escapeText(resource.recharge)}` : "Ohne Regenerationseintrag"}
            </p>
            ${resource.notes ? `<p class="hero-resource-meta">${escapeText(resource.notes)}</p>` : ""}
          </article>
        `;
      })
      .join("");

    return `
      <section class="hero-section">
        <div class="hero-section-heading">
          <p class="hero-section-kicker">Vorräte</p>
          <h3 class="hero-section-title">Ressourcen</h3>
        </div>
        ${items ? `<div class="hero-resource-list">${items}</div>` : renderPlaceholder("Noch keine Ressourcen eingetragen.")}
      </section>
    `;
  }

  function renderNotes(hero) {
    const background = renderParagraphs(hero && hero.background);
    const notes = renderParagraphs(hero && hero.notes);

    return `
      <section class="hero-section hero-section--wide">
        <div class="hero-section-heading">
          <p class="hero-section-kicker">Randnotizen</p>
          <h3 class="hero-section-title">Hintergrund und Vermerke</h3>
        </div>
        <div class="hero-notes-grid">
          <article class="hero-notes-card">
            <h4>Hintergrund</h4>
            ${background || renderPlaceholder("Noch kein Hintergrundtext hinterlegt.")}
          </article>
          <article class="hero-notes-card">
            <h4>Besonderheiten</h4>
            ${notes || renderPlaceholder("Noch keine Notizen hinterlegt.")}
          </article>
        </div>
      </section>
    `;
  }

  function renderHeroDossier(hero, recognizedHero) {
    if (!hero) {
      return `
        <article class="hero-empty-card">
          <p class="hero-empty-kicker">Keine Auswahl</p>
          <h3>Keine Heldenakte ausgewählt</h3>
          <p>
            Wähle oben eine Akte aus, um die persönlichen Werte, Angriffe und Notizen anzuzeigen.
          </p>
        </article>
      `;
    }

    return `
      <div class="hero-shell">
        ${renderHeroHeader(hero, recognizedHero)}
        ${renderVitalCards(hero)}
        <div class="hero-detail-grid">
          ${renderAbilities(hero)}
          ${renderSaves(hero)}
          ${renderSkills(hero)}
          ${renderSpellcasting(hero)}
          ${renderSpellbook(hero)}
          ${renderResources(hero)}
          ${renderAttacks(hero)}
          ${renderNotes(hero)}
        </div>
      </div>
    `;
  }

  function selectHero(heroId) {
    const hero = getHeroById(heroId);
    if (!hero || hero.visible === false) return;

    state.selectedHeroId = hero.id;
    saveStoredHeroId(hero.id);
    if (state.arena && typeof state.arena === "object") {
      state.arena.selectedHeroId = hero.id;
    }

    const targetHash = getHeroHash(hero.id);
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
      return;
    }

    renderHeroes();
  }

  function bindControlsOnce() {
    const currentDom = dom();
    const view = currentDom.heroesView;
    if (!view || view.dataset.heroesBound === "1") return;

    view.dataset.heroesBound = "1";
    view.addEventListener("click", (ev) => {
      const target = ev && ev.target ? ev.target.closest("[data-hero-select], [data-hero-jump], [data-hero-open-settings]") : null;
      if (!target) return;
      ev.preventDefault();

      if (target.hasAttribute("data-hero-select")) {
        selectHero(target.getAttribute("data-hero-select"));
        return;
      }

      if (target.hasAttribute("data-hero-jump")) {
        selectHero(target.getAttribute("data-hero-jump"));
        return;
      }

      if (target.hasAttribute("data-hero-open-settings")) {
        callIfFn(app.openSettings);
      }
    });
  }

  function renderHeroes() {
    const currentDom = dom();
    if (!currentDom.heroesView) return;

    const meta = getHeroesMeta();
    if (currentDom.heroesKicker) {
      currentDom.heroesKicker.textContent = "Archivkammer der Reisegefährten";
    }
    if (currentDom.heroesTitle) currentDom.heroesTitle.textContent = meta.title || "Heldenakte";
    if (currentDom.heroesSubtitle) {
      currentDom.heroesSubtitle.textContent =
        meta.subtitle || "Persönliche Chroniken bekannter Helden";
    }

    if (getCurrentView() !== "heroes") return;

    bindControlsOnce();

    const heroes = getVisibleHeroes();
    const recognizedHero = getRecognizedHero();
    const selectedHero = getSelectedHero(heroes, recognizedHero);

    if (currentDom.heroesRecognition) {
      currentDom.heroesRecognition.innerHTML = renderRecognitionCard(
        selectedHero,
        recognizedHero,
        heroes.length
      );
    }

    if (currentDom.heroesSelector) {
      currentDom.heroesSelector.innerHTML = renderHeroSelector(
        heroes,
        selectedHero,
        recognizedHero
      );
    }

    if (currentDom.heroesContent) {
      currentDom.heroesContent.innerHTML = renderHeroDossier(selectedHero, recognizedHero);
    }
  }

  function installRenderHook() {
    if (app.__heroesRenderHookInstalled) return;
    if (typeof app.renderAll !== "function") return;

    const originalRenderAll = app.renderAll;
    app.renderAll = function renderAllWithHeroes(...args) {
      const result = originalRenderAll.apply(this, args);
      if (getCurrentView() === "heroes") {
        renderHeroes();
      }
      return result;
    };
    app.__heroesRenderHookInstalled = true;
  }

  installRenderHook();

  Object.assign(app, {
    renderHeroes,
  });
})();
