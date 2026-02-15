import { RoutePaths } from '@/shared/constants'
import { createNavigationContextValue, NavigationContext, useDisableTab, useDisableWheel, usePathname } from '@/shared/lib'
import { useEffect, useMemo, type ReactNode } from 'react'

export function NavigationProvider({ children }: { children: ReactNode }) {
  const { engine, value } = useMemo(() => createNavigationContextValue(), [])

  const pathname = usePathname()

  useDisableTab()
  useDisableWheel()

  useEffect(() => {
    if (pathname === RoutePaths.Home) {
      engine.setPage('home')
    } else if (pathname.startsWith('/movie/')) {
      engine.setPage('movie-details')
    }
  }, [pathname, engine])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        return
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        engine.moveArrow(e.key)
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        engine.enter()
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        engine.escape()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [engine])

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}
