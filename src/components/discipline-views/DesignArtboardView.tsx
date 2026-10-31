import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Palette, Crop, Layers, Compass, Eye, Sparkles, Box } from 'lucide-react';
import { Profile, Project } from '../../types';

interface ArtboardViewProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

export default function DesignArtboardView({ profile, onBack, onSelectProject }: ArtboardViewProps) {
  return (
    <div className="min-h-full px-3 py-4 sm:px-6 md:px-10 max-w-7xl mx-auto space-y-6 font-mono select-none">
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-rose-500/20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-rose-300 border border-rose-500/30 text-xs font-semibold tracking-wide transition-all group cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Torna alla panoramica</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-sans">
            <Palette size={13} className="text-rose-400" />
            <span className="text-rose-300 font-semibold">{profile.projects.length} progetti di design</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FIGMA / ILLUSTRATOR ARTBOARD WORKSPACE
      ========================================================================= */}
      <div className="rounded-2xl bg-[#140b10] border-2 border-rose-500/40 shadow-2xl shadow-rose-950/30 overflow-hidden relative">
        {/* Workspace Header */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#210f18] to-zinc-950 border-b border-rose-500/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shadow-lg shadow-rose-500/20">
              <Palette size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase font-sans">
                  Design Visivo & Brand Identity Studio
                </h1>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Dennis Bottari · Brand Identity, Prototipazione Figma e Grafica Vettoriale
              </p>
            </div>
          </div>
        </div>

        {/* Content Artboards Grid */}
        <div className="p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
            <span className="font-bold text-rose-300">
              ARTBOARD SELEZIONATI // {profile.projects.length} LAYOUT PRONTI
            </span>
            <span className="text-zinc-500">
              TRACCIATI VETTORIALI & RENDER 3D AD ALTA RISOLUZIONE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profile.projects.map((project, idx) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -3 }}
                onClick={() => onSelectProject(project.id)}
                className="p-5 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-rose-500/60 transition-all cursor-pointer group relative overflow-hidden shadow-lg flex flex-col justify-between"
              >
                {/* 8 Bounding Box Transform Handles on card corners */}
                <div className="absolute top-1 left-1 w-2 h-2 bg-rose-400 border border-white" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-rose-400 border border-white" />
                <div className="absolute bottom-1 left-1 w-2 h-2 bg-rose-400 border border-white" />
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-rose-400 border border-white" />

                {/* Artboard Frame Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-[10px]">
                  <span className="text-rose-400 font-bold uppercase">
                    ARTBOARD_{idx + 1}
                  </span>
                  <span className="text-zinc-500 font-mono">1920 × 1080 px</span>
                </div>

                {/* Screenshot Artboard Frame */}
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-zinc-900 border border-zinc-800">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[11px] font-bold text-rose-300 bg-black/80 px-2 py-0.5 rounded border border-rose-500/30">
                    {project.title}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Badges & Inspect */}
                <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-rose-300 border border-rose-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-rose-400 font-bold group-hover:text-rose-300">
                    <span>VEDI ASSET</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-zinc-400 font-sans">
          <div className="flex items-center gap-2">
            <span className="text-rose-400 font-semibold">{profile.projects.length} progetti</span>
            <span className="text-zinc-600">·</span>
            <span>Figma, Adobe Illustrator, Visual Identity</span>
          </div>
          <div className="text-zinc-500 text-[11px]">
            Dennis Bottari Portfolio
          </div>
        </div>
      </div>
    </div>
  );
}
