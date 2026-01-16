(function initAOS() {
  if (window.AOS) AOS.init({ once: true, duration: 650, offset: 60 });
})();

// -----------------------------
// Autosave (pagina statistiche)
// -----------------------------
const STORAGE_KEY = "dnd_sheet_stats_v1";

function safeJSONParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

function bindAutosave() {
  const inputs = document.querySelectorAll("[data-bind]");
  if (!inputs.length) return;

  const saved = safeJSONParse(localStorage.getItem(STORAGE_KEY)) || {};
  inputs.forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (saved[key] != null) el.value = saved[key];
  });

  const save = () => {
    const data = {};
    inputs.forEach((el) => {
      const key = el.getAttribute("data-bind");
      data[key] = el.value;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  inputs.forEach((el) => {
    el.addEventListener("input", save);
    el.addEventListener("change", save);
  });

  const btnReset = document.getElementById("btnReset");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);

      // reset campi
      inputs.forEach((el) => (el.value = ""));

      // reset inventario
      if (typeof setInventory === "function") setInventory([]);
      if (typeof renderInventory === "function") renderInventory();

      // ricalcolo modificatori
      if (typeof initAbilityModifiers === "function") initAbilityModifiers();
    });
  }
}

bindAutosave();

function initCloudLoginGate() {
  const authModalEl = document.getElementById("cloudAuthModal");
  if (!authModalEl || !window.bootstrap) return;
  setTimeout(() => {
    if (!window.cloud || window.cloud.user) return;
    const modal = new bootstrap.Modal(authModalEl);
    modal.show();
  }, 500);
}

function initCloudAutoSave() {
  if (!window.cloud || typeof window.cloud.autoSave !== "function") return;
  setInterval(() => {
    window.cloud.autoSave();
  }, 60000);
}

