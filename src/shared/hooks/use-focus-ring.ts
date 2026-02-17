import { useEffect, type RefObject } from "react"
import { focusRing } from "../styles"

/**
 * Add focus ring to the element
 */
export const useFocusRing = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleFocus = () => {
      element.classList.add(focusRing.focusRing)
    }

    const handleBlur = () => {
      element.classList.remove(focusRing.focusRing)
    }

    element.addEventListener('focus', handleFocus)
    element.addEventListener('blur', handleBlur)

    return () => {
      element.removeEventListener('focus', handleFocus)
      element.removeEventListener('blur', handleBlur)
    }
  }, [ref])
}
