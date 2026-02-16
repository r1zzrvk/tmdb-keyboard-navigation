import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import type { Movie, QueryState } from '../types'

export const selectMovieQuery = (key: string) => (state: RootState): QueryState | undefined => state.movieQueries.byKey[key]

export const selectMovieById = (id: number) => (state: RootState) => state.movies.byId[id]

// Empty array constant to avoid creating new array on each call
const EMPTY_ARRAY: Movie[] = []

// Cache for memoized selectors by key
const moviesSelectorsCache = new Map<string, (state: RootState) => Movie[]>()

export const selectMovies = (key: string): ((state: RootState) => Movie[]) => {
  // Return cached selector if exists
  if (moviesSelectorsCache.has(key)) {
    return moviesSelectorsCache.get(key)!
  }

  // Create memoized selector for this key
  const selector = createSelector(
    [
      (state: RootState) => state.movieQueries.byKey[key],
      (state: RootState) => state.movies.byId,
    ],
    (query, moviesById): Movie[] => {
      if (!query) {
        return EMPTY_ARRAY
      }

      return query.ids.map(id => moviesById[id]).filter(Boolean) as Movie[]
    }
  )

  // Cache the selector
  moviesSelectorsCache.set(key, selector)

  return selector
}

export const selectMoviePage = (state: RootState) => state.moviePagination.page
