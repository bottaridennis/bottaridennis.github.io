/* DennisOS playground. Persistent preferences and progress stay on this device. */
(() => {
  const storageKey = "dennis-playground-v1";
  const defaults = () => ({
    history: [],
    unlocked: [],
    visited: [],
    effects: true,
    sound: false,
    pet: false,
  });
  let state = defaults();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (saved) state = { ...state, ...saved };
  } catch {}
  state.history = Array.isArray(state.history)
    ? state.history.filter((x) => typeof x === "string").slice(-100)
    : [];
  state.unlocked = Array.isArray(state.unlocked) ? state.unlocked : [];
  state.visited = Array.isArray(state.visited) ? state.visited : [];
  const save = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {}
  };
  const say = (text, markup = "") => {
    const out = document.getElementById("to");
    if (!out) return;
    out.insertAdjacentHTML(
      "beforeend",
      `<div class="line o">${esc(text)}</div>${markup}`,
    );
    out.scrollTop = out.scrollHeight;
    out.parentElement.scrollTop = out.parentElement.scrollHeight;
  };
  const achievements = {
    first: "Primo comando",
    explorer: "Esploratore: tre discipline visitate",
    theme: "Tema segreto scoperto",
    listener: "In ascolto",
    hardware: "Tra i circuiti",
    dice: "Primo tiro",
    natural20: "20 naturale!",
    adventure: "Il cuore di DennisOS",
    friend: "Un nuovo amico",
    scholar: "Dentro il progetto",
  };
  function unlock(id) {
    if (state.unlocked.includes(id)) return;
    state.unlocked.push(id);
    save();
    say("★ " + achievements[id]);
  }
  const newThemes = {
    blueprint: {
      label: "Blueprint",
      color: "#aedcff",
      seq: ["> TRACING CIRCUITS...", "> SCHEMATIC READY"],
    },
    gameboy: {
      label: "Game Boy",
      color: "#9bbc0f",
      seq: ["> DENNISOS CARTRIDGE", "> PRESS START"],
    },
    deepsea: {
      label: "Deep Sea",
      color: "#36caba",
      seq: ["> DIVING...", "> SIGNAL FROM THE DEEP"],
    },
    paper: {
      label: "Paper",
      color: "#d5c8a8",
      seq: ["> OPENING NOTEBOOK...", "> MAKE SOMETHING"],
    },
    crt: {
      label: "CRT",
      color: "#70dd8c",
      seq: ["> WARMING PHOSPHORS...", "> SIGNAL LOCKED"],
    },
  };
  for (const [name, theme] of Object.entries(newThemes))
    THEMES[name] = { ...theme, sweep: theme.color };
  const savedTheme = localStorage.getItem("activeTheme");
  if (newThemes[savedTheme]) setTheme(savedTheme);
  document.documentElement.dataset.effects = state.effects ? "on" : "off";
  let previewTimer = null,
    previewOriginal;
  function cancelPreview(restore = false) {
    clearTimeout(previewTimer);
    previewTimer = null;
    if (restore && previewOriginal !== undefined) setTheme(previewOriginal);
    previewOriginal = undefined;
  }
  function activeTheme() {
    const n = document.documentElement.dataset.activeTheme;
    return THEMES[n] ? n : null;
  }
  function apply(name) {
    cancelPreview();
    setTheme(name);
    unlock("theme");
  }
  let historyPos = state.history.length,
    draft = "",
    adventure = null;
  const publicCommands = [
    "help",
    "ls",
    "open",
    "whoami",
    "stats",
    "play",
    "gallery",
    "timeline",
    "cv",
    "snake",
    "reset",
    "clear",
    "quests",
    "inspect",
    "jukebox",
    "roll",
    "adventure",
    "pet",
    "fortune",
    "cowsay",
    "achievement",
    "credits",
    "history",
    "effects",
    "sound",
  ];
  function complete(input) {
    const words = input.value.trimStart().split(/\s+/),
      prefix = words.at(-1).toLowerCase();
    let options = publicCommands;
    if (words.length > 1) {
      if (words[0] === "open") options = keys;
      else if (words[0] === "inspect")
        options = P.filter((p) => p.d !== "music").map((p) =>
          p.t.toLowerCase().replaceAll(" ", "-"),
        );
      else if (words[0] === "pet")
        options = ["on", "off", "feed", "sleep", "wake"];
      else if (words[0] === "adventure")
        options = [
          "look",
          "web",
          "hardware",
          "music",
          "core",
          "restart",
          "quit",
        ];
      else if (words[0] === "jukebox")
        options = ["list", "play", "pause", "next"];
      else if (["effects", "sound"].includes(words[0])) options = ["on", "off"];
      else return;
    }
    const matches = [...new Set(options)].filter((x) => x.startsWith(prefix));
    if (matches.length === 1) {
      words[words.length - 1] = matches[0];
      input.value = words.join(" ") + " ";
    } else if (matches.length) say(matches.join(" · "));
  }
  document.addEventListener("keydown", (e) => {
    if (e.target.id !== "ti") return;
    if (e.key === "Tab") {
      e.preventDefault();
      complete(e.target);
    }
    if (!["ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    if (historyPos === state.history.length) draft = e.target.value;
    historyPos = Math.max(
      0,
      Math.min(
        state.history.length,
        historyPos + (e.key === "ArrowUp" ? -1 : 1),
      ),
    );
    e.target.value = state.history[historyPos] ?? draft;
  });
  document.addEventListener("click", (e) => {
    const folder = e.target.closest("[data-o]")?.dataset.o;
    if (C[folder] && !state.visited.includes(folder)) {
      state.visited.push(folder);
      save();
      if (state.visited.length >= 3) unlock("explorer");
      if (folder === "iot") unlock("hardware");
    }
  });
  document
    .getElementById("realAudio")
    .addEventListener("playing", () => unlock("listener"));
  new MutationObserver(() => {
    if (activeTheme()) unlock("theme");
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-active-theme"],
  });
  function showPet() {
    document.getElementById("desktop-pet")?.remove();
    if (!state.pet) return;
    const pet = document.createElement("button");
    pet.id = "desktop-pet";
    pet.setAttribute("aria-label", "Mascotte pixel: clicca per salutarla");
    pet.title = "pet feed · pet sleep · pet off";
    pet.textContent = " /\\_/\\\n( o.o )\n > ^ <";
    pet.onclick = () => {
      pet.textContent = " /\\_/\\\n( ^.^ )\n > ♥ <";
      say("La mascotte ti saluta. Prova pet feed!");
    };
    document.body.appendChild(pet);
  }
  showPet();
  const rooms = {
    hub: "Sei nell’atrio di DennisOS. Tre porte: web, hardware, music. Raccogli un frammento in ogni stanza, poi entra in core.",
    web: "Tra le schede di NerdShelf trovi un frammento blu: CODICE. Il percorso verso le altre stanze resta aperto.",
    hardware:
      "Un sensore rileva il tuo arrivo. Tra i circuiti trovi il frammento ambra: CURIOSITÀ.",
    music:
      "Segui una melodia fino al frammento viola: CREATIVITÀ. Tre discipline, un solo sistema.",
  };
  function run(raw) {
    const line = raw.trim();
    if (!line) return false;
    if (state.history.at(-1) !== line) state.history.push(line);
    state.history = state.history.slice(-100);
    historyPos = state.history.length;
    draft = "";
    save();
    unlock("first");
    const [command, ...args] = line.split(/\s+/),
      cmd = command.toLowerCase(),
      arg = args.join(" "),
      mode = args[0]?.toLowerCase();
    if (cmd === "open" && C[mode] && !state.visited.includes(mode)) {
      state.visited.push(mode);
      save();
      if (state.visited.length >= 3) unlock("explorer");
      if (mode === "iot") unlock("hardware");
    }
    if (["reset", "normal", "tema"].includes(cmd) || THEMES[cmd])
      cancelPreview();
    const handled = [
      "theme",
      "quests",
      "inspect",
      "jukebox",
      "roll",
      "adventure",
      "pet",
      "fortune",
      "cowsay",
      "achievement",
      "credits",
      "history",
      "effects",
      "sound",
    ];
    if (!handled.includes(cmd)) return false;
    say("$ " + line);
    if (cmd === "history")
      say(state.history.map((x, i) => `${i + 1}  ${x}`).join("\n"));
    if (cmd === "theme") {
      if (mode === "random") {
        const names = Object.keys(THEMES);
        const name = names[Math.floor(Math.random() * names.length)];
        apply(name);
        say("Tema: " + THEMES[name].label);
      } else if (mode === "preview" && THEMES[args[1]?.toLowerCase()]) {
        const previous =
          previewOriginal !== undefined ? previewOriginal : activeTheme();
        cancelPreview();
        previewOriginal = previous;
        setTheme(args[1].toLowerCase());
        // Previews are temporary even if the page reloads before the timer ends.
        if (previous) localStorage.setItem("activeTheme", previous);
        else localStorage.removeItem("activeTheme");
        previewTimer = setTimeout(() => {
          cancelPreview(true);
          say("Anteprima terminata.");
        }, 10000);
        say("Anteprima per 10 secondi. theme save per mantenerla.");
      } else if (mode === "save") {
        const name = activeTheme();
        cancelPreview();
        setTheme(name);
        say("Tema salvato su questo dispositivo.");
      } else if (mode === "off") {
        cancelPreview();
        setTheme(null);
        say("Tema originale ripristinato.");
      } else if (THEMES[mode]) {
        apply(mode);
        say("Tema: " + THEMES[mode].label);
      } else say("Scrivi secret per le istruzioni dei temi.");
    }
    if (cmd === "quests") {
      const q = [
        ["Visita tre discipline", state.visited.length >= 3],
        ["Scopri un progetto hardware", state.unlocked.includes("hardware")],
        ["Ascolta un brano", state.unlocked.includes("listener")],
        ["Trova un tema segreto", state.unlocked.includes("theme")],
        ["Completa adventure", state.unlocked.includes("adventure")],
      ];
      say(
        q.map(([name, done]) => `${done ? "✓" : "○"} ${name}`).join("\n") +
          "\nProgressi salvati su questo dispositivo.",
      );
    }
    if (cmd === "achievement")
      say(
        Object.entries(achievements)
          .map(
            ([id, title]) =>
              `${state.unlocked.includes(id) ? "★" : "○"} ${title}`,
          )
          .join("\n"),
      );
    if (cmd === "inspect") {
      const query = arg.toLowerCase().replaceAll("-", " ");
      const p =
        query &&
        P.find((p) => p.t.toLowerCase().replaceAll("-", " ").includes(query));
      if (!p) say("Usa inspect <nome progetto>. Esempio: inspect nerdshelf");
      else {
        unlock("scholar");
        say(
          p.t +
            "\n" +
            p.x +
            (p.story ? "\n" + p.story : "") +
            "\nTecnologie: " +
            p.k.join(", "),
        );
        const links = [
          [p.u, "Apri progetto"],
          [p.g, "Codice GitHub"],
        ].filter(([url]) => url && !/^javascript:/i.test(url));
        say(
          "",
          '<div class="terminal-links">' +
            links
              .map(
                ([url, label]) =>
                  `<a href="${esc(url)}" target="_blank" rel="noopener">${label}</a>`,
              )
              .join("") +
            "</div>",
        );
      }
    }
    if (cmd === "roll") {
      const match = (arg || "1d20").match(/^(\d{1,2})d(\d{1,4})$/i);
      if (
        !match ||
        +match[1] < 1 ||
        +match[1] > 20 ||
        +match[2] < 2 ||
        +match[2] > 1000
      )
        say(
          "Usa roll NdS: da 1 a 20 dadi, da 2 a 1000 facce. Esempio: roll 2d20",
        );
      else {
        const values = Array.from(
          { length: +match[1] },
          () => Math.floor(Math.random() * +match[2]) + 1,
        );
        unlock("dice");
        if (+match[2] === 20 && values.includes(20)) unlock("natural20");
        say(
          "",
          `<div class="line"><span class="terminal-dice">${esc(values.join(" + "))} = ${values.reduce((a, b) => a + b, 0)}</span></div>`,
        );
        if (+match[2] === 20 && values.includes(20))
          say("20 naturale! Il destino è dalla tua parte.");
      }
    }
    if (cmd === "jukebox") {
      const tracks = P.map((p, i) => ({ ...p, index: i })).filter(
        (p) => p.d === "music" && p.audio,
      );
      if (mode === "list" || !mode)
        say(
          tracks.map((p, i) => `${i + 1}. ${p.t}`).join("\n") +
            "\njukebox play <numero o titolo> · jukebox pause · jukebox next",
        );
      else if (mode === "pause") {
        if (playing) togglePlay();
        say("Riproduzione in pausa.");
      } else if (mode === "next" || mode === "play") {
        const query = args.slice(1).join(" ").toLowerCase();
        const ix = tracks.findIndex((p) => p.index === cur);
        const track =
          mode === "next"
            ? tracks[(ix + 1) % tracks.length]
            : query
              ? /^\d+$/.test(query)
                ? tracks[+query - 1]
                : tracks.find((p) => p.t.toLowerCase().includes(query))
              : tracks[Math.max(0, ix)];
        if (!track) say("Brano non trovato. Usa jukebox list.");
        else {
          if (playing) togglePlay();
          setTrack(track.index);
          sessionStorage.removeItem("abar_closed");
          updateAbarVisibility();
          togglePlay();
          say("Riproduzione richiesta: " + track.t);
        }
      } else say("Usa jukebox list · play <titolo> · pause · next");
    }
    if (cmd === "adventure") {
      if (mode === "quit") {
        adventure = null;
        say("Sei tornato alla console.");
      } else {
        if (!adventure || mode === "restart")
          adventure = { room: "hub", fragments: [] };
        if (["web", "hardware", "music"].includes(mode)) {
          adventure.room = mode;
          if (!adventure.fragments.includes(mode))
            adventure.fragments.push(mode);
        }
        if (mode === "core") {
          if (adventure.fragments.length === 3) {
            unlock("adventure");
            say(
              "Hai unito codice, curiosità e creatività. Il cuore di DennisOS si accende. Avventura completata! adventure restart per ricominciare.",
            );
          } else
            say(
              "Il nucleo richiede tre frammenti. Esplora web, hardware e music.",
            );
        } else
          say(
            rooms[adventure.room] +
              "\nComandi: adventure web / hardware / music / core / look / restart / quit",
          );
      }
    }
    if (cmd === "pet") {
      if (mode === "off") {
        state.pet = false;
        showPet();
        say("Mascotte nascosta.");
      } else {
        state.pet = true;
        if (!document.getElementById("desktop-pet")) showPet();
        const pet = document.getElementById("desktop-pet");
        if (mode === "sleep") {
          pet.dataset.mood = "sleep";
          pet.textContent = " /\\_/\\\n( -.- ) zZ\n > ^ <";
        } else if (mode === "wake" || mode === "on" || !mode) {
          showPet();
        } else if (mode === "feed") {
          pet.textContent = " /\\_/\\\n( ^.^ )\n > ◆ <";
        }
        unlock("friend");
        say("pet on · off · feed · sleep · wake");
      }
      save();
    }
    if (cmd === "fortune") {
      const fortunes = [
        "Un buon progetto collega ciò che sai a qualcosa che vuoi capire.",
        "Revolution Minds nasce come progetto di gruppo durante il percorso ITS Academy LAST.",
        "Tra il codice e la musica c’è più ritmo di quanto sembri.",
        "Tre porte, tre frammenti: il nucleo aspetta in adventure.",
        "Un dado a venti facce ha sempre una storia da raccontare.",
      ];
      say(fortunes[Math.floor(Math.random() * fortunes.length)]);
    }
    if (cmd === "cowsay") {
      const message = (arg || "Ciao da DennisOS!").slice(0, 120);
      say(
        " " +
          "_".repeat(Math.min(message.length + 2, 42)) +
          "\n< " +
          message +
          " >\n " +
          "-".repeat(Math.min(message.length + 2, 42)) +
          "\n       \\   ^__^\n        \\  (oo)\\_______\n           (__)\\       )\\/\\\n               ||----w |\n               ||     ||",
      );
    }
    if (cmd === "credits")
      say(
        "DENNISOS — Dennis Bottari\nIdeazione e progetti: Dennis Bottari · Verona\nWeb: HTML, CSS, JavaScript, React e TypeScript\nGiochi: GameMaker, Godot, Aseprite\nHardware: Arduino · Visual: Figma, Illustrator, Blender\nMusica: testi e sperimentazione con Suno AI\nRevolution Minds: progetto di gruppo ITS Academy LAST\nFont: Google Fonts · Icone: Boxicons\nGrazie per aver esplorato. Per la colonna sonora: jukebox play",
      );
    if (cmd === "effects" || cmd === "sound") {
      if (!["on", "off"].includes(mode))
        say(`Usa ${cmd} on oppure ${cmd} off.`);
      else {
        state[cmd] = mode === "on";
        save();
        document.documentElement.dataset.effects = state.effects ? "on" : "off";
        say(`${cmd}: ${mode}`);
        if (cmd === "sound" && state.sound) bip(660, 0.08, 0.04, "sine");
      }
    }
    return true;
  }
  // Gate existing interface sounds separately from user-selected music.
  const originalBip = bip,
    originalGlitch = glitchSound,
    originalTransition = hackTransition;
  bip = (...args) => {
    if (state.sound && state.effects) originalBip(...args);
  };
  glitchSound = (...args) => {
    if (state.sound && state.effects) originalGlitch(...args);
  };
  hackTransition = (name) => {
    cancelPreview();
    if (state.effects && !still) originalTransition(name);
    else setTheme(name);
  };
  window.dennisPlayground = { run };
})();
