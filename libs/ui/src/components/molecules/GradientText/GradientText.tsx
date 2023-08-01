import { ReactNode } from 'react'

export interface IGradientTextProps {
  children: ReactNode
  className?: string
}

export const GradientText = ({ children, className }: IGradientTextProps) => {
  return (
    <div
      className={` text-transparent bg-clip-text bg-gradient-to-tr from-gray-100 to-black ${className} `}
    >
      {children}
    </div>
  )
}
