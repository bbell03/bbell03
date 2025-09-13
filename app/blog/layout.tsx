import type { Metadata } from "next"
import { Playfair_Display, Source_Serif_4, Inter } from "next/font/google"
import Logo from "@/components/Logo"
import ThemeToggle from "@/components/theme-toggle"
import FontSwitcher from "@/components/FontSwitcher"
import { FontProvider } from "@/components/FontProvider"
// Keep blog pages clean; global background/cursor are added in RootLayout
import Navigation from "@/components/navigation"
import NavModal from "@/components/nav-modal"
import CornerDots from "@/components/corner-dots"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Blog | Brandon Bell",
  description: "Articles and insights from Brandon Bell",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FontProvider defaultFont="courier">
      <div className={`min-h-screen flex flex-col blog-page ${playfair.variable} ${sourceSerif.variable} ${inter.variable}`}>
        {/* Floating controls - Top right */}
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
          <FontSwitcher />
          <ThemeToggle />
          <NavModal />
        </div>

        {/* Main Content - Consistent container for all blog pages */}
        <main className="flex-1 w-full py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </FontProvider>
  )
}
