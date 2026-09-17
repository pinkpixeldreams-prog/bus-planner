import React from 'react';
import { Search, MapPin, Bookmark, Sparkles, User, Bell } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAlerts: () => void;
  onOpenBookmarks: () => void;
  savedStopsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  onOpenAlerts,
  onOpenBookmarks,
  savedStopsCount,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#0d1322]/85 backdrop-blur-xl border-b border-[#38bdf8]/15 shadow-[0_4px_24px_rgba(8,14,29,0.7)]">
      <div className="h-16 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            aria-label="SmartCommute SG Home"
          >
            <span className="text-xl select-none" role="img" aria-label="bus">🚌</span>
            <span className="text-xl font-bold tracking-tight text-[#F8FAFC] group-hover:text-[#89ceff] transition-colors">
              SmartCommute
            </span>
            <span className="ml-1 text-[11px] font-bold text-[#2fd9f4] bg-[#191f2f] border border-[#38bdf8]/20 px-1.5 py-0.5 rounded">
              SG
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-[#0B1120]/60 rounded-xl border border-white/5">
            <button
              onClick={() => onSelectTab('home')}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                currentTab === 'home'
                  ? 'bg-[#0ea5e9] text-[#003751] shadow-[0_0_12px_rgba(14,165,233,0.3)]'
                  : 'text-[#bec8d2] hover:text-[#dde2f8] hover:bg-[#242a3a]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onSelectTab('bus-routes')}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                currentTab === 'bus-routes'
                  ? 'bg-[#0ea5e9] text-[#003751] shadow-[0_0_12px_rgba(14,165,233,0.3)]'
                  : 'text-[#bec8d2] hover:text-[#dde2f8] hover:bg-[#242a3a]'
              }`}
            >
              Bus Routes
            </button>
            <button
              onClick={() => onSelectTab('updates')}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                currentTab === 'updates'
                  ? 'bg-[#0ea5e9] text-[#003751] shadow-[0_0_12px_rgba(14,165,233,0.3)]'
                  : 'text-[#bec8d2] hover:text-[#dde2f8] hover:bg-[#242a3a]'
              }`}
            >
              Updates
            </button>
            <button
              onClick={() => onSelectTab('mrt-map')}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                currentTab === 'mrt-map'
                  ? 'bg-[#0ea5e9] text-[#003751] shadow-[0_0_12px_rgba(14,165,233,0.3)]'
                  : 'text-[#bec8d2] hover:text-[#dde2f8] hover:bg-[#242a3a]'
              }`}
            >
              MRT Map
            </button>
            <button
              onClick={() => onSelectTab('blog')}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                currentTab === 'blog'
                  ? 'bg-[#0ea5e9] text-[#003751] shadow-[0_0_12px_rgba(14,165,233,0.3)]'
                  : 'text-[#bec8d2] hover:text-[#dde2f8] hover:bg-[#242a3a]'
              }`}
            >
              Blog
            </button>
          </nav>
        </div>

        {/* Search & Utility Dock */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            aria-label="Search transit network"
            className="hidden sm:flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-xl bg-[#0B1120] border border-[#38bdf8]/20 text-[#bec8d2] hover:text-[#dde2f8] hover:bg-[#191f2f] hover:border-[#38bdf8]/40 transition-all cursor-pointer shadow-inner"
            type="button"
          >
            <Search className="w-4 h-4 text-[#89ceff]" />
            <span className="text-xs text-[#64748B]">Search route, bus, stop...</span>
            <kbd className="hidden md:inline-flex items-center text-[10px] font-mono text-[#64748B] bg-[#242a3a] px-1.5 py-0.5 rounded border border-white/5">
              ⌘K
            </kbd>
          </button>

          {/* Quick Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBookmarks}
              title="Saved Bus Stops"
              className="relative p-2 rounded-xl bg-[#0B1120] border border-[#38bdf8]/20 text-[#89ceff] hover:bg-[#191f2f] transition-all cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
              {savedStopsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0ea5e9] text-[#003751] text-[10px] font-bold flex items-center justify-center">
                  {savedStopsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAlerts}
              title="Service Alerts"
              className="p-2 rounded-xl bg-[#0B1120] border border-[#38bdf8]/20 text-[#F59E0B] hover:bg-[#191f2f] transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* LTA Live Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#191f2f] border border-[#10B981]/30 text-[#10B981] text-xs font-semibold select-none">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="hidden xl:inline text-[#dde2f8]">LTA Live</span>
            </div>

            {/* Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#89ceff] flex items-center justify-center text-[#00344d] font-bold text-xs shadow-[0_0_12px_rgba(137,206,255,0.4)]">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
