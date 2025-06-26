let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    })
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const confirmAction = () => {
    alert('Il download è iniziato');
}

let words = document.querySelectorAll(".word")
words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    })
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });

    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 4000);

function createProjectBox(data) {
    var column = document.getElementById('projects-column');
    var projectBox = document.createElement('div');
    projectBox.classList.add('projects-box');
    // projectBox.setAttribute('data-tilt-max', '.1');
    // projectBox.setAttribute('data-tilt', '');
    // projectBox.setAttribute('data-tilt-scale', '1.06');
    projectBox.setAttribute('data-aos', 'fade-up');
    projectBox.setAttribute('data-aos-duration', '2000');


    var link = document.createElement('a');
    link.href = data['img-link'];
    link.target = '_blank';

    var imgContainer = document.createElement('div');
    imgContainer.classList.add('projects-img');
    imgContainer.style.backgroundImage = `url(${data.img})`;

    if (data['contain-background'] === true) {
        imgContainer.style.backgroundSize = 'contain';
    }

    link.appendChild(imgContainer);
    projectBox.appendChild(link);

    var titleElement = document.createElement('h2');
    titleElement.textContent = data.title;
    projectBox.appendChild(titleElement);

    var paragraphElement = document.createElement('p');
    paragraphElement.innerHTML = data.paragraph;
    projectBox.appendChild(paragraphElement);

    var downloadBox = document.createElement('div');
    downloadBox.classList.add('download-box');
    downloadBox.style.paddingTop = '1rem';
    projectBox.appendChild(downloadBox);

    if (data['btn-d'] === true) {
        var downloadButton = document.createElement('a');

        if (data['download-btn'] === 'download') {
            downloadButton.href = data['btn-d-link'];
            downloadButton.download = '';
            downloadButton.textContent = data['download-btn-label'] || 'Download';
        } else if (data['download-btn'] === 'external-link') {
            downloadButton.href = data['btn-d-link'];
            downloadButton.textContent = data['download-btn-label'] || 'Visita';
            downloadButton.target = '_blank';
        }

        downloadButton.classList.add('btn');
        downloadButton.style.width = '30%';
        downloadButton.style.fontSize = '1.3rem';
        downloadButton.style.height = '4rem';
        downloadBox.appendChild(downloadButton);
    }

    if (data['btn-git'] === true) {
        var githubDiv = document.createElement('div');
        githubDiv.classList.add('github');

        var githubLink = document.createElement('a');
        githubLink.href = data['btn-git-link'];
        githubLink.target = '_blank';

        var githubIcon = document.createElement('i');
        githubIcon.classList.add('bx', 'bxl-github');

        githubLink.appendChild(githubIcon);
        githubDiv.appendChild(githubLink);
        downloadBox.appendChild(githubDiv);
    }

    column.appendChild(projectBox);
}
function createUpdatesBox(data) {
    var column = document.getElementById('updates-column');
    var updateBox = document.createElement('div');
    updateBox.classList.add('updates-box');
    // updateBox.setAttribute('data-tilt', '');
    // updateBox.setAttribute('data-tilt-max', '.1');
    // updateBox.setAttribute('data-tilt-scale', '1.06');
    updateBox.setAttribute('data-aos', 'fade-up');
    updateBox.setAttribute('data-aos-duration', '2000');

    var link = document.createElement('a');
    link.href = data['img-link'];
    link.target = '_blank';

    var imgContainer = document.createElement('div');
    imgContainer.classList.add('updates-img');
    imgContainer.style.backgroundImage = `url(${data.img})`;

    if (data['contain-background'] === true) {
        imgContainer.style.backgroundSize = 'contain';
    }

    link.appendChild(imgContainer);
    updateBox.appendChild(link);

    var titleElement = document.createElement('h2');
    titleElement.textContent = data.title;
    updateBox.appendChild(titleElement);

    var paragraphElement = document.createElement('p');
    paragraphElement.innerHTML = data.paragraph;
    updateBox.appendChild(paragraphElement);

    var downloadBox = document.createElement('div');
    downloadBox.classList.add('download-box');
    downloadBox.style.paddingTop = '1rem';
    updateBox.appendChild(downloadBox);

    if (data['btn-d'] === true) {
        var downloadButton = document.createElement('a');

        if (data['download-btn'] === 'download') {
            downloadButton.href = data['btn-d-link'];
            downloadButton.download = '';
            downloadButton.textContent = data['download-btn-label'] || 'Download';
        } else if (data['download-btn'] === 'external-link') {
            downloadButton.href = data['btn-d-link'];
            downloadButton.textContent = data['download-btn-label'] || 'Visita';
            downloadButton.target = '_blank';
        }

        downloadButton.classList.add('btn');
        downloadButton.style.width = '30%';
        downloadButton.style.fontSize = '1.3rem';
        downloadButton.style.height = '4rem';
        downloadBox.appendChild(downloadButton);
    }

    if (data['btn-git'] === true) {
        var githubDiv = document.createElement('div');
        githubDiv.classList.add('github');

        var githubLink = document.createElement('a');
        githubLink.href = data['btn-git-link'];
        githubLink.target = '_blank';

        var githubIcon = document.createElement('i');
        githubIcon.classList.add('bx', 'bxl-github');

        githubLink.appendChild(githubIcon);
        githubDiv.appendChild(githubLink);
        downloadBox.appendChild(githubDiv);
    }

    column.appendChild(updateBox);
}

