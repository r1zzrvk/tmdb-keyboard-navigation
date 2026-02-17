import { createBrowserRouter, RouterProvider as BaseRouterProvider, Navigate } from 'react-router-dom'
import type { FC } from 'react'
import { Suspense, lazy } from 'react'
import { RoutePaths } from '@/shared/constants'
import { PageLoader } from '@/shared/ui'

const HomePage = lazy(() => import('@/pages/home').then(module => ({ default: module.HomePage })))
const MovieDetailsPage = lazy(() => import('@/pages/movie-details').then(module => ({ default: module.MovieDetailsPage })))

const router = createBrowserRouter([
  {
    path: RoutePaths.Home,
    element: (
      <Suspense fallback={<PageLoader />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: RoutePaths.MovieDetails,
    element: (
      <Suspense fallback={<PageLoader />}>
        <MovieDetailsPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export const RouterProvider: FC = () => {
  return <BaseRouterProvider router={router} />
}
