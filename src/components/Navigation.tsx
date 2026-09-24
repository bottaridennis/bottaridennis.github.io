import { useState } from 'react';
import { useLocalizedPortfolio } from '../portfolioData';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Github, 
  Menu, 
  X, 
  ArrowUpRight, 
  Compass, 
  Sparkles,
  Search,
  Sun,
  Moon
} from 'lucide-react';
import DBLogo from './DBLogo';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  activeProfileId: string | null;
  onNavigate: (id: string | null) => void;
  onOpenSearch?: () => void;
}

// Explicit color definitions to guarantee vibrant rendering and smooth transitions on all items
const profileColorMap: Record<string, { color: string; bgSoft: string; text: string }> = {
  'web-developer': { color: '#3b82f6', bgSoft: 'rgba(59, 130, 246, 0.12)', text: 'text-blue-400' },
  'game-designer': { color: '#10b981', bgSoft: 'rgba(16, 185, 129, 0.12)', text: 'text-emerald-400' },
  'elettricista': { color: '#f59e0b', bgSoft: 'rgba(245, 158, 11, 0.12)', text: 'text-amber-400' },
  'musicista': { color: '#a855f7', bgSoft: 'rgba(168, 85, 247, 0.12)', text: 'text-purple-400' },
  'graphic-designer': { color: '#f43f5e', bgSoft: 'rgba(244, 63, 94, 0.12)', text: 'text-rose-400' },
  'artista': { color: '#06b6d4', bgSoft: 'rgba(6, 182, 212, 0.12)', text: 'text-cyan-400' },
  'persona': { color: '#94a3b8', bgSoft: 'rgba(148, 163, 184, 0.12)', text: 'text-slate-300' },
};

