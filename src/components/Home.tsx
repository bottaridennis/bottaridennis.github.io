import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useLocalizedPortfolio } from '../portfolioData';
import { 
  ArrowUpRight, 
  Sparkles, 
  Gamepad2, 
  Play, 
  Pause,
  Compass 
} from 'lucide-react';
import DBLogo from './DBLogo';
import { PlayableGame } from './GameModal';
import { useAudio } from '../context/AudioContext';
import { useLanguage } from '../context/LanguageContext';

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

export default function Home({ onProfileClick, onDirectProjectClick, onPlayGame }: HomeProps) {
  const { playTrack, currentTrack, isPlaying: globalIsPlaying, togglePlay } = useAudio();
  const { t, language } = useLanguage();
  const portfolio = useLocalizedPortfolio();
  const avatarSrc = '/Dede.png';

  // Count distinct projects in the portfolio
  const totalProjects = useMemo(() => {
    return new Set(portfolio.flatMap(p => p.projects.map(proj => proj.id))).size;
  }, [portfolio]);

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
          <span>Dennis Bottari · {t.location}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">{totalProjects} {language === 'it' ? 'Progetti Documentati' : 'Documented Projects'}</span>
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
              {language === 'it' ? 'Sviluppatore Web &' : 'Web Developer &'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                {language === 'it' ? 'Creativo Multidisciplinare' : 'Multidisciplinary Creative'}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
              {language === 'it' 
                ? "Esploro l'intersezione tra sviluppo web, videogiochi, sound design, arte 3D ed elettronica. Un approccio che unisce logica e sensibilità estetica."
                : "Exploring the intersection of web development, game design, sound design, 3D art, and electronics. Combining logic with aesthetic sensibility."}
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
              <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-15 dark:opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none">
                <DBLogo className="w-full h-full" />
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
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
                    <Sparkles size={12} />
                    <span>Dennis Bottari</span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                    {t.personalProfile}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Verona, IT • 2026
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-light italic leading-relaxed relative z-10">
                {t.personalQuote}
              </p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 group-hover:text-white transition-colors relative z-10">
                <span className="font-medium">{t.exploreFullProfile}</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          DISCIPLINES CARDS (WARM, SLEEK & INTERACTIVE)
      ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              {t.disciplinesSectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              {t.disciplinesSectionSubtitle}
            </p>
          </div>
          <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
            {portfolio.length} {portfolio.length === 1 ? (language === 'it' ? 'Disciplina' : 'Discipline') : (language === 'it' ? 'Discipline' : 'Disciplines')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolio.map((profile, index) => {
            const Icon = profile.icon;
            const style = disciplineStyles[profile.id] || {
              gradient: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
              glow: 'bg-indigo-500/15',
              accent: '#6366f1',
              badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
            };

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
                      {profile.projects.length} {profile.projects.length === 1 ? (language === 'it' ? 'progetto' : 'project') : (language === 'it' ? 'progetti' : 'projects')}
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
                  {profile.projects.slice(0, 3).map((pj) => (
                    <span 
                      key={pj.id} 
                      className="text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-colors glass-card text-zinc-400 group-hover:text-zinc-300 group-hover:bg-white/[0.06]"
                    >
                      {pj.title}
                    </span>
                  ))}
                  {profile.projects.length > 3 && (
                    <span className="text-[11px] text-zinc-500 pl-1 font-medium">
                      +{profile.projects.length - 3} {t.moreOthers}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          FEATURED PROJECTS QUICK ACCESS (DEFAULT VIEW)
      ======================================================== */}
      <section className="space-y-4 pt-6 border-t border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-zinc-400" />
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
              {t.featuredProjectsTitle}
            </h3>
          </div>
          <span className="text-xs text-zinc-500">
            {t.featuredProjectsSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            { 
              title: portfolio.find(p => p.id === 'web-developer')?.projects.find(pj => pj.id === 'dnd-hub')?.title || 'Forge of Heroes D&D', 
              role: language === 'it' ? 'Web App · Companion 2024' : 'Web App · 2024 Companion', 
              profileId: 'web-developer', 
              projectId: 'dnd-hub', 
              tech: 'React · TS · PWA',
              imageUrl: '/dnd.png'
            },
            { 
              title: portfolio.find(p => p.id === 'game-designer')?.projects.find(pj => pj.id === 'pixel-art-character')?.title || 'Aseprite Animazione 2D', 
              role: language === 'it' ? 'Personaggio 2D Animato' : '2D Animated Character', 
              profileId: 'game-designer', 
              projectId: 'pixel-art-character', 
              tech: 'Aseprite · CC-0 · 60fps',
              isPixelArt: true,
              imageUrl: '/PG.gif'
            },
            { 
              title: portfolio.find(p => p.id === 'musicista')?.projects.find(pj => pj.id === '52-hertz')?.title || '52 Hertz', 
              role: language === 'it' ? 'Composizione Sonora Suno' : 'Suno AI Soundscape', 
              profileId: 'musicista', 
              projectId: '52-hertz', 
              tech: 'Audio · Ambient',
              isAudio: true,
              audioUrl: '/52-Hertz.mp3',
              imageUrl: '/52-Hertz.jpeg'
            },
            { 
              title: portfolio.find(p => p.id === 'elettricista')?.projects.find(pj => pj.id === 'parking-sensor')?.title || 'Sensore Parcheggio', 
              role: language === 'it' ? 'Sistemi & Circuiti IoT' : 'IoT Systems & Hardware', 
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
                  {item.isPixelArt && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>2D Loop</span>
                    </span>
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
                      title={t.listenTrackTooltip}
                    >
                      {currentTrack?.id === item.projectId && globalIsPlaying ? (
                        <Pause size={10} className="fill-purple-300" />
                      ) : (
                        <Play size={10} className="fill-purple-300 ml-0.5" />
                      )}
                      {currentTrack?.id === item.projectId && globalIsPlaying ? t.pauseTrack : t.listenTrack}
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

    </div>
  );
}
