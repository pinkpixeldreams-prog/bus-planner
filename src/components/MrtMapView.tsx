import React, { useState } from 'react';
import { Train, Info, MapPin } from 'lucide-react';

export const MrtMapView: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<string | null>('Bugis (EW12/DT14)');

  const interchanges = [
    { name: 'Bugis', codes: 'EW12 / DT14', lines: ['EW', 'DT'], firstTrain: '05:54', lastTrain: '23:55' },
    { name: 'City Hall', codes: 'NS25 / EW13', lines: ['NS', 'EW'], firstTrain: '05:50', lastTrain: '23:58' },
    { name: 'Raffles Place', codes: 'NS26 / EW14', lines: ['NS', 'EW'], firstTrain: '05:52', lastTrain: '23:56' },
    { name: 'Dhoby Ghaut', codes: 'NS24 / NE6 / CC1', lines: ['NS', 'NE', 'CC'], firstTrain: '05:48', lastTrain: '00:02' },
    { name: 'Bishan', codes: 'NS17 / CC15', lines: ['NS', 'CC'], firstTrain: '05:42', lastTrain: '00:15' },
    { name: 'Jurong East', codes: 'NS1 / EW24', lines: ['NS', 'EW'], firstTrain: '05:16', lastTrain: '00:22' },
    { name: 'Marina Bay', codes: 'NS27 / TE20 / CE2', lines: ['NS', 'TE', 'CC'], firstTrain: '06:01', lastTrain: '23:50' },
    { name: 'Paya Lebar', codes: 'EW8 / CC9', lines: ['EW', 'CC'], firstTrain: '05:46', lastTrain: '00:08' },
    { name: 'Outram Park', codes: 'EW16 / NE3 / TE17', lines: ['EW', 'NE', 'TE'], firstTrain: '05:45', lastTrain: '23:59' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191f2f] border border-[#00964D]/30 text-xs font-semibold text-[#10B981] mb-3">
          <Train className="w-3.5 h-3.5" />
          <span>Singapore MRT &amp; LRT Network</span>
        </div>
        <h1 className="text-3xl font-bold text-[#F8FAFC]">MRT Interchange Schematic &amp; Train Hours</h1>
        <p className="text-sm text-[#94A3B8] mt-1 max-w-2xl">
          Complete network overview showing major interchange hubs, connection corridors, and first &amp; last train departures.
        </p>
      </div>

      {/* MRT Lines Badge Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="px-3 py-1 rounded-lg bg-[#D42E12] text-white text-xs font-bold">
          North-South Line (NS)
        </span>
        <span className="px-3 py-1 rounded-lg bg-[#00964D] text-white text-xs font-bold">
          East-West Line (EW)
        </span>
        <span className="px-3 py-1 rounded-lg bg-[#8F1A95] text-white text-xs font-bold">
          North East Line (NE)
        </span>
        <span className="px-3 py-1 rounded-lg bg-[#FA9E0D] text-black text-xs font-bold">
          Circle Line (CC)
        </span>
        <span className="px-3 py-1 rounded-lg bg-[#005EC4] text-white text-xs font-bold">
          Downtown Line (DT)
        </span>
        <span className="px-3 py-1 rounded-lg bg-[#9D5B25] text-white text-xs font-bold">
          Thomson-East Coast (TE)
        </span>
      </div>

      {/* Interactive Hub Selector & Map Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schematic Canvas representation */}
        <div className="lg:col-span-2 bg-[#0F1C3F] border border-[#38bdf8]/25 rounded-2xl p-6 relative overflow-hidden shadow-2xl min-h-[400px]">
          <div className="absolute top-4 right-4 text-xs text-[#64748B] flex items-center gap-1">
            <Info className="w-4 h-4" /> Tap an interchange hub to inspect timings
          </div>

          <svg className="w-full h-[360px]" viewBox="0 0 700 400" fill="none">
            {/* MRT Line Tracks */}
            {/* EW Green */}
            <path d="M 60 250 L 640 250" stroke="#00964D" strokeWidth="6" strokeLinecap="round" />
            {/* NS Red */}
            <path d="M 350 40 L 350 250 L 420 340" stroke="#D42E12" strokeWidth="6" strokeLinecap="round" />
            {/* DT Blue */}
            <path d="M 120 90 L 300 170 L 440 250 L 580 180" stroke="#005EC4" strokeWidth="6" strokeLinecap="round" />
            {/* Circle Orange */}
            <ellipse cx="380" cy="220" rx="200" ry="120" stroke="#FA9E0D" strokeWidth="5" strokeDasharray="10 5" fill="none" />
            {/* NE Purple */}
            <path d="M 440 80 L 320 230 L 260 330" stroke="#8F1A95" strokeWidth="5" strokeLinecap="round" />

            {/* Interchange nodes */}
            {interchanges.map((node, i) => {
              const xPositions = [440, 360, 340, 330, 350, 140, 420, 520, 290];
              const yPositions = [250, 250, 275, 190, 110, 250, 340, 250, 290];
              const x = xPositions[i];
              const y = yPositions[i];
              const isSelected = selectedStation?.includes(node.name);

              return (
                <g
                  key={node.name}
                  onClick={() => setSelectedStation(`${node.name} (${node.codes})`)}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 10 : 7}
                    fill="#F8FAFC"
                    stroke="#0B1120"
                    strokeWidth="3"
                    className="transition-all group-hover:scale-125"
                  />
                  <text
                    x={x + 12}
                    y={y + 4}
                    fill={isSelected ? '#89CEFF' : '#CAD4E0'}
                    fontSize="11"
                    fontWeight="700"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Hub Card Details */}
        <div className="bg-[#0F1C3F] border border-[#38bdf8]/25 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-[#89ceff]" />
              <h3 className="text-lg font-bold text-[#F8FAFC]">Selected Interchange</h3>
            </div>
            <div className="text-base font-semibold text-[#89ceff] mb-4">
              {selectedStation}
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0B1120] border border-white/5 space-y-1">
                <span className="text-[#64748B] block">First Train Departure:</span>
                <span className="text-sm font-mono font-bold text-[#10B981]">~ 05:48 – 05:54 AM</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B1120] border border-white/5 space-y-1">
                <span className="text-[#64748B] block">Last Train Departure:</span>
                <span className="text-sm font-mono font-bold text-[#EF4444]">~ 23:55 – 00:15 AM</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B1120] border border-white/5 space-y-1">
                <span className="text-[#64748B] block">Fare Gates:</span>
                <span className="text-[#F8FAFC]">SimplyGo Contactless &amp; EZ-Link accepted</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-[#64748B]">
            *Timings vary on eve of public holidays. Real-time arrival screens available inside station concourses.
          </div>
        </div>
      </div>
    </div>
  );
};
