import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Code2, Terminal, FolderTree, FileCode, GitBranch, ExternalLink, Filter } from 'lucide-react';
import { Profile } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface IDEViewProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

export default function IDEWorkspaceView({ profile, onBack, onSelectProject }: IDEViewProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'skills' | 'terminal'>('editor');
  const [filterCategory, setFilterCategory] = useState<'all' | 'apps' | 'portals' | 'tools'>('all');
  const { language } = useLanguage();

  const appIds = ['rev-minds', 'dnd-hub', 'nerd-shelf', 'party-organizer', 'sonicvisual-studio', 'scp-database', 'defuser-game'];
  const portalIds = ['alice-portfolio', 'oppeado-assisi', 'old-portfolio', 'dennis-hub-root', 'arcon-web'];
  const toolIds = ['linkshelf', 'projects-hub', 'enc-dec'];

  const filteredProjects = useMemo(() => {
    if (filterCategory === 'apps') {
      return profile.projects.filter(p => appIds.includes(p.id));
    }
    if (filterCategory === 'portals') {
      return profile.projects.filter(p => portalIds.includes(p.id));
    }
    if (filterCategory === 'tools') {
      return profile.projects.filter(p => toolIds.includes(p.id));
    }
    return profile.projects;
  }, [profile.projects, filterCategory]);

  return (
    <div className="min-h-full px-3 py-4 sm:px-6 md:px-10 max-w-7xl mx-auto space-y-6 font-mono select-none">
      {/* Top IDE Window Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-500/20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-blue-400 border border-blue-500/30 text-xs font-semibold tracking-wide transition-all group cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>{language === 'it' ? 'Torna alla panoramica' : 'Back to overview'}</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
            <Code2 size={13} className="text-blue-400" />
            <span className="text-blue-300 font-semibold">{profile.projects.length} {language === 'it' ? 'progetti attivi' : 'active projects'}</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN IDE WINDOW CONTAINER (VS CODE / JETBRAINS AESTHETIC)
      ========================================================================= */}
      <div className="rounded-2xl bg-[#0c111a] border-2 border-blue-500/40 shadow-2xl shadow-blue-950/30 overflow-hidden relative">
        {/* IDE Titlebar with Window Controls */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#101726] to-zinc-950 border-b border-blue-500/20 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 text-xs text-zinc-300 font-medium font-sans">
              Dennis Bottari · Web Developer Studio
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-300 font-mono">
            <Code2 size={14} className="text-blue-400" />
            <span className="font-semibold">{profile.projects.length} {language === 'it' ? 'progetti' : 'projects'}</span>
          </div>
        </div>

        {/* IDE File Tabs */}
        <div className="bg-zinc-950/80 border-b border-zinc-800 px-4 pt-2 flex items-center gap-1.5 overflow-x-auto text-xs font-sans">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-semibold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'editor'
                ? 'bg-[#0c111a] text-blue-300 border-blue-500/40 border-b-[#0c111a]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            <FileCode size={13} className="text-blue-400" />
            <span>{language === 'it' ? 'Progetti Web' : 'Web Projects'} ({profile.projects.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-semibold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'skills'
                ? 'bg-[#0c111a] text-blue-300 border-blue-500/40 border-b-[#0c111a]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            <FolderTree size={13} className="text-purple-400" />
            <span>Tech Stack</span>
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-semibold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'terminal'
                ? 'bg-[#0c111a] text-blue-300 border-blue-500/40 border-b-[#0c111a]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            <Terminal size={13} className="text-emerald-400" />
            <span>Bio & Filosofia Dev</span>
          </button>
        </div>

        {/* IDE Content Area */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* TAB 1: Projects */}
          {activeTab === 'editor' && (
            <div className="space-y-5">
              {/* Category & Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-200 font-bold text-xs uppercase tracking-wider font-sans">
                    {language === 'it' ? 'Progetti & Applicazioni Web' : 'Web Applications & Projects'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 text-[11px]">
                    {filteredProjects.length}
                  </span>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 font-sans text-xs">
                  <span className="text-zinc-500 flex items-center gap-1 mr-1 text-[11px]">
                    <Filter size={11} />
                    <span>Filtra:</span>
                  </span>
                  {[
                    { id: 'all', label: language === 'it' ? `Tutti (${profile.projects.length})` : `All (${profile.projects.length})` },
                    { id: 'apps', label: language === 'it' ? `Web Apps (${profile.projects.filter(p => appIds.includes(p.id)).length})` : `Web Apps (${profile.projects.filter(p => appIds.includes(p.id)).length})` },
                    { id: 'portals', label: language === 'it' ? `Portali & Community (${profile.projects.filter(p => portalIds.includes(p.id)).length})` : `Portals & Community (${profile.projects.filter(p => portalIds.includes(p.id)).length})` },
                    { id: 'tools', label: language === 'it' ? `Strumenti & Utility (${profile.projects.filter(p => toolIds.includes(p.id)).length})` : `Tools & Utilities (${profile.projects.filter(p => toolIds.includes(p.id)).length})` }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setFilterCategory(filter.id as any)}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer text-xs ${
                        filterCategory === filter.id
                          ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50 font-bold'
                          : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((project, idx) => {
                  const liveLink = project.links?.find(l => (l.type === 'preview' || l.type === 'external') && l.url !== '#');
                  return (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -3 }}
                      onClick={() => onSelectProject(project.id)}
                      className="p-5 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-blue-500/60 transition-all cursor-pointer group relative overflow-hidden shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800/80 text-[11px]">
                          <span className="text-zinc-200 font-semibold font-sans truncate">{project.title}</span>
                          <span className="text-zinc-500 text-[10px] font-mono shrink-0 ml-2">#{idx + 1}</span>
                        </div>

                        {/* Screenshot Preview */}
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-zinc-900 border border-zinc-800">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2 text-[11px] font-semibold text-blue-200 bg-black/80 px-2 py-0.5 rounded border border-blue-500/30 font-sans">
                            {project.title}
                          </div>

                          {liveLink && (
                            <a
                              href={liveLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/90 hover:bg-emerald-900 hover:text-white px-2 py-0.5 rounded border border-emerald-500/40 transition-colors shadow-md z-10"
                              title={language === 'it' ? 'Apri sito in una nuova scheda' : 'Open live site in new tab'}
                            >
                              <span>LIVE SITE</span>
                              <ExternalLink size={10} />
                            </a>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-4">
                          {project.description}
                        </p>
                      </div>

                      {/* Stack tags */}
                      <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 font-sans">
                        <div className="flex flex-wrap gap-1 text-[10px]">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-blue-200 border border-blue-500/20">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-blue-400 font-semibold group-hover:text-blue-300">
                          <span>{language === 'it' ? 'Dettagli' : 'Details'}</span>
                          <ArrowUpRight size={13} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Skills as JSON */}
          {activeTab === 'skills' && (
            <div className="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-4 text-xs font-mono">
              <div className="text-blue-300 font-bold">TechStack.json</div>
              <pre className="p-4 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300 overflow-x-auto leading-relaxed">
{`{
  "developer": "Dennis Bottari",
  "location": "Verona, Italy",
  "frontend": ["React", "TypeScript", "Tailwind CSS", "HTML5 Semantico", "Vite"],
  "cyberSecurity": ["Python", "Cifratura AES", "Secure File Management"],
  "uiUxPrinciples": ["Design Responsivo", "Accessibilità", "Performance"],
  "versionControl": ["Git", "GitHub Actions", "GitHub Pages Deployment"]
}`}
              </pre>
            </div>
          )}

          {/* TAB 3: Terminal */}
          {activeTab === 'terminal' && (
            <div className="p-6 rounded-xl bg-zinc-950/90 border border-zinc-800 space-y-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-400 border-b border-zinc-800 pb-2">
                <Terminal size={14} className="text-emerald-400" />
                <span>dennis@verona: ~/portfolio</span>
              </div>
              <div className="space-y-3 text-zinc-300 font-sans">
                <p className="text-emerald-400 font-mono">$ cat about_me.txt</p>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  {profile.intro}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom IDE Status Bar */}
        <div className="bg-zinc-950 border-t border-zinc-800 px-5 py-2.5 flex flex-wrap items-center justify-between text-xs text-zinc-400 font-sans">
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-semibold">{profile.projects.length} {language === 'it' ? 'progetti web' : 'web projects'}</span>
            <span className="text-zinc-600">·</span>
            <span>React, TypeScript, Tailwind CSS, Vite</span>
          </div>
          <div className="text-zinc-500 text-[11px]">
            Dennis Bottari Portfolio
          </div>
        </div>
      </div>
    </div>
  );
}
