import type { ListRequestKind, TmdbMovie, TmdbPagedResponse } from "@/shared/types"
import { call, put, select, delay, type Effect } from "redux-saga/effects"
import { makeKey, mapMovie } from "../utils"
import { paginationActions, selectMovieQuery, selectMoviePage } from "../store"
import { movieQueriesActions } from "../store/queriesSlice"
import { fetchMovieDetails, fetchNowPlaying, fetchPopular, searchMovies } from "@/shared/api"
import type { Movie, QueryState } from "../types"
import { moviesActions } from "../store/moviesSlice"
import type { LoadDetailsAction, LoadNowPlayingAction, LoadPopularAction, LoadSearchAction } from "../store"
import { FILTER_FOCUS_DELAY, MOVIE_CACHE_TTL, SEARCH_RATE_LIMIT, SEARCH_RATE_LIMIT_TIME } from "../constants"
import { filterActions, type FilterId } from "@/entities/filter"
import { selectFocusedFilter, selectActiveFilter } from "@/entities/filter/model/store"
import { searchActions, selectSearchQuery } from "@/entities/search"
import { moviesApiActions } from "../store"
import { createSlidingWindowRateLimiter } from "@/shared/lib"

const searchLimiter = createSlidingWindowRateLimiter(SEARCH_RATE_LIMIT, SEARCH_RATE_LIMIT_TIME)

/**
 * Loads a list of movies (popular or now_playing).
 * Checks the cache before making an API request (TTL 60 seconds).
 */
function* loadList(kind: ListRequestKind, page: number): Generator<Effect, void, unknown> {
  const key = makeKey(kind, { page })

  // Check if the data is already in the cache
  const existing = (yield select(selectMovieQuery(key))) as QueryState | undefined

  if (existing?.status === 'success' && existing.fetchedAt && Date.now() - existing.fetchedAt < MOVIE_CACHE_TTL) {
    return
  }
  yield put(movieQueriesActions.queryStarted({ key }))

  try {
    let response: TmdbPagedResponse<TmdbMovie>

    switch (kind) {
      case 'popular':
        response = (yield call(fetchPopular, page)) as TmdbPagedResponse<TmdbMovie>
        break
      case 'now_playing':
        response = (yield call(fetchNowPlaying, page)) as TmdbPagedResponse<TmdbMovie>
        break
    }

    const movies: Movie[] = (response.results || []).map(mapMovie)

    // Save the movies to the normalized store
    yield put(moviesActions.upsertMany(movies))

    // Save the query metadata to the query store
    yield put(
      movieQueriesActions.querySucceeded({
        key,
        ids: movies.map(x => x.id),
        page: response.page,
        totalPages: response.total_pages,
      }),
    )
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    // Save the query metadata to the query store
    yield put(
      movieQueriesActions.queryFailed({
        key,
        error: errorMessage,
      }),
    )
  }
}

/**
 * Loads the search results for movies.
 */

function* loadSearch(query: string, page: number): Generator<Effect, void, unknown> {
  const key = makeKey('search', { query, page })

  // Check if the data is already in the cache
  const existing = (yield select(selectMovieQuery(key))) as QueryState | undefined

  if (existing?.status === 'success' && existing.fetchedAt && Date.now() - existing.fetchedAt < MOVIE_CACHE_TTL) {
    return
  }

  yield call(searchLimiter)
  yield put(movieQueriesActions.queryStarted({ key }))

  try {
    const response = (yield call(searchMovies, query, page)) as TmdbPagedResponse<TmdbMovie>

    const movies: Movie[] = (response.results || []).map(mapMovie)

    // Save the movies to the normalized store
    yield put(moviesActions.upsertMany(movies))

    // Save the query metadata to the query store
    yield put(
      movieQueriesActions.querySucceeded({
        key,
        ids: movies.map(x => x.id),
        page: response.page,
        totalPages: response.total_pages,
      }),
    )
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    // Save the query metadata to the query store
    yield put(
      movieQueriesActions.queryFailed({
        key,
        error: errorMessage,
      }),
    )
  }
}

/**
   * Loads the details of a movie.
 */
