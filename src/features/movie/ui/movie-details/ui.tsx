import { useEffect, memo, type FC } from "react"
import type { MovieDetailsProps } from "../../model"
import { useMovieQuery } from "../../hooks"
import { Stack, Text, Title } from "@mantine/core"
import { MovieBackButton } from "@/entities/movie"
import { NoData, PageLoader } from "@/shared/ui"
import { MovieFavouriteButton } from "@/entities/favourites"

export const MovieDetails: FC<MovieDetailsProps> = memo(({ id }) => {
  const { data: movie, error, loading } = useMovieQuery(id)

  useEffect(() => {
    document.title = movie ? `${movie.title} - Movie Details` : 'Movie Details'
  }, [movie])

  if (loading) {
    return <PageLoader />
  }

  // TODO: add error handling
  if (error) {
    return null
  }

  if (!movie) {
    return <NoData />
  }

  return (
    <div>
      <Stack>
        <MovieBackButton />
        <MovieFavouriteButton movie={movie} />
      </Stack>
      <Title order={2}>{movie.title}</Title>
      <Text c="dimmed" mt="sm">
        {movie.releaseDate ?? 'Unknown release date'}
      </Text>
      <Text mt="md">{movie.overview ?? 'No overview'}</Text>
    </div>
  )
})
