'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  Calculator, 
  Atom, 
  ChevronRight,
  FileText,
  Download,
  Calendar,
  Search
} from 'lucide-react'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 } 
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Subject configuration
const subjects = [
  {
    name: 'Mathematics',
    description: 'Past mathematics examination papers',
    icon: <Calculator className="w-12 h-12 mb-4" />,
    path: 'mathematics'
  },
  {
    name: 'Physical Science',
    description: 'Past physical science examination papers',
    icon: <Atom className="w-12 h-12 mb-4" />,
    path: 'physicalscience'
  }
]

// Paper types configuration
const paperTypes = [
  {
    name: 'Final Examination Papers',
    path: 'final-exam',
    icon: <FileText className="w-4 h-4 mr-2 text-red-600" />
  },
  {
    name: 'Mid-Year Examination Papers',
    path: 'mid-year',
    icon: <Calendar className="w-4 h-4 mr-2 text-red-600" />
  },
  // {
  //   name: 'Memorandum Solutions',
  //   path: 'memos',
  //   icon: <Download className="w-4 h-4 mr-2 text-red-600" />
  // }
]

export default function PastPapersPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6">
              Past Examination Papers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access a comprehensive collection of past examination papers to help you prepare for your upcoming assessments.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <SearchAndFilter />

          {/* Subject Selection */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {subjects.map(subject => (
              <SubjectCard 
                key={subject.path}
                subject={subject}
              />
            ))}
          </motion.div>

          {/* Additional Resources */}
          <AdditionalResources />
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Component for Search and Filter
function SearchAndFilter() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-md p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar />
        <FilterDropdowns />
      </div>
    </motion.div>
  )
}

// Subject Card Component
function SubjectCard({ subject }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
        {subject.icon}
        <h2 className="text-2xl font-bold mb-2">{subject.name}</h2>
        <p className="text-white/90">{subject.description}</p>
      </div>
      <div className="p-6 space-y-6">
        {[10, 11, 12].map((grade) => (
          <div key={grade}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Grade {grade}</h3>
            <ul className="space-y-2">
              {paperTypes.map(type => (
                <li key={type.path} className="flex items-center text-gray-600">
                  {type.icon}
                  <Link 
                    href={`/resources/past-papers/${subject.path}/grade-${grade}`} 
                    className="hover:text-red-600 transition-colors"
                  >
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  )
}


// Search Bar Component
function SearchBar() {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search past papers..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>
  )
}

// Filter Dropdowns Component
function FilterDropdowns() {
  return (
    <div className="flex gap-4">
      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
        <option value="">Select Subject</option>
        <option value="mathematics">Mathematics</option>
        <option value="physical-science">Physical Science</option>
      </select>
      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
        <option value="">Select Grade</option>
        <option value="10">Grade 10</option>
        <option value="11">Grade 11</option>
        <option value="12">Grade 12</option>
      </select>
      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
        <option value="">Select Year</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>
    </div>
  )
}

// Additional Resources Component
function AdditionalResources() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-md p-8"
    >
      <h2 className="text-2xl font-bold text-navy-blue mb-6">Additional Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quidelines</h3>
          <p className="text-gray-600 mb-4">
            Access additional practice questions and mock examinations to further enhance your preparation.
          </p>
          <Link 
            href="/resources/past-papers/guidelines" 
            className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors font-medium"
          >
            View Guidelines
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
