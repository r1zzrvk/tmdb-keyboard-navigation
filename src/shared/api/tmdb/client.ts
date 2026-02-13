import { ApiError } from "./error"

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL as string
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string

interface TmdbGetParams {
  path: string
  params?: Record<string, string | number>
  timeoutMs?: number
}

/**
 * Performs a GET request to the TMDB API.
 * @param path - The path to the API endpoint.
 * @param params - The parameters to pass to the API endpoint.
 * @param timeoutMs - The timeout in milliseconds.
 * @returns The response from the API.
 */
export const tmdbGet = async ({ path, params, timeoutMs = 8000 }: TmdbGetParams) => {
  const url = new URL(`${BASE_URL}${path}`)

  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v))
  }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new ApiError(`HTTP ${response.status}`, response.status)
    }

    return await response.json()
  } catch (e) {

    if (e instanceof DOMException && e.name === 'AbortError') {
      throw new ApiError('Request timeout', 408, e)
    }

    throw new ApiError('Network or parsing error', undefined, e)
  } finally {
    window.clearTimeout(timeout)
  }
}
