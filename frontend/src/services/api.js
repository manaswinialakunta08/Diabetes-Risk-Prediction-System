/**
 * Centralized API Client
 * Configurable base URL, timeout, headers, and standardized error handling.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api';
const TIMEOUT_MS = parseInt(import.meta.env.VITE_API_TIMEOUT_MS || '10000', 10);

export class ApiError extends Error {
  constructor(message, status = null, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Perform an HTTP request with timeout and auth header
 */
export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  const token = localStorage.getItem('dps_auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMessage =
        (typeof data === 'object' && data?.message) ||
        (typeof data === 'object' && data?.error) ||
        `Request failed with status ${response.status}`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new ApiError(`Request timed out after ${TIMEOUT_MS / 1000}s. Backend might be unreachable.`, 408);
    }

    if (err instanceof ApiError) {
      throw err;
    }

    // Network connectivity error
    throw new ApiError(
      err.message || 'Unable to connect to backend server. Ensure Flask API is running at ' + BASE_URL,
      0
    );
  }
}

