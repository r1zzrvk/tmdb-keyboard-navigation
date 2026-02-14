import type { RootState } from "@/app"

export const selectSearchQuery = (state: RootState) => state.search.query
