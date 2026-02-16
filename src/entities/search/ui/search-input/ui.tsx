import { useNavigationItem } from "@/shared/lib"
import { TextInput } from "@mantine/core"
import type { FC } from "react"
import { memo, useCallback } from "react"
import type { SearchInputProps } from "../../model"

export const SearchInput: FC<SearchInputProps> = memo(({ value, onChange }) => {
  const handleEnter = useCallback(() => {
    onChange(value)
  }, [onChange, value])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)
  }, [onChange])

  const { ref } = useNavigationItem<HTMLInputElement>({
    id: 'search',
    zoneId: 'search',
    order: 0,
    onEnter: handleEnter,
  })

  return <TextInput
    ref={ref}
    tabIndex={-1}
    placeholder="Search"
    value={value}
    onChange={handleChange}
    style={{ flex: 1 }}
  />
})
