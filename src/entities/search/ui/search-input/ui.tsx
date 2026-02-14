import { TextInput } from "@mantine/core"
import type { SearchInputProps } from "../../model"
import type { FC } from "react"

export const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return <TextInput
    tabIndex={-1}
    placeholder="Search"
    value={value}
    onChange={e => onChange(e.currentTarget.value)}
    style={{ flex: 1 }}
  />
}
