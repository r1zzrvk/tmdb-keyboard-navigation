import { MantineProvider } from './providers/mantine-provider'
import { RouterProvider } from './providers/router-provider'
import { StoreProvider } from './providers/store-provider'

export const App = () => {
  return (
    <StoreProvider>
      <MantineProvider>
        <RouterProvider />
      </MantineProvider>
    </StoreProvider>
  )
}
