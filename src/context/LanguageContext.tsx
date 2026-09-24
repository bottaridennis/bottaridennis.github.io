import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'it' | 'en';

export interface Translations {
  // Navigation
  overview: string;
  explore: string;
  disciplines: string;
  home: string;
  site: string;
  github: string;
  selectDiscipline: string;
  projectsCount: string;
  onlineStatus: string;
  location: string;
  creativeDeveloper: string;

  // Quick Actions Bar / Footer Toolbar
  quickActions: string;
  toggleThemeLight: string;
  toggleThemeDark: string;
  searchPortfolio: string;
  searchShortcut: string;
  languageToggle: string;
  languageCurrent: string;
  scrollToTop: string;

  // Search Modal
  searchTitle: string;
  searchPlaceholder: string;
  searchAll: string;
  noResultsFound: string;
  tryDifferentSearch: string;
  pressEscToClose: string;
  navigateWithKeys: string;
  allDisciplines: string;
  openProject: string;
  openDiscipline: string;
  suggestedTags: string;
  recentSearches: string;
  matches: string;

  // Footer
  availableForWork: string;
  availableShort: string;
  copied: string;
  copyEmail: string;
  contactMe: string;

  // Discipline Profile Names
  profileTitles: Record<string, string>;

  // Home Hero & Sections
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  documentedProjects: string;
  personalProfile: string;
  personalQuote: string;
  exploreFullProfile: string;
  suggested: string;
  activeFilterFor: string;
  removeFilter: string;
  resetAllFilters: string;
  noResultsHeading: string;
  noResultsText: string;
  matchingProjectsTitle: string;
  directAccessProject: string;
  disciplinesSectionTitle: string;
  disciplinesFilteredTitle: string;
  disciplinesSectionSubtitle: string;
  disciplinesFilteredSubtitle: string;
  featuredProjectsTitle: string;
  featuredProjectsSubtitle: string;
  playGame: string;
  playGameTooltip: string;
  listenTrack: string;
  pauseTrack: string;
  listenTrackTooltip: string;
  viewDetails: string;
  openLink: string;
  moreOthers: string;

  // Profile Page
  backToOverview: string;
  generalOverviewBadge: string;
  disciplineBadge: string;
  archivedProjectsCount: string;
  mainFocus: string;
  toolsAndSkills: string;
  educationSection: string;
  filterAll: string;

  // Project Page
  backToDiscipline: string;
  playableGameBadge: string;
  playInBrowser: string;
  overviewHeading: string;
  technologiesHeading: string;
  collaboratorsHeading: string;
  liveDemo: string;
  sourceCode: string;
  listenAudioTrack: string;
  lyricsTitle: string;
  sunoPromptTitle: string;
  copyPrompt: string;
  copiedPrompt: string;
  previousProject: string;
  nextProject: string;
}

