import { useNavigationItem } from "@/shared/lib"
import { Button } from "@mantine/core"
import type { FC } from "react"
import { memo, useCallback } from "react"

export const MovieBackButton: FC = memo(() => {
  const handleBack = useCallback(() => {
    window.history.back()
  }, [])

  const { ref } = useNavigationItem<HTMLButtonElement>({
    id: 'details_back',
    zoneId: 'back-button',
    order: 0,
    onEnter: handleBack,
    onEscape: handleBack,
  })

  return (
    <Button
      ref={ref}
      tabIndex={-1}
      onClick={handleBack}>
      Back
    </Button>
  )
})
