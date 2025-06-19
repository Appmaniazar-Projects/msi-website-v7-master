'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Modal from '@/components/Modal'
import { Construction, Upload, Users, GraduationCap, Handshake, CheckCircle, XCircle, ChevronRight, ArrowLeft } from 'lucide-react'
import { JobListing, jobListings } from '../data/jobListings'
import HorizontalSlider from '../components/HorizontalSlider'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type ApplicationType = 'tutor' | 'volunteer' | 'careers' | 'sponsor';

interface FormData {
  name: string;
  email: string;
  phone: string;
  // Tutor specific fields
  mathGrade?: string;
  scienceGrade?: string;
  tertiaryQualification?: string;
  teachingQualification?: string;
  // Volunteer specific fields
  availability?: string;
  interests?: string;
  // Career application fields
  position?: string;
  experience?: string;
  education?: string;
  coverLetter?: string;
  // Sponsor specific fields
  organization?: string;
  sponsorshipType?: string;
  message?: string;
}

export default function GetInvolved() {
  // State declarations
  const [isScrolled, setIsScrolled] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [applicationType, setApplicationType] = useState<ApplicationType>('tutor')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    // Initialize all optional fields to prevent uncontrolled/controlled warning
    mathGrade: '',
    scienceGrade: '',
    tertiaryQualification: '',
    teachingQualification: '',
    availability: '',
    interests: '',
    position: '',
    experience: '',
    education: '',
    coverLetter: '',
    organization: '',
    sponsorshipType: '',
    message: '',
  })
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    cv: null,
    id: null,
    workPermit: null,
    matric: null,
    transcript: null,
    sace: null,
  })
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string | null }>({
    cv: null,
    id: null,
    workPermit: null,
    matric: null,
    transcript: null,
    sace: null,
  })
  const [qualificationError, setQualificationError] = useState<string | null>(null)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const applicationFormRef = useRef<HTMLDivElement>(null);

  // Utility functions
  const validatePdfFile = (file: File | null): boolean => {
    if (!file) return true; // No file is valid (for optional fields)
    
    // Check if file extension is .pdf
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isPdf = fileExtension === 'pdf' || file.type === 'application/pdf';
    
    return isPdf;
  }

