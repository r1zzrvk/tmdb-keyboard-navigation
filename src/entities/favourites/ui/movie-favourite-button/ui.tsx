import { useNavigationItem } from "@/shared/lib"
import { Button } from "@mantine/core"
import { useCallback, useMemo, type FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { favouritesActions, selectFavourites, type MovieFavouriteButtonProps } from "../../model"

export const MovieFavouriteButton: FC<MovieFavouriteButtonProps> = ({ movie }) => {
  const dispatch = useDispatch()
  const favourites = useSelector(selectFavourites)
  const isFavourite = useMemo(() => favourites.some(favMovie => favMovie.id === movie.id), [favourites, movie.id])

  const handleClick = useCallback(() => {
    dispatch(favouritesActions.toggleFavorite(movie))
  }, [dispatch, movie])

  const handleBack = useCallback(() => {
    window.history.back()
  }, [])

  const handleEnter = useCallback(() => {
    handleClick()
  }, [handleClick])

  const { ref } = useNavigationItem<HTMLButtonElement>({
    id: 'details_fav',
    zoneId: 'favourites',
    order: 0,
    onEnter: handleEnter,
    onEscape: handleBack,
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
