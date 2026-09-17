/**
 * Classifies HTTP response and raw body into standard application states:
 * 'ok' (200) | 'empty' (200) | 'refused' (502) | 'busy' (503) | 'unreachable' (504)
 */

export function classifyResponse({ status, contentType = '', text = '', pick, error = null }) {
  // If network failure or AbortController timeout occurred
  if (error) {
    return {
      state: 'unreachable',
      httpStatus: 504,
      data: null,
      message: error.message || 'We could not reach LTA, so nothing on this panel has updated.',
    };
  }

  // Rate limited / Provider busy
  if (status === 429 || status === 503) {
    return {
      state: 'busy',
      httpStatus: 503,
      retryAfter: 10,
      data: null,
      message: 'The bus service is busy. We will try again in 10 seconds.',
    };
  }

  // Refused: Unauthorized, Forbidden, or Bad Gateway from provider
  if (status === 401 || status === 403 || status === 502) {
    return {
      state: 'refused',
      httpStatus: 502,
      data: null,
      message: 'We could not get bus times, so nothing on this panel is current. Please tell us if this stays.',
    };
  }

  // Unreachable / Not found / Server error
  if (status === 404 || status >= 500) {
    return {
      state: 'unreachable',
      httpStatus: 504,
      data: null,
      message: 'We could not reach LTA, so nothing on this panel has updated.',
    };
  }

  // Status 200 OK: Never call .json() directly; safely parse raw body text
  if (status === 200) {
    let parsed;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      return {
        state: 'refused',
        httpStatus: 502,
        data: null,
        message: 'We could not get bus times, so nothing on this panel is current. Please tell us if this stays.',
      };
    }

    const items = typeof pick === 'function' ? pick(parsed) : parsed;

    // Check if feed answered but returned empty services list
    if (!items || (Array.isArray(items) && items.length === 0)) {
      return {
        state: 'empty',
        httpStatus: 200,
        data: [],
        raw: parsed,
        message: 'LTA answered, but no buses are listed for this stop right now.',
      };
    }

    return {
      state: 'ok',
      httpStatus: 200,
      data: items,
      raw: parsed,
      message: null,
    };
  }

  // Default fallback
  return {
    state: 'unreachable',
    httpStatus: 504,
    data: null,
    message: 'We could not reach LTA, so nothing on this panel has updated.',
  };
}
