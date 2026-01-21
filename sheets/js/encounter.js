const ENCOUNTER_KEY = "dnd_encounter_v1";

function encSafeParse(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function encLoadState() {
  return encSafeParse(localStorage.getItem(ENCOUNTER_KEY)) || {
    name: "",
    round: 1,
    currentIndex: 0,
    list: [],
  };
}

function encSaveState(st) {
  localStorage.setItem(ENCOUNTER_KEY, JSON.stringify(st));
  if (window.cloud && typeof window.cloud.triggerDebouncedSave === "function") {
    window.cloud.triggerDebouncedSave();
  }
}

function encRender() {
  const state = encLoadState();
  const nameEl = document.getElementById("encounterName");
  const roundEl = document.getElementById("roundCounter");
  const statusEl = document.getElementById("encounterStatus");
  const turnLabel = document.getElementById("turnLabel");
  const body = document.getElementById("encounterBody");
  const countEl = document.getElementById("encounterCount");

  if (nameEl) nameEl.value = state.name || "";
  if (roundEl) roundEl.value = state.round || 1;

  if (!body || !countEl || !statusEl || !turnLabel) return;

  body.innerHTML = "";

  const list = Array.isArray(state.list) ? state.list : [];
  const total = list.length;
  countEl.textContent = `${total} combattente${total === 1 ? "" : "i"}`;

  if (!total) {
    statusEl.innerHTML = "<i class='bx bx-planet me-1'></i> pronto";
    turnLabel.textContent = "Nessuno";
    return;
  }

  if (state.currentIndex >= total) state.currentIndex = 0;

  list.forEach((c, idx) => {
    const tr = document.createElement("tr");
    const isCurrent = idx === state.currentIndex;

    if (isCurrent) tr.classList.add("table-primary");

    const tag = c.isPc ? "PG" : c.isAlly ? "Allied" : "Nemico";
    const tagIcon = c.isPc ? "bxs-user" : c.isAlly ? "bxs-shield" : "bxs-skull";

    const hpMax = Number(c.hpMax) || 0;
    const hp = Math.min(Math.max(Number(c.hp) || 0, 0), hpMax || Number(c.hp) || 0);
    const ratio = hpMax > 0 ? Math.max(0, Math.min(1, hp / hpMax)) : 0;
    let barClass = "bg-success";
    if (ratio <= 0.3) barClass = "bg-danger";
    else if (ratio <= 0.6) barClass = "bg-warning";

    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>
        <div class="d-flex flex-column">
          <div class="fw-800">${c.name || "Senza nome"}</div>
          <div class="tiny text-mutedish"><i class='bx ${tagIcon} me-1'></i>${tag}</div>
        </div>
      </td>
      <td>${c.init ?? "-"}</td>
      <td>
        <div class="tiny mb-1">${hp}/${hpMax || "?"} PF</div>
        <div class="progress" style="height: 6px;">
          <div class="progress-bar ${barClass}" role="progressbar" style="width: ${ratio * 100}%"></div>
        </div>
      </td>
      <td class="text-end">
        <div class="btn-group btn-group-sm" role="group">
          <button class="btn btn-outline-light" data-act="damage" data-idx="${idx}">
            <i class='bx bx-minus'></i>
          </button>
          <button class="btn btn-outline-light" data-act="heal" data-idx="${idx}">
            <i class='bx bx-plus'></i>
          </button>
          <button class="btn btn-outline-light" data-act="focus" data-idx="${idx}">
            <i class='bx bx-crosshair'></i>
          </button>
          <button class="btn btn-outline-danger" data-act="remove" data-idx="${idx}">
            <i class='bx bx-trash'></i>
          </button>
        </div>
      </td>
    `;

    body.appendChild(tr);
  });

  const current = list[state.currentIndex];
  if (current) {
    statusEl.innerHTML = "<i class='bx bx-target-lock me-1'></i> in corso";
    turnLabel.textContent = current.name || "Senza nome";
  } else {
    statusEl.innerHTML = "<i class='bx bx-planet me-1'></i> pronto";
    turnLabel.textContent = "Nessuno";
  }

  encSaveState(state);
}

function encInit() {
  const nameEl = document.getElementById("encounterName");
  const roundEl = document.getElementById("roundCounter");
  const btnNextTurn = document.getElementById("btnNextTurn");
  const btnAdd = document.getElementById("btnAddCombatant");
  const btnSort = document.getElementById("btnSortInit");
  const btnReset = document.getElementById("btnResetEncounter");
  const body = document.getElementById("encounterBody");

  const state = encLoadState();

  if (nameEl) {
    nameEl.value = state.name || "";
    nameEl.addEventListener("input", () => {
      const st = encLoadState();
      st.name = nameEl.value || "";
      encSaveState(st);
      encRender();
    });
  }

  if (roundEl) {
    roundEl.value = state.round || 1;
    roundEl.addEventListener("change", () => {
      const st = encLoadState();
      const n = parseInt(roundEl.value, 10);
      st.round = isNaN(n) || n < 1 ? 1 : n;
      roundEl.value = st.round;
      encSaveState(st);
      encRender();
    });

    document
      .querySelectorAll("[data-round]")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const delta = btn.getAttribute("data-round") === "-1" ? -1 : 1;
          const st = encLoadState();
          const next = Math.max(1, (st.round || 1) + delta);
          st.round = next;
          roundEl.value = next;
          encSaveState(st);
          encRender();
        });
      });
  }

  if (btnNextTurn) {
    btnNextTurn.addEventListener("click", () => {
      const st = encLoadState();
      const list = Array.isArray(st.list) ? st.list : [];
      if (!list.length) return;
      st.currentIndex = ((st.currentIndex || 0) + 1) % list.length;
      encSaveState(st);
      encRender();
    });
  }

  if (btnAdd) {
    btnAdd.addEventListener("click", () => {
      const st = encLoadState();
      const list = Array.isArray(st.list) ? st.list : [];

      const name = document.getElementById("cName")?.value.trim() || "";
      const init = parseInt(document.getElementById("cInit")?.value || "0", 10) || 0;
      const hpMax = parseInt(document.getElementById("cHpMax")?.value || "0", 10) || 0;
      const hpVal = document.getElementById("cHp")?.value;
      const hp = hpVal === "" || hpVal == null ? hpMax : parseInt(hpVal, 10) || 0;
      const isPc = !!document.getElementById("cIsPc")?.checked;
      const isAlly = !!document.getElementById("cIsAlly")?.checked;

      list.push({
        id: Date.now() + Math.random(),
        name,
        init,
        hpMax,
        hp,
        isPc,
        isAlly,
      });

      st.list = list;
      if (list.length === 1) st.currentIndex = 0;
      encSaveState(st);

      const nameInput = document.getElementById("cName");
      const initInput = document.getElementById("cInit");
      const hpMaxInput = document.getElementById("cHpMax");
      const hpInput = document.getElementById("cHp");
      if (nameInput) nameInput.value = "";
      if (initInput) initInput.value = "";
      if (hpMaxInput) hpMaxInput.value = "";
      if (hpInput) hpInput.value = "";

      if (document.getElementById("cIsPc")) document.getElementById("cIsPc").checked = false;
      if (document.getElementById("cIsAlly")) document.getElementById("cIsAlly").checked = false;

      encRender();
    });
  }

  if (btnSort) {
    btnSort.addEventListener("click", () => {
      const st = encLoadState();
      const list = Array.isArray(st.list) ? st.list : [];
      list.sort((a, b) => (b.init || 0) - (a.init || 0));
      st.list = list;
      st.currentIndex = 0;
      encSaveState(st);
      encRender();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      encSaveState({
        name: "",
        round: 1,
        currentIndex: 0,
        list: [],
      });
      encRender();
    });
  }

  if (body) {
    body.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-act]");
      if (!btn) return;
      const act = btn.getAttribute("data-act");
      const idx = parseInt(btn.getAttribute("data-idx") || "-1", 10);
      if (isNaN(idx) || idx < 0) return;

      const st = encLoadState();
      const list = Array.isArray(st.list) ? st.list : [];
      const c = list[idx];
      if (!c) return;

      if (act === "damage") {
        const amountStr = prompt("Danno da applicare:", "1");
        if (amountStr == null) return;
        const n = parseInt(amountStr, 10);
        if (!isNaN(n)) c.hp = (Number(c.hp) || 0) - n;
      } else if (act === "heal") {
        const amountStr = prompt("Cura da applicare:", "1");
        if (amountStr == null) return;
        const n = parseInt(amountStr, 10);
        if (!isNaN(n)) c.hp = (Number(c.hp) || 0) + n;
      } else if (act === "focus") {
        st.currentIndex = idx;
      } else if (act === "remove") {
        list.splice(idx, 1);
        if (st.currentIndex >= list.length) st.currentIndex = 0;
      }

      st.list = list;
      encSaveState(st);
      encRender();
    });
  }

  const btnToggleMap = document.getElementById("toggleMap");
  if (btnToggleMap) {
    btnToggleMap.addEventListener("click", () => {
      const mapContainer = document.getElementById("mapContainer");
      if (mapContainer) {
        mapContainer.classList.toggle("d-none");
      }
    });
  }

  encRender();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", encInit);
} else {
  encInit();
}

