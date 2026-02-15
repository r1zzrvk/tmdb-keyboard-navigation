import type { FilterId } from "@/entities/filter"
import { makeKey } from "@/entities/movie"

export const getKey = (active: FilterId, page: number, query: string): string | null => {
  if (query.trim().length >= 2) {
    return makeKey('search', { page, query: query.trim() })
  }

  if (active === 'popular') {
    return makeKey('popular', { page })
  }

  if (active === 'now_playing') {
    return makeKey('now_playing', { page })
  }

  return null // favorites
}

export const getOrder = (index: number, cols: number) => {
  const row = Math.floor(index / cols)
  const col = index % cols
  return row * cols + col
}
