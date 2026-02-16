import { Group, Stack } from "@mantine/core"
import { filterActions, filters, selectActiveFilter, type FilterId } from "../../model"
import { FilterButton } from "../filter-button"
import { useDispatch, useSelector } from "react-redux"
import { searchActions, SearchInput, selectSearchQuery } from "@/entities/search"
import { useCallback } from "react"

export const Filters = () => {
  const dispatch = useDispatch()
  const active = useSelector(selectActiveFilter)
  const query = useSelector(selectSearchQuery)

  const handleFilterClick = useCallback((filter: FilterId) => {
    dispatch(filterActions.filterActivated(filter))
  }, [dispatch])

  const handleSearchChange = useCallback((value: string) => {
    dispatch(searchActions.searchQueryChanged(value))
  }, [dispatch])

  const handleFilterFocus = useCallback((filter: FilterId) => {
    dispatch(filterActions.filterFocused(filter))
  }, [dispatch])

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
            onFocus={() => handleFilterFocus(id)}
          />
        ))}
      </Group>
    </Stack>
  )
}
