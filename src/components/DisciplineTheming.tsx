import React from 'react';
import { 
  Code, 
  Gamepad2, 
  Zap, 
  Music, 
  Palette, 
  Brush, 
  User, 
  Cpu, 
  Terminal, 
  Sliders, 
  Crop, 
  Feather, 
  Compass, 
  Sparkles,
  Radio,
  Layers
} from 'lucide-react';

export interface DisciplineCraftTheme {
  id: string;
  name: string;
  craftSubtitle: string;
  tagline: string;
  accent: string;
  accentGlow: string;
  accentBg: string;
  borderClass: string;
  cardStyleClass: string;
}

export const DISCIPLINE_THEMES: Record<string, DisciplineCraftTheme> = {
  'web-developer': {
    id: 'web-developer',
    name: 'Web Developer',
    craftSubtitle: 'Code & Frontend Engineering',
    tagline: 'TypeScript · React · Clean Architecture',
    accent: '#3b82f6',
    accentGlow: 'rgba(59, 130, 246, 0.25)',
    accentBg: 'rgba(59, 130, 246, 0.08)',
    borderClass: 'border-blue-500/25 hover:border-blue-400/50',
    cardStyleClass: 'font-sans',
  },
  'game-designer': {
    id: 'game-designer',
    name: 'Game Designer',
    craftSubtitle: 'Interactive 2D & Game Mechanics',
    tagline: 'GameMaker · GML · Level & Sound Design',
    accent: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.25)',
    accentBg: 'rgba(16, 185, 129, 0.08)',
    borderClass: 'border-emerald-500/25 hover:border-emerald-400/50',
    cardStyleClass: 'font-sans',
  },
  'elettricista': {
    id: 'elettricista',
    name: 'Elettricista & Maker',
    craftSubtitle: 'IoT, Hardware & Circuiti',
    tagline: 'Arduino · Microcontrollori · Domotica',
    accent: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.25)',
    accentBg: 'rgba(245, 158, 11, 0.08)',
    borderClass: 'border-amber-500/25 hover:border-amber-400/50',
    cardStyleClass: 'font-sans',
  },
  'musicista': {
    id: 'musicista',
    name: 'Musicista & AI Audio',
    craftSubtitle: 'Composizione Sonora & Suno AI',
    tagline: 'Sound Design · Prompt Engineering · Rap & Trap',
    accent: '#a855f7',
    accentGlow: 'rgba(168, 85, 247, 0.25)',
    accentBg: 'rgba(168, 85, 247, 0.08)',
    borderClass: 'border-purple-500/25 hover:border-purple-400/50',
    cardStyleClass: 'font-sans',
  },
  'graphic-designer': {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    craftSubtitle: 'Brand Identity & Modellazione 3D',
    tagline: 'Blender 3D · Layout Grafico · Vector Art',
    accent: '#f43f5e',
    accentGlow: 'rgba(244, 63, 94, 0.25)',
    accentBg: 'rgba(244, 63, 94, 0.08)',
    borderClass: 'border-rose-500/25 hover:border-rose-400/50',
    cardStyleClass: 'font-sans',
  },
  'artista': {
    id: 'artista',
    name: 'Artista & Illustrazione',
    craftSubtitle: 'Scultura Digitale & Arte Visiva',
    tagline: 'Scultura 3D · Tratteggio Tradizionale & Concept',
    accent: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.25)',
    accentBg: 'rgba(6, 182, 212, 0.08)',
    borderClass: 'border-cyan-500/25 hover:border-cyan-400/50',
    cardStyleClass: 'font-sans',
  },
  'persona': {
    id: 'persona',
    name: 'Percorso Personale',
    craftSubtitle: 'Biografia & Filosofia di Lavoro',
    tagline: 'Curiosità Continua · Verona · Versatilità',
    accent: '#94a3b8',
    accentGlow: 'rgba(148, 163, 184, 0.2)',
    accentBg: 'rgba(148, 163, 184, 0.08)',
    borderClass: 'border-slate-500/25 hover:border-slate-300/40',
    cardStyleClass: 'font-sans',
  },
};

