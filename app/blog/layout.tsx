import type { Metadata } from "next"
import { Playfair_Display, Source_Serif_4 } from "next/font/google"
import Logo from "@/components/Logo"
import ThemeToggle from "@/components/theme-toggle"
import GradientBackground from "@/components/gradient-background"
import CustomCursor from "@/components/custom-cursor"
import Navigation from "@/components/navigation"
import NavModal from "@/components/nav-modal"
import CornerDots from "@/components/corner-dots"
import { usePathname } from "next/navigation"

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

export const metadata: Metadata = {
  title: "Blog | Brandon Bell",
  description: "Articles and insights from Brandon Bell",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  return (
    <div className={`min-h-screen flex flex-col dark:bg-[#040a1d] bg-white transition-colors duration-300 ${playfair.variable} ${sourceSerif.variable}`}>
      <GradientBackground />
      <CustomCursor />
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-4">
          <span className="text-xs uppercase tracking-wider hidden sm:inline-block accent-font">
            {"Blog & Writing"}
          </span>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 w-full">
        <div className="w-full max-w-6xl mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 gradient-text">blog</h1>
            <p className="text-sm md:text-base mb-8 text-balance leading-relaxed">
              Insights, thoughts, and stories from Brandon Bell.
            </p>
          </div>
          {children}
        </div>
      </main>
      <Navigation currentPath={pathname || "/blog"} />
      <NavModal />
      <CornerDots />
    </div>
  )
}
