import { MantineProvider } from './providers/MantineProvider'
import { RouterProvider } from './providers/RouterProvider'
import { StoreProvider } from './providers/StoreProvider'

export const App = () => {
  return (
    <StoreProvider>
      <MantineProvider>
        <RouterProvider />
      </MantineProvider>
    </StoreProvider>
  )
}
