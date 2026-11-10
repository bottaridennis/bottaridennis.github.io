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
