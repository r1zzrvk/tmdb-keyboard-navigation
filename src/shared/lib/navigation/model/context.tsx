import React from 'react'
import { createNavEngine } from '../engine'
import type { NavigationContextValue } from './types'

export const NavigationContext = React.createContext<NavigationContextValue | null>(null)

export function createNavigationContextValue() {
  const engine = createNavEngine({
    columnsByZone: {
      search: 1, // full width search
      filters: 3, // 3 filters options
      grid: 4, // 4 items in a grid
      pagination: 2, // 2 buttons
      details: 1, // favorite button
      // TODO: add back button to list
    },
  })

  const value: NavigationContextValue = {
    register: engine.register,
    unregister: engine.unregister,
    focus: engine.focus,
  }

  return { engine, value }
}
