import React, { useState } from 'react';
import { Search, ArrowRight, Clock, ShieldCheck, Bus } from 'lucide-react';
import { POPULAR_BUS_SERVICES } from '../data/transitData';
import { BusServiceDetail } from '../types';

interface BusRoutesViewProps {
  onSelectBus: (serviceNo: string) => void;
  onSelectStopCode: (stopCode: string) => void;
}

export const BusRoutesView: React.FC<BusRoutesViewProps> = ({
  onSelectBus,
  onSelectStopCode,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = POPULAR_BUS_SERVICES.filter(
    (b) =>
      b.serviceNo.toLowerCase().includes(filterQuery.toLowerCase()) ||
      b.routeSummary.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191f2f] border border-[#2fd9f4]/30 text-xs font-semibold text-[#2fd9f4] mb-3">
          <Bus className="w-3.5 h-3.5" />
          <span>Singapore Bus Directory</span>
        </div>
        <h1 className="text-3xl font-bold text-[#F8FAFC]">Bus Service Routes &amp; Timetables</h1>
        <p className="text-sm text-[#94A3B8] mt-1 max-w-2xl">
          Browse full stop sequences, first &amp; last bus operating schedules, and headway frequencies for all major corridors across Singapore.
        </p>

        {/* Filter Input */}
        <div className="mt-6 max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search bus number (e.g. 61, 858, 36) or destination..."
            className="w-full pl-11 pr-4 py-3 bg-[#0F1C3F] border border-[#38bdf8]/20 rounded-xl text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#0ea5e9]"
          />
        </div>
      </div>

      {/* Grid of Buses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((bus: BusServiceDetail) => (
          <div
            key={bus.serviceNo}
            className="p-5 rounded-2xl bg-[#0F1C3F] border border-[#38bdf8]/20 shadow-xl hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="px-3.5 py-2 rounded-xl bg-[#0ea5e9] text-[#003751] font-mono font-bold text-lg shadow">
                  {bus.serviceNo}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-[#0B1120] text-[#89ceff] font-medium border border-white/5">
                  {bus.deck}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#F8FAFC] mb-1">
                Bus {bus.serviceNo}
              </h3>
              <p className="text-xs text-[#94A3B8] mb-4">{bus.routeSummary}</p>

              <div className="p-3 rounded-xl bg-[#0B1120] border border-white/5 space-y-1.5 text-xs text-[#64748B]">
                <div className="flex items-center justify-between">
                  <span>Operator:</span>
                  <span className="text-[#F8FAFC] font-semibold">{bus.operator}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Peak Headway:</span>
                  <span className="text-[#10B981] font-semibold">{bus.headwayPeak}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>First / Last Bus:</span>
                  <span className="text-[#89ceff] font-mono">{bus.firstBus.weekday} – {bus.lastBus.weekday}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-[#64748B]">{bus.stops.length} key stop checkpoints</span>
              <button
                onClick={() => onSelectBus(bus.serviceNo)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#191f2f] text-[#89ceff] hover:bg-[#0ea5e9] hover:text-[#003751] transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>View Route</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
