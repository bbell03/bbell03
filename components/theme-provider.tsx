"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProvider as NextThemesProviderType } from "next-themes"

type ThemeProviderProps = Parameters<typeof NextThemesProviderType>[0]

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
