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
import Footer from './components/Footer';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';
import GameModal, { PlayableGame } from './components/GameModal';
import { AudioProvider } from './context/AudioContext';
import { portfolioData } from './portfolioData';

export default function App() {
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeGameModal, setActiveGameModal] = useState<PlayableGame | null>(null);

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
    <AudioProvider>
      <div className="flex h-screen overflow-hidden bg-[#0b0f17] text-zinc-100 font-sans selection:bg-purple-500/20 selection:text-white">
        {/* Universal Navigation (Desktop Sidebar & Responsive Mobile Drawer) */}
        <Navigation 
          activeProfileId={activeProfileId} 
          onNavigate={handleNavigate} 
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <main className="flex-1 overflow-y-auto pt-16 md:pt-0 bg-[#0b0f17] relative bg-ambient-mesh">
            <AnimatePresence mode="wait">
              {!activeProfileId ? (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="min-h-full"
                >
                  <Home 
                    onProfileClick={(id) => handleNavigate(id)} 
                    onDirectProjectClick={(profileId, projectId) => handleNavigate(profileId, projectId)}
                    onPlayGame={(game) => setActiveGameModal(game)}
                  />
                </motion.div>
              ) : activeProject ? (
                <motion.div
                  key={`${activeProfileId}-${activeProjectId}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="min-h-full"
                >
                  <ProjectPage 
                    project={activeProject} 
                    profile={activeProfile!} 
                    onBack={() => handleNavigate(activeProfileId, null)} 
                    onSelectProject={(projectId) => handleNavigate(activeProfileId, projectId)}
                    onPlayGame={(game) => setActiveGameModal(game)}
                  />
                </motion.div>
              ) : (
                activeProfile && (
                  <motion.div
                    key={activeProfileId}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="min-h-full"
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

          {/* Mini Audio Player Globale e Persistente */}
          <GlobalAudioPlayer 
            onNavigateToTrack={(profileId, projectId) => handleNavigate(profileId, projectId)} 
          />

          {/* Subtle, Fixed-Bottom Footer in Main Content Area */}
          <Footer />
        </div>

        {/* Global "Play in Browser" Modal per i Videogiochi */}
        <GameModal 
          isOpen={!!activeGameModal} 
          onClose={() => setActiveGameModal(null)} 
          game={activeGameModal} 
        />
      </div>
    </AudioProvider>
  );
}
