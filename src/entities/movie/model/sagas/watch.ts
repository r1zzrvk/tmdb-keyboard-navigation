import { takeLatest, debounce, type Effect, takeLeading } from "redux-saga/effects"
import { loadPopularWorker, loadNowPlayingWorker, loadSearchWorker, loadDetailsWorker, handleFilterFocused, handleSearchQueryChanged, handleFilterActivated, handlePageChanged } from "./workers"
import { filterActions } from "@/entities/filter"
import { searchActions } from "@/entities/search"
import { paginationActions } from "../store"
import { SEARCH_DEBOUNCE_TIME } from "../constants"

export function* watchMovie(): Generator<Effect, void, unknown> {
  yield takeLeading('movies/loadPopular', loadPopularWorker)
  yield takeLeading('movies/loadNowPlaying', loadNowPlayingWorker)
  yield takeLeading('movies/loadSearch', loadSearchWorker)
  yield takeLeading('movies/loadDetails', loadDetailsWorker)

  yield takeLatest(filterActions.filterFocused.type, handleFilterFocused)
  yield takeLatest(filterActions.filterActivated.type, handleFilterActivated)
  yield takeLatest(paginationActions.setPage.type, handlePageChanged)
  yield takeLatest(paginationActions.nextPage.type, handlePageChanged)
  yield takeLatest(paginationActions.prevPage.type, handlePageChanged)
  yield debounce(SEARCH_DEBOUNCE_TIME, searchActions.searchQueryChanged.type, handleSearchQueryChanged)
}
