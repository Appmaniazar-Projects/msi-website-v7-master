'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { examPapers } from '@/data/examPapers'; // Your existing import
import {
  Download,
  ChevronLeft,
  Search,
  FileText,
  Book,
  Filter,
  X
} from 'lucide-react';

// Fixed values for this page
const GRADE = '10';
const SUBJECT = 'science'; // Changed to lowercase to match the data
const YEARS = ['2019', '2018', '2017', '2016']; // Updated to include 2017
const EXAM_TYPES = ['final', 'midyear']; // All lowercase to match data

export default function Grade10PhysicalSciencePastPapersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on mount to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter the past papers when search/filter changes
  useEffect(() => {
    const filtered = examPapers.filter((paper) => {
      return (
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        paper.grade === `Grade ${GRADE}` &&
        paper.subject.toLowerCase() === SUBJECT.toLowerCase() && 
        (selectedYear ? paper.year === selectedYear : true) &&
        (selectedExamType ? paper.examType.toLowerCase() === selectedExamType.toLowerCase() : true)
      );
    });

    setFilteredPapers(filtered);
  }, [searchTerm, selectedYear, selectedExamType]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedYear('');
    setSelectedExamType('');
  };

  // Check if any filter is active
  const hasActiveFilters = selectedYear || selectedExamType;

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
              href="/resources/past-papers"
              className="inline-flex items-center text-gray-600 hover:text-red-600"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Past Papers
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy-blue">Grade {GRADE} Physical Science Past Papers</h1>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search past papers..."
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
                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">All Years</option>
                    {YEARS.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Exam Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={selectedExamType}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                  >
                    <option value="">All Types</option>
                    {EXAM_TYPES.map((type) => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedYear && (
                <div className="flex items-center bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm">
                  Year: {selectedYear}
                  <button onClick={() => setSelectedYear('')} className="ml-2">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {selectedExamType && (
                <div className="flex items-center bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm">
                  Type: {selectedExamType.charAt(0).toUpperCase() + selectedExamType.slice(1)}
                  <button onClick={() => setSelectedExamType('')} className="ml-2">
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
                Available Papers
              </h2>
              {filteredPapers.length > 0 && (
                <p className="text-sm text-gray-500">{filteredPapers.length} {filteredPapers.length === 1 ? 'result' : 'results'}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPapers.length > 0 ? (
                filteredPapers.map((paper, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors hover:scale-102"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-red-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{paper.title}</p>
                          <p className="text-sm text-gray-500 capitalize">
                            {paper.year} • {paper.examType}
                          </p>
                        </div>
                      </div>
                      <a
                        href={paper.url}
                        download
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  <Book className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No past papers found for Grade {GRADE} Physical Science. Try adjusting your filters.</p>
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