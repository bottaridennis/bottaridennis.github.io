/* =====================================================================
   DEDE.OS · DEDESH
   Estende il terminale: filesystem finto (cd, pwd, cat, ls, tree), grep,
   skills, man, neofetch, contact, hire-me, ping, weather, typing-test,
   effetti (hack, rain, fire, sl, sudo rm -rf /), lyrics, visualizer,
   alias, &&, suggerimenti in grigio, correzione dei refusi, Ctrl+L/Ctrl+C,
   prompt colorato e tema segreto sbloccabile con il Konami code.
   Caricato per ultimo: si appoggia a P, C, keys, W, THEMES, run, term,
   setTrack, togglePlay, analyser, playing, cur, hackTransition, esc.
   ===================================================================== */
(() => {
  const EMAIL = "info@dennisbottari.it";
  const FIRST_YEAR = 2015; // prime righe di codice (vedi Timeline)
  const IT = () => typeof LANG === "undefined" || LANG !== "EN";
  const $o = () => document.getElementById("to");
  const store = {
    get(k, d) {
      try {
        return JSON.parse(localStorage.getItem(k)) ?? d;
      } catch {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch {}
    },
  };

  /* ---------------- stile ---------------- */
  const css = document.createElement("style");
  css.textContent = `
  .tm .prompt{white-space:nowrap}
  .tm .prompt .u{color:#2fd49a;font-weight:700}
  .tm .prompt .p{color:#7fb2ff;font-weight:700}
  :root[data-active-theme]:not([data-active-theme="none"]) .tm .prompt .u{color:var(--ln)}
  :root[data-active-theme]:not([data-active-theme="none"]) .tm .prompt .p{color:var(--mu)}
  .ti-row{display:flex;gap:1ch;align-items:baseline}
  .ti-wrap{position:relative;flex:1;min-width:0}
  .tm .ti-wrap input{position:relative;z-index:1;width:100%;background:transparent}
  .ti-ghost{position:absolute;left:0;top:0;right:0;white-space:pre;overflow:hidden;pointer-events:none;opacity:.42;font:inherit;line-height:inherit}
  .ti-ghost .typed{visibility:hidden}
  .tm mark.hl{background:#ffd23f;color:#15132b;border-radius:2px;padding:0 2px}
  .tm .tpre{margin:2px 0;font:inherit;white-space:pre;line-height:1.25;overflow-x:auto}
  .tm .dim{opacity:.65}
  .tm .ok2{color:#2fd49a}.tm .warn{color:#ffb02e}.tm .bad{color:#ff5c85}.tm .acc{color:#7fb2ff}
  .tm .lyrics{max-height:230px;overflow:auto;white-space:pre-wrap;border-left:2px solid currentColor;padding:2px 0 2px 10px;margin:6px 0;scroll-behavior:smooth}
  .tm .sl-track{overflow:hidden;white-space:pre;line-height:1.1;margin:4px 0}
  .tm .sl-track pre{display:inline-block;margin:0;font:inherit}
  .tm .fetch{display:flex;gap:2ch;flex-wrap:wrap;align-items:flex-start}
  .tm .swatch{display:inline-block;width:1.6em;height:1em;margin-right:2px;vertical-align:middle;border-radius:2px}
  .tm .bar-hack{height:6px;border:1px solid currentColor;margin:6px 0;max-width:320px}
  .tm .bar-hack i{display:block;height:100%;width:0;background:currentColor;transition:width .2s}
  #fxOverlay{position:fixed;inset:0;z-index:1985;pointer-events:none;width:100%;height:100%;image-rendering:pixelated}
  .tfall{animation:tfall 1.1s cubic-bezier(.55,0,1,.45) forwards!important;animation-delay:var(--d,0s)!important}
  @keyframes tfall{to{translate:0 120vh;rotate:var(--r,12deg);opacity:.15}}
  .trise{animation:trise .7s cubic-bezier(.2,1.4,.4,1)!important}
  @keyframes trise{from{translate:0 -40px;opacity:0}}
  .dede-toast{position:fixed;left:50%;top:64px;transform:translateX(-50%);z-index:1995;padding:.6rem 1rem;border-radius:12px;
    background:#15132b;color:#fff;font:700 .9rem "JetBrains Mono",monospace;box-shadow:0 10px 30px rgba(0,0,0,.4);border:2px solid #ffd23f;
    animation:toastIn .5s cubic-bezier(.2,1.6,.4,1)}
  @keyframes toastIn{from{transform:translate(-50%,-20px);opacity:0}}
  /* tema segreto: ARCADE (Konami code) */
  :root[data-active-theme="arcade"]{--sk-bg:#0c0020;--sk-panel:#170838;--sk-panel2:#22104f;--sk-ink:#fff4fd;--sk-mu:#d7b8ff;
    --sk-line:#ff3df2;--sk-acc:#ffe600;--sk-acc2:#00f0ff;--sk-on-acc:#170838;--sk-radius:4px;--sk-bw:3px;--sk-bstyle:solid;
    --sk-shadow:0 0 0 2px #00f0ff,0 0 30px rgba(255,61,242,.55),8px 8px 0 #00f0ff;--sk-font:"Space Grotesk",sans-serif;--sk-title:"Press Start 2P",monospace}
  :root[data-active-theme="arcade"] .tb{font-size:.62rem;background:linear-gradient(90deg,#ff3df2,#ffe600,#00f0ff,#ff3df2);background-size:300% 100%;animation:hueSlide 4s linear infinite}
  :root[data-active-theme="arcade"] #themeScene{background:radial-gradient(ellipse at 50% 120%,rgba(255,61,242,.4),transparent 60%),#0c0020}
  :root[data-active-theme="arcade"] #themeScene .s1{inset:0;background:radial-gradient(2px 2px at 20% 30%,#fff,transparent),radial-gradient(2px 2px at 70% 20%,#fff,transparent),radial-gradient(1.5px 1.5px at 40% 70%,#fff,transparent),radial-gradient(2px 2px at 85% 60%,#fff,transparent),radial-gradient(1.5px 1.5px at 10% 80%,#fff,transparent);background-size:260px 260px;animation:arcadeStars 6s linear infinite}
  @keyframes arcadeStars{to{background-position:0 260px,0 260px,0 260px,0 260px,0 260px}}
  :root[data-active-theme="arcade"] #themeScene .s2{left:50%;bottom:calc(var(--dock-h) + 60px);transform:translateX(-50%);font:400 clamp(1rem,3vw,1.8rem) "Press Start 2P",monospace;color:#ffe600;text-shadow:3px 3px 0 #ff3df2;animation:pressStart 1s steps(1) infinite;white-space:nowrap}
  :root[data-active-theme="arcade"] #themeScene .s2::before{content:"INSERT COIN ★ 1UP"}
  :root[data-active-theme="arcade"] .ico i{animation:gbBob .8s steps(2) infinite;animation-delay:calc(var(--i)*-.2s)}
  `;
  document.head.appendChild(css);

  /* ---------------- output ---------------- */
  const scroll = () => {
    const o = $o();
    if (o) o.closest(".bd2").scrollTop = 1e9;
  };
  const html = (markup) => {
    const o = $o();
    if (!o) return null;
    o.insertAdjacentHTML("beforeend", markup);
    scroll();
    return o.lastElementChild;
  };
  const say = (text, cls = "o") => html(`<div class="line ${cls}">${esc(text)}</div>`);
  const pre = (text, cls = "") => html(`<pre class="tpre ${cls}">${esc(text)}</pre>`);

  /* ---------------- filesystem finto ---------------- */
  const slug = (p) => p.t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + (p.d === "music" ? ".mp3" : ".md");
  const FILES_HOME = ["leggimi.txt", "contatti.txt", "cv.pdf"];
  let cwd = ""; // "" = ~, altrimenti chiave cartella
  const folderName = (k) => k;
  const filesIn = (k) => P.filter((p) => p.d === k);
  const pathStr = () => "~" + (cwd ? "/" + cwd : "");
  const promptHTML = () => `<span class="prompt"><span class="u">dede@os</span>:<span class="p">${esc(pathStr())}</span>$</span>`;
  const echo = (line) => html(`<div class="line">${promptHTML()} ${esc(line)}</div>`);
  const refreshPrompt = () => document.querySelectorAll(".ti-row > .prompt").forEach((el) => (el.outerHTML = promptHTML()));
  function resolveFile(arg) {
    // accetta "file", "cartella/file", "~/cartella/file", "../file"
    let parts = arg.replace(/^~\/?/, "").split("/").filter(Boolean);
    let dir = arg.startsWith("~") ? "" : cwd;
    while (parts.length > 1) {
      const d = parts.shift();
      if (d === "..") dir = "";
      else if (C[d] && !dir) dir = d;
      else return null;
    }
    const name = (parts[0] || "").toLowerCase();
    if (!dir && FILES_HOME.includes(name)) return { home: name };
    const pool = dir ? filesIn(dir) : P;
    return pool.find((p) => slug(p) === name) || pool.find((p) => slug(p).replace(/\.\w+$/, "") === name.replace(/\.\w+$/, "")) || null;
  }
  const findProject = (q) => {
    q = q.toLowerCase().trim();
    return P.find((p) => slug(p) === q) || P.find((p) => slug(p).startsWith(q)) || P.find((p) => p.t.toLowerCase().includes(q));
  };

  /* ---------------- task interrompibili (Ctrl+C) ---------------- */
  const tasks = new Set();
  const later = (fn, ms) => {
    const id = setTimeout(() => {
      tasks.delete(stop);
      fn();
    }, ms);
    const stop = () => clearTimeout(id);
    tasks.add(stop);
    return stop;
  };
  const every = (fn, ms) => {
    const id = setInterval(fn, ms);
    const stop = () => clearInterval(id);
    tasks.add(stop);
    return () => {
      stop();
      tasks.delete(stop);
    };
  };
  const addTask = (stop) => (tasks.add(stop), () => (stop(), tasks.delete(stop)));
  function interrupt() {
    const had = tasks.size || mode;
    tasks.forEach((s) => s());
    tasks.clear();
    mode = null;
    if (had) say("^C", "bad");
  }

  /* ---------------- modalità interattive (contact, typing-test) ---------------- */
  let mode = null;

  /* ---------------- comandi ---------------- */
  const CMD = {};
  const MAN = {};
  const def = (names, fn, man) => {
    [].concat(names).forEach((n) => {
      CMD[n] = fn;
      if (man) MAN[n] = man;
    });
  };

  def("pwd", () => say("/home/dede" + (cwd ? "/" + cwd : "")), "pwd — mostra la cartella corrente.");

  def(
    "cd",
    (args) => {
      const a = (args[0] || "~").replace(/\/$/, "");
      if (a === "~" || a === "/" || a === ".." || a === "~/" || a === "../") cwd = "";
      else if (a === ".") return;
      else {
        const k = a.replace(/^~\//, "").replace(/^\.\.\//, "");
        if (C[k] && (a.startsWith("~") || a.startsWith("..") || !cwd)) cwd = k;
        else return say(`cd: ${a}: cartella inesistente. Prova ls`, "bad");
      }
      refreshPrompt();
    },
    "cd <cartella> — entra in una cartella (web, game, iot, music, graphic, art3d, about). cd .. o cd ~ per tornare alla home.",
  );

  function ls(args) {
    const long = args.includes("-l") || args.includes("-la");
    const target = args.find((a) => !a.startsWith("-"));
    const dir = target ? target.replace(/^~\/?/, "").replace(/\/$/, "") : cwd;
    if (dir && !C[dir]) return say(`ls: ${target}: cartella inesistente`, "bad");
    if (!dir) {
      const folders = keys.map((k) => `<span class="acc">${k}/</span>`);
      const files = FILES_HOME.map((f) => `<span>${f}</span>`);
      if (long)
        return html(
          `<pre class="tpre">${keys.map((k) => `drwxr-xr-x  dede  ${String(filesIn(k).length).padStart(3)} file   <span class="acc">${k}/</span>  ${esc(C[k][2])}`).join("\n")}\n${FILES_HOME.map((f) => `-rw-r--r--  dede            ${f}`).join("\n")}</pre>`,
        );
      return html(`<div class="line">${folders.concat(files).join("   ")}</div>`);
    }
    const fs = filesIn(dir);
    if (long)
      return html(`<pre class="tpre">${fs.map((p) => `-rw-r--r--  dede  ${esc((p.c || "").padEnd(12).slice(0, 12))}  ${esc(slug(p))}`).join("\n")}</pre>`);
    html(`<div class="line">${fs.map((p) => esc(slug(p))).join("   ")}</div>`);
  }
  def("ls", ls, "ls [-l] [cartella] — elenca file e cartelle. Con -l mostra i dettagli.");

  function catProject(p) {
    const i = P.indexOf(p);
    const lines = [
      `# ${p.t}`,
      "",
      p.x,
      p.story ? "\n## Come funziona\n" + p.story : "",
      "",
      (p.d === "music" ? "Album: " : "Tecnologie: ") + p.k.join(", "),
      p.u && p.d !== "music" ? "Link: " + p.u : "",
      p.g ? "GitHub: " + p.g : "",
    ].filter((x, j) => x !== "" || j === 1 || j === 4);
    pre(lines.join("\n"));
    const acts = [];
    if (p.d === "music") acts.push(`<a href="#" data-term-run="jukebox play ${esc(p.t)}">▶ ascolta</a>`, `<a href="#" data-term-run="lyrics ${esc(slug(p).replace(/\.mp3$/, ""))}">♪ testo</a>`);
    else acts.push(`<a href="#" data-term-run="open ${esc(slug(p).replace(/\.md$/, ""))}">↗ apri</a>`);
    if (p.d !== "about") acts.push(`<a href="#" data-term-detail="${i}">☰ scheda</a>`);
    html(`<div class="terminal-links">${acts.join("")}</div>`);
  }
  def(
    "cat",
    (args) => {
      if (!args.length) return say("Uso: cat <file>. Esempio: cat leggimi.txt", "warn");
      const f = resolveFile(args.join(" "));
      if (!f) return say(`cat: ${args.join(" ")}: file inesistente`, "bad");
      if (f.home === "leggimi.txt")
        return pre(
          `Benvenuto in Dede.OS!\n\nQuesto è il portfolio di Dennis Bottari, travestito da sistema operativo.\nOgni cartella è una disciplina, ogni file un progetto.\n\n  ls          guarda cosa c'è\n  cd web      entra in una cartella\n  cat <file>  leggi un progetto\n  tree        vedi tutto in una volta\n  help        tutti i comandi`,
        );
      if (f.home === "contatti.txt")
        return html(
          `<pre class="tpre">Email     ${esc(EMAIL)}\nLinkedIn  linkedin.com/in/dennis-bottari\nGitHub    github.com/bottaridennis\nYouTube   youtube.com/@dede_bottari</pre><div class="terminal-links"><a href="mailto:${EMAIL}">✉ scrivimi</a><a href="#" data-term-run="contact">✎ contact</a></div>`,
        );
      if (f.home === "cv.pdf") {
        say("cat: cv.pdf è un file binario. Lo apro nel visualizzatore…", "warn");
        return window.open(IMG.Dede.replace(/Dede\.png$/, "CV.pdf"), "_blank");
      }
      catProject(f);
    },
    "cat <file> — legge un file. Esempio: cat web/nerdshelf.md, cat leggimi.txt",
  );

  def(
    "tree",
    () => {
      const out = ["~"];
      keys.forEach((k, ki) => {
        const lastK = ki === keys.length - 1 && !FILES_HOME.length;
        out.push(`${lastK ? "└──" : "├──"} ${k}/`);
        const fs = filesIn(k);
        fs.forEach((p, i) => out.push(`${lastK ? "    " : "│   "}${i === fs.length - 1 ? "└──" : "├──"} ${slug(p)}`));
      });
      FILES_HOME.forEach((f, i) => out.push(`${i === FILES_HOME.length - 1 ? "└──" : "├──"} ${f}`));
      out.push("", `${keys.length} cartelle, ${P.length + FILES_HOME.length} file`);
      pre(out.join("\n"));
    },
    "tree — mostra l'albero di tutte le cartelle e i progetti.",
  );

  def(
    "grep",
    (args) => {
      const q = args.filter((a) => !a.startsWith("-")).join(" ").replace(/^["']|["']$/g, "");
      if (!q) return say("Uso: grep <parola>. Esempio: grep react", "warn");
      const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      const hits = [];
      P.forEach((p) => {
        const text = [p.t, p.x, p.story, p.k.filter(Boolean).join(", ")].filter(Boolean).join(" · ");
        const m = text.search(rx);
        if (m < 0) return;
        const from = Math.max(0, m - 30), snip = (from ? "…" : "") + text.slice(from, m + q.length + 50) + "…";
        hits.push(`<div class="line"><span class="acc">${esc(p.d)}/${esc(slug(p))}</span>: ${esc(snip).replace(rx, (s) => `<mark class="hl">${s}</mark>`)}</div>`);
      });
      if (!hits.length) return say(`grep: nessun risultato per "${q}"`, "warn");
      html(hits.join("") + `<div class="line dim">${hits.length} risultati</div>`);
    },
    "grep <parola> — cerca una parola in tutti i progetti e la evidenzia.",
  );

  def(
    "skills",
    () => {
      const count = {};
      P.filter((p) => p.d !== "music" && p.d !== "about").forEach((p) => p.k.filter(Boolean).forEach((k) => (count[k] = (count[k] || 0) + 1)));
      const top = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 14);
      const max = top[0][1], w = Math.max(...top.map(([k]) => k.length));
      pre(
        "Tecnologie per numero di progetti\n\n" +
          top.map(([k, n]) => `${k.padEnd(w)}  ${"█".repeat(Math.round((n / max) * 20)).padEnd(20, "░")}  ${n}`).join("\n"),
      );
    },
    "skills — le tecnologie più usate, contate dai progetti del portfolio.",
  );

  def(
    "neofetch",
    () => {
      const years = new Date().getFullYear() - FIRST_YEAR;
      const count = {};
      P.filter((p) => p.d === "web" || p.d === "game").forEach((p) => p.k.filter(Boolean).forEach((k) => (count[k] = (count[k] || 0) + 1)));
      const langs = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k]) => k).join(", ");
      const at = document.documentElement.dataset.activeTheme;
      const np = P.filter((p) => p.d !== "music").length, nb = P.length - np;
      const logo = [
        " ██████╗  ██████╗ ",
        " ██╔══██╗ ██╔══██╗",
        " ██║  ██║ ██████╔╝",
        " ██║  ██║ ██╔══██╗",
        " ██████╔╝ ██████╔╝",
        " ╚═════╝  ╚═════╝ ",
      ];
      const info = [
        ["", "dede@os"],
        ["", "───────"],
        ["OS", "Dede.OS 3.0"],
        ["Host", "Verona, Italia"],
        ["Uptime", `dal ${FIRST_YEAR} (${years} anni di codice)`],
        ["Pacchetti", `${np} progetti, ${nb} brani`],
        ["Shell", "dedesh 1.0"],
        ["Tema", THEMES[at] ? THEMES[at].label : "Originale"],
        ["Risoluzione", `${innerWidth}×${innerHeight}`],
        ["Linguaggi", langs],
        ["Discipline", keys.filter((k) => k !== "about").map((k) => C[k][0]).join(" · ")],
      ];
      const swatches = Object.values(C).map((c) => `<span class="swatch" style="background:${c[1]}"></span>`).join("");
      html(
        `<div class="fetch"><pre class="tpre acc">${esc(logo.join("\n"))}</pre><pre class="tpre">${info
          .map(([k, v]) => (k ? `<span class="acc">${esc(k)}</span>: ${esc(v)}` : `<b>${esc(v)}</b>`))
          .join("\n")}\n\n${swatches}</pre></div>`,
      );
    },
    "neofetch — scheda di sistema con logo, anni di esperienza, progetti e tema attivo.",
  );

  def(
    "man",
    (args) => {
      const c = (args[0] || "").toLowerCase();
      if (!c) return say("Uso: man <comando>. Esempio: man grep", "warn");
      const m = MAN[c] || BUILTIN_MAN[c];
      if (!m) return say(`man: nessuna pagina per ${c}`, "bad");
      pre(`${c.toUpperCase()}(1)              Manuale di dedesh\n\n${m}`);
    },
    "man <comando> — mostra la pagina di aiuto di un comando.",
  );

  def(
    "open",
    (args, line, fallback) => {
      const a = args.join(" ").toLowerCase();
      const p = findProject(a.replace(/\.(md|mp3)$/, ""));
      if (!p) return fallback();
      const i = P.indexOf(p);
      if (p.d === "music") {
        setTrack(i);
        togglePlay();
        return say("♪ riproduco " + p.t, "ok2");
      }
      if (p.d === "game" && /\.html$/.test(p.u)) return gwin(i), say("▶ avvio " + p.t, "ok2");
      if (p.u && p.d !== "about") return window.open(p.u, "_blank", "noopener"), say("↗ apro " + p.t + " in una nuova scheda", "ok2");
      dwin(p.d);
      showFileDetail(i, p.d);
      say("apro la scheda di " + p.t, "ok2");
    },
    "open <cartella|progetto> — apre una cartella o direttamente un progetto (sito, gioco o brano).",
  );

  /* ----- contatti e lavoro ----- */
  def(
    "contact",
    () => {
      const data = {};
      const steps = [
        ["name", "Come ti chiami?", (v) => v.length > 1 || "Scrivi almeno due lettere."],
        ["email", "La tua email?", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email non valida, riprova."],
        ["msg", "Il messaggio (una riga):", (v) => v.length > 4 || "Scrivi qualcosa in più."],
        ["ok", "Invio? (s/n)", (v) => /^(s|si|sì|y|yes|n|no)$/i.test(v) || "Rispondi s oppure n."],
      ];
      let i = 0;
      say("✉  Modulo di contatto. Ctrl+C per annullare.", "acc");
      say(steps[0][1], "warn");
      mode = {
        secret: false,
        handle(v) {
          v = v.trim();
          html(`<div class="line dim">› ${esc(steps[i][0] === "email" ? v : v)}</div>`);
          const r = steps[i][2](v);
          if (r !== true) return say(r, "bad");
          data[steps[i][0]] = v;
          i++;
          if (i < steps.length) return say(steps[i][1], "warn");
          mode = null;
          if (/^n/i.test(data.ok)) return say("Annullato. Nessun messaggio inviato.", "warn");
          const href = `mailto:${EMAIL}?subject=${encodeURIComponent("Dal portfolio: " + data.name)}&body=${encodeURIComponent(data.msg + "\n\n— " + data.name + " (" + data.email + ")")}`;
          say("Apro il tuo programma di posta con il messaggio pronto…", "ok2");
          html(`<div class="terminal-links"><a href="${esc(href)}">✉ se non si apre, clicca qui</a></div>`);
          location.href = href;
        },
      };
    },
    "contact — modulo guidato (nome, email, messaggio) che prepara un'email per Dennis.",
  );

  def(
    "hire-me",
    () => {
      const pkgs = keys.filter((k) => k !== "about").map((k) => `@dede/${k}`);
      say("$ npm install dennis-bottari", "dim");
      let n = 0;
      const line = html(`<div class="line o"></div>`);
      const stop = every(() => {
        if (n < pkgs.length) {
          line.textContent = `⠋ resolving ${pkgs[n]}… ${"█".repeat(n + 1).padEnd(pkgs.length, "░")}`;
          n++;
          return;
        }
        stop();
        line.textContent = `✓ added ${pkgs.length} discipline in ${(0.6 + Math.random()).toFixed(2)}s`;
        line.className = "line ok2";
        pre(keys.filter((k) => k !== "about").map((k) => `  ${C[k][3]}  ${C[k][0].padEnd(9)} ${C[k][2]}`).join("\n"));
        html(
          `<div class="line">Per proposte di lavoro o collaborazioni:</div><div class="terminal-links"><a href="#" data-term-run="contact">✎ contact</a><a href="mailto:${EMAIL}">✉ email</a><a href="https://linkedin.com/in/dennis-bottari/" target="_blank" rel="noopener">in LinkedIn</a><a href="#" data-term-run="cat cv.pdf">📄 CV</a></div>`,
        );
      }, 180);
    },
    "hire-me — installa Dennis nel tuo team (con link a CV, LinkedIn e contatti).",
  );

  def(
    "ping",
    (args) => {
      const host = args[0] || "dennis";
      say(`PING ${host}.verona (127.0.0.42): 56 byte di dati`);
      let i = 0;
      const times = [];
      const stop = every(() => {
        if (i < 4) {
          const t = (8 + Math.random() * 30).toFixed(1);
          times.push(+t);
          say(`64 byte da ${host}: icmp_seq=${i} ttl=64 tempo=${t} ms`);
          i++;
          return;
        }
        stop();
        say(`--- statistiche ping ${host} ---\n4 pacchetti inviati, 4 ricevuti, 0% persi\nmin/med/max = ${Math.min(...times)}/${(times.reduce((a, b) => a + b) / 4).toFixed(1)}/${Math.max(...times)} ms`);
        say(host === "dennis" ? "🟢 Dennis è online da Verona." : `🟢 ${host} risponde.`, "ok2");
      }, 450);
    },
    "ping [host] — controlla se Dennis è raggiungibile (spoiler: sì).",
  );

  /* ----- meteo reale (Open-Meteo, senza chiave) ----- */
  const WX = {
    sun: ["    \\   /    ", "     .-.     ", "  ― (   ) ―  ", "     `-’     ", "    /   \\    "],
    part: ["   \\  /      ", " _ /\"\".-.    ", "   \\_(   ).  ", "   /(___(__) ", "             "],
    cloud: ["             ", "     .--.    ", "  .-(    ).  ", " (___.__)__) ", "             "],
    fog: ["             ", " _ - _ - _ - ", "  _ - _ - _  ", " _ - _ - _ - ", "             "],
    rain: ["     .-.     ", "    (   ).   ", "   (___(__)  ", "    ‘ ‘ ‘ ‘  ", "   ‘ ‘ ‘ ‘   "],
    snow: ["     .-.     ", "    (   ).   ", "   (___(__)  ", "    *  *  *  ", "   *  *  *   "],
    storm: ["     .-.     ", "    (   ).   ", "   (___(__)  ", "    ⚡‘‘⚡‘‘  ", "    ‘‘‘‘‘    "],
  };
  const wxKind = (c) => (c === 0 ? ["sun", "Sereno"] : c <= 2 ? ["part", "Poco nuvoloso"] : c === 3 ? ["cloud", "Nuvoloso"] : c <= 48 ? ["fog", "Nebbia"] : c <= 67 || (c >= 80 && c <= 82) ? ["rain", "Pioggia"] : c <= 77 || c === 85 || c === 86 ? ["snow", "Neve"] : ["storm", "Temporale"]);
  def(
    "weather",
    (args) => {
      const city = args.join(" ") || "Verona";
      say(`Chiedo il meteo di ${city} a open-meteo.com…`, "dim");
      const ctrl = new AbortController();
      addTask(() => ctrl.abort());
      const geo = /^verona$/i.test(city)
        ? Promise.resolve({ name: "Verona", latitude: 45.4384, longitude: 10.9916 })
        : fetch(`https://geocoding-api.open-meteo.com/v1/search?count=1&language=it&name=${encodeURIComponent(city)}`, { signal: ctrl.signal })
            .then((r) => r.json())
            .then((j) => j.results?.[0] || Promise.reject(new Error("città non trovata")));
      geo
        .then((g) =>
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`, { signal: ctrl.signal })
            .then((r) => r.json())
            .then((w) => [g, w.current]),
        )
        .then(([g, c]) => {
          const [k, label] = wxKind(c.weather_code);
          const right = [
            `${g.name}: ${label}`,
            `${Math.round(c.temperature_2m)} °C (percepiti ${Math.round(c.apparent_temperature)} °C)`,
            `Vento ${Math.round(c.wind_speed_10m)} km/h`,
            `Umidità ${c.relative_humidity_2m}%`,
            "",
          ];
          pre(WX[k].map((l, i) => l + "  " + right[i]).join("\n"), "acc");
        })
        .catch((e) => e.name !== "AbortError" && say("weather: servizio meteo non raggiungibile (" + e.message + ")", "bad"));
    },
    "weather [città] — meteo attuale in ASCII (dati reali da open-meteo.com). Senza argomento: Verona.",
  );

  /* ----- typing test ----- */
  const PHRASES = [
    "il codice migliore è quello che puoi spiegare a voce",
    "prima fallo funzionare poi rendilo bello poi rendilo veloce",
    "ogni bug risolto insegna qualcosa sul progetto",
    "un pixel alla volta si costruisce un mondo intero",
    "tra un commit e un altro c'è sempre una canzone",
    "la curiosità è il miglior framework che esista",
  ];
  const lev = (a, b) => {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  };
  def(
    "typing-test",
    () => {
      const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
      say("⌨  Copia la frase e premi Invio. Il tempo parte dal primo tasto. Ctrl+C per uscire.", "acc");
      html(`<div class="line"><b>${esc(phrase)}</b></div>`);
      let t0 = 0;
      const input = document.getElementById("ti");
      const onKey = () => (t0 = t0 || performance.now());
      input?.addEventListener("input", onKey);
      const off = addTask(() => input?.removeEventListener("input", onKey));
      mode = {
        handle(v) {
          off();
          mode = null;
          const secs = Math.max((performance.now() - (t0 || performance.now())) / 1000, 0.5);
          const typed = v.trim();
          const acc = Math.max(0, 1 - lev(typed, phrase) / phrase.length);
          const wpm = Math.round((typed.length / 5) / (secs / 60));
          html(`<div class="line dim">› ${esc(typed)}</div>`);
          const best = store.get("dede-wpm", 0);
          const record = acc > 0.9 && wpm > best;
          if (record) store.set("dede-wpm", wpm);
          pre(`Velocità    ${wpm} parole/min\nPrecisione  ${Math.round(acc * 100)}%\nTempo       ${secs.toFixed(1)} s${record ? "\n★ Nuovo record personale!" : best ? `\nRecord      ${best} parole/min` : ""}`, acc > 0.9 ? "ok2" : "warn");
        },
      };
    },
    "typing-test — misura la tua velocità di scrittura (parole al minuto e precisione).",
  );

  /* ----- effetti ----- */
  def(
    "hack",
    () => {
      const hex = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0")).join(" ");
      const steps = ["Connessione al mainframe…", "Bypass del firewall…", "Decifratura AES-256…", "Iniezione del payload…", "Copertura delle tracce…"];
      let i = 0;
      const box = html(`<div></div>`);
      const bar = html(`<div class="bar-hack"><i></i></div>`);
      const stop = every(() => {
        i++;
        box.insertAdjacentHTML("beforeend", `<div class="line ${i % 8 === 0 ? "warn" : "dim"}">${i % 8 === 0 ? "> " + steps[(i / 8 - 1) % steps.length] : "0x" + hex()}</div>`);
        bar.firstChild.style.width = Math.min(100, (i / 40) * 100) + "%";
        scroll();
        if (i >= 40) {
          stop();
          say("██ ACCESS GRANTED ██", "ok2");
          say("(scherzo: l'unico sistema bucato è questo portfolio, e solo per finta)", "dim");
        }
      }, 55);
    },
    "hack — sequenza di hacking da film. Innocua.",
  );

  function fullscreenFx(draw, secs, fps = 30) {
    document.getElementById("fxOverlay")?.remove();
    const cv = document.createElement("canvas");
    cv.id = "fxOverlay";
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d");
    const state = draw.init(cv, ctx);
    let raf = 0, last = 0;
    const t0 = performance.now();
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 1000 / fps) return;
      last = t;
      draw.frame(ctx, state, (t - t0) / 1000);
      if (t - t0 > secs * 1000) end();
    };
    const end = () => {
      cancelAnimationFrame(raf);
      cv.style.transition = "opacity .6s";
      cv.style.opacity = 0;
      setTimeout(() => cv.remove(), 650);
      tasks.delete(end);
    };
    tasks.add(end);
    raf = requestAnimationFrame(loop);
  }
  def(
    "rain",
    () => {
      say("☔ pioggia di codice per 8 secondi (Ctrl+C per fermarla)", "dim");
      fullscreenFx(
        {
          init(cv) {
            cv.width = innerWidth;
            cv.height = innerHeight;
            const cols = Math.floor(cv.width / 16);
            return { drops: Array.from({ length: cols }, () => Math.random() * -50), chars: "アカサタナハマヤラワ0123456789DEDEOS<>/{}" };
          },
          frame(ctx, s) {
            ctx.fillStyle = "rgba(0,0,0,.08)";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.font = "15px monospace";
            s.drops.forEach((y, i) => {
              ctx.fillStyle = Math.random() < 0.05 ? "#fff" : "#00ff6a";
              ctx.fillText(s.chars[(Math.random() * s.chars.length) | 0], i * 16, y * 16);
              s.drops[i] = y * 16 > ctx.canvas.height && Math.random() > 0.97 ? 0 : y + 1;
            });
          },
        },
        8,
      );
    },
    "rain — pioggia di codice a tutto schermo per qualche secondo.",
  );
  def(
    "fire",
    () => {
      say("🔥 fuoco a tutto schermo per 8 secondi (Ctrl+C per spegnerlo)", "dim");
      const PAL = [];
      for (let i = 0; i < 37; i++) {
        const t = i / 36;
        PAL.push([Math.min(255, t * 3 * 255), Math.max(0, Math.min(255, (t * 3 - 1) * 255)), Math.max(0, Math.min(255, (t * 3 - 2) * 255))]);
      }
      fullscreenFx(
        {
          init(cv) {
            cv.width = Math.ceil(innerWidth / 6);
            cv.height = Math.ceil(innerHeight / 6);
            cv.style.width = "100%";
            cv.style.height = "100%";
            const px = new Uint8Array(cv.width * cv.height);
            for (let x = 0; x < cv.width; x++) px[(cv.height - 1) * cv.width + x] = 36;
            return { px, img: new ImageData(cv.width, cv.height) };
          },
          frame(ctx, s, t) {
            const W2 = ctx.canvas.width, H2 = ctx.canvas.height, px = s.px;
            if (t > 6) for (let x = 0; x < W2; x++) px[(H2 - 1) * W2 + x] = Math.max(0, px[(H2 - 1) * W2 + x] - 2);
            for (let x = 0; x < W2; x++)
              for (let y = 1; y < H2; y++) {
                const src = y * W2 + x, r = (Math.random() * 3) | 0, dst = src - r + 1 - W2;
                px[dst] = Math.max(0, px[src] - (r & 1));
              }
            const d = s.img.data;
            for (let i = 0; i < px.length; i++) {
              const c = PAL[px[i]];
              d[i * 4] = c[0];
              d[i * 4 + 1] = c[1];
              d[i * 4 + 2] = c[2];
              d[i * 4 + 3] = px[i] ? Math.min(255, px[i] * 12) : 0;
            }
            ctx.putImageData(s.img, 0, 0);
          },
        },
        8,
        24,
      );
    },
    "fire — fuoco in pixel art a tutto schermo per qualche secondo.",
  );

  def(
    "sl",
    () => {
      const train = [
        "      ====        ________                ___________ ",
        "  _D _|  |_______/        \\__I_I_____===__|_________| ",
        "   |(_)---  |   H\\________/ |   |        =|___ ___|   ",
        "   /     |  |   H  |  |     |   |         ||_| |_||   ",
        "  |      |  |   H  |__--------------------| [___] |   ",
        "  | ________|___H__/__|_____/[][]~\\_______|       |   ",
        "  |/ |   |-----------I_____I [][] []  D   |=======|__ ",
        "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ",
        " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ",
        "  \\_/      \\O=====O=====O=====O_/      \\_/            ",
      ].join("\n");
      const track = html(`<div class="sl-track"><pre>${esc(train)}</pre></div>`);
      const el = track.firstChild, w = track.clientWidth;
      const anim = el.animate([{ transform: `translateX(${w}px)` }, { transform: `translateX(-${el.offsetWidth + 20}px)` }], { duration: 4500, easing: "linear", fill: "forwards" });
      const end = addTask(() => anim.cancel());
      anim.onfinish = () => {
        end();
        track.remove();
        say("Forse volevi scrivere ls? 🚂", "dim");
      };
    },
    "sl — Steam Locomotive: per chi sbaglia a scrivere ls.",
  );

  CMD.__sudoRm = () => {
    const targets = [...document.querySelectorAll("#mbar, #ic, #dock, .win:not([hidden])")];
    const lines = ["rm: rimuovo /home/dede/web…", "rm: rimuovo /home/dede/music…", "rm: rimuovo /usr/bin/creatività…", "rm: rimuovo /boot/kernel…"];
    let i = 0;
    const stop = every(() => {
      if (i < lines.length) return say(lines[i++], "bad");
      stop();
      targets.forEach((el, k) => {
        el.style.setProperty("--d", k * 0.07 + "s");
        el.style.setProperty("--r", (Math.random() * 40 - 20).toFixed(0) + "deg");
        el.classList.add("tfall");
      });
      later(() => {
        targets.forEach((el) => {
          el.classList.remove("tfall");
          el.classList.add("trise");
          setTimeout(() => el.classList.remove("trise"), 800);
        });
        say("Kernel panic… scherzo! 😄 Sistema ripristinato dal backup.", "ok2");
      }, 2300);
    }, 260);
    addTask(() => targets.forEach((el) => el.classList.remove("tfall")));
  };

  /* ----- musica ----- */
  const songs = () => P.map((p, i) => ({ p, i })).filter((s) => s.p.d === "music");
  const lyricsCache = {};
  function lyricsUrls(p) {
    const dir = p.audio.replace(/[^/]*$/, "");
    const songsDir = /Songs\/$/.test(dir) ? dir : dir + "Songs/";
    const base = p.t.replace(/\s+/g, "_");
    const fromAudio = /Songs\//.test(p.audio) ? [p.audio.replace(/\.\w+$/, ".txt")] : [];
    return [...fromAudio, songsDir + base + ".txt", songsDir + "Unknown-" + base + ".txt"];
  }
  async function loadLyrics(p) {
    if (lyricsCache[p.t]) return lyricsCache[p.t];
    for (const url of lyricsUrls(p)) {
      try {
        const r = await fetch(url);
        if (!r.ok) continue;
        const txt = await r.text();
        let m = txt.split(/---\s*Lyrics\s*---/i)[1];
        if (m) m = m.split(/^\s*(?:Cover Art URL:|---)/m)[0].trim();
        if (m) return (lyricsCache[p.t] = m);
      } catch {}
    }
    return null;
  }
  let lyricsSync = null;
  def(
    "lyrics",
    async (args) => {
      const q = args.join(" ");
      const s = q ? songs().find(({ p }) => slug(p).replace(/\.mp3$/, "") === q.toLowerCase() || p.t.toLowerCase().includes(q.toLowerCase())) : songs().find(({ i }) => i === cur);
      if (!s) return say(q ? `lyrics: brano "${q}" non trovato. Prova jukebox list` : "Nessun brano in riproduzione. Usa lyrics <titolo>.", "warn");
      const text = await loadLyrics(s.p);
      if (!text) return say(`lyrics: testo di "${s.p.t}" non disponibile`, "warn");
      say(`♪ ${s.p.t}`, "acc");
      const box = html(`<div class="lyrics">${esc(text)}</div>`);
      if (lyricsSync) lyricsSync();
      if (s.i === cur) {
        const audio = document.getElementById("realAudio");
        const onTime = () => {
          if (!box.isConnected) return lyricsSync && lyricsSync();
          if (audio.duration) box.scrollTop = (audio.currentTime / audio.duration) * (box.scrollHeight - box.clientHeight);
        };
        audio.addEventListener("timeupdate", onTime);
        lyricsSync = () => {
          audio.removeEventListener("timeupdate", onTime);
          lyricsSync = null;
        };
        say("Il testo scorre insieme al brano.", "dim");
      }
    },
    "lyrics [brano] — mostra il testo del brano. Se è in riproduzione, scorre in sincrono.",
  );

  def(
    "visualizer",
    () => {
      if (!playing || !analyser) return say("Nessun brano in riproduzione. Prova: jukebox play && visualizer", "warn");
      const box = html(`<pre class="tpre acc"></pre>`);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const BLK = " ▁▂▃▄▅▆▇█";
      const rows = 8;
      const stop = every(() => {
        if (!playing || !box.isConnected) {
          stop();
          return say("visualizer: brano in pausa.", "dim");
        }
        analyser.getByteFrequencyData(data);
        const n = Math.min(data.length, 32);
        const out = [];
        for (let r = rows - 1; r >= 0; r--) {
          let line = "";
          for (let i = 0; i < n; i++) {
            const v = (data[i] / 255) * rows - r;
            line += BLK[Math.max(0, Math.min(8, Math.round(v * 8)))].repeat(2);
          }
          out.push(line);
        }
        box.textContent = out.join("\n");
      }, 60);
      say("Ctrl+C per fermare il visualizer.", "dim");
    },
    "visualizer — spettro audio in ASCII del brano in riproduzione.",
  );

  /* ----- alias ----- */
  let aliases = store.get("dede-aliases", { ll: "ls -l", la: "ls -l", home: "cd ~" });
  def(
    "alias",
    (args, line) => {
      const def2 = line.replace(/^alias\s*/i, "");
      if (!def2) return pre(Object.entries(aliases).map(([k, v]) => `alias ${k}='${v}'`).join("\n") || "Nessun alias.");
      const m = def2.match(/^([\w-]+)=(['"]?)(.+)\2$/);
      if (!m) return say("Uso: alias nome='comando'. Esempio: alias w='open web'", "warn");
      if (CMD[m[1]] || BUILTIN.has(m[1])) return say(`alias: ${m[1]} è già un comando`, "bad");
      aliases[m[1]] = m[3];
      store.set("dede-aliases", aliases);
      say(`alias ${m[1]}='${m[3]}' salvato su questo dispositivo`, "ok2");
    },
    "alias [nome='comando'] — crea scorciatoie (salvate su questo dispositivo). Senza argomenti le elenca.",
  );
  def(
    "unalias",
    (args) => {
      if (!aliases[args[0]]) return say(`unalias: ${args[0] || "?"}: alias inesistente`, "bad");
      delete aliases[args[0]];
      store.set("dede-aliases", aliases);
      say(`alias ${args[0]} rimosso`, "ok2");
    },
    "unalias <nome> — elimina un alias.",
  );

  def(
    "help",
    () => {
      const g = [
        ["File", "ls · cd · pwd · cat · tree · grep · open · inspect"],
        ["Info", "whoami · neofetch · skills · stats · timeline · cv · credits"],
        ["Contatti", "contact · hire-me · ping"],
        ["Musica", "jukebox · lyrics · visualizer"],
        ["Giochi", "snake · play · adventure · typing-test · roll · quests · achievement"],
        ["Effetti", "hack · rain · fire · sl · cowsay · fortune · pet"],
        ["Aspetto", "temi · theme · secret · reset · effects · sound"],
        ["Shell", "help · man · history · alias · clear · weather"],
      ];
      const w = Math.max(...g.map(([k]) => k.length));
      pre(
        g.map(([k, v]) => `${k.padEnd(w)}  ${v}`).join("\n") +
          "\n\nTab completa · → accetta il suggerimento · ↑/↓ cronologia\nCtrl+L pulisce · Ctrl+C interrompe · cmd1 && cmd2 in sequenza\nman <comando> per i dettagli.",
      );
    },
    "help — elenco dei comandi per categoria.",
  );

  const BUILTIN_MAN = {
    whoami: "whoami — chi è Dennis, in una riga.",
    stats: "stats — numero di progetti e brani.",
    play: "play — avvia un gioco a caso.",
    gallery: "gallery — galleria delle immagini dei progetti.",
    timeline: "timeline — il percorso anno per anno.",
    cv: "cv — curriculum in finestra.",
    snake: "snake — il classico, con frecce, WASD o swipe.",
    clear: "clear — pulisce il terminale (anche Ctrl+L).",
    reset: "reset — torna al tema originale.",
    secret: "secret — elenca i temi segreti.",
    temi: "temi — apre la galleria dei temi.",
    theme: "theme <nome|random|preview|save|off> — gestisce i temi.",
    quests: "quests — missioni del portfolio.",
    inspect: "inspect <progetto> — dettagli e link di un progetto.",
    jukebox: "jukebox list|play <titolo>|pause|next — il lettore musicale.",
    roll: "roll NdS — tira dadi. Esempio: roll 2d20",
    adventure: "adventure — mini avventura testuale in tre stanze.",
    pet: "pet on|off|feed|sleep|wake — la mascotte del desktop.",
    fortune: "fortune — un biscotto della fortuna.",
    cowsay: "cowsay <testo> — la mucca parla.",
    achievement: "achievement — trofei sbloccati.",
    credits: "credits — i titoli di coda.",
    history: "history — la cronologia dei comandi.",
    effects: "effects on|off — accende o spegne animazioni ed effetti.",
    sound: "sound on|off — suoni dell'interfaccia.",
    sudo: "sudo — meglio di no. Prova sudo rm -rf / se sei coraggioso.",
  };
  const BUILTIN = new Set([
    ...Object.keys(BUILTIN_MAN),
    "help", "ls", "open", "normal", "tema", "themes",
    "nr", "fallout", "pipboy", "outrun", "aesthetic", "win95",
  ]);

  /* ---------------- dispatcher ---------------- */
  const allCommands = () => [...new Set([...Object.keys(CMD).filter((c) => !c.startsWith("__")), ...BUILTIN, ...Object.keys(THEMES), ...Object.keys(aliases)])].sort();
  const pg = window.dennisPlayground;
  const baseRun = pg.run;
  let depth = 0;
  pg.run = (raw) => {
    if (mode) {
      mode.handle(raw);
      return true;
    }
    const line = raw.trim();
    if (!line) return baseRun(raw);
    if (line.includes("&&") && depth < 5) {
      depth++;
      line.split("&&").map((s) => s.trim()).filter(Boolean).forEach((seg) => run(seg));
      depth--;
      return true;
    }
    const [first, ...args] = line.split(/\s+/);
    const cmd = first.toLowerCase();
    if (aliases[cmd] && depth < 5) {
      depth++;
      run([aliases[cmd], ...args].join(" "));
      depth--;
      return true;
    }
    if (/^sudo\s+rm\s+-rf?\s+\/?\*?$/i.test(line)) {
      baseRun(line);
      echo(line);
      CMD.__sudoRm();
      return true;
    }
    if (cmd === "open" && (!args.length || C[args[0]?.toLowerCase()] || args[0]?.toLowerCase() === "about")) return baseRun(raw);
    if (CMD[cmd]) {
      if (baseRun(line)) return true; // cronologia + achievement (mai gestito dal playground)
      echo(line);
      let fell = false;
      CMD[cmd](args, line, () => (fell = true));
      if (fell) {
        if (cmd === "open") say("open: cartella o progetto non trovato. Prova ls o tree", "bad");
      }
      return true;
    }
    if (!BUILTIN.has(cmd) && !THEMES[cmd]) {
      baseRun(line);
      echo(line);
      const best = allCommands()
        .map((c) => [c, lev(cmd, c)])
        .sort((a, b) => a[1] - b[1])[0];
      if (best && best[1] <= Math.max(2, Math.floor(cmd.length / 3)))
        html(`<div class="line bad">comando non trovato: ${esc(cmd)}. Forse intendevi <a href="#" data-term-run="${esc([best[0], ...args].join(" "))}">${esc(best[0])}</a>?</div>`);
      else say(`comando non trovato: ${cmd}. Prova help`, "bad");
      return true;
    }
    return baseRun(raw);
  };

  /* link "esegui" dentro l'output */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-term-run],[data-term-detail]");
    if (!a) return;
    e.preventDefault();
    if (a.dataset.termDetail) {
      const p = P[+a.dataset.termDetail];
      dwin(p.d);
      return showFileDetail(+a.dataset.termDetail, p.d);
    }
    run(a.dataset.termRun);
    document.getElementById("ti")?.focus();
  });

  /* ---------------- prompt colorato + suggerimento in grigio ---------------- */
  const history = () => store.get("dennis-playground-v1", {}).history || [];
  function suggestion(v) {
    if (!v) return "";
    const h = history();
    for (let i = h.length - 1; i >= 0; i--) if (h[i].startsWith(v) && h[i] !== v) return h[i].slice(v.length);
    if (!v.includes(" ")) {
      const c = allCommands().find((c) => c.startsWith(v.toLowerCase()) && c !== v);
      if (c) return c.slice(v.length);
    }
    return "";
  }
  function enhance() {
    const input = document.getElementById("ti");
    if (!input || input.closest(".ti-wrap")) return;
    const row = input.parentElement;
    row.className = "ti-row";
    row.innerHTML = promptHTML();
    const wrap = document.createElement("span");
    wrap.className = "ti-wrap";
    wrap.innerHTML = '<span class="ti-ghost" aria-hidden="true"><span class="typed"></span><span class="rest"></span></span>';
    wrap.appendChild(input);
    row.appendChild(wrap);
    const ghost = wrap.querySelector(".ti-ghost");
    const upd = () => {
      ghost.querySelector(".typed").textContent = input.value;
      ghost.querySelector(".rest").textContent = mode ? "" : suggestion(input.value);
      ghost.scrollLeft = input.scrollLeft;
    };
    input.addEventListener("input", upd);
    input.addEventListener("keyup", upd);
    input.addEventListener("scroll", upd);
    input.addEventListener("blur", () => (ghost.querySelector(".rest").textContent = ""));
  }
  const baseTerm = term;
  term = function () {
    baseTerm();
    enhance();
  };
  enhance();

  /* ---------------- tastiera: Tab, →, Ctrl+L, Ctrl+C ---------------- */
  function completeArgs(cmd, prefix) {
    if (cmd === "cd") return [...keys.map((k) => k + "/"), "..", "~"];
    if (cmd === "cat" || cmd === "open") {
      const local = cwd ? filesIn(cwd).map(slug) : [...keys.map((k) => k + "/"), ...FILES_HOME];
      if (prefix.includes("/")) {
        const [d] = prefix.split("/");
        if (C[d]) return filesIn(d).map((p) => d + "/" + slug(p));
      }
      return cmd === "open" ? [...keys, ...P.filter((p) => p.d !== "about").map((p) => slug(p).replace(/\.(md|mp3)$/, ""))] : local;
    }
    if (cmd === "ls" || cmd === "tree") return keys.map((k) => k + "/");
    if (cmd === "man") return allCommands();
    if (cmd === "lyrics") return songs().map(({ p }) => slug(p).replace(/\.mp3$/, ""));
    if (cmd === "unalias") return Object.keys(aliases);
    return null;
  }
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.target.id !== "ti") return;
      const input = e.target;
      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        $o().innerHTML = "";
        return;
      }
      if (e.ctrlKey && e.key.toLowerCase() === "c" && !input.value.slice(input.selectionStart, input.selectionEnd)) {
        e.preventDefault();
        if (input.value && !tasks.size && !mode) html(`<div class="line">${promptHTML()} ${esc(input.value)}<span class="bad">^C</span></div>`);
        input.value = "";
        interrupt();
        return;
      }
      if ((e.key === "ArrowRight" || e.key === "End") && input.selectionStart === input.value.length) {
        const s = suggestion(input.value);
        if (s && !mode) {
          e.preventDefault();
          input.value += s;
          input.dispatchEvent(new Event("input"));
        }
        return;
      }
      if (e.key !== "Tab" || mode) return;
      const v = input.value.replace(/^\s+/, "");
      const parts = v.split(/\s+/);
      let options, prefix;
      if (parts.length === 1) {
        options = allCommands();
        prefix = parts[0].toLowerCase();
      } else {
        options = completeArgs(parts[0].toLowerCase(), parts.at(-1));
        prefix = parts.at(-1).toLowerCase();
        if (!options) return; // lascia fare al playground (theme, jukebox, pet…)
      }
      e.preventDefault();
      e.stopImmediatePropagation();
      const matches = [...new Set(options)].filter((o) => o.toLowerCase().startsWith(prefix));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        input.value = parts.join(" ") + (matches[0].endsWith("/") ? "" : " ");
      } else if (matches.length) {
        let common = matches[0];
        matches.forEach((m) => {
          while (!m.toLowerCase().startsWith(common.toLowerCase())) common = common.slice(0, -1);
        });
        if (common.length > prefix.length) {
          parts[parts.length - 1] = common;
          input.value = parts.join(" ");
        } else say(matches.join("   "), "dim");
      }
      input.dispatchEvent(new Event("input"));
    },
    true,
  );

  /* ---------------- Konami code → tema ARCADE ---------------- */
  const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  let kpos = 0;
  const addArcade = () => {
    THEMES.arcade = { label: "Arcade ★", color: "#ff3df2", sweep: "#ffe600", seq: ["> KONAMI CODE ACCEPTED", "> +30 VITE", "> INSERT COIN"] };
  };
  // themes.js gestisce data-skin per i suoi temi; qui lo aggiungiamo per Arcade.
  const skinArcade = () => {
    const r = document.documentElement;
    if (r.dataset.activeTheme === "arcade" && r.dataset.skin !== "plus") r.dataset.skin = "plus";
  };
  new MutationObserver(skinArcade).observe(document.documentElement, { attributes: true, attributeFilter: ["data-active-theme"] });
  if (store.get("dede-konami", false)) {
    addArcade();
    try {
      if (localStorage.getItem("activeTheme") === "arcade") setTheme("arcade");
    } catch {}
  }
  document.addEventListener("keydown", (e) => {
    if (e.target.closest?.("input,textarea") && e.target.id !== "ti") return;
    const k = e.key.toLowerCase();
    kpos = k === KONAMI[kpos] ? kpos + 1 : k === KONAMI[0] ? 1 : 0;
    if (kpos < KONAMI.length) return;
    kpos = 0;
    const first = !THEMES.arcade;
    addArcade();
    store.set("dede-konami", true);
    const t = document.createElement("div");
    t.className = "dede-toast";
    t.textContent = first ? "★ KONAMI CODE! Tema segreto ARCADE sbloccato" : "★ ARCADE MODE";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3200);
    hackTransition("arcade");
  });
})();
