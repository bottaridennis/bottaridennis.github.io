function getParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
}
var projects = {
    revolutionminds: {
        title: "ProjectWork | Revolution Minds",
        image: "../images/Logo.png",
        primaryLabel: "Visita",
        primaryLink: "https://revolutionminds.github.io",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "https://github.com/bottaridennis/ProjectWorkRevolutionMinds",
        description: [
            "Progetto di sensibilizzazione sull'impatto ambientale dell'armadio nel territorio veronese con soluzione basata sui negozi second-hand."
        ],
        gallery: []
    },
    encdec: {
        title: "Python | ENC/DEC con AES",
        image: "../images/encdec.png",
        primaryLabel: "",
        primaryLink: "",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "https://github.com/bottaridennis/Encoder_Decoder_AES",
        description: [
            "Programma in Python che cifra e decifra file utilizzando AES."
        ],
        gallery: []
    },
    stove: {
        title: "UI & UX | Prototipo stove figma",
        image: "../images/page.png",
        primaryLabel: "Prototipo",
        primaryLink: "https://www.figma.com/file/aVVNqbTn3qFB69eTG17imo/Untitled?type=design&node-id=88%3A828&mode=design",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "",
        description: [
            "Interfaccia e prototipo di un'app per la gestione delle stufe realizzato in Figma."
        ],
        gallery: []
    },
    arcon: {
        title: "HTML/CSS | ARCON template",
        image: "../images/ARCON.png",
        primaryLabel: "Visita",
        primaryLink: "../files/ARCON/arcon.html",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "",
        description: [
            "Riproduzione di un template Envato per esercizio su HTML e CSS."
        ],
        gallery: []
    },
    "parking-sensor": {
        title: "Arduino | Sensore parcheggio",
        image: "../images/parking.png",
        primaryLabel: "Schema",
        primaryLink: "../files/parking.png",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "https://github.com/bottaridennis/parking-sensor-arduino",
        description: [
            "Sensore di parcheggio con Arduino Uno, buzzer, sensore ultrasuoni e display LCD I2C."
        ],
        gallery: []
    },
    knightrun: {
        title: "Godot | Knight run",
        image: "../images/game.png",
        primaryLabel: "Download",
        primaryLink: "../files/Game.zip",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "https://github.com/bottaridennis/KnightRun",
        description: [
            "Videogioco 16bit sviluppato in Godot con asset CC-0 e level design originale."
        ],
        gallery: []
    },
    character: {
        title: "Aseprite | Animation",
        image: "../images/PG.gif",
        primaryLabel: "Sprite",
        primaryLink: "../files/sprite.png",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "",
        description: [
            "Set di animazioni 2D in sei direzioni realizzato in Aseprite."
        ],
        gallery: []
    },
    searender: {
        title: "Blender | Sea Render",
        image: "../images/sea.png",
        primaryLabel: "Download",
        primaryLink: "../files/sea.blend",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "",
        description: [
            "Primo render di un mare in tempesta modellato e animato in Blender."
        ],
        gallery: []
    },
    spacegame: {
        title: "Gamemaker 2 | Space rocks",
        image: "../images/spacegame.png",
        primaryLabel: "Gioca",
        primaryLink: "../files/space_game/index.html",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "",
        description: [
            "Minigioco arcade con asteroidi. Comandi WASD, spazio per fermare la nave, click per sparare."
        ],
        gallery: []
    },
    spaceshooter: {
        title: "Gamemaker 2 | Rocks shooter",
        image: "../images/space_game.png",
        primaryLabel: "Gioca",
        primaryLink: "../files/space_shooter/index.html",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "",
        description: [
            "Minigioco di tiro agli asteroidi, progetto base da espandere."
        ],
        gallery: []
    },
    rpggame: {
        title: "Gamemaker 2 | RPG game",
        image: "../images/rpg.png",
        primaryLabel: "Gioca",
        primaryLink: "../files/RPG_game/index.html",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "",
        description: [
            "Prototipo RPG 8-bit con asset creati in Aseprite e meccaniche in sviluppo."
        ],
        gallery: []
    },
    spookyshooter: {
        title: "Gamemaker 2 | Spooky shooter",
        image: "../images/spookyshooter.png",
        primaryLabel: "Gioca",
        primaryLink: "../files/spookyshooter/index.html",
        secondaryLabel: "",
        secondaryLink: "",
        githubLink: "",
        description: [
            "Minigioco survival contro orde di uomini zucca."
        ],
        gallery: []
    }
};
function renderProject(p) {
    var hero = document.getElementById("project-hero");
    var name = document.getElementById("project-name");
    var summary = document.getElementById("project-summary");
    var thumb = document.getElementById("project-thumb");
    var btnPrimary = document.getElementById("btn-primary");
    var btnSecondary = document.getElementById("btn-secondary");
    var btnGithub = document.getElementById("btn-github");
    var desc = document.getElementById("project-description");
    var gallery = document.getElementById("project-gallery");
    hero.style.backgroundImage = "url(" + p.image + ")";
    name.innerHTML = p.title.replace("|", "<span>|</span>");
    summary.textContent = p.description && p.description.length ? p.description[0] : "";
    thumb.src = p.image;
    if (p.primaryLink) {
        btnPrimary.textContent = p.primaryLabel || "Apri";
        btnPrimary.href = p.primaryLink;
        btnPrimary.style.display = "";
    } else {
        btnPrimary.style.display = "none";
    }
    if (p.secondaryLink) {
        btnSecondary.textContent = p.secondaryLabel || "Apri";
        btnSecondary.href = p.secondaryLink;
        btnSecondary.style.display = "";
    } else {
        btnSecondary.style.display = "none";
    }
    if (p.githubLink) {
        btnGithub.href = p.githubLink;
        btnGithub.style.display = "";
    } else {
        btnGithub.style.display = "none";
    }
    desc.innerHTML = "";
    var details = p.description || [];
    details.forEach(function(d) {
        var el = document.createElement("p");
        el.textContent = d;
        desc.appendChild(el);
    });
    gallery.innerHTML = "";
    var imgs = p.gallery && p.gallery.length ? p.gallery : [];
    imgs.forEach(function(src) {
        var i = document.createElement("img");
        i.src = src;
        gallery.appendChild(i);
    });
}
var id = getParam("id");
if (id && projects[id]) {
    renderProject(projects[id]);
} else {
    document.getElementById("project-name").textContent = "Progetto non trovato";
    document.getElementById("project-summary").style.display = "none";
    document.getElementById("project-thumb").style.display = "none";
    document.getElementById("btn-primary").style.display = "none";
    document.getElementById("btn-secondary").style.display = "none";
    document.getElementById("btn-github").style.display = "none";
}
