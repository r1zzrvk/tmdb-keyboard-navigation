import type { RootState } from "@/app"

export const selectSearchQuery = (state: RootState) => state.search.query

export const selectSearchFocused = (state: RootState) => state.search.focused
