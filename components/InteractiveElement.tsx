'use client'

import { ReactNode } from 'react'

// Generic props type for any element
// T is the element type (e.g., 'div', 'svg', etc.)
type InteractiveElementProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
  as?: T
  children: ReactNode
  className?: string
  onClick?: () => void
} & JSX.IntrinsicElements[T]

export default function InteractiveElement<T extends keyof JSX.IntrinsicElements = 'div'>({
  as,
  children,
  className = '',
  onClick,
  ...props
}: InteractiveElementProps<T>) {
  const Component = as || 'div'
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