var revolutionminds = {
    img: '../images/Logo.png',
    'img-link': 'https://revolutionminds.github.io',
    title: 'ProjectWork | Revolution Minds',
    paragraph: "Con il percorso ITS con l'ITS ACADEMY LAST io e alcuni miei compagni abbiamo sviluppato un progetto che punta a sensibilizzare la popolazione sul territorio del veronese sull'impatto ambientale del loro aramdio, offrendo come soluzione i negozi second-hand sul territorio.",
    'contain-background': true,
    'btn-git': true,
    'btn-d': true,
    'download-btn': 'external-link', // Options: 'download' o 'external-link'
    'download-btn-label': 'Visita',
    'btn-git-link': 'https://github.com/bottaridennis/ProjectWorkRevolutionMinds',
    'btn-d-link': 'https://revolutionminds.github.io'
};

var encDec = {
    img: '../images/encdec.png',
    'img-link': 'https://github.com/bottaridennis/Encoder_Decoder_AES',
    title: 'Python | ENC/DEC con AES',
    paragraph: "Con il percorso ITS con l'ITS ACADEMY LAST io e alcuni miei compagni abbiamo sviluppato un progetto di <span>cyber security</span>, il progetto consisteva nel creare un programma in <span>Python</span> che potesse criptare e decrittare un file di qualsiasi tipo con la libreria AES",
    'contain-background': false,
    'btn-git': true,
    'btn-d': false,
    'download-btn': 'external-link', // Options: 'download' o 'external-link'
    'download-btn-label': '',
    'btn-git-link': 'https://github.com/bottaridennis/Encoder_Decoder_AES',
    'btn-d-link': 'https://revolutionminds.github.io'
};

var stove = {
    img: '../images/page.png',
    'img-link': 'https://www.figma.com/file/aVVNqbTn3qFB69eTG17imo/Untitled?type=design&node-id=88%3A828&mode=design&t=2ieOiKQFAiT4OxO1-1',
    title: 'UI & UX | Prototipo stove figma',
    paragraph: "Con il percorso ITS con l'ITS ACCADEMY LAST ho sviluppato l'interfaccia grafica e il prototipo funzionante di un'app per la gestione domestica delle stufe utilizzando <span>figma</span>.",
    'contain-background': false,
    'btn-git': false,
    'btn-d': true,
    'download-btn': 'external-link', // Opzioni: 'download' o 'external-link'
    'download-btn-label': 'Prototipo',
    'btn-git-link': 'https://www.figma.com/file/aVVNqbTn3qFB69eTG17imo/Untitled?type=design&node-id=88%3A828&mode=design&t=2ieOiKQFAiT4OxO1-1',
    'btn-d-link': ''
};

var arcon = {
    img: '../images/ARCON.png',
    'img-link': '../files/ARCON/arcon.html',
    title: 'HTML/CSS | ARCON template',
    paragraph: "Con il percorso ITS con l'ITS ACCADEMY LAST durante le lezioni di HTML e CSS ci è stato detto di scegliere un template dalla piattaforma Envato e provare a ricrearlo utilizzando HTML e CSS per prendere dimestichezza con il linguaggio.",
    'contain-background': false,
    'btn-git': false,
    'btn-d': true,
    'download-btn': 'external-link', // Opzioni: 'download' o 'external-link'
    'download-btn-label': '',
    'btn-git-link': '',
    'btn-d-link': '../files/ARCON/arcon.html'
};