// -----------------------------
// Incantesimi page rendering
// -----------------------------
async function initSpellsPage() {
  const slugId = (str) =>
    String(str ?? "")
      .toLowerCase()
      .trim()
      .replaceAll("à", "a")
      .replaceAll("è", "e")
      .replaceAll("ì", "i")
      .replaceAll("ò", "o")
      .replaceAll("ù", "u")
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-|-$/g, "");

  const spellId = (sp) => {
    if (sp.id) return sp.id;
    if (sp.img) {
      const parts = String(sp.img).split("/");
      const file = parts[parts.length - 1] || "";
      if (file) return slugId(file.replace(/\.(jpg|jpeg|png|webp)$/i, ""));
    }
    return slugId(sp.name);
  };

  const normalizeRange = (range) => {
    const raw = String(range ?? "").trim();
    if (!raw) return "";
    const feetMatch = raw.match(/^(\d+)\s*feet$/i);
    if (feetMatch) {
      const feet = parseInt(feetMatch[1], 10);
      if (!Number.isNaN(feet)) {
        const meters = Math.round(feet * 0.3);
        return `${meters} metri`;
      }
    }
    return raw;
  };

  const grid = document.getElementById("spellsGrid");
  if (!grid) return;

  if (!window.SPELLS) {
    try {
      let rawSpells = window.RAW_SPELLS;
      if (!rawSpells) {
        const r = await fetch('./data/2024_spells.json');
        rawSpells = await r.json();
      }

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

        const levelLabel = s.level === 0 ? "Trucchetto" : String(s.level);

        const displayName = s.displayName || s.name;
        const imageName = s.imageName || s.originalName || s.name;
        const imgPath = s.img || `Images/spells/${imageName}.jpg`;

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
          classes: s.classes, // Utile per filtri futuri
          ritual: s.ritual
        };
      });

    } catch (err) {
      console.error(err);
      return;
    }
  }

  const search = document.getElementById("spellSearch");
  const schoolFilter = document.getElementById("schoolFilter");
  const levelFilter = document.getElementById("levelFilter");
  const counter = document.getElementById("counter");
  const viewSelect = document.getElementById("spellView");
  const mineCountEl = document.getElementById("mineCount");
  const btnExportMySpells = document.getElementById("btnExportMySpells");
  const fileImportMySpells = document.getElementById("fileImportMySpells");
  const filterConcentration = document.getElementById("filterConcentration");
  const filterRitual = document.getElementById("filterRitual");
  const filterNoCantrip = document.getElementById("filterNoCantrip");
  const levelSummaryEl = document.getElementById("levelSummary");
  const slotsTrackerEl = document.getElementById("slotsTracker");
  const slotsRowEl = document.getElementById("slotsRow");

  const modalEl = document.getElementById("spellModal");
  const modal = modalEl ? new bootstrap.Modal(modalEl) : null;

  const state = {
    q: "",
    school: "",
    level: "",
    onlyConcentration: false,
    onlyRitual: false,
    noCantrip: false,
  };

  if (levelFilter) {
    const levelsSet = new Set();
    let hasCantrip = false;
    window.SPELLS.forEach((s) => {
      if (s.level === "Trucchetto") {
        hasCantrip = true;
        return;
      }
      const n = parseInt(s.level, 10);
      if (!Number.isNaN(n)) levelsSet.add(n);
    });

    levelFilter.innerHTML = "";

    const optAll = document.createElement("option");
    optAll.value = "";
    optAll.textContent = "Tutti i livelli";
    levelFilter.appendChild(optAll);

    if (hasCantrip) {
      const optCantrip = document.createElement("option");
      optCantrip.value = "Trucchetto";
      optCantrip.textContent = "Trucchetto";
      levelFilter.appendChild(optCantrip);
    }

    Array.from(levelsSet)
      .sort((a, b) => a - b)
      .forEach((lvl) => {
        const opt = document.createElement("option");
        opt.value = String(lvl);
        opt.textContent = String(lvl);
        levelFilter.appendChild(opt);
      });
  }

  const MY_SPELLS_KEY = "dnd_my_spells_v1";

  const ensureSpellIdsInPlace = () => {
    window.SPELLS.forEach((sp) => {
      sp.id = spellId(sp);
    });
  };

  const safeJSONParseLocal = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  };

  const loadMySpells = () => {
    const raw = localStorage.getItem(MY_SPELLS_KEY);
    const parsed = raw ? safeJSONParseLocal(raw) : null;
    if (parsed && Array.isArray(parsed.selected)) return parsed.selected;
    return [];
  };

  const saveMySpells = (selected) => {
    const payload = {
      schema: "dnd-my-spells",
      version: 1,
      updatedAt: new Date().toISOString(),
      selected,
    };
    localStorage.setItem(MY_SPELLS_KEY, JSON.stringify(payload));
  };

  const myIndexMap = (selected) => {
    const map = new Map();
    selected.forEach((x) => {
      if (x && x.id) map.set(x.id, x);
    });
    return map;
  };

  const toggleMySpell = (id, on) => {
    const selected = loadMySpells();
    const map = myIndexMap(selected);
    if (on) {
      if (!map.has(id)) selected.push({ id, asCantrip: null, notes: "" });
    } else {
      const i = selected.findIndex((x) => x.id === id);
      if (i >= 0) selected.splice(i, 1);
    }
    saveMySpells(selected);
    return selected;
  };

  const updateMySpellMeta = (id, patch) => {
    const selected = loadMySpells();
    const i = selected.findIndex((x) => x.id === id);
    if (i === -1) {
      selected.push({
        id,
        asCantrip: null,
        notes: "",
        prepared: false,
        ...patch,
      });
    } else {
      selected[i] = { ...selected[i], ...patch };
    }
    saveMySpells(selected);
    return selected;
  };

  const setMineCountUI = (selected) => {
    if (!mineCountEl) return;
    const count = selected.length;
    if (!count) {
      mineCountEl.classList.add("d-none");
      mineCountEl.innerHTML =
        '<i class="bx bxs-bookmark-star me-1"></i> Nessuna selezionata';
    } else {
      mineCountEl.classList.remove("d-none");
      mineCountEl.innerHTML = `<i class="bx bxs-bookmark-star me-1"></i> Selezionate ${count}`;
    }
  };

  const getCurrentView = () =>
    viewSelect && viewSelect.value === "mine" ? "mine" : "all";

  const bindMineToggles = () => {
    const selected = loadMySpells();
    const map = myIndexMap(selected);
    document.querySelectorAll("[data-mine-toggle]").forEach((cb) => {
      const id = cb.getAttribute("data-mine-toggle");
      cb.checked = id ? map.has(id) : false;
      cb.addEventListener("change", () => {
        const targetId = cb.getAttribute("data-mine-toggle");
        if (!targetId) return;
        const updated = toggleMySpell(targetId, cb.checked);
        const label = cb.closest(".mine-chip")?.querySelector("span");
        if (label) label.textContent = cb.checked ? "Mia" : "Aggiungi";
        setMineCountUI(updated);
        if (getCurrentView() === "mine" && !cb.checked) apply();
      });
    });
    document.querySelectorAll("[data-prepared-toggle]").forEach((cb) => {
      const id = cb.getAttribute("data-prepared-toggle");
      const entry = id ? map.get(id) : null;
      cb.checked = !!entry && !!entry.prepared;
      cb.addEventListener("change", () => {
        const targetId = cb.getAttribute("data-prepared-toggle");
        if (!targetId) return;
        let allSelected = loadMySpells();
        const allMap = myIndexMap(allSelected);
        if (cb.checked && !allMap.has(targetId)) {
          allSelected = toggleMySpell(targetId, true);
        }
        const updated = updateMySpellMeta(targetId, { prepared: cb.checked });
        const label = cb.closest(".mine-chip")?.querySelector("span");
        if (label) label.textContent = cb.checked ? "Preparato" : "Non prep.";
        setMineCountUI(updated);
        if (getCurrentView() === "mine" && !cb.checked) apply();
      });
    });
    setMineCountUI(selected);
  };

  ensureSpellIdsInPlace();

  const getFilteredSpells = () => {
    const q = state.q.trim().toLowerCase();
    const school = state.school;
    const level = state.level;
    const onlyConcentration = state.onlyConcentration;
    const onlyRitual = state.onlyRitual;
    const noCantrip = state.noCantrip;
    const view = getCurrentView();

    const selected = loadMySpells();
    const map = myIndexMap(selected);

    const baseFiltered = window.SPELLS.filter((s) => {
      const blob = `${s.name} ${s.rawName || ""} ${s.school} ${s.level}`.toLowerCase();
      const fullText = `${blob} ${s.description || ""}`.toLowerCase();
      const okQ = !q || blob.includes(q);
      const okSchool = !school || s.school === school;
      const okLevel = !level || s.level === level;
      const tDur = s.duration.toLowerCase();
      const okConcentration =
        !onlyConcentration || tDur.includes("concentrazione");
      const okRitual = !onlyRitual || fullText.includes("rituale");
      const okNoCantrip = !noCantrip || s.level !== "Trucchetto";
      return (
        okQ &&
        okSchool &&
        okLevel &&
        okConcentration &&
        okRitual &&
        okNoCantrip
      );
    });

    if (view === "mine") {
      return baseFiltered.filter((s) => map.has(s.id));
    }

    return baseFiltered;
  };

  const updateLevelSummary = (list) => {
    if (!levelSummaryEl) return;
    const selected = loadMySpells();
    const map = myIndexMap(selected);
    const counts = {};
    list.forEach((s) => {
      if (!map.has(s.id)) return;
      const label =
        s.level === "Trucchetto" ? "Trucchetti" : `Lv ${s.level || "?"}`;
      counts[label] = (counts[label] || 0) + 1;
    });
    const labels = Object.keys(counts);
    if (!labels.length) {
      levelSummaryEl.textContent = "";
      return;
    }
    const sorted = labels.sort((a, b) => {
      if (a === "Trucchetti") return -1;
      if (b === "Trucchetti") return 1;
      const na = parseInt(a.replace(/\D+/g, ""), 10);
      const nb = parseInt(b.replace(/\D+/g, ""), 10);
      if (isNaN(na) || isNaN(nb)) return a.localeCompare(b);
      return na - nb;
    });
    levelSummaryEl.innerHTML = sorted
      .map(
        (lbl) =>
          `<span class="level-summary-pill">${lbl}: ${counts[lbl]}</span>`
      )
      .join("");
  };

  const loadSlotsUsage = () => {
    const raw = localStorage.getItem("dnd_spell_slots_usage_v1");
    try {
      return raw ? JSON.parse(raw) || {} : {};
    } catch (e) {
      return {};
    }
  };

  const saveSlotsUsage = (usage) => {
    localStorage.setItem("dnd_spell_slots_usage_v1", JSON.stringify(usage));
  };

  const getSlotsMaxConfig = () => {
    if (typeof getSavedState !== "function") return {};
    const st = getSavedState();
    const cfg = {};
    for (let lvl = 1; lvl <= 5; lvl++) {
      const key = `slots${lvl}`;
      const raw = st && st[key] != null ? String(st[key]).trim() : "";
      const n = parseInt(raw, 10);
      if (!Number.isNaN(n) && n > 0) cfg[lvl] = n;
    }
    return cfg;
  };

  const renderSlotsTracker = () => {
    if (!slotsTrackerEl || !slotsRowEl) return;
    const maxCfg = getSlotsMaxConfig();
    const levels = Object.keys(maxCfg);
    if (!levels.length) {
      slotsTrackerEl.classList.add("d-none");
      slotsRowEl.innerHTML = "";
      return;
    }

    const usage = loadSlotsUsage();
    slotsTrackerEl.classList.remove("d-none");

    slotsRowEl.innerHTML = levels
      .map((lvl) => {
        const max = maxCfg[lvl];
        const used = Math.min(usage[lvl] || 0, max);
        const remaining = Math.max(max - used, 0);
        return `
          <div class="slot-pill" data-slot-level="${lvl}">
            <span class="slot-label">${lvl}°</span>
            <button type="button" class="slot-btn" data-slot-action="dec">−</button>
            <span class="slot-value">${remaining}/${max}</span>
            <button type="button" class="slot-btn" data-slot-action="inc">+</button>
          </div>
        `;
      })
      .join("");

    slotsRowEl.querySelectorAll(".slot-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pill = btn.closest(".slot-pill");
        if (!pill) return;
        const lvl = pill.getAttribute("data-slot-level");
        if (!lvl) return;
        const max = maxCfg[lvl] || 0;
        const usageNow = loadSlotsUsage();
        const usedNow = usageNow[lvl] || 0;
        const action = btn.getAttribute("data-slot-action");
        let nextUsed = usedNow;
        if (action === "inc") nextUsed = Math.min(usedNow + 1, max);
        if (action === "dec") nextUsed = Math.max(usedNow - 1, 0);
        usageNow[lvl] = nextUsed;
        saveSlotsUsage(usageNow);
        const remaining = Math.max(max - nextUsed, 0);
        const valueEl = pill.querySelector(".slot-value");
        if (valueEl) valueEl.textContent = `${remaining}/${max}`;
      });
    });

    const resetBtn = slotsTrackerEl.querySelector(".slots-reset");
    if (resetBtn) {
      resetBtn.onclick = () => {
        const empty = {};
        saveSlotsUsage(empty);
        renderSlotsTracker();
      };
    }
  };

  const apply = () => {
    const filtered = getFilteredSpells();

    renderSpells(filtered);
    updateLevelSummary(filtered);
    renderSlotsTracker();
    if (counter)
      counter.innerHTML = `<i class='bx bx-collection me-1'></i> ${filtered.length}`;
  };

  const renderSpells = (list) => {
    const selected = loadMySpells();
    const map = myIndexMap(selected);
    grid.innerHTML = list.map((s, idx) => spellCardHTML(s, idx)).join("");
    grid.querySelectorAll("[data-open-spell]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.getAttribute("data-open-spell"));
        const spell = list[i];
        if (!spell) return;
        openModal(spell);
      });
    });
    grid.querySelectorAll("[data-mine-toggle]").forEach((cb) => {
      const id = cb.getAttribute("data-mine-toggle");
      cb.checked = id ? map.has(id) : false;
    });
    bindMineToggles();
    if (window.AOS) AOS.refresh();
  };

  const openModal = (s) => {
    document.getElementById("modalTitle").textContent = s.name;
    document.getElementById("modalMeta").textContent = `${labelLevel(
      s.level
    )} • ${s.school}`;
    document.getElementById("modalImg").src = s.img;

    document.getElementById("mSchool").textContent = s.school;
    document.getElementById("mLevel").textContent = labelLevel(s.level);
    document.getElementById("mCast").textContent = s.castingTime;
    document.getElementById("mRange").textContent = s.range;
    document.getElementById("mComp").textContent = s.components;
    document.getElementById("mDur").textContent = s.duration;

    document.getElementById("mDesc").innerHTML = paragraphs(s.description);

    const notesArea = document.getElementById("mNotes");
    if (notesArea) {
      const selected = loadMySpells();
      const map = myIndexMap(selected);
      const entry = map.get(s.id);
      notesArea.value = entry && entry.notes ? entry.notes : "";
      notesArea.oninput = () => {
        updateMySpellMeta(s.id, { notes: notesArea.value });
      };
    }

    const wrap = document.getElementById("mSpecialWrap");
    const txt = document.getElementById("mSpecial");
    if (s.special) {
      wrap.classList.remove("d-none");
      txt.textContent = s.special;
    } else {
      wrap.classList.add("d-none");
      txt.textContent = "";
    }

    if (modal) modal.show();
  };

  const labelLevel = (lvl) =>
    lvl === "Trucchetto" ? "Trucchetto" : `Livello ${lvl}`;

  const paragraphs = (text) =>
    text
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `<p class="mb-2">${escapeHTML(t)}</p>`)
      .join("");

  const escapeHTML = (str) =>
    str
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  const spellCardHTML = (s, idx) => {
    const selected = loadMySpells();
    const map = myIndexMap(selected);
    const isMine = map.has(s.id);
    const entry = map.get(s.id);
    const isPrepared = !!(entry && entry.prepared);
    const badges = [
      `<span class="badge-glass"><i class="bx bx-library me-1"></i>${s.school}</span>`,
      `<span class="badge-glass"><i class="bx bx-layer me-1"></i>${
        s.level === "Trucchetto" ? "Trucchetto" : `Lv ${s.level}`
      }</span>`,
    ];

    if (s.special)
      badges.push(
        `<span class="badge-glass"><i class="bx bxs-star me-1"></i>1/LR gratis</span>`
      );

    const mineToggle = `
      <div class="spell-mine-toggle">
        <label class="mine-chip">
          <input type="checkbox" data-mine-toggle="${s.id}">
          <span>${isMine ? "Mia" : "Aggiungi"}</span>
        </label>
      </div>`;

    return `
    <div class="col-12 col-md-6 col-xl-4" data-aos="fade-up" data-aos-delay="${Math.min(
      idx * 25,
      200
    )}">
      <article class="spell-card v2 school-${slugSchool(s.school)}${isMine ? " is-mine" : ""
      }">
      
      <div class="spell-thumb v2">
      <img src="${s.img}" alt="placeholder ${s.name}">
      <div class="spell-overlay"></div>
      <div class="spell-thumb-footer">
      <div class="spell-title-row">
      <h3 class="spell-title v2">${s.name}</h3>
      <span class="spell-tag">${pickTag(s)}</span>
      </div>
      <div class="spell-sub v2">${labelLevel(s.level)} • ${s.castingTime}</div>
      </div>
      </div>
      
      ${mineToggle}
      <div class="spell-badges">${badges.join("")}</div>
        <div class="spell-body v2">
          <div class="spell-mini v2">
            <div class="mini-pill"><i class="bx bx-target-lock"></i><b>${s.range}</b></div>
            <div class="mini-pill"><i class="bx bx-time-five"></i><b>${shortDuration(
              s.duration
            )}</b></div>
            <div class="mini-pill"><i class="bx bx-flask"></i><b>${shortComponents(
              s.components
            )}</b></div>
          </div>

          <button class="btn-soft v2 mt-3" data-open-spell="${idx}">
            <i class="bx bx-detail me-1"></i> Dettagli
          </button>
        </div>
      </article>
    </div>
  `;
  };

  // helper nuovi (incollali sotto agli altri helper nella stessa funzione initSpellsPage)

  const slugSchool = (school) =>
    school
      .toLowerCase()
      .replaceAll("à", "a")
      .replaceAll("è", "e")
      .replaceAll("ì", "i")
      .replaceAll("ò", "o")
      .replaceAll("ù", "u")
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-|-$/g, "");

  const shortDuration = (d) => {
    // rende più compatto: "Concentrazione, fino a 10 minuti" -> "Conc. 10m"
    const t = d.toLowerCase();
    if (t.includes("istantanea")) return "Istant.";
    if (t.includes("1 round")) return "1 round";
    if (t.includes("8 ore")) return "8 ore";
    if (t.includes("1 ora")) return "1 ora";
    if (t.includes("10 minuti")) return "10 min";
    if (t.includes("1 minuto")) return "1 min";
    if (t.includes("fino a"))
      return d.replace("Concentrazione, ", "").replace("fino a ", "");
    return d.length > 10 ? d.slice(0, 10) + "…" : d;
  };

  const shortComponents = (c) => {
    const base = c.split("(")[0].trim();
    return base.length > 14 ? base.slice(0, 14) + "…" : base;
  };

  const pickTag = (s) => {
    const map = {
      Necromanzia: "☠ Necromanzia",
      Abiurazione: "🛡 Abiurazione",
      Ammaliamento: "🌀 Ammaliamento",
      Divinazione: "👁 Divinazione",
      Illusione: "🫥 Illusione",
      Invocazione: "✨ Invocazione",
      Trasmutazione: "🔧 Trasmutazione",
      Congiurazione: "🌪️ Congiurazione",
      Evocazione: "🌪️ Evocazione",
    };
    return map[s.school] || "—";
  };

  const makeOneLine = (s) => {
    const parts = [
      s.name,
      `${s.school} • ${s.level === "Trucchetto" ? "Trucchetto" : `Livello ${s.level}`
      }`,
      `Tempo: ${s.castingTime}`,
      `Gittata: ${s.range}`,
      `Comp: ${s.components}`,
      `Durata: ${s.duration}`,
      `Descrizione: ${s.description.replaceAll("\n", " ")}`,
    ];
    if (s.special) parts.push(`Uso speciale: ${s.special}`);
    return parts.join(" | ");
  };

  if (search)
    search.addEventListener("input", (e) => {
      state.q = e.target.value;
      apply();
    });
  if (schoolFilter)
    schoolFilter.addEventListener("change", (e) => {
      state.school = e.target.value;
      apply();
    });
  if (levelFilter)
    levelFilter.addEventListener("change", (e) => {
      state.level = e.target.value;
      apply();
    });

  if (filterConcentration)
    filterConcentration.addEventListener("change", (e) => {
      state.onlyConcentration = e.target.checked;
      apply();
    });

  if (filterRitual)
    filterRitual.addEventListener("change", (e) => {
      state.onlyRitual = e.target.checked;
      apply();
    });

  if (filterNoCantrip)
    filterNoCantrip.addEventListener("change", (e) => {
      state.noCantrip = e.target.checked;
      apply();
    });

  if (viewSelect)
    viewSelect.addEventListener("change", () => {
      apply();
    });

  if (btnExportMySpells) {
    btnExportMySpells.addEventListener("click", () => {
      const payload = {
        schema: "dnd-my-spells",
        version: 1,
        exportedAt: new Date().toISOString(),
        selected: loadMySpells(),
      };
      const name = "mie_magie";
      downloadJSON(`${name}.json`, payload);
    });
  }

  if (fileImportMySpells) {
    fileImportMySpells.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const json = JSON.parse(text);
        const incoming = Array.isArray(json?.selected)
          ? json.selected
          : Array.isArray(json)
            ? json
            : [];

        const cleaned = incoming
          .filter(
            (x) =>
              x &&
              typeof x === "object" &&
              typeof x.id === "string" &&
              x.id.trim()
          )
          .map((x) => ({
            id: x.id.trim(),
            asCantrip: x.asCantrip ?? null,
            notes: (x.notes ?? "").toString(),
          }));

        saveMySpells(cleaned);
        apply();
      } catch (err) {
        alert("File JSON non valido.");
        console.error(err);
      } finally {
        e.target.value = "";
      }
    });
  }

  apply();
}