/**
 * Thematic background textures and SVG visual motifs for each craft
 */
export function DisciplineBackgroundPattern({ profileId }: { profileId: string }) {
  switch (profileId) {
    case 'web-developer':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.14] group-hover:opacity-[0.22] transition-opacity duration-500">
          {/* Subtle IDE Editor Line numbers and code watermark */}
          <div className="absolute top-3 right-4 font-mono text-[10px] text-blue-300 select-none text-right leading-relaxed tracking-wider">
            <div>01 &lt;App layout=&quot;flex&quot;&gt;</div>
            <div>02   const [code] = useDev();</div>
            <div>03   return &lt;UI /&gt;;</div>
            <div>04 &lt;/App&gt;</div>
          </div>
          {/* Subtle Code Grid */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="web-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#web-grid)" />
          </svg>
        </div>
      );

    case 'game-designer':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500">
          {/* Pixel Crosshairs & CRT Scanlines */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Corner Pixel Brackets */}
          <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-widest">
            <span>[ + ] 60 FPS</span>
          </div>
          <svg className="absolute bottom-2 right-2 w-16 h-16 text-emerald-500/40" viewBox="0 0 64 64" fill="none">
            <path d="M4 16h8v8H4zm48 0h8v8h-8zM16 48h32v8H16zM20 28h8v8h-8zm16 0h8v8h-8z" fill="currentColor" />
          </svg>
        </div>
      );

    case 'elettricista':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.14] group-hover:opacity-[0.22] transition-opacity duration-500">
          {/* PCB Conductive Traces & Solder Pad Vias */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.6">
              {/* Circuit paths */}
              <path d="M0,40 L60,40 L90,70 L180,70" />
              <path d="M140,0 L140,50 L200,110 L280,110" />
              <path d="M220,160 L260,160 L290,130 L340,130" />
              {/* Solder vias */}
              <circle cx="60" cy="40" r="3" fill="#f59e0b" />
              <circle cx="180" cy="70" r="3" fill="#f59e0b" />
              <circle cx="200" cy="110" r="3" fill="#f59e0b" />
              <circle cx="260" cy="160" r="3" fill="#f59e0b" />
            </g>
          </svg>
          <div className="absolute top-2.5 right-3 font-mono text-[9px] text-amber-400 font-semibold tracking-wider">
            +5V · GND · I²C
          </div>
        </div>
      );

    case 'musicista':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.16] group-hover:opacity-[0.25] transition-opacity duration-500">
          {/* Equalizer Frequency Bars & Vinyl Concentric Rings */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border border-purple-500/30 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-purple-400/25 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-purple-300/20" />
            </div>
          </div>
          {/* Subtle Graphic Soundwave in Top-Right */}
          <div className="absolute top-3 right-4 flex items-end gap-1 h-5">
            {[40, 70, 100, 50, 85, 30, 95, 60, 80, 45].map((h, i) => (
              <span
                key={i}
                className="w-0.5 bg-purple-400/70 rounded-full"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      );

    case 'graphic-designer':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.14] group-hover:opacity-[0.22] transition-opacity duration-500">
          {/* Professional Layout Crop Marks & Vector Anchor Handles */}
          {/* Top-Right Crop Marks */}
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-rose-400/60" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-rose-400/60" />
          {/* Vector Bézier Anchor Point Motif */}
          <svg className="absolute bottom-3 right-3 w-28 h-14" viewBox="0 0 120 60" fill="none">
            <path d="M10,45 C40,10 80,10 110,45" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="10" cy="45" r="3" fill="#f43f5e" />
            <circle cx="110" cy="45" r="3" fill="#f43f5e" />
            <rect x="57" y="17" width="6" height="6" fill="#f43f5e" />
          </svg>
          <div className="absolute top-2.5 right-6 font-mono text-[9px] text-rose-300 tracking-wider">
            C·M·Y·K · 300 DPI
          </div>
        </div>
      );

    case 'artista':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.14] group-hover:opacity-[0.22] transition-opacity duration-500">
          {/* Fine Art Canvas Weave & Sculptural Geometry */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="canvas-weave" width="12" height="12" patternUnits="userSpaceOnUse">
                <path d="M0,6 L12,6 M6,0 L6,12" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#canvas-weave)" />
          </svg>
          {/* Sculptural Wireframe Polygon in corner */}
          <svg className="absolute -bottom-2 -right-2 w-28 h-28 text-cyan-400/20" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <polygon points="50,10 90,35 90,75 50,95 10,75 10,35" strokeWidth="1" />
            <line x1="50" y1="10" x2="50" y2="95" strokeWidth="0.75" />
            <line x1="10" y1="35" x2="90" y2="75" strokeWidth="0.75" />
            <line x1="10" y1="75" x2="90" y2="35" strokeWidth="0.75" />
          </svg>
        </div>
      );

    case 'persona':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.12] group-hover:opacity-[0.2] transition-opacity duration-500">
          {/* Subtle Ruled Notebook Lines & Personal Seal */}
          <div className="absolute inset-0 flex flex-col justify-between py-6">
            <div className="w-full h-px bg-slate-400/20" />
            <div className="w-full h-px bg-slate-400/20" />
            <div className="w-full h-px bg-slate-400/20" />
            <div className="w-full h-px bg-slate-400/20" />
          </div>
          {/* Stamp Seal */}
          <div className="absolute top-2.5 right-3 w-12 h-12 rounded-full border border-slate-400/30 flex items-center justify-center p-1 text-[8px] font-mono text-slate-300 text-center uppercase tracking-tighter rotate-12">
            DB · VR
          </div>
        </div>
      );

    default:
      return null;
  }
}

