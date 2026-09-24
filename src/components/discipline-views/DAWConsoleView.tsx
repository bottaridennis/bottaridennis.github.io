import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Play, Pause, Volume2, Sliders, Music, Radio, Disc, Mic2, Shuffle, Repeat } from 'lucide-react';
import { Profile, Project } from '../../types';
import { useAudio } from '../../context/AudioContext';

interface DAWViewProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

export default function DAWConsoleView({ profile, onBack, onSelectProject }: DAWViewProps) {
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();
  const [activeTab, setActiveTab] = useState<'mixer' | 'rack' | 'bio'>('mixer');
  const [masterVolume, setMasterVolume] = useState(85);

  return (
    <div className="min-h-full px-3 py-6 sm:px-6 md:px-10 lg:py-8 max-w-7xl mx-auto space-y-6 select-none font-mono">
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-purple-300 border border-purple-500/30 text-xs font-semibold tracking-wider transition-all group cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>[ ESC ] ESCI A PANORAMICA</span>
        </button>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-950 border border-purple-500/30">
            <span className="text-zinc-500 text-[10px]">TEMPO:</span>
            <span className="text-purple-300 font-bold">128.00 BPM</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-950 border border-purple-500/30">
            <span className="text-zinc-500 text-[10px]">SAMPLE RATE:</span>
            <span className="text-emerald-400 font-bold">48.0 kHz / 24-BIT</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DAW MASTER RACK CHASSIS (ABLETON / FL STUDIO / STUDIO RACK AESTHETIC)
      ========================================================================= */}
      <div className="rounded-2xl bg-[#120d1c] border-2 border-purple-500/40 shadow-2xl shadow-purple-950/30 overflow-hidden relative">
        {/* Rack Mount Screws (Left & Right Flanges) */}
        <div className="absolute top-3 left-3 text-purple-400/40 text-xs font-mono">⊕</div>
        <div className="absolute bottom-3 left-3 text-purple-400/40 text-xs font-mono">⊕</div>
        <div className="absolute top-3 right-3 text-purple-400/40 text-xs font-mono">⊕</div>
        <div className="absolute bottom-3 right-3 text-purple-400/40 text-xs font-mono">⊕</div>

        {/* Master DAW Transport Header */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#191026] to-zinc-950 border-b border-purple-500/30 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-500/20">
                <Music size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase font-mono">
                    DAW WORKSTATION // MASTER AUDIO RACK
                  </h1>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-200 text-[10px] font-bold">
                    SUNO AI V3.5 & PRODUZIONE
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  Dennis Bottari · Composizione Sonora, Testi Rap/Trap & Prompt Audio Engineering
                </p>
              </div>
            </div>

            {/* Master Stereo Peak Meter */}
            <div className="flex items-center gap-3 bg-zinc-950/90 px-4 py-2 rounded-xl border border-purple-500/20">
              <span className="text-[10px] text-zinc-400">MASTER OUT:</span>
              <div className="flex items-end gap-1 h-5 w-24">
                {[30, 45, 60, 75, 90, 100, 85, 70, 50, 35].map((val, idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 rounded-sm transition-all ${
                      val > 80 ? 'bg-rose-500' : val > 60 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-bold text-emerald-400">-0.2 dB</span>
            </div>
          </div>
        </div>

        {/* View Selection Tabs */}
        <div className="px-6 pt-3 bg-zinc-950/60 border-b border-zinc-800 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('mixer')}
            className={`px-4 py-2 rounded-t-lg font-bold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'mixer'
                ? 'bg-[#120d1c] text-purple-300 border-purple-500/40 border-b-[#120d1c]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            [1] MIXER CANALI & BRANI ARCHIVIATI ({profile.projects.length})
          </button>
          <button
            onClick={() => setActiveTab('rack')}
            className={`px-4 py-2 rounded-t-lg font-bold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'rack'
                ? 'bg-[#120d1c] text-purple-300 border-purple-500/40 border-b-[#120d1c]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            [2] RACK EFFETTI & PROMPT DESIGN
          </button>
          <button
            onClick={() => setActiveTab('bio')}
            className={`px-4 py-2 rounded-t-lg font-bold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'bio'
                ? 'bg-[#120d1c] text-purple-300 border-purple-500/40 border-b-[#120d1c]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            [3] VISIONE MUSICALE & BIO
          </button>
        </div>

        {/* =========================================================================
            CHANNEL MIXER STRIPS (DAW CHANNEL STRIP FOR EACH PROJECT/TRACK)
        ========================================================================= */}
        <div className="p-5 sm:p-7 space-y-6">
          {activeTab === 'mixer' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                <span className="font-bold text-purple-300">
                  DAW MULTITRACK MATRIX // {profile.projects.length} CANALI AUDIO
                </span>
                <span className="text-[11px] text-zinc-500">
                  ASCOLTO CONTINUO CON IL MINI-PLAYER GLOBALE
                </span>
              </div>

              {/* Grid of Mixer Channels */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {profile.projects.map((project, idx) => {
                  const channelNumber = String(idx + 1).padStart(2, '0');
                  const isCurrent = currentTrack?.id === project.id;
                  const isTrackPlaying = isCurrent && isPlaying;

                  return (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -3 }}
                      className={`p-5 rounded-xl border transition-all relative overflow-hidden shadow-lg flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-purple-950/40 border-purple-400 shadow-purple-900/30'
                          : 'bg-zinc-950/90 border-zinc-800 hover:border-purple-500/50'
                      }`}
                    >
                      {/* Channel Strip Top Bar */}
                      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-800 text-[10px]">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                            CH {channelNumber}
                          </span>
                          <span className="text-zinc-400 uppercase font-semibold">STEREO</span>
                        </div>
                        
                        {/* Solo / Mute simulator buttons */}
                        <div className="flex items-center gap-1">
                          <span className="px-1 py-0.5 rounded text-[9px] bg-zinc-900 text-zinc-500 border border-zinc-800">
                            S
                          </span>
                          <span className="px-1 py-0.5 rounded text-[9px] bg-zinc-900 text-zinc-500 border border-zinc-800">
                            M
                          </span>
                        </div>
                      </div>

                      {/* Artwork with Live Equalizer Animation */}
                      <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-zinc-900 border border-zinc-800 group">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-black/30 to-transparent" />

                        {/* If Playing: Animated soundwave overlay */}
                        {isTrackPlaying && (
                          <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 backdrop-blur-[2px]">
                            {[30, 80, 50, 95, 40, 70, 100, 60, 30].map((h, i) => (
                              <span
                                key={i}
                                className="w-1 bg-purple-400 rounded-full animate-pulse"
                                style={{ height: `${h}%`, animationDuration: `${0.4 + i * 0.1}s` }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Direct Play/Pause Button on artwork */}
                        {project.audioUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isCurrent && isPlaying) {
                                togglePlay();
                              } else {
                                playTrack({
                                  id: project.id,
                                  title: project.title,
                                  artist: 'Dennis Bottari · Suno AI',
                                  audioUrl: project.audioUrl!,
                                  imageUrl: project.imageUrl,
                                  profileId: profile.id,
                                });
                              }
                            }}
                            className="absolute bottom-2 right-2 p-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-lg transition-transform hover:scale-110 cursor-pointer"
                            title="Riproduci traccia"
                          >
                            {isTrackPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                          </button>
                        )}

                        <div className="absolute bottom-2 left-2 text-[11px] font-bold text-white bg-zinc-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                          {project.title}
                        </div>
                      </div>

                      {/* Description & Lyrics info */}
                      <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Tags & Channel Fader Bar */}
                      <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1 text-[10px]">
                          {project.technologies.slice(0, 2).map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-zinc-900 text-purple-200 border border-purple-500/20">
                              {t}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => onSelectProject(project.id)}
                          className="flex items-center gap-1 text-xs text-purple-300 hover:text-white font-bold cursor-pointer transition-colors"
                        >
                          <span>SCHEDA BRANO</span>
                          <ArrowUpRight size={13} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Audio Effects Rack & Prompt Design */}
          {activeTab === 'rack' && (
            <div className="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-6 text-xs">
              <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">
                CATENA DI MASTERING & PROMPT ENGINEERING SONORO
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-purple-300 font-bold block">1. PROMPT ARCHITECTURE CON SUNO AI</span>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Costruzione accurata dei prompt di stile: definizione precisa di sottogeneri (Trap metal, melodic rap, phonk, drill), tonalità, BPM e timbrica vocale.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-purple-300 font-bold block">2. STRUTTURA METRICA & TESTI</span>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Scrittura originale di strofe, ponti e ritornelli con rime interne, assonanze e cadenze ritmiche studiate per flow energici.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-purple-300 font-bold block">3. POST-PRODUZIONE & MASTERING</span>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Ottimizzazione dell&apos;equalizzazione, compressione dinamica multibanda ed enfatizzazione delle basse frequenze (808 sub-bass).
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-purple-300 font-bold block">4. STORYTELLING & CONCEPT</span>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Ogni traccia racconta una storia coerente, da racconti autobiografici ad atmosfere cinematiche e futuristiche.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Bio Notes */}
          {activeTab === 'bio' && (
            <div className="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-4 text-xs font-sans">
              <div className="font-mono text-purple-300 font-bold border-b border-zinc-800 pb-2">
                NOTE DI PRODUZIONE MUSICALE // DENNIS BOTTARI
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {profile.intro}
              </p>
              <div className="p-4 rounded-lg bg-zinc-900/90 border border-purple-500/20 font-mono text-xs text-zinc-400 space-y-1">
                <div>CATALOGO DISCOGRAFICO: 10 BRANI ORIGINALI ASCOLTABILI SUL PORTFOLIO</div>
                <div>DISTRIBUZIONE: MINI-PLAYER INTEGRATO CON AUDIO STREAMING IN BACKGROUND</div>
                <div>STRUMENTI: SUNO AI V3.5, DIGITAL AUDIO WORKSTATIONS, COMPOSIZIONE METRICA</div>
              </div>
            </div>
          )}
        </div>

        {/* DAW Footer Bar */}
        <div className="bg-zinc-950 border-t border-zinc-800/80 px-6 py-2.5 flex flex-wrap items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 animate-pulse">●</span>
            <span>AUDIO ENGINE: READY (STEREO BUS NORMALIZED)</span>
          </div>
          <div className="flex items-center gap-3">
            <span>CANALI ATTIVI: {profile.projects.length}</span>
            <span>·</span>
            <span className="text-zinc-400">LATENZA: 0 ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
