export type MovieId = number

/**
 * @see https://developer.themoviedb.org/reference/movie-details
 */

// TODO: extend interface to include more movie properties
export type Movie = {
  id: MovieId
  title: string
  overview: string | null
  posterPath: string | null
  releaseDate: string | null
  voteAverage: number | null
}

export type QueryKey = string

export type QueryState = {
  status: 'idle' | 'loading' | 'success' | 'error'
  ids: MovieId[]
  page?: number
  totalPages?: number
  error?: string
  fetchedAt?: number
}
