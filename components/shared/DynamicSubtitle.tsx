'use client'

import { motion } from 'framer-motion'
import { useDynamicSubtitle } from '@/hooks/useDynamicSubtitle'
import { RefreshCw, Sparkles, TrendingUp } from 'lucide-react'

interface DynamicSubtitleProps {
  className?: string
  showRefreshButton?: boolean
  showTrends?: boolean
}

export function DynamicSubtitle({ 
  className = '', 
  showRefreshButton = false,
  showTrends = false
}: DynamicSubtitleProps) {
  const { 
    subtitle, 
    isLoading, 
    error, 
    cached, 
    trends, 
    fallback, 
    refreshSubtitle 
  } = useDynamicSubtitle()

  if (error && !subtitle) {
    return (
      <motion.p 
        className={`text-lg md:text-xl font-source-serif italic text-slate-600 dark:text-slate-400 mb-4 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        "All the Code That's Fit to Print"
      </motion.p>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.p 
          className={`text-lg md:text-xl font-source-serif italic text-slate-600 dark:text-slate-400 mb-4 hover:text-accent-600 dark:hover:text-accent-300 hover:text-glow-accent-sm transition-all duration-300 ${className}`}
          key={subtitle} // Re-animate when subtitle changes
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          "{subtitle}"
        </motion.p>
        
        {/* Status indicators */}
        <div className="flex items-center gap-1 mb-4">
          {isLoading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-3 h-3 text-slate-400" />
            </motion.div>
          )}
          
          {!fallback && !isLoading && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Sparkles className="w-3 h-3 text-accent-500" />
            </motion.div>
          )}
          
          {cached && !isLoading && (
            <div className="w-2 h-2 rounded-full bg-green-500 opacity-60" title="Cached for today" />
          )}
        </div>
      </motion.div>

      {/* Refresh button for admin/dev use */}
      {showRefreshButton && (
        <motion.button
          onClick={refreshSubtitle}
          disabled={isLoading}
          className="flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors disabled:opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </motion.button>
      )}

      {/* Trends display for debugging/interest */}
      {showTrends && trends && trends.length > 0 && (
        <motion.div
          className="flex items-center gap-2 text-xs text-slate-400 mt-1"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <TrendingUp className="w-3 h-3" />
          <span>Trending: {trends.slice(0, 2).join(', ')}</span>
        </motion.div>
      )}
    </div>
  )
}

export default DynamicSubtitle
