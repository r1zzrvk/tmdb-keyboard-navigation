import { MovieDetails } from '@/features/movie'
import { useParams } from 'react-router-dom'

export function MovieDetailsPage() {
  const { id } = useParams()
  const movieId = Number(id)

  return (
    <MovieDetails id={movieId} />
  )
}
