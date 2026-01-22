
// -----------------------------
// EVENTS: Event Listeners & Coordination
// -----------------------------

// --- Autosave Events ---

function bindAutosaveEvents() {
  const inputs = document.querySelectorAll("[data-bind]");
  if (!inputs.length) return;

  // Apply initial values
  const saved = getSavedState();
  inputs.forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (saved[key] != null) {
      if (el.type === "checkbox") {
        el.checked = saved[key] === true || saved[key] === "true";
      } else {
        el.value = saved[key];
      }
    }
  });

  const save = () => {
    const data = collectBindData(); // from ui.js (which uses logic.js)
    setSavedState(data); // from logic.js
  };

  inputs.forEach((el) => {
    el.addEventListener("input", save);
    el.addEventListener("change", save);
  });

  // Reset Button
  const btnReset = document.getElementById("btnReset");
  if (btnReset) {
    btnReset.addEventListener("click", async () => {
      const msg = "Sei sicuro di voler resettare la scheda? Perderai tutti i dati locali.";
      let proceed = false;
      try {
        if (window.cloud && typeof window.cloud.confirm === "function") {
          proceed = await window.cloud.confirm(msg);
        } else {
          proceed = window.confirm(msg);
        }
      } catch (e) {
        proceed = window.confirm(msg);
      }
      if (!proceed) return;

      setSavedState({});
      inputs.forEach((el) => (el.value = ""));
      if (typeof setInventory === "function") setInventory([]);
      if (typeof renderInventory === "function") renderInventory();
      if (typeof initAbilityModifiers === "function") initAbilityModifiers(); // re-calc
      
      // Clear my spells/feats
      try {
        localStorage.removeItem(MY_SPELLS_KEY_GLOBAL);
        localStorage.removeItem(MY_FEATURES_KEY_GLOBAL);
        localStorage.removeItem(MY_INVOCATIONS_KEY_GLOBAL);
      } catch (e) {}
      
      location.reload(); 
    });
  }
}

// --- Calculation Events ---

function bindCalculationEvents() {
  const inputs = document.querySelectorAll("input[data-bind], select[data-bind]");
  
  const runCalc = () => {
      const data = collectBindData(); // from ui.js
      const stats = calculateStats(data); // from logic.js
      updateCalculatedFields(stats); // from ui.js
  };
  
  inputs.forEach(el => {
      el.addEventListener("input", runCalc);
      el.addEventListener("change", runCalc);
  });
  
  // Initial run
  runCalc();
  // Expose for external calls
  window.initAbilityModifiers = runCalc;
}

// --- Spells Page Events ---

let SPELLS_PAGE_STATE = {
    q: "",
    school: "",
    level: "",
    onlyConcentration: false,
    onlyRitual: false,
    noCantrip: false,
    view: "all" // or "mine"
};

