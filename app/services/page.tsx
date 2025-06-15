'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Define types for our data structures
interface Service {
  title: string
  description: string
  highlightTerms: string[]
  features: string[]
  image: string
  category: string
}

interface Category {
  name: string
  icon: JSX.Element
  description: string
}

// Service category definitions
const categories: Category[] = [
  {
    name: "Learner Development",
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_students_service_page_icon.svg" alt="Learner Development" width={100} height={100} />, 
    description: "Comprehensive programs designed to help students excel in mathematics and science through personalized support and enrichment."
  },
  {
    name: "Teacher Development",
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_profess_ser_page_icon.svg" alt="Teacher Development" width={100} height={100} />, 
    description: "Training and upskilling educators to improve teaching methodologies and enhance subject mastery for better student outcomes."
  },
  {
    name: "Tutor Development",
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_profess_ser_page_icon.svg" alt="Tutor Development" width={100} height={100} />, 
    description: "Equipping tutors with the necessary skills and resources to effectively support and inspire learners in STEM subjects."
  },
  {
    name: "Mobile Laboratories",
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_lab_icon.svg" alt="Mobile Laboratories" width={100} height={100} />, 
    description: "Bringing practical science experiments to schools with limited laboratory facilities for hands-on learning experiences."
  },
  {
    name: "Career Guidance & Role Modelling",
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_students_service_page_icon.svg" alt="Career Guidance & Role Modelling" width={100} height={100} />, 
    description: "Connecting learners with industry professionals to inspire and guide their career choices in STEM fields."
  },
  {
    name: "Project Management",
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_profess_ser_page_icon.svg" alt="Project Management" width={100} height={100} />, 
    description: "Overseeing and implementing educational projects and initiatives with comprehensive planning and evaluation."
  },
  {
    name: "Research & Development",
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_lab_icon.svg" alt="Research & Development" width={100} height={100} />, 
    description: "Conducting studies and developing innovative strategies to improve STEM education through evidence-based approaches."
  },
  {
    name: "E-Learning",
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_digital_icon.svg" alt="E-Learning" width={100} height={100} />, 
    description: "Providing digital learning platforms and resources for accessible, flexible, and engaging education anywhere."
  },
  {
    name: "Learner Psychosocial Support",
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_digital_icon.svg" alt="Learner Psychosocial Support" width={100} height={100} />, 
    description: "Empowering tutors to support learners' emotional well-being, resilience, and motivation."
  }
]

