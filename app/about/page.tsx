"use client"

import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import Logo from "@/components/Logo"
import NavModal from "@/components/nav-modal"
import CornerDots from "@/components/corner-dots"
import Image from "next/image"
import ThemeToggle from "@/components/theme-toggle"
import GradientBackground from "@/components/gradient-background"
import CustomCursor from "@/components/custom-cursor"
import Link from "next/link"

const timeline = [
  {
    year: "2021–Present",
    title: "Software Developer, NYC",
    description: "Building digital experiences and elegant solutions for real-world problems.",
    icon: "/icons/code.svg",
  },
  {
    year: "2017–2021",
    title: "Tufts University",
    description: "B.A. Computer Science",
    icon: "/icons/education.svg",
  },
]

const devSkills = ["React", "Next.js", "TypeScript", "Node.js", "Python", "C++"]
const designSkills = ["UI/UX Design", "Prototyping", "Design Systems", "Responsive Design"]

export default function About() {
  const { theme } = useTheme()
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#040a1d] bg-white transition-colors duration-300">
      <GradientBackground />
      <CustomCursor />
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-4">
          <span className="text-xs uppercase tracking-wider hidden sm:inline-block accent-font">
            {"About"}
          </span>
          <ThemeToggle />
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center py-16 mb-12 bg-gradient-to-br from-blue-100/60 via-white to-blue-200/40 dark:from-blue-900/40 dark:via-[#040a1d] dark:to-blue-950/30">
        <div className="absolute inset-0 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent mb-6 shadow-lg bg-white dark:bg-gray-800">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Brandon Bell"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 70vw, (max-width: 1200px) 30vw, 20vw"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 text-center">Brandon Bell</h1>
          <h2 className="text-lg md:text-xl font-light text-accent mb-4 text-center">Software Engineer & Designer in NYC</h2>
          <p className="max-w-xl text-center text-base md:text-lg text-gray-700 dark:text-gray-300 mb-2">I craft digital products and experiences that blend thoughtful design with robust engineering. Passionate about building for people, open source, and the future of the web.</p>
        </div>
      </section>
      {/* Timeline Section */}
      <section className="w-full max-w-3xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white text-center">Experience & Education</h3>
        <div className="relative border-l-2 border-accent/30 ml-4">
          {timeline.map((item, idx) => (
            <div key={idx} className="mb-10 ml-6 flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white font-bold shadow-lg -ml-9 mt-1">
                <Image src={item.icon} alt="" width={20} height={20} />
              </span>
              <div className="ml-4">
                <div className="text-sm text-accent font-semibold mb-1">{item.year}</div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</div>
                <div className="text-base text-gray-600 dark:text-gray-300">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Skills Section */}
      <section className="w-full max-w-3xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">Skills & Tools</h3>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1">
            <h4 className="text-lg font-medium mb-3 text-accent">Development</h4>
            <div className="flex flex-wrap gap-3">
              {devSkills.map((skill) => (
                <span key={skill} className="px-4 py-1 rounded-full border border-accent text-accent bg-accent/10 font-medium text-sm hover:bg-accent/20 transition-colors">{skill}</span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-medium mb-3 text-accent">Design</h4>
            <div className="flex flex-wrap gap-3">
              {designSkills.map((skill) => (
                <span key={skill} className="px-4 py-1 rounded-full border border-accent text-accent bg-accent/10 font-medium text-sm hover:bg-accent/20 transition-colors">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action / Fun Fact */}
      <section className="w-full max-w-xl mx-auto px-4 mb-20">
        <div className="rounded-2xl bg-accent/10 border border-accent p-8 flex flex-col items-center text-center shadow-lg">
          <div className="text-xl font-semibold text-accent mb-2">Let's build something together!</div>
          <div className="text-base text-gray-700 dark:text-gray-200 mb-4">Open to collaborations, freelance, or just a chat about tech and design.</div>
          <Link href="/contact" className="px-6 py-2 rounded-full bg-accent text-white font-semibold shadow hover:bg-accent/90 transition-colors">Contact Me</Link>
        </div>
      </section>
      <Navigation currentPath={pathname} />
      <NavModal />
      <CornerDots />
    </div>
  )
}
