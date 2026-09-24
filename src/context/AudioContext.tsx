import React, { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { portfolioData } from '../portfolioData';

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  imageUrl: string;
  profileId: string;
  description?: string;
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  isMuted: boolean;
  isMinimized: boolean;
  playlist: AudioTrack[];
  playTrack: (track: AudioTrack) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seek: (percent: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleMinimize: () => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Extract all tracks with audioUrl from portfolioData
  const playlist = useMemo<AudioTrack[]>(() => {
    const tracks: AudioTrack[] = [];
    portfolioData.forEach((profile) => {
      profile.projects.forEach((proj) => {
        if (proj.audioUrl) {
          tracks.push({
            id: proj.id,
            title: proj.title,
            artist: 'Dennis Bottari · Suno AI',
            audioUrl: proj.audioUrl,
            imageUrl: proj.imageUrl,
            profileId: profile.id,
            description: proj.description,
          });
        }
      });
    });
    return tracks;
  }, []);

  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (!audio) return;
      setCurrentTime(audio.currentTime);
      const prog = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      setProgress(prog);
    };

    const onLoadedMetadata = () => {
      if (!audio) return;
      setDuration(audio.duration);
    };

    const onEnded = () => {
      // Auto play next track
      nextTrackRef.current();
    };

    const onError = (e: Event) => {
      console.warn('Audio playback error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audioRef.current = null;
    };
  }, []);

  const playTrack = useCallback((track: AudioTrack) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => setIsPlaying(true)).catch((err) => console.warn('Play error:', err));
      }
      return;
    }

    setCurrentTrack(track);
    setIsMinimized(false);
    audio.src = track.audioUrl;
    audio.load();
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.warn('Could not start playback:', err);
      setIsPlaying(false);
    });
  }, [currentTrack, isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentTrack && playlist.length > 0) {
      playTrack(playlist[0]);
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.warn('Play error:', err));
    }
  }, [currentTrack, isPlaying, playlist, playTrack]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setIsPlaying(true)).catch(console.warn);
  }, []);

  const seek = useCallback((percent: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const targetTime = (percent / 100) * audio.duration;
    audio.currentTime = targetTime;
    setCurrentTime(targetTime);
    setProgress(percent);
  }, []);

  const setVolume = useCallback((val: number) => {
    const audio = audioRef.current;
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audio) {
      audio.volume = clamped;
      if (clamped > 0 && isMuted) {
        audio.muted = false;
        setIsMuted(false);
      }
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const nextTrack = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex]);
  }, [currentTrack, playlist, playTrack]);

  const prevTrack = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const audio = audioRef.current;
    // If playing for more than 3 seconds, restart current track
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
      return;
    }
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[prevIndex]);
  }, [currentTrack, playlist, playTrack]);

  const nextTrackRef = useRef(nextTrack);
  useEffect(() => {
    nextTrackRef.current = nextTrack;
  }, [nextTrack]);

  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  const closePlayer = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
    setCurrentTime(0);
    setProgress(0);
  }, []);

  const value = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    volume,
    isMuted,
    isMinimized,
    playlist,
    playTrack,
    togglePlay,
    pause,
    resume,
    seek,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    toggleMinimize,
    closePlayer,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
