import React from 'react';
import { X, AlertTriangle, Info, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { SERVICE_ALERTS } from '../data/transitData';
import { ServiceAlert } from '../types';

interface ServiceAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceAlertsModal: React.FC<ServiceAlertsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0F1C3F] border border-[#38bdf8]/30 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0B1120]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F8FAFC]">Service Alerts &amp; Advisories</h3>
              <p className="text-xs text-[#94A3B8]">Live incident stream from LTA &amp; Public Transport Operators</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#191f2f] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#242a3a] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alerts List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
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
                className={`p-4 rounded-xl border transition-all ${
                  isDisruption
                    ? 'bg-[#EF4444]/10 border-[#EF4444]/30'
                    : isDiversion
                    ? 'bg-[#F59E0B]/10 border-[#F59E0B]/30'
                    : 'bg-[#0B1120] border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
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
                      <Clock className="w-3 h-3" />
                      {timeLabel}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-[#89ceff] bg-[#191f2f] px-2 py-0.5 rounded border border-white/5">
                    {codeLabel}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#F8FAFC] mb-1">{alert.title}</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">{content}</p>

                {alert.alternative && (
                  <div className="p-2.5 rounded-lg bg-[#0F1C3F] border border-[#38bdf8]/20 text-xs text-[#89ceff] flex items-center gap-2">
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <span>Alternative: {alert.alternative}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B1120] border-t border-white/10 flex items-center justify-between text-xs text-[#64748B]">
          <span className="flex items-center gap-1.5 text-[#10B981]">
            <CheckCircle2 className="w-4 h-4" />
            System Status: 98.4% Normal Operations
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#191f2f] text-[#dde2f8] hover:bg-[#242a3a] transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
