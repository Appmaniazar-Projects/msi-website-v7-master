'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  Calculator, 
  Atom, 
  ChevronRight,
  Play,
  Clock,
  Bookmark,
  Search,
  Eye,
  ChevronLeft,
  X
} from 'lucide-react'
import { 
  videos, 
  VideoItem, 
  SUBJECTS, 
  MATHEMATICS_TOPICS, 
  SCIENCE_TOPICS, 
  GRADES, 
  getFeaturedVideos,
  getFilteredVideos 
} from '@/data/videos'

export default function VideosPage() {
  // State for filters
  const [filteredVideos, setFilteredVideos] = useState<VideoItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Get videos by categories
  const featuredVideos = getFeaturedVideos(6);
  const mathVideos = videos.filter(video => video.subject === 'mathematics');
  const scienceVideos = videos.filter(video => video.subject === 'physical-science');

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

  // Scroll functionality for carousels
  const scrollCarousel = (carouselRef: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      const scrollPos = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount 
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  };

  // Carousel refs
  const featuredCarouselRef = useRef<HTMLDivElement>(null);
  const mathCarouselRef = useRef<HTMLDivElement>(null);
  const scienceCarouselRef = useRef<HTMLDivElement>(null);

  // Handle search and filters
  useEffect(() => {
    if (searchTerm || selectedSubject || selectedGrade || selectedTopic) {
      const results = getFilteredVideos({
        subject: selectedSubject || undefined,
        grade: selectedGrade ? parseInt(selectedGrade) : undefined,
        topic: selectedTopic || undefined,
        searchTerm: searchTerm || undefined
      });
      
      setFilteredVideos(results);
      setIsSearching(true);
    } else {
      setFilteredVideos([]);
      setIsSearching(false);
    }
  }, [searchTerm, selectedSubject, selectedGrade, selectedTopic]);

  // Function to format video title
  const formatTitle = (title: string) => {
    return title.length > 60 ? title.substring(0, 57) + '...' : title;
  };

  // Function to format subject name
  const formatSubject = (subject: string) => {
    return subject.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Video card component for reusability
  const VideoCard = ({ video }: { video: VideoItem }) => (
    <a 
      key={video.id}
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-sm flex-shrink-0"
      style={{ width: '320px', height: '340px' }}
    >
      <div className="relative bg-gray-200 w-full" style={{ height: '180px' }}>
        <img 
          src={video.thumbnail || `/api/placeholder/320/180`}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
          <Play className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded-tl-md">
          {video.duration}
        </div>
      </div>
      <div className="p-4 h-40 flex flex-col justify-between">
        <h3 className="font-semibold text-gray-800 line-clamp-2">{formatTitle(video.title)}</h3>
        <div className="mt-2">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{video.duration}</span>
            </div>
            {video.views && (
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>{video.views}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Grade {video.grade} • {formatSubject(video.subject)}
            </span>
            <button className="text-gray-400 hover:text-red-600 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </a>
  );

  // Video carousel component
  const VideoCarousel = ({ 
    title, 
    videos,
    carouselRef,
    icon
  }: { 
    title: string; 
    videos: VideoItem[];
    carouselRef: React.RefObject<HTMLDivElement>;
    icon?: React.ReactNode;
  }) => (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {icon && <div className="mr-3">{icon}</div>}
          <h2 className="text-2xl font-bold text-navy-blue">{title}</h2>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => scrollCarousel(carouselRef, 'left')}
            className="p-2 rounded-full bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollCarousel(carouselRef, 'right')}
            className="p-2 rounded-full bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto space-x-6 pb-4 hide-scrollbar"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
        }}
      >
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );

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
            <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6">Educational Videos</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch our comprehensive collection of educational videos covering various topics in mathematics and physical science.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-4 z-10"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <select 
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    setSelectedTopic(''); // Reset topic when subject changes
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physical-science">Physical Science</option>
                </select>
                <select 
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Grades</option>
                  {GRADES.map(grade => (
                    <option key={grade} value={grade}>Grade {grade}</option>
                  ))}
                </select>
                <select 
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Topics</option>
                  {selectedSubject === 'mathematics' 
                    ? MATHEMATICS_TOPICS.map(topic => (
                        <option key={topic} value={topic}>
                          {topic.charAt(0).toUpperCase() + topic.slice(1)}
                        </option>
                      ))
                    : selectedSubject === 'physical-science'
                      ? SCIENCE_TOPICS.map(topic => (
                          <option key={topic} value={topic}>
                            {topic.charAt(0).toUpperCase() + topic.slice(1)}
                          </option>
                        ))
                      : [...MATHEMATICS_TOPICS, ...SCIENCE_TOPICS].map(topic => (
                          <option key={topic} value={topic}>
                            {topic.charAt(0).toUpperCase() + topic.slice(1)}
                          </option>
                        ))
                  }
                </select>
                
                {(selectedSubject || selectedGrade || selectedTopic || searchTerm) && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSubject('');
                      setSelectedGrade('');
                      setSelectedTopic('');
                    }}
                    className="text-red-600 hover:text-red-700 flex items-center font-medium px-4 py-2"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Search Results */}
          {isSearching ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-16"
            >
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-navy-blue">
                    {`${filteredVideos.length} ${filteredVideos.length === 1 ? 'Video' : 'Videos'} Found`}
                  </h2>
                </div>
                
                {filteredVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {filteredVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search term</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Featured Videos Carousel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-16"
              >
                <VideoCarousel 
                  title="Featured Videos" 
                  videos={featuredVideos}
                  carouselRef={featuredCarouselRef}
                />
              </motion.div>

              {/* Mathematics Videos Carousel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-16"
              >
                <VideoCarousel 
                  title="Mathematics" 
                  videos={mathVideos}
                  carouselRef={mathCarouselRef}
                  icon={<Calculator className="w-8 h-8 text-red-600" />}
                />
              </motion.div>

              {/* Science Videos Carousel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-16"
              >
                <VideoCarousel 
                  title="Physical Science" 
                  videos={scienceVideos}
                  carouselRef={scienceCarouselRef}
                  icon={<Atom className="w-8 h-8 text-red-600" />}
                />
              </motion.div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}