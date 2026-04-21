import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Profile } from '../types';
import ProjectCard from './ProjectCard';

interface ProfilePageProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

export default function ProfilePage({ profile, onBack, onSelectProject }: ProfilePageProps) {
  return (
    <div className={`min-h-screen px-4 py-10 md:px-8 md:py-20`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group uppercase text-[10px] tracking-[0.2em] font-bold"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Torna alla Home
        </motion.button>

        {/* Profile Hero Content */}
        <header className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-6">
              <div className={`p-4 rounded-3xl w-fit ${profile.bgColor} ${profile.themeColor} border border-white/5`}>
                <profile.icon size={32} />
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-6xl md:text-8xl font-black tracking-tighter leading-none ${profile.themeColor}`}
              >
                {profile.title}
              </motion.h1>
            </div>
            
            <div className="max-w-md">
              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold mb-4">Profilo Tecnico</p>
              <p className="text-neutral-400 text-lg md:text-xl font-light italic leading-relaxed mb-8">
                "{profile.intro}"
              </p>
              
              {profile.links && profile.links.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {profile.links.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-3 rounded-xl border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Skills Section */}
        {profile.skills && profile.skills.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center gap-6 mb-8">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 shrink-0">
                Core Skills
              </h2>
              <div className="h-px bg-white/5 w-full" />
            </div>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill) => (
                <span 
                  key={skill}
                  className={`px-6 py-2 rounded-full bg-neutral-900 border border-white/5 text-xs text-neutral-300 uppercase tracking-widest hover:border-white/20 transition-colors cursor-default`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {profile.education && profile.education.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 shrink-0">
                Education Path
              </h2>
              <div className="h-px bg-white/5 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {profile.education.map((edu, idx) => (
                <div key={idx} className="group">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-4 block ${profile.themeColor}`}>
                    {edu.year}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {edu.institution}
                  </h3>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Grid: Step 3 Grid behavior */}
        <section>
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 shrink-0">
              Selected Works
            </h2>
            <div className="h-px bg-white/5 w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.projects.length > 0 ? (
              profile.projects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  themeColor={profile.themeColor} 
                  onClick={() => onSelectProject(project.id)}
                />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 py-24 text-center border border-dashed border-white/10 rounded-3xl">
                <p className="text-neutral-600 uppercase tracking-widest text-xs font-bold">In fase di allestimento / Nuovi progetti in arrivo</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
