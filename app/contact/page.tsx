"use client"

import { Mail, Linkedin, Github, Twitter } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import GlowLayout from "@/components/GlowLayout"
import { motion } from "framer-motion"

export default function Contact() {
  const { theme } = useTheme()
  const pathname = usePathname()

  return (
    <GlowLayout title="contact" subtitle="Software Engineering & Design">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Profile & Social */}
            <motion.div 
              className="flex flex-col items-center lg:items-start space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Profile Image */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
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

              {/* Divider */}
              <div className="w-24 h-px bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent" />

              {/* Description */}
              <p className="text-base text-gray-700 dark:text-gray-300 text-center lg:text-left leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              {/* Social Links */}
              <div className="flex space-x-6">
                <Link
                  href="mailto:hello@brandonbell.com"
                  aria-label="Email"
                  className="hover:scale-110 transition-transform text-gray-700 dark:text-gray-300 hover:text-accent"
                >
                  <Mail className="h-6 w-6" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:scale-110 transition-transform text-gray-700 dark:text-gray-300 hover:text-accent"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:scale-110 transition-transform text-gray-700 dark:text-gray-300 hover:text-accent"
                >
                  <Github className="h-6 w-6" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="hover:scale-110 transition-transform text-gray-700 dark:text-gray-300 hover:text-accent"
                >
                  <Twitter className="h-6 w-6" />
                </Link>
              </div>

              {/* Tagline */}
              <div className="text-xs uppercase tracking-wider font-light text-gray-600 dark:text-gray-400 text-center lg:text-left">
                Product Engineering & Design
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="h-full flex flex-col justify-center">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Input
                        type="text"
                        placeholder="Name"
                        className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Subject"
                      className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Message"
                      className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 py-3 min-h-[120px] focus-visible:ring-0 focus-visible:ring-offset-0 text-lg resize-none"
                    />
                  </div>
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </GlowLayout>
  )
}
