import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '@/entities/movie'

type State = { movies: Movie[] }

const initialState: State = { movies: [] }

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Movie>) {
      const exists = state.movies.some(movie => movie.id === action.payload.id)
      state.movies = exists
        ? state.movies.filter(movie => movie.id !== action.payload.id)
        : [...state.movies, action.payload]
    },
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload
    },
    loadFavoriteMovies() {
      // handled in saga
    }
  }
})

export const favouritesActions = favouritesSlice.actions
export const favouritesReducer = favouritesSlice.reducer
