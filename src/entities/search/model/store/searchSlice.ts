import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type State = { query: string; focused: boolean }

const initialState: State = { query: '', focused: false }

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchQueryChanged(state, action: PayloadAction<string>) {
      state.query = action.payload
    },
    searchFocused(state) {
      state.focused = true
    },
    searchBlurred(state) {
      state.focused = false
    },
  },
})

export const searchActions = searchSlice.actions
export const searchReducer = searchSlice.reducer
