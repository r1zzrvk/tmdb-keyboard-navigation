import { selectActiveFilter } from "@/entities/filter"
import { moviesApiActions, selectMoviePage, selectMovieQuery, selectMovies } from "@/entities/movie"
import { selectSearchQuery } from "@/entities/search"
import { useDispatch, useSelector } from "react-redux"
import { getKey } from "../model"

import { favouritesActions, selectFavourites } from "@/entities/favourites"
import { useEffect, useMemo } from "react"

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
  const favourites = useSelector(selectFavourites)

  useEffect(() => {
    if (active === 'favorites') {
      dispatch(favouritesActions.loadFavoriteMovies())
      return
    }

    if (searchQuery.trim().length >= 2) {
      dispatch(moviesApiActions.loadSearch(searchQuery, page))
      return
    }

    if (active === 'popular') {
      dispatch(moviesApiActions.loadPopular(page))
    } else if (active === 'now_playing') {
      dispatch(moviesApiActions.loadNowPlaying(page))
    }
  }, [dispatch, active, page, searchQuery])

  // If there's a search query but no queryState yet, we're in a loading state
  const isSearchLoading = searchQuery.trim().length >= 2 && !queryState && movies.length === 0

  return {
    data: active === 'favorites' ? favourites : movies,
    error: queryState?.error,
    loading: queryState?.status === 'loading' || isSearchLoading,
    totalPages: queryState?.totalPages,
    page: queryState?.page,
  }
}
