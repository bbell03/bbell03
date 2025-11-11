"use client"

import { usePathname } from "next/navigation"
import ClientNextArrow from "./ClientNextArrow"

export default function ClientRootExtras() {
  const pathname = usePathname()
  const isBlog = pathname?.startsWith("/blog")

  return (
    <>
      {/* Only show NextArrow on non-blog pages */}
      {!isBlog && <ClientNextArrow />}
      {/* Cursor is now handled globally in the root layout */}
    </>
  )
}
