import React, { useState } from 'react';
import {
  Search,
  Navigation,
  ArrowUpDown,
  MapPin,
  Compass,
  Building,
  Home,
  Plane,
  ShoppingBag,
  Sparkles,
  Loader2,
  CheckCircle2,
  Footprints,
  Bus,
  Train,
  ArrowRight,
} from 'lucide-react';
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
  onSelectAlternative?: (index: number) => void;
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
  onSelectAlternative,
}) => {
  const [activeTab, setActiveTab] = useState<'stop' | 'planner'>('stop');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isPlanning, setIsPlanning] = useState(false);

  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    if (plannedTrip && (destination || temp)) {
      setIsPlanning(true);
      setTimeout(() => {
        onPlanJourney(destination.trim() || 'Current Location', temp.trim() || 'Current Location');
        setIsPlanning(false);
      }, 400);
    }
  };

  const handlePlanClick = () => {
    const finalOrigin = origin.trim() || 'Current GPS (Victoria St)';
    const finalDest = destination.trim();
    if (!finalDest) {
      setDestination('Marina Bay Financial Centre, Tower 2');
      setIsPlanning(true);
      setTimeout(() => {
        onPlanJourney(finalOrigin, 'Marina Bay Financial Centre, Tower 2');
        setIsPlanning(false);
      }, 600);
      return;
    }
    setIsPlanning(true);
    setTimeout(() => {
      onPlanJourney(finalOrigin, finalDest);
      setIsPlanning(false);
    }, 600);
  };

  const handlePresetSelect = (preset: string) => {
    setDestination(preset);
    setIsPlanning(true);
    setTimeout(() => {
      onPlanJourney(origin.trim() || 'Current GPS (Victoria St)', preset);
      setIsPlanning(false);
    }, 500);
  };

  const handleScrollToArrivals = () => {
    const el = document.getElementById('arrivals-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
                    placeholder="Enter starting location or tap GPS..."
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
                    placeholder="Enter destination (e.g. Marina Bay, Orchard, Airport)..."
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 pt-1 flex-wrap text-xs text-[#64748B]">
                  <span className="text-[#94A3B8] font-medium mr-1">Presets:</span>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('Marina Bay Financial Centre, Tower 2')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Building className="w-3 h-3 text-[#38bdf8]" /> Work (MBFC)
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('Bishan St 22 Blk 245')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Home className="w-3 h-3 text-[#10B981]" /> Home (Bishan)
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('Changi Airport Terminal 2')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plane className="w-3 h-3 text-[#F59E0B]" /> Airport
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('ION Orchard, Orchard Rd')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3 text-[#EC4899]" /> Orchard
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('Bugis Junction, Victoria St')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-[#0ea5e9]" /> Bugis
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('Bedok Bus Interchange')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-[#6366F1]" /> Bedok
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('Clementi Mall')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-[#14B8A6]" /> Clementi
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('Jurong East Interchange')}
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-white/5 hover:border-[#38bdf8]/30 hover:text-[#89ceff] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-[#8B5CF6]" /> Jurong East
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
                <div className="mt-4 p-4 rounded-xl bg-[#0B1120] border border-[#0ea5e9]/40 shadow-xl space-y-3">
                  {/* Trip Header Summary */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-[#0ea5e9]/20 text-[#89ceff] text-[11px] font-bold uppercase tracking-wider">
                          {plannedTrip.routeName || 'RECOMMENDED COMMUTE'}
                        </span>
                        <span className="text-base font-bold text-[#F8FAFC]">
                          {plannedTrip.totalTimeMin} mins total
                        </span>
                      </div>
                      <div className="text-xs text-[#94A3B8] mt-0.5 flex items-center gap-2">
                        <span>Fare: <strong className="text-[#F8FAFC]">{plannedTrip.fareEst}</strong></span>
                        <span>•</span>
                        <span className="text-[#10B981] font-medium">Saves ~{plannedTrip.co2SavedKg}kg CO₂</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={onClearTrip}
                        className="text-xs text-[#94A3B8] hover:text-[#EF4444] hover:underline cursor-pointer px-2 py-1 rounded bg-[#191f2f]"
                      >
                        Clear Route
                      </button>
                    </div>
                  </div>

                  {/* Route Alternatives Switcher */}
                  {plannedTrip.alternatives && plannedTrip.alternatives.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      <span className="text-[11px] font-medium text-[#64748B] flex-shrink-0">
                        Route Options:
                      </span>
                      {plannedTrip.alternatives.map((alt, idx) => {
                        const isSelected = (plannedTrip.selectedAlternativeIndex ?? 0) === idx;
                        return (
                          <button
                            key={alt.id}
                            type="button"
                            onClick={() => onSelectAlternative && onSelectAlternative(idx)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#0ea5e9] text-[#003751] shadow-md font-bold'
                                : 'bg-[#191f2f] text-[#94A3B8] hover:text-white border border-white/5'
                            }`}
                          >
                            {alt.title} ({alt.totalTimeMin}m)
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Synchronized Boarding Stop Banner with Direct Scroll */}
                  {plannedTrip.departureStopCode && (
                    <div className="p-2.5 rounded-lg bg-[#0F1C3F] border border-[#38bdf8]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Bus className="w-4 h-4 text-[#89ceff] flex-shrink-0" />
                        <div className="text-xs truncate">
                          <span className="text-[#94A3B8]">Departure Boarding Stop: </span>
                          <strong className="text-[#89ceff]">
                            {plannedTrip.departureStopName || `#${plannedTrip.departureStopCode}`}
                          </strong>
                          <span className="text-[10px] text-[#64748B] ml-1.5 font-mono">
                            (#{plannedTrip.departureStopCode})
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleScrollToArrivals}
                        className="self-start sm:self-auto flex-shrink-0 px-2.5 py-1 rounded text-xs font-semibold bg-[#0ea5e9]/20 hover:bg-[#0ea5e9]/30 text-[#89ceff] border border-[#0ea5e9]/40 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Live Bus Board</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Step-by-Step Segments */}
                  <div className="space-y-2 pt-1">
                    {plannedTrip.segments.map((seg, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs p-2 rounded-lg bg-[#080D1A]/60 border border-white/5"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {seg.mode === 'walk' && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#242a3a] text-[#94A3B8]">
                              <Footprints className="w-3.5 h-3.5" />
                            </span>
                          )}
                          {seg.mode === 'bus' && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#0053db] text-white">
                              <Bus className="w-3.5 h-3.5" />
                            </span>
                          )}
                          {seg.mode === 'mrt' && (
                            <span
                              className="inline-flex items-center justify-center w-6 h-6 rounded text-white font-bold"
                              style={{ backgroundColor: seg.color || '#00964D' }}
                            >
                              <Train className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#F8FAFC] font-semibold flex items-center gap-2 flex-wrap">
                            <span>{seg.label}</span>
                            {seg.serviceNo && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-[#0ea5e9]/20 text-[#89ceff] border border-[#0ea5e9]/30">
                                Bus {seg.serviceNo}
                              </span>
                            )}
                          </div>
                          <div className="text-[#94A3B8] text-[11px] mt-0.5 leading-relaxed">
                            {seg.details}
                          </div>
                        </div>
                        <span className="text-[#94A3B8] font-mono text-[11px] font-semibold flex-shrink-0">
                          {seg.durationMin}m
                        </span>
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
