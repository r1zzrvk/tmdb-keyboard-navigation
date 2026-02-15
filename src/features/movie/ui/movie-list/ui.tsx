import { MovieCard, paginationActions } from "@/entities/movie"
import { Center, Loader, SimpleGrid } from "@mantine/core"
import { useAutofocus, useMoviesQuery } from "../../hooks"
import { Paginator } from "@/shared/ui"
import { useDispatch } from "react-redux"
import { COLS, getOrder } from "../../model"

export const MovieList = () => {
  const dispatch = useDispatch()
  const { data: movies, error, loading, page, totalPages } = useMoviesQuery()

  useAutofocus(loading, movies, page)

  if (loading && movies.length === 0) {
    // TODO: add page loader component
    return <Center h="70vh"><Loader size="lg" /></Center>
  }

  if (error) {
    // TODO: add error handling
    return null
  }

  return (
    <div>
      <SimpleGrid cols={COLS}>
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} order={getOrder(index, COLS)} {...movie} />
        ))}
      </SimpleGrid>
      {totalPages && page && (
        <Paginator
          page={page}
          totalPages={totalPages}
          onPrev={() => dispatch(paginationActions.prevPage())}
          onNext={() => dispatch(paginationActions.nextPage())}
        />
      )}
    </div>
  )
}
