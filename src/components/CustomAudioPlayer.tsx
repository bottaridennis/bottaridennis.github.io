import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Play, Pause, Volume2, VolumeX, AlertCircle, Music } from 'lucide-react';

interface CustomAudioPlayerProps {
  src: string;
}

export default function CustomAudioPlayer({ src }: CustomAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number>(0);

  const initAudio = () => {
    if (!audioRef.current || audioCtxRef.current) return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      
      analyser.fftSize = 256; 
      analyser.smoothingTimeConstant = 0.85;
      
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;
    
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Play error:", err);
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setHasError(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    const handleError = () => {
      setIsPlaying(false);
      setHasError(true);
    };

    setHasError(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [src]);

  // Smooth & rounded visualizer bars
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      if (!analyserRef.current || !isPlaying) {
        // Idle gentle waveform wave
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        for (let x = 0; x < width; x += 10) {
          ctx.lineTo(x, height / 2 + Math.sin(x * 0.05 + Date.now() * 0.002) * 4);
        }
        ctx.stroke();
        return;
      }

      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const drawableLength = Math.floor(bufferLength * 0.7); 
      const barWidth = (width / drawableLength) * 1.3;
      let x = 0;

      for (let i = 0; i < drawableLength; i++) {
        const normalized = dataArray[i] / 255;
        const barHeight = Math.pow(normalized, 1.3) * (height * 0.85);

        // Smooth color gradient from vibrant purple to cyan
        const gradient = ctx.createLinearGradient(0, height / 2 - barHeight / 2, 0, height / 2 + barHeight / 2);
        gradient.addColorStop(0, '#c084fc');
        gradient.addColorStop(0.5, '#ec4899');
        gradient.addColorStop(1, '#38bdf8');

        ctx.fillStyle = gradient;
        
        // Draw rounded bars
        const drawHeight = Math.max(3, barHeight);
        const y = (height - drawHeight) / 2;
        const radius = Math.min(barWidth / 2, 2);

        ctx.beginPath();
        ctx.roundRect(x, y, Math.max(2, barWidth - 2), drawHeight, radius);
        ctx.fill();

        x += barWidth;
      }
    };

    draw();

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || isNaN(duration)) return;
    const newTime = (Number(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-4 rounded-3xl p-6 glass-card shadow-2xl overflow-hidden relative">
      <audio ref={audioRef} src={src} crossOrigin="anonymous" preload="metadata" />

      {/* Visualizer Frame */}
      <div className="relative w-full h-24 bg-black/40 border border-white/[0.06] rounded-2xl overflow-hidden flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          width={800}
          height={160}
        />
        
        <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-medium text-zinc-400">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
          <span>{isPlaying ? 'In Riproduzione' : 'Audio Player'}</span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
          <Music size={13} className="text-purple-400" />
          <span>Stereo</span>
        </div>
      </div>

      {/* Controls */}
      <div className={`flex flex-col gap-3 ${hasError ? 'opacity-50' : ''}`}>
        <div className="flex items-center gap-4">
          {/* Main Play Button */}
          <button 
            onClick={togglePlay}
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
                {hasError ? 'Traccia non disponibile' : formatTime(currentTime)}
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
            onClick={toggleMute}
            disabled={hasError}
            aria-label={isMuted ? 'Attiva volume' : 'Silenzia'}
            className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors disabled:opacity-40"
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
