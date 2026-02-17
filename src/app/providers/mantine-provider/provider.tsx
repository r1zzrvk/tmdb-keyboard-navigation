import '@mantine/core/styles.css'

import { MantineProvider as BaseMantineProvider, createTheme } from '@mantine/core'
import type { FC } from 'react'

interface MantineProviderProps {
  children: React.ReactNode
}

const theme = createTheme({
  defaultRadius: "lg",
  primaryColor: "indigo"
})

export const MantineProvider: FC<MantineProviderProps> = ({ children }) => {
  return <BaseMantineProvider defaultColorScheme="dark" theme={theme}>{children}</BaseMantineProvider>
}
