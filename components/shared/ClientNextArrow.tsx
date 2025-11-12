'use client'

import { usePathname } from 'next/navigation'
import NextArrow from './NextArrow'

export default function ClientNextArrow() {
  const pathname = usePathname()
  return <NextArrow currentPath={pathname} />
} 