import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Play, Pause, Volume2, VolumeX, AlertCircle, Music } from 'lucide-react';
import { useAudio, AudioTrack } from '../context/AudioContext';

interface CustomAudioPlayerProps {
  src: string;
  trackInfo?: {
    id: string;
    title: string;
    artist?: string;
    audioUrl: string;
    imageUrl?: string;
    profileId?: string;
  };
}

export default function CustomAudioPlayer({ src, trackInfo }: CustomAudioPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [localDuration, setLocalDuration] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  const {
    currentTrack,
    isPlaying: globalIsPlaying,
    currentTime: globalCurrentTime,
    duration: globalDuration,
    progress: globalProgress,
    isMuted: globalIsMuted,
    playTrack,
    togglePlay: globalTogglePlay,
    seek: globalSeek,
    toggleMute: globalToggleMute,
  } = useAudio();

  // Is this specific track the one currently active in the global player?
  const isCurrentTrack = currentTrack?.audioUrl === src || (trackInfo && currentTrack?.id === trackInfo.id);
  const isPlaying = isCurrentTrack && globalIsPlaying;
  const currentTime = isCurrentTrack ? globalCurrentTime : 0;
  const duration = (isCurrentTrack && globalDuration > 0) ? globalDuration : localDuration;
  const progress = isCurrentTrack ? globalProgress : 0;
  const isMuted = globalIsMuted;

  // Preload metadata to get duration if not playing
  useEffect(() => {
    const tempAudio = new Audio(src);
    const onLoaded = () => {
      setLocalDuration(tempAudio.duration);
      setHasError(false);
    };
    const onError = () => {
      setHasError(true);
    };
    tempAudio.addEventListener('loadedmetadata', onLoaded);
    tempAudio.addEventListener('error', onError);
    return () => {
      tempAudio.removeEventListener('loadedmetadata', onLoaded);
      tempAudio.removeEventListener('error', onError);
    };
  }, [src]);

  const handleTogglePlay = () => {
    if (isCurrentTrack) {
      globalTogglePlay();
    } else {
      playTrack({
        id: trackInfo?.id || src,
        title: trackInfo?.title || 'Traccia Audio',
        artist: trackInfo?.artist || 'Dennis Bottari · Suno AI',
        audioUrl: src,
        imageUrl: trackInfo?.imageUrl || '/52-Hertz.jpeg',
        profileId: trackInfo?.profileId || 'musicista',
      });
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isCurrentTrack) {
      handleTogglePlay();
    }
    globalSeek(val);
  };

  // Canvas visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      const numBars = 48;
      const barWidth = (width / numBars) - 3;
      phase += isPlaying ? 0.08 : 0.02;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 8;
        if (isPlaying) {
          // Dynamic wave shape
          const wave1 = Math.sin(phase + (i * 0.25)) * 0.5 + 0.5;
          const wave2 = Math.cos(phase * 1.5 + (i * 0.35)) * 0.5 + 0.5;
          barHeight = 12 + (wave1 * wave2 * (height - 30));
        } else {
          // Idle gentle waveform
          const idleWave = Math.sin((i * 0.2) + phase) * 0.5 + 0.5;
          barHeight = 6 + (idleWave * 12);
        }

        const x = i * (barWidth + 3);
        const y = height - barHeight;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, height, 0, y);
        if (isPlaying) {
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
          gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.7)');
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0.9)');
        } else {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="p-6 rounded-3xl glass-card border border-white/[0.08] flex flex-col gap-5 relative overflow-hidden backdrop-blur-xl">
      {/* Visualizer Display */}
      <div className="relative w-full h-36 bg-zinc-950/80 rounded-2xl border border-white/[0.06] overflow-hidden flex items-center justify-center shadow-inner">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          width={800}
          height={144}
        />
        
        <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-medium text-zinc-400">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
          <span>{isPlaying ? 'In Riproduzione Globale' : 'Audio Player'}</span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
          <Music size={13} className="text-purple-400" />
          <span>Suno AI Stereo</span>
        </div>
      </div>

      {/* Controls */}
      <div className={`flex flex-col gap-3 ${hasError ? 'opacity-50' : ''}`}>
        <div className="flex items-center gap-4">
          {/* Main Play Button */}
          <button 
            onClick={handleTogglePlay}
            disabled={hasError}
            aria-label={isPlaying ? 'Pausa' : 'Riproduci'}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white hover:from-indigo-400 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/25 active:scale-95 shrink-0 cursor-pointer disabled:opacity-40"
          >
            {isPlaying ? (
              <Pause size={20} className="fill-current" />
            ) : (
              <Play size={20} className="fill-current ml-0.5" />
            )}
          </button>

          {/* Time & Progress bar */}
          <div className="flex flex-col grow gap-1.5">
            <div className="flex justify-between items-center text-xs text-zinc-400 font-mono-tech">
              <span className="text-zinc-300">
                {hasError ? 'File audio non disponibile' : formatTime(currentTime)}
              </span>
              <span className="text-zinc-500">
                {hasError ? '--:--' : formatTime(duration)}
              </span>
            </div>

            <div className="relative flex items-center h-4">
              <input 
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress || 0}
                onChange={handleSeek}
                disabled={hasError}
                aria-label="Avanzamento traccia audio"
                className="w-full h-1.5 bg-zinc-800/80 rounded-full appearance-none cursor-pointer accent-purple-400 transition-all outline-none disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Mute button */}
          <button
            onClick={globalToggleMute}
            disabled={hasError}
            aria-label={isMuted ? 'Attiva volume' : 'Silenzia'}
            className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors disabled:opacity-40 cursor-pointer"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {hasError && (
          <div className="flex items-center gap-2 text-xs text-amber-300 pt-1">
            <AlertCircle size={14} />
            <span>File audio in caricamento.</span>
          </div>
        )}
      </div>
    </div>
  );
}
