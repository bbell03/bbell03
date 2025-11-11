'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useCursor } from '@/hooks/useCursorContext'

interface CursorProviderProps {
  children: React.ReactNode
}

export default function CursorProvider({ children }: CursorProviderProps) {
  const { cursorState } = useCursor()

  // Don't render cursor on mobile/touch devices
  if (!cursorState.isDesktop) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      
      {/* Custom Cursor */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {/* Outer ring */}
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none"
          style={{
            border: '2px solid hsl(var(--accent, 214 85% 52%))',
            backgroundColor: 'transparent'
          }}
          animate={{
            x: cursorState.x - 12,
            y: cursorState.y - 12,
            opacity: cursorState.isVisible ? 0.8 : 0,
            scale: cursorState.isHovering ? 1.5 : cursorState.isClicking ? 0.8 : 1,
          }}
          transition={{ 
            type: "spring", 
            damping: 20, 
            stiffness: 300, 
            mass: 0.5 
          }}
        />
        
        {/* Inner dot */}
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none"
          style={{
            backgroundColor: 'hsl(var(--accent, 214 85% 52%))'
          }}
          animate={{
            x: cursorState.x - 4,
            y: cursorState.y - 4,
            opacity: cursorState.isVisible ? 1 : 0,
            scale: cursorState.isHovering ? 1.2 : cursorState.isClicking ? 0.6 : 1,
          }}
          transition={{ 
            type: "spring", 
            damping: 30, 
            stiffness: 500, 
            mass: 0.2 
          }}
        />
      </div>
    </>
  )
}
