import { imageBaseUrl, imageSizes } from '@/shared/constants'
import { useFocusRing } from '@/shared/hooks'
import { useNavigationItem } from '@/shared/lib'
import { Card, Image, Text } from '@mantine/core'
import type { FC } from 'react'
import { memo, useCallback, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { selectMoviePage, type MovieCardProps } from '../../model'
import { useSelector } from 'react-redux'

export const MovieCard: FC<MovieCardProps> = memo(({ posterPath, id, title, overview, order }) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = useSelector(selectMoviePage)

  const saveStateToListUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.set("activeItem", `movie_${id}`)
    params.set("page", page.toString())

    setSearchParams(params, { replace: true })
  }, [searchParams, setSearchParams, id, page])

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

  const img = useMemo(() =>
    posterPath ? `${imageBaseUrl}${imageSizes.xl}${posterPath}` : undefined,
    [posterPath]
  )

  const emptyDivStyle = useMemo(() => ({ height: 180 }), [])

  return (
    <Card ref={ref} tabIndex={-1} withBorder onFocus={saveStateToListUrl}>
      {img ? <Image src={img} height={180} alt={title} /> : <div style={emptyDivStyle} />}
      <Text fw={600} mt="sm" lineClamp={2}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lineClamp={3}>
        {overview ?? 'No overview'}
      </Text>
    </Card>
  )
})
