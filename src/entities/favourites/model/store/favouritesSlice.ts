import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loadFavoriteMovies, saveFavoriteMovies } from '../../api'
import type { Movie } from '@/entities/movie'

type State = { movies: Movie[] }

const initialState: State = { movies: loadFavoriteMovies() }

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Movie>) {
      const isFavourite = state.movies.find(movie => movie.id === action.payload.id)

      if (isFavourite) {
        state.movies = state.movies.filter(movie => movie.id !== action.payload.id)
      }

      state.movies = [...state.movies, action.payload]

      saveFavoriteMovies(state.movies)
    },
  },
})

export const favouritesActions = favouritesSlice.actions
export const favouritesReducer = favouritesSlice.reducer
