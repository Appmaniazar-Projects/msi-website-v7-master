'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { allCurriculumMaterials } from '@/data/curriculum-materials';
import { 
  Folder,
  FileText,
  Download,
  ChevronLeft,
  Search,
  Book,
  ChevronRight
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'

// Constants for folder types
const FOLDER_TYPES = ['topics', 'study-guides', 'notes', 'assessments'] as const

// Define TypeScript interfaces
interface CurriculumFile {
  name: string;
  path: string;
}

interface GradeContent {
  [key: string]: CurriculumFile[];
}

// Fixed values for this page
const GRADE = '12';
const SUBJECT = 'mathematics';

// Helper function to filter materials for Grade 12 Mathematics
const getFilteredMaterials = () => {
  console.log(`Filtering materials for Mathematics Grade ${GRADE}`);
  
  // Filter materials
  const filteredMaterials = allCurriculumMaterials.filter(material => {
      return material.subject === 'MATHS' && material.grade === `GRADE ${GRADE}`;
  });
  console.log(`Found ${filteredMaterials.length} matching materials for Grade ${GRADE} Mathematics`);
  return filteredMaterials;
};

// Organize materials by folder type
const organizeMaterialsByType = (materials: any[]) => {
  const content: GradeContent = {};
  
  // Initialize content structure for each folder type
  FOLDER_TYPES.forEach(folderType => {
    content[folderType] = [];
  });
  
  // Categorize materials
  materials.forEach(material => {
    // Create curriculum file object
    const file = {
      name: material.filename.replace('.pdf', '').replace('.docx', ''),
      path: material.url
    };
    
    // Default to assessments if no specific category is detected
    let assignedFolder = 'assessments';
    
    // Check for folder type in the path
    const materialPath = material.url.toLowerCase();
    for (const folderType of FOLDER_TYPES) {
      if (materialPath.includes(folderType.replace('-', ''))) {
        assignedFolder = folderType;
        break;
      }
    }
    
    // Add to corresponding folder
    content[assignedFolder].push(file);
  });
  
  // Remove duplicates from each category
  Object.keys(content).forEach(key => {
    const seen = new Set();
    content[key] = content[key].filter(file => {
      const duplicate = seen.has(file.path);
      seen.add(file.path);
      return !duplicate;
    });
  });
  
  return content;
};

// Create a separate component that uses searchParams
function CurriculumContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get folder param from query string
  const folderParam = searchParams.get('folder');
  
  // State for UI
  const [activeFolder, setActiveFolder] = useState<string>(
    FOLDER_TYPES.includes(folderParam as any) ? folderParam as string : 'topics'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [curriculumData, setCurriculumData] = useState<GradeContent>({});
  
  // On mount and when parameters change, fetch data
  useEffect(() => {
    const fetchData = () => {
      // Get materials filtered by grade and subject
      const filteredMaterials = getFilteredMaterials();
      
      // Organize materials by folder type
      const organizedContent = organizeMaterialsByType(filteredMaterials);
      
      // Update state
      setCurriculumData(organizedContent);
    };
    
    fetchData();
    
    // Set active folder from URL parameters
    if (folderParam && FOLDER_TYPES.includes(folderParam as any)) {
      setActiveFolder(folderParam);
    }
  }, [folderParam]);
  
  // Format title for display
  const formatTitle = (text: string) => {
    switch (text) {
      case 'study-guides': return 'Study Guides';
      default: return text.charAt(0).toUpperCase() + text.slice(1);
    }
  };
  
  // Navigate to a different folder
  const navigateToFolder = (folder: string) => {
    setActiveFolder(folder);
    router.push(`/resources/curriculum/mathematics/grade-${GRADE}?folder=${folder}`);
  };

  return (
    <>
      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search content..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Folder Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        {FOLDER_TYPES.map((folder) => (
          <button
            key={folder}
            onClick={() => navigateToFolder(folder)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFolder === folder
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {formatTitle(folder)}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <motion.div
        key={`mathematics-${GRADE}-${activeFolder}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          {formatTitle(activeFolder)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {curriculumData[activeFolder]?.length > 0 ? (
            curriculumData[activeFolder]
              .filter(file => 
                file.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((file, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-red-600" />
                      <span className="text-gray-700">{file.name}</span>
                    </div>
                    <a
                      href={file.path}
                      download
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              <Book className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No {activeFolder} available for Grade {GRADE} Mathematics yet.</p>
              <p className="mt-2 text-sm">Check back later or try another category.</p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

// Main page component
export default function Grade12MathematicsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              href="/resources/curriculum"
              className="inline-flex items-center text-gray-600 hover:text-red-600"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Curriculum
            </Link>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold text-navy-blue mb-4 md:mb-0">
                Grade {GRADE} Mathematics
              </h1>
            </div>
          </motion.div>

          {/* Wrap the component that uses useSearchParams in Suspense */}
          <Suspense fallback={<div className="text-center py-8">Loading curriculum content...</div>}>
            <CurriculumContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}