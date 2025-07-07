"use client"

import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Logo from "@/components/Logo"
import NavModal from "@/components/nav-modal"
import CornerDots from "@/components/corner-dots"
import ThemeToggle from "@/components/theme-toggle"
import GradientBackground from "@/components/gradient-background"
import CustomCursor from "@/components/custom-cursor"
import NextArrow from "@/components/NextArrow"
import { motion } from "framer-motion"

interface GlowLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export default function GlowLayout({ children, title, subtitle }: GlowLayoutProps) {
  const { theme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#040a1d] bg-white transition-colors duration-300 overflow-hidden">
      <GradientBackground />
      
      {/* Enhanced Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Main radial gradient glow */}
        <div className="absolute inset-0 dark:hidden" style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.15) 0%, hsl(var(--accent) / 0.08) 30%, hsl(var(--accent) / 0.04) 60%, transparent 100%)',
        }} />
        
        {/* Dark mode glow */}
        <div className="absolute inset-0 hidden dark:block" style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.12) 0%, hsl(var(--accent) / 0.06) 30%, hsl(var(--accent) / 0.03) 60%, transparent 100%)',
        }} />
        
        {/* Additional glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-30 dark:opacity-40 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-25 dark:opacity-35 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200 dark:bg-green-900/20 rounded-full blur-3xl opacity-20 dark:opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <CustomCursor />

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
          <Logo />
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs uppercase tracking-wider hidden sm:inline-block font-sans text-gray-600 dark:text-gray-400">
            {subtitle || "Personal Website & Repository"}
          </span>
          <ThemeToggle />
          <NavModal />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          {/* Page Title */}
          {title && (
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light gradient-text leading-none tracking-tight mb-4">
                {title}
              </h1>
            </motion.div>
          )}
          
          {/* Page Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="relative z-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Horizontal Timeline Navigation */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent" />
            
            {/* Navigation Dots */}
            <div className="flex justify-between items-center relative">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                { path: "/work", label: "Work" },
                { path: "/blog", label: "Blog" },
                { path: "/contact", label: "Contact" },
              ].map((route, index) => {
                const isActive = pathname === route.path;
                return (
                  <div key={route.path} className="flex flex-col items-center group">
                    <a
                      href={route.path}
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 hover:scale-110 -mt-10 ${
                        isActive
                          ? 'bg-transparent border-black dark:border-white scale-125 shadow-lg'
                          : 'bg-transparent border-gray-400 dark:border-gray-500 hover:border-gray-600 dark:hover:border-gray-400'
                      }`}
                      aria-label={route.label}
                    />
                    <span className={`text-sm mt-4 transition-all duration-300 ${
                      isActive 
                        ? 'opacity-100 text-black dark:text-white font-medium' 
                        : 'opacity-70 text-gray-500 dark:text-gray-400 group-hover:opacity-100 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                    }`}>
                      {route.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </footer>

      <NextArrow currentPath={pathname} />
      <CornerDots />
    </div>
  )
} 