initSpellsPage();

const MY_SPELLS_KEY_GLOBAL = "dnd_my_spells_v1";
const MY_FEATURES_KEY_GLOBAL = "dnd_my_features_v1";
const MY_INVOCATIONS_KEY_GLOBAL = "dnd_my_invocations_v1";

function loadMySpellsGlobal() {
  const raw = localStorage.getItem(MY_SPELLS_KEY_GLOBAL);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
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

/* =========================
   AUTO MODIFICATORI D&D
   ========================= */

function calcMod(score) {
  const n = parseInt(score, 10);
  if (isNaN(n)) return "";
  const mod = Math.floor((n - 10) / 2);
  return (mod >= 0 ? "+" : "") + mod;
}

function initAbilityModifiers() {
  const abilities = [
    ["str", "strMod"],
    ["dex", "dexMod"],
    ["con", "conMod"],
    ["int", "intMod"],
    ["wis", "wisMod"],
    ["cha", "chaMod"],
  ];

  abilities.forEach(([scoreKey, modKey]) => {
    const scoreInput = document.querySelector(`[data-bind="${scoreKey}"]`);
    const modInput = document.querySelector(`[data-bind="${modKey}"]`);

    if (!scoreInput || !modInput) return;

    const update = () => {
      modInput.value = calcMod(scoreInput.value);
    };

    // calcolo live
    scoreInput.addEventListener("input", update);

    // calcolo iniziale (se già salvato)
    update();
  });
}

initAbilityModifiers();

/* =========================
   EXPORT / IMPORT JSON PG
   ========================= */

function collectBindData() {
  const inputs = document.querySelectorAll("[data-bind]");
  const data = {};

  inputs.forEach((el) => {
    const key = el.getAttribute("data-bind");
    data[key] = (el.value ?? "").toString();
  });

  // inventario separato (tabella modulare)
  if (typeof getInventory === "function") {
    data.inventory = getInventory();
  } else {
    data.inventory = [];
  }

  const feats = loadMyFeaturesGlobal();
  const invocations = loadMyInvocationsGlobal();
  data.myFeatures = Array.isArray(feats) ? feats : [];
  data.myInvocations = Array.isArray(invocations) ? invocations : [];

  return data;
}

function applyBindData(payload) {
  // supporta sia { data: {...} } sia json “piatto”
  const data =
    payload &&
      typeof payload === "object" &&
      payload.data &&
      typeof payload.data === "object"
      ? payload.data
      : payload;

  if (!data || typeof data !== "object") return;

  if (Array.isArray(data.myFeatures)) {
    const payload = {
      schema: "dnd-my-features",
      version: 1,
      updatedAt: new Date().toISOString(),
      selected: data.myFeatures,
    };
    localStorage.setItem(MY_FEATURES_KEY_GLOBAL, JSON.stringify(payload));
  }

  if (Array.isArray(data.myInvocations)) {
    const payload = {
      schema: "dnd-my-invocations",
      version: 1,
      updatedAt: new Date().toISOString(),
      selected: data.myInvocations,
    };
    localStorage.setItem(MY_INVOCATIONS_KEY_GLOBAL, JSON.stringify(payload));
  }

  // applica campi data-bind
  const inputs = document.querySelectorAll("[data-bind]");
  inputs.forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (data[key] !== undefined && data[key] !== null) {
      el.value = data[key];
    }
  });

  // inventario
  if (typeof setInventory === "function" && Array.isArray(data.inventory)) {
    setInventory(data.inventory);
  }
  if (typeof renderInventory === "function") {
    renderInventory();
  }

  // salva tutto nello storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collectBindData()));

  // ricalcola modificatori (se presente)
  if (typeof initAbilityModifiers === "function") {
    initAbilityModifiers();
  }

  if (typeof renderOwnedFeaturesInvocations === "function") {
    renderOwnedFeaturesInvocations();
  }
}

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

