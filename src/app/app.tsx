import { MantineProvider } from './providers/mantine-provider'
import { NavigationProvider } from './providers/navigation-provider'
import { RouterProvider } from './providers/router-provider'
import { StoreProvider } from './providers/store-provider'

export const App = () => {
  return (
    <StoreProvider>
      <MantineProvider>
        <NavigationProvider>
          <RouterProvider />
        </NavigationProvider>
      </MantineProvider>
    </StoreProvider>
  )
}
