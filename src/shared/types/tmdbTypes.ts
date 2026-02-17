/**
 * @see https://developer.themoviedb.org/reference/movie-details
 */

export interface TmdbMovie {
  id: number
  title: string
  overview: string | null
  poster_path: string | null
  backdrop_path: string | null
  release_date: string | null
  vote_average: number | null
  adult: boolean
  budget: number
  genres: { id: number, name: string }[]
  original_language: string
  runtime: number
  tagline: string | null
  vote_count: number
}

export interface TmdbPagedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
