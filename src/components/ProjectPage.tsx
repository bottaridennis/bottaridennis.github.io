import { motion } from 'motion/react';
import { ArrowLeft, Github, Globe, Download, ExternalLink, Users } from 'lucide-react';
import { Project, Profile } from '../types';

interface ProjectPageProps {
  project: Project;
  profile: Profile;
  onBack: () => void;
}

export default function ProjectPage({ project, profile, onBack }: ProjectPageProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'github': return <Github size={18} />;
      case 'preview': return <Globe size={18} />;
      case 'download': return <Download size={18} />;
      default: return <ExternalLink size={18} />;
    }
  };

  return (
    <div className="min-h-screen pb-20 pt-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group uppercase text-[10px] tracking-[0.2em] font-bold"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Torna al Profilo
        </motion.button>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${profile.themeColor}`}>
                Dettaglio Progetto
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">
                {project.title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-1 rounded-full bg-neutral-900 border border-white/5 text-[10px] text-neutral-400 uppercase tracking-widest"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.links?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border-white shadow-xl shadow-black/20`}
                >
                  {getIcon(link.type)}
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 group shadow-2xl shadow-black/40"
          >
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 shrink-0">
                L'Idea & Sviluppo
              </h2>
              <div className="h-px bg-white/5 w-full" />
            </div>
            
            <div className="space-y-6">
              {project.fullDescription.map((p, idx) => (
                <p key={idx} className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <aside className="space-y-12">
            {/* Collaborators */}
            {project.collaborators && project.collaborators.length > 0 && (
              <div className="space-y-8 p-8 rounded-3xl bg-neutral-950 border border-white/5">
                <div className="flex items-center gap-3 text-neutral-500 uppercase text-[10px] tracking-[0.2em] font-bold">
                  <Users size={14} />
                  Team & Collaboratori
                </div>
                <div className="space-y-6">
                  {project.collaborators.map((collab, idx) => (
                    <div key={idx} className="group">
                      <p className="text-white font-bold text-sm group-hover:text-neutral-400 transition-colors">
                        {collab.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                        {collab.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-8 rounded-3xl border border-dashed border-white/10 opacity-50">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Stato Progetto</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-neutral-300 font-medium tracking-wide">Completato / Live</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
