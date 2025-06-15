"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function PyramidDiagram() {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {/* Background Pyramid Shape */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg viewBox="0 0 1200 600" className="w-full h-full">
          <defs>
            <linearGradient id="pyramidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(220, 38, 38, 0.05)" />
              <stop offset="100%" stopColor="rgba(30, 41, 59, 0.05)" />
            </linearGradient>
          </defs>
          <path
            d="M600,50 L50,550 L1150,550 Z"
            fill="url(#pyramidGradient)"
            stroke="rgba(220, 38, 38, 0.3)"
            strokeWidth="2"
            strokeDasharray="10 5"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Top Section - Innovative Approach */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex justify-center mb-4"
        >
          <div className="w-64 h-36">
            <Card className="bg-white shadow-md border-2 border-red-600 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-full">
              <CardContent className="p-1 flex flex-col items-center text-center justify-center h-full">
                <div className="w-14 h-14 flex items-center justify-center mb-0.5">
                  <Image 
                    src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_about_transparen_lab.png" 
                    alt="Innovative Approach" 
                    width={50} // Reduced for better proportion
                    height={50} // Reduced for better proportion
                    className="text-5xl" // Ensures icon scales properly
                  />
                </div>
                <h3 className="text-md font-bold mb-0 text-navy-blue">INNOVATIVE APPROACH</h3>
                <p className="text-gray-700 text-xs">
                  Developing innovative solutions that demystify maths and science.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Label for the 4 components */}
        <div className="text-center mb-1">
          <span className="inline-block px-3 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-medium">
            Components of our Innovative Approach
          </span>
        </div>

        {/* Enhanced Connector Lines */}
        <div className="relative flex justify-center my-0.5">
          <svg width="30" height="16" viewBox="0 0 30 16" className="text-red-600">
            <path d="M15,0 L15,16" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="15" cy="8" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Middle Section - 2x2 Grid Layout - Centered in Triangle */}
        <div className="grid grid-cols-2 gap-2 mb-3 max-w-sm mx-auto">
          {/* Afrocentrism */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white shadow-sm border border-red-200 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-200"></div>
              <CardContent className="p-1 flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 flex items-center justify-center mb-0.5">
                  <Image 
                    src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_profess_ser_page_icon.svg" 
                    alt="Afrocentrism" 
                    width={56} 
                    height={56} 
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm font-bold mb-0 text-navy-blue">AFROCENTRISM</h3>
                <p className="text-gray-700 text-xs">Aligning curriculum with local learning contexts.</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Demystify */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white shadow-sm border border-red-200 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-200"></div>
              <CardContent className="p-1 flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 flex items-center justify-center mb-0.5">
                  <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_about_inovate_icon.svg" alt="Demystify" width={56} height={56} className="object-contain" />
                </div>
                <h3 className="text-sm font-bold mb-0 text-navy-blue">DEMYSTIFY</h3>
                <p className="text-gray-700 text-xs">Making maths and science more accessible.</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reskilling */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white shadow-sm border border-red-200 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-200"></div>
              <CardContent className="p-1 flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 flex items-center justify-center mb-0.5">
                  <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_development_icon.svg" alt="Reskilling" width={56} height={56} className="object-contain" />
                </div>
                <h3 className="text-sm font-bold mb-0 text-navy-blue">RESKILLING</h3>
                <p className="text-gray-700 text-xs">Equipping educators with effective methodologies.</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Developing */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white shadow-sm border border-red-200 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-200"></div>
              <CardContent className="p-1 flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 flex items-center justify-center mb-0.5">
                  <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_developing.svg" alt="Developing" width={56} height={56} className="object-contain" />
                </div>
                <h3 className="text-sm font-bold mb-0 text-navy-blue">DEVELOPING</h3>
                <p className="text-gray-700 text-xs">Fostering critical thinking and innovation.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Connector Lines to Foundation */}
        <div className="relative flex justify-center my-1">
          <svg width="500" height="30" viewBox="0 0 500 30" className="text-red-600">
            <path
              d="M250,0 L250,8 M100,30 L250,8 M400,30 L250,8"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <circle cx="250" cy="8" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Foundation Section - Expert Instructors & Proven Results - Positioned at Triangle Base Ends */}
        <div className="flex justify-between max-w-4xl mx-auto">
          {/* Expert Instructors */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.5 }}
            className="w-64 h-36"
          >
            <Card className="bg-white shadow-md border-2 border-red-600 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-full">
              <CardContent className="p-1 flex flex-col items-center text-center justify-center h-full">
                <div className="w-14 h-14 flex items-center justify-center mb-0.5">
                  <Image 
                    src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_about_instruct_icon.png" 
                    alt="Expert Instructors" 
                    width={50} // Match top icon size
                    height={50} // Match top icon size
                    className="object-contain"
                  />
                </div>
                <h3 className="text-md font-bold mb-0 text-navy-blue">EXPERT INSTRUCTORS</h3>
                <p className="text-gray-700 text-xs">Qualified educators with extensive experience.</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Proven Results */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.6 }}
            className="w-64 h-36"
          >
            <Card className="bg-white shadow-md border-2 border-red-600 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-full">
              <CardContent className="p-1 flex flex-col items-center text-center justify-center h-full">
                <div className="w-14 h-14 flex items-center justify-center mb-0.5">
                  <Image 
                    src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_about_results_transparent.png" 
                    alt="Proven Results" 
                    width={50} // Match top icon size
                    height={50} // Match top icon size
                    className="object-contain"
                  />
                </div>
                <h3 className="text-md font-bold mb-0 text-navy-blue">PROVEN RESULTS</h3>
                <p className="text-gray-700 text-xs">Demonstrated success in improving performance.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