function* loadDetails(id: number): Generator<Effect, void, unknown> {
  const key = makeKey('details', { id })

  // Check if the data is already in the cache
  const existing = (yield select(selectMovieQuery(key))) as QueryState | undefined

  if (existing?.status === 'success') {
    return
  }

  yield put(movieQueriesActions.queryStarted({ key }))

  try {
    const response = (yield call(fetchMovieDetails, id)) as TmdbMovie

    const movie: Movie = mapMovie(response)

    // Save the movie to the normalized store
    yield put(moviesActions.upsertOne(movie))

    // Save the query metadata to the query store
    yield put(
      movieQueriesActions.querySucceeded({
        key,
        ids: [movie.id],
        page: 1,
        totalPages: 1,
      }),
    )
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    // Save the query metadata to the query store
    yield put(
      movieQueriesActions.queryFailed({
        key,
        error: errorMessage,
      }),
    )
  }
}

export function* loadPopularWorker(action: LoadPopularAction): Generator<Effect, void, unknown> {
  yield* loadList('popular', action.payload.page)
}

export function* loadNowPlayingWorker(action: LoadNowPlayingAction): Generator<Effect, void, unknown> {
  yield* loadList('now_playing', action.payload.page)
}

export function* loadSearchWorker(action: LoadSearchAction): Generator<Effect, void, unknown> {
  yield* loadSearch(action.payload.query, action.payload.page)
}

export function* loadDetailsWorker(action: LoadDetailsAction): Generator<Effect, void, unknown> {
  yield* loadDetails(action.payload.id)
}

/**
 * Handles filter focus: delays 2s then activates and loads the filter.
 */
export function* handleFilterFocused(action: ReturnType<typeof filterActions.filterFocused>): Generator<Effect, void, unknown> {
  const filterId = action.payload

  yield delay(FILTER_FOCUS_DELAY)

  // Ensure still focused and not already activated
  const focused = (yield select(selectFocusedFilter)) as FilterId | undefined
  const active = (yield select(selectActiveFilter)) as FilterId

  if (focused !== filterId || active === filterId) {
    return
  }

  yield put(paginationActions.resetPage())
  yield put(filterActions.filterActivated(filterId))
}

/**
 * Handles search query changes: debounced search with minimum 2 characters.
 */
export function* handleSearchQueryChanged(action: ReturnType<typeof searchActions.searchQueryChanged>): Generator<Effect, void, unknown> {
  const query = action.payload.trim()

  if (query.length < 2) {
    return
  }

  yield put(paginationActions.resetPage())
  yield put(moviesApiActions.loadSearch(query, 1))
}

/**
 * Handles filter activation: loads movies for the activated filter.
 */
export function* handleFilterActivated(action: ReturnType<typeof filterActions.filterActivated>): Generator<Effect, void, unknown> {
  const filterId = action.payload

  // Clear search query if it exists (for all filters including favorites)
  const searchQuery = (yield select(selectSearchQuery)) as string
  if (searchQuery.trim().length > 0) {
    yield put(searchActions.searchQueryChanged(''))
  }

  if (filterId === 'favorites') {
    // Favorites handled separately
    return
  }

  yield put(paginationActions.resetPage())

  if (filterId === 'popular') {
    yield put(moviesApiActions.loadPopular(1))
  } else if (filterId === 'now_playing') {
    yield put(moviesApiActions.loadNowPlaying(1))
  }
}

/**
 * Handles page changes: loads movies for current filter/search with new page.
 */
export function* handlePageChanged(): Generator<Effect, void, unknown> {
  const active = (yield select(selectActiveFilter)) as FilterId
  const searchQuery = (yield select(selectSearchQuery)) as string
  const page = (yield select(selectMoviePage)) as number

  if (active === 'favorites') {
    // Favorites don't need page-based loading
    return
  }

  if (searchQuery.trim().length >= 2) {
    yield put(moviesApiActions.loadSearch(searchQuery, page))
  } else if (active === 'popular') {
    yield put(moviesApiActions.loadPopular(page))
  } else if (active === 'now_playing') {
    yield put(moviesApiActions.loadNowPlaying(page))
  }
}
