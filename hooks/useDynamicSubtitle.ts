'use client'

import { useState, useEffect } from 'react'

interface SubtitleData {
  subtitle: string
  cached: boolean
  date: string
  trends?: string[]
  fallback?: boolean
  error?: string
}

export function useDynamicSubtitle() {
  const [subtitleData, setSubtitleData] = useState<SubtitleData>({
    subtitle: "All the Code That's Fit to Print", // Default fallback
    cached: false,
    date: new Date().toISOString().split('T')[0]
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubtitle = async (forceRefresh = false) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const endpoint = forceRefresh ? '/api/dynamic-subtitle' : '/api/dynamic-subtitle'
      const method = forceRefresh ? 'POST' : 'GET'
      
      const response = await fetch(endpoint, { 
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache for 1 hour on GET requests
        cache: forceRefresh ? 'no-cache' : 'default'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: SubtitleData = await response.json()
      setSubtitleData(data)
      
      // Store in localStorage for offline access
      try {
        localStorage.setItem('dynamicSubtitle', JSON.stringify({
          ...data,
          timestamp: Date.now()
        }))
      } catch (e) {
        console.warn('Failed to cache subtitle in localStorage:', e)
      }
      
    } catch (err) {
      console.error('Error fetching dynamic subtitle:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      
      // Try to load from localStorage as fallback
      try {
        const cached = localStorage.getItem('dynamicSubtitle')
        if (cached) {
          const cachedData = JSON.parse(cached)
          // Use cached data if it's less than 24 hours old
          const isRecent = Date.now() - cachedData.timestamp < 24 * 60 * 60 * 1000
          if (isRecent) {
            setSubtitleData({
              subtitle: cachedData.subtitle,
              cached: true,
              date: cachedData.date,
              fallback: true
            })
            return
          }
        }
      } catch (e) {
        console.warn('Failed to load cached subtitle:', e)
      }
      
      // Final fallback
      setSubtitleData({
        subtitle: "All the Code That's Fit to Print",
        cached: false,
        date: new Date().toISOString().split('T')[0],
        fallback: true,
        error: 'Failed to load dynamic subtitle'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubtitle()
  }, [])

  // Auto-refresh at midnight
  useEffect(() => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime()
    
    const timeout = setTimeout(() => {
      fetchSubtitle(true) // Force refresh at midnight
      
      // Set up daily interval after the first midnight refresh
      const dailyInterval = setInterval(() => {
        fetchSubtitle(true)
      }, 24 * 60 * 60 * 1000) // 24 hours
      
      return () => clearInterval(dailyInterval)
    }, msUntilMidnight)
    
    return () => clearTimeout(timeout)
  }, [])

  const refreshSubtitle = () => {
    fetchSubtitle(true)
  }

  return {
    subtitle: subtitleData.subtitle,
    isLoading,
    error,
    cached: subtitleData.cached,
    date: subtitleData.date,
    trends: subtitleData.trends,
    fallback: subtitleData.fallback,
    refreshSubtitle
  }
}
