import Script from 'next/script'
import './globals.css'
import { Inter } from 'next/font/google'
import BackToTop from '@/components/BackToTop'
import WhatsAppButton from '@/components/WhatsAppButton'
import { siteConfig } from './metadata'
import { Metadata, Viewport } from 'next'
import { GA_MEASUREMENT_ID } from '@/lib/gtag'
import Analytics from './analytics'


const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#dc2626',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'MSI Team' }],
  creator: 'MSI Team',
  applicationName: 'MSI Education Platform',
  category: 'education',
  classification: 'Education',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: siteConfig.name
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@msi_education'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  // TODO: Add verification codes once you have access to Google Search Console & Yandex
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteConfig.url} />
        {Object.values(siteConfig.links).map((url, index) => (
          <link key={index} rel="me" href={url} />
        ))}

        {/* ✅ JSON-LD Structured Data - Organization Schema */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": siteConfig.organization.name,
              "url": siteConfig.url,
              "logo": siteConfig.logo,
              "description": siteConfig.description,
              "founded": siteConfig.organization.founded,
              "areaServed": siteConfig.organization.location,
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": siteConfig.organization.contact.email
              },
              "sameAs": [
                siteConfig.links.facebook,
                siteConfig.links.twitter,
                siteConfig.links.instagram
              ]
            })
          }}
        />

        {/* ✅ JSON-LD Structured Data - LocalBusiness Schema */}
        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": siteConfig.organization.name,
              "image": siteConfig.ogImage,
              "description": siteConfig.description,
              "url": siteConfig.url,
              "telephone": siteConfig.organization.contact.phone,
              "email": siteConfig.organization.contact.email,
              "areaServed": siteConfig.organization.location,
              "priceRange": "Free - Premium"
            })
          }}
        />

        {/* ✅ JSON-LD Structured Data - EducationalOrganization Schema */}
        <Script
          id="schema-education"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "EducationalOrganization"],
              "name": siteConfig.organization.name,
              "url": siteConfig.url,
              "logo": siteConfig.logo,
              "description": siteConfig.description,
              "educationalCredentialAwarded": "STEM Education Certification",
              "isAccreditedBy": {
                "@type": "Organization",
                "name": "South African Education Standards"
              },
              "potentialAction": {
                "@type": "EnrollAction",
                "target": siteConfig.url
              }
            })
          }}
        />

        {/* ✅ Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Existing cleanup script */}
        <script dangerouslySetInnerHTML={{ __html: `...` }} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <main>{children}</main>
        <Analytics />
        <BackToTop />
        <WhatsAppButton />
      </body>
    </html>
  )
}
