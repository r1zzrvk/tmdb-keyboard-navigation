import { takeLatest, debounce, type Effect, takeLeading } from "redux-saga/effects"
import { loadPopularWorker, loadNowPlayingWorker, loadSearchWorker, loadDetailsWorker, filterFocusedWorker, searchQueryChangedWorker } from "./workers"
import { filterActions } from "@/entities/filter"
import { searchActions } from "@/entities/search"

export function* watchMovie(): Generator<Effect, void, unknown> {
  yield takeLeading('movies/loadPopular', loadPopularWorker)
  yield takeLeading('movies/loadNowPlaying', loadNowPlayingWorker)
  yield takeLeading('movies/loadSearch', loadSearchWorker)
  yield takeLeading('movies/loadDetails', loadDetailsWorker)

  yield takeLatest(filterActions.filterFocused.type, filterFocusedWorker)
  yield debounce(500, searchActions.searchQueryChanged.type, searchQueryChangedWorker)
}