function initExportImport() {
  const btnExport = document.getElementById("btnExport");
  const btnExportFull = document.getElementById("btnExportFull");
  const fileImport = document.getElementById("fileImport");
  const btnCloudQuickSave = document.getElementById("btnCloudQuickSave");

  if (btnExport) {
    btnExport.addEventListener("click", () => {
      const data = collectBindData();
      const payload = {
        schema: "dnd-sheet-pg",
        version: 1,
        exportedAt: new Date().toISOString(),
        data,
      };

      const name = (data.name || "personaggio").trim().replaceAll(/\s+/g, "_");
      downloadJSON(`${name}_pg.json`, payload);
    });
  }

  if (btnExportFull) {
    btnExportFull.addEventListener("click", () => {
      const data = collectBindData();
      const spellsPayload = loadMySpellsGlobal();
      const payload = {
        schema: "dnd-full",
        version: 1,
        exportedAt: new Date().toISOString(),
        sheet: data,
        mySpells: spellsPayload,
      };
      const name = (data.name || "personaggio").trim().replaceAll(/\s+/g, "_");
      downloadJSON(`${name}_full.json`, payload);
    });
  }

  if (fileImport) {
    fileImport.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const json = JSON.parse(text);

        // supporta sia il formato "payload" sia un json piatto
        const data =
          json?.data && typeof json.data === "object" ? json.data : json;

        applyBindData(data);
      } catch (err) {
        alert("JSON non valido o file corrotto.");
        console.error(err);
      } finally {
        // reset per poter ricaricare lo stesso file
        e.target.value = "";
      }
    });
  }

  if (btnCloudQuickSave) {
    btnCloudQuickSave.addEventListener("click", () => {
      if (!window.cloud || !window.cloud.user) {
        const authModalEl = document.getElementById("cloudAuthModal");
        if (authModalEl && window.bootstrap) {
          const modal = bootstrap.Modal.getOrCreateInstance(authModalEl);
          modal.show();
        }
        return;
      }
      window.cloud.saveCharacter(null, { silent: false, forceOverwrite: true });
    });
  }
}

