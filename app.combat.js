(function () {
  function getApp() {
    const app = window.GlossaryApp;
    if (!app || typeof app !== "object") {
      throw new Error("GlossaryApp ist noch nicht initialisiert.");
    }
    return app;
  }

  function toText(value) {
    return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
  }

  function toFiniteNumber(value, fallback) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const raw = toText(value).replace(",", ".");
    if (!raw) return typeof fallback === "number" ? fallback : 0;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : typeof fallback === "number" ? fallback : 0;
  }

  function deepClone(value) {
    if (value == null) return value;
    return JSON.parse(JSON.stringify(value));
  }

  function buildToken(prefix, value, fallback) {
    const app = getApp();
    const raw = toText(value) || toText(fallback);
    const slug = raw ? (typeof app.slugifyId === "function" ? app.slugifyId(raw) : raw) : prefix;
    return prefix + ":" + (slug || prefix);
  }

  function normalizeSide(side) {
    const value = toText(side).toLowerCase();
    if (value === "hero" || value === "heroes") return "heroes";
    if (value === "monster" || value === "monsters") return "monsters";
    return value || "monsters";
  }

  function getOpposingSide(side) {
    const normalized = normalizeSide(side);
    return normalized === "heroes" ? "monsters" : "heroes";
  }

  function isAlive(combatant) {
    return !!(combatant && toFiniteNumber(combatant.hpCurrent, 0) > 0);
  }

  function indexToLetter(index) {
    let value = Math.max(0, Math.floor(toFiniteNumber(index, 0)));
    let label = "";
    do {
      label = String.fromCharCode(65 + (value % 26)) + label;
      value = Math.floor(value / 26) - 1;
    } while (value >= 0);
    return label;
  }

  const CONDITION_DEFINITIONS = {
    poisoned: {
      id: "poisoned",
      label: "Vergiftet",
      description: "Nachteil auf eigene Angriffswürfe."
    },
    prone: {
      id: "prone",
      label: "Liegend",
      description: "Nahkampfangriffe gegen das Ziel haben Vorteil, Fernkampfangriffe Nachteil."
    },
    restrained: {
      id: "restrained",
      label: "Festgesetzt",
      description: "Eigene Angriffe haben Nachteil; Angriffe gegen das Ziel haben Vorteil."
    },
    frightened: {
      id: "frightened",
      label: "Verängstigt",
      description: "Nachteil auf eigene Angriffswürfe."
    }
  };

  const CONDITION_ALIASES = {
    poisoned: "poisoned",
    poison: "poisoned",
    vergiftet: "poisoned",
    prone: "prone",
    liegend: "prone",
    niedergeworfen: "prone",
    "zu-boden": "prone",
    restrained: "restrained",
    restraint: "restrained",
    festgesetzt: "restrained",
    gefesselt: "restrained",
    gepackt: "restrained",
    frightened: "frightened",
    fear: "frightened",
    verangstigt: "frightened",
    veraengstigt: "frightened",
    verängstigt: "frightened"
  };

  function normalizeToken(value) {
    return toText(value)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9äöüß]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function normalizeConditionId(raw) {
    const token = normalizeToken(raw);
    if (!token) return "";
    return CONDITION_ALIASES[token] || (CONDITION_DEFINITIONS[token] ? token : "");
  }

  function normalizeConditionDuration(raw) {
    if (!raw) return null;
    if (typeof raw === "string") {
      const token = normalizeToken(raw);
      if (!token) return null;
      if (token === "saveendturn" || token === "save-end-turn") {
        return { type: "saveEndTurn", ability: "con", dc: 10, auto: true };
      }
      const roundsMatch = token.match(/^rounds-(\d+)$/);
      if (roundsMatch) {
        return { type: "rounds", remaining: Math.max(1, parseInt(roundsMatch[1], 10)) };
      }
      return { type: "text", text: toText(raw) };
    }

    if (typeof raw === "number" && Number.isFinite(raw)) {
      return { type: "rounds", remaining: Math.max(1, Math.floor(raw)) };
    }

    if (!raw || typeof raw !== "object") return null;
    const typeToken = normalizeToken(raw.type || raw.kind || raw.mode || raw.trigger);
    if (typeToken === "saveendturn" || typeToken === "save-end-turn") {
      const ability = normalizeToken(raw.ability || raw.stat) || "con";
      const validAbility = ["str", "dex", "con", "int", "wis", "cha"].includes(ability) ? ability : "con";
      return {
        type: "saveEndTurn",
        ability: validAbility,
        dc: Math.max(0, toFiniteNumber(raw.dc != null ? raw.dc : raw.sg, 10)),
        auto: raw.auto !== false
      };
    }
    if (typeToken === "rounds" || raw.remaining != null) {
      return {
        type: "rounds",
        remaining: Math.max(1, Math.floor(toFiniteNumber(raw.remaining != null ? raw.remaining : raw.rounds, 1)))
      };
    }
    return { type: "text", text: toText(raw.text || raw.label || raw.description) };
  }

  function normalizeCondition(raw) {
    const obj = raw && typeof raw === "object" ? raw : { id: raw };
    const id = normalizeConditionId(obj.id || obj.type || obj.condition || obj.name);
    if (!id) return null;
    const definition = CONDITION_DEFINITIONS[id];
    return {
      id,
      label: toText(obj.label || obj.name) || definition.label,
      source: toText(obj.source),
      duration: normalizeConditionDuration(obj.duration),
      notes: toText(obj.notes || obj.note || obj.description),
      active: obj.active !== false
    };
  }

  function normalizeConditions(raw) {
    const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const seen = new Set();
    return list
      .map(normalizeCondition)
      .filter((condition) => {
        if (!condition || seen.has(condition.id)) return false;
        seen.add(condition.id);
        return condition.active !== false;
      });
  }

  function hasCondition(combatant, conditionId) {
    const id = normalizeConditionId(conditionId);
    if (!id || !Array.isArray(combatant && combatant.conditions)) return false;
    return combatant.conditions.some((condition) => normalizeConditionId(condition && condition.id) === id);
  }

  function setCombatantCondition(battle, combatantId, conditionId, active, details) {
    const combatant = getCombatantById(battle, combatantId);
    if (!combatant) {
      throw new Error("Kämpfer nicht gefunden.");
    }
    const id = normalizeConditionId(conditionId);
    if (!id) {
      throw new Error("Unbekannter Zustand.");
    }

    combatant.conditions = normalizeConditions(combatant.conditions);
    const exists = combatant.conditions.some((condition) => condition.id === id);
    if (active === false) {
      const removed = combatant.conditions.find((condition) => condition.id === id);
      combatant.conditions = combatant.conditions.filter((condition) => condition.id !== id);
      if (removed && battle && Array.isArray(battle.log)) {
        appendLog(battle, "condition-end", {
          actorId: combatant.id,
          conditionId: id,
          text: combatant.name + " verliert den Zustand " + (removed.label || id) + "."
        });
      }
    } else if (!exists) {
      const condition = normalizeCondition({
        id,
        source: details && details.source,
        duration: details && details.duration,
        notes: details && details.notes
      });
      if (condition) {
        combatant.conditions.push(condition);
        if (battle && Array.isArray(battle.log)) {
          appendLog(battle, "condition-start", {
            actorId: combatant.id,
            conditionId: id,
            text: combatant.name + " erhält den Zustand " + (condition.label || id) + "."
          });
        }
      }
    }
    return combatant;
  }

  function toggleCombatantCondition(battle, combatantId, conditionId) {
    const combatant = getCombatantById(battle, combatantId);
    if (!combatant) {
      throw new Error("Kämpfer nicht gefunden.");
    }
    const id = normalizeConditionId(conditionId);
    return setCombatantCondition(battle, combatantId, id, !hasCondition(combatant, id));
  }

  function chooseDefaultActionId(actions, preferredId) {
    const list = Array.isArray(actions) ? actions : [];
    const preferred = toText(preferredId);
    const usable = list.filter((action) => action && toText(action.type || "attack") === "attack");
    return usable.some((action) => action && toText(action.id) === preferred)
      ? preferred
      : usable.length && usable[0]
      ? toText(usable[0].id)
      : "";
  }

  function getUsableCombatActions(actions) {
    return (Array.isArray(actions) ? actions : []).filter((action) => {
      const type = toText(action.type || "attack");
      if (type === "heal") return !!(action && Array.isArray(action.healing) && action.healing.length);
      if (!action || !Array.isArray(action.damage) || !action.damage.length) return false;
      return type === "attack" || type === "save";
    });
  }

  function chooseDefaultCombatActionId(actions, preferredId) {
    const usable = getUsableCombatActions(actions);
    const preferred = toText(preferredId);
    return usable.some((action) => action && toText(action.id) === preferred)
      ? preferred
      : usable.length && usable[0]
      ? toText(usable[0].id)
      : "";
  }

  function normalizeDamageParts(raw) {
    const list = Array.isArray(raw) ? raw : raw && typeof raw === "object" ? [raw] : [];
    return list
      .map((item, index) => {
        const obj = item && typeof item === "object" ? item : null;
        if (!obj) return null;
        const formula = toText(obj.formula || obj.dice || obj.damage || obj.roll);
        if (!formula) return null;
        return {
          id: toText(obj.id) || "damage-" + (index + 1),
          formula,
          type: toText(obj.type || obj.damageType) || "Unbekannt",
          bonus: obj.bonus == null || obj.bonus === "" ? null : toFiniteNumber(obj.bonus, 0),
          notes: toText(obj.notes || obj.note)
        };
      })
      .filter(Boolean);
  }

  const ACTION_TYPES = new Set(["attack", "save", "heal", "effect", "multiattack", "utility"]);
  const ACTION_COSTS = new Set(["action", "bonusAction", "reaction", "legendary", "lair", "none"]);
  const TARGET_MODES = new Set(["single", "multiple", "area", "self", "all"]);
  const TARGET_SIDES = new Set(["enemies", "allies", "self", "any"]);

  function slugActionId(name, fallback) {
    const app = getApp();
    const raw = toText(name);
    if (raw && typeof app.slugifyId === "function") return app.slugifyId(raw);
    return raw ? raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : fallback;
  }

  function normalizeTarget(raw, actionType) {
    const obj = raw && typeof raw === "object" ? raw : {};
    const mode = (toText(obj.mode) || "single").toLowerCase();
    const side = (toText(obj.side) || (actionType === "heal" ? "allies" : "enemies")).toLowerCase();
    const maxTargets = obj.maxTargets == null || obj.maxTargets === "" ? null : toFiniteNumber(obj.maxTargets, 0);
    return {
      mode: TARGET_MODES.has(mode) ? mode : "single",
      side: TARGET_SIDES.has(side) ? side : "enemies",
      maxTargets: maxTargets && maxTargets > 0 ? maxTargets : null,
      radius: obj.radius == null || obj.radius === "" ? null : toFiniteNumber(obj.radius, 0),
      range: toText(obj.range || obj.reach),
      shape: toText(obj.shape || obj.areaShape),
      notes: toText(obj.notes || obj.note)
    };
  }

  function normalizeResourceCost(raw) {
    const obj = raw && typeof raw === "object" ? raw : null;
    if (!obj) return null;
    const type = toText(obj.type || obj.resourceType || obj.kind);
    if (!type) return null;
    return {
      type,
      level: obj.level == null || obj.level === "" ? null : toFiniteNumber(obj.level, 0),
      amount: Math.max(1, toFiniteNumber(obj.amount != null ? obj.amount : obj.cost, 1)),
      resourceId: toText(obj.resourceId || obj.id),
      consume: obj.consume !== false,
      notes: toText(obj.notes || obj.note)
    };
  }

  function normalizeSpellSlots(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    const out = {};
    Object.keys(source).forEach((key) => {
      const numericLevel = Math.floor(toFiniteNumber(key, 0));
      if (numericLevel <= 0) return;
      const level = String(numericLevel);
      const value = source[key];
      const obj = value && typeof value === "object" ? value : { max: value, current: value };
      const max = Math.max(0, toFiniteNumber(obj.max, 0));
      const current = Math.max(0, toFiniteNumber(obj.current != null ? obj.current : max, max));
      if (max <= 0 && current <= 0) return;
      out[level] = {
        current: Math.min(max || current, current),
        max: max || current
      };
    });
    return out;
  }

  function normalizeSpellcasting(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    return {
      ability: toText(source.ability || source.stat).toLowerCase(),
      spellSaveDc: source.spellSaveDc == null && source.saveDc == null ? null : toFiniteNumber(source.spellSaveDc != null ? source.spellSaveDc : source.saveDc, 0),
      spellAttackBonus:
        source.spellAttackBonus == null && source.attackBonus == null
          ? null
          : toFiniteNumber(source.spellAttackBonus != null ? source.spellAttackBonus : source.attackBonus, 0),
      slots: normalizeSpellSlots(source.slots || source.spellSlots),
      notes: toText(source.notes || source.note)
    };
  }

  function normalizeSave(raw) {
    const obj = raw && typeof raw === "object" ? raw : null;
    if (!obj) return null;
    const ability = toText(obj.ability || obj.stat).toLowerCase();
    return {
      ability: ["str", "dex", "con", "int", "wis", "cha"].includes(ability) ? ability : "dex",
      dc: obj.dc == null && obj.sg == null ? null : toFiniteNumber(obj.dc != null ? obj.dc : obj.sg, 0),
      success: (toText(obj.success || obj.onSuccess) || "half").toLowerCase(),
      failure: toText(obj.failure || obj.onFailure),
      notes: toText(obj.notes || obj.note)
    };
  }

  function normalizeEffects(raw) {
    const list = Array.isArray(raw) ? raw : raw && typeof raw === "object" ? [raw] : [];
    return list
      .map((item, index) => {
        const obj = item && typeof item === "object" ? item : null;
        if (!obj) return null;
        const name = toText(obj.name || obj.label || obj.condition) || "Effekt " + (index + 1);
        return {
          id: toText(obj.id) || slugActionId(name, "effect-" + (index + 1)),
          name,
          type: toText(obj.type || obj.kind) || "condition",
          condition: toText(obj.condition || obj.conditionId || obj.status),
          applyOn: (toText(obj.applyOn || obj.when || obj.trigger) || "failure").toLowerCase(),
          duration: obj.duration && typeof obj.duration === "object" ? deepClone(obj.duration) : null,
          notes: toText(obj.notes || obj.note || obj.description)
        };
      })
      .filter(Boolean);
  }

  function normalizeActions(raw) {
    const list = Array.isArray(raw) ? raw : [];
    return list
      .map((item, index) => {
        const obj = item && typeof item === "object" ? item : null;
        if (!obj) return null;
        const name = toText(obj.name || obj.title || obj.label) || "Angriff " + (index + 1);
        const damage = normalizeDamageParts(obj.damage || obj.damageParts || obj.parts);
        const rawType = (
          toText(obj.type) ||
          (obj.save && typeof obj.save === "object"
            ? "save"
            : obj.healing || obj.heal
            ? "heal"
            : obj.effects || obj.effect
            ? "effect"
            : "attack")
        ).toLowerCase();
        const type = ACTION_TYPES.has(rawType) ? rawType : "attack";
        const actionCostRaw = (toText(obj.actionCost || obj.cost) || "action")
          .replace(/[\s_-]+/g, "")
          .toLowerCase();
        const actionCost = actionCostRaw === "bonusaction" ? "bonusAction" : actionCostRaw === "free" ? "none" : actionCostRaw;
        return {
          id: toText(obj.id) || slugActionId(name, "action-" + (index + 1)),
          name,
          type,
          actionCost: ACTION_COSTS.has(actionCost) ? actionCost : "action",
          resourceCost: normalizeResourceCost(obj.resourceCost || obj.resource),
          target: normalizeTarget(obj.target, type),
          attackBonusSource: toText(obj.attackBonusSource || obj.toHitSource),
          saveDcSource: toText(obj.saveDcSource || obj.dcSource),
          spellLevel:
            obj.spellLevel == null && obj.level == null
              ? null
              : toFiniteNumber(obj.spellLevel != null ? obj.spellLevel : obj.level, 0),
          attackBonus: toFiniteNumber(
            obj.attackBonus != null ? obj.attackBonus : obj.hitBonus != null ? obj.hitBonus : obj.toHit,
            0
          ),
          save: normalizeSave(obj.save),
          damage,
          healing: normalizeDamageParts(obj.healing || obj.heal),
          effects: normalizeEffects(obj.effects || obj.effect),
          children: normalizeActions(obj.children || obj.actions || obj.steps),
          notes: toText(obj.notes || obj.note)
        };
      })
      .filter((action) => action && (action.type !== "attack" || action.damage.length));
  }

  function normalizeAttacks(raw) {
    return normalizeActions(raw).filter(
      (action) => action && action.type === "attack" && Array.isArray(action.damage) && action.damage.length
    );
  }

  function rollDie(sides) {
    const size = Math.max(1, Math.floor(toFiniteNumber(sides, 0)));
    if (!size) {
      throw new Error("Ungültiger Würfel.");
    }
    return Math.floor(Math.random() * size) + 1;
  }

  function tokenizeFormula(formula) {
    const raw = toText(formula).replace(/\s+/g, "");
    if (!raw) throw new Error("Leere Würfelformel.");
    const tokens = raw.match(/[+-]?[^+-]+/g);
    if (!tokens || !tokens.length) {
      throw new Error("Würfelformel konnte nicht gelesen werden: " + raw);
    }
    return tokens;
  }

  function rollDiceFormula(formula, options) {
    const opts = options && typeof options === "object" ? options : {};
    const critical = opts.critical === true;
    const tokens = tokenizeFormula(formula);
    const terms = [];
    let total = 0;

    tokens.forEach((token) => {
      const sign = token.startsWith("-") ? -1 : 1;
      const body = token.replace(/^[+-]/, "");
      const diceMatch = body.match(/^(\d*)d(\d+)$/i);

      if (diceMatch) {
        const baseCount = Math.max(1, parseInt(diceMatch[1] || "1", 10));
        const sides = Math.max(1, parseInt(diceMatch[2], 10));
        const countRolled = critical ? baseCount * 2 : baseCount;
        const results = [];
        for (let i = 0; i < countRolled; i += 1) {
          results.push(rollDie(sides));
        }
        const subtotal = results.reduce((sum, value) => sum + value, 0) * sign;
        total += subtotal;
        terms.push({
          kind: "dice",
          sign,
          count: baseCount,
          countRolled,
          sides,
          results,
          subtotal
        });
        return;
      }

      if (!/^\d+$/.test(body)) {
        throw new Error("Würfelformel konnte nicht gelesen werden: " + formula);
      }

      const value = parseInt(body, 10) * sign;
      total += value;
      terms.push({
        kind: "modifier",
        sign,
        value,
        subtotal: value
      });
    });

    return {
      formula: toText(formula),
      critical,
      terms,
      total
    };
  }

  function rollD20(modifier, options) {
    const opts = options && typeof options === "object" ? options : {};
    const mod = toFiniteNumber(modifier, 0);
    const hasAdvantage = opts.advantage === true;
    const hasDisadvantage = opts.disadvantage === true;
    const effectiveAdvantage = hasAdvantage && !hasDisadvantage;
    const effectiveDisadvantage = hasDisadvantage && !hasAdvantage;
    const rolls = [rollDie(20)];
    if (effectiveAdvantage || effectiveDisadvantage) {
      rolls.push(rollDie(20));
    }
    const natural = effectiveAdvantage
      ? Math.max(rolls[0], rolls[1])
      : effectiveDisadvantage
      ? Math.min(rolls[0], rolls[1])
      : rolls[0];
    return {
      natural,
      rolls,
      modifier: mod,
      total: natural + mod,
      advantage: effectiveAdvantage,
      disadvantage: effectiveDisadvantage,
      canceledAdvantage: hasAdvantage && hasDisadvantage,
      mode: effectiveAdvantage ? "advantage" : effectiveDisadvantage ? "disadvantage" : "normal",
      reason: toText(opts.reason),
      isCritical: natural === 20,
      isFumble: natural === 1
    };
  }

  function resolveHeroSource(input) {
    const app = getApp();
    if (typeof input === "string") {
      return typeof app.getHeroById === "function" ? app.getHeroById(input) : null;
    }
    if (input && typeof input === "object") {
      const id = toText(input.id);
      if (id && typeof app.getHeroById === "function") {
        return app.getHeroById(id) || input;
      }
      return input;
    }
    return null;
  }

  function resolveMonsterSource(input) {
    const app = getApp();
    if (typeof input === "string") {
      return typeof app.findBestiaryMonsterById === "function" ? app.findBestiaryMonsterById(input) : null;
    }
    if (input && typeof input === "object") {
      const id = toText(input.id);
      if (id && typeof app.findBestiaryMonsterById === "function") {
        return app.findBestiaryMonsterById(id) || input;
      }
      return input;
    }
    return null;
  }

  function normalizeHeroAttacksForCombat(hero) {
    const app = getApp();
    const actions =
      hero && Array.isArray(hero.actions)
        ? hero.actions
        : hero && Array.isArray(hero.combatActions)
        ? hero.combatActions
        : hero && Array.isArray(hero.attacks)
        ? hero.attacks
        : [];
    if (typeof app.normalizeCombatActions === "function") {
      return deepClone(app.normalizeCombatActions(actions)).filter((action) => action.type === "attack");
    }
    if (typeof app.normalizeCombatAttacks === "function") {
      return deepClone(app.normalizeCombatAttacks(actions));
    }
    return deepClone(normalizeAttacks(actions));
  }

  function normalizeHeroActionsForCombat(hero) {
    const app = getApp();
    const actions =
      hero && Array.isArray(hero.actions)
        ? hero.actions
        : hero && Array.isArray(hero.combatActions)
        ? hero.combatActions
        : hero && Array.isArray(hero.attacks)
        ? hero.attacks
        : [];
    if (typeof app.normalizeCombatActions === "function") {
      return deepClone(app.normalizeCombatActions(actions));
    }
    return deepClone(normalizeActions(actions));
  }

  function applySpellcastingToActions(actions, spellcasting) {
    const spell = normalizeSpellcasting(spellcasting);
    return (Array.isArray(actions) ? actions : []).map((action) => {
      const next = action && typeof action === "object" ? { ...action } : action;
      if (!next || typeof next !== "object") return next;
      if (normalizeToken(next.attackBonusSource) === "spell" && spell.spellAttackBonus != null) {
        next.attackBonus = spell.spellAttackBonus;
      }
      if (
        next.save &&
        typeof next.save === "object" &&
        (normalizeToken(next.saveDcSource) === "spell" || next.save.dc == null) &&
        spell.spellSaveDc != null
      ) {
        next.save = { ...next.save, dc: spell.spellSaveDc };
      }
      return next;
    });
  }

  function isSpellSlotCost(resourceCost) {
    return normalizeToken(resourceCost && resourceCost.type) === "spellslot";
  }

  function normalizeResourcePools(raw) {
    const list = Array.isArray(raw) ? raw : [];
    return list
      .map((item, index) => {
        const obj = item && typeof item === "object" ? item : null;
        if (!obj) return null;
        const id = toText(obj.id) || "resource-" + (index + 1);
        const name = toText(obj.name || obj.label || id) || id;
        const current = obj.current == null ? null : Math.max(0, toFiniteNumber(obj.current, 0));
        const max = obj.max == null ? null : Math.max(0, toFiniteNumber(obj.max, 0));
        return {
          id,
          name,
          type: normalizeToken(obj.type || obj.kind || obj.resourceType || id),
          current,
          max,
          recharge: toText(obj.recharge || obj.refresh),
          notes: toText(obj.notes || obj.note)
        };
      })
      .filter(Boolean);
  }

  function findResourcePool(combatant, resourceCost) {
    const pools = Array.isArray(combatant && combatant.resources) ? combatant.resources : [];
    const cost = resourceCost && typeof resourceCost === "object" ? resourceCost : {};
    const costId = normalizeToken(cost.resourceId || cost.id);
    const costType = normalizeToken(cost.type || cost.resourceType || cost.kind);

    if (costId) {
      const byId = pools.find((pool) => normalizeToken(pool.id) === costId);
      if (byId) return byId;
    }
    if (costType) {
      const byType = pools.find(
        (pool) =>
          normalizeToken(pool.type) === costType ||
          normalizeToken(pool.id) === costType ||
          normalizeToken(pool.name) === costType
      );
      if (byType) return byType;
    }
    return null;
  }

  function getSpellSlotLevels(combatant) {
    const slots =
      combatant &&
      combatant.spellcasting &&
      combatant.spellcasting.slots &&
      typeof combatant.spellcasting.slots === "object"
        ? combatant.spellcasting.slots
        : {};
    return Object.keys(slots)
      .map((level) => Math.max(1, Math.floor(toFiniteNumber(level, 0))))
      .filter((level) => level > 0)
      .sort((a, b) => a - b);
  }

  function findAvailableSpellSlotLevel(combatant, resourceCost) {
    const requiredLevel = Math.max(1, Math.floor(toFiniteNumber(resourceCost && resourceCost.level, 1)));
    const amount = Math.max(1, Math.floor(toFiniteNumber(resourceCost && resourceCost.amount, 1)));
    const slots = combatant && combatant.spellcasting ? combatant.spellcasting.slots || {} : {};
    return getSpellSlotLevels(combatant).find((level) => {
      const slot = slots[String(level)];
      return level >= requiredLevel && slot && toFiniteNumber(slot.current, 0) >= amount;
    }) || null;
  }

  function getActionResourceState(battle, actor, action) {
    const cost = action && action.resourceCost && typeof action.resourceCost === "object" ? action.resourceCost : null;
    if (!cost || cost.consume === false) return { usable: true, label: "", reason: "", cost: null };
    if (isSpellSlotCost(cost)) {
      const amount = Math.max(1, Math.floor(toFiniteNumber(cost.amount, 1)));
      const requiredLevel = Math.max(1, Math.floor(toFiniteNumber(cost.level, 1)));
      const turnState = actor && actor.turnState && typeof actor.turnState === "object" ? actor.turnState : {};
      if (turnState.spellSlotCast) {
        return {
          usable: false,
          label: "Zauberplatz Grad " + requiredLevel,
          reason: "In diesem Zug wurde bereits ein Zauber mit Zauberplatz gewirkt.",
          cost
        };
      }

      const slotLevel = findAvailableSpellSlotLevel(actor, cost);
      if (!slotLevel) {
        return {
          usable: false,
          label: "Zauberplatz Grad " + requiredLevel,
          reason: "Kein Zauberplatz Grad " + requiredLevel + " oder höher verfügbar.",
          cost
        };
      }

      return {
        usable: true,
        label: "Zauberplatz Grad " + slotLevel,
        reason: "",
        cost,
        spendLevel: slotLevel,
        amount
      };
    }

    const amount = Math.max(1, Math.floor(toFiniteNumber(cost.amount, 1)));
    const pool = findResourcePool(actor, cost);
    if (!pool) {
      return {
        usable: false,
        label: toText(cost.type || cost.resourceId || "Ressource"),
        reason: "Diese Ressource ist nicht hinterlegt.",
        cost
      };
    }
    if (pool.current == null) {
      return {
        usable: true,
        label: pool.name,
        reason: "",
        cost,
        pool,
        amount
      };
    }
    if (toFiniteNumber(pool.current, 0) < amount) {
      return {
        usable: false,
        label: pool.name + " " + (pool.max != null ? pool.current + "/" + pool.max : pool.current),
        reason: "Zu wenig " + pool.name + " verfügbar.",
        cost,
        pool,
        amount
      };
    }

    return {
      usable: true,
      label: pool.name + " " + (pool.max != null ? pool.current + "/" + pool.max : pool.current),
      reason: "",
      cost,
      pool,
      amount
    };
  }

  function spendActionResource(battle, actor, action) {
    const state = getActionResourceState(battle, actor, action);
    if (!state.usable) {
      throw new Error(state.reason || "Die Ressource für diese Aktion ist nicht verfügbar.");
    }
    if (!state.cost || state.cost.consume === false) return null;

    if (isSpellSlotCost(state.cost)) {
      const level = String(state.spendLevel);
      const slots = actor.spellcasting && actor.spellcasting.slots ? actor.spellcasting.slots : {};
      const slot = slots[level];
      if (!slot) throw new Error("Zauberplatz nicht gefunden.");
      slot.current = Math.max(0, toFiniteNumber(slot.current, 0) - state.amount);
      actor.turnState = actor.turnState && typeof actor.turnState === "object" ? actor.turnState : {};
      actor.turnState.spellSlotCast = true;
      return {
        type: "spellSlot",
        level: state.spendLevel,
        requiredLevel: Math.max(1, Math.floor(toFiniteNumber(state.cost.level, 1))),
        amount: state.amount,
        remaining: slot.current,
        max: slot.max
      };
    }

    const pool = state.pool || findResourcePool(actor, state.cost);
    if (!pool) throw new Error("Ressource nicht gefunden.");
    if (pool.current != null) {
      pool.current = Math.max(0, toFiniteNumber(pool.current, 0) - state.amount);
    }
    return {
      type: "resource",
      resourceId: pool.id,
      resourceName: pool.name,
      amount: state.amount,
      remaining: pool.current,
      max: pool.max
    };
  }

  function createCombatantFromHero(input, options) {
    const opts = options && typeof options === "object" ? options : {};
    const source = resolveHeroSource(input);
    if (!source) {
      throw new Error("Held nicht gefunden.");
    }

    const vitals = source.vitals && typeof source.vitals === "object" ? source.vitals : {};
    const armorClass = toFiniteNumber(vitals.armorClass, 10);
    const hpMax = Math.max(0, toFiniteNumber(vitals.hpMax, 0));
    const hpCurrentRaw = toFiniteNumber(vitals.hpCurrent, hpMax);
    const hpCurrent = Math.max(0, Math.min(hpMax || hpCurrentRaw, hpCurrentRaw));
    const spellcasting = normalizeSpellcasting(source.spellcasting);
    const sourceArena = source.arena && typeof source.arena === "object" ? source.arena : {};
    const arenaSprite = toText(sourceArena.sprite || source.image);
    const arenaBackgrounds = Array.isArray(sourceArena.backgrounds)
      ? sourceArena.backgrounds.map((value) => toText(value)).filter(Boolean)
      : [];
    const actions = applySpellcastingToActions(normalizeHeroActionsForCombat(source), spellcasting);
    const attacks = actions.filter((action) => action.type === "attack");
    const attackReady = hpMax > 0 && hpCurrent > 0 && attacks.length > 0;
    const usableActions = getUsableCombatActions(actions);
    const actionReady = hpMax > 0 && hpCurrent > 0 && usableActions.length > 0;

    return {
      id: toText(opts.instanceId) || buildToken("hero", source.id, source.name),
      side: normalizeSide(opts.side || "heroes"),
      sourceId: toText(source.id) || toText(source.name),
      name: toText(opts.name) || toText(source.name) || toText(source.id) || "Held",
      armorClass,
      hpCurrent,
      hpMax,
      initiativeMod: toFiniteNumber(vitals.initiativeMod, 0),
      abilities: deepClone(source.abilities || {}),
      saves: deepClone(source.saves || {}),
      resources: normalizeResourcePools(source.resources),
      spellcasting,
      actions,
      combatActions: actions,
      attacks,
      conditions: normalizeConditions(
        Array.isArray(opts.conditions) || opts.conditions
          ? opts.conditions
          : source.conditions || source.statusConditions
      ),
      turnState: {},
      defaultActionId: chooseDefaultCombatActionId(actions),
      notes: toText(source.notes),
      meta: {
        className: toText(source.className),
        subclass: toText(source.subclass),
        level: toFiniteNumber(source.level, 1),
        species: toText(source.species),
        title: toText(source.title),
        image: toText(source.image),
        arena: {
          sprite: arenaSprite,
          backgrounds: arenaBackgrounds
        }
      },
      ready: actionReady,
      attackReady,
      actionReady,
      v2Ready: actionReady,
      disabledReason: !usableActions.length
        ? "Der Held hat keine strukturierten Kampfaktionen."
        : hpMax <= 0 || hpCurrent <= 0
        ? "Der Held hat keine einsetzbaren Trefferpunkte."
        : ""
    };
  }

  function createCombatantFromMonster(input, options) {
    const opts = options && typeof options === "object" ? options : {};
    const app = getApp();
    const source = resolveMonsterSource(input);
    if (!source) {
      throw new Error("Monster nicht gefunden.");
    }

    const combat =
      source.combat && typeof source.combat === "object"
        ? typeof app.normalizeMonsterCombat === "function"
          ? app.normalizeMonsterCombat(source.combat, source)
          : deepClone(source.combat)
        : typeof app.normalizeMonsterCombat === "function"
        ? app.normalizeMonsterCombat(null, source)
        : { enabled: false, attacks: [], armorClass: null, hpMax: null, initiativeMod: 0 };

    const rawActions = Array.isArray(combat.actions)
      ? combat.actions
      : Array.isArray(combat.combatActions)
      ? combat.combatActions
      : Array.isArray(combat.attacks)
      ? combat.attacks
      : [];
    const actions =
      typeof app.normalizeCombatActions === "function"
        ? deepClone(app.normalizeCombatActions(rawActions))
        : deepClone(normalizeActions(rawActions));
    const attacks = actions.filter((action) => action.type === "attack");
    const usableActions = getUsableCombatActions(actions);
    const armorClass = combat.armorClass == null ? null : toFiniteNumber(combat.armorClass, 0);
    const hpMax = combat.hpMax == null ? null : Math.max(0, toFiniteNumber(combat.hpMax, 0));
    const enabled = combat.enabled === true;
    const attackReady = enabled && !!(attacks.length && armorClass != null && hpMax != null && hpMax > 0);
    const actionReady = enabled && !!(usableActions.length && armorClass != null && hpMax != null && hpMax > 0);
    const baseName = toText(source.title || source.name) || "Monster";
    const sourceArena = source.arena && typeof source.arena === "object" ? source.arena : {};
    const fallbackImage =
      Array.isArray(source.images) && source.images.length ? toText(source.images[0]) : "";
    const arenaSprite = toText(sourceArena.sprite || fallbackImage);
    const arenaBackgrounds = Array.isArray(sourceArena.backgrounds)
      ? sourceArena.backgrounds.map((value) => toText(value)).filter(Boolean)
      : [];
    const copyLabel = toText(opts.copyLabel);
    const instanceId =
      toText(opts.instanceId) ||
      buildToken("monster", source.id, source.title || source.name) + (copyLabel ? "-" + copyLabel.toLowerCase() : "");

    return {
      id: instanceId,
      side: normalizeSide(opts.side || "monsters"),
      sourceId: toText(source.id) || toText(source.title),
      name: toText(opts.name) || (copyLabel ? baseName + " " + copyLabel : baseName),
      armorClass,
      hpCurrent: hpMax == null ? 0 : hpMax,
      hpMax: hpMax == null ? 0 : hpMax,
      initiativeMod: toFiniteNumber(combat.initiativeMod, 0),
      abilities: deepClone(combat.abilities || {}),
      saves: deepClone(combat.saves || {}),
      resources: normalizeResourcePools(combat.resources || source.resources),
      actions,
      combatActions: actions,
      attacks,
      conditions: normalizeConditions(
        Array.isArray(opts.conditions) || opts.conditions
          ? opts.conditions
          : combat.conditions || source.conditions || source.statusConditions
      ),
      turnState: {},
      defaultActionId: chooseDefaultCombatActionId(actions, combat.defaultActionId),
      notes: toText(combat.notes || source.notes),
      meta: {
        type: toText(source.type),
        size: toText(source.size),
        cr: toText(source.cr),
        title: toText(source.title),
        image: fallbackImage,
        arena: {
          sprite: arenaSprite,
          backgrounds: arenaBackgrounds
        }
      },
      combatEnabled: enabled,
      ready: actionReady,
      attackReady,
      actionReady,
      v2Ready: actionReady,
      disabledReason: !enabled
        ? "Das Kampfprofil dieses Wesens ist noch nicht aktiviert."
        : !usableActions.length
        ? "Dieses Wesen hat keine strukturierten Kampfaktionen."
        : armorClass == null || hpMax == null || hpMax <= 0
        ? "Dem Wesen fehlen vollständige Kampfdaten."
        : ""
    };
  }

  function getCombatantById(battle, combatantId) {
    const sid = toText(combatantId);
    return Array.isArray(battle && battle.combatants)
      ? battle.combatants.find((combatant) => combatant && combatant.id === sid) || null
      : null;
  }

  function getLivingCombatants(battle, side) {
    const normalizedSide = side ? normalizeSide(side) : "";
    return Array.isArray(battle && battle.combatants)
      ? battle.combatants.filter(
          (combatant) =>
            combatant &&
            isAlive(combatant) &&
            (!normalizedSide || normalizeSide(combatant.side) === normalizedSide)
        )
      : [];
  }

  function getDefaultTarget(battle, actorId, targetId) {
    const sid = toText(actorId);
    const actor = getCombatantById(battle, sid);
    if (!actor) return null;

    const preferred = normalizeTargetIds(targetId)[0] || toText(targetId);
    const enemySide = getOpposingSide(actor.side);
    const enemies = getLivingCombatants(battle, enemySide);
    if (preferred) {
      const target = enemies.find((combatant) => combatant.id === preferred);
      if (target) return target;
    }
    return enemies[0] || null;
  }

  function getOpponent(battle, actorId) {
    return getDefaultTarget(battle, actorId);
  }

  function normalizeTargetIds(raw) {
    if (Array.isArray(raw)) return raw.map((id) => toText(id)).filter(Boolean);
    const text = toText(raw);
    if (!text) return [];
    return text
      .split(",")
      .map((id) => toText(id))
      .filter(Boolean);
  }

  function getAllowedTargetsForAction(battle, actor, action) {
    if (!battle || !actor || !Array.isArray(battle.combatants)) return [];
    const target = action && action.target && typeof action.target === "object" ? action.target : {};
    const side = toText(target.side) || "enemies";
    const actorSide = normalizeSide(actor.side);
    const enemySide = getOpposingSide(actorSide);

    return battle.combatants.filter((combatant) => {
      if (!combatant || !isAlive(combatant)) return false;
      const combatantSide = normalizeSide(combatant.side);
      if (side === "self") return combatant.id === actor.id;
      if (side === "allies") return combatantSide === actorSide;
      if (side === "any") return combatant.id !== actor.id;
      return combatantSide === enemySide;
    });
  }

  function getTargetsForAction(battle, actor, action, targetIds) {
    const allowed = getAllowedTargetsForAction(battle, actor, action);
    const requested = normalizeTargetIds(targetIds);
    const target = action && action.target && typeof action.target === "object" ? action.target : {};
    const mode = toText(target.mode) || "single";
    const maxTargets = target.maxTargets == null ? null : Math.max(1, Math.floor(toFiniteNumber(target.maxTargets, 1)));

    let selected = requested.length
      ? requested.map((id) => allowed.find((combatant) => combatant.id === id)).filter(Boolean)
      : [];

    if (!selected.length) {
      selected = mode === "area" || mode === "all" || mode === "multiple" ? allowed.slice() : allowed.slice(0, 1);
    }

    if (mode === "single") selected = selected.slice(0, 1);
    if (maxTargets != null) selected = selected.slice(0, maxTargets);

    return selected;
  }

  function pickRandomItem(list) {
    const items = Array.isArray(list) ? list.filter(Boolean) : [];
    if (!items.length) return null;
    return items[Math.floor(Math.random() * items.length)] || null;
  }

  function pickLowestHpTarget(targets) {
    const items = Array.isArray(targets) ? targets.filter(Boolean) : [];
    if (!items.length) return null;
    const minHp = Math.min(...items.map((target) => toFiniteNumber(target.hpCurrent, 0)));
    const lowest = items.filter((target) => toFiniteNumber(target.hpCurrent, 0) === minHp);
    return pickRandomItem(lowest) || items[0] || null;
  }

  function chooseMonsterTargetsForAction(battle, actor, action) {
    const allowed = getAllowedTargetsForAction(battle, actor, action);
    if (!allowed.length) return [];
    const target = action && action.target && typeof action.target === "object" ? action.target : {};
    const mode = toText(target.mode) || "single";
    const targetSide = toText(target.side) || "enemies";
    const maxTargets = target.maxTargets == null ? null : Math.max(1, Math.floor(toFiniteNumber(target.maxTargets, 1)));

    if (mode === "area" || mode === "all") {
      return maxTargets != null ? allowed.slice(0, maxTargets) : allowed.slice();
    }

    if (mode === "multiple") {
      const sorted = allowed
        .slice()
        .sort((left, right) => toFiniteNumber(left.hpCurrent, 0) - toFiniteNumber(right.hpCurrent, 0));
      return maxTargets != null ? sorted.slice(0, maxTargets) : sorted;
    }

    let preferred = null;
    if (targetSide === "enemies" || targetSide === "any") {
      const heroes = allowed.filter((combatant) => normalizeSide(combatant.side) === "heroes");
      preferred = pickLowestHpTarget(heroes.length ? heroes : allowed);
    } else if (targetSide === "allies") {
      preferred = pickLowestHpTarget(allowed);
    } else if (targetSide === "self") {
      preferred = allowed.find((combatant) => combatant.id === actor.id) || actor;
    }

    return preferred ? [preferred] : [allowed[0]];
  }

  function getAttackRangeMode(action) {
    const attack = action && typeof action === "object" ? action : {};
    const explicit = normalizeToken(attack.rangeType || attack.attackRange || attack.rangeMode);
    if (explicit === "ranged" || explicit === "fernkampf") return "ranged";
    if (explicit === "melee" || explicit === "nahkampf") return "melee";

    const target = attack.target && typeof attack.target === "object" ? attack.target : {};
    const haystack = normalizeToken(
      [
        attack.name,
        attack.notes,
        target.mode,
        target.range,
        target.shape,
        target.notes
      ]
        .filter(Boolean)
        .join(" ")
    );
    if (
      /\b(fernkampf|ranged|bogen|armbrust|wurf|schuss|strahl|spucken|blitz|linie|kegel|fontane|fontaene)\b/.test(
        haystack
      )
    ) {
      return "ranged";
    }
    return "melee";
  }

  function buildAttackRollContext(actor, target, action) {
    const advantageReasons = [];
    const disadvantageReasons = [];
    const rangeMode = getAttackRangeMode(action);

    if (hasCondition(actor, "poisoned")) {
      disadvantageReasons.push("Vergiftet");
    }
    if (hasCondition(actor, "restrained")) {
      disadvantageReasons.push("Festgesetzt");
    }
    if (hasCondition(actor, "frightened")) {
      disadvantageReasons.push("Verängstigt");
    }

    if (hasCondition(target, "restrained")) {
      advantageReasons.push("Ziel festgesetzt");
    }
    if (hasCondition(target, "prone")) {
      if (rangeMode === "melee") {
        advantageReasons.push("Ziel liegend im Nahkampf");
      } else {
        disadvantageReasons.push("Ziel liegend im Fernkampf");
      }
    }

    return {
      rangeMode,
      advantage: advantageReasons.length > 0,
      disadvantage: disadvantageReasons.length > 0,
      advantageReasons,
      disadvantageReasons,
      reason: advantageReasons.concat(disadvantageReasons).join("; ")
    };
  }

  function buildSaveRollContext(combatant, ability) {
    const abilityKey = normalizeToken(ability);
    const disadvantageReasons = [];
    if (abilityKey === "dex" && hasCondition(combatant, "restrained")) {
      disadvantageReasons.push("Festgesetzt");
    }
    return {
      advantage: false,
      disadvantage: disadvantageReasons.length > 0,
      advantageReasons: [],
      disadvantageReasons,
      reason: disadvantageReasons.join("; ")
    };
  }

  function rollSavingThrow(combatant, ability, modifier, options) {
    const opts = options && typeof options === "object" ? options : {};
    const conditionContext = buildSaveRollContext(combatant, ability);
    const advantage = opts.advantage === true || conditionContext.advantage;
    const disadvantage = opts.disadvantage === true || conditionContext.disadvantage;
    return rollD20(modifier, {
      advantage,
      disadvantage,
      reason: [toText(opts.reason), conditionContext.reason].filter(Boolean).join("; ")
    });
  }

  function calculateAbilityModifier(score) {
    const numeric = toFiniteNumber(score, 10);
    return Math.floor((numeric - 10) / 2);
  }

  function getSavingThrowModifier(combatant, ability) {
    const key = normalizeToken(ability);
    const saves = combatant && combatant.saves && typeof combatant.saves === "object" ? combatant.saves : {};
    const saveEntry = saves[key] && typeof saves[key] === "object" ? saves[key] : null;
    if (saveEntry && saveEntry.bonus != null) {
      return toFiniteNumber(saveEntry.bonus, 0);
    }
    const abilities = combatant && combatant.abilities && typeof combatant.abilities === "object" ? combatant.abilities : {};
    return calculateAbilityModifier(abilities[key]);
  }

  function shouldApplySaveEffect(effect, succeeded) {
    const trigger = normalizeToken(effect && (effect.applyOn || effect.when || effect.trigger)) || "failure";
    if (trigger === "always" || trigger === "hit" || trigger === "both") return true;
    if (trigger === "success" || trigger === "succeeded" || trigger === "on-success") return !!succeeded;
    return !succeeded;
  }

  function applyConditionEffect(battle, actor, target, effect, action) {
    const condition = normalizeCondition({
      id: effect && (effect.condition || effect.conditionId || effect.status || effect.id || effect.name),
      source: action && action.name,
      duration: effect && effect.duration,
      notes: effect && effect.notes
    });
    if (!condition) return null;

    setCombatantCondition(battle, target.id, condition.id, true, {
      source: condition.source,
      duration: condition.duration,
      notes: condition.notes
    });
    return normalizeCondition({
      id: condition.id,
      label: condition.label,
      source: condition.source,
      duration: condition.duration,
      notes: condition.notes
    });
  }

  function applySaveActionEffects(battle, actor, target, action, succeeded) {
    return (Array.isArray(action && action.effects) ? action.effects : [])
      .filter((effect) => effect && shouldApplySaveEffect(effect, succeeded))
      .map((effect) => {
        const type = normalizeToken(effect.type || effect.kind) || "condition";
        if (type !== "condition" && type !== "status") return null;
        return applyConditionEffect(battle, actor, target, effect, action);
      })
      .filter(Boolean);
  }

  function processEndTurnConditions(battle, actor) {
    if (!battle || !actor || !Array.isArray(actor.conditions) || !actor.conditions.length) return [];
    actor.conditions = normalizeConditions(actor.conditions);
    const resolved = [];

    actor.conditions.slice().forEach((condition) => {
      if (!condition || !condition.duration || typeof condition.duration !== "object") return;
      const duration = condition.duration;
      if (duration.type === "saveEndTurn" && duration.auto !== false) {
        const ability = normalizeToken(duration.ability) || "con";
        const dc = Math.max(0, toFiniteNumber(duration.dc, 10));
        const saveRoll = rollSavingThrow(actor, ability, getSavingThrowModifier(actor, ability), {
          reason: "Zugende: " + (condition.label || condition.id)
        });
        const success = saveRoll.total >= dc;
        appendLog(battle, "condition-save", {
          actorId: actor.id,
          conditionId: condition.id,
          save: { ability, dc, roll: saveRoll, success },
          text:
            actor.name +
            " würfelt am Zugende gegen " +
            (condition.label || condition.id) +
            ": " +
            saveRoll.total +
            " gegen SG " +
            dc +
            (success ? " (beendet)." : " (bleibt aktiv).")
        });
        if (success) {
          setCombatantCondition(battle, actor.id, condition.id, false);
          resolved.push(condition.id);
        }
        return;
      }

      if (duration.type === "rounds") {
        duration.remaining = Math.max(0, Math.floor(toFiniteNumber(duration.remaining, 1)) - 1);
        if (duration.remaining <= 0) {
          setCombatantCondition(battle, actor.id, condition.id, false);
          resolved.push(condition.id);
        }
      }
    });

    return resolved;
  }

  function formatRollModeText(roll, context) {
    const ctx = context && typeof context === "object" ? context : {};
    const advantageReasons = Array.isArray(ctx.advantageReasons) ? ctx.advantageReasons : [];
    const disadvantageReasons = Array.isArray(ctx.disadvantageReasons) ? ctx.disadvantageReasons : [];
    if (roll && roll.canceledAdvantage) {
      return (
        "Vorteil und Nachteil heben sich auf (" +
        advantageReasons.concat(disadvantageReasons).join("; ") +
        ")."
      );
    }
    if (roll && roll.advantage) {
      return "Vorteil durch " + advantageReasons.join(", ") + ".";
    }
    if (roll && roll.disadvantage) {
      return "Nachteil durch " + disadvantageReasons.join(", ") + ".";
    }
    return "";
  }

  function hasLivingSide(battle, side) {
    return getLivingCombatants(battle, side).length > 0;
  }

  function getWinnerSide(battle) {
    const heroesAlive = hasLivingSide(battle, "heroes");
    const monstersAlive = hasLivingSide(battle, "monsters");
    if (heroesAlive && !monstersAlive) return "heroes";
    if (monstersAlive && !heroesAlive) return "monsters";
    return "";
  }

  function appendLog(battle, type, payload) {
    battle._logCounter = toFiniteNumber(battle._logCounter, 0) + 1;
    const entry = {
      id: "log-" + battle._logCounter,
      round: battle.round,
      type,
      text: "",
      ...(payload && typeof payload === "object" ? payload : {})
    };
    battle.log.push(entry);
    return entry;
  }

  function sortOrderByInitiative(combatants) {
    return combatants
      .slice()
      .sort((left, right) => {
        const leftRoll = left && left.initiative ? left.initiative : { total: 0, modifier: 0 };
        const rightRoll = right && right.initiative ? right.initiative : { total: 0, modifier: 0 };
        if (rightRoll.total !== leftRoll.total) return rightRoll.total - leftRoll.total;
        if (rightRoll.modifier !== leftRoll.modifier) return rightRoll.modifier - leftRoll.modifier;
        if (normalizeSide(left.side) !== normalizeSide(right.side)) {
          return normalizeSide(left.side) === "heroes" ? -1 : 1;
        }
        return (left.name || "").localeCompare(right.name || "", "de", { sensitivity: "base" });
      })
      .map((combatant) => combatant.id);
  }

  function getActiveCombatant(battle) {
    return getCombatantById(battle, battle && battle.activeCombatantId);
  }

  function advanceTurn(battle) {
    if (!battle || !Array.isArray(battle.order) || !battle.order.length) return null;
    const currentIndex = Math.max(0, toFiniteNumber(battle.turnIndex, 0));
    for (let offset = 1; offset <= battle.order.length; offset += 1) {
      const nextIndex = (currentIndex + offset) % battle.order.length;
      const nextId = battle.order[nextIndex] || null;
      const nextCombatant = getCombatantById(battle, nextId);
      if (!isAlive(nextCombatant)) continue;

      battle.turnIndex = nextIndex;
      if (nextIndex <= currentIndex) {
        battle.round += 1;
      }
      battle.activeCombatantId = nextId;
      nextCombatant.turnState = {};
      return nextCombatant;
    }

    battle.activeCombatantId = null;
    return null;
  }

  function finishBattle(battle, winnerId, loserId, resultText) {
    battle.status = "finished";
    battle.winnerId = toText(winnerId) || null;
    battle.loserId = toText(loserId) || null;
    battle.winnerSide = battle.winnerId
      ? normalizeSide((getCombatantById(battle, battle.winnerId) || {}).side)
      : getWinnerSide(battle) || null;
    battle.activeCombatantId = null;
    battle.lastResult = toText(resultText);
    appendLog(battle, "result", {
      actorId: battle.winnerId,
      targetId: battle.loserId,
      text: battle.lastResult
    });
    return battle;
  }

  function normalizeHeroInputs(opts) {
    const direct = Array.isArray(opts.heroes) ? opts.heroes : [];
    const ids = Array.isArray(opts.heroIds)
      ? opts.heroIds
      : opts.heroId != null || opts.hero != null
      ? [opts.hero != null ? opts.hero : opts.heroId]
      : [];
    return direct.length ? direct : ids;
  }

  function normalizeMonsterGroups(opts) {
    if (Array.isArray(opts.monsterGroups)) {
      return opts.monsterGroups
        .map((group) => {
          if (typeof group === "string") {
            return { monster: group, count: 1 };
          }
          const obj = group && typeof group === "object" ? group : {};
          return {
            monster:
              obj.monster != null
                ? obj.monster
                : obj.monsterId != null
                ? obj.monsterId
                : obj.id != null
                ? obj.id
                : "",
            count: Math.max(1, Math.min(12, Math.floor(toFiniteNumber(obj.count || obj.quantity || 1, 1))))
          };
        })
        .filter((group) => group.monster);
    }

    const direct = Array.isArray(opts.monsters) ? opts.monsters : [];
    const ids = Array.isArray(opts.monsterIds)
      ? opts.monsterIds
      : opts.monsterId != null || opts.monster != null
      ? [opts.monster != null ? opts.monster : opts.monsterId]
      : [];
    const source = direct.length ? direct : ids;
    const count = Math.max(1, Math.min(12, Math.floor(toFiniteNumber(opts.monsterCount || opts.count || 1, 1))));
    return source.map((monster, index) => ({ monster, count: index === 0 ? count : 1 })).filter((group) => group.monster);
  }

  function makeMonsterCombatants(groups) {
    const normalizedGroups = Array.isArray(groups) ? groups : [];
    const totalCount = normalizedGroups.reduce((sum, group) => sum + Math.max(1, toFiniteNumber(group.count, 1)), 0);
    const combatants = [];

    normalizedGroups.forEach((group) => {
      const count = Math.max(1, Math.floor(toFiniteNumber(group.count, 1)));
      for (let index = 0; index < count; index += 1) {
        const copyLabel = totalCount > 1 ? indexToLetter(combatants.length) : "";
        combatants.push(createCombatantFromMonster(group.monster, { copyLabel, side: "monsters" }));
      }
    });

    return combatants;
  }

  function startBattle(options) {
    const opts = options && typeof options === "object" ? options : {};
    const hero = createCombatantFromHero(opts.hero != null ? opts.hero : opts.heroId);
    const monster = createCombatantFromMonster(opts.monster != null ? opts.monster : opts.monsterId);

    if (!hero.ready) {
      throw new Error(hero.disabledReason || "Der Held ist nicht kampfbereit.");
    }
    if (!monster.ready) {
      throw new Error(monster.disabledReason || "Das Monster ist nicht kampfbereit.");
    }

    hero.initiative = rollD20(hero.initiativeMod);
    monster.initiative = rollD20(monster.initiativeMod);

    const combatants = [hero, monster];
    const order = sortOrderByInitiative(combatants);
    const activeCombatantId = order[0] || null;
    const battle = {
      id: "battle-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8),
      status: "active",
      round: 1,
      turnIndex: 0,
      activeCombatantId,
      order,
      combatants,
      setup: {
        heroId: hero.sourceId,
        monsterId: monster.sourceId
      },
      winnerId: null,
      loserId: null,
      lastResult: "",
      log: [],
      _logCounter: 0
    };

    appendLog(battle, "system", {
      round: 0,
      text: hero.name + " tritt in der Kampfprobe gegen " + monster.name + " an."
    });
    appendLog(battle, "initiative", {
      round: 0,
      actorId: hero.id,
      text:
        hero.name +
        " würfelt Initiative: " +
        hero.initiative.natural +
        (hero.initiative.modifier >= 0 ? " + " : " - ") +
        Math.abs(hero.initiative.modifier) +
        " = " +
        hero.initiative.total,
      roll: deepClone(hero.initiative)
    });
    appendLog(battle, "initiative", {
      round: 0,
      actorId: monster.id,
      text:
        monster.name +
        " würfelt Initiative: " +
        monster.initiative.natural +
        (monster.initiative.modifier >= 0 ? " + " : " - ") +
        Math.abs(monster.initiative.modifier) +
        " = " +
        monster.initiative.total,
      roll: deepClone(monster.initiative)
    });

    const active = getActiveCombatant(battle);
    if (active) {
      appendLog(battle, "turn", {
        text: "Runde 1 beginnt. " + active.name + " ist zuerst am Zug."
      });
    }

    return battle;
  }

  function resolveAttack(battle, actorId, attackId, targetId) {
    if (!battle || typeof battle !== "object") {
      throw new Error("Kein Kampf vorhanden.");
    }
    if (battle.status !== "active") {
      throw new Error("Der Kampf ist bereits beendet.");
    }

    const actor = getCombatantById(battle, actorId || battle.activeCombatantId);
    if (!actor) {
      throw new Error("Aktiver Kämpfer nicht gefunden.");
    }
    if (toText(actor.id) !== toText(battle.activeCombatantId)) {
      throw new Error("Dieser Kämpfer ist nicht am Zug.");
    }

    const target = getDefaultTarget(battle, actor.id, targetId);
    if (!target) {
      throw new Error("Kein Ziel für den Angriff gefunden.");
    }

    const chosenActionId = toText(attackId) || toText(actor.defaultActionId);
    const action =
      (Array.isArray(actor.actions)
        ? actor.actions.find((item) => item && toText(item.id) === chosenActionId)
        : null) ||
      (Array.isArray(actor.combatActions)
        ? actor.combatActions.find((item) => item && toText(item.id) === chosenActionId)
        : null) ||
      (Array.isArray(actor.attacks)
        ? actor.attacks.find((item) => item && toText(item.id) === chosenActionId)
        : null) ||
      getUsableCombatActions(actor.actions || actor.combatActions || actor.attacks)[0] ||
      null;

    if (!action) {
      throw new Error(actor.name + " hat keine nutzbare Kampfaktion.");
    }
    if (toText(action.type) === "heal") {
      return resolveHealActionV2(battle, actor, action, targetId);
    }
    if (toText(action.type) === "save") {
      return resolveSaveActionV2(battle, actor, action, targetId);
    }

    const attack = action;

    const resourceSpent = spendActionResource(battle, actor, attack);
    const rollContext = buildAttackRollContext(actor, target, attack);
    const attackRoll = rollD20(attack.attackBonus, {
      advantage: rollContext.advantage,
      disadvantage: rollContext.disadvantage,
      reason: rollContext.reason
    });
    const hit = attackRoll.isCritical
      ? true
      : attackRoll.isFumble
      ? false
      : attackRoll.total >= toFiniteNumber(target.armorClass, 0);

    const damageParts = [];
    let totalDamage = 0;

    if (hit) {
      (Array.isArray(attack.damage) ? attack.damage : []).forEach((part) => {
        const roll = rollDiceFormula(part.formula, { critical: attackRoll.isCritical });
        const bonus = part.bonus == null ? 0 : toFiniteNumber(part.bonus, 0);
        const total = roll.total + bonus;
        totalDamage += total;
        damageParts.push({
          id: toText(part.id),
          formula: toText(part.formula),
          type: toText(part.type) || "Unbekannt",
          bonus,
          notes: toText(part.notes),
          roll,
          total
        });
      });
      target.hpCurrent = Math.max(0, toFiniteNumber(target.hpCurrent, 0) - totalDamage);
    }

    let text = "";
    const rollModeText = formatRollModeText(attackRoll, rollContext);
    if (attackRoll.isFumble) {
      text = actor.name + " verfehlt " + target.name + " mit " + attack.name + " (natürliche 1).";
    } else if (!hit) {
      text =
        actor.name +
        " verfehlt " +
        target.name +
        " mit " +
        attack.name +
        " (" +
        attackRoll.total +
        " gegen RK " +
        target.armorClass +
        ").";
    } else if (attackRoll.isCritical) {
      text =
        actor.name +
        " landet mit " +
        attack.name +
        " einen kritischen Treffer gegen " +
        target.name +
        " und verursacht " +
        totalDamage +
        " Schaden.";
    } else {
      text =
        actor.name +
        " trifft " +
        target.name +
        " mit " +
        attack.name +
        " (" +
        attackRoll.total +
        " gegen RK " +
        target.armorClass +
        ") und verursacht " +
        totalDamage +
        " Schaden.";
    }
    if (rollModeText) {
      text += " " + rollModeText;
    }

    const entry = appendLog(battle, "attack", {
      actorId: actor.id,
      targetId: target.id,
      actionId: toText(attack.id),
      actionName: toText(attack.name),
      attack: {
        natural: attackRoll.natural,
        rolls: attackRoll.rolls,
        modifier: attackRoll.modifier,
        total: attackRoll.total,
        mode: attackRoll.mode,
        advantage: attackRoll.advantage,
        disadvantage: attackRoll.disadvantage,
        canceledAdvantage: attackRoll.canceledAdvantage,
        reason: attackRoll.reason,
        advantageReasons: rollContext.advantageReasons,
        disadvantageReasons: rollContext.disadvantageReasons,
        rangeMode: rollContext.rangeMode,
        critical: attackRoll.isCritical,
        fumble: attackRoll.isFumble,
        hit,
        targetArmorClass: target.armorClass
      },
      damage: {
        parts: damageParts,
        total: totalDamage
      },
      resource: resourceSpent,
      hpAfter: {
        actor: actor.hpCurrent,
        target: target.hpCurrent
      },
      text
    });

    battle.lastResult = entry.text;

    if (hit && target.hpCurrent <= 0) {
      return finishBattle(
        battle,
        actor.id,
        target.id,
        target.name + " ist besiegt. " + actor.name + " gewinnt die Kampfprobe."
      );
    }

    const next = advanceTurn(battle);
    if (next) {
      appendLog(battle, "turn", {
        text: "Nächster Zug: " + next.name + "."
      });
    }

    return battle;
  }

  function performMonsterTurn(battle) {
    if (!battle || typeof battle !== "object") {
      throw new Error("Kein Kampf vorhanden.");
    }
    const actor = getActiveCombatant(battle);
    if (!actor) {
      throw new Error("Kein aktiver Kämpfer vorhanden.");
    }
    if (actor.side !== "monster") {
      throw new Error("Der aktuelle Zug gehört nicht dem Monster.");
    }
    const attackId = chooseDefaultActionId(actor.attacks, actor.defaultActionId);
    return resolveAttack(battle, actor.id, attackId);
  }

  function restartBattle(source) {
    const battle = source && typeof source === "object" ? source : {};
    const setup = battle.setup && typeof battle.setup === "object" ? battle.setup : battle;
    const heroId = toText(setup.heroId || setup.selectedHeroId || setup.hero);
    const monsterId = toText(setup.monsterId || setup.selectedMonsterId || setup.monster);
    return startBattle({ heroId, monsterId });
  }

  function startBattleV2(options) {
    const opts = options && typeof options === "object" ? options : {};
    const heroInputs = normalizeHeroInputs(opts);
    const monsterGroups = normalizeMonsterGroups(opts);
    const heroes = heroInputs.map((hero) => createCombatantFromHero(hero, { side: "heroes" }));
    const monsters = makeMonsterCombatants(monsterGroups);
    const combatants = heroes.concat(monsters);

    if (!heroes.length) {
      throw new Error("Wähle mindestens einen Helden aus.");
    }
    if (!monsters.length) {
      throw new Error("Wähle mindestens ein Monster aus.");
    }

    const blockedHero = heroes.find((hero) => !hero.ready);
    if (blockedHero) {
      throw new Error(blockedHero.disabledReason || blockedHero.name + " ist nicht kampfbereit.");
    }
    const blockedMonster = monsters.find((monster) => !monster.ready);
    if (blockedMonster) {
      throw new Error(blockedMonster.disabledReason || blockedMonster.name + " ist nicht kampfbereit.");
    }

    combatants.forEach((combatant) => {
      combatant.initiative = rollD20(combatant.initiativeMod);
    });

    const order = sortOrderByInitiative(combatants);
    const activeCombatantId = order[0] || null;
    const battle = {
      id: "battle-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8),
      status: "active",
      round: 1,
      turnIndex: 0,
      activeCombatantId,
      order,
      combatants,
      sides: ["heroes", "monsters"],
      setup: {
        heroId: heroes[0] ? heroes[0].sourceId : "",
        monsterId: monsters[0] ? monsters[0].sourceId : "",
        heroIds: heroes.map((hero) => hero.sourceId),
        monsterGroups: monsterGroups.map((group) => ({
          monsterId: toText(group.monster && typeof group.monster === "object" ? group.monster.id : group.monster),
          count: Math.max(1, Math.floor(toFiniteNumber(group.count, 1)))
        }))
      },
      winnerId: null,
      loserId: null,
      winnerSide: null,
      lastResult: "",
      log: [],
      _logCounter: 0
    };

    appendLog(battle, "system", {
      round: 0,
      text:
        heroes.map((hero) => hero.name).join(", ") +
        " treten in der Kampfprobe gegen " +
        monsters.map((monster) => monster.name).join(", ") +
        " an."
    });

    order.forEach((combatantId) => {
      const combatant = getCombatantById(battle, combatantId);
      if (!combatant) return;
      appendLog(battle, "initiative", {
        round: 0,
        actorId: combatant.id,
        text:
          combatant.name +
          " würfelt Initiative: " +
          combatant.initiative.natural +
          (combatant.initiative.modifier >= 0 ? " + " : " - ") +
          Math.abs(combatant.initiative.modifier) +
          " = " +
          combatant.initiative.total,
        roll: deepClone(combatant.initiative)
      });
    });

    const active = getActiveCombatant(battle);
    if (active) {
      appendLog(battle, "turn", {
        text: "Runde 1 beginnt. " + active.name + " ist zuerst am Zug."
      });
    }

    return battle;
  }

  function concludeTurnV2(battle, actor, primaryTargetId) {
    const immediateWinner = getWinnerSide(battle);
    if (immediateWinner) {
      const winners = getLivingCombatants(battle, immediateWinner);
      const winnerName = immediateWinner === "heroes" ? "Die Helden" : "Die Monster";
      return finishBattle(
        battle,
        winners[0] ? winners[0].id : actor.id,
        toText(primaryTargetId),
        winnerName + " gewinnen die Kampfprobe."
      );
    }

    processEndTurnConditions(battle, actor);

    const winnerAfterEndTurn = getWinnerSide(battle);
    if (winnerAfterEndTurn) {
      const winners = getLivingCombatants(battle, winnerAfterEndTurn);
      const winnerName = winnerAfterEndTurn === "heroes" ? "Die Helden" : "Die Monster";
      return finishBattle(
        battle,
        winners[0] ? winners[0].id : actor.id,
        toText(primaryTargetId),
        winnerName + " gewinnen die Kampfprobe."
      );
    }

    const next = advanceTurn(battle);
    if (next) {
      appendLog(battle, "turn", {
        text: "Nächster Zug: " + next.name + "."
      });
    }
    return battle;
  }

  function resolveHealActionV2(battle, actor, action, targetIds) {
    const targets = getTargetsForAction(battle, actor, action, targetIds);
    if (!targets.length) {
      throw new Error("Keine gültigen Ziele für " + action.name + " gefunden.");
    }

    const resourceSpent = spendActionResource(battle, actor, action);
    const results = [];
    let totalHealingAll = 0;

    targets.forEach((target) => {
      const healingParts = [];
      let totalHealing = 0;

      (Array.isArray(action.healing) ? action.healing : []).forEach((part) => {
        const roll = rollDiceFormula(part.formula);
        const bonus = part.bonus == null ? 0 : toFiniteNumber(part.bonus, 0);
        const total = roll.total + bonus;
        totalHealing += total;
        healingParts.push({
          id: toText(part.id),
          formula: toText(part.formula),
          type: toText(part.type) || "Heilung",
          bonus,
          roll,
          total
        });
      });

      const hpBefore = toFiniteNumber(target.hpCurrent, 0);
      const hpMax = Math.max(0, toFiniteNumber(target.hpMax, 0));
      target.hpCurrent = Math.max(0, Math.min(hpMax || hpBefore + totalHealing, hpBefore + totalHealing));
      const effectiveHealing = Math.max(0, target.hpCurrent - hpBefore);
      totalHealingAll += effectiveHealing;
      results.push({
        targetId: target.id,
        targetName: target.name,
        hpBefore,
        hpAfter: target.hpCurrent,
        hpMax,
        totalHealing,
        effectiveHealing,
        parts: healingParts
      });
    });

    const text =
      actor.name +
      " nutzt " +
      action.name +
      ": " +
      results
        .map(
          (item) =>
            item.targetName +
            " +" +
            item.effectiveHealing +
            " LP (" +
            item.hpAfter +
            "/" +
            item.hpMax +
            ")"
        )
        .join("; ") +
      ".";

    const entry = appendLog(battle, "heal", {
      actorId: actor.id,
      targetIds: results.map((item) => item.targetId),
      actionId: toText(action.id),
      actionName: toText(action.name),
      heal: {
        total: totalHealingAll,
        results
      },
      resource: resourceSpent,
      text
    });

    battle.lastResult = entry.text;
    return concludeTurnV2(battle, actor, results.length ? results[0].targetId : "");
  }

  function resolveSaveActionV2(battle, actor, action, targetIds) {
    const save = action && action.save && typeof action.save === "object" ? action.save : null;
    if (!save || !save.ability || save.dc == null) {
      throw new Error(action.name + " hat keine vollständigen Rettungswurf-Daten.");
    }

    const targets = getTargetsForAction(battle, actor, action, targetIds);
    if (!targets.length) {
      throw new Error("Keine gültigen Ziele für " + action.name + " gefunden.");
    }

    const resourceSpent = spendActionResource(battle, actor, action);
    const ability = toText(save.ability).toLowerCase();
    const dc = toFiniteNumber(save.dc, 0);
    const successMode = toText(save.success) || "half";
    const results = [];
    let totalDamageAll = 0;

    targets.forEach((target) => {
      const saveRoll = rollSavingThrow(target, ability, getSavingThrowModifier(target, ability), {
        reason: action.name
      });
      const succeeded = saveRoll.total >= dc;
      const damageParts = [];
      let targetDamage = 0;

      (Array.isArray(action.damage) ? action.damage : []).forEach((part) => {
        const roll = rollDiceFormula(part.formula);
        const bonus = part.bonus == null ? 0 : toFiniteNumber(part.bonus, 0);
        const fullTotal = roll.total + bonus;
        const total = succeeded
          ? successMode === "half"
            ? Math.floor(fullTotal / 2)
            : successMode === "custom"
            ? fullTotal
            : 0
          : fullTotal;
        targetDamage += total;
        damageParts.push({
          id: toText(part.id),
          formula: toText(part.formula),
          type: toText(part.type) || "Unbekannt",
          bonus,
          roll,
          fullTotal,
          total
        });
      });

      const appliedEffects = applySaveActionEffects(battle, actor, target, action, succeeded);
      target.hpCurrent = Math.max(0, toFiniteNumber(target.hpCurrent, 0) - targetDamage);
      totalDamageAll += targetDamage;
      results.push({
        targetId: target.id,
        targetName: target.name,
        ability,
        dc,
        roll: {
          natural: saveRoll.natural,
          rolls: saveRoll.rolls,
          modifier: saveRoll.modifier,
          total: saveRoll.total,
          mode: saveRoll.mode,
          advantage: saveRoll.advantage,
          disadvantage: saveRoll.disadvantage,
          canceledAdvantage: saveRoll.canceledAdvantage,
          reason: saveRoll.reason
        },
        success: succeeded,
        damage: {
          parts: damageParts,
          total: targetDamage
        },
        effects: appliedEffects.map((effect) => ({
          id: effect.id,
          label: effect.label,
          source: effect.source,
          duration: effect.duration,
          notes: effect.notes
        })),
        hpAfter: target.hpCurrent
      });
    });

    const targetSummary = results
      .map((result) => {
        return (
          result.targetName +
          " " +
          (result.success ? "besteht" : "scheitert") +
          " (" +
          result.roll.total +
          " gegen SG " +
          dc +
          ", " +
          result.damage.total +
          " Schaden" +
          (Array.isArray(result.effects) && result.effects.length
            ? ", " + result.effects.map((effect) => effect.label || effect.id).join(", ")
            : "") +
          ")"
        );
      })
      .join("; ");
    const text =
      actor.name +
      " setzt " +
      action.name +
      " ein. " +
      targetSummary +
      ".";

    const entry = appendLog(battle, "save", {
      actorId: actor.id,
      targetIds: results.map((result) => result.targetId),
      actionId: toText(action.id),
      actionName: toText(action.name),
      save: {
        ability,
        dc,
        successMode,
        results
      },
      damage: {
        total: totalDamageAll
      },
      resource: resourceSpent,
      text
    });

    battle.lastResult = entry.text;

    results
      .filter((result) => result.hpAfter <= 0)
      .forEach((result) => {
        appendLog(battle, "defeat", {
          actorId: actor.id,
          targetId: result.targetId,
          text: result.targetName + " ist besiegt."
        });
      });

    return concludeTurnV2(battle, actor, results.length ? results[0].targetId : "");
  }

  function resolveAttackV2(battle, actorId, attackId, targetId) {
    if (!battle || typeof battle !== "object") {
      throw new Error("Kein Kampf vorhanden.");
    }
    if (battle.status !== "active") {
      throw new Error("Der Kampf ist bereits beendet.");
    }

    const actor = getCombatantById(battle, actorId || battle.activeCombatantId);
    if (!actor) {
      throw new Error("Aktiver Kämpfer nicht gefunden.");
    }
    if (toText(actor.id) !== toText(battle.activeCombatantId)) {
      throw new Error("Dieser Kämpfer ist nicht am Zug.");
    }

    const chosenActionId = toText(attackId) || toText(actor.defaultActionId);
    const action =
      (Array.isArray(actor.actions)
        ? actor.actions.find((item) => item && toText(item.id) === chosenActionId)
        : null) ||
      (Array.isArray(actor.combatActions)
        ? actor.combatActions.find((item) => item && toText(item.id) === chosenActionId)
        : null) ||
      (Array.isArray(actor.attacks)
        ? actor.attacks.find((item) => item && toText(item.id) === chosenActionId)
        : null) ||
      getUsableCombatActions(actor.actions || actor.combatActions || actor.attacks)[0] ||
      null;

    if (!action) {
      throw new Error(actor.name + " hat keine nutzbare Kampfaktion.");
    }
    if (toText(action.type) === "save") {
      return resolveSaveActionV2(battle, actor, action, targetId);
    }

    const attack = action;
    const target = getDefaultTarget(battle, actor.id, targetId);
    if (!target) {
      throw new Error("Kein Ziel für den Angriff gefunden.");
    }

    const resourceSpent = spendActionResource(battle, actor, attack);
    const rollContext = buildAttackRollContext(actor, target, attack);
    const attackRoll = rollD20(attack.attackBonus, {
      advantage: rollContext.advantage,
      disadvantage: rollContext.disadvantage,
      reason: rollContext.reason
    });
    const hit = attackRoll.isCritical
      ? true
      : attackRoll.isFumble
      ? false
      : attackRoll.total >= toFiniteNumber(target.armorClass, 0);

    const damageParts = [];
    let totalDamage = 0;

    if (hit) {
      (Array.isArray(attack.damage) ? attack.damage : []).forEach((part) => {
        const roll = rollDiceFormula(part.formula, { critical: attackRoll.isCritical });
        const bonus = part.bonus == null ? 0 : toFiniteNumber(part.bonus, 0);
        const total = roll.total + bonus;
        totalDamage += total;
        damageParts.push({
          id: toText(part.id),
          formula: toText(part.formula),
          type: toText(part.type) || "Unbekannt",
          bonus,
          notes: toText(part.notes),
          roll,
          total
        });
      });
      target.hpCurrent = Math.max(0, toFiniteNumber(target.hpCurrent, 0) - totalDamage);
    }

    let text = "";
    const rollModeText = formatRollModeText(attackRoll, rollContext);
    if (attackRoll.isFumble) {
      text = actor.name + " verfehlt " + target.name + " mit " + attack.name + " (natürliche 1).";
    } else if (!hit) {
      text =
        actor.name +
        " verfehlt " +
        target.name +
        " mit " +
        attack.name +
        " (" +
        attackRoll.total +
        " gegen RK " +
        target.armorClass +
        ").";
    } else if (attackRoll.isCritical) {
      text =
        actor.name +
        " landet mit " +
        attack.name +
        " einen kritischen Treffer gegen " +
        target.name +
        " und verursacht " +
        totalDamage +
        " Schaden.";
    } else {
      text =
        actor.name +
        " trifft " +
        target.name +
        " mit " +
        attack.name +
        " (" +
        attackRoll.total +
        " gegen RK " +
        target.armorClass +
        ") und verursacht " +
        totalDamage +
        " Schaden.";
    }
    if (rollModeText) {
      text += " " + rollModeText;
    }

    const entry = appendLog(battle, "attack", {
      actorId: actor.id,
      targetId: target.id,
      actionId: toText(attack.id),
      actionName: toText(attack.name),
      attack: {
        natural: attackRoll.natural,
        rolls: attackRoll.rolls,
        modifier: attackRoll.modifier,
        total: attackRoll.total,
        mode: attackRoll.mode,
        advantage: attackRoll.advantage,
        disadvantage: attackRoll.disadvantage,
        canceledAdvantage: attackRoll.canceledAdvantage,
        reason: attackRoll.reason,
        advantageReasons: rollContext.advantageReasons,
        disadvantageReasons: rollContext.disadvantageReasons,
        rangeMode: rollContext.rangeMode,
        critical: attackRoll.isCritical,
        fumble: attackRoll.isFumble,
        hit,
        targetArmorClass: target.armorClass
      },
      damage: {
        parts: damageParts,
        total: totalDamage
      },
      resource: resourceSpent,
      hpAfter: {
        actor: actor.hpCurrent,
        target: target.hpCurrent
      },
      text
    });

    battle.lastResult = entry.text;

    if (hit && target.hpCurrent <= 0) {
      appendLog(battle, "defeat", {
        actorId: actor.id,
        targetId: target.id,
        text: target.name + " ist besiegt."
      });
    }

    return concludeTurnV2(battle, actor, target.id);
  }

  function performMonsterTurnV2(battle) {
    if (!battle || typeof battle !== "object") {
      throw new Error("Kein Kampf vorhanden.");
    }
    const actor = getActiveCombatant(battle);
    if (!actor) {
      throw new Error("Kein aktiver Kämpfer vorhanden.");
    }
    if (normalizeSide(actor.side) !== "monsters") {
      throw new Error("Der aktuelle Zug gehört nicht dem Monster.");
    }
    const actions = actor.actions || actor.combatActions || actor.attacks;
    const attackId = chooseDefaultCombatActionId(actions, actor.defaultActionId);
    const action =
      (Array.isArray(actions) ? actions.find((item) => item && toText(item.id) === toText(attackId)) : null) ||
      getUsableCombatActions(actions)[0] ||
      null;
    const targetIds = action ? chooseMonsterTargetsForAction(battle, actor, action).map((item) => item.id) : [];
    return resolveAttackV2(battle, actor.id, attackId, targetIds);
  }

  function restartBattleV2(source) {
    const battle = source && typeof source === "object" ? source : {};
    const setup = battle.setup && typeof battle.setup === "object" ? battle.setup : battle;
    const heroIds =
      Array.isArray(setup.heroIds) && setup.heroIds.length
        ? setup.heroIds
        : [setup.heroId || setup.selectedHeroId || setup.hero].filter(Boolean);
    const monsterGroups =
      Array.isArray(setup.monsterGroups) && setup.monsterGroups.length
        ? setup.monsterGroups
        : [
            {
              monsterId: setup.monsterId || setup.selectedMonsterId || setup.monster,
              count: setup.monsterCount || setup.count || 1
            }
          ];
    return startBattleV2({ heroIds, monsterGroups });
  }

  const api = {
    normalizeActions,
    normalizeAttacks,
    conditions: CONDITION_DEFINITIONS,
    normalizeConditions,
    hasCondition,
    setCombatantCondition,
    toggleCombatantCondition,
    getActionResourceState,
    rollDie,
    rollDiceFormula,
    rollD20,
    rollSavingThrow,
    createCombatantFromHero,
    createCombatantFromMonster,
    getLivingCombatants,
    startBattle: startBattleV2,
    resolveAttack: resolveAttackV2,
    resolveHealAction: resolveHealActionV2,
    resolveSaveAction: resolveSaveActionV2,
    performMonsterTurn: performMonsterTurnV2,
    restartBattle: restartBattleV2
  };

  const app = window.GlossaryApp || (window.GlossaryApp = {});
  app.Combat = api;
})();
