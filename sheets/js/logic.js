// -----------------------------
// LOGIC: State, Data Persistence, Helpers, Calculations
// -----------------------------

const STORAGE_KEY = "dnd_sheet_stats_v1";
let SHEET_STATE = {};
const MY_SPELLS_KEY_GLOBAL = "dnd_my_spells_v1";
const MY_FEATURES_KEY_GLOBAL = "dnd_my_features_v1";
const MY_INVOCATIONS_KEY_GLOBAL = "dnd_my_invocations_v1";
const INV_KEY = "inventory"; 

// Initialize State
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    SHEET_STATE = JSON.parse(raw);
  }
} catch (e) {
  console.error("Errore caricamento stato locale:", e);
  SHEET_STATE = {};
}

function safeJSONParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

function getSavedState() {
  return SHEET_STATE;
}

function setSavedState(next) {
  SHEET_STATE = next || {};
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SHEET_STATE));
    if (window.cloud && typeof window.cloud.triggerDebouncedSave === "function") {
      window.cloud.triggerDebouncedSave();
    }
  } catch (e) {
    console.error("Errore salvataggio stato locale:", e);
  }
}

function getInventory() {
  const st = getSavedState();
  return Array.isArray(st[INV_KEY]) ? st[INV_KEY] : [];
}

function setInventory(items) {
  const st = getSavedState();
  st[INV_KEY] = items;
  setSavedState(st);
}

// --- Spells & Features Logic ---

function slugId(str) {
  return String(str ?? "")
    .toLowerCase()
    .trim()
    .replaceAll("à", "a")
    .replaceAll("è", "e")
    .replaceAll("ì", "i")
    .replaceAll("ò", "o")
    .replaceAll("ù", "u")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

// Alias for compatibility if needed, or replace usages
const slugIdGeneric = slugId;

async function loadAllSpells() {
  if (window.SPELLS) return;
  try {
    let rawSpells = window.RAW_SPELLS;
    
    // Se ancora non abbiamo rawSpells, usciamo
    if (!rawSpells) return;

    window.SPELLS = rawSpells.map(s => {
      const schoolMap = {
        "evocation": "Invocazione",
        "necromancy": "Necromanzia",
        "illusion": "Illusione",
        "transmutation": "Trasmutazione",
        "abjuration": "Abiurazione",
        "conjuration": "Congiurazione",
        "divination": "Divinazione",
        "enchantment": "Ammaliamento"
      };

      // Normalizzazione range
      const normalizeRange = (r) => {
         if (!r) return "";
         const lo = r.toLowerCase();
         if (lo.includes("self")) return "Incantatore";
         if (lo.includes("touch")) return "Tocco";
         if (lo.includes("feet")) return r.replace("feet", "m").replace("foot", "m"); // approssimazione
         return r;
      };

      const levelLabel = s.level === 0 ? "Trucchetto" : String(s.level);
      const displayName = s.displayName || s.name;
      const imageName = s.imageName || s.originalName || s.name;
      const imgPath = s.img || `Images/spells/${imageName.toLowerCase()}.jpg`;

      return {
        id: slugId(imageName),
        name: displayName,
        rawName: s.name,
        school: schoolMap[s.school.toLowerCase()] || s.school,
        level: levelLabel,
        castingTime: s.actionType === "action" ? "1 azione" :
          s.actionType === "bonus" ? "1 azione bonus" :
            s.actionType === "reaction" ? "1 reazione" : s.actionType,
        range: normalizeRange(s.range),
        components: s.components.map(c => c.toUpperCase()).join(", ") + (s.material ? ` (${s.material})` : ""),
        duration: (s.concentration ? "Concentrazione, " : "") + s.duration,
        img: imgPath,
        description: s.description + (s.cantripUpgrade ? `\n\nAi livelli superiori: ${s.cantripUpgrade}` : ""),
        classes: s.classes,
        ritual: s.ritual
      };
    });
  } catch (err) {
    console.error("Errore in loadAllSpells", err);
  }
}

function loadMySpellsGlobal() {
  const raw = localStorage.getItem(MY_SPELLS_KEY_GLOBAL);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveMySpellsGlobal(payload) {
  localStorage.setItem(MY_SPELLS_KEY_GLOBAL, JSON.stringify(payload));
  if (window.cloud && typeof window.cloud.triggerDebouncedSave === "function") {
    window.cloud.triggerDebouncedSave();
  }
}

function updateMySpellMetaGlobal(id, patch) {
  let payload = loadMySpellsGlobal();
  if (!payload || !Array.isArray(payload.selected)) {
     payload = { schema: "dnd-my-spells", version: 1, updatedAt: new Date().toISOString(), selected: [] };
  }
  
  const i = payload.selected.findIndex((x) => x.id === id);
  if (i === -1) {
    payload.selected.push({
      id,
      asCantrip: null,
      notes: "",
      prepared: false,
      ...patch,
    });
  } else {
    payload.selected[i] = { ...payload.selected[i], ...patch };
  }
  payload.updatedAt = new Date().toISOString();
  saveMySpellsGlobal(payload);
}

function loadMyFeaturesGlobal() {
  const raw = localStorage.getItem(MY_FEATURES_KEY_GLOBAL);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.selected)) return parsed.selected;
  } catch (e) {
    return [];
  }
  return [];
}

