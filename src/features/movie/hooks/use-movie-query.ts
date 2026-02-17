import { makeKey, moviesApiActions, selectMovieById, selectMovieQuery } from "@/entities/movie"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

/**
 * Load movie details
 */
export const useMovieQuery = (id: number) => {
  const dispatch = useDispatch()
  const movie = useSelector(selectMovieById(id))
  const detailsKey = useMemo(() => makeKey('details', { id }), [id])
  const queryState = useSelector(selectMovieQuery(detailsKey))

  useEffect(() => {
    if (Number.isFinite(id) && id > 0) {
      dispatch(moviesApiActions.loadDetails(id))
    }
  }, [dispatch, id])

  return {
    data: movie,
    error: queryState?.error,
    loading: queryState?.status === 'loading',
  }
}
