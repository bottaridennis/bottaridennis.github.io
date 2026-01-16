
/*
 * GESTIONE CLOUD SUPABASE
 * 
 * Configurazione:
 * 1. Crea progetto su supabase.com
 * 2. Esegui questo SQL nell'SQL Editor di Supabase:
 * 
 * create table characters (
 *   id uuid default gen_random_uuid() primary key,
 *   user_id uuid references auth.users not null,
 *   name text not null,
 *   data jsonb not null,
 *   updated_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * alter table characters enable row level security;
 * 
 * create policy "Users can see their own characters"
 *   on characters for select
 *   using ( auth.uid() = user_id );
 * 
 * create policy "Users can insert their own characters"
 *   on characters for insert
 *   with check ( auth.uid() = user_id );
 * 
 * create policy "Users can update their own characters"
 *   on characters for update
 *   using ( auth.uid() = user_id );
 * 
 * create policy "Users can delete their own characters"
 *   on characters for delete
 *   using ( auth.uid() = user_id );
 */

const SUPABASE_URL = "https://fibkznmnroplmacvnsmj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYmt6bm1ucm9wbG1hY3Zuc21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MjczMTEsImV4cCI6MjA4NDEwMzMxMX0.8-Ra-QmU2KsMFktEO7RG27rREeFUm7_tsOe1nTx0ZZE"; // <--- INCOLLA QUI LA TUA CHIAVE

class CloudManager {
  constructor() {
    if (SUPABASE_KEY.includes("INSERISCI")) {
      console.warn("Manca la chiave Supabase in js/cloud.js");
      return;
    }
    this.client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    this.user = null;
    this._confirmResolver = null;
    
    // Ascolta cambiamenti auth
    this.client.auth.onAuthStateChange((event, session) => {
      this.user = session?.user || null;
      this.updateUI();
    });
  }

