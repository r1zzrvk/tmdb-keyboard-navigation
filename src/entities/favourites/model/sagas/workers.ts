import type { Movie } from "@/entities/movie"
import { loadFavoriteMovies, saveFavoriteMovies } from "../../api"
import { put, select } from "redux-saga/effects"
import { favouritesActions, selectFavourites } from "../store"

export function* handleLoadFavorites() {
  const movies: Movie[] = loadFavoriteMovies()
  yield put(favouritesActions.setMovies(movies))
}

export function* handleSaveFavorites() {
  const movies: Movie[] = yield select(selectFavourites)
  saveFavoriteMovies(movies)
}
