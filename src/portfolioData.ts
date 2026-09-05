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
          { label: 'Visita Sito', url: 'https://dennisbottari.it/revolutionminds/', type: 'preview' },
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
        id: '52-hertz',
        title: '52 Hertz',
        description: 'Brano generato con Suno AI, esplora le atmosfere sottomarine della balena solitaria.',
        fullDescription: [
          'Questa canzone è stata generata interamente utilizzando Suno AI, a partire da un mio testo originale. Il brano racconta la malinconica solitudine della "52-hertz whale", l\'esemplare unico che canta a una frequenza inudibile dai suoi simili.',
          'L\'obiettivo era ricreare un soundscape sottomarino, dove lo spazio e il silenzio giocano un ruolo fondamentale per trasmettere il senso di vastità e isolamento.'
        ],
        imageUrl: '/52-Hertz.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/52-Hertz.mp3',
        promptStyle: 'ambient pop, cinematic dream pop, underwater soundscape, intimate melancholic atmosphere, solitary soft lead vocal, close-mic breathy singing, restrained emotion, slow spacious arrangement, felt piano, deep ambient synth pads, distant sub bass, glassy textures, reversed piano tails, bowed vibraphone, sparse guitar swells, hydrophone-like textures, whale-call inspired tones, sonar pulses as musical motifs, muffled underwater percussion, heartbeat-like kick, long submerged reverb, filtered echoes, oceanic low-frequency rumble, huge sense of empty space, suspended verses, haunting pre-chorus, wide but restrained chorus, distant layered backing vocals like unanswered calls, ethereal bridge with almost no percussion, final chorus with remote vocal layers slowly finding the same frequency, bittersweet unresolved ending, minimal cinematic production, no EDM drops, no aggressive drums, 68 BPM',
        lyrics: `[Verse 1]
I call out low
Into the blue
My little wave
Keeps reaching you

The dark keeps still
The cold keeps time
I leave my name
In thin white lines

[Pre-Chorus]
Somewhere out there
A door stays shut
I hear the turn
I hear the hush

[Chorus]
Fifty-two hertz
Fifty-two hertz
I keep on singing
I keep on singing

Fifty-two hertz
Fifty-two hertz
If you can hear me
Please, answer me

[Verse 2]
The deep is long
The deep is kind
It holds my ache
And marks the tide

I trace the black
With patient faith
A lonely sound
Still has a shape

[Pre-Chorus]
Somewhere out there
A heart might learn
To feel the bend
To feel the burn

[Chorus]
Fifty-two hertz
Fifty-two hertz
I keep on singing
I keep on singing

Fifty-two hertz
Fifty-two hertz
If you can hear me
Please, answer me

[Bridge]
Maybe I am
Not meant to fade
Maybe my song
Is how I stay

Maybe one day
A stray reply
Will break the blue
And meet my cry

[Final Chorus]
Fifty-two hertz
Fifty-two hertz
I keep on singing
I keep on singing

Fifty-two hertz
Fifty-two hertz
You are not broken
You are not alone`
      },
      {
        id: 'whale-fall',
        title: 'Whale Fall',
        description: 'Composizione post-rock generata con Suno AI, sul ciclo della vita negli abissi.',
        fullDescription: [
          'Generata con Suno AI partendo da un testo originale, "Whale Fall" è una composizione che celebra l\'affascinante fenomeno biologico della caduta delle balene negli abissi, dove la fine di una vita dà inizio a un intero ecosistema.',
          'La produzione musicale mira a una crescita organica e lenta, passando dal vuoto malinconico iniziale fino a un trionfale crescendo cinematografico.'
        ],
        imageUrl: '/Whale-Fall.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/Whale-Fall.mp3',
        promptStyle: 'cinematic post-rock, oceanic ambient, slow orchestral crescendo, melancholic but peaceful, fragile intimate vocals, spacious clean electric guitars with long reverb and delay, bowed guitar, deep cello, contrabass, soft strings, sparse felt piano, ocean drones, deep sub-bass, hydrophone textures, distant whale-like tones, cymbal swells, drums entering gradually, slow toms, huge underwater atmosphere, descending melodies, restrained verses, emotional spacious chorus, instruments gradually layering as new life appears, massive but gentle final crescendo, wordless choir, bittersweet acceptance, organic production, no pop, no EDM, no metal, 64 BPM',
        lyrics: `[Verse 1]
Salt-black water
Over my bones
I came down heavy
To the trench below

My skin gave way
My name dissolved
Cold took the crown
And the dark held on

[Pre-Chorus]
But the ribs still open
Like a gate in the deep
Tiny mouths gather
Where my silence sleeps

[Chorus]
Whale fall
Feed the sea
Whale fall
Carry me
Whale fall
I become
A thousand lives
From one

[Verse 2]
White hagfish ribbon
Through the folds of me
Crabs in the armor
Shell by shell, set free

A bone cathedral
On a silted floor
Every broken piece
Becomes a door

[Pre-Chorus]
And the hands keep working
In the pressure and the blue
What was ending here
Turns into something new

[Chorus]
Whale fall
Feed the sea
Whale fall
Carry me
Whale fall
I become
A thousand lives
From one

[Bridge]
No crown
No song
Just the long descent
Then the long, long giving

[Chorus]
Whale fall
Feed the sea
Whale fall
Carry me
Whale fall
I become
A thousand lives
From one`
      },
      {
        id: 'deep-dive',
        title: 'Deep Dive',
        description: 'Traccia rap tecnica generata con Suno AI dalle atmosfere cupe e claustrofobiche.',
        fullDescription: [
          'Questo pezzo, generato utilizzando Suno AI con testo originale, esplora la pressione e la claustrofobia dell\'apnea profonda.',
          'L\'intento era di accostare una narrazione rap estremamente tecnica, veloce e in italiano, a un panorama sonoro sottomarino ansiogeno e battente, in un contrasto inusuale ed elettrizzante.'
        ],
        imageUrl: '/Deep-Dive.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/Deep-Dive.mp3',
        promptStyle: 'underwater cinematic technical rap, Italian male rapper, dark claustrophobic atmosphere, 88 BPM half-time, deep sub-bass like ocean pressure, sonar pulses, hydrophone textures, muffled metallic percussion, distant underwater drones, sparse dark piano, intimate close-mic breathing, calm controlled opening verses, increasing tension with depth, sudden beat switch into ultra-fast extrabeat, extreme rapid-fire delivery, progressive accelerations, double-time into triple-time and peak-speed bursts, relentless syllable density, long breathless passages, technical panic flow, heartbeat percussion accelerating with the vocals, sparse instrumental at maximum speed, abrupt beat cuts, decompression-stop silences, cinematic tension, no singing, no melodic hook, final surface section quiet and spacious',
        lyrics: `[Verse 1]
Scendo giù nel blu
Maschera stretta, fiato su
Il mondo sopra fa rumore
Qui ogni gesto ha più valore

Sale il sale sulla pelle
Conta i battiti, conta le stelle
Luce corta sul mio vetro
Ogni metro mi vuole indietro

[Pre-Chorus]
Più giù
Più su il cuore
Più giù
Più forte il dolore

Sento il muro
Sento il richiamo
Stringo i denti
Non torno piano

[Chorus]
Deep dive, deep dive
Scendo e non mi fermo
Deep dive, deep dive
Più fondo, più in mezzo
Deep dive, deep dive
La pressione mi fa vivo
Deep dive, deep dive
Vado giù, resto in tiro (deep dive)

[Verse 2]
Sette ombre nel riflesso
Uno sbalzo, poi lo stesso
Ogni colpo dentro il petto
Fa più largo questo stretto

Mani fredde, cuore acceso
Sono qui, ma non mi arrendo
Guardo il buio che mi prende
E mi spinge sempre, sempre

[Pre-Chorus]
Più giù
Più su il timore
Più giù
Più duro il battito

Sotto il nero
C’è un varco
Io ci entro
Senza fiato

[Chorus]
Deep dive, deep dive
Scendo e non mi fermo
Deep dive, deep dive
Più fondo, più in mezzo
Deep dive, deep dive
La pressione mi fa vivo
Deep dive, deep dive
Vado giù, resto in tiro (deep dive)

[Bridge]
[Drop to low pulse]
Niente aria
Solo fede
Niente calma
Solo spinta

Se mi chiami
Non rispondo
Sto nel fondo
E ci vivo

[Final Chorus]
Deep dive, deep dive
Scendo e non mi fermo
Deep dive, deep dive
Più fondo, più in mezzo
Deep dive, deep dive
La pressione mi fa vivo
Deep dive, deep dive
Vado giù, resto in tiro (deep dive)`
      },
      {
        id: 'salt-on-the-mast',
        title: 'Salt on the Mast',
        description: 'Brano teatrale e inquietante generato con Suno AI a tema marinaresco.',
        fullDescription: [
          'Un esperimento di storytelling musicale dark cabaret generato con Suno AI.',
          'Il testo originale narra la dura e folle vita in mare durante una tempesta spietata. Lo stile pianistico frenetico, accostato a una voce baritonale quasi deragliante, cattura il senso di puro terrore e determinazione folle di un equipaggio in balia delle onde.'
        ],
        imageUrl: '/Salt-on-the-Mast.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/Salt-on-the-Mast.mp3',
        promptStyle: 'Dark theatrical piano song with sharp, rhythmic staccato chords and no other instruments, Deep male baritone vocals, expressive and dramatic like a sinister musical villain, Unstable tempo shifts, obsessive repeating piano patterns, sudden pauses, dissonant harmonies, and unpredictable dynamics, Creepy, deranged, claustrophobic atmosphere with a manic cabaret feel, Intense storytelling, whispered phrases, explosive vocal accents, and a disturbing sense of controlled madness',
        lyrics: `[Verse 1]
We left the dock at dawn
With pitch on both our hands
Old Jonah spat and laughed
Said, “Boys, mind the rising sand”
The hawser bit my palm
The deck boards shook and moaned
And every face on board
Was carved from wind and bone

[Pre-Chorus]
Heave now, hold fast
Bend your back and trust
The tide don’t ask your name
It only wants your dust

[Chorus]
Salt on the mast
Keep it up, keep it fast
Salt on the mast
We’re still sailing past
Hey, hey, haul away
Hold the line, don’t slack
Salt on the mast
And the sea can’t pull us back

[Verse 2]
By noon the sky went black
Like ink in a broken pail
The cook tied down the pot
And crossed his teeth for hail
We lashed the yard with rope
Till our fingers went numb and raw
Then sang to keep the fear
From climbing up the draw

[Pre-Chorus]
Heave now, hold fast
Bend your back and trust
The tide don’t ask your name
It only wants your dust

[Chorus]
Salt on the mast
Keep it up, keep it fast
Salt on the mast
We’re still sailing past
Hey, hey, haul away
Hold the line, don’t slack
Salt on the mast
And the sea can’t pull us back

[Bridge]
Then came a moonless wave
Tall as a churchyard wall
It struck us broad and hard
And nearly took us all
But Molly gripped the wheel
And grinned through pouring spray
She shouted, “Not this night!”
And turned the beast away

[Final Chorus]
Salt on the mast
Keep it up, keep it fast
Salt on the mast
We’re still sailing past
Hey, hey, haul away
Hold the line, don’t slack
Salt on the mast
And the sea can’t pull us back
Salt on the mast
Sing it loud, sing it fast
Salt on the mast
Till the last wave passes by`
      },
      {
        id: 'un-interruttore',
        title: 'Un Interruttore',
        description: 'Brano generato con Suno AI, puro rap tecnico su una base hip-hop aggressiva.',
        fullDescription: [
          'Questa canzone è stata generata utilizzando Suno AI partendo da un testo originale. È un puro pezzo rap tecnico e introspettivo che parla di superare i propri blocchi emotivi e trovare la propria voce.',
          'L\'assenza di un ritornello cantato e i cambi di metrica fino al double-time rendono l\'esecuzione vocale aggressiva e cruda.'
        ],
        imageUrl: '/Un-Interruttore.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/Un-Interruttore.mp3',
        promptStyle: 'pure technical rap, no singing, aggressive modern hip-hop, Italian male rapper, sharp articulate delivery, conversational opening flow, dry punchy vocal, dark minimal piano motif, hard drums, deep sub bass, tight kick and snare, sparse cinematic textures, escalating rhythmic intensity, complex internal rhymes, multisyllabic rhyme patterns, frequent flow switches, syncopated cadence, rapid-fire double-time rap section, extremely fast but clearly articulated extrabeat passage, breathless rhythmic climax, sudden beat switch before fast verse, drums intensify during double-time section, brief beat cuts for emphasis, controlled aggression, introspective lyrical tone, confident transformation arc, stripped-back chorus performed as rhythmic rap rather than singing, dramatic half-time bridge, explosive final verse, modern polished hip-hop production, 92 BPM with double-time sections perceived at 184 BPM',
        lyrics: `[Intro — Spoken Rap]
Prima non usciva niente
Zero
Adesso prova a fermarmi

[Verse 1]
Prima, bro, un blocco
Muto, non un fiato
Ogni parola un macigno
Tutto dentro, incasinato

Volevo, sì, ma zero azione
Paura in ogni situazione
Lei, uno sguardo, un flash
Cambio marcia, niente crash

Testa bassa, passo corto
Ogni pensiero nasceva morto
Mille frasi nella mente
Ma davanti a te? Niente

Poi qualcosa ha fatto clic
Come un colpo sopra il beat
Non mi sono trasformato
Ho soltanto sbloccato il fiato

[Pre-Chorus — Rap Build]
Un clic
Un interruttore
Spengo il dubbio
Alzo il rumore

Non cerco più
La frase perfetta
Apro la bocca
E parte diretta

[Chorus — Rap]
Ora parlo, man, un fiume in piena
Fuori dall'ombra, dentro la scena
Chiedo, voglio, dico ciò che penso
Ogni parola adesso ha il suo peso

Ora parlo, non mi tengo niente
Voce davanti, paura assente
Prima silenzio, adesso saetta
La mia voce colpisce diretta

[Verse 2]
Prima un fantasma, quasi invisibile
Ora ogni sillaba diventa tangibile
Non sono un altro, sono sempre quello
Solo che adesso non abbasso il livello

Ho tolto il freno dalla lingua e dal petto
Dico ciò che voglio senza chiedere permesso
Non per arroganza, non per fare il grosso
Ho perso troppo tempo col pensiero addosso

Lei è stata scintilla, non destinazione
Ha aperto una porta nella mia prigione
Poi ho capito mentre correvo più forte
Che quella chiave era mia, non della sorte

[Beat Switch]

[Fast Verse — Double-Time / Extrabeat]
Parlavo piano perché dentro avevo il panico
Calcolo, analizzo, paralizzo, tutto statico
Pratico silenzi come fossero una tattica
Ma ogni cosa trattenuta diventava problematica

Adesso sputo sillabe, le libero, le incastro
Passo dalla nebbia fino al centro del contrasto
Scatto, cambio passo, non mi basta stare zitto
Scrivo quello che non dico, poi lo dico sopra il ritmo

Niente freno, niente filtro per la paura che mi blocca
Ogni dubbio che ritorna trova chiusa quella porta
Prima cento formulazioni prima ancora di parlare
Ora penso mentre parto, tanto imparo ad atterrare

Accelerazione, respirazione, articolazione
Cambio metrica, direzione, senza perdere intenzione
Non è voglia di impressionare, è recuperare il tempo
Che ho passato ad aspettare che arrivasse il mio momento

E se inciampo nella frase la correggo mentre corro
Non mi fermo, non mi piego, non mi chiudo, non ritorno
Alla versione che tremava solamente per un "no"
Ora prendo quel silenzio, lo comprimo—

E lo esplodo.

[Beat Cut]

[Bridge — Slow Rap]
Lei, la scintilla
Il catalizzatore

Ma il fuoco era mio
Da qualche parte, dentro

Non cambio per qualcuno
Cambio perché ho capito

Che avere una voce
Non significa fare casino

Significa scegliere
Quando usarla

Quando difendersi
Quando rischiarla

E se domani lei non fosse qui
Quella voce resterebbe ancora mia

[Final Chorus — Hard Rap]
Ora parlo, man, un fiume in piena
Fuori dall'ombra, dentro la scena
Chiedo, voglio, dico ciò che penso
Ogni parola adesso ha il suo peso

Ora parlo, non mi tengo niente
Voce davanti, paura assente
Prima silenzio, adesso saetta
La mia voce colpisce diretta

[Outro]
Un clic
Un interruttore

Non mi hai dato una voce

Mi hai fatto capire
Che ce l'avevo già.`
      },
      {
        id: 'heaven-and-hell',
        title: 'Heaven and Hell (Musical)',
        description: 'Duetto musicale generato con Suno AI dal sapore cinematografico e orchestrale.',
        fullDescription: [
          'Un brano dallo stile baroque pop / horror score che esplora una dualità tematica: una discussione tra un demone e un angelo sulle sorti dell\'umanità.',
          'Generata con Suno AI, questa traccia utilizza un tempo di valzer in minore e atmosfere anni \'70 per creare un senso di drammaticità epica.'
        ],
        imageUrl: '/Heaven-and-Hell-Musical.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/Heaven-and-Hell-Musical.mp3',
        promptStyle: 'dark cinematic horror score, baroque pop, music box melody, celesta arpeggios, warped tape textures, detuned piano ostinato, fretless bass lines, clean electric guitar arpeggios, steel-string fingerpicking, sparse taiko impacts, whispered choir pads, reversed swell intro, analog tape saturation, mono room reverb, minor key waltz, slow doom pulse, hopeful lift, duality, 1970s film score',
        lyrics: `[Verse 1: Demon]
The skies burn red and the cities are silent
This world of wretches ain't worth saving
Every soul is a burden of sin
I'll erase every trace of you from existence

[Verse 2: Angel]
The skies are burning
And yes
They're silent
But listen to me: humanity's worth saving
All of you are wounded and weak
But there are innocents left
And there are people still fighting

[Pre-Chorus: Demon]
This world was a mistake
Broken prayers from ruined hearts
Don't let this chance go to waste
There is no hope in the dark

[Chorus: Angel]
There's still light in the ashes
There's still beauty in pain
There's still love and compassion
And those who choose to remain
There's still hope in the darkness
There's still good in this place
There's still light in the ashes
So I'll choose to have faith

[Verse 3: Demon]
Stars fall
And the clouds run red with blood
I have no sympathy for what you will become
You're better off being buried and gone
There's nothing left to save
So let it all burn

[Verse 4: Angel]
Stars fall
And the clouds are stained with blood
But I'm not afraid
And I know we're not done
The good and the brave will rise up
There's so much left to save
So please don't let them burn`
      },
      {
        id: 'monster',
        title: 'Monster',
        description: 'Traccia psicologica e inquietante sulle voci interiori, generata con Suno AI.',
        fullDescription: [
          'Un esplorazione sonora del conflitto interiore, in un botta e risposta tra la parte più oscura ("Evil Voice") e quella più luminosa ("Good Voice") della propria mente.',
          'Un brano horror dark dal forte impatto psicologico, sostenuto da un arrangiamento rarefatto e voci sussurrate.'
        ],
        imageUrl: '/Monster.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/Monster.mp3',
        promptStyle: 'dark cinematic horror score, whispered choir, detuned piano, tremolo strings, taiko impacts, distorted bass drone, reverse piano, close-mic male vocal, sinister deep voice spoken, breathy female countervoice, call-and-response, mono room reverb, tape saturation, low-end compression, sparse intro, half-time pulse, climactic drop, psychological dread',
        lyrics: `[Intro]
Can you hear it?
Can you hear it?
There’s something breathing under my skin
One voice says “hold on”
One voice says “give in”

[Verse 1 — Monster]
There’s a war inside my head tonight
Scratching words into the walls
I try to stand in the candlelight
But the dark knows how to crawl

I hear a whisper soft and clean
Telling me I’m not too far
Then another voice behind my teeth
Turns my mercy into scars

[Good Voice]
Breathe slow
You are not what lives below
Stay close
There is still a way back home

[Evil Voice]
No peace
No sleep
Let the hunger take the lead
Break free
Show them what you really keep

[Pre-Chorus — Monster]
I can feel them pulling at my bones
One builds a shelter
One builds a throne
I don’t know which one is calling me
But both of them are wearing my voice

[Chorus]
There’s a demon inside of me
And an angel I can barely hear
One says “you can still be free”
One says “burn away the fear”

Two voices in my skull tonight
One is light and one is teeth
I’m the monster in the middle
Fighting darkness underneath

Can you hear it?
Can you hear it?
Can you hear it inside me?
Can you hear it?
Can you hear it?
The good, the evil, and me

[Verse 2 — Monster]
I see my face in broken glass
But the eyes don’t look like mine
Every thought becomes a mask
Every prayer becomes a crime

The good voice holds my shaking hand
Says the blood can still be rain
The bad voice laughs and takes command
Says there’s beauty in the pain

[Good Voice]
Come back
You are more than your attack
Don’t crack
Let the silence pull you back

[Evil Voice]
Too late
No grace
Put the terror on your face
Give chase
Make the whole world know your name

[Pre-Chorus — Monster]
I can feel them crawling through my chest
One wants forgiveness
One wants the rest
I don’t know if I can make it out
When both of them are living in my mouth

[Chorus]
There’s a demon inside of me
And an angel I can barely hear
One says “you can still be free”
One says “burn away the fear”

Two voices in my skull tonight
One is light and one is teeth
I’m the monster in the middle
Fighting darkness underneath

Can you hear it?
Can you hear it?
Can you hear it inside me?
Can you hear it?
Can you hear it?
The good, the evil, and me

[Bridge — Good Voice]
You are not the shadow
You are not the blade
You are not the nightmare
That your sorrow made

[Bridge — Evil Voice]
You are only hunger
You are only rage
You were born in thunder
You were built to break

[Bridge — Monster]
Shut up
Please stop
I can’t tell where my thoughts begin
Light fades
Dark talks
And I’m locked in my own skin

[Breakdown]
One voice says “save him”
One voice says “kill”
One voice says “mercy”
One voice says “will”

One voice is shaking
One voice is cruel
One voice is praying
One voice says “rule”

[Final Chorus]
There’s a demon inside of me
And an angel I can barely hear
One says “you can still be free”
One says “disappear”

Two voices in my skull tonight
One is hope and one is grief
I’m the monster in the middle
Begging one of them to leave

Can you hear it?
Can you hear it?
Can you hear it inside me?
Can you hear it?
Can you hear it?
The good, the evil, and me

[Outro — Monster]
There’s a demon inside of me
But there’s a light still underneath
If I survive my mind tonight
Maybe the monster isn’t me`
      },
      {
        id: 'spit-it-out',
        title: 'Spit it out',
        description: 'Traccia ansiogena e claustrofobica che unisce ritmiche marziali a cori sussurrati.',
        fullDescription: [
          'Generata con Suno AI, questa canzone ruota attorno all\'inadeguatezza e alla sensazione di non appartenere.',
          'La produzione miscela elementi di musica classica (archi barocchi, pianoforte scordato) con un forte senso di inquietudine moderna.'
        ],
        imageUrl: '/Spit-It-Out.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/Spit-It-Out.mp3',
        promptStyle: 'dark cinematic horror score, baroque strings, detuned piano, whisper choir, low brass stabs, tremolo violins, bowed cymbals, tape saturation, analog room mic, minor-key ostinato, 92 BPM, triplet pulse, march snare, escalating bridge, claustrophobic dread',
        lyrics: `[Verse]
My honey says she needs a room
She doesn't want my chains and jewelry
And
God
I hope she makes it through
'Cause my baby
She likes to worry
But her ex-boyfriend thinks I'm weird
He didn't like my long hair
But my girl does
But if you can't give me a chance
Why should I give you one?

[Chorus]
They told me to be more like everyone else
So I got rid of the one thing that made me myself
If I really was a monster
Would you even tell?
So
Come on
Spit it out
Come on
Spit it out
If you really think I'm a monster
Would you even tell?
So
Come on
Spit it out
Come on
Spit it out
[Verse 2]
I tried to play the nice guy
I went to church
But it was too white
I went to hell
But it was too hot
I tried to care
But I could not
I wore my fancy shoes and tie
I asked them why
And they just said it's 'cause
But if you can't give me a chance
Why should I give you one?

[Chorus]
They told me to be more like everyone else
So I got rid of the one thing that made me myself
If I really was a monster
Would you even tell?
So
Come on
Spit it out
Come on
Spit it out
If you really think I'm a monster
Would you even tell?
So
Come on
Spit it out
Come on
Spit it out

[Bridge]
Come on
Spit it out
Come on
Spit it out
Come on
Spit it out
Come on
Spit it out
Come on
Spit it out
Come on
Spit it out
Come on
Spit it out
Come on
Spit it out
Come on
Spit it out
Come on
Spit it out
Come on
Spit it out
Come on
Spit it out
[Chorus]
They told me to be more like everyone else
So I got rid of the one thing that made me myself
If I really was a monster
Would you even tell?
So
Come on
Spit it out
Come on
Spit it out
If you really think I'm a monster
Would you even tell?
So
Come on
Spit it out
Come on
Spit it out`
      },
      {
        id: 'the-beast',
        title: 'The Beast',
        description: 'Traccia dal sound 80s cupo e martellante, sul perdersi nella propria oscurità.',
        fullDescription: [
          'In "The Beast", generata con Suno AI, si esplora il tema del cattivo, del mostro che si risveglia in un mondo apocalittico.',
          'Il ritmo spezzato, i riverberi degli anni \'80 e i cori stridenti rafforzano il terrore di un passato dimenticato che riemerge prepotentemente.'
        ],
        imageUrl: '/The-Beast.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/The-Beast.mp3',
        promptStyle: 'dark cinematic horror, 92 BPM, detuned brass stabs, bass drum hits, bowed low strings, prepared piano clusters, taiko underhits, granular tape texture, mono room reverb, 1980s score mix, fractured march rhythm, unstable build breaks, collapsing arrangement, whispered male vocals, distressed chorus shouts, ominous, apocalyptic dread',
        lyrics: `[Intro]
[gritty vocals]
[Chorus]
Wake up
I don't know my name
My mind erased
No family to claim
[Verse]
Cold light of day and a world that's on fire
No gods and no kings and no hope to aspire
My bones they are tired
These stones tell a tale
My blood and my sins keep me locked in this cell
Nowhere to run and no heroes in sight
How did this happen? I'm losing my mind
[Pre-Chorus]
As time slips away and my memory fades
I can't escape what these people are saying
[Chorus]
The monster is back
The monster is back
I don't know my name
The monster is back
The monster is back
My mind erased
The monster is back
The monster is back
No family to claim
The monster is back
The monster is back
[Verse 2]
If I'm the villain of the story
Can you be the hero?
So that you can hold me
Took the skin of a child and stitched it together
In a world that's on fire
In a world that's on fire
[Bridge]
The children are running
They're trying to hide
The women are screaming
The men grab their knives
No one is safe and there's nowhere to go
The fear in their eyes
And I think that I know
As time slips away and my memory fades
I can't escape what these people are saying
[Chorus]
The monster is back
The monster is back
I don't know my name
The monster is back
The monster is back
My mind erased
The monster is back
The monster is back
No family to claim
The monster is back
The monster is back
[Outro]
If I'm the villain of the story
Can you be the hero?
So that you can hold me
Took the skin of a child and stitched it together
In a world that's on fire
In a world that's on fire
If I'm the villain of the story
Can you be the hero?
So that you can hold me
Took the skin of a child and stitched it together
In a world that's on fire
In a world that's on fire`
      },
      {
        id: 'for-your-love',
        title: 'For Your Love',
        description: 'Un pezzo melodic drill sulle seconde occasioni e sul cambiamento interiore.',
        fullDescription: [
          'Abbandonando i toni dark, "For Your Love" è un brano dalle vibrazioni UK Drill romantiche ed emotive, incentrato sul cambiare per amore.',
          'Generato tramite Suno AI, fonde il beat drill con una narrazione introspettiva e vulnerabile.'
        ],
        imageUrl: '/For-Your-Love.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/For-Your-Love.mp3',
        promptStyle: 'melodic drill rap, emotional UK drill, dark romantic atmosphere, introspective male rapper, deep warm male voice, controlled aggressive delivery in the verses, vulnerable melodic singing in the chorus, minor key, haunting piano motif, sparse dark synth pads, sliding 808 bass, heavy sub bass, sharp punchy kick, syncopated drill hi-hats, fast triplet hi-hat rolls, crisp snare, subtle reversed textures, atmospheric vocal samples, nocturnal urban ambience, tense verses, emotional pre-chorus build, big memorable melodic hook, raw but sincere performance, redemption theme, mature street energy, cinematic production, polished modern mix, 142 BPM, half-time feel',
        lyrics: `[Verse 1]
I used to move reckless, all bad habits
Late nights, loose talk, and the trap of it
Pride in my chest, I was toxic with it
Burned every bridge, I was awful with it
You came through calm, had a soft kind of fire
Looked at my mess and you lifted me higher
Now I’m cutting off all the old me lies
For one real chance in your eyes

[Pre-Chorus]
I been scrubbing my name, trying to get right
Breaking old chains in the middle of the night
If I fall, I get back up and try
'Cause I want your hand, and I want that life

[Chorus]
For your love, I changed it all
For your love, I took that fall
One day, baby, I’ll be your man
One day, baby, I’ll wear that band
For your love, I changed it all
For your love, I changed it all

[Verse 2]
I cut the fools off, cut the smoke too
Cut the bad words when I’m talking to you
Swapped that rush for a steady pace
Now I clean up my room, got a new little place
I show up on time, keep my word now
Say what I mean, let the old hurt down
I know trust ain’t cheap, I’m paying in sweat
Trying to be the best you ever met

[Pre-Chorus]
I been scrubbing my name, trying to get right
Breaking old chains in the middle of the night
If I fall, I get back up and try
'Cause I want your hand, and I want that life

[Chorus]
For your love, I changed it all
For your love, I took that fall
One day, baby, I’ll be your man
One day, baby, I’ll wear that band
For your love, I changed it all
For your love, I changed it all

[Bridge]
If you see me now, you’ll know I’m real
No more games when I say how I feel
I ain’t perfect, but I’m on this road
With your name in my chest, I’m carrying hope

[Chorus]
For your love, I changed it all
For your love, I took that fall
One day, baby, I’ll be your man
One day, baby, I’ll wear that band
For your love, I changed it all
For your love, I changed it all`
      },
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
