import { BusStop, PlannedTrip, TripAlternative, TripSegment } from '../types';

interface HubLocation {
  id: string;
  name: string;
  aliases: string[];
  stopCode: string;
  mrtLine?: string;
  mrtStation?: string;
  zone: 'central' | 'north' | 'south' | 'east' | 'west' | 'airport' | 'cbd';
}

const HUBS: HubLocation[] = [
  {
    id: 'bishan',
    name: 'Bishan Stn / St 22',
    aliases: ['bishan', 'blk 245', 'junction 8', 'bishan st 22', 'bishan st 13', '53231'],
    stopCode: '53231',
    mrtLine: 'North-South Line / Circle Line',
    mrtStation: 'Bishan MRT (NS17/CC15)',
    zone: 'north',
  },
  {
    id: 'marinabay',
    name: 'Marina Bay / MBFC',
    aliases: ['marina bay', 'mbfc', 'tower 1', 'tower 2', 'central blvd', 'bayfront', 'mbs', 'financial centre', '03539', '03511'],
    stopCode: '03539',
    mrtLine: 'North-South Line / Thomson-East Coast Line',
    mrtStation: 'Marina Bay MRT (NS27/TE20)',
    zone: 'cbd',
  },
  {
    id: 'bugis',
    name: 'Bugis Stn / Victoria St',
    aliases: ['bugis', 'victoria st', 'bugis junction', 'rochor', 'kallang rd', '01113', 'current gps'],
    stopCode: '01113',
    mrtLine: 'East-West Line / Downtown Line',
    mrtStation: 'Bugis MRT (EW12/DT14)',
    zone: 'central',
  },
  {
    id: 'orchard',
    name: 'Orchard Rd / Lucky Plaza',
    aliases: ['orchard', 'lucky plaza', 'ion', 'ion orchard', 'somerset', 'scotts', '09022'],
    stopCode: '09022',
    mrtLine: 'North-South Line / Thomson-East Coast Line',
    mrtStation: 'Orchard MRT (NS22/TE14)',
    zone: 'central',
  },
  {
    id: 'dhobyghaut',
    name: 'Dhoby Ghaut Stn Exit B',
    aliases: ['dhoby ghaut', 'plaza singapura', 'penang rd', '08031'],
    stopCode: '08031',
    mrtLine: 'North-South Line / North East Line / Circle Line',
    mrtStation: 'Dhoby Ghaut MRT (NS24/NE6/CC1)',
    zone: 'central',
  },
  {
    id: 'brasbasah',
    name: 'Bras Basah / NTUC Income',
    aliases: ['bras basah', 'bencoolen', 'ntuc income', 'art museum', 'smu', 'city hall', '01019'],
    stopCode: '01019',
    mrtLine: 'Circle Line / Downtown Line',
    mrtStation: 'Bras Basah MRT (CC2)',
    zone: 'central',
  },
  {
    id: 'airport',
    name: 'Changi Airport PTB 1-4',
    aliases: ['changi', 'airport', 'changi airport', 'ptb', 'terminal 1', 'terminal 2', 'terminal 3', 'terminal 4', 'jewel', '95029'],
    stopCode: '95029',
    mrtLine: 'East-West Line (Airport Branch)',
    mrtStation: 'Changi Airport MRT (CG2)',
    zone: 'airport',
  },
  {
    id: 'bedok',
    name: 'Bedok Bus Interchange',
    aliases: ['bedok', 'bedok mall', 'bedok north', 'kembangan', '84009'],
    stopCode: '84009',
    mrtLine: 'East-West Line',
    mrtStation: 'Bedok MRT (EW5)',
    zone: 'east',
  },
  {
    id: 'clementi',
    name: 'Clementi Temp Interchange',
    aliases: ['clementi', 'clementi mall', 'clementi ave 3', 'west coast', 'dover', '17009'],
    stopCode: '17009',
    mrtLine: 'East-West Line',
    mrtStation: 'Clementi MRT (EW23)',
    zone: 'west',
  },
  {
    id: 'jurongeast',
    name: 'Jurong East Interchange',
    aliases: ['jurong', 'jurong east', 'jem', 'westgate', 'jurong gateway', 'imm', 'pioneer', '28009'],
    stopCode: '28009',
    mrtLine: 'North-South Line / East-West Line',
    mrtStation: 'Jurong East MRT (NS1/EW24)',
    zone: 'west',
  },
  {
    id: 'tampines',
    name: 'Tampines Bus Interchange',
    aliases: ['tampines', 'tampines hub', 'tampines mall', 'tampines ave 5', '75009'],
    stopCode: '75009',
    mrtLine: 'East-West Line / Downtown Line',
    mrtStation: 'Tampines MRT (EW2/DT32)',
    zone: 'east',
  },
  {
    id: 'geylang',
    name: 'Geylang Lor 1 / Kallang',
    aliases: ['geylang', 'lor 1', 'sims ave', 'kallang', 'aljunied', '80019'],
    stopCode: '80019',
    mrtLine: 'East-West Line',
    mrtStation: 'Kallang MRT (EW10)',
    zone: 'east',
  },
  {
    id: 'chinatown',
    name: 'Chinatown / Eu Tong Sen',
    aliases: ['chinatown', 'people\'s park', 'eu tong sen', 'clarke quay', 'outram', '05013'],
    stopCode: '05013',
    mrtLine: 'North East Line / Downtown Line',
    mrtStation: 'Chinatown MRT (NE4/DT19)',
    zone: 'cbd',
  },
  {
    id: 'woodlands',
    name: 'Woodlands Temp Interchange',
    aliases: ['woodlands', 'causeway point', 'woodlands sq', 'marsiling', '46009'],
    stopCode: '46009',
    mrtLine: 'North-South Line / Thomson-East Coast Line',
    mrtStation: 'Woodlands MRT (NS9/TE2)',
    zone: 'north',
  },
  {
    id: 'pasirris',
    name: 'Pasir Ris Bus Interchange',
    aliases: ['pasir ris', 'whitesands', 'white sands', 'pasir ris central', 'pasir ris dr 3', 'downtown east', '77009'],
    stopCode: '77009',
    mrtLine: 'East-West Line',
    mrtStation: 'Pasir Ris MRT (EW1)',
    zone: 'east',
  },
];

