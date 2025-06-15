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
  // Remove student fields and add career application fields
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
    // Replace grade/subjects with career fields
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
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  const [showJobDetails, setShowJobDetails] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const applicationFormRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset form data when application type changes
    const defaultFormData = {
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      // Initialize all fields with empty strings to prevent uncontrolled/controlled warning
      mathGrade: '',
      scienceGrade: '',
      tertiaryQualification: '',
      teachingQualification: '',
      availability: '',
      interests: '',
      // Replace grade/subjects with career fields
      position: '',
      experience: '',
      education: '',
      coverLetter: '',
      organization: '',
      sponsorshipType: '',
      message: '',
    };
    
    // Only include fields relevant to the selected application type
    if (applicationType === 'tutor') {
      setFormData({
        ...defaultFormData,
        mathGrade: '',
        scienceGrade: '',
        tertiaryQualification: '',
        teachingQualification: '',
      });
    } else if (applicationType === 'volunteer') {
      setFormData({
        ...defaultFormData,
        availability: '',
        interests: '',
      });
    } else if (applicationType === 'careers') {
      setFormData({
        ...defaultFormData,
        position: '',
        experience: '',
        education: '',
        coverLetter: '',
      });
    } else if (applicationType === 'sponsor') {
      setFormData({
        ...defaultFormData,
        organization: '',
        sponsorshipType: '',
        message: '',
      });
    }
    
    // Reset all file uploads when changing application type
    setFiles({
      cv: null,
      id: null,
      workPermit: null,
      matric: null,
      transcript: null,
      sace: null,
    });
    
    // Clear any errors
    setFileErrors({
      cv: null,
      id: null,
      workPermit: null,
      matric: null,
      transcript: null,
      sace: null,
    });
    setQualificationError(null);
    setSubmissionError(null);
  }, [applicationType]);

  // Add a new useEffect to reset the form after successful submission
  useEffect(() => {
    if (submissionSuccess) {
      // Reset form data to defaults after successful submission
      const defaultFormData = {
        name: '',
        email: '',
        phone: '',
        // Initialize all fields with empty strings
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
      };
      
      setFormData(defaultFormData);
      
      // Reset file uploads
      setFiles({
        cv: null,
        id: null,
        workPermit: null,
        matric: null,
        transcript: null,
        sace: null,
      });
      
      // Clear errors
      setFileErrors({
        cv: null,
        id: null,
        workPermit: null,
        matric: null,
        transcript: null,
        sace: null,
      });
      setQualificationError(null);
      setSubmissionError(null);
      
      // Reset job selection if in careers section
      if (applicationType === 'careers') {
        setShowJobDetails(false);
        setShowApplicationForm(false);
        setSelectedJob(null);
      }
    }
  }, [submissionSuccess, applicationType]);

  const validatePdfFile = (file: File | null): boolean => {
    if (!file) return true; // No file is valid (for optional fields)
    
    // Check if file extension is .pdf
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isPdf = fileExtension === 'pdf' || file.type === 'application/pdf';
    
    return isPdf;
  }

  const handleFileChange = (fieldName: string, file: File | null) => {
    if (file && !validatePdfFile(file)) {
      setFileErrors(prev => ({ ...prev, [fieldName]: 'Only PDF files are accepted' }));
      return;
    }
    
    setFiles(prev => ({ ...prev, [fieldName]: file }));
    setFileErrors(prev => ({ ...prev, [fieldName]: null }));
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (applicationType === 'tutor' && !checkTutorQualifications()) {
      return
    }
    
    // Check for any file errors before submission
    const hasFileErrors = Object.values(fileErrors).some(error => error !== null);
    if (hasFileErrors) {
      setSubmissionError('Please fix the file errors before submitting.');
      return;
    }

    setIsSubmitting(true)
    setSubmissionError(null)
    setSubmissionSuccess(false) // Reset success state before submission
    
    try {
      // Prepare form data for submission
      const formPayload = new FormData();
      formPayload.append('applicationType', applicationType);
      
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });
      
      // Append files based on application type
      if (applicationType === 'tutor') {
        // Only append files relevant to tutors
        if (files.cv) formPayload.append('files', files.cv, `cv-${files.cv.name}`);
        if (files.id) formPayload.append('files', files.id, `id-${files.id.name}`);
        if (files.workPermit) formPayload.append('files', files.workPermit, `workPermit-${files.workPermit.name}`);
        if (files.matric) formPayload.append('files', files.matric, `matric-${files.matric.name}`);
        if (files.transcript) formPayload.append('files', files.transcript, `transcript-${files.transcript.name}`);
        if (files.sace) formPayload.append('files', files.sace, `sace-${files.sace.name}`);
      } else if (applicationType === 'volunteer') {
        // Only append CV for volunteers
        if (files.cv) formPayload.append('files', files.cv, `cv-${files.cv.name}`);
      } else if (applicationType === 'careers') {
        // Only append CV and ID for career applications
        if (files.cv) formPayload.append('files', files.cv, `cv-${files.cv.name}`);
        if (files.id) formPayload.append('files', files.id, `id-${files.id.name}`);
      } else if (applicationType === 'sponsor') {
        // Only append files relevant to sponsors
        if (files.cv) formPayload.append('files', files.cv, `cv-${files.cv.name}`);
      }
      
      console.log(`Submitting ${applicationType} application`);
      
      // Send data to API endpoint
      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formPayload,
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Server error response:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to submit application');
      }
      
      const result = await response.json();
      console.log('Submission successful:', result);
      
      setSubmissionSuccess(true)
      setShowModal(true)
    } catch (error) {
      console.error('Error submitting application:', error)
      setSubmissionSuccess(false)
      setSubmissionError(error instanceof Error ? error.message : 'There was a problem submitting your application. Please try again.')
      setShowModal(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleJobSelect = (job: JobListing) => {
    setSelectedJob(job)
    setShowJobDetails(true)
    setShowApplicationForm(false)
  }

  const handleApplyNow = () => {
    if (selectedJob) {
      setFormData({
        ...formData,
        position: selectedJob.title
      })
      setShowApplicationForm(true)
      
      // Wait for state update and then scroll
      setTimeout(() => {
        applicationFormRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const handleBackToJobs = () => {
    setShowJobDetails(false)
    setShowApplicationForm(false)
    setSelectedJob(null)
  }

  const handleBackToJobDetails = () => {
    setShowApplicationForm(false)
  }

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
                    
                    <div className="text-sm text-gray-600">
                      <p>For inquiries, please contact:</p>
                      <p>073 230 5457 / 073 174 5664</p>
                      <p>Applications will be sent to: careers@mathsandscienceinfinity.org.za</p>
                      {applicationType === 'tutor' && (
                        <p className="mt-2">Note: Shortlisted tutor applicants will be invited for an induction and content workshop.</p>
                      )}
                    </div>
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
