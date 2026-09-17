import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, MapPin } from 'lucide-react';
import { BusStop } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedStopCodes: string[];
  stops: BusStop[];
  onSelectStop: (stopCode: string) => void;
  onRemoveBookmark: (stopCode: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedStopCodes,
  stops,
  onSelectStop,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  const bookmarkedStops = stops.filter((s) => savedStopCodes.includes(s.code));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0F1C3F] border-l border-[#38bdf8]/30 w-full max-w-md h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0B1120]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0ea5e9]/20 border border-[#0ea5e9]/40 flex items-center justify-center text-[#89ceff]">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F8FAFC]">Saved Bus Stops</h3>
              <p className="text-xs text-[#64748B]">{savedStopCodes.length} stops saved locally</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#191f2f] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#242a3a] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {bookmarkedStops.length === 0 ? (
            <div className="py-16 text-center space-y-3 text-xs text-[#64748B]">
              <Bookmark className="w-8 h-8 text-[#64748B] mx-auto opacity-50" />
              <p>You have not bookmarked any bus stops yet.</p>
              <p className="text-[11px] text-[#94A3B8]">
                Tap the bookmark button on any stop arrivals card to save it here for fast 1-tap access.
              </p>
            </div>
          ) : (
            bookmarkedStops.map((stop) => (
              <div
                key={stop.code}
                className="p-3.5 rounded-xl bg-[#0B1120] border border-[#38bdf8]/20 hover:border-[#38bdf8]/40 transition-all flex items-center justify-between group"
              >
                <div
                  onClick={() => {
                    onSelectStop(stop.code);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer pr-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#89ceff] bg-[#191f2f] px-1.5 py-0.5 rounded">
                      #{stop.code}
                    </span>
                    <h4 className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#89ceff] transition-colors truncate">
                      {stop.name}
                    </h4>
                  </div>
                  <div className="text-xs text-[#64748B] flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{stop.road}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-[#10B981] font-semibold">
                    {stop.services.length} active bus lines arriving
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectStop(stop.code);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-[#191f2f] text-[#89ceff] hover:bg-[#0ea5e9] hover:text-[#003751] transition-all cursor-pointer"
                    title="View Arrivals"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(stop.code)}
                    className="p-2 rounded-lg bg-[#191f2f] text-[#EF4444] hover:bg-[#EF4444]/20 transition-all cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B1120] border-t border-white/10 text-xs text-[#64748B] flex items-center justify-between">
          <span>Zero login required • Browser storage</span>
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
