"use client"

import projectsData from '@/data/projectsData'
import Card from '@/components/shared/Card'
import GlowLayout from '@/components/shared/GlowLayout'
import { motion } from 'framer-motion'

export default function Projects() {
  return (
    <GlowLayout title="projects" subtitle="Projects">
      <div className="w-full max-w-6xl mx-auto">
        {/* Description */}
        <motion.div 
          className="text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
            >
              <Card
                title={project.title}
                description={project.description}
                imgSrc={project.imgSrc}
                href={project.href}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </GlowLayout>
  )
}
