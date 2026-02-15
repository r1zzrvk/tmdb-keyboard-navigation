import { useNavigationItem } from "@/shared/lib"
import { Button } from "@mantine/core"
import { useMemo, type FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { favouritesActions, selectFavourites, type MovieFavouriteButtonProps } from "../../model"

export const MovieFavouriteButton: FC<MovieFavouriteButtonProps> = ({ movie }) => {
  const dispatch = useDispatch()
  const favourites = useSelector(selectFavourites)
  const isFavourite = useMemo(() => favourites.find(favMovie => favMovie.id === movie.id), [favourites, movie])

  const handleClick = () => {
    dispatch(favouritesActions.toggleFavorite(movie))
  }

  const { ref } = useNavigationItem<HTMLButtonElement>({
    id: 'details_fav',
    zoneId: 'favourites',
    order: 0,
    onEnter: () => {
      handleClick()
    },
  })

  return (
    <Button
      ref={ref}
      tabIndex={-1}
      variant={isFavourite ? 'filled' : 'light'}
      onClick={handleClick}>
      {isFavourite ? 'Remove from favorites' : 'Add to favorites'}
    </Button>
  )
}
