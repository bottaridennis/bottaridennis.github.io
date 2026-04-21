/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ProfilePage from './components/ProfilePage';
import ProjectPage from './components/ProjectPage';
import { portfolioData } from './portfolioData';

export default function App() {
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Sync state with URL hash
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      const parts = hash.split('/');
      
      const profile = portfolioData.find(p => p.id === parts[0]);
      setActiveProfileId(profile ? profile.id : null);
      
      if (parts[1] && profile) {
        const project = profile.projects.find(pj => pj.id === parts[1]);
        setActiveProjectId(project ? project.id : null);
      } else {
        setActiveProjectId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (profileId: string | null, projectId: string | null = null) => {
    setActiveProfileId(profileId);
    setActiveProjectId(projectId);
    
    if (profileId && projectId) {
      window.history.pushState(null, '', `#${profileId}/${projectId}`);
    } else if (profileId) {
      window.history.pushState(null, '', `#${profileId}`);
    } else {
      window.history.pushState(null, '', '/');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProfile = portfolioData.find(p => p.id === activeProfileId);
  const activeProject = activeProfile?.projects.find(pj => pj.id === activeProjectId);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-neutral-200 font-sans selection:bg-neutral-100 selection:text-neutral-950">
      <Navigation 
        activeProfileId={activeProfileId} 
        onNavigate={handleNavigate} 
      />
      
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/10 bg-neutral-900/50 backdrop-blur-xl z-50 flex items-center justify-between px-6">
        <button onClick={() => handleNavigate(null)} className="text-xl font-black tracking-tighter text-white">
          DENNIS BOTTARI
        </button>
        <div className="flex gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        </div>
      </div>
      
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black relative">
        <AnimatePresence mode="wait">
          {!activeProfileId ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <Home onProfileClick={(id) => handleNavigate(id)} />
            </motion.div>
          ) : activeProject ? (
            <motion.div
              key={`${activeProfileId}-${activeProjectId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <ProjectPage 
                project={activeProject} 
                profile={activeProfile!} 
                onBack={() => handleNavigate(activeProfileId, null)} 
              />
            </motion.div>
          ) : (
            activeProfile && (
              <motion.div
                key={activeProfileId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <ProfilePage 
                  profile={activeProfile} 
                  onBack={() => handleNavigate(null)}
                  onSelectProject={(projectId) => handleNavigate(activeProfileId, projectId)}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
