'use client'

import { useRef, useEffect } from 'react'
import { useCursor } from '@/hooks/useCursorContext'

interface UseCursorInteractionOptions {
  hoverScale?: number
  clickScale?: number
  disabled?: boolean
}

export function useCursorInteraction(options: UseCursorInteractionOptions = {}) {
  const { hoverScale = 1.2, clickScale = 0.8, disabled = false } = options
  const { setCursorHovering, setCursorClicking } = useCursor()
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (disabled || !elementRef.current) return

    const element = elementRef.current

    const handleMouseEnter = () => {
      setCursorHovering(true)
    }

    const handleMouseLeave = () => {
      setCursorHovering(false)
    }

    const handleMouseDown = () => {
      setCursorClicking(true)
    }

    const handleMouseUp = () => {
      setCursorClicking(false)
    }

    // Add event listeners
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mousedown', handleMouseDown)
    element.addEventListener('mouseup', handleMouseUp)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mousedown', handleMouseDown)
      element.removeEventListener('mouseup', handleMouseUp)
    }
  }, [disabled, setCursorHovering, setCursorClicking])

  return elementRef
}

// Hook for automatic cursor interaction detection
export function useAutoCursorInteraction() {
  const { setCursorHovering } = useCursor()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const element = e.target as HTMLElement
      const isInteractive = 
        element.tagName === 'A' || 
        element.tagName === 'BUTTON' || 
        element.role === 'button' ||
        element.classList.contains('group') ||
        element.classList.contains('interactive') ||
        !!element.closest('a') ||
        !!element.closest('button') ||
        !!element.closest('[role="button"]') ||
        !!element.closest('.group') ||
        !!element.closest('.interactive')
      
      setCursorHovering(isInteractive)
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [setCursorHovering])
}
