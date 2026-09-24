import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Cpu, Zap, Activity, HardDrive, Terminal, Sliders, ShieldCheck, CheckCircle2, Play, Power } from 'lucide-react';
import { Profile, Project } from '../../types';

interface PLCViewProps {
  profile: Profile;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

export default function PLCConfigurationView({ profile, onBack, onSelectProject }: PLCViewProps) {
  const [activeTab, setActiveTab] = useState<'modules' | 'logic' | 'diagnostics'>('modules');
  const [plcStatus, setPlcStatus] = useState<'RUN' | 'STOP'>('RUN');

  return (
    <div className="min-h-full px-3 py-6 sm:px-6 md:px-10 lg:py-8 max-w-7xl mx-auto space-y-6 select-none font-mono">
      {/* Top Industrial Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/30 text-xs font-semibold tracking-wider transition-all group cursor-pointer shadow-sm"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>[ ESC ] ESCI A PANORAMICA</span>
        </button>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800">
            <span className="text-zinc-500 text-[10px]">TARGET:</span>
            <span className="text-amber-400 font-bold">PLC_CORE_VR</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800">
            <span className="text-zinc-500 text-[10px]">CYCLE:</span>
            <span className="text-emerald-400 font-bold">1.8 ms</span>
          </div>
          <button 
            onClick={() => setPlcStatus(s => s === 'RUN' ? 'STOP' : 'RUN')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold border transition-colors cursor-pointer ${
              plcStatus === 'RUN' 
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25' 
                : 'bg-red-500/15 text-red-400 border-red-500/40 hover:bg-red-500/25'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${plcStatus === 'RUN' ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
            <span>PLC {plcStatus}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MAIN INDUSTRIAL ENCLOSURE / PLC CHASSIS
      ========================================================================= */}
      <div className="rounded-2xl bg-[#0f141a] border-2 border-amber-500/40 shadow-2xl shadow-amber-950/20 overflow-hidden relative">
        {/* Four Corner Industrial Screws */}
        <div className="absolute top-2.5 left-2.5 text-zinc-600 text-[11px] font-mono select-none">⬡</div>
        <div className="absolute top-2.5 right-2.5 text-zinc-600 text-[11px] font-mono select-none">⬡</div>
        <div className="absolute bottom-2.5 left-2.5 text-zinc-600 text-[11px] font-mono select-none">⬡</div>
        <div className="absolute bottom-2.5 right-2.5 text-zinc-600 text-[11px] font-mono select-none">⬡</div>

        {/* Industrial Header Banner */}
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-amber-500/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Zap size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-zinc-100 tracking-wider uppercase font-mono">
                  TIA-PORTAL // CONFIGURATORE HARDWARE & IOT
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                  230V / 5V DC
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Dennis Bottari · Elettricista Specializzato & IoT Maker (Verona, IT)
              </p>
            </div>
          </div>

          {/* Module Diagnostic LEDs */}
          <div className="flex items-center gap-3 bg-zinc-950/80 px-4 py-2 rounded-xl border border-zinc-800 text-[10px]">
            <div className="flex flex-col items-center gap-1">
              <span className={`w-2.5 h-2.5 rounded-full ${plcStatus === 'RUN' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-zinc-700'}`} />
              <span className="text-zinc-400">RUN</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className={`w-2.5 h-2.5 rounded-full ${plcStatus === 'STOP' ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-zinc-700'}`} />
              <span className="text-zinc-400">STOP</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="text-zinc-400">ERR</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_6px_#34d399]" />
              <span className="text-zinc-400">BUS</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-[0_0_6px_#fbbf24]" />
              <span className="text-zinc-400">I²C</span>
            </div>
          </div>
        </div>

        {/* Industrial Subheader Tabs (TIA Portal Style) */}
        <div className="px-6 pt-3 bg-zinc-950/60 border-b border-zinc-800 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-2 rounded-t-lg font-bold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'modules'
                ? 'bg-[#0f141a] text-amber-300 border-amber-500/40 border-b-[#0f141a]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            [1] RACK PROGETTI & BLOCCHI FUNZIONALI ({profile.projects.length})
          </button>
          <button
            onClick={() => setActiveTab('logic')}
            className={`px-4 py-2 rounded-t-lg font-bold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'logic'
                ? 'bg-[#0f141a] text-amber-300 border-amber-500/40 border-b-[#0f141a]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            [2] SPECIFICHE TECNICHE & PROTOCOLLI
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-4 py-2 rounded-t-lg font-bold transition-colors cursor-pointer border-t border-x ${
              activeTab === 'diagnostics'
                ? 'bg-[#0f141a] text-amber-300 border-amber-500/40 border-b-[#0f141a]'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            [3] COMMISSIONING & BIOGRAFIA
          </button>
        </div>

        {/* =========================================================================
            HARDWARE RACK VIEW (DIN RAIL SIMULATION)
        ========================================================================= */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* DIN Rail Rack Overview */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 relative overflow-hidden">
            <div className="text-[11px] text-zinc-500 mb-3 flex items-center justify-between">
              <span>HARDWARE RACK: DIN_RAIL_01 // PROFILO OMEGA EN 50022</span>
              <span className="text-amber-400 font-semibold">TENSIONE NOMINALE: 230V AC ~ 50Hz</span>
            </div>

            {/* Simulated Modular DIN-Rail Modules Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 pt-1">
              <div className="p-2.5 rounded-lg bg-zinc-900 border-l-4 border-l-amber-500 border-zinc-800 text-[11px]">
                <span className="text-zinc-500 text-[9px] block">SLOT 00</span>
                <span className="text-zinc-100 font-bold block">CPU IOT-CORE</span>
                <span className="text-emerald-400 text-[10px]">READY</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border-l-4 border-l-blue-500 border-zinc-800 text-[11px]">
                <span className="text-zinc-500 text-[9px] block">SLOT 01</span>
                <span className="text-zinc-100 font-bold block">DI 16x24V</span>
                <span className="text-zinc-400 text-[10px]">16 Ingressi</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border-l-4 border-l-purple-500 border-zinc-800 text-[11px]">
                <span className="text-zinc-500 text-[9px] block">SLOT 02</span>
                <span className="text-zinc-100 font-bold block">RELAY DQ 8x</span>
                <span className="text-zinc-400 text-[10px]">Relè 230V</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border-l-4 border-l-emerald-500 border-zinc-800 text-[11px]">
                <span className="text-zinc-500 text-[9px] block">SLOT 03</span>
                <span className="text-zinc-100 font-bold block">AI SENSORI</span>
                <span className="text-zinc-400 text-[10px]">Analogico</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border-l-4 border-l-rose-500 border-zinc-800 text-[11px]">
                <span className="text-zinc-500 text-[9px] block">SLOT 04</span>
                <span className="text-zinc-100 font-bold block">RS485/MODBUS</span>
                <span className="text-zinc-400 text-[10px]">Comunicazione</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border-l-4 border-l-cyan-500 border-zinc-800 text-[11px]">
                <span className="text-zinc-500 text-[9px] block">SLOT 05</span>
                <span className="text-zinc-100 font-bold block">WI-FI & MQTT</span>
                <span className="text-emerald-400 text-[10px]">ONLINE</span>
              </div>
            </div>
          </div>

          {/* TAB 1: Projects as Functional Routine Blocks (OB / FB / FC) */}
          {activeTab === 'modules' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                <span className="font-bold text-amber-300">
                  BLOCCHI DI PROGRAMMA & PROGETTI HARDWARE ({profile.projects.length})
                </span>
                <span>CLICCA UN BLOCCO PER DIAGNOSTICA COMPLETA</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {profile.projects.map((project, idx) => {
                  const blockCode = `FB${101 + idx}`;
                  const terminalBlock = `TB0${idx + 1}`;

                  return (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -3 }}
                      onClick={() => onSelectProject(project.id)}
                      className="p-5 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-amber-500/60 transition-all cursor-pointer group relative overflow-hidden shadow-lg flex flex-col justify-between"
                    >
                      {/* Terminal Connection Strip in top */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 text-[10px]">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span>{blockCode}: {terminalBlock}</span>
                        </div>
                        <span className="text-zinc-500">230V / IOT READY</span>
                      </div>

                      {/* Image Preview with Technical Wiring Overlay */}
                      <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-zinc-900 border border-zinc-800">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 text-[10px] font-bold text-amber-300 bg-black/70 px-2 py-0.5 rounded border border-amber-500/30">
                          {project.title}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2 mb-4">
                        <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Pinout Tech Badges */}
                      <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5 text-[10px]">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3.5 flex items-center justify-between text-xs text-amber-400 font-bold pt-2 border-t border-zinc-800/50 group-hover:text-amber-300">
                        <span>APRI ROUTINE TECNICA</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Technical Specs & Protocols */}
          {activeTab === 'logic' && (
            <div className="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-6 text-xs">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                SPECIFICHE DI PROGRAMMAZIONE & PROTOCOLLI SUPPORTATI
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-amber-400 font-bold block">1. AUTOMAZIONE & CABLAGGIO CIVILE / INDUSTRIALE</span>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Esperienza diretta in quadri elettrici di distribuzione, dimensionamento linee, interruttori magnetotermici e differenziali, messa a terra e collaudo conformità CEI 64-8.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-amber-400 font-bold block">2. PROTOCOLLI IOT & MICROCONTROLLORI</span>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Sviluppo firmware C++/Arduino per ESP32/ESP8266, comunicazione seriale UART, bus I²C per display/sensori, SPI per moduli RF/Ethernet e broker MQTT.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-amber-400 font-bold block">3. DOMOTICA & SUPERVISIONE</span>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Integrazione sensori ambientali (temperatura, umidità, PIR), gestione relè a stato solido, automazione luci ed elaborazione comandi remoti.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-amber-400 font-bold block">4. DIAGNOSTICA & SICUREZZA</span>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Risoluzione guasti con multimetro digitale, pinze amperometriche, verifica isolamento e monitoraggio carichi in tempo reale.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Commissioning & Bio Notes */}
          {activeTab === 'diagnostics' && (
            <div className="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-4 text-xs font-sans">
              <div className="font-mono text-amber-300 font-bold border-b border-zinc-800 pb-2">
                NOTE DI COMMISSIONING TECNICO // DENNIS BOTTARI
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {profile.intro}
              </p>
              <div className="p-4 rounded-lg bg-zinc-900/90 border border-amber-500/20 font-mono text-xs text-zinc-400 space-y-1">
                <div>STATO OPERATIVO: DISPONIBILE PER PROGETTI DI AUTOMAZIONE & IOT</div>
                <div>LOCALIZZAZIONE CENTRALE: VERONA, VENETO, ITALIA</div>
                <div>INTERFACCIA HARDWARE: MULTIMETRO, SALDATORE A STAGNO, PROTOBOARD, OSCILLOSCOPIO</div>
              </div>
            </div>
          )}
        </div>

        {/* Industrial Status Footer */}
        <div className="bg-zinc-950 border-t border-zinc-800/80 px-6 py-2.5 flex flex-wrap items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">●</span>
            <span>MODALITA: ONLINE (LIVE HARDWARE MONITOR)</span>
          </div>
          <div className="flex items-center gap-3">
            <span>MEMORIA CPU: 128KB / 320KB</span>
            <span>·</span>
            <span className="text-zinc-400">FIRMWARE v2.4-STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