var parkingSensor = {
    img: '../images/parking.png',
    'img-link': '',
    title: 'Arduino | Sensore parcheggio',
    paragraph: "Con arduino ho realizzato un sensore di parcheggio funzionante utilizzando una scheda arduino uno, un buzzer un sensore ad ultra suoni e un lcd con modulo I2C, quest'ultimo per segnalare per iscritto la distanza dall'ostacolo.",
    'contain-background': false,
    'btn-git': true,
    'btn-d': true,
    'download-btn': 'download', // Opzioni: 'download' o 'external-link'
    'download-btn-label': 'Schema',
    'btn-git-link': 'https://github.com/bottaridennis/parking-sensor-arduino',
    'btn-d-link': '../files/parking.png'
};

var knightRun = {
    img: "../images/game.png",
    'img-link': "https://github.com/bottaridennis/KnightRun",
    title: "Godot | Knight run",
    paragraph: "Ho iniziato lo sviluppo di un videogioco 16bit in Godot, gli sprite sono stati presi da <a href='https://brackeysgames.itch.io/brackeys-platformer-bundle' target='_blank' style='color: var(--main-color);'>itch.io con licenza CC-0</a> mentre gli script e il level Design sono opera mia. <br>Collegamento per il download della demo e per la repository GitHub del progetto:",
    'contain-background': false,
    'btn-git': true,
    'btn-d': true,
    'download-btn': 'download', // Opzioni: 'download' o 'external-link'
    'download-btn-label': "",
    'btn-git-link': "https://github.com/bottaridennis/KnightRun",
    'btn-d-link': "../files/Game.zip"
};

var character = {
    img: "../images/PG.gif",
    'img-link': "../images/PG.gif",
    title: "Aseprite | Animation",
    paragraph: "Con Aseprite ho iniziato a creare un set di animazioni per un personaggio 2D in 6 direzioni da poi condividere con la comunity con licenza CC-0 per lo sviluppo di Giochi e per la realizzazione di animazioni in pixel-art commerciali.",
    'contain-background': true,
    'btn-git': false,
    'btn-d': true,
    'download-btn': 'download', // Opzioni: 'download' o 'external-link'
    'download-btn-label': "Sprite",
    'btn-git-link': "",
    'btn-d-link': "../files/sprite.png"
};

var seaRender = {
    img: "../images/sea.png",
    'img-link': "../images/sea.png",
    title: "Blender | Sea Render",
    paragraph: "Con Blender ho eseguito il primo render dell'animazione di un mare in tempesta modellato e animato da me per studiare l'interfaccia di Blender.<br>",
    'contain-background': false,
    'btn-git': false,
    'btn-d': true,
    'download-btn': 'download', // Opzioni: 'download' o 'external-link'
    'download-btn-label': "",
    'btn-git-link': "",
    'btn-d-link': "../files/sea.blend"
};