function loadMyInvocationsGlobal() {
  const raw = localStorage.getItem(MY_INVOCATIONS_KEY_GLOBAL);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.selected)) return parsed.selected;
  } catch (e) {
    return [];
  }
  return [];
}

// --- Calculation Helpers ---

function calcMod(score) {
  const n = parseInt(score, 10);
  if (isNaN(n)) return "";
  const mod = Math.floor((n - 10) / 2);
  return (mod >= 0 ? "+" : "") + mod;
}

function calculateStats(data) {
    // 1. Get Ability Scores
    const getScore = (key) => parseInt(data[key]) || 10;
    
    const str = getScore("str");
    const dex = getScore("dex");
    const con = getScore("con");
    const int = getScore("int");
    const wis = getScore("wis");
    const cha = getScore("cha");
    
    // 2. Calculate Modifiers
    const getMod = (score) => Math.floor((score - 10) / 2);
    
    const strMod = getMod(str);
    const dexMod = getMod(dex);
    const conMod = getMod(con);
    const intMod = getMod(int);
    const wisMod = getMod(wis);
    const chaMod = getMod(cha);

    // 3. Proficiency
    let lvl = parseInt(data.level) || 1;
    let prof = Math.ceil(lvl / 4);
    if (prof < 1) prof = 1;

    // 4. Saving Throws & Skills
    const calc = (mod, isProf) => mod + (isProf ? prof : 0);
    const isProf = (key) => data[key] === "true" || data[key] === true;

    return {
        strMod, dexMod, conMod, intMod, wisMod, chaMod,
        prof,
        saveStr: calc(strMod, isProf("saveStrProf")),
        saveDex: calc(dexMod, isProf("saveDexProf")),
        saveCon: calc(conMod, isProf("saveConProf")),
        saveInt: calc(intMod, isProf("saveIntProf")),
        saveWis: calc(wisMod, isProf("saveWisProf")),
        saveCha: calc(chaMod, isProf("saveChaProf")),
        // Skills
        skillAthletics: calc(strMod, isProf("skillAthleticsProf")),
        skillAcrobatics: calc(dexMod, isProf("skillAcrobaticsProf")),
        skillSleightOfHand: calc(dexMod, isProf("skillSleightOfHandProf")),
        skillStealth: calc(dexMod, isProf("skillStealthProf")),
        skillArcana: calc(intMod, isProf("skillArcanaProf")),
        skillHistory: calc(intMod, isProf("skillHistoryProf")),
        skillInvestigation: calc(intMod, isProf("skillInvestigationProf")),
        skillNature: calc(intMod, isProf("skillNatureProf")),
        skillReligion: calc(intMod, isProf("skillReligionProf")),
        skillAnimalHandling: calc(wisMod, isProf("skillAnimalHandlingProf")),
        skillInsight: calc(wisMod, isProf("skillInsightProf")),
        skillMedicine: calc(wisMod, isProf("skillMedicineProf")),
        skillPerception: calc(wisMod, isProf("skillPerceptionProf")),
        skillSurvival: calc(wisMod, isProf("skillSurvivalProf")),
        skillDeception: calc(chaMod, isProf("skillDeceptionProf")),
        skillIntimidation: calc(chaMod, isProf("skillIntimidationProf")),
        skillPerformance: calc(chaMod, isProf("skillPerformanceProf")),
        skillPersuasion: calc(chaMod, isProf("skillPersuasionProf")),
        passivePerception: 10 + calc(wisMod, isProf("skillPerceptionProf")) // simplified
    };
}

