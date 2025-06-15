import './globals.css'
import { Inter } from 'next/font/google'
import BackToTop from '@/components/BackToTop'
import WhatsAppButton from '@/components/WhatsAppButton'
import { siteConfig } from './metadata'
import { Metadata, Viewport } from 'next'

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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteConfig.url} />
        {Object.values(siteConfig.links).map((url, index) => (
          <link key={index} rel="me" href={url} />
        ))}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                // Remove attributes added by browser extensions that might cause hydration errors
                if (typeof window !== 'undefined') {
                  window.addEventListener('DOMContentLoaded', function() {
                    const body = document.body;
                    if (body.hasAttribute('cz-shortcut-listen')) {
                      body.removeAttribute('cz-shortcut-listen');
                    }
                  });
                }
              } catch (e) {
                console.error('Error in cleanup script:', e);
              }
            })();
          `
        }} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <main>
          {children}
        </main>
        <BackToTop />
        <WhatsAppButton />
      </body>
    </html>
  )
}
