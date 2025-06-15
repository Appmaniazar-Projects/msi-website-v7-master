export interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  responseTime?: string;
  description: string[];
  datePosted: string;
}

export const jobListings: JobListing[] = [
  {
    id: 1,
    title: 'Mathematics Tutor',
    company: 'Maths and Science Infinity',
    location: 'East London, Eastern Cape',
    responseTime: 'Typically responds within 2 days',
    description: [
      'Provide specialized mathematics tutoring to high school students.',
      'Develop customized study plans and materials.',
      'Track and report student progress.',
      'Minimum Level 5 (60%) in Grade 12 Mathematics required.'
    ],
    datePosted: '3 days ago'
  },
  {
    id: 2,
    title: 'Science Tutor',
    company: 'Maths and Science Infinity',
    location: 'East London, Eastern Cape',
    responseTime: 'Typically responds within 1 day',
    description: [
      'Provide specialized science tutoring to high school students.',
      'Develop customized study plans and materials.',
      'Track and report student progress.',
      'Minimum Level 5 (60%) in Grade 12 Science required.'
    ],
    datePosted: '1 week ago'
  },
]; 