import React from 'react';
import { Database, Bookmark, BookmarkCheck, Accessibility, ExternalLink } from 'lucide-react';
import { BusStop, BusServiceArrival } from '../types';

interface ArrivalsSectionProps {
  currentStop: BusStop;
  isBookmarked: boolean;
  onToggleBookmark: (stopCode: string) => void;
  onSelectBusService: (serviceNo: string) => void;
}

export const ArrivalsSection: React.FC<ArrivalsSectionProps> = ({
  currentStop,
  isBookmarked,
  onToggleBookmark,
  onSelectBusService,
}) => {
  const getCrowdingBadge = (crowding: 'seats' | 'standing' | 'limited') => {
    switch (crowding) {
      case 'seats':
        return {
          textColor: 'text-[#10B981]',
          label: 'Seats',
        };
      case 'standing':
        return {
          textColor: 'text-[#F59E0B]',
          label: 'Standing',
        };
      case 'limited':
        return {
          textColor: 'text-[#EF4444]',
          label: 'Limited',
        };
      default:
        return {
          textColor: 'text-[#94A3B8]',
          label: 'Unknown',
        };
    }
  };

  const getServicePillStyle = (serviceNo: string) => {
    if (serviceNo === '61') {
      return 'bg-[#0ea5e9] text-[#003751] shadow-[0_0_12px_rgba(14,165,233,0.3)]';
    }
    if (serviceNo === '175') {
      return 'bg-[#0053db] text-white shadow-[0_0_12px_rgba(0,83,219,0.3)]';
    }
    if (serviceNo === '858') {
      return 'bg-[#0F1C3F] text-[#2fd9f4] border border-[#2fd9f4]/40 shadow-[0_0_12px_rgba(47,217,244,0.25)]';
    }
    return 'bg-[#191f2f] text-[#F8FAFC] border border-white/10';
  };

  return (
    <section className="w-full bg-[#0B1120] py-12 border-t border-[#38bdf8]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Intro Block */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191f2f] border border-[#38bdf8]/20 text-xs font-semibold text-[#89ceff] mb-3">
            <Database className="w-3.5 h-3.5" />
            <span>LTA DataMall Precision Telemetry</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC] mb-4">
            Real-time bus arrival times for every stop in Singapore
          </h2>

          <div className="space-y-3 text-[#94A3B8] text-base leading-relaxed">
            <p>
              SmartCommute shows you when your bus is actually coming. Enter a stop name, a road, or the five-digit code printed on the bus stop pole, and you get the next three arrivals for every service calling there — along with how full each approaching bus is, so you can decide whether to squeeze onto this one or wait ninety seconds for the next.
            </p>
            <p>
              The data comes from{' '}
              <a
                className="text-[#89ceff] hover:underline font-semibold"
                href="https://datamall.lta.gov.sg"
                rel="noopener noreferrer"
                target="_blank"
              >
                LTA DataMall
              </a>
              , the Land Transport Authority's official open data platform, and is derived from live bus telemetry rather than a printed timetable. That is why the numbers shift as you watch them: they are predictions being continuously recalculated, not scheduled departure times.
            </p>
            <p className="text-sm text-[#64748B]">
              Coverage extends to all of Singapore's roughly 5,000 bus stops and every scheduled bus service. Stop records are refreshed twice a month and full route data is resynchronised monthly, both automatically, so new stops and route changes appear without anyone having to update them by hand.
            </p>
          </div>
        </div>

        {/* Live Bus Arrivals Container */}
        <div className="bg-[#0F1C3F] border border-[#38bdf8]/25 rounded-2xl p-4 sm:p-6 shadow-2xl mb-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 gap-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-2.5 py-1 rounded bg-[#0ea5e9] text-[#003751] text-xs font-mono font-bold">
                  #{currentStop.code}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                  {currentStop.name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                {currentStop.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleBookmark(currentStop.code)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#0ea5e9]/20 border-[#0ea5e9] text-[#89ceff]'
                    : 'bg-[#0B1120] border-white/10 text-[#94A3B8] hover:text-[#dde2f8]'
                }`}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#89ceff]" />
                    <span>Bookmarked</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Bookmark Stop</span>
                  </>
                )}
              </button>

              <span className="inline-flex items-center gap-1.5 text-[#10B981] text-xs font-semibold bg-[#0B1120] border border-[#10B981]/30 px-3 py-1.5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                Live GPS Sync (LTA DataMall)
              </span>
            </div>
          </div>

          {/* Arrival Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {currentStop.services.map((svc: BusServiceArrival) => {
              const nextBadge = getCrowdingBadge(svc.nextArrival.crowding);
              const secondBadge = getCrowdingBadge(svc.secondArrival.crowding);
              const thirdBadge = getCrowdingBadge(svc.thirdArrival.crowding);

              return (
                <div
                  key={svc.serviceNo}
                  onClick={() => onSelectBusService(svc.serviceNo)}
                  className="bg-[#191f2f]/90 border border-[#38bdf8]/20 rounded-xl p-4 shadow hover:bg-[#162858] hover:border-[#38bdf8]/40 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Bus No & Destination */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1.5 rounded-xl font-mono text-lg font-bold ${getServicePillStyle(svc.serviceNo)}`}>
                          {svc.serviceNo}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#89ceff] transition-colors">
                            {svc.destination}
                          </div>
                          <div className="text-xs text-[#64748B]">
                            {svc.via}
                          </div>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0B1120] text-[#89ceff] border border-white/5">
                        {svc.deckType}
                      </span>
                    </div>

                    {/* 3 Arrivals Countdown Grid */}
                    <div className="grid grid-cols-3 gap-2 text-center py-2.5 bg-[#0B1120] rounded-lg mb-2.5 border border-white/5">
                      <div className="border-r border-white/5">
                        <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">Next</div>
                        <div className={`font-mono text-base font-bold ${nextBadge.textColor}`}>
                          {svc.nextArrival.time}
                        </div>
                        <div className={`text-[10px] font-semibold ${nextBadge.textColor}`}>
                          {nextBadge.label}
                        </div>
                      </div>

                      <div className="border-r border-white/5">
                        <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">2nd</div>
                        <div className={`font-mono text-base font-bold ${secondBadge.textColor}`}>
                          {svc.secondArrival.time}
                        </div>
                        <div className={`text-[10px] font-semibold ${secondBadge.textColor}`}>
                          {secondBadge.label}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">3rd</div>
                        <div className={`font-mono text-base font-bold ${thirdBadge.textColor}`}>
                          {svc.thirdArrival.time}
                        </div>
                        <div className={`text-[10px] font-semibold ${thirdBadge.textColor}`}>
                          {thirdBadge.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Accessibility & Operator */}
                  <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
                    <span className="flex items-center gap-1 text-[#10B981]">
                      <Accessibility className="w-3.5 h-3.5" />
                      <span>Wheelchair Accessible</span>
                    </span>
                    <span className="text-[#94A3B8] font-medium">{svc.operator}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
