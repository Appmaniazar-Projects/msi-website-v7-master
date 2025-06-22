'use client'

import { useState, useEffect } from 'react'
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
  const [hasMounted, setHasMounted] = useState(false)
  const [viewMode, setViewMode] = useState<'all' | 'categories'>('all')

  // Client-only rendering to prevent hydration error
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    setHasMounted(true)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!hasMounted) return null

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
      </section>

      {/* Filter Buttons */}
      <div className="container mx-auto px-4 mb-10">
        <div className="flex justify-center gap-4">
          {['all', 'categories'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as 'all' | 'categories')}
              className={`px-4 py-2 rounded-full border transition-colors ${
                viewMode === mode
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-400'
              }`}
            >
              {mode === 'all' ? 'All Images' : 'Categories'}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      {viewMode === 'all' ? (
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="relative w-full aspect-square cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md"
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : (
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
      )}

      {/* Modal for full image view */}
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
                transition: { type: "spring", stiffness: 300, damping: 30 } 
              }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.3 } }}
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
