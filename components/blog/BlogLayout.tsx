"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import HeaderControls from "@/components/shared/HeaderControls"
import NextArrow from "@/components/shared/NextArrow"
import { usePathname } from "next/navigation"
import { LiveClock } from "@/components/shared/LiveClock"

interface BlogLayoutProps {
  children: ReactNode
  /**
   * Path for the primary navigation link shown in the header.
   * Defaults to the site root.
   */
  homeHref?: string
  /**
   * Label rendered for the primary navigation link.
   */
  label?: string
  /**
   * Toggle the simple header on or off. Useful if a page wants to provide
   * its own hero or navigation treatment.
   */
  showHeader?: boolean
}

export default function BlogLayout({
  children,
  homeHref = "/blog",
  label = "Brandon Bell",
  showHeader = true,
}: BlogLayoutProps) {
  const pathname = usePathname()
  const isBlogIndex = pathname === '/blog'

  return (
    <div className="blog-page relative min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden">
      {/* Global Theme Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent-500/10 dark:bg-accent-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 -translate-x-1/4 w-[600px] h-[600px] bg-accent-400/5 dark:bg-accent-400/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="paper-fiber" aria-hidden />
      {showHeader && (
        <header className="relative z-[110] border-b border-white/10 bg-white/70 dark:bg-[hsl(240,10%,3.9%)]/70 backdrop-blur-md sticky top-0">
          <div className="mx-auto flex w-full max-w-[min(100%,1600px)] items-center justify-between px-3 py-3 sm:px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href={homeHref}
                className="flex items-center transition-all hover:scale-[1.02]"
                aria-label={label}
              >
                <Image
                  src="/logo.png"
                  alt="Dots Logo"
                  width={64}
                  height={64}
                  className="h-10 md:h-12 w-auto dark:invert"
                />
              </Link>
              <div className="hidden sm:block h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="hidden sm:block text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">
                <LiveClock />
              </div>
            </div>
            <HeaderControls className="scale-90 origin-right" />
          </div>
        </header>
      )}

      <main className={`relative z-10 mx-auto w-full max-w-[min(100%,1600px)] px-3 py-6 sm:px-4 md:py-8 flex-1 ${!showHeader ? 'pt-0' : ''}`}>
        {children}
      </main>

      <NextArrow currentPath={pathname} />
    </div>
  )
}


