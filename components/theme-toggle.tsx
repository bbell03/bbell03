"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Palette } from "lucide-react"
import { motion } from "framer-motion"
import CursorColorPicker from "@/components/ColorPicker"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2 relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full w-8 h-8 relative"
        aria-label="Toggle theme"
      >
        <span className="sr-only">Toggle theme</span>
        {/* Sun icon with animation */}
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={{
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -90,
            scale: theme === "dark" ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Sun className="h-4 w-4" />
        </motion.div>
        {/* Moon icon with animation */}
        <motion.div
          initial={{ opacity: 0, rotate: 90 }}
          animate={{
            opacity: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : 90,
            scale: theme === "light" ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon className="h-4 w-4" />
        </motion.div>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowPicker((v) => !v)}
        className={`rounded-full w-8 h-8 relative ${showPicker ? 'bg-accent/20' : ''}`}
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
