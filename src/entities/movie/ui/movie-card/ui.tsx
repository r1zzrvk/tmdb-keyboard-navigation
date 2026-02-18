import { imageBaseUrl, imageSizes } from '@/shared/constants'
import { useFocusRing } from '@/shared/hooks'
import { useNavigationItem } from '@/shared/lib'
import { BackgroundImage, Box, Card, Text } from '@mantine/core'
import type { FC } from 'react'
import { memo, useCallback, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { selectMoviePage, type MovieCardProps } from '../../model'
import { useSelector } from 'react-redux'
import { selectFavourites } from '@/entities/favourites'
import { HeartIcon } from '@phosphor-icons/react'

export const MovieCard: FC<MovieCardProps> = memo(({ backdropPath, id, title, order, posterPath }) => {
  const navigate = useNavigate()
  const favourites = useSelector(selectFavourites)
  const isFavourite = useMemo(() => favourites.some(favMovie => favMovie.id === id), [favourites, id])
  const [searchParams, setSearchParams] = useSearchParams()
  const page = useSelector(selectMoviePage)

  const saveStateToListUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())

    setSearchParams(params, { replace: true })
  }, [searchParams, setSearchParams, page])

  const handleClick = useCallback(() => {
    navigate(`/movie/${id}`)
  }, [navigate, id])

  const { ref } = useNavigationItem<HTMLDivElement>({
    id: `movie_${id}`,
    zoneId: 'grid',
    order,
    onEnter: handleClick,
  })

  useFocusRing(ref)

  const img = useMemo(
    () =>
      posterPath
        ? `${imageBaseUrl}${imageSizes.xl}${posterPath}`
        : `${imageBaseUrl}${imageSizes.xl}${backdropPath}`,
    [backdropPath, posterPath]
  )

  return (
    <Card ref={ref} tabIndex={-1} onFocus={saveStateToListUrl}>
      <Card.Section>
        <BackgroundImage
          src={img || ''}
          p="sm"
          style={{
            aspectRatio: '2 / 3',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%)',
              pointerEvents: 'none',
            }}
          />

          <Box style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
            {isFavourite && (
              <Box p="xs" style={{
                alignSelf: 'flex-end',
                backgroundColor: 'var(--mantine-color-indigo-8)',
                borderRadius: 'var(--mantine-radius-lg)',
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <HeartIcon
                  size={32}
                  weight="fill"
                  color="white"
                />
              </Box>
            )}

            <Box style={{ flex: 1 }} />

            <Text fz="h3" fw={600} lineClamp={2}>
              {title}
            </Text>
          </Box>
        </BackgroundImage>
      </Card.Section>
    </Card >
  )
})
