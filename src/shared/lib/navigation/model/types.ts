import { type RefObject } from 'react'

export type ZoneId = 'search' | 'filters' | 'grid' | 'pagination' | 'favourites' | 'back-button'
export type PageId = 'home' | 'movie-details'
export type NavigationItemId = string

export type NavigationItem<T extends HTMLElement = HTMLElement> = {
  id: NavigationItemId
  zoneId: ZoneId
  order: number // for grid: row*4+col
  ref: RefObject<T | null>
  onEnter?: () => void
  onEscape?: () => void
}

export type NavigationEngineConfig = {
  columnsByZone?: Record<ZoneId, number>
  onZoneEscape?: (zoneId: ZoneId) => void
  pageZones?: Record<PageId, ZoneId[]>
}

export type NavigationState = {
  activeZoneId: ZoneId | undefined
  activeItemId?: NavigationItemId
  currentPage?: PageId
}

export type NavigationArrowKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown'

export interface NavigationContextValue {
  register: <T extends HTMLElement>(item: NavigationItem<T>) => void
  unregister: (zoneId: ZoneId, id: string) => void
  focus: (zoneId: ZoneId, itemId?: string) => void
  setPage: (pageId: PageId) => void
  getActiveZoneId: () => ZoneId | undefined
}
