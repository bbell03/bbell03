"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Navigation from "@/components/shared/navigation"
import Image from "next/image"
import Logo from "@/components/shared/Logo"
import NavModal from "@/components/shared/nav-modal"
import CornerDots from "@/components/shared/corner-dots"
import { useTheme } from "next-themes"
import ThemeToggle from "@/components/shared/theme-toggle"
import GradientBackground from "@/components/shared/gradient-background"

// Mock project data
const projects = {
  "1": {
    id: "1",
    title: "E-commerce Platform",
    description: "A modern e-commerce platform with seamless checkout experience",
    fullDescription: `
      This project involved redesigning the entire e-commerce experience for a major retail brand. 
      The goal was to increase conversion rates and improve the overall user experience.
      
      I led the design process from initial research through to final implementation, working closely 
      with developers and stakeholders to ensure the vision was executed properly.
      
      Key achievements:
      • 35% increase in conversion rate
      • 28% reduction in cart abandonment
      • 42% increase in mobile purchases
    `,
    image: "/placeholder.svg?height=500&width=800",
    technologies: ["React", "Node.js", "Stripe", "AWS"],
    category: "Web Development",
  },
  "2": {
    id: "2",
    title: "Health & Wellness App",
    description: "Mobile application for tracking fitness and nutrition goals",
    fullDescription: `
      This health and wellness app was designed to help users track their fitness and nutrition goals 
      in a simple, intuitive way. The app includes features for meal planning, workout tracking, and 
      progress visualization.
      
      I was responsible for the UX/UI design and frontend development, focusing on creating an 
      experience that would encourage daily use and habit formation.
      
      Key achievements:
      • 4.8/5 star rating on App Store
      • 92% user retention after 30 days
      • Featured in "Apps We Love" section
    `,
    image: "/placeholder.svg?height=500&width=800",
    technologies: ["React Native", "Firebase", "Redux", "Figma"],
    category: "Mobile App",
  },
  "3": {
    id: "3",
    title: "Financial Dashboard",
    description: "Interactive dashboard for visualizing financial data",
    fullDescription: `
      This financial dashboard was created for a fintech startup to help their users visualize and 
      understand complex financial data. The dashboard includes real-time data visualization, 
      customizable reports, and predictive analytics.
      
      I designed and developed the frontend of the application, focusing on creating clear, 
      understandable visualizations of complex data.
      
      Key achievements:
      • Reduced time spent on reporting by 68%
      • Increased user engagement by 47%
      • Helped secure $2.5M in additional funding
    `,
    image: "/placeholder.svg?height=500&width=800",
    technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
    category: "Data Visualization",
  },
  "4": {
    id: "4",
    title: "Brand Identity System",
    description: "Complete brand identity system for a tech startup",
    fullDescription: `
      I created a comprehensive brand identity system for a tech startup that was preparing for 
      their public launch. The project included logo design, typography selection, color palette 
      development, and creation of brand guidelines.
      
      The goal was to create a distinctive, memorable brand that would stand out in a crowded market 
      while communicating the company's core values and mission.
      
      Key achievements:
      • Brand recognition increased by 64% in target market
      • Successfully launched with positive press coverage
      • Brand guidelines adopted across all company departments
    `,
    image: "/placeholder.svg?height=500&width=800",
    technologies: ["Figma", "Illustrator", "Photoshop", "InDesign"],
    category: "Brand Design",
  },
  "5": {
    id: "5",
    title: "Social Media Platform",
    description: "Community-focused social platform for creative professionals",
    fullDescription: `
      This project involved designing and developing a niche social media platform specifically for 
      creative professionals to showcase their work, collaborate on projects, and build their network.
      
      I led both the design and frontend development, focusing on creating an intuitive interface 
      that would encourage engagement and content sharing.
      
      Key achievements:
      • Grew to 50,000+ users within first 6 months
      • Average session duration of 12+ minutes
      • Featured in multiple design and tech publications
    `,
    image: "/placeholder.svg?height=500&width=800",
    technologies: ["React", "GraphQL", "Node.js", "MongoDB"],
    category: "Web Development",
  },
  "6": {
    id: "6",
    title: "Smart Home Interface",
    description: "Intuitive interface for controlling smart home devices",
    fullDescription: `
      I designed a user interface for a smart home system that allows users to control all of their 
      connected devices from a single, intuitive dashboard. The interface needed to be simple enough 
      for users of all ages while providing advanced functionality for power users.
      
      The project included extensive user research, prototyping, and usability testing to ensure 
      the final product met the needs of a diverse user base.
      
      Key achievements:
      • 94% user satisfaction rating
      • Reduced support tickets by 72%
      • Adopted by three major smart home device manufacturers
    `,
    image: "/placeholder.svg?height=500&width=800",
    technologies: ["Figma", "Sketch", "Protopie", "React"],
    category: "UI/UX Design",
  },
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const { theme } = useTheme()
  const pathname = usePathname()
  const project = projects[params.id]

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#040a1d] bg-white transition-colors duration-300">
      <GradientBackground />

      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-4">
          <span className="text-xs uppercase tracking-wider hidden sm:inline-block accent-font">
            {theme === "dark" ? "Personal Experience" : "Product Experience"}
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-6xl mx-auto px-6 py-12">
          <Link href="/work" className="flex items-center text-sm mb-8 hover:underline animated-underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all projects
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
            {/* Left column with project details */}
            <div className="flex flex-col">
              <div className="text-xs uppercase tracking-wider mb-4 opacity-70 accent-font">{project.category}</div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Year</h3>
                  <p className="text-sm">2023</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Role</h3>
                  <p className="text-sm">Lead Designer & Developer</p>
                </div>
              </div>
            </div>

            {/* Right column with project content */}
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-light mb-4 gradient-text">{project.title}</h1>
              <p className="text-sm text-muted-foreground mb-8">{project.description}</p>

              <div className="relative h-64 md:h-80 mb-8 bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>

              <div className="space-y-4 text-sm">
                {project.fullDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-xs uppercase tracking-wider font-light text-center accent-font">
            Product Engineering & Design
          </div>
        </div>
      </main>

      <Navigation currentPath="/work" />
      <NavModal />
      <CornerDots />
    </div>
  )
}
