"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function GradientBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {theme === "dark" ? (
          // Dark theme gradient
          <div className="absolute inset-0 bg-gradient-to-br from-[#040a1d] via-[#0a1a3d] to-[#040a1d] opacity-40" />
        ) : (
          // Light theme gradient
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white opacity-30" />
        )}
      </motion.div>

      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-60 h-60 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-10 dark:opacity-20" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-10 dark:opacity-20" />
    </div>
  )
}
