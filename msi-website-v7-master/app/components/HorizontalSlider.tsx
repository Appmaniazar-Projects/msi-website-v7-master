import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { GalleryImage } from '../../lib/gallery-data'

interface HorizontalSliderProps {
  images: GalleryImage[];
  title: string;
  onImageClick?: (image: GalleryImage) => void;
  className?: string;
}

export default function HorizontalSlider({
  images,
  title,
  onImageClick,
  className = ""
}: HorizontalSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Create a circular array of images for infinite loop
  const loopedImages = [...images.slice(-1), ...images, ...images.slice(0, 1)]
  const [currentIndex, setCurrentIndex] = useState(1)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    // Set initial scroll position to show first actual image
    slider.scrollLeft = slider.clientWidth * 0.25
  }, [])

  const scrollRow = (direction: 'left' | 'right') => {
    const row = sliderRef.current
    if (!row) return
    
    const itemWidth = row.clientWidth * 0.25 // Width of one item
    const newScrollPosition = direction === 'left' 
      ? row.scrollLeft - itemWidth
      : row.scrollLeft + itemWidth
      
    row.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    })

    // Handle infinite loop
    if (direction === 'left' && currentIndex === 1) {
      setTimeout(() => {
        row.scrollTo({ left: itemWidth * (images.length), behavior: 'auto' })
        setCurrentIndex(images.length)
      }, 300)
    } else if (direction === 'right' && currentIndex === images.length) {
      setTimeout(() => {
        row.scrollTo({ left: itemWidth, behavior: 'auto' })
        setCurrentIndex(1)
      }, 300)
    } else {
      setCurrentIndex(prev => direction === 'left' ? prev - 1 : prev + 1)
    }
  }

  const handleScroll = () => {
    const row = sliderRef.current
    if (!row) return

    setShowLeftArrow(true)
    setShowRightArrow(true)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  const handleImageClick = (image: GalleryImage, e: React.MouseEvent) => {
    if (!isDragging && onImageClick) {
      e.preventDefault()
      onImageClick(image)
    }
  }

  return (
    <div className={`relative group ${className}`}>
      <h2 className="text-3xl font-bold text-navy-blue mb-8 pl-16 md:pl-20 pr-4 md:pr-12">
        {title}
      </h2>
      
      {/* Left Scroll Button */}
      <AnimatePresence>
        {showLeftArrow && (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scrollRow('left')}
            className="absolute left-0 top-[4.5rem] z-30 h-[calc(100%-4.5rem)] w-12 md:w-16 bg-gradient-to-r from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-start pl-2"
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
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-0 scroll-smooth"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        {loopedImages.map((image, index) => (
          <motion.div
            key={`${image.id}-${index}`}
            className="relative flex-none w-[25%] snap-start group/card cursor-pointer"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={(e) => handleImageClick(image, e)}
          >
            <motion.div 
              className="relative aspect-video overflow-hidden rounded-lg shadow-lg mx-2"
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
                sizes="25vw"
                className="object-cover w-full h-full transform transition-transform duration-300"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPYe9tsaAAAAABJRU5ErkJggg=="
                priority={index <= 4}
              />
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-navy-blue/90 via-navy-blue/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0.4,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ 
                    y: hoveredIndex === index ? 0 : 10,
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <h3 className="text-lg font-semibold text-white truncate">
                    {image.title}
                  </h3>
                  <p className="text-gray-200 text-sm line-clamp-2">
                    {image.description}
                  </p>
                </motion.div>
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
            className="absolute right-0 top-[4.5rem] z-30 h-[calc(100%-4.5rem)] w-12 md:w-16 bg-gradient-to-l from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end pr-2"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-10 w-10 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
} 