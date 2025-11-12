"use client"

import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef, ReactNode } from "react"
import Navigation from "@/components/shared/navigation"
import Logo from "@/components/shared/Logo"
import NavModal from "@/components/shared/nav-modal"
import CornerDots from "@/components/shared/corner-dots"
import ThemeToggle from "@/components/shared/theme-toggle"
import FontSwitcher from "@/components/shared/FontSwitcher"
import GradientBackground from "@/components/shared/gradient-background"
import NextArrow from "@/components/shared/NextArrow"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Link from "next/link"

export interface Slide {
  title: string
  description: string
  tagline: string
  ctaPrimary?: { href: string; label: string }
  ctaSecondary?: { href: string; label: string }
}

interface LandingPageLayoutProps {
  slides: Slide[]
  renderLeftContent?: (slide: Slide, index: number, isActive: boolean) => ReactNode
  renderRightContent?: (slide: Slide, index: number, isActive: boolean) => ReactNode
  showGradientOverlay?: boolean
  showHorizontalTimeline?: boolean
  headerSubtitle?: string
  timelineRoutes?: Array<{ path: string; label: string }>
}

export default function LandingPageLayout({
  slides,
  renderLeftContent,
  renderRightContent,
  showGradientOverlay = true,
  showHorizontalTimeline = true,
  headerSubtitle = "Personal Website & Repository",
  timelineRoutes = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/work", label: "Work" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ],
}: LandingPageLayoutProps) {
  const { theme } = useTheme()
  const pathname = usePathname()
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  // Intersection Observer for timeline sections
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentSlide(index)
          }
        },
        { 
          threshold: 0.5, 
          rootMargin: "-30% 0px -30% 0px"
        }
      )
      
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  // Wheel event for desktop
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    const handleWheel = (event: WheelEvent) => {
      // Only apply wheel navigation on desktop
      if (window.innerWidth >= 768) {
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          if (event.deltaY > 0) {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
          } else if (event.deltaY < 0) {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
          }
        }, 150)
      }
    }

    window.addEventListener("wheel", handleWheel)
    return () => {
      window.removeEventListener("wheel", handleWheel)
      clearTimeout(scrollTimeout)
    }
  }, [slides.length])

  const scrollToSection = (index: number) => {
    setCurrentSlide(index)
    sectionRefs.current[index]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    })
  }

  // Timeline Section Component for Mobile
  const TimelineSection = ({ slide, index, isActive }: { slide: Slide; index: number; isActive: boolean }) => {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref)
    
    useEffect(() => {
      sectionRefs.current[index] = ref.current
    }, [index])

    return (
      <motion.section
        ref={ref}
        className={`min-h-screen flex flex-col justify-center px-6 py-16 relative ${
          index === 0 ? 'pt-8' : ''
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0.3 }}
        transition={{ duration: 0.6 }}
      >
        
        {/* Timeline connector line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent md:hidden" />
        
        {/* Timeline dot */}
        <div className={`absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 md:hidden ${
          isActive 
            ? 'bg-transparent border-black dark:border-white scale-125' 
            : 'bg-transparent border-gray-300 dark:border-gray-600'
        }`} />

        <div className="ml-8 md:ml-0 max-w-2xl md:max-w-none">
          <motion.div
            className="space-y-6 text-left"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: isInView ? 0 : -50, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section number */}
            <div className="text-sm font-mono text-gray-400 dark:text-gray-500 tracking-wider">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Title */}
            <motion.h2
              className="text-6xl sm:text-7xl md:text-8xl font-courier font-light gradient-text leading-none tracking-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {slide.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl leading-relaxed text-gray-700 dark:text-gray-300 max-w-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {slide.description}
            </motion.p>

            {/* Tagline */}
            <motion.div
              className="text-sm uppercase tracking-widest font-medium font-sans text-gray-500 dark:text-gray-400"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isInView ? 0 : 20, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {slide.tagline}
            </motion.div>

            {/* CTAs - only show on desktop for first and last sections */}
            {(index === 0 || index === slides.length - 1) && (slide.ctaPrimary || slide.ctaSecondary) && (
              <motion.div
                className="hidden md:flex flex-col gap-4 pt-4 max-w-sm"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {slide.ctaPrimary && (
                  <Link
                    href={slide.ctaPrimary.href}
                    className="w-full px-8 py-4 border-2 border-current rounded-full text-lg font-semibold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-center shadow-sm"
                  >
                    {slide.ctaPrimary.label}
                  </Link>
                )}
                {slide.ctaSecondary && (
                  <Link
                    href={slide.ctaSecondary.href}
                    className="w-full px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-full text-lg font-medium text-gray-700 dark:text-gray-300 hover:border-current hover:text-black dark:hover:text-white transition-all duration-300 text-center"
                  >
                    {slide.ctaSecondary.label}
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>
    )
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#040a1d] bg-white transition-colors duration-300 overflow-hidden">
      <GradientBackground />
      
      {/* Frosted Gradient Background Overlay */}
      {showGradientOverlay && pathname === "/" && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Main radial gradient from bottom left - using accent color on light screens */}
          <div className="absolute inset-0 dark:hidden" style={{
            background: 'radial-gradient(ellipse at bottom left, hsl(var(--accent) / 0.55) 0%, hsl(var(--accent) / 0.35) 25%, hsl(var(--accent) / 0.22) 45%, hsl(var(--accent) / 0.12) 65%, hsl(var(--accent) / 0.06) 80%, hsl(var(--accent) / 0.03) 90%, transparent 100%)',
          }} />
          
          {/* Accent color gradient for dark mode */}
          <div className="absolute inset-0 hidden dark:block" style={{
            background: 'radial-gradient(ellipse at bottom left, hsl(var(--accent) / 0.25) 0%, hsl(var(--accent) / 0.15) 25%, hsl(var(--accent) / 0.1) 45%, hsl(var(--accent) / 0.06) 65%, hsl(var(--accent) / 0.03) 80%, hsl(var(--accent) / 0.015) 90%, transparent 100%)',
          }} />
          
          {/* Subtle backdrop blur */}
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>
      )}

      {/* Logo - Fixed positioned aligned with timeline */}
      <div className="fixed top-2 left-2 z-50">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
          <Logo />
        </div>
      </div>

      {/* Header controls - Top right */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2 sm:gap-3">
        <span className="text-xs uppercase tracking-wider hidden sm:inline-block font-sans">
          {headerSubtitle}
        </span>
        <FontSwitcher />
        <ThemeToggle />
        <NavModal />
      </div>

      {/* Desktop Timeline Line - Fixed position outside containers */}

      <div 
        className="invisible md:visible md:block dark:block fixed left-14 top-20 bottom-0 w-0.5 z-30 pointer-events-none "
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgb(209, 213, 219) 60%, rgb(209, 213, 219) 40%, transparent 100%)',
        }}
      />

      {/* Floating Timeline Navigation - Mobile Only */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 md:hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-8 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-black dark:bg-white'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      <main className="flex-1">
        {/* Mobile Timeline Layout */}
        <div className="md:hidden pt-16">
          {slides.map((slide, index) => (
            <TimelineSection
              key={index}
              slide={slide}
              index={index}
              isActive={currentSlide === index}
            />
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-center w-full min-h-screen overflow-visible pt-16 pb-8 relative">
          {/* Desktop Timeline Navigation - Right Side */}
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-8 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-black dark:bg-white'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400'
                }`}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
          

          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16 lg:py-20 flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 items-center relative min-h-0">
            {/* Timeline dot for current slide */}
            <div className={`hidden md:block fixed left-12 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 z-40 pointer-events-none ${
              'bg-transparent border-black dark:border-white scale-125'
            }`} />

            {/* Section number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`desktop-index-${currentSlide}`}
                className="hidden md:block fixed left-16 top-1/2 -translate-y-1/2 -mt-16 text-sm font-mono text-gray-400 dark:text-gray-500 tracking-wider z-40 pointer-events-none"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
              >
                {String(currentSlide + 1).padStart(2, '0')}
              </motion.div>
            </AnimatePresence>

            {/* Left Content (3D Model or custom) */}
            <div className="w-full flex flex-col items-center justify-center md:col-span-6 order-2 md:order-none relative py-8 md:py-12 lg:py-16">
              {renderLeftContent ? (
                renderLeftContent(slides[currentSlide], currentSlide, true)
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  No left content provided
                </div>
              )}
              
              {/* Enhanced vertical dividing line with accent glow */}
              <div className="hidden md:block absolute -right-4 lg:-right-6 xl:-right-8 top-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-accent dark:via-white to-transparent opacity-80 shadow-lg shadow-accent-300 dark:shadow-white/30"></div>
            </div>

            {/* Right Content (Text content or custom) */}
            <div className="w-full flex flex-col items-center md:items-start justify-center md:col-span-6 order-3 md:order-none md:pl-8 lg:pl-12 xl:pl-16">
              {renderRightContent ? (
                renderRightContent(slides[currentSlide], currentSlide, true)
              ) : (
                <>
                  {/* Default content rendering */}
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={`desktop-title-${currentSlide}`}
                      className="hidden md:block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light mb-1 md:mb-3 gradient-text"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                    >
                      {slides[currentSlide].title}
                    </motion.h1>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`desktop-desc-${currentSlide}`}
                      className="hidden md:block text-sm sm:text-base md:text-xl mb-2 md:mb-3 max-w-2xl mx-auto md:mx-0 text-center md:text-left text-balance leading-snug"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {slides[currentSlide].description}
                    </motion.p>
                  </AnimatePresence>

                  {(slides[currentSlide].ctaPrimary || slides[currentSlide].ctaSecondary) && (
                    <div className="flex flex-col gap-2 w-full max-w-xs mx-auto mb-2 md:mb-3 md:flex-row md:max-w-none md:gap-1 md:justify-start">
                      {slides[currentSlide].ctaPrimary && (
                        <Link
                          href={slides[currentSlide].ctaPrimary!.href}
                          className="w-full md:w-auto px-4 py-2 border border-current rounded-full text-base font-medium text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-center"
                        >
                          {slides[currentSlide].ctaPrimary!.label}
                        </Link>
                      )}
                      {slides[currentSlide].ctaSecondary && (
                        <Link
                          href={slides[currentSlide].ctaSecondary!.href}
                          className="w-full md:w-auto px-4 py-2 border border-current rounded-full text-base font-medium text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-center"
                        >
                          {slides[currentSlide].ctaSecondary!.label}
                        </Link>
                      )}
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`desktop-tagline-${currentSlide}`}
                      className="text-xs uppercase tracking-wider font-light font-sans w-full text-center md:text-left mt-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {slides[currentSlide].tagline}
                    </motion.div>
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Horizontal Timeline - Only on homepage */}
      {showHorizontalTimeline && pathname === "/" && (
        <div className="py-12 relative">
          {/* Horizontal Timeline Line - Full Width */}
          <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent" />
          
          <div className="max-w-4xl mx-auto px-6">
            {/* Horizontal Timeline Navigation */}
            <div className="flex justify-between items-center relative">
              {timelineRoutes.map((route, index) => {
                const isActive = pathname === route.path;
                return (
                  <div key={route.path} className="flex flex-col items-center group">
                    <Link
                      href={route.path}
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 hover:scale-110 -mt-10 ${
                        isActive
                          ? 'bg-transparent border-black dark:border-white scale-125'
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
      )}

      <NextArrow currentPath={pathname} />
      {/* Hide bottom navigation on homepage since we have horizontal timeline */}
      {pathname !== "/" && <Navigation currentPath={pathname} />}
      <CornerDots />
    </div>
  )
}

