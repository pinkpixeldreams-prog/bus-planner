import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TransitMap } from './components/TransitMap';
import { ArrivalsSection } from './components/ArrivalsSection';
import { FeatureBento } from './components/FeatureBento';
import { InstallCallout } from './components/InstallCallout';
import { PopularBuses } from './components/PopularBuses';
import { GuidesSection } from './components/GuidesSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// Modals
import { BusRouteModal } from './components/BusRouteModal';
import { GuideReaderModal } from './components/GuideReaderModal';
import { SearchPaletteModal } from './components/SearchPaletteModal';
import { ServiceAlertsModal } from './components/ServiceAlertsModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { InstallModal } from './components/InstallModal';

// Data
import { BUS_STOPS_DATA, POPULAR_BUS_SERVICES, EDITORIAL_GUIDES } from './data/transitData';
import { BusStop, BusServiceDetail, EditorialGuide, PlannedTrip } from './types';
import { calculateJourney, resolveLocationHub } from './utils/journeyPlanner';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStopCode, setSelectedStopCode] = useState<string>('01113');
  const [isLocating, setIsLocating] = useState(false);
  const [locateSuccessMessage, setLocateSuccessMessage] = useState<string | null>(null);
  const [plannedTrip, setPlannedTrip] = useState<PlannedTrip | null>(null);

  // Bookmarks
  const [savedStopCodes, setSavedStopCodes] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('smartcommute_saved_stops');
      return stored ? JSON.parse(stored) : ['01113', '03539'];
    } catch {
      return ['01113', '03539'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('smartcommute_saved_stops', JSON.stringify(savedStopCodes));
    } catch {
      // ignore
    }
  }, [savedStopCodes]);

  // Modals state
  const [selectedBusService, setSelectedBusService] = useState<BusServiceDetail | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<EditorialGuide | null>(null);
  const [isSearchPaletteOpen, setIsSearchPaletteOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentStop: BusStop =
    BUS_STOPS_DATA.find((s) => s.code === selectedStopCode) || BUS_STOPS_DATA[0];

  const handleSelectStop = (code: string) => {
    setSelectedStopCode(code);
  };

  const handlePerformSearch = (explicitQuery?: string) => {
    const query = (explicitQuery !== undefined ? explicitQuery : searchQuery).trim().toLowerCase();
    if (!query) {
      setIsSearchPaletteOpen(true);
      return;
    }

    // 1. Check direct stop code match
    const matchedByCode = BUS_STOPS_DATA.find((s) => s.code.toLowerCase() === query);
    if (matchedByCode) {
      setSelectedStopCode(matchedByCode.code);
      setLocateSuccessMessage(`Found stop: ${matchedByCode.name} (#${matchedByCode.code})`);
      setTimeout(() => setLocateSuccessMessage(null), 4000);
      return;
    }

    // 2. Check bus service match
    const matchedBus = POPULAR_BUS_SERVICES.find((b) => b.serviceNo.toLowerCase() === query);
    if (matchedBus) {
      setSelectedBusService(matchedBus);
      return;
    }

    // 3. Check partial name, road, or description
    const matchedByName = BUS_STOPS_DATA.find(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.road.toLowerCase().includes(query) ||
        (s.description && s.description.toLowerCase().includes(query))
    );
    if (matchedByName) {
      setSelectedStopCode(matchedByName.code);
      setLocateSuccessMessage(`Found stop: ${matchedByName.name} (#${matchedByName.code})`);
      setTimeout(() => setLocateSuccessMessage(null), 4000);
      return;
    }

    // 4. Transit hub & regional resolver (handles "pasir ris", "tampines", "woodlands", "airport", etc.)
    const resolved = resolveLocationHub(query, BUS_STOPS_DATA);
    if (resolved && resolved.stop) {
      setSelectedStopCode(resolved.stop.code);
      setLocateSuccessMessage(`Found stop: ${resolved.stop.name} (#${resolved.stop.code})`);
      setTimeout(() => setLocateSuccessMessage(null), 4000);
      return;
    }

    // Otherwise open search modal
    setIsSearchPaletteOpen(true);
  };

  const handleLocateNearest = () => {
    setIsLocating(true);
    setLocateSuccessMessage(null);

    const query = searchQuery.trim().toLowerCase();

    // If the user has typed an address, town, or stop name in the search input
    if (query) {
      setTimeout(() => {
        setIsLocating(false);

        // 1. Direct code
        const byCode = BUS_STOPS_DATA.find((s) => s.code.toLowerCase() === query);
        if (byCode) {
          setSelectedStopCode(byCode.code);
          setLocateSuccessMessage(`Closest stop located: ${byCode.name} (#${byCode.code})`);
          setTimeout(() => setLocateSuccessMessage(null), 4500);
          return;
        }

        // 2. Direct name, road, or description
        const byName = BUS_STOPS_DATA.find(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.road.toLowerCase().includes(query) ||
            (s.description && s.description.toLowerCase().includes(query))
        );
        if (byName) {
          setSelectedStopCode(byName.code);
          setLocateSuccessMessage(`Closest stop located: ${byName.name} (#${byName.code})`);
          setTimeout(() => setLocateSuccessMessage(null), 4500);
          return;
        }

        // 3. Regional hub resolver (handles "pasir ris", "tampines", "woodlands", "orchard", etc.)
        const resolved = resolveLocationHub(query, BUS_STOPS_DATA);
        if (resolved && resolved.stop) {
          setSelectedStopCode(resolved.stop.code);
          setLocateSuccessMessage(`Closest stop located: ${resolved.stop.name} (#${resolved.stop.code})`);
          setTimeout(() => setLocateSuccessMessage(null), 4500);
          return;
        }

        setIsSearchPaletteOpen(true);
      }, 350);
      return;
    }

    // If search box is empty, use device geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLocating(false);
          setSelectedStopCode('01113');
          setLocateSuccessMessage('Closest stop located: Bugis Stn Exit A (40m)');
          setTimeout(() => setLocateSuccessMessage(null), 4000);
        },
        () => {
          setIsLocating(false);
          setSelectedStopCode('01113');
          setLocateSuccessMessage('GPS located: Bugis Stn Exit A (#01113)');
          setTimeout(() => setLocateSuccessMessage(null), 4000);
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        setIsLocating(false);
        setSelectedStopCode('01113');
        setLocateSuccessMessage('Nearest stop located: Bugis Stn Exit A (40m)');
        setTimeout(() => setLocateSuccessMessage(null), 4000);
      }, 600);
    }
  };

  const handlePlanJourney = (origin: string, destination: string) => {
    const planned = calculateJourney(origin, destination, BUS_STOPS_DATA);
    setPlannedTrip(planned);
    if (planned.departureStopCode) {
      setSelectedStopCode(planned.departureStopCode);
      setLocateSuccessMessage(`Boarding stop: ${planned.departureStopName || planned.departureStopCode}`);
      setTimeout(() => setLocateSuccessMessage(null), 4500);
    }
  };

  const handleSelectTripAlternative = (index: number) => {
    if (!plannedTrip || !plannedTrip.alternatives || !plannedTrip.alternatives[index]) return;
    const alt = plannedTrip.alternatives[index];
    setPlannedTrip({
      ...plannedTrip,
      selectedAlternativeIndex: index,
      totalTimeMin: alt.totalTimeMin,
      fareEst: alt.fareEst,
      departureStopCode: alt.departureStopCode,
      departureStopName: alt.departureStopName,
      routeName: alt.title,
      segments: alt.segments,
    });
    if (alt.departureStopCode) {
      setSelectedStopCode(alt.departureStopCode);
    }
  };

  const handleToggleBookmark = (stopCode: string) => {
    setSavedStopCodes((prev) =>
      prev.includes(stopCode) ? prev.filter((c) => c !== stopCode) : [...prev, stopCode]
    );
  };

  const handleSelectBusService = (serviceNo: string) => {
    const bus = POPULAR_BUS_SERVICES.find((b) => b.serviceNo === serviceNo);
    if (bus) {
      setSelectedBusService(bus);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080D1A] text-[#F8FAFC] antialiased selection:bg-[#0ea5e9]/30 selection:text-[#89ceff]">
      {/* Top Header */}
      <Header
        onSelectTab={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenSearch={() => setIsSearchPaletteOpen(true)}
        onOpenAlerts={() => setIsAlertsModalOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        savedStopsCount={savedStopCodes.length}
      />

      {/* Main Content Area - Single Landing Page */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onPerformSearch={handlePerformSearch}
          onLocateNearest={handleLocateNearest}
          isLocating={isLocating}
          locateSuccessMessage={locateSuccessMessage}
          onPlanJourney={handlePlanJourney}
          plannedTrip={plannedTrip}
          onClearTrip={() => setPlannedTrip(null)}
          onSelectAlternative={handleSelectTripAlternative}
        />

        {/* Interactive Vector Transit Map */}
        <TransitMap
          stops={BUS_STOPS_DATA}
          selectedStopCode={selectedStopCode}
          onSelectStop={handleSelectStop}
        />

        {/* Live Arrivals Section */}
        <div id="arrivals-anchor">
          <ArrivalsSection
            currentStop={currentStop}
            isBookmarked={savedStopCodes.includes(selectedStopCode)}
            onToggleBookmark={handleToggleBookmark}
            onSelectBusService={handleSelectBusService}
          />
        </div>

        {/* Feature Bento Grid */}
        <FeatureBento
          onTriggerNearest={handleLocateNearest}
          onOpenBusRoutes={() => setIsSearchPaletteOpen(true)}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
          onOpenAlerts={() => setIsAlertsModalOpen(true)}
        />

        {/* PWA Home Screen Install Banner */}
        <InstallCallout onOpenInstallGuide={() => setIsInstallGuideOpen(true)} />

        {/* Popular Bus Badges */}
        <div id="popular-buses-anchor">
          <PopularBuses onSelectBus={handleSelectBusService} />
        </div>

        {/* Editorial Commuter Guides with verified images */}
        <div id="guides-anchor">
          <GuidesSection
            onOpenGuide={(guide) => setSelectedGuide(guide)}
            onBrowseAll={() => setSelectedGuide(EDITORIAL_GUIDES[0])}
          />
        </div>

        {/* Frequently Asked Questions */}
        <div id="faq-anchor">
          <FaqSection
            onOpenBlogPredictions={() => setSelectedGuide(EDITORIAL_GUIDES[1])}
            onOpenBlogConcession={() => setSelectedGuide(EDITORIAL_GUIDES[0])}
            onOpenBusRoutes={() => setIsSearchPaletteOpen(true)}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(action: string) => {
          if (action === 'bus-routes' || action === 'search') {
            setIsSearchPaletteOpen(true);
          } else if (action === 'updates' || action === 'alerts') {
            setIsAlertsModalOpen(true);
          } else if (action === 'bookmarks') {
            setIsBookmarksOpen(true);
          } else if (action === 'blog' || action === 'guides') {
            const el = document.getElementById('guides-anchor');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Modals & Overlays */}
      <BusRouteModal
        bus={selectedBusService}
        onClose={() => setSelectedBusService(null)}
        onSelectStopCode={handleSelectStop}
      />

      <GuideReaderModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
      />

      <SearchPaletteModal
        isOpen={isSearchPaletteOpen}
        onClose={() => setIsSearchPaletteOpen(false)}
        stops={BUS_STOPS_DATA}
        popularBuses={POPULAR_BUS_SERVICES}
        onSelectStop={handleSelectStop}
        onSelectBus={handleSelectBusService}
      />

      <ServiceAlertsModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedStopCodes={savedStopCodes}
        stops={BUS_STOPS_DATA}
        onSelectStop={handleSelectStop}
        onRemoveBookmark={handleToggleBookmark}
      />

      <InstallModal
        isOpen={isInstallGuideOpen}
        onClose={() => setIsInstallGuideOpen(false)}
      />
    </div>
  );
}
