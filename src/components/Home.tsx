import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../portfolioData';
import { 
  ArrowUpRight, 
  Sparkles, 
  Compass, 
  Search, 
  X, 
  SearchX, 
  Layers, 
  Gamepad2, 
  Play, 
  Pause 
} from 'lucide-react';
import DBLogo from './DBLogo';
import { Project } from '../types';
import { PlayableGame } from './GameModal';
import { useAudio } from '../context/AudioContext';

interface HomeProps {
  onProfileClick: (id: string | null) => void;
  onDirectProjectClick?: (profileId: string, projectId: string) => void;
  onPlayGame?: (game: PlayableGame) => void;
}

// Visual theme configurations for disciplines
const disciplineStyles: Record<string, { gradient: string; glow: string; accent: string; badge: string }> = {
  'web-developer': {
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    glow: 'bg-blue-500/15',
    accent: '#3b82f6',
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20'
  },
  'game-designer': {
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    glow: 'bg-emerald-500/15',
    accent: '#10b981',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
  },
  'elettricista': {
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
    glow: 'bg-amber-500/15',
    accent: '#f59e0b',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
  },
  'musicista': {
    gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
    glow: 'bg-purple-500/15',
    accent: '#a855f7',
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20'
  },
  'graphic-designer': {
    gradient: 'from-rose-500/20 via-rose-500/5 to-transparent',
    glow: 'bg-rose-500/15',
    accent: '#f43f5e',
    badge: 'bg-rose-500/10 text-rose-300 border-rose-500/20'
  },
  'artista': {
    gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    glow: 'bg-cyan-500/15',
    accent: '#06b6d4',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
  },
  'persona': {
    gradient: 'from-slate-500/20 via-slate-500/5 to-transparent',
    glow: 'bg-slate-500/15',
    accent: '#94a3b8',
    badge: 'bg-slate-500/10 text-slate-300 border-slate-500/20'
  },
};

const SUGGESTED_TAGS = ['Web Developer', 'Game', 'Musica', 'IoT', 'Blender', 'Suno', 'JavaScript', 'HTML5'];

