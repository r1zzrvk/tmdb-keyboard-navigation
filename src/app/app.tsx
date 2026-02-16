import { MantineProvider } from './providers/mantine-provider'
import { MobileDisableProvider } from './providers/mobile-disable-provider'
import { NavigationProvider } from './providers/navigation-provider'
import { RouterProvider } from './providers/router-provider'
import { StoreProvider } from './providers/store-provider'

export const App = () => {
  return (
    <StoreProvider>
      <MantineProvider>
        <MobileDisableProvider
          title="Application works only on desktop devices"
          message="Please use a device with a screen width of at least 1024px to work with the application."
        >
          <NavigationProvider>
            <RouterProvider />
          </NavigationProvider>
        </MobileDisableProvider>
      </MantineProvider>
    </StoreProvider>
  )
}
