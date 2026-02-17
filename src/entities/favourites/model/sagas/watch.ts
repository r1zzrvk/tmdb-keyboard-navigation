import { all, fork, takeEvery } from 'redux-saga/effects'
import { favouritesActions } from '../store'
import { handleLoadFavorites, handleSaveFavorites } from './workers'

export function* watchFavourites() {
  yield all([
    fork(handleLoadFavorites),
    takeEvery(favouritesActions.loadFavoriteMovies.type, handleLoadFavorites),
    takeEvery(favouritesActions.toggleFavorite.type, handleSaveFavorites),
  ])
}
