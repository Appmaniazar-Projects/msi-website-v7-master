'use client';

import { useState, useEffect } from 'react';
import { getBlogPosts, BlogPost } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getBlogPosts();
        setPosts(allPosts);
        
        // Extract all unique tags and ensure they're strings
        const tags = allPosts.flatMap(post => post.frontmatter.tags);
        const uniqueTags = Array.from(new Set(tags)) as string[];
        setAllTags(uniqueTags);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPosts();
  }, []);
  
  // Filter posts by active tags
  const filteredPosts = activeTags.length > 0
    ? posts.filter(post => 
        post.frontmatter.tags.some(tag => activeTags.includes(tag))
      )
    : posts;
    
  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 text-navy-blue">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">MSI Blog: Insights & Stories</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Discover articles, success stories, and educational perspectives from the world of mathematics and science education.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Tag Filters */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTags.includes(tag)
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
            {activeTags.length > 0 && (
              <button
                onClick={() => setActiveTags([])}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>
      
      {/* Blog Posts */}
      <section className="py-16 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">No posts found</h3>
              {activeTags.length > 0 ? (
                <p className="text-gray-600 mb-6">No posts match the selected tags. Try different tags or clear the filter.</p>
              ) : (
                <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
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
                        {post.frontmatter.tags.slice(0, 2).map(tag => (
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
                        <span className="mx-2">•</span>
                        <span>{post.readingTime} min read</span>
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
                            {post.frontmatter.author.charAt(0)}
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
          )}
        </div>
      </section>
      
      {/* Newsletter Section 
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Stay Updated with MSI</h2>
            <p className="text-center text-gray-600 mb-8">
              Subscribe to our newsletter to receive the latest updates, articles, and news from MSI.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button 
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      */}
      
      <Footer />
    </div>
  );
}
