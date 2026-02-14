import { imageBaseUrl, imageSizes } from '@/shared/constants'
import { Card, Image, Text } from '@mantine/core'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MovieCardProps } from '../../model'

export const MovieCard: FC<MovieCardProps> = ({ posterPath, id, title, overview }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${id}`)
  }

  const img = posterPath ? `${imageBaseUrl}${imageSizes.xl}${posterPath}` : undefined

  return (
    <Card onClick={handleClick} tabIndex={-1} withBorder>
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
