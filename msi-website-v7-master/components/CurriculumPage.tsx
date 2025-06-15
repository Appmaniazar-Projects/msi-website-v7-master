// Create a shared component in a file like CurriculumPage.tsx
'use client'

import React, { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

// Components that use hooks like useSearchParams must be wrapped in Suspense
interface CurriculumPageProps {
  grade: string;
  subject: string;
  contentComponent: React.ReactNode;
}

export default function CurriculumPage({ 
  grade, 
  subject,
  contentComponent 
}: CurriculumPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              href="/resources/curriculum"
              className="inline-flex items-center text-gray-600 hover:text-red-600"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Curriculum
            </Link>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold text-navy-blue mb-4 md:mb-0">
                Grade {grade} {subject}
              </h1>
            </div>
          </motion.div>

          {/* Wrap any component that uses useSearchParams in Suspense */}
          <Suspense fallback={<div className="text-center py-8">Loading curriculum content...</div>}>
            {contentComponent}
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}