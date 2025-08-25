"use client"

import { usePathname } from "next/navigation"
import ClientNextArrow from "./ClientNextArrow"
import CustomCursor from "./custom-cursor"

export default function ClientRootExtras() {
  const pathname = usePathname()
  const isBlog = pathname?.startsWith("/blog")

  return (
    <>
      {/* Only show NextArrow on non-blog pages */}
      {!isBlog && <ClientNextArrow />}
      {/* Show CustomCursor on all pages */}
      <CustomCursor />
    </>
  )
}
