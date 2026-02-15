import { useContext, useEffect, useMemo, useRef } from 'react'

import type { NavigationItem } from '../model'
import { NavigationContext } from '../model'

/**
 * Hook to register a navigation item
 * @param item - Navigation item to register
 * @returns Ref to the DOM element
 */
export const useNavigationItem = <T extends HTMLElement>(item: Omit<NavigationItem<T>, 'ref'>) => {
  const context = useContext(NavigationContext)

  if (!context) {
    throw new Error('NavigationContext missing. useNavItem hook must be used within a NavigationContext provider.')
  }

  const ref = useRef<T>(null)
  const { id, zoneId, order, onEnter, onEscape } = item

  const full = useMemo<NavigationItem<T>>(
    () => ({ id, zoneId, order, ref, onEnter, onEscape }),
    [id, zoneId, order, onEnter, onEscape, ref]
  )

  useEffect(() => {
    context.register(full)

    return () => context.unregister(full.zoneId, full.id)
  }, [context, full])

  return { ref }
}
