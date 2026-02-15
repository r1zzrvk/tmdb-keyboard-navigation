import { favouritesReducer } from '@/entities/favourites'
import { filterReducer } from '@/entities/filter'
import { movieQueriesReducer, moviesReducer, moviePaginationReducer } from '@/entities/movie'
import { searchReducer } from '@/entities/search'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  movies: moviesReducer,
  movieQueries: movieQueriesReducer,
  search: searchReducer,
  filter: filterReducer,
  moviePagination: moviePaginationReducer,
  favourites: favouritesReducer,
})

export type RootState = ReturnType<typeof rootReducer>
