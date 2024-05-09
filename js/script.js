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
// createProjectBox();
createUpdatesBox(knightRun);
createUpdatesBox(character);
createUpdatesBox(seaRender);
// createUpdatesBox();