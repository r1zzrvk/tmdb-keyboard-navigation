export interface PaginatorButtonProps {
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
