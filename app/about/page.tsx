'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import PyramidDiagram from "@/components/pyramid-diagram"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const teamMembers = [
   {
    name: 'Dr Fikiswa Ngonyama',
    role: 'Chairperson',
    image: 'https://d1dc40k4xbphr.cloudfront.net/images/board_members/msi_board_Dr_Fikiswa_Ngonyama.jpg',
    bio: 'Occupational Medical Practitioner and public health expert with over a decade of experience in healthcare management and policy.',
  },
  {
    name: 'Mr Zenith Tsengwa',
    role: 'Board Member',
    image: 'https://d1dc40k4xbphr.cloudfront.net/images/board_members/msi_board_Mr_Zenith_Tsengwa.webp',
    bio: 'Dynamic business leader with expertise in project management, strategy, and investment, and a passion for education and community upliftment.',
  },
 
  {
    name: 'Mr Lindele Mondliwa',
    role: 'Board Member',
    image: 'https://d1dc40k4xbphr.cloudfront.net/images/board_members/msi_board_Mr_Lindele_Mondliwa.jpg',
    bio: 'Managing Director of Limbe Energy and entrepreneur with investments spanning multiple industries.',
  },
]

const values = [
  {
    title: 'Equity and Inclusion',
    description: 'We ensure every student has equal access to education, regardless of their background.',
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_student_icon.svg" alt="Equity and Inclusion" width={100} height={100} />, 
  },
  {
    title: 'Excellence in Education',
    description: 'We strive for the highest standards in both our teaching and service delivery.',
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_profess_ser_page_icon.svg" alt="Equity and Inclusion" width={100} height={100} />, 
  },
  {
    title: 'Innovation and Creativity',
    description: 'Embracing new methods and technologies to enhance learning.',
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_developing_icon.svg" alt="Innovation and Creativity" width={100} height={100} />, 
  },
  {
    title: 'Collaboration and Partnership',
    description: 'Working with educators, communities, and students to achieve success.',
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_about_collab_icon.svg" alt="Collaboration and Partnership" width={100} height={100} />,
  },
  {
    title: 'Accountability and Transparency',
    description: 'We hold ourselves accountable and maintain transparency in all our actions.',
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_about_instructors_icon.svg" alt="Accountability and Transparency" width={100} height={100} />,
  },
  {
    title: 'Continuous Improvement',
    description: 'We are committed to constant growth and development to better serve our students.',
    icon: <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_students_service_page_icon.svg" alt="Continuous Improvement" width={100} height={100} />,
  },  
]

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white text-navy-blue">
        <div className="absolute inset-0"></div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              About MSI
            </motion.h1>
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl opacity-90 leading-relaxed pb-10"
            >
              Transforming lives through quality STEM education
            </motion.p>
            <p className="text-gray-600 leading-relaxed text-lg">
            MSI is a proudly South African organization that focuses on helping underperforming schools nationwide by demystifying Maths and Sciences. We offer tailor-made solutions labeled as Afrocentrism, which means connecting classroom learning to real-life experiences.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-4xl mb-6">
                  <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_developing_icon.svg" alt="Mission" width={100} height={100} />
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-navy-blue">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                  We aim to revolutionize STEM education by offering tailored support to 
                  students and educators. Our goal is to empower students, particularly 
                  those facing challenges in maths and science, with the tools to excel 
                  and become future global leaders. Through innovative programs, 
                  career guidance, mobile labs, and flexible online tutorials, 
                  we ensure equitable access to learning opportunities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-4xl mb-6">
                  <Image src="https://d1dc40k4xbphr.cloudfront.net/images/icons/msi_developing_icon.svg" alt="Vision" width={100} height={100} />
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-navy-blue">Our Vision</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                  Leading the way in pioneering premier STEM educational initiatives 
                  that foster the development of future global leaders by providing 
                  equitable access to education and promoting excellence, creativity, and innovation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white text-navy-blue relative overflow-hidden">
      <div className="container relative mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-3xl font-bold text-center mb-12 text-navy-blue"
        >
          Why Choose MSI?
        </motion.h2>
        <PyramidDiagram />
      </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 text-navy-blue"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-red-600">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="text-5xl mb-6 ">{value.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-navy-blue">
            Maths and Science Infinity Board
            </h2>
            <p className="text-xl text-navy-blue">
              Passionate educators and professionals dedicated to transforming STEM education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
                  {/* Image Container */}
                  <div className="relative h-[400px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-red-400 font-medium text-lg">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bio */}
                  <div className="p-6">
                    <p className="text-gray-600 text-base leading-relaxed">
                      {member.bio}
                    </p>
                    {/* Social Links */}
                    {/* <div className="flex items-center gap-4 mt-6">
                      <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col md:flex-row items-center gap-16"
            >
              <div className="md:w-1/2">
                <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://d1dc40k4xbphr.cloudfront.net/images/board_members/msi_board_Mr_Zenith_Tsengwa.webp"
                    alt="CEO"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Message from our CEO</h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed italic">
                  "Our commitment to excellence in STEM education goes beyond the classroom. 
                  We believe in nurturing not just academic excellence, but also creativity, 
                  critical thinking, and a genuine passion for learning. Together, we can build 
                  a brighter future for our youth."
                </p>
                <div>
                  <h3 className="text-2xl font-bold">Zenith Tsengwa</h3>
                  <p className="text-red-500 text-lg">CEO & Founder</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