initExportImport();
initCloudAutoSave();

/* =========================
   INVENTARIO MODULARE
   ========================= */

const INV_KEY = "inventory"; // dentro lo stesso JSON salvato

const INVENTORY_IMAGE_BASE = "./Images/objects/";

let INVENTORY_PRESET_IMAGES = [];
let INVENTORY_IMAGE_GROUPS = null;
const INVENTORY_IMAGE_FILTER_STATE = {
  q: "",
  category: "",
};

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

function loadInventoryImages() {
  if (INVENTORY_PRESET_IMAGES.length) {
    return Promise.resolve(INVENTORY_PRESET_IMAGES);
  }
  return fetch("./Images/objects/index.json", { cache: "no-store" })
    .then((res) => (res.ok ? res.json() : []))
    .catch(() => [])
    .then((data) => {
      const list = Array.isArray(data) ? data : (data.images || []);
      INVENTORY_PRESET_IMAGES = normaliseInventoryImages(list);
      return INVENTORY_PRESET_IMAGES;
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

function renderInventoryImageList() {
  const imgList = document.getElementById("invImgList");
  if (!imgList || !INVENTORY_IMAGE_GROUPS) return;

  const q = INVENTORY_IMAGE_FILTER_STATE.q.trim().toLowerCase();
  const categoryFilter = INVENTORY_IMAGE_FILTER_STATE.category;
  const { groups, sortedCategories } = INVENTORY_IMAGE_GROUPS;

  let html = "";
  let totalMatches = 0;

  sortedCategories.forEach((cat, idx) => {
    if (categoryFilter && categoryFilter !== cat) {
      return;
    }

    const defs = groups[cat] || [];
    const filteredDefs = defs.filter((def) => {
      if (!q) return true;
      const label = String(def.label || "").toLowerCase();
      return label.includes(q);
    });

    if (!filteredDefs.length) {
      return;
    }

    totalMatches += filteredDefs.length;

    html += `
      <div class="inv-img-category-title" data-cat-idx="${idx}">
        <span>${cat}</span>
        <i class="bx bx-chevron-down"></i>
      </div>
      <div class="inv-img-grid" id="cat-grid-${idx}">
    `;

    html += filteredDefs
      .map(
        (def) => `
        <button type="button" class="inv-img-option" data-inv-img="${def.file}">
          <div class="inv-img-option-thumb">
            <img src="${INVENTORY_IMAGE_BASE + def.file}" alt="${def.label}">
          </div>
          <div class="tiny text-mutedish mt-1">${def.label}</div>
        </button>
      `
      )
      .join("");

    html += `</div>`;
  });

  if (!totalMatches) {
    html = `
      <div class="tiny text-mutedish">Nessuna immagine corrisponde alla ricerca</div>
    `;
  }

  html += `
    <div style="text-align: center; margin-top: 1rem; opacity: 0.6;" class="tiny text-mutedish pb-2">
      Icons by game-icons.net — CC BY 3.0
    </div>
  `;

  imgList.innerHTML = html;

  imgList.querySelectorAll(".inv-img-category-title").forEach((el) => {
    el.addEventListener("click", () => {
      const idx = el.getAttribute("data-cat-idx");
      const grid = document.getElementById("cat-grid-" + idx);
      if (grid) {
        el.classList.toggle("collapsed");
        grid.classList.toggle("collapsed");
      }
    });
  });

  imgList.querySelectorAll("[data-inv-img]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (invEditingIndex == null) return;
      const file = btn.getAttribute("data-inv-img");
      const items = getInventory();
      const it = items[invEditingIndex];
      if (!it) return;
      it.img = file;
      setInventory(items);
      updateInvImagePreview(file);
      renderInventory();
    });
  });
}

