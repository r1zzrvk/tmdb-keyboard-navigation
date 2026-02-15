import { createNavigationContextValue, NavigationContext, useDisableTab, useDisableWheel } from '@/shared/lib'
import { useEffect, useMemo, type ReactNode } from 'react'

export function NavigationProvider({ children }: { children: ReactNode }) {
  const { engine, value } = useMemo(() => createNavigationContextValue(), [])

  useDisableTab()
  useDisableWheel()

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

  // Initial focus
  useEffect(() => {
    // Wait for elements to register
    const t = window.setTimeout(() => {
      engine.focus('search')
    }, 100)
    return () => window.clearTimeout(t)
  }, [engine])

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}
