'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { MessageCircle, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { scaleUp } from '@/utils/animations'

const WhatsAppButton = () => {
  const [showNotification, setShowNotification] = useState(false)

  /*useEffect(() => {
    // Show notification initially after 3 seconds
    const initialTimeout = setTimeout(() => setShowNotification(true), 3000)

    // Show notification every 30 seconds
    const interval = setInterval(() => {
      setShowNotification(true)
      // Hide notification after 5 seconds
      setTimeout(() => setShowNotification(false), 5000)
    }, 30000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])*/

  const bubbleVariants = {
    initial: { scale: 0, opacity: 0, y: 20 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    exit: { 
      scale: 0,
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  }

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.9 }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute bottom-full left-0 mb-4 min-w-[200px] max-w-[220px]"
          >
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-green-500 p-2">
                <div className="flex items-center text-white">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  <span className="font-semibold text-sm">Need Help?</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-3">
                <p className="text-xs text-gray-600 leading-snug">
                  Chat with us on WhatsApp for quick assistance!
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowNotification(false)}
                className="absolute top-1.5 right-1.5 p-1 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Tail */}
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.a
        href="https://wa.me/+27817461678"
        target="_blank"
        rel="noopener noreferrer"
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
      >
        <FaWhatsapp className="w-8 h-8 text-white" />
      </motion.a>
    </div>
  )
}

export default WhatsAppButton
