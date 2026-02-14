import type { RequestKind, RequestParams, TmdbMovie } from '@/shared/types'
import type { Movie } from './types'

// TODO: extend interface to include more movie properties
export const mapMovie = ({ id, title, overview, poster_path, release_date, vote_average, backdrop_path }: TmdbMovie): Movie => ({
  id: id,
  title: title,
  overview: overview ?? null,
  posterPath: poster_path ?? null,
  backdropPath: backdrop_path ?? null,
  releaseDate: release_date ?? null,
  voteAverage: vote_average ?? null,
})

/**
 * Creates a normalized key for caching API requests.
 * @param kind - The type of request
 * @param params - The parameters of the request
 * @returns A string in the format "kind?param1=value1&param2=value2" for use as a key in the store
 */
export const makeKey = (kind: RequestKind, params: RequestParams) => {
  const queryString = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .sort()
    .join('&')
  return `${kind}?${queryString}`
}
