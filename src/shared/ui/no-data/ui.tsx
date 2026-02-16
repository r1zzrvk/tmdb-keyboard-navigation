import { Center, Text } from '@mantine/core'
import { memo } from 'react'

export const NoData = memo(() => (
  <Center h="70vh">
    <Text c="dimmed" size="lg">
      Nothing was found
    </Text>
  </Center>
))
