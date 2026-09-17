import React from 'react';
import { X, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { BusServiceDetail } from '../types';

interface BusRouteModalProps {
  bus: BusServiceDetail | null;
  onClose: () => void;
  onSelectStopCode: (code: string) => void;
}

export const BusRouteModal: React.FC<BusRouteModalProps> = ({
  bus,
  onClose,
  onSelectStopCode,
}) => {
  if (!bus) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0F1C3F] border border-[#38bdf8]/30 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0B1120]">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-[#0ea5e9] text-[#003751] font-mono font-bold text-xl flex items-center justify-center shadow">
              {bus.serviceNo}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#F8FAFC]">Bus {bus.serviceNo}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-[#191f2f] text-[#89ceff] font-medium">
                  {bus.deck}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">{bus.routeSummary}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#191f2f] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#242a3a] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timetable & Headway Strip */}
        <div className="p-4 bg-[#151b2b] border-b border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[#64748B] block">Operator</span>
            <span className="text-[#F8FAFC] font-semibold">{bus.operator}</span>
          </div>
          <div>
            <span className="text-[#64748B] block">Peak Headway</span>
            <span className="text-[#10B981] font-semibold">{bus.headwayPeak}</span>
          </div>
          <div>
            <span className="text-[#64748B] block">Off-peak</span>
            <span className="text-[#89ceff] font-semibold">{bus.headwayOffpeak}</span>
          </div>
          <div>
            <span className="text-[#64748B] block">First / Last Bus</span>
            <span className="text-[#F8FAFC] font-mono">
              {bus.firstBus.weekday} - {bus.lastBus.weekday}
            </span>
          </div>
        </div>

        {/* Operating Hours Details */}
        <div className="px-5 py-3 bg-[#0B1120]/60 border-b border-white/5 flex flex-wrap gap-4 text-xs text-[#94A3B8]">
          <div>
            <strong className="text-[#dde2f8]">Weekdays:</strong> {bus.firstBus.weekday} – {bus.lastBus.weekday}
          </div>
          <div>
            <strong className="text-[#dde2f8]">Saturdays:</strong> {bus.firstBus.sat} – {bus.lastBus.sat}
          </div>
          <div>
            <strong className="text-[#dde2f8]">Sundays &amp; PH:</strong> {bus.firstBus.sun} – {bus.lastBus.sun}
          </div>
        </div>

        {/* Route Stop Sequence */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          <div className="text-xs font-bold text-[#89ceff] uppercase tracking-wider mb-2">
            Route Stop Sequence ({bus.stops.length} Key Checkpoints)
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#38bdf8]/30">
            {bus.stops.map((stop, idx) => (
              <div key={stop.code} className="relative flex items-center justify-between group">
                {/* Timeline node */}
                <div className={`absolute -left-6 w-3 h-3 rounded-full border-2 border-[#0ea5e9] ${
                  idx === 0 || idx === bus.stops.length - 1 ? 'bg-[#0ea5e9]' : 'bg-[#0F1C3F]'
                }`} />

                <div>
                  <div className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#89ceff] transition-colors">
                    {stop.name}
                  </div>
                  <div className="text-xs text-[#64748B]">
                    {stop.road} • <span className="font-mono text-[#89ceff]">#{stop.code}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectStopCode(stop.code);
                    onClose();
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#0B1120] border border-[#38bdf8]/20 text-[#89ceff] hover:bg-[#0ea5e9] hover:text-[#003751] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>View Stop</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B1120] border-t border-white/10 flex items-center justify-between text-xs text-[#64748B]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            LTA DataMall verified route geometry
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#191f2f] text-[#dde2f8] hover:bg-[#242a3a] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
