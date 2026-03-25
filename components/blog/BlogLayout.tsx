"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import HeaderControls from "@/components/shared/HeaderControls"
import NextArrow from "@/components/shared/NextArrow"
import { usePathname } from "next/navigation"

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
  homeHref = "/",
  label = "Brandon Bell — Journal",
  showHeader = true,
}: BlogLayoutProps) {
  const pathname = usePathname()
  const isBlogIndex = pathname === '/blog'

  return (
    <div className="blog-page relative min-h-screen flex flex-col">
      <div className="paper-fiber" aria-hidden />
      {showHeader && !isBlogIndex && (
        <header className="relative z-[110] border-b border-white/10 bg-white/70 dark:bg-[hsl(240,10%,3.9%)]/70 backdrop-blur-md sticky top-0">
          <div className="mx-auto flex w-full max-w-[min(100%,1600px)] items-center justify-between px-3 py-3 sm:px-4">
            <Link
              href={homeHref}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 transition-all hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:scale-[1.02]"
            >
              <Image
                src="/logo.png"
                alt=""
                width={20}
                height={20}
                className="h-4 w-auto dark:invert"
              />
              {label}
            </Link>
            <HeaderControls showFontSwitcher={false} className="scale-90 origin-right" />
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


