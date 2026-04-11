'use client'

import ThemeToggle from './theme-toggle'
import ColorPicker from './ColorPicker'

interface HeaderControlsProps {
  showSubtitle?: boolean
  subtitle?: string
  showColorPicker?: boolean
  className?: string
}

export default function HeaderControls({
  showSubtitle = false,
  subtitle,
  showColorPicker = true,
  className = '',
}: HeaderControlsProps) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {showSubtitle && subtitle && (
        <span className="text-xs uppercase tracking-wider hidden sm:inline-block font-sans">
          {subtitle}
        </span>
      )}
      {showColorPicker && <ColorPicker />}
      <ThemeToggle />
    </div>
  )
}
