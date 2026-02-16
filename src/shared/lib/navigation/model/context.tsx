import React from 'react'
import { createNavEngine } from '../engine'
import type { NavigationContextValue } from './types'

export const NavigationContext = React.createContext<NavigationContextValue | null>(null)

export function createNavigationContextValue() {
  const engine = createNavEngine({
    columnsByZone: {
      // Home page
      search: 1, // full width search
      filters: 3, // 3 filters options
      grid: 4, // 4 items in a grid
      pagination: 2, // 2 buttons

      // Movie details page
      favourites: 1, // favorite button
      'back-button': 1, // back button
    },
    pageZones: {
      'home': ['search', 'filters', 'grid', 'pagination'],
      'movie-details': ['back-button', 'favourites'],
    },
  })

  const value: NavigationContextValue = {
    register: engine.register,
    unregister: engine.unregister,
    focus: engine.focus,
    setPage: engine.setPage,
    getActiveZoneId: engine.getActiveZoneId,
  }

  return { engine, value }
}
