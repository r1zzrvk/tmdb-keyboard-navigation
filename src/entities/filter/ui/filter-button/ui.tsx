import type { FC } from "react"
import { memo, useCallback } from "react"
import type { FilterButtonProps } from "../../model"
import { Button } from "@mantine/core"
import { useNavigationItem } from "@/shared/lib"
import { useFocusRing } from "@/shared/hooks"

export const FilterButton: FC<FilterButtonProps> = memo(({ id, active, order, label, onClick, onFocus, onBlur }) => {
  const handleClick = useCallback(() => {
    onClick(id)
  }, [onClick, id])

  const handleEnter = useCallback(() => {
    onClick(id)
  }, [onClick, id])

  const { ref } = useNavigationItem<HTMLButtonElement>({
    id: `filter_${id}`,
    zoneId: 'filters',
    order,
    onEnter: handleEnter,
  })

  useFocusRing(ref)

  return (
    <Button
      ref={ref}
      tabIndex={-1}
      variant={active ? 'filled' : 'light'}
      onFocus={onFocus}
      onClick={handleClick}
      onBlur={onBlur}
      size="lg"
    >
      {label}
    </Button>
  )
})
