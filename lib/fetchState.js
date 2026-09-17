import { classifyResponse } from './classify.js';

/**
 * Fetches data from external provider with a strict 6-second timeout
 * Reads raw status, content-type and body text, avoiding direct .json() calls.
 */
export async function fetchState({ url, headers = {}, timeoutMs = 6000, pick }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const status = response.status;
    const contentType = response.headers.get('content-type') || '';
    const text = await response.text();

    return classifyResponse({
      status,
      contentType,
      text,
      pick,
    });
  } catch (err) {
    clearTimeout(timeoutId);

    return classifyResponse({
      error: err,
      pick,
    });
  }
}