export default function Home({ onProfileClick, onDirectProjectClick, onPlayGame }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { playTrack, currentTrack, isPlaying: globalIsPlaying, togglePlay } = useAudio();
  const avatarSrc = '/Dede.png';

  // Count distinct projects in the portfolio
  const totalProjects = useMemo(() => {
    return new Set(portfolioData.flatMap(p => p.projects.map(proj => proj.id))).size;
  }, []);

  const query = searchQuery.trim().toLowerCase();

  // Filter profiles in real-time
  const filteredProfiles = useMemo(() => {
    if (!query) return portfolioData;
    return portfolioData.filter((profile) => {
      const matchesTitle = profile.title.toLowerCase().includes(query);
      const matchesIntro = profile.intro.toLowerCase().includes(query);
      const hasMatchingProject = profile.projects.some(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.technologies.some((t) => t.toLowerCase().includes(query))
      );
      return matchesTitle || matchesIntro || hasMatchingProject;
    });
  }, [query]);

  // Filter projects in real-time across all profiles
  const matchingProjects = useMemo(() => {
    if (!query) return [];
    const results: { project: Project; profileId: string; profileTitle: string }[] = [];
    const seen = new Set<string>();

    portfolioData.forEach((profile) => {
      profile.projects.forEach((proj) => {
        if (seen.has(proj.id)) return;
        const matchesTitle = proj.title.toLowerCase().includes(query);
        const matchesDesc = proj.description.toLowerCase().includes(query);
        const matchesTech = proj.technologies.some((t) => t.toLowerCase().includes(query));
        const matchesProfile = profile.title.toLowerCase().includes(query);

        if (matchesTitle || matchesDesc || matchesTech || matchesProfile) {
          seen.add(proj.id);
          results.push({
            project: proj,
            profileId: profile.id,
            profileTitle: profile.title,
          });
        }
      });
    });

    return results;
  }, [query]);

  const handleProjectClick = (profileId: string, projectId: string) => {
    if (onDirectProjectClick) {
      onDirectProjectClick(profileId, projectId);
    } else {
      onProfileClick(profileId);
    }
  };

  const hasNoResults = query !== '' && filteredProfiles.length === 0 && matchingProjects.length === 0;

  return (
    <div className="min-h-full px-5 py-8 md:px-12 md:py-14 max-w-7xl mx-auto flex flex-col justify-between space-y-12 sm:space-y-16">
      {/* ========================================================
          ELEGANT HERO GREETING
      ======================================================== */}
      <section className="space-y-8">
        {/* Status Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs font-medium text-zinc-300"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Dennis Bottari · Verona, Italia</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">{totalProjects} Progetti Documentati</span>
        </motion.div>

        {/* Hero Headings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 space-y-4"
          >
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Sviluppatore Web &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                Creativo Multidisciplinare
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
              Esploro l'intersezione tra sviluppo web, videogiochi, sound design, arte 3D ed elettronica. Un approccio che unisce logica e sensibilità estetica.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-4"
          >
            <div 
              onClick={() => onProfileClick('persona')}
              className="p-6 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.08] hover:border-purple-500/40 backdrop-blur-xl relative overflow-hidden shadow-xl shadow-black/20 group cursor-pointer transition-all duration-300"
            >
              <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <DBLogo className="w-full h-full text-white" />
              </div>

              {/* Personal Photo & Identity */}
              <div className="flex items-center gap-3.5 mb-4 relative z-10">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/35 transition-all">
                    <div className="w-full h-full rounded-[14px] bg-zinc-950 overflow-hidden">
                      <img 
                        src={avatarSrc} 
                        alt="Dennis Bottari"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zinc-950 shadow-sm" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
                    <Sparkles size={12} />
                    <span>Dennis Bottari</span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                    Profilo Personale
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Verona, IT • Anno 2026
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-light italic leading-relaxed relative z-10">
                "Una mente poliedrica che naviga tra pixel, circuiti, lenti e spartiti. La curiosità è l'unico linguaggio universale."
              </p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 group-hover:text-white transition-colors relative z-10">
                <span className="font-medium">Esplora profilo completo</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          REAL-TIME SEARCH INPUT BAR
      ======================================================== */}
      <section className="space-y-3.5">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
            <Search size={18} className="text-zinc-400 group-focus-within:text-purple-400 transition-colors" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca discipline, progetti o tecnologie (es. React, GameMaker, Suno, IoT, Blender...)"
            className="w-full pl-11 sm:pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl glass-card bg-zinc-950/60 border border-white/[0.1] hover:border-white/20 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 text-white placeholder:text-zinc-500 text-xs sm:text-sm outline-none transition-all shadow-xl backdrop-blur-xl"
            aria-label="Cerca discipline e progetti"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 sm:pr-4 flex items-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Cancella ricerca"
              aria-label="Cancella ricerca"
            >
              <div className="p-1 rounded-full bg-white/[0.08] hover:bg-white/[0.15]">
                <X size={14} />
              </div>
            </button>
          )}
        </div>

        {/* Search Helper: Quick Tags / Live Filter Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
          {!query ? (
            <div className="flex flex-wrap items-center gap-1.5 text-zinc-400">
              <span className="text-[11px] text-zinc-500">Suggeriti:</span>
              {SUGGESTED_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium glass-card hover:bg-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>
                  Filtro attivo per <strong className="text-white">"{searchQuery}"</strong>:
                </span>
                <span className="text-zinc-400 font-mono-tech">
                  {filteredProfiles.length} {filteredProfiles.length === 1 ? 'disciplina' : 'discipline'} · {matchingProjects.length} {matchingProjects.length === 1 ? 'progetto' : 'progetti'}
                </span>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-purple-300 hover:text-purple-200 underline underline-offset-4 cursor-pointer"
              >
                Rimuovi filtro
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SEARCH EMPTY STATE
      ======================================================== */}
      {hasNoResults && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 rounded-3xl glass-card text-center space-y-4 max-w-xl mx-auto border border-white/[0.08]"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
            <SearchX size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-lg text-white">
              Nessun risultato trovato
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Nessun progetto o disciplina corrisponde a <span className="text-zinc-200">"{searchQuery}"</span>. Prova con un'altra parola chiave come <em>React</em>, <em>Suno</em>, <em>IoT</em>, <em>Game</em> o <em>Blender</em>.
            </p>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 rounded-xl bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-all cursor-pointer shadow-md"
          >
            Reimposta tutti i filtri
          </button>
        </motion.div>
      )}

      {/* ========================================================
          MATCHING PROJECTS (SHOWN WHEN SEARCHING)
      ======================================================== */}
      {query !== '' && matchingProjects.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-purple-400" />
              <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
                Progetti Corrispondenti ({matchingProjects.length})
              </h2>
            </div>
            <span className="text-xs text-zinc-500">
              Accesso diretto al dettaglio del progetto
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingProjects.map(({ project, profileId, profileTitle }) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => handleProjectClick(profileId, project.id)}
                className="group p-4 rounded-2xl glass-card glass-card-hover text-left flex flex-col justify-between gap-4 cursor-pointer border border-white/[0.08] hover:border-purple-500/30 transition-all"
              >
                {/* Artwork Thumbnail */}
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-zinc-300 border border-white/10 font-medium">
                      {profileTitle}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight size={15} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Pill-shaped Tech Stack Badges in Glass-Card Style + Direct Actions */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] glass-card text-zinc-300 font-medium inline-flex items-center gap-1 border border-white/[0.08]"
                      >
                        <span className="w-1 h-1 rounded-full bg-purple-400" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Quick playable game launcher */}
                  {project.links?.some(l => l.url.endsWith('.html')) && onPlayGame && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const gLink = project.links?.find(l => l.url.endsWith('.html'));
                        if (gLink) {
                          onPlayGame({
                            id: project.id,
                            title: project.title,
                            url: gLink.url,
                            technologies: project.technologies,
                            description: project.description,
                          });
                        }
                      }}
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-sm"
                      title="Gioca subito nel browser"
                    >
                      <Gamepad2 size={12} />
                      <span>Gioca</span>
                    </button>
                  )}

                  {/* Quick audio player trigger */}
                  {project.audioUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentTrack?.id === project.id && globalIsPlaying) {
                          togglePlay();
                        } else {
                          playTrack({
                            id: project.id,
                            title: project.title,
                            artist: 'Dennis Bottari · Suno AI',
                            audioUrl: project.audioUrl!,
                            imageUrl: project.imageUrl,
                            profileId: profileId,
                          });
                        }
                      }}
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-sm"
                      title="Ascolta brano con il mini player"
                    >
                      {currentTrack?.id === project.id && globalIsPlaying ? (
                        <Pause size={12} className="fill-purple-300" />
                      ) : (
                        <Play size={12} className="fill-purple-300 ml-0.5" />
                      )}
                      <span>{currentTrack?.id === project.id && globalIsPlaying ? 'Pausa' : 'Ascolta'}</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          DISCIPLINES CARDS (WARM, SLEEK & INTERACTIVE)
      ======================================================== */}
      {filteredProfiles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                {query ? 'Discipline Filtrate' : 'Le Aree di Attività'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                {query 
                  ? 'Ambiti che contengono corrispondenze con la tua ricerca'
                  : 'Seleziona un ambito per scoprire i progetti e le competenze'}
              </p>
            </div>
            <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
              {filteredProfiles.length} {filteredProfiles.length === 1 ? 'Disciplina' : 'Discipline'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProfiles.map((profile, index) => {
              const Icon = profile.icon;
              const style = disciplineStyles[profile.id] || {
                gradient: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
                glow: 'bg-indigo-500/15',
                accent: '#6366f1',
                badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
              };

              // Highlight matching projects if searching
              const matchingInThisProfile = query 
                ? profile.projects.filter(p => 
                    p.title.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.technologies.some(t => t.toLowerCase().includes(query))
                  )
                : profile.projects;

              return (
                <motion.button
                  key={profile.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onProfileClick(profile.id)}
                  className="group text-left p-6 rounded-3xl glass-card glass-card-hover relative flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Ambient Soft Glow Background on Hover */}
                  <div 
                    className={`absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none ${style.glow}`}
                  />

                  {/* Top Row: Icon + Progetti Count + Arrow */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-105"
                      style={{ 
                        backgroundColor: `${style.accent}20`,
                        color: style.accent,
                        border: `1px solid ${style.accent}40`
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-300 font-medium">
                        {query && matchingInThisProfile.length > 0 
                          ? `${matchingInThisProfile.length} match`
                          : `${profile.projects.length} ${profile.projects.length === 1 ? 'progetto' : 'progetti'}`}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-white text-zinc-400 group-hover:text-zinc-950 flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-2 relative z-10 mb-6">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-zinc-100 transition-colors">
                      {profile.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 font-normal">
                      {profile.intro}
                    </p>
                  </div>

                  {/* Bottom Tags / Highlights (Pill-shaped Glass-Card style) */}
                  <div className="relative z-10 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
                    {profile.projects.slice(0, 3).map((pj) => {
                      const isMatch = query && (
                        pj.title.toLowerCase().includes(query) ||
                        pj.technologies.some(t => t.toLowerCase().includes(query))
                      );

                      return (
                        <span 
                          key={pj.id} 
                          className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-colors ${
                            isMatch
                              ? 'glass-card bg-purple-500/20 text-purple-200 border-purple-500/40 font-semibold'
                              : 'glass-card text-zinc-400 group-hover:text-zinc-300 group-hover:bg-white/[0.06]'
                          }`}
                        >
                          {pj.title}
                        </span>
                      );
                    })}
                    {profile.projects.length > 3 && (
                      <span className="text-[11px] text-zinc-500 pl-1 font-medium">
                        +{profile.projects.length - 3} altri
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================
          FEATURED PROJECTS QUICK ACCESS (DEFAULT VIEW)
      ======================================================== */}
      {!query && (
        <section className="space-y-4 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-zinc-400" />
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
                Progetti in Evidenza
              </h3>
            </div>
            <span className="text-xs text-zinc-500">
              Accesso rapido ai lavori principali
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              { 
                title: 'Revolution Minds', 
                role: 'Web App & Green Fashion', 
                profileId: 'web-developer', 
                projectId: 'rev-minds', 
                tech: 'JS · CSS · Web' 
              },
              { 
                title: '52 Hertz', 
                role: 'Composizione Sonora Suno', 
                profileId: 'musicista', 
                projectId: '52-hertz', 
                tech: 'Audio · Rap',
                isAudio: true,
                audioUrl: '/52-Hertz.mp3',
                imageUrl: '/52-Hertz.jpeg'
              },
              { 
                title: 'Spooky Shooter', 
                role: 'Videogioco Arcade 2D', 
                profileId: 'game-designer', 
                projectId: 'spooky-shooter', 
                tech: 'GML · HTML5',
                isGame: true,
                gameUrl: '/spookyshooter/index.html'
              },
              { 
                title: 'Sensore Parcheggio', 
                role: 'Sistemi & Circuiti IoT', 
                profileId: 'elettricista', 
                projectId: 'parking-sensor', 
                tech: 'Hardware · IoT' 
              }
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onDirectProjectClick ? onDirectProjectClick(item.profileId, item.projectId) : onProfileClick(item.profileId)}
                className="p-4 rounded-2xl glass-card glass-card-hover text-left flex flex-col justify-between gap-3 group cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block truncate">
                      {item.role}
                    </span>
                    {item.isGame && onPlayGame && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayGame({
                            id: item.projectId,
                            title: item.title,
                            url: item.gameUrl!,
                            technologies: ['GameMaker', 'HTML5', 'GML'],
                            description: 'Sopravvivi alle orde di zucche!'
                          });
                        }}
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-all flex items-center gap-1 cursor-pointer"
                        title="Gioca nel Browser"
                      >
                        <Gamepad2 size={11} />
                        Gioca
                      </button>
                    )}
                    {item.isAudio && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentTrack?.id === item.projectId && globalIsPlaying) {
                            togglePlay();
                          } else {
                            playTrack({
                              id: item.projectId,
                              title: item.title,
                              artist: 'Dennis Bottari · Suno AI',
                              audioUrl: item.audioUrl!,
                              imageUrl: item.imageUrl!,
                              profileId: item.profileId,
                            });
                          }
                        }}
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-all flex items-center gap-1 cursor-pointer"
                        title="Ascolta traccia"
                      >
                        {currentTrack?.id === item.projectId && globalIsPlaying ? (
                          <Pause size={10} className="fill-purple-300" />
                        ) : (
                          <Play size={10} className="fill-purple-300 ml-0.5" />
                        )}
                        {currentTrack?.id === item.projectId && globalIsPlaying ? 'Pausa' : 'Ascolta'}
                      </button>
                    )}
                  </div>

                  <p className="font-heading font-bold text-white text-base group-hover:text-purple-300 transition-colors mt-1.5 truncate">
                    {item.title}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
                  <span className="text-[11px] font-mono-tech">{item.tech}</span>
                  <ArrowUpRight size={13} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
