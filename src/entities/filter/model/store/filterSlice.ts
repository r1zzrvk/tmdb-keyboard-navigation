import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FilterId } from '../types'

type State = {
  active: FilterId
}

const initialState: State = { active: 'popular' }

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterActivated(state, action: PayloadAction<FilterId>) {
      state.active = action.payload
    },
  },
})

export const filterActions = filterSlice.actions
export const filterReducer = filterSlice.reducer