// Direct Bus services matrix between locations
interface DirectBusOption {
  serviceNo: string;
  fromHub: string;
  toHub: string;
  durationMin: number;
  via: string;
  operator: string;
}

const DIRECT_BUSES: DirectBusOption[] = [
  // Pasir Ris direct connections
  { serviceNo: '12', fromHub: 'pasirris', toHub: 'bugis', durationMin: 42, via: 'via Tampines, Bedok & Kallang', operator: 'Go-Ahead' },
  { serviceNo: '12', fromHub: 'bugis', toHub: 'pasirris', durationMin: 42, via: 'via Sims Ave, Bedok & Tampines', operator: 'Go-Ahead' },
  { serviceNo: '58', fromHub: 'pasirris', toHub: 'bishan', durationMin: 38, via: 'via Tampines, Kaki Bukit & Serangoon', operator: 'SBS Transit' },
  { serviceNo: '58', fromHub: 'bishan', toHub: 'pasirris', durationMin: 38, via: 'via Serangoon & Tampines', operator: 'SBS Transit' },
  // Airport direct connections
  { serviceNo: '36', fromHub: 'airport', toHub: 'bugis', durationMin: 44, via: 'via Marine Parade Rd & Suntec', operator: 'Go-Ahead' },
  { serviceNo: '36', fromHub: 'bugis', toHub: 'airport', durationMin: 44, via: 'via Suntec & ECP Highway', operator: 'Go-Ahead' },
  { serviceNo: '36', fromHub: 'airport', toHub: 'orchard', durationMin: 52, via: 'via Marine Parade & Orchard Rd', operator: 'Go-Ahead' },
  { serviceNo: '36', fromHub: 'orchard', toHub: 'airport', durationMin: 52, via: 'via Bras Basah & ECP Highway', operator: 'Go-Ahead' },
  { serviceNo: '36', fromHub: 'airport', toHub: 'brasbasah', durationMin: 40, via: 'via ECP & Temasek Blvd', operator: 'Go-Ahead' },
  { serviceNo: '36', fromHub: 'brasbasah', toHub: 'airport', durationMin: 40, via: 'via Marine Parade & ECP', operator: 'Go-Ahead' },
  { serviceNo: '858', fromHub: 'woodlands', toHub: 'airport', durationMin: 48, via: 'via SLE / TPE Express', operator: 'Tower Transit' },
  { serviceNo: '858', fromHub: 'airport', toHub: 'woodlands', durationMin: 48, via: 'via TPE / SLE Express', operator: 'Tower Transit' },
  { serviceNo: '858', fromHub: 'bugis', toHub: 'airport', durationMin: 46, via: 'via SLE corridor & Airport Blvd', operator: 'Tower Transit' },

  // Trunk Line 7 (Bedok <-> Bugis <-> Dhoby Ghaut <-> Orchard <-> Clementi)
  { serviceNo: '7', fromHub: 'bedok', toHub: 'bugis', durationMin: 22, via: 'via Geylang Rd & Victoria St', operator: 'SBS Transit' },
  { serviceNo: '7', fromHub: 'bugis', toHub: 'bedok', durationMin: 22, via: 'via Sims Ave & Kembangan', operator: 'SBS Transit' },
  { serviceNo: '7', fromHub: 'bugis', toHub: 'orchard', durationMin: 14, via: 'via Bras Basah & Dhoby Ghaut', operator: 'SBS Transit' },
  { serviceNo: '7', fromHub: 'orchard', toHub: 'bugis', durationMin: 14, via: 'via Somerset & Victoria St', operator: 'SBS Transit' },
  { serviceNo: '7', fromHub: 'orchard', toHub: 'clementi', durationMin: 26, via: 'via Holland Rd & Commonwealth', operator: 'SBS Transit' },
  { serviceNo: '7', fromHub: 'clementi', toHub: 'orchard', durationMin: 26, via: 'via Holland Village & Orchard', operator: 'SBS Transit' },
  { serviceNo: '7', fromHub: 'bedok', toHub: 'clementi', durationMin: 54, via: 'via Bugis, Dhoby Ghaut & Orchard', operator: 'SBS Transit' },
  { serviceNo: '7', fromHub: 'clementi', toHub: 'bedok', durationMin: 54, via: 'via Orchard, Dhoby Ghaut & Bugis', operator: 'SBS Transit' },

  // Trunk Line 14 (Bedok <-> Orchard <-> Clementi)
  { serviceNo: '14', fromHub: 'bedok', toHub: 'orchard', durationMin: 32, via: 'via East Coast Rd & Mountbatten', operator: 'SBS Transit' },
  { serviceNo: '14', fromHub: 'orchard', toHub: 'bedok', durationMin: 32, via: 'via Bras Basah & East Coast', operator: 'SBS Transit' },
  { serviceNo: '14', fromHub: 'clementi', toHub: 'orchard', durationMin: 25, via: 'via Dover & Buona Vista', operator: 'SBS Transit' },
  { serviceNo: '14', fromHub: 'orchard', toHub: 'clementi', durationMin: 25, via: 'via Paterson Rd & Dover', operator: 'SBS Transit' },

  // Trunk Line 65 (Tampines <-> Dhoby Ghaut <-> Orchard)
  { serviceNo: '65', fromHub: 'tampines', toHub: 'orchard', durationMin: 42, via: 'via Bedok Reservoir & MacPherson', operator: 'SBS Transit' },
  { serviceNo: '65', fromHub: 'orchard', toHub: 'tampines', durationMin: 42, via: 'via Dhoby Ghaut & Bedok Reservoir', operator: 'SBS Transit' },
  { serviceNo: '65', fromHub: 'dhobyghaut', toHub: 'tampines', durationMin: 36, via: 'via Serangoon & MacPherson', operator: 'SBS Transit' },

  // Trunk Line 175 (Clementi <-> Orchard <-> Bugis <-> Geylang)
  { serviceNo: '175', fromHub: 'clementi', toHub: 'bugis', durationMin: 38, via: 'via Pasir Panjang, Alexandra & Orchard', operator: 'SBS Transit' },
  { serviceNo: '175', fromHub: 'bugis', toHub: 'clementi', durationMin: 38, via: 'via Orchard, Alexandra & Haw Par Villa', operator: 'SBS Transit' },
  { serviceNo: '175', fromHub: 'bugis', toHub: 'geylang', durationMin: 12, via: 'via Kallang Bahru & Sims Ave', operator: 'SBS Transit' },
  { serviceNo: '175', fromHub: 'geylang', toHub: 'bugis', durationMin: 12, via: 'via Victoria St & Kallang Rd', operator: 'SBS Transit' },
  { serviceNo: '175', fromHub: 'orchard', toHub: 'geylang', durationMin: 24, via: 'via Bugis & Sims Ave', operator: 'SBS Transit' },

  // Line 97 (Jurong East <-> Marina Bay / MBFC)
  { serviceNo: '97', fromHub: 'jurongeast', toHub: 'marinabay', durationMin: 36, via: 'via AYE, Alexandra & Shenton Way', operator: 'Tower Transit' },
  { serviceNo: '97', fromHub: 'marinabay', toHub: 'jurongeast', durationMin: 36, via: 'via HarbourFront, AYE & Jurong Town Hall', operator: 'Tower Transit' },

  // Line 502 (Jurong East / West <-> Marina Bay Sands)
  { serviceNo: '502', fromHub: 'jurongeast', toHub: 'marinabay', durationMin: 32, via: 'via AYE Express & Bayfront Ave', operator: 'SBS Transit' },

  // Line 12 (Bedok / Pasir Ris <-> Bugis <-> Chinatown)
  { serviceNo: '12', fromHub: 'bedok', toHub: 'bugis', durationMin: 25, via: 'via Mountbatten & Kallang', operator: 'Go-Ahead' },
  { serviceNo: '12', fromHub: 'bugis', toHub: 'chinatown', durationMin: 12, via: 'via Victoria St & Eu Tong Sen St', operator: 'Go-Ahead' },
  { serviceNo: '12', fromHub: 'chinatown', toHub: 'bugis', durationMin: 12, via: 'via Hill St & Victoria St', operator: 'Go-Ahead' },

  // Line 61 (Bugis <-> Chinatown / Geylang)
  { serviceNo: '61', fromHub: 'bugis', toHub: 'chinatown', durationMin: 14, via: 'via Clarke Quay & Chinatown', operator: 'SMRT Buses' },
  { serviceNo: '61', fromHub: 'bugis', toHub: 'geylang', durationMin: 15, via: 'via Kallang Bahru', operator: 'SMRT Buses' },
];

