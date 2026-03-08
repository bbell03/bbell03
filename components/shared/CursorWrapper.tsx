'use client'

import React from 'react'
import { CursorProvider as CursorContextProvider } from '@/hooks/useCursorContext'
import CursorVisualProvider from '@/components/shared/CursorProvider'
import { useAccentColor } from '@/hooks/useAccentColor'
import { FontProvider } from '@/components/shared/FontProvider'

interface CursorWrapperProps {
  children: React.ReactNode
}

// Component to initialize accent color system
function ColorInitializer() {
  useAccentColor() // Initialize color system
  return null
}

export default function CursorWrapper({ children }: CursorWrapperProps) {
  return (
    <CursorContextProvider>
      <ColorInitializer />
      <FontProvider>
        <CursorVisualProvider>
          {children}
        </CursorVisualProvider>
      </FontProvider>
    </CursorContextProvider>
  )
}
