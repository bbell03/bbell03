"use client"

import { usePathname } from "next/navigation"

export default function CornerDots() {
  const pathname = usePathname()
  if (pathname?.startsWith('/blog')) return null
  return (
    <div className="fixed bottom-4 right-4 flex space-x-1 z-40">
      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
    </div>
  )
}
