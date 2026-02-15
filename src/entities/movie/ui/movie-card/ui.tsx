import { imageBaseUrl, imageSizes } from '@/shared/constants'
import { Card, Image, Text } from '@mantine/core'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MovieCardProps } from '../../model'
import { useNavigationItem } from '@/shared/lib'
import { useFocusRing } from '@/shared/hooks'

export const MovieCard: FC<MovieCardProps> = ({ posterPath, id, title, overview, order }) => {
  const navigate = useNavigate()
  const { ref } = useNavigationItem<HTMLDivElement>({
    id: `movie_${id}`,
    zoneId: 'grid',
    order,
    onEnter: () => handleClick(),
  })

  const handleClick = () => {
    navigate(`/movie/${id}`)
  }

  useFocusRing(ref)

  const img = posterPath ? `${imageBaseUrl}${imageSizes.xl}${posterPath}` : undefined

  return (
    <Card ref={ref} tabIndex={-1} withBorder>
      {img ? <Image src={img} height={180} alt={title} /> : <div style={{ height: 180 }} />}
      <Text fw={600} mt="sm" lineClamp={2}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lineClamp={3}>
        {overview ?? 'No overview'}
      </Text>
    </Card>
  )
}
