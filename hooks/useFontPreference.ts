'use client'

import { useState, useEffect, createContext, useContext } from 'react'

export type FontFamily = 'courier' | 'garamond'

interface FontPreference {
  fontFamily: FontFamily
  setFontFamily: (font: FontFamily) => void
}

const FontContext = createContext<FontPreference | undefined>(undefined)

export function useFontPreference() {
  const context = useContext(FontContext)
  if (!context) {
    // Fallback hook for when used outside provider
    const [fontFamily, setFontFamily] = useState<FontFamily>('courier')
    
    useEffect(() => {
      // Load from localStorage
      const saved = localStorage.getItem('blog-font-preference')
      if (saved && (saved === 'courier' || saved === 'garamond')) {
        setFontFamily(saved)
      }
    }, [])
    
    useEffect(() => {
      // Save to localStorage
      localStorage.setItem('blog-font-preference', fontFamily)
      
      // Apply to document
      const root = document.documentElement
      if (fontFamily === 'courier') {
        root.classList.add('font-courier')
        root.classList.remove('font-garamond')
      } else {
        root.classList.add('font-garamond')
        root.classList.remove('font-courier')
      }
    }, [fontFamily])
    
    return { fontFamily, setFontFamily }
  }
  return context
}

export { FontContext }
