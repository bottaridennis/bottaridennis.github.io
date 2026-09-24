import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Gamepad2, Play, Trophy, Crosshair, Sparkles, Flame, Heart } from 'lucide-react';
import { Profile, Project } from '../../types';
import { PlayableGame } from '../GameModal';

interface ArcadeViewProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
  onPlayGame?: (game: PlayableGame) => void;
}

export default function ArcadeConsoleView({ profile, onBack, onSelectProject, onPlayGame }: ArcadeViewProps) {
  const [scanlines, setScanlines] = useState(true);

  return (
    <div className="min-h-full px-3 py-6 sm:px-6 md:px-10 lg:py-8 max-w-7xl mx-auto space-y-6 select-none font-mono">
      {/* Top Arcade Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 text-xs font-semibold tracking-wider transition-all group cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>[ ESC ] ESCI A PANORAMICA</span>
        </button>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setScanlines(s => !s)}
            className={`px-3 py-1 rounded border text-[11px] font-bold transition-colors cursor-pointer ${
              scanlines 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-zinc-900 text-zinc-500 border-zinc-800'
            }`}
          >
            CRT SCANLINES: {scanlines ? 'ON' : 'OFF'}
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-950 border border-emerald-500/30 text-amber-400 font-bold">
            <Trophy size={13} />
            <span>HI-SCORE: 99,990</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ARCADE CABINET CHASSIS (CRT RETRO MONITOR)
      ========================================================================= */}
      <div className="rounded-2xl bg-[#09140f] border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/30 overflow-hidden relative">
        {/* Optional Scanlines Texture */}
        {scanlines && (
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20 opacity-60" />
        )}

        {/* Arcade Marquee Header */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#0d2117] to-zinc-950 border-b border-emerald-500/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <Gamepad2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-widest uppercase font-mono">
                  RETRO ARCADE // GAMEMAKER STUDIO & GML
                </h1>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                  60 FPS LOCKED
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Dennis Bottari · Game Designer, Meccaniche di Gioco & Pixel Audio
              </p>
            </div>
          </div>

          {/* Retro HUD Metrics */}
          <div className="flex items-center gap-4 bg-zinc-950/90 px-4 py-2 rounded-xl border border-emerald-500/30 text-xs">
            <div className="flex items-center gap-1 text-rose-400">
              <Heart size={14} className="fill-rose-500 text-rose-500 animate-pulse" />
              <span className="font-bold text-white">HP: 100%</span>
            </div>
            <div className="text-emerald-400 font-bold">
              1UP: 48,200
            </div>
            <div className="text-amber-400 font-bold">
              COINS: 99
            </div>
          </div>
        </div>

        {/* Arcade Content */}
        <div className="p-5 sm:p-7 space-y-6 relative z-10">
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
            <span className="font-bold text-emerald-300">
              SELECT GAME CARTRIDGE // {profile.projects.length} TITOLI PRONTI
            </span>
            <span className="text-zinc-500">
              CONTROLLI SUPPORTATI: TASTIERA & GAMEPAD
            </span>
          </div>

          {/* Cartridges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profile.projects.map((project, idx) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -4 }}
                onClick={() => onSelectProject(project.id)}
                className="p-5 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-emerald-500/60 transition-all cursor-pointer group relative overflow-hidden shadow-lg flex flex-col justify-between"
              >
                {/* Cartridge Slot Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                    STAGE 0{idx + 1}
                  </span>
                  <span className="text-amber-400 font-bold">RANK: S-TIER</span>
                </div>

                {/* Screenshot Frame with Retro CRT Border */}
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-zinc-900 border border-zinc-800">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[11px] font-bold text-emerald-300 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    {project.title}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Badges & Play Call to Action */}
                <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-emerald-300 border border-emerald-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.links?.some(l => l.type === 'preview') && onPlayGame && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const preview = project.links?.find(l => l.type === 'preview');
                          if (preview) {
                            onPlayGame({
                              id: project.id,
                              title: project.title,
                              url: preview.url,
                              description: project.description,
                              technologies: project.technologies,
                            });
                          }
                        }}
                        className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer"
                      >
                        <Play size={11} className="fill-zinc-950" />
                        <span>GIOCA</span>
                      </button>
                    )}

                    <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold group-hover:text-emerald-300">
                      <span>SCHEDA</span>
                      <ArrowUpRight size={13} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arcade Bottom Cabinet Bar */}
        <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-2.5 flex flex-wrap items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">INSERT COIN TO CONTINUE</span>
          </div>
          <div className="flex items-center gap-3">
            <span>DIFFICOLTÀ: NORMALE</span>
            <span>·</span>
            <span>GAME ENGINE: GML NATIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
