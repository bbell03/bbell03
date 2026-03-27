'use client'

import { useState, useEffect, ReactNode } from 'react'
import {
  FontContext,
  FontFamily,
  applyFontToRoot,
  getSavedFontPreference,
  setSavedFontPreference,
} from '@/hooks/useFontPreference'

interface FontProviderProps {
  children: ReactNode
  defaultFont?: FontFamily
}

export function FontProvider({ children, defaultFont = 'default' }: FontProviderProps) {
  const [fontFamily, setFontFamily] = useState<FontFamily>(defaultFont)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const saved = getSavedFontPreference()
    setFontFamily(saved || 'default')
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    setSavedFontPreference(fontFamily)
    applyFontToRoot(fontFamily)
  }, [fontFamily, isHydrated])

  const contextValue = {
    fontFamily,
    setFontFamily
  }

  return (
    <FontContext.Provider value={contextValue}>
      {children}
    </FontContext.Provider>
  )
}
