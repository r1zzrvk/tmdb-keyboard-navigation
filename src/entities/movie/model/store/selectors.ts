import type { RootState } from '@/app/store'

export const selectQuery = (key: string) => (state: RootState) => state.movieQueries.byKey[key]

export const selectMovieById = (id: number) => (state: RootState) => state.movies.byId[id]

export const selectQueryMovies = (key: string) => (state: RootState) => {
  const q = state.movieQueries.byKey[key]
  if (!q) return []
  return q.ids.map(id => state.movies.byId[id]).filter(Boolean)
}
