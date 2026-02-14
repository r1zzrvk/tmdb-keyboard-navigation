import { filterReducer } from '@/entities/filter'
import { movieQueriesReducer, moviesReducer } from '@/entities/movie'
import { searchReducer } from '@/entities/search'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  movies: moviesReducer,
  movieQueries: movieQueriesReducer,
  search: searchReducer,
  filter: filterReducer,
})

export type RootState = ReturnType<typeof rootReducer>
