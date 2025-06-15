'use client';

import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Testimonials from '../components/Testimonials'
import Gallery from '../components/Gallery'
import { Button } from "@/components/ui/button"
import { getBlogPosts, type BlogPost } from '@/lib/blog'
import { motion, useSpring, useInView } from 'framer-motion'
import { Briefcase, School, Laptop, TestTube, User } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Impact from '@/components/Impact'
import Partners from '@/components/Partners';

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setLatestPosts(posts.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-red-600 to-red-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://d1dc40k4xbphr.cloudfront.net/images/gallery/msi-hero.jpg"
            alt="Students learning"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 10,
              duration: 0.5 
            }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Empowering Minds, Transforming Futures
          </motion.h2>
          
          
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Impact Counter */}
      <Impact />

      {/* Services Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-bold mb-12 text-navy-blue text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Learner Development', 
              icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_student_icon.svg" alt="Learner Development" width={100} height={100} />, 
              description: "Providing academic support, tutoring, and enrichment programs to enhance learners' performance in maths and science." 
            },
            { 
              title: 'Teacher Development', 
              icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_developing.svg" alt="Teacher Development" width={100} height={100} />, 
              description: 'Training and upskilling educators to improve teaching methodologies and subject mastery.' 
            },
            { 
              title: 'Career Guidance & Role Modelling', 
              icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_development_icon.svg" alt="Career Guidance" width={100} height={100} />, 
              description: ' Connecting learners with industry professionals to inspire and guide their career choices.' 
            },

            ].map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <Link href="/services">
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

    

      {/* Testimonials Section */}
      <Testimonials />

      {/* Gallery Section */}
      <Gallery />

      {/* Blog Section */}
      <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Latest Blog Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300"
              >
                <Link href={`/blog/post?slug=${post.slug}`} className="block h-full">
                  <div className="relative">
                    {post.frontmatter.image ? (
                      <div className="relative h-52">
                        <Image
                          src={post.frontmatter.image}
                          alt={post.frontmatter.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-200 h-52 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
                      {post.frontmatter.tags && post.frontmatter.tags.slice(0, 2).map(tag => (
                        <span 
                          key={tag} 
                          className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{post.frontmatter.date}</span>
                      {post.readingTime && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{post.readingTime} min read</span>
                        </>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                      {post.frontmatter.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-5 line-clamp-3">
                      {post.frontmatter.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                          {post.frontmatter.author && post.frontmatter.author.charAt(0)}
                        </div>
                        <span className="ml-2 text-sm text-gray-700">{post.frontmatter.author}</span>
                      </div>
                      
                      <span className="text-red-600 font-medium text-sm">Read more →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <Link href="/blog">
                View All Blog Posts
              </Link>
            </Button>
          </div>
        </div>
       </div>
      </section>

      {/* Partners Section */}
      <Partners />

      {/* Call to Action */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">Join us in our mission to empower the youth through Maths and Science education.</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              asChild
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <Link href="/contact">
                Get Involved
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