var spacegame = {
    img: '../images/spacegame.png',
    'img-link': '../files/space_game/index.html',
    title: 'Gamemaker 2 | Space rocks',
    paragraph: "Con gamemaker 2 ho creato un minigioco nel quale bisogna distruggere degli asteroidi, i comandi sono W A S D per il movimento, Spazio per bloccare la navicella e tasto sinistro del mouse per sparare.",
    'contain-background': false,
    'btn-git': false,
    'btn-d': true,
    'download-btn': 'external-link', // Options: 'download' o 'external-link'
    'download-btn-label': 'Gioca',
    'btn-git-link': '',
    'btn-d-link': '../files/space_game/index.html'
};
var spaceshooter = {
    img: '../images/space_game.png',
    'img-link': '../files/space_shooter/index.html',
    title: 'Gamemaker 2 | Rocks shooter',
    paragraph: "Con gamemaker 2 ho creato un minigioco nel quale bisogna distruggere degli asteroidi, progetto da modificare e personalizzare in seguito utilizzando sprite più detagliati.",
    'contain-background': false,
    'btn-git': false,
    'btn-d': true,
    'download-btn': 'external-link', // Options: 'download' o 'external-link'
    'download-btn-label': 'Gioca',
    'btn-git-link': '',
    'btn-d-link': '../files/space_shooter/index.html'
};
var rpggame = {
    img: '../images/rpg.png',
    'img-link': '../files/RPG_game/index.html',
    title: 'Gamemaker 2 | RPG game',
    paragraph: "Con gamemaker 2 e aseprite ho creato degli assets e sto lavorando a delle meccaniche di gioco per un RPG 8-bit",
    'contain-background': false,
    'btn-git': false,
    'btn-d': true,
    'download-btn': 'external-link', // Options: 'download' o 'external-link'
    'download-btn-label': 'Gioca',
    'btn-git-link': '',
    'btn-d-link': '../files/RPG_game/index.html'
};
var spookyshooter = {
    img: '../images/spookyshooter.png',
    'img-link': '../files/spookyshooter/index.html',
    title: 'Gamemaker 2 | Spooky shooter',
    paragraph: "Con gamemaker 2 ho creato un minigioco nel quale bisogna sopravvivere a orde di uomini zucca, clicca gioca e divertiti.",
    'contain-background': false,
    'btn-git': false,
    'btn-d': true,
    'download-btn': 'external-link', // Options: 'download' o 'external-link'
    'download-btn-label': 'Gioca',
    'btn-git-link': '',
    'btn-d-link': '../files/spookyshooter/index.html'
};
// var  = {
//     img: "",
//     'img-link': "",
//     title: "",
//     paragraph: "",
//     'contain-background': true,
//     'btn-git': true,
//     'btn-d': true,
//     'download-btn': 'external-link', // Opzioni: 'download' o 'external-link'
//     'download-btn-label': "",
//     'btn-git-link': "",
//     'btn-d-link': ""
// };

createProjectBox(revolutionminds);
createProjectBox(encDec);
createProjectBox(stove);
createProjectBox(arcon);
createProjectBox(parkingSensor);
createProjectBox(knightRun);
createUpdatesBox(spacegame);
createProjectBox(spaceshooter);
createUpdatesBox(spookyshooter);
// createProjectBox();
createUpdatesBox(rpggame);
createProjectBox(character);
createProjectBox(seaRender);
// createUpdatesBox();


function changeTheme(theme) {
    const root = document.documentElement;
    const cssVariables = getComputedStyle(root);

    switch (theme) {
        case 'theme1':
            root.style.setProperty('--bg-color', cssVariables.getPropertyValue('--bg-color-theme1'));
            root.style.setProperty('--second-bg-color', cssVariables.getPropertyValue('--second-bg-color-theme1'));
            root.style.setProperty('--text-color', cssVariables.getPropertyValue('--text-color-theme1'));
            root.style.setProperty('--main-color', cssVariables.getPropertyValue('--main-color-theme1'));
            break;
        case 'theme2':
            root.style.setProperty('--bg-color', cssVariables.getPropertyValue('--bg-color-theme2'));
            root.style.setProperty('--second-bg-color', cssVariables.getPropertyValue('--second-bg-color-theme2'));
            root.style.setProperty('--text-color', cssVariables.getPropertyValue('--text-color-theme2'));
            root.style.setProperty('--main-color', cssVariables.getPropertyValue('--main-color-theme2'));
            break;
        case 'theme3':
            root.style.setProperty('--bg-color', cssVariables.getPropertyValue('--bg-color-theme3'));
            root.style.setProperty('--second-bg-color', cssVariables.getPropertyValue('--second-bg-color-theme3'));
            root.style.setProperty('--text-color', cssVariables.getPropertyValue('--text-color-theme3'));
            root.style.setProperty('--main-color', cssVariables.getPropertyValue('--main-color-theme3'));
            break; break;
        case 'theme4':
            root.style.setProperty('--bg-color', cssVariables.getPropertyValue('--bg-color-theme4'));
            root.style.setProperty('--second-bg-color', cssVariables.getPropertyValue('--second-bg-color-theme4'));
            root.style.setProperty('--text-color', cssVariables.getPropertyValue('--text-color-theme4'));
            root.style.setProperty('--main-color', cssVariables.getPropertyValue('--main-color-theme4')); break;
        default:
            break;
    }
}

