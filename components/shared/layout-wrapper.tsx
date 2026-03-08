"use client"

import type { ReactNode } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Navigation from "@/components/shared/navigation"
import HeaderControls from "@/components/shared/HeaderControls"

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="font-semibold text-sm uppercase tracking-wider">
            Brandon Bell
          </Link>
        </div>
        <HeaderControls 
          showSubtitle 
          subtitle={theme === "dark" ? "Personal Experience" : "Product Experience"} 
        />
      </header>

      <main className="flex-1 flex flex-col container mx-auto px-4 py-12">{children}</main>

      <Navigation currentPath={pathname} />
    </div>
  )
}
