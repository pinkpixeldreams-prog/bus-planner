import React from 'react';
import { Smartphone, Download, ArrowRight } from 'lucide-react';

interface InstallCalloutProps {
  onOpenInstallGuide: () => void;
}

export const InstallCallout: React.FC<InstallCalloutProps> = ({ onOpenInstallGuide }) => {
  const handleInstallClick = () => {
    onOpenInstallGuide();
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
      <div className="relative bg-gradient-to-br from-[#0F1C3F] via-[#0F1C3F] to-[#0B1120] border border-[#38bdf8]/25 rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#0ea5e9]/10 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#242a3a] border border-[#38bdf8]/30 flex-shrink-0 flex items-center justify-center text-3xl shadow-[0_0_24px_rgba(14,165,233,0.3)] select-none">
              🚌
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F8FAFC] mb-1.5">
                Keep it on your home screen
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
                SmartCommute can be added to your phone's home screen and opened like an app — full screen, its own icon, straight to the arrivals search. No app store download, no account, and it still opens the pages you have already visited when your signal drops.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold bg-[#0ea5e9] text-[#003751] hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Install SmartCommute</span>
            </button>

            <button
              type="button"
              onClick={onOpenInstallGuide}
              className="text-xs sm:text-sm text-[#94A3B8] hover:text-[#89ceff] transition-colors text-center px-2 py-1 cursor-pointer flex items-center gap-1"
            >
              <span>How to install on iPhone, Android or desktop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
