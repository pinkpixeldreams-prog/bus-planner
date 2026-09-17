import React, { useState } from 'react';
import { Search, Navigation, ArrowUpDown, MapPin, Compass, Building, Home, Plane, ShoppingBag, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { PlannedTrip } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPerformSearch: (query?: string) => void;
  onLocateNearest: () => void;
  isLocating: boolean;
  locateSuccessMessage: string | null;
  onPlanJourney: (origin: string, destination: string) => void;
  plannedTrip: PlannedTrip | null;
  onClearTrip: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onPerformSearch,
  onLocateNearest,
  isLocating,
  locateSuccessMessage,
  onPlanJourney,
  plannedTrip,
  onClearTrip,
}) => {
  const [activeTab, setActiveTab] = useState<'stop' | 'planner'>('stop');
  const [origin, setOrigin] = useState('Bishan St 22, Blk 245');
  const [destination, setDestination] = useState('Marina Bay Financial Centre, Tower 2');
  const [isPlanning, setIsPlanning] = useState(false);

  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handlePlanClick = () => {
    setIsPlanning(true);
    setTimeout(() => {
      onPlanJourney(origin, destination);
      setIsPlanning(false);
    }, 600);
  };

  const handlePresetSelect = (preset: string) => {
    setDestination(preset);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Ambient Glow Aura */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-[#0ea5e9]/20 via-[#2fd9f4]/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 w-full">
        {/* Icon Pin Badge & Title */}
        <div className="text-center max-w-2xl mx-auto mb-6 flex flex-col items-center">
          <div
            onClick={onLocateNearest}
            className="w-12 h-12 rounded-full bg-[#0F1C3F] border border-[#38bdf8]/30 flex items-center justify-center shadow-[0_0_24px_rgba(14,165,233,0.35)] mb-3 group cursor-pointer hover:scale-105 hover:border-[#38bdf8] transition-all"
            title="Locate via GPS"
          >
            <Navigation className="w-6 h-6 text-[#89ceff] group-hover:rotate-12 transition-transform" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC] mb-2 font-['Inter']">
            Find Nearest Bus Stop
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-lg mx-auto">
            Discover the closest bus stops to your location with real-time arrivals and crowding telemetry.
          </p>
        </div>

        {/* Main Dual Function Container */}
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Tab Selector */}
          <div className="flex items-center justify-center">
            <div className="inline-flex p-1 bg-[#0B1120] border border-[#38bdf8]/20 rounded-xl shadow-lg">
              <button
                type="button"
                onClick={() => setActiveTab('stop')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'stop'
                    ? 'bg-[#0F1C3F] text-[#89ceff] border border-[#38bdf8]/40 shadow-[0_0_12px_rgba(14,165,233,0.25)]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Find Bus Stop</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('planner')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'planner'
                    ? 'bg-[#0F1C3F] text-[#89ceff] border border-[#38bdf8]/40 shadow-[0_0_12px_rgba(14,165,233,0.25)]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Journey Planner</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#0ea5e9] text-[#003751] uppercase tracking-wider">
                  Live
                </span>
              </button>
            </div>
          </div>

          {/* 1. SEARCH BUS STOP BY NAME CARD */}
          {activeTab === 'stop' && (
            <div className="bg-[#0F1C3F]/90 backdrop-blur-xl border border-[#38bdf8]/25 rounded-2xl p-4 sm:p-5 shadow-2xl transition-all">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] w-5 h-5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onPerformSearch()}
                    placeholder="e.g., Marina Bay, Bedok, Victoria St, or 5-digit stop code..."
                    className="w-full pl-12 pr-4 py-3.5 bg-[#0B1120] border border-[#38bdf8]/20 rounded-xl text-sm sm:text-base text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:bg-[#242a3a]/70 focus:border-[#0ea5e9] focus:shadow-[0_0_0_2px_#0ea5e9] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748B] hover:text-[#dde2f8] bg-[#191f2f] px-2 py-1 rounded"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onPerformSearch()}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#0053db] to-[#0ea5e9] text-white shadow-[0_0_16px_rgba(14,165,233,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>

              {/* Suggestions / Recent */}
              <div className="mt-3 flex flex-wrap items-center justify-between text-[#64748B] text-xs px-1 gap-2">
                <span>Search by stop name, road, or 5-digit pole number</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#94A3B8]">Recent:</span>
                  <button
                    type="button"
                    onClick={() => onPerformSearch('03539')}
                    className="hover:text-[#89ceff] transition-colors underline decoration-dotted text-[#64748B] cursor-pointer"
                  >
                    #03539 (Marina Bay)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => onPerformSearch('08031')}
                    className="hover:text-[#89ceff] transition-colors underline decoration-dotted text-[#64748B] cursor-pointer"
                  >
                    #08031 (Dhoby Ghaut)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => onPerformSearch('53231')}
                    className="hover:text-[#89ceff] transition-colors underline decoration-dotted text-[#64748B] cursor-pointer"
                  >
                    #53231 (Bishan)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. COMMUTE JOURNEY PLANNER CARD */}
          {activeTab === 'planner' && (
            <div className="bg-[#0F1C3F]/90 backdrop-blur-xl border border-[#38bdf8]/25 rounded-2xl p-4 sm:p-5 shadow-2xl transition-all">
              <div className="flex flex-col gap-3 relative">
                {/* Origin Location */}
                <div className="relative flex items-center bg-[#0B1120] border border-[#38bdf8]/20 rounded-xl overflow-hidden group focus-within:border-[#0ea5e9] focus-within:shadow-[0_0_0_2px_#0ea5e9]">
                  <div className="pl-4 pr-2 flex items-center text-[#89ceff]">
                    <span className="w-3 h-3 rounded-full border-2 border-[#89ceff] bg-transparent inline-block"></span>
                  </div>
                  <input
                    aria-label="Current Address or Origin"
                    className="w-full py-3 bg-transparent text-sm sm:text-base text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none"
                    placeholder="Enter origin (e.g. Bishan St 22, Blk 245 or Current GPS)"
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                  <button
                    onClick={() => setOrigin('Current GPS (Victoria St)')}
                    className="px-3 py-2 text-[#89ceff] hover:bg-[#0F1C3F] transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                    title="Use current GPS"
                    type="button"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">GPS</span>
                  </button>
                </div>

                {/* Route Reverse Swap Button */}
                <div className="relative flex justify-center -my-2.5 z-10">
                  <button
                    type="button"
                    onClick={handleSwapLocations}
                    className="w-8 h-8 rounded-full bg-[#242a3a] border border-[#38bdf8]/30 hover:bg-[#0ea5e9] hover:text-[#003751] text-[#94A3B8] flex items-center justify-center shadow-md transition-all active:rotate-180 cursor-pointer"
                    title="Swap origin and destination"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Destination Location */}
                <div className="relative flex items-center bg-[#0B1120] border border-[#38bdf8]/20 rounded-xl overflow-hidden group focus-within:border-[#0ea5e9] focus-within:shadow-[0_0_0_2px_#0ea5e9]">
                  <div className="pl-4 pr-2 flex items-center text-[#EF4444]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    aria-label="Destination Address"
                    className="w-full py-3 bg-transparent text-sm sm:text-base text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none"
                    placeholder="Destination (e.g. Marina Bay Financial Centre, Tower 2)"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-2 pt-1 flex-wrap text-xs text-[#64748B]">
                  <span className="text-[#94A3B8] font-medium">Presets:</span>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('Marina Bay Financial Centre')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Building className="w-3 h-3" /> Work
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('Bishan St 22 Blk 245')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Home className="w-3 h-3" /> Home
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('Changi Airport Terminal 3')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plane className="w-3 h-3" /> Changi Airport
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('ION Orchard, Orchard Rd')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" /> Orchard Rd
                  </button>
                </div>

                {/* Plan Commute CTA Button */}
                <button
                  type="button"
                  onClick={handlePlanClick}
                  disabled={isPlanning}
                  className="mt-2 w-full py-3.5 rounded-xl text-sm sm:text-base font-bold bg-gradient-to-r from-[#0053db] to-[#0ea5e9] text-white shadow-[0_0_20px_rgba(14,165,233,0.35)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isPlanning ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Calculating optimal transit corridors...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Plan Commute &amp; Live Arrivals</span>
                    </>
                  )}
                </button>
              </div>

              {/* Active Trip Results if planned */}
              {plannedTrip && (
                <div className="mt-4 p-4 rounded-xl bg-[#0B1120] border border-[#0ea5e9]/40">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#0ea5e9]/20 text-[#89ceff] text-xs font-bold">
                        FASTEST ROUTE
                      </span>
                      <span className="text-sm font-semibold text-[#F8FAFC]">
                        {plannedTrip.totalTimeMin} mins total
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                      <span>Fare: {plannedTrip.fareEst}</span>
                      <button
                        onClick={onClearTrip}
                        className="text-xs text-[#EF4444] hover:underline cursor-pointer"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {plannedTrip.segments.map((seg, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs">
                        <span className={`px-2 py-1 rounded font-bold uppercase text-[10px] ${
                          seg.mode === 'walk' ? 'bg-[#242a3a] text-[#94A3B8]' :
                          seg.mode === 'bus' ? 'bg-[#0053db] text-white' : 'bg-[#00964D] text-white'
                        }`}>
                          {seg.mode}
                        </span>
                        <div className="flex-1">
                          <div className="text-[#F8FAFC] font-semibold">{seg.label}</div>
                          <div className="text-[#64748B]">{seg.details}</div>
                        </div>
                        <span className="text-[#94A3B8] font-mono">{seg.durationMin}m</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Prominent Locate Nearest Stop Button */}
          <button
            type="button"
            onClick={onLocateNearest}
            disabled={isLocating}
            className="w-full py-4 px-6 rounded-xl text-lg font-bold bg-[#0053db] hover:bg-[#0053db]/90 text-[#F8FAFC] shadow-[0_0_24px_rgba(0,83,219,0.35)] hover:shadow-[0_0_30px_rgba(0,83,219,0.5)] border border-[#38bdf8]/30 transition-all flex items-center justify-center gap-3 active:scale-[0.99] cursor-pointer"
          >
            {isLocating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-[#89ceff]" />
                <span>Locating nearby stops (GPS)...</span>
              </>
            ) : locateSuccessMessage ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                <span>{locateSuccessMessage}</span>
              </>
            ) : (
              <>
                <Navigation className="w-6 h-6 text-[#89ceff]" />
                <span>Locate Nearest Stop</span>
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
