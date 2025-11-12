import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { CursorProvider as CursorContextProvider } from "@/hooks/useCursorContext"
import CursorProvider from "@/components/shared/CursorProvider"
import ClientRootExtras from "@/components/shared/ClientRootExtras"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Brandon Bell",
  description: "Personal Website of Brandon Bell",
  keywords: ['data analytics', 'AI', 'enterprise', 'partnership', 'contract', 'ui', 'ux', 'design', 'development', 'software', 'engineering'],
  authors: [{ name: 'Brandon Bell' }],
  openGraph: {
    title: "Brandon Bell",
    description: "Personal Website of Brandon Bell",
    type: 'article',
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CursorContextProvider>
            <CursorProvider>
              {children}
            </CursorProvider>
          </CursorContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
