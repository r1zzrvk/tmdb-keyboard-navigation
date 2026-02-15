import { useEffect } from 'react'

/**
 * Disable tab navigation
 */
export const useDisableTab = () => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') e.preventDefault()
    }

    window.addEventListener('keydown', onKeyDown, { capture: true })

    return () =>
      window.removeEventListener('keydown', onKeyDown, {
        capture: true,
      })
  }, [])
}
