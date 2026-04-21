import { motion } from 'motion/react';
import { portfolioData } from '../portfolioData';

interface HomeProps {
  onProfileClick: (id: string | null) => void;
}

export default function Home({ onProfileClick }: HomeProps) {
  return (
    <div className="p-6 md:p-12 h-full flex flex-col">
      {/* Header Info */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end shrink-0 gap-6">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold">Concept / Vision</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">
            Multidisciplinary<br/>
            <span className="text-neutral-800">Portfolio</span>
          </h2>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500">Localizzazione</p>
          <p className="text-sm font-mono tracking-tighter">Verona, IT</p>
        </div>
      </div>

      {/* Artistic Bento Grid: Mobile First */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        {portfolioData.map((profile, index) => {
          const Icon = profile.icon;
          const number = (index + 1).toString().padStart(2, '0');
          
          return (
            <motion.button
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onProfileClick(profile.id)}
              className={`group bg-neutral-900 shadow-xl border border-white/5 rounded-3xl p-8 flex flex-col justify-between transition-all relative overflow-hidden text-left hover:bg-neutral-800/50 ${
                index === 0 ? 'sm:col-span-2' : 'col-span-1'
              }`}
            >
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ${profile.bgColor}`} 
              />
              
              <div className="space-y-1 relative z-10">
                <p className={`text-[10px] uppercase tracking-widest font-bold ${profile.themeColor}`}>
                  {number}
                </p>
                <h3 className="text-2xl font-bold text-white group-hover:translate-x-1 transition-transform">
                  {profile.title}
                </h3>
              </div>

              <div className="relative z-10">
                <div className={`p-4 rounded-2xl bg-white/5 ${profile.themeColor} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                
                <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors line-clamp-2 uppercase tracking-tighter leading-relaxed">
                  {profile.intro}
                </p>
              </div>

              {/* Hover Progress Bar */}
              <div 
                className={`absolute bottom-0 left-0 h-1.5 w-0 transition-all duration-700 group-hover:w-full ${profile.bgColor.replace('/10', '')}`} 
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
