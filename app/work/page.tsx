"use client"

import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Logo from "@/components/Logo"
import NavModal from "@/components/nav-modal"
import CornerDots from "@/components/corner-dots"
import ThemeToggle from "@/components/theme-toggle"
import GradientBackground from "@/components/gradient-background"
import { motion } from "framer-motion"
import CustomCursor from "@/components/custom-cursor"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform with seamless checkout experience",
    image: "/placeholder.svg?height=300&width=400",
    category: "Web Development",
    color: "bg-gradient-to-br from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Health & Wellness App",
    description: "Mobile application for tracking fitness and nutrition goals",
    image: "/placeholder.svg?height=300&width=400",
    category: "Mobile App",
    color: "bg-gradient-to-br from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Financial Dashboard",
    description: "Interactive dashboard for visualizing financial data",
    image: "/placeholder.svg?height=300&width=400",
    category: "Data Visualization",
    color: "bg-gradient-to-br from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Brand Identity System",
    description: "Complete brand identity system for a tech startup",
    image: "/placeholder.svg?height=300&width=400",
    category: "Brand Design",
    color: "bg-gradient-to-br from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "Social Media Platform",
    description: "Community-focused social platform for creative professionals",
    image: "/placeholder.svg?height=300&width=400",
    category: "Web Development",
    color: "bg-gradient-to-br from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    title: "Smart Home Interface",
    description: "Intuitive interface for controlling smart home devices",
    image: "/placeholder.svg?height=300&width=400",
    category: "UI/UX Design",
    color: "bg-gradient-to-br from-pink-500 to-rose-500"
  }
]

export default function Work() {
  const { theme } = useTheme()
  const pathname = usePathname()
  const [currentIndex, setCurrentIndex] = useState(2)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setCurrentIndex(prev => Math.max(0, prev - 1))
    } else if (e.key === 'ArrowRight') {
      setCurrentIndex(prev => Math.min(projects.length - 1, prev + 1))
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current!.offsetLeft)
    setScrollLeft(currentIndex)
  }

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const x = e.pageX - carouselRef.current!.offsetLeft
    const walk = (x - startX) / 100 // Adjust sensitivity here
    const newIndex = Math.round(scrollLeft - walk)
    
    // Stop at first and last slides
    if (newIndex < 0) {
      setCurrentIndex(0)
    } else if (newIndex >= projects.length - 1) {
      setCurrentIndex(projects.length - 1)
    } else {
      setCurrentIndex(newIndex)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const getCardStyle = (index: number) => {
    const position = index - currentIndex
    const absPosition = Math.abs(position)

    // Base transforms
    const translateX = position * 120
    const translateZ = -absPosition * 100
    const rotateY = position * 25
    let scale = 1 - absPosition * 0.2
    let opacity = 1 - absPosition * 0.3

    // Limit visibility to 2 cards on each side
    if (absPosition > 2) {
      opacity = 0
      scale = 0.5
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(opacity, 0),
      zIndex: 10 - absPosition,
      transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (isDragging) return

    // If it's the current card, do nothing
    if (index === currentIndex) return

    // If it's the next card (to the right)
    if (index === currentIndex + 1) {
      setCurrentIndex(prev => Math.min(projects.length - 1, prev + 1))
    }
    // If it's the previous card (to the left)
    else if (index === currentIndex - 1) {
      setCurrentIndex(prev => Math.max(0, prev - 1))
    }
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#040a1d] bg-white transition-colors duration-300">
      <GradientBackground />
      <CustomCursor />

      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider hidden sm:inline-block accent-font">
            {"Work"}
          </span>
          <ThemeToggle />
          <NavModal />
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="w-full max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 gradient-text">work</h1>
            <p className="text-sm md:text-base mb-8 text-balance leading-relaxed">
              A selection of projects I've worked on as a product designer and developer. Each project represents a
              unique challenge and solution. (Placeholders unless otherwise noted). Looking into staging some projects I have on hand at current -- 
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative w-full max-w-5xl mx-auto mb-16">
            <div
              ref={carouselRef}
              className="relative h-[400px] overflow-hidden cursor-grab active:cursor-grabbing"
              style={{
                perspective: "1000px",
                perspectiveOrigin: "center center",
              }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ 
                  transformStyle: "preserve-3d",
                  transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {projects.map((project, index) => (
                  <Link
                    key={project.id}
                    href={`/work/${project.id}`}
                    tabIndex={0}
                    className="absolute"
                    style={getCardStyle(index)}
                    onClick={e => {
                      if (isDragging) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div
                      className={`w-64 h-64 rounded-2xl shadow-2xl cursor-pointer transition-all duration-700 ${
                        theme === 'dark' 
                          ? 'shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]' 
                          : 'shadow-[0_0_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(0,0,0,0.2)]'
                      } ${project.color}`}
                      onClick={(e) => handleCardClick(e, index)}
                    >
                      <div className={`w-full h-full flex flex-col items-center justify-center text-white font-bold text-xl rounded-2xl backdrop-blur-sm p-6 transition-all duration-700 ${
                        theme === 'dark' 
                          ? 'bg-black/30 hover:bg-black/40' 
                          : 'bg-black/20 hover:bg-black/30'
                      }`}>
                        <span className={`text-sm uppercase tracking-wider mb-3 accent-font ${
                          theme === 'dark' ? 'text-white/80' : 'text-white/70'
                        }`}>
                          {project.category}
                        </span>
                        <span className="text-center text-lg md:text-xl">{project.title}</span>
                        <p className={`text-sm mt-3 text-center line-clamp-2 ${
                          theme === 'dark' ? 'text-white/90' : 'text-white/80'
                        }`}>
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Segmented Line Scroll Selector */}
            <div className="flex items-center justify-center mt-8">
              <div className={`relative w-full max-w-md h-[2px] ${
                theme === 'dark' ? 'bg-white/20' : 'bg-black/20'
              }`}>
                <div 
                  className={`absolute h-full transition-all duration-700 ease-out ${
                    theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`}
                  style={{
                    width: `${100 / projects.length}%`,
                    left: `${(currentIndex * 100) / projects.length}%`
                  }}
                />
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 -ml-4 flex items-center justify-center"
                    style={{
                      left: `${(index * 100) / projects.length}%`
                    }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <div className={`w-2 h-2 rounded-full transition-all duration-700 ease-out ${
                      index === currentIndex 
                        ? theme === 'dark' 
                          ? 'bg-white scale-150' 
                          : 'bg-black scale-150'
                        : theme === 'dark'
                          ? 'bg-white/40 hover:bg-white/60'
                          : 'bg-black/40 hover:bg-black/60'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs uppercase tracking-wider font-light text-center accent-font">
            Programming Projects
          </div>
        </div>
      </main>

      <Navigation currentPath={pathname} />
      <CornerDots />
    </div>
  )
}
