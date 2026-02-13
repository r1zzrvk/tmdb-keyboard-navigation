import { tmdbGet } from './client'
import { tmdbMovieSchema, tmdbPagedSchema } from './validation'

export async function fetchPopular(page: number) {
  const json = await tmdbGet({ path: '/movie/popular', params: { page } })
  return tmdbPagedSchema(tmdbMovieSchema).parse(json)
}

export async function fetchNowPlaying(page: number) {
  const json = await tmdbGet({ path: '/movie/now_playing', params: { page } })
  return tmdbPagedSchema(tmdbMovieSchema).parse(json)
}

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

export async function fetchMovieDetails(id: number) {
  const json = await tmdbGet({ path: `/movie/${id}` })
  return tmdbMovieSchema.parse(json)
}
