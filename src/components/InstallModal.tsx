import React from 'react';
import { X, Smartphone, Monitor, Share, PlusSquare, MoreVertical, Download } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0F1C3F] border border-[#38bdf8]/30 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0B1120]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0ea5e9] text-[#003751] font-bold text-xl flex items-center justify-center shadow">
              🚌
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F8FAFC]">Install SmartCommute SG</h3>
              <p className="text-xs text-[#94A3B8]">Add to your home screen for instant 1-tap launch</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#191f2f] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#242a3a] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Tab Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* iOS Safari */}
          <div className="p-4 rounded-xl bg-[#0B1120] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-[#89ceff] font-bold text-sm">
              <Smartphone className="w-4 h-4" />
              <span>iPhone &amp; iPad (Apple Safari)</span>
            </div>
            <ol className="space-y-2 text-xs text-[#94A3B8] pl-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#89ceff]">1.</span>
                <span>Tap the <strong className="text-[#F8FAFC]">Share button</strong> (<Share className="w-3.5 h-3.5 inline text-[#89ceff] mx-1" />) at the bottom toolbar of Safari.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#89ceff]">2.</span>
                <span>Scroll down and select <strong className="text-[#F8FAFC]">Add to Home Screen</strong> (<PlusSquare className="w-3.5 h-3.5 inline text-[#89ceff] mx-1" />).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#89ceff]">3.</span>
                <span>Confirm "SmartCommute" and tap <strong className="text-[#F8FAFC]">Add</strong> in the top right.</span>
              </li>
            </ol>
          </div>

          {/* Android Chrome */}
          <div className="p-4 rounded-xl bg-[#0B1120] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-[#2fd9f4] font-bold text-sm">
              <Smartphone className="w-4 h-4" />
              <span>Android (Google Chrome / Samsung Internet)</span>
            </div>
            <ol className="space-y-2 text-xs text-[#94A3B8] pl-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#2fd9f4]">1.</span>
                <span>Tap the three dots menu (<MoreVertical className="w-3.5 h-3.5 inline text-[#2fd9f4] mx-1" />) in the upper right corner.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#2fd9f4]">2.</span>
                <span>Select <strong className="text-[#F8FAFC]">Install App</strong> or <strong className="text-[#F8FAFC]">Add to Home screen</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#2fd9f4]">3.</span>
                <span>SmartCommute will appear on your app launcher with full offline cached pages.</span>
              </li>
            </ol>
          </div>

          {/* Desktop */}
          <div className="p-4 rounded-xl bg-[#0B1120] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-[#b4c5ff] font-bold text-sm">
              <Monitor className="w-4 h-4" />
              <span>Desktop (Chrome, Edge, Brave)</span>
            </div>
            <p className="text-xs text-[#94A3B8]">
              Look for the install icon (<Download className="w-3.5 h-3.5 inline text-[#b4c5ff] mx-1" />) on the right side of the address bar, or click Menu → Cast, Save &amp; Share → Install SmartCommute.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B1120] border-t border-white/10 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0ea5e9] text-[#003751] hover:brightness-110 transition-all cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
