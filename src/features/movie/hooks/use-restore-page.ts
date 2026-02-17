import { paginationActions } from "@/entities/movie"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"

/**
 * Restore page from search params
 */
export const useRestorePage = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const hasRestoredState = useRef(false)

  useEffect(() => {
    if (hasRestoredState.current) return

    const pageParam = searchParams.get('page')
    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10)
      if (!isNaN(pageNumber) && pageNumber > 0) {
        dispatch(paginationActions.setPage(pageNumber))
      }
    }

    hasRestoredState.current = true
  }, [dispatch, searchParams])
}
