import { Button } from "@mantine/core"
import type { FC } from "react"
import type { PaginatorButtonProps } from "../../model"
import { useNavigationItem } from "@/shared/lib"

export const PaginatorButton: FC<PaginatorButtonProps> = ({
  id,
  order,
  label,
  disabled,
  onClick,
}) => {
  const { ref } = useNavigationItem<HTMLButtonElement>({
    id: `paginator_button_${id}`,
    zoneId: 'pagination',
    order,
    onEnter: () => {
      if (!disabled) {
        onClick()
      }
    },
  })

  return (
    <Button ref={ref} tabIndex={-1} variant="light" disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  )
}
