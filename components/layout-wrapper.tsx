"use client"

import type { ReactNode } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#040a1d] bg-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="font-semibold text-sm uppercase tracking-wider">
            Brandon Bell
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs uppercase tracking-wider hidden sm:inline-block">
            {theme === "dark" ? "Personal Experience" : "Product Experience"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col container mx-auto px-4 py-12">{children}</main>

      <Navigation currentPath={pathname} />
    </div>
  )
}