  // 1. REGISTRAZIONE
  async register(email, password, displayName) {
    const { data, error } = await this.client.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: displayName || "",
        },
      },
    });

    if (error) {
      showAppAlert("Errore registrazione: " + error.message);
      return false;
    }
    const user = data?.user || null;
    if (user && displayName) {
      try {
        await this.client.from("user_logins").upsert({
          user_id: user.id,
          email: user.email || email,
          username: displayName,
        });
      } catch (e) {
      }
    }

    showAppAlert("Registrazione completata! Controlla la tua email per confermare (o se hai disabilitato la conferma, fai login).");
    return true;
  }

  async registerWithConfirm() {
    const emailEl = document.getElementById("regUser");
    const passEl = document.getElementById("regPass");
    const pass2El = document.getElementById("regPass2");
    const nameEl = document.getElementById("regDisplayName");
    if (!emailEl || !passEl || !pass2El) return;

    const email = emailEl.value.trim();
    const pass = passEl.value;
    const pass2 = pass2El.value;
    const displayName = nameEl ? nameEl.value.trim() : "";

    if (!email || !pass || !pass2 || !displayName) {
      showAppAlert("Compila email, nome utente e password (due volte).");
      return;
    }
 
    if (pass !== pass2) {
      showAppAlert("Le due password non coincidono.");
      return;
    }

    await this.register(email, pass, displayName);
  }

  // 2. LOGIN
  async resolveIdentifierToEmail(identifier) {
    const trimmed = (identifier || "").trim();
    if (!trimmed) return null;
    if (trimmed.includes("@")) return trimmed;
    try {
      const { data, error } = await this.client
        .from("user_logins")
        .select("email")
        .eq("username", trimmed)
        .single();
      if (error || !data || !data.email) {
        showAppAlert("Nessun account trovato con questo nome utente.");
        return null;
      }
      return data.email;
    } catch (e) {
      showAppAlert("Login con nome utente non disponibile, prova con l'email.");
      return null;
    }
  }

  async login(identifier, password) {
    const rawId = (identifier || "").trim();
    if (!rawId || !password) {
      showAppAlert("Inserisci nome utente/email e password.");
      return false;
    }
    const email = await this.resolveIdentifierToEmail(rawId);
    if (!email) return false;

    const { data, error } = await this.client.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      showAppAlert("Errore login: " + error.message);
      return false;
    }
    
    const modal = bootstrap.Modal.getInstance(document.getElementById("cloudAuthModal"));
    modal?.hide();
    return true;
  }

  // 3. LOGOUT
  async logout() {
    const { error } = await this.client.auth.signOut();
    if (error) showAppAlert(error.message);
    window.location.reload();
  }

  async updateDisplayName(newName) {
    if (!this.user) {
      showAppAlert("Devi essere loggato per cambiare il nome visualizzato.");
      return;
    }
    const trimmed = (newName || "").trim();
    if (!trimmed) {
      showAppAlert("Inserisci un nome valido.");
      return;
    }
    const { data, error } = await this.client.auth.updateUser({
      data: { display_name: trimmed },
    });
    if (error) {
      showAppAlert("Errore aggiornamento nome utente: " + error.message);
      return;
    }
    this.user = data?.user || this.user;
    this.updateUI();
    showAppAlert("Nome visualizzato aggiornato.");
  }

  // 4. SALVA PERSONAGGIO
  async saveCharacter(charName, options = {}) {
    if (!this.user) return;

    let sheet = null;
    let mySpells = null;
    if (typeof collectBindData === "function") {
      sheet = collectBindData();
    }
    if (typeof loadMySpellsGlobal === "function") {
      mySpells = loadMySpellsGlobal();
    }

    const charData = {
      sheet,
      mySpells
    };

    const effectiveName = (charName || (sheet && sheet.name) || localStorage.getItem("cloud_current_char") || "PG senza nome").toString().trim() || "PG senza nome";
    localStorage.setItem("cloud_current_char", effectiveName);

    // Cerchiamo se esiste già un PG con questo nome per questo utente
    const { data: existing } = await this.client
      .from('characters')
      .select('id')
      .eq('name', effectiveName)
      .single();

    let error;
    if (existing) {
      const skipConfirm = options.silent || options.forceOverwrite;
      if (!skipConfirm) {
        const ok = await this.confirm(`Sovrascrivere il salvataggio "${effectiveName}" esistente?`);
        if (!ok) return;
      }
      const res = await this.client
        .from('characters')
        .update({ 
          data: charData,
          updated_at: new Date()
        })
        .eq('id', existing.id);
      error = res.error;
    } else {
      // Crea nuovo
      const res = await this.client
        .from('characters')
        .insert({
          user_id: this.user.id,
          name: effectiveName,
          data: charData
        });
      error = res.error;
    }

    if (error) {
      if (!options.silent) showAppAlert("Errore salvataggio: " + error.message);
      else console.error("Errore autosalvataggio:", error);
    } else {
      if (!options.silent) showAppAlert(`Salvataggio "${effectiveName}" completato con successo!`);
      this.renderCharList();
    }
  }

  async autoSave() {
    if (!this.user) return;
    if (typeof collectBindData !== "function") return;
    await this.saveCharacter(null, { silent: true, forceOverwrite: true });
  }

  // 5. CARICA LISTA PERSONAGGI
  async renderCharList() {
    const list = document.getElementById("cloudCharList");
    if (!list || !this.user) return;

    list.innerHTML = '<div class="text-center py-2"><div class="spinner-border spinner-border-sm text-light"></div></div>';

    const { data, error } = await this.client
      .from('characters')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      list.innerHTML = `<div class="text-danger tiny">Errore: ${error.message}</div>`;
      return;
    }

    if (!data || data.length === 0) {
      list.innerHTML = '<div class="text-muted tiny">Non hai ancora nessuna scheda salvata per questo account.</div>';
      return;
    }

    const currentName = localStorage.getItem("cloud_current_char") || "";

    list.innerHTML = data.map((c) => {
      const payload = c.data || {};
      const sheet = payload.sheet || null;
      const displayName = c.name || (sheet && sheet.name) || "PG senza nome";

      const parts = [];
      if (sheet && sheet.class) parts.push(sheet.class);
      if (sheet && sheet.level) parts.push("Lv " + sheet.level);
      if (sheet && sheet.race) parts.push(sheet.race);
      const subtitle = parts.join(" • ");

      const isCurrent = currentName && currentName === c.name;

      return `
      <div class="d-flex justify-content-between align-items-center mb-2 p-2 glass-card">
        <div>
          <div class="fw-bold">${escapeHTML(displayName)}</div>
          <div class="tiny text-mutedish">
            ${subtitle ? escapeHTML(subtitle) + " • " : ""}Ultimo salvataggio: ${new Date(c.updated_at).toLocaleDateString()}
          </div>
          ${isCurrent ? "<div class='tiny text-success'>Scheda corrente</div>" : ""}
        </div>
        <div class="d-flex flex-column gap-1 align-items-end">
          <button class="btn btn-sm btn-outline-info" onclick="window.cloud.loadCharacter('${c.id}')">
            <i class='bx bx-folder-open me-1'></i> Apri scheda
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="window.cloud.deleteCharacter('${c.id}')">
            <i class='bx bx-trash me-1'></i> Elimina
          </button>
        </div>
      </div>`;
    }).join("");
  }

  // 6. CARICA SINGOLO PERSONAGGIO
  async loadCharacter(id) {
    const { data, error } = await this.client
      .from('characters')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      showAppAlert("Errore caricamento: " + (error?.message || "Non trovato"));
      return;
    }

    const payload = data.data || {};
    const sheet = payload.sheet || payload.pg_stats || null;
    const mySpells = payload.mySpells || null;

    if (sheet && typeof applyBindData === "function") {
      applyBindData(sheet);
    }

    if (mySpells && Array.isArray(mySpells.selected)) {
      const spellsPayload = {
        schema: "dnd-my-spells",
        version: 1,
        updatedAt: new Date().toISOString(),
        selected: mySpells.selected,
      };
      localStorage.setItem("dnd_my_spells_v1", JSON.stringify(spellsPayload));
    }

    if (typeof this.renderCharList === "function") {
      this.renderCharList();
    }
 
    // Chiudi il modal del profilo se aperto
    const modal = bootstrap.Modal.getInstance(document.getElementById("cloudProfileModal"));
    modal?.hide();

    showAppAlert(`Salvataggio "${data.name}" caricato!`);
  }

  // 7. ELIMINA PERSONAGGIO
  async deleteCharacter(id) {
    const { data, error: fetchError } = await this.client
      .from('characters')
      .select('id,name')
      .eq('id', id)
      .single();

    if (fetchError || !data) {
      showAppAlert("Errore nel recupero del salvataggio da eliminare.");
      return;
    }

    const saveName = data.name || "questo salvataggio";
    const ok = await this.confirm(`Eliminare definitivamente il salvataggio "${saveName}"?`);
    if (!ok) return;

    const { error } = await this.client
      .from('characters')
      .delete()
      .eq('id', id);

    if (error) {
      showAppAlert("Errore eliminazione: " + error.message);
    } else {
      this.renderCharList();
    }
  }

  async confirm(message) {
    try {
      const modalEl = document.getElementById("cloudConfirmModal");
      const msgEl = document.getElementById("cloudConfirmMessage");
      const okBtn = document.getElementById("cloudConfirmOk");
      if (!modalEl || !msgEl || !okBtn || !window.bootstrap) {
        return window.confirm(message);
      }
 
      msgEl.textContent = message;
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
 
      return await new Promise((resolve) => {
        const handlerCancel = () => {
          okBtn.removeEventListener("click", handlerOk);
          modalEl.removeEventListener("hidden.bs.modal", handlerCancel);
          resolve(false);
        };
        const handlerOk = () => {
          okBtn.removeEventListener("click", handlerOk);
          modalEl.removeEventListener("hidden.bs.modal", handlerCancel);
          modal.hide();
          resolve(true);
        };
        okBtn.addEventListener("click", handlerOk);
        modalEl.addEventListener("hidden.bs.modal", handlerCancel, { once: true });
        modal.show();
      });
    } catch (e) {
      return window.confirm(message);
    }
  }

  // 8. ELIMINA ACCOUNT (OPZIONALE, COMPLESSO IN SUPABASE CLIENT-SIDE)
  async deleteUser() {
    if (!this.user) {
      showAppAlert("Devi essere loggato per richiedere l'eliminazione dell'account.");
      return;
    }
    const email = this.user.email || "";
    const id = this.user.id || "";
    const body = encodeURIComponent(
      "Richiesta eliminazione account scheda PG.%0D%0A%0D%0A" +
      "Email: " + email + "%0D%0A" +
      "User ID: " + id + "%0D%0A%0D%0A" +
      "Scrivi qui eventuali dettagli aggiuntivi:"
    );
    const subject = encodeURIComponent("Richiesta eliminazione account scheda PG");
    window.location.href = "mailto:TUO_INDIRIZZO_EMAIL?subject=" + subject + "&body=" + body;
  }

  updateUI() {
    const btnLogin = document.getElementById("cloudLoginBtn");
    const pnlUser = document.getElementById("cloudUserPanel");
    const lblUser = document.getElementById("cloudUsername");
    const displayInput = document.getElementById("cloudDisplayNameInput");
    
    if (this.user) {
      if (btnLogin) btnLogin.classList.add("d-none");
      if (pnlUser) pnlUser.classList.remove("d-none");
      const meta = this.user.user_metadata || {};
      const effectiveName = meta.display_name || this.user.email || "Utente";
      if (lblUser) lblUser.textContent = effectiveName;
      if (displayInput && !displayInput.value) {
        displayInput.value = meta.display_name || "";
      }
      
      // Carica lista personaggi quando si apre il modale profilo
      const modalEl = document.getElementById('cloudProfileModal');
      if(modalEl) {
        modalEl.addEventListener('show.bs.modal', () => this.renderCharList());
      }
      // Se il modale è già aperto (es. dopo login), carica subito
      if(modalEl && modalEl.classList.contains('show')) this.renderCharList();

      const isStatsPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/" || window.location.pathname === "";
      if (modalEl && isStatsPage && !this._profileAutoShown && window.bootstrap) {
        this._profileAutoShown = true;
        const profileModal = bootstrap.Modal.getOrCreateInstance(modalEl);
        profileModal.show();
      }
      
    } else {
      if (btnLogin) btnLogin.classList.remove("d-none");
      if (pnlUser) pnlUser.classList.add("d-none");
    }
  }
}

// Helper XSS prevent
function escapeHTML(str) {
  return String(str ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

// Inizializzazione
window.cloud = new CloudManager();
