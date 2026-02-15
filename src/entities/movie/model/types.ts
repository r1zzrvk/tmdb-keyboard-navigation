export type MovieId = number

/**
 * @see https://developer.themoviedb.org/reference/movie-details
 */

// TODO: extend interface to include more movie properties
export interface Movie {
  id: MovieId
  title: string
  overview: string | null
  posterPath: string | null
  backdropPath: string | null
  releaseDate: string | null
  voteAverage: number | null
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
