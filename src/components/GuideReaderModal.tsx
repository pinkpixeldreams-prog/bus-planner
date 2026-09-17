import React from 'react';
import { X, Clock, Calendar, Share2, ArrowLeft } from 'lucide-react';
import { EditorialGuide } from '../types';

interface GuideReaderModalProps {
  guide: EditorialGuide | null;
  onClose: () => void;
}

export const GuideReaderModal: React.FC<GuideReaderModalProps> = ({ guide, onClose }) => {
  if (!guide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0F1C3F] border border-[#38bdf8]/30 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#0B1120]">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#89ceff] hover:text-[#dde2f8] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to SmartCommute</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              title="Copy Link"
              className="p-2 rounded-xl bg-[#191f2f] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#191f2f] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Scroll Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Tag & Meta */}
          <div className="space-y-3">
            <span className="px-3 py-1 rounded bg-[#0ea5e9]/20 text-[#89ceff] text-xs font-bold uppercase tracking-wider">
              {guide.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] leading-tight">
              {guide.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-[#64748B]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {guide.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {guide.publishedDate}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-[#38bdf8]/20 max-h-80 w-full bg-[#0B1120]">
            <img
              src={guide.imageUrl}
              alt={guide.imageAlt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Excerpt */}
          <div className="p-4 rounded-xl bg-[#191f2f]/80 border-l-4 border-[#0ea5e9] text-sm text-[#dde2f8] italic leading-relaxed">
            "{guide.excerpt}"
          </div>

          {/* Full Article Sections */}
          <div className="space-y-6 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {guide.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
                  {section.heading}
                </h3>
                <p>{section.content}</p>
                {section.points && section.points.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-[#CAD4E0]">
                    {section.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Advice callout */}
          <div className="mt-8 p-5 rounded-xl bg-[#0B1120] border border-[#38bdf8]/20 text-xs text-[#94A3B8] space-y-2">
            <strong className="text-[#F8FAFC] block text-sm">💡 SmartCommute Pro-Tip</strong>
            <p>
              Always keep an SimplyGo-enabled contactless card or mobile wallet handy. Remember that within 45 minutes, your bus-to-MRT or bus-to-bus transfers are consolidated into a single continuous journey fare!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B1120] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-[#64748B]">SmartCommute SG Editorial Intelligence</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0ea5e9] text-[#003751] hover:brightness-110 transition-all cursor-pointer"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
