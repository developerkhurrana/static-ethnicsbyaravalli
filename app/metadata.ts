// (app/metadata.ts)
import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://ethnicsbyaravalli.com'),
  title: {
    default: 'Ethnics by Aravalli',
    template: '%s | Ethnics by Aravalli'
  },
  description: 'Premium ethnic wear manufacturer for boutiques and retailers. Discover our collection of high-quality Indian ethnic wear.',
  keywords: ['ethnic wear', 'manufacturer', 'wholesale', 'boutique', 'retailer', 'Indian ethnic wear'],
  authors: [{ name: 'Ethnics by Aravalli' }],
  creator: 'Ethnics by Aravalli',
  publisher: 'Ethnics by Aravalli',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ethnicsbyaravalli.com',
    siteName: 'Ethnics by Aravalli',
    title: 'Ethnics by Aravalli',
    description: 'Premium ethnic wear manufacturer for boutiques and retailers',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ethnics by Aravalli'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethnics by Aravalli',
    description: 'Premium ethnic wear manufacturer for boutiques and retailers',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-site-verification',
  },
};
