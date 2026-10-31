import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Gamepad2, 
  Play, 
  Trophy, 
  Sparkles, 
  Heart, 
  Download, 
  ZoomIn, 
  Layers, 
  ShieldCheck, 
  Eye 
} from 'lucide-react';
import { Profile } from '../../types';
import { PlayableGame } from '../GameModal';

interface ArcadeViewProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
  onPlayGame?: (game: PlayableGame) => void;
}

export default function ArcadeConsoleView({ profile, onBack, onSelectProject, onPlayGame }: ArcadeViewProps) {
  const [scanlines, setScanlines] = useState(true);
  const [characterZoom, setCharacterZoom] = useState<number>(3);
  const [showSpriteGrid, setShowSpriteGrid] = useState(true);

  // Find the 2D Animated Character project
  const characterProject = profile.projects.find(p => p.id === 'pixel-art-character') || profile.projects[0];

  return (
    <div className="min-h-full px-3 py-4 sm:px-6 md:px-10 max-w-7xl mx-auto space-y-6 font-mono select-none">
      {/* Top Arcade Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 text-xs font-semibold tracking-wide transition-all group cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Torna alla panoramica</span>
        </button>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setScanlines(s => !s)}
            className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              scanlines 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-zinc-900 text-zinc-500 border-zinc-800'
            }`}
          >
            Filtro CRT: {scanlines ? 'ON' : 'OFF'}
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-sans">
            <Gamepad2 size={13} className="text-emerald-400" />
            <span className="text-emerald-300 font-semibold">{profile.projects.length} giochi & asset</span>
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

        {/* Arcade Header */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#0d2117] to-zinc-950 border-b border-emerald-500/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <Gamepad2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase font-sans">
                  Game Development & Pixel Art Studio
                </h1>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Dennis Bottari · Godot Engine, GameMaker Studio & Aseprite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-zinc-950/90 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-sans text-emerald-300">
            <span>Giochi 2D giocabili direttamente nel browser</span>
          </div>
        </div>

        {/* Arcade Content */}
        <div className="p-5 sm:p-7 space-y-8 relative z-10">

          {/* =========================================================================
              FEATURED ASSET: 2D ANIMATED CHARACTER SHOWCASE (PG.gif + SPRITE SHEET)
          ========================================================================= */}
          <section className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0c1e16] to-[#07130e] border border-emerald-500/40 shadow-xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <h2 className="text-sm sm:text-base font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-400" />
                  <span>PERSONAGGIO 2D ANIMATO // ASEPRITE PIXEL-ART</span>
                </h2>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  CC-0 LICENZA LIBERA
                </span>
              </div>

              {/* Zoom & View Controls */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 text-[11px] flex items-center gap-1">
                  <ZoomIn size={12} />
                  <span>Zoom:</span>
                </span>
                {[1, 2, 3, 4].map(zoom => (
                  <button
                    key={zoom}
                    onClick={() => setCharacterZoom(zoom)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                      characterZoom === zoom
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {zoom}x
                  </button>
                ))}
                <button
                  onClick={() => setShowSpriteGrid(g => !g)}
                  className={`ml-2 px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer border ${
                    showSpriteGrid
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                  }`}
                >
                  GRIGLIA: {showSpriteGrid ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Character Stage & Sprite Inspector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Animated Character Stage (PG.gif running live) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-zinc-950/90 border border-emerald-500/30 relative overflow-hidden group">
                {/* Retro Stage Floor Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

                <div 
                  className="relative transition-all duration-300 flex items-center justify-center my-3"
                  style={{
                    transform: `scale(${characterZoom * 0.45 + 0.5})`,
                    transformOrigin: 'center center'
                  }}
                >
                  <img
                    src="/PG.gif"
                    alt="Personaggio 2D Animato Dennis Bottari"
                    className="w-32 h-32 object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                {/* Ground shadow line */}
                <div className="w-24 h-2 rounded-full bg-emerald-500/30 blur-xs mt-1" />

                <div className="mt-4 text-center space-y-1">
                  <div className="text-xs text-emerald-300 font-bold uppercase">
                    Ciclo di Camminata (Walk Cycle)
                  </div>
                  <div className="text-[11px] text-zinc-400 font-sans">
                    Render HD 240×240px esportato da Aseprite in 6 direzioni
                  </div>
                </div>
              </div>

              {/* Sprite Sheet & Specification Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                      <Layers size={13} className="text-emerald-400" />
                      <span>Sprite Sheet Originale (192 × 24 px · 8 Frame)</span>
                    </span>
                    <span className="text-emerald-400 text-[10px]">24×24 px / frame</span>
                  </div>

                  {/* Complete Sprite Sheet View */}
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 overflow-x-auto">
                    <div className="flex items-center gap-1 justify-center min-w-[280px]">
                      <img
                        src="/sprite.png"
                        alt="Sprite Sheet 2D Dennis Bottari"
                        className="h-12 object-contain border border-emerald-500/30 p-1 bg-zinc-900/80 rounded"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                    {showSpriteGrid && (
                      <div className="grid grid-cols-8 gap-1 mt-2 text-[9px] text-center text-zinc-500 font-mono">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(f => (
                          <div key={f} className="bg-zinc-900/60 py-0.5 rounded border border-zinc-800">
                            F0{f}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  Set completo di animazioni in pixel-art realizzato su <strong>Aseprite</strong> con licenza CC-0. Comprende cicli di movimento fluidi per camminata, corsa, idle e transizioni direzionali, compatibile con i motori <strong>Godot Engine</strong>, <strong>GameMaker</strong> e <strong>Unity</strong>.
                </p>

                {/* Download and Inspection Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="/sprite.png"
                    download="sprite_dennis_bottari.png"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <Download size={13} />
                    <span>SCARICA SPRITE SHEET (.PNG)</span>
                  </a>

                  <a
                    href="/PG.gif"
                    download="personaggio_animato_dennis_bottari.gif"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download size={13} />
                    <span>SALVA GIF ANIMATA (.GIF)</span>
                  </a>

                  <button
                    onClick={() => onSelectProject('pixel-art-character')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 text-xs transition-colors cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>SCHEDA TECNICA</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              ALL GAME PROJECTS GRID
          ========================================================================= */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800 font-sans">
              <span className="font-bold text-zinc-200 uppercase tracking-wider">
                Videogiochi & Progetti ({profile.projects.length})
              </span>
              <span className="text-zinc-400 text-[11px]">
                Supporto mouse, tastiera e gamepad
              </span>
            </div>

            {/* Cartridges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {profile.projects.map((project, idx) => {
                const isPixelArt = project.id === 'pixel-art-character' || project.imageUrl.endsWith('.gif');
                return (
                  <motion.div
                    key={project.id}
                    whileHover={{ y: -4 }}
                    onClick={() => onSelectProject(project.id)}
                    className="p-5 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-emerald-500/60 transition-all cursor-pointer group relative overflow-hidden shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      {/* Project Header */}
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-[11px] font-sans">
                        <span className="text-zinc-200 font-semibold truncate">
                          {project.title}
                        </span>
                        <span className="text-zinc-500 text-[10px] font-mono shrink-0 ml-2">
                          #{idx + 1}
                        </span>
                      </div>

                      {/* Screenshot Frame with Retro CRT Border */}
                      <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className={`w-full h-full transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100 ${
                            isPixelArt ? 'object-contain p-3' : 'object-cover'
                          }`}
                          style={isPixelArt ? { imageRendering: 'pixelated' } : undefined}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
                        
                        <div className="absolute bottom-2 left-2 text-[11px] font-semibold text-emerald-200 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30 font-sans">
                          {project.title}
                        </div>

                        {isPixelArt && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/40">
                            <Sparkles size={10} />
                            <span>ANIMATO</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Badges & Play Call to Action */}
                    <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2 font-sans">
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {project.technologies.slice(0, 2).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-emerald-300 border border-emerald-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {project.links?.some(l => l.url.endsWith('.html') || l.label.toLowerCase().includes('gioca') || l.label.toLowerCase().includes('play')) && onPlayGame && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const preview = project.links?.find(l => l.url.endsWith('.html') || l.label.toLowerCase().includes('gioca') || l.label.toLowerCase().includes('play'));
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

                        <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold group-hover:text-emerald-300">
                          <span>Dettagli</span>
                          <ArrowUpRight size={13} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Arcade Bottom Bar */}
        <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-zinc-400 font-sans">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-semibold">{profile.projects.length} videogiochi & asset</span>
            <span className="text-zinc-600">·</span>
            <span>Godot Engine, GameMaker Studio, Aseprite</span>
          </div>
          <div className="text-zinc-500 text-[11px]">
            Dennis Bottari Portfolio
          </div>
        </div>
      </div>
    </div>
  );
}
