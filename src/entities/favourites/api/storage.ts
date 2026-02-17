import type { Movie } from "@/entities/movie"
import { FAVORITES_STORAGE_KEY } from "../model/constants"

export function loadFavoriteMovies(): Movie[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)

    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

    // Validate that each item is a valid Movie object
    return parsed.filter((x): x is Movie =>
      x &&
      typeof x === 'object' &&
      typeof x.id === 'number' &&
      typeof x.title === 'string'
    )
  } catch {
    return []
  }
}

export function saveFavoriteMovies(movies: Movie[]) {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(movies))
  } catch {
    // ignore
  }
}
