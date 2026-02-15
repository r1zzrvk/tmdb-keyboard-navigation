import { takeLatest, debounce, type Effect } from "redux-saga/effects"
import { loadPopularWorker, loadNowPlayingWorker, loadSearchWorker, loadDetailsWorker, filterActivatedWorker, filterFocusedWorker, searchQueryChangedWorker } from "./workers"
import { filterActions } from "@/entities/filter"
import { searchActions } from "@/entities/search"

export function* watchMovie(): Generator<Effect, void, unknown> {
  yield takeLatest('movies/loadPopular', loadPopularWorker)
  yield takeLatest('movies/loadNowPlaying', loadNowPlayingWorker)
  yield takeLatest('movies/loadSearch', loadSearchWorker)
  yield takeLatest('movies/loadDetails', loadDetailsWorker)

  yield takeLatest(filterActions.filterActivated.type, filterActivatedWorker)
  yield takeLatest(filterActions.filterFocused.type, filterFocusedWorker)
  yield debounce(500, searchActions.searchQueryChanged.type, searchQueryChangedWorker)
}
