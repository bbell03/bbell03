"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Palette } from "lucide-react"
import { motion } from "framer-motion"
import CursorColorPicker from "@/components/shared/ColorPicker"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full w-8 h-8 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        disabled
      >
        <span className="sr-only">Toggle theme</span>
        {/* Show a neutral icon while loading */}
        <div className="w-4 h-4 rounded-full border-2 border-current opacity-50" />
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2 relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (theme === "system") {
            setTheme("light")
          } else if (theme === "light") {
            setTheme("dark") 
          } else {
            setTheme("system")
          }
        }}
        className="rounded-full w-8 h-8 relative text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        aria-label={`Toggle theme (current: ${theme})`}
      >
        <span className="sr-only">Toggle theme (current: {theme})</span>
        {/* Show appropriate icon based on current theme */}
        {theme === "system" ? (
          <div className="h-4 w-4 rounded-full border-2 border-current opacity-75" title="System theme" />
        ) : theme === "light" ? (
          <Sun className="h-4 w-4 text-gray-700 hover:text-black transition-colors" />
        ) : (
          <Moon className="h-4 w-4 text-gray-200 hover:text-white transition-colors" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowPicker((v) => !v)}
        className={`rounded-full w-8 h-8 relative text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm ${showPicker ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600' : ''}`}
        aria-label="Cursor color picker"
      >
        <Palette className="h-4 w-4" />
      </Button>
      {showPicker && (
        <div className="absolute top-12 right-0 z-50">
          <CursorColorPicker />
        </div>
      )}
    </div>
  )
}
