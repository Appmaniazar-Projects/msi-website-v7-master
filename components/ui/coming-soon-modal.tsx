'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComingSoonModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
}

export function ComingSoonModal({ isOpen, title, onClose }: ComingSoonModalProps) {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="relative bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto pointer-events-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white relative">
                <h3 className="text-xl font-semibold">{title}</h3>
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-red-600" />
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold text-navy-blue mb-3">Coming Soon!</h4>
                <p className="text-gray-600 mb-6">
                  We're working hard to bring you this content. Please check back soon!
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Available in the near future</span>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="bg-gray-50 p-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 