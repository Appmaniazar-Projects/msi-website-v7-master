'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { galleryImages, categories } from '@/lib/gallery-data'
import HorizontalSlider from '@/components/HorizontalSlider'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<null | typeof galleryImages[0]>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on a mobile device for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Group images by category
  const imagesByCategory = categories.reduce((acc, category) => {
    if (category.id === 'all') return acc
    
    acc[category.id] = galleryImages.filter(img => img.category === category.id)
    return acc
  }, {} as Record<string, typeof galleryImages>)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-20 text-navy-blue overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6"
            >
              Our Gallery
            </motion.h1>
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl opacity-90"
            >
              Capturing moments of learning, growth, and achievement
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </section>

      {/* Gallery Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {Object.entries(imagesByCategory).map(([categoryId, images]) => {
            if (images.length === 0) return null
            
            const categoryName = categories.find(c => c.id === categoryId)?.name || ''
            
            return (
              <div key={categoryId} className="mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-navy-blue mb-6">{categoryName}</h2>
                <HorizontalSlider
                  images={images}
                  title=""
                  onImageClick={setSelectedImage}
                  className="mb-4"
                />
              </div>
            )
          })}
        </div>
      </section>

      {/* Enhanced Image Modal with Pop Effect */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                } 
              }}
              exit={{ 
                scale: 0.5, 
                opacity: 0,
                transition: { duration: 0.3 } 
              }}
              className="relative max-w-5xl w-full max-h-[90vh] md:max-h-[85vh] rounded-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ height: isMobile ? "50vh" : "70vh" }}>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                  quality={95}
                />
              </div>
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 0.2 } }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 sm:p-2 transition-colors duration-300"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
                exit={{ y: 20, opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-t from-black/90 to-black/40"
              >
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 sm:p-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
