import React, { useState } from 'react';
import { 
  Mail, 
  Instagram, 
  Linkedin, 
  Copy, 
  Check, 
  Sun, 
  Moon, 
  Globe, 
  Search, 
  ArrowUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onOpenSearch?: () => void;
  onScrollToTop?: () => void;
}

export default function Footer({ onOpenSearch, onScrollToTop }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const email = 'dennisbottari@gmail.com';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="shrink-0 w-full border-t border-white/[0.08] bg-zinc-950/85 backdrop-blur-xl z-20 py-2.5 px-3 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-3 text-xs">
        {/* Left Side: Status / Availability */}
        <div className="flex items-center gap-2 text-zinc-400 min-w-0 shrink-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="truncate text-[11px] sm:text-xs">
            <span className="hidden sm:inline">{t.availableForWork}</span>
            <span className="sm:hidden">{t.availableShort}</span>
          </span>
          <span className="hidden md:inline text-zinc-600 font-mono">·</span>
          <span className="hidden md:inline text-[11px] text-zinc-400 font-mono">
            {email}
          </span>
        </div>

        {/* Center: Integrated Quick Actions Bar (Theme, Search, IT/EN Multilanguage, Scroll to Top) - DESKTOP ONLY */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] shadow-inner backdrop-blur-md">
          {/* 1. Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all flex items-center justify-center group cursor-pointer"
            aria-label={isDark ? t.toggleThemeLight : t.toggleThemeDark}
            title={isDark ? t.toggleThemeLight : t.toggleThemeDark}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="dark-sun"
                  initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Sun size={15} className="text-amber-400 group-hover:rotate-45 transition-transform" />
                </motion.div>
              ) : (
                <motion.div
                  key="light-moon"
                  initial={{ rotate: 90, scale: 0.7, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Moon size={15} className="text-indigo-400 group-hover:-rotate-12 transition-transform" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* 2. Spotlight Search Trigger */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="px-2 py-1 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1.5 group text-[11px] cursor-pointer"
              aria-label={t.searchPortfolio}
              title={`${t.searchPortfolio} (${t.searchShortcut})`}
            >
              <Search size={14} className="text-zinc-400 group-hover:text-purple-400 transition-colors" />
              <span className="hidden sm:inline font-medium text-zinc-300 group-hover:text-white">
                {t.searchPortfolio}
              </span>
              <kbd className="hidden lg:inline-flex items-center px-1 py-0.2 rounded bg-white/[0.08] border border-white/10 text-[9px] font-mono text-zinc-400">
                {t.searchShortcut}
              </kbd>
            </button>
          )}

          {/* 3. Multilanguage Switcher (IT / EN) */}
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1.5 group text-[11px] cursor-pointer"
            aria-label={t.languageToggle}
            title={language === 'it' ? 'Cambia lingua in Inglese (EN)' : 'Switch language to Italian (IT)'}
          >
            <Globe size={13} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-mono-tech font-bold text-[11px] px-1.5 py-0.2 rounded bg-white/[0.08] text-white group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
              {language.toUpperCase()}
            </span>
          </button>

          {/* 4. Scroll to Top Button */}
          {onScrollToTop && (
            <button
              onClick={onScrollToTop}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all flex items-center justify-center group cursor-pointer"
              aria-label={t.scrollToTop}
              title={t.scrollToTop}
            >
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-zinc-400 group-hover:text-white" />
            </button>
          )}
        </div>

        {/* Right Side: Social Media Profiles, Quick Top, Contact CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 justify-end">
          {/* Mobile Scroll to Top button */}
          {onScrollToTop && (
            <button
              onClick={onScrollToTop}
              className="md:hidden p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-400 hover:text-white transition-all flex items-center justify-center cursor-pointer"
              aria-label={t.scrollToTop}
              title={t.scrollToTop}
            >
              <ArrowUp size={13} />
            </button>
          )}

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/dede.neko/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram: @dede.neko"
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-pink-400 border border-white/[0.06] transition-all flex items-center gap-1.5 group"
            aria-label="Profilo Instagram"
          >
            <Instagram size={14} className="group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline text-[11px] font-medium">Instagram</span>
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/dennis-bottari-708400241/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn: Dennis Bottari"
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-blue-400 border border-white/[0.06] transition-all flex items-center gap-1.5 group"
            aria-label="Profilo LinkedIn"
          >
            <Linkedin size={14} className="group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline text-[11px] font-medium">LinkedIn</span>
          </a>

          {/* Quick Copy Email Action */}
          <button
            onClick={handleCopyEmail}
            title={copied ? t.copied : t.copyEmail}
            className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 text-[11px] cursor-pointer ${
              copied
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.06] text-zinc-400 hover:text-zinc-200'
            }`}
            aria-label={t.copyEmail}
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span className="hidden xl:inline">{copied ? t.copied : 'Email'}</span>
          </button>

          {/* Primary Contact Button (mailto) */}
          <a
            href={`mailto:${email}?subject=Contatto%20dal%20Portfolio`}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 whitespace-nowrap"
            title={`Scrivi a ${email}`}
          >
            <Mail size={13} className="text-zinc-950 shrink-0" />
            <span className="hidden xs:inline sm:inline">{t.contactMe}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
