// -----------------------------
// UI: DOM Manipulation, Rendering, Modals
// -----------------------------

// --- Inventory UI State ---
let INVENTORY_PRESET_IMAGES = [];
let INVENTORY_IMAGE_GROUPS = null;
const INVENTORY_IMAGE_FILTER_STATE = {
  q: "",
  category: "",
};
const INVENTORY_IMAGE_BASE = "./Images/objects/";
let invModal = null;
let invEditingIndex = null;

// --- Helpers ---

function escapeHTML(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function showAppAlert(message) {
  try {
    const modalEl = document.getElementById("appAlertModal");
    const msgEl = document.getElementById("appAlertMessage");
    if (!modalEl || !msgEl || !window.bootstrap) {
      window.alert(message);
      return;
    }
    msgEl.textContent = message;
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  } catch (e) {
    window.alert(message);
  }
}

function initAOS() {
  if (window.AOS) AOS.init({ once: true, duration: 650, offset: 60 });
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

// --- Data Binding UI ---

function collectBindData() {
  const inputs = document.querySelectorAll("[data-bind]");
  const data = {};

  inputs.forEach((el) => {
    const key = el.getAttribute("data-bind");
    data[key] = (el.value ?? "").toString();
  });

  // inventario separato
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
    if (window.cloud && typeof window.cloud.triggerDebouncedSave === "function") {
      window.cloud.triggerDebouncedSave();
    }
  }

  if (Array.isArray(data.myInvocations)) {
    const payload = {
      schema: "dnd-my-invocations",
      version: 1,
      updatedAt: new Date().toISOString(),
      selected: data.myInvocations,
    };
    localStorage.setItem(MY_INVOCATIONS_KEY_GLOBAL, JSON.stringify(payload));
    if (window.cloud && typeof window.cloud.triggerDebouncedSave === "function") {
      window.cloud.triggerDebouncedSave();
    }
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
  setSavedState(collectBindData());

  // ricalcola modificatori
  if (typeof initAbilityModifiers === "function") {
    initAbilityModifiers();
  }

  if (typeof renderOwnedFeaturesInvocations === "function") {
    renderOwnedFeaturesInvocations();
  }
}

// --- Inventory Rendering ---

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
      <div class="inv-img-category-title collapsed" data-cat-idx="${idx}">
        <span>${cat}</span>
        <i class="bx bx-chevron-down"></i>
      </div>
      <div class="inv-img-grid collapsed" id="cat-grid-${idx}">
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

  if (q) {
    imgList.querySelectorAll(".inv-img-category-title").forEach((el) => {
      el.classList.remove("collapsed");
    });
    imgList.querySelectorAll(".inv-img-grid").forEach((grid) => {
      grid.classList.remove("collapsed");
    });
  }

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
    if (invModal) invModal.show();
  });
}

// --- Calculation UI ---

function updateCalculatedFields(stats) {
    const setVal = (key, val) => {
      const el = document.querySelector(`[data-bind="${key}"]`);
      if (el && !el.matches(":focus")) { 
          if (el.type === "checkbox") return;
          const strVal = val >= 0 ? `+${val}` : `${val}`;
          if (el.value !== strVal) el.value = strVal;
      }
    };
    
    setVal("strMod", stats.strMod);
    setVal("dexMod", stats.dexMod);
    setVal("conMod", stats.conMod);
    setVal("intMod", stats.intMod);
    setVal("wisMod", stats.wisMod);
    setVal("chaMod", stats.chaMod);
    
    // Prof
    const profEl = document.querySelector('[data-bind="prof"]');
    if (profEl && document.activeElement !== profEl) {
        profEl.value = `+${stats.prof}`;
    }

    // Saves
    setVal("saveStr", stats.saveStr);
    setVal("saveDex", stats.saveDex);
    setVal("saveCon", stats.saveCon);
    setVal("saveInt", stats.saveInt);
    setVal("saveWis", stats.saveWis);
    setVal("saveCha", stats.saveCha);
    
    // Skills
    setVal("skillAthletics", stats.skillAthletics);
    setVal("skillAcrobatics", stats.skillAcrobatics);
    setVal("skillSleightOfHand", stats.skillSleightOfHand);
    setVal("skillStealth", stats.skillStealth);
    setVal("skillArcana", stats.skillArcana);
    setVal("skillHistory", stats.skillHistory);
    setVal("skillInvestigation", stats.skillInvestigation);
    setVal("skillNature", stats.skillNature);
    setVal("skillReligion", stats.skillReligion);
    setVal("skillAnimalHandling", stats.skillAnimalHandling);
    setVal("skillInsight", stats.skillInsight);
    setVal("skillMedicine", stats.skillMedicine);
    setVal("skillPerception", stats.skillPerception);
    setVal("skillSurvival", stats.skillSurvival);
    setVal("skillDeception", stats.skillDeception);
    setVal("skillIntimidation", stats.skillIntimidation);
    setVal("skillPerformance", stats.skillPerformance);
    setVal("skillPersuasion", stats.skillPersuasion);
    
    // PP
    const ppOut = document.querySelector('[data-bind="passivePerception"]');
    if (ppOut && !ppOut.matches(":focus")) ppOut.value = stats.passivePerception;
}

