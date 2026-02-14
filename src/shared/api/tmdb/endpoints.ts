import { tmdbGet } from './client'
import { tmdbMovieSchema, tmdbPagedSchema } from './validation'

/**
 * @see https://developer.themoviedb.org/reference/movie-popular-list
 */
export async function fetchPopular(page: number) {
  const json = await tmdbGet({ path: '/movie/popular', params: { page } })
  return tmdbPagedSchema(tmdbMovieSchema).parse(json)
}

/**
 * @see https://developer.themoviedb.org/reference/movie-now-playing-list
 */
export async function fetchNowPlaying(page: number) {
  const json = await tmdbGet({ path: '/movie/now_playing', params: { page } })
  return tmdbPagedSchema(tmdbMovieSchema).parse(json)
}

/**
 * @see https://developer.themoviedb.org/reference/search-movie
 */
export async function searchMovies(query: string, page: number) {
  const json = await tmdbGet({
    path: '/search/movie', params: {
      query,
      page,
      include_adult: 0,
    },
  })
  return tmdbPagedSchema(tmdbMovieSchema).parse(json)
}

/**
 * @see https://developer.themoviedb.org/reference/movie-details
 */
export async function fetchMovieDetails(id: number) {
  const json = await tmdbGet({ path: `/movie/${id}` })
  return tmdbMovieSchema.parse(json)
}
