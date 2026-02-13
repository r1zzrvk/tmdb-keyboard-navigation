import '@mantine/core/styles.css'

import { MantineProvider as BaseMantineProvider } from '@mantine/core'
import type { FC } from 'react'

interface MantineProviderProps {
  children: React.ReactNode
}

export const MantineProvider: FC<MantineProviderProps> = ({ children }) => {
  return <BaseMantineProvider defaultColorScheme="light">{children}</BaseMantineProvider>
}
