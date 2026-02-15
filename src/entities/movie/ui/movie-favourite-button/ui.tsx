import { useNavigationItem } from "@/shared/lib"
import { Button } from "@mantine/core"
import type { FC } from "react"

export const MovieFavouriteButton: FC = () => {
  const { ref } = useNavigationItem<HTMLButtonElement>({
    id: 'details_fav',
    zoneId: 'favourites',
    order: 0,
    onEnter: () => {
      // TODO: Add favorite logic
    },
  })

  const handleClick = () => {
    // TODO: Add favorite logic
  }

  // TODO: Add favorite logic
  const isFav = false
  return (
    <Button
      ref={ref}
      tabIndex={-1}
      variant={isFav ? 'filled' : 'light'}
      onClick={handleClick}>
      {isFav ? 'Remove from favorites' : 'Add to favorites'}
    </Button>
  )
}
