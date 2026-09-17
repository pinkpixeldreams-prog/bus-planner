import { fetchState } from '../lib/fetchState.js';

const LTA_BUS_ARRIVAL_URL = 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival';

function parseBusStopCode(req) {
  if (req?.query?.BusStopCode || req?.query?.busStopCode || req?.query?.stop) {
    return String(req.query.BusStopCode || req.query.busStopCode || req.query.stop).trim();
  }
  try {
    const urlObj = new URL(req.url || '', 'http://localhost');
    return urlObj.searchParams.get('BusStopCode') || urlObj.searchParams.get('busStopCode') || '83139';
  } catch {
    return '83139';
  }
}

function calculateArrivalMinutes(estimatedArrival) {
  if (!estimatedArrival || typeof estimatedArrival !== 'string' || !estimatedArrival.trim()) {
    return null;
  }
  const arrivalTime = new Date(estimatedArrival).getTime();
  if (isNaN(arrivalTime)) {
    return null;
  }
  const diffMs = arrivalTime - Date.now();
  return Math.max(0, Math.round(diffMs / 60000));
}

function formatNextBus(bus) {
  if (!bus) return null;
  const minutes = calculateArrivalMinutes(bus.EstimatedArrival);
  return {
    estimatedArrival: bus.EstimatedArrival || null,
    minutes,
    load: bus.Load || 'SEA',
    feature: bus.Feature || 'WAB',
    type: bus.Type || 'SD',
    latitude: bus.Latitude || null,
    longitude: bus.Longitude || null,
  };
}

export default async function handler(req, res) {
  // CORS & headers helper
  const setHeader = (key, value) => {
    if (res?.setHeader) res.setHeader(key, value);
  };

  setHeader('Access-Control-Allow-Origin', '*');
  setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

  if (req?.method === 'OPTIONS') {
    if (res?.status) return res.status(200).end();
    return new Response(null, { status: 200 });
  }

  const busStopCode = parseBusStopCode(req);
  const accountKey = process.env.LTA_ACCOUNT_KEY;

  // GUARDRAIL: BEFORE the bus fetch: if LTA_ACCOUNT_KEY is missing or blank, return 503 naming the variable and do not call LTA
  if (!accountKey || !accountKey.trim()) {
    const errorBody = {
      state: 'my key not set',
      httpStatus: 503,
      busStopCode,
      data: null,
      message: 'LTA_ACCOUNT_KEY is not configured in server environment variables (.env).',
    };

    setHeader('Cache-Control', 'no-store');
    if (res?.status && res?.json) {
      return res.status(503).json(errorBody);
    }
    return new Response(JSON.stringify(errorBody), {
      status: 503,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  const queryUrl = `${LTA_BUS_ARRIVAL_URL}?BusStopCode=${encodeURIComponent(busStopCode)}`;

  // Execute external fetch with 6-second timeout and raw body classification
  const result = await fetchState({
    url: queryUrl,
    headers: {
      AccountKey: accountKey.trim(),
      Accept: 'application/json',
    },
    timeoutMs: 6000,
    pick: (b) => b?.Services,
  });

  // Process data if state is ok or empty
  let processedServices = [];
  if (result.state === 'ok' && Array.isArray(result.data)) {
    processedServices = result.data.map((svc) => {
      const next1 = formatNextBus(svc.NextBus);
      const next2 = formatNextBus(svc.NextBus2);
      const next3 = formatNextBus(svc.NextBus3);

      return {
        serviceNo: svc.ServiceNo,
        operator: svc.Operator,
        nextBus: next1,
        nextBus2: next2,
        nextBus3: next3,
      };
    });

    // Check if services existed but none have scheduled arrival times
    const hasAnyArrivals = processedServices.some(
      (s) => s.nextBus?.minutes !== null || s.nextBus2?.minutes !== null || s.nextBus3?.minutes !== null
    );

    if (!hasAnyArrivals && processedServices.length === 0) {
      result.state = 'empty';
      result.message = 'LTA answered, but no buses are listed for this stop right now.';
    }
  }

  const responsePayload = {
    state: result.state,
    httpStatus: result.httpStatus,
    busStopCode,
    data: processedServices,
    message: result.message,
    lastUpdated: new Date().toISOString(),
  };

  // Cache-Control headers
  if (result.state === 'ok' || result.state === 'empty') {
    setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=40');
  } else {
    setHeader('Cache-Control', 'no-store');
  }

  if (result.state === 'busy') {
    setHeader('Retry-After', '10');
  }

  if (res?.status && res?.json) {
    return res.status(result.httpStatus).json(responsePayload);
  }

  const headersObj = {
    'Content-Type': 'application/json',
    'Cache-Control': result.state === 'ok' || result.state === 'empty' ? 's-maxage=20, stale-while-revalidate=40' : 'no-store',
  };
  if (result.state === 'busy') {
    headersObj['Retry-After'] = '10';
  }

  return new Response(JSON.stringify(responsePayload), {
    status: result.httpStatus,
    headers: headersObj,
  });
}
