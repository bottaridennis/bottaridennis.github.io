import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

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
  const [hasError, setHasError] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number>(0);

  // Initialize Web Audio API on first interaction
  const initAudio = () => {
    if (!audioRef.current || audioCtxRef.current) return;
    
    // Fallback for older browsers
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    
    // Settings for the spectrum analyzer
    analyser.fftSize = 256; 
    analyser.smoothingTimeConstant = 0.8;
    
    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    
    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    sourceRef.current = source;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    // Initialize on first play to avoid browser autoplay restrictions and strict mode double-firing
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Sync state with audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.warn(`Could not load audio source: ${src}`);
      setIsPlaying(false);
      setHasError(true);
    };

    // Reset error state when src changes
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

  // Draw the audio spectrum
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear the canvas on every frame
      ctx.clearRect(0, 0, width, height);
      
      if (!analyserRef.current || !isPlaying) {
        // Draw idle line if not playing or not initialized
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, height / 2, width, 2);
        return;
      }

      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      // We only draw the lower half of frequencies for a better look
      const drawableLength = Math.floor(bufferLength * 0.7); 
      const barWidth = (width / drawableLength) * 1.5;
      let x = 0;

      for (let i = 0; i < drawableLength; i++) {
        // Normalize value between 0 and 1
        const normalized = dataArray[i] / 255;
        // Curve the height so quiet sounds are still visible but loud sounds pop
        const barHeight = Math.pow(normalized, 1.5) * height;

        // Dynamic color based on height
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, normalized)})`;
        
        // Draw bar from center
        ctx.fillRect(
          x, 
          (height - barHeight) / 2, 
          barWidth - 1, 
          barHeight || 2 // minimum height
        );

        x += barWidth;
      }
    };

    draw();

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = (Number(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Visualizer Canvas */}
      <div className="w-full h-32 bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center relative">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full opacity-80"
          width={1000}
          height={200}
        />
      </div>

      {/* Player Box */}
      <div className="relative flex flex-col justify-center p-6 bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Native audio element hidden */}
        <audio ref={audioRef} src={src} crossOrigin="anonymous" />
        
        {/* UI Controls */}
        <div className={`relative z-10 flex items-center gap-6 ${hasError ? 'opacity-50 pointer-events-none' : ''}`}>
          <button 
            onClick={togglePlay}
            disabled={hasError}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-black hover:bg-neutral-200 transition-transform active:scale-95 shrink-0 shadow-lg shadow-white/10 disabled:bg-neutral-800 disabled:text-neutral-500"
          >
            {isPlaying ? (
              <Pause size={24} className="fill-current" />
            ) : (
              <Play size={24} className="fill-current ml-1" />
            )}
          </button>
          
          <div className="flex flex-col grow gap-2 w-full">
             <div className="flex justify-between text-[11px] font-bold text-neutral-400 font-mono tracking-widest">
               <span>{hasError ? 'Error loading track' : formatTime(currentTime)}</span>
               <span>{hasError ? '--:--' : formatTime(duration)}</span>
             </div>
             
             <div className="group relative flex items-center h-4 cursor-pointer">
               <input 
                 type="range"
                 min="0"
                 max="100"
                 value={progress || 0}
                 onChange={handleSeek}
                 className="absolute w-full h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-white hover:h-2 transition-all z-20 outline-none"
               />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
