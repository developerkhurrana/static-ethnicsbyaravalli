import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

import Link from "next/link";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Ethnics By Aravalli - Women's Ethnic Wear Manufacturer in Jaipur Premium Kurtis & Kurta Sets",
  description: "Leading kurti manufacturer in Jaipur offering premium women's kurtas and kurta sets—crafted with traditional artistry, modern designs, and luxurious fabrics stitched to perfection.",
  keywords: "ethnic wear manufacturer, kurti manufacturer Jaipur, wholesale ethnic wear, boutique supplier, premium kurtas",
  openGraph: {
    title: "Ethnics by Aravalli",
    description: "Premium ethnic wear direct from Jaipur. Wholesale, custom prints, and fast dispatch for boutiques and retailers.",
    url: "https://ethnicsbyaravalli.com/",
    siteName: "Ethnics by Aravalli",
    images: [
      {
        url: "https://ethnicsbyaravalli.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ethnics by Aravalli - Premium Ethnic Wear",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethnics by Aravalli",
    description: "Premium ethnic wear direct from Jaipur. Wholesale, custom prints, and fast dispatch for boutiques and retailers.",
    images: ["https://ethnicsbyaravalli.com/og-image.jpg"],
    creator: "@ethnicsbyaravalli",
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
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="google-site-verification" content="pEZGKnigOCdWKqcGTVPfnS8nJPIUCJepodGBd2TlJY0" />
        {/* Preload critical resources */}
        <link rel="preload" href="/products/hero_banner_1.jpg" as="image" />
        <link rel="preload" href="/products/hero_mobile_banner.jpg" as="image" media="(max-width: 768px)" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//wa.me" />
      </head>
      <body className={`${inter.className} h-full`}>
        <div className="flex min-h-full flex-col">
          <Header />
          <main className="flex-1">
        {children}
        <Analytics />
          </main>
          <Footer />
        </div>
        <Toaster />
        {/* Floating WhatsApp Button */}
        <Link
        href="https://wa.me/919828422208"
          target="_blank"
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
        >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </Link>
      </body>
    </html>
  );
}
