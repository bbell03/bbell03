"use client"

import { Mail, Linkedin, Github, Twitter } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import Logo from "@/components/Logo"
import NavModal from "@/components/nav-modal"
import CornerDots from "@/components/corner-dots"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import ThemeToggle from "@/components/theme-toggle"
import GradientBackground from "@/components/gradient-background"
import CustomCursor from "@/components/custom-cursor"

export default function Contact() {
  const { theme } = useTheme()
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#040a1d] bg-white transition-colors duration-300">
      <GradientBackground />
      <CustomCursor />

      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider hidden sm:inline-block accent-font">
            {"Software Engineering & Design"}
          </span>
          <ThemeToggle />
          <NavModal />
        </div>
      </header>

      <main className="flex-1 w-full flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Profile & Social */}
              <div className="md:w-1/2 flex flex-col items-start">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 mb-6">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Brandon Bell"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, (max-width: 1200px) 30vw, 20vw"
                  />
                </div>

                <h1 className="text-4xl font-light mb-4 gradient-text">contact</h1>

                <div className="w-24 h-px bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent mb-6" />

                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="flex space-x-6 mb-6">
                  <Link
                    href="mailto:hello@brandonbell.com"
                    aria-label="Email"
                    className="hover:scale-110 transition-transform text-gray-700 dark:text-gray-300"
                  >
                    <Mail className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:scale-110 transition-transform text-gray-700 dark:text-gray-300"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:scale-110 transition-transform text-gray-700 dark:text-gray-300"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="hover:scale-110 transition-transform text-gray-700 dark:text-gray-300"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>

                <div className="text-xs uppercase tracking-wider font-light accent-font text-gray-600 dark:text-gray-400">
                  Product Engineering & Design
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="md:w-1/2 flex flex-col">
                <div className="h-full flex flex-col justify-center">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Name"
                          className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email"
                          className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="Subject"
                        className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Message"
                        className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 min-h-[100px] focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <div>
                      <Button type="submit" className="rounded-full px-6">
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Navigation currentPath={pathname} />
      <CornerDots />
    </div>
  )
}
