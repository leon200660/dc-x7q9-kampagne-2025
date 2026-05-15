(function () {
  const app = window.GlossaryApp;
  if (!app) return;

  const { state } = app;
  const ARENA_SELECTION_STORAGE_KEY = "dnd-glossar-arena-selection";
  const ARENA_BATTLE_STORAGE_KEY = "dnd-glossar-arena-battle";
  const ARENA_STAGE_IMPACT_MS = 700;
  const ARENA_BATTLE_START_DELAY_MS = 260;
  const ARENA_POST_HERO_ACTION_DELAY_MS = 360;
  const ARENA_MONSTER_TURN_DELAY_MS = 540;
  let lastArenaDuelFocus = null;

  function callIfFn(fn, ...args) {
    if (typeof fn === "function") return fn(...args);
    return undefined;
  }

  function dom() {
    return {
      ...(app.dom || {}),
      arenaContent: document.getElementById("arena-content"),
      arenaTitle: document.getElementById("arena-title"),
      arenaSubtitle: document.getElementById("arena-subtitle"),
      arenaDuelOverlay: document.getElementById("arena-duel-overlay"),
      arenaDuelBackdrop: document.getElementById("arena-duel-backdrop"),
      arenaDuelPanel: document.getElementById("arena-duel-panel"),
      arenaDuelClose: document.getElementById("arena-duel-close"),
      arenaDuelContent: document.getElementById("arena-duel-content")
    };
  }

  function getCurrentView() {
    return typeof app.getCurrentView === "function" ? app.getCurrentView() : state.view;
  }

  function toText(value) {
    return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
  }

  function normalizeToken(value) {
    return toText(value)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
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

  function toFiniteNumber(value, fallback) {
    const raw = toText(value).replace(",", ".");
    if (!raw) return typeof fallback === "number" ? fallback : 0;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : typeof fallback === "number" ? fallback : 0;
  }

  function formatSigned(value) {
    const numeric = toFiniteNumber(value, 0);
    return (numeric >= 0 ? "+" : "") + numeric;
  }

  function formatNumber(value, fallback) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? String(numeric) : fallback || "—";
  }

  function formatCurrentMax(current, max) {
    const hasCurrent = Number.isFinite(Number(current));
    const hasMax = Number.isFinite(Number(max));
    if (hasCurrent && hasMax) return `${Number(current)} / ${Number(max)}`;
    if (hasMax) return String(Number(max));
    if (hasCurrent) return String(Number(current));
    return "—";
  }

  function formatDateTime(value) {
    const raw = toText(value);
    if (!raw) return "";
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return "";
    try {
      return parsed.toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "";
    }
  }

  function buildImageUrl(raw) {
    return typeof app.buildImageUrl === "function" ? app.buildImageUrl(raw) : toText(raw);
  }

  const DEFAULT_ARENA_BACKGROUNDS = [
    "images/Arenen/Wiese.png",
    "images/Arenen/Wald.png",
    "images/Arenen/Stadt.png",
    "images/Arenen/Wasser.png",
  ];

  const ARENA_HERO_SPRITES = {
    anastasia: "images/Bilder Für Arena/Anastasia.png",
    dion: "images/Bilder Für Arena/Dion.png",
    gottfried: "images/Bilder Für Arena/Gottfried.png",
    guenther: "images/Bilder Für Arena/Günther.png",
    rittersporn: "images/Bilder Für Arena/Rittersporn.png",
  };

  const ARENA_MONSTER_SPRITES = {
    "monster-klagewolf": "images/Bilder Für Arena/Klagewolf.png",
    "monster-klagewolf-rudelfuehrer": "images/Bilder Für Arena/Klagewolf Rudelführer.png",
    "monster-riesenklagewolf": "images/Bilder Für Arena/Riesen Klagewolf.png",
    "monster-wyvern": "images/Bilder Für Arena/Wyvern.png",
    "monster-riesige-kanalratte": "images/Bilder Für Arena/Rieseige Kanalratte.png",
    "monster-rattenschwarm": "images/Bilder Für Arena/Rattenschwarm.png",
    "monster-riesenratten-nesthueter": "images/Bilder Für Arena/Kanalratten Nesthüter.png",
    "monster-rattenkoenigin": "images/Bilder Für Arena/Rattenbrutmutter.png",
    "monster-wanderbrut-arbeiter": "images/Bilder Für Arena/Wanderbrut Arbeiter.png",
    "monster-wanderbrut-krieger": "images/Bilder Für Arena/Wanderbrut Krieger.png",
    "monster-wanderbrut-koenigin": "images/Bilder Für Arena/Wanderbrut Königin.png",
    "monster-earth-elemental": "images/Bilder Für Arena/Erdelementar.png",
    "monster-earth-elemental-myrmidon": "images/Bilder Für Arena/Erdelementar Myrmidon.png",
    "monster-junger-kraken": "images/Bilder Für Arena/Junger Kraken.png",
  };

  const ARENA_MONSTER_BACKGROUNDS = {
    "monster-klagewolf": ["images/Arenen/Wald.png"],
    "monster-klagewolf-rudelfuehrer": ["images/Arenen/Wald.png"],
    "monster-riesenklagewolf": ["images/Arenen/Wald.png"],
    "monster-wyvern": ["images/Arenen/Wiese.png"],
    "monster-riesige-kanalratte": ["images/Arenen/Stadt.png"],
    "monster-rattenschwarm": ["images/Arenen/Stadt.png"],
    "monster-riesenratten-nesthueter": ["images/Arenen/Stadt.png"],
    "monster-rattenkoenigin": ["images/Arenen/Stadt.png"],
    "monster-wanderbrut-arbeiter": ["images/Arenen/Wiese.png"],
    "monster-wanderbrut-krieger": ["images/Arenen/Wiese.png"],
    "monster-wanderbrut-koenigin": ["images/Arenen/Wiese.png"],
    "monster-earth-elemental": ["images/Arenen/Stadt.png"],
    "monster-earth-elemental-myrmidon": ["images/Arenen/Stadt.png"],
    "monster-junger-kraken": ["images/Arenen/Wasser.png"],
  };

  function normalizeAssetPath(raw) {
    return toText(raw).replace(/\\/g, "/");
  }

  function encodeAssetPath(raw) {
    const normalized = normalizeAssetPath(raw);
    if (!normalized) return "";
    const repaired = normalized
      .replace(/Ã¤/g, "ä")
      .replace(/Ã¶/g, "ö")
      .replace(/Ã¼/g, "ü")
      .replace(/Ã„/g, "Ä")
      .replace(/Ã–/g, "Ö")
      .replace(/Ãœ/g, "Ü")
      .replace(/ÃŸ/g, "ß");
    return repaired
      .split("/")
      .map((segment) => {
        if (!segment) return "";
        try {
          return encodeURIComponent(decodeURIComponent(segment));
        } catch {
          return encodeURIComponent(segment);
        }
      })
      .join("/");
  }

  function encodeAssetPathSafe(raw) {
    const normalized = normalizeAssetPath(raw);
    if (!normalized) return "";
    let repaired = normalized;
    try {
      repaired = decodeURIComponent(escape(normalized));
    } catch {
      repaired = normalized;
    }
    return repaired
      .split("/")
      .map((segment) => {
        if (!segment) return "";
        try {
          return encodeURIComponent(decodeURIComponent(segment));
        } catch {
          return encodeURIComponent(segment);
        }
      })
      .join("/");
  }

  function getArenaSourceId(combatant) {
    return normalizeToken(combatant && (combatant.sourceId || combatant.id));
  }

  function getArenaSpriteRaw(combatant) {
    if (!combatant) return "";
    const meta = combatant.meta && typeof combatant.meta === "object" ? combatant.meta : {};
    const arena = meta.arena && typeof meta.arena === "object" ? meta.arena : {};
    const side = combatant.side === "hero" || combatant.side === "heroes" ? "heroes" : "monsters";
    const sourceId = getArenaSourceId(combatant);
    const mappedSprite =
      side === "heroes" ? ARENA_HERO_SPRITES[sourceId] || "" : ARENA_MONSTER_SPRITES[sourceId] || "";
    const configured = normalizeAssetPath(arena.sprite);
    return encodeAssetPathSafe(mappedSprite || configured || meta.image);
  }

  function getArenaBackgroundRaws(combatant) {
    if (!combatant) return [];
    const meta = combatant.meta && typeof combatant.meta === "object" ? combatant.meta : {};
    const arena = meta.arena && typeof meta.arena === "object" ? meta.arena : {};
    const ownBackgrounds = Array.isArray(arena.backgrounds)
      ? arena.backgrounds.map((value) => normalizeAssetPath(value)).filter(Boolean)
      : [];
    if (ownBackgrounds.length) return ownBackgrounds;
    const sourceId = getArenaSourceId(combatant);
    const mapped = ARENA_MONSTER_BACKGROUNDS[sourceId];
    if (Array.isArray(mapped) && mapped.length) {
      return mapped.map((value) => normalizeAssetPath(value)).filter(Boolean);
    }
    return DEFAULT_ARENA_BACKGROUNDS.slice();
  }

  function resolveArenaBackground(battle) {
    const groups = getBattleCombatants(battle);
    const monsters = Array.isArray(groups.monsters) ? groups.monsters : [];
    const heroes = Array.isArray(groups.heroes) ? groups.heroes : [];
    const setup = battle && battle.setup && typeof battle.setup === "object" ? battle.setup : {};
    const preferredMonsterId = toText(
      (Array.isArray(setup.monsterGroups) && setup.monsterGroups[0] && setup.monsterGroups[0].monsterId) ||
        setup.monsterId
    );

    const preferredMonster =
      (preferredMonsterId &&
        monsters.find((combatant) => {
          const sourceId = toText(combatant && combatant.sourceId);
          const combatantId = toText(combatant && combatant.id);
          return sourceId === preferredMonsterId || combatantId === preferredMonsterId;
        })) ||
      monsters.find((combatant) => toFiniteNumber(combatant && combatant.hpCurrent, 0) > 0) ||
      monsters[0] ||
      heroes.find((combatant) => toFiniteNumber(combatant && combatant.hpCurrent, 0) > 0) ||
      heroes[0] ||
      null;

    const backgrounds = getArenaBackgroundRaws(preferredMonster);
    const src = buildImageUrl(backgrounds[0] || DEFAULT_ARENA_BACKGROUNDS[0]);
    return src || "";
  }

  function getCombatApi() {
    return app.Combat && typeof app.Combat === "object" ? app.Combat : null;
  }

  function formatActionResource(action, active, battle) {
    const cost = action && action.resourceCost && typeof action.resourceCost === "object" ? action.resourceCost : null;
    if (!cost) return { usable: true, label: "", reason: "" };
    const combat = getCombatApi();
    if (combat && typeof combat.getActionResourceState === "function") {
      return combat.getActionResourceState(battle, active, action);
    }
    return { usable: true, label: toText(cost.type), reason: "" };
  }

  function formatSpellSlots(spellcasting) {
    const slots = spellcasting && spellcasting.slots && typeof spellcasting.slots === "object" ? spellcasting.slots : {};
    return Object.keys(slots)
      .map((level) => Number(level))
      .filter((level) => Number.isFinite(level))
      .sort((a, b) => a - b)
      .map((level) => {
        const slot = slots[String(level)] || {};
        return `Grad ${level}: ${formatCurrentMax(slot.current, slot.max)}`;
      })
      .join(" · ");
  }

  function getVisibleHeroes() {
    const heroes = typeof app.getHeroes === "function" ? app.getHeroes() : [];
    return heroes.filter((hero) => hero && hero.visible !== false);
  }

  function getVisibleMonsters() {
    const monsters = typeof app.getBestiaryMonsters === "function" ? app.getBestiaryMonsters() : [];
    return monsters.filter((monster) => monster && monster.visible !== false);
  }

  function getHeroById(id) {
    return typeof app.getHeroById === "function" ? app.getHeroById(id) : null;
  }

  function getMonsterById(id) {
    return typeof app.findBestiaryMonsterById === "function" ? app.findBestiaryMonsterById(id) : null;
  }

  function getRecognizedHero() {
    return typeof app.getRecognizedHero === "function" ? app.getRecognizedHero() : null;
  }

  function getBestiaryMonsterHash(id) {
    return typeof app.getBestiaryMonsterRouteHash === "function"
      ? app.getBestiaryMonsterRouteHash(id)
      : "#bestiary";
  }

  function getHeroHash(id) {
    return typeof app.getHeroRecordHash === "function" ? app.getHeroRecordHash(id) : "#heldenakte";
  }

  function getArenaHash(heroId, monsterId) {
    return typeof app.getArenaBattleHash === "function"
      ? app.getArenaBattleHash(heroId, monsterId)
      : "#kampfprobe";
  }

  function readStoredArenaSelection() {
    try {
      const raw = window.localStorage.getItem(ARENA_SELECTION_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      const heroIds = Array.isArray(parsed && parsed.heroIds)
        ? parsed.heroIds.map((id) => toText(id)).filter(Boolean)
        : toText(parsed && parsed.heroId)
        ? [toText(parsed.heroId)]
        : [];
      const monsterGroups = Array.isArray(parsed && parsed.monsterGroups)
        ? parsed.monsterGroups
            .map((group) => ({
              monsterId: toText(group && (group.monsterId || group.id || group.monster)),
              count: Math.max(1, Math.min(12, Math.floor(toFiniteNumber(group && (group.count || group.quantity), 1))))
            }))
            .filter((group) => group.monsterId)
        : toText(parsed && parsed.monsterId)
        ? [
            {
              monsterId: toText(parsed.monsterId),
              count: Math.max(1, Math.min(12, Math.floor(toFiniteNumber(parsed.monsterCount || parsed.count, 1))))
            }
          ]
        : [];
      return parsed && typeof parsed === "object"
        ? {
            heroId: toText(parsed.heroId),
            monsterId: toText(parsed.monsterId),
            heroIds,
            monsterGroups,
            selectedTargetId: toText(parsed.selectedTargetId)
          }
        : { heroId: "", monsterId: "", heroIds: [], monsterGroups: [], selectedTargetId: "" };
    } catch {
      return { heroId: "", monsterId: "", heroIds: [], monsterGroups: [], selectedTargetId: "" };
    }
  }

  function saveStoredArenaSelection(selectionOrHeroId, maybeMonsterId) {
    const source =
      selectionOrHeroId && typeof selectionOrHeroId === "object"
        ? selectionOrHeroId
        : { heroId: selectionOrHeroId, monsterId: maybeMonsterId };
    const heroIds = Array.isArray(source.heroIds)
      ? source.heroIds.map((id) => toText(id)).filter(Boolean)
      : toText(source.heroId)
      ? [toText(source.heroId)]
      : [];
    const monsterGroups = Array.isArray(source.monsterGroups)
      ? source.monsterGroups
          .map((group) => ({
            monsterId: toText(group && (group.monsterId || group.id || group.monster)),
            count: Math.max(1, Math.min(12, Math.floor(toFiniteNumber(group && (group.count || group.quantity), 1))))
          }))
          .filter((group) => group.monsterId)
      : toText(source.monsterId)
      ? [{ monsterId: toText(source.monsterId), count: 1 }]
      : [];
    try {
      window.localStorage.setItem(
        ARENA_SELECTION_STORAGE_KEY,
        JSON.stringify({
          heroId: heroIds[0] || "",
          monsterId: monsterGroups[0] ? monsterGroups[0].monsterId : "",
          heroIds,
          monsterGroups,
          selectedTargetId: toText(source.selectedTargetId)
        })
      );
    } catch {}
  }

  function readStoredArenaBattle() {
    try {
      const raw = window.localStorage.getItem(ARENA_BATTLE_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || typeof parsed !== "object") return null;
      const battle = parsed.battle && typeof parsed.battle === "object" ? parsed.battle : null;
      const savedAt = parsed.savedAt && typeof parsed.savedAt === "string" ? parsed.savedAt : "";
      if (!battle) return null;
      return { battle, savedAt };
    } catch {
      return null;
    }
  }

  function saveStoredArenaBattle(battle) {
    try {
      if (!battle || typeof battle !== "object") {
        window.localStorage.removeItem(ARENA_BATTLE_STORAGE_KEY);
        return;
      }
      window.localStorage.setItem(
        ARENA_BATTLE_STORAGE_KEY,
        JSON.stringify({
          savedAt: new Date().toISOString(),
          battle
        })
      );
    } catch {}
  }

  function clearStoredArenaBattle() {
    try {
      window.localStorage.removeItem(ARENA_BATTLE_STORAGE_KEY);
    } catch {}
  }

  function isBattleSetupCompatibleWithData(battle) {
    if (!battle || typeof battle !== "object") return false;
    const setup = battle.setup && typeof battle.setup === "object" ? battle.setup : null;
    if (!setup) return false;
    const heroIds =
      Array.isArray(setup.heroIds) && setup.heroIds.length
        ? setup.heroIds.map((id) => toText(id)).filter(Boolean)
        : [toText(setup.heroId || setup.selectedHeroId || setup.hero)].filter(Boolean);
    const monsterGroups =
      Array.isArray(setup.monsterGroups) && setup.monsterGroups.length
        ? setup.monsterGroups
        : [{ monsterId: setup.monsterId || setup.selectedMonsterId || setup.monster, count: setup.monsterCount || 1 }];

    if (!heroIds.length) return false;
    if (!heroIds.every((id) => !!getHeroById(id))) return false;
    if (!monsterGroups.some((group) => toText(group && group.monsterId))) return false;
    if (
      !monsterGroups.every((group) => {
        const id = toText(group && (group.monsterId || group.id || group.monster));
        return id ? !!getMonsterById(id) : false;
      })
    ) {
      return false;
    }
    return true;
  }

  function chooseFirstReadyMonster(monsters) {
    const list = Array.isArray(monsters) ? monsters : [];
    const readyMonster = list.find((monster) => {
      const combat = monster && monster.combat && typeof monster.combat === "object" ? monster.combat : null;
      return !!(combat && combat.enabled === true && combat.ready === true);
    });
    return readyMonster || list[0] || null;
  }

  function ensureArenaState() {
    state.arena =
      state.arena && typeof state.arena === "object"
        ? state.arena
        : typeof app.createEmptyArenaState === "function"
        ? app.createEmptyArenaState()
        : {
            selectedHeroId: null,
            selectedHeroIds: [],
            selectedMonsterId: null,
            monsterGroups: [],
            selectedTargetId: "",
            battle: null,
            lastResult: "",
            log: []
          };

    if (!Array.isArray(state.arena.log)) state.arena.log = [];
    if (!Array.isArray(state.arena.selectedHeroIds)) state.arena.selectedHeroIds = [];
    if (!Array.isArray(state.arena.monsterGroups)) state.arena.monsterGroups = [];
    if (typeof state.arena.lastResult !== "string") state.arena.lastResult = "";
    if (!("errorMessage" in state.arena)) state.arena.errorMessage = "";
    if (!("storedBattleMeta" in state.arena)) state.arena.storedBattleMeta = null;
    if (!("restoreChecked" in state.arena)) state.arena.restoreChecked = false;
    if (!("duelOpen" in state.arena)) state.arena.duelOpen = false;
    if (!("logDrawerOpen" in state.arena)) state.arena.logDrawerOpen = false;
    if (typeof state.arena.logDrawerOpen !== "boolean") state.arena.logDrawerOpen = false;
    if (typeof state.arena.commandStep !== "string") state.arena.commandStep = "action";
    if (typeof state.arena.commandSheet !== "string") state.arena.commandSheet = "";
    if (typeof state.arena.commandTab !== "string") state.arena.commandTab = "menu";
    if (typeof state.arena.commandActionId !== "string") state.arena.commandActionId = "";
    if (!Array.isArray(state.arena.commandTargetIds)) state.arena.commandTargetIds = [];
    if (typeof state.arena.viewedHeroId !== "string") state.arena.viewedHeroId = "";
    if (typeof state.arena.viewedMonsterId !== "string") state.arena.viewedMonsterId = "";
    if (!Number.isInteger(state.arena.viewedHeroCursor)) state.arena.viewedHeroCursor = -1;
    if (!Number.isInteger(state.arena.viewedMonsterCursor)) state.arena.viewedMonsterCursor = -1;
    if (typeof state.arena.focusSwitchSide !== "string") state.arena.focusSwitchSide = "";
    if (typeof state.arena.stageImpactLogId !== "string") state.arena.stageImpactLogId = "";
    if (!Number.isFinite(state.arena.stageImpactUntil)) state.arena.stageImpactUntil = 0;
    if (!state.arena.stageImpact || typeof state.arena.stageImpact !== "object") state.arena.stageImpact = null;
    if (typeof state.arena.stageImpactPending !== "boolean") state.arena.stageImpactPending = false;
    if (!Number.isFinite(state.arena.monsterResolveTimerId)) state.arena.monsterResolveTimerId = 0;
    if (typeof state.arena.monsterResolveRunning !== "boolean") state.arena.monsterResolveRunning = false;
    if (!state.arena.lastActionByActor || typeof state.arena.lastActionByActor !== "object") {
      state.arena.lastActionByActor = {};
    }

    const heroes = getVisibleHeroes();
    const recognizedHero = getRecognizedHero();
    const firstHero = heroes[0] || null;
    const storedSelection = readStoredArenaSelection();
    const storedHero = storedSelection.heroId ? getHeroById(storedSelection.heroId) : null;
    const storedMonster = storedSelection.monsterId ? getMonsterById(storedSelection.monsterId) : null;
    const storedHeroIds = (Array.isArray(storedSelection.heroIds) ? storedSelection.heroIds : [])
      .filter((id) => !!getHeroById(id));
    const storedMonsterGroups = (Array.isArray(storedSelection.monsterGroups) ? storedSelection.monsterGroups : [])
      .filter((group) => group && getMonsterById(group.monsterId));

    const selectedHero =
      (state.arena.selectedHeroId && getHeroById(state.arena.selectedHeroId)) ||
      recognizedHero ||
      storedHero ||
      (state.selectedHeroId && getHeroById(state.selectedHeroId)) ||
      firstHero ||
      null;

    state.arena.selectedHeroId = selectedHero ? selectedHero.id : null;
    state.selectedHeroId = selectedHero ? selectedHero.id : null;
    const selectedHeroIds = state.arena.selectedHeroIds
      .map((id) => toText(id))
      .filter((id) => !!getHeroById(id));
    if (state.arena.selectedHeroId && !selectedHeroIds.includes(state.arena.selectedHeroId)) {
      selectedHeroIds.unshift(state.arena.selectedHeroId);
    }
    state.arena.selectedHeroIds = selectedHeroIds.length
      ? selectedHeroIds
      : storedHeroIds.length
      ? storedHeroIds
      : selectedHero
      ? [selectedHero.id]
      : [];

    const monsters = getVisibleMonsters();
    const preferredMonster =
      (state.arena.selectedMonsterId && getMonsterById(state.arena.selectedMonsterId)) ||
      storedMonster ||
      (state.bestiarySelectedMonsterId && getMonsterById(state.bestiarySelectedMonsterId)) ||
      chooseFirstReadyMonster(monsters) ||
      null;

    state.arena.selectedMonsterId = preferredMonster ? preferredMonster.id : null;
    state.bestiarySelectedMonsterId = preferredMonster ? preferredMonster.id : null;
    const selectedMonsterGroups = state.arena.monsterGroups
      .map((group) => ({
        monsterId: toText(group && (group.monsterId || group.id || group.monster)),
        count: Math.max(1, Math.min(12, Math.floor(toFiniteNumber(group && (group.count || group.quantity), 1))))
      }))
      .filter((group) => !!getMonsterById(group.monsterId));
    if (
      state.arena.selectedMonsterId &&
      !selectedMonsterGroups.some((group) => group.monsterId === state.arena.selectedMonsterId)
    ) {
      selectedMonsterGroups.splice(0, selectedMonsterGroups.length, {
        monsterId: state.arena.selectedMonsterId,
        count: 1
      });
    }
    state.arena.monsterGroups = selectedMonsterGroups.length
      ? selectedMonsterGroups
      : storedMonsterGroups.length
      ? storedMonsterGroups
      : preferredMonster
      ? [{ monsterId: preferredMonster.id, count: 1 }]
      : [];
    if (state.arena.selectedHeroId || state.arena.selectedMonsterId) {
      saveStoredArenaSelection({
        heroIds: state.arena.selectedHeroIds,
        monsterGroups: state.arena.monsterGroups,
        selectedTargetId: state.arena.selectedTargetId
      });
    }

    const battle = state.arena.battle && typeof state.arena.battle === "object" ? state.arena.battle : null;
    const setup = battle && battle.setup && typeof battle.setup === "object" ? battle.setup : null;
    if (
      setup &&
      (
        JSON.stringify(Array.isArray(setup.heroIds) ? setup.heroIds : [setup.heroId].filter(Boolean)) !==
          JSON.stringify(state.arena.selectedHeroIds) ||
        JSON.stringify(Array.isArray(setup.monsterGroups) ? setup.monsterGroups.map((group) => ({
          monsterId: toText(group && (group.monsterId || group.id || group.monster)),
          count: Math.max(1, Math.floor(toFiniteNumber(group && (group.count || group.quantity), 1)))
        })) : [{ monsterId: setup.monsterId, count: 1 }].filter((group) => group.monsterId)) !==
          JSON.stringify(state.arena.monsterGroups)
      )
    ) {
      state.arena.battle = null;
      state.arena.log = [];
      state.arena.lastResult = "";
      clearStoredArenaBattle();
    }

    if (!state.arena.restoreChecked && !state.arena.battle) {
      state.arena.restoreChecked = true;
      const storedBattle = readStoredArenaBattle();
      if (storedBattle && storedBattle.battle && isBattleSetupCompatibleWithData(storedBattle.battle)) {
        state.arena.battle = storedBattle.battle;
        state.arena.log = Array.isArray(storedBattle.battle.log) ? storedBattle.battle.log.slice() : [];
        state.arena.lastResult = toText(storedBattle.battle.lastResult);
        state.arena.errorMessage = "";
        state.arena.storedBattleMeta = { savedAt: toText(storedBattle.savedAt) };
      } else if (storedBattle) {
        clearStoredArenaBattle();
      }
    }

    return state.arena;
  }

  function syncBattleState(battle) {
    const arena = ensureArenaState();
    clearArenaMonsterResolveTimer(arena);
    arena.battle = battle || null;
    arena.viewedHeroId = "";
    arena.viewedMonsterId = "";
    arena.viewedHeroCursor = -1;
    arena.viewedMonsterCursor = -1;
    arena.focusSwitchSide = "";
    arena.stageImpactLogId = "";
    arena.stageImpactUntil = 0;
    arena.stageImpact = null;
    arena.stageImpactPending = false;
    arena.log = battle && Array.isArray(battle.log) ? battle.log.slice() : [];
    arena.lastResult = battle && typeof battle.lastResult === "string" ? battle.lastResult : "";
    arena.errorMessage = "";
    arena.storedBattleMeta = battle ? { savedAt: new Date().toISOString() } : null;
    saveStoredArenaBattle(battle || null);
    return arena;
  }

  function clearBattleState() {
    const arena = ensureArenaState();
    clearArenaMonsterResolveTimer(arena);
    arena.battle = null;
    arena.duelOpen = false;
    arena.log = [];
    arena.lastResult = "";
    arena.errorMessage = "";
    arena.storedBattleMeta = null;
    arena.commandTab = "menu";
    arena.logDrawerOpen = false;
    arena.commandStep = "action";
    arena.commandSheet = "";
    arena.commandActionId = "";
    arena.commandTargetIds = [];
    arena.viewedHeroCursor = -1;
    arena.viewedMonsterCursor = -1;
    arena.focusSwitchSide = "";
    arena.stageImpactLogId = "";
    arena.stageImpactUntil = 0;
    arena.stageImpact = null;
    arena.stageImpactPending = false;
    clearStoredArenaBattle();
    return arena;
  }

  function clearArenaMonsterResolveTimer(arenaCandidate) {
    const arena =
      arenaCandidate && typeof arenaCandidate === "object"
        ? arenaCandidate
        : state.arena && typeof state.arena === "object"
        ? state.arena
        : null;
    if (!arena) return;
    const timerId = Math.floor(toFiniteNumber(arena.monsterResolveTimerId, 0));
    if (timerId > 0) {
      try {
        window.clearTimeout(timerId);
      } catch {}
    }
    arena.monsterResolveTimerId = 0;
    arena.monsterResolveRunning = false;
  }

  function setArenaDuelOpen(open, options) {
    const opts = options && typeof options === "object" ? options : {};
    const nextOpen = open === true;
    const currentDom = dom();
    const overlay = currentDom.arenaDuelOverlay;
    const panel = currentDom.arenaDuelPanel;
    const arenaView = currentDom.arenaView;
    const body = document.body;
    const arena = ensureArenaState();

    arena.duelOpen = nextOpen;

    if (overlay) {
      overlay.hidden = !nextOpen;
      overlay.setAttribute("aria-hidden", nextOpen ? "false" : "true");
      overlay.classList.toggle("is-open", nextOpen);
    }
    if (arenaView) {
      arenaView.classList.toggle("arena-view--duel-open", nextOpen);
    }
    if (body) {
      body.classList.toggle("arena-duel-open", nextOpen);
    }

    if (nextOpen) {
      if (document.activeElement instanceof HTMLElement) {
        lastArenaDuelFocus = document.activeElement;
      }
      if (panel && typeof panel.focus === "function") {
        window.requestAnimationFrame(() => {
          try {
            panel.focus({ preventScroll: true });
          } catch {
            panel.focus();
          }
        });
      }
      return;
    }

    if (opts.restoreFocus !== false && lastArenaDuelFocus && document.contains(lastArenaDuelFocus)) {
      try {
        lastArenaDuelFocus.focus({ preventScroll: true });
      } catch {
        lastArenaDuelFocus.focus();
      }
    }
    lastArenaDuelFocus = null;
  }

  function openArenaDuel() {
    setArenaDuelOpen(true);
  }

  function closeArenaDuel() {
    setArenaDuelOpen(false);
  }

  function updateArenaRoute(heroId, monsterId) {
    const nextHash = getArenaHash(heroId, monsterId);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }
    renderArena();
  }

  function setArenaSelection(heroId, monsterId) {
    const arena = ensureArenaState();
    const nextHero = heroId && getHeroById(heroId) ? heroId : arena.selectedHeroId;
    const nextMonster = monsterId && getMonsterById(monsterId) ? monsterId : arena.selectedMonsterId;
    const changed = nextHero !== arena.selectedHeroId || nextMonster !== arena.selectedMonsterId;

    arena.selectedHeroId = nextHero || null;
    arena.selectedMonsterId = nextMonster || null;
    arena.selectedHeroIds = arena.selectedHeroIds.length ? arena.selectedHeroIds : arena.selectedHeroId ? [arena.selectedHeroId] : [];
    arena.monsterGroups = arena.monsterGroups.length ? arena.monsterGroups : arena.selectedMonsterId ? [{ monsterId: arena.selectedMonsterId, count: 1 }] : [];
    state.selectedHeroId = arena.selectedHeroId;
    state.bestiarySelectedMonsterId = arena.selectedMonsterId;
    saveStoredArenaSelection({
      heroIds: arena.selectedHeroIds,
      monsterGroups: arena.monsterGroups,
      selectedTargetId: arena.selectedTargetId
    });

    if (changed) {
      clearBattleState();
    }

    updateArenaRoute(arena.selectedHeroId, arena.selectedMonsterId);
  }

  function setArenaHeroIncluded(heroId, included) {
    const arena = ensureArenaState();
    const id = toText(heroId);
    if (!id || !getHeroById(id)) return;

    const current = new Set(arena.selectedHeroIds.map((value) => toText(value)).filter(Boolean));
    if (included) current.add(id);
    else current.delete(id);
    if (!current.size) current.add(id);

    arena.selectedHeroIds = Array.from(current);
    arena.selectedHeroId = arena.selectedHeroIds[0] || null;
    state.selectedHeroId = arena.selectedHeroId;
    saveStoredArenaSelection({
      heroIds: arena.selectedHeroIds,
      monsterGroups: arena.monsterGroups,
      selectedTargetId: arena.selectedTargetId
    });
    clearBattleState();
    updateArenaRoute(arena.selectedHeroId, arena.selectedMonsterId);
  }

  function normalizeArenaMonsterGroups(rawGroups) {
    return (Array.isArray(rawGroups) ? rawGroups : [])
      .map((group) => ({
        monsterId: toText(group && (group.monsterId || group.id || group.monster)),
        count: Math.max(1, Math.min(12, Math.floor(toFiniteNumber(group && (group.count || group.quantity), 1))))
      }))
      .filter((group) => group.monsterId && !!getMonsterById(group.monsterId));
  }

  function commitArenaMonsterGroups(rawGroups) {
    const arena = ensureArenaState();
    const nextGroups = normalizeArenaMonsterGroups(rawGroups);
    arena.monsterGroups = nextGroups;
    arena.selectedMonsterId = nextGroups.length ? nextGroups[0].monsterId : null;
    arena.selectedTargetId = "";
    state.bestiarySelectedMonsterId = arena.selectedMonsterId;
    saveStoredArenaSelection({
      heroIds: arena.selectedHeroIds,
      monsterGroups: arena.monsterGroups,
      selectedTargetId: arena.selectedTargetId
    });
    clearBattleState();
    updateArenaRoute(arena.selectedHeroId, arena.selectedMonsterId);
  }

  function setArenaMonsterGroup(monsterId, count) {
    const id = toText(monsterId);
    if (!id || !getMonsterById(id)) return;
    const nextCount = Math.max(1, Math.min(12, Math.floor(toFiniteNumber(count, 1))));
    commitArenaMonsterGroups([{ monsterId: id, count: nextCount }]);
  }

  function addArenaMonsterGroup(monsterId, count) {
    const arena = ensureArenaState();
    const id = toText(monsterId);
    if (!id || !getMonsterById(id)) return;
    const nextCount = Math.max(1, Math.min(12, Math.floor(toFiniteNumber(count, 1))));
    const groups = normalizeArenaMonsterGroups(arena.monsterGroups);
    const existing = groups.find((group) => group.monsterId === id);
    if (existing) {
      existing.count = Math.max(1, Math.min(12, existing.count + nextCount));
    } else {
      groups.push({ monsterId: id, count: nextCount });
    }
    commitArenaMonsterGroups(groups);
  }

  function updateArenaMonsterGroup(indexValue, patch) {
    const arena = ensureArenaState();
    const index = Math.floor(toFiniteNumber(indexValue, -1));
    const groups = normalizeArenaMonsterGroups(arena.monsterGroups);
    if (index < 0 || index >= groups.length) return;
    const source = groups[index];
    const nextMonsterId = patch && patch.monsterId != null ? toText(patch.monsterId) : source.monsterId;
    const nextCount =
      patch && patch.count != null
        ? Math.max(1, Math.min(12, Math.floor(toFiniteNumber(patch.count, source.count))))
        : source.count;
    if (!nextMonsterId || !getMonsterById(nextMonsterId)) return;
    groups[index] = { monsterId: nextMonsterId, count: nextCount };

    const merged = [];
    groups.forEach((group) => {
      const existing = merged.find((item) => item.monsterId === group.monsterId);
      if (existing) {
        existing.count = Math.max(1, Math.min(12, existing.count + group.count));
      } else {
        merged.push({ monsterId: group.monsterId, count: group.count });
      }
    });
    commitArenaMonsterGroups(merged);
  }

  function removeArenaMonsterGroup(indexValue) {
    const arena = ensureArenaState();
    const index = Math.floor(toFiniteNumber(indexValue, -1));
    const groups = normalizeArenaMonsterGroups(arena.monsterGroups);
    if (groups.length <= 1) return;
    if (index < 0 || index >= groups.length) return;
    groups.splice(index, 1);
    commitArenaMonsterGroups(groups);
  }

  function setArenaTarget(targetId) {
    const arena = ensureArenaState();
    arena.selectedTargetId = toText(targetId);
    saveStoredArenaSelection({
      heroIds: arena.selectedHeroIds,
      monsterGroups: arena.monsterGroups,
      selectedTargetId: arena.selectedTargetId
    });
  }

  function getHeroAvailability(hero) {
    const combat = getCombatApi();
    if (!combat || !hero) {
      return { ready: false, reason: "Der Kampfkern ist nicht geladen.", combatant: null };
    }
    try {
      const combatant = combat.createCombatantFromHero(hero);
      return {
        ready: combatant.ready === true,
        reason: toText(combatant.disabledReason),
        combatant
      };
    } catch (error) {
      return {
        ready: false,
        reason: error && error.message ? error.message : "Held konnte nicht vorbereitet werden.",
        combatant: null
      };
    }
  }

  function getMonsterAvailability(monster) {
    const combat = getCombatApi();
    if (!combat || !monster) {
      return { ready: false, reason: "Der Kampfkern ist nicht geladen.", combatant: null };
    }
    try {
      const combatant = combat.createCombatantFromMonster(monster);
      return {
        ready: combatant.ready === true,
        reason: toText(combatant.disabledReason),
        combatant
      };
    } catch (error) {
      return {
        ready: false,
        reason: error && error.message ? error.message : "Monster konnte nicht vorbereitet werden.",
        combatant: null
      };
    }
  }

  function getSelectedHeroRecord() {
    const arena = ensureArenaState();
    return arena.selectedHeroId ? getHeroById(arena.selectedHeroId) : null;
  }

  function getSelectedHeroRecords() {
    const arena = ensureArenaState();
    const ids = Array.isArray(arena.selectedHeroIds) ? arena.selectedHeroIds : [];
    return ids.map((id) => getHeroById(id)).filter(Boolean);
  }

  function getSelectedMonsterRecord() {
    const arena = ensureArenaState();
    return arena.selectedMonsterId ? getMonsterById(arena.selectedMonsterId) : null;
  }

  function getSelectedMonsterGroup() {
    const arena = ensureArenaState();
    return Array.isArray(arena.monsterGroups) && arena.monsterGroups.length
      ? arena.monsterGroups[0]
      : arena.selectedMonsterId
      ? { monsterId: arena.selectedMonsterId, count: 1 }
      : { monsterId: "", count: 1 };
  }

  function isMonsterTurnActive(battle) {
    if (!battle || battle.status !== "active") return false;
    const activeId = toText(battle.activeCombatantId);
    const active =
      Array.isArray(battle.combatants) && activeId
        ? battle.combatants.find((combatant) => combatant && combatant.id === activeId)
        : null;
    return !!(active && (active.side === "monster" || active.side === "monsters"));
  }

  function scheduleMonsterAutoStep(delayMs) {
    const arena = ensureArenaState();
    clearArenaMonsterResolveTimer(arena);
    const waitMs = Math.max(0, Math.floor(toFiniteNumber(delayMs, ARENA_MONSTER_TURN_DELAY_MS)));
    arena.monsterResolveRunning = true;
    arena.monsterResolveTimerId = window.setTimeout(() => {
      runMonsterAutoStep();
    }, waitMs);
  }

  function runMonsterAutoStep() {
    const combat = getCombatApi();
    const arena = ensureArenaState();
    if (!combat || !arena.battle || !isMonsterTurnActive(arena.battle)) {
      clearArenaMonsterResolveTimer(arena);
      renderArena();
      return;
    }

    try {
      combat.performMonsterTurn(arena.battle);
      syncBattleState(arena.battle);
    } catch (error) {
      clearArenaMonsterResolveTimer(arena);
      arena.errorMessage = error && error.message ? error.message : "Monsterzug konnte nicht ausgef\u00fchrt werden.";
      renderArena();
      return;
    }

    renderArena();

    if (!arena.battle || !isMonsterTurnActive(arena.battle)) {
      clearArenaMonsterResolveTimer(arena);
      return;
    }

    scheduleMonsterAutoStep(ARENA_MONSTER_TURN_DELAY_MS);
  }

  function autoResolveMonsterTurns(initialDelayMs) {
    const arena = ensureArenaState();
    if (!arena.battle || !isMonsterTurnActive(arena.battle)) {
      clearArenaMonsterResolveTimer(arena);
      return;
    }
    scheduleMonsterAutoStep(initialDelayMs);
  }

  function startSelectedBattle() {
    const combat = getCombatApi();
    const arena = ensureArenaState();
    const heroes = getSelectedHeroRecords();
    const monsterGroups = normalizeArenaMonsterGroups(arena.monsterGroups);

    if (!combat || !heroes.length || !monsterGroups.length) {
      arena.errorMessage = "Wähle zuerst mindestens einen Helden und mindestens eine Monstergruppe aus.";
      renderArena();
      return;
    }

    let started = false;
    try {
      const battle = combat.startBattle({
        heroIds: heroes.map((hero) => hero.id),
        monsterGroups
      });
      syncBattleState(battle);
      autoResolveMonsterTurns(ARENA_BATTLE_START_DELAY_MS);
      started = true;
    } catch (error) {
      arena.errorMessage = error && error.message ? error.message : "Die Kampfprobe konnte nicht gestartet werden.";
    }

    if (started) {
      arena.duelOpen = true;
    }

    renderArena();
  }

  function restartSelectedBattle() {
    const combat = getCombatApi();
    const arena = ensureArenaState();
    if (!combat) return;

    let restarted = false;
    try {
      const stored = !arena.battle ? readStoredArenaBattle() : null;
      const storedSource =
        stored && stored.battle && isBattleSetupCompatibleWithData(stored.battle) ? stored.battle : null;
      const source =
        arena.battle && arena.battle.setup
          ? arena.battle
          : storedSource
          ? storedSource
          : {
              heroIds: arena.selectedHeroIds,
              monsterGroups: arena.monsterGroups
            };
      const battle = combat.restartBattle(source);
      syncBattleState(battle);
      autoResolveMonsterTurns(ARENA_BATTLE_START_DELAY_MS);
      restarted = true;
    } catch (error) {
      arena.errorMessage = error && error.message ? error.message : "Die Kampfprobe konnte nicht neu gestartet werden.";
    }

    if (restarted) {
      arena.duelOpen = true;
    }

    renderArena();
  }

  function restoreStoredBattle() {
    const arena = ensureArenaState();
    clearArenaMonsterResolveTimer(arena);
    const stored = readStoredArenaBattle();
    if (!stored || !stored.battle) {
      arena.errorMessage = "Kein gespeicherter Kampfstand gefunden.";
      renderArena();
      return;
    }
    if (!isBattleSetupCompatibleWithData(stored.battle)) {
      clearStoredArenaBattle();
      arena.errorMessage = "Der gespeicherte Kampfstand passt nicht mehr zu den aktuellen Daten.";
      renderArena();
      return;
    }
    const setup = stored.battle && stored.battle.setup && typeof stored.battle.setup === "object" ? stored.battle.setup : {};
    const restoredHeroIds =
      Array.isArray(setup.heroIds) && setup.heroIds.length
        ? setup.heroIds.map((id) => toText(id)).filter((id) => !!getHeroById(id))
        : [toText(setup.heroId || setup.selectedHeroId || setup.hero)].filter((id) => !!getHeroById(id));
    const restoredMonsterGroups =
      Array.isArray(setup.monsterGroups) && setup.monsterGroups.length
        ? setup.monsterGroups
            .map((group) => ({
              monsterId: toText(group && (group.monsterId || group.id || group.monster)),
              count: Math.max(1, Math.min(12, Math.floor(toFiniteNumber(group && (group.count || group.quantity), 1))))
            }))
            .filter((group) => group.monsterId && !!getMonsterById(group.monsterId))
        : [{ monsterId: setup.monsterId || setup.selectedMonsterId || setup.monster, count: setup.monsterCount || 1 }]
            .map((group) => ({
              monsterId: toText(group.monsterId),
              count: Math.max(1, Math.min(12, Math.floor(toFiniteNumber(group.count, 1))))
            }))
            .filter((group) => group.monsterId && !!getMonsterById(group.monsterId));

    if (restoredHeroIds.length) {
      arena.selectedHeroIds = restoredHeroIds;
      arena.selectedHeroId = restoredHeroIds[0];
      state.selectedHeroId = restoredHeroIds[0];
    }
    if (restoredMonsterGroups.length) {
      arena.monsterGroups = restoredMonsterGroups;
      arena.selectedMonsterId = restoredMonsterGroups[0].monsterId;
      state.bestiarySelectedMonsterId = restoredMonsterGroups[0].monsterId;
    }
    arena.battle = stored.battle;
    arena.log = Array.isArray(stored.battle.log) ? stored.battle.log.slice() : [];
    arena.lastResult = toText(stored.battle.lastResult);
    arena.errorMessage = "";
    arena.storedBattleMeta = { savedAt: toText(stored.savedAt) };
    arena.duelOpen = true;
    saveStoredArenaSelection({
      heroIds: arena.selectedHeroIds,
      monsterGroups: arena.monsterGroups,
      selectedTargetId: arena.selectedTargetId
    });
    autoResolveMonsterTurns(ARENA_BATTLE_START_DELAY_MS);
    renderArena();
  }

  function formatBattleLogAsText(battle) {
    const currentBattle = battle && typeof battle === "object" ? battle : null;
    if (!currentBattle) return "";
    const combatants = Array.isArray(currentBattle.combatants) ? currentBattle.combatants : [];
    const header = [
      "Kampfprobe-Export",
      "Runde: " + String(currentBattle.round || 1),
      "Status: " + (toText(currentBattle.status) || "unknown"),
      ""
    ];
    const roster = combatants.map((combatant) => {
      const side = combatant && (combatant.side === "hero" || combatant.side === "heroes") ? "Held" : "Wesen";
      return `${side}: ${toText(combatant && combatant.name) || "?"} (LP ${formatCurrentMax(combatant && combatant.hpCurrent, combatant && combatant.hpMax)})`;
    });
    const log = (Array.isArray(currentBattle.log) ? currentBattle.log : []).map((entry, index) => {
      const round = Number.isFinite(Number(entry && entry.round)) ? `R${entry.round}` : "R?";
      const type = toText(entry && entry.type) || "note";
      const text = toText(entry && entry.text) || "(kein Text)";
      return `${String(index + 1).padStart(3, "0")} ${round} [${type}] ${text}`;
    });
    return header.concat(roster).concat(["", "Chronik", ""]).concat(log).join("\n");
  }

  function exportBattleLog() {
    const arena = ensureArenaState();
    if (!arena.battle || !Array.isArray(arena.battle.log) || !arena.battle.log.length) {
      arena.errorMessage = "Es gibt noch keinen Kampflog zum Exportieren.";
      renderArena();
      return;
    }
    const text = formatBattleLogAsText(arena.battle);
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch {}

    try {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      anchor.href = url;
      anchor.download = "kampfprobe-log-" + stamp + ".txt";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      arena.errorMessage = "";
    } catch {
      arena.errorMessage = "Export fehlgeschlagen. Der Log wurde falls möglich in die Zwischenablage kopiert.";
    }
    renderArena();
  }

  function findMonsterByMatcher(monsters, matcher) {
    const list = Array.isArray(monsters) ? monsters : [];
    for (let i = 0; i < list.length; i += 1) {
      const monster = list[i];
      if (!monster) continue;
      const haystack = normalizeToken([monster.id, monster.title, monster.name, monster.type].filter(Boolean).join(" "));
      if (matcher(haystack)) return monster;
    }
    return null;
  }

  function buildArenaTestScenarios(heroes, monsters) {
    const heroList = Array.isArray(heroes) ? heroes.filter(Boolean) : [];
    const monsterList = Array.isArray(monsters) ? monsters.filter(Boolean) : [];
    const firstTwoHeroes = heroList.slice(0, 2);
    const firstHero = heroList[0] || null;
    const casterHero =
      heroList.find((hero) => {
        const spell = hero && hero.spellcasting && typeof hero.spellcasting === "object" ? hero.spellcasting : null;
        const hasSlots = spell && spell.slots && Object.keys(spell.slots).length > 0;
        const actions = Array.isArray(hero && hero.actions) ? hero.actions : Array.isArray(hero && hero.attacks) ? hero.attacks : [];
        const hasSaveAction = actions.some((action) => action && (action.type === "save" || action.type === "heal"));
        return !!(hasSlots || hasSaveAction);
      }) || firstHero;

    const klagewolf =
      findMonsterByMatcher(monsterList, (token) => token.includes("klagewolf")) || null;
    const rattenkoenigin =
      findMonsterByMatcher(monsterList, (token) => token.includes("rattenkonigin") || token.includes("rattenkoenigin")) || null;
    const schwarm =
      findMonsterByMatcher(monsterList, (token) => token.includes("schwarm")) || null;

    return [
      {
        id: "test-klagewolf-rudel",
        label: "2 Helden vs 3 Klagewölfe",
        heroIds: firstTwoHeroes.map((hero) => hero.id),
        monsterGroups: klagewolf ? [{ monsterId: klagewolf.id, count: 3 }] : [],
        available: firstTwoHeroes.length >= 2 && !!klagewolf
      },
      {
        id: "test-rattenkoenigin",
        label: "1 Held vs Rattenkönigin",
        heroIds: firstHero ? [firstHero.id] : [],
        monsterGroups: rattenkoenigin ? [{ monsterId: rattenkoenigin.id, count: 1 }] : [],
        available: !!firstHero && !!rattenkoenigin
      },
      {
        id: "test-zauber-gegen-schwarm",
        label: "Zauber gegen Schwarm",
        heroIds: casterHero ? [casterHero.id] : [],
        monsterGroups: schwarm ? [{ monsterId: schwarm.id, count: 1 }] : [],
        available: !!casterHero && !!schwarm
      }
    ];
  }

  function applyArenaTestScenario(scenarioId) {
    const heroes = getVisibleHeroes();
    const monsters = getVisibleMonsters();
    const scenarios = buildArenaTestScenarios(heroes, monsters);
    const selected = scenarios.find((item) => item && item.id === toText(scenarioId));
    const arena = ensureArenaState();
    if (!selected || !selected.available) {
      arena.errorMessage = "Dieses Testsetup ist aktuell nicht verfügbar.";
      renderArena();
      return;
    }
    arena.selectedHeroIds = selected.heroIds.slice();
    arena.selectedHeroId = selected.heroIds[0] || null;
    arena.monsterGroups = selected.monsterGroups.map((group) => ({
      monsterId: toText(group.monsterId),
      count: Math.max(1, Math.min(12, Math.floor(toFiniteNumber(group.count, 1))))
    }));
    arena.selectedMonsterId = arena.monsterGroups.length ? arena.monsterGroups[0].monsterId : null;
    state.selectedHeroId = arena.selectedHeroId;
    state.bestiarySelectedMonsterId = arena.selectedMonsterId;
    saveStoredArenaSelection({
      heroIds: arena.selectedHeroIds,
      monsterGroups: arena.monsterGroups,
      selectedTargetId: ""
    });
    clearBattleState();
    arena.errorMessage = "";
    updateArenaRoute(arena.selectedHeroId, arena.selectedMonsterId);
  }

  function performHeroAttack(attackId, targetId) {
    const combat = getCombatApi();
    const arena = ensureArenaState();
    if (!combat || !arena.battle || arena.battle.status !== "active") return;

    try {
      const actorId = toText(arena.battle.activeCombatantId);
      const normalizedAttackId = toText(attackId);
      const normalizedTargets = Array.isArray(targetId)
        ? targetId.map((id) => toText(id)).filter(Boolean)
        : toText(targetId)
        ? [toText(targetId)]
        : [];
      combat.resolveAttack(
        arena.battle,
        arena.battle.activeCombatantId,
        normalizedAttackId,
        normalizedTargets.length ? normalizedTargets : arena.selectedTargetId
      );
      if (actorId && normalizedAttackId) {
        arena.lastActionByActor = arena.lastActionByActor && typeof arena.lastActionByActor === "object" ? arena.lastActionByActor : {};
        arena.lastActionByActor[actorId] = normalizedAttackId;
      }
      arena.commandActionId = normalizedAttackId || arena.commandActionId;
      arena.commandTargetIds = [];
      arena.commandStep = "action";
      arena.commandSheet = "";
      arena.commandTab = "menu";
      syncBattleState(arena.battle);
      autoResolveMonsterTurns(ARENA_POST_HERO_ACTION_DELAY_MS);
    } catch (error) {
      arena.errorMessage = error && error.message ? error.message : "Der Angriff konnte nicht ausgeführt werden.";
    }

    renderArena();
  }

  function normalizeArenaCommandTab(value) {
    const tab = toText(value).toLowerCase();
    if (tab === "menu" || tab === "log" || tab === "retreat" || tab === "action") return tab;
    return "menu";
  }

  function normalizeArenaCommandStep(value) {
    const step = toText(value).toLowerCase();
    if (step === "action" || step === "target" || step === "confirm") return step;
    return "action";
  }

  function normalizeArenaCommandSheet(value) {
    const sheet = toText(value).toLowerCase();
    if (sheet === "conditions" || sheet === "log" || sheet === "retreat") return sheet;
    return "";
  }

  function setArenaCommandTab(value) {
    const arena = ensureArenaState();
    const next = normalizeArenaCommandTab(value);
    arena.commandTab = arena.commandTab === next && next !== "menu" ? "menu" : next;
    if (arena.commandTab === "action") {
      arena.commandStep = "action";
    }
    renderArena();
  }

  function activateArenaFocusSide(sideKey, cycleWhenAlreadyActive) {
    const arena = ensureArenaState();
    const side = sideKey === "heroes" ? "heroes" : "monsters";
    const battle = arena.battle && typeof arena.battle === "object" ? arena.battle : null;
    if (!battle) return;
    const groups = getBattleCombatants(battle);
    const list = side === "heroes" ? groups.heroes : groups.monsters;
    if (!Array.isArray(list) || !list.length) return;

    if (arena.focusSwitchSide === side) {
      if (cycleWhenAlreadyActive && list.length > 1) {
        cycleArenaViewedFocus(side, "next");
        return;
      }
      return;
    }

    arena.focusSwitchSide = side;
    if (side === "heroes") {
      if (!toText(arena.viewedHeroId)) {
        arena.viewedHeroId = toText(list[0] && list[0].id);
        arena.viewedHeroCursor = 0;
      } else if (!(arena.viewedHeroCursor >= 0 && arena.viewedHeroCursor < list.length)) {
        const idx = list.findIndex((entry) => toText(entry && entry.id) === toText(arena.viewedHeroId));
        arena.viewedHeroCursor = idx >= 0 ? idx : 0;
      }
    } else {
      if (!toText(arena.viewedMonsterId)) {
        arena.viewedMonsterId = toText(list[0] && list[0].id);
        arena.viewedMonsterCursor = 0;
      } else if (!(arena.viewedMonsterCursor >= 0 && arena.viewedMonsterCursor < list.length)) {
        const idx = list.findIndex((entry) => toText(entry && entry.id) === toText(arena.viewedMonsterId));
        arena.viewedMonsterCursor = idx >= 0 ? idx : 0;
      }
    }
    renderArena();
  }

  function clearArenaViewedFocus() {
    const arena = ensureArenaState();
    arena.viewedHeroId = "";
    arena.viewedMonsterId = "";
    arena.viewedHeroCursor = -1;
    arena.viewedMonsterCursor = -1;
    arena.focusSwitchSide = "";
  }

  function cycleArenaViewedFocus(sideKey, direction) {
    const arena = ensureArenaState();
    const battle = arena && arena.battle && typeof arena.battle === "object" ? arena.battle : null;
    if (!battle) return;
    const groups = getBattleCombatants(battle);
    const side = sideKey === "heroes" ? "heroes" : "monsters";
    const list = (side === "heroes" ? groups.heroes : groups.monsters).filter(Boolean);
    if (list.length <= 1) return;
    const cursorKey = side === "heroes" ? "viewedHeroCursor" : "viewedMonsterCursor";
    const idKey = side === "heroes" ? "viewedHeroId" : "viewedMonsterId";
    const currentId = toText(arena[idKey]);
    let index = Number.isInteger(arena[cursorKey]) ? arena[cursorKey] : -1;
    if (!(index >= 0 && index < list.length)) {
      index = list.findIndex((combatant) => toText(combatant && combatant.id) === currentId);
      if (index < 0) index = 0;
    }
    const delta = direction === "prev" ? -1 : 1;
    index = (index + delta + list.length) % list.length;
    arena[cursorKey] = index;
    arena[idKey] = toText(list[index] && list[index].id);
    arena.focusSwitchSide = side;
    renderArena();
  }

  function setArenaCommandStep(value) {
    const arena = ensureArenaState();
    arena.commandStep = normalizeArenaCommandStep(value);
    arena.commandSheet = "";
    renderArena();
  }

  function setArenaCommandSheet(value) {
    const arena = ensureArenaState();
    arena.commandSheet = normalizeArenaCommandSheet(value);
    renderArena();
  }

  function setArenaLogDrawerOpen(open) {
    const arena = ensureArenaState();
    arena.logDrawerOpen = open === true;
    renderArena();
  }

  function setArenaCommandAction(value) {
    const arena = ensureArenaState();
    arena.commandActionId = toText(value);
    arena.commandTargetIds = [];
    arena.commandStep = "target";
    arena.commandSheet = "";
    renderArena();
  }

  function getActiveArenaAction(battle, actionId) {
    const bid = toText(actionId);
    if (!battle || !bid) return null;
    const active = getActiveBattleCombatant(battle);
    if (!active) return null;
    const pool = Array.isArray(active.actions)
      ? active.actions
      : Array.isArray(active.combatActions)
      ? active.combatActions
      : Array.isArray(active.attacks)
      ? active.attacks
      : [];
    return pool.find((action) => toText(action && action.id) === bid) || null;
  }

  function isActionMultiTarget(action) {
    if (!action || typeof action !== "object") return false;
    const modeToken = normalizeToken(action.target && action.target.mode);
    if (modeToken === "area") return true;
    if (toText(action.type) === "save" && (modeToken === "" || modeToken === "single")) return true;
    const maxTargets = toFiniteNumber(action.target && action.target.maxTargets, NaN);
    if (Number.isFinite(maxTargets) && maxTargets > 1) return true;
    if (action.target && action.target.maxTargets == null && modeToken !== "single") return true;
    return false;
  }

  function setArenaCommandTargetChecked(targetId, checked) {
    const arena = ensureArenaState();
    const id = toText(targetId);
    if (!id) return;
    const battle = arena.battle && typeof arena.battle === "object" ? arena.battle : null;
    const selectedAction = getActiveArenaAction(battle, arena.commandActionId);
    const multiTarget = isActionMultiTarget(selectedAction);
    const selected = new Set(
      (Array.isArray(arena.commandTargetIds) ? arena.commandTargetIds : [])
        .map((entry) => toText(entry))
        .filter(Boolean)
    );
    if (checked) {
      if (!multiTarget) selected.clear();
      selected.add(id);
    }
    else selected.delete(id);
    arena.commandTargetIds = Array.from(selected);
    arena.selectedTargetId = arena.commandTargetIds[0] || "";
    arena.commandStep = "target";
    renderArena();
  }

  function executeArenaCommandAction() {
    const arena = ensureArenaState();
    const attackId = toText(arena.commandActionId);
    const targets = Array.isArray(arena.commandTargetIds)
      ? arena.commandTargetIds.map((id) => toText(id)).filter(Boolean)
      : [];
    if (!attackId) {
      arena.errorMessage = "W\u00e4hle zuerst eine Aktion aus.";
      renderArena();
      return;
    }
    if (!targets.length) {
      arena.errorMessage = "W\u00e4hle mindestens ein Ziel aus.";
      renderArena();
      return;
    }
    clearArenaViewedFocus();
    performHeroAttack(attackId, targets);
  }

  function executeArenaLastAction() {
    const arena = ensureArenaState();
    if (!arena.battle || arena.battle.status !== "active") return;
    const actorId = toText(arena.battle.activeCombatantId);
    const lastAction =
      arena.lastActionByActor && typeof arena.lastActionByActor === "object"
        ? toText(arena.lastActionByActor[actorId])
        : "";
    if (!lastAction) {
      arena.errorMessage = "F\u00fcr diesen Helden gibt es noch keine letzte Aktion.";
      renderArena();
      return;
    }
    const targets = Array.isArray(arena.commandTargetIds)
      ? arena.commandTargetIds.map((id) => toText(id)).filter(Boolean)
      : [];
    clearArenaViewedFocus();
    performHeroAttack(lastAction, targets);
  }

  function surrenderArenaBattle() {
    const arena = clearBattleState();
    arena.errorMessage = "Die Begegnung wurde aufgegeben.";
    renderArena();
  }

  function toggleBattleCondition(combatantId, conditionId) {
    const combat = getCombatApi();
    const arena = ensureArenaState();
    if (!combat || !arena.battle || arena.battle.status !== "active") return;
    if (typeof combat.toggleCombatantCondition !== "function") return;

    try {
      combat.toggleCombatantCondition(arena.battle, combatantId, conditionId);
      syncBattleState(arena.battle);
    } catch (error) {
      arena.errorMessage = error && error.message ? error.message : "Der Zustand konnte nicht geändert werden.";
    }

    renderArena();
  }

  function renderAvailabilityState(label, availability) {
    if (!availability || availability.ready) {
      return `<span class="arena-state-pill arena-state-pill--ready">${escapeText(label)}</span>`;
    }
    return `<span class="arena-state-pill arena-state-pill--locked">${escapeText(label)}</span>`;
  }

  function renderHeroPreview(hero, availability, recognizedHero) {
    if (!hero) {
      return `
        <article class="arena-preview-card arena-preview-card--empty">
          <p class="arena-preview-kicker">Held</p>
          <h4>Keine Heldenakte verfügbar</h4>
          <p>Lege zuerst mindestens einen Helden im Editor an.</p>
        </article>
      `;
    }

    const vitals = hero.vitals && typeof hero.vitals === "object" ? hero.vitals : {};
    const recognized = recognizedHero && recognizedHero.id === hero.id;
    const image = buildImageUrl(hero.image);

    return `
      <article class="arena-preview-card">
        <div class="arena-preview-head">
          <p class="arena-preview-kicker">Held${recognized ? " · erkannt" : ""}</p>
          ${renderAvailabilityState(availability && availability.ready ? "kampfbereit" : "noch unvollständig", availability)}
        </div>
        <div class="arena-combatant-line">
          ${
            image
              ? `<img class="arena-combatant-portrait" src="${escapeText(image)}" alt="Porträt von ${escapeText(hero.name)}" loading="lazy" />`
              : `<div class="arena-combatant-portrait arena-combatant-portrait--fallback" aria-hidden="true">🛡</div>`
          }
          <div>
            <h4>${escapeText(hero.name)}</h4>
            <p>${escapeText([hero.className, hero.subclass, hero.species].filter(Boolean).join(" · ") || "Heldenakte")}</p>
          </div>
        </div>
        <div class="arena-preview-stats">
          <span>Stufe ${escapeText(formatNumber(hero.level, "—"))}</span>
          <span>RK ${escapeText(formatNumber(vitals.armorClass, "—"))}</span>
          <span>LP ${escapeText(formatCurrentMax(vitals.hpCurrent, vitals.hpMax))}</span>
          <span>Ini ${escapeText(formatSigned(vitals.initiativeMod))}</span>
        </div>
        ${
          availability && !availability.ready && availability.reason
            ? `<p class="arena-preview-note">${escapeText(availability.reason)}</p>`
            : ""
        }
      </article>
    `;
  }

  function renderMonsterPreview(monster, availability, countValue) {
    if (!monster) {
      return `
        <article class="arena-preview-card arena-preview-card--empty">
          <p class="arena-preview-kicker">Monster</p>
          <h4>Kein Wesen ausgewählt</h4>
          <p>Wähle ein bekanntes Wesen aus dem Bestiarium.</p>
        </article>
      `;
    }

    const image =
      Array.isArray(monster.images) && monster.images.length ? buildImageUrl(monster.images[0]) : "";
    const combat = monster.combat && typeof monster.combat === "object" ? monster.combat : null;
    const count = Math.max(1, Math.floor(toFiniteNumber(countValue, 1)));

    return `
      <article class="arena-preview-card">
        <div class="arena-preview-head">
          <p class="arena-preview-kicker">Wesen</p>
          ${renderAvailabilityState(availability && availability.ready ? "kampfbereit" : "Kampfprofil fehlt", availability)}
        </div>
        <div class="arena-combatant-line">
          ${
            image
              ? `<img class="arena-combatant-portrait" src="${escapeText(image)}" alt="Akte von ${escapeText(monster.title || monster.name || "Wesen")}" loading="lazy" />`
              : `<div class="arena-combatant-portrait arena-combatant-portrait--fallback" aria-hidden="true">☠</div>`
          }
          <div>
            <h4>${escapeText(monster.title || monster.name || "Wesen")}</h4>
            <p>${escapeText([monster.type, monster.size, monster.cr ? `CR ${monster.cr}` : ""].filter(Boolean).join(" · ") || "Bestiarium-Akte")}</p>
          </div>
        </div>
        <div class="arena-preview-stats">
          <span>${escapeText(String(count))}x</span>
          <span>RK ${escapeText(formatNumber(combat && combat.armorClass, "—"))}</span>
          <span>LP ${escapeText(formatNumber(combat && combat.hpMax, "—"))}</span>
          <span>Ini ${escapeText(formatSigned(combat && combat.initiativeMod))}</span>
          <span>${escapeText(monster.habitat || monster.chapterName || "Kein Gebiet")}</span>
        </div>
        ${
          availability && !availability.ready && availability.reason
            ? `<p class="arena-preview-note">${escapeText(availability.reason)}</p>`
            : ""
        }
      </article>
    `;
  }

  function renderSetupSection(heroes, monsters, selectedHero, selectedMonster, recognizedHero) {
    const arena = ensureArenaState();
    const heroAvailability = getHeroAvailability(selectedHero);
    const selectedHeroes = getSelectedHeroRecords();
    const heroAvailabilities = selectedHeroes.map((hero) => ({ hero, availability: getHeroAvailability(hero) }));
    const monsterGroups = normalizeArenaMonsterGroups(arena.monsterGroups);
    const monsterGroupEntries = monsterGroups
      .map((group, index) => {
        const monster = getMonsterById(group.monsterId);
        if (!monster) return null;
        return {
          index,
          group,
          monster,
          availability: getMonsterAvailability(monster)
        };
      })
      .filter(Boolean);
    const canStart =
      !!selectedHeroes.length &&
      heroAvailabilities.every((item) => item.availability && item.availability.ready) &&
      !!monsterGroupEntries.length &&
      monsterGroupEntries.every((item) => item.availability && item.availability.ready);
    const hasBattle = !!(arena.battle && typeof arena.battle === "object");
    const duelOpen = arena.duelOpen === true;
    const storedBattle = !hasBattle ? readStoredArenaBattle() : null;
    const hasStoredSnapshot = !!(
      storedBattle &&
      storedBattle.battle &&
      isBattleSetupCompatibleWithData(storedBattle.battle)
    );
    const storedAtLabel = hasStoredSnapshot ? formatDateTime(storedBattle.savedAt) : "";
    const testScenarios = buildArenaTestScenarios(heroes, monsters);
    const scenarioButtons = testScenarios
      .map((scenario) => {
        const unavailableTitle = scenario.available
          ? ""
          : ' title="Dieses Szenario ist mit den aktuellen Daten noch nicht verfügbar."';
        return `
          <button
            type="button"
            class="filter-chip arena-action-button arena-test-button${scenario.available ? "" : " is-disabled"}"
            data-arena-action="load-test"
            data-test-id="${escapeText(scenario.id)}"
            ${scenario.available ? "" : "disabled"}
            ${unavailableTitle}
          >
            ${escapeText(scenario.label)}
          </button>
        `;
      })
      .join("");
    const ownerName = toText(state.ownerName);
    const blockedHero = heroAvailabilities.find((item) => item.availability && !item.availability.ready);
    const blockedMonsterEntry = monsterGroupEntries.find((item) => item.availability && !item.availability.ready);
    const addMonsterDefault = selectedMonster ? selectedMonster.id : monsters[0] ? monsters[0].id : "";
    const startHint = !heroes.length
      ? "Lege zuerst mindestens eine Heldenakte im Editor an."
      : !monsters.length
      ? "Im Bestiarium sind noch keine Wesen vorhanden."
      : !selectedHeroes.length
      ? "Wähle zuerst mindestens einen Helden aus."
      : !monsterGroupEntries.length
      ? "Füge zuerst mindestens eine Monstergruppe hinzu."
      : blockedHero
      ? blockedHero.availability.reason || "Mindestens ein ausgewählter Held ist noch nicht kampfbereit."
      : blockedMonsterEntry
      ? blockedMonsterEntry.availability.reason || "Mindestens eine Monstergruppe ist noch nicht kampfbereit."
      : "";
    const duelHint = hasBattle
      ? "Für die immersive Ansicht kannst du jetzt in den Duellraum wechseln."
      : "Starte zuerst eine Kampfprobe, um den Fokusraum zu öffnen.";

    const selectedHeroSet = new Set(selectedHeroes.map((hero) => hero.id));
    const heroOptions = heroes
      .map(
        (hero) => `
          <label class="arena-check-card${selectedHeroSet.has(hero.id) ? " is-selected" : ""}">
            <input
              type="checkbox"
              data-arena-hero-id="${escapeText(hero.id)}"
              ${selectedHeroSet.has(hero.id) ? "checked" : ""}
            />
            <span>
              <strong>${escapeText(hero.name)}</strong>
              <small>${escapeText([hero.className, hero.species].filter(Boolean).join(" · ") || "Heldenakte")}</small>
            </span>
          </label>
        `
      )
      .join("");

    const monsterOptions = monsters
      .map((monster) => {
        const ready = monster && monster.combat && monster.combat.ready === true && monster.combat.enabled === true;
        const suffix = ready ? "" : " · Profil fehlt";
        const label = monster.title || monster.name || monster.id;
        return `
          <option value="${escapeText(monster.id)}" ${addMonsterDefault && monster.id === addMonsterDefault ? "selected" : ""}>
            ${escapeText(label + suffix)}
          </option>
        `;
      })
      .join("");

    const monsterGroupRows = monsterGroupEntries
      .map((entry) => {
        const options = monsters
          .map((monster) => {
            const ready = monster && monster.combat && monster.combat.ready === true && monster.combat.enabled === true;
            const suffix = ready ? "" : " · Profil fehlt";
            const label = monster.title || monster.name || monster.id;
            return `
              <option value="${escapeText(monster.id)}" ${monster.id === entry.group.monsterId ? "selected" : ""}>
                ${escapeText(label + suffix)}
              </option>
            `;
          })
          .join("");
        return `
          <div class="arena-monster-group-row">
            <label>
              <span>Wesen ${entry.index + 1}</span>
              <select class="arena-select" data-arena-group-monster-index="${entry.index}">
                ${options}
              </select>
            </label>
            <label>
              <span>Anzahl</span>
              <input
                class="arena-select"
                type="number"
                min="1"
                max="12"
                step="1"
                value="${escapeText(String(entry.group.count || 1))}"
                data-arena-group-count-index="${entry.index}"
              />
            </label>
            <button
              type="button"
              class="filter-chip arena-action-button arena-action-button--danger"
              data-arena-action="remove-monster-group"
              data-group-index="${entry.index}"
              ${monsterGroupEntries.length > 1 ? "" : "disabled"}
            >
              Entfernen
            </button>
          </div>
        `;
      })
      .join("");

    const noticeHtml = recognizedHero
      ? `
          <article class="arena-banner arena-banner--recognized">
            <div>
              <p class="arena-banner-kicker">Persönliche Zuordnung</p>
              <h3>${escapeText(recognizedHero.name)} wurde als dein Held erkannt</h3>
              <p>${ownerName ? `Der Name „${escapeText(ownerName)}“` : "Dein eingetragener Name"} wurde automatisch dieser Akte zugeordnet.</p>
            </div>
          </article>
        `
      : ownerName
      ? `
          <article class="arena-banner arena-banner--hint">
            <div>
              <p class="arena-banner-kicker">Manuelle Auswahl</p>
              <h3>Kein Held für „${escapeText(ownerName)}“ erkannt</h3>
              <p>Du kannst die Kampfprobe trotzdem mit jeder bekannten Heldenakte starten.</p>
            </div>
          </article>
        `
      : `
          <article class="arena-banner arena-banner--hint">
            <div>
              <p class="arena-banner-kicker">Persönliche Auswahl</p>
              <h3>Trage deinen Namen in den Einstellungen ein</h3>
              <p>Dann wird in der Kampfprobe automatisch der passende Held vorausgewählt.</p>
            </div>
          </article>
        `;

    return `
      ${noticeHtml}
      <section class="arena-card arena-card--setup">
        <div class="arena-card-head">
          <div>
            <p class="arena-card-kicker">Trainingskreis</p>
            <h3>Duell vorbereiten</h3>
          </div>
          <span class="arena-chip">${hasBattle ? "Probe läuft" : "Bereit"}</span>
        </div>

        <div class="arena-setup-grid">
          <fieldset class="arena-field arena-fieldset">
            <legend>Helden</legend>
            <div class="arena-check-list">
              ${heroOptions || '<p class="arena-inline-note">Keine Helden verfügbar.</p>'}
            </div>
          </fieldset>

          <div class="arena-field arena-monster-builder">
            <span>Monstergruppen hinzufügen</span>
            <div class="arena-monster-builder-row">
              <select id="arena-monster-select" class="arena-select">
                ${monsterOptions || '<option value="">Keine Monster verfügbar</option>'}
              </select>
              <input
                id="arena-monster-count"
                class="arena-select"
                type="number"
                min="1"
                max="12"
                step="1"
                value="1"
              />
              <button
                type="button"
                class="filter-chip arena-action-button"
                data-arena-action="add-monster-group"
                ${monsters.length ? "" : "disabled"}
              >
                Hinzufügen
              </button>
            </div>
            <div class="arena-monster-group-list">
              ${monsterGroupRows || '<p class="arena-inline-note">Noch keine Monstergruppe gewählt.</p>'}
            </div>
          </div>
        </div>

        <div class="arena-preview-grid">
          ${
            selectedHeroes.length
              ? selectedHeroes.map((hero) => renderHeroPreview(hero, getHeroAvailability(hero), recognizedHero)).join("")
              : renderHeroPreview(selectedHero, heroAvailability, recognizedHero)
          }
          ${
            monsterGroupEntries.length
              ? monsterGroupEntries
                  .map((entry) => renderMonsterPreview(entry.monster, entry.availability, entry.group.count))
                  .join("")
              : renderMonsterPreview(selectedMonster, getMonsterAvailability(selectedMonster), 1)
          }
        </div>

        ${
          arena.errorMessage
            ? `<div class="arena-inline-note arena-inline-note--error">${escapeText(arena.errorMessage)}</div>`
            : ""
        }
        ${
          !canStart && startHint
            ? `<div class="arena-inline-note arena-inline-note--locked">${escapeText(startHint)}</div>`
            : ""
        }
        <div class="arena-inline-note arena-inline-note--hint">${escapeText(duelHint)}</div>

        <div class="arena-action-row">
          <button type="button" class="filter-chip arena-action-button is-active" data-arena-action="start" ${
            canStart ? "" : "disabled"
          } title="${escapeText(startHint || "Kampfprobe starten")}">
            &#9876; Kampfprobe starten
          </button>
          <button type="button" class="filter-chip arena-action-button" data-arena-action="open-duel" ${
            hasBattle ? "" : "disabled"
          }>
            ${duelOpen ? "Duellraum geöffnet" : "Duellraum öffnen"}
          </button>
          <button type="button" class="filter-chip arena-action-button" data-arena-action="restart" ${
            canStart || hasBattle ? "" : "disabled"
          }>
            Neu starten
          </button>
          <button type="button" class="filter-chip arena-action-button" data-arena-action="restore" ${
            hasStoredSnapshot ? "" : "disabled"
          }>
            Kampfstand laden
          </button>
          <button type="button" class="filter-chip arena-action-button" data-arena-action="open-monster" ${
            selectedMonster ? "" : "disabled"
          }>
            Zur Monsterakte
          </button>
        </div>
        ${
          hasStoredSnapshot
            ? `<p class="arena-storage-note">Gespeicherter Kampfstand gefunden${storedAtLabel ? ` (${escapeText(storedAtLabel)})` : ""}.</p>`
            : ""
        }
        <div class="arena-test-grid">
          <p class="arena-inline-note arena-inline-note--hint">Test-Szenarien</p>
          <div class="arena-action-row arena-action-row--tests">
            ${scenarioButtons}
          </div>
        </div>
      </section>
    `;
  }

  function renderArenaSetupStatus(arena) {
    const battle = arena && arena.battle && typeof arena.battle === "object" ? arena.battle : null;
    if (!battle) {
      return `
        <section class="arena-card arena-card--idle">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Fokusraum</p>
              <h3>Duellraum noch nicht aktiv</h3>
            </div>
            <span class="arena-chip">Bereit</span>
          </div>
          <p class="arena-inline-note">
            Stelle oben eine Begegnung zusammen und starte die Kampfprobe. Danach öffnest du den Duellraum als eigenen Fokusbereich.
          </p>
        </section>
      `;
    }

    const finished = battle.status === "finished";
    const combatants = getBattleCombatants(battle);
    const livingHeroes = combatants.heroes.filter((combatant) => toFiniteNumber(combatant && combatant.hpCurrent, 0) > 0).length;
    const livingMonsters = combatants.monsters.filter((combatant) => toFiniteNumber(combatant && combatant.hpCurrent, 0) > 0).length;
    const active = getActiveBattleCombatant(battle);

    return `
      <section class="arena-card arena-card--duel-status">
        <div class="arena-card-head">
          <div>
            <p class="arena-card-kicker">Fokusraum</p>
            <h3>${finished ? "Duell beendet" : "Duell bereit"}</h3>
          </div>
          <span class="arena-chip">${finished ? "Beendet" : "Aktiv"}</span>
        </div>
        <div class="arena-status-strip">
          <span class="arena-status-cell"><strong>Runde</strong>${escapeText(String(battle.round || 1))}</span>
          <span class="arena-status-cell"><strong>Am Zug</strong>${escapeText(active ? active.name : "—")}</span>
          <span class="arena-status-cell"><strong>Helden</strong>${escapeText(String(livingHeroes))}</span>
          <span class="arena-status-cell"><strong>Monster</strong>${escapeText(String(livingMonsters))}</span>
        </div>
        <div class="arena-action-row">
          <button type="button" class="filter-chip arena-action-button is-active" data-arena-action="open-duel">
            Duellraum öffnen
          </button>
        </div>
      </section>
    `;
  }

  function getBattleCombatants(battle) {
    const combatants = Array.isArray(battle && battle.combatants) ? battle.combatants : [];
    return {
      heroes: combatants.filter((combatant) => combatant && (combatant.side === "hero" || combatant.side === "heroes")),
      monsters: combatants.filter((combatant) => combatant && (combatant.side === "monster" || combatant.side === "monsters"))
    };
  }

  function renderHpBar(current, max) {
    const currentValue = toFiniteNumber(current, 0);
    const maxValue = Math.max(0, toFiniteNumber(max, 0));
    const percent = maxValue > 0 ? Math.max(0, Math.min(100, (currentValue / maxValue) * 100)) : 0;
    return `
      <div class="arena-hp-row">
        <div class="arena-hp-bar" aria-hidden="true"><span style="width:${percent}%"></span></div>
        <strong>${escapeText(formatCurrentMax(currentValue, maxValue))}</strong>
      </div>
    `;
  }

  function getConditionDefinitions() {
    const combat = getCombatApi();
    return combat && combat.conditions
      ? combat.conditions
      : {
          poisoned: { id: "poisoned", label: "Vergiftet" },
          prone: { id: "prone", label: "Liegend" },
          restrained: { id: "restrained", label: "Festgesetzt" },
          frightened: { id: "frightened", label: "Verängstigt" }
        };
  }

  function getConditionIds(combatant) {
    return new Set(
      (Array.isArray(combatant && combatant.conditions) ? combatant.conditions : [])
        .map((condition) => toText(condition && (condition.id || condition.type || condition.name)))
        .filter(Boolean)
    );
  }

  function renderStageConditionBadges(combatant) {
    const definitions = getConditionDefinitions();
    const labels = (Array.isArray(combatant && combatant.conditions) ? combatant.conditions : [])
      .map((condition) => {
        const id = toText(condition && (condition.id || condition.type || condition.name));
        if (!id) return "";
        const definition = definitions[id] || {};
        return toText(definition.label || condition.label || id);
      })
      .filter(Boolean)
      .slice(0, 3);
    if (!labels.length) return "";
    return `<div class="arena-stage-conditions">${labels
      .map((label) => `<span class="arena-stage-condition">${escapeText(label)}</span>`)
      .join("")}</div>`;
  }

  function renderConditionToggles(combatant, isFinished) {
    if (!combatant) return "";
    const definitions = getConditionDefinitions();
    const activeIds = getConditionIds(combatant);
    const items = Object.keys(definitions)
      .map((id) => {
        const definition = definitions[id] || { id, label: id };
        const active = activeIds.has(id);
        return `
          <button
            type="button"
            class="arena-condition-chip${active ? " is-active" : ""}"
            data-arena-action="toggle-condition"
            data-combatant-id="${escapeText(combatant.id)}"
            data-condition-id="${escapeText(id)}"
            aria-pressed="${active ? "true" : "false"}"
            ${isFinished ? "disabled" : ""}
          >
            ${escapeText(definition.label || id)}
          </button>
        `;
      })
      .join("");

    return `<div class="arena-condition-row" aria-label="Zustände">${items}</div>`;
  }

  function renderCombatantCard(combatant, isActive, isFinished) {
    if (!combatant) return "";
    const defeated = toFiniteNumber(combatant.hpCurrent, 0) <= 0;
    const initiativeText =
      combatant.initiative && typeof combatant.initiative === "object"
        ? `${combatant.initiative.total} (${combatant.initiative.natural} ${combatant.initiative.modifier >= 0 ? "+" : "-"} ${Math.abs(combatant.initiative.modifier)})`
        : "—";

    return `
      <article class="arena-combatant-card${isActive && !isFinished ? " is-active" : ""}${defeated ? " is-defeated" : ""}">
        <div class="arena-combatant-head">
          <div>
            <p class="arena-combatant-kicker">${escapeText(combatant.side === "hero" || combatant.side === "heroes" ? "Held" : "Wesen")}</p>
            <h4>${escapeText(combatant.name)}</h4>
          </div>
          <span class="arena-combatant-badge">${escapeText(defeated ? "Besiegt" : isActive && !isFinished ? "Am Zug" : "Bereit")}</span>
        </div>
        ${renderHpBar(combatant.hpCurrent, combatant.hpMax)}
        <div class="arena-combatant-meta">
          <span>RK ${escapeText(formatNumber(combatant.armorClass, "—"))}</span>
          <span>Initiative ${escapeText(initiativeText)}</span>
        </div>
        ${renderConditionToggles(combatant, isFinished)}
      </article>
    `;
  }

  function renderBattleControls(battle, heroCombatant) {
    if (!battle || battle.status !== "active" || !heroCombatant) return "";
    if (toText(battle.activeCombatantId) !== toText(heroCombatant.id)) {
      return `
        <section class="arena-card arena-card--actions">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Aktiver Zug</p>
              <h3>Das Wesen reagiert automatisch</h3>
            </div>
          </div>
          <p class="arena-inline-note">Der Monsterzug wird im Hintergrund ausgewertet. Nach jedem Gegenzug bist du wieder am Zug.</p>
        </section>
      `;
    }

    const actions = Array.isArray(heroCombatant.attacks) ? heroCombatant.attacks : [];
    return `
      <section class="arena-card arena-card--actions">
        <div class="arena-card-head">
          <div>
            <p class="arena-card-kicker">Aktiver Zug</p>
            <h3>${escapeText(heroCombatant.name)} handelt</h3>
          </div>
          <span class="arena-chip">Runde ${escapeText(String(battle.round || 1))}</span>
        </div>
        <div class="arena-attack-grid">
          ${actions
            .map((attack) => {
              const damageSummary = (Array.isArray(attack.damage) ? attack.damage : [])
                .map((part) => [part.formula, part.type].filter(Boolean).join(" "))
                .filter(Boolean)
                .join(" · ");
              return `
                <button
                  type="button"
                  class="arena-attack-button"
                  data-arena-action="attack"
                  data-attack-id="${escapeText(attack.id)}"
                >
                  <strong>${escapeText(attack.name)}</strong>
                  <span>+${escapeText(String(toFiniteNumber(attack.attackBonus, 0)))} auf Treffer</span>
                  <small>${escapeText(damageSummary || "Kein Schadenswurf")}</small>
                </button>
              `;
            })
            .join("")}
        </div>
        ${
          !actions.length
            ? '<div class="arena-inline-note arena-inline-note--locked">Dieser Held hat aktuell keine spielbare Aktion mit vollständigen Kampfdaten.</div>'
            : ""
        }
      </section>
    `;
  }

  function renderCombatantGroup(title, combatants, activeId, isFinished) {
    const list = Array.isArray(combatants) ? combatants : [];
    if (!list.length) {
      return `
        <div class="arena-combatant-group">
          <p class="arena-combatant-kicker">${escapeText(title)}</p>
          <p class="arena-inline-note">Keine Teilnehmer.</p>
        </div>
      `;
    }

    return `
      <div class="arena-combatant-group">
        <div class="arena-group-head">
          <p class="arena-combatant-kicker">${escapeText(title)}</p>
          <span class="arena-chip">${escapeText(String(list.length))}</span>
        </div>
        <div class="arena-combatant-stack">
          ${list.map((combatant) => renderCombatantCard(combatant, activeId === toText(combatant.id), isFinished)).join("")}
        </div>
      </div>
    `;
  }

  function getInitiativeOrder(battle) {
    const combatants = Array.isArray(battle && battle.combatants) ? battle.combatants.filter(Boolean) : [];
    const byId = new Map(combatants.map((combatant) => [toText(combatant.id), combatant]));
    const orderedIds = Array.isArray(battle && battle.order) ? battle.order.map((id) => toText(id)).filter(Boolean) : [];
    const seen = new Set();
    const ordered = [];

    orderedIds.forEach((id) => {
      if (seen.has(id) || !byId.has(id)) return;
      seen.add(id);
      ordered.push(byId.get(id));
    });

    combatants.forEach((combatant) => {
      const id = toText(combatant.id);
      if (!id || seen.has(id)) return;
      seen.add(id);
      ordered.push(combatant);
    });

    return ordered;
  }

  function renderInitiativeRail(battle) {
    const activeId = toText(battle && battle.activeCombatantId);
    const ordered = getInitiativeOrder(battle);
    if (!ordered.length) return "";

    const items = ordered
      .map((combatant) => {
        const combatantId = toText(combatant.id);
        const defeated = toFiniteNumber(combatant.hpCurrent, 0) <= 0;
        const isActive = combatantId === activeId && battle.status === "active" && !defeated;
        const sideClass = combatant.side === "hero" || combatant.side === "heroes" ? "is-hero" : "is-monster";
        return `
          <li class="arena-initiative-item ${sideClass}${isActive ? " is-active" : ""}${defeated ? " is-defeated" : ""}">
            <span class="arena-initiative-name">${escapeText(combatant.name)}</span>
            <span class="arena-initiative-meta">
              INI ${escapeText(formatNumber(combatant && combatant.initiative ? combatant.initiative.total : null, "—"))}
            </span>
          </li>
        `;
      })
      .join("");

    return `
      <section class="arena-initiative-panel" aria-label="Initiative">
        <p class="arena-combatant-kicker">Initiative</p>
        <ol class="arena-initiative-rail">${items}</ol>
      </section>
    `;
  }

  function renderConditionPreview(combatant) {
    const conditions = Array.isArray(combatant && combatant.conditions) ? combatant.conditions : [];
    if (!conditions.length) {
      return `<span class="arena-mini-condition arena-mini-condition--empty">Keine Zust&auml;nde</span>`;
    }
    return conditions
      .slice(0, 2)
      .map((condition) => `<span class="arena-mini-condition">${escapeText(toText(condition.label || condition.id))}</span>`)
      .join("");
  }

  function getRecentDamageTargetIds(battle) {
    const log = Array.isArray(battle && battle.log) ? battle.log : [];
    if (!log.length) return new Set();
    const targetIds = new Set();
    for (let i = log.length - 1, scanned = 0; i >= 0 && scanned < 4; i -= 1, scanned += 1) {
      const entry = log[i];
      if (!entry || typeof entry !== "object") continue;
      const type = toText(entry.type);
      if (type !== "attack" && type !== "save") continue;
      if (type === "attack" && !(entry.attack && entry.attack.hit === true)) continue;
      if (type === "save" && !(entry.damage && toFiniteNumber(entry.damage.total, 0) > 0)) continue;

      const single = toText(entry.targetId);
      if (single) targetIds.add(single);
      const multi = Array.isArray(entry.targetIds) ? entry.targetIds : [];
      multi.map((id) => toText(id)).filter(Boolean).forEach((id) => targetIds.add(id));
      break;
    }
    return targetIds;
  }

  function getCombatantSideToken(battle, combatantId) {
    const id = toText(combatantId);
    if (!id) return "";
    const combatants = Array.isArray(battle && battle.combatants) ? battle.combatants : [];
    const combatant = combatants.find((entry) => toText(entry && entry.id) === id);
    const token = normalizeToken(combatant && combatant.side);
    if (token === "hero" || token === "heroes") return "heroes";
    if (token === "monster" || token === "monsters") return "monsters";
    return "";
  }

  function normalizeImpactType(typeRaw) {
    const token = normalizeToken(typeRaw);
    if (!token) return "physical";
    if (token.includes("blitz") || token.includes("lightning") || token.includes("strom")) return "lightning";
    if (token.includes("feuer") || token.includes("fire")) return "fire";
    if (token.includes("frost") || token.includes("eis") || token.includes("cold")) return "cold";
    if (token.includes("gift") || token.includes("poison")) return "poison";
    if (token.includes("saure") || token.includes("saeure") || token.includes("acid")) return "acid";
    if (token.includes("nekrot") || token.includes("necrot")) return "necrotic";
    if (token.includes("gleiss") || token.includes("strahl") || token.includes("radiant")) return "radiant";
    if (token.includes("schall") || token.includes("donner") || token.includes("thunder")) return "thunder";
    if (token.includes("ark") || token.includes("arcane") || token.includes("kraft") || token.includes("force")) return "force";
    if (token.includes("psych") || token.includes("geist")) return "psychic";
    return "physical";
  }

  function collectImpactTypesFromEntry(entry) {
    const types = [];
    if (!entry || typeof entry !== "object") return types;

    const directParts = Array.isArray(entry.damage && entry.damage.parts) ? entry.damage.parts : [];
    directParts.forEach((part) => {
      if (toFiniteNumber(part && part.total, 0) <= 0) return;
      const label = toText(part && part.type);
      if (label) types.push(label);
    });

    const saveResults = Array.isArray(entry.save && entry.save.results) ? entry.save.results : [];
    saveResults.forEach((result) => {
      const parts = Array.isArray(result && result.damage && result.damage.parts) ? result.damage.parts : [];
      parts.forEach((part) => {
        if (toFiniteNumber(part && part.total, 0) <= 0) return;
        const label = toText(part && part.type);
        if (label) types.push(label);
      });
    });
    return types;
  }

  function collectImpactTargetIds(entry) {
    const targetIds = new Set();
    const direct = toText(entry && entry.targetId);
    if (direct) targetIds.add(direct);
    const grouped = Array.isArray(entry && entry.targetIds) ? entry.targetIds : [];
    grouped.map((id) => toText(id)).filter(Boolean).forEach((id) => targetIds.add(id));

    const saveResults = Array.isArray(entry && entry.save && entry.save.results) ? entry.save.results : [];
    saveResults
      .map((result) => toText(result && result.targetId))
      .filter(Boolean)
      .forEach((id) => targetIds.add(id));

    return Array.from(targetIds);
  }

  function getLatestStageImpact(battle) {
    const log = Array.isArray(battle && battle.log) ? battle.log : [];
    if (!log.length) return null;

    for (let i = log.length - 1; i >= 0; i -= 1) {
      const entry = log[i];
      if (!entry || typeof entry !== "object") continue;
      const type = toText(entry.type);
      if (type !== "attack" && type !== "save") continue;

      const isAttackHit = type === "attack" ? entry.attack && entry.attack.hit === true : false;
      const hasDamage = toFiniteNumber(entry && entry.damage && entry.damage.total, 0) > 0;
      if (type === "attack" && (!isAttackHit || !hasDamage)) continue;
      if (type === "save" && !hasDamage) continue;

      const actorId = toText(entry.actorId);
      const targetIds = collectImpactTargetIds(entry);
      if (!actorId || !targetIds.length) continue;

      const actorSide = getCombatantSideToken(battle, actorId);
      if (!actorSide) continue;

      const typeLabels = collectImpactTypesFromEntry(entry);
      const typeTheme = normalizeImpactType(typeLabels[0] || "");

      return {
        logId: toText(entry.id) || "log@" + String(i),
        actorId,
        targetIds,
        direction: actorSide === "monsters" ? "monster-to-hero" : "hero-to-monster",
        typeTheme,
        critical: !!(type === "attack" && entry.attack && entry.attack.critical === true)
      };
    }

    return null;
  }

  function getStageImpactForRender(battle) {
    const arena = ensureArenaState();
    const now = Date.now();
    const latest = getLatestStageImpact(battle);

    if (!latest) {
      arena.stageImpact = null;
      arena.stageImpactLogId = "";
      arena.stageImpactUntil = 0;
      arena.stageImpactPending = false;
      return null;
    }

    if (latest.logId !== arena.stageImpactLogId) {
      arena.stageImpactLogId = latest.logId;
      arena.stageImpactUntil = now + ARENA_STAGE_IMPACT_MS;
      arena.stageImpact = latest;
      arena.stageImpactPending = true;
    }

    if (!arena.stageImpactPending) return null;
    if (now > arena.stageImpactUntil) {
      arena.stageImpactPending = false;
      return null;
    }

    arena.stageImpactPending = false;
    return arena.stageImpact;
  }

  function renderStageImpact(stageImpact) {
    if (!stageImpact || typeof stageImpact !== "object") return "";
    const direction = toText(stageImpact.direction) === "monster-to-hero" ? "monster-to-hero" : "hero-to-monster";
    const typeTheme = toText(stageImpact.typeTheme) || "physical";
    return `
      <div
        class="arena-stage-impact is-dir-${escapeText(direction)} is-type-${escapeText(typeTheme)}${stageImpact.critical ? " is-critical" : ""}"
        aria-hidden="true"
      >
        <span class="arena-stage-impact-trail"></span>
        <span class="arena-stage-impact-bolt"></span>
      </div>
    `;
  }

  function renderEncounterMiniCard(combatant, isActive, isFinished, hitTargetIds) {
    if (!combatant) return "";
    const defeated = toFiniteNumber(combatant.hpCurrent, 0) <= 0;
    const combatantId = toText(combatant.id);
    const recentlyHit = !!(hitTargetIds && hitTargetIds.has(combatantId));
    const initiative =
      combatant && combatant.initiative && typeof combatant.initiative === "object"
        ? formatNumber(combatant.initiative.total, "—")
        : "—";

    return `
      <article class="arena-mini-card${isActive && !isFinished ? " is-active" : ""}${defeated ? " is-defeated" : ""}${recentlyHit ? " is-hit" : ""}">
        <div class="arena-mini-head">
          <p class="arena-mini-role">${escapeText(combatant.side === "hero" || combatant.side === "heroes" ? "Held" : "Wesen")}</p>
          <h4>${escapeText(combatant.name)}</h4>
        </div>
        ${renderHpBar(combatant.hpCurrent, combatant.hpMax)}
        <div class="arena-mini-strip" role="list" aria-label="Kampfwerte">
          <span class="arena-mini-strip-item" role="listitem"><strong>RK</strong>${escapeText(formatNumber(combatant.armorClass, "—"))}</span>
          <span class="arena-mini-strip-item" role="listitem"><strong>INI</strong>${escapeText(initiative)}</span>
          <span class="arena-mini-strip-item" role="listitem"><strong>Status</strong>${escapeText(defeated ? "Besiegt" : isActive && !isFinished ? "Am Zug" : "Bereit")}</span>
        </div>
        <div class="arena-mini-status-row">
          <div class="arena-mini-conditions">${renderConditionPreview(combatant)}</div>
        </div>
      </article>
    `;
  }

  function renderEncounterRoster(title, sideKey, combatants, activeId, isFinished, hitTargetIds) {
    const list = Array.isArray(combatants) ? combatants : [];
    if (!list.length) {
      return `
        <section class="arena-encounter-side arena-encounter-side--${escapeText(sideKey || "neutral")}">
          <div class="arena-group-head">
            <p class="arena-combatant-kicker">${escapeText(title)}</p>
            <span class="arena-chip">0</span>
          </div>
          <p class="arena-inline-note">Keine Teilnehmer.</p>
        </section>
      `;
    }

    return `
      <section class="arena-encounter-side arena-encounter-side--${escapeText(sideKey || "neutral")}">
        <div class="arena-group-head">
          <p class="arena-combatant-kicker">${escapeText(title)}</p>
          <span class="arena-chip">${escapeText(String(list.length))}</span>
        </div>
        <div class="arena-encounter-stack">
          ${list
            .map((combatant) => renderEncounterMiniCard(combatant, activeId === toText(combatant.id), isFinished, hitTargetIds))
            .join("")}
        </div>
      </section>
    `;
  }

  function getStageFocusCombatants(battle, recentHitTargetIds) {
    const arena = ensureArenaState();
    const groups = getBattleCombatants(battle);
    const active = getActiveBattleCombatant(battle);
    const activeId = toText(active && active.id);
    const heroActive = (Array.isArray(groups.heroes) ? groups.heroes : []).find(
      (combatant) => toText(combatant && combatant.id) === activeId
    );
    const monsterActive = (Array.isArray(groups.monsters) ? groups.monsters : []).find(
      (combatant) => toText(combatant && combatant.id) === activeId
    );
    const firstLivingHero =
      (Array.isArray(groups.heroes) ? groups.heroes : []).find((combatant) => toFiniteNumber(combatant && combatant.hpCurrent, 0) > 0) ||
      null;
    const firstLivingMonster =
      (Array.isArray(groups.monsters) ? groups.monsters : []).find((combatant) => toFiniteNumber(combatant && combatant.hpCurrent, 0) > 0) ||
      null;
    const hitIds = recentHitTargetIds instanceof Set ? recentHitTargetIds : new Set();
    const hitHero = (Array.isArray(groups.heroes) ? groups.heroes : []).find((combatant) =>
      hitIds.has(toText(combatant && combatant.id))
    );
    const hitMonster = (Array.isArray(groups.monsters) ? groups.monsters : []).find((combatant) =>
      hitIds.has(toText(combatant && combatant.id))
    );
    const heroList = Array.isArray(groups.heroes) ? groups.heroes : [];
    const monsterList = Array.isArray(groups.monsters) ? groups.monsters : [];
    const viewedHeroByCursor =
      Number.isInteger(arena.viewedHeroCursor) && arena.viewedHeroCursor >= 0 && arena.viewedHeroCursor < heroList.length
        ? heroList[arena.viewedHeroCursor]
        : null;
    const viewedMonsterByCursor =
      Number.isInteger(arena.viewedMonsterCursor) && arena.viewedMonsterCursor >= 0 && arena.viewedMonsterCursor < monsterList.length
        ? monsterList[arena.viewedMonsterCursor]
        : null;
    const viewedHero = viewedHeroByCursor || heroList.find(
      (combatant) => toText(combatant && combatant.id) === toText(arena.viewedHeroId)
    );
    const viewedMonster = viewedMonsterByCursor || monsterList.find(
      (combatant) => toText(combatant && combatant.id) === toText(arena.viewedMonsterId)
    );

    return {
      heroes: groups.heroes,
      monsters: groups.monsters,
      heroFocus: viewedHero || hitHero || heroActive || firstLivingHero || (groups.heroes[0] || null),
      monsterFocus: viewedMonster || hitMonster || monsterActive || firstLivingMonster || (groups.monsters[0] || null),
    };
  }

  function renderStagePortrait(combatant, sideKey, options) {
    const opts = options && typeof options === "object" ? options : {};
    const sideClass = sideKey === "hero" || sideKey === "heroes" ? "hero" : "monster";
    const className = [
      "arena-stage-portrait",
      "arena-stage-portrait--" + sideClass,
      opts.isImpactSource ? "is-impact-source" : "",
      opts.isImpactTarget ? "is-impact-target" : ""
    ]
      .filter(Boolean)
      .join(" ");
    if (!combatant) {
      return `<div class="arena-stage-portrait arena-stage-portrait--${escapeText(sideKey)} is-missing"><span>Kein Kämpfer</span></div>`;
    }
    const spriteRaw = getArenaSpriteRaw(combatant);
    const spriteUrl = spriteRaw ? buildImageUrl(spriteRaw) : "";
    if (!spriteUrl) {
      return `
        <div class="${escapeText(className)} is-missing">
          <span>${escapeText(combatant.name)}</span>
        </div>
      `;
    }
    return `
      <div
        class="${escapeText(className)}"
        data-arena-action="select-focus-side"
        data-side="${escapeText(sideClass === "hero" ? "heroes" : "monsters")}"
      >
        <img src="${escapeText(spriteUrl)}" alt="${escapeText(combatant.name)}" loading="lazy" decoding="async" />
      </div>
    `;
  }

  function renderStageStatusCard(combatant, sideKey, isActive) {
    if (!combatant) return "";
    const defeated = toFiniteNumber(combatant.hpCurrent, 0) <= 0;
    const isHeroSide = sideKey === "hero" || sideKey === "heroes";
    const roleMeta =
      isHeroSide
        ? [
            toText(combatant.meta && combatant.meta.className),
            toText(combatant.meta && combatant.meta.level) ? "Lv " + toText(combatant.meta.level) : "",
            "RK " + formatNumber(combatant.armorClass, "—"),
            "INI " + formatNumber(combatant && combatant.initiative ? combatant.initiative.total : null, "—")
          ]
        : [
            toText(combatant.meta && combatant.meta.type),
            toText(combatant.meta && combatant.meta.cr) ? "HG " + toText(combatant.meta.cr) : "",
            "RK " + formatNumber(combatant.armorClass, "—"),
            "INI " + formatNumber(combatant && combatant.initiative ? combatant.initiative.total : null, "—")
          ];
    const metaLabel = roleMeta.filter(Boolean).join(" · ");
    return `
      <article
        class="arena-stage-status arena-stage-status--${escapeText(sideKey)}${isActive && !defeated ? " is-active" : ""}${defeated ? " is-defeated" : ""}"
        data-arena-action="select-focus-side"
        data-side="${escapeText(sideKey === "hero" || sideKey === "heroes" ? "heroes" : "monsters")}"
      >
        <h4>${escapeText(combatant.name)}</h4>
        ${metaLabel ? `<p class="arena-stage-status-meta">${escapeText(metaLabel)}</p>` : ""}
        ${renderHpBar(combatant.hpCurrent, combatant.hpMax)}
        ${renderStageConditionBadges(combatant)}
        <div class="arena-stage-status-stats">
          <span><strong>RK</strong>${escapeText(formatNumber(combatant.armorClass, "—"))}</span>
          <span><strong>INI</strong>${escapeText(formatNumber(combatant && combatant.initiative ? combatant.initiative.total : null, "—"))}</span>
        </div>
      </article>
    `;
  }

  function renderTeamStripRow(sideKey, combatants, activeId, isFinished, hitTargetIds) {
    const list = Array.isArray(combatants) ? combatants : [];
    if (!list.length) return "";
    return `
      <div class="arena-team-strip arena-team-strip--${escapeText(sideKey)}" aria-label="${escapeText(sideKey === "heroes" ? "Heldengruppe" : "Monstergruppe")}">
        ${list
          .map((combatant) => renderEncounterMiniCard(combatant, activeId === toText(combatant.id), isFinished, hitTargetIds))
          .join("")}
      </div>
    `;
  }

  function renderStageFocusSwitch(side, count, isVisible) {
    if (!Number.isFinite(count) || count <= 1 || isVisible !== true) return "";
    const sideKey = side === "heroes" ? "heroes" : "monsters";
    const label = sideKey === "heroes" ? "Helden" : "Monster";
    return `
      <div class="arena-stage-switch arena-stage-switch--${escapeText(sideKey)}" aria-label="${escapeText(label)} durchschalten">
        <button
          type="button"
          class="arena-stage-switch-btn arena-stage-switch-btn--left"
          data-arena-action="cycle-focus"
          data-side="${escapeText(sideKey)}"
          data-dir="prev"
          aria-label="${escapeText(label)} zurück"
        >
          ‹
        </button>
        <button
          type="button"
          class="arena-stage-switch-btn arena-stage-switch-btn--right"
          data-arena-action="cycle-focus"
          data-side="${escapeText(sideKey)}"
          data-dir="next"
          aria-label="${escapeText(label)} vor"
        >
          ›
        </button>
      </div>
    `;
  }

  function renderBattleStageV2(battle, activeId, finished, recentHitTargetIds) {
    const arena = ensureArenaState();
    const focus = getStageFocusCombatants(battle, recentHitTargetIds);
    const background = resolveArenaBackground(battle);
    const activeCombatant = getActiveBattleCombatant(battle);
    const stageImpact = getStageImpactForRender(battle);
    const impactActorId = toText(stageImpact && stageImpact.actorId);
    const impactTargetIds = new Set(
      (Array.isArray(stageImpact && stageImpact.targetIds) ? stageImpact.targetIds : [])
        .map((id) => toText(id))
        .filter(Boolean)
    );
    const heroFocusId = toText(focus.heroFocus && focus.heroFocus.id);
    const monsterFocusId = toText(focus.monsterFocus && focus.monsterFocus.id);
    const heroActive = toText(activeCombatant && activeCombatant.id) === toText(focus.heroFocus && focus.heroFocus.id);
    const monsterActive = toText(activeCombatant && activeCombatant.id) === toText(focus.monsterFocus && focus.monsterFocus.id);
    const focusSwitchSide = toText(arena.focusSwitchSide).toLowerCase();

    return `
      <section class="arena-card arena-card--encounter arena-zone arena-zone--stage">
        <div class="arena-card-head">
          <div>
            <p class="arena-card-kicker">Kampfarena</p>
            <h3>${finished ? "Die Probe ist entschieden" : "Begegnung läuft"}</h3>
          </div>
          <span class="arena-chip">${escapeText(finished ? "Beendet" : "Aktiv")}</span>
        </div>
        <div class="arena-stage-screen"${background ? ` style="--arena-bg:url('${escapeText(background)}')"` : ""}>
          <div class="arena-stage-backdrop" aria-hidden="true"></div>
          <div class="arena-stage-platform arena-stage-platform--monster" aria-hidden="true"></div>
          <div class="arena-stage-platform arena-stage-platform--hero" aria-hidden="true"></div>
          ${renderStageImpact(stageImpact)}
          <div class="arena-stage-lane arena-stage-lane--monster">
            ${renderStageStatusCard(focus.monsterFocus, "monster", monsterActive)}
            ${renderStagePortrait(focus.monsterFocus, "monster", {
              isImpactSource: impactActorId && impactActorId === monsterFocusId,
              isImpactTarget: impactTargetIds.has(monsterFocusId)
            })}
            ${renderStageFocusSwitch(
              "monsters",
              Array.isArray(focus.monsters) ? focus.monsters.length : 0,
              focusSwitchSide === "monsters"
            )}
          </div>
          <div class="arena-stage-lane arena-stage-lane--hero">
            ${renderStagePortrait(focus.heroFocus, "hero", {
              isImpactSource: impactActorId && impactActorId === heroFocusId,
              isImpactTarget: impactTargetIds.has(heroFocusId)
            })}
            ${renderStageStatusCard(focus.heroFocus, "hero", heroActive)}
            ${renderStageFocusSwitch(
              "heroes",
              Array.isArray(focus.heroes) ? focus.heroes.length : 0,
              focusSwitchSide === "heroes"
            )}
          </div>
          <section class="arena-card arena-zone arena-zone--hud arena-overlay-hud">
            <div class="arena-status-strip">
              <span class="arena-status-cell"><strong>Runde</strong>${escapeText(String(battle.round || 1))}</span>
              <span class="arena-status-cell"><strong>Am Zug</strong>${escapeText(activeCombatant ? activeCombatant.name : "—")}</span>
            </div>
            ${
              battle.lastResult
                ? `<div class="arena-inline-note arena-inline-note--result">${escapeText(battle.lastResult)}</div>`
                : ""
            }
          </section>
          <section class="arena-zone arena-zone--command arena-overlay-command" aria-label="Befehlsmenü">
            ${renderBattleCommandPanelV2(battle)}
          </section>
        </div>
        ${renderTeamStripRow("monsters", focus.monsters, activeId, finished, recentHitTargetIds)}
        ${renderTeamStripRow("heroes", focus.heroes, activeId, finished, recentHitTargetIds)}
      </section>
    `;
  }

  function getActiveBattleCombatant(battle) {
    const activeId = toText(battle && battle.activeCombatantId);
    return Array.isArray(battle && battle.combatants)
      ? battle.combatants.find((combatant) => combatant && combatant.id === activeId) || null
      : null;
  }

  function getLivingTargetsForActor(battle, actor) {
    if (!battle || !actor || !Array.isArray(battle.combatants)) return [];
    return battle.combatants.filter((combatant) => {
      if (!combatant || toFiniteNumber(combatant.hpCurrent, 0) <= 0) return false;
      return combatant.id !== actor.id;
    });
  }

  function renderBattleCommandPanelV2(battle) {
    if (!battle || battle.status !== "active") return "";
    const arena = ensureArenaState();
    const active = getActiveBattleCombatant(battle);
    if (!active) return "";
    const activeIsHero = active.side === "hero" || active.side === "heroes";

    if (!activeIsHero) {
      return `
        <section class="arena-card arena-card--actions">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Aktiver Zug</p>
              <h3>${escapeText(active.name)} handelt automatisch</h3>
            </div>
          </div>
          <p class="arena-inline-note">Monsterzüge werden direkt ausgewertet, bis wieder ein Held am Zug ist.</p>
        </section>
      `;
    }

    const targets = getLivingTargetsForActor(battle, active);
    const rawActions = Array.isArray(active.actions)
      ? active.actions
      : Array.isArray(active.combatActions)
      ? active.combatActions
      : Array.isArray(active.attacks)
      ? active.attacks
      : [];
    const actionStates = rawActions.map((action) => {
      if (!action || typeof action !== "object") {
        return { action: null, renderable: false, reason: "Leerer Aktionseintrag." };
      }
      const type = toText(action.type || "attack");
      if (type === "heal") {
        const hasHealing = Array.isArray(action.healing) && action.healing.length > 0;
        return {
          action,
          renderable: hasHealing,
          reason: hasHealing ? "" : `${toText(action.name) || "Heilaktion"} hat keinen Heilwurf.`
        };
      }
      if (type === "attack" || type === "save") {
        const hasDamage = Array.isArray(action.damage) && action.damage.length > 0;
        return {
          action,
          renderable: hasDamage,
          reason: hasDamage ? "" : `${toText(action.name) || "Aktion"} hat keinen Schadenswurf.`
        };
      }
      return {
        action,
        renderable: false,
        reason: `${toText(action.name) || "Aktion"} vom Typ "${type || "?"}" wird in V2 noch nicht direkt gespielt.`
      };
    });
    const actions = actionStates.filter((entry) => entry.renderable && entry.action).map((entry) => entry.action);
    const incompleteActions = actionStates.filter((entry) => !entry.renderable && entry.reason);
    const slotSummary = formatSpellSlots(active.spellcasting);
    const actionMap = new Map(actions.map((action) => [toText(action.id), action]));
    const lastActionByActor = arena.lastActionByActor && typeof arena.lastActionByActor === "object" ? arena.lastActionByActor : {};
    const storedLastActionId = toText(lastActionByActor[toText(active.id)]);
    const firstActionId = actions.length ? toText(actions[0].id) : "";
    const preferredActionId =
      (toText(arena.commandActionId) && actionMap.has(toText(arena.commandActionId)) && toText(arena.commandActionId)) ||
      (storedLastActionId && actionMap.has(storedLastActionId) && storedLastActionId) ||
      firstActionId;
    if (toText(arena.commandActionId) !== preferredActionId) arena.commandActionId = preferredActionId;
    const selectedAction = preferredActionId ? actionMap.get(preferredActionId) : null;
    const selectedActionState = selectedAction ? formatActionResource(selectedAction, active, battle) : null;

    const selectableTargetIds = targets.map((target) => toText(target.id)).filter(Boolean);
    const selectedTargetSet = new Set(
      (Array.isArray(arena.commandTargetIds) ? arena.commandTargetIds : [])
        .map((id) => toText(id))
        .filter((id) => selectableTargetIds.includes(id))
    );
    if (!isActionMultiTarget(selectedAction) && selectedTargetSet.size > 1) {
      const first = Array.from(selectedTargetSet)[0];
      selectedTargetSet.clear();
      if (first) selectedTargetSet.add(first);
    }
    const selectedTargetIds = Array.from(selectedTargetSet);
    arena.commandTargetIds = selectedTargetIds;
    arena.selectedTargetId = selectedTargetIds[0] || "";

    const tab = normalizeArenaCommandTab(arena.commandTab);
    if (arena.commandTab !== tab) arena.commandTab = tab;
    const tabs = [
      { id: "action", label: "Aktion" },
      { id: "log", label: "Chronik" },
      { id: "retreat", label: "Flucht" }
    ];
    const menuTiles = tabs
      .map(
        (item) => `
          <button
            type="button"
            class="arena-menu-tile${item.id === tab ? " is-active" : ""}"
            data-arena-action="cmd-tab"
            data-cmd-tab="${escapeText(item.id)}"
            aria-pressed="${item.id === tab ? "true" : "false"}"
          >
            ${escapeText(item.label)}
          </button>
        `
      )
      .join("");

    const actionCards = actions
      .map((action) => {
        const resourceState = formatActionResource(action, active, battle);
        const isHeal = action.type === "heal";
        const parts = isHeal ? (Array.isArray(action.healing) ? action.healing : []) : (Array.isArray(action.damage) ? action.damage : []);
        const formulaSummary = parts
          .map((part) => [part.formula, part.type].filter(Boolean).join(" "))
          .filter(Boolean)
          .join(" · ");
        const typeLabel =
          action.type === "save"
            ? `RW ${String(action.save && action.save.ability ? action.save.ability : "?").toUpperCase()} SG ${
                action.save && action.save.dc != null ? action.save.dc : "?"
              }`
            : isHeal
            ? "Heilung"
            : `+${toFiniteNumber(action.attackBonus, 0)} auf Treffer`;
        const resourceLabel = resourceState && resourceState.label ? resourceState.label : "";
        const disabled = resourceState && resourceState.usable === false;
        return `
          <button
            type="button"
            class="arena-attack-button arena-attack-button--select${toText(action.id) === preferredActionId ? " is-selected" : ""}${disabled ? " is-disabled" : ""}"
            data-arena-action="pick-action"
            data-attack-id="${escapeText(action.id)}"
            aria-pressed="${toText(action.id) === preferredActionId ? "true" : "false"}"
            ${disabled ? "disabled" : ""}
          >
            <strong>${escapeText(action.name)}</strong>
            <span>${escapeText(typeLabel)}</span>
            ${resourceLabel ? `<span class="arena-resource-pill">${escapeText(resourceLabel)}</span>` : ""}
            <small>${escapeText(formulaSummary || "Kein Schadenswurf")}</small>
            ${
              disabled && resourceState.reason
                ? `<small class="arena-action-warning">${escapeText(resourceState.reason)}</small>`
                : ""
            }
          </button>
        `;
      })
      .join("");

    const targetOptions = targets
      .map((target) => {
        const isChecked = selectedTargetSet.has(toText(target.id));
        return `
          <label class="arena-target-choice${isChecked ? " is-selected" : ""}">
            <input
              type="checkbox"
              data-arena-target-toggle="${escapeText(target.id)}"
              ${isChecked ? "checked" : ""}
            />
            <span>${escapeText(target.name)} (${escapeText(target.side === "heroes" || target.side === "hero" ? "Held" : "Wesen")}) · LP ${escapeText(formatCurrentMax(target.hpCurrent, target.hpMax))}</span>
          </label>
        `;
      })
      .join("");

    const lastAction =
      storedLastActionId && actionMap.has(storedLastActionId) ? actionMap.get(storedLastActionId) : null;
    const lastActionState = lastAction ? formatActionResource(lastAction, active, battle) : null;
    const canExecute = !!(selectedAction && selectedActionState && selectedActionState.usable !== false && selectedTargetIds.length);
    const canRepeat = !!(lastAction && lastActionState && lastActionState.usable !== false && selectedTargetIds.length);
    const logEntries = Array.isArray(battle.log) ? battle.log : [];
    const logDrawerOpen = arena.logDrawerOpen === true;
    let step = normalizeArenaCommandStep(arena.commandStep);
    if (!selectedAction) step = "action";
    else if (step === "confirm" && !selectedTargetIds.length) step = "target";
    if (arena.commandStep !== step) arena.commandStep = step;

    let panelContent = "";
    if (tab === "menu") {
      panelContent = "";
    } else if (tab === "conditions") {
      panelContent = `
        <section class="arena-card arena-card--actions">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Zustandsverwaltung</p>
              <h3>Zustände setzen</h3>
            </div>
          </div>
          <div class="arena-condition-board">
            ${(Array.isArray(battle.combatants) ? battle.combatants : [])
              .map((combatant) => {
                if (!combatant) return "";
                return `
                  <article class="arena-condition-card">
                    <div class="arena-condition-card-head">
                      <strong>${escapeText(combatant.name)}</strong>
                      <span>${escapeText(combatant.side === "hero" || combatant.side === "heroes" ? "Held" : "Wesen")}</span>
                    </div>
                    ${renderConditionToggles(combatant, false)}
                  </article>
                `;
              })
              .join("")}
          </div>
        </section>
      `;
    } else if (tab === "log") {
      const previewItems = logEntries
        .slice(-3)
        .reverse()
        .map((entry) => `<li>${escapeText(toText(entry && entry.text) || "(kein Eintrag)")}</li>`)
        .join("");
      panelContent = `
        <section class="arena-card arena-card--log-drawer${logDrawerOpen ? " is-open" : ""}">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Chronikrolle</p>
              <h3>Kampflog</h3>
            </div>
            <button
              type="button"
              class="filter-chip arena-action-button arena-log-toggle"
              data-arena-action="toggle-log-drawer"
              data-expanded="${logDrawerOpen ? "true" : "false"}"
            >
              ${logDrawerOpen ? "Chronik einklappen" : "Chronik &ouml;ffnen"}
            </button>
          </div>
          ${
            logDrawerOpen
              ? `
            <div class="arena-action-row arena-action-row--battle-tools">
              <button type="button" class="filter-chip arena-action-button" data-arena-action="export-log" ${
                logEntries.length ? "" : "disabled"
              }>
                Kampf exportieren
              </button>
            </div>
            ${renderBattleLog(logEntries)}
          `
              : `
            <p class="arena-inline-note">Die Chronik ist eingeklappt, damit die B&uuml;hne frei bleibt.</p>
            ${
              previewItems
                ? `<ol class="arena-log-preview">${previewItems}</ol>`
                : '<p class="arena-inline-note arena-inline-note--hint">Noch keine Eintr&auml;ge vorhanden.</p>'
            }
          `
          }
        </section>
      `;
    } else if (tab === "retreat") {
      panelContent = `
        <section class="arena-card arena-card--actions">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Rückzug</p>
              <h3>Begegnung steuern</h3>
            </div>
          </div>
          <p class="arena-inline-note">Du kannst die gleiche Begegnung neu starten oder die laufende Probe sofort beenden.</p>
          <div class="arena-command-actions">
            <button type="button" class="filter-chip arena-action-button" data-arena-action="restart">Neu starten</button>
            <button type="button" class="filter-chip arena-action-button arena-action-button--danger" data-arena-action="surrender">
              Kampf aufgeben
            </button>
          </div>
        </section>
      `;
    } else {
      panelContent = `
        <section class="arena-card arena-card--actions">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Aktiver Zug</p>
              <h3>${escapeText(active.name)} handelt</h3>
            </div>
            <span class="arena-chip">Runde ${escapeText(String(battle.round || 1))}</span>
          </div>
          ${
            slotSummary
              ? `<p class="arena-slot-summary"><strong>Zauberplätze</strong><span>${escapeText(slotSummary)}</span></p>`
              : ""
          }
          ${
            step === "action"
              ? `
                <div class="arena-command-step">
                  <p class="arena-command-label">1. Aktion wählen</p>
                  <div class="arena-attack-grid">
                    ${actionCards || '<p class="arena-inline-note">Keine spielbaren Aktionen verfügbar.</p>'}
                  </div>
                  <div class="arena-command-actions">
                    <button
                      type="button"
                      class="filter-chip arena-action-button"
                      data-arena-action="set-command-step"
                      data-step="target"
                      ${selectedAction && selectedActionState && selectedActionState.usable !== false ? "" : "disabled"}
                    >
                      Weiter zum Ziel
                    </button>
                    ${
                      lastAction
                        ? `
                          <button
                            type="button"
                            class="filter-chip arena-action-button"
                            data-arena-action="repeat-action"
                            ${canRepeat ? "" : "disabled"}
                          >
                            Letzte Aktion erneut
                          </button>
                        `
                        : ""
                    }
                  </div>
                </div>
              `
              : `
                <div class="arena-command-step">
                  <p class="arena-command-label">2. Ziel wählen</p>
                  <div class="arena-target-list">
                    ${targetOptions || '<p class="arena-inline-note">Kein Ziel verfügbar.</p>'}
                  </div>
                  <small>Einzelziel-Aktionen erlauben genau ein Ziel. Flächeneffekte erlauben mehrere Ziele.</small>
                  <div class="arena-command-actions">
                    <button
                      type="button"
                      class="filter-chip arena-action-button"
                      data-arena-action="set-command-step"
                      data-step="action"
                    >
                      Zurück
                    </button>
                    <button
                      type="button"
                      class="filter-chip arena-action-button arena-action-button--execute is-active"
                      data-arena-action="execute-action"
                      ${canExecute ? "" : "disabled"}
                    >
                      Ausführen
                    </button>
                  </div>
                </div>
              `
          }

          ${
            selectedActionState && selectedActionState.usable === false && selectedActionState.reason
              ? `<div class="arena-inline-note arena-inline-note--locked">${escapeText(selectedActionState.reason)}</div>`
              : ""
          }
          ${
            !actions.length
              ? '<div class="arena-inline-note arena-inline-note--locked">Dieser Held hat aktuell keine spielbare Aktion mit vollständigen Kampfdaten.</div>'
              : ""
          }
          ${
            incompleteActions.length
              ? `<div class="arena-inline-note arena-inline-note--error">${escapeText(
                  incompleteActions.map((entry) => entry.reason).join(" ")
                )}</div>`
              : ""
          }
        </section>
      `;
    }

    return `
      <section class="arena-card arena-card--menu${panelContent ? " is-open" : ""}">
        <div class="arena-card-head">
          <div>
            <p class="arena-card-kicker">Befehlsmenü</p>
          </div>
          <button
            type="button"
            class="filter-chip arena-action-button"
            data-arena-action="cmd-tab"
            data-cmd-tab="menu"
          >
            Schließen
          </button>
        </div>
        <div class="arena-menu-grid">
          ${menuTiles}
        </div>
      </section>
      ${panelContent ? `<div class="arena-command-panel-sheet arena-command-panel-sheet--modal">${panelContent}</div>` : ""}
    `;
  }

  function renderBattleCommandPanelClassic(battle) {
    if (!battle || battle.status !== "active") return "";
    const arena = ensureArenaState();
    const active = getActiveBattleCombatant(battle);
    if (!active) return "";
    const activeIsHero = active.side === "hero" || active.side === "heroes";

    if (!activeIsHero) {
      return `
        <section class="arena-card arena-card--actions">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Aktiver Zug</p>
              <h3>${escapeText(active.name)} handelt automatisch</h3>
            </div>
          </div>
          <p class="arena-inline-note">Monsterz&uuml;ge werden direkt ausgewertet, bis wieder ein Held am Zug ist.</p>
        </section>
      `;
    }

    const targets = getLivingTargetsForActor(battle, active);
    const rawActions = Array.isArray(active.actions)
      ? active.actions
      : Array.isArray(active.combatActions)
      ? active.combatActions
      : Array.isArray(active.attacks)
      ? active.attacks
      : [];

    const actionStates = rawActions.map((action) => {
      if (!action || typeof action !== "object") {
        return { action: null, renderable: false, reason: "Leerer Aktionseintrag." };
      }
      const type = toText(action.type || "attack");
      if (type === "heal") {
        const hasHealing = Array.isArray(action.healing) && action.healing.length > 0;
        return {
          action,
          renderable: hasHealing,
          reason: hasHealing ? "" : `${toText(action.name) || "Heilaktion"} hat keinen Heilwurf.`
        };
      }
      if (type === "attack" || type === "save") {
        const hasDamage = Array.isArray(action.damage) && action.damage.length > 0;
        return {
          action,
          renderable: hasDamage,
          reason: hasDamage ? "" : `${toText(action.name) || "Aktion"} hat keinen Schadenswurf.`
        };
      }
      return {
        action,
        renderable: false,
        reason: `${toText(action.name) || "Aktion"} vom Typ "${type || "?"}" wird in V2 noch nicht direkt gespielt.`
      };
    });

    const actions = actionStates.filter((entry) => entry.renderable && entry.action).map((entry) => entry.action);
    const incompleteActions = actionStates.filter((entry) => !entry.renderable && entry.reason);
    const slotSummary = formatSpellSlots(active.spellcasting);
    const actionMap = new Map(actions.map((action) => [toText(action.id), action]));
    const lastActionByActor = arena.lastActionByActor && typeof arena.lastActionByActor === "object" ? arena.lastActionByActor : {};
    const storedLastActionId = toText(lastActionByActor[toText(active.id)]);
    const firstActionId = actions.length ? toText(actions[0].id) : "";
    const preferredActionId =
      (toText(arena.commandActionId) && actionMap.has(toText(arena.commandActionId)) && toText(arena.commandActionId)) ||
      (storedLastActionId && actionMap.has(storedLastActionId) && storedLastActionId) ||
      firstActionId;
    if (toText(arena.commandActionId) !== preferredActionId) arena.commandActionId = preferredActionId;

    const selectedAction = preferredActionId ? actionMap.get(preferredActionId) : null;
    const selectedActionState = selectedAction ? formatActionResource(selectedAction, active, battle) : null;

    const selectableTargetIds = targets.map((target) => toText(target.id)).filter(Boolean);
    const selectedTargetSet = new Set(
      (Array.isArray(arena.commandTargetIds) ? arena.commandTargetIds : [])
        .map((id) => toText(id))
        .filter((id) => selectableTargetIds.includes(id))
    );
    if (!isActionMultiTarget(selectedAction) && selectedTargetSet.size > 1) {
      const first = Array.from(selectedTargetSet)[0];
      selectedTargetSet.clear();
      if (first) selectedTargetSet.add(first);
    }
    const selectedTargetIds = Array.from(selectedTargetSet);
    arena.commandTargetIds = selectedTargetIds;
    arena.selectedTargetId = selectedTargetIds[0] || "";

    const targetOptions = targets
      .map((target) => {
        const isChecked = selectedTargetSet.has(toText(target.id));
        return `
          <label class="arena-target-choice${isChecked ? " is-selected" : ""}">
            <input
              type="checkbox"
              data-arena-target-toggle="${escapeText(target.id)}"
              ${isChecked ? "checked" : ""}
            />
            <span>${escapeText(target.name)} (${escapeText(target.side === "heroes" || target.side === "hero" ? "Held" : "Wesen")}) &middot; LP ${escapeText(formatCurrentMax(target.hpCurrent, target.hpMax))}</span>
          </label>
        `;
      })
      .join("");

    const actionCards = actions
      .map((action) => {
        const resourceState = formatActionResource(action, active, battle);
        const isHeal = action.type === "heal";
        const parts = isHeal ? (Array.isArray(action.healing) ? action.healing : []) : (Array.isArray(action.damage) ? action.damage : []);
        const formulaSummary = parts
          .map((part) => [part.formula, part.type].filter(Boolean).join(" "))
          .filter(Boolean)
          .join(" &middot; ");
        const typeLabel =
          action.type === "save"
            ? `RW ${String(action.save && action.save.ability ? action.save.ability : "?").toUpperCase()} SG ${
                action.save && action.save.dc != null ? action.save.dc : "?"
              }`
            : isHeal
            ? "Heilung"
            : `+${toFiniteNumber(action.attackBonus, 0)} auf Treffer`;
        const resourceLabel = resourceState && resourceState.label ? resourceState.label : "";
        const disabled = resourceState && resourceState.usable === false;
        return `
          <button
            type="button"
            class="arena-attack-button arena-attack-button--select${toText(action.id) === preferredActionId ? " is-selected" : ""}${disabled ? " is-disabled" : ""}"
            data-arena-action="pick-action"
            data-attack-id="${escapeText(action.id)}"
            aria-pressed="${toText(action.id) === preferredActionId ? "true" : "false"}"
            ${disabled ? "disabled" : ""}
          >
            <strong>${escapeText(action.name)}</strong>
            <span>${escapeText(typeLabel)}</span>
            ${resourceLabel ? `<span class="arena-resource-pill">${escapeText(resourceLabel)}</span>` : ""}
            <small>${escapeText(formulaSummary || "Kein Schadenswurf")}</small>
            ${
              disabled && resourceState.reason
                ? `<small class="arena-action-warning">${escapeText(resourceState.reason)}</small>`
                : ""
            }
          </button>
        `;
      })
      .join("");

    const lastAction =
      storedLastActionId && actionMap.has(storedLastActionId) ? actionMap.get(storedLastActionId) : null;
    const lastActionState = lastAction ? formatActionResource(lastAction, active, battle) : null;
    const canExecute = !!(selectedAction && selectedActionState && selectedActionState.usable !== false && selectedTargetIds.length);
    const canRepeat = !!(lastAction && lastActionState && lastActionState.usable !== false && selectedTargetIds.length);
    const logEntries = Array.isArray(battle.log) ? battle.log : [];
    const selectedTargets = targets.filter((target) => selectedTargetIds.includes(toText(target.id)));
    const selectedTargetLabel = selectedTargets.length ? selectedTargets.map((target) => target.name).join(", ") : "Kein Ziel";

    let step = normalizeArenaCommandStep(arena.commandStep);
    if (!selectedAction) step = "action";
    else if (step === "confirm" && !selectedTargetIds.length) step = "target";
    if (arena.commandStep !== step) arena.commandStep = step;

    const sheet = normalizeArenaCommandSheet(arena.commandSheet);
    if (arena.commandSheet !== sheet) arena.commandSheet = sheet;

    let detailPanel = "";
    if (step === "target") {
      detailPanel = `
        <section class="arena-card arena-card--actions">
          <p class="arena-command-label">2. Ziel w&auml;hlen</p>
          <div class="arena-target-list">
            ${targetOptions || '<p class="arena-inline-note">Kein Ziel verf&uuml;gbar.</p>'}
          </div>
          <small>Angriffe/Heilung nutzen das erste Ziel, Fl&auml;cheneffekte nutzen alle markierten Ziele.</small>
        </section>
      `;
    } else if (step === "confirm") {
      detailPanel = `
        <section class="arena-card arena-card--actions">
          <p class="arena-command-label">3. Best&auml;tigen</p>
          <div class="arena-inline-note arena-inline-note--hint">
            <strong>Aktion:</strong> ${escapeText(selectedAction ? selectedAction.name : "—")}<br />
            <strong>Ziel:</strong> ${escapeText(selectedTargetLabel)}
          </div>
          <div class="arena-command-actions">
            <button
              type="button"
              class="filter-chip arena-action-button arena-action-button--execute is-active"
              data-arena-action="execute-action"
              ${canExecute ? "" : "disabled"}
            >
              Aktion ausf&uuml;hren
            </button>
          </div>
        </section>
      `;
    } else {
      detailPanel = `
        <section class="arena-card arena-card--actions">
          <p class="arena-command-label">1. Aktion w&auml;hlen</p>
          ${
            slotSummary
              ? `<p class="arena-slot-summary"><strong>Zauberpl&auml;tze</strong><span>${escapeText(slotSummary)}</span></p>`
              : ""
          }
          <div class="arena-attack-grid">
            ${actionCards || '<p class="arena-inline-note">Keine spielbaren Aktionen verf&uuml;gbar.</p>'}
          </div>
        </section>
      `;
    }

    let sheetContent = "";
    if (sheet === "conditions") {
      sheetContent = `
        <section class="arena-card arena-command-sheet is-open">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Sekund&auml;rpanel</p>
              <h3>Zust&auml;nde</h3>
            </div>
            <button type="button" class="filter-chip arena-action-button" data-arena-action="close-command-sheet">Schlie&szlig;en</button>
          </div>
          <div class="arena-condition-board">
            ${(Array.isArray(battle.combatants) ? battle.combatants : [])
              .map((combatant) => {
                if (!combatant) return "";
                return `
                  <article class="arena-condition-card">
                    <div class="arena-condition-card-head">
                      <strong>${escapeText(combatant.name)}</strong>
                      <span>${escapeText(combatant.side === "hero" || combatant.side === "heroes" ? "Held" : "Wesen")}</span>
                    </div>
                    ${renderConditionToggles(combatant, false)}
                  </article>
                `;
              })
              .join("")}
          </div>
        </section>
      `;
    } else if (sheet === "log") {
      sheetContent = `
        <section class="arena-card arena-command-sheet is-open">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Sekund&auml;rpanel</p>
              <h3>Chronik</h3>
            </div>
            <div class="arena-command-actions">
              <button type="button" class="filter-chip arena-action-button" data-arena-action="export-log" ${
                logEntries.length ? "" : "disabled"
              }>
                Export
              </button>
              <button type="button" class="filter-chip arena-action-button" data-arena-action="close-command-sheet">Schlie&szlig;en</button>
            </div>
          </div>
          ${renderBattleLog(logEntries)}
        </section>
      `;
    } else if (sheet === "retreat") {
      sheetContent = `
        <section class="arena-card arena-command-sheet is-open">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Sekund&auml;rpanel</p>
              <h3>Begegnung</h3>
            </div>
            <button type="button" class="filter-chip arena-action-button" data-arena-action="close-command-sheet">Schlie&szlig;en</button>
          </div>
          <p class="arena-inline-note">Neustart oder Aufgabe der laufenden Kampfprobe.</p>
          <div class="arena-command-actions">
            <button type="button" class="filter-chip arena-action-button" data-arena-action="restart">Neu starten</button>
            <button type="button" class="filter-chip arena-action-button arena-action-button--danger" data-arena-action="surrender">
              Kampf aufgeben
            </button>
          </div>
        </section>
      `;
    }

    return `
      <section class="arena-card arena-card--command-core is-step-${escapeText(step)}${sheet ? " has-sheet-open" : ""}">
        <div class="arena-card-head">
          <div>
            <p class="arena-card-kicker">Befehlsmen&uuml;</p>
            <h3>${escapeText(active.name)} handelt</h3>
          </div>
          <span class="arena-chip">Runde ${escapeText(String(battle.round || 1))}</span>
        </div>
        <div class="arena-command-grid">
          <button
            type="button"
            class="arena-command-tile${step === "action" ? " is-active" : ""}"
            data-arena-action="set-command-step"
            data-step="action"
            aria-pressed="${step === "action" ? "true" : "false"}"
          >
            <strong>Aktion</strong>
            <small>${escapeText(selectedAction ? selectedAction.name : "W&auml;hlen")}</small>
          </button>
          <button
            type="button"
            class="arena-command-tile${step === "target" ? " is-active" : ""}"
            data-arena-action="set-command-step"
            data-step="target"
            aria-pressed="${step === "target" ? "true" : "false"}"
            ${selectedAction ? "" : "disabled"}
          >
            <strong>Ziel</strong>
            <small>${escapeText(selectedTargetIds.length ? `${selectedTargetIds.length} markiert` : "W&auml;hlen")}</small>
          </button>
          <button
            type="button"
            class="arena-command-tile arena-command-tile--confirm"
            data-arena-action="execute-action"
            ${canExecute ? "" : "disabled"}
          >
            <strong>Best&auml;tigen</strong>
            <small>${escapeText(canExecute ? "Aktion ausf&uuml;hren" : "Noch nicht bereit")}</small>
          </button>
          <button
            type="button"
            class="arena-command-tile arena-command-tile--repeat"
            data-arena-action="repeat-action"
            ${canRepeat ? "" : "disabled"}
          >
            <strong>Letzte Aktion</strong>
            <small>${escapeText(lastAction ? lastAction.name || "Erneut" : "Noch keine Aktion")}</small>
          </button>
        </div>
        <div class="arena-command-secondary">
          <button type="button" class="filter-chip arena-action-button${sheet === "conditions" ? " is-active" : ""}" data-arena-action="open-command-sheet" data-sheet="conditions">
            Zust&auml;nde
          </button>
          <button type="button" class="filter-chip arena-action-button${sheet === "log" ? " is-active" : ""}" data-arena-action="open-command-sheet" data-sheet="log">
            Chronik
          </button>
          <button type="button" class="filter-chip arena-action-button${sheet === "retreat" ? " is-active" : ""}" data-arena-action="open-command-sheet" data-sheet="retreat">
            Aufgeben/Neustart
          </button>
        </div>
      </section>
      ${detailPanel}
      ${sheetContent}
      ${
        selectedActionState && selectedActionState.usable === false && selectedActionState.reason
          ? `<div class="arena-inline-note arena-inline-note--locked">${escapeText(selectedActionState.reason)}</div>`
          : ""
      }
      ${
        !actions.length
          ? '<div class="arena-inline-note arena-inline-note--locked">Dieser Held hat aktuell keine spielbare Aktion mit vollst&auml;ndigen Kampfdaten.</div>'
          : ""
      }
      ${
        incompleteActions.length
          ? `<div class="arena-inline-note arena-inline-note--error">${escapeText(
              incompleteActions.map((entry) => entry.reason).join(" ")
            )}</div>`
          : ""
      }
    `;
  }

  function renderBattleLog(logEntries) {
    const entries = Array.isArray(logEntries) ? logEntries : [];
    if (!entries.length) {
      return `
        <section class="arena-card arena-card--log">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Chronikrolle</p>
              <h3>Noch kein Kampflog</h3>
            </div>
          </div>
          <p class="arena-inline-note">Sobald die Probe beginnt, erscheinen hier Initiative, Trefferwürfe und Schaden.</p>
        </section>
      `;
    }

    const items = entries
      .map((entry) => {
        const type = toText(entry.type) || "note";
        const attackSummary =
          entry.attack && typeof entry.attack === "object"
            ? (() => {
                const rolls = Array.isArray(entry.attack.rolls) ? entry.attack.rolls : [];
                const rollText =
                  rolls.length > 1
                    ? `W20 ${rolls.join("/")} -> ${entry.attack.natural}`
                    : Number.isFinite(Number(entry.attack.natural))
                    ? `W20 ${entry.attack.natural}`
                    : "";
                const modeText = entry.attack.canceledAdvantage
                  ? "Vorteil/Nachteil aufgehoben"
                  : entry.attack.advantage
                  ? "Vorteil"
                  : entry.attack.disadvantage
                  ? "Nachteil"
                  : "";
                return [
                rollText,
                modeText,
                Number.isFinite(Number(entry.attack.total)) ? `Gesamt ${entry.attack.total}` : "",
                entry.attack.critical ? "Kritisch" : "",
                entry.attack.fumble ? "Patzer" : "",
                entry.attack.hit === false ? "Verfehlt" : entry.attack.hit === true ? "Treffer" : ""
              ]
                .filter(Boolean)
                .join(" · ");
              })()
            : "";
        const damageSummary =
          entry.damage && typeof entry.damage === "object" && Number.isFinite(Number(entry.damage.total))
            ? `Schaden ${entry.damage.total}`
            : "";
        const healSummary =
          entry.heal && typeof entry.heal === "object" && Number.isFinite(Number(entry.heal.total))
            ? `Heilung ${entry.heal.total}`
            : "";
        const saveSummary =
          entry.save && typeof entry.save === "object"
            ? [
                entry.save.ability ? `RW ${String(entry.save.ability).toUpperCase()}` : "",
                Number.isFinite(Number(entry.save.dc)) ? `SG ${entry.save.dc}` : "",
                Array.isArray(entry.save.results) ? `${entry.save.results.length} Ziel(e)` : ""
              ]
                .filter(Boolean)
                .join(" · ")
            : "";
        const resourceSummary =
          entry.resource && typeof entry.resource === "object"
            ? entry.resource.type === "spellSlot"
              ? `Zauberplatz Grad ${entry.resource.level}: ${formatCurrentMax(entry.resource.remaining, entry.resource.max)} übrig`
              : entry.resource.type === "resource"
              ? `${entry.resource.resourceName || entry.resource.resourceId}: ${formatCurrentMax(entry.resource.remaining, entry.resource.max)} übrig`
              : ""
            : "";
        const meta = [`Runde ${entry.round || 0}`, type]
          .concat(attackSummary ? [attackSummary] : [])
          .concat(saveSummary ? [saveSummary] : [])
          .concat(damageSummary ? [damageSummary] : [])
          .concat(healSummary ? [healSummary] : [])
          .concat(resourceSummary ? [resourceSummary] : [])
          .filter(Boolean)
          .join(" · ");

        return `
          <li class="arena-log-item arena-log-item--${escapeText(type)}">
            <div class="arena-log-meta">${escapeText(meta)}</div>
            <p>${escapeText(entry.text || "")}</p>
          </li>
        `;
      })
      .join("");

    return `
      <section class="arena-card arena-card--log">
        <div class="arena-card-head">
          <div>
            <p class="arena-card-kicker">Chronikrolle</p>
            <h3>Wurf- und Kampfverlauf</h3>
          </div>
        </div>
        <ol class="arena-log-list">
          ${items}
        </ol>
      </section>
    `;
  }

  function renderBattleSection(battle) {
    return renderBattleSectionV4(battle);
    if (!battle || typeof battle !== "object") {
      return `
        <section class="arena-card arena-card--idle">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Simulationskammer</p>
              <h3>Bereit für die erste Probe</h3>
            </div>
          </div>
          <p class="arena-inline-note">
            Wähle oben einen Helden und ein bekanntes Wesen aus dem Bestiarium und starte dann ein lokales Trainingsduell.
          </p>
        </section>
      `;
    }

    const combatants = getBattleCombatants(battle);
    const activeId = toText(battle.activeCombatantId);
    const activeCombatant = getActiveBattleCombatant(battle);
    const finished = battle.status === "finished";
    const livingHeroes = combatants.heroes.filter((combatant) => toFiniteNumber(combatant && combatant.hpCurrent, 0) > 0).length;
    const livingMonsters = combatants.monsters.filter((combatant) => toFiniteNumber(combatant && combatant.hpCurrent, 0) > 0).length;
    const recentHitTargetIds = getRecentDamageTargetIds(battle);

    return `
      <div class="arena-orientation-hint" role="note" aria-live="polite">
        <strong>Hinweis:</strong> F\u00fcr die beste Kampfansicht drehe dein Ger\u00e4t ins Querformat.
      </div>
      <div class="arena-battle-layout">
        <section class="arena-card arena-card--encounter arena-zone arena-zone--stage">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Kampfarena</p>
              <h3>${finished ? "Die Probe ist entschieden" : "Begegnung läuft"}</h3>
            </div>
            <span class="arena-chip">${escapeText(finished ? "Beendet" : "Aktiv")}</span>
          </div>
          <div class="arena-stage-shell">
            ${renderEncounterRoster("Helden", "heroes", combatants.heroes, activeId, finished, recentHitTargetIds)}
            <div class="arena-versus-anchor" aria-hidden="true">
              <span>Gegen&uuml;ber</span>
            </div>
            ${renderEncounterRoster("Monster", "monsters", combatants.monsters, activeId, finished, recentHitTargetIds)}
          </div>
        </section>

        <section class="arena-card arena-zone arena-zone--hud arena-overlay-hud">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Zuganzeige</p>
              <h3>Zugstatus</h3>
            </div>
          </div>
          <div class="arena-status-strip">
            <span class="arena-status-cell"><strong>Runde</strong>${escapeText(String(battle.round || 1))}</span>
            <span class="arena-status-cell"><strong>Am Zug</strong>${escapeText(activeCombatant ? activeCombatant.name : "—")}</span>
            <span class="arena-status-cell"><strong>Helden</strong>${escapeText(String(livingHeroes))}</span>
            <span class="arena-status-cell"><strong>Monster</strong>${escapeText(String(livingMonsters))}</span>
          </div>
          ${renderInitiativeRail(battle)}
          ${
            battle.lastResult
              ? `<div class="arena-inline-note arena-inline-note--result">${escapeText(battle.lastResult)}</div>`
              : ""
          }
        </section>

        <section class="arena-zone arena-zone--command" aria-label="Befehlsmenü">
          ${renderBattleCommandPanelV2(battle)}
        </section>
      </div>
    `;
  }

  function renderBattleSectionV4(battle) {
    if (!battle || typeof battle !== "object") {
      return `
        <section class="arena-duel-dialog arena-duel-dialog--idle" role="status" aria-live="polite">
          <p class="arena-duel-dialog-kicker">Duell-Dialog</p>
          <h3>Bereit f&uuml;r die erste Probe</h3>
          <p>W&auml;hle oben Helden und Wesen aus und starte dann dein Trainingsduell.</p>
        </section>
      `;
    }

    const combatants = getBattleCombatants(battle);
    const activeId = toText(battle.activeCombatantId);
    const activeCombatant = getActiveBattleCombatant(battle);
    const activeIsHero = !!(activeCombatant && (activeCombatant.side === "hero" || activeCombatant.side === "heroes"));
    const finished = battle.status === "finished";
    const livingHeroes = combatants.heroes.filter((combatant) => toFiniteNumber(combatant && combatant.hpCurrent, 0) > 0).length;
    const livingMonsters = combatants.monsters.filter((combatant) => toFiniteNumber(combatant && combatant.hpCurrent, 0) > 0).length;
    const recentHitTargetIds = getRecentDamageTargetIds(battle);
    const battleStateClass = finished ? "is-finished" : activeIsHero ? "is-hero-turn" : "is-monster-turn";
    const outcomeText =
      livingHeroes > 0 && livingMonsters <= 0
        ? "Helden siegen"
        : livingMonsters > 0 && livingHeroes <= 0
        ? "Monster siegen"
        : "Unentschieden";
    const pauseDialog = !finished && !activeIsHero
      ? `
          <section class="arena-duel-dialog arena-duel-dialog--pause" role="status" aria-live="polite">
            <p class="arena-duel-dialog-kicker">Duell-Dialog</p>
            <h3>Gegenzug l&auml;uft</h3>
            <p>${escapeText(activeCombatant ? activeCombatant.name : "Ein Wesen")} handelt automatisch.</p>
          </section>
        `
      : "";
    const finishDialog = finished
      ? `
          <section class="arena-duel-dialog arena-duel-dialog--finish" role="status" aria-live="polite">
            <p class="arena-duel-dialog-kicker">Duell-Dialog</p>
            <h3>${escapeText(outcomeText)}</h3>
            <p>Die Begegnung ist beendet. Du kannst neu starten oder zur Vorbereitung zur&uuml;ckkehren.</p>
          </section>
        `
      : "";

    return `
      <div class="arena-orientation-hint" role="note" aria-live="polite">
        <strong>Hinweis:</strong> F&uuml;r die beste Kampfansicht drehe dein Ger&auml;t ins Querformat.
      </div>
      <div class="arena-battle-layout ${battleStateClass}">
        ${renderBattleStageV2(battle, activeId, finished, recentHitTargetIds)}

        <section class="arena-card arena-zone arena-zone--hud">
          <div class="arena-card-head">
            <div>
              <p class="arena-card-kicker">Zuganzeige</p>
              <h3>Zugstatus</h3>
            </div>
          </div>
          <div class="arena-status-strip">
            <span class="arena-status-cell"><strong>Runde</strong>${escapeText(String(battle.round || 1))}</span>
            <span class="arena-status-cell"><strong>Am Zug</strong>${escapeText(activeCombatant ? activeCombatant.name : "—")}</span>
            <span class="arena-status-cell"><strong>Helden</strong>${escapeText(String(livingHeroes))}</span>
            <span class="arena-status-cell"><strong>Monster</strong>${escapeText(String(livingMonsters))}</span>
          </div>
          ${renderInitiativeRail(battle)}
          ${
            battle.lastResult
              ? `<div class="arena-inline-note arena-inline-note--result">${escapeText(battle.lastResult)}</div>`
              : ""
          }
        </section>

        <section class="arena-zone arena-zone--command arena-overlay-command" aria-label="Befehlsmen&uuml;">
          ${renderBattleCommandPanelV2(battle)}
        </section>
      </div>
      ${pauseDialog}
      ${finishDialog}
    `;
  }

  function bindControlsOnce() {
    const currentDom = dom();
    const view = currentDom.arenaView;
    if (!view || view.dataset.arenaBound === "1") return;

    view.dataset.arenaBound = "1";

    view.addEventListener("change", (event) => {
      const target = event && event.target ? event.target : null;
      if (!target) return;

      if (target.id === "arena-hero-select") {
        setArenaSelection(target.value, null);
        return;
      }

      if (target.matches && target.matches("[data-arena-hero-id]")) {
        setArenaHeroIncluded(target.getAttribute("data-arena-hero-id"), target.checked === true);
        return;
      }

      if (target.matches && target.matches("[data-arena-group-monster-index]")) {
        updateArenaMonsterGroup(target.getAttribute("data-arena-group-monster-index"), { monsterId: target.value });
        return;
      }

      if (target.matches && target.matches("[data-arena-group-count-index]")) {
        updateArenaMonsterGroup(target.getAttribute("data-arena-group-count-index"), { count: target.value });
        return;
      }

      if (target.id === "arena-target-select") {
        setArenaTarget(target.value);
        return;
      }

      if (target.matches && target.matches("[data-arena-target-toggle]")) {
        setArenaCommandTargetChecked(target.getAttribute("data-arena-target-toggle"), target.checked === true);
        return;
      }
    });

    view.addEventListener("keydown", (event) => {
      if (!event || event.key !== "Escape") return;
      const arena = ensureArenaState();
      if (arena.duelOpen !== true) return;
      event.preventDefault();
      closeArenaDuel();
      renderArena();
    });

    view.addEventListener("click", (event) => {
      const rawTarget = event && event.target ? event.target : null;
      const target = rawTarget && rawTarget.closest ? rawTarget.closest("[data-arena-action]") : null;
      const arena = ensureArenaState();
      const keepFocusSwitch =
        !!(rawTarget && rawTarget.closest && (
          rawTarget.closest('[data-arena-action="select-focus-side"]') ||
          rawTarget.closest('[data-arena-action="cycle-focus"]')
        ));
      if (arena.focusSwitchSide && !keepFocusSwitch) {
        arena.focusSwitchSide = "";
        if (!target) {
          renderArena();
          return;
        }
      }
      if (!target) return;
      event.preventDefault();

      const action = target.getAttribute("data-arena-action");
      if (action === "start") {
        startSelectedBattle();
        return;
      }

      if (action === "open-duel") {
        const arena = ensureArenaState();
        if (!arena.battle) return;
        openArenaDuel();
        renderArena();
        return;
      }

      if (action === "close-duel") {
        closeArenaDuel();
        renderArena();
        return;
      }

      if (action === "restart") {
        restartSelectedBattle();
        return;
      }

      if (action === "restore") {
        restoreStoredBattle();
        return;
      }

      if (action === "export-log") {
        exportBattleLog();
        return;
      }

      if (action === "toggle-log-drawer") {
        const expanded = target.getAttribute("data-expanded") === "true";
        setArenaLogDrawerOpen(!expanded);
        return;
      }

      if (action === "load-test") {
        applyArenaTestScenario(target.getAttribute("data-test-id"));
        return;
      }

      if (action === "cmd-tab") {
        setArenaCommandTab(target.getAttribute("data-cmd-tab"));
        return;
      }

      if (action === "add-monster-group") {
        const monsterSelect = view.querySelector("#arena-monster-select");
        const countInput = view.querySelector("#arena-monster-count");
        addArenaMonsterGroup(monsterSelect ? monsterSelect.value : "", countInput ? countInput.value : 1);
        return;
      }

      if (action === "remove-monster-group") {
        removeArenaMonsterGroup(target.getAttribute("data-group-index"));
        return;
      }

      if (action === "select-focus-side") {
        const side = toText(target.getAttribute("data-side")).toLowerCase();
        activateArenaFocusSide(side, true);
        return;
      }

      if (action === "cycle-focus") {
        cycleArenaViewedFocus(target.getAttribute("data-side"), target.getAttribute("data-dir"));
        return;
      }

      if (action === "set-command-step") {
        setArenaCommandStep(target.getAttribute("data-step"));
        return;
      }

      if (action === "open-command-sheet") {
        setArenaCommandSheet(target.getAttribute("data-sheet"));
        return;
      }

      if (action === "close-command-sheet") {
        setArenaCommandSheet("");
        return;
      }

      if (action === "pick-action") {
        setArenaCommandAction(target.getAttribute("data-attack-id"));
        return;
      }

      if (action === "execute-action") {
        executeArenaCommandAction();
        return;
      }

      if (action === "repeat-action") {
        executeArenaLastAction();
        return;
      }

      if (action === "surrender") {
        surrenderArenaBattle();
        return;
      }

      if (action === "toggle-condition") {
        toggleBattleCondition(
          target.getAttribute("data-combatant-id"),
          target.getAttribute("data-condition-id")
        );
        return;
      }

      if (action === "open-monster") {
        const monster = getSelectedMonsterRecord();
        if (!monster) return;
        const hash = getBestiaryMonsterHash(monster.id);
        if (window.location.hash !== hash) window.location.hash = hash;
        else callIfFn(app.navigateToBestiary);
      }
    });

    const backdrop = currentDom.arenaDuelBackdrop;
    if (backdrop) {
      backdrop.addEventListener("click", () => {
        const arena = ensureArenaState();
        if (arena.duelOpen !== true) return;
        closeArenaDuel();
        renderArena();
      });
    }
  }

  function renderArenaDuelOverlay(arena) {
    const currentDom = dom();
    const target = currentDom.arenaDuelContent;
    if (!target) return;
    target.innerHTML = arena && arena.battle ? renderBattleSection(arena.battle) : "";
  }

  function renderArena() {
    const currentDom = dom();
    if (currentDom.arenaTitle) currentDom.arenaTitle.textContent = "Kampfprobe";
    if (currentDom.arenaSubtitle) {
      currentDom.arenaSubtitle.textContent =
        "Eine arkane Trainingssimulation für Held gegen Monster. Stelle ein Duell zusammen, lasse Initiative und Angriffe auswürfeln und lies den Ablauf wie eine kleine Archivchronik mit.";
    }

    if (!currentDom.arenaContent) return;
    if (getCurrentView() !== "arena") {
      setArenaDuelOpen(false, { restoreFocus: false });
      return;
    }

    bindControlsOnce();
    const arena = ensureArenaState();
    const heroes = getVisibleHeroes();
    const monsters = getVisibleMonsters();
    const recognizedHero = getRecognizedHero();
    const selectedHero = getSelectedHeroRecord();
    const selectedMonster = getSelectedMonsterRecord();

    if (!getCombatApi()) {
      setArenaDuelOpen(false, { restoreFocus: false });
      currentDom.arenaContent.innerHTML = `
        <article class="dashboard-card">
          <p class="dashboard-kicker">Simulationskern fehlt</p>
          <h3>Die Kampfprobe konnte nicht geladen werden</h3>
          <p class="dashboard-note">
            Das Combat-Modul ist aktuell nicht verfügbar. Prüfe, ob <code>app.combat.js</code> geladen wurde.
          </p>
        </article>
      `;
      return;
    }

    if (!arena.battle && arena.duelOpen === true) {
      arena.duelOpen = false;
    }

    currentDom.arenaContent.innerHTML = `
      <div class="arena-shell">
        ${renderSetupSection(heroes, monsters, selectedHero, selectedMonster, recognizedHero)}
        ${renderArenaSetupStatus(arena)}
      </div>
    `;
    renderArenaDuelOverlay(arena);
    setArenaDuelOpen(arena.duelOpen === true && !!arena.battle, { restoreFocus: false });
  }

  function installRenderHook() {
    if (app.__arenaRenderHookInstalled) return;
    if (typeof app.renderAll !== "function") return;

    const originalRenderAll = app.renderAll;
    app.renderAll = function renderAllWithArena(...args) {
      const result = originalRenderAll.apply(this, args);
      if (getCurrentView() === "arena") {
        renderArena();
      } else {
        const currentDom = dom();
        const likelyOpen =
          (currentDom.arenaDuelOverlay && currentDom.arenaDuelOverlay.hidden !== true) ||
          (state.arena && state.arena.duelOpen === true) ||
          (document.body && document.body.classList.contains("arena-duel-open"));
        if (likelyOpen) {
          setArenaDuelOpen(false, { restoreFocus: false });
        }
      }
      return result;
    };
    app.__arenaRenderHookInstalled = true;
  }

  installRenderHook();

  Object.assign(app, {
    renderArena
  });
})();