/**
 * Top craft-specific identity widget displayed on each Discipline Card header
 */
export function DisciplineHeaderBadge({ profileId }: { profileId: string }) {
  switch (profileId) {
    case 'web-developer':
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-300 text-[10px] font-mono font-medium">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="ml-1 text-blue-200">dev.tsx</span>
        </div>
      );

    case 'game-designer':
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[10px] font-mono font-bold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>STAGE // 01</span>
        </div>
      );

    case 'elettricista':
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[10px] font-mono font-medium">
          <Zap size={11} className="text-amber-400" />
          <span>SCHEMATIC 230V</span>
        </div>
      );

    case 'musicista':
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/25 text-purple-300 text-[10px] font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>48kHz · STEREO</span>
        </div>
      );

    case 'graphic-designer':
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-300 text-[10px] font-mono font-medium">
          <Crop size={11} className="text-rose-400" />
          <span>ARTBOARD 1:1</span>
        </div>
      );

    case 'artista':
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[10px] font-mono font-medium">
          <Brush size={11} className="text-cyan-400" />
          <span>STUDIO ATELIER</span>
        </div>
      );

    case 'persona':
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-500/10 border border-slate-500/25 text-slate-300 text-[10px] font-mono font-medium">
          <Compass size={11} className="text-slate-400" />
          <span>JOURNAL & BIO</span>
        </div>
      );

    default:
      return null;
  }
}

/**
 * Rich domain-specific hero banner decoration for ProfilePage
 */
