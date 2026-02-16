import type { Movie } from "@/entities/movie"
import { selectSearchFocused } from "@/entities/search"
import { NavigationContext } from "@/shared/lib"
import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"

export const useAutofocus = (loading: boolean, movies: Movie[], page?: number) => {
  const navigationContext = useContext(NavigationContext)
  const searchFocused = useSelector(selectSearchFocused)

  // Auto-focus on grid when page changes and data is loaded
  useEffect(() => {
    if (!loading && movies.length > 0 && page && navigationContext && !searchFocused) {
      // Use requestAnimationFrame to ensure DOM elements are registered after render
      const rafId = requestAnimationFrame(() => {
        navigationContext.focus('grid')
      })
      return () => cancelAnimationFrame(rafId)
    }
  }, [page, loading, movies.length, navigationContext, searchFocused]) // Trigger when page changes or data loads
}
