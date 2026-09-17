export type CrowdingLevel = 'seats' | 'standing' | 'limited';

export interface BusArrivalInfo {
  time: string; // e.g., "Arr", "2 min", "5 min", "14 min"
  crowding: CrowdingLevel;
  type?: 'Single Deck' | 'Double Deck' | 'Bendy';
}

export interface BusServiceArrival {
  serviceNo: string;
  destination: string;
  via: string;
  deckType: 'Single Deck' | 'Double Deck' | 'Bendy';
  operator: 'SBS Transit' | 'SMRT Buses' | 'Tower Transit' | 'Go-Ahead Singapore';
  wheelchair: boolean;
  nextArrival: BusArrivalInfo;
  secondArrival: BusArrivalInfo;
  thirdArrival: BusArrivalInfo;
}

export interface BusStop {
  code: string; // 5-digit code e.g. "01113"
  name: string; // e.g. "Bugis Stn Exit A / Victoria St"
  road: string; // e.g. "Victoria St"
  description: string; // e.g. "Towards Kallang Rd • Opposite Bugis Junction"
  coords: { x: number; y: number }; // percentage on SVG transit map (0-100)
  distanceMeters?: number;
  services: BusServiceArrival[];
}

export interface BusServiceDetail {
  serviceNo: string;
  name: string;
  routeSummary: string;
  operator: string;
  deck: string;
  colorType: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'default';
  firstBus: { weekday: string; sat: string; sun: string };
  lastBus: { weekday: string; sat: string; sun: string };
  headwayPeak: string;
  headwayOffpeak: string;
  stops: { code: string; name: string; road: string }[];
}

export interface EditorialGuide {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  readTime: string;
  publishedDate?: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  sections: {
    heading: string;
    content: string;
    points?: string[];
  }[];
}

export interface ServiceAlert {
  id: string;
  type: 'mrt' | 'bus' | 'disruption' | 'diversion';
  lineName?: string;
  lineCode?: string;
  lineOrService?: string;
  colorBg?: string;
  title: string;
  summary?: string;
  description?: string;
  timeAgo?: string;
  timestamp?: string;
  status?: 'Normal' | 'Delay' | 'Disruption' | 'Diversion';
  alternative?: string;
}

export interface PlannedTrip {
  origin: string;
  destination: string;
  totalTimeMin: number;
  fareEst: string;
  co2SavedKg: number;
  segments: {
    mode: 'walk' | 'bus' | 'mrt';
    label: string;
    details: string;
    durationMin: number;
    color?: string;
  }[];
}
