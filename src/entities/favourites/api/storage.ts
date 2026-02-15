import type { Movie } from "@/entities/movie"
import { FAVORITES_STORAGE_KEY } from "../model"

export function loadFavoriteMovies(): Movie[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)

    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)

    return Array.isArray(parsed) ? parsed.filter(x => Number.isFinite(x)) : []
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