function getSavedState() {
  return safeJSONParse(localStorage.getItem(STORAGE_KEY)) || {};
}

function setSavedState(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function toggleTheme() {
  const root = document.documentElement;
  const body = document.body;
  const current = root.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  if (body) body.setAttribute("data-theme", next);
  localStorage.setItem("dnd_theme", next);
}

function initTheme() {
  const root = document.documentElement;
  const body = document.body;
  const raw = localStorage.getItem("dnd_theme");
  const saved = raw === "light" || raw === "dark" ? raw : "dark";

  root.setAttribute("data-theme", saved);
  if (body) body.setAttribute("data-theme", saved);
  const btn = document.getElementById("btnThemeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      toggleTheme();
    });
  }
}

initTheme();

function initConditions() {
  const chips = document.querySelectorAll(".condition-chip");
  if (!chips.length) return;

  const st = getSavedState();
  const stored = st.conditions || {};

  chips.forEach((btn) => {
    const key = btn.getAttribute("data-condition");
    if (!key) return;
    if (stored[key]) btn.classList.add("active");

    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const next = getSavedState();
      const cond = next.conditions || {};
      cond[key] = btn.classList.contains("active");
      next.conditions = cond;
      setSavedState(next);
    });
  });
}

initConditions();
renderOwnedFeaturesInvocations();

