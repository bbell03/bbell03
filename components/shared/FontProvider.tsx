'use client'

import { useState, useEffect, ReactNode } from 'react'
import { FontContext, FontFamily } from '@/hooks/useFontPreference'

interface FontProviderProps {
  children: ReactNode
  defaultFont?: FontFamily
}

export function FontProvider({ children, defaultFont = 'courier' }: FontProviderProps) {
  const [fontFamily, setFontFamily] = useState<FontFamily>(defaultFont)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    
    // Load from localStorage on mount
    const saved = localStorage.getItem('blog-font-preference')
    if (saved && (saved === 'courier' || saved === 'garamond')) {
      setFontFamily(saved)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    
    // Save to localStorage
    localStorage.setItem('blog-font-preference', fontFamily)
    
    // Apply font classes to document root
    const root = document.documentElement
    
    // Remove all font classes first
    root.classList.remove('font-courier', 'font-garamond')
    
    // Add the selected font class
    if (fontFamily === 'courier') {
      root.classList.add('font-courier')
    } else {
      root.classList.add('font-garamond')
    }
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
