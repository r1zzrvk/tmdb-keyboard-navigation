import { useEffect, useState } from "react"

/**
 * Get the current pathname
 */
export function usePathname() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  // Listen to route changes
  useEffect(() => {
    const updatePathname = () => {
      setPathname(window.location.pathname)
    }

    // Listen to back/forward buttons
    window.addEventListener('popstate', updatePathname)

    // Patch history.pushState and history.replaceState to catch programmatic navigations
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function (...args) {
      originalPushState.apply(history, args)
      updatePathname()
    }

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args)
      updatePathname()
    }

    return () => {
      window.removeEventListener('popstate', updatePathname)
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  return pathname
}
