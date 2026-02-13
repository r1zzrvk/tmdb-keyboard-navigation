import { takeLatest, type Effect } from "redux-saga/effects"
import { loadPopularWorker, loadNowPlayingWorker, loadSearchWorker, loadDetailsWorker } from "./workers"

export function* watchMovie(): Generator<Effect, void, unknown> {
  yield takeLatest('movies/loadPopular', loadPopularWorker)
  yield takeLatest('movies/loadNowPlaying', loadNowPlayingWorker)
  yield takeLatest('movies/loadSearch', loadSearchWorker)
  yield takeLatest('movies/loadDetails', loadDetailsWorker)
}
