import { Center, Text } from '@mantine/core'
import { memo } from 'react'

interface ErrorProps {
  message?: string
}

export const Error = memo(({ message }: ErrorProps) => (
  <Center h="70vh">
    <Text c="red" size="lg">
      {message ?? 'Something went wrong'}
    </Text>
  </Center>
))