// --- Spells & Slots Rendering ---

function renderSlotsTracker() {
    const slotsTrackerEl = document.getElementById("slotsTracker");
    const slotsRowEl = document.getElementById("slotsRow");
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
            <span class="slot-val">${remaining}</span>
            <span class="slot-sep">/</span>
            <span class="slot-max">${max}</span>
          </div>
        `;
      })
      .join("");
      
    // Re-bind click events for slots is better handled in events.js or here? 
    // Since we are re-rendering, we must bind here or delegate.
    // Let's rely on global delegation in events.js if possible, or bind here.
    // For simplicity, let's just render here and let events.js handle the click delegation on #slotsRow
}

function renderSpellsList(list, mySpellsMap, viewMode) {
    const grid = document.getElementById("spellsGrid");
    const counter = document.getElementById("counter");
    if (!grid) return;

    if (counter) counter.textContent = `${list.length} risultati`;

    if (!list.length) {
      grid.innerHTML = `<div class="col-12 text-center text-mutedish py-5">Nessun incantesimo trovato.</div>`;
      return;
    }

    grid.innerHTML = list.map((spell) => {
        const isMine = mySpellsMap.has(spell.id);
        const myEntry = mySpellsMap.get(spell.id);
        const isPrepared = myEntry ? myEntry.prepared : false;
        
        return `
        <div class="col-12 col-md-6 col-xl-4">
          <div class="spell-card v2 h-100">
            <div class="spell-thumb v2" onclick="openSpellDetailFromSheet('${spell.id}')" style="cursor:pointer">
               <img src="${spell.img}" alt="${escapeHTML(spell.name)}" onerror="this.src='Images/spells/default.jpg'">
               <div class="spell-overlay"></div>
               
               <div class="spell-badges" onclick="event.stopPropagation()">
                  <div class="d-flex align-items-center gap-2" style="background: rgba(0,0,0,0.4); padding: 4px 10px; border-radius: 20px; border: 1px solid var(--stroke);">
                     <input type="checkbox" class="prof-check m-0" id="mine-${spell.id}" data-mine-toggle="${spell.id}" ${isMine ? "checked" : ""}>
                     <label for="mine-${spell.id}" style="cursor:pointer; color:var(--gold); font-family: 'Cinzel', serif; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">
                       ${isMine ? "Mia" : "Aggiungi"}
                     </label>
                  </div>
               </div>
               
               <div class="spell-thumb-footer">
                  <h5 class="spell-name text-truncate mb-0">
                    ${escapeHTML(spell.name)}
                  </h5>
                  <div class="spell-meta small text-mutedish">
                    ${spell.level} • ${spell.school}
                  </div>
               </div>
            </div>
            
            <div class="p-3">
               <div class="spell-stats-row small mb-2">
                  <div><i class="bx bx-time"></i> ${spell.castingTime}</div>
                  <div><i class="bx bx-ruler"></i> ${spell.range}</div>
                  <div><i class="bx bx-hourglass"></i> ${spell.duration}</div>
               </div>
               
               ${isMine ? `
               <div class="spell-prep-row mt-2 pt-2 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                  <div class="form-check form-switch m-0">
                    <input class="form-check-input" type="checkbox" id="prep-${spell.id}" data-prepared-toggle="${spell.id}" ${isPrepared ? "checked" : ""}>
                    <label class="form-check-label small" for="prep-${spell.id}">${isPrepared ? "Preparato" : "Non prep."}</label>
                  </div>
                  <small class="text-mutedish fst-italic" style="font-size:0.75rem">Salvata</small>
               </div>
               ` : ""}
            </div>
          </div>
        </div>
        `;
    }).join("");
    
    // We need to re-bind toggles because we just replaced innerHTML
    // Ideally we return the string and let the caller bind, or we bind here.
    // Given the structure, we can dispatch an event or call a binder.
    // Let's call a global binder if it exists, or dispatch a custom event.
    document.dispatchEvent(new Event('spellsRendered'));
}

// --- Modal Save Helper ---

function saveInventoryModal() {
  if (invEditingIndex === null) return;
  const items = getInventory();
  const it = items[invEditingIndex];
  if (!it) return;

  const qEl = document.getElementById("invQty");
  const nEl = document.getElementById("invName");
  const dEl = document.getElementById("invDesc");

  if (qEl) it.qty = parseInt(qEl.value) || 1;
  if (nEl) it.name = nEl.value;
  if (dEl) it.desc = dEl.value;
  // img is updated live

  setInventory(items);
  renderInventory();
  
  // Close modal
  const el = document.getElementById("invModal");
  const modal = bootstrap.Modal.getInstance(el);
  if (modal) modal.hide();
}

// --- Detail Modals ---

function openSpellDetailFromSheet(id) {
  const modalEl = document.getElementById("spellModal");
  if (!modalEl || !window.bootstrap || !Array.isArray(window.SPELLS)) return;
  
  const targetId = String(id || "");
  const item =
    window.SPELLS.find((s) => String(s.id || "") === targetId) ||
    window.SPELLS.find((s) => slugIdGeneric(s.name) === targetId);
  if (!item) return;

  const setText = (eid, val) => { const el = document.getElementById(eid); if(el) el.textContent = val; };
  const setHTML = (eid, val) => { const el = document.getElementById(eid); if(el) el.innerHTML = val; };
  
  setText("modalTitle", item.name);
  const labelLvl = item.level === "Trucchetto" ? "Trucchetto" : `Livello ${item.level}`;
  setText("modalMeta", `${labelLvl} • ${item.school}`);
  
  const imgEl = document.getElementById("modalImg");
  if(imgEl) imgEl.src = item.img;
  
  setText("mSchool", item.school);
  setText("mLevel", labelLvl);
  setText("mCast", item.castingTime);
  setText("mRange", item.range);
  setText("mComp", item.components);
  setText("mDur", item.duration);
  
  const paragraphs = (text) => String(text || "").split("\n").map(t => t.trim()).filter(Boolean).map(t => `<p class="mb-2">${escapeHTML(t)}</p>`).join("");
  setHTML("mDesc", paragraphs(item.description));
  
  const notesArea = document.getElementById("mNotes");
  if (notesArea) {
      const payload = loadMySpellsGlobal();
      const selected = (payload && payload.selected) ? payload.selected : [];
      const entry = selected.find(x => x.id === item.id);
      notesArea.value = entry && entry.notes ? entry.notes : "";
      
      notesArea.oninput = () => {
          updateMySpellMetaGlobal(item.id, { notes: notesArea.value });
      };
  }
  
  const wrap = document.getElementById("mSpecialWrap");
  const txt = document.getElementById("mSpecial");
  if (item.special) {
    if(wrap) wrap.classList.remove("d-none");
    if(txt) txt.textContent = item.special;
  } else {
    if(wrap) wrap.classList.add("d-none");
    if(txt) txt.textContent = "";
  }

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

function openFeatureDetailFromSheet(id) {
  const modalEl = document.getElementById("featInvDetailModal");
  if (!modalEl || !window.bootstrap) return;
  const list = Array.isArray(window.FEATURES) ? window.FEATURES : [];
  if (!list.length) return;
  const targetId = String(id || "");
  const item =
    list.find((f) => String(f.id || "") === targetId) ||
    list.find((f) => slugIdGeneric(f.name) === targetId);
  if (!item) return;
  const nameEl = document.getElementById("detailName");
  const prereqEl = document.getElementById("detailPrereq");
  const repeatEl = document.getElementById("detailRepeatable");
  const descEl = document.getElementById("detailDesc");
  if (nameEl) nameEl.textContent = item.name || "";
  if (prereqEl) {
    const hasPrereq = !!item.prerequisite;
    prereqEl.textContent = item.prerequisite || "";
    if (hasPrereq) prereqEl.classList.remove("d-none");
    else prereqEl.classList.add("d-none");
  }
  // Repeatable? (If field exists)
  if (descEl) descEl.innerHTML = item.description ? item.description.replace(/\n/g, "<br>") : "";
  
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

function openInvocationDetailFromSheet(id) {
  // Simile a feature
  openFeatureDetailFromSheet(id); // Reusing for now as they share modal
}
