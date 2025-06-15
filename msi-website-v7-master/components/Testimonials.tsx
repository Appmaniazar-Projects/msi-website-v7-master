'use client'

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  { image: 'https://d1dc40k4xbphr.cloudfront.net/images/testimonials/msi-testimonial-1.jpg' },
  { image: 'https://d1dc40k4xbphr.cloudfront.net/images/testimonials/msi-testimonial-2.jpg' },
  { image: 'https://d1dc40k4xbphr.cloudfront.net/images/testimonials/msi-testimonial-3.jpeg' },
  { image: 'https://d1dc40k4xbphr.cloudfront.net/images/testimonials/msi-testimonial-4.jpg' },
  { image: 'https://d1dc40k4xbphr.cloudfront.net/images/testimonials/msi-testimonial-5.jpg' },
  { image: 'https://d1dc40k4xbphr.cloudfront.net/images/testimonials/msi-testimonial-6.jpeg' },
]

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    align: 'center',
    containScroll: 'trimSnaps'
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  const openModal = (image) => {
    setSelectedImage(image)
    setModalOpen(true)
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModalOpen(false)
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'auto'
  }

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleEsc)
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
      // Make sure scrolling is re-enabled when component unmounts
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12 text-navy-blue">What Our Beneficiaries Says</h2>
        </div>

        {/* Carousel */}
        <div className="embla overflow-hidden max-w-7xl mx-auto" ref={emblaRef}>
          <div className="embla__container flex">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4 py-4"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl flex justify-center items-center cursor-pointer"
                  onClick={() => openModal(testimonial.image)}
                >
                  <div className="relative w-full h-64 group">
                    <Image 
                      src={testimonial.image} 
                      alt={`Testimonial ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="mt-2 font-medium">View Full Image</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-10 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 ${
                selectedIndex === index 
                  ? 'w-8 bg-red-600' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              } h-2 rounded-full`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal for full image view */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-screen w-full" onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 text-gray-800 hover:text-red-600 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image container */}
            <div className="relative w-full h-screen max-h-[80vh]">
              <Image 
                src={selectedImage} 
                alt="Full size testimonial image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Testimonials