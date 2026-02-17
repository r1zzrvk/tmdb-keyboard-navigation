export type MovieId = number

/**
 * @see https://developer.themoviedb.org/reference/movie-details
 */

export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: MovieId
  title: string
  overview: string | null
  posterPath: string | null
  backdropPath: string | null
  releaseDate: string | null
  voteAverage: number | null
  adult: boolean
  budget: number
  genres: Genre[]
  originalLanguage: string
  runtime: number
  tagline: string | null
  voteCount: number
}

export type QueryKey = string

export interface QueryState {
  status: 'idle' | 'loading' | 'success' | 'error'
  ids: MovieId[]
  page?: number
  totalPages?: number
  error?: string
  fetchedAt?: number
}

export interface MovieCardProps extends Movie {
  order: number
}
