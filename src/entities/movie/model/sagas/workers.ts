import type { ListRequestKind, TmdbMovie, TmdbPagedResponse } from "@/shared/types"
import { call, put, select, type Effect } from "redux-saga/effects"
import { makeKey, mapMovie } from "../utils"
import { selectMovieQuery } from "../store"
import { movieQueriesActions } from "../store/queriesSlice"
import { fetchMovieDetails, fetchNowPlaying, fetchPopular, searchMovies } from "@/shared/api"
import type { Movie, QueryState } from "../types"
import { moviesActions } from "../store/moviesSlice"
import type { LoadDetailsAction, LoadNowPlayingAction, LoadPopularAction, LoadSearchAction } from "../store"
import { MOVIE_CACHE_TTL } from "../constants"

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

    const movies: Movie[] = response.results.map(mapMovie)

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

  // TODO: add rate limiter
  yield put(movieQueriesActions.queryStarted({ key }))

  try {
    const response = (yield call(searchMovies, query, page)) as TmdbPagedResponse<TmdbMovie>

    const movies: Movie[] = response.results.map(mapMovie)

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
