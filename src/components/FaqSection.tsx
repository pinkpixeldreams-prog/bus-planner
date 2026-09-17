import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  onOpenBlogPredictions: () => void;
  onOpenBlogConcession: () => void;
  onOpenBusRoutes: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onOpenBlogPredictions,
  onOpenBlogConcession,
  onOpenBusRoutes,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I find the nearest bus stop in Singapore?',
      a: (
        <>
          Tap <strong className="text-[#F8FAFC] font-semibold">Locate Nearest Stop</strong> at the top of this page and allow location access. SmartCommute lists the five closest bus stops with their walking distance and live arrival times. If you would rather not share your location, search by stop name, road name or five-digit stop code instead — everything works the same way.
        </>
      ),
    },
    {
      q: 'How do I check bus arrival time in Singapore?',
      a: (
        <>
          Search for any bus stop above, or open its page directly. You will see every service calling at that stop with the next three arrivals for each. Times come from LTA DataMall and are estimates based on where the buses actually are, so they update continuously.
        </>
      ),
    },
    {
      q: 'Can I find all the stops for a specific bus number?',
      a: (
        <>
          Yes. Use the{' '}
          <button
            onClick={onOpenBusRoutes}
            className="text-[#89ceff] hover:underline font-medium cursor-pointer"
          >
            bus route finder
          </button>{' '}
          and enter any service number to see every stop along the route in both directions, with stop names, road names, codes and the first and last bus timings for weekdays, Saturdays and Sundays.
        </>
      ),
    },
    {
      q: 'Why does the arrival time sometimes go up instead of down?',
      a: (
        <>
          Because it is a live prediction, not a timetable. If the bus catches a red light, spends longer at a stop, or hits traffic, the estimate is recalculated upward. We explain this in detail in{' '}
          <button
            onClick={onOpenBlogPredictions}
            className="text-[#89ceff] hover:underline font-medium cursor-pointer"
          >
            how bus arrival predictions work
          </button>
          .
        </>
      ),
    },
    {
      q: 'Do I pay more if my journey needs two buses?',
      a: (
        <>
          No. Singapore charges by total distance travelled, not per boarding, and transfers within about 45 minutes are free. A trip using a bus, a train and another bus costs the same as one direct bus over the same distance. See our{' '}
          <button
            onClick={onOpenBlogConcession}
            className="text-[#89ceff] hover:underline font-medium cursor-pointer"
          >
            guide to how fares work
          </button>
          .
        </>
      ),
    },
    {
      q: 'Is SmartCommute free, and do I need to install anything?',
      a: (
        <>
          It is free and it runs in your browser — no app store download and no account. You can add it to your phone's home screen from your browser's share menu if you want it to open like an app.
        </>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#0B1120] py-14 border-t border-[#38bdf8]/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC] mb-2">
            Frequently asked questions
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Common questions about Singapore bus telemetry, transfers, and real-time accuracy.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0F1C3F] border border-[#38bdf8]/20 rounded-xl overflow-hidden transition-colors shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer text-sm sm:text-base font-semibold text-[#F8FAFC] hover:text-[#89ceff] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#89ceff] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-white/5">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer & Data Attribution Note */}
        <div className="mt-10 p-5 rounded-xl bg-[#191f2f]/60 border border-white/5 text-[#64748B] text-xs leading-relaxed text-center">
          SmartCommute is an independent service and is not affiliated with the Land Transport Authority or with any bus operator. Bus stop, route and arrival information contains information from LTA DataMall, used under the Singapore Open Data Licence. Arrival times are estimates — allow buffer time for journeys where arriving late matters.{' '}
          <span className="text-[#89ceff] hover:underline cursor-pointer font-medium">
            More about SmartCommute
          </span>
          .
        </div>
      </div>
    </section>
  );
};
