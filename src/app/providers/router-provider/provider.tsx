import { createBrowserRouter, RouterProvider as BaseRouterProvider, Navigate } from 'react-router-dom'
import type { FC } from 'react'
import { RoutePaths } from '@/shared/constants'
import { HomePage } from '@/pages/home'
import { MovieDetailsPage } from '@/pages/movie-details'

const router = createBrowserRouter([
  {
    path: RoutePaths.Home,
    element: <HomePage />,
    loader: () => {
      // TODO: Add loader
      return {
        title: 'Movies',
      }
    },
  },
  {
    path: RoutePaths.MovieDetails,
    element: <MovieDetailsPage />,
    loader: ({ params }) => {
      // TODO: Add loader
      return {
        title: `Movie ${params.id}`,
      }
    },
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export const RouterProvider: FC = () => {
  return <BaseRouterProvider router={router} />
}
