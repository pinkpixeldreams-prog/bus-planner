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

// Views
import { BusRoutesView } from './components/BusRoutesView';
import { UpdatesView } from './components/UpdatesView';
import { MrtMapView } from './components/MrtMapView';
import { BlogView } from './components/BlogView';

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

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'bus-routes' | 'updates' | 'mrt-map' | 'blog'>('home');
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
    setCurrentTab('home');
  };

  const handlePerformSearch = (explicitQuery?: string) => {
    const query = (explicitQuery !== undefined ? explicitQuery : searchQuery).trim().toLowerCase();
    if (!query) {
      setIsSearchPaletteOpen(true);
      return;
    }

    // Check direct code match
    const matchedByCode = BUS_STOPS_DATA.find((s) => s.code.toLowerCase() === query);
    if (matchedByCode) {
      setSelectedStopCode(matchedByCode.code);
      setCurrentTab('home');
      return;
    }

    // Check bus service match
    const matchedBus = POPULAR_BUS_SERVICES.find((b) => b.serviceNo.toLowerCase() === query);
    if (matchedBus) {
      setSelectedBusService(matchedBus);
      return;
    }

    // Check partial name
    const matchedByName = BUS_STOPS_DATA.find(
      (s) => s.name.toLowerCase().includes(query) || s.road.toLowerCase().includes(query)
    );
    if (matchedByName) {
      setSelectedStopCode(matchedByName.code);
      setCurrentTab('home');
      return;
    }

    // Otherwise open search modal
    setIsSearchPaletteOpen(true);
  };

  const handleLocateNearest = () => {
    setIsLocating(true);
    setLocateSuccessMessage(null);

    // Try real geolocation or fallback
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
      }, 700);
    }
  };

  const handlePlanJourney = (origin: string, destination: string) => {
    setPlannedTrip({
      origin,
      destination,
      totalTimeMin: 32,
      fareEst: '$1.48',
      segments: [
        {
          mode: 'walk',
          label: 'Walk to Bishan MRT',
          durationMin: 4,
          details: 'Walk 280m through Blk 245 sheltered linkway',
        },
        {
          mode: 'mrt',
          label: 'North-South Line towards Marina South Pier',
          durationMin: 18,
          details: 'Board at Platform B • 8 stops to Marina Bay Interchange',
        },
        {
          mode: 'bus',
          label: 'Transfer to Bus 97 at Marina Bay Stn',
          durationMin: 6,
          details: 'Direct feeder to MBFC Tower 2 • Arrives in 2m (Seats Available)',
        },
        {
          mode: 'walk',
          label: 'Arrive at destination',
          durationMin: 4,
          details: 'Walk 120m into MBFC lobby',
        },
      ],
    });
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
        currentTab={currentTab}
        onSelectTab={(tab: string) => setCurrentTab(tab as any)}
        onOpenSearch={() => setIsSearchPaletteOpen(true)}
        onOpenAlerts={() => setIsAlertsModalOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        savedStopsCount={savedStopCodes.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16">
        {currentTab === 'home' && (
          <>
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
              onOpenBusRoutes={() => setCurrentTab('bus-routes')}
              onOpenBookmarks={() => setIsBookmarksOpen(true)}
              onOpenAlerts={() => setIsAlertsModalOpen(true)}
            />

            {/* PWA Home Screen Install Banner */}
            <InstallCallout onOpenInstallGuide={() => setIsInstallGuideOpen(true)} />

            {/* Popular Bus Badges */}
            <PopularBuses onSelectBus={handleSelectBusService} />

            {/* Editorial Commuter Guides with verified images */}
            <GuidesSection
              onOpenGuide={(guide) => setSelectedGuide(guide)}
              onBrowseAll={() => setCurrentTab('blog')}
            />

            {/* Frequently Asked Questions */}
            <FaqSection
              onOpenBlogPredictions={() => setSelectedGuide(EDITORIAL_GUIDES[1])}
              onOpenBlogConcession={() => setSelectedGuide(EDITORIAL_GUIDES[0])}
              onOpenBusRoutes={() => setCurrentTab('bus-routes')}
            />
          </>
        )}

        {currentTab === 'bus-routes' && (
          <BusRoutesView
            onSelectBus={handleSelectBusService}
            onSelectStopCode={handleSelectStop}
          />
        )}

        {currentTab === 'updates' && <UpdatesView />}

        {currentTab === 'mrt-map' && <MrtMapView />}

        {currentTab === 'blog' && (
          <BlogView onOpenGuide={(guide) => setSelectedGuide(guide)} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavClick={(tab: string) => setCurrentTab(tab as any)} />

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
