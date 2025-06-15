'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { fadeInUp, fadeInDown } from '@/utils/animations'
import { cn } from '@/lib/utils'
import PayFastForm from '@/components/PayFastForm'
import { 
  BookOpen, 
  Laptop, 
  Shirt, 
  Heart, 
  Palette, 
  Apple, 
  Mail, 
  Phone, 
  MessageCircle,
  Coins,
  Gift,
  GraduationCap,
  Boxes,
  Sparkles,
  Construction
} from 'lucide-react'

export default function DonatePage() {
  const [donationType, setDonationType] = useState<'money' | 'other'>('money')

  const donationTypes = [
    { icon: <BookOpen className="w-8 h-8" />, title: 'Educational Materials', description: 'Books, stationery, and learning resources' },
    { icon: <Laptop className="w-8 h-8" />, title: 'Technology', description: 'Computers, tablets, and educational software' },
    { icon: <Shirt className="w-8 h-8" />, title: 'School Uniforms', description: 'New or gently used uniforms' },
    { icon: <Heart className="w-8 h-8" />, title: 'Health and Hygiene', description: 'Essential health and hygiene products for well-being.' },
    { icon: <Palette className="w-8 h-8" />, title: 'Art Supplies', description: 'Art materials and creative resources' },
    { icon: <Apple className="w-8 h-8" />, title: 'Food & Nutrition', description: 'Non-perishable food items' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Support Our Mission
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl opacity-90"
            >
              Your contribution helps us empower the next generation through STEM education.
              Every donation makes a difference in a student's life.
            </motion.p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Donation Type Selector */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex gap-4 justify-center mb-8">
            <Button
              variant={donationType === 'money' ? 'default' : 'outline'}
              onClick={() => setDonationType('money')}
              size="lg"
            >
              <Coins className="w-5 h-5 mr-2" /> Monetary Donation
            </Button>
            <Button
              variant={donationType === 'other' ? 'default' : 'outline'}
              onClick={() => setDonationType('other')}
              size="lg"
            >
              <Gift className="w-5 h-5 mr-2" /> Other Donations
            </Button>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-8"
          >
            {donationType === 'money' ? (
              <PayFastForm />
            ) : (
              <Card className="p-8">
                {/* Non-Monetary Donation Code*/}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Make a Non-Monetary Donation
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {donationTypes.map((type, index) => (
                    <Card 
                      key={index}
                      className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="mb-4 text-red-600">
                        {type.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{type.title}</h3>
                      <p className="text-gray-600 text-sm">{type.description}</p>
                    </Card>
                  ))}
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-center">How to Donate Items</h3>
                  <p className="text-gray-600 text-center">
                    To arrange a non-monetary donation, please contact us through any of these channels:
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <Button variant="outline" size="lg" asChild>
                      <a href="mailto:info@mathsandscienceinfinity.org.za">
                        <Mail className="w-5 h-5 mr-2" /> Email Us
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="tel:+27437262171">
                        <Phone className="w-5 h-5 mr-2" /> Call Us
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="https://wa.me/+27817461678">
                        <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Our team will assist you with the donation process and arrange collection or delivery.
                    </p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Impact Section */}
        <section className="max-w-6xl mx-auto py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Donation Makes an Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to transparency and ensuring your contributions create meaningful change.
              Here's how your donation helps our cause:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <GraduationCap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className="text-gray-600">
                Provides STEM education to underprivileged students, giving them the skills needed for the digital age.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <Boxes className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resources</h3>
              <p className="text-gray-600">
                Supplies educational materials, technology, and resources to schools in underserved communities.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mentorship</h3>
              <p className="text-gray-600">
                Connects students with industry professionals who provide guidance and inspiration for future careers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Is my donation tax-deductible?</h3>
              <p className="text-gray-700">
                Yes, MSI Africa is a registered non-profit organization. Your monetary donations are tax-deductible, and we'll provide you with Section 18A Certificate for tax purposes.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">How are donations used?</h3>
              <p className="text-gray-700">
                Your donations directly support our educational programs, resources for schools, teacher training, and infrastructure improvements. We maintain transparency with detailed annual reports.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Can I specify how my donation is used?</h3>
              <p className="text-gray-700">
                Yes, if you would like your donation to be used for a specific program or purpose, please contact us directly, and we'll ensure your contribution is allocated according to your wishes.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">How can companies get involved?</h3>
              <p className="text-gray-700">
                We welcome corporate partnerships and sponsorships. Companies can contribute through financial donations, employee volunteer programs, or in-kind donations. Please contact our partnerships team for more information.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
