"use client"

import Link from "next/link"

const routes = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/work", label: "Work" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
]

interface NavigationProps {
  currentPath: string
}

export default function Navigation({ currentPath }: NavigationProps) {
  // Find the index of the current path in our routes array
  const activeIndex = routes.findIndex(
    (route) => currentPath === route.path || (route.path !== "/" && currentPath.startsWith(route.path)),
  )

  return (
    <footer className="container mx-auto px-4 py-6 flex flex-col items-center">
      {/* Text links */}
      <div className="flex space-x-6 mb-2">
        {routes.map((route, index) => {
          const isActive = activeIndex === index;
          return (
            <Link key={route.path} href={route.path} aria-label={route.label}>
              <span
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-accent"
                    : "text-gray-400 dark:text-gray-500 hover:text-accent"
                }${isActive ? " pointer-events-none" : ""}`}
              >
                {route.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Dots */}
      <div className="flex space-x-2">
        {routes.map((route, index) => (
          <Link key={route.path} href={route.path} aria-label={route.label}>
            <div
              className={`w-2 h-2 rounded-full ${
                activeIndex === index ? "bg-accent" : "bg-gray-300 dark:bg-gray-700"
              }`}
            />
          </Link>
        ))}
      </div>
    </footer>
  )
}
