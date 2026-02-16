import { MovieCard, paginationActions } from "@/entities/movie"
import { SimpleGrid } from "@mantine/core"
import { useAutofocus, useMoviesQuery } from "../../hooks"
import { Paginator, PageLoader, NoData, Error } from "@/shared/ui"
import { useDispatch } from "react-redux"
import { COLS, getOrder } from "../../model"
import { useEffect, useCallback, useMemo } from "react"

export const MovieList = () => {
  const dispatch = useDispatch()
  const { data: movies, error, loading, page, totalPages } = useMoviesQuery()

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

  const movieCards = useMemo(() =>
    movies.map((movie, index) => (
      <MovieCard key={movie.id} order={getOrder(index, COLS)} {...movie} />
    )),
    [movies]
  )

  if (loading && movies.length === 0) {
    return <PageLoader />
  }

  if (error) {
    return <Error message={error} />
  }

  if (movies.length === 0) {
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
