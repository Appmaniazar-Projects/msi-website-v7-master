import Link from 'next/link'
import Image from 'next/image'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/utils/animations'
import { useState, useEffect } from 'react'

// Define email contacts at the top of the component
const emailContacts = [
  {
    address: 'info@mathsandscienceinfinity.org.za',
    label: 'General Inquiries'
  },
  {
    address: 'media@mathsandscienceinfinity.org.za',
    label: 'Media Relations'
  }
]

const Footer = () => {
  const [currentYear, setCurrentYear] = useState('2025')
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://www.facebook.com/share/14mdGpX89G/', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com/maths_sciencesa', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://www.instagram.com/maths_and_science_infinity?igsh=a3J0dzh2ZzF0ZjJs', label: 'Instagram' },
    { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/maths-and-science-infinity/', label: 'LinkedIn' }
  ]

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Resources', href: '/resources' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Contact', href: '/contact' },
    { name: 'Donate', href: '/donate' }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1.2fr] gap-6"
        >
          {/* Logo and Description */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <Image 
              src="https://d1dc40k4xbphr.cloudfront.net/images/msi_logo.png" 
              alt="MSI Logo" 
              width={140} 
              height={70} 
              priority
              loading="eager"
              unoptimized
              className="mb-4 bg-white p-2 rounded-lg" 
            />
            <p className="text-sm leading-relaxed">
              Empowering youth through Maths and Science education. Building tomorrow's leaders through STEM excellence.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    href={link.href}
                    className="hover:text-red-500 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="text-red-500">›</span>
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3">
              <span className="font-semibold">Johannesburg Office: </span>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-l text-red-500 mt-1 flex-shrink-0" />
                <a 
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://maps.app.goo.gl/qUpZ8p9zCyEu1WSf8" 
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  <span className="block">
                    4th Floor, West Tower,<br />
                    Nelson Mandela Square,<br />
                    Sandton City, Johannesburg
                  </span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-l text-red-500" />
                <a target="_blank" href="tel:+27115684332" 
                className="hover:text-red-500 transition-colors duration-300">
                <span> +27 11 568 4332</span>
                </a>
              </li>
              <li className="space-y-3">
              </li>
              <span className="font-semibold">East London Office: </span>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-l text-red-500 mt-1" />
                <a target="_blank" href="https://maps.app.goo.gl/o1zsynzNxkq25LHT7" 
                className="hover:text-red-500 transition-colors duration-300">
                <span>1 Scherwitz Road, Berea, East London</span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-l text-red-500" />
                <a target="_blank" href="tel:+27437262171" 
                className="hover:text-red-500 transition-colors duration-300">
                <span> +27 43 726 2171</span>
                </a>
              </li>
              
              {emailContacts.map((email) => (
                <li key={email.address} className="flex items-start space-x-3">
                  <FaEnvelope className="text-l text-red-500 mt-1.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 mb-0.5">{email.label}</span>
                    <a 
                      href={`mailto:${email.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-500 transition-colors duration-300 break-all"
                    >
                      {email.address}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Operating Hours */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Operating Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>Closed</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              &copy; {currentYear} Maths and Science Infinity. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="hover:text-red-500 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-red-500 transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
