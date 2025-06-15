'use client'

import { useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Home, Mail } from 'lucide-react'

function DonationSuccessContent() {
  const searchParams = useSearchParams()
  const paymentStatus = searchParams.get('payment_status')
  const paymentId = searchParams.get('m_payment_id')

  useEffect(() => {
    // Here you would typically verify the payment status with your backend
    // and update your database accordingly
    console.log('Payment Status:', paymentStatus)
    console.log('Payment ID:', paymentId)
  }, [paymentStatus, paymentId])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-8 text-center">
        <div className="mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Donation!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your contribution has been received and will help us continue our mission of empowering students through STEM education.
        </p>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <a href="mailto:info@mathsandscienceinfinity.org.za">
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </a>
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          A confirmation email has been sent to your registered email address.
          If you have any questions, please don't hesitate to contact us.
        </p>
      </Card>
    </motion.div>
  )
}

export default function DonationSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-20">
        <Suspense fallback={
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              <div className="mb-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Processing Your Donation
              </h1>
              <p className="text-gray-600 mb-8">
                Please wait while we verify your donation...
              </p>
            </Card>
          </div>
        }>
          <DonationSuccessContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}