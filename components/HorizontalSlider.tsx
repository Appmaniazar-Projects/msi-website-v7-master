'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Image {
  id: number
  src: string
  alt: string
  title: string
  description: string
  category: string
}

interface HorizontalSliderProps {
  images: Image[]
  title: string
  onImageClick: (image: Image) => void
  className?: string
}

const HorizontalSlider = ({ images, title, onImageClick, className }: HorizontalSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [initialScrollSet, setInitialScrollSet] = useState(false)
  const dragStartX = useRef(0)
  const scrollLeftStart = useRef(0)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    
    // Check if we need to show arrows based on content width
    updateArrowVisibility()
    
    // Add resize listener to update slider on window resize
    window.addEventListener('resize', updateArrowVisibility)
    return () => window.removeEventListener('resize', updateArrowVisibility)
  }, [])

  // Helper function to get the width of a single item based on screen size
  const getItemWidth = (container: HTMLElement) => {
    const containerWidth = container.clientWidth
    // Adjust the divisor based on screen width for better responsiveness
    if (containerWidth < 640) return containerWidth * 0.85 // 1 item on small screens
    if (containerWidth < 1024) return containerWidth * 0.5 // 2 items on medium screens
    return containerWidth * 0.25 // 4 items on large screens
  }

  const updateArrowVisibility = () => {
    const slider = sliderRef.current
    if (!slider) return
    
    // Only show arrows if content is wider than container
    const hasOverflow = slider.scrollWidth > slider.clientWidth
    setShowLeftArrow(hasOverflow && slider.scrollLeft > 0)
    setShowRightArrow(hasOverflow && slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 5)
  }

  const scrollRow = (direction: 'left' | 'right') => {
    const row = sliderRef.current
    if (!row) return
    
    const itemWidth = getItemWidth(row)
    const newScrollPosition = direction === 'left' 
      ? Math.max(0, row.scrollLeft - itemWidth)
      : Math.min(row.scrollWidth - row.clientWidth, row.scrollLeft + itemWidth)
      
    row.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    const row = sliderRef.current
    if (!row) return
    updateArrowVisibility()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
    if (sliderRef.current) {
      scrollLeftStart.current = sliderRef.current.scrollLeft
    }
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    const dx = e.clientX - dragStartX.current
    sliderRef.current.scrollLeft = scrollLeftStart.current - dx
  }
  
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  const handleImageClick = (image: Image, e: React.MouseEvent) => {
    if (!isDragging) {
      e.preventDefault()
      onImageClick(image)
    }
  }

  return (
    <div className={cn("relative group", className)}>
      {title && <h3 className="text-2xl font-bold text-navy-blue mb-6">{title}</h3>}
      
      {/* Left Scroll Button */}
      <AnimatePresence>
        {showLeftArrow && (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scrollRow('left')}
            className="absolute left-0 top-0 z-30 h-full w-12 md:w-16 bg-gradient-to-r from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-start pl-2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-10 w-10 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scrollable Row */}
      <div 
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="flex overflow-x-auto scrollbar-hide py-4 px-0 scroll-smooth"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={`${image.id}-${index}`}
            className="relative flex-none w-full sm:w-1/2 lg:w-1/4 snap-start group/card cursor-pointer px-2"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={(e) => handleImageClick(image, e)}
          >
            <motion.div 
              className="relative aspect-video overflow-hidden rounded-lg shadow-lg"
              animate={{ 
                scale: hoveredIndex === index ? 1.05 : 1,
                zIndex: hoveredIndex === index ? 10 : 0,
                transition: { duration: 0.3 }
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover w-full h-full transform transition-transform duration-300"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPYe9tsaAAAAABJRU5ErkJggg=="
                priority={index <= 4}
              />
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-navy-blue/90 via-navy-blue/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: { duration: 0.3 }
                }}
              >
                {hoveredIndex === index && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-4"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ 
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {image.title}
                      </h3>
                      <p className="text-gray-200 text-sm line-clamp-2">
                        {image.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <AnimatePresence>
        {showRightArrow && (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scrollRow('right')}
            className="absolute right-0 top-0 z-30 h-full w-12 md:w-16 bg-gradient-to-l from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end pr-2"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-10 w-10 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HorizontalSlider