'use client'

import { useState, useEffect } from 'react'

const DEFAULT_COLOR = '#2563eb' // Blue-600
const STORAGE_KEY = 'accent-color'

function hexToHSL(hex: string): string {
  let r = 0, g = 0, b = 0
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16)
    g = parseInt(hex[2] + hex[2], 16)
    b = parseInt(hex[3] + hex[3], 16)
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16)
    g = parseInt(hex[3] + hex[4], 16)
    b = parseInt(hex[5] + hex[6], 16)
  }
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  const lPercent = Math.round(l * 100)
  return `${h} ${s}% ${lPercent}%`
}

export function useAccentColor() {
  const [color, setColor] = useState<string>(DEFAULT_COLOR)
  const [mounted, setMounted] = useState(false)

  // Load color from localStorage on mount
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem(STORAGE_KEY) || DEFAULT_COLOR
      setColor(savedColor)
    }
  }, [])

  // Apply color changes to CSS variables
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    const hsl = hexToHSL(color)
    
    // Set all accent-related CSS variables
    const root = document.documentElement
    root.style.setProperty('--accent', hsl)
    root.style.setProperty('--secondary', hsl)
    root.style.setProperty('--cursor-accent', hsl)
    root.style.setProperty('--highlight', hsl)
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, color)
    localStorage.setItem('cursor-accent-color', color)
    localStorage.setItem('highlight-color', color)
    localStorage.setItem('secondary-color', color)
  }, [color, mounted])

  const updateColor = (newColor: string) => {
    setColor(newColor)
  }

  return {
    color,
    setColor: updateColor,
    mounted,
    hsl: mounted ? hexToHSL(color) : '214 85% 52%'
  }
}
