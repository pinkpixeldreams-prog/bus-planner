import React, { useState, useEffect } from 'react';
import { Plus, Minus, RefreshCw } from 'lucide-react';
import { BusStop } from '../types';

interface TransitMapProps {
  stops: BusStop[];
  selectedStopCode: string;
  onSelectStop: (stopCode: string) => void;
}

export const TransitMap: React.FC<TransitMapProps> = ({
  stops,
  selectedStopCode,
  onSelectStop,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [layerMode, setLayerMode] = useState<'bus-mrt' | 'crowding'>('bus-mrt');
  const [syncCountdown, setSyncCountdown] = useState<number>(15);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Auto-sync ticker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSyncCountdown((prev) => {
        if (prev <= 1) {
          setIsSyncing(true);
          setTimeout(() => setIsSyncing(false), 800);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.0));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  return (
    <div className="mt-8 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#0F1C3F] border border-[#38bdf8]/25 shadow-[0_16px_40px_rgba(8,14,29,0.8)]">
        {/* Map Banner Info Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-[#0B1120]/90 backdrop-blur-md border border-[#38bdf8]/25 text-center shadow-lg pointer-events-none">
          <p className="text-xs sm:text-sm text-[#dde2f8]">
            Tap <strong className="text-[#89ceff] font-semibold">Locate Nearest Stop</strong> or click any pin to inspect real-time telemetry.
          </p>
        </div>

        {/* Zoom & Map Controls Overlay */}
        <div className="absolute top-4 left-4 z-20 flex flex-col rounded-xl bg-[#0B1120]/90 backdrop-blur-md border border-[#38bdf8]/25 shadow-lg overflow-hidden">
          <button
            onClick={handleZoomIn}
            aria-label="Zoom in"
            className="w-9 h-9 flex items-center justify-center text-[#F8FAFC] hover:bg-[#0F1C3F] hover:text-[#89ceff] transition-colors cursor-pointer"
            type="button"
          >
            <Plus className="w-5 h-5" />
          </button>
          <div className="w-full h-px bg-[#2f3445]" />
          <button
            onClick={handleZoomOut}
            aria-label="Zoom out"
            className="w-9 h-9 flex items-center justify-center text-[#F8FAFC] hover:bg-[#0F1C3F] hover:text-[#89ceff] transition-colors cursor-pointer"
            type="button"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>

        {/* Map Layer Mode Selector */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-[#0B1120]/90 backdrop-blur-md border border-[#38bdf8]/25 shadow-lg">
          <button
            onClick={() => setLayerMode('bus-mrt')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              layerMode === 'bus-mrt'
                ? 'bg-[#0ea5e9] text-[#003751] shadow-[0_0_8px_rgba(14,165,233,0.3)]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
            type="button"
          >
            Bus + MRT
          </button>
          <button
            onClick={() => setLayerMode('crowding')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              layerMode === 'crowding'
                ? 'bg-[#0ea5e9] text-[#003751] shadow-[0_0_8px_rgba(14,165,233,0.3)]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
            type="button"
          >
            Crowding Heat
          </button>
        </div>

        {/* Interactive Transit Map SVG & Canvas Container */}
        <div className="w-full h-[420px] md:h-[480px] bg-[#0B1120] relative overflow-hidden select-none">
          {/* SVG Map Layer with Zoom Scale */}
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-300 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
            >
              {/* Dark Map Basin Geometry */}
              <path d="M 0 0 L 1000 0 L 1000 500 L 0 500 Z" fill="#091020" />

              {/* Subtle Island Outline */}
              <path
                d="M 120 220 Q 240 160, 480 180 T 780 200 Q 920 260, 880 340 T 640 430 Q 380 440, 210 380 T 120 220 Z"
                fill="#0C172E"
                stroke="#172648"
                strokeWidth="1.5"
              />
              <path
                d="M 800 130 Q 860 120, 890 150 T 840 180 Z"
                fill="#0C172E"
                opacity="0.6"
              />

              {/* Water Channels & Reservoirs */}
              <path
                d="M 460 270 Q 520 260, 540 290 T 480 310 Z"
                fill="#060A14"
                stroke="#0f2245"
                strokeWidth="1"
              />
              <path
                d="M 370 230 Q 420 220, 430 250 T 380 270 Z"
                fill="#060A14"
                stroke="#0f2245"
                strokeWidth="1"
              />

              {/* Highway / Road Network Grids */}
              <path
                d="M 80 290 Q 300 280, 550 320 T 920 310"
                fill="none"
                stroke="#172648"
                strokeWidth="3"
              />
              <path
                d="M 220 380 Q 400 360, 600 370 T 880 340"
                fill="none"
                stroke="#172648"
                strokeWidth="2"
              />
              <path
                d="M 480 180 Q 500 280, 520 410"
                fill="none"
                stroke="#172648"
                strokeDasharray="6 4"
                strokeWidth="2"
              />
              <path
                d="M 320 200 Q 400 300, 360 410"
                fill="none"
                stroke="#172648"
                strokeDasharray="6 4"
                strokeWidth="2"
              />

              {/* MRT Lines (Official Line Color Accents) */}
              {/* East-West Line (Green) */}
              <path
                d="M 140 330 Q 300 350, 520 370 T 880 280"
                fill="none"
                stroke="#00964D"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* North-South Line (Red) */}
              <path
                d="M 340 220 Q 440 190, 520 260 T 540 410"
                fill="none"
                stroke="#D42E12"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Downtown Line (Blue) */}
              <path
                d="M 300 240 Q 420 280, 520 360 T 790 320"
                fill="none"
                stroke="#005EC4"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Circle Line (Orange) */}
              <path
                d="M 420 360 Q 560 300, 620 370 T 480 420"
                fill="none"
                stroke="#FA9E0D"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="8 4"
                opacity="0.75"
              />

              {/* Active Live Bus Route Corridors (Electric Cyan Glow) */}
              <path
                d="M 410 330 C 470 340, 500 320, 550 345 S 620 350, 690 330"
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#cyanGlow)"
              />
              <path
                d="M 520 260 Q 535 310, 545 370"
                fill="none"
                stroke="#2FD9F4"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Crowding Heatmap Overlays if selected */}
              {layerMode === 'crowding' && (
                <g opacity="0.45">
                  <circle cx="540" cy="360" r="45" fill="#EF4444" filter="url(#heatBlur)" />
                  <circle cx="480" cy="340" r="35" fill="#F59E0B" filter="url(#heatBlur)" />
                  <circle cx="510" cy="270" r="30" fill="#10B981" filter="url(#heatBlur)" />
                  <circle cx="740" cy="320" r="40" fill="#10B981" filter="url(#heatBlur)" />
                  <circle cx="210" cy="360" r="35" fill="#F59E0B" filter="url(#heatBlur)" />
                </g>
              )}

              {/* SVG Glow Filters */}
              <defs>
                <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="heatBlur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="15" />
                </filter>
              </defs>

              {/* Regional MRT / Area Labels */}
              <text x="320" y="270" fill="#64748B" fontSize="11" fontWeight="700" letterSpacing="1">
                BUKIT PANJANG
              </text>
              <text x="490" y="240" fill="#64748B" fontSize="11" fontWeight="700" letterSpacing="1">
                ANG MO KIO
              </text>
              <text x="510" y="300" fill="#89CEFF" fontSize="12" fontWeight="700" letterSpacing="1">
                BISHAN
              </text>
              <text x="630" y="255" fill="#64748B" fontSize="11" fontWeight="700" letterSpacing="1">
                SENGKANG
              </text>
              <text x="740" y="320" fill="#64748B" fontSize="11" fontWeight="700" letterSpacing="1">
                TAMPINES
              </text>
              <text x="210" y="360" fill="#64748B" fontSize="11" fontWeight="700" letterSpacing="1">
                JURONG EAST
              </text>
              <text x="510" y="375" fill="#38BDF8" fontSize="13" fontWeight="700" letterSpacing="1">
                CENTRAL DOWNTOWN
              </text>
            </svg>

            {/* LIVE BUS STOP PINS WITH REAL DATA BADGES */}
            {/* Pin 1: Bugis / Victoria St (#01113) */}
            <div
              onClick={() => onSelectStop('01113')}
              className="absolute left-[54%] top-[68%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
            >
              {selectedStopCode === '01113' && (
                <span className="absolute -inset-3 rounded-full bg-[#0ea5e9]/40 animate-ping" />
              )}
              <div className={`relative flex items-center gap-2 bg-[#0F1C3F]/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.6)] border transition-all ${
                selectedStopCode === '01113' ? 'border-[#0ea5e9] scale-105 shadow-[0_0_16px_rgba(14,165,233,0.5)]' : 'border-[#38bdf8]/30 group-hover:scale-105'
              }`}>
                <div className="w-6 h-6 rounded-full bg-[#0ea5e9] text-[#003751] flex items-center justify-center font-bold text-xs shadow-inner">
                  🚌
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#F8FAFC] font-bold">Victoria St</span>
                    <span className="text-[10px] px-1 rounded bg-[#0B1120] text-[#89ceff] font-mono border border-white/5">
                      #01113
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#94A3B8]">
                    <span className="text-[#10B981] font-bold">61: 2m</span>
                    <span>•</span>
                    <span className="text-[#F59E0B] font-bold">175: 4m</span>
                    <span>•</span>
                    <span className="text-[#10B981] font-bold">858: 7m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pin 2: Bras Basah Rd (#01019) */}
            <div
              onClick={() => onSelectStop('01019')}
              className="absolute left-[46%] top-[62%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              {selectedStopCode === '01019' && (
                <span className="absolute -inset-2.5 rounded-full bg-[#0ea5e9]/40 animate-ping" />
              )}
              <div className={`relative flex items-center gap-2 bg-[#0F1C3F]/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-lg border transition-all ${
                selectedStopCode === '01019' ? 'border-[#0ea5e9] scale-105 shadow-[0_0_16px_rgba(14,165,233,0.4)]' : 'border-[#38bdf8]/20 group-hover:scale-105'
              }`}>
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                <div className="text-left">
                  <div className="text-xs text-[#F8FAFC] font-semibold">
                    Bras Basah Rd <span className="text-[#64748B] text-[10px]">#01019</span>
                  </div>
                  <div className="text-[10px] text-[#94A3B8]">Next: Bus 36 (3m) • Bus 7 (6m)</div>
                </div>
              </div>
            </div>

            {/* Pin 3: Marina Bay Sands (#03511) */}
            <div
              onClick={() => onSelectStop('03511')}
              className="absolute left-[58%] top-[80%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group hidden sm:flex"
            >
              {selectedStopCode === '03511' && (
                <span className="absolute -inset-2.5 rounded-full bg-[#0ea5e9]/40 animate-ping" />
              )}
              <div className={`flex items-center gap-1.5 bg-[#0F1C3F]/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-lg border transition-all ${
                selectedStopCode === '03511' ? 'border-[#0ea5e9] scale-105' : 'border-[#38bdf8]/20 group-hover:scale-105'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-xs text-[#F8FAFC] font-medium">Marina Bay Sands #03511</span>
                <span className="text-xs text-[#89ceff] font-mono">97: 1m</span>
              </div>
            </div>

            {/* Pin 4: Orchard Stn (#09022) */}
            <div
              onClick={() => onSelectStop('09022')}
              className="absolute left-[38%] top-[54%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group hidden sm:flex"
            >
              {selectedStopCode === '09022' && (
                <span className="absolute -inset-2.5 rounded-full bg-[#0ea5e9]/40 animate-ping" />
              )}
              <div className={`flex items-center gap-1.5 bg-[#0F1C3F]/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-lg border transition-all ${
                selectedStopCode === '09022' ? 'border-[#0ea5e9] scale-105' : 'border-[#38bdf8]/20 group-hover:scale-105'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="text-xs text-[#F8FAFC] font-medium">Orchard Stn #09022</span>
                <span className="text-xs text-[#10B981] font-mono font-bold">65: Now</span>
              </div>
            </div>

            {/* Pin 5: Bishan Stn (#53231) */}
            <div
              onClick={() => onSelectStop('53231')}
              className="absolute left-[51%] top-[30%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group hidden md:flex"
            >
              {selectedStopCode === '53231' && (
                <span className="absolute -inset-2.5 rounded-full bg-[#0ea5e9]/40 animate-ping" />
              )}
              <div className={`flex items-center gap-1.5 bg-[#0F1C3F]/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-lg border transition-all ${
                selectedStopCode === '53231' ? 'border-[#0ea5e9] scale-105' : 'border-[#38bdf8]/20 group-hover:scale-105'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="text-xs text-[#F8FAFC]">Bishan Stn #53231</span>
                <span className="text-xs text-[#89ceff] font-mono">54: 2m</span>
              </div>
            </div>
          </div>

          {/* Telemetry Indicator Bottom Dock */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-[#0B1120]/90 backdrop-blur-md border border-[#38bdf8]/20 text-[#94A3B8] text-xs shadow-md">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs text-[#F8FAFC]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" /> Seats Available
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#F8FAFC]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]" /> Standing Only
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#F8FAFC]">
                <span className="w-2 h-2 rounded-full bg-[#EF4444] shadow-[0_0_6px_#EF4444]" /> Limited Standing
              </span>
            </div>

            <div className="flex items-center gap-2 text-[12px] font-mono text-[#64748B]">
              <RefreshCw className={`w-3.5 h-3.5 text-[#89ceff] ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Telemetry auto-sync: {syncCountdown}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
