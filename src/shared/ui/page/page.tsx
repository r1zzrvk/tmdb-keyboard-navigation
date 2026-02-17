import { Box } from '@mantine/core'
import { memo } from 'react'

export const Page = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <Box p="md" style={{ overflow: 'hidden', height: '100vh' }}>
      {children}
    </Box>
  )
})
