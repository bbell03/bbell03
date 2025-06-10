"use client"

import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Navigation from "@/components/navigation"
import Logo from "@/components/Logo"
import NavModal from "@/components/nav-modal"
import CornerDots from "@/components/corner-dots"
import ThemeToggle from "@/components/theme-toggle"
import GradientBackground from "@/components/gradient-background"
import CustomCursor from "@/components/custom-cursor"
import CircularThreeScene from "@/components/CircularThreeScene"
import NextArrow from "@/components/NextArrow"
import { motion } from "framer-motion"

const slides = [
  {
    title: "hello",
    description: "My name is Brandon and I design & develop digital products. I specialize in creating intuitive interfaces and seamless experiences that solve real problems.",
    tagline: "Software Engineering & Design"
  },
  {
    title: "about",
    description: "I'm a product designer and developer with over 8 years of experience creating digital products that solve real problems for real people.",
    tagline: "Experience & Expertise"
  },
  {
    title: "work",
    description: "Check out my latest projects and see how I combine design thinking with technical expertise to create impactful digital experiences.",
    tagline: "Featured Projects"
  }
]

export default function Home() {
  const { theme } = useTheme()
  const pathname = usePathname()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#040a1d] bg-white transition-colors duration-300">
      <GradientBackground />
      <CustomCursor />

      <header className="w-full max-w-6xl mx-auto px-4 py-1 sm:py-2 flex justify-between items-center">
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider hidden sm:inline-block accent-font">
            {"Personal Website & Repository"}
          </span>
          <ThemeToggle />
          <NavModal />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center w-full overflow-auto">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-1 md:py-4 flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-6 items-center">
          {/* Mobile-first: HELLO at top */}
          <motion.h1
            className="block md:hidden text-5xl xs:text-6xl font-light mb-4 mt-4 text-center gradient-text"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
          >
            {slides[currentSlide].title}
          </motion.h1>

          {/* 3D Model - large and centered on mobile */}
          <div className="w-full flex flex-col items-center justify-center md:col-span-5 order-2 md:order-none">
            <div className="mb-4 relative aspect-square w-full max-w-[260px] xs:max-w-[320px] sm:max-w-[380px] md:min-w-[400px] md:max-w-[min(90vw,70vh)] overflow-hidden">
              <CircularThreeScene 
                color={theme === "dark" ? "#ffffff" : "#000000"}
                speed={0.5}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Content - below model on mobile, right on desktop */}
          <div className="w-full flex flex-col items-center md:items-start justify-center md:col-span-7 order-3 md:order-none">
            {/* HELLO for desktop */}
            <motion.h1
              className="hidden md:block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-2 md:mb-4 gradient-text"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
            >
              {slides[currentSlide].title}
            </motion.h1>

            <p className="text-base sm:text-lg md:text-xl mb-3 md:mb-4 max-w-2xl mx-auto md:mx-0 text-center md:text-left text-balance leading-relaxed">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mb-3 md:mb-4 md:flex-row md:max-w-none md:gap-1 md:justify-start">
              <Link
                href="/work"
                className="w-full md:w-auto px-6 py-3 border border-current rounded-full text-lg font-medium text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-center"
              >
                View Work
              </Link>
              <Link
                href="/contact"
                className="w-full md:w-auto px-6 py-3 border border-current rounded-full text-lg font-medium text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-center"
              >
                Contact Me
              </Link>
            </div>

            <div className="text-xs uppercase tracking-wider font-light accent-font w-full text-center md:text-left mt-1">
              {slides[currentSlide].tagline}
            </div>
          </div>
        </div>
      </main>

      <NextArrow currentPath={pathname} />
      <Navigation currentPath={pathname} />
      <CornerDots />
    </div>
  )
}
