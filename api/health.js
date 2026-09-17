const LTA_TEST_URL = 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=83139';

export default async function handler(req, res) {
  const setHeader = (key, value) => {
    if (res?.setHeader) res.setHeader(key, value);
  };

  setHeader('Access-Control-Allow-Origin', '*');
  setHeader('Cache-Control', 'no-store');

  const accountKey = process.env.LTA_ACCOUNT_KEY;
  const keyConfigured = Boolean(accountKey && accountKey.trim().length > 0);

  let reachable = false;
  let providerStatus = null;
  let responseTimeMs = null;

  const startTime = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const headers = {};
    if (keyConfigured) {
      headers['AccountKey'] = accountKey.trim();
    }

    const response = await fetch(LTA_TEST_URL, {
      method: 'GET',
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    responseTimeMs = Date.now() - startTime;
    reachable = true;
    providerStatus = response.status;
  } catch {
    clearTimeout(timeoutId);
    responseTimeMs = Date.now() - startTime;
    reachable = false;
    providerStatus = null;
  }

  const payload = {
    keyConfigured,
    lta: {
      reachable,
      status: providerStatus,
      ms: responseTimeMs,
    },
    timestamp: new Date().toISOString(),
  };

  if (res?.status && res?.json) {
    return res.status(200).json(payload);
  }

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
