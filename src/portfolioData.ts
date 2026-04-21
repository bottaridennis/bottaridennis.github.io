import { Palette, Dices, Brush, Music, Zap, Camera, Code, User } from 'lucide-react';
import { Profile } from './types';

export const portfolioData: Profile[] = [
  {
    id: 'web-developer',
    title: 'Web Developer',
    intro: 'Sviluppatore Frontend di Verona con una passione per interfacce pulite e performanti. Mi piace trasformare l\'architettura dell\'informazione in esperienze digitali coinvolgenti.',
    themeColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    icon: Code,
    projects: [
      {
        id: 'rev-minds',
        title: 'Revolution Minds',
        description: 'Progetto di sensibilizzazione sull\'impatto ambientale dell\'armadio.',
        fullDescription: [
          "Con il percorso ITS con l'ITS ACADEMY LAST io e alcuni miei compagni abbiamo sviluppato un progetto che punta a sensibilizzare la popolazione sul territorio del veronese sull'impatto ambientale del loro aramdio, offrendo come soluzione i negozi second-hand sul territorio.",
          "Sviluppato come una Web App interattiva, il sito funge da guida pratica fornendo risorse, consigli e approfondimenti su temi di attualità e benessere."
        ],
        imageUrl: '/RevolutionMinds.png',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
        links: [
          { label: 'Visita Sito', url: 'https://revolutionminds.github.io', type: 'preview' },
          { label: 'GitHub', url: 'https://github.com/bottaridennis/ProjectWorkRevolutionMinds', type: 'github' }
        ],
        collaborators: [
          { name: 'Dennis Bottari', role: 'Frontend Developer' },
          { name: 'Yasmine Giuliani', role: 'Graphic designer & Leader' },
          { name: 'Diego Milli', role: 'Backend developer' },
          { name: 'Fabian Dumea', role: 'Ricerca' },
          { name: 'Matteo Leto', role: 'Ricerca' }
        ]
      },
      {
        id: 'arcon-template',
        title: 'ARCON template',
        description: 'Ricreazione di un template professionale Envato per esercizio di stile.',
        fullDescription: [
          "Con il percorso ITS con l'ITS ACCADEMY LAST durante le lezioni di HTML e CSS ci è stato detto di scegliere un template dalla piattaforma Envato e provare a ricrearlo utilizzando HTML e CSS per prendere dimestichezza con il linguaggio.",
          "Il progetto si concentra sulla fedeltà visiva e sulla pulizia del codice semantico."
        ],
        imageUrl: '/ARCON.png',
        technologies: ['HTML5', 'CSS3'],
        links: [
          { label: 'Vedi Progetto Locale', url: '/ARCON/arcon.html', type: 'preview' }
        ]
      },
      {
        id: 'enc-dec-aes',
        title: 'ENC/DEC con AES',
        description: 'Programma di cyber security per la cifratura di file con libreria AES.',
        fullDescription: [
          "Con il percorso ITS con l'ITS ACADEMY LAST io e alcuni miei compagni abbiamo sviluppato un progetto di cyber security.",
          "Il progetto consisteva nel creare un programma in Python che potesse criptare e decrittare un file di qualsiasi tipo con la libreria AES.",
          "Include funzionalità di generazione chiavi e gestione sicura dei file."
        ],
        imageUrl: '/encdec.png',
        technologies: ['Python', 'AES', 'Cyber Security'],
        links: [
          { label: 'GitHub', url: 'https://github.com/bottaridennis/Encoder_Decoder_AES', type: 'github' }
        ],
        collaborators: [
          { name: 'Dennis Bottari', role: 'Security Developer' },
          { name: 'Classmate 1', role: 'Developer' }
        ]
      },
      {
        id: 'nerdshelf',
        title: 'NerdShelf',
        description: 'Gestore di libreria digitale per appassionati della cultura geek.',
        fullDescription: [
          'NerdShelf è un\'applicazione web dedicata alla gestione e catalogazione di collezioni personali di libri, fumetti e memorabilia.',
          'Permette agli utenti di organizzare la propria "scaffalatura" digitale, tenendo traccia delle letture e dei nuovi acquisti.',
          'Il progetto si concentra sull\'interazione dell\'utente con database locali e sulla creazione di interfacce responsive.'
        ],
        links: [
          { label: 'Visita il sito', url: 'https://dennisbottari.it/NerdShelf/', type: 'preview' }
        ],
        imageUrl: '/NerdShelf.png',
        technologies: ['React', 'Local Storage', 'Tailwind', 'Vite'],
      },
      {
        id: 'PartyPantry',
        title: 'Party Pantry',
        description: 'Gestore di feste e alcolici per organizzarsi con gli amici.',
        fullDescription: [
          "Party Pantry è un semplice gestionale per mantenere l'ordine nell'organizzazione delle feste, per dividere spese e avanzi a fine Party.",
        ],
        links: [
          { label: 'Visita il sito', url: 'https://dennisbottari.it/partyOrganizer/', type: 'preview' }
        ],
        imageUrl: '/PartyPantry.png',
        technologies: ['React', 'Local Storage', 'Tailwind', 'Vite'],
      },
      {
        id: 'dnd',
        title: 'D&D Hero Forge',
        description: 'Gestore di personaggi di D&D edizione 2024',
        fullDescription: [
          'D&D Hero Forge è un\'applicazione web dedicata alla gestione e catalogazione di personaggi del famoso gioco di ruolo Dungeons and Dragons.',
          'Permette agli utenti di organizzare i propri personaggi, mettendo a disposizione anche un comodo wizzard per crearli.',
          'Il progetto si concentra sull\'interazione dell\'utente con database locali e sulla creazione di interfacce responsive.'
        ],
        links: [
          { label: 'Visita il sito', url: 'https://dennisbottari.it/dnd/', type: 'preview' }
        ],
        imageUrl: '/dnd.png',
        technologies: ['React', 'Local Storage', 'Tailwind', 'Vite'],
      }
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Firebase', 'Next.js']
  },
  {
    id: 'game-designer',
    title: 'Game Designer',
    intro: 'Appassionato di meccaniche e mondi narrativi. Studio Godot e il regolamento D&D 5.5e per creare sistemi di gioco bilanciati e divertenti.',
    themeColor: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    icon: Dices,
    projects: [
      {
        id: 'knight-run',
        title: 'Knight run',
        description: 'Videogioco 16bit sviluppato in Godot con script e level design originali.',
        fullDescription: [
          "Ho iniziato lo sviluppo di un videogioco 16bit in Godot, gli sprite sono stati presi da itch.io con licenza CC-0 mentre gli script e il level Design sono opera mia.",
          "Il focus principale è stato lo sviluppo del game feel e la gestione dei controlli del personaggio."
        ],
        imageUrl: '/game.png',
        technologies: ['Godot', 'GDScript', 'Game Design'],
        links: [
          { label: 'GitHub Repo', url: 'https://github.com/bottaridennis/KnightRun', type: 'github' }
        ]
      },
      {
        id: 'space-rocks',
        title: 'Space rocks',
        description: 'Minigioco in stile arcade dove distruggere asteroidi con la navicella.',
        fullDescription: [
          "Con gamemaker 2 ho creato un minigioco nel quale bisogna distruggere degli asteroidi.",
          "I comandi sono W A S D per il movimento, Spazio per bloccare la navicella e tasto sinistro del mouse per sparare."
        ],
        links: [
          { label: 'Gioca', url: '/space_game/index.html', type: 'preview' }
        ],
        imageUrl: '/spacegame.png',
        technologies: ['GameMaker Studio 2', 'GML'],
      },
      {
        id: 'rpg-game-8bit',
        title: 'GRPG game',
        description: 'Sviluppo di asset e meccaniche per un gioco di ruolo in 8-bit.',
        fullDescription: [
          "Con gamemaker 2 e aseprite ho creato degli assets e sto lavorando a delle meccaniche di gioco per un RPG 8-bit.",
          "Il progetto esplora la creazione di mondi esplorabili e l'interazione con l'ambiente."
        ],
        imageUrl: '/rpg.png',
        technologies: ['GameMaker Studio 2', 'Aseprite'],
        links: [
          { label: 'Gioca', url: '/RPG_game/index.html', type: 'preview' }
        ]
      },
      {
        id: 'spooky-shooter',
        title: 'Spooky shooter',
        description: 'Minigioco di sopravvivenza a orde di uomini zucca.',
        fullDescription: [
          "Con gamemaker 2 ho creato un minigioco nel quale bisogna sopravvivere a orde di uomini zucca.",
          "Un arcade frenetico per testare la gestione delle spawn rate e dei punteggi."
        ],
        imageUrl: '/spookyshooter.png',
        technologies: ['GameMaker Studio 2', 'Survival'],
        links: [
          { label: 'Gioca', url: '/spookyshooter/index.html', type: 'preview' }
        ]
      },
      {
        id: 'space-shooter-rocks',
        title: 'Rocks shooter',
        description: 'Evoluzione dello space shooter con sprite più dettagliati.',
        fullDescription: [
          "Con gamemaker 2 ho creato un minigioco nel quale bisogna distruggere degli asteroidi.",
          "Progetto da modificare e personalizzare in seguito utilizzando sprite più detagliati."
        ],
        imageUrl: '/space_game.png',
        technologies: ['GameMaker Studio 2', 'Iterative Design'],
        links: [
          { label: 'Gioca', url: '/space_shooter/index.html', type: 'preview' }
        ]
      }
    ],
    skills: ['Godot', 'GDScript', 'GameMaker', 'Unity', 'Level Design', 'Meccaniche di Gioco']
  },
  {
    id: 'elettricista',
    title: 'Elettricista',
    intro: 'Tecnico elettrotecnico specializzato in sistemi hardware e circuiti. Unisco la competenza manuale con la logica della programmazione Arduino.',
    themeColor: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    icon: Zap,
    projects: [
      {
        id: 'parking-sensor',
        title: 'Sensore parcheggio',
        description: 'Sensore di parcheggio funzionante con segnalazione distanza su LCD.',
        fullDescription: [
          "Con arduino ho realizzato un sensore di parcheggio funzionante utilizzando una scheda arduino uno, un buzzer un sensore ad ultra suoni e un lcd con modulo I2C, quest'ultimo per segnalare per iscritto la distanza dall'ostacolo.",
          "Il progetto unisce hardware elettrotecnico e firmware personalizzato."
        ],
        imageUrl: '/parking.png',
        technologies: ['Arduino', 'I2C LCD', 'Ultrasonic Sensor'],
        links: [
          { label: 'GitHub Code', url: 'https://github.com/bottaridennis/parking-sensor-arduino', type: 'github' }
        ]
      }
    ],
    skills: ['Arduino', 'Prototiper', 'Circuit Design', 'IoT', 'C++']
  },
  {
    id: 'musicista',
    title: 'Musicista',
    intro: 'Polistrumentista curioso. Dalla composizione di melodie alla cura di percorsi sonori tematici su Spotify.',
    themeColor: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    icon: Music,
    projects: [
      {
        id: 'curated-playlists',
        title: 'Dennis Bottari Collections',
        description: 'Curatela di playlist tematiche per esplorazione di genere e mood.',
        fullDescription: [
          'Oltre alla pratica strumentale, dedico tempo all\'analisi musicale e alla creazione di playlist che raccontano storie.',
          'Le collezioni spaziano dalla musica italiana d\'autore al synth-wave, cercando di creare ponti tra generi apparentemente distanti.'
        ],
        imageUrl: '/about.png',
        technologies: ['Spotify API', 'Music Analysis'],
      }
    ],
    skills: ['Composizione', 'Sound Design', 'Produzione Musicale', 'Digital Audio Workstation (DAW)', 'Chitarra', 'Basso', 'Uculele', 'canto']
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    intro: 'Comunicazione visiva e brand identity. Mi occupo di creare linguaggi grafici semplici ma dal forte impatto simbolico.',
    themeColor: 'text-rose-400',
    bgColor: 'bg-rose-400/10',
    icon: Palette,
    projects: [
      {
        id: 'stove-prototype',
        title: 'UI & UX | Prototipo stove figma',
        description: 'Interfaccia grafica e prototipo per app di gestione domestica delle stufe.',
        fullDescription: [
          "Con il percorso ITS con l'ITS ACCADEMY LAST ho sviluppato l'interfaccia grafica e il prototipo funzionante di un'app per la gestione domestica delle stufe utilizzando figma.",
          "Il lavoro ha incluso lo studio della user experience per un controllo intuitivo dei dispositivi IoT."
        ],
        imageUrl: '/page.png',
        technologies: ['Figma', 'UI/UX Design', 'IoT Prototyping', 'Prototypes'],
        links: [
          { label: 'Vedi Prototipo Figma', url: 'https://www.figma.com/file/aVVNqbTn3qFB69eTG17imo/Untitled', type: 'preview' }
        ]
      },
      {
        id: 'branding-rev',
        title: 'Branding Revolution Minds',
        description: 'Sviluppo dell\'identità visiva per il progetto Revolution Minds.',
        fullDescription: [
          'Creazione del logo e del sistema di colori istituzionali per la piattaforma Revolution Minds.',
          'Sviluppo di grafiche coordinate per social media e interfacce web.'
        ],
        imageUrl: '/RevolutionMinds.png',
        technologies: ['Adobe Illustrator', 'Affinity Designer'],
      }
    ],
    skills: ['UI/UX Design', 'Branding', 'Figma', 'Adobe Creative Suite', 'Layout & Typography']
  },
  {
    id: 'artista',
    title: 'Artista',
    intro: 'Esplorazione visiva tra digitale e analogico. Utilizzo Blender per creare assets 3D e dare vita alle mie immaginazioni.',
    themeColor: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    icon: Brush,
    projects: [
      {
        id: 'aseprite-animation',
        title: 'Aseprite | Animation',
        description: 'Set di animazioni pixel-art per personaggi 2D in 6 direzioni.',
        fullDescription: [
          "Con Aseprite ho iniziato a creare un set di animazioni per un personaggio 2D in 6 direzioni da poi condividere con la comunity con licenza CC-0.",
          "L'obiettivo è fornire risorse utili per lo sviluppo di giochi e animazioni commerciali."
        ],
        imageUrl: '/PG.gif',
        technologies: ['Aseprite', 'Pixel Art', 'Animation'],
      },
      {
        id: 'sea-render',
        title: 'Blender | Sea Render',
        description: 'Animazione di un mare in tempesta modellato e renderizzato in Blender.',
        fullDescription: [
          "Con Blender ho eseguito il primo render dell'animazione di un mare in tempesta modellato e animato da me per studiare l'interfaccia di Blender.",
          "Un esercizio focalizzato sulla simulazione dei fluidi e sul rendering atmosferico."
        ],
        imageUrl: '/sea.png',
        technologies: ['Blender', '3D Modeling', 'Rendering'],
      }
    ],
    skills: ['Modellazione 3D', 'Blender', 'Pixel Art', 'Digital Painting', 'Texturing']
  },
  // {
  //   id: 'fotografo',
  //   title: 'Fotografo',
  //   intro: 'Catturare la luce e la geometria urbana. Mi appassiona l\'architettura e come l\'uomo interagisce con lo spazio.',
  //   themeColor: 'text-cyan-400',
  //   bgColor: 'bg-cyan-400/10',
  //   icon: Camera,
  //   projects: [
      // {
      //   id: 'urban-geometry',
      //   title: 'Geometrie di Verona',
      //   description: 'Serie fotografica incentrata sulle linee e i volumi della mia città.',
      //   fullDescription: [
      //     'Una serie di scatti che isolano particolari architettonici di Verona, trasformando edifici storici e moderni in composizioni astratte.',
      //     'Focus sulla luce naturale e sulle prospettive inaspettate.'
      //   ],
      //   imageUrl: '/home.png',
      //   technologies: ['Mirrorless', 'Lightroom'],
      // }
  //   ],
  //   skills: ['Fotografia di Architettura', 'Editing (Lightroom)', 'Composizione', 'Street Photography']
  // },
  {
    id: 'persona',
    title: 'Profilo Generale',
    intro: 'Sono un ragazzo di Verona appassionato e creativo con una fervida passione per tutto il mondo del graphic design e del Frontend. Il mio percorso di studi spazia dall\'elettrotecnica all\'arte. Attraverso un approccio innovativo, mi impegno a fornire soluzioni semplici ma efficaci senza far mancare il design e lo stile.',
    themeColor: 'text-zinc-400',
    bgColor: 'bg-zinc-400/10',
    icon: User,
    projects: [
      {
        id: 'aseprite-animation',
        title: 'Aseprite | Animation',
        description: 'Set di animazioni pixel-art per personaggi 2D in 6 direzioni.',
        fullDescription: [
          "Con Aseprite ho iniziato a creare un set di animazioni per un personaggio 2D in 6 direzioni da poi condividere con la comunity con licenza CC-0.",
          "L'obiettivo è fornire risorse utili per lo sviluppo di giochi e animazioni commerciali."
        ],
        imageUrl: '/PG.gif',
        technologies: ['Aseprite', 'Pixel Art', 'Animation'],
      },
      {
        id: 'sea-render',
        title: 'Blender | Sea Render',
        description: 'Animazione di un mare in tempesta modellato e renderizzato in Blender.',
        fullDescription: [
          "Con Blender ho eseguito il primo render dell'animazione di un mare in tempesta modellato e animato da me per studiare l'interfaccia di Blender.",
          "Un esercizio focalizzato sulla simulazione dei fluidi e sul rendering atmosferico."
        ],
        imageUrl: '/sea.png',
        technologies: ['Blender', '3D Modeling', 'Rendering'],
      }
    ],
    education: [
      {
        year: '2023 - 2025',
        institution: 'ITS Academy LAST',
        description: 'Corso in Service Design & Frontend Development. Focus su progettazione di servizi digitali, architettura frontend (React) e UX design.'
      },
      {
        year: '2015 - 2023',
        institution: 'Diploma di Maturità',
        description: "Formazione tecnica nel settore dell'eletronica e dell'elettrotecnica che ha gettato le basi per la mia curiosità multidisciplinare."
      }
    ],
    
    skills: [
      'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3', 
      'Godot (GDScript)', 'GameMaker Studio 2', 'Unity', 
      'Figma', 'Blender', 'Aseprite', 'Adobe Illustrator', 
      'Arduino', 'C++', 'Creative Problem Solving'
    ],
    links: [
      { label: 'Scarica il mio CV', url: 'https://dennisbottari.it/files/CV.pdf' },
      { label: 'Contattami', url: 'mailto:dennisbottari@gmail.com' }
    ]
  }
];