// Detailed service information
const services: Service[] = [
  {
    title: "Learner Development",
    description: "Providing comprehensive academic support, personalized tutoring, and enrichment programs to enhance learners' performance in mathematics and science subjects.",
    highlightTerms: ["academic support", "personalized tutoring", "enrichment programs"],
    features: [
      "Tailored support programs for struggling students",
      "Advanced enrichment for high-performing learners",
      "Curriculum-aligned resources and materials",
      "Focus on building confidence and deep conceptual understanding"
    ],
    image: "https://d1dc40k4xbphr.cloudfront.net/images/gallery/msi-learner-development.JPG",
    category: "Learner Development"
  },
  {
    title: "Tutor Development",
    description: "Equipping tutors with the necessary pedagogical skills, subject knowledge, and resources to effectively support and inspire learners in STEM subjects.",
    highlightTerms: ["pedagogical skills", "subject knowledge"],
    features: [
      "Training in advanced teaching techniques and methodologies",
      "Subject-specific workshops for science and mathematics tutors",
      "Ongoing mentorship and performance evaluation",
      "Resource development and sharing platforms"
    ],
    image: "https://d1dc40k4xbphr.cloudfront.net/images/gallery/msi-tutor-development-training.jpg",
    category: "Tutor Development"
  },
  {
    title: "Teacher Development",
    description: "Training and upskilling educators to improve teaching methodologies, enhance subject mastery, and implement innovative classroom strategies for better student outcomes.",
    highlightTerms: ["upskilling educators", "innovative classroom strategies"],
    features: [
      "Access to cutting-edge teaching resources and methodologies",
      "Workshops on effective STEM classroom strategies",
      "Subject-specific professional development courses",
      "Regular assessment and constructive feedback mechanisms"
    ],
    image: "https://d1dc40k4xbphr.cloudfront.net/images/gallery/msi-teacher-development.jpg",
    category: "Teacher Development"
  },
  {
    title: "Career Guidance & Role Modelling",
    description: "Connecting learners with industry professionals and academics to inspire and guide their career choices in STEM fields through mentorship and exposure programs.",
    highlightTerms: ["mentorship", "exposure programs"],
    features: [
      "Personalized career counseling sessions with field experts",
      "Exposure to diverse STEM role models and pathways",
      "Interactive workshops on future career opportunities",
      "Industry site visits and shadowing experiences"
    ],
    image: "https://d1dc40k4xbphr.cloudfront.net/images/gallery/msi-councelling.jpg",
    category: "Career Guidance & Role Modelling"
  },
  {
    title: "Mobile Laboratories",
    description: "Bringing fully-equipped, practical science experiments to schools and communities with limited laboratory facilities, ensuring hands-on learning experiences for all students.",
    highlightTerms: ["fully-equipped", "hands-on learning"],
    features: [
      "State-of-the-art mobile laboratory units for physics, chemistry, and biology",
      "Curriculum-aligned practical experiments for students of all levels",
      "Community outreach programs for underserved areas",
      "Training for local teachers on practical science instruction"
    ],
    image: "https://d1dc40k4xbphr.cloudfront.net/images/gallery/msi-mobile-laboratories.jpg",
    category: "Mobile Laboratories"
  },
  {
    title: "Project Management",
    description: "Overseeing and implementing educational projects and initiatives with comprehensive planning, monitoring, and evaluation to ensure maximum impact and sustainability.",
    highlightTerms: ["comprehensive planning", "monitoring", "evaluation"],
    features: [
      "End-to-end management of educational interventions",
      "Stakeholder engagement and communication",
      "Resource allocation and optimization",
      "Impact assessment and reporting"
    ],
    image: "https://d1dc40k4xbphr.cloudfront.net/images/gallery/msi-project-management.jpg",
    category: "Project Management"
  },
  {
    title: "Research & Development",
    description: "Conducting rigorous studies and developing innovative strategies to improve STEM education through evidence-based approaches and continuous improvement.",
    highlightTerms: ["evidence-based approaches", "continuous improvement"],
    features: [
      "Educational research design and implementation",
      "Data collection and analysis on learning outcomes",
      "Development of new teaching methodologies and resources",
      "Publication and dissemination of research findings"
    ],
    image: "https://d1dc40k4xbphr.cloudfront.net/images/gallery/msi-teaching.jpg",
    category: "Research & Development"
  },
  {
    title: "E-Learning",
    description: "Providing comprehensive digital learning platforms and interactive resources for accessible, flexible, and engaging education that reaches students regardless of location.",
    highlightTerms: ["interactive resources", "flexible", "engaging education"],
    features: [
      "Custom-designed digital learning content and assessments",
      "Real-time virtual support and interactive sessions",
      "Progress tracking and personalized feedback systems",
      "Blended learning approaches that combine digital and traditional methods"
    ],
    image: "https://d1dc40k4xbphr.cloudfront.net/images/gallery/msi-tutor.jpg",
    category: "E-Learning"
  },
  {
    title: "Learner Psychosocial Support",
    description: "Empowering tutors to nurture learners' emotional well-being, resilience, and motivation.",
    highlightTerms: ["emotional well-being", "resilience", "motivation"],
    features: [
      "Workshops on mental health awareness and emotional intelligence",
      "Training in trauma-informed teaching and conflict resolution",
      "Personalized mentorship and peer support networks",
      "Access to counseling resources and intervention strategies"
    ],
    image: "https://d1dc40k4xbphr.cloudfront.net/images/gallery/msi-talks.jpg",
    category: "Learner Psychosocial Support"
  }
]

// Helper function to highlight specific terms in text
const highlightText = (text: string, terms: string[] = []) => {
  if (!terms || terms.length === 0) return text;
  
  let result = text;
  terms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi');
    result = result.replace(regex, '<strong>$1</strong>');
  });
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
};

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-10 text-navy-blue overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Our Services
            </motion.h1>
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl opacity-90"
            >
             Empowering students with tailored STEM education solutions to meet their unique needs.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </section>

      {/* Categories Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={`${category.name}-${index}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 text-navy-blue"
          >
            Detailed Services
          </motion.h2>

          <div className="space-y-24 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover object-center scale-110"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mt-2 mb-6 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-xl text-gray-600 mb-8">
                    {highlightText(service.description, service.highlightTerms)}
                  </p>
                  <ul className="space-y-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}