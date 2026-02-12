import { ReactNode } from 'react'
import { useCustomBackground } from '@/hooks/useCustomBackground'

interface BackgroundProps {
  children: ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  useCustomBackground('#custom-bg')

  return (
    <div id='custom-bg'>
      {children}
    </div>
  )
}
