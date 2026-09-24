import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Code2, Terminal, Play, FolderTree, FileCode, CheckCircle2, GitBranch, Sparkles } from 'lucide-react';
import { Profile, Project } from '../../types';

interface IDEViewProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

export default function IDEWorkspaceView({ profile, onBack, onSelectProject }: IDEViewProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'skills' | 'terminal'>('editor');

  return (
    <div className="min-h-full px-3 py-6 sm:px-6 md:px-10 lg:py-8 max-w-7xl mx-auto space-y-6 select-none font-mono">
      {/* Top IDE Window Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-blue-400 border border-blue-500/30 text-xs font-semibold tracking-wider transition-all group cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>[ ESC ] ESCI A PANORAMICA</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
            <GitBranch size={13} className="text-blue-400" />
            <span className="text-blue-300 font-bold">git:(main)</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-emerald-400">
            <span>● TypeScript 5.x Ready</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN IDE WINDOW CONTAINER (VS CODE / JETBRAINS AESTHETIC)
      ========================================================================= */}
      <div className="rounded-2xl bg-[#0c111a] border-2 border-blue-500/40 shadow-2xl shadow-blue-950/30 overflow-hidden relative">
        {/* IDE Titlebar with macOS Controls */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#101726] to-zinc-950 border-b border-blue-500/30 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 text-xs text-zinc-400 hidden sm:inline font-mono">
              dennis-portfolio &gt; src &gt; disciplines &gt; WebDeveloper.tsx
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-300 font-mono font-bold">
            <Code2 size={15} className="text-blue-400" />
            <span>FRONTEND ARCHITECTURE WORKSPACE</span>
          </div>
        </div>

        {/* IDE File Tabs */}
        <div className="bg-zinc-950/80 border-b border-zinc-800 px-4 pt-2 flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-bold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'editor'
                ? 'bg-[#0c111a] text-blue-300 border-blue-500/40 border-b-[#0c111a]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            <FileCode size={13} className="text-blue-400" />
            <span>Projects.tsx ({profile.projects.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-bold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'skills'
                ? 'bg-[#0c111a] text-blue-300 border-blue-500/40 border-b-[#0c111a]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            <FolderTree size={13} className="text-purple-400" />
            <span>TechStack.json</span>
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-bold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'terminal'
                ? 'bg-[#0c111a] text-blue-300 border-blue-500/40 border-b-[#0c111a]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            <Terminal size={13} className="text-emerald-400" />
            <span>Terminal.bash</span>
          </button>
        </div>

        {/* IDE Content Area */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* TAB 1: Projects as Typed Component Modules */}
          {activeTab === 'editor' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-500 pb-2 border-b border-zinc-800">
                <span className="text-blue-300 font-bold">
                  // EXPORT CONST REPOSITORIES: Project[] = [...]
                </span>
                <span>VITE + REACT 19 SPA ENGINE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {profile.projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ y: -3 }}
                    onClick={() => onSelectProject(project.id)}
                    className="p-5 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-blue-500/60 transition-all cursor-pointer group relative overflow-hidden shadow-lg flex flex-col justify-between"
                  >
                    {/* Code Snippet Header */}
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800/80 text-[11px] font-mono">
                      <span className="text-purple-400 font-bold">const module_{idx + 1} =</span>
                      <span className="text-zinc-500 text-[10px]">import(UI)</span>
                    </div>

                    {/* Screenshot Preview */}
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-zinc-900 border border-zinc-800">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 text-[11px] font-bold text-blue-300 bg-black/70 px-2 py-0.5 rounded border border-blue-500/30">
                        &lt;{project.title} /&gt;
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Stack tags */}
                    <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-blue-200 border border-blue-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-xs text-blue-400 font-bold group-hover:text-blue-300">
                        <span>ISPEZIONA</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>
                  </motion.div>
                ))}
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
  "uiUxPrinciples": ["Design Responsivo", "Zero-Slop Discipline", "Accessibilità WCAG"],
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
                <span>bash - dennis@verona: ~/portfolio</span>
              </div>
              <div className="space-y-2 text-zinc-300">
                <p className="text-emerald-400">$ whoami</p>
                <p className="text-zinc-400 font-sans leading-relaxed text-sm">
                  {profile.intro}
                </p>
                <p className="text-emerald-400 pt-2">$ npm run build</p>
                <p className="text-zinc-500">&gt; vite build: 100% completed in 240ms</p>
                <p className="text-emerald-300">✓ Compiled successfully with zero errors.</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom IDE Status Bar */}
        <div className="bg-zinc-950 border-t border-zinc-800 px-5 py-2 flex flex-wrap items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="text-blue-400">● TSX / UTF-8</span>
            <span>·</span>
            <span>PORT: 3000</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">Prettier: Formatted</span>
            <span>·</span>
            <span>Lighthouse: 100/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
