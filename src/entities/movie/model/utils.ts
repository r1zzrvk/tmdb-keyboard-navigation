import type { RequestKind, RequestParams, TmdbMovie } from '@/shared/types'
import type { Movie } from './types'

export const mapMovie = (tmdbMovie: TmdbMovie): Movie => ({
  id: tmdbMovie.id,
  title: tmdbMovie.title,
  overview: tmdbMovie.overview ?? null,
  posterPath: tmdbMovie.poster_path ?? null,
  backdropPath: tmdbMovie.backdrop_path ?? null,
  releaseDate: tmdbMovie.release_date ?? null,
  voteAverage: tmdbMovie.vote_average ?? null,
  adult: tmdbMovie.adult,
  budget: tmdbMovie.budget,
  genres: tmdbMovie.genres,
  originalLanguage: tmdbMovie.original_language,
  runtime: tmdbMovie.runtime,
  tagline: tmdbMovie.tagline ?? null,
  voteCount: tmdbMovie.vote_count,
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
