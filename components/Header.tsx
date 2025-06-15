'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { PhoneIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

// Animation variants
const menuVariants = {
  closed: {
    x: "100%",
    transition: { 
      type: "tween", 
      duration: 0.2 
    }
  },
  open: {
    x: "0%",
    transition: { 
      type: "tween", 
      duration: 0.2 
    }
  }
}

const backdropVariants = {
  closed: {
    opacity: 0,
    transition: { 
      duration: 0.2, 
      ease: 'easeInOut' 
    }
  },
  open: {
    opacity: 1,
    transition: { 
      duration: 0.2, 
      ease: 'easeInOut' 
    }
  }
}

// Navigation data
const navItems = ['Home', 'About', 'Services', 'Resources', 'Gallery', 'Blog', 'Get Involved', 'Contact']

const resourcesItems = [
  { 
    name: 'MSI Curriculum Materials',
    href: '/resources/curriculum',
    children: [
      {
        name: 'Mathematics',
        href: '/resources/curriculum/mathematics',
        children: [
          { name: 'Grade 10', href: '/resources/curriculum/mathematics/grade-10' },
          { name: 'Grade 11', href: '/resources/curriculum/mathematics/grade-11' },
          { name: 'Grade 12', href: '/resources/curriculum/mathematics/grade-12' }
        ]
      },
      {
        name: 'Physical Science',
        href: '/resources/curriculum/physical-science',
        children: [
          { name: 'Grade 10', href: '/resources/curriculum/physical-science/grade-10' },
          { name: 'Grade 11', href: '/resources/curriculum/physical-science/grade-11' },
          { name: 'Grade 12', href: '/resources/curriculum/physical-science/grade-12' }
        ]
      }
    ]
  },
  { 
    name: 'National/Provincial Papers', 
    href: '/resources/past-papers',
    children: [
      {
        name: 'Mathematics',
        href: '/resources/past-papers/mathematics',
        children: [
          { name: 'Grade 10', href: '/resources/past-papers/mathematics/grade-10' },
          { name: 'Grade 11', href: '/resources/past-papers/mathematics/grade-11' },
          { name: 'Grade 12', href: '/resources/past-papers/mathematics/grade-12' }
        ]
      },
      {
        name: 'Physical Science',
        href: '/resources/past-papers/physical-science',
        children: [
          { name: 'Grade 10', href: '/resources/past-papers/physical-science/grade-10' },
          { name: 'Grade 11', href: '/resources/past-papers/physical-science/grade-11' },
          { name: 'Grade 12', href: '/resources/past-papers/physical-science/grade-12' }
        ]
      }
    ]
  },
  { 
    name: 'Videos', 
    href: '/resources/videos',
    children: [
      {
        name: 'Mathematics',
        href: '/resources/videos/mathematics',
        children: [
          { name: 'Grade 10', href: '/resources/videos/mathematics/grade-10' },
          { name: 'Grade 11', href: '/resources/videos/mathematics/grade-11' },
          { name: 'Grade 12', href: '/resources/videos/mathematics/grade-12' }
        ]
      },
      {
        name: 'Physical Science',
        href: '/resources/videos/physical-science',
        children: [
          { name: 'Grade 10', href: '/resources/videos/physical-science/grade-10' },
          { name: 'Grade 11', href: '/resources/videos/physical-science/grade-11' },
          { name: 'Grade 12', href: '/resources/videos/physical-science/grade-12' }
        ]
      }
    ]
  }
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll behavior
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      const shouldBeScrolled = window.scrollY > 0
      if (isScrolled !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled)
      }
    }
  }, [isScrolled])

  // Scroll event listener
  useEffect(() => {
    handleScroll()
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window?.addEventListener('scroll', scrollListener, { passive: true })
    return () => window?.removeEventListener('scroll', scrollListener)
  }, [handleScroll])

  // Body scroll lock when menu is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : 'unset'
      return () => { document.body.style.overflow = 'unset' }
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="fixed w-full z-50 transition-all duration-300 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <Image 
              src="https://d1dc40k4xbphr.cloudfront.net/images/msi_logo.png"
              alt="MSI Logo" 
              width={100} 
              height={50} 
              className="h-12 w-auto"
              priority
              loading="eager"
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => {
              if (item === 'Resources') {
                return (
                  <DropdownMenu
                    key={item}
                    trigger={
                      <Link
                        href="/resources"
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-gray-900",
                          "text-gray-600",
                          pathname === '/resources' ? "text-red-600" : pathname.startsWith('/resources') ? "text-red-400" : ""
                        )}
                      >
                        Resources
                      </Link>
                    }
                    align="right"
                  >
                    {resourcesItems.map((resource) => (
                      <DropdownMenuItem key={resource.name}>
                        <Link
                          href={resource.href}
                          className={cn(
                            "text-gray-600 hover:text-gray-900 font-medium w-full block",
                            pathname === resource.href && "text-red-600"
                          )}
                        >
                          {resource.name}
                        </Link>
                      </DropdownMenuItem>
                    ))} 
                  </DropdownMenu>
                );
              }

              const itemPath = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
              const isActive = pathname === itemPath;

              return (
                <Link
                  key={item}
                  href={itemPath}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-gray-900",
                    "text-gray-600",
                    isActive && "text-red-600"
                  )}
                >
                  {item === 'Blog' ? 'Blog' : item}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Contact Info and Donate Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:+27115684332" 
              className={cn(
                "hover:text-gray-900",
                "text-gray-600"
              )}
            >
              <PhoneIcon className="h-5 w-5 inline mr-2" />
              +27 11 568 4332
            </a>
            <Button 
              asChild 
              className={cn(
                "bg-red-600 text-white hover:bg-red-700"
              )}
            >
              <Link href="/donate">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 focus:outline-none"
          >
            <Bars3Icon className="h-6 w-6 text-gray-900" />
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                variants={backdropVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={toggleMenu}
              />

              {/* Menu */}
              <motion.div
                className="fixed top-0 right-0 bottom-0 w-[250px] bg-white z-50 p-6"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex flex-col space-y-4">
                  {/* Filter out Resources from main nav items */}
                  {navItems
                    .filter(item => item !== 'Resources')
                    .map((item) => {
                      const itemPath = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                      const isActive = pathname === itemPath

                      return (
                        <Link
                          key={item}
                          href={itemPath}
                          className={cn(
                            "text-lg font-medium",
                            isActive ? "text-red-600" : "text-gray-600"
                          )}
                          onClick={toggleMenu}
                        >
                          {item === 'Blog' ? 'Blog' : item}
                        </Link>
                      )
                    })}

                  {/* Resources Dropdown */}
                  <div className="relative">
                    <Link
                      href="/resources"
                      className={cn(
                        "text-lg font-medium block mb-2",
                        pathname === '/resources' ? "text-red-600" : pathname.startsWith('/resources') ? "text-red-400" : "text-gray-600"
                      )}
                    >
                      Resources
                    </Link>
                    <div className="mt-2 space-y-2 pl-4">
                      {resourcesItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={toggleMenu}
                          className={cn(
                            "block text-sm font-medium w-full text-left",
                            pathname === item.href ? "text-red-600" : "text-gray-600"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <a 
                      href="tel:+27437262171" 
                      className={cn(
                        "hover:text-gray-900",
                        "text-gray-600"
                      )}
                    >
                      <PhoneIcon className="h-5 w-5 inline mr-2" />
                      +27 43 726 2171
                    </a>
                    <div className="pt-4">
                      <Button 
                        asChild 
                        className="w-full bg-red-600 text-white hover:bg-red-700 pt-3"
                        onClick={toggleMenu}
                      >
                        <Link href="/donate">Donate Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
