import { Center, Loader } from '@mantine/core'
import { memo } from 'react'

export const PageLoader = memo(() => (
  <Center h="70vh">
    <Loader size="lg" />
  </Center>
))
