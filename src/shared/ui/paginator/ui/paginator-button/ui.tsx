import { Button } from "@mantine/core"
import type { FC } from "react"
import type { PaginatorButtonProps } from "../../model"

export const PaginatorButton: FC<PaginatorButtonProps> = ({
  label,
  disabled,
  onClick,
}) => {
  return (
    <Button tabIndex={-1} variant="light" disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  )
}
