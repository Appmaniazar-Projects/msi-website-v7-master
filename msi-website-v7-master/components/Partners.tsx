'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Partners = () => {
  const logos = [
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_barloworld-logo.png',
      alt: 'Barloworld',
      width: 200,
      url: 'https://www.barloworld.com'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_eastern_cape.svg',
      alt: 'Eastern Cape Education',
      width: 200,
      url: 'https://eceducation.gov.za/'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_standard_bank_logo.svg',
      alt: 'Standard Bank',
      width: 200,
      url: 'https://www.standardbank.co.za'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_university_of_fort_hare.png',
      alt: 'University of Fort Hare',
      width: 200,
      url: 'https://www.ufh.ac.za/'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_grindrod-logo-color.svg',
      alt: 'Grindrod',
      width: 200,
      url: 'https://www.grindrod.com/'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_adopt_a_school.svg',
      alt: 'Adopt a School Foundation',
      width: 240,
      url: 'https://www.adoptaschool.org.za/'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partners_Zenex.png',
      alt: 'Zenex Foundation',
      width: 200,
      url: 'https://www.zenexfoundation.org.za/'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_patner_idc.png',
      alt: 'Industrial Development Corporation',
      width: 200,
      url: 'https://www.idc.co.za/'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_cwn.jpg',
      alt: 'CWN',
      width: 200,
      url: ''
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_nedbank.svg',
      alt: 'Nedbank',
      width: 200,
      url: 'https://personal.nedbank.co.za/home.html'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_limbe.jpg',
      alt: 'Limbe Energy',
      width: 200,
      url: 'https://www.facebook.com/limbeenergy/'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_RAF-logo.jpg',
      alt: 'Road Accident Fund',
      width: 200,
      url: 'https://www.raf.co.za/Pages/Default.aspx'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_sapco.jpg',
      alt: 'SA Public Colleges Organisation',
      width: 200,
      url: 'https://sacpo.co.za/'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partners_DHET.png',
      alt: 'Department of Higher Education and Training',
      width: 200,
      url: 'https://www.dhet.gov.za/'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_dbe.png',
      alt: 'Department of Basic Education',
      width: 200,
      url: 'https://www.education.gov.za/'
    },
    {
      src: 'https://d1dc40k4xbphr.cloudfront.net/images/msi-partners/msi_partner_airlink-logo.svg',
      alt: 'Airlink',
      width: 200,
      url: 'https://www.flyairlink.com/'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-12 text-navy-blue">
            Collaborations And Partnerships
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {logos.map((logo, index) => (
              <motion.div
                key={`${logo.alt}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <Link 
                  href={logo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-24 relative filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                  aria-label={`Visit ${logo.alt} website`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes={`${logo.width}px`}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners
