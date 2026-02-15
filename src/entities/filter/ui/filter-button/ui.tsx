import type { FC } from "react"
import type { FilterButtonProps } from "../../model"
import { Button } from "@mantine/core"
import { useNavigationItem } from "@/shared/lib"

export const FilterButton: FC<FilterButtonProps> = ({ id, active, order, label, onClick, onFocus }) => {
  const { ref } = useNavigationItem<HTMLButtonElement>({
    id: `filter_${id}`,
    zoneId: 'filters',
    order,
    onEnter: () => onClick(id),
  })

  return (
    <Button
      ref={ref}
      tabIndex={-1}
      variant={active ? 'filled' : 'light'}
      onFocus={onFocus}
      onClick={() => onClick(id)}
    >
      {label}
    </Button>
  )
}
