
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
    
    // Ascolta cambiamenti auth
    this.client.auth.onAuthStateChange((event, session) => {
      this.user = session?.user || null;
      this.updateUI();
    });
  }

  // 1. REGISTRAZIONE
  async register(email, password) {
    const { data, error } = await this.client.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert("Errore registrazione: " + error.message);
      return false;
    }
    
    alert("Registrazione completata! Controlla la tua email per confermare (o se hai disabilitato la conferma, fai login).");
    return true;
  }

  // 2. LOGIN
  async login(email, password) {
    const { data, error } = await this.client.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("Errore login: " + error.message);
      return false;
    }
    
    // onAuthStateChange gestirà l'UI
    const modal = bootstrap.Modal.getInstance(document.getElementById('cloudAuthModal'));
    modal?.hide();
    return true;
  }

  // 3. LOGOUT
  async logout() {
    const { error } = await this.client.auth.signOut();
    if (error) alert(error.message);
    window.location.reload();
  }

  // 4. SALVA PERSONAGGIO
  async saveCharacter(charName) {
    if (!this.user) return;

    const charData = {
      pg_stats: localStorage.getItem("pg_stats"),
      mySpells: localStorage.getItem("mySpells"),
      myInvocations: localStorage.getItem("myInvocations"),
      myFeatures: localStorage.getItem("myFeatures"),
      inventory: localStorage.getItem("inventory"),
      encounter_state: localStorage.getItem("encounter_state"),
      notes: localStorage.getItem("notes")
    };

    // Cerchiamo se esiste già un PG con questo nome per questo utente
    const { data: existing } = await this.client
      .from('characters')
      .select('id')
      .eq('name', charName)
      .single();

    let error;
    if (existing) {
      // Aggiorna
      if(!confirm(`Sovrascrivere il personaggio "${charName}" esistente?`)) return;
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
          name: charName,
          data: charData
        });
      error = res.error;
    }

    if (error) {
      alert("Errore salvataggio: " + error.message);
    } else {
      alert("Personaggio salvato con successo!");
      this.renderCharList();
    }
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
      list.innerHTML = '<div class="text-muted tiny">Nessun personaggio salvato.</div>';
      return;
    }

    list.innerHTML = data.map((c) => `
      <div class="d-flex justify-content-between align-items-center mb-2 p-2 glass-card">
        <div>
          <div class="fw-bold">${escapeHTML(c.name)}</div>
          <div class="tiny text-mutedish">${new Date(c.updated_at).toLocaleDateString()}</div>
        </div>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-info" onclick="window.cloud.loadCharacter('${c.id}')">
            <i class='bx bx-upload'></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="window.cloud.deleteCharacter('${c.id}')">
            <i class='bx bx-trash'></i>
          </button>
        </div>
      </div>
    `).join("");
  }

  // 6. CARICA SINGOLO PERSONAGGIO
  async loadCharacter(id) {
    const { data, error } = await this.client
      .from('characters')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      alert("Errore caricamento: " + (error?.message || "Non trovato"));
      return;
    }

    const d = data.data;
    if (d.pg_stats) localStorage.setItem("pg_stats", d.pg_stats);
    if (d.mySpells) localStorage.setItem("mySpells", d.mySpells);
    if (d.myInvocations) localStorage.setItem("myInvocations", d.myInvocations);
    if (d.myFeatures) localStorage.setItem("myFeatures", d.myFeatures);
    if (d.inventory) localStorage.setItem("inventory", d.inventory);
    if (d.encounter_state) localStorage.setItem("encounter_state", d.encounter_state);
    if (d.notes) localStorage.setItem("notes", d.notes);

    alert(`Personaggio "${data.name}" caricato!`);
    window.location.reload();
  }

  // 7. ELIMINA PERSONAGGIO
  async deleteCharacter(id) {
    if(!confirm("Eliminare definitivamente questo personaggio?")) return;

    const { error } = await this.client
      .from('characters')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Errore eliminazione: " + error.message);
    } else {
      this.renderCharList();
    }
  }

  // 8. ELIMINA ACCOUNT (OPZIONALE, COMPLESSO IN SUPABASE CLIENT-SIDE)
  async deleteUser() {
    alert("Per eliminare l'account, contatta l'amministratore o fallo dal pannello Supabase.");
  }

  updateUI() {
    const btnLogin = document.getElementById("cloudLoginBtn");
    const pnlUser = document.getElementById("cloudUserPanel");
    const lblUser = document.getElementById("cloudUsername");
    
    if (this.user) {
      if (btnLogin) btnLogin.classList.add("d-none");
      if (pnlUser) pnlUser.classList.remove("d-none");
      if (lblUser) lblUser.textContent = this.user.email;
      
      // Carica lista personaggi quando si apre il modale profilo
      const modalEl = document.getElementById('cloudProfileModal');
      if(modalEl) {
        modalEl.addEventListener('show.bs.modal', () => this.renderCharList());
      }
      // Se il modale è già aperto (es. dopo login), carica subito
      if(modalEl && modalEl.classList.contains('show')) this.renderCharList();
      
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
