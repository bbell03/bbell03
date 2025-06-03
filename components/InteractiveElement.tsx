'use client'

import { ReactNode } from 'react'

interface InteractiveElementProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  onClick?: () => void
}

export default function InteractiveElement({
  children,
  className = '',
  as: Component = 'div',
  onClick,
  ...props
}: InteractiveElementProps) {
  return (
    <Component
      className={`interactive ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  )
} 