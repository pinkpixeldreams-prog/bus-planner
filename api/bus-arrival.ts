import type { IncomingMessage, ServerResponse } from 'http';

/**
 * LTA DataMall v3 Bus Arrival Serverless Function
 *
 * Endpoint:
 * https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=83139
 *
 * Headers required by LTA:
 * AccountKey: <LTA_ACCOUNT_KEY>
 *
 * Query parameters:
 * - BusStopCode (string, e.g. "83139")
 * - ServiceNo (string, optional, e.g. "15")
 */

const LTA_BUS_ARRIVAL_ENDPOINT = 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival';

// Helper to parse query parameters from various request shapes (Node HTTP, Express, or Web Request)
function getQueryParams(req: any): { busStopCode: string; serviceNo?: string } {
  if (req.query) {
    const busStopCode = (req.query.BusStopCode || req.query.busStopCode || req.query.stop || '83139') as string;
    const serviceNo = (req.query.ServiceNo || req.query.serviceNo || req.query.service || req.query.bus) as string | undefined;
    return { busStopCode: String(busStopCode).trim(), serviceNo: serviceNo ? String(serviceNo).trim() : undefined };
  }

  // Fallback for raw Node IncomingMessage
  try {
    const urlObj = new URL(req.url || '', 'http://localhost');
    const busStopCode = urlObj.searchParams.get('BusStopCode') || urlObj.searchParams.get('busStopCode') || urlObj.searchParams.get('stop') || '83139';
    const serviceNo = urlObj.searchParams.get('ServiceNo') || urlObj.searchParams.get('serviceNo') || urlObj.searchParams.get('service') || undefined;
    return { busStopCode, serviceNo: serviceNo || undefined };
  } catch {
    return { busStopCode: '83139' };
  }
}

// Helper to retrieve the LTA AccountKey from environment variables or request headers
function getAccountKey(req: any): string | undefined {
  // 1. Check environment variables (recommended: never expose to browser)
  const envKey = process.env.LTA_ACCOUNT_KEY || process.env.LTA_DATAMALL_KEY || process.env.ACCOUNT_KEY;
  if (envKey && envKey.trim().length > 0) {
    return envKey.trim();
  }

  // 2. Fallback: check incoming request headers (AccountKey or x-account-key)
  const headers = req.headers || {};
  const headerKey = headers['accountkey'] || headers['AccountKey'] || headers['x-account-key'] || headers['authorization']?.replace(/^Bearer\s+/i, '');
  if (headerKey && typeof headerKey === 'string' && headerKey.trim().length > 0) {
    return headerKey.trim();
  }

  return undefined;
}

/**
 * Core function to fetch arrivals from LTA DataMall v3
 */
export async function fetchLtaBusArrival(busStopCode: string, serviceNo?: string, accountKey?: string) {
  if (!accountKey) {
    throw new Error('LTA_ACCOUNT_KEY_MISSING');
  }

  const queryParams = new URLSearchParams({
    BusStopCode: busStopCode,
  });

  if (serviceNo) {
    queryParams.set('ServiceNo', serviceNo);
  }

  const targetUrl = `${LTA_BUS_ARRIVAL_ENDPOINT}?${queryParams.toString()}`;

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: {
      'AccountKey': accountKey,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const error = new Error(`LTA DataMall API responded with HTTP status ${response.status}: ${errorBody}`);
    (error as any).status = response.status;
    (error as any).responseBody = errorBody;
    throw error;
  }

  return await response.json();
}

function sendJsonResponse(res: any, status: number, data: any) {
  if (!res) {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(status).json(data);
  }
  if (typeof res.writeHead === 'function') {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }
  if (typeof res.setHeader === 'function') {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
    return;
  }
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

/**
 * Standard Serverless Function Handler (compatible with Vercel, Netlify, Express, AWS Lambda, Cloud Functions)
 */
export default async function handler(req: any, res: any) {
  // Set CORS headers
  if (res && typeof res.setHeader === 'function') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, AccountKey, x-account-key'
    );
  }

  // Handle preflight
  if (req.method === 'OPTIONS') {
    if (res && typeof res.status === 'function' && typeof res.end === 'function') {
      return res.status(200).end();
    }
    if (res && typeof res.end === 'function') {
      res.statusCode = 200;
      return res.end();
    }
    return new Response(null, { status: 200 });
  }

  const accountKey = getAccountKey(req);
  const { busStopCode, serviceNo } = getQueryParams(req);

  // Check if API key is present
  if (!accountKey) {
    const errorPayload = {
      success: false,
      error: 'Missing LTA DataMall AccountKey',
      message: 'AccountKey was not found. Please add LTA_ACCOUNT_KEY to your server environment variables (.env) or pass the "AccountKey" header on your request.',
      requestedBusStopCode: busStopCode,
      documentation: 'https://datamall.lta.gov.sg',
    };

    return sendJsonResponse(res, 401, errorPayload);
  }

  try {
    const data = await fetchLtaBusArrival(busStopCode, serviceNo, accountKey);
    return sendJsonResponse(res, 200, data);
  } catch (err: any) {
    console.error('[LTA DataMall BusArrival Error]:', err);

    const status = err.status || 500;
    const errorPayload = {
      success: false,
      error: 'Failed to fetch bus arrival data from LTA DataMall',
      message: err.message || 'Unknown error occurred while contacting LTA DataMall',
      requestedBusStopCode: busStopCode,
      requestedServiceNo: serviceNo,
    };

    return sendJsonResponse(res, status, errorPayload);
  }
}

/**
 * Web Standard Request / Next.js Edge GET handler
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const busStopCode = url.searchParams.get('BusStopCode') || url.searchParams.get('busStopCode') || '83139';
  const serviceNo = url.searchParams.get('ServiceNo') || url.searchParams.get('serviceNo') || undefined;

  const envKey = process.env.LTA_ACCOUNT_KEY || process.env.LTA_DATAMALL_KEY || process.env.ACCOUNT_KEY;
  const headerKey = request.headers.get('AccountKey') || request.headers.get('accountkey') || request.headers.get('x-account-key');
  const accountKey = envKey || headerKey;

  if (!accountKey) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Missing LTA DataMall AccountKey',
        message: 'AccountKey was not found. Please add LTA_ACCOUNT_KEY to your environment (.env) or pass the "AccountKey" header.',
        requestedBusStopCode: busStopCode,
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  try {
    const data = await fetchLtaBusArrival(busStopCode, serviceNo, accountKey);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch bus arrivals from LTA DataMall',
        message: err.message,
      }),
      {
        status: err.status || 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