/**
 * Identify the closest hub location for any input string
 */
export function resolveLocationHub(input: string, allStops: BusStop[]): { hub: HubLocation; stop: BusStop } {
  const clean = input.toLowerCase().trim();

  // 1. Exact match with aliases
  for (const hub of HUBS) {
    if (hub.aliases.some((alias) => clean.includes(alias) || alias.includes(clean))) {
      const matchedStop = allStops.find((s) => s.code === hub.stopCode) || allStops[0];
      return { hub, stop: matchedStop };
    }
  }

  // 2. Check if a bus stop name or code was directly referenced
  for (const stop of allStops) {
    if (clean.includes(stop.code) || clean.includes(stop.name.toLowerCase()) || clean.includes(stop.road.toLowerCase())) {
      const parentHub = HUBS.find((h) => h.stopCode === stop.code) || {
        id: 'custom-' + stop.code,
        name: stop.name,
        aliases: [stop.name.toLowerCase()],
        stopCode: stop.code,
        mrtLine: 'Transit Hub',
        mrtStation: stop.road,
        zone: 'central',
      };
      return { hub: parentHub, stop };
    }
  }

  // 3. Keyword heuristic for Singapore regions
  if (clean.includes('airport') || clean.includes('changi') || clean.includes('t1') || clean.includes('t2') || clean.includes('t3')) {
    const hub = HUBS.find((h) => h.id === 'airport')!;
    return { hub, stop: allStops.find((s) => s.code === hub.stopCode) || allStops[0] };
  }
  if (clean.includes('orchard') || clean.includes('somerset') || clean.includes('scotts') || clean.includes('tanglin') || clean.includes('shopping')) {
    const hub = HUBS.find((h) => h.id === 'orchard')!;
    return { hub, stop: allStops.find((s) => s.code === hub.stopCode) || allStops[0] };
  }
  if (clean.includes('marina') || clean.includes('mbfc') || clean.includes('cbd') || clean.includes('shenton') || clean.includes('raffles') || clean.includes('work')) {
    const hub = HUBS.find((h) => h.id === 'marinabay')!;
    return { hub, stop: allStops.find((s) => s.code === hub.stopCode) || allStops[0] };
  }
  if (clean.includes('bedok') || clean.includes('marine parade') || clean.includes('east coast') || clean.includes('kembangan')) {
    const hub = HUBS.find((h) => h.id === 'bedok')!;
    return { hub, stop: allStops.find((s) => s.code === hub.stopCode) || allStops[0] };
  }
  if (clean.includes('jurong') || clean.includes('clementi') || clean.includes('west') || clean.includes('boon lay') || clean.includes('pioneer')) {
    const hub = HUBS.find((h) => h.id === 'jurongeast')!;
    return { hub, stop: allStops.find((s) => s.code === hub.stopCode) || allStops[0] };
  }
  if (clean.includes('pasir ris') || clean.includes('whitesands') || clean.includes('white sands') || clean.includes('downtown east') || clean.includes('loyang')) {
    const hub = HUBS.find((h) => h.id === 'pasirris')!;
    return { hub, stop: allStops.find((s) => s.code === hub.stopCode) || allStops[0] };
  }
  if (clean.includes('tampines') || clean.includes('simei') || clean.includes('tampines hub') || clean.includes('century square')) {
    const hub = HUBS.find((h) => h.id === 'tampines')!;
    return { hub, stop: allStops.find((s) => s.code === hub.stopCode) || allStops[0] };
  }
  if (clean.includes('woodlands') || clean.includes('yishun') || clean.includes('sembawang') || clean.includes('khatib')) {
    const hub = HUBS.find((h) => h.id === 'woodlands')!;
    return { hub, stop: allStops.find((s) => s.code === hub.stopCode) || allStops[0] };
  }
  if (clean.includes('bishan') || clean.includes('ang mo kio') || clean.includes('thomson') || clean.includes('home')) {
    const hub = HUBS.find((h) => h.id === 'bishan')!;
    return { hub, stop: allStops.find((s) => s.code === hub.stopCode) || allStops[0] };
  }

  // 4. Default: Bugis Victoria St hub (central hub)
  const defaultHub = HUBS.find((h) => h.id === 'bugis')!;
  return { hub: defaultHub, stop: allStops.find((s) => s.code === defaultHub.stopCode) || allStops[0] };
}

