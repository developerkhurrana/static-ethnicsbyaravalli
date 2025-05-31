import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethnics by Aravalli - Manufacturer of Ethnic Wear",
  description: "Manufacturer of ethnic wear, custom manufacturing, bulk orders, and private label ethnicwear.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="flex min-h-full flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
