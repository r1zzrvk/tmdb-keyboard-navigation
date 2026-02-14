import type { FC } from "react"
import type { FilterButtonProps } from "../../model"
import { Button } from "@mantine/core"

export const FilterButton: FC<FilterButtonProps> = ({ id, active, label, onClick }) => {
  return (
    <Button
      tabIndex={-1}
      variant={active ? 'filled' : 'light'}
      onClick={() => onClick(id)}>
      {label}
    </Button>
  )
}
