'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

const routes = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/work", label: "Work" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
]

interface NextArrowProps {
  currentPath: string
  className?: string
}

export default function NextArrow({ currentPath, className = '' }: NextArrowProps) {
  const { theme } = useTheme()
  const router = useRouter()

  // Find the index of the current path in our routes array
  const activeIndex = routes.findIndex(
    (route) => currentPath === route.path || (route.path !== "/" && currentPath.startsWith(route.path)),
  )

  // Get the next path, cycling to the first route if we're at the last one
  const nextPath = routes[(activeIndex + 1) % routes.length].path

  return (
    <motion.button
      onClick={() => router.push(nextPath)}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full border border-current hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label={`Go to ${routes[(activeIndex + 1) % routes.length].label}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transform -rotate-90"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </motion.button>
  )
} 