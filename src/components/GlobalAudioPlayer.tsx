import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '../context/AudioContext';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  X, 
  Maximize2, 
  Minimize2, 
  Music,
  ExternalLink
} from 'lucide-react';

interface GlobalAudioPlayerProps {
  onNavigateToTrack?: (profileId: string, projectId: string) => void;
}

export default function GlobalAudioPlayer({ onNavigateToTrack }: GlobalAudioPlayerProps) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    volume,
    isMuted,
    isMinimized,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    toggleMinimize,
    closePlayer,
  } = useAudio();

  const progressContainerRef = useRef<HTMLDivElement>(null);

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressContainerRef.current) return;
    const rect = progressContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    seek(percent);
  };

  const handleTrackTitleClick = () => {
    if (onNavigateToTrack && currentTrack.profileId && currentTrack.id) {
      onNavigateToTrack(currentTrack.profileId, currentTrack.id);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="global-audio-player"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="fixed bottom-14 sm:bottom-16 left-3 right-3 sm:left-auto sm:right-6 sm:w-[460px] z-40 pointer-events-auto"
      >
        <div className="rounded-2xl glass-card bg-zinc-950/90 border border-white/[0.12] shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300">
          {/* Top Progress Scrub Bar */}
          <div
            ref={progressContainerRef}
            onClick={handleSeekClick}
            className="w-full h-1.5 bg-white/[0.06] hover:h-2 transition-all cursor-pointer relative group"
            title="Trascina o clicca per scorrere la traccia"
          >
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 relative transition-all"
              style={{ width: `${progress}%` }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Main Controls & Info */}
          <div className="p-3 sm:p-3.5 flex items-center justify-between gap-3">
            {/* Left: Artwork + Track Details */}
            <div 
              onClick={handleTrackTitleClick}
              className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer group"
              title="Apri pagina del brano"
            >
              <div className="relative w-11 h-11 shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shadow-sm">
                <img
                  src={currentTrack.imageUrl}
                  alt={currentTrack.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isPlaying ? 'scale-105' : 'scale-100'
                  }`}
                />
                {/* Playing animated indicator */}
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center gap-0.5">
                    <span className="w-0.5 h-3 bg-purple-400 rounded-full animate-pulse" />
                    <span className="w-0.5 h-4 bg-purple-300 rounded-full animate-pulse [animation-delay:150ms]" />
                    <span className="w-0.5 h-2.5 bg-purple-400 rounded-full animate-pulse [animation-delay:300ms]" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                    {currentTrack.title}
                  </h4>
                  <ExternalLink size={10} className="text-zinc-500 group-hover:text-purple-300 opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono-tech truncate">
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-purple-300/80 truncate text-[10px]">Suno AI</span>
                </div>
              </div>
            </div>

            {/* Middle: Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={prevTrack}
                title="Brano precedente"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                aria-label="Brano precedente"
              >
                <SkipBack size={15} />
              </button>

              <button
                onClick={togglePlay}
                title={isPlaying ? 'Pausa' : 'Riproduci'}
                className="w-9 h-9 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label={isPlaying ? 'Pausa' : 'Riproduci'}
              >
                {isPlaying ? <Pause size={16} className="fill-zinc-950" /> : <Play size={16} className="fill-zinc-950 ml-0.5" />}
              </button>

              <button
                onClick={nextTrack}
                title="Prossimo brano"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                aria-label="Prossimo brano"
              >
                <SkipForward size={15} />
              </button>
            </div>

            {/* Right: Volume & Dismiss */}
            <div className="flex items-center gap-1 shrink-0 border-l border-white/[0.08] pl-2">
              <button
                onClick={toggleMute}
                title={isMuted ? 'Riattiva audio' : 'Disattiva audio'}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                aria-label={isMuted ? 'Riattiva audio' : 'Disattiva audio'}
              >
                {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              <button
                onClick={closePlayer}
                title="Chiudi player"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.08] transition-all cursor-pointer"
                aria-label="Chiudi player"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
