import type { RootState } from "@/app"

export const selectActiveFilter = (state: RootState) => state.filter.active
export const selectFocusedFilter = (state: RootState) => state.filter.focused
