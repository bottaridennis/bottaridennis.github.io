import React, { useState } from 'react';
import { Mail, Instagram, Linkedin, Copy, Check } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'dennisbottari@gmail.com';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="shrink-0 w-full border-t border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl z-20 py-2.5 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Left Side: Status / Availability */}
        <div className="flex items-center gap-2 text-zinc-400 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="truncate text-[11px] sm:text-xs">
            <span className="hidden sm:inline">Disponibile per nuove collaborazioni</span>
            <span className="sm:hidden">Disponibile</span>
          </span>
          <span className="hidden md:inline text-zinc-600 font-mono">·</span>
          <span className="hidden md:inline text-[11px] text-zinc-400 font-mono">
            {email}
          </span>
        </div>

        {/* Right Side: Social Media Profiles & Contact CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
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

          {/* Divider */}
          <div className="h-4 w-px bg-white/[0.08] mx-0.5 sm:mx-1 hidden sm:block" />

          {/* Quick Copy Email Action */}
          <button
            onClick={handleCopyEmail}
            title={copied ? "Email copiata negli appunti!" : "Copia indirizzo email"}
            className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 text-[11px] ${
              copied
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.06] text-zinc-400 hover:text-zinc-200'
            }`}
            aria-label="Copia email"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span className="hidden xl:inline">{copied ? 'Copiata!' : 'Copia'}</span>
          </button>

          {/* Primary Contact Button (mailto) */}
          <a
            href={`mailto:${email}?subject=Contatto%20dal%20Portfolio`}
            className="px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 whitespace-nowrap"
            title={`Scrivi a ${email}`}
          >
            <Mail size={13} className="text-zinc-950 shrink-0" />
            <span>Contattami</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
