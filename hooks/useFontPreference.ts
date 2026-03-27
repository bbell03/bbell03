'use client'

import { useState, useEffect, createContext, useContext } from 'react'

export type FontFamily = 'default' | 'courier' | 'garamond'

interface FontPreference {
  fontFamily: FontFamily
  setFontFamily: (font: FontFamily) => void
}

const FontContext = createContext<FontPreference | undefined>(undefined)

export const BLOG_FONT_PREFERENCE_KEY = 'blog-font-preference'

function normalizeFontFamily(value: string | null | undefined): FontFamily {
  if (value === 'courier' || value === 'garamond') return value
  return 'default'
}

export function applyFontToRoot(font: FontFamily) {
  const root = document.documentElement
  root.classList.remove('font-courier', 'font-garamond')
  if (font === 'courier') root.classList.add('font-courier')
  else if (font === 'garamond') root.classList.add('font-garamond')
}

export function getSavedFontPreference(): FontFamily {
  return normalizeFontFamily(localStorage.getItem(BLOG_FONT_PREFERENCE_KEY))
}

export function setSavedFontPreference(font: FontFamily) {
  localStorage.setItem(BLOG_FONT_PREFERENCE_KEY, font)
}

export function useFontPreference() {
  const context = useContext(FontContext)
  if (!context) {
    const [fontFamily, setFontFamily] = useState<FontFamily>('default')
    useEffect(() => {
      setFontFamily(getSavedFontPreference())
    }, [])
    useEffect(() => {
      setSavedFontPreference(fontFamily)
      applyFontToRoot(fontFamily)
    }, [fontFamily])
    return { fontFamily, setFontFamily }
  }
  return context
}

export { FontContext }
