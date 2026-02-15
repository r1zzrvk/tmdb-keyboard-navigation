import { Group, Stack } from "@mantine/core"
import { filterActions, filters, selectActiveFilter, type FilterId } from "../../model"
import { FilterButton } from "../filter-button"
import { useDispatch, useSelector } from "react-redux"
import { searchActions, SearchInput, selectSearchQuery } from "@/entities/search"

export const Filters = () => {
  const dispatch = useDispatch()
  const active = useSelector(selectActiveFilter)
  const query = useSelector(selectSearchQuery)

  const handleFilterClick = (filter: FilterId) => {
    dispatch(filterActions.filterActivated(filter))
  }

  const handleSearchChange = (value: string) => {
    dispatch(searchActions.searchQueryChanged(value))
  }

  return (
    <Stack gap="sm" mb="md">
      <SearchInput value={query} onChange={handleSearchChange} />
      <Group gap="sm">
        {filters.map(({ id, label }, index) => (
          <FilterButton
            key={id}
            id={id}
            order={index}
            label={label}
            active={active === id}
            onClick={handleFilterClick}
          />
        ))}
      </Group>
    </Stack>
  )
}
