'use client'

import { useState, useEffect, ReactNode } from 'react'
import { FontContext, FontFamily } from '@/hooks/useFontPreference'

interface FontProviderProps {
  children: ReactNode
  defaultFont?: FontFamily
}

export function FontProvider({ children, defaultFont = 'default' }: FontProviderProps) {
  const [fontFamily, setFontFamily] = useState<FontFamily>(defaultFont)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const saved = localStorage.getItem('blog-font-preference')
    if (saved === 'courier' || saved === 'garamond') {
      setFontFamily(saved)
    } else {
      setFontFamily('default')
      localStorage.setItem('blog-font-preference', 'default')
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('blog-font-preference', fontFamily)
    const root = document.documentElement
    root.classList.remove('font-courier', 'font-garamond')
    if (fontFamily === 'courier') root.classList.add('font-courier')
    else if (fontFamily === 'garamond') root.classList.add('font-garamond')
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
