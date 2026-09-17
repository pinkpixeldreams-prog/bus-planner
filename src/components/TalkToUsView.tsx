import React, { useEffect, useState } from 'react';
import { MessageSquare, RefreshCw, Sparkles, Send, ShieldCheck, HelpCircle } from 'lucide-react';

interface TalkToUsViewProps {
  onBackToHome?: () => void;
}

export const TalkToUsView: React.FC<TalkToUsViewProps> = ({ onBackToHome }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // Determine real, canonical URL and identifier for Disqus
    const pageUrl =
      typeof window !== 'undefined' && window.location && window.location.origin
        ? `${window.location.origin}/talk-to-us`
        : 'https://smartcommute.sg/talk-to-us';
    const pageIdentifier = 'smartcommute-talk-to-us';
    const pageTitle = 'Talk to Us | SmartCommute SG';

    setIsLoading(true);

    const configureDisqus = () => {
      // If DISQUS is already initialized in window (SPA navigation)
      if (typeof (window as any).DISQUS !== 'undefined') {
        try {
          (window as any).DISQUS.reset({
            reload: true,
            config: function (this: any) {
              this.page.identifier = pageIdentifier;
              this.page.url = pageUrl;
              this.page.title = pageTitle;
            },
          });
          setIsLoading(false);
        } catch (err) {
          console.warn('Disqus reset error:', err);
          setIsLoading(false);
        }
      } else {
        // First time loading: set global disqus_config
        (window as any).disqus_config = function (this: any) {
          this.page.identifier = pageIdentifier;
          this.page.url = pageUrl;
          this.page.title = pageTitle;
        };

        const existingScript = document.getElementById('disqus-embed-script');
        if (!existingScript) {
          const d = document;
          const s = d.createElement('script');
          s.id = 'disqus-embed-script';
          s.src = 'https://bus-4.disqus.com/embed.js';
          s.setAttribute('data-timestamp', String(+new Date()));
          s.async = true;
          s.onload = () => setIsLoading(false);
          s.onerror = () => setIsLoading(false);
          (d.head || d.body).appendChild(s);
        } else {
          // Script tag exists; wait for DISQUS global to be ready
          const pollInterval = setInterval(() => {
            if (typeof (window as any).DISQUS !== 'undefined') {
              clearInterval(pollInterval);
              try {
                (window as any).DISQUS.reset({
                  reload: true,
                  config: function (this: any) {
                    this.page.identifier = pageIdentifier;
                    this.page.url = pageUrl;
                    this.page.title = pageTitle;
                  },
                });
              } catch (e) {
                // ignore
              }
              setIsLoading(false);
            }
          }, 200);

          const timeout = setTimeout(() => {
            clearInterval(pollInterval);
            setIsLoading(false);
          }, 3000);

          return () => {
            clearInterval(pollInterval);
            clearTimeout(timeout);
          };
        }
      }
    };

    // Small delay to ensure the container <div id="disqus_thread"> is mounted into DOM
    const timer = setTimeout(configureDisqus, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [reloadKey]);

  const handleManualReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="mb-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 text-[#38bdf8] text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            Commuter Community &amp; Feedback
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Talk to Us
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#94A3B8] max-w-2xl">
            Have questions about bus routes, feedback on arrival accuracy, or feature ideas for
            SmartCommute SG? Join the discussion below or leave a note for our team.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center justify-center sm:justify-end gap-3 shrink-0">
          <button
            onClick={handleManualReload}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B132B] border border-white/10 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#16203B] hover:border-white/20 transition-all cursor-pointer"
            title="Reload comments thread"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Discussion</span>
          </button>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0ea5e9] text-[#003751] text-xs font-bold shadow-[0_0_15px_rgba(14,165,233,0.35)] hover:bg-[#38bdf8] transition-all cursor-pointer"
            >
              <span>Back to Transit Home</span>
            </button>
          )}
        </div>
      </div>

      {/* Suggested Topic Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="p-4 rounded-xl bg-[#0d162d]/60 border border-white/5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#0ea5e9]/10 text-[#38bdf8] shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#F8FAFC]">Feature Requests</h3>
            <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-relaxed">
              Suggest MRT interchanges, new bus lines, or customizable alerts.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0d162d]/60 border border-white/5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#10B981]/10 text-[#10B981] shrink-0 mt-0.5">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#F8FAFC]">Route &amp; Stop Feedback</h3>
            <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-relaxed">
              Found a renamed stop or timing discrepancy? Let the community know.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0d162d]/60 border border-white/5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#F8FAFC]">Community Guidelines</h3>
            <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-relaxed">
              Be respectful to fellow commuters. Spam and offensive speech are moderated.
            </p>
          </div>
        </div>
      </div>

      {/* Disqus Embed Container */}
      <div className="relative bg-[#0b1224] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl min-h-[420px]">
        {isLoading && (
          <div className="absolute inset-0 bg-[#0b1224]/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 z-10 rounded-2xl pointer-events-none">
            <div className="w-6 h-6 border-2 border-[#0ea5e9] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#94A3B8]">Connecting to Disqus community thread...</p>
          </div>
        )}

        {/* Required Disqus Anchor Div */}
        <div id="disqus_thread" className="w-full" />

        {/* Noscript fallback specified by Disqus */}
        <noscript>
          <div className="p-4 rounded-xl bg-[#191f2f] text-sm text-[#bec8d2] border border-white/10">
            Please enable JavaScript to view the{' '}
            <a
              href="https://disqus.com/?ref_noscript"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] underline"
            >
              comments powered by Disqus.
            </a>
          </div>
        </noscript>
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-[#64748B] gap-4 px-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Comments are hosted and powered by Disqus. Log in via Google, Facebook, Twitter, or Disqus.</span>
        </div>
        <div>
          <span>Target Page: <code className="text-[#94A3B8] bg-[#0B132B] px-1.5 py-0.5 rounded text-[11px]">smartcommute-talk-to-us</code></span>
        </div>
      </div>
    </div>
  );
};
