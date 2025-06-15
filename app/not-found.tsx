'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 10 
          }}
          className="text-center max-w-2xl px-4"
        >
          <div className="mb-12 flex justify-center">

              <Image 
                src="https://d1dc40k4xbphr.cloudfront.net/images/404-Not-Found.jpg" 
                alt="404 Not Found" 
                width={300} 
                height={300} 
                className="mx-auto"
              />
  
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Oops! Page Not Found
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            The page you are looking for might have been removed, 
            had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/">
                Return to Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