function renderOwnedFeaturesInvocations() {
  const featsContainer = document.getElementById("ownedFeaturesList");
  const invocationsContainer = document.getElementById("ownedInvocationsList");
  if (!featsContainer && !invocationsContainer) return;

  const feats = loadMyFeaturesGlobal();
  const invocations = loadMyInvocationsGlobal();

  if (featsContainer) {
    if (!feats || !feats.length) {
      featsContainer.innerHTML = `<div class="tiny text-mutedish">Nessun talento selezionato</div>`;
    } else {
      featsContainer.innerHTML = feats
        .map(
          (f) => `
      <div class="mini-row">
      <span>${escapeHTML(f.name || "")}</span>
          ${
        f.prerequisite
          ? `<span class="tiny text-mutedish ms-auto">${escapeHTML(f.prerequisite)}</span>`
          : ""
      }
        </div>
        `
        )
        .join("");
    }
  }

  if (invocationsContainer) {
    if (!invocations || !invocations.length) {
      invocationsContainer.innerHTML = `<div class="tiny text-mutedish">Nessuna invocazione selezionata</div>`;
    } else {
      invocationsContainer.innerHTML = invocations
        .map(
          (v) => `
        <div class="mini-row">
          <span>${escapeHTML(v.name || "")}</span>
          ${
        v.prerequisite
          ? `<span class="tiny text-mutedish ms-auto">${escapeHTML(v.prerequisite)}</span>`
          : ""
      }
        </div>
        `
        )
        .join("");
    }
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

function escapeHTML(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderInventory() {
  const body = document.getElementById("invBody");
  if (!body) return;

  const items = getInventory();

  body.innerHTML = items
    .map((it, idx) => {
      const hasDesc = !!it.desc;
      const hasImg = !!it.img;
      const parts = [];
      if (hasDesc) parts.push("Descrizione");
      if (hasImg) parts.push("Immagine");
      const metaText = parts.length ? parts.join(" • ") : "—";

      const thumbHtml = it.img
        ? `<div class="inv-row-thumb"><img src="${INVENTORY_IMAGE_BASE + it.img}" alt=""></div>`
        : `<div class="inv-row-thumb inv-row-thumb-empty"><i class='bx bx-image-alt'></i></div>`;

      return `
        <tr>
      <td>
        <input class="inv-inline" type="number" min="0" step="1"
          value="${it.qty ?? 1}"
          data-inv-qty="${idx}">
      </td>
      <td>
        <div class="inv-row-main">
          ${thumbHtml}
          <div class="inv-row-main-details">
            <input class="inv-inline" type="text"
              value="${escapeHTML(it.name ?? "")}"
              placeholder="Nome oggetto..."
              data-inv-name="${idx}">
            <div class="inv-muted">
              ${metaText}
            </div>
          </div>
        </div>
      </td>
      <td class="text-end">
        <div class="inv-actions">
        <button class="inv-btn" type="button" data-inv-open="${idx}">
            <i class="bx bx-detail"></i>
          </button>
          <button class="inv-btn" type="button" data-inv-del="${idx}">
            <i class="bx bx-trash"></i>
          </button>
        </div>
      </td>
    </tr>
        `;
    })
    .join("");

  // inline edit qty/name
  body.querySelectorAll("[data-inv-qty]").forEach((el) => {
    el.addEventListener("input", () => {
      const i = Number(el.getAttribute("data-inv-qty"));
      const items = getInventory();
      items[i].qty = Number(el.value || 0);
      setInventory(items);
    });
  });

  body.querySelectorAll("[data-inv-name]").forEach((el) => {
    el.addEventListener("input", () => {
      const i = Number(el.getAttribute("data-inv-name"));
      const items = getInventory();
      items[i].name = el.value;
      setInventory(items);
    });
  });

  // open modal
  body.querySelectorAll("[data-inv-open]").forEach((btn) => {
    btn.addEventListener("click", () =>
      openInvModal(Number(btn.getAttribute("data-inv-open")))
    );
  });

  // delete
  body.querySelectorAll("[data-inv-del]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-inv-del"));
      const items = getInventory();
      items.splice(i, 1);
      setInventory(items);
      renderInventory();
    });
  });
}

