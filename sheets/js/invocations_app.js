
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

async function initInvocationsPage() {
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

  const data = window.INVOCATIONS || [];
  
  // Add IDs if missing
  data.forEach(item => {
    if (!item.id) item.id = slugId(item.name);
  });

  function render(list) {
    if (!grid) return;
    grid.innerHTML = "";
    
    list.forEach(item => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4";
      
      const card = document.createElement("div");
      card.className = "card glass-card invocation-card h-100";
      card.style.cursor = "pointer";
      card.onclick = () => openModal(item);
      
      card.innerHTML = `
        <i class='bx bxs-ghost card-bg-icon'></i>
        <div class="card-body invocation-body">
          <h5 class="card-title fw-bold text-truncate" title="${item.name}">${item.name}</h5>
          <div class="mb-2">
            ${item.prerequisite ? `<span class="badge bg-secondary text-truncate mw-100">${item.prerequisite}</span>` : ""}
            ${item.repeatable ? `<span class="badge bg-info text-dark">Ripetibile</span>` : ""}
          </div>
          <div class="card-text small text-mutedish text-truncate-3">
             ${stripHtml(item.description)}
          </div>
        </div>
      `;
      
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

document.addEventListener("DOMContentLoaded", initInvocationsPage);
