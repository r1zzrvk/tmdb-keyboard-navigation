import { moviesApiActions } from '@/entities/movie'
import { Filters } from '@/entities/filter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function HomePage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(moviesApiActions.loadPopular(1))
  }, [dispatch])

  return (
    <div>
      <Filters />
    </div>
  )
}
