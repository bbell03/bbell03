'use client'

import { useState, useEffect, memo } from 'react'

export const LiveClock = memo(() => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date())
    updateTime()

    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!currentTime) {
    return <span className="opacity-0">--:--:--</span>
  }

  return (
    <div className="flex items-center gap-3">
      <time className="hidden sm:inline-block">
        {new Intl.DateTimeFormat('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).format(currentTime)}
      </time>
      <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">—</span>
      <span>
        {new Intl.DateTimeFormat('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }).format(currentTime)}
      </span>
    </div>
  )
})

LiveClock.displayName = 'LiveClock'
