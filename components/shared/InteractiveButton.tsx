'use client'

import React from 'react'
import { useCursorInteraction } from '@/hooks/useCursorInteraction'

interface InteractiveButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function InteractiveButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false 
}: InteractiveButtonProps) {
  const buttonRef = useCursorInteraction({ 
    hoverScale: 1.3, 
    clickScale: 0.9, 
    disabled 
  })

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      disabled={disabled}
      className={`interactive ${className}`}
    >
      {children}
    </button>
  )
}

