import { imageBaseUrl, imageSizes } from '@/shared/constants'
import { Card, Image, Text } from '@mantine/core'
import type { FC } from 'react'
import { memo, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MovieCardProps } from '../../model'
import { useNavigationItem } from '@/shared/lib'
import { useFocusRing } from '@/shared/hooks'

export const MovieCard: FC<MovieCardProps> = memo(({ posterPath, id, title, overview, order }) => {
  const navigate = useNavigate()

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
    <Card ref={ref} tabIndex={-1} withBorder>
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
