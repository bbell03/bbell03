"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Check if device supports hover (desktop)
    const checkDevice = () => {
      setIsDesktop(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
    }
    
    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
      
      // Check if hovering over interactive elements
      const element = e.target as HTMLElement
      const isInteractive = element.tagName === 'A' || 
                           element.tagName === 'BUTTON' || 
                           element.role === 'button' ||
                           element.classList.contains('group') ||
                           !!element.closest('a') ||
                           !!element.closest('button') ||
                           !!element.closest('[role="button"]') ||
                           !!element.closest('.group')
      setIsHovering(isInteractive)
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
  }, [isVisible, isDesktop])

  // Don't render on mobile/touch devices
  if (!isDesktop) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9997]"
        style={{
          border: '2px solid hsl(var(--accent, 214 85% 52%))',
          backgroundColor: 'transparent'
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          opacity: isVisible ? 0.8 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9997]"
        style={{
          backgroundColor: 'hsl(var(--accent, 214 85% 52%))'
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.2 }}
      />
    </>
  )
}
