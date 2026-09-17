import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, ArrowRight } from 'lucide-react';
import { BusStop, BusServiceDetail } from '../types';

interface SearchPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  stops: BusStop[];
  popularBuses: BusServiceDetail[];
  onSelectStop: (stopCode: string) => void;
  onSelectBus: (serviceNo: string) => void;
}

export const SearchPaletteModal: React.FC<SearchPaletteModalProps> = ({
  isOpen,
  onClose,
  stops,
  popularBuses,
  onSelectStop,
  onSelectBus,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  const filteredStops = stops.filter(
    (s) =>
      s.code.includes(normalized) ||
      s.name.toLowerCase().includes(normalized) ||
      s.road.toLowerCase().includes(normalized)
  );

  const filteredBuses = popularBuses.filter(
    (b) =>
      b.serviceNo.toLowerCase().includes(normalized) ||
      b.routeSummary.toLowerCase().includes(normalized)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0F1C3F] border border-[#38bdf8]/30 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search input bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#0B1120]">
          <Search className="w-5 h-5 text-[#89ceff]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a bus stop (#01113, Bugis), or bus service (61, 858)..."
            className="w-full bg-transparent text-sm sm:text-base text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#191f2f] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Stops category */}
          {filteredStops.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold text-[#89ceff] uppercase tracking-wider">
                Bus Stops ({filteredStops.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredStops.map((stop) => (
                  <div
                    key={stop.code}
                    onClick={() => {
                      onSelectStop(stop.code);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-[#191f2f] transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0B1120] border border-white/5 flex items-center justify-center text-[#89ceff]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#89ceff] transition-colors">
                          {stop.name}
                        </div>
                        <div className="text-xs text-[#64748B]">
                          {stop.road} • <span className="font-mono text-[#89ceff]">#{stop.code}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#89ceff] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buses category */}
          {filteredBuses.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold text-[#2fd9f4] uppercase tracking-wider">
                Bus Services ({filteredBuses.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredBuses.map((bus) => (
                  <div
                    key={bus.serviceNo}
                    onClick={() => {
                      onSelectBus(bus.serviceNo);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-[#191f2f] transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-[#0ea5e9] text-[#003751] font-mono font-bold flex items-center justify-center text-sm shadow">
                        {bus.serviceNo}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#2fd9f4] transition-colors">
                          Bus {bus.serviceNo}
                        </div>
                        <div className="text-xs text-[#64748B]">{bus.routeSummary}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2fd9f4] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredStops.length === 0 && filteredBuses.length === 0 && (
            <div className="py-12 text-center text-xs text-[#64748B]">
              No stops or buses found matching "{query}". Try a different search term or 5-digit code.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#0B1120] border-t border-white/5 flex items-center justify-between text-[11px] text-[#64748B]">
          <span>Tip: Press ESC to close</span>
          <span>Powered by LTA DataMall</span>
        </div>
      </div>
    </div>
  );
};
