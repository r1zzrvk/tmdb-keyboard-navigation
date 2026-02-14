import { MovieCard, moviesApiActions } from "@/entities/movie"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getKey } from "../../model"
import { selectActiveFilter } from "@/entities/filter"
import { selectSearchQuery } from "@/entities/search"
import { selectQueryMovies } from "@/entities/movie/model"
import { SimpleGrid } from "@mantine/core"

export const MovieList = () => {
  const dispatch = useDispatch()
  const active = useSelector(selectActiveFilter)
  const searchQuery = useSelector(selectSearchQuery)

  // TODO: Add pagination state
  const page = 1

  const key = getKey(active, page, searchQuery)
  const movies = useSelector(selectQueryMovies(key ?? ''))

  useEffect(() => {
    if (active === 'favorites') return // favorites не грузим через API

    if (searchQuery.trim().length >= 2) {
      dispatch(moviesApiActions.loadSearch(searchQuery.trim(), page))
    } else if (active === 'popular') {
      dispatch(moviesApiActions.loadPopular(page))
    } else if (active === 'now_playing') {
      dispatch(moviesApiActions.loadNowPlaying(page))
    }
  }, [dispatch, active, searchQuery, page])

  return (
    <div>
      <SimpleGrid cols={4}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </SimpleGrid>
    </div>
  )
}
