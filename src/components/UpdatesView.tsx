import React from 'react';
import { AlertTriangle, Clock, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SERVICE_ALERTS } from '../data/transitData';
import { ServiceAlert } from '../types';

export const UpdatesView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191f2f] border border-[#F59E0B]/30 text-xs font-semibold text-[#F59E0B] mb-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Real-time Transit Advisories</span>
        </div>
        <h1 className="text-3xl font-bold text-[#F8FAFC]">Service Alerts &amp; Track Status</h1>
        <p className="text-sm text-[#94A3B8] mt-1 max-w-2xl">
          Live MRT disruption alerts, bus diversion announcements, and maintenance advisories across Singapore's transport network.
        </p>
      </div>

      {/* Network Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-[#0F1C3F] border border-[#10B981]/30 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#64748B]">North-South &amp; East-West</div>
            <div className="text-sm font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4" /> Normal Operations
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
        </div>

        <div className="p-4 rounded-xl bg-[#0F1C3F] border border-[#F59E0B]/30 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#64748B]">Circle &amp; Downtown Lines</div>
            <div className="text-sm font-bold text-[#F59E0B] flex items-center gap-1 mt-0.5">
              <AlertTriangle className="w-4 h-4" /> 1 Minor Advisory
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
        </div>

        <div className="p-4 rounded-xl bg-[#0F1C3F] border border-[#10B981]/30 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#64748B]">Public Bus Operators</div>
            <div className="text-sm font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4" /> 99.1% On-Time Telemetry
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
        </div>
      </div>

      {/* Active Incident List */}
      <div className="space-y-4">
        {SERVICE_ALERTS.map((alert: ServiceAlert) => {
          const isDisruption = alert.status === 'Disruption' || alert.type === 'disruption';
          const isDiversion = alert.status === 'Diversion' || alert.type === 'diversion';
          const statusLabel = alert.status || alert.type;
          const timeLabel = alert.timeAgo || alert.timestamp || 'Just now';
          const codeLabel = alert.lineCode || alert.lineOrService || alert.lineName || 'SG Transit';
          const content = alert.summary || alert.description;

          return (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all ${
                isDisruption
                  ? 'bg-[#EF4444]/10 border-[#EF4444]/30'
                  : isDiversion
                  ? 'bg-[#F59E0B]/10 border-[#F59E0B]/30'
                  : 'bg-[#0F1C3F] border-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      isDisruption
                        ? 'bg-[#EF4444] text-white'
                        : isDiversion
                        ? 'bg-[#F59E0B] text-black'
                        : 'bg-[#10B981] text-white'
                    }`}
                  >
                    {statusLabel}
                  </span>
                  <span className="text-xs text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {timeLabel}
                  </span>
                </div>

                <span className="text-xs font-mono text-[#89ceff] bg-[#0B1120] px-2.5 py-1 rounded border border-white/5">
                  {codeLabel}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#F8FAFC] mb-2">{alert.title}</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
                {content}
              </p>

              {alert.alternative && (
                <div className="p-3 rounded-xl bg-[#0B1120] border border-[#38bdf8]/20 text-xs text-[#89ceff] flex items-center gap-2">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>Alternative Route: {alert.alternative}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
