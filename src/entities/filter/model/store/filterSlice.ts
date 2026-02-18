import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FilterId } from '../types'

type State = {
  active: FilterId
  focused?: FilterId // For focus after 2s
}

const initialState: State = { active: 'popular' }

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterActivated(state, action: PayloadAction<FilterId>) {
      state.active = action.payload
    },
    filterSetActive(state, action: PayloadAction<FilterId>) {
      // Silent version that only changes state without triggering saga side effects
      state.active = action.payload
    },
    filterFocused(state, action: PayloadAction<FilterId>) {
      state.focused = action.payload
    },
    filterBlurred(state) {
      state.focused = undefined
    },
  },
})

export const filterActions = filterSlice.actions
export const filterReducer = filterSlice.reducer
