import type { Movie } from "@/entities/movie"
import { NavigationContext } from "@/shared/lib"
import { useContext, useEffect } from "react"

// TODO: fix bug with autofocus when typing in search input
export const useAutofocus = (loading: boolean, movies: Movie[], page?: number) => {
  const navigationContext = useContext(NavigationContext)

  // Auto-focus on grid when page changes and data is loaded
  useEffect(() => {
    if (!loading && movies.length > 0 && page && navigationContext) {
      // Use requestAnimationFrame to ensure DOM elements are registered after render
      const rafId = requestAnimationFrame(() => {
        navigationContext.focus('grid')
      })
      return () => cancelAnimationFrame(rafId)
    }
  }, [page, loading, movies.length, navigationContext]) // Trigger when page changes or data loads
}
