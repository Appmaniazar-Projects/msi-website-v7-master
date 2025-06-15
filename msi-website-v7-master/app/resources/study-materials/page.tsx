'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Book, FileText, Video, Download } from 'lucide-react'

export default function StudyMaterials() {
  const materials = [
    {
      title: 'Mathematics',
      items: [
        { name: 'Algebra Fundamentals', type: 'PDF', size: '2.3 MB' },
        { name: 'Calculus Introduction', type: 'PDF', size: '1.8 MB' },
        { name: 'Geometry Basics', type: 'PDF', size: '3.1 MB' },
      ]
    },
    {
      title: 'Physical Sciences',
      items: [
        { name: 'Newton\'s Laws', type: 'PDF', size: '2.5 MB' },
        { name: 'Chemical Reactions', type: 'PDF', size: '1.9 MB' },
        { name: 'Electricity Basics', type: 'PDF', size: '2.7 MB' },
      ]
    },
    {
      title: 'Life Sciences',
      items: [
        { name: 'Cell Biology', type: 'PDF', size: '2.2 MB' },
        { name: 'Evolution', type: 'PDF', size: '1.7 MB' },
        { name: 'Human Anatomy', type: 'PDF', size: '3.4 MB' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Study Materials</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {materials.map((subject, index) => (
                <motion.div
                  key={subject.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Book className="w-5 h-5 mr-2 text-red-600" />
                      {subject.title}
                    </h2>
                    <div className="space-y-4">
                      {subject.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-gray-500 mr-3" />
                            <div>
                              <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                              <p className="text-xs text-gray-500">{item.type} • {item.size}</p>
                            </div>
                          </div>
                          <button
                            className="p-2 text-red-600 hover:text-red-700 transition-colors"
                            aria-label="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Video Tutorials Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Video className="w-6 h-6 mr-2 text-red-600" />
                Video Tutorials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      {/* Video thumbnail placeholder */}
                      <div className="flex items-center justify-center">
                        <span className="text-gray-400">Video Preview</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900">Mathematics Concept {index + 1}</h3>
                      <p className="text-sm text-gray-500 mt-1">Duration: 15:00</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
