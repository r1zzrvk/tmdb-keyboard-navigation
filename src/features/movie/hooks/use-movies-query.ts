import { selectActiveFilter } from "@/entities/filter"
import { selectSearchQuery } from "@/entities/search"
import { useDispatch, useSelector } from "react-redux"
import { getKey } from "../model"
import { moviesApiActions, paginationActions, selectMoviePage, selectMovieQuery, selectMovies } from "@/entities/movie"

import { useEffect } from "react"
import { selectFavourites } from "@/entities/favourites"

export const useMoviesQuery = () => {
  const dispatch = useDispatch()
  const active = useSelector(selectActiveFilter)
  const searchQuery = useSelector(selectSearchQuery)
  const page = useSelector(selectMoviePage)

  const key = getKey(active, page, searchQuery)
  const movies = useSelector(selectMovies(key ?? ''))
  const queryState = useSelector(selectMovieQuery(key ?? ''))
  const favourites = useSelector(selectFavourites)

  useEffect(() => {
    dispatch(paginationActions.resetPage())
  }, [dispatch, active, searchQuery])

  useEffect(() => {
    if (active === 'favorites') return

    if (active === 'popular') {
      dispatch(moviesApiActions.loadPopular(page))
    } else if (active === 'now_playing') {
      dispatch(moviesApiActions.loadNowPlaying(page))
    }
  }, [dispatch, active, page])

  return {
    data: active === 'favorites' ? favourites : movies,
    error: queryState?.error,
    loading: queryState?.status === 'loading',
    totalPages: queryState?.totalPages,
    page: queryState?.page,
  }
}
