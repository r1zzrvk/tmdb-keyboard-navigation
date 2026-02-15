import { TextInput } from "@mantine/core"
import type { SearchInputProps } from "../../model"
import type { FC } from "react"
import { useNavigationItem } from "@/shared/lib"

export const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  const { ref } = useNavigationItem<HTMLInputElement>({
    id: 'search',
    zoneId: 'search',
    order: 0,
    onEnter: () => onChange(value),
  })

  return <TextInput
    ref={ref}
    tabIndex={-1}
    placeholder="Search"
    value={value}
    onChange={e => onChange(e.currentTarget.value)}
    style={{ flex: 1 }}
  />
}
