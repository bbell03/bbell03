"use client"

import Image from "next/image"
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
    description: "My name is Brandon and I design & develop digital products for humans. I specialize in creating intuitive interfaces and seamless experiences that solve real problems.",
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

      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
      <Logo />
        <div className="flex items-center space-x-4">
          <span className="text-xs uppercase tracking-wider hidden sm:inline-block accent-font">
            {"Personal Website & Repository"}
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center w-full h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
            {/* Left column with centered profile image */}
            <div className="md:col-span-5 flex flex-col items-center justify-center w-full">
              <div className="pb-10 relative aspect-square w-full min-w-[280px] max-w-[min(90vw,55vh)] md:min-w-[400px] md:max-w-[min(90vw,70vh)] overflow-hidden">
                <CircularThreeScene 
                  color={theme === "dark" ? "#ffffff" : "#000000"}
                  speed={0.5}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right column with content */}
            <div className="md:col-span-7 flex flex-col items-center md:items-start justify-center w-full">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full text-center md:text-left"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-3 md:mb-4 gradient-text">
                  {slides[currentSlide].title}
                </h1>

                <p className="text-sm sm:text-base md:text-lg mb-3 md:mb-4 max-w-2xl mx-auto md:mx-0 text-balance leading-relaxed">
                  {slides[currentSlide].description}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-3 md:mb-4">
                  <Link
                    href="/work"
                    className="px-5 sm:px-6 py-2 sm:py-2.5 border border-current rounded-full text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    View Work
                  </Link>
                  <Link
                    href="/contact"
                    className="px-5 sm:px-6 py-2 sm:py-2.5 border border-current rounded-full text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    Contact Me
                  </Link>
                </div>

                <div className="text-xs uppercase tracking-wider font-light accent-font">
                  {slides[currentSlide].tagline}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <NextArrow currentPath={pathname} />
      <Navigation currentPath={pathname} />
      <NavModal />
      <CornerDots />
    </div>
  )
}
