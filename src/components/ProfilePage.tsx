import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, GraduationCap, Wrench, Layers, Filter } from 'lucide-react';
import { Profile } from '../types';
import { portfolioData } from '../portfolioData';
import ProjectCard from './ProjectCard';

interface ProfilePageProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

const colorMap: Record<string, { accent: string; bgSoft: string; border: string }> = {
  'web-developer': { accent: '#3b82f6', bgSoft: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)' },
  'game-designer': { accent: '#10b981', bgSoft: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  'elettricista': { accent: '#f59e0b', bgSoft: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  'musicista': { accent: '#a855f7', bgSoft: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.3)' },
  'graphic-designer': { accent: '#f43f5e', bgSoft: 'rgba(244, 63, 94, 0.12)', border: 'rgba(244, 63, 94, 0.3)' },
  'artista': { accent: '#06b6d4', bgSoft: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)' },
  'persona': { accent: '#94a3b8', bgSoft: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.3)' },
};

const filterCategories = [
  { id: 'all', label: 'Tutti' },
  { id: 'web-developer', label: 'Web Dev' },
  { id: 'game-designer', label: 'Game Design' },
  { id: 'musicista', label: 'Musica' },
  { id: 'graphic-designer', label: 'Grafica' },
  { id: 'elettricista', label: 'Elettronica' },
  { id: 'artista', label: 'Arte 3D' },
];

export default function ProfilePage({ profile, onBack, onSelectProject }: ProfilePageProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const IconComponent = profile.icon;
  const theme = colorMap[profile.id] || { accent: '#6366f1', bgSoft: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.3)' };

  // Helper to find the original discipline of a project
  const getProjectCategory = (projectId: string) => {
    for (const p of portfolioData) {
      if (p.id !== 'persona' && p.projects.some(pj => pj.id === projectId)) {
        return p.id;
      }
    }
    return 'other';
  };

  // Filter projects if viewing the general profile (persona)
  const isGeneralProfile = profile.id === 'persona';
  const displayedProjects = isGeneralProfile && activeFilter !== 'all'
    ? profile.projects.filter(pj => getProjectCategory(pj.id) === activeFilter)
    : profile.projects;

  return (
    <div className="min-h-full px-5 py-8 md:px-12 md:py-14 max-w-7xl mx-auto space-y-16">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors group text-xs font-medium cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.1] transition-all">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Torna alla Panoramica</span>
        </motion.button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <span>Dennis Bottari</span>
          <span>/</span>
          <span className="text-zinc-200">{profile.title}</span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="space-y-8">
        {isGeneralProfile ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 left-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Profile Photo */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
              <div className="relative group">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl p-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/20 group-hover:shadow-purple-500/35 transition-all duration-300">
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-zinc-950 relative">
                    <img 
                      src="/about.png" 
                      alt="Dennis Bottari"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-[11px] font-medium text-white/90">Dennis Bottari</span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-zinc-950/90 border border-white/10 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-zinc-300">Verona, IT</span>
                </div>
              </div>
            </div>

            {/* Profile Intro & Actions */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: theme.bgSoft, color: theme.accent, border: `1px solid ${theme.border}` }}
              >
                <IconComponent size={15} />
                <span>Panoramica Completa</span>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
              >
                {profile.title}
              </motion.h1>

              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
                {profile.intro}
              </p>

              {/* Action Links & Stats */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {profile.links && profile.links.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-zinc-950 border border-white/10 hover:border-white text-xs font-semibold transition-all duration-300 shadow-md group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}

                <div className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-zinc-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span><strong className="text-white">{profile.projects.length}</strong> Progetti Archiviati</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: theme.bgSoft, color: theme.accent, border: `1px solid ${theme.border}` }}
              >
                <IconComponent size={15} />
                <span>Disciplina</span>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight"
              >
                {profile.title}
              </motion.h1>

              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
                {profile.intro}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-4">
              {/* Action Links (CV, website, etc.) */}
              {profile.links && profile.links.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  {profile.links.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white text-zinc-200 hover:text-zinc-950 border border-white/10 hover:border-white text-xs font-semibold transition-all duration-300 shadow-md group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              )}

              {/* Quick Metrics */}
              <div className="p-5 rounded-2xl glass-card grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[11px]">Progetti archiviati</span>
                  <span className="font-heading text-xl font-bold text-white mt-0.5 block">
                    {profile.projects.length}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Località</span>
                  <span className="font-heading text-xl font-bold text-zinc-200 mt-0.5 block">Verona</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Core Skills & Tools */}
      {profile.skills && profile.skills.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Wrench size={16} className="text-zinc-400" />
              <h2 className="font-heading text-base font-bold text-white">
                Competenze & Tecnologie
              </h2>
            </div>
            <span className="text-xs text-zinc-500 font-medium">
              {profile.skills.length} aree di padronanza
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {profile.skills.map((skill) => (
              <div 
                key={skill}
                className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 text-xs font-medium text-zinc-300 hover:text-white transition-all flex items-center gap-2"
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: theme.accent }}
                />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Path */}
      {profile.education && profile.education.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
            <GraduationCap size={16} className="text-zinc-400" />
            <h2 className="font-heading text-base font-bold text-white">
              Percorso Formativo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.education.map((edu, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-3xl glass-card space-y-2.5"
              >
                <span 
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block"
                  style={{ backgroundColor: theme.bgSoft, color: theme.accent }}
                >
                  {edu.year}
                </span>

                <h3 className="font-heading text-lg font-bold text-white">
                  {edu.institution}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-zinc-400" />
            <h2 className="font-heading text-xl font-bold text-white">
              Progetti Realizzati
            </h2>
            <span className="text-xs text-zinc-400 font-medium px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08]">
              {displayedProjects.length}
            </span>
          </div>

          {/* Category Filter Pills (when in Profilo Generale) */}
          {isGeneralProfile && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {filterCategories.map((cat) => {
                const count = cat.id === 'all'
                  ? profile.projects.length
                  : profile.projects.filter(p => getProjectCategory(p.id) === cat.id).length;

                if (count === 0 && cat.id !== 'all') return null;

                const isSelected = activeFilter === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-zinc-950 font-semibold shadow-md'
                        : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`ml-1.5 text-[10px] ${isSelected ? 'text-zinc-600' : 'text-zinc-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                themeColor={profile.themeColor} 
                onClick={() => onSelectProject(project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-3xl glass-card">
            <p className="text-zinc-400 text-sm">
              Nessun progetto trovato per questa categoria.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
