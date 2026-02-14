import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type State = { query: string }

const initialState: State = { query: '' }

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchQueryChanged(state, action: PayloadAction<string>) {
      state.query = action.payload
    },
  },
})

export const searchActions = searchSlice.actions
export const searchReducer = searchSlice.reducer
