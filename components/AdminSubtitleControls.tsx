'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Settings, TrendingUp, Sparkles, Eye, EyeOff } from 'lucide-react'

interface AdminSubtitleControlsProps {
  onRefresh?: () => void
  subtitle?: string
  trends?: string[]
  isLoading?: boolean
  cached?: boolean
  fallback?: boolean
}

export function AdminSubtitleControls({
  onRefresh,
  subtitle = '',
  trends = [],
  isLoading = false,
  cached = false,
  fallback = false
}: AdminSubtitleControlsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const fetchDebugInfo = async () => {
    try {
      const [subtitleRes, trendsRes] = await Promise.all([
        fetch('/api/dynamic-subtitle'),
        fetch('/api/tech-trends?prompts=true')
      ])
      
      const subtitleData = await subtitleRes.json()
      const trendsData = await trendsRes.json()
      
      setDebugInfo({
        subtitle: subtitleData,
        trends: trendsData,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to fetch debug info:', error)
    }
  }

  const handleRefresh = async () => {
    if (onRefresh) {
      onRefresh()
    }
    await fetchDebugInfo()
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg shadow-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-4 h-4" />
        <span className="text-sm">Subtitle</span>
        {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </motion.button>

      {/* Admin Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Dynamic Subtitle Control
              </h3>
              <div className="flex items-center gap-2">
                {cached && (
                  <div className="w-2 h-2 rounded-full bg-green-500" title="Cached" />
                )}
                {fallback && (
                  <div className="w-2 h-2 rounded-full bg-yellow-500" title="Fallback" />
                )}
              </div>
            </div>

            {/* Current Subtitle */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Current Subtitle
              </label>
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-md text-sm text-slate-900 dark:text-white font-medium">
                "{subtitle}"
              </div>
            </div>

            {/* Trends */}
            {trends.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Current Trends
                </label>
                <div className="flex flex-wrap gap-1">
                  {trends.slice(0, 3).map((trend, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {trend}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <motion.button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm rounded-md transition-colors flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </motion.button>
              
              <motion.button
                onClick={fetchDebugInfo}
                className="flex items-center gap-2 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm rounded-md transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4" />
                Debug
              </motion.button>
            </div>

            {/* Debug Info */}
            {debugInfo && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Debug Info
                </label>
                <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-md text-xs text-slate-700 dark:text-slate-300 font-mono max-h-40 overflow-y-auto">
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminSubtitleControls
