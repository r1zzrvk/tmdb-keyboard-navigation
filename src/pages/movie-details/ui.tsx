import { MovieDetails } from '@/features/movie'
import { Page } from '@/shared/ui'
import { useParams } from 'react-router-dom'

export function MovieDetailsPage() {
  const { id } = useParams()
  const movieId = Number(id)

  return (
    <Page>
      <MovieDetails id={movieId} />
    </Page>
  )
}