function createSections(sectionsData) {
    var container = document.getElementById('skills-row');


    sectionsData.forEach(section => {
        var sectionDiv = document.createElement('div');
        sectionDiv.classList.add('skills-column');
        sectionDiv.setAttribute('data-tilt', '');
        sectionDiv.setAttribute('data-tilt-max', '6');

        var titleElement = document.createElement('h3');
        titleElement.classList.add('title');
        titleElement.innerHTML = `<img src="${section.img}" style="max-width:2.5rem;"> | ${section.title}`;
        titleElement.setAttribute('data-aos', 'fade-right')
        sectionDiv.appendChild(titleElement);

        var skillsBox = document.createElement('div');
        skillsBox.classList.add('skills-box');
        sectionDiv.appendChild(skillsBox);
        skillsBox.setAttribute('data-aos', 'zoom-in');

        var skillsContent = document.createElement('div');
        skillsContent.classList.add('skills-content');
        skillsBox.appendChild(skillsContent);

        section.skills.forEach(skill => {
            var progressDiv = document.createElement('div');
            progressDiv.classList.add('progress');
            progressDiv.setAttribute('data-aos', 'fade-right');

            var h3Element = document.createElement('h3');
            h3Element.innerHTML = `${skill.name} <span>${skill.percent}%</span>`;
            progressDiv.appendChild(h3Element);

            var barDiv = document.createElement('div');
            barDiv.classList.add('bar');
            var spanDiv = document.createElement('span');
            spanDiv.style.width = `${skill.percent}%`;
            barDiv.appendChild(spanDiv);
            progressDiv.appendChild(barDiv);

            skillsContent.appendChild(progressDiv);
        });

        container.appendChild(sectionDiv);
    });
}

// Utilizzo della funzione


const sectionsData = [
    {
        title: "Coding skills",
        img: "./svgs/coding.svg",
        skills: [
            { name: "HTML", percent: 90 },
            { name: "CSS", percent: 80 },
            { name: "php", percent: 75 },
            { name: "JavaScript", percent: 60 },
            { name: "Python", percent: 60 },
            { name: "C", percent: 50 },
            { name: "GDScript", percent: 60 }
        ]
    },
    {
        title: "Professional skills",
        img: "./svgs/professional.svg",
        skills: [
            { name: "Graphic design", percent: 95 },
            { name: "UI", percent: 70 },
            { name: "UX", percent: 75 },
            { name: "Web development", percent: 75 },
            { name: "Web design", percent: 70 },
            { name: "Game development", percent: 60 },
            { name: "Game design", percent: 90 },
        ]
    },
    {
        title: "Artistic skills",
        img: "./svgs/artistic.svg",
        skills: [
            { name: "Animazione 3D", percent: 40 },
            { name: "Disegno 3D", percent: 50 },
            { name: "Animazione 2D", percent: 65 },
            { name: "Disegno 2D", percent: 80 },
            { name: "Chitarra", percent: 75 },
            { name: "Canto", percent: 70 },
            { name: "Ukulele", percent: 60 }
        ]
    },
];

createSections(sectionsData);

function createEducationAndExperience(data) {
    const container = document.getElementById('education-row');
    data.forEach(section => {
        var column = document.createElement('div');
        column.classList.add('education-column');

        var titleElement = document.createElement('h3');
        titleElement.classList.add('title');
        titleElement.textContent = section.title;
        titleElement.setAttribute('data-aos', 'fade-right');
        column.appendChild(titleElement);

        var educationBox = document.createElement('div');
        educationBox.classList.add('education-box');
        column.appendChild(educationBox);
        educationBox.setAttribute('data-aos', 'fade-right');


        section.items.forEach(item => {
            var educationContent = document.createElement('div');
            educationContent.classList.add('education-content');

            var contentDiv = document.createElement('div');
            contentDiv.classList.add('content');

            var yearDiv = document.createElement('div');
            yearDiv.classList.add('year');
            yearDiv.innerHTML = `<i class='bx bxs-calendar'></i>${item.year} | ${item.institution}`;
            contentDiv.appendChild(yearDiv);

            var h3Element = document.createElement('h3');
            h3Element.textContent = item.qualification;
            contentDiv.appendChild(h3Element);

            var pElement = document.createElement('p');
            pElement.textContent = item.description;
            contentDiv.appendChild(pElement);

            if (item.position) {
                var positionElement = document.createElement('h4');
                positionElement.textContent = item.position;
                contentDiv.appendChild(positionElement);
            }

            educationContent.appendChild(contentDiv);
            educationBox.appendChild(educationContent);
        });

        container.appendChild(column);
    });
}

