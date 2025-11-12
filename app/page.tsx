"use client"

import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import LandingPageLayout, { Slide } from "@/components/home/LandingPageLayout"

// Dynamically import heavy 3D component
const CircularThreeScene = dynamic(() => import("@/components/home/CircularThreeScene"), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
})

const slides: Slide[] = [
  {
    title: "hello",
    description: "My name is Brandon and I design & develop digital products. I specialize in creating intuitive interfaces and seamless experiences that solve real problems.",
    tagline: "Software Engineering & Design",
    ctaPrimary: { href: "/work", label: "View Work" },
    ctaSecondary: { href: "/contact", label: "Contact Me" }
  },
  {
    title: "about",
    description: "I'm a product designer and developer with robust experience creating digital products that solve real problems for real people.",
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

  // Render function for the 3D model (left side on desktop)
  const renderLeftContent = (slide: Slide, index: number, isActive: boolean) => (
    <div className="mb-4 relative aspect-square w-full max-w-[480px] xs:max-w-[520px] sm:max-w-[580px] md:max-w-[min(65vw,75vh)] lg:max-w-[min(60vw,70vh)] xl:max-w-[min(55vw,65vh)] overflow-visible group">
      {/* Accent glow background - subtle circular glow */}
      <div className="absolute inset-0 bg-accent opacity-[0.03] rounded-full blur-3xl scale-150 group-hover:opacity-[0.08] group-hover:scale-175 transition-all duration-1000"></div>
      
      <CircularThreeScene 
        color={theme === "dark" ? "#ffffff" : "#000000"}
        speed={0.3}
        className="w-full h-full relative z-10 group-hover:scale-105 transition-transform duration-500"
      />
      
      {/* Orbiting accent dots */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-accent rounded-full opacity-60"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1.5 h-1.5 bg-accent rounded-full opacity-40"></div>
      </div>
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-accent rounded-full opacity-60"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1.5 h-1.5 bg-accent rounded-full opacity-40"></div>
      </div>
       {/*
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
        <div className="absolute top-1/2 right-0 translate-x-1 -translate-y-1/2 w-1 h-1 bg-accent rounded-full opacity-50"></div>
        <div className="absolute top-1/2 left-0 -translate-x-1 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full opacity-30"></div>
      </div> */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s',}}>
        <div className="absolute top-1/2 right-0 translate-x-1 -translate-y-1/2 w-1 h-1 bg-accent rounded-full opacity-50"></div>
        <div className="absolute top-1/2 left-0 -translate-x-1 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full opacity-30"></div>
      </div>
    </div>
  )

  return (
    <LandingPageLayout
      slides={slides}
      renderLeftContent={renderLeftContent}
      showGradientOverlay={true}
      showHorizontalTimeline={true}
    />
  )
}