// --- Spell Slots Logic ---

function loadSlotsUsage() {
  const raw = localStorage.getItem("dnd_spell_slots_usage_v1");
  try {
    return raw ? JSON.parse(raw) || {} : {};
  } catch (e) {
    return {};
  }
}

function saveSlotsUsage(usage) {
  localStorage.setItem("dnd_spell_slots_usage_v1", JSON.stringify(usage));
  if (window.cloud && typeof window.cloud.triggerDebouncedSave === "function") {
    window.cloud.triggerDebouncedSave();
  }
}

function getSlotsMaxConfig() {
    const st = getSavedState();
    const cfg = {};
    for (let lvl = 1; lvl <= 9; lvl++) {
      const key = `slots${lvl}`;
      const raw = st && st[key] != null ? String(st[key]).trim() : "";
      const n = parseInt(raw, 10);
      if (!Number.isNaN(n) && n > 0) cfg[lvl] = n;
    }
    return cfg;
}

// --- Spells Filtering ---

function filterSpells(allSpells, criteria, mySpellsMap, viewMode) {
    const q = (criteria.q || "").trim().toLowerCase();
    const school = criteria.school;
    const level = criteria.level;
    const onlyConcentration = criteria.onlyConcentration;
    const onlyRitual = criteria.onlyRitual;
    const noCantrip = criteria.noCantrip;

    const baseFiltered = allSpells.filter((s) => {
      const blob = `${s.name} ${s.rawName || ""} ${s.school} ${s.level}`.toLowerCase();
      const fullText = `${blob} ${s.description || ""}`.toLowerCase();
      const okQ = !q || blob.includes(q);
      const okSchool = !school || s.school === school;
      const okLevel = !level || s.level === level;
      const tDur = s.duration.toLowerCase();
      const okConcentration = !onlyConcentration || tDur.includes("concentrazione");
      const okRitual = !onlyRitual || fullText.includes("rituale");
      const okNoCantrip = !noCantrip || s.level !== "Trucchetto";
      return okQ && okSchool && okLevel && okConcentration && okRitual && okNoCantrip;
    });

    if (viewMode === "mine" && mySpellsMap) {
      return baseFiltered.filter((s) => mySpellsMap.has(s.id));
    }
    return baseFiltered;
}


// --- Inventory Logic ---

function normaliseInventoryImages(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map((entry) => {
    if (typeof entry === "string") {
      const file = entry;
      const base = file.replace(/\.[a-z0-9]+$/i, "");
      const label = base
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return { id: base, label, file };
    }
    const file = entry.file || entry.id || "";
    const base = (entry.id || file || "").replace(/\.[a-z0-9]+$/i, "");
    const label =
      entry.label ||
      base
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    return { id: base, label, file };
  });
}

function buildInventoryImageGroups(defs) {
  const groups = {};
  defs.forEach((def) => {
    const parts = String(def.file || "").split("/");
    const category = parts.length > 1 ? parts[0] : "Base";
    if (!groups[category]) groups[category] = [];
    groups[category].push(def);
  });
  const sortedCategories = Object.keys(groups).sort();
  return { groups, sortedCategories };
}

// --- Download Helper ---
function downloadJSON(filename, obj) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
