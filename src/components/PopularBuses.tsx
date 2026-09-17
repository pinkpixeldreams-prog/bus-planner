import React from 'react';
import { POPULAR_BUS_SERVICES } from '../data/transitData';
import { BusServiceDetail } from '../types';

interface PopularBusesProps {
  onSelectBus: (serviceNo: string) => void;
}

export const PopularBuses: React.FC<PopularBusesProps> = ({ onSelectBus }) => {
  const getBadgeStyle = (service: BusServiceDetail) => {
    switch (service.colorType) {
      case 'primary':
        return 'bg-[#0ea5e9] text-[#003751] shadow-[0_0_12px_rgba(14,165,233,0.3)]';
      case 'secondary':
        return 'bg-[#0053db] text-white shadow-[0_0_12px_rgba(0,83,219,0.3)]';
      case 'tertiary':
        return 'bg-[#242a3a] text-[#2fd9f4] border border-[#2fd9f4]/30 shadow-[0_0_12px_rgba(47,217,244,0.25)]';
      case 'warning':
        return 'bg-[#242a3a] text-[#F59E0B] border border-[#F59E0B]/30';
      default:
        return 'bg-[#242a3a] text-[#F8FAFC] border border-white/10';
    }
  };

  return (
    <section className="w-full bg-[#0B1120] py-14 border-y border-[#38bdf8]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC] mb-1.5">
            Popular bus services
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Jump straight to the full route, stop list and operating hours for some of Singapore's most-searched services.
          </p>
        </div>

        {/* Bus Badges Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {POPULAR_BUS_SERVICES.map((bus) => (
            <div
              key={bus.serviceNo}
              onClick={() => onSelectBus(bus.serviceNo)}
              className="p-3.5 rounded-xl bg-[#0F1C3F] border border-[#38bdf8]/20 hover:bg-[#162858] hover:border-[#38bdf8]/40 transition-all flex items-center gap-3 group cursor-pointer shadow"
            >
              <div
                className={`w-11 h-11 rounded-lg font-mono text-base font-bold flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${getBadgeStyle(bus)}`}
              >
                {bus.serviceNo}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#89ceff] transition-colors truncate">
                  Bus {bus.serviceNo}
                </div>
                <div className="text-xs text-[#64748B] truncate">
                  {bus.routeSummary.split('(')[1]?.replace(')', '') || bus.routeSummary}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
