'use client'

import { motion } from 'framer-motion'
import { Type, Monitor } from 'lucide-react'
import { useFontPreference, FontFamily } from '../hooks/useFontPreference'

interface FontSwitcherProps {
  className?: string
  showLabels?: boolean
}

export function FontSwitcher({ className = '', showLabels = false }: FontSwitcherProps) {
  const { fontFamily, setFontFamily } = useFontPreference()

  const fonts: { key: FontFamily; label: string; icon: any; description: string; preview: string }[] = [
    {
      key: 'courier',
      label: 'Courier',
      icon: Monitor,
      description: 'Monospace typewriter style',
      preview: 'Aa'
    },
    {
      key: 'garamond',
      label: 'Garamond',
      icon: Type,
      description: 'Classic serif elegance',
      preview: 'Aa'
    }
  ]

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {showLabels && (
        <span className="text-xs text-slate-600 dark:text-slate-400 mr-2">
          Font:
        </span>
      )}
      
      <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 rounded-full p-0.5 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-700/50 transition-all duration-300">
        {fonts.map((font) => {
          const Icon = font.icon
          const isActive = fontFamily === font.key
          
          return (
            <motion.button
              key={font.key}
              onClick={() => setFontFamily(font.key)}
              className={`
                relative flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-lg shadow-accent-300 dark:shadow-accent-600' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={`${font.description} - ${font.label}`}
            >
              <Icon className="w-3 h-3" />
              
              {/* Font preview */}
              <span 
                className={`text-xs font-bold ${
                  font.key === 'courier' 
                    ? 'font-mono' 
                    : 'font-serif'
                }`}
                style={{
                  fontFamily: font.key === 'courier' 
                    ? "'Courier Prime', 'Courier New', monospace" 
                    : "'EB Garamond', 'Garamond', 'Times New Roman', serif"
                }}
              >
                {font.preview}
              </span>
              
              {showLabels && (
                <span className="hidden sm:inline ml-1">
                  {font.label}
                </span>
              )}
              
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-accent-500/10 rounded-full"
                  layoutId="fontActiveBg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default FontSwitcher
