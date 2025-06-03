'use client'

import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react'

// Generic props type for any element
// T is the element type (e.g., 'div', 'svg', etc.)
type InteractiveElementProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
  onClick?: () => void
} & ComponentPropsWithoutRef<T>

export default function InteractiveElement<T extends ElementType = 'div'>({
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