'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const updateCursor = () => {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.2
      cursorY += (mouseY - cursorY) * 0.2

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      requestAnimationFrame(updateCursor)
    }

    const handleMouseDown = () => cursor?.classList.add('click')
    const handleMouseUp = () => cursor?.classList.remove('click')
    const handleMouseEnter = () => cursor?.classList.add('hover')
    const handleMouseLeave = () => {
      cursor?.classList.remove('hover', 'click')
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)

    const animationFrame = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" />
} 