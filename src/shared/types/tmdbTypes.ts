/**
 * @see https://developer.themoviedb.org/reference/movie-details
 */

// TODO: extend interface to include more movie properties
export interface TmdbMovie {
  id: number
  title: string
  overview: string | null
  poster_path: string | null
  backdrop_path: string | null
  release_date: string | null
  vote_average: number | null
}

export interface TmdbPagedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
