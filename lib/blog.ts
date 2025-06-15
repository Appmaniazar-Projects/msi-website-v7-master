import { cache } from 'react';

export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    author: string;
    image?: string;
    tags: string[];
    excerpt: string;
  };
  content: string;
  readingTime: number;
  facebookLink?: string;
}

// Hardcoded blog posts for development
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'eastern-cape-nsc-2024-awards',
    frontmatter: {
      title: 'Celebrating Excellence at the Eastern Cape NSC 2024 Awards',
      date: '2025-03-15',
      author: 'MSI Team',
      image: 'https://d1dc40k4xbphr.cloudfront.net/images/blog/msi_blogs_achievement.png',
      tags: ['Awards', 'Education', 'Excellence'],
      excerpt: 'MSI was honored to be a proud partner of the Eastern Cape NSC 2024 Awards, a prestigious event celebrating the academic achievements of outstanding learners in the province.'
    },
    content: `MSI was honored to be a proud partner of the Eastern Cape NSC 2024 Awards, a
prestigious event celebrating the academic achievements of outstanding learners in the
province.

Our CEO, Mr. Zenith Tsengwa, had the privilege of presenting awards alongside Eastern
Cape Premier, Mr. Lubabalo Oscar Mabuyane, and Mr. Monde Sondaba. Together, they
recognized the hard work, resilience, and determination of top-performing students whose
achievements inspire their peers and communities.

This event highlights the transformative power of education, reaffirming the importance of
investing in young minds to shape a brighter future for South Africa. As a committed partner
of the Eastern Cape Department of Education MSI remains dedicated to empowering
learners through impactful initiatives in maths, science, and technology.

To all the awardees – congratulations! Your success is a testament to the endless
possibilities that come with dedication and perseverance. We look forward to continuing our
mission of driving excellence in education and inspiring the next generation of leaders.

#MSI #NSC2024Awards #EducationForSuccess #FutureLeaders #EmpoweringYouth`,
    readingTime: 3,
    facebookLink: 'https://www.facebook.com/MathsandScienceInfinity/posts/pfbid0xM6iomwe92EccZ79fYEnwBpZjWFUG6xbosL9d1ncwNX5Frvjh2PfqRzLjX5BzEFql'
  },
  {
    slug: 'tutor-training-workshop-umthatha',
    frontmatter: {
      title: 'Empowering Tutors, Transforming Futures: MSI\'s Tutor Training Workshop in Umthatha',
      date: '2025-02-15',
      author: 'MSI Team',
      image: 'https://d1dc40k4xbphr.cloudfront.net/images/blog/msi_blogs_workshop.png',
      tags: ['Training', 'Education', 'Tutors'],
      excerpt: 'From 10 - 12 February 2025, MSI hosted an intensive Tutor Training Workshop in Umthatha, aimed at equipping our dedicated tutors with the essential skills and strategies needed to support Grade 12 learners.'
    },
    content: `From 10 - 12 February 2025, MSI hosted an intensive Tutor Training Workshop in
Umthatha, aimed at equipping our dedicated tutors with the essential skills and strategies
needed to support Grade 12 learners in mathematics and science.

At MSI, we understand that quality education begins with well-equipped educators. This
workshop provided tutors with practical teaching methodologies, problem-solving
techniques, and learner engagement strategies to ensure that students receive the best
possible academic support.

Our focus is on underperforming schools, where additional guidance can make a
significant difference. By strengthening the capacity of our tutors, we are ensuring that more
learners have the opportunity to excel in their final exams and pursue further studies or
careers in STEM fields.

The impact of this training will extend beyond the classroom, boosting learner confidence,
improving pass rates, and ultimately changing lives. As MSI continues to champion
excellence in maths and science education, we remain committed to empowering both
educators and learners to achieve greatness.

#MSI #TutorTraining #STEMEducation #EmpoweringTutors #TransformingFutures`,
    readingTime: 3,
    facebookLink: 'https://www.facebook.com/MathsandScienceInfinity/posts/pfbid02PSm6D8oeNsLSdfiqo1GifFMArHGX9Rf7MwBHY5rLs1c9q7L4iUwteGmBYgZJBDqCl'
  },
  {
    slug: 'working-world-exhibition-2025',
    frontmatter: {
      title: 'MSI Inspires Future Innovators at the Working World Exhibition 2025',
      date: '2025-01-25',
      author: 'MSI Team',
      image: 'https://d1dc40k4xbphr.cloudfront.net/images/blog/msi_blogs_exhibition.png',
      tags: ['Exhibition', 'STEM Careers', 'Youth'],
      excerpt: 'MSI was proud to be an exhibitor at the Working World Exhibition 2025, a premier event that connects over 50 high schools in the Nelson Mandela Bay Metro with career and education opportunities.'
    },
    content: `MSI was proud to be an exhibitor at the Working World Exhibition 2025, a premier event
that connects over 50 high schools in the Nelson Mandela Bay Metro with career and
education opportunities. This platform plays a crucial role in empowering the next
generation, equipping them with the knowledge and resources needed to navigate the world
of work.

Throughout the event, our team engaged with enthusiastic learners exploring maths and
science career pathways. We provided valuable insights, shared resources, and guided
students in making informed decisions about their futures in STEM (Science, Technology,
Engineering, and Mathematics). Witnessing their curiosity and ambition reaffirmed MSI's
commitment to driving excellence in maths and science education.

The overwhelming response from learners showcased the growing interest in STEM
fields, proving that the future is bright! At MSI, we remain dedicated to inspiring and
supporting young minds as they take the next steps toward successful and impactful
careers.

We look forward to continuing our work in empowering youth and fostering a generation of
innovators who will shape South Africa's future.

#MSI #WorkingWorldExhibition #STEMCareers #FutureInnovators #EmpoweringYouth`,
    readingTime: 3,
    facebookLink: 'https://www.facebook.com/MathsandScienceInfinity/posts/pfbid0TcLPstpPCXaUZWpQ8XPM2aRCyRrXjWxtfrtQ4uiFqkHtji2k4ErJsxch4sdxrLZgl'
  }
];

export const getBlogPosts = cache(async () => {
  // Use a stable sorting algorithm that doesn't rely on browser-specific implementations
  return [...BLOG_POSTS].sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
});

export const getBlogPostBySlug = cache(async (slug: string) => {
  return BLOG_POSTS.find(post => post.slug === slug) || null;
});
