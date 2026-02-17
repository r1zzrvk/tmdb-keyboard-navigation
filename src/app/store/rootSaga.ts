import { watchMovie } from '@/entities/movie'
import { watchFavourites } from '@/entities/favourites'
import { all, fork } from 'redux-saga/effects'

export function* rootSaga() {
  yield all([fork(watchMovie), fork(watchFavourites)])
}
