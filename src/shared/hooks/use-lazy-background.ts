import { useEffect, useState, useRef } from 'react'

/**
 * Hook to load images lazily
 * @param src - The source of the image
 * @param rootMargin - The root margin of the image
 */
export const useLazyBackground = <T extends HTMLElement>(src: string, rootMargin = '50px') => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (!src || imageSrc) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start loading the image
            const img = new Image()
            img.onload = () => {
              setImageSrc(src)
              setIsLoaded(true)
            }
            img.onerror = () => {
              setIsLoaded(true) // Mark as loaded even on error
            }
            img.src = src
            observer.disconnect()
          }
        })
      },
      { rootMargin }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [src, imageSrc, rootMargin])

  return { imageSrc, isLoaded, elementRef }
}