const translationsData: Record<Language, Translations> = {
  it: {
    // Navigation
    overview: 'Panoramica Generale',
    explore: 'Esplora',
    disciplines: 'Discipline',
    home: 'Home',
    site: 'Sito',
    github: 'GitHub',
    selectDiscipline: 'Seleziona Area Creativa',
    projectsCount: 'progetti',
    onlineStatus: 'Disponibile',
    location: 'Verona, Italia',
    creativeDeveloper: 'Creative Developer',

    // Quick Actions Bar / Footer Toolbar
    quickActions: 'Azioni Rapide',
    toggleThemeLight: 'Passa a Tema Chiaro',
    toggleThemeDark: 'Passa a Tema Scuro',
    searchPortfolio: 'Cerca nel portfolio',
    searchShortcut: '⌘K',
    languageToggle: 'Cambia lingua in Inglese',
    languageCurrent: 'IT',
    scrollToTop: 'Torna in cima',

    // Search Modal
    searchTitle: 'Cerca nel Portfolio',
    searchPlaceholder: 'Cerca per progetto, tecnologia (es. React, Python, Suno) o disciplina...',
    searchAll: 'Tutto',
    noResultsFound: 'Nessun risultato trovato per',
    tryDifferentSearch: 'Prova con un termine diverso o esplora le categorie qui sotto.',
    pressEscToClose: 'Premi ESC per chiudere',
    navigateWithKeys: 'Usa ↑↓ per navigare, ↵ per selezionare',
    allDisciplines: 'Tutte le Discipline',
    openProject: 'Apri Progetto',
    openDiscipline: 'Vai alla Disciplina',
    suggestedTags: 'Ricerche suggerite',
    recentSearches: 'Consigliati',
    matches: 'risultati',

    // Footer
    availableForWork: 'Disponibile per nuove collaborazioni',
    availableShort: 'Disponibile',
    copied: 'Copiato!',
    copyEmail: 'Copia email',
    contactMe: 'Contattami',

    // Discipline Profile Names
    profileTitles: {
      'web-developer': 'Web Developer',
      'game-designer': 'Game Designer',
      'elettricista': 'Elettricista & IoT',
      'musicista': 'Musicista & Producer',
      'graphic-designer': 'Graphic Designer',
      'artista': 'Artista & Modellatore 3D',
      'persona': 'Chi Sono & Filosofia',
    },

    // Home Hero & Sections
    heroTitlePrefix: 'Sviluppatore Web &',
    heroTitleHighlight: 'Creativo Multidisciplinare',
    heroSubtitle: "Esploro l'intersezione tra sviluppo web, videogiochi, sound design, arte 3D ed elettronica. Un approccio che unisce logica e sensibilità estetica.",
    documentedProjects: 'Progetti Documentati',
    personalProfile: 'Profilo Personale',
    personalQuote: '"Una mente poliedrica che naviga tra pixel, circuiti, lenti e spartiti. La curiosità è l\'unico linguaggio universale."',
    exploreFullProfile: 'Esplora profilo completo',
    suggested: 'Suggeriti:',
    activeFilterFor: 'Filtro attivo per',
    removeFilter: 'Rimuovi filtro',
    resetAllFilters: 'Reimposta tutti i filtri',
    noResultsHeading: 'Nessun risultato trovato',
    noResultsText: "Nessun progetto o disciplina corrisponde alla tua ricerca. Prova con parole chiave come React, Suno, IoT, Game o Blender.",
    matchingProjectsTitle: 'Progetti Corrispondenti',
    directAccessProject: 'Accesso diretto al dettaglio del progetto',
    disciplinesSectionTitle: 'Le Aree di Attività',
    disciplinesFilteredTitle: 'Discipline Filtrate',
    disciplinesSectionSubtitle: 'Seleziona un ambito per scoprire i progetti e le competenze',
    disciplinesFilteredSubtitle: 'Ambiti che contengono corrispondenze con la tua ricerca',
    featuredProjectsTitle: 'Progetti in Evidenza',
    featuredProjectsSubtitle: 'Accesso rapido ai lavori principali',
    playGame: 'Gioca',
    playGameTooltip: 'Gioca subito nel browser',
    listenTrack: 'Ascolta',
    pauseTrack: 'Pausa',
    listenTrackTooltip: 'Ascolta brano con il mini player',
    viewDetails: 'Vedi scheda e dettagli',
    openLink: 'Apri →',
    moreOthers: 'altri',

    // Profile Page
    backToOverview: 'Torna alla Panoramica',
    generalOverviewBadge: 'Panoramica Completa',
    disciplineBadge: 'Disciplina',
    archivedProjectsCount: 'Progetti Archiviati',
    mainFocus: 'Focus principale',
    toolsAndSkills: 'Strumenti & Competenze',
    educationSection: 'Percorso di Studi',
    filterAll: 'Tutti',

    // Project Page
    backToDiscipline: 'Torna a',
    playableGameBadge: 'Videogioco Giocabile',
    playInBrowser: 'Gioca nel Browser',
    overviewHeading: 'Descrizione del Progetto',
    technologiesHeading: 'Stack Tecnologico',
    collaboratorsHeading: 'Collaboratori & Ruoli',
    liveDemo: 'Visita Sito',
    sourceCode: 'Codice Sorgente',
    listenAudioTrack: 'Ascolta il Brano',
    lyricsTitle: 'Testo del Brano',
    sunoPromptTitle: 'Prompt e Stile Musicale Suno AI',
    copyPrompt: 'Copia Prompt',
    copiedPrompt: 'Prompt Copiato!',
    previousProject: 'Progetto precedente',
    nextProject: 'Progetto successivo',
  },
  en: {
    // Navigation
    overview: 'General Overview',
    explore: 'Explore',
    disciplines: 'Disciplines',
    home: 'Home',
    site: 'Website',
    github: 'GitHub',
    selectDiscipline: 'Select Creative Discipline',
    projectsCount: 'projects',
    onlineStatus: 'Available',
    location: 'Verona, Italy',
    creativeDeveloper: 'Creative Developer',

    // Quick Actions Bar / Footer Toolbar
    quickActions: 'Quick Actions',
    toggleThemeLight: 'Switch to Light Theme',
    toggleThemeDark: 'Switch to Dark Theme',
    searchPortfolio: 'Search portfolio',
    searchShortcut: '⌘K',
    languageToggle: 'Switch language to Italian',
    languageCurrent: 'EN',
    scrollToTop: 'Jump to top',

    // Search Modal
    searchTitle: 'Search Portfolio',
    searchPlaceholder: 'Search projects, technologies (e.g. React, Python, Suno), or disciplines...',
    searchAll: 'All',
    noResultsFound: 'No results found for',
    tryDifferentSearch: 'Try a different search query or explore the categories below.',
    pressEscToClose: 'Press ESC to close',
    navigateWithKeys: 'Use ↑↓ to navigate, ↵ to select',
    allDisciplines: 'All Disciplines',
    openProject: 'Open Project',
    openDiscipline: 'Go to Discipline',
    suggestedTags: 'Suggested searches',
    recentSearches: 'Recommended',
    matches: 'results',

    // Footer
    availableForWork: 'Available for new collaborations',
    availableShort: 'Available',
    copied: 'Copied!',
    copyEmail: 'Copy email',
    contactMe: 'Contact Me',

    // Discipline Profile Names
    profileTitles: {
      'web-developer': 'Web Developer',
      'game-designer': 'Game Designer',
      'elettricista': 'Electrician & IoT',
      'musicista': 'Musician & Producer',
      'graphic-designer': 'Graphic Designer',
      'artista': 'Artist & 3D Modeler',
      'persona': 'About Me & Philosophy',
    },

    // Home Hero & Sections
    heroTitlePrefix: 'Web Developer &',
    heroTitleHighlight: 'Multidisciplinary Creative',
    heroSubtitle: 'Exploring the intersection of web development, game design, sound design, 3D art, and electronics. Combining logic with aesthetic sensibility.',
    documentedProjects: 'Documented Projects',
    personalProfile: 'Personal Profile',
    personalQuote: '"A multifaceted mind navigating pixels, circuits, lenses, and musical scores. Curiosity is the only universal language."',
    exploreFullProfile: 'Explore full profile',
    suggested: 'Suggested:',
    activeFilterFor: 'Active filter for',
    removeFilter: 'Clear filter',
    resetAllFilters: 'Reset all filters',
    noResultsHeading: 'No results found',
    noResultsText: 'No project or discipline matches your search query. Try keywords like React, Suno, IoT, Game, or Blender.',
    matchingProjectsTitle: 'Matching Projects',
    directAccessProject: 'Direct access to project details',
    disciplinesSectionTitle: 'Creative Disciplines',
    disciplinesFilteredTitle: 'Filtered Disciplines',
    disciplinesSectionSubtitle: 'Select a field to explore projects and competencies',
    disciplinesFilteredSubtitle: 'Fields containing matches for your query',
    featuredProjectsTitle: 'Featured Projects',
    featuredProjectsSubtitle: 'Quick access to selected works',
    playGame: 'Play',
    playGameTooltip: 'Play now in browser',
    listenTrack: 'Listen',
    pauseTrack: 'Pause',
    listenTrackTooltip: 'Play track in persistent mini-player',
    viewDetails: 'View project details',
    openLink: 'Open →',
    moreOthers: 'more',

    // Profile Page
    backToOverview: 'Back to Overview',
    generalOverviewBadge: 'Complete Overview',
    disciplineBadge: 'Discipline',
    archivedProjectsCount: 'Archived Projects',
    mainFocus: 'Core Focus',
    toolsAndSkills: 'Tools & Competencies',
    educationSection: 'Education & Career',
    filterAll: 'All',

    // Project Page
    backToDiscipline: 'Back to',
    playableGameBadge: 'Playable Video Game',
    playInBrowser: 'Play in Browser',
    overviewHeading: 'Project Overview',
    technologiesHeading: 'Tech Stack',
    collaboratorsHeading: 'Collaborators & Roles',
    liveDemo: 'Visit Website',
    sourceCode: 'Source Code',
    listenAudioTrack: 'Listen to Track',
    lyricsTitle: 'Song Lyrics',
    sunoPromptTitle: 'Suno AI Prompt & Sonic Style',
    copyPrompt: 'Copy Prompt',
    copiedPrompt: 'Prompt Copied!',
    previousProject: 'Previous project',
    nextProject: 'Next project',
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-language') as Language;
      if (saved === 'it' || saved === 'en') return saved;
      return 'it';
    }
    return 'it';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'it' ? 'en' : 'it'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translationsData[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
