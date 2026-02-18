import { MovieCard, paginationActions } from "@/entities/movie"
import { Error, NoData, Paginator } from "@/shared/ui"
import { SimpleGrid, Skeleton } from "@mantine/core"
import { useCallback, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { useAutofocus, useMoviesQuery, useRestorePage } from "../../hooks"
import { COLS, getOrder } from "../../model"

export const MovieList = () => {
  const dispatch = useDispatch()
  const { data: movies, error, loading, page, totalPages } = useMoviesQuery()

  useRestorePage()
  useAutofocus(loading, movies, page)

  useEffect(() => {
    document.title = 'Movies'
  }, [])

  const handlePrev = useCallback(() => {
    dispatch(paginationActions.prevPage())
  }, [dispatch])

  const handleNext = useCallback(() => {
    dispatch(paginationActions.nextPage())
  }, [dispatch])

  const movieCards = useMemo(() => {

    if (loading && movies.length === 0) {
      return Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={`skeleton-${index}`} height={400} radius="lg" />
      ))
    }
    return movies.map((movie, index) => (
      <MovieCard key={movie.id} order={getOrder(index, COLS)} {...movie} />
    ))
  }, [movies, loading])

  if (error) {
    return <Error message={error} />
  }

  if (!loading && movies.length === 0) {
    return <NoData />
  }

  return (
    <div>
      <SimpleGrid cols={COLS}>
        {movieCards}
      </SimpleGrid>
      {totalPages && page && (
        <Paginator
          page={page}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  )
}
