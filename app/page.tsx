"use client"
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { Moon, Sun, Mail, Linkedin, Globe, Phone, ChevronDown } from "lucide-react"
const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])
  
  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button after 100px scroll
      setShowScrollTop(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative">
      {/* Side Navigation */}
      <nav className="fixed left-10 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="space-y-5">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center group ${
                activeSection === section.id ? "text-accent" : "text-foreground/50"
              }`}
            >
              <span className="w-8 h-[1px] bg-current mr-4 transition-all group-hover:w-16 group-hover:bg-accent" />
              <span className="text-sm font-medium transition-colors group-hover:text-accent">
                {section.label}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full lg:pl-48">
        {/* Home Section */}
        <section id="home" className="section-padding min-h-screen flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-7xl font-bold mb-4">Brandon Bell</h1>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground/70 mb-6">
              Next generation user interfaces.
            </h2>
            <p className="text-lg text-foreground/70">
              Software Engineering & Design
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section-padding">
          <h2 className="numbered-heading mb-12">About Me</h2>
          <div className="prose prose-invert max-w-3xl">
            <p className="">
            Brandon Bell is a creative coder, designer and software engineer based in NYC. With a Bachelor of Arts degree in Computer Science from Tufts University his focus is on full stack web development, and next generation user interfaces. 
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="text-foreground/70 section-padding">
          <h2 className="numbered-heading mb-12">Where I've Worked</h2>
          <div className="max-w-3xl">
          <h4 className="title-dot">Market Research Intern</h4>
          <hr/>

            <p className="text-foreground">Alloy Development | Summer 2016</p>
            <p>
              Researched live/work housing feasibility and collaborated with architects.
              Utilized CAD software for modeling and conducted land surveys.
            </p>
            <br/>
            <h4 className="title-dot">Web Developer</h4>
          <hr/>
            <p className="text-foreground">Tufts University Science & Technology Center | Summer 2019</p>
            <p>
            Developed a responsive, mobile-friendly website using Bootstrap 3 for MIT and Tufts.
            Implemented conference registration and abstract content submission features.
            Facilitated cross-collaboration among biomedical executives and researchers.

            </p>
            <br/>
          <h4 className="title-dot">Junior Analyst & Developer</h4>
          <hr />

            <p className="text-foreground">First Key Mortgage | June 2021 - June 2022</p>

            <p>
            Enhanced mortgage security data accessibility using JavaScript as a part of a 5 person IT & engineering team.
Developed data visualizations with DevExtreme React Pivot Grid, reducing review time by 3x.
Built and deployed a proof-of-concept MERN stack web application.
Collaborated with startup LiquidMortgage to deliver a custom application.

            </p>
            <br/>

          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-padding">
          <h2 className="numbered-heading mb-12">Some Things I've Built</h2>
          <div className="max-w-3xl">
            <p className="text-foreground/70">
              LALALALALALALALALALALAL
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding">
          <h2 className="numbered-heading mb-12">Get In Touch</h2>
          <div className="max-w-3xl">
          <TooltipProvider>
                    <div className="space-y-2">


                    <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="tel:13473647585"
                            className="flex items-center gap-2 text-sm hover:text-primary"
                          >
                            <Phone className="h-4 w-4" />
                            +1 (347)-364-7585
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>+1 (347)-364-7585</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="mailto:brandonbell.david@gmail.com"
                            className="flex items-center gap-2 text-sm hover:text-primary"
                          >
                            <Mail className="h-4 w-4" />
                            brandonbell.david@gmail.com
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>brandonbell.david@gmail.com</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="https://www.linkedin.com/in/brandon-bell-7289b5171/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm hover:text-primary"
                          >
                            <Linkedin className="h-4 w-4" />
                            brandon-bell-7289b5171
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          {/* <p>{t.tooltips.linkedin}</p> */}
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="https://bbell03.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm hover:text-primary"
                          >
                            <Globe className="h-4 w-4" />
                            bbell03.vercel.app
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          {/* <p>{t.tooltips.website}</p> */}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-accent text-accent-foreground transition-all duration-300 hover:bg-accent/80 ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      animate={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
      />
    </div>
  );
};

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default Index;
