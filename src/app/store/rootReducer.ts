import { movieQueriesReducer, moviesReducer } from '@/entities/movie'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  movies: moviesReducer,
  movieQueries: movieQueriesReducer,
})

export type RootState = ReturnType<typeof rootReducer>
