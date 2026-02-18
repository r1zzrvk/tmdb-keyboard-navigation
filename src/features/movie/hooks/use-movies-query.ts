import { selectActiveFilter } from "@/entities/filter"
import { selectMoviePage, selectMovieQuery, selectMovies } from "@/entities/movie"
import { selectSearchQuery } from "@/entities/search"
import { useDispatch, useSelector } from "react-redux"
import { getKey } from "../model"

import { favouritesActions, selectFavourites } from "@/entities/favourites"
import { useEffect, useMemo } from "react"
import type { Movie } from "@/entities/movie"

// Empty array constant to avoid creating new array on each call
const EMPTY_ARRAY: Movie[] = []

/**
 * Load movies
 */
export const useMoviesQuery = () => {
  const dispatch = useDispatch()
  const active = useSelector(selectActiveFilter)
  const searchQuery = useSelector(selectSearchQuery)
  const page = useSelector(selectMoviePage)

  const key = useMemo(() => getKey(active, page, searchQuery), [active, page, searchQuery])
  const movies = useSelector(selectMovies(key ?? ''))
  const queryState = useSelector(selectMovieQuery(key ?? ''))
  const favouritesFromStore = useSelector(selectFavourites)
  const favourites = useMemo(
    () => active === 'favorites' ? favouritesFromStore : EMPTY_ARRAY,
    [active, favouritesFromStore]
  )
  useEffect(() => {
    if (active === 'favorites') {
      dispatch(favouritesActions.loadFavoriteMovies())
    }
  }, [dispatch, active])

  // If there's a search query but no queryState yet, we're in a loading state
  const isSearchLoading = searchQuery.trim().length >= 2 && !queryState && movies.length === 0

  // Don't return favourites if there's an active search query
  const shouldShowFavourites = active === 'favorites' && searchQuery.trim().length < 2

  return {
    data: shouldShowFavourites ? favourites : movies,
    error: queryState?.error,
    loading: queryState?.status === 'loading' || isSearchLoading,
    totalPages: queryState?.totalPages,
    page: queryState?.page,
  }
}
