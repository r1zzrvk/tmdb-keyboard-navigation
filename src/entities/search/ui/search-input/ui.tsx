import { useNavigationItem } from "@/shared/lib"
import { TextInput } from "@mantine/core"
import type { FC } from "react"
import { memo, useCallback } from "react"
import type { SearchInputProps } from "../../model"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

export const SearchInput: FC<SearchInputProps> = memo(({ value, onChange, onFocus, onBlur }) => {
  const handleEnter = useCallback(() => {
    onChange(value)
  }, [onChange, value])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)
  }, [onChange])

  const handleFocus = useCallback(() => {
    onFocus?.()
  }, [onFocus])

  const handleBlur = useCallback(() => {
    onBlur?.()
  }, [onBlur])

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
    size="xl"
    variant="filled"
    leftSection={<MagnifyingGlassIcon size={32} weight="bold" />}
    onChange={handleChange}
    onFocus={handleFocus}
    onBlur={handleBlur}
    style={{ flex: 1 }}
  />
})
