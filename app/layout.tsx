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
  title: "Data Analytics Platform Expands Partnership with $618.9M Contract",
  description: "Leading data analytics platform and AI/ML tools continue supporting enterprise data strategy and multi-domain operations through 2028",
  keywords: ['data analytics', 'AI', 'enterprise', 'partnership', 'contract'],
  authors: [{ name: 'Data Insights Team' }],
  openGraph: {
    title: "Data Analytics Platform Expands Partnership with $618.9M Contract",
    description: "Leading data analytics platform and AI/ML tools continue supporting enterprise data strategy and multi-domain operations through 2028",
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