export default function Navigation({ activeProfileId, onNavigate, onOpenSearch }: NavigationProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const portfolio = useLocalizedPortfolio();

  const handleSelect = (id: string | null) => {
    onNavigate(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* ========================================================
          DESKTOP SIDEBAR - Soft, Modern & Elegant
      ======================================================== */}
      <aside className="w-80 h-full border-r border-white/[0.08] p-6 flex flex-col justify-between bg-zinc-950/70 backdrop-blur-2xl hidden md:flex shrink-0 z-40 select-none">
        <div className="space-y-6">
          {/* Personal Brand Card */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            <button 
              onClick={() => handleSelect(null)}
              className="w-full text-left group flex items-center gap-3.5 transition-all"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1.5px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/35 transition-all duration-300">
                  <div 
                    className="db-logo-box w-full h-full rounded-[14px] flex items-center justify-center p-2.5 transition-colors shadow-sm"
                    style={{ backgroundColor: isDark ? '#09090b' : '#ffffff' }}
                  >
                    <DBLogo className="w-full h-full group-hover:scale-105 transition-transform" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-950 shadow-sm" title={t.onlineStatus} />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="font-heading font-bold text-base text-white group-hover:text-purple-300 transition-colors truncate">
                  Dennis Bottari
                </h1>
                <p className="text-xs text-zinc-400 font-medium truncate">
                  {t.creativeDeveloper}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-zinc-500 font-medium">{t.location}</span>
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Items List */}
          <nav className="space-y-1.5">
            <div className="px-3 pb-1.5 flex items-center justify-between text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              <span>{t.explore}</span>
              <Sparkles size={12} className="text-zinc-600" />
            </div>

            {/* Home / Overview button */}
            <button 
              onClick={() => handleSelect(null)}
              className={`w-full relative flex items-center justify-between py-2.5 px-3.5 rounded-xl text-xs font-medium transition-all group ${
                !activeProfileId 
                  ? 'text-white font-semibold' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {/* Active Background Capsule */}
              {!activeProfileId && (
                <motion.div 
                  layoutId="activeNavBackground"
                  className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.1] -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}

              {/* The Active Sliding Indicator ("simpatico rettangolino") */}
              {!activeProfileId && (
                <motion.div 
                  layoutId="activeNavIndicator"
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-5 rounded-full shadow-sm"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}

              <div className="flex items-center gap-3 pl-1.5">
                <div className={`p-1.5 rounded-lg transition-colors ${!activeProfileId ? 'bg-white text-zinc-950' : 'bg-white/[0.05] text-zinc-400 group-hover:text-white'}`}>
                  <Compass size={15} />
                </div>
                <span>{t.overview}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-400 font-mono-tech">
                {t.home}
              </span>
            </button>

            {/* Disciplines Section Header */}
            <div className="pt-3 px-3 pb-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
              <span>{t.disciplines} ({portfolio.length})</span>
            </div>

            {/* 7 Disciplines with smooth active gliding pill */}
            <div className="space-y-1">
              {portfolio.map((profile) => {
                const isActive = activeProfileId === profile.id;
                const IconComponent = profile.icon;
                const meta = profileColorMap[profile.id] || { 
                  color: '#6366f1', 
                  bgSoft: 'rgba(99, 102, 241, 0.12)', 
                  text: 'text-indigo-400' 
                };
                const displayTitle = t.profileTitles[profile.id] || profile.title;

                return (
                  <button
                    key={profile.id}
                    onClick={() => handleSelect(profile.id)}
                    className={`w-full relative flex items-center justify-between py-2 px-3 rounded-xl text-xs transition-all group ${
                      isActive 
                        ? 'text-white font-semibold' 
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {/* Active Background Capsule */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavBackground"
                        className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.1] -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}

                    {/* The Active Sliding Indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-5 rounded-full"
                        style={{
                          backgroundColor: meta.color,
                          boxShadow: `0 0 10px ${meta.color}`
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}

                    <div className="flex items-center gap-2.5 pl-1.5 truncate">
                      <div 
                        className="p-1.5 rounded-lg transition-all shrink-0"
                        style={{
                          backgroundColor: isActive ? meta.bgSoft : 'rgba(255, 255, 255, 0.04)',
                          color: isActive ? meta.color : undefined
                        }}
                      >
                        <IconComponent size={14} className={!isActive ? 'text-zinc-400 group-hover:text-white' : ''} />
                      </div>
                      <span className="truncate text-[13px]">
                        {displayTitle}
                      </span>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-500 font-mono-tech group-hover:text-zinc-300">
                      {profile.projects.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Sidebar Footer - Clean & Elegant */}
        <div className="pt-5 border-t border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a 
                href="https://dennisbottari.it" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-zinc-400 hover:text-white border border-white/[0.06] transition-all text-xs flex items-center gap-1.5"
              >
                <Globe size={13} />
                <span>{t.site}</span>
              </a>
              <a 
                href="https://github.com/bottaridennis" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-zinc-400 hover:text-white border border-white/[0.06] transition-all text-xs flex items-center gap-1.5"
              >
                <Github size={13} />
                <span>{t.github}</span>
              </a>
            </div>

            <span className="text-[11px] text-zinc-500">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MOBILE NAVIGATION HEADER & DRAWER
      ======================================================== */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/[0.08] bg-zinc-950/85 backdrop-blur-xl z-50 flex items-center justify-between px-3 sm:px-4">
        {/* Brand / Logo */}
        <button 
          onClick={() => handleSelect(null)} 
          className="flex items-center gap-2.5 text-left cursor-pointer min-w-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1.5px] shadow-md flex items-center justify-center shrink-0">
            <div 
              className="db-logo-box w-full h-full rounded-[10px] flex items-center justify-center p-1.5 transition-colors shadow-sm"
              style={{ backgroundColor: isDark ? '#09090b' : '#ffffff' }}
            >
              <DBLogo className="w-full h-full" />
            </div>
          </div>
          <div className="min-w-0">
            <span className="font-heading font-bold text-sm text-white block leading-tight truncate">
              Dennis Bottari
            </span>
            <span className="text-[10px] text-zinc-400 block truncate">
              {activeProfileId 
                ? (t.profileTitles[activeProfileId] || portfolio.find(p => p.id === activeProfileId)?.title)
                : 'Portfolio'}
            </span>
          </div>
        </button>

        {/* Mobile Navbar Actions Bar (Theme, Search, Language, Menu) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* 1. Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all flex items-center justify-center cursor-pointer"
            aria-label={isDark ? t.toggleThemeLight : t.toggleThemeDark}
            title={isDark ? t.toggleThemeLight : t.toggleThemeDark}
          >
            {isDark ? (
              <Sun size={15} className="text-amber-400" />
            ) : (
              <Moon size={15} className="text-indigo-400" />
            )}
          </button>

          {/* 2. Search Modal Trigger */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-purple-300 hover:bg-white/[0.08] transition-all flex items-center justify-center cursor-pointer"
              aria-label={t.searchPortfolio}
              title={t.searchPortfolio}
            >
              <Search size={15} />
            </button>
          )}

          {/* 3. Language Switcher (IT / EN) */}
          <button
            onClick={toggleLanguage}
            className="h-8 px-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-200 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1 text-[11px] font-mono-tech font-bold cursor-pointer"
            aria-label={t.languageToggle}
            title={language === 'it' ? 'Switch to English (EN)' : 'Passa all\'Italiano (IT)'}
          >
            <Globe size={12} className="text-cyan-400 shrink-0" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* 4. Drawer Toggle Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 text-zinc-200 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer ml-0.5 flex items-center justify-center"
            aria-label="Menu"
          >
            {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-zinc-950/95 backdrop-blur-2xl p-6 overflow-y-auto flex flex-col justify-between border-b border-white/10"
          >
            <div className="space-y-5">
              <button
                onClick={() => handleSelect(null)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-medium transition-all ${
                  !activeProfileId 
                    ? 'bg-white text-zinc-950 font-semibold shadow-lg' 
                    : 'bg-white/[0.04] text-zinc-300 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Compass size={18} />
                  <span>{t.overview}</span>
                </div>
                <span className="text-xs opacity-60">{t.home}</span>
              </button>

              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-1">
                  {t.selectDiscipline}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {portfolio.map((profile) => {
                    const isActive = activeProfileId === profile.id;
                    const IconComponent = profile.icon;
                    const meta = profileColorMap[profile.id] || { color: '#6366f1', text: 'text-indigo-400' };
                    const displayTitle = t.profileTitles[profile.id] || profile.title;

                    return (
                      <button
                        key={profile.id}
                        onClick={() => handleSelect(profile.id)}
                        className={`flex items-center justify-between p-3 rounded-xl text-sm transition-all ${
                          isActive
                            ? 'bg-white/[0.1] text-white border border-white/20 font-semibold'
                            : 'bg-white/[0.02] text-zinc-400 border border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${meta.color}25`, color: meta.color }}
                          >
                            <IconComponent size={16} />
                          </div>
                          <span>{displayTitle}</span>
                        </div>
                        <span className="text-xs text-zinc-500">
                          {profile.projects.length} {t.projectsCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <a 
                href="https://dennisbottari.it" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white"
              >
                dennisbottari.it <ArrowUpRight size={13} />
              </a>
              <span>{t.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
