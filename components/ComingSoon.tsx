'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex justify-center mb-6">
              <Construction className="w-16 h-16 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">Coming Soon</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're working hard to bring you this content. Please check back soon!
            </p>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-700">
                This feature is currently under development. We're committed to providing you with the best educational resources.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 