import { motion } from 'motion/react';
import { portfolioData } from '../portfolioData';
import { ArrowUpRight, Sparkles, Compass, Layers, Code2, Music, Palette, Cpu, Gamepad2, User } from 'lucide-react';
import DBLogo from './DBLogo';

interface HomeProps {
  onProfileClick: (id: string | null) => void;
  onDirectProjectClick?: (profileId: string, projectId: string) => void;
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

export default function Home({ onProfileClick, onDirectProjectClick }: HomeProps) {
  // Count distinct projects in the portfolio
  const totalProjects = new Set(
    portfolioData.flatMap(p => p.projects.map(proj => proj.id))
  ).size;

  return (
    <div className="min-h-full px-5 py-8 md:px-12 md:py-14 max-w-7xl mx-auto flex flex-col justify-between space-y-16">
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
            <div className="p-6 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] backdrop-blur-xl relative overflow-hidden shadow-xl shadow-black/20 group">
              <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <DBLogo className="w-full h-full text-white" />
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
                <Sparkles size={13} />
                <span>La Mia Filosofia</span>
              </div>
              <p className="text-sm text-zinc-300 font-light italic leading-relaxed relative z-10">
                "Una mente poliedrica che naviga tra pixel, circuiti, lenti e spartiti. La curiosità è l'unico linguaggio universale."
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 relative z-10">
                <span>Dennis Bottari</span>
                <span className="text-zinc-500">Portfolio 2026</span>
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
              Le Aree di Attività
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Seleziona un ambito per scoprire i progetti e le competenze
            </p>
          </div>
          <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
            {portfolioData.length} Discipline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioData.map((profile, index) => {
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
                      {profile.projects.length} {profile.projects.length === 1 ? 'progetto' : 'progetti'}
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

                {/* Bottom Tags / Highlights */}
                <div className="relative z-10 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
                  {profile.projects.slice(0, 3).map((pj) => (
                    <span 
                      key={pj.id} 
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] text-zinc-400 group-hover:text-zinc-300 group-hover:bg-white/[0.06] transition-colors"
                    >
                      {pj.title}
                    </span>
                  ))}
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

      {/* ========================================================
          FEATURED PROJECTS QUICK ACCESS
      ======================================================== */}
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
            { title: 'Revolution Minds', role: 'Web App & Green Fashion', profileId: 'web-developer', projectId: 'rev-minds', tech: 'JS · CSS · Web' },
            { title: '52 Hertz', role: 'Composizione Sonora Suno', profileId: 'musicista', projectId: '52-hertz', tech: 'Audio · Rap' },
            { title: 'Spooky Shooter', role: 'Videogioco Arcade 2D', profileId: 'game-designer', projectId: 'spooky-shooter', tech: 'GML · HTML5' },
            { title: 'Sensore Parcheggio', role: 'Sistemi & Circuiti IoT', profileId: 'elettricista', projectId: 'parking-sensor', tech: 'Hardware · IoT' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onDirectProjectClick ? onDirectProjectClick(item.profileId, item.projectId) : onProfileClick(item.profileId)}
              className="p-4 rounded-2xl glass-card glass-card-hover text-left flex flex-col justify-between gap-3 group cursor-pointer"
            >
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block truncate">
                  {item.role}
                </span>
                <p className="font-heading font-bold text-white text-base group-hover:text-purple-300 transition-colors mt-0.5 truncate">
                  {item.title}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
                <span className="text-[11px] font-mono-tech">{item.tech}</span>
                <ArrowUpRight size={13} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
