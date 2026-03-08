import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import HeaderControls from "@/components/shared/HeaderControls"

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
  return (
    <div className="blog-page relative">
      <div className="paper-fiber" aria-hidden />
      {showHeader && (
        <header className="relative z-[100] border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[hsl(240,10%,3.9%)]">
          <div className="mx-auto flex w-full max-w-[min(100%,1600px)] items-center justify-between px-3 py-4 sm:px-4">
            <Link
              href={homeHref}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <Image
                src="/logo.png"
                alt=""
                width={24}
                height={24}
                className="h-5 w-auto dark:invert"
              />
              {label}
            </Link>
            <HeaderControls showFontSwitcher={false} />
          </div>
        </header>
      )}

      <main className="relative z-10 mx-auto w-full max-w-[min(100%,1600px)] px-3 py-6 sm:px-4 md:py-8">{children}</main>
    </div>
  )
}