export function DisciplineProfileHeroHeader({ profileId }: { profileId: string }) {
  const theme = DISCIPLINE_THEMES[profileId];
  if (!theme) return null;

  switch (profileId) {
    case 'web-developer':
      return (
        <div className="w-full mb-6 rounded-2xl bg-zinc-950/80 border border-blue-500/30 overflow-hidden shadow-xl">
          {/* macOS / Terminal Topbar */}
          <div className="px-4 py-2.5 bg-blue-950/30 border-b border-blue-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-xs text-blue-300/80">dennis@macbook: ~/workspace/web-developer</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
              <span className="text-blue-400">TypeScript 5.x</span>
              <span>·</span>
              <span>React 19</span>
              <span>·</span>
              <span className="text-emerald-400">git:(main)</span>
            </div>
          </div>
          {/* Code banner snippet */}
          <div className="p-4 sm:p-5 font-mono text-xs text-zinc-300 flex items-center justify-between gap-4 overflow-x-auto">
            <div className="space-y-1">
              <div><span className="text-purple-400">interface</span> <span className="text-blue-300">FrontendEngineer</span> {'{'}</div>
              <div className="pl-4"><span className="text-zinc-400">location:</span> <span className="text-emerald-300">&apos;Verona, IT&apos;</span>;</div>
              <div className="pl-4"><span className="text-zinc-400">focus:</span> [<span className="text-amber-300">&apos;UI/UX&apos;</span>, <span className="text-amber-300">&apos;Performance&apos;</span>, <span className="text-amber-300">&apos;Accessibility&apos;</span>];</div>
              <div>{'}'}</div>
            </div>
            <div className="hidden md:flex flex-col items-end text-[11px] text-zinc-500 font-mono">
              <span className="text-emerald-400">● 100% Lighthouse Ready</span>
              <span>Clean Semantic HTML5</span>
              <span>Zero Slop Policy</span>
            </div>
          </div>
        </div>
      );

    case 'game-designer':
      return (
        <div className="w-full mb-6 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 overflow-hidden shadow-xl relative">
          <div className="px-4 py-2.5 bg-emerald-950/30 border-b border-emerald-500/20 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-300 font-bold tracking-wider">
              <Gamepad2 size={16} className="text-emerald-400" />
              <span>ARCADE ENGINE // HTML5 CANVAS & GML</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="text-emerald-400 font-bold">STAGE 01</span>
              <span>·</span>
              <span>60 FPS LOCKED</span>
              <span>·</span>
              <span className="text-amber-300">SCORE: 99,420</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-300 font-bold">CONTROLS: WASD + SPACE</span>
              </div>
              <span className="text-zinc-400 hidden sm:inline">Meccaniche dinamiche, collisioni custom e game feel retrò</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/80">
              <span>● Browser Playable</span>
              <span>·</span>
              <span>No Install Required</span>
            </div>
          </div>
        </div>
      );

    case 'elettricista':
      return (
        <div className="w-full mb-6 rounded-2xl bg-zinc-950/80 border border-amber-500/30 overflow-hidden shadow-xl relative">
          <div className="px-4 py-2.5 bg-amber-950/30 border-b border-amber-500/20 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-bold tracking-wider">
              <Zap size={16} className="text-amber-400" />
              <span>SCHEMATICS & IOT HARDWARE SPECIFICATION</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="text-amber-400">230V AC / 5V DC</span>
              <span>·</span>
              <span>I²C / SPI BUS</span>
              <span>·</span>
              <span className="text-emerald-400">CIRCUITI TESTATI</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2">
                <Cpu size={14} className="text-amber-400" />
                <span className="text-amber-200">ARDUINO · SENSORI · DOMOTICA</span>
              </div>
              <span className="text-zinc-400 hidden sm:inline">Dall&apos;impiantistica civile ai prototipi smart IoT</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400/80">
              <span>● Connessione Reale & Hardware</span>
            </div>
          </div>
        </div>
      );

    case 'musicista':
      return (
        <div className="w-full mb-6 rounded-2xl bg-zinc-950/80 border border-purple-500/30 overflow-hidden shadow-xl relative">
          <div className="px-4 py-2.5 bg-purple-950/30 border-b border-purple-500/20 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-purple-300 font-bold tracking-wider">
              <Music size={16} className="text-purple-400" />
              <span>DIGITAL AUDIO WORKSTATION // SUNO AI STEREO</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="text-purple-400">48kHz / 24-bit</span>
              <span>·</span>
              <span className="text-pink-400">10 BRANI ORIGINALI</span>
              <span>·</span>
              <span className="text-emerald-400">STEREO L ● R</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center gap-2">
                <Sliders size={14} className="text-purple-400" />
                <span className="text-purple-200">GENERI: RAP · TRAP · EXPERIMENTAL</span>
              </div>
              <span className="text-zinc-400 hidden sm:inline">Testi autoriali, metrica e prompt design sonoro avanzato</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400/80">
              <span>● Mini Player Globale Integrato</span>
            </div>
          </div>
        </div>
      );

    case 'graphic-designer':
      return (
        <div className="w-full mb-6 rounded-2xl bg-zinc-950/80 border border-rose-500/30 overflow-hidden shadow-xl relative">
          <div className="px-4 py-2.5 bg-rose-950/30 border-b border-rose-500/20 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-rose-300 font-bold tracking-wider">
              <Palette size={16} className="text-rose-400" />
              <span>VECTOR ARTBOARD // BLENDER 3D & BRANDING</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="text-rose-400">CYAN · MAGENTA · YELLOW · BLACK</span>
              <span>·</span>
              <span>300 DPI PRINT</span>
              <span>·</span>
              <span className="text-amber-400">PROPORZIONE AUREA</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <div className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2">
                <Crop size={14} className="text-rose-400" />
                <span className="text-rose-200">ASSET DIGITALI & RENDER 3D</span>
              </div>
              <span className="text-zinc-400 hidden sm:inline">Composizioni visive, gerarchia tipografica e render fotorealistici</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400/80">
              <span>● Griglie di Precisione & Bleed Marks</span>
            </div>
          </div>
        </div>
      );

    case 'artista':
      return (
        <div className="w-full mb-6 rounded-2xl bg-zinc-950/80 border border-cyan-500/30 overflow-hidden shadow-xl relative">
          <div className="px-4 py-2.5 bg-cyan-950/30 border-b border-cyan-500/20 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-bold tracking-wider">
              <Brush size={16} className="text-cyan-400" />
              <span>ATELIER D&apos;ARTE DIGITALE // SCULTURA 3D & BOZZETTI</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="text-cyan-400">DIGITAL CLAY</span>
              <span>·</span>
              <span>MIXED MEDIA</span>
              <span>·</span>
              <span className="text-indigo-400">COLLEZIONE ARCHIVIO</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-2">
                <Sparkles size={14} className="text-cyan-400" />
                <span className="text-cyan-200">ESPRESSIONE FORMALE & VOLUMI</span>
              </div>
              <span className="text-zinc-400 hidden sm:inline">Dall&apos;idea su carta alla mesh tridimensionale poligonale</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/80">
              <span>● Cura Museale & Dettaglio</span>
            </div>
          </div>
        </div>
      );

    case 'persona':
      return (
        <div className="w-full mb-6 rounded-2xl bg-zinc-950/80 border border-slate-500/30 overflow-hidden shadow-xl relative">
          <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-500/20 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-bold tracking-wider">
              <User size={16} className="text-slate-400" />
              <span>DIARIO DI BORDO // PROFILO & STORIA PERSONALE</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="text-slate-300">VERONA, ITALIA</span>
              <span>·</span>
              <span>DENNIS BOTTARI</span>
              <span>·</span>
              <span className="text-emerald-400">CREATIVO MULTIDISCIPLINARE</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <div className="px-3 py-1.5 rounded-lg bg-slate-500/10 border border-slate-500/30 flex items-center gap-2">
                <Compass size={14} className="text-slate-300" />
                <span className="text-slate-200">APPROCCIO TRASVERSALE</span>
              </div>
              <span className="text-zinc-400 hidden sm:inline">Unire programmazione, elettronica, musica e arte in un unico percorso</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400/80">
              <span>● Panoramica Completa</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
