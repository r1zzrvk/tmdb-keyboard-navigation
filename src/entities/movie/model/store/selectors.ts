import type { RootState } from '@/app/store'
import type { QueryState } from '../types'

export const selectMovieQuery = (key: string) => (state: RootState): QueryState | undefined => state.movieQueries.byKey[key]

export const selectMovieById = (id: number) => (state: RootState) => state.movies.byId[id]

export const selectMovies = (key: string) => (state: RootState) => {
  const query = state.movieQueries.byKey[key]

  if (!query) {
    return []
  }

  return query.ids.map(id => state.movies.byId[id]).filter(Boolean)
}

export const selectMoviePage = (state: RootState) => state.moviePagination.page
