import { useEffect, type FC } from "react"
import type { MovieDetailsProps } from "../../model"
import { useMovieQuery } from "../../hooks"
import { Center, Loader, Stack, Text, Title } from "@mantine/core"
import { MovieBackButton, MovieFavouriteButton } from "@/entities/movie"

export const MovieDetails: FC<MovieDetailsProps> = ({ id }) => {
  const { data: movie, error, loading } = useMovieQuery(id)

  useEffect(() => {
    document.title = movie ? `${movie.title} - Movie Details` : 'Movie Details'
  }, [movie])

  // TODO: add loading component
  if (loading) {
    return (
      <Center h="50vh">
        <Loader size="lg" />
      </Center>
    )
  }

  // TODO: add error handling
  if (error) {
    return null
  }

  return (
    <div>
      <Stack>
        <MovieBackButton />
        <MovieFavouriteButton />
      </Stack>
      {movie ? (
        <>
          <Title order={2}>{movie.title}</Title>
          <Text c="dimmed" mt="sm">
            {movie.releaseDate ?? 'Unknown release date'}
          </Text>
          <Text mt="md">{movie.overview ?? 'No overview'}</Text>
        </>
      ) : (
        <Text c="dimmed">Movie not found</Text>
      )}
    </div>
  )
}
