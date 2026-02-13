import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { QueryKey, QueryState, MovieId } from '../types'

type QueriesState = {
  byKey: Record<QueryKey, QueryState>
}

const initialState: QueriesState = { byKey: {} }

/**
 * Creates a slice for the movie queries.
 * @param name - The name of the slice
 * @param initialState - The initial state of the slice
 * @param reducers - The reducers of the slice
 * @returns The slice
 */
export const movieQueriesSlice = createSlice({
  name: 'movieQueries',
  initialState,
  reducers: {
    /**
     * Called when a request to the API starts.
     * Sets the status to 'loading' and clears the error (if any).
     * Saves the previous data (ids), if any - this allows displaying
     * old data while loading new data.
     */
    queryStarted(state, action: PayloadAction<{ key: QueryKey }>) {
      const prev = state.byKey[action.payload.key]
      state.byKey[action.payload.key] = {
        ...(prev ?? { status: 'idle', ids: [] }),
        status: 'loading',
        error: undefined,
      }
    },
    /**
     * Called when a request to the API succeeds.
     * Saves the status to 'success', the array of movie IDs (links to data in moviesSlice),
     * pagination metadata and timestamp to check the freshness of the data.
     *
     * Important: here only the IDs are saved, the movies are already saved in moviesSlice through moviesActions.upsertMany
     */
    querySucceeded(
      state,
      action: PayloadAction<{
        key: QueryKey
        ids: MovieId[]
        page: number
        totalPages: number
      }>,
    ) {
      state.byKey[action.payload.key] = {
        status: 'success',
        ids: action.payload.ids,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        fetchedAt: Date.now(),
      }
    },
    /**
     * Called when a request to the API fails.
     * Sets the status to 'error' and saves the error message.
     * Saves the previous ids (if any) - this allows displaying
     * the last successfully loaded data even when updating fails.
     */
    queryFailed(state, action: PayloadAction<{ key: QueryKey; error: string }>) {
      const prev = state.byKey[action.payload.key]
      state.byKey[action.payload.key] = {
        ...(prev ?? { status: 'idle', ids: [] }),
        status: 'error',
        error: action.payload.error,
      }
    },
  },
})

export const movieQueriesActions = movieQueriesSlice.actions
export const movieQueriesReducer = movieQueriesSlice.reducer
