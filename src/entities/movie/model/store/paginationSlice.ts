import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type State = {
  page: number
}

const initialState: State = { page: 1 }

export const moviePaginationSlice = createSlice({
  name: 'moviePagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    nextPage(state) {
      state.page += 1
    },
    prevPage(state) {
      state.page = Math.max(1, state.page - 1)
    },
    resetPage(state) {
      state.page = 1
    },
  },
})

export const paginationActions = moviePaginationSlice.actions
export const moviePaginationReducer = moviePaginationSlice.reducer
