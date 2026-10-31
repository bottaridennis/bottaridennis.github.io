import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight, Volume2, Globe, Play, Pause } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface ProjectCardProps {
  project: Project;
  themeColor: string;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, themeColor, onClick }) => {
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();
  const hasAudio = !!project.audioUrl;
  const isCurrentTrack = currentTrack?.id === project.id;
  const hasPreview = project.links?.some(l => l.type === 'preview');
  const isPixelArt = project.id === 'pixel-art-character' || project.imageUrl.endsWith('.gif');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick(project)}
      className="flex flex-col rounded-3xl glass-card glass-card-hover overflow-hidden group cursor-pointer shadow-lg shadow-black/30"
    >
      {/* Artwork Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 flex items-center justify-center">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          loading="lazy"
          className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 ${
            isPixelArt ? 'object-contain p-4' : 'object-cover'
          }`}
          style={isPixelArt ? { imageRendering: 'pixelated' } : undefined}
          referrerPolicy="no-referrer"
        />

        {/* Subtle Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

        {/* Media Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {isPixelArt && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-500/40 text-xs font-medium text-emerald-300 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>2D Animato</span>
            </span>
          )}
          {hasAudio && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-purple-500/30 text-xs font-medium text-purple-300 shadow-md">
              <Volume2 size={12} className="text-purple-400" />
              <span>Audio</span>
            </span>
          )}
          {hasPreview && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-blue-500/30 text-xs font-medium text-blue-300 shadow-md">
              <Globe size={12} className="text-blue-400" />
              <span>Live</span>
            </span>
          )}
        </div>

        {/* Quick Play Audio Button on Card Artwork */}
        {hasAudio && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isCurrentTrack && isPlaying) {
                togglePlay();
              } else {
                playTrack({
                  id: project.id,
                  title: project.title,
                  artist: 'Dennis Bottari · Suno AI',
                  audioUrl: project.audioUrl!,
                  imageUrl: project.imageUrl,
                  profileId: 'musicista',
                  description: project.description,
                });
              }
            }}
            className={`absolute bottom-3 right-3 p-3 rounded-full shadow-xl transition-all duration-300 cursor-pointer ${
              isCurrentTrack && isPlaying
                ? 'bg-purple-600 text-white scale-105 shadow-purple-600/50 ring-2 ring-purple-400'
                : 'bg-zinc-950/85 hover:bg-purple-600 text-white hover:scale-110 border border-white/20'
            }`}
            title={isCurrentTrack && isPlaying ? 'Pausa' : 'Ascolta ora'}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause size={14} className="fill-current" />
            ) : (
              <Play size={14} className="fill-current ml-0.5" />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2.5">
          {/* Tech badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech} 
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-zinc-300 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[11px] text-zinc-500 pl-0.5">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          
          {/* Title & Arrow */}
          <div className="flex items-start justify-between gap-3 pt-1">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
              {project.title}
            </h3>
            <div className="w-7 h-7 rounded-full bg-white/[0.05] group-hover:bg-white text-zinc-400 group-hover:text-zinc-950 flex items-center justify-center transition-all duration-300 shrink-0">
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
          
          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Bottom kicker */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
          <span className="group-hover:text-zinc-200 transition-colors">Vedi scheda e dettagli</span>
          <span className="text-white font-medium group-hover:translate-x-1 transition-transform">
            Apri →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
