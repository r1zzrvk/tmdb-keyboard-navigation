import { createBrowserRouter, RouterProvider as BaseRouterProvider, Navigate } from 'react-router-dom'
import type { FC } from 'react'
import { RoutePaths } from '@/shared/constants'
import { HomePage } from '@/pages/home'

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
    // TODO: Add page
    element: <div>Movie Details</div>,
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
