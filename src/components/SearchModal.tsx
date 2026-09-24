import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Sparkles, 
  Code, 
  Gamepad2, 
  Music, 
  Zap, 
  Brush, 
  Palette, 
  User, 
  CornerDownLeft,
  Layers,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useLocalizedPortfolio } from '../portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Project, Profile } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (profileId: string | null, projectId?: string | null) => void;
}

interface SearchResultItem {
  type: 'project' | 'profile';
  id: string;
  title: string;
  subtitle: string;
  description: string;
  profileId: string;
  profileTitle: string;
  projectId?: string;
  icon: any;
  accentColor: string;
  tags?: string[];
  imageUrl?: string;
}

export default function SearchModal({ isOpen, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const portfolio = useLocalizedPortfolio();

  // Focus input whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveCategory('all');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Aggregate all searchable items
  const allItems: SearchResultItem[] = useMemo(() => {
    const list: SearchResultItem[] = [];

    // Add all discipline profiles
    portfolio.forEach((profile) => {
      const translatedTitle = t.profileTitles[profile.id] || profile.title;
      list.push({
        type: 'profile',
        id: `profile-${profile.id}`,
        title: translatedTitle,
        subtitle: `${profile.projects.length} ${t.projectsCount}`,
        description: profile.intro,
        profileId: profile.id,
        profileTitle: translatedTitle,
        icon: profile.icon,
        accentColor: profile.themeColor || 'text-indigo-400',
        tags: profile.skills || [],
      });

      // Add each project within this discipline
      profile.projects.forEach((pj) => {
        list.push({
          type: 'project',
          id: `proj-${profile.id}-${pj.id}`,
          title: pj.title,
          subtitle: translatedTitle,
          description: pj.description,
          profileId: profile.id,
          profileTitle: translatedTitle,
          projectId: pj.id,
          icon: profile.icon,
          accentColor: profile.themeColor || 'text-purple-400',
          tags: pj.technologies || [],
          imageUrl: pj.imageUrl,
        });
      });
    });

    return list;
  }, [portfolio, t, language]);

  // Categories for quick filtering
  const categories = useMemo(() => {
    return [
      { id: 'all', label: t.searchAll },
      { id: 'web-developer', label: 'Web' },
      { id: 'game-designer', label: 'Game' },
      { id: 'musicista', label: 'Music' },
      { id: 'elettricista', label: 'IoT & Elettronica' },
      { id: 'graphic-designer', label: 'Design' },
      { id: 'artista', label: 'Arte' },
    ];
  }, [t]);

  // Filter items based on query and activeCategory
  const filteredResults = useMemo(() => {
    const cleanQuery = query.toLowerCase().trim();

    return allItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.profileId !== activeCategory) {
        return false;
      }

      if (!cleanQuery) return true;

      // Query match
      const inTitle = item.title.toLowerCase().includes(cleanQuery);
      const inDesc = item.description.toLowerCase().includes(cleanQuery);
      const inProfile = item.profileTitle.toLowerCase().includes(cleanQuery);
      const inTags = item.tags?.some((tag) => tag.toLowerCase().includes(cleanQuery));

      return inTitle || inDesc || inProfile || inTags;
    });
  }, [allItems, query, activeCategory]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Keyboard navigation within modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < filteredResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : Math.max(0, filteredResults.length - 1)
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredResults[selectedIndex];
        if (selected) {
          handleItemClick(selected);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleItemClick = (item: SearchResultItem) => {
    if (item.type === 'profile') {
      onSelect(item.profileId, null);
    } else {
      onSelect(item.profileId, item.projectId || null);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-24 px-4 pb-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="relative w-full max-w-2xl bg-zinc-900/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl z-10 flex flex-col max-h-[80vh] text-zinc-100"
          >
            {/* Header & Input */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] relative">
              <div className="relative flex items-center">
                <Search size={20} className="absolute left-3.5 text-zinc-400 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-zinc-500 text-sm sm:text-base focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3.5 p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Cancella testo"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Quick Filter Categories */}
              <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30'
                        : 'bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results List */}
            <div 
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-3 space-y-1.5 min-h-[160px] max-h-[420px]"
            >
              {filteredResults.length === 0 ? (
                <div className="py-12 px-6 text-center text-zinc-400">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/5 mx-auto flex items-center justify-center mb-3">
                    <Search size={22} className="text-zinc-500" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-200">
                    {t.noResultsFound} "{query}"
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                    {t.tryDifferentSearch}
                  </p>
                </div>
              ) : (
                filteredResults.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      data-selected={isSelected}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => handleItemClick(item)}
                      className={`group relative p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isSelected 
                          ? 'bg-white/[0.08] border border-white/15 shadow-sm' 
                          : 'hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* Artwork or Icon */}
                        {item.imageUrl ? (
                          <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-zinc-800 border border-white/10 relative">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                            />
                          </div>
                        ) : (
                          <div className="w-11 h-11 rounded-lg shrink-0 bg-white/[0.06] border border-white/10 flex items-center justify-center">
                            <Icon size={18} className={item.accentColor} />
                          </div>
                        )}

                        {/* Title, Subtitle, Tags */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-heading font-semibold text-sm text-white group-hover:text-purple-300 transition-colors truncate">
                              {item.title}
                            </h4>
                            <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400 shrink-0">
                              {item.type === 'profile' ? (language === 'it' ? 'Disciplina' : 'Discipline') : item.profileTitle}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex items-center gap-1.5 mt-1.5 overflow-hidden">
                              {item.tags.slice(0, 4).map((tag, tIdx) => (
                                <span 
                                  key={tIdx} 
                                  className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/[0.04] text-zinc-400 border border-white/5 truncate"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Action Hint */}
                      <div className="shrink-0 flex items-center gap-1.5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        <span className="hidden sm:inline text-[11px] font-medium">
                          {item.type === 'profile' ? t.openDiscipline : t.openProject}
                        </span>
                        <ChevronRight size={15} className={`transition-transform ${isSelected ? 'translate-x-0.5 text-purple-400' : ''}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with Keyboard Hints */}
            <div className="p-3 bg-zinc-950/60 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300 border border-white/10 font-mono text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300 border border-white/10 font-mono text-[10px]">↓</kbd>
                  <span className="hidden sm:inline">{t.navigateWithKeys}</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300 border border-white/10 font-mono text-[10px]">↵</kbd>
                  <span className="hidden sm:inline">{language === 'it' ? 'Invio' : 'Enter'}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-400">
                  {filteredResults.length} {t.matches}
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300 border border-white/10 font-mono text-[10px]">ESC</kbd>
                  <span className="hidden sm:inline">{t.pressEscToClose}</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
