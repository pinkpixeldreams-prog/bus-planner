import React from 'react';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { EDITORIAL_GUIDES } from '../data/transitData';
import { EditorialGuide } from '../types';

interface BlogViewProps {
  onOpenGuide: (guide: EditorialGuide) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onOpenGuide }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191f2f] border border-[#38bdf8]/30 text-xs font-semibold text-[#89ceff] mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Commuter Knowledge Hub</span>
        </div>
        <h1 className="text-3xl font-bold text-[#F8FAFC]">Guides &amp; Transit Intelligence</h1>
        <p className="text-sm text-[#94A3B8] mt-1 max-w-2xl">
          Detailed explanations of Singapore fare rules, telemetry predictive models, route suffixes, and airport transfer comparisons.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDITORIAL_GUIDES.map((guide) => (
          <div
            key={guide.id}
            onClick={() => onOpenGuide(guide)}
            className="bg-[#0F1C3F] border border-[#38bdf8]/20 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-1 hover:border-[#38bdf8]/40 transition-all flex flex-col group cursor-pointer"
          >
            <div className="relative h-52 w-full overflow-hidden bg-[#0B1120]">
              <img
                src={guide.imageUrl}
                alt={guide.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B1120]/90 backdrop-blur-md text-xs font-bold text-[#89ceff] border border-white/10">
                {guide.category}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 group-hover:text-[#89ceff] transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#64748B]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {guide.publishedDate}
                  </span>
                </div>
                <span className="text-[#89ceff] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
