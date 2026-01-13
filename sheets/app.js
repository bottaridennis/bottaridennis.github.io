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

// -----------------------------
// Incantesimi page rendering
// -----------------------------
function initSpellsPage() {
  const grid = document.getElementById("spellsGrid");
  if (!grid || !window.SPELLS) return;

  const search = document.getElementById("spellSearch");
  const schoolFilter = document.getElementById("schoolFilter");
  const levelFilter = document.getElementById("levelFilter");
  const counter = document.getElementById("counter");

  const modalEl = document.getElementById("spellModal");
  const modal = modalEl ? new bootstrap.Modal(modalEl) : null;

  const state = { q: "", school: "", level: "" };

  const apply = () => {
    const q = state.q.trim().toLowerCase();
    const school = state.school;
    const level = state.level;

    const filtered = window.SPELLS.filter((s) => {
      const blob = `${s.name} ${s.school} ${s.level}`.toLowerCase();
      const okQ = !q || blob.includes(q);
      const okSchool = !school || s.school === school;
      const okLevel = !level || s.level === level;
      return okQ && okSchool && okLevel;
    });

    renderSpells(filtered);
    if (counter)
      counter.innerHTML = `<i class='bx bx-collection me-1'></i> ${filtered.length}`;
  };

  const renderSpells = (list) => {
    grid.innerHTML = list.map((s, idx) => spellCardHTML(s, idx)).join("");
    grid.querySelectorAll("[data-open-spell]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.getAttribute("data-open-spell"));
        const spell = list[i];
        if (!spell) return;
        openModal(spell);
      });
    });
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
    const badges = [
      `<span class="badge-glass"><i class='bx bx-library me-1'></i>${s.school}</span>`,
      `<span class="badge-glass"><i class='bx bx-layer me-1'></i>${
        s.level === "Trucchetto" ? "Trucchetto" : `Lv ${s.level}`
      }</span>`,
    ];

    if (s.special)
      badges.push(
        `<span class="badge-glass"><i class='bx bxs-star me-1'></i>1/LR gratis</span>`
      );

    return `
    <div class="col-12 col-md-6 col-xl-4" data-aos="fade-up" data-aos-delay="${Math.min(
      idx * 25,
      200
    )}">
      <article class="spell-card v2 school-${slugSchool(s.school)}">
      
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
      
      <div class="spell-badges">${badges.join("")}</div>
        <div class="spell-body v2">
          <div class="spell-mini v2">
            <div class="mini-pill"><i class='bx bx-target-lock'></i><b>${
              s.range
            }</b></div>
            <div class="mini-pill"><i class='bx bx-time-five'></i><b>${shortDuration(
              s.duration
            )}</b></div>
            <div class="mini-pill"><i class='bx bx-flask'></i><b>${shortComponents(
              s.components
            )}</b></div>
          </div>

          <button class="btn-soft v2 mt-3" data-open-spell="${idx}">
            <i class='bx bx-detail me-1'></i> Dettagli
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
      Necromanzia: "☠ necro",
      Abiurazione: "🛡 difesa",
      Ammaliamento: "🌀 controllo",
      Divinazione: "👁 sensi",
      Illusione: "🫥 stealth",
      Invocazione: "✨ potere",
      Trasmutazione: "🔧 buff",
    };
    return map[s.school] || "—";
  };

  const makeOneLine = (s) => {
    const parts = [
      s.name,
      `${s.school} • ${
        s.level === "Trucchetto" ? "Trucchetto" : `Livello ${s.level}`
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

  const escapeForAttr = (str) =>
    str.replaceAll("\\", "\\\\").replaceAll("'", "\\'");

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

  apply();
}

initSpellsPage();

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
  const fileImport = document.getElementById("fileImport");

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
}

initExportImport();

/* =========================
   INVENTARIO MODULARE
   ========================= */

const INV_KEY = "inventory"; // dentro lo stesso JSON salvato

function getSavedState() {
  return safeJSONParse(localStorage.getItem(STORAGE_KEY)) || {};
}

function setSavedState(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
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
    .map(
      (it, idx) => `
    <tr>
      <td>
        <input class="inv-inline" type="number" min="0" step="1"
          value="${it.qty ?? 1}"
          data-inv-qty="${idx}">
      </td>
      <td>
        <input class="inv-inline" type="text"
          value="${escapeHTML(it.name ?? "")}"
          placeholder="Nome oggetto..."
          data-inv-name="${idx}">
        <div class="inv-muted">${it.desc ? "Ha descrizione" : "—"}</div>
      </td>
      <td class="text-end">
        <div class="inv-actions">
          <button class="inv-btn" type="button" data-inv-open="${idx}">
            <i class='bx bx-detail'></i>
          </button>
          <button class="inv-btn" type="button" data-inv-del="${idx}">
            <i class='bx bx-trash'></i>
          </button>
        </div>
      </td>
    </tr>
  `
    )
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

  if (btnSave) {
    btnSave.addEventListener("click", () => {
      if (invEditingIndex == null) return;
      const items = getInventory();

      items[invEditingIndex] = {
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

  renderInventory();
}

function openInvModal(index) {
  invEditingIndex = index;
  const items = getInventory();
  const it = items[index];
  if (!it) return;

  document.getElementById("invModalSubtitle").textContent = `Oggetto #${
    index + 1
  }`;

  document.getElementById("invQty").value = it.qty ?? 1;
  document.getElementById("invName").value = it.name ?? "";
  document.getElementById("invDesc").value = it.desc ?? "";

  invModal?.show();
}

// avvia solo se siamo su index e gli elementi esistono
initInventory();
