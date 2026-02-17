import { MovieFavouriteButton } from "@/entities/favourites"
import { MovieBackButton } from "@/entities/movie"
import { imageBaseUrl, imageSizes } from "@/shared/constants"
import { Error, NoData, PageLoader } from "@/shared/ui"
import { BackgroundImage, Badge, Box, Divider, Flex, Group, Image, Stack, Text, Title } from "@mantine/core"
import { StarIcon } from "@phosphor-icons/react"
import { memo, useEffect, type FC } from "react"
import { useMovieQuery } from "../../hooks"
import { getRuntime, type MovieDetailsProps } from "../../model"

export const MovieDetails: FC<MovieDetailsProps> = memo(({ id }) => {
  const { data: movie, error, loading } = useMovieQuery(id)

  useEffect(() => {
    document.title = movie ? `${movie.title} - Movie Details` : 'Movie Details'
  }, [movie])

  if (loading) {
    return <PageLoader />
  }

  if (error) {
    return <Error message={error} />
  }

  if (!movie) {
    return <NoData />
  }

  return (
    <BackgroundImage
      src={`${imageBaseUrl}${imageSizes.xl}${movie.backdropPath}`}
      style={{ position: 'relative' }}
      w="100vw"
      h="100vh"
    >
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          width: '100vw',
          height: '100vh',
        }}
      />
      <Box style={{
        position: 'relative', zIndex: 1, backdropFilter: 'blur(10px)', width: '100vw',
        height: '100vh',
      }} p="lg">
        <MovieBackButton />
        <Flex gap="lg" mt="md" align="flex-start" justify="flex-start">
          {/* Poster */}
          <Image
            radius="xl"
            h={450} w={300}
            src={`${imageBaseUrl}${imageSizes.xl}${movie.posterPath}`}
            alt={movie.title}
            loading="lazy"
          />
          <Stack gap={0}>
            {/* Title */}
            <Title order={2} m={0} c="white">
              {movie.title} {movie.releaseDate ? `(${movie.releaseDate.split('-')[0]})` : ''}
            </Title>
            {movie.tagline && (
              <Text size="md" c="gray.5">{movie.tagline}</Text>
            )}
            <Divider my="md" />

            {/* Genres */}
            {movie.genres?.length !== 0 && (
              <Group gap="xs" mb="md">
                {movie.genres?.map((genre) => (
                  <Badge key={genre.id} size="lg" color="gray.8">{genre.name}</Badge>
                ))}
              </Group>
            )}

            {/* Age Rating | Duration */}
            <Group mb={movie.adult || movie.runtime ? 'sm' : 0}>
              {movie.adult && (
                <Badge size="xl" variant="filled" color="indigo.9">18+</Badge>
              )}
              {movie.runtime && (
                <Text size="lg" c="white" >Duration: {getRuntime(movie.runtime)}</Text>
              )}
            </Group>

            {/* Vote Average */}
            {movie.voteAverage && movie.voteCount && (
              <Group gap="xs" mb={'sm'}>
                <StarIcon size={24} color="var(--mantine-color-yellow-6)" weight="fill" />
                <Text size="lg" c="white">{movie.voteAverage.toFixed(1)}</Text>
                <Text size="lg" c="white">({movie.voteCount} votes)</Text>
              </Group>
            )}

            {/* Favourite Button */}
            <Group mb="lg">
              <MovieFavouriteButton movie={movie} />
            </Group>

            {/* Overview */}
            {movie.overview && (
              <Text size="lg" c="white">{movie.overview}</Text>
            )}
          </Stack>
        </Flex>
      </Box >
    </BackgroundImage >
  )
})
