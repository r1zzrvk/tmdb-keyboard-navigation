import { useFocusRing } from "@/shared/hooks"
import { useNavigationItem } from "@/shared/lib"
import { Button } from "@mantine/core"
import { ArrowLeftIcon } from "@phosphor-icons/react"
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

  useFocusRing(ref)

  return (
    <Button
      ref={ref}
      tabIndex={-1}
      size="lg"
      variant="default"
      leftSection={<ArrowLeftIcon size={24} weight="bold" />}
      onClick={handleBack}>
      Back
    </Button>
  )
})
