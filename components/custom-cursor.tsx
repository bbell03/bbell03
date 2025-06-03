"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-current pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-current pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.2 }}
      />
    </>
  )
}
