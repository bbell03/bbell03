import type React from "react"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/shared/theme-provider"
import CursorWrapper from "@/components/shared/CursorWrapper"
import siteMetadata from "@/data/siteMetadata"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.variable} ${raleway.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CursorWrapper>
            {children}
          </CursorWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
