import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Brush, Sparkles, Eye, Box, Layers } from 'lucide-react';
import { Profile, Project } from '../../types';

interface AtelierViewProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

export default function ArtAtelierView({ profile, onBack, onSelectProject }: AtelierViewProps) {
  return (
    <div className="min-h-full px-3 py-6 sm:px-6 md:px-10 lg:py-8 max-w-7xl mx-auto space-y-6 select-none font-mono">
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyan-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-500/30 text-xs font-semibold tracking-wider transition-all group cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>[ ESC ] ESCI A PANORAMICA</span>
        </button>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
            <span>STUDIO:</span>
            <span className="text-cyan-400 font-bold">DIGITAL CLAY & SCULPTING</span>
          </div>
          <span className="text-cyan-300 font-bold">ARCHIVIO COLLEZIONE</span>
        </div>
      </div>

      {/* =========================================================================
          DIGITAL ATELIER & GALLERY CHASSIS
      ========================================================================= */}
      <div className="rounded-2xl bg-[#091518] border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/30 overflow-hidden relative">
        {/* Atelier Header */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#0c2226] to-zinc-950 border-b border-cyan-500/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20">
              <Brush size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase font-mono">
                  ATELIER D&apos;ARTE DIGITALE // SCULTURA 3D & BOZZETTI
                </h1>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold">
                  COLLEZIONE ARCHIVIO
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Dennis Bottari · Scultura Digitale, Espressione Formale & Illustrazione
              </p>
            </div>
          </div>

          {/* Studio Sculpting Modes */}
          <div className="flex items-center gap-2 bg-zinc-950/90 px-3 py-1.5 rounded-xl border border-cyan-500/30 text-xs text-cyan-300 font-mono">
            <span>BRUSH: CLAY</span>
            <span>·</span>
            <span>POLYGONS: DYNAMIC</span>
          </div>
        </div>

        {/* Gallery Artwork Grid */}
        <div className="p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
            <span className="font-bold text-cyan-300">
              OPERE IN ESPOSIZIONE // {profile.projects.length} SCULTURE & CONCEPT
            </span>
            <span className="text-zinc-500">
              MODELLAZIONE 3D & CURA DEL DETTAGLIO
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profile.projects.map((project, idx) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -3 }}
                onClick={() => onSelectProject(project.id)}
                className="p-5 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-cyan-500/60 transition-all cursor-pointer group relative overflow-hidden shadow-lg flex flex-col justify-between"
              >
                {/* Museum Placard Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-[10px]">
                  <span className="text-cyan-400 font-bold uppercase">
                    OPERA N° 0{idx + 1}
                  </span>
                  <span className="text-zinc-500">DIGITAL CLAY</span>
                </div>

                {/* Artwork Viewport */}
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-zinc-900 border border-zinc-800">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[11px] font-bold text-cyan-300 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    {project.title}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Badges & View */}
                <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-cyan-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-cyan-400 font-bold group-hover:text-cyan-300">
                    <span>DETTAGLI OPERA</span>
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
            <span className="text-cyan-400">●</span>
            <span>STUDIO LIGHTING: DYNAMIC TURNTABLE</span>
          </div>
          <div className="flex items-center gap-3">
            <span>ESPRESSIONE PLASTICA DEI VOLUMI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
