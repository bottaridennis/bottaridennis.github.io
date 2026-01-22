
(function initAOS() {
  if (window.AOS) AOS.init({ once: true, duration: 650, offset: 60 });
})();

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

async function initFeaturesPage() {
  const MY_FEATURES_KEY = "dnd_my_features_v1";

  const safeParse = (raw) => {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const loadMyFeatures = () => {
    const payload = safeParse(localStorage.getItem(MY_FEATURES_KEY));
    if (payload && Array.isArray(payload.selected)) return payload.selected;
    return [];
  };

  const saveMyFeatures = (selected) => {
    const payload = {
      schema: "dnd-my-features",
      version: 1,
      updatedAt: new Date().toISOString(),
      selected,
    };
    localStorage.setItem(MY_FEATURES_KEY, JSON.stringify(payload));
    if (window.cloud && typeof window.cloud.triggerDebouncedSave === "function") {
      window.cloud.triggerDebouncedSave();
    }
  };

  const grid = document.getElementById("grid");
  const searchInput = document.getElementById("searchInput");
  const counter = document.getElementById("counter");
  
  // Modal elements
  const modalEl = document.getElementById("detailModal");
  const modal = modalEl ? new bootstrap.Modal(modalEl) : null;
  const mName = document.getElementById("mName");
  const mPrereq = document.getElementById("mPrereq");
  const mRepeatable = document.getElementById("mRepeatable");
  const mDesc = document.getElementById("mDesc");

  const data = window.FEATURES || [];
  
  // Add IDs if missing
  data.forEach(item => {
    if (!item.id) item.id = slugId(item.name);
  });

  function render(list) {
    if (!grid) return;
    grid.innerHTML = "";

    const selected = loadMyFeatures();
    const selectedMap = new Map();
    selected.forEach(f => {
      if (f && f.id) selectedMap.set(f.id, f);
    });
    
    list.forEach((item, idx) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-xl-4";
      
      const card = document.createElement("article");
      card.className = "spell-card v2 feature-card";
      card.style.cursor = "pointer";
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", String(Math.min(idx * 25, 200)));
      card.onclick = () => openModal(item);
      
      card.innerHTML = `
        <div class="spell-body v2 feature-body">
          <div class="d-flex align-items-start justify-content-between gap-2">
            <div>
              <h3 class="spell-title v2 mb-1" title="${item.name}">${item.name}</h3>
              <div class="spell-sub v2">
                Talento
              </div>
            </div>
            <div class="spell-mine-toggle static">
              <div class="d-flex align-items-center gap-2" style="background: rgba(0,0,0,0.4); padding: 4px 10px; border-radius: 20px; border: 1px solid var(--stroke);">
                <input type="checkbox" class="prof-check m-0" data-feature-id="${item.id}">
                <label class="small text-uppercase cinzel fw-bold" data-feature-label="${item.id}" style="cursor:pointer; color:var(--gold); font-size: 0.8rem;">
                  <span></span>
                </label>
              </div>
            </div>
          </div>
          <div class="spell-badges static mt-3">
            ${item.prerequisite ? `<span class="badge-glass"><i class='bx bx-check-shield me-1'></i>${item.prerequisite}</span>` : ""}
            ${item.repeatable ? `<span class="badge-glass"><i class='bx bx-refresh me-1'></i>Ripetibile</span>` : ""}
          </div>
        </div>
      `;

      const toggle = card.querySelector("[data-feature-id]");
      const label = card.querySelector(`[data-feature-label="${item.id}"] span`);

      if (toggle) {
        const isSelected = selectedMap.has(item.id);
        toggle.checked = !!isSelected;
        if (label) label.textContent = isSelected ? "Nel personaggio" : "Segna";

        toggle.addEventListener("click", (ev) => {
          ev.stopPropagation();
        });

        toggle.addEventListener("change", () => {
          const current = loadMyFeatures();
          const idx = current.findIndex(f => f.id === item.id);
          if (toggle.checked) {
            if (idx === -1) {
              current.push({
                id: item.id,
                name: item.name,
                prerequisite: item.prerequisite || "",
                repeatable: !!item.repeatable
              });
            }
          } else {
            if (idx !== -1) current.splice(idx, 1);
          }
          saveMyFeatures(current);
          const isNowSelected = toggle.checked;
          if (label) label.textContent = isNowSelected ? "Posseduto" : "Aggiungi";
        });
      }
      
      col.appendChild(card);
      grid.appendChild(col);
    });

    if (counter) counter.innerHTML = `<i class='bx bx-collection me-1'></i> ${list.length}`;
  }

  function stripHtml(html) {
     const tmp = document.createElement("DIV");
     tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
  }

  function openModal(item) {
    if (!modal) return;
    mName.textContent = item.name;
    
    if (item.prerequisite) {
      mPrereq.textContent = item.prerequisite;
      mPrereq.classList.remove("d-none");
    } else {
      mPrereq.classList.add("d-none");
    }

    if (item.repeatable) {
      mRepeatable.classList.remove("d-none");
    } else {
      mRepeatable.classList.add("d-none");
    }

    mDesc.innerHTML = `<div class="desc-box">${item.description}</div>`;
    modal.show();
  }

  function filter() {
    const q = searchInput.value.toLowerCase();
    const filtered = data.filter(item => {
      return item.name.toLowerCase().includes(q) || 
             (item.prerequisite && item.prerequisite.toLowerCase().includes(q)) ||
             (item.description && item.description.toLowerCase().includes(q));
    });
    render(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener("input", filter);
  }

  // Initial render
  render(data);
}

document.addEventListener("DOMContentLoaded", initFeaturesPage);
