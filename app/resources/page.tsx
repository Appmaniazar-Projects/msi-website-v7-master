'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  Book, 
  FileText, 
  Video, 
  GraduationCap, 
  BookOpen, 
  Newspaper,
  Lightbulb,
  Film,
  Archive,
  ChevronRight,
  Calculator,
  Atom
} from 'lucide-react'

export default function ResourcesPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6">MSI Resources</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of educational resources designed to support students, teachers, and parents in mathematics and science education.
            </p>
          </motion.div>

          {/* Main Categories */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {/* MSI Curriculum Materials */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                <Book className="w-12 h-12 mb-4" />
                <h2 className="text-2xl font-bold mb-2">MSI Curriculum Materials</h2>
                <p className="text-white/90">Official MSI curriculum resources for students</p>
              </div>
              <div className="p-6">
                {/* Mathematics Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Calculator className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Mathematics</h3>
                  </div>
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/curriculum/mathematics/grade-10" className="hover:text-red-600 transition-colors">
                        Grade 10
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/curriculum/mathematics/grade-11" className="hover:text-red-600 transition-colors">
                        Grade 11
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/curriculum/mathematics/grade-12" className="hover:text-red-600 transition-colors">
                        Grade 12
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Physical Science Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Atom className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Physical Science</h3>
                  </div>
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/curriculum/physicalscience/grade-10" className="hover:text-red-600 transition-colors">
                        Grade 10
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/curriculum/physicalscience/grade-11" className="hover:text-red-600 transition-colors">
                        Grade 11
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/curriculum/physicalscience/grade-12" className="hover:text-red-600 transition-colors">
                        Grade 12
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mt-4">
                  <Link 
                    href="/resources/curriculum" 
                    className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors font-medium"
                  >
                    View All Curriculum Materials
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* National/Provincial Papers */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                <Archive className="w-12 h-12 mb-4" />
                <h2 className="text-2xl font-bold mb-2">National/Provincial Papers</h2>
                <p className="text-white/90">Past examination papers for practice and preparation</p>
              </div>
              <div className="p-6">
                {/* Mathematics Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Calculator className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Mathematics</h3>
                  </div>
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/past-papers/mathematics/grade-10" className="hover:text-red-600 transition-colors">
                        Grade 10
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/past-papers/mathematics/grade-11" className="hover:text-red-600 transition-colors">
                        Grade 11
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/past-papers/mathematics/grade-12" className="hover:text-red-600 transition-colors">
                        Grade 12
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Physical Science Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Atom className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Physical Science</h3>
                  </div>
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/past-papers/physicalscience/grade-10" className="hover:text-red-600 transition-colors">
                        Grade 10
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/past-papers/physicalscience/grade-11" className="hover:text-red-600 transition-colors">
                        Grade 11
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/past-papers/physicalscience/grade-12" className="hover:text-red-600 transition-colors">
                        Grade 12
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mt-4">
                  <Link 
                    href="/resources/past-papers" 
                    className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors font-medium"
                  >
                    Browse All Past Papers
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Videos */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                <Film className="w-12 h-12 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Videos</h2>
                <p className="text-white/90">Video tutorials and educational content</p>
              </div>
              <div className="p-6">
                {/* Mathematics Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Calculator className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Mathematics</h3>
                  </div>
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/videos/mathematics/grade-10" className="hover:text-red-600 transition-colors">
                        Grade 10
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/videos/mathematics/grade-11" className="hover:text-red-600 transition-colors">
                        Grade 11
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/videos/mathematics/grade-12" className="hover:text-red-600 transition-colors">
                        Grade 12
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Physical Science Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Atom className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Physical Science</h3>
                  </div>
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/videos/physicalscience/grade-10" className="hover:text-red-600 transition-colors">
                        Grade 10
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/videos/physicalscience/grade-11" className="hover:text-red-600 transition-colors">
                        Grade 11
                      </Link>
                    </li>
                    <li className="list-disc text-gray-600">
                      <Link href="/resources/videos/physicalscience/grade-12" className="hover:text-red-600 transition-colors">
                        Grade 12
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mt-4">
                  <Link 
                    href="/resources/videos" 
                    className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors font-medium"
                  >
                    Watch All Videos
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Resource Overview Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-navy-blue mb-8 text-center">Browse by Grade Level</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[10, 11, 12].map((grade) => (
                <motion.div 
                  key={grade}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative border-t-4 border-red-600"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-navy-blue">Grade {grade}</h3>
                    <p className="text-gray-600 mb-4">
                      Access all resources specifically designed for Grade {grade} students.
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Link 
                        href={`/resources/curriculum/mathematics/grade-${grade}`} 
                        className="inline-flex items-center justify-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
                      >
                        Maths Materials
                      </Link>
                      <Link
                        href={`/resources/curriculum/physicalscience/grade-${grade}`} 
                        className="inline-flex items-center justify-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
                      >
                        Physical Science
                      </Link>
                      <Link
                        href={`/resources/past-papers/mathematics/grade-${grade}`} 
                        className="inline-flex items-center justify-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
                      >
                        Past Papers
                      </Link>
                      <Link
                        href={`/resources/videos/mathematics/grade-${grade}`} 
                        className="inline-flex items-center justify-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
                      >
                        Videos
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 