async function initSpellsPageEvents() {
  const grid = document.getElementById("spellsGrid");
  if (!grid) return;

  await loadAllSpells(); // logic.js

  const search = document.getElementById("spellSearch");
  const schoolFilter = document.getElementById("schoolFilter");
  const levelFilter = document.getElementById("levelFilter");
  const viewSelect = document.getElementById("spellView");
  
  const filterConcentration = document.getElementById("filterConcentration");
  const filterRitual = document.getElementById("filterRitual");
  const filterNoCantrip = document.getElementById("filterNoCantrip");
  
  const btnExport = document.getElementById("btnExportMySpells");
  const fileImport = document.getElementById("fileImportMySpells");

  // Populate Level Filter
  if (levelFilter && window.SPELLS) {
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
    
    levelFilter.innerHTML = '<option value="">Tutti i livelli</option>';
    if (hasCantrip) levelFilter.innerHTML += '<option value="Trucchetto">Trucchetto</option>';
    
    Array.from(levelsSet).sort((a, b) => a - b).forEach(lvl => {
        levelFilter.innerHTML += `<option value="${lvl}">${lvl}</option>`;
    });
  }

  const apply = () => {
      SPELLS_PAGE_STATE.q = search ? search.value : "";
      SPELLS_PAGE_STATE.school = schoolFilter ? schoolFilter.value : "";
      SPELLS_PAGE_STATE.level = levelFilter ? levelFilter.value : "";
      SPELLS_PAGE_STATE.onlyConcentration = filterConcentration ? filterConcentration.checked : false;
      SPELLS_PAGE_STATE.onlyRitual = filterRitual ? filterRitual.checked : false;
      SPELLS_PAGE_STATE.noCantrip = filterNoCantrip ? filterNoCantrip.checked : false;
      SPELLS_PAGE_STATE.view = viewSelect ? viewSelect.value : "all";

      const mySpellsPayload = loadMySpellsGlobal(); // logic.js
      const mySpellsList = mySpellsPayload ? mySpellsPayload.selected : [];
      const mySpellsMap = new Map(mySpellsList.map(x => [x.id, x]));

      const filtered = filterSpells(window.SPELLS, SPELLS_PAGE_STATE, mySpellsMap, SPELLS_PAGE_STATE.view); // logic.js
      
      renderSpellsList(filtered, mySpellsMap, SPELLS_PAGE_STATE.view); // ui.js
      renderSlotsTracker(); // ui.js
      
      // Update counts/summaries if elements exist (moved logic here or keep in ui?)
      // Let's keep specific UI updates in UI or do ad-hoc here.
      // We can add `updateLevelSummary` to ui.js if needed, but it's small.
  };

  // Bind inputs
  const bind = (el) => { if(el) { el.addEventListener("input", apply); el.addEventListener("change", apply); } };
  bind(search);
  bind(schoolFilter);
  bind(levelFilter);
  bind(viewSelect);
  bind(filterConcentration);
  bind(filterRitual);
  bind(filterNoCantrip);

  // Global event for spell toggles (delegation)
  document.addEventListener("change", (e) => {
      if (e.target.matches("[data-mine-toggle]")) {
          const id = e.target.getAttribute("data-mine-toggle");
          updateMySpellMetaGlobal(id, { prepared: false }); // Reset prep if removed? Or just toggle existence.
          // Toggle logic:
          let payload = loadMySpellsGlobal();
          if (!payload) payload = { selected: [] };
          const idx = payload.selected.findIndex(x => x.id === id);
          
          if (e.target.checked) {
              if (idx === -1) payload.selected.push({ id, notes: "", prepared: false });
          } else {
              if (idx !== -1) payload.selected.splice(idx, 1);
          }
          saveMySpellsGlobal(payload);
          
          // Refresh if in "mine" view or just update UI?
          // Simplest is to re-apply filters to update UI state
          apply();
      }
      
      if (e.target.matches("[data-prepared-toggle]")) {
          const id = e.target.getAttribute("data-prepared-toggle");
          updateMySpellMetaGlobal(id, { prepared: e.target.checked });
          apply(); // Update UI (counts etc)
      }
      
      // Slot tracking clicks
      if (e.target.closest(".slot-pill")) {
          const pill = e.target.closest(".slot-pill");
          const lvl = pill.getAttribute("data-slot-level");
          // Logic to toggle slot usage
          const usage = loadSlotsUsage();
          const maxCfg = getSlotsMaxConfig();
          const max = maxCfg[lvl] || 0;
          let used = usage[lvl] || 0;
          
          if (used < max) {
              used++;
          } else {
              used = 0; // Cycle back to 0 or just max? User behavior: click to use.
              // Maybe right click to restore? Or click full to reset?
              // Let's assume click increments used, if full reset to 0.
              used = 0;
          }
          usage[lvl] = used;
          saveSlotsUsage(usage);
          renderSlotsTracker();
      }
  });

  // Export/Import
  if (btnExport) {
      btnExport.addEventListener("click", () => {
          const payload = loadMySpellsGlobal();
          downloadJSON("my-spells.json", payload);
      });
  }
  
  if (fileImport) {
      fileImport.addEventListener("change", (e) => {
          const f = e.target.files[0];
          if (!f) return;
          const r = new FileReader();
          r.onload = (ev) => {
              try {
                  const json = JSON.parse(ev.target.result);
                  if (json && Array.isArray(json.selected)) {
                      saveMySpellsGlobal(json);
                      apply();
                      alert("Incantesimi importati!");
                  }
              } catch(ex) {
                  alert("Errore file");
              }
          };
          r.readAsText(f);
      });
  }

  // Initial render
  apply();
}

// --- Inventory Events ---

function bindInventoryEvents() {
    const btnAdd = document.getElementById("invAddBtn");
    if (btnAdd) {
        btnAdd.addEventListener("click", () => {
            const items = getInventory();
            items.push({ name: "", qty: 1, desc: "", img: "" });
            setInventory(items);
            renderInventory(); // ui.js
        });
    }
    
    const search = document.getElementById("invImgSearch");
    if (search) {
        search.addEventListener("input", () => {
            // update global filter state in UI?
            // ui.js exposes INVENTORY_IMAGE_FILTER_STATE
            // We should ideally have a setter or modify it directly if it's global
            if (typeof INVENTORY_IMAGE_FILTER_STATE !== "undefined") {
                INVENTORY_IMAGE_FILTER_STATE.q = search.value;
                renderInventoryImageList(); // ui.js
            }
        });
    }
    
    // Save modal changes
    const btnSave = document.getElementById("invSaveBtn");
    if (btnSave) {
        btnSave.addEventListener("click", () => {
            // Gather data from modal inputs
            const qty = document.getElementById("invQty").value;
            const name = document.getElementById("invName").value;
            const desc = document.getElementById("invDesc").value;
            
            // We need the editing index. It's in ui.js scope (invEditingIndex).
            // We can't access it easily unless exported.
            // Better approach: ui.js should handle the save logic or expose a "saveCurrentItem" function.
            // For now, let's assume ui.js handles the save button click? 
            // No, ui.js just renders.
            
            // Let's access the global variable if possible or modify ui.js to export a save function.
            // Since we can't easily change scope, let's look at how ui.js was written.
            // It has `invEditingIndex` as a top-level let.
            
            // Quick fix: Move the save logic to ui.js or expose a helper.
            // I'll add `saveInventoryModal()` to ui.js later.
            if (typeof saveInventoryModal === "function") {
                saveInventoryModal();
            }
        });
    }
}

// --- Cloud Logic ---

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

function initLeavePageGuard() {
  const path = window.location.pathname || "";
  const isStatsPage =
    path.endsWith("index.html") ||
    path === "/" ||
    path === "";
  if (!isStatsPage) return;
  window.addEventListener("beforeunload", function (e) {
    if (window.cloud && window.cloud.user) {
      return;
    }
    const msg =
      "Non sei loggato: se lasci questa pagina potresti perdere i dati non salvati nel Cloud. Sei sicuro di voler uscire?";
    e.preventDefault();
    e.returnValue = msg;
    return msg;
  });
}

// --- Global Init ---

document.addEventListener("DOMContentLoaded", async () => {
    initAOS(); // ui.js
    
    // Auth check / Cloud
    initCloudLoginGate();
    initCloudAutoSave();
    initLeavePageGuard();
    
    bindAutosaveEvents();
    bindCalculationEvents();
    bindInventoryEvents();
    
    // Page specific
    if (document.getElementById("spellsGrid")) {
        await initSpellsPageEvents();
    }
    
    if (typeof renderOwnedFeaturesInvocations === "function") {
        renderOwnedFeaturesInvocations(); // ui.js (missing? check)
    }
});