createEducationAndExperience([
    {
        title: "Educazione",
        items: [
            {
                year: "2017 - 2020",
                institution: "ISTITUTO SALESIANO SAN ZENO",
                qualification: "Qualifica professionale per Operatore elettrico",
                description: "Elettrotecnica, Sistemi, Tecniche e progettazione di sistemi elettrici"
            },
            {
                year: "2020 - 2023",
                institution: "ISTITUTO SALESIANO SAN ZENO",
                qualification: "Qualifica professionale per Operatore elettrico",
                description: "Elettrotecnica, Sistemi, Tecniche e progettazione di sistemi elettrici"
            },
            {
                year: "2023 - IN CORSO",
                institution: "ITS ACADEMY LAST",
                qualification: "Qualifica di web development",
                description: "HTML, CSS, JS, Graphic design, UX, UI, php"
            }
        ]
    },
    {
        title: "Esperienza",
        items: [
            {
                year: "MAGGIO - GIUGNO 2022",
                institution: "ELETTROSYSTEM",
                qualification: "Operatore elettrico presso Elettrosystem di Daniele Pellini a Oppeano",
                description: "stagista"
            },
            {
                year: "GIUGNO - LUGLIO 2023",
                institution: "ELETTROSYSTEM",
                qualification: "Operatore elettrico presso Elettrosystem di Daniele Pellini a Oppeano",
                description: "stagista"
            },
            {
                year: "MAGGIO - AGOSTO 2024",
                institution: "EDULIFE SOCIETÀ BENEFIT",
                qualification: "Contenuti digitali - contenuti digitali",
                description: "stagista"
            },
            {
                year: "SETTEMBRE - DICEMBRE 2024",
                institution: "EDULIFE SOCIETÀ BENEFIT",
                qualification: "Contenuti digitali - contenuti digitali",
                description: "stagista"
            }
        ]
    }
]);

const playlistsData = [
    { id: '5QKgUqfecHSprREJj1PDMy', title: 'Playlist 1' },
    { id: '22OKbIAGCgBtYcEb3oXANT', title: 'Playlist 2' },
    { id: '1FuX68Y0hFsO9s9K9JqYiA', title: 'Playlist 3' },
    { id: '1bX2bXn075ZDOzLrUpsmmA', title: 'Playlist 4' },
    { id: '6Yze0ZPWxWrCoAbgVGHVoC', title: 'Playlist 5' },
    { id: '7A4tyCrZyn7N4yDvRkufSX', title: 'Playlist 6' },
    { id: '597U1RL2lRYlXFq9zEMPaX', title: 'Playlist 7' },
    { id: '4zaXhaW0mp4v4Exliuo0WH', title: 'Playlist 8' },
    { id: '1uYneC2hyNcbRWnCztabYK', title: 'Playlist 9' },
    { id: '0gMXaY9jKjUBk3ya8RZ8Gy', title: 'Playlist 10' }
];

function createPlaylists(list) {
    const container = document.getElementById('playlist-container');
    if (!container) return;

    list.forEach(pl => {
        const title = document.createElement('h3');
        title.classList.add('playlist-title');
        title.textContent = pl.title;
        container.appendChild(title);

        const iframe = document.createElement('iframe');
        iframe.classList.add('playlist-iframe');
        iframe.style.borderRadius = '12px';
        iframe.setAttribute('data-src', `https://open.spotify.com/embed/playlist/${pl.id}?utm_source=generator`);
        iframe.height = '352';
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
        iframe.loading = 'lazy';
        container.appendChild(iframe);
    });
}

function setupPlaylistLazyLoad() {
    const overlay = document.getElementById('loading-overlay');
    const iframes = document.querySelectorAll('.playlist-iframe');
    let overlayHidden = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                observer.unobserve(iframe);

                if (!overlayHidden) {
                    iframe.addEventListener('load', function () {
                        overlay.style.display = 'none';
                    }, { once: true });
                    overlayHidden = true;
                }
            }
        });
    }, { rootMargin: '0px 0px 100px 0px' });

    iframes.forEach(iframe => observer.observe(iframe));
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('playlist-container')) {
        createPlaylists(playlistsData);
        setupPlaylistLazyLoad();
    }
});
