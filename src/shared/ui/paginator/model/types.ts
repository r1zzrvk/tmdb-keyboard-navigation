export interface PaginatorButtonProps {
  id: string
  order: number
  label: string
  disabled: boolean
  onClick: () => void
}

export interface PaginatorProps {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}
