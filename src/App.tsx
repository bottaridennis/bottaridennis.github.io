/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ProfilePage from './components/ProfilePage';
import ProjectPage from './components/ProjectPage';
import Footer from './components/Footer';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';
import GameModal, { PlayableGame } from './components/GameModal';
import { AudioProvider } from './context/AudioContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import SearchModal from './components/SearchModal';
import { useLocalizedPortfolio } from './portfolioData';

// App-like directional page transition variants
const pageTransitionVariants = {
  initial: (direction: 'forward' | 'backward') => ({
    opacity: 0,
    x: direction === 'forward' ? 36 : -36,
    scale: 0.985,
    filter: 'blur(3px)',
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: 'forward' | 'backward') => ({
    opacity: 0,
    x: direction === 'forward' ? -32 : 32,
    scale: 0.99,
    filter: 'blur(2px)',
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function AppContent() {
  const portfolio = useLocalizedPortfolio();
  const { language } = useLanguage();
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeGameModal, setActiveGameModal] = useState<PlayableGame | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [navDirection, setNavDirection] = useState<'forward' | 'backward'>('forward');
  const prevDepthRef = useRef<number>(0);
  const mainRef = useRef<HTMLElement>(null);

  const getPageDepth = (profileId: string | null, projectId: string | null): number => {
    if (projectId) return 2;
    if (profileId) return 1;
    return 0;
  };

  const handleScrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global keyboard shortcut for search (⌘K or Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      } else if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync state with URL hash
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      const parts = hash.split('/');
      
      const profile = portfolio.find(p => p.id === parts[0]);
      const matchedProfileId = profile ? profile.id : null;
      let matchedProjectId: string | null = null;
      
      if (parts[1] && profile) {
        const project = profile.projects.find(pj => pj.id === parts[1]);
        matchedProjectId = project ? project.id : null;
      }

      const nextDepth = getPageDepth(matchedProfileId, matchedProjectId);
      setNavDirection(nextDepth >= prevDepthRef.current ? 'forward' : 'backward');
      prevDepthRef.current = nextDepth;

      setActiveProfileId(matchedProfileId);
      setActiveProjectId(matchedProjectId);
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, [portfolio]);

  const handleNavigate = (profileId: string | null, projectId: string | null = null) => {
    const nextDepth = getPageDepth(profileId, projectId);
    setNavDirection(nextDepth >= prevDepthRef.current ? 'forward' : 'backward');
    prevDepthRef.current = nextDepth;

    setActiveProfileId(profileId);
    setActiveProjectId(projectId);
    
    if (profileId && projectId) {
      window.history.pushState(null, '', `#${profileId}/${projectId}`);
    } else if (profileId) {
      window.history.pushState(null, '', `#${profileId}`);
    } else {
      window.history.pushState(null, '', '/');
    }
    
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProfile = portfolio.find(p => p.id === activeProfileId);
  const activeProject = activeProfile?.projects.find(pj => pj.id === activeProjectId);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0f17] text-zinc-100 font-sans selection:bg-purple-500/20 selection:text-white">
      {/* Universal Navigation (Desktop Sidebar & Responsive Mobile Drawer) */}
      <Navigation 
        activeProfileId={activeProfileId} 
        onNavigate={handleNavigate} 
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <main 
          ref={mainRef}
          className="flex-1 overflow-y-auto overflow-x-hidden pt-16 md:pt-0 bg-[#0b0f17] relative bg-ambient-mesh"
        >
          <AnimatePresence mode="wait" custom={navDirection}>
            {!activeProfileId ? (
              <motion.div
                key={`home-${language}`}
                custom={navDirection}
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-full will-change-transform"
              >
                <Home 
                  onProfileClick={(id) => handleNavigate(id)} 
                  onDirectProjectClick={(profileId, projectId) => handleNavigate(profileId, projectId)}
                  onPlayGame={(game) => setActiveGameModal(game)}
                />
              </motion.div>
            ) : activeProject ? (
              <motion.div
                key={`${activeProfileId}-${activeProjectId}-${language}`}
                custom={navDirection}
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-full will-change-transform"
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
                  key={`${activeProfileId}-${language}`}
                  custom={navDirection}
                  variants={pageTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="min-h-full will-change-transform"
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

        {/* Footer with Integrated Quick Actions Toolbar */}
        <Footer 
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onScrollToTop={handleScrollToTop}
        />
      </div>

      {/* Global Spotlight / Omni-Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelect={(profId, projId) => {
          handleNavigate(profId, projId || null);
        }}
      />

      {/* Global "Play in Browser" Modal per i Videogiochi */}
      <GameModal 
        isOpen={!!activeGameModal} 
        onClose={() => setActiveGameModal(null)} 
        game={activeGameModal} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AudioProvider>
          <AppContent />
        </AudioProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
