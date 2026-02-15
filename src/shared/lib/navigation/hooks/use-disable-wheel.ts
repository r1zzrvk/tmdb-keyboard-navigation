import { useEffect } from 'react'

/**
 * Disable wheel navigation
 */
export const useDisableWheel = () => {
  useEffect(() => {
    const onWheel = (e: WheelEvent) => e.preventDefault()

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => window.removeEventListener('wheel', onWheel)
  }, [])
}