const handleInputChange = (field: keyof FormData, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

// Job navigation handlers
const handleBackToJobs = () => {
  setShowJobDetails(false);
  setShowApplicationForm(false);
  setSelectedJob(null);
};

const handleJobSelect = (job: JobListing) => {
  setSelectedJob(job);
  setShowJobDetails(true);
  setShowApplicationForm(false);
};

const handleApplyNow = () => {
  if (selectedJob) {
    setFormData(prev => ({ ...prev, position: selectedJob.title }));
    setShowJobDetails(false);
    setShowApplicationForm(true);
    
    // Scroll to application form
    setTimeout(() => {
      applicationFormRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }
};

const handleBackToJobDetails = () => {
  setShowApplicationForm(false);
  setShowJobDetails(true);
};

  const checkTutorQualifications = () => {
    const mathGrade = parseInt(formData.mathGrade || '0')
    const scienceGrade = parseInt(formData.scienceGrade || '0')
    
    if (applicationType === 'tutor') {
      if (mathGrade < 50 || scienceGrade < 50) {
        setQualificationError('You must have at least Level 4 (50%) in Grade 12 Mathematics and Physical Sciences.')
        return false
      }
      if (!formData.tertiaryQualification) {
        setQualificationError('You must have completed Mathematics 1 & 2 or Physics/Chemistry 1 & 2 at a tertiary institution.')
        return false
      }
    }
    setQualificationError(null)
    return true
  }

  // Handler functions
  const handleFileChange = (fieldName: string, file: File | null) => {
  const MAX_FILE_SIZE_MB = 5;
  
  // Clear previous errors
  setFileErrors(prev => ({ ...prev, [fieldName]: null }));
  
  if (file) {
    // Validate file size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileErrors(prev => ({
        ...prev,
        [fieldName]: `File must be under ${MAX_FILE_SIZE_MB}MB`,
      }));
      return;
    }
    
    // Validate file type
    if (!validatePdfFile(file)) {
      setFileErrors(prev => ({ ...prev, [fieldName]: 'Only PDF files are accepted' }));
      return;
    }
  }
  
  setFiles(prev => ({ ...prev, [fieldName]: file }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!checkTutorQualifications()) return;

  const formPayload = new FormData();

  // Add all form fields
  Object.entries(formData).forEach(([key, value]) => {
    if (value && value.trim() !== '') {
      formPayload.append(key, value);
    }
  });

  // Add application type
  formPayload.append('applicationType', applicationType);

  // Append relevant files with validation
  const fileValidationErrors: { [key: string]: string } = {};
  
  Object.entries(files).forEach(([key, file]) => {
    if (file) {
      // Double-check file size and type
      const MAX_FILE_SIZE_MB = 5;
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        fileValidationErrors[key] = `File must be under ${MAX_FILE_SIZE_MB}MB`;
        return;
      }
      
      if (!validatePdfFile(file)) {
        fileValidationErrors[key] = 'Only PDF files are accepted';
        return;
      }
      
      formPayload.append(key, file);
    }
  });

  // Check for validation errors
  if (Object.keys(fileValidationErrors).length > 0) {
    setFileErrors(prev => ({ ...prev, ...fileValidationErrors }));
    setSubmissionError('Please fix the file errors before submitting.');
    return;
  }

  // Check if required files are present for tutor applications
  if (applicationType === 'tutor') {
    const requiredFiles = ['cv', 'id', 'matric', 'transcript'];
    const missingFiles = requiredFiles.filter(field => !files[field]);
    
    if (missingFiles.length > 0) {
      setSubmissionError(`Please upload all required documents: ${missingFiles.join(', ')}`);
      return;
    }
  }

  // Check if required files are present for career applications
  if (applicationType === 'careers') {
    const requiredFiles = ['cv', 'id'];
    const missingFiles = requiredFiles.filter(field => !files[field]);
    
    if (missingFiles.length > 0) {
      setSubmissionError(`Please upload all required documents: ${requiredFiles.join(', ')}`);
      return;
    }
  }

  setIsSubmitting(true);
  setSubmissionError(null);
  setSubmissionSuccess(false);

  try {
    console.log('Submitting form with data:', {
      applicationType,
      formDataEntries: Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value && value.trim() !== '')
      ),
      fileNames: Object.entries(files)
        .filter(([_, file]) => file)
        .map(([key, file]) => `${key}: ${file?.name}`)
    });

    const response = await fetch('https://acmts6q2i2.execute-api.eu-west-1.amazonaws.com/prod/applicationFormHandler', {
      method: 'POST',
      body: formPayload,
    });

    console.log('Response received:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.warn("Raw response text:", responseText);
      console.warn("Text length:", responseText.length);
      console.warn("Status code:", response.status);

      let errorData: any = {};

      if (responseText && responseText.trim()) {
        try {
          errorData = JSON.parse(responseText);
          console.log("Parsed error data:", errorData);
        } catch (parseError) {
          console.error("Failed to parse error response as JSON:", parseError);
          errorData = {
            error: responseText,
            rawResponse: responseText,
          };
        }
      } else {
        console.warn("Empty response body received");
        errorData = {
          error: `HTTP ${response.status}: ${response.statusText}`,
          emptyResponse: true,
          status: response.status,
          statusText: response.statusText,
        };
      }

      console.error("Final error data object:", errorData);

      // Generate a user-friendly error message
      let errorMessage = "Failed to submit application";

      if (errorData.details) {
        errorMessage = errorData.details;
      } else if (errorData.error && errorData.error !== "Unknown error") {
        errorMessage = errorData.error;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (response.status === 404) {
        errorMessage = "The submission endpoint was not found. Please contact support.";
      } else if (response.status === 500) {
        errorMessage = "Internal server error. Please try again later or contact support.";
      } else if (response.status === 413) {
        errorMessage = "Files too large. Please reduce file sizes and try again.";
      } else if (response.status === 400) {
        errorMessage = "Invalid form data. Please check your inputs and try again.";
      } else if (response.status >= 500) {
        errorMessage = "Server error occurred. Please try again later.";
      } else if (response.status >= 400) {
        errorMessage = `Request error (${response.status}). Please check your data and try again.`;
      } else {
        errorMessage = `Unexpected error: ${response.status} ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    // Handle successful response
    const result = await response.json();
    console.log('Submission successful:', result);
    setSubmissionSuccess(true);
    setShowModal(true);
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      mathGrade: '',
      scienceGrade: '',
      tertiaryQualification: '',
      teachingQualification: '',
      availability: '',
      interests: '',
      position: '',
      experience: '',
      education: '',
      coverLetter: '',
      organization: '',
      sponsorshipType: '',
      message: '',
    });
    
    setFiles({
      cv: null,
      id: null,
      workPermit: null,
      matric: null,
      transcript: null,
      sace: null,
    });
    
  } catch (error) {
    console.error('Complete error details:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      error: error
    });
    
    setSubmissionSuccess(false);
    
    let displayError = 'There was a problem submitting your application.';
    
    if (error instanceof Error) {
      displayError = error.message;
    } else if (typeof error === 'string') {
      displayError = error;
    }
    
    // Additional context for common network errors
    if (error?.name === 'TypeError' && error?.message?.includes('fetch')) {
      displayError = 'Network error. Please check your internet connection and try again.';
    }
    
    setSubmissionError(displayError);
    setShowModal(true);
    
  } finally {
    setIsSubmitting(false);
  }

};




  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <Header />
      </div>
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            {/* Header Section */}
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Get Involved</h1>
            
            {/* Application Type Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-center mb-8 w-full max-w-5xl mx-auto">
              <Button
                variant={applicationType === 'tutor' ? 'default' : 'outline'}
                onClick={() => setApplicationType('tutor')}
                size="lg"
                className="w-full flex justify-center items-center"
              >
                <GraduationCap className="w-5 h-5 mr-2 flex-shrink-0" /> 
                <span className="whitespace-nowrap">Tutor Application</span>
              </Button>
              <Button
                variant={applicationType === 'volunteer' ? 'default' : 'outline'}
                onClick={() => setApplicationType('volunteer')}
                size="lg"
                className="w-full flex justify-center items-center"
              >
                <Users className="w-5 h-5 mr-2 flex-shrink-0" /> 
                <span className="whitespace-nowrap">Volunteer Application</span>
              </Button>
              <Button
                variant={applicationType === 'careers' ? 'default' : 'outline'}
                onClick={() => setApplicationType('careers')}
                size="lg"
                className="w-full flex justify-center items-center"
              >
                <GraduationCap className="w-5 h-5 mr-2 flex-shrink-0" /> 
                <span className="whitespace-nowrap">Tutor Opportunities</span>
              </Button>
              <Button
                variant={applicationType === 'sponsor' ? 'default' : 'outline'}
                onClick={() => setApplicationType('sponsor')}
                size="lg"
                className="w-full flex justify-center items-center"
              >
                <Handshake className="w-5 h-5 mr-2 flex-shrink-0" /> 
                <span className="whitespace-nowrap">Sponsorship Inquiry</span>
              </Button>
            </div>

            {/* Application Forms */}
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Careers Section - Replace student form with job listings */}
              {applicationType === 'careers' ? (
                <div className="space-y-6">
                  {/* Breadcrumbs Navigation */}
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <button 
                      onClick={handleBackToJobs} 
                      className={`flex items-center ${!showJobDetails && !showApplicationForm ? 'font-semibold text-gray-900' : 'hover:text-gray-900'}`}
                    >
                      Job Opportunities
                    </button>
                    
                    {(showJobDetails || showApplicationForm) && (
                      <>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <button 
                          onClick={() => {
                            setShowJobDetails(true)
                            setShowApplicationForm(false)
                          }}
                          className={`flex items-center ${showJobDetails && !showApplicationForm ? 'font-semibold text-gray-900' : 'hover:text-gray-900'}`}
                        >
                          {selectedJob?.title}
                        </button>
                      </>
                    )}
                    
                    {showApplicationForm && (
                      <>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="font-semibold text-gray-900">Apply</span>
                      </>
                    )}
                  </div>
                  
                  {/* Job Listings Grid */}
                  {!showJobDetails && !showApplicationForm && (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Opportunities</h2>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {jobListings.map((job) => (
                          <motion.div 
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                          >
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                              <p className="text-gray-600 text-sm mb-2">{job.location}</p>
    
                              
                              <Button 
                                onClick={() => handleJobSelect(job)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-1"
                                size="sm"
                              >
                                View Details
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Job Details View */}
                  {showJobDetails && selectedJob && !showApplicationForm && (
                    <div className="space-y-6">
                      <div className="flex items-center mb-6">
                        <button 
                          onClick={handleBackToJobs}
                          className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4"
                        >
                          <ArrowLeft className="w-5 h-5 mr-1" />
                          Back to jobs
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                        <p className="text-gray-700 mb-2">{selectedJob.company}</p>
                        <p className="text-gray-600 mb-4">{selectedJob.location}</p>
                        
    
                        
                        {selectedJob.responseTime && (
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {selectedJob.responseTime}
                          </div>
                        )}
                        
                        <div className="my-6">
                          <h3 className="text-lg font-semibold mb-3">Key Responsibilities</h3>
                          <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            {selectedJob.description.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-6">Posted {selectedJob.datePosted}</p>
                        
                        <Button 
                          onClick={handleApplyNow}
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          Apply for this position
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Application Form */}
                  {showApplicationForm && selectedJob && (
                    <div ref={applicationFormRef} className="space-y-6">
                      <div className="flex items-center mb-6">
                        <button 
                          onClick={handleBackToJobDetails}
                          className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4"
                        >
                          <ArrowLeft className="w-5 h-5 mr-1" />
                          Back to job details
                        </button>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Apply for: {selectedJob.title}</h3>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Common Fields */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="position">Position Applying For</Label>
                            <Input
                              id="position"
                              value={formData.position}
                              onChange={(e) => handleInputChange('position', e.target.value)}
                              required
                              readOnly
                            />
                          </div>
                          <div>
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Input
                              id="experience"
                              value={formData.experience}
                              onChange={(e) => handleInputChange('experience', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="education">Highest Education Level</Label>
                            <Input
                              id="education"
                              value={formData.education}
                              onChange={(e) => handleInputChange('education', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="coverLetter">Cover Letter</Label>
                            <Textarea
                              id="coverLetter"
                              value={formData.coverLetter}
                              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                              required
                              rows={6}
                              placeholder="Tell us why you're the perfect fit for this position"
                            />
                          </div>
                        </div>
                        
                        {/* Document Upload Section */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold mb-4">Required Documents <span className="text-sm font-normal text-red-600">(PDF files only)</span></h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="cv">CV/Resume</Label>
                              <Input
                                id="cv"
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={(e) => handleFileChange('cv', e.target.files?.[0] || null)}
                                required
                              />
                              {fileErrors.cv && (
                                <p className="text-red-600 text-sm mt-1">{fileErrors.cv}</p>
                              )}
                            </div>
                            <div>
                              <Label htmlFor="id">ID Copy/Passport</Label>
                              <Input
                                id="id"
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={(e) => handleFileChange('id', e.target.files?.[0] || null)}
                                required
                              />
                              {fileErrors.id && (
                                <p className="text-red-600 text-sm mt-1">{fileErrors.id}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Common Fields */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Tutor-specific Fields */}
                  {applicationType === 'tutor' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="mathGrade">Grade 12 Mathematics Level (%)</Label>
                        <Input
                          id="mathGrade"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.mathGrade}
                          onChange={(e) => handleInputChange('mathGrade', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="scienceGrade">Grade 12 Physical Sciences Level (%)</Label>
                        <Input
                          id="scienceGrade"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.scienceGrade}
                          onChange={(e) => handleInputChange('scienceGrade', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="tertiaryQualification">Tertiary Qualification</Label>
                        <Input
                          id="tertiaryQualification"
                          value={formData.tertiaryQualification}
                          onChange={(e) => handleInputChange('tertiaryQualification', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="teachingQualification">Teaching Qualification (if applicable)</Label>
                        <Input
                          id="teachingQualification"
                          value={formData.teachingQualification}
                          onChange={(e) => handleInputChange('teachingQualification', e.target.value)}
                        />
                      </div>
                      
                      {/* Document Upload Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Required Documents <span className="text-sm font-normal text-red-600">(PDF files only)</span></h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="cv">CV/Resume</Label>
                            <Input
                              id="cv"
                              type="file"
                              accept=".pdf,application/pdf"
                              onChange={(e) => handleFileChange('cv', e.target.files?.[0] || null)}
                              required
                            />
                            {fileErrors.cv && (
                              <p className="text-red-600 text-sm mt-1">{fileErrors.cv}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="id">ID Copy/Passport</Label>
                            <Input
                              id="id"
                              type="file"
                              accept=".pdf,application/pdf"
                              onChange={(e) => handleFileChange('id', e.target.files?.[0] || null)}
                              required
                            />
                            {fileErrors.id && (
                              <p className="text-red-600 text-sm mt-1">{fileErrors.id}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="workPermit">Work Permit (if applicable)</Label>
                            <Input
                              id="workPermit"
                              type="file"
                              accept=".pdf,application/pdf"
                              onChange={(e) => handleFileChange('workPermit', e.target.files?.[0] || null)}
                            />
                            {fileErrors.workPermit && (
                              <p className="text-red-600 text-sm mt-1">{fileErrors.workPermit}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="matric">Matric Certificate</Label>
                            <Input
                              id="matric"
                              type="file"
                              accept=".pdf,application/pdf"
                              onChange={(e) => handleFileChange('matric', e.target.files?.[0] || null)}
                              required
                            />
                            {fileErrors.matric && (
                              <p className="text-red-600 text-sm mt-1">{fileErrors.matric}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="transcript">Academic Transcript</Label>
                            <Input
                              id="transcript"
                              type="file"
                              accept=".pdf,application/pdf"
                              onChange={(e) => handleFileChange('transcript', e.target.files?.[0] || null)}
                              required
                            />
                            {fileErrors.transcript && (
                              <p className="text-red-600 text-sm mt-1">{fileErrors.transcript}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="sace">SACE Certificate (if applicable)</Label>
                            <Input
                              id="sace"
                              type="file"
                              accept=".pdf,application/pdf"
                              onChange={(e) => handleFileChange('sace', e.target.files?.[0] || null)}
                            />
                            {fileErrors.sace && (
                              <p className="text-red-600 text-sm mt-1">{fileErrors.sace}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {qualificationError && (
                        <p className="text-red-600 text-sm">{qualificationError}</p>
                      )}
                    </div>
                  )}

                  {/* Volunteer-specific Fields */}
                  {applicationType === 'volunteer' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="availability">Availability</Label>
                        <Input
                          id="availability"
                          value={formData.availability}
                          onChange={(e) => handleInputChange('availability', e.target.value)}
                          required
                          placeholder="e.g., Weekdays afternoons, Weekends"
                        />
                      </div>
                      <div>
                        <Label htmlFor="interests">Areas of Interest</Label>
                        <Textarea
                          id="interests"
                          value={formData.interests}
                          onChange={(e) => handleInputChange('interests', e.target.value)}
                          required
                          placeholder="What areas would you like to contribute to?"
                        />
                      </div>
                    </div>
                  )}

                  {/* Sponsor-specific Fields */}
                  {applicationType === 'sponsor' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="organization">Organization Name</Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange('organization', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="sponsorshipType">Sponsorship Type</Label>
                        <Input
                          id="sponsorshipType"
                          value={formData.sponsorshipType}
                          onChange={(e) => handleInputChange('sponsorshipType', e.target.value)}
                          required
                          placeholder="e.g., Monetary, Resources, Other"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message/Inquiry</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          placeholder="Please provide details about your sponsorship inquiry"
                        />
                      </div>
                    </div>
                  )}

                  {/* Error message display */}
                  {submissionError && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-md">
                      {submissionError}
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center">
          <div className="text-4xl mb-4">
            {submissionSuccess ? (
              <CheckCircle className="w-16 h-16 mx-auto text-red-600" />
            ) : (
              <XCircle className="w-16 h-16 mx-auto text-yellow-500" />
            )}
          </div>
          <h3 className="text-xl font-semibold mb-4">
            {submissionSuccess ? 'Application Submitted!' : 'Error'}
          </h3>
          <p className="text-gray-600">
            {submissionSuccess 
              ? 'Thank you for your interest. We will review your application and contact you soon.' 
              : 'There was a problem submitting your application. Please try again.'}
          </p>
        </div>
      </Modal>

      <Footer />
    </div>
  )
}
