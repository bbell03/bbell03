"use client"

import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import GlowLayout from "@/components/shared/GlowLayout"
import { motion } from "framer-motion"

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
    <GlowLayout title="about" subtitle="About">
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Profile & Hero */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-accent shadow-lg bg-white dark:bg-gray-800">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Brandon Bell"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 70vw, (max-width: 1200px) 30vw, 20vw"
                />
                
                {/* Glow effect around profile image */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-green-400/20 blur-2xl scale-110 animate-pulse" />
              </div>
            </div>

            {/* Hero Content */}
            <div className="text-center lg:text-left space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Brandon Bell
              </h2>
              <h3 className="text-lg lg:text-xl font-light text-accent">
                Software Engineer & Designer in NYC
              </h3>
              <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I craft digital products and experiences that blend thoughtful design with robust engineering. Passionate about building for people, open source, and the future of the web.
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex justify-center lg:justify-start">
              <Link 
                href="/contact" 
                className="px-8 py-4 border-2 border-current rounded-full text-lg font-semibold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-center shadow-sm hover:shadow-lg hover:scale-105"
              >
                Let's Connect
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Timeline & Skills */}
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Timeline Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center lg:text-left">
                Experience & Education
              </h3>
              <div className="relative border-l-2 border-accent/30 ml-4">
                {timeline.map((item, idx) => (
                  <div key={idx} className="mb-8 ml-6 flex items-start">
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
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center lg:text-left">
                Skills & Tools
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-3 text-accent text-center lg:text-left">Development</h4>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {devSkills.map((skill) => (
                      <span key={skill} className="px-4 py-2 rounded-full border border-accent text-accent bg-accent/10 font-medium text-sm hover:bg-accent/20 transition-colors hover:scale-105">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-3 text-accent text-center lg:text-left">Design</h4>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {designSkills.map((skill) => (
                      <span key={skill} className="px-4 py-2 rounded-full border border-accent text-accent bg-accent/10 font-medium text-sm hover:bg-accent/20 transition-colors hover:scale-105">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </GlowLayout>
  )
}
