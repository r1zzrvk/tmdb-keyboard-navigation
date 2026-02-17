import { Filters } from '@/entities/filter'
import { MovieList } from '@/features/movie'
import { Page } from '@/shared/ui'

export function HomePage() {
  return (
    <Page>
      <Filters />
      <MovieList />
    </Page>
  )
}
