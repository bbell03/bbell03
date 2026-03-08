'use client'

import { FontSwitcher } from './FontSwitcher'
import ThemeToggle from './theme-toggle'
import ColorPicker from './ColorPicker'

interface HeaderControlsProps {
  showSubtitle?: boolean
  subtitle?: string
  showFontSwitcher?: boolean
  showColorPicker?: boolean
  className?: string
}

export default function HeaderControls({
  showSubtitle = false,
  subtitle,
  showFontSwitcher = false,
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
      {showFontSwitcher && <FontSwitcher />}
      {showColorPicker && <ColorPicker />}
      <ThemeToggle />
    </div>
  )
}
