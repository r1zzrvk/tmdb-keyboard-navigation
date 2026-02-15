import type { RootState } from "@/app"

export const selectFavourites = (state: RootState) => state.favourites.movies
