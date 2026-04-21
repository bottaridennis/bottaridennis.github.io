import { portfolioData } from '../portfolioData';
import { motion } from 'motion/react';

interface NavigationProps {
  activeProfileId: string | null;
  onNavigate: (id: string | null) => void;
}

export default function Navigation({ activeProfileId, onNavigate }: NavigationProps) {
  return (
    <aside className="w-80 h-full border-r border-white/10 p-8 flex flex-col justify-between bg-neutral-900/50 backdrop-blur-xl hidden md:flex shrink-0">
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Portfolio</p>
          <button 
            onClick={() => onNavigate(null)}
            className="text-4xl font-black tracking-tighter text-white leading-none text-left hover:opacity-80 transition-opacity"
          >
            DENNIS<br/>BOTTARI
          </button>
        </div>
        
        <div className="h-px w-12 bg-white/20"></div>
        
        <p className="text-sm leading-relaxed text-neutral-400 italic">
          Una mente poliedrica che naviga tra pixel, circuiti, lenti e spartiti. La curiosità è l'unico linguaggio universale.
        </p>

        <nav className="space-y-4 mt-8">
          <button 
            onClick={() => onNavigate(null)}
            className={`flex items-center gap-3 text-xs uppercase tracking-widest transition-all group ${!activeProfileId ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
          >
            <span className={`h-px bg-white transition-all ${!activeProfileId ? 'w-8' : 'w-4 group-hover:w-8'}`}></span>
            Home
          </button>
          
          <div className="pt-4 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-bold ml-7">Profiles</p>
            {portfolioData.map((profile) => (
              <button
                key={profile.id}
                onClick={() => onNavigate(profile.id)}
                className={`flex items-center gap-3 text-xs uppercase tracking-widest transition-all group pl-7 ${activeProfileId === profile.id ? profile.themeColor : 'text-neutral-500 hover:text-white'}`}
              >
                {activeProfileId === profile.id && <motion.span layoutId="active-indicator" className={`w-1 h-1 rounded-full ${profile.bgColor.replace('/10', '')}`} />}
                {profile.title}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
        </div>
        <p className="text-[10px] text-neutral-600">
          © {new Date().getFullYear()} Dennis Bottari. All Rights Reserved.
        </p>
      </div>
    </aside>
  );
}
