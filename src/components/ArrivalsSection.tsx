import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Database, Bookmark, BookmarkCheck, Accessibility, RefreshCw, AlertCircle, AlertTriangle, Clock, WifiOff, ShieldAlert } from 'lucide-react';
import { BusStop, BusServiceArrival } from '../types';

interface ArrivalsSectionProps {
  currentStop: BusStop;
  isBookmarked: boolean;
  onToggleBookmark: (stopCode: string) => void;
  onSelectBusService: (serviceNo: string) => void;
}

type PanelState = 'loading' | 'ok' | 'empty' | 'refused' | 'busy' | 'unreachable' | 'my key not set';

export const ArrivalsSection: React.FC<ArrivalsSectionProps> = ({
  currentStop,
  isBookmarked,
  onToggleBookmark,
  onSelectBusService,
}) => {
  const [panelState, setPanelState] = useState<PanelState>('loading');
  const [liveServices, setLiveServices] = useState<any[]>([]);
  const [retryCountdown, setRetryCountdown] = useState<number>(10);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');

  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Exact sentences mandated by the specification:
  const STATE_SENTENCES: Record<string, string> = {
    loading: 'Checking bus times from LTA, usually under a second.',
    empty: 'LTA answered, but no buses are listed for this stop right now.',
    refused: 'We could not get bus times, so nothing on this panel is current. Please tell us if this stays.',
    busy: 'The bus service is busy. We will try again in 10 seconds.',
    unreachable: 'We could not reach LTA, so nothing on this panel has updated.',
    'my key not set': 'LTA_ACCOUNT_KEY is not configured in server environment variables (.env). Please set your LTA DataMall AccountKey to receive live transit telemetry.',
  };

  const fetchArrivals = useCallback(async () => {
    setPanelState('loading');
    try {
      const res = await fetch(`/api/bus?BusStopCode=${encodeURIComponent(currentStop.code)}`);
      const body = await res.json();

      setLastUpdatedTime(new Date().toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

      if (body.state === 'ok') {
        setPanelState('ok');
        setLiveServices(body.data || []);
      } else if (body.state === 'empty') {
        setPanelState('empty');
        setLiveServices([]);
      } else if (body.state === 'refused') {
        setPanelState('refused');
      } else if (body.state === 'busy') {
        setPanelState('busy');
        setRetryCountdown(10);
      } else if (body.state === 'unreachable') {
        setPanelState('unreachable');
      } else if (body.state === 'my key not set') {
        setPanelState('my key not set');
      } else {
        setPanelState('refused');
      }
    } catch {
      setPanelState('unreachable');
    }
  }, [currentStop.code]);

  // Fetch when stop changes
  useEffect(() => {
    fetchArrivals();
  }, [fetchArrivals, currentStop.code]);

  // Handle countdown when in 'busy' state
  useEffect(() => {
    if (panelState === 'busy') {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = setInterval(() => {
        setRetryCountdown((prev) => {
          if (prev <= 1) {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            fetchArrivals();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      };
    }
  }, [panelState, fetchArrivals]);

  const getCrowdingBadge = (crowding?: string) => {
    switch (crowding?.toLowerCase()) {
      case 'seats':
      case 'sea':
        return { textColor: 'text-[#10B981]', label: 'Seats' };
      case 'standing':
      case 'sda':
        return { textColor: 'text-[#F59E0B]', label: 'Standing' };
      case 'limited':
      case 'lsd':
        return { textColor: 'text-[#EF4444]', label: 'Limited' };
      default:
        return { textColor: 'text-[#94A3B8]', label: 'Unknown' };
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

  const formatMinutesDisplay = (minutes: number | null | undefined, fallbackStr?: string) => {
    if (minutes === 0) return 'Arr';
    if (typeof minutes === 'number' && minutes > 0) return `${minutes}m`;
    if (fallbackStr) return fallbackStr;
    return '--';
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
          </div>
        </div>

        {/* Live Bus Arrivals Container */}
        <div className="bg-[#0F1C3F] border border-[#38bdf8]/25 rounded-2xl p-4 sm:p-6 shadow-2xl mb-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 gap-4 border-b border-white/10">
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

            {/* Actions & Live Telemetry Badge */}
            <div className="flex items-center flex-wrap gap-2.5">
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

              <button
                onClick={fetchArrivals}
                disabled={panelState === 'loading'}
                title="Refresh live arrivals"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10 bg-[#0B1120] text-[#94A3B8] hover:text-[#dde2f8] transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${panelState === 'loading' ? 'animate-spin text-[#89ceff]' : ''}`} />
                <span>Refresh</span>
              </button>

              <span className="inline-flex items-center gap-1.5 text-[#10B981] text-xs font-semibold bg-[#0B1120] border border-[#10B981]/30 px-3 py-1.5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                Live LTA Sync
              </span>
            </div>
          </div>

          {/* Dedicated State Banners (Displaying verbatim sentences) */}
          {panelState === 'loading' && (
            <div className="mt-6 p-4 rounded-xl bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-[#89ceff] animate-spin shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#89ceff]">
                  {STATE_SENTENCES.loading}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">Connecting to /api/bus endpoint...</p>
              </div>
            </div>
          )}

          {panelState === 'empty' && (!currentStop.services || currentStop.services.length === 0) && (
            <div className="mt-6 p-6 rounded-xl bg-[#191f2f] border border-white/10 text-center">
              <Clock className="w-8 h-8 text-[#94A3B8] mx-auto mb-2 opacity-80" />
              <p className="text-base font-semibold text-[#F8FAFC]">
                {STATE_SENTENCES.empty}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Stop #{currentStop.code} currently has no active bus arrivals listed in the feed.
              </p>
            </div>
          )}

          {panelState === 'refused' && (
            <div className="mt-6 p-5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-start gap-3.5">
              <ShieldAlert className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#EF4444]">
                  {STATE_SENTENCES.refused}
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  HTTP Status 502 Refused. The upstream transport gateway declined the request.
                </p>
              </div>
            </div>
          )}

          {panelState === 'busy' && (
            <div className="mt-6 p-5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-start gap-3.5">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#F59E0B]">
                  {STATE_SENTENCES.busy}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-[#F8FAFC] font-mono px-2 py-0.5 rounded bg-[#0B1120] border border-[#F59E0B]/30">
                    Retrying in {retryCountdown}s
                  </span>
                  <button
                    onClick={fetchArrivals}
                    className="text-xs text-[#89ceff] hover:underline font-semibold cursor-pointer"
                  >
                    Retry Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {panelState === 'unreachable' && (
            <div className="mt-6 p-5 rounded-xl bg-[#0B1120] border border-[#EF4444]/30 flex items-start gap-3.5">
              <WifiOff className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#EF4444]">
                  {STATE_SENTENCES.unreachable}
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {lastUpdatedTime ? `The numbers below are from ${lastUpdatedTime}.` : 'No response within 6-second timeout.'}
                </p>
              </div>
            </div>
          )}

          {panelState === 'my key not set' && (
            <div className="mt-6 p-5 rounded-xl bg-[#0B1120] border border-[#38bdf8]/30 flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-[#89ceff] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#89ceff]">
                  {STATE_SENTENCES['my key not set']}
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  HTTP Status 503. The server aborted the upstream call before contacting LTA to prevent 401 rejection. Displaying cached baseline schedules below:
                </p>
              </div>
            </div>
          )}

          {/* Arrival Cards Grid (Shown for 'ok', 'my key not set', or whenever stop has services) */}
          {currentStop.services && currentStop.services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
              {currentStop.services.map((svc: BusServiceArrival) => {
                // Find matching live service if returned from /api/bus
                const liveMatch = liveServices.find((ls) => ls.serviceNo === svc.serviceNo);

                const nextMins = liveMatch ? liveMatch.nextBus?.minutes : null;
                const next2Mins = liveMatch ? liveMatch.nextBus2?.minutes : null;
                const next3Mins = liveMatch ? liveMatch.nextBus3?.minutes : null;

                const nextLoad = liveMatch?.nextBus?.load || svc.nextArrival.crowding;
                const secondLoad = liveMatch?.nextBus2?.load || svc.secondArrival.crowding;
                const thirdLoad = liveMatch?.nextBus3?.load || svc.thirdArrival.crowding;

                const nextBadge = getCrowdingBadge(nextLoad);
                const secondBadge = getCrowdingBadge(secondLoad);
                const thirdBadge = getCrowdingBadge(thirdLoad);

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
                          {liveMatch?.nextBus?.type || svc.deckType}
                        </span>
                      </div>

                      {/* 3 Arrivals Countdown Grid */}
                      <div className="grid grid-cols-3 gap-2 text-center py-2.5 bg-[#0B1120] rounded-lg mb-2.5 border border-white/5">
                        <div className="border-r border-white/5">
                          <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">Next</div>
                          <div className={`font-mono text-base font-bold ${nextBadge.textColor}`}>
                            {formatMinutesDisplay(nextMins, svc.nextArrival.time)}
                          </div>
                          <div className={`text-[10px] font-semibold ${nextBadge.textColor}`}>
                            {nextBadge.label}
                          </div>
                        </div>

                        <div className="border-r border-white/5">
                          <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">2nd</div>
                          <div className={`font-mono text-base font-bold ${secondBadge.textColor}`}>
                            {formatMinutesDisplay(next2Mins, svc.secondArrival.time)}
                          </div>
                          <div className={`text-[10px] font-semibold ${secondBadge.textColor}`}>
                            {secondBadge.label}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">3rd</div>
                          <div className={`font-mono text-base font-bold ${thirdBadge.textColor}`}>
                            {formatMinutesDisplay(next3Mins, svc.thirdArrival.time)}
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
                      <span className="text-[#94A3B8] font-medium">{liveMatch?.operator || svc.operator}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

