import { useNavigationItem } from "@/shared/lib"
import { Button } from "@mantine/core"
import type { FC } from "react"
import { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const MovieBackButton: FC = memo(() => {
  const navigate = useNavigate()

  // TODO: Add page and focus saving
  const handleBack = useCallback(() => navigate('/'), [navigate])

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
