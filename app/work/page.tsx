"use client"

import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlowLayout from "@/components/GlowLayout"

const projects = [
  {
    id: 1,
    title: "Next Dashboarding",
    description: "A modern e-commerce platform with seamless checkout experience",
    image: "/placeholder.svg?height=300&width=400",
    category: "Web Development",
    color: "bg-gradient-to-br from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Connect the Dots",
    description: "Mobile application for tracking fitness and nutrition goals",
    image: "/placeholder.svg?height=300&width=400",
    category: "Web App",
    color: "bg-gradient-to-br from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Fractals",
    description: "A collection of fractal patterns generated using the Mandelbrot set",
    image: "/placeholder.svg?height=300&width=400",
    category: "UI/UX Design",
    color: "bg-gradient-to-br from-pink-500 to-rose-500"
  }
]

export default function Work() {
  const { theme } = useTheme()
  const pathname = usePathname()
  const [currentIndex, setCurrentIndex] = useState(0)

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

  return (
    <GlowLayout title="work" subtitle="Work">
      <div className="w-full max-w-6xl mx-auto">
        {/* Description */}
        <motion.div 
          className="text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            A selection of projects I've worked on as a product designer and developer. Looking to present my skillset and take part in projects representing unique solutions to challenging problems.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 ${project.color} opacity-20`} />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6">
                    <div className="text-sm text-accent font-medium mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* View Project Button */}
                    <Button 
                      variant="outline" 
                      className="w-full rounded-full border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300"
                    >
                      View Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link 
            href="/contact" 
            className="inline-block px-8 py-4 border-2 border-current rounded-full text-lg font-semibold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105"
          >
            Let's Work Together
          </Link>
        </motion.div>
      </div>
    </GlowLayout>
  )
}
