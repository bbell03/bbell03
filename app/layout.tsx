import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { CursorProvider as CursorContextProvider } from "@/hooks/useCursorContext"
import CursorProvider from "@/components/shared/CursorProvider"
import ClientRootExtras from "@/components/shared/ClientRootExtras"
import siteMetadata from "@/data/siteMetadata"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: ['software', 'engineering', 'design', 'brandon bell'],
  authors: [{ name: siteMetadata.author }],
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    url: siteMetadata.siteUrl,
    type: 'website',
  },
  icons: {
    icon: siteMetadata.siteLogo,
    shortcut: siteMetadata.siteLogo,
    apple: siteMetadata.siteLogo,
  },
  metadataBase: siteMetadata.metadataBase,
  generator: 'bbell03',
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
