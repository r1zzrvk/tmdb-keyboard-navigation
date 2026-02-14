import { Filters } from '@/entities/filter'
import { MovieList } from '@/features/movie'

export function HomePage() {
  return (
    <div>
      <Filters />
      <MovieList />
    </div>
  )
}
