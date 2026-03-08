'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette } from 'lucide-react'
import { useAccentColor } from '@/hooks/useAccentColor'

interface ColorPickerProps {
  className?: string
  showLabel?: boolean
}

const PRESET_COLORS = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Green', value: '#10b981' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Cyan', value: '#06b6d4' },
]

export default function ColorPicker({ className = '', showLabel = false }: ColorPickerProps) {
  const { color, setColor, mounted } = useAccentColor()
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  if (!mounted) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    )
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      {showLabel && (
        <span className="text-xs text-slate-600 dark:text-slate-400 mr-2">
          Color:
        </span>
      )}
      
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-slate-100 relative overflow-hidden"
        aria-label="Pick accent color"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette className="h-4 w-4" />
        <span
          className="absolute inset-0 rounded-full opacity-20"
          style={{ backgroundColor: color }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Color Picker Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-12 right-0 z-[120] w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Accent Color
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    aria-label="Close"
                  >
                    ?
                  </button>
                </div>

                {/* Custom Color Input */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    Custom Color
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        ref={inputRef}
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                        aria-label="Pick custom color"
                      />
                    </div>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => {
                        if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                          setColor(e.target.value)
                        }
                      }}
                      className="w-20 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      placeholder="#2563eb"
                    />
                  </div>
                </div>

                {/* Preset Colors */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    Presets
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {PRESET_COLORS.map((preset) => (
                      <motion.button
                        key={preset.value}
                        onClick={() => {
                          setColor(preset.value)
                          setIsOpen(false)
                        }}
                        className={`relative w-10 h-10 rounded-lg border-2 transition-all ${
                          color === preset.value
                            ? 'border-slate-900 dark:border-white scale-110'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                        }`}
                        style={{ backgroundColor: preset.value }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={preset.name}
                        aria-label={`Select ${preset.name} color`}
                      >
                        {color === preset.value && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <span className="text-white text-xs font-bold drop-shadow-lg">
                              ?
                            </span>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 