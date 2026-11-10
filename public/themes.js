/* =====================================================================
   DEDE.OS · THEMES+
   - scenari e overlay per ogni tema (#themeScene, #themeOverlay)
   - particelle su canvas: neve, bolle, pipistrelli, braci, flussi di dati…
   - galleria "Temi" (icona sul desktop, barra in alto, palette, terminale)
   - transizione circolare fra un tema e l'altro (View Transitions API)
   - finestra in primo piano evidenziata
   Caricato dopo playground.js: usa THEMES, W, mk, fo, setTheme, hackTransition.
   ===================================================================== */
(() => {
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const effectsOn = () => root.dataset.effects !== "off" && !reduced;
  const EN = () => typeof LANG !== "undefined" && LANG === "EN";
  const SKIN = ["blueprint", "gameboy", "deepsea", "paper", "crt"];

  /* ---------- descrizioni e anteprime dei temi ---------- */
  const INFO = {
    none: ["Originale", "Colori pop, blob animati e stelle.", ["#2a2bd8", "#fbf9ff", "#ff5c85", "#15132b"]],
    netrunner: ["Netrunner", "HUD cyberpunk, griglia in corsa, titoli glitch.", ["#020504", "#060b09", "#00e5c0", "#00e5c0"]],
    matrix: ["Matrix", "Pioggia di codice dietro finestre traslucide.", ["#000", "#000800", "#00ff41", "#00ff41"]],
    retro: ["Retro 95", "Bevel, taskbar con Start e animazioni a scatti.", ["#008080", "#c0c0c0", "#000080", "#000"]],
    vt100: ["VT100", "Terminale a fosfori verdi con scanline.", ["#000", "#0a0a0a", "#33ff33", "#33ff33"]],
    vaporwave: ["Vaporwave", "Sole a strisce, pastelli e ＡＥＳＴＨＥＴＩＣ.", ["#b967ff", "#fff0fb", "#ff71ce", "#ff71ce"]],
    synthwave: ["Synthwave", "Sole outrun, montagne e griglia al neon.", ["#0d0221", "#261447", "#ff2a6d", "#05d9e8"]],
    nord: ["Nord", "Aurora boreale, neve e vetro smerigliato.", ["#2e3440", "#3b4252", "#88c0d0", "#d8dee9"]],
    dracula: ["Dracula", "Luna, nebbia viola e pipistrelli.", ["#1e1f29", "#282a36", "#bd93f9", "#ff79c6"]],
    solarized: ["Solarized", "Raggi di luce lenti e pulviscolo dorato.", ["#002b36", "#073642", "#268bd2", "#93a1a1"]],
    gruvbox: ["Gruvbox", "Grana calda, braci e finestre squadrate.", ["#1d2021", "#282828", "#d79921", "#ebdbb2"]],
    amber: ["Amber CRT", "Monitor ambra con flicker e bagliore.", ["#0a0500", "#1a1000", "#ffb000", "#ffb000"]],
    blueprint: ["Blueprint", "Tavola tecnica con quote, righelli e cartiglio.", ["#0b2a4a", "#0f3459", "#ffd166", "#eaf6ff"]],
    gameboy: ["Game Boy", "LCD a 4 verdi, pixel e PRESS START.", ["#8bac0f", "#9bbc0f", "#306230", "#0f380f"]],
    deepsea: ["Deep Sea", "Caustiche, bolle e plancton luminoso.", ["#052a4a", "#04203a", "#36e0c8", "#dcfffd"]],
    paper: ["Paper", "Fogli a righe, nastro adesivo e post-it.", ["#c9b48f", "#fffcf2", "#e0573f", "#2d2924"]],
    crt: ["CRT", "Tubo catodico con maschera RGB e accensione.", ["#010702", "#03140a", "#70dd8c", "#9affb2"]],
  };

  /* ---------- livelli grafici ---------- */
  const scene = document.createElement("div");
  scene.id = "themeScene";
  scene.setAttribute("aria-hidden", "true");
  scene.innerHTML = '<i class="s1"></i><i class="s2"></i><i class="s3"></i>';
  const fx = document.createElement("canvas");
  fx.id = "themeFx";
  fx.setAttribute("aria-hidden", "true");
  const overlay = document.createElement("div");
  overlay.id = "themeOverlay";
  overlay.setAttribute("aria-hidden", "true");
  document.getElementById("wp").after(scene, fx);
  document.body.appendChild(overlay);

  /* ---------- particelle per tema ---------- */
  const ctx = fx.getContext("2d");
  let fw = 0, fh = 0, dpr = 1, parts = [], kind = null, raf = 0, lastFrame = 0;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    fw = innerWidth;
    fh = innerHeight;
    fx.width = fw * dpr;
    fx.height = fh * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const SYSTEMS = {
    nord: {
      n: 90,
      make: (init) => ({ x: rnd(0, fw), y: init ? rnd(0, fh) : -10, r: rnd(0.8, 2.6), v: rnd(15, 45), sw: rnd(0, 6.28) }),
      step(p, dt, t) {
        p.y += p.v * dt;
        p.x += Math.sin(t * 0.8 + p.sw) * 12 * dt;
        return p.y < fh + 10;
      },
      draw(p) {
        ctx.fillStyle = `rgba(236,239,244,${0.35 + p.r / 5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fill();
      },
    },
    deepsea: {
      n: 70,
      make: (init) =>
        Math.random() < 0.4
          ? { b: 1, x: rnd(0, fw), y: init ? rnd(0, fh) : fh + 10, r: rnd(2, 7), v: rnd(25, 70), sw: rnd(0, 6.28) }
          : { b: 0, x: rnd(0, fw), y: rnd(fh * 0.25, fh), r: rnd(1, 2.4), v: rnd(-6, 6), sw: rnd(0, 6.28), hue: Math.random() < 0.5 ? "54,224,200" : "143,123,255" },
      step(p, dt, t) {
        if (p.b) {
          p.y -= p.v * dt;
          p.x += Math.sin(t * 2 + p.sw) * 18 * dt;
          return p.y > -20;
        }
        p.x += p.v * dt;
        p.y += Math.sin(t + p.sw) * 4 * dt;
        return p.x > -20 && p.x < fw + 20;
      },
      draw(p, t) {
        if (p.b) {
          ctx.strokeStyle = "rgba(200,255,250,.45)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 7);
          ctx.stroke();
          ctx.fillStyle = "rgba(255,255,255,.55)";
          ctx.fillRect(p.x - p.r * 0.4, p.y - p.r * 0.5, 1.5, 1.5);
        } else {
          const a = 0.35 + 0.35 * Math.sin(t * 2.5 + p.sw);
          ctx.fillStyle = `rgba(${p.hue},${a})`;
          ctx.shadowColor = `rgba(${p.hue},1)`;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 7);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      },
    },
    gruvbox: {
      n: 45,
      make: (init) => ({ x: rnd(0, fw), y: init ? rnd(fh * 0.4, fh) : fh + 5, v: rnd(20, 60), life: rnd(0.4, 1), sw: rnd(0, 6.28), r: rnd(1, 2.4) }),
      step(p, dt, t) {
        p.y -= p.v * dt;
        p.x += Math.sin(t * 1.5 + p.sw) * 20 * dt;
        p.life -= dt * 0.12;
        return p.life > 0 && p.y > -10;
      },
      draw(p) {
        ctx.fillStyle = `rgba(254,${128 + p.life * 80 | 0},25,${p.life})`;
        ctx.shadowColor = "#fe8019";
        ctx.shadowBlur = 6;
        ctx.fillRect(p.x, p.y, p.r, p.r);
        ctx.shadowBlur = 0;
      },
    },
    solarized: {
      n: 55,
      make: () => ({ x: rnd(0, fw), y: rnd(0, fh), r: rnd(0.6, 1.8), vx: rnd(-6, 6), vy: rnd(-5, 5), sw: rnd(0, 6.28) }),
      step(p, dt) {
        p.x = (p.x + p.vx * dt + fw) % fw;
        p.y = (p.y + p.vy * dt + fh) % fh;
        return true;
      },
      draw(p, t) {
        ctx.fillStyle = `rgba(253,246,227,${0.15 + 0.25 * (1 + Math.sin(t + p.sw)) / 2})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fill();
      },
    },
    synthwave: {
      n: 60,
      make: () => ({ x: rnd(0, fw), y: rnd(0, fh * 0.42), r: rnd(0.5, 1.6), sw: rnd(0, 6.28) }),
      step: () => true,
      draw(p, t) {
        ctx.fillStyle = `rgba(255,255,255,${0.3 + 0.6 * (1 + Math.sin(t * 2 + p.sw)) / 2})`;
        ctx.fillRect(p.x, p.y, p.r, p.r);
      },
    },
    netrunner: {
      n: 26,
      make: (init) => ({ x: Math.floor(rnd(0, fw / 18)) * 18, y: init ? rnd(-fh, fh) : rnd(-300, -40), v: rnd(80, 220), len: rnd(40, 160), c: Math.random() < 0.2 ? "255,42,109" : "0,229,192" }),
      step(p, dt) {
        p.y += p.v * dt;
        return p.y - p.len < fh;
      },
      draw(p) {
        const g = ctx.createLinearGradient(0, p.y - p.len, 0, p.y);
        g.addColorStop(0, `rgba(${p.c},0)`);
        g.addColorStop(1, `rgba(${p.c},.55)`);
        ctx.fillStyle = g;
        ctx.fillRect(p.x, p.y - p.len, 1.5, p.len);
        ctx.fillStyle = `rgba(${p.c},.95)`;
        ctx.fillRect(p.x - 1, p.y - 2, 3.5, 3);
      },
    },
    dracula: {
      n: 6,
      make: () => {
        const dir = Math.random() < 0.5 ? 1 : -1;
        return { x: dir > 0 ? -40 : fw + 40, y: rnd(fh * 0.08, fh * 0.45), v: rnd(70, 140) * dir, s: rnd(0.6, 1.3), sw: rnd(0, 6.28), wait: rnd(0, 8) };
      },
      step(p, dt, t) {
        if (p.wait > 0) return (p.wait -= dt), true;
        p.x += p.v * dt;
        p.y += Math.sin(t * 3 + p.sw) * 30 * dt;
        return p.x > -60 && p.x < fw + 60;
      },
      draw(p, t) {
        if (p.wait > 0) return;
        const f = Math.sin(t * 18 + p.sw), s = p.s * 10;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(p.v > 0 ? 1 : -1, 1);
        ctx.fillStyle = "rgba(20,10,30,.85)";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-s, -s * f, -s * 2, -s * 0.2 * f);
        ctx.quadraticCurveTo(-s, s * 0.3, 0, s * 0.35);
        ctx.quadraticCurveTo(s, s * 0.3, s * 2, -s * 0.2 * f);
        ctx.quadraticCurveTo(s, -s * f, 0, 0);
        ctx.fill();
        ctx.restore();
      },
    },
    vaporwave: {
      n: 24,
      make: (init) => ({ x: rnd(0, fw), y: init ? rnd(0, fh) : fh + 20, v: rnd(10, 30), r: rnd(6, 16), rot: rnd(0, 6.28), sh: Math.floor(rnd(0, 3)), c: ["255,113,206", "1,205,254", "5,255,161"][Math.floor(rnd(0, 3))] }),
      step(p, dt) {
        p.y -= p.v * dt;
        p.rot += dt * 0.5;
        return p.y > -30;
      },
      draw(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.strokeStyle = `rgba(${p.c},.55)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (p.sh === 0) ctx.arc(0, 0, p.r, 0, 7);
        else if (p.sh === 1) ctx.rect(-p.r, -p.r, p.r * 2, p.r * 2);
        else {
          ctx.moveTo(0, -p.r);
          ctx.lineTo(p.r, p.r);
          ctx.lineTo(-p.r, p.r);
          ctx.closePath();
        }
        ctx.stroke();
        ctx.restore();
      },
    },
  };

  function frame(ms) {
    raf = 0;
    if (!kind || !effectsOn()) return ctx.clearRect(0, 0, fw, fh);
    if (document.hidden) return;
    raf = requestAnimationFrame(frame);
    if (ms - lastFrame < 30) return;
    const dt = Math.min((ms - lastFrame) / 1000, 0.1);
    lastFrame = ms;
    const t = ms / 1000, sys = SYSTEMS[kind];
    ctx.clearRect(0, 0, fw, fh);
    parts = parts.filter((p) => sys.step(p, dt, t));
    while (parts.length < sys.n) parts.push(sys.make(false));
    parts.forEach((p) => sys.draw(p, t));
  }
  function startFx(name) {
    kind = SYSTEMS[name] ? name : null;
    parts = kind ? Array.from({ length: SYSTEMS[kind].n }, () => SYSTEMS[kind].make(true)) : [];
    ctx.clearRect(0, 0, fw, fh);
    if (kind && !raf && effectsOn()) {
      lastFrame = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  resize();
  addEventListener("resize", () => {
    resize();
    if (kind) startFx(kind);
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && kind && !raf) startFx(kind);
  });

  /* ---------- reazione al cambio di tema ---------- */
  function syncTheme() {
    const name = root.dataset.activeTheme;
    if (SKIN.includes(name)) root.dataset.skin = "plus";
    else delete root.dataset.skin;
    startFx(name);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = (INFO[name] || INFO.none)[2][0];
    document.querySelectorAll(".theme-card").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.themePick === (THEMES[name] ? name : "none"))));
  }
  new MutationObserver(syncTheme).observe(root, { attributes: true, attributeFilter: ["data-active-theme", "data-effects"] });
  syncTheme();

  /* ---------- transizione circolare ---------- */
  addEventListener("pointerdown", (e) => {
    root.style.setProperty("--vx", e.clientX + "px");
    root.style.setProperty("--vy", e.clientY + "px");
  }, true);
  const baseSetTheme = setTheme;
  setTheme = function (name) {
    const target = name && THEMES[name] ? name : "none";
    if (target === root.dataset.activeTheme || !document.startViewTransition || !effectsOn() || !document.body.classList.contains("go"))
      return baseSetTheme(name);
    document.startViewTransition(() => baseSetTheme(name));
  };

  /* ---------- finestra in primo piano ---------- */
  const baseFo = fo;
  fo = function (id) {
    baseFo(id);
    Object.entries(W).forEach(([k, w]) => w.classList.toggle("is-front", k === id));
  };

  /* ---------- galleria dei temi ---------- */
  const esc2 = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function themeCards() {
    const active = THEMES[root.dataset.activeTheme] ? root.dataset.activeTheme : "none";
    return ["none", ...Object.keys(THEMES)]
      .map((name, i) => {
        const [label, desc, [bg, win, tb, ink]] = INFO[name] || [THEMES[name].label, "", ["#222", "#333", THEMES[name].color, "#fff"]];
        return `<button class="theme-card" data-theme-pick="${name}" aria-pressed="${name === active}" style="--fi:${i};--tp-bg:${bg};--tp-win:${win};--tp-tb:${tb};--tp-ink:${ink}"><span class="tp-screen" aria-hidden="true"></span><span><b>${esc2(label)}</b><small>${esc2(desc)}</small></span></button>`;
      })
      .join("");
  }
  function openThemes() {
    mk(
      "themes",
      EN() ? "Themes" : "Temi",
      "#b66dff",
      `<div class="theme-gallery"><p>${EN() ? "Pick a look for Dede.OS. Your choice is saved on this device." : "Scegli l'aspetto di Dede.OS. La scelta resta salvata su questo dispositivo."}</p><div class="theme-grid">${themeCards()}</div><div class="theme-actions"><button class="btn" data-theme-random><i class="bx bx-shuffle"></i> ${EN() ? "Surprise me" : "Sorprendimi"}</button><button class="btn" data-theme-fx>${root.dataset.effects === "off" ? (EN() ? "Effects: off" : "Effetti: spenti") : EN() ? "Effects: on" : "Effetti: attivi"}</button></div></div>`,
      "min(760px,94vw)",
    );
  }
  window.openThemes = openThemes;
  const pickTheme = (name) => hackTransition(name === "none" ? null : name);

  document.addEventListener("click", (e) => {
    const pick = e.target.closest("[data-theme-pick]");
    if (pick) {
      const name = pick.dataset.themePick;
      const cur = THEMES[root.dataset.activeTheme] ? root.dataset.activeTheme : "none";
      if (name !== cur) pickTheme(name);
      return;
    }
    if (e.target.closest("[data-theme-open]")) return openThemes();
    if (e.target.closest("[data-theme-random]")) {
      const names = Object.keys(THEMES).filter((n) => n !== root.dataset.activeTheme);
      return pickTheme(names[Math.floor(Math.random() * names.length)]);
    }
    const fxBtn = e.target.closest("[data-theme-fx]");
    if (fxBtn && window.dennisPlayground) {
      const on = root.dataset.effects === "off";
      window.dennisPlayground.run("effects " + (on ? "on" : "off"));
      fxBtn.textContent = on ? (EN() ? "Effects: on" : "Effetti: attivi") : EN() ? "Effects: off" : "Effetti: spenti";
    }
  });

  /* pulsante nella barra in alto */
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "themesBtn";
  btn.dataset.themeOpen = "";
  btn.title = EN() ? "Themes" : "Temi";
  btn.setAttribute("aria-label", btn.title);
  btn.innerHTML = '<i class="bx bx-palette"></i>';
  document.getElementById("th")?.before(btn);

  /* icona sul desktop */
  const icons = document.getElementById("ic");
  if (icons) {
    const n = icons.children.length;
    icons.insertAdjacentHTML(
      "beforeend",
      `<button class="ico" data-theme-open style="--c:#b66dff;--i:${n}"><i class="bx bx-palette"></i><span>${EN() ? "Themes" : "Temi"}</span></button>`,
    );
  }

  /* voce nella command palette */
  const baseBuild = buildCmdItems;
  buildCmdItems = function () {
    baseBuild();
    cmdItems.push({ t: EN() ? "Themes" : "Temi", sub: EN() ? "gallery of looks" : "galleria degli stili", ico: "bx-palette", color: "#b66dff", hint: "tema", run: openThemes });
    Object.keys(THEMES).forEach((name) =>
      cmdItems.push({ t: (EN() ? "Theme: " : "Tema: ") + (INFO[name] ? INFO[name][0] : THEMES[name].label), sub: INFO[name] ? INFO[name][1] : "", ico: "bx-palette", color: THEMES[name].color, hint: "tema", run: () => pickTheme(name) }),
    );
  };

  /* comando "temi" nel terminale */
  const pg = window.dennisPlayground;
  if (pg) {
    const baseRun = pg.run;
    pg.run = (raw) => {
      const cmd = raw.trim().split(/\s+/)[0]?.toLowerCase();
      if (cmd === "temi" || cmd === "themes") {
        const out = document.getElementById("to");
        if (out)
          out.insertAdjacentHTML(
            "beforeend",
            `<div class="line">$ ${esc2(raw.trim())}</div><div class="line ok">> ${EN() ? "opening theme gallery…" : "apro la galleria dei temi…"}</div>`,
          );
        openThemes();
        return true;
      }
      return baseRun(raw);
    };
  }
})();

/* =====================================================================
   CARTELLE: vista lista / icone grandi (ricordata per ogni cartella)
   + doppio click sulla barra del titolo per lo schermo intero
   ===================================================================== */
(() => {
  const KEY = "dede-folder-view";
  const EN = () => typeof LANG !== "undefined" && LANG === "EN";
  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
      return {};
    }
  };
  const viewOf = (k) => read()[k] || (k === "iot" || k === "about" ? "list" : "grid");
  const saveView = (k, v) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...read(), [k]: v }));
    } catch {}
  };

  const baseRow = fileRow;
  fileRow = function (p, idx, rowIndex) {
    const thumb = p.img
      ? `<img src="${esc(p.img)}" alt="" loading="lazy" decoding="async">`
      : `<i class="bx ${ICONS[p.d] || ICONS.file}" aria-hidden="true"></i>`;
    return baseRow(p, idx, rowIndex).replace('<span class="fi">', `<span class="fthumb">${thumb}</span><span class="fi">`);
  };

  function applyView(k) {
    const body = document.getElementById("fm-" + k);
    if (!body) return;
    const v = viewOf(k);
    body.classList.toggle("grid", v === "grid");
    W[k]?.querySelectorAll("[data-view]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === v)));
  }
  const baseDwin = dwin;
  dwin = function (k) {
    const w = baseDwin(k);
    const bar = W[k]?.querySelector(".fm-search");
    if (bar && !bar.querySelector(".view-toggle")) {
      bar.insertAdjacentHTML(
        "beforeend",
        `<span class="view-toggle" role="group" aria-label="${EN() ? "View" : "Vista"}"><button type="button" data-view="list" data-view-k="${k}" title="${EN() ? "List" : "Lista"}" aria-label="${EN() ? "List view" : "Vista a lista"}"><span aria-hidden="true">☰</span></button><button type="button" data-view="grid" data-view-k="${k}" title="${EN() ? "Large icons" : "Icone grandi"}" aria-label="${EN() ? "Large icons view" : "Vista a icone grandi"}"><span aria-hidden="true">▦</span></button></span>`,
      );
    }
    applyView(k);
    return w;
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-view]");
    if (!b) return;
    saveView(b.dataset.viewK, b.dataset.view);
    applyView(b.dataset.viewK);
  });
  document.addEventListener("dblclick", (e) => {
    const tb = e.target.closest(".tb");
    if (!tb || e.target.closest("button")) return;
    const w = tb.closest(".win");
    if (w) maximize(w.id.slice(2));
  });
  Object.keys(C).forEach((k) => W[k] && dwin(k));
})();

/* =====================================================================
   SFONDI IN PIXEL ART
   Generati via codice a 180 px di altezza (proporzioni dello schermo),
   poi ingranditi con image-rendering: pixelated. Nessun file da scaricare.
   ===================================================================== */
(() => {
  const root = document.documentElement;
  const scene = document.getElementById("themeScene");
  if (!scene) return;
  const cv = document.createElement("canvas");
  cv.className = "pxbg";
  cv.setAttribute("aria-hidden", "true");
  scene.prepend(cv);
  const g = cv.getContext("2d");
  const H = 180;
  let W = 288;
  const B4 = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]].map((r) => r.map((v) => (v + 0.5) / 16));
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const rng = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647;
  const rect = (x, y, w, h, c) => {
    g.fillStyle = c;
    g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  };
  const px = (x, y, c) => rect(x, y, 1, 1, c);
  function grad(y0, y1, cols) {
    y0 = Math.round(y0);
    y1 = Math.round(y1);
    const h = Math.max(1, y1 - y0), img = g.createImageData(W, h), cs = cols.map(hex);
    for (let y = 0; y < h; y++) {
      const t = (y / Math.max(1, h - 1)) * (cs.length - 1), i = Math.min(cs.length - 2, Math.floor(t)), f = t - i;
      for (let x = 0; x < W; x++) {
        const c = cs[f > B4[(y + y0) & 3][x & 3] ? i + 1 : i], o = (y * W + x) * 4;
        img.data[o] = c[0];
        img.data[o + 1] = c[1];
        img.data[o + 2] = c[2];
        img.data[o + 3] = 255;
      }
    }
    g.putImageData(img, 0, y0);
  }
  const disc = (cx, cy, r, c, dith) => {
    g.fillStyle = c;
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r && (!dith || ((x + y) & 1) === 0)) g.fillRect(cx + x, cy + y, 1, 1);
  };
  function ridge(base, amp, seed, col, rim, f = 0.03) {
    const r = rng(seed), p1 = r() * 6, p2 = r() * 6, ys = [];
    for (let x = 0; x < W; x++) {
      const y = Math.round(base + amp * Math.sin(x * f + p1) + amp * 0.45 * Math.sin(x * f * 2.7 + p2));
      ys.push(y);
      rect(x, y, 1, H - y, col);
      if (rim) px(x, y, rim);
    }
    return ys;
  }
  function stars(n, maxY, seed, col = "#ffffff") {
    const r = rng(seed);
    for (let i = 0; i < n; i++) {
      const x = (r() * W) | 0, y = (r() * maxY) | 0;
      px(x, y, col);
      if (r() < 0.08) ["-1,0", "1,0", "0,-1", "0,1"].forEach((d) => {
        const [dx, dy] = d.split(",").map(Number);
        px(x + dx, y + dy, col + "88");
      });
    }
  }
  const pine = (x, y, h, c, tip) => {
    for (let k = 0; k < h; k++) {
      const hw = k >> 1;
      rect(x - hw, y - h + k, hw * 2 + 1, 1, c);
    }
    rect(x, y, 1, 2, c);
    if (tip) rect(x, y - h, 1, 2, tip);
  };
  const tree = (x, y, r, c, trunk) => {
    rect(x, y - r, 1, r + 2, trunk);
    disc(x, y - r - 1, r, c);
  };
  function sunStriped(cx, cy, R, top, mid, bot, cutFrom = 0.1) {
    const [a, b, c] = [top, mid, bot].map(hex);
    for (let y = -R; y <= R; y++) {
      const k = y + R * (1 - cutFrom * 2);
      if (y > -R * cutFrom && k % 7 < 1 + (k / R) * 3) continue;
      const t = (y + R) / (2 * R), col = t < 0.5 ? a.map((v, i) => v + (b[i] - v) * t * 2) : b.map((v, i) => v + (c[i] - v) * (t - 0.5) * 2);
      const w = Math.round(Math.sqrt(R * R - y * y));
      rect(cx - w, cy + y, w * 2 + 1, 1, `rgb(${col.map(Math.round)})`);
    }
  }
  const palm = (x, base, h, dir, c) => {
    for (let k = 0; k < h; k++) rect(x + Math.round(Math.sin((k / h) * 1.3) * dir * 5), base - k, 2, 1, c);
    const tx = x + Math.round(Math.sin(1.3) * dir * 5), ty = base - h;
    [-2.6, -1.9, -1.2, -0.5, 0.2].forEach((a) => {
      for (let s = 0; s < 16; s++) px(tx + Math.cos(a) * s * (a < -1.5 ? -1 : 1) * 0.9 + (a < -1.5 ? 0 : 0), ty + Math.sin(Math.abs(a)) * -s * 0.35 + (s * s) / 28, c);
    });
    [-1, 1].forEach((d) => [0.35, 0.8].forEach((up) => {
      for (let s = 0; s < 15; s++) px(tx + d * s, ty - s * up + (s * s) / 22, c);
    }));
  };
  const building = (x, w, top, c, win, density, seed) => {
    rect(x, top, w, H - top, c);
    const r = rng(seed);
    for (let y = top + 3; y < H - 4; y += 4) for (let xx = x + 2; xx < x + w - 2; xx += 3) if (r() < density) rect(xx, y, 1, 2, win[(r() * win.length) | 0]);
  };

  /* ---------- un pittore per tema ---------- */
  let tick = null;
  const P2 = {
    synthwave() {
      const hor = Math.round(H * 0.6);
      grad(0, hor, ["#0d0221", "#1a0538", "#2b0a52", "#4a0f6e", "#7d1a78", "#c42476", "#ff2a6d", "#ff7a5c"]);
      stars(70, hor * 0.55, 3);
      sunStriped((W / 2) | 0, hor - 12, 36, "#fcee0a", "#ff8c42", "#ff2a6d", 0.05);
      ridge(hor - 10, 7, 5, "#2b0a52", "#ff2a6d", 0.045);
      ridge(hor - 2, 5, 9, "#14052e", "#ff5ea0", 0.06);
      const ground = (t) => {
        rect(0, hor, W, H - hor, "#0d0221");
        rect(0, hor, W, 1, "#ff7ad9");
        const cx = W / 2;
        for (let i = -24; i <= 24; i++) {
          const x0 = cx + i * 3, x1 = cx + i * 26;
          for (let y = hor; y < H; y++) px(x0 + ((x1 - x0) * (y - hor)) / (H - hor), y, "#ff2a6d");
        }
        for (let k = 0; k < 12; k++) {
          const f = ((k + (t % 1)) / 12) ** 2;
          rect(0, hor + f * (H - hor), W, 1, "#05d9e8");
        }
      };
      ground(0);
      tick = (t) => ground(t * 0.9);
    },
    vaporwave() {
      const hor = Math.round(H * 0.62);
      grad(0, hor, ["#ff71ce", "#f77ad6", "#d98bea", "#b967ff", "#8f7bff", "#6aa8ff", "#7fe0ff"]);
      stars(25, hor * 0.4, 21, "#fff0fb");
      sunStriped((W / 2) | 0, hor - 26, 30, "#ffe66d", "#ffb36b", "#ff71ce", 0.0);
      grad(hor, H, ["#01cdfe", "#18a6dd", "#3d7ccc", "#5a55b4", "#4b2f8c"]);
      for (let y = hor + 2, w = 34; y < H - 6; y += 3, w -= 2.2) rect(W / 2 - w, y, w * 2, 1, (y & 2) ? "#ffd1f0" : "#ffe66d");
      palm(Math.round(W * 0.12), H, 62, 1, "#2a1240");
      palm(Math.round(W * 0.88), H, 54, -1, "#2a1240");
    },
    nord() {
      grad(0, H * 0.72, ["#1b1f2a", "#222836", "#2b3242", "#343c4f", "#3d4a5f", "#4c566a"]);
      stars(80, H * 0.45, 7, "#eceff4");
      const base = H * 0.52, ys = ridge(base, 15, 11, "#4c566a", "#d8dee9", 0.025);
      // neve sulle cime: piena in alto, sfumata (dithering) verso la linea della neve
      const snow = base - 4;
      ys.forEach((y, x) => {
        for (let yy = y; yy < snow + 3; yy++) {
          if (yy < snow - 2 || ((x + yy) & 1) === 0) px(x, yy, yy < snow - 6 ? "#eceff4" : "#d8dee9");
        }
      });
      const mid = ridge(H * 0.64, 7, 23, "#3b4252", "#81a1c1", 0.04);
      const r = rng(4);
      for (let x = 2; x < W - 2; x++) if (r() < 0.1) pine(x, mid[x], 8 + ((r() * 5) | 0), "#2e3440", "#e5e9f0");
      const front = ridge(H * 0.82, 3, 31, "#d8dee9", "#eceff4", 0.05);
      for (let x = 3; x < W - 3; x++) if (r() < 0.04) pine(x, front[x], 14 + ((r() * 8) | 0), "#242933", "#eceff4");
    },
    dracula() {
      grad(0, H * 0.78, ["#0f0f17", "#171724", "#21222f", "#2c2541", "#3b2d55", "#4d3466"]);
      stars(60, H * 0.5, 9, "#f8f8f2");
      const mx = Math.round(W * 0.78), my = Math.round(H * 0.22);
      disc(mx, my, 24, "#6272a4", true);
      disc(mx, my, 17, "#f1fa8c");
      [[-5, -4, 3], [5, 3, 2], [-2, 7, 2], [7, -6, 1]].forEach(([x, y, r]) => disc(mx + x, my + y, r, "#d7c86a"));
      ridge(H * 0.66, 6, 4, "#282a36", "#44475a", 0.035);
      const hill = ridge(H * 0.74, 9, 8, "#191a21", "#2c2d3a", 0.02);
      const cx = Math.round(W * 0.27), by = Math.min(...hill.slice(cx - 20, cx + 20));
      const C1 = "#101016";
      [[-18, 26, 8], [-6, 40, 12], [10, 30, 9], [22, 22, 7]].forEach(([dx, h, w]) => {
        rect(cx + dx, by - h, w, h + 2, C1);
        for (let k = 0; k < w / 2 + 3; k++) rect(cx + dx + w / 2 - k / 2 - 0.5, by - h - 8 + k, k + 1 > w ? w : k + 1, 1, C1);
        for (let y = by - h + 4; y < by - 3; y += 6) px(cx + dx + (w >> 1), y, y % 12 ? "#f1fa8c" : "#ff79c6");
      });
      rect(cx - 18, by - 12, 50, 14, C1);
      for (let x = cx - 18; x < cx + 32; x += 3) rect(x, by - 14, 2, 2, C1);
      const front = ridge(H * 0.9, 2, 13, "#0d0d12", "#282a36", 0.05);
      const r = rng(12);
      for (let x = 8; x < W - 8; x += 9 + ((r() * 12) | 0)) {
        if (r() < 0.5) {
          rect(x, front[x] - 6, 1, 6, "#44475a");
          rect(x - 2, front[x] - 4, 5, 1, "#44475a");
        } else {
          rect(x, front[x] - 4, 3, 4, "#44475a");
          px(x + 1, front[x] - 5, "#44475a");
        }
      }
      [[W * 0.06, 30], [W * 0.62, 24]].forEach(([tx, h]) => {
        tx = Math.round(tx);
        const y0 = front[tx];
        rect(tx, y0 - h, 2, h, "#0b0b10");
        for (let k = 0; k < 4; k++) {
          const yy = y0 - h + 4 + k * 5, d = k & 1 ? 1 : -1;
          for (let s = 0; s < 7; s++) px(tx + d * s, yy - (s >> 1), "#0b0b10");
        }
      });
    },
    deepsea() {
      grad(0, H, ["#0a4a70", "#08406a", "#063660", "#052a4a", "#041f3a", "#03152b", "#020d1f", "#010a18"]);
      ridge(H * 0.76, 7, 5, "#03213a", "#05304d", 0.04);
      const sand = ridge(H * 0.88, 3, 9, "#0d3a4a", "#1a5a66", 0.05);
      const r = rng(31);
      for (let i = 0; i < 9; i++) {
        const x = Math.round(r() * W), h = 30 + r() * 50;
        for (let k = 0; k < h; k++) {
          const xx = x + Math.round(Math.sin(k * 0.15 + i) * 3);
          rect(xx, sand[x] - k, 2, 1, "#0f6b5a");
          if (k % 6 === 0) rect(xx + (k % 12 ? 2 : -3), sand[x] - k, 3, 1, "#14866f");
        }
      }
      const coral = (x, y, len, a, c, d) => {
        for (let s = 0; s < len; s++) px(x + Math.cos(a) * s, y - Math.sin(a) * s, c);
        if (d > 0) {
          const ex = x + Math.cos(a) * len, ey = y - Math.sin(a) * len;
          coral(ex, ey, len * 0.7, a + 0.5, c, d - 1);
          coral(ex, ey, len * 0.7, a - 0.5, c, d - 1);
        }
      };
      for (let i = 0; i < 7; i++) {
        const x = Math.round(r() * W), c = ["#ff6f91", "#ffb36b", "#b98cff"][i % 3];
        if (i % 2) coral(x, sand[x], 6 + r() * 4, Math.PI / 2, c, 3);
        else {
          disc(x, sand[x] - 3, 4, c);
          disc(x, sand[x] - 3, 4, "#00000044", true);
        }
      }
      for (let i = 0; i < 6; i++) {
        const x = Math.round(r() * W), y = Math.round(H * (0.3 + r() * 0.4)), c = i % 2 ? "#36e0c8" : "#8f7bff";
        rect(x, y, 4, 3, c);
        rect(x + 4, y - 1, 1, 5, c);
        px(x + 1, y + 1, "#010a18");
      }
    },
    gameboy() {
      grad(0, H * 0.62, ["#9bbc0f", "#9bbc0f", "#8bac0f"]);
      disc(Math.round(W * 0.82), Math.round(H * 0.18), 10, "#8bac0f");
      disc(Math.round(W * 0.82), Math.round(H * 0.18), 7, "#9bbc0f");
      const cloud = (x, y) => {
        rect(x + 4, y, 10, 3, "#8bac0f");
        rect(x, y + 3, 20, 3, "#8bac0f");
      };
      cloud(W * 0.1, H * 0.12);
      cloud(W * 0.45, H * 0.2);
      cloud(W * 0.68, H * 0.08);
      const hills = ridge(H * 0.6, 8, 41, "#306230", "#0f380f", 0.04);
      const r = rng(5);
      for (let x = 6; x < W - 6; x += 14 + ((r() * 18) | 0)) tree(x, hills[x], 4, "#0f380f", "#0f380f");
      const hx = Math.round(W * 0.6), hy = hills[hx] + 2;
      rect(hx - 9, hy - 12, 18, 12, "#9bbc0f");
      rect(hx - 9, hy - 12, 18, 1, "#0f380f");
      for (let k = 0; k < 9; k++) rect(hx - 10 - 1 + k, hy - 13 - k, 22 - k * 2, 1, "#0f380f");
      rect(hx - 2, hy - 6, 4, 6, "#306230");
      rect(hx + 4, hy - 9, 3, 3, "#306230");
      ridge(H * 0.8, 2, 7, "#8bac0f", "#306230", 0.06);
      for (let y = Math.round(H * 0.82); y < H; y++) for (let x = 0; x < W; x++) if (((x + y) & 3) === 0 && Math.abs(x - hx - (y - H * 0.82) * 1.5) < 6) px(x, y, "#9bbc0f");
    },
    retro() {
      grad(0, H * 0.7, ["#2f6fd6", "#3f7fdc", "#5596e4", "#6eacec", "#93c3f2", "#b8d9f6"]);
      const cloud = (x, y, s) => {
        disc(x, y, 6 * s, "#ffffff");
        disc(x + 8 * s, y - 3 * s, 8 * s, "#ffffff");
        disc(x + 18 * s, y, 6 * s, "#ffffff");
        rect(x - 6 * s, y, 30 * s, 6 * s, "#ffffff");
        rect(x - 6 * s, y + 5 * s, 30 * s, 1, "#d6e4f2");
      };
      cloud(W * 0.12, H * 0.18, 1);
      cloud(W * 0.55, H * 0.1, 1.3);
      cloud(W * 0.8, H * 0.28, 0.8);
      ridge(H * 0.66, 10, 17, "#3e9a3c", "#7ccf5e", 0.018);
      ridge(H * 0.8, 6, 29, "#56b04a", "#8fdc6a", 0.025);
      const r = rng(3);
      for (let i = 0; i < 40; i++) px(r() * W, H * 0.85 + r() * H * 0.15, ["#ffd23f", "#ffffff", "#ff5c85"][i % 3]);
    },
    gruvbox() {
      const hor = H * 0.62;
      grad(0, hor, ["#1d2021", "#32302f", "#504945", "#7c6f64", "#af3a03", "#d65d0e", "#fe8019"]);
      disc(Math.round(W * 0.7), Math.round(hor), 16, "#fabd2f");
      disc(Math.round(W * 0.7), Math.round(hor), 22, "#fe8019", true);
      const hills = ridge(hor - 4, 6, 3, "#3c3836", "#504945", 0.03);
      const r = rng(19), cols = ["#cc241d", "#d65d0e", "#d79921", "#98971a", "#b57614"];
      for (let x = 3; x < W - 3; x += 4 + ((r() * 5) | 0)) tree(x, hills[x] + 4, 3 + ((r() * 3) | 0), cols[(r() * cols.length) | 0], "#282828");
      const ground = ridge(H * 0.8, 3, 23, "#282828", "#3c3836", 0.04);
      // baita con finestra accesa e fumo dal camino
      const cx = Math.round(W * 0.2), cy = ground[cx] + 1;
      rect(cx - 15, cy - 15, 30, 15, "#665c54");
      for (let y = cy - 13; y < cy; y += 3) rect(cx - 15, y, 30, 1, "#504945");
      for (let k = 0; k < 13; k++) rect(cx - 17 + k, cy - 16 - k, 34 - k * 2, 1, k % 3 ? "#9d0006" : "#cc241d");
      rect(cx + 5, cy - 11, 5, 5, "#fabd2f");
      rect(cx + 7, cy - 11, 1, 5, "#665c54");
      rect(cx - 8, cy - 9, 5, 9, "#3c3836");
      rect(cx + 7, cy - 32, 4, 9, "#504945");
      for (let k = 0; k < 10; k++) disc(cx + 9 + Math.round(Math.sin(k * 0.9) * 3), cy - 35 - k * 4, 1 + (k >> 2), k < 4 ? "#a89984" : "#7c6f64", k > 5);
    },
    solarized() {
      grad(0, H * 0.66, ["#002b36", "#073642", "#0b4a57", "#235d63", "#586e75", "#93802a", "#b58900"]);
      stars(30, H * 0.25, 13, "#eee8d5");
      disc(Math.round(W * 0.3), Math.round(H * 0.6), 14, "#cb4b16");
      disc(Math.round(W * 0.3), Math.round(H * 0.6), 18, "#b58900", true);
      ridge(H * 0.62, 6, 7, "#6b5a1e", "#b58900", 0.03);
      const d2 = ridge(H * 0.74, 7, 15, "#8a7224", "#d4a017", 0.022);
      ridge(H * 0.88, 4, 33, "#a5841f", "#e0b23a", 0.03);
      const r = rng(8);
      for (let i = 0; i < 5; i++) {
        const x = Math.round(W * (0.08 + r() * 0.84)), y = d2[x], h = 10 + ((r() * 10) | 0);
        rect(x, y - h, 3, h, "#073642");
        rect(x - 3, y - h + 4, 3, 2, "#073642");
        rect(x - 3, y - h + 1, 1, 4, "#073642");
        rect(x + 3, y - h + 6, 3, 2, "#073642");
        rect(x + 5, y - h + 3, 1, 4, "#073642");
      }
    },
    netrunner() {
      grad(0, H, ["#020504", "#03100c", "#051a14", "#0a1f1c", "#1a0f2a", "#2a0a2e", "#120616"]);
      stars(40, H * 0.35, 2, "#00e5c0");
      const r = rng(77);
      for (let x = -4; x < W; ) {
        const w = 10 + ((r() * 16) | 0), top = H * (0.3 + r() * 0.3);
        building(x, w, top, "#06140f", ["#00e5c0", "#0a6b5c"], 0.18, (r() * 1e6) | 0);
        if (r() < 0.3) rect(x + (w >> 1), top - 8, 1, 8, "#0a6b5c");
        x += w + 2;
      }
      for (let x = -4; x < W; ) {
        const w = 14 + ((r() * 22) | 0), top = H * (0.5 + r() * 0.25);
        building(x, w, top, "#030a07", ["#ff2a6d", "#00e5c0", "#fcee0a"], 0.12, (r() * 1e6) | 0);
        if (r() < 0.25) {
          rect(x + 2, top + 4, w - 4, 5, "#030a07");
          rect(x + 2, top + 4, w - 4, 1, "#ff2a6d");
          rect(x + 2, top + 8, w - 4, 1, "#ff2a6d");
        }
        x += w + 1;
      }
      rect(0, H - 3, W, 3, "#00e5c0");
    },
    amber() {
      grad(0, H, ["#0a0500", "#100800", "#1a0d00", "#2a1500", "#3d2200", "#1a0d00"]);
      stars(25, H * 0.3, 5, "#ffb000");
      const r = rng(55);
      for (let x = -3; x < W; ) {
        const w = 12 + ((r() * 20) | 0), top = H * (0.45 + r() * 0.25);
        rect(x, top, w, H - top, "#140b00");
        for (let k = 0; k < w; k++) if (r() < 0.4) rect(x + k, top - ((r() * 5) | 0), 1, 5, "#140b00");
        for (let y = top + 4; y < H - 6; y += 5) for (let xx = x + 2; xx < x + w - 2; xx += 4) if (r() < 0.06) rect(xx, y, 2, 2, "#ffb000");
        x += w + ((r() * 4) | 0);
      }
      const tx = Math.round(W * 0.72), ty = Math.round(H * 0.18);
      for (let y = ty; y < H * 0.7; y++) {
        const w = Math.round((y - ty) * 0.18);
        px(tx - w, y, "#3d2200");
        px(tx + w, y, "#3d2200");
        if (y % 6 === 0) rect(tx - w, y, w * 2 + 1, 1, "#3d2200");
      }
      px(tx, ty - 1, "#ffb000");
      ridge(H * 0.9, 2, 3, "#0a0500", "#2a1500", 0.08);
    },
    arcade() {
      grad(0, H, ["#0c0020", "#120030", "#1a0040", "#24004d", "#2e0050"]);
      stars(120, H, 4, "#ffffff");
      stars(40, H, 9, "#00f0ff");
      const px0 = Math.round(W * 0.78), py0 = Math.round(H * 0.3);
      disc(px0, py0, 18, "#ff3df2");
      disc(px0 + 3, py0 + 3, 18, "#b3149f", true);
      for (let x = -32; x <= 32; x++) {
        const y = Math.round(x * 0.22);
        if (Math.abs(x) > 17 || y > 0) rect(px0 + x, py0 + y, 1, 2, "#ffe600");
      }
      disc(Math.round(W * 0.15), Math.round(H * 0.2), 7, "#00f0ff");
      disc(Math.round(W * 0.15) + 2, Math.round(H * 0.2) + 2, 7, "#0088a8", true);
      const ufo = (x, y, c) => {
        rect(x + 4, y, 6, 3, "#c8f7ff");
        rect(x, y + 3, 14, 3, c);
        rect(x + 2, y + 6, 10, 1, c);
        [1, 5, 9, 13].forEach((k) => px(x + k, y + 4, "#ffe600"));
      };
      ufo(W * 0.3, H * 0.45, "#ff3df2");
      ufo(W * 0.55, H * 0.25, "#00f0ff");
      ufo(W * 0.45, H * 0.62, "#ffe600");
    },
  };

  let current = null, loop = 0, last = 0;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function render() {
    const name = root.dataset.activeTheme;
    cancelAnimationFrame(loop);
    loop = 0;
    tick = null;
    if (!P2[name]) {
      delete root.dataset.pixelbg;
      current = null;
      return;
    }
    W = Math.max(200, Math.round((innerWidth / innerHeight) * H));
    cv.width = W;
    cv.height = H;
    P2[name]();
    root.dataset.pixelbg = "on";
    current = name;
    if (tick && !reduced) {
      const step = (ms) => {
        loop = requestAnimationFrame(step);
        if (document.hidden || root.dataset.effects === "off" || ms - last < 80) return;
        last = ms;
        tick(ms / 1000);
      };
      loop = requestAnimationFrame(step);
    }
  }
  new MutationObserver(() => {
    if (root.dataset.activeTheme !== current) render();
  }).observe(root, { attributes: true, attributeFilter: ["data-active-theme"] });
  let rt = 0;
  addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => current && render(), 200);
  });
  render();
})();
