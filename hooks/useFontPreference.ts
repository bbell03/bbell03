'use client'

import { useState, useEffect, createContext, useContext } from 'react'

export type FontFamily = 'default' | 'courier' | 'garamond'

interface FontPreference {
  fontFamily: FontFamily
  setFontFamily: (font: FontFamily) => void
}

const FontContext = createContext<FontPreference | undefined>(undefined)

function applyFontToRoot(font: FontFamily) {
  const root = document.documentElement
  root.classList.remove('font-courier', 'font-garamond')
  if (font === 'courier') root.classList.add('font-courier')
  else if (font === 'garamond') root.classList.add('font-garamond')
}

export function useFontPreference() {
  const context = useContext(FontContext)
  if (!context) {
    const [fontFamily, setFontFamily] = useState<FontFamily>('default')
    useEffect(() => {
      const saved = localStorage.getItem('blog-font-preference')
      if (saved === 'courier' || saved === 'garamond') setFontFamily(saved)
    }, [])
    useEffect(() => {
      localStorage.setItem('blog-font-preference', fontFamily)
      applyFontToRoot(fontFamily)
    }, [fontFamily])
    return { fontFamily, setFontFamily }
  }
  return context
}

export { FontContext }
