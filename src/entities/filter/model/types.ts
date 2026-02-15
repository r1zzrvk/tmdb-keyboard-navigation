export type FilterId = 'popular' | 'now_playing' | 'favorites'

export interface Filter {
  id: FilterId
  label: string
}

export interface FilterButtonProps extends Filter {
  active: boolean
  order: number
  onClick: (filter: FilterId) => void
}