let invModal = null;
let invEditingIndex = null;

function initInventory() {
  const addBtn = document.getElementById("invAdd");
  const modalEl = document.getElementById("invModal");
  if (modalEl) invModal = new bootstrap.Modal(modalEl);

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const items = getInventory();
      items.push({ qty: 1, name: "", desc: "" });
      setInventory(items);
      renderInventory();
      openInvModal(items.length - 1);
    });
  }

  // hook modal buttons
  const btnSave = document.getElementById("invSave");
  const btnDelete = document.getElementById("invDelete");
  const imgChoose = document.getElementById("invImgChoose");
  const imgPanel = document.getElementById("invImgPanel");
  const imgList = document.getElementById("invImgList");
  const imgSearch = document.getElementById("invImgSearch");
  const imgCategory = document.getElementById("invImgCategory");

  if (btnSave) {
    btnSave.addEventListener("click", () => {
      if (invEditingIndex == null) return;
      const items = getInventory();

      items[invEditingIndex] = {
        ...items[invEditingIndex],
        qty: Number(document.getElementById("invQty").value || 0),
        name: document.getElementById("invName").value,
        desc: document.getElementById("invDesc").value,
      };

      setInventory(items);
      renderInventory();
      invModal?.hide();
    });
  }

  if (btnDelete) {
    btnDelete.addEventListener("click", () => {
      if (invEditingIndex == null) return;
      const items = getInventory();
      items.splice(invEditingIndex, 1);
      setInventory(items);
      renderInventory();
      invModal?.hide();
    });
  }

  if (imgList) {
    loadInventoryImages().then((defs) => {
      if (!defs || !defs.length) {
        imgList.innerHTML =
          `<div class="tiny text-mutedish">Nessuna immagine disponibile</div>`;
        return;
      }

      INVENTORY_IMAGE_GROUPS = buildInventoryImageGroups(defs);

      if (imgCategory && INVENTORY_IMAGE_GROUPS) {
        const { sortedCategories } = INVENTORY_IMAGE_GROUPS;
        imgCategory.innerHTML =
          `<option value="">Tutte le categorie</option>` +
          sortedCategories
            .map(
              (cat) =>
                `<option value="${cat}">${cat}</option>`
            )
            .join("");
      }

      renderInventoryImageList();
    });
  }

  if (imgSearch) {
    imgSearch.addEventListener("input", () => {
      INVENTORY_IMAGE_FILTER_STATE.q = imgSearch.value || "";
      renderInventoryImageList();
    });
  }

  if (imgCategory) {
    imgCategory.addEventListener("change", () => {
      INVENTORY_IMAGE_FILTER_STATE.category = imgCategory.value || "";
      renderInventoryImageList();
    });
  }

  if (imgChoose && imgPanel) {
    imgChoose.addEventListener("click", () => {
      imgPanel.classList.toggle("d-none");
    });
  }

  renderInventory();
}

function openInvModal(index) {
  invEditingIndex = index;
  const items = getInventory();
  const it = items[index];
  if (!it) return;

  document.getElementById("invModalSubtitle").textContent = `Oggetto #${ index + 1 } `;

  document.getElementById("invQty").value = it.qty ?? 1;
  document.getElementById("invName").value = it.name ?? "";
  document.getElementById("invDesc").value = it.desc ?? "";

  loadInventoryImages().then(() => {
    const searchEl = document.getElementById("invImgSearch");
    const catEl = document.getElementById("invImgCategory");

    INVENTORY_IMAGE_FILTER_STATE.q = "";
    INVENTORY_IMAGE_FILTER_STATE.category = "";

    if (searchEl) searchEl.value = "";
    if (catEl) catEl.value = "";

    if (INVENTORY_IMAGE_GROUPS) {
      renderInventoryImageList();
    }

    updateInvImagePreview(it.img || "");
    invModal?.show();
  });
}

function updateInvImagePreview(file) {
  const imgEl = document.getElementById("invImgPreviewImg");
  const labelEl = document.getElementById("invImgPreviewLabel");
  if (!imgEl || !labelEl) return;

  const def = INVENTORY_PRESET_IMAGES.find(
    (x) => x.file === file || x.id === file
  );

  if (def) {
    imgEl.src = INVENTORY_IMAGE_BASE + def.file;
    imgEl.classList.remove("d-none");
    labelEl.textContent = def.label;
  } else {
    imgEl.src = "";
    imgEl.classList.add("d-none");
    labelEl.textContent = "Nessuna immagine";
  }
}

// avvia solo se siamo su index e gli elementi esistono
initInventory();
