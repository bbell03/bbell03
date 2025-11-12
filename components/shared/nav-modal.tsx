"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/work", label: "Work" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
]

export default function NavModal() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme } = useTheme()

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative z-[9998] w-8 h-8 flex flex-col justify-center items-center space-y-1 group text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white focus:text-accent transition-colors"
        aria-label="Open navigation"
      >
        <span className="w-5 h-px bg-current transition-all group-hover:w-6"></span>
        <span className="w-6 h-px bg-current"></span>
        <span className="w-4 h-px bg-current transition-all group-hover:w-6"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-[#040a1d] z-[9999] flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-900 dark:text-white hover:text-accent focus:text-accent transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <nav className="flex flex-col items-center space-y-8 sm:space-y-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-3xl sm:text-2xl font-light transition-colors duration-200 ${
                        isActive
                          ? "text-black dark:text-white font-medium"
                          : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      }${isActive ? " pointer-events-none" : ""}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-6 text-center">
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Software Engineering & Design
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
