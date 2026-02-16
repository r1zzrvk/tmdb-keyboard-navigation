import { useMediaQuery } from '@mantine/hooks'
import type { FC, ReactNode } from 'react'
import { Banner } from '@/shared/ui'

interface MobileDisableProviderProps {
  children: ReactNode
  title?: string
  message?: string
}

export const MobileDisableProvider: FC<MobileDisableProviderProps> = ({
  children,
  title,
  message,
}) => {
  // Check if the screen is less than 1024px (1023px and less)
  const isMobile = useMediaQuery('(max-width: 1023px)')

  if (isMobile) {
    return <Banner title={title} message={message} />
  }

  return <>{children}</>
}
