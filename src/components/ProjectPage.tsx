import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Github, 
  Globe, 
  Download, 
  ExternalLink, 
  Users, 
  Sparkles, 
  Copy, 
  Check, 
  Music, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  Gamepad2
} from 'lucide-react';
import { Project, Profile } from '../types';
import CustomAudioPlayer from './CustomAudioPlayer';
import GameModal, { PlayableGame } from './GameModal';
import { useLanguage } from '../context/LanguageContext';

interface ProjectPageProps {
  project: Project;
  profile: Profile;
  onBack: () => void;
  onSelectProject?: (projectId: string) => void;
  onPlayGame?: (game: PlayableGame) => void;
}

export default function ProjectPage({ project, profile, onBack, onSelectProject, onPlayGame }: ProjectPageProps) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const { t, language } = useLanguage();

  // Check if project has an HTML5 game link
  const playableGameLink = project.links?.find(
    (l) => l.url.endsWith('.html') || l.label.toLowerCase().includes('gioca') || l.url.includes('game') || l.url.includes('shooter')
  );

  const gameModalData: PlayableGame | null = playableGameLink ? {
    id: project.id,
    title: project.title,
    url: playableGameLink.url,
    technologies: project.technologies,
    description: project.description,
  } : null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'github': return <Github size={16} />;
      case 'preview': return <Globe size={16} />;
      case 'download': return <Download size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  const handleCopyPrompt = () => {
    if (!project.promptStyle) return;
    navigator.clipboard.writeText(project.promptStyle);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const currentIndex = profile.projects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? profile.projects[currentIndex - 1] : null;
  const nextProject = currentIndex < profile.projects.length - 1 ? profile.projects[currentIndex + 1] : null;

  return (
    <div className="min-h-full px-5 py-8 md:px-12 md:py-14 max-w-6xl mx-auto space-y-16">
      {/* Top Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors group text-xs font-medium cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.1] transition-all">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>{t.backToOverview} · {profile.title}</span>
        </motion.button>

        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <span>{profile.title}</span>
          <span>/</span>
          <span className="text-zinc-200">{project.title}</span>
        </div>
      </div>

      {/* Hero Project Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Project Info */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="space-y-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-purple-300 inline-block">
              {profile.title}
            </span>

            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              {project.title}
            </h1>
          </div>

          {/* Tech stack badges (small, pill-shaped in glass-card style) */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="text-xs px-3 py-1 rounded-full glass-card hover:bg-white/[0.08] hover:border-white/20 text-zinc-200 font-medium shadow-sm transition-all inline-flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                {tech}
              </span>
            ))}
          </div>

          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {/* Direct Play in Browser button for HTML5 games */}
            {playableGameLink && (
              <button
                onClick={() => {
                  if (onPlayGame && gameModalData) {
                    onPlayGame(gameModalData);
                  } else {
                    setIsGameModalOpen(true);
                  }
                }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-300 shadow-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 active:scale-95 cursor-pointer shadow-emerald-500/20 group"
              >
                <Gamepad2 size={16} className="text-zinc-950 group-hover:scale-110 transition-transform" />
                <span>{t.playGame}</span>
              </button>
            )}

            {project.links && project.links.length > 0 && (
              <>
                {project.links.map((link, idx) => {
                  const isPrimary = link.type === 'preview' && !playableGameLink;
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs font-semibold transition-all duration-300 shadow-xl group cursor-pointer ${
                        isPrimary 
                          ? 'bg-white text-zinc-950 hover:bg-zinc-200' 
                          : 'bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 border border-white/10 hover:border-white/25'
                      }`}
                    >
                      {getIcon(link.type)}
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </>
            )}
          </div>
        </motion.div>

        {/* Project Artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[16/11] rounded-3xl overflow-hidden glass-card shadow-2xl group">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* Main Body */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6 border-t border-white/[0.08]">
        {/* Narrative & Audio */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
              <FileText size={16} className="text-zinc-400" />
              <h2 className="font-heading text-lg font-bold text-white">
                {t.projectOverview}
              </h2>
            </div>

            <div className="space-y-4 text-base text-zinc-300 font-normal leading-relaxed">
              {project.fullDescription.map((paragraph, idx) => (
                <p key={idx}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Audio Player if available */}
          {project.audioUrl && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Music size={16} className="text-purple-400" />
                  <span>{t.audioPlayback}</span>
                </div>
                <span className="text-xs text-zinc-500">{t.originalTrack}</span>
              </div>

              <CustomAudioPlayer 
                src={project.audioUrl} 
                trackInfo={{
                  id: project.id,
                  title: project.title,
                  artist: 'Dennis Bottari · Suno AI',
                  audioUrl: project.audioUrl,
                  imageUrl: project.imageUrl,
                  profileId: profile.id,
                }}
              />
            </div>
          )}

          {/* Lyrics if available */}
          {project.lyrics && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <h3 className="font-heading text-lg font-bold text-white">
                  {t.lyricsTitle}
                </h3>
                <span className="text-xs text-zinc-500">Songwriting</span>
              </div>

              <div className="p-7 rounded-3xl glass-card">
                <pre className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-wrap font-normal">
                  {project.lyrics}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <aside className="lg:col-span-4 space-y-5">
          {/* Suno AI Prompt Card */}
          {project.promptStyle && (
            <div className="p-6 rounded-3xl glass-card space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                  <Sparkles size={14} />
                  <span>Suno AI Prompt</span>
                </div>
                <a 
                  href="https://suno.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  suno.com ↗
                </a>
              </div>

              <p className="text-xs text-zinc-300 font-normal leading-relaxed italic border-l-2 border-amber-400/40 pl-3">
                "{project.promptStyle}"
              </p>

              <button
                onClick={handleCopyPrompt}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-medium text-zinc-200 hover:text-white transition-colors cursor-pointer"
              >
                {copiedPrompt ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>{t.promptCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>{t.copyPrompt}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Collaborators */}
          {project.collaborators && project.collaborators.length > 0 && (
            <div className="p-6 rounded-3xl glass-card space-y-4">
              <div className="flex items-center gap-2 text-zinc-300 text-xs font-semibold pb-2 border-b border-white/[0.06]">
                <Users size={15} />
                <span>{t.collaboratorsCredits}</span>
              </div>

              <div className="space-y-3">
                {project.collaborators.map((collab, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {collab.name}
                      </p>
                      <p className="text-zinc-400">
                        {collab.role}
                      </p>
                    </div>
                    {collab.url && (
                      <a 
                        href={collab.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white p-1"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="p-6 rounded-3xl glass-card space-y-3 text-xs">
            <p className="font-semibold text-zinc-400 uppercase tracking-wider text-[11px]">
              {t.workDetails}
            </p>
            <div className="space-y-2 text-zinc-300">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-500">{t.authorLabel}</span>
                <span>Dennis Bottari</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-500">{t.areaLabel}</span>
                <span>{profile.title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-500">{t.statusLabel}</span>
                <span className="text-emerald-400 font-medium">{t.completedStatus}</span>
              </div>
              <div className="pt-2">
                <span className="text-zinc-500 block mb-2 font-medium">{t.technologiesLabel}</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-0.5 rounded-full text-[11px] glass-card text-zinc-300 font-medium inline-flex items-center gap-1 hover:border-white/20 transition-all"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Next / Previous Project Navigation */}
      {(prevProject || nextProject) && onSelectProject && (
        <section className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <button
              onClick={() => onSelectProject(prevProject.id)}
              className="w-full sm:w-auto flex items-center gap-3 p-4 rounded-2xl glass-card glass-card-hover text-left transition-all group cursor-pointer"
            >
              <ChevronLeft size={18} className="text-zinc-400 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[11px] text-zinc-500 block">{t.previousProject}</span>
                <span className="font-bold text-sm text-white group-hover:text-purple-300">{prevProject.title}</span>
              </div>
            </button>
          ) : <div />}

          {nextProject && (
            <button
              onClick={() => onSelectProject(nextProject.id)}
              className="w-full sm:w-auto flex items-center justify-end gap-3 p-4 rounded-2xl glass-card glass-card-hover text-right transition-all group cursor-pointer ml-auto"
            >
              <div>
                <span className="text-[11px] text-zinc-500 block">{t.nextProject}</span>
                <span className="font-bold text-sm text-white group-hover:text-purple-300">{nextProject.title}</span>
              </div>
              <ChevronRight size={18} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </section>
      )}

      {/* Play in Browser Game Modal */}
      <GameModal 
        isOpen={isGameModalOpen} 
        onClose={() => setIsGameModalOpen(false)} 
        game={gameModalData} 
      />
    </div>
  );
}
