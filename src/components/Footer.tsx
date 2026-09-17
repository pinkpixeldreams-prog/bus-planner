import React from 'react';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="w-full bg-[#080e1d] border-t border-[#38bdf8]/15 text-[#bec8d2] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/5">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl select-none">🚌</span>
              <span className="text-lg font-bold text-[#F8FAFC]">SmartCommute SG</span>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Precision urban transit telemetry for Singapore commuters. Real-time bus arrivals, crowding insights, and multimodal trip intelligence.
            </p>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider mb-3">
              Plan Your Trip
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-[#89ceff] transition-colors cursor-pointer"
                >
                  Live Commute Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('bus-routes')}
                  className="hover:text-[#89ceff] transition-colors cursor-pointer"
                >
                  Bus Service Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('mrt-map')}
                  className="hover:text-[#89ceff] transition-colors cursor-pointer"
                >
                  MRT &amp; LRT Interchange Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('bus-routes')}
                  className="hover:text-[#89ceff] transition-colors cursor-pointer"
                >
                  First &amp; Last Train Timings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider mb-3">
              Guides &amp; Insights
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('blog')}
                  className="hover:text-[#89ceff] transition-colors cursor-pointer"
                >
                  Transit Tips &amp; Hacks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('updates')}
                  className="hover:text-[#89ceff] transition-colors cursor-pointer"
                >
                  Service Disruptions &amp; News
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('blog')}
                  className="hover:text-[#89ceff] transition-colors cursor-pointer"
                >
                  Fare &amp; Concession Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('updates')}
                  className="hover:text-[#89ceff] transition-colors cursor-pointer"
                >
                  Crowd Patterns Analysis
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider mb-3">
              About
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <span className="hover:text-[#89ceff] transition-colors cursor-pointer">
                  About the Project
                </span>
              </li>
              <li>
                <span className="hover:text-[#89ceff] transition-colors cursor-pointer">
                  Telemetry API Status (Operational)
                </span>
              </li>
              <li>
                <span className="hover:text-[#89ceff] transition-colors cursor-pointer">
                  Privacy &amp; Telemetry Usage
                </span>
              </li>
              <li>
                <span className="hover:text-[#89ceff] transition-colors cursor-pointer">
                  Feedback &amp; Bug Reports
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <p>© 2025 SmartCommute SG (smartcommutesg.com). Real-time transit data provided by Land Transport Authority (LTA) DataMall.</p>
          <p className="text-[11px] text-[#64748B]/80">
            SmartCommute SG is an independent commuter utility and is not affiliated with or endorsed by LTA, SMRT, or SBS Transit.
          </p>
        </div>
      </div>
    </footer>
  );
};
