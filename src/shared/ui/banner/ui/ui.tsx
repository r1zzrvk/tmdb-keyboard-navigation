import { Center, Container, Text, Title } from '@mantine/core'
import { memo, type FC } from 'react'
import type { BannerProps } from '../model'

export const Banner: FC<BannerProps> = memo(({ title, message }) => {
  return (
    <Center h="100vh" style={{ backgroundColor: 'var(--mantine-color-gray-9)' }}>
      <Container size="sm" ta="center">
        {title && (
          <Title order={1} mb="md">
            {title}
          </Title>
        )}
        {message && (
          <Text size="lg" c="dimmed">
            {message}
          </Text>
        )}
      </Container>
    </Center>
  )
})
