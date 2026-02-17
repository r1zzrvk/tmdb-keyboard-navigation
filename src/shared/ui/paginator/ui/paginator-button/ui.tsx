import { Button } from "@mantine/core"
import type { FC } from "react"
import { memo, useCallback } from "react"
import type { PaginatorButtonProps } from "../../model"
import { useNavigationItem } from "@/shared/lib"

export const PaginatorButton: FC<PaginatorButtonProps> = memo(({
  id,
  order,
  label,
  disabled,
  onClick,
}) => {
  const handleEnter = useCallback(() => {
    if (!disabled) {
      onClick()
    }
  }, [disabled, onClick])

  const { ref } = useNavigationItem<HTMLButtonElement>({
    id: `paginator_button_${id}`,
    zoneId: 'pagination',
    order,
    onEnter: handleEnter,
  })

  return (
    <Button ref={ref} tabIndex={-1} variant="light" disabled={disabled} onClick={onClick} size="lg">
      {label}
    </Button>
  )
})
