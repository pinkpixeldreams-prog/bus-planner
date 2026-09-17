import React from 'react';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { EDITORIAL_GUIDES } from '../data/transitData';
import { EditorialGuide } from '../types';

interface GuidesSectionProps {
  onOpenGuide: (guide: EditorialGuide) => void;
  onBrowseAll: () => void;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ onOpenGuide, onBrowseAll }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <div className="text-xs font-bold text-[#2fd9f4] uppercase tracking-wider mb-1">
            Transit Intelligence &amp; Hacks
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC]">
            Guides for Singapore commuters
          </h2>
          <p className="text-sm text-[#94A3B8] mt-1">
            Live arrivals answer "when." These answer everything else.
          </p>
        </div>

        <button
          onClick={onBrowseAll}
          className="text-sm font-semibold text-[#89ceff] hover:underline flex items-center gap-1 flex-shrink-0 cursor-pointer"
        >
          <span>Browse all guides</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Rich Editorial Cards Grid with Verified Hotlinked Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {EDITORIAL_GUIDES.map((guide) => (
          <div
            key={guide.id}
            onClick={() => onOpenGuide(guide)}
            className="bg-[#0F1C3F] border border-[#38bdf8]/20 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-1.5 hover:border-[#38bdf8]/40 transition-all flex flex-col group cursor-pointer"
          >
            {/* Image Preview Container */}
            <div className="relative h-44 w-full overflow-hidden bg-[#0B1120]">
              <img
                src={guide.imageUrl}
                alt={guide.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B1120]/90 backdrop-blur-md text-[11px] font-bold text-[#89ceff] border border-white/10">
                {guide.category}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold leading-snug text-[#F8FAFC] mb-2 group-hover:text-[#89ceff] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#64748B]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{guide.readTime}</span>
                </span>
                <span className="text-[#89ceff] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Read Guide →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
