import React from 'react';
import { Compass, GitFork, Bookmark, Bell, ArrowRight } from 'lucide-react';

interface FeatureBentoProps {
  onTriggerNearest: () => void;
  onOpenBusRoutes: () => void;
  onOpenBookmarks: () => void;
  onOpenAlerts: () => void;
}

export const FeatureBento: React.FC<FeatureBentoProps> = ({
  onTriggerNearest,
  onOpenBusRoutes,
  onOpenBookmarks,
  onOpenAlerts,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC] mb-2">
          What you can do here
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8]">
          Built from the ground up to solve daily friction points across the Singapore commuter network.
        </p>
      </div>

      {/* 4 Bento Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Feature 1 */}
        <div
          onClick={onTriggerNearest}
          className="bg-[#0F1C3F] border border-[#38bdf8]/20 rounded-2xl p-6 shadow-xl hover:-translate-y-1 hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#191f2f] border border-[#38bdf8]/20 flex items-center justify-center text-[#89ceff] mb-4 group-hover:scale-110 group-hover:border-[#38bdf8] transition-all">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#89ceff] transition-colors">
              Find your nearest stops
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              One tap returns the five closest bus stops to your location, ranked by walking distance. Location access is optional — search works just as well.
            </p>
          </div>

          <div className="mt-5 pt-3 text-[#89ceff] text-xs font-semibold flex items-center gap-1">
            <span>GPS Geo-Telemetry</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Feature 2 */}
        <div
          onClick={onOpenBusRoutes}
          className="bg-[#0F1C3F] border border-[#38bdf8]/20 rounded-2xl p-6 shadow-xl hover:-translate-y-1 hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#191f2f] border border-[#2fd9f4]/20 flex items-center justify-center text-[#2fd9f4] mb-4 group-hover:scale-110 group-hover:border-[#2fd9f4] transition-all">
              <GitFork className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#2fd9f4] transition-colors">
              Look up any bus route
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Enter a service number to see every stop in sequence, in both directions, with first and last bus timings for weekdays, Saturdays and Sundays.
            </p>
          </div>

          <div className="mt-5 pt-3 text-[#2fd9f4] text-xs font-semibold flex items-center gap-1">
            <span>Full Sequence &amp; Hours</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Feature 3 */}
        <div
          onClick={onOpenBookmarks}
          className="bg-[#0F1C3F] border border-[#38bdf8]/20 rounded-2xl p-6 shadow-xl hover:-translate-y-1 hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#191f2f] border border-[#b4c5ff]/20 flex items-center justify-center text-[#b4c5ff] mb-4 group-hover:scale-110 group-hover:border-[#b4c5ff] transition-all">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#b4c5ff] transition-colors">
              Bookmark the stops you use daily
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Saved in your own browser, so your regular stops are one tap away with no account and no login.
            </p>
          </div>

          <div className="mt-5 pt-3 text-[#b4c5ff] text-xs font-semibold flex items-center gap-1">
            <span>Zero Login Required</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Feature 4 */}
        <div
          onClick={onOpenAlerts}
          className="bg-[#0F1C3F] border border-[#38bdf8]/20 rounded-2xl p-6 shadow-xl hover:-translate-y-1 hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#191f2f] border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] mb-4 group-hover:scale-110 group-hover:border-[#F59E0B] transition-all">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#F59E0B] transition-colors">
              Check service alerts
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Live MRT disruption and bus diversion notices — worth a glance before you leave rather than after you are already on the platform.
            </p>
          </div>

          <div className="mt-5 pt-3 text-[#F59E0B] text-xs font-semibold flex items-center gap-1">
            <span>Real-Time Incident Stream</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
};
