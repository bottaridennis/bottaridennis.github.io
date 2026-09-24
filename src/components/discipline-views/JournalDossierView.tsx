import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, User, Compass, Award, Calendar, MapPin, Sparkles, Filter } from 'lucide-react';
import { Profile, Project } from '../../types';
import { portfolioData } from '../../portfolioData';

interface DossierViewProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

const filterCategories = [
  { id: 'all', label: 'Tutti' },
  { id: 'web-developer', label: 'Web Dev' },
  { id: 'game-designer', label: 'Game Design' },
  { id: 'musicista', label: 'Musica' },
  { id: 'graphic-designer', label: 'Grafica' },
  { id: 'elettricista', label: 'Elettronica' },
  { id: 'artista', label: 'Arte 3D' },
];

export default function JournalDossierView({ profile, onBack, onSelectProject }: DossierViewProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const avatarSrc = '/Dede.png';

  const getProjectCategory = (projectId: string) => {
    for (const p of portfolioData) {
      if (p.id !== 'persona' && p.projects.some(pj => pj.id === projectId)) {
        return p.id;
      }
    }
    return 'other';
  };

  const displayedProjects = activeFilter !== 'all'
    ? profile.projects.filter(pj => getProjectCategory(pj.id) === activeFilter)
    : profile.projects;

  return (
    <div className="min-h-full px-3 py-6 sm:px-6 md:px-10 lg:py-8 max-w-7xl mx-auto space-y-6 select-none font-mono">
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-slate-300 border border-slate-500/30 text-xs font-semibold tracking-wider transition-all group cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>[ ESC ] ESCI A PANORAMICA</span>
        </button>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
            <MapPin size={13} className="text-slate-300" />
            <span className="text-slate-300 font-bold">VERONA, VENETO, ITALIA</span>
          </div>
          <span className="text-zinc-500">DOSSIER MULTIDISCIPLINARE</span>
        </div>
      </div>

      {/* =========================================================================
          EDITORIAL FIELD DOSSIER & BIOGRAPHICAL CHASSIS
      ========================================================================= */}
      <div className="rounded-2xl bg-[#0e1217] border-2 border-slate-500/40 shadow-2xl shadow-slate-950/40 overflow-hidden relative">
        {/* Dossier Header */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#141b24] to-zinc-950 border-b border-slate-500/30 p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Passport Photo Badge */}
            <div className="md:col-span-4 flex flex-col items-center sm:items-start">
              <div className="relative">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl p-1 bg-gradient-to-tr from-slate-500 via-zinc-400 to-slate-600 shadow-xl">
                  <div className="w-full h-full rounded-[14px] overflow-hidden bg-zinc-950">
                    <img 
                      src={avatarSrc} 
                      alt="Dennis Bottari"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Official Stamp */}
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-zinc-950 border border-slate-400 text-[10px] text-slate-300 font-bold shadow-lg">
                  VERONA · VR
                </div>
              </div>
            </div>

            {/* Biography Monograph */}
            <div className="md:col-span-8 space-y-3 font-sans">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">
                <Compass size={14} />
                <span>DOSSIER PERSONALE & FILOSOFIA DI LAVORO</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight">
                Dennis Bottari
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {profile.intro}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 font-mono text-xs">
                {profile.links?.map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-6 py-3 bg-zinc-950/80 border-b border-zinc-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-zinc-500 flex items-center gap-1.5 mr-2 font-bold shrink-0">
            <Filter size={12} /> FILTRA:
          </span>
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === cat.id
                  ? 'bg-white text-zinc-950 font-bold shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
            <span className="font-bold text-slate-300">
              ARCHIVIO PROGETTI SELEZIONATI ({displayedProjects.length})
            </span>
            <span className="text-zinc-500">
              PERCORSO MULTIDISCIPLINARE COMPLETO
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -3 }}
                onClick={() => onSelectProject(project.id)}
                className="p-5 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-slate-400/60 transition-all cursor-pointer group relative overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-[10px]">
                  <span className="text-slate-400 font-bold uppercase">
                    PROGETTO 0{idx + 1}
                  </span>
                  <span className="text-zinc-500">{getProjectCategory(project.id).toUpperCase()}</span>
                </div>

                <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-zinc-900 border border-zinc-800">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[11px] font-bold text-slate-200 bg-black/80 px-2 py-0.5 rounded border border-slate-500/30">
                    {project.title}
                  </div>
                </div>

                <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-slate-300 border border-slate-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-300 font-bold group-hover:text-white">
                    <span>LEGGI SCHEDA</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-2.5 flex flex-wrap items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">●</span>
            <span>VERONA // DENNIS BOTTARI</span>
          </div>
          <div className="flex items-center gap-3">
            <span>MULTIDISCIPLINARY CREATIVE ARCHIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
