// spells.js
const PLACEHOLDER_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#141a33'/>
        <stop offset='0.55' stop-color='#2a1240'/>
        <stop offset='1' stop-color='#0f2d2a'/>
      </linearGradient>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='.2'/>
        <feComponentTransfer>
          <feFuncA type='table' tableValues='0 .25'/>
        </feComponentTransfer>
      </filter>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <rect width='100%' height='100%' filter='url(#n)' opacity='.55'/>
    <g fill='rgba(255,255,255,.12)'>
      <circle cx='220' cy='160' r='110'/>
      <circle cx='980' cy='520' r='170'/>
      <circle cx='720' cy='220' r='90'/>
    </g>
    <g fill='rgba(255,255,255,.7)' font-family='Inter, Arial' text-anchor='middle'>
      <text x='600' y='330' font-size='46' font-weight='800'>IMMAGINE</text>
      <text x='600' y='380' font-size='22' opacity='.85'>placeholder</text>
    </g>
  </svg>
`);

window.SPELLS = [
  {
    name: "Aiuto",
    school: "Abiurazione",
    level: "2",
    castingTime: "1 azione",
    range: "9 metri",
    components: "V, S, M (una sottile striscia di stoffa bianca)",
    duration: "8 ore",
    img: 'Images/spells/aid.jpg',
    description:
      "Rafforzi la vitalità delle creature con energia protettiva. Scegli fino a tre creature entro gittata: per la durata dell’incantesimo, i loro punti ferita massimi e attuali aumentano di 5.\n\nQuando l’incantesimo termina, i punti ferita massimi tornano al valore normale e gli eventuali punti ferita in eccesso vengono persi."
  },
  {
    name: "Benedizione dell’Arma",
    school: "Trasmutazione",
    level: "2",
    castingTime: "1 azione",
    range: "Contatto",
    components: "V, S",
    duration: "Concentrazione, fino a 1 ora",
    img: 'Images/spells/Holy Weapon.jpg',
    description:
      "Attraverso il contatto infondi potere magico in un’arma non magica. Per la durata dell’incantesimo, l’arma diventa magica e fornisce un bonus di +1 ai tiri per colpire effettuati con essa."
  },
  {
    name: "Benedizione",
    school: "Ammaliamento",
    level: "1",
    castingTime: "1 azione",
    range: "9 metri",
    components: "V, S, M (una spruzzata di acqua sacra)",
    duration: "Concentrazione, fino a 1 minuto",
    img: 'Images/spells/Bless.jpg',
    description:
      "Invochi favore divino su un piccolo gruppo di alleati. Scegli fino a tre creature entro gittata: ogni volta che una di esse effettua un tiro per colpire o un tiro salvezza prima che l’incantesimo termini, può tirare un d4 e aggiungere il risultato al tiro.\n\nUna creatura può beneficiare di un solo dado per tiro."
  },
  {
    name: "Comando",
    school: "Ammaliamento",
    level: "1",
    castingTime: "1 azione",
    range: "18 metri",
    components: "V",
    duration: "1 round",
    img: 'Images/spells/Command.jpg',
    description:
      "Pronunci un comando di una sola parola rivolto a una creatura che puoi vedere entro gittata. Il bersaglio deve superare un tiro salvezza su Saggezza; in caso di fallimento, nel suo prossimo turno segue il comando nel modo più diretto possibile.\n\nIl comando non ha effetto se è direttamente dannoso per la creatura."
  },
  {
    name: "Cura Ferite",
    school: "Invocazione",
    level: "1",
    castingTime: "1 azione",
    range: "Contatto",
    components: "V, S",
    duration: "Istantanea",
    img: 'Images/spells/Cure Wounds.jpg',
    description:
      "Canalizzi energia curativa attraverso il tuo tocco. Una creatura vivente che tocchi recupera punti ferita pari a 1d8 più il tuo modificatore di Carisma.\n\nL’incantesimo non ha effetto su costrutti o non morti.\n\nSe lanci l’incantesimo usando uno slot di livello superiore, la cura aumenta di 1d8 per ogni livello dello slot oltre il 1°."
  },
  {
    name: "Duello Obbligato",
    school: "Ammaliamento",
    level: "1",
    castingTime: "1 azione bonus",
    range: "9 metri",
    components: "V",
    duration: "Concentrazione, fino a 1 minuto",
    img: 'Images/spells/Compelled Duel.jpg',
    description:
      "Sfidi una creatura entro gittata, costringendola a concentrarsi su di te. Il bersaglio deve superare un tiro salvezza su Saggezza; in caso di fallimento, ha svantaggio ai tiri per colpire contro creature diverse da te.\n\nL’incantesimo termina se ti allontani troppo dal bersaglio o se attacchi un’altra creatura."
  },
  {
    name: "Eroismo",
    school: "Ammaliamento",
    level: "1",
    castingTime: "1 azione",
    range: "Contatto",
    components: "V, S",
    duration: "Concentrazione, fino a 1 minuto",
    img: 'Images/spells/Heroism.jpg',
    description:
      "Rafforzi il coraggio di una creatura tramite il contatto. Per la durata dell’incantesimo, il bersaglio è immune alla condizione spaventato e ottiene punti ferita temporanei pari al tuo modificatore di Carisma all’inizio di ogni suo turno.\n\nQuesti punti ferita temporanei non si accumulano e svaniscono quando l’incantesimo termina."
  },
  {
    name: "Individuazione del Bene e del Male",
    school: "Divinazione",
    level: "1",
    castingTime: "1 azione",
    range: "Sé",
    components: "V, S",
    duration: "Concentrazione, fino a 10 minuti",
    img: 'Images/spells/Detect Evil and Good.jpg',
    description:
      "Per la durata dell’incantesimo, percepisci la presenza di creature aberranti, celestiali, demoniache, elementali, folletti e non morti entro 9 metri, purché non siano protette da copertura totale.\n\nRiconosci inoltre la presenza di luoghi o oggetti consacrati o profanati."
  },
  {
    name: "Individuazione del Magico",
    school: "Divinazione",
    level: "1",
    castingTime: "1 azione",
    range: "Sé",
    components: "V, S",
    duration: "Concentrazione, fino a 10 minuti",
    img: 'Images/spells/Detect Magic.jpg',
    description:
      "Per la durata dell’incantesimo, percepisci la presenza di magia entro 9 metri. Se percepisci magia, puoi usare la tua azione per riconoscerne la scuola associata a ogni aura visibile."
  },
  {
    name: "Protezione dal Bene e dal Male",
    school: "Abiurazione",
    level: "1",
    castingTime: "1 azione",
    range: "Contatto",
    components: "V, S, M (acqua sacra o polvere d’argento)",
    duration: "Concentrazione, fino a 10 minuti",
    img: 'Images/spells/Protection from Evil and Good.jpg',
    description:
      "Una creatura toccata ha vantaggio ai tiri salvezza contro aberranti, celestiali, demoni, elementali, folletti e non morti.\n\nTali creature hanno inoltre svantaggio ai tiri per colpire contro il bersaglio."
  },
  {
    name: "Punizione Accecante",
    school: "Invocazione",
    level: "2",
    castingTime: "1 azione bonus",
    range: "Sé",
    components: "V",
    duration: "Concentrazione, fino a 1 minuto",
    img: 'Images/spells/Blinding Smite.jpg',
    description:
      "La prossima volta che colpisci una creatura con un attacco in mischia prima che l’incantesimo termini, l’attacco infligge 2d6 danni radianti extra.\n\nIl bersaglio deve superare un tiro salvezza su Costituzione o essere accecato fino alla fine dell’incantesimo."
  },
  {
    name: "Punizione Tonante",
    school: "Invocazione",
    level: "1",
    castingTime: "1 azione bonus",
    range: "Sé",
    components: "V",
    duration: "Concentrazione, fino a 1 minuto",
    img: 'Images/spells/Thunderous Smite.jpg',
    description:
      "La prossima volta che colpisci una creatura con un attacco in mischia prima che l’incantesimo termini, l’attacco infligge 2d6 danni da tuono extra.\n\nIl bersaglio deve superare un tiro salvezza su Forza o essere spinto di 3 metri e cadere prono."
  },
  {
    name: "Santuario",
    school: "Abiurazione",
    level: "1",
    castingTime: "1 azione bonus",
    range: "9 metri",
    components: "V, S, M (un piccolo specchio d’argento)",
    duration: "1 minuto",
    img: 'Images/spells/Sanctuary.jpg',
    description:
      "Proteggi una creatura entro gittata. Le creature che tentano di attaccare il bersaglio devono prima superare un tiro salvezza su Saggezza; in caso di fallimento, devono scegliere un nuovo bersaglio o perdere l’attacco.\n\nL’incantesimo termina se la creatura protetta attacca o lancia un incantesimo che colpisce un nemico."
  },
  {
    name: "Scudo della Fede",
    school: "Abiurazione",
    level: "1",
    castingTime: "1 azione bonus",
    range: "18 metri",
    components: "V, S, M (un piccolo pergamena con un simbolo sacro)",
    duration: "Concentrazione, fino a 10 minuti",
    img: 'Images/spells/Shield of Faith.jpg',
    description:
      "Una creatura a tua scelta entro gittata è avvolta da un’aura protettiva e ottiene un bonus di +2 alla Classe Armatura per la durata dell’incantesimo."
  },
  {
    name: "Taumaturgia",
    school: "Trasmutazione",
    level: "Trucchetto",
    castingTime: "1 azione",
    range: "9 metri",
    components: "V",
    duration: "Fino a 1 minuto",
    img: 'Images/spells/Thaumaturgy.jpg',
    description:
      "Manifesti uno dei seguenti effetti minori:\n\n• la tua voce rimbomba fino a tre volte più forte del normale\n• fiamme tremolano, si intensificano o cambiano colore\n• porte o finestre non bloccate si aprono o si chiudono di colpo\n• produci un suono istantaneo proveniente da un punto entro gittata"
  },
  {
    name: "Tocco Gelido",
    school: "Necromanzia",
    level: "Trucchetto",
    castingTime: "1 azione",
    range: "36 metri",
    components: "V, S",
    duration: "1 round",
    img: 'Images/spells/Chill Touch.jpg',
    description:
      "Crei una mano scheletrica spettrale che emerge verso una creatura entro gittata. Effettua un attacco con incantesimo a distanza contro il bersaglio. Se l’attacco colpisce, la creatura subisce 1d8 danni necrotici e non può recuperare punti ferita fino all’inizio del tuo prossimo turno.\n\nSe il bersaglio è un non morto, ha inoltre svantaggio ai tiri per colpire contro di te fino alla fine del suo prossimo turno.\n\nIl danno dell’incantesimo aumenta quando raggiungi determinati livelli: 2d8 al 5° livello, 3d8 all’11° livello e 4d8 al 17° livello."
  },
  {
    name: "Invisibilità",
    school: "Illusione",
    level: "2",
    castingTime: "1 azione",
    range: "Contatto",
    components: "V, S, M (una ciglia immersa in resina)",
    duration: "Concentrazione, fino a 1 ora",
    img: 'Images/spells/Invisibility.jpg',
    special: "Puoi lanciare questo incantesimo una volta senza spendere slot per ogni riposo lungo. Dopo aver usato questo lancio gratuito, Invisibilità può essere lanciato normalmente consumando slot incantesimo.",
    description:
      "Una creatura che tocchi diventa invisibile per la durata dell’incantesimo. Tutto ciò che la creatura indossa o trasporta diventa invisibile finché rimane sulla sua persona.\n\nL’incantesimo termina anticipatamente se il bersaglio attacca o lancia un incantesimo.\n\nSe lanci Invisibilità usando uno slot di livello superiore, puoi rendere invisibile una creatura aggiuntiva per ogni livello dello slot oltre il 2°."
  },
  {
    name: "Infliggi Ferite",
    school: "Necromanzia",
    level: "1",
    castingTime: "1 azione",
    range: "Contatto",
    components: "V, S",
    duration: "Istantanea",
    img: 'Images/spells/Inflict Wounds.jpg',
    special: "Puoi lanciare questo incantesimo una volta senza spendere slot per ogni riposo lungo. Dopo aver utilizzato questo lancio gratuito, Infliggi Ferite può essere lanciato normalmente consumando slot incantesimo.",
    description:
      "Canalizzi energia necrotica distruttiva attraverso il tuo tocco. Effettua un attacco con incantesimo in mischia contro una creatura entro gittata. Se colpisci, il bersaglio subisce 3d10 danni necrotici.\n\nQuando lanci Infliggi Ferite usando uno slot di livello superiore, i danni aumentano di 1d10 per ogni livello dello slot oltre il 1°."
  },
  {
  name: "Beffa crudele",
  school: "Ammaliamento",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "18 metri",
  components: "V",
  duration: "Istantanea",
  img: "Images/spells/Vicious Mockery.jpg",
  description:
    "Una creatura entro gittata deve superare un TS Saggezza o subire 1d6 danni psichici e avere svantaggio al prossimo tiro per colpire prima della fine del suo prossimo turno.\n\nIl danno aumenta ai livelli superiori."
},
{
  name: "Colpo accurato",
  school: "Divinazione",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "Sé",
  components: "S, M (arma)",
  duration: "Istantanea",
  img: "Images/spells/True Strike.jpg",
  description:
    "Effettui un attacco usando la tua caratteristica da incantatore invece di Forza o Destrezza. L’attacco infligge danni normali dell’arma o radiosi.\n\nInfligge danni extra ai livelli superiori."
},
{
  name: "Dardo di fuoco",
  school: "Invocazione",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "36 metri",
  components: "V, S",
  duration: "Istantanea",
  img: "Images/spells/Fire Bolt.jpg",
  description:
    "Attacco con incantesimo a distanza che infligge 1d10 danni da fuoco. Gli oggetti infiammabili possono incendiarsi.\n\nIl danno aumenta ai livelli superiori."
},
{
  name: "Raggio di gelo",
  school: "Invocazione",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "18 metri",
  components: "V, S",
  duration: "1 round",
  img: "Images/spells/Ray of Frost.jpg",
  description:
    "Infligge 1d8 danni da freddo e riduce la velocità del bersaglio di 3 metri fino al tuo prossimo turno."
},
{
  name: "Stretta folgorante",
  school: "Invocazione",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "Contatto",
  components: "V, S",
  duration: "1 round",
  img: "Images/spells/Shocking Grasp.jpg",
  description:
    "Infligge 1d8 danni da fulmine e il bersaglio non può usare reazioni fino all’inizio del suo prossimo turno."
},
{
  name: "Tocco gelido",
  school: "Necromanzia",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "36 metri",
  components: "V, S",
  duration: "1 round",
  img: "Images/spells/Chill Touch.jpg",
  description:
    "Infligge 1d8 danni necrotici e impedisce il recupero di PF fino al tuo prossimo turno."
},
{
  name: "Mano magica",
  school: "Evocazione",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "9 metri",
  components: "V, S",
  duration: "1 minuto",
  img: "Images/spells/Mage Hand.jpg",
  description:
    "Crea una mano spettrale che può manipolare oggetti leggeri ma non attaccare."
},
{
  name: "Luce",
  school: "Invocazione",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "Contatto",
  components: "V, M",
  duration: "1 ora",
  img: "Images/spells/Light.jpg",
  description:
    "Un oggetto emette luce intensa e fioca per la durata."
},
{
  name: "Luci danzanti",
  school: "Illusione",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "36 metri",
  components: "V, S, M",
  duration: "Concentrazione, fino a 1 minuto",
  img: "Images/spells/Dancing Lights.jpg",
  description:
    "Crea fino a quattro luci fluttuanti che puoi muovere."
},
{
  name: "Illusione minore",
  school: "Illusione",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "9 metri",
  components: "S, M",
  duration: "1 minuto",
  img: "Images/spells/Minor Illusion.jpg",
  description:
    "Crea un suono o un’immagine statica illusoria."
},
{
  name: "Messaggio",
  school: "Trasmutazione",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "36 metri",
  components: "S, M",
  duration: "1 round",
  img: "Images/spells/Message.jpg",
  description:
    "Invia un messaggio sussurrato a una creatura entro gittata."
},
{
  name: "Prestidigitazione",
  school: "Trasmutazione",
  level: "Trucchetto",
  castingTime: "1 azione",
  range: "3 metri",
  components: "V, S",
  duration: "Fino a 1 ora",
  img: "Images/spells/Prestidigitation.jpg",
  description:
    "Produce piccoli effetti magici innocui."
},
{
  name: "Riparare",
  school: "Trasmutazione",
  level: "Trucchetto",
  castingTime: "1 minuto",
  range: "Contatto",
  components: "V, S, M",
  duration: "Istantanea",
  img: "Images/spells/Mending.jpg",
  description:
    "Ripara una singola rottura o strappo in un oggetto."
}

];
