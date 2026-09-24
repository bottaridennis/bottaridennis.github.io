import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, X, Maximize2, Minimize2, ExternalLink, RefreshCw, Sparkles, Info } from 'lucide-react';

export interface PlayableGame {
  id: string;
  title: string;
  url: string;
  technologies?: string[];
  description?: string;
  instructions?: string;
}

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: PlayableGame | null;
}

export default function GameModal({ isOpen, onClose, game }: GameModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset loading state when game changes
  useEffect(() => {
    if (isOpen && game) {
      setIsLoading(true);
    }
  }, [isOpen, game?.id]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(console.warn);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().catch(console.warn);
    }
  };

  const reloadGame = () => {
    if (iframeRef.current && game) {
      setIsLoading(true);
      iframeRef.current.src = game.url;
    }
  };

  if (!isOpen || !game) return null;

  // Derive specific game tips
  const getInstructions = (id: string, fallback?: string) => {
    if (fallback) return fallback;
    if (id.includes('spooky')) {
      return 'Muoviti con WASD / Frecce, mira e spara con il mouse. Sopravvivi alle orde di uomini zucca!';
    }
    if (id.includes('space')) {
      return 'Muoviti con WASD, Spazio per frenare la navicella, click sinistro per sparare agli asteroidi!';
    }
    if (id.includes('rpg')) {
      return 'Muoviti con le Frecce o WASD, Spazio per interagire con l\'ambiente.';
    }
    return 'Comandi tipici: W A S D / Frecce direzionali · Spazio / Click Mouse';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className={`relative w-full max-w-5xl rounded-3xl glass-card bg-zinc-950/95 border border-white/[0.12] shadow-2xl flex flex-col overflow-hidden z-10 ${
            isFullscreen ? 'h-full max-h-screen rounded-none' : 'h-[90vh] max-h-[820px]'
          }`}
        >
          {/* Top Modal Header */}
          <div className="shrink-0 px-4 sm:px-6 py-3.5 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-zinc-950/80 backdrop-blur-xl">
            {/* Title & Engine info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                <Gamepad2 size={18} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white truncate">
                    {game.title}
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Play in Browser
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate">
                  Dennis Bottari · GameMaker HTML5
                </p>
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Reload Button */}
              <button
                onClick={reloadGame}
                title="Ricarica gioco"
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/[0.08] transition-all cursor-pointer"
                aria-label="Ricarica gioco"
              >
                <RefreshCw size={15} />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Esci da schermo intero' : 'Schermo intero'}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/[0.08] transition-all cursor-pointer"
                aria-label="Schermo intero"
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>

              {/* Open in external tab */}
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Apri in una nuova scheda"
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/[0.08] transition-all cursor-pointer"
                aria-label="Apri in nuova scheda"
              >
                <ExternalLink size={15} />
              </a>

              {/* Divider */}
              <div className="h-5 w-px bg-white/[0.1] mx-1" />

              {/* Close Button */}
              <button
                onClick={onClose}
                title="Chiudi gioco (ESC)"
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] text-zinc-300 hover:text-white border border-white/[0.08] transition-all cursor-pointer"
                aria-label="Chiudi finestra"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Iframe Game Canvas Container */}
          <div className="flex-1 relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950 z-20">
                <div className="w-10 h-10 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
                <p className="text-xs text-zinc-400 font-mono-tech">
                  Caricamento motore di gioco...
                </p>
              </div>
            )}

            <iframe
              ref={iframeRef}
              src={game.url}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 bg-black block"
              allow="fullscreen; autoplay; gamepad"
              title={`Play ${game.title}`}
            />
          </div>

          {/* Bottom Bar: Game Controls & Tips */}
          <div className="shrink-0 px-4 sm:px-6 py-2.5 border-t border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-300 min-w-0">
              <Info size={14} className="text-purple-400 shrink-0" />
              <span className="truncate text-[11px] sm:text-xs">
                {getInstructions(game.id, game.instructions)}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-zinc-500 shrink-0">
              <span>Premi <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300 font-mono text-[10px]">ESC</kbd> per uscire</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
