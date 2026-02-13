import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Movie, MovieId } from '../types'

type MoviesState = {
  byId: Record<MovieId, Movie>
}

const initialState: MoviesState = { byId: {} }

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    /**
     * Adds or updates multiple movies
     * Used when a list of movies is loaded
     * If the movie already exists, it will be updated
     */
    upsertMany(state, action: PayloadAction<Movie[]>) {
      for (const movie of action.payload) state.byId[movie.id] = movie
    },
    /**
       * Adds or updates one movie
       * Used when a details of one movie are loaded
     */
    upsertOne(state, action: PayloadAction<Movie>) {
      state.byId[action.payload.id] = action.payload
    },
  },
})

export const moviesActions = moviesSlice.actions
export const moviesReducer = moviesSlice.reducer
