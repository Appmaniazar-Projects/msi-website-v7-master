'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Download, 
  ChevronLeft, 
  Search, 
  FileText, 
  Book, 
  Filter, 
  X 
} from 'lucide-react';

// This would normally come from your data file or API
// In production, you'd replace this with actual data or API call
import { guidelinesData } from '@/data/guidelinesData';

// Constants for filter options
const GRADES = ['10', '11', '12'];
const SUBJECTS = ['Maths', 'Physical Science'];

export default function GuidelinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [filteredGuidelines, setFilteredGuidelines] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on mount to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter the guidelines when search/filter changes
  useEffect(() => {
    const filtered = guidelinesData.filter((guideline) => {
      const matchesSearch = guideline.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = selectedGrade ? guideline.grade === `Grade ${selectedGrade}` : true;
      const matchesSubject = selectedSubject ? guideline.subject === selectedSubject : true;
      
      return matchesSearch && matchesGrade && matchesSubject;
    });

    setFilteredGuidelines(filtered);
  }, [searchTerm, selectedGrade, selectedSubject]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedGrade('');
    setSelectedSubject('');
  };

  // Check if any filter is active
  const hasActiveFilters = selectedGrade || selectedSubject;

  // If not client-side yet, show minimal loading UI to prevent hydration errors
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/resources"
              className="inline-flex items-center text-gray-600 hover:text-red-600"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy-blue">Examination Guidelines</h1>
            <p className="text-gray-600 mt-2">
              Download guidelines for all grades and subjects
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search guidelines..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className={`flex items-center gap-2 px-4 py-2 border ${
                showFilters ? 'bg-red-50 border-red-300 text-red-600' : 'border-gray-300'
              } rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Expandable Filter Panel */}
          {showFilters && (
            <div
              className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Filter Options</h3>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Clear all filters
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Grade Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                  >
                    <option value="">All Grades</option>
                    {GRADES.map((grade) => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                </div>

                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {SUBJECTS.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedGrade && (
                <div className="flex items-center bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm">
                  Grade: {selectedGrade}
                  <button onClick={() => setSelectedGrade('')} className="ml-2">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {selectedSubject && (
                <div className="flex items-center bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm">
                  Subject: {selectedSubject}
                  <button onClick={() => setSelectedSubject('')} className="ml-2">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results Grid */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Available Guidelines
              </h2>
              {filteredGuidelines.length > 0 && (
                <p className="text-sm text-gray-500">{filteredGuidelines.length} {filteredGuidelines.length === 1 ? 'result' : 'results'}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGuidelines.length > 0 ? (
                filteredGuidelines.map((guideline, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-red-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{guideline.title}</p>
                          <p className="text-sm text-gray-500">
                            {guideline.subject} • {guideline.grade}
                          </p>
                        </div>
                      </div>
                      <a
                        href={guideline.url}
                        download
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                        aria-label={`Download ${guideline.title}`}
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  <Book className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No guidelines found matching your criteria. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}