"use client"

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Load R3F scene only on client so it uses the app's single React instance (avoids ReactCurrentBatchConfig / duplicate React).
const CircularThreeSceneInner = dynamic(
  () => import('./CircularThreeSceneInner'),
  { ssr: false }
)

export interface CircularThreeSceneProps {
  color?: string
  speed?: number
  className?: string
  glbUrl?: string
  useModel?: boolean
}

export default function CircularThreeScene({
  color = '#ffffff',
  speed = 1,
  className = '',
  glbUrl = '/models/myModel.glb',
  useModel = true
}: CircularThreeSceneProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center`}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <CircularThreeSceneInner
      color={color}
      speed={speed}
      className={className}
      glbUrl={glbUrl}
      useModel={useModel}
    />
  )
}
