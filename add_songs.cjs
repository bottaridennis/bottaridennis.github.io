const fs = require('fs');
let content = fs.readFileSync('src/portfolioData.ts', 'utf8');

const newSongs = `      {
        id: 'un-interruttore',
        title: 'Un Interruttore',
        description: 'Brano generato con Suno AI, puro rap tecnico su una base hip-hop aggressiva.',
        fullDescription: [
          'Questa canzone è stata generata utilizzando Suno AI partendo da un testo originale. È un puro pezzo rap tecnico e introspettivo che parla di superare i propri blocchi emotivi e trovare la propria voce.',
          'L\\'assenza di un ritornello cantato e i cambi di metrica fino al double-time rendono l\\'esecuzione vocale aggressiva e cruda.'
        ],
        imageUrl: '/Un Interruttore.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/Un Interruttore.mp3',
        promptStyle: 'pure technical rap, no singing, aggressive modern hip-hop, Italian male rapper, sharp articulate delivery, conversational opening flow, dry punchy vocal, dark minimal piano motif, hard drums, deep sub bass, tight kick and snare, sparse cinematic textures, escalating rhythmic intensity, complex internal rhymes, multisyllabic rhyme patterns, frequent flow switches, syncopated cadence, rapid-fire double-time rap section, extremely fast but clearly articulated extrabeat passage, breathless rhythmic climax, sudden beat switch before fast verse, drums intensify during double-time section, brief beat cuts for emphasis, controlled aggression, introspective lyrical tone, confident transformation arc, stripped-back chorus performed as rhythmic rap rather than singing, dramatic half-time bridge, explosive final verse, modern polished hip-hop production, 92 BPM with double-time sections perceived at 184 BPM',
        lyrics: \`[Intro — Spoken Rap]
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
Che ce l'avevo già.\`
      },
      {
        id: 'heaven-and-hell',
        title: 'Heaven and Hell (Musical)',
        description: 'Duetto musicale generato con Suno AI dal sapore cinematografico e orchestrale.',
        fullDescription: [
          'Un brano dallo stile baroque pop / horror score che esplora una dualità tematica: una discussione tra un demone e un angelo sulle sorti dell\\'umanità.',
          'Generata con Suno AI, questa traccia utilizza un tempo di valzer in minore e atmosfere anni \\'70 per creare un senso di drammaticità epica.'
        ],
        imageUrl: '/Heaven and Hell (Musical).jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/Heaven and Hell (Musical).mp3',
        promptStyle: 'dark cinematic horror score, baroque pop, music box melody, celesta arpeggios, warped tape textures, detuned piano ostinato, fretless bass lines, clean electric guitar arpeggios, steel-string fingerpicking, sparse taiko impacts, whispered choir pads, reversed swell intro, analog tape saturation, mono room reverb, minor key waltz, slow doom pulse, hopeful lift, duality, 1970s film score',
        lyrics: \`[Verse 1: Demon]
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
So please don't let them burn\`
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
        lyrics: \`[Intro]
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
Maybe the monster isn’t me\`
      },
      {
        id: 'spit-it-out',
        title: 'Spit it out',
        description: 'Traccia ansiogena e claustrofobica che unisce ritmiche marziali a cori sussurrati.',
        fullDescription: [
          'Generata con Suno AI, questa canzone ruota attorno all\\'inadeguatezza e alla sensazione di non appartenere.',
          'La produzione miscela elementi di musica classica (archi barocchi, pianoforte scordato) con un forte senso di inquietudine moderna.'
        ],
        imageUrl: '/Spit It Out.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/Spit It Out.mp3',
        promptStyle: 'dark cinematic horror score, baroque strings, detuned piano, whisper choir, low brass stabs, tremolo violins, bowed cymbals, tape saturation, analog room mic, minor-key ostinato, 92 BPM, triplet pulse, march snare, escalating bridge, claustrophobic dread',
        lyrics: \`[Verse]
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
Spit it out\`
      },
      {
        id: 'the-beast',
        title: 'The Beast',
        description: 'Traccia dal sound 80s cupo e martellante, sul perdersi nella propria oscurità.',
        fullDescription: [
          'In "The Beast", generata con Suno AI, si esplora il tema del cattivo, del mostro che si risveglia in un mondo apocalittico.',
          'Il ritmo spezzato, i riverberi degli anni \\'80 e i cori stridenti rafforzano il terrore di un passato dimenticato che riemerge prepotentemente.'
        ],
        imageUrl: '/The Beast.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/The Beast.mp3',
        promptStyle: 'dark cinematic horror, 92 BPM, detuned brass stabs, bass drum hits, bowed low strings, prepared piano clusters, taiko underhits, granular tape texture, mono room reverb, 1980s score mix, fractured march rhythm, unstable build breaks, collapsing arrangement, whispered male vocals, distressed chorus shouts, ominous, apocalyptic dread',
        lyrics: \`[Intro]
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
In a world that's on fire\`
      },
      {
        id: 'for-your-love',
        title: 'For Your Love',
        description: 'Un pezzo melodic drill sulle seconde occasioni e sul cambiamento interiore.',
        fullDescription: [
          'Abbandonando i toni dark, "For Your Love" è un brano dalle vibrazioni UK Drill romantiche ed emotive, incentrato sul cambiare per amore.',
          'Generato tramite Suno AI, fonde il beat drill con una narrazione introspettiva e vulnerabile.'
        ],
        imageUrl: '/For Your Love.jpeg',
        technologies: ['Suno AI', 'Songwriting', 'Prompt Engineering'],
        audioUrl: '/For Your Love.mp3',
        promptStyle: 'melodic drill rap, emotional UK drill, dark romantic atmosphere, introspective male rapper, deep warm male voice, controlled aggressive delivery in the verses, vulnerable melodic singing in the chorus, minor key, haunting piano motif, sparse dark synth pads, sliding 808 bass, heavy sub bass, sharp punchy kick, syncopated drill hi-hats, fast triplet hi-hat rolls, crisp snare, subtle reversed textures, atmospheric vocal samples, nocturnal urban ambience, tense verses, emotional pre-chorus build, big memorable melodic hook, raw but sincere performance, redemption theme, mature street energy, cinematic production, polished modern mix, 142 BPM, half-time feel',
        lyrics: \`[Verse 1]
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
For your love, I changed it all\`
      },\n`;

content = content.replace("      {\n        id: 'curated-playlists',", newSongs + "      {\n        id: 'curated-playlists',");
fs.writeFileSync('src/portfolioData.ts', content);
