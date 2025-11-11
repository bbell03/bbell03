'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CursorState {
  x: number
  y: number
  isVisible: boolean
  isHovering: boolean
  isClicking: boolean
  isDesktop: boolean
}

interface CursorContextType {
  cursorState: CursorState
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>
  updateCursorPosition: (x: number, y: number) => void
  setCursorHovering: (hovering: boolean) => void
  setCursorClicking: (clicking: boolean) => void
  setCursorVisible: (visible: boolean) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

interface CursorProviderProps {
  children: ReactNode
}

export function CursorProvider({ children }: CursorProviderProps) {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isVisible: false,
    isHovering: false,
    isClicking: false,
    isDesktop: false
  })

  // Check if device supports hover (desktop)
  useEffect(() => {
    const checkDevice = () => {
      const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches
      setCursorState(prev => ({ ...prev, isDesktop }))
    }
    
    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // Global mouse event listeners
  useEffect(() => {
    if (!cursorState.isDesktop) return

    const updateMousePosition = (e: MouseEvent) => {
      setCursorState(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        isVisible: true
      }))
    }

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, isVisible: false }))
    }

    const handleMouseEnter = () => {
      setCursorState(prev => ({ ...prev, isVisible: true }))
    }

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }))
    }

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }))
    }

    // Add event listeners
    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [cursorState.isDesktop])

  // Helper functions
  const updateCursorPosition = (x: number, y: number) => {
    setCursorState(prev => ({ ...prev, x, y }))
  }

  const setCursorHovering = (hovering: boolean) => {
    setCursorState(prev => ({ ...prev, isHovering: hovering }))
  }

  const setCursorClicking = (clicking: boolean) => {
    setCursorState(prev => ({ ...prev, isClicking: clicking }))
  }

  const setCursorVisible = (visible: boolean) => {
    setCursorState(prev => ({ ...prev, isVisible: visible }))
  }

  const value: CursorContextType = {
    cursorState,
    setCursorState,
    updateCursorPosition,
    setCursorHovering,
    setCursorClicking,
    setCursorVisible
  }

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}

