import type { FC } from "react"
import type { FilterButtonProps } from "../../model"
import { Button } from "@mantine/core"
import { useNavigationItem } from "@/shared/lib"

export const FilterButton: FC<FilterButtonProps> = ({ id, active, order, label, onClick }) => {
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
    >
      {label}
    </Button>
  )
}