/**
 * Calculates a dynamic, realistic journey between any two locations
 */
export function calculateJourney(origin: string, destination: string, allStops: BusStop[]): PlannedTrip {
  const originRes = resolveLocationHub(origin, allStops);
  const destRes = resolveLocationHub(destination, allStops);

  const originHub = originRes.hub;
  const destHub = destRes.hub;
  const departureStop = originRes.stop;

  // Handle same origin and destination
  if (originHub.id === destHub.id) {
    const trip: PlannedTrip = {
      origin,
      destination,
      totalTimeMin: 6,
      fareEst: '$0.00',
      co2SavedKg: 0.1,
      departureStopCode: departureStop.code,
      departureStopName: departureStop.name,
      routeName: 'Short Walking Distance',
      segments: [
        {
          mode: 'walk',
          label: `Walk to ${destination}`,
          details: `Both locations are within ${originHub.name} vicinity. Stroll ~350m along sheltered covered walkways.`,
          durationMin: 6,
        },
      ],
    };
    return trip;
  }

  // Check if a direct bus exists between these hubs
  const directBus = DIRECT_BUSES.find(
    (b) => b.fromHub === originHub.id && b.toHub === destHub.id
  );

  // Calculate realistic distance and metrics
  const isCrossIsland =
    (originHub.zone === 'north' && destHub.zone === 'cbd') ||
    (originHub.zone === 'west' && destHub.zone === 'east') ||
    (originHub.zone === 'east' && destHub.zone === 'west') ||
    (destHub.zone === 'airport' && originHub.zone !== 'east');

  const isNearby =
    (originHub.zone === 'central' && destHub.zone === 'central') ||
    (originHub.zone === 'central' && destHub.zone === 'cbd') ||
    (originHub.zone === 'cbd' && destHub.zone === 'central');

  const walkToStopMeters = Math.floor(180 + (origin.length * 13) % 220);
  const walkToStopMins = Math.max(2, Math.round(walkToStopMeters / 75));
  const finalWalkMins = Math.max(3, Math.round((destination.length * 9) % 5 + 3));

  // Build alternatives array
  const alternatives: TripAlternative[] = [];

  // 1. Direct Bus Alternative (if available or synthesize based on closest route)
  if (directBus) {
    const totalMin = walkToStopMins + directBus.durationMin + finalWalkMins;
    alternatives.push({
      id: 'direct-bus',
      title: `Direct Bus ${directBus.serviceNo}`,
      badge: 'DIRECT • NO TRANSFERS',
      totalTimeMin: totalMin,
      fareEst: '$1.48',
      departureStopCode: departureStop.code,
      departureStopName: departureStop.name,
      segments: [
        {
          mode: 'walk',
          label: `Walk to ${departureStop.name}`,
          details: `Walk ${walkToStopMeters}m via roadside footpath to Bus Stop #${departureStop.code}`,
          durationMin: walkToStopMins,
        },
        {
          mode: 'bus',
          serviceNo: directBus.serviceNo,
          label: `Board Bus ${directBus.serviceNo} (${directBus.operator})`,
          details: `${directBus.via} • Direct ride to ${destHub.name} • Seats Available`,
          durationMin: directBus.durationMin,
          color: '#0ea5e9',
        },
        {
          mode: 'walk',
          label: `Alight & walk to ${destination}`,
          details: `Walk ${finalWalkMins * 70}m directly to destination entrance`,
          durationMin: finalWalkMins,
        },
      ],
    });
  }

  // 2. Fastest Hybrid Route (Bus + MRT or Express MRT)
  let mrtLineName = 'North-South Line';
  let mrtColor = '#D42E12'; // Red
  let mrtStopsCount = 6;
  let mrtRideMins = 18;

  if (destHub.id === 'airport' || originHub.id === 'airport' || destHub.id === 'bedok' || destHub.id === 'clementi') {
    mrtLineName = 'East-West Line';
    mrtColor = '#00964D'; // Green
    mrtStopsCount = isCrossIsland ? 12 : 5;
    mrtRideMins = isCrossIsland ? 32 : 16;
  } else if (destHub.id === 'marinabay' && originHub.id === 'bishan') {
    mrtLineName = 'North-South Line towards Marina South Pier';
    mrtColor = '#D42E12';
    mrtStopsCount = 8;
    mrtRideMins = 17;
  } else if (destHub.id === 'bugis' || destHub.id === 'chinatown') {
    mrtLineName = 'Downtown Line';
    mrtColor = '#0055B8'; // Blue
    mrtStopsCount = 4;
    mrtRideMins = 11;
  } else if (destHub.id === 'dhobyghaut' || originHub.id === 'dhobyghaut') {
    mrtLineName = 'North East Line';
    mrtColor = '#8A179E'; // Purple
    mrtStopsCount = 4;
    mrtRideMins = 10;
  }

  const feederBus = departureStop.services[0];
  const feederServiceNo = feederBus?.serviceNo || '14';
  const feederNextTime = feederBus?.nextArrival?.time || '2m';
  const feederNextCrowd = feederBus?.nextArrival?.crowding || 'seats';

  const hybridSegments: TripSegment[] = [
    {
      mode: 'walk',
      label: `Walk to ${departureStop.name} (#${departureStop.code})`,
      details: `Walk ${walkToStopMeters}m along sheltered linkway`,
      durationMin: walkToStopMins,
    },
    {
      mode: 'bus',
      serviceNo: feederServiceNo,
      label: `Board Bus ${feederServiceNo} to ${originHub.mrtStation || 'Interchange'}`,
      details: `Feeder transfer • Arriving in ${feederNextTime} (${feederNextCrowd} available)`,
      durationMin: 7,
      color: '#0053db',
    },
    {
      mode: 'mrt',
      label: `${mrtLineName}`,
      details: `Board at Platform B • ${mrtStopsCount} stops to ${destHub.mrtStation || destHub.name}`,
      durationMin: mrtRideMins,
      color: mrtColor,
    },
    {
      mode: 'walk',
      label: `Arrive at ${destination}`,
      details: `Walk ${finalWalkMins * 65}m from station exit into destination`,
      durationMin: finalWalkMins,
    },
  ];

  const hybridTotalMin = walkToStopMins + 7 + mrtRideMins + finalWalkMins;
  const calculatedFare = isCrossIsland ? '$1.92' : isNearby ? '$1.09' : '$1.48';
  const co2Saved = isCrossIsland ? 1.4 : isNearby ? 0.4 : 0.9;

  alternatives.unshift({
    id: 'fastest',
    title: 'Fastest Route (Bus + MRT)',
    badge: 'FASTEST ROUTE',
    totalTimeMin: hybridTotalMin,
    fareEst: calculatedFare,
    departureStopCode: departureStop.code,
    departureStopName: departureStop.name,
    segments: hybridSegments,
  });

  // If no direct bus was found earlier, synthesize a pure bus alternative using transit corridors
  if (alternatives.length === 1) {
    const altBus1 = departureStop.services[0];
    const altBus2 = departureStop.services[1];
    const alt1No = altBus1?.serviceNo || '7';
    const alt1Dest = altBus1?.destination || 'Trunk route';
    const alt2No = altBus2?.serviceNo || '175';
    const pureBusTime = Math.round(hybridTotalMin * 1.25);

    alternatives.push({
      id: 'alt-bus',
      title: `Bus Transfer (Bus ${alt1No} ➔ ${alt2No})`,
      badge: 'SCENIC TRUNK CORRIDOR',
      totalTimeMin: pureBusTime,
      fareEst: calculatedFare,
      departureStopCode: departureStop.code,
      departureStopName: departureStop.name,
      segments: [
        {
          mode: 'walk',
          label: `Walk to ${departureStop.name}`,
          details: `Walk ${walkToStopMeters}m to Bus Stop #${departureStop.code}`,
          durationMin: walkToStopMins,
        },
        {
          mode: 'bus',
          serviceNo: alt1No,
          label: `Board Bus ${alt1No}`,
          details: `${alt1Dest} • Ride 6 stops`,
          durationMin: Math.round(pureBusTime * 0.45),
          color: '#0ea5e9',
        },
        {
          mode: 'bus',
          serviceNo: alt2No,
          label: `Transfer to Bus ${alt2No} at Central Node`,
          details: `Seamless same-platform connection • Arrives in 3 mins`,
          durationMin: Math.round(pureBusTime * 0.45),
          color: '#0053db',
        },
        {
          mode: 'walk',
          label: `Alight & walk to ${destination}`,
          details: `Short stroll into destination`,
          durationMin: finalWalkMins,
        },
      ],
    });
  }

  // Selected alternative is the primary (fastest or direct)
  const primary = alternatives[0];

  return {
    origin,
    destination,
    totalTimeMin: primary.totalTimeMin,
    fareEst: primary.fareEst,
    co2SavedKg: co2Saved,
    departureStopCode: primary.departureStopCode,
    departureStopName: primary.departureStopName,
    routeName: primary.title,
    alternatives,
    selectedAlternativeIndex: 0,
    segments: primary.segments,
  };
}
