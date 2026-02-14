import type { RootState } from "@/app"

export const selectActiveFilter = (state: RootState) => state.filter.active
