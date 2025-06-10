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
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var color = localStorage.getItem('cursor-accent-color') || '#2563eb';
    function hexToHSL(hex) {
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
      }
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      return h + ' ' + s + '% ' + l + '%';
    }
    var hsl = hexToHSL(color);
    var root = document.documentElement;
    root.style.setProperty('--cursor-accent', hsl);
    root.style.setProperty('--highlight', hsl);
    root.style.setProperty('--secondary', hsl);
    root.style.setProperty('--accent', hsl);
  } catch (e) {}
})();
            `,
          }}
        />
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
