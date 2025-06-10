import type React from "react"
import type { Metadata } from "next"
import { Permanent_Marker, Exo, Space_Grotesk, Playfair_Display, Source_Serif_4 } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import ClientNextArrow from "@/components/ClientNextArrow"
import CustomCursor from "@/components/CustomCursor"

// Main body font - Exo
const exo = Exo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-exo",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

// Heading font - Permanent Marker
const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-permanent-marker",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

// Accent font - Space Grotesk
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

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
  title: "Brandon Bell | Product Designer & Developer",
  description: "Portfolio of Brandon Bell, Product Designer & Developer",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${exo.variable} ${permanentMarker.variable} ${spaceGrotesk.variable} ${playfair.variable} ${sourceSerif.variable} font-sans`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
       
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="brandon-bell-theme"
        >
          {children}
          <ClientNextArrow />
          <CustomCursor />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
