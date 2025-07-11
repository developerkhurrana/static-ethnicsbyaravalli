import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, Sparkles, Gift, Users, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Festive Ethnic Wear Trends 2025 | Diwali Navratri Fashion Guide | Ethnics by Aravalli",
  description: "Discover the latest festive ethnic wear trends for 2025. From Diwali to Navratri, explore trending colors, fabrics, and styles for the upcoming festive season.",
  keywords: [
    "festive ethnic wear trends 2025",
    "Diwali fashion trends",
    "Navratri ethnic wear",
    "festive season fashion",
    "ethnic wear trends 2025",
    "festive colors 2025",
    "Diwali kurta trends",
    "Navratri dress styles",
    "festive fashion guide",
    "ethnic wear manufacturer trends"
  ].join(', '),
  openGraph: {
    title: "Festive Ethnic Wear Trends 2025 | Diwali Navratri Fashion Guide | Ethnics by Aravalli",
    description: "Discover the latest festive ethnic wear trends for 2025. From Diwali to Navratri, explore trending colors, fabrics, and styles.",
    type: "article",
    locale: "en_IN",
    url: "https://ethnicsbyaravalli.com/blog/festive-ethnic-wear-trends-2025",
    siteName: "Ethnics by Aravalli",
    images: [
      {
        url: "https://ethnicsbyaravalli.com/products/hero_banner_1.jpg",
        width: 1200,
        height: 630,
        alt: "Festive Ethnic Wear Trends 2025 - Ethnics by Aravalli",
      },
    ],
    publishedTime: "2025-01-15T00:00:00.000Z",
    authors: ["Ethnics by Aravalli"],
    tags: ["festive fashion", "ethnic wear trends", "Diwali fashion", "Navratri styles"],
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/blog/festive-ethnic-wear-trends-2025"
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
}

const trendingColors = [
  { name: "Deep Maroon", description: "Rich and elegant, perfect for Diwali celebrations", hex: "#800020" },
  { name: "Emerald Green", description: "Fresh and vibrant, ideal for Navratri festivities", hex: "#50C878" },
  { name: "Royal Blue", description: "Sophisticated and timeless for special occasions", hex: "#4169E1" },
  { name: "Warm Gold", description: "Luxurious and festive, perfect for celebrations", hex: "#FFD700" }
]

const trendingFabrics = [
  { name: "Silk", description: "Luxurious and elegant for special occasions", benefits: ["Breathable", "Elegant drape", "Rich texture"] },
  { name: "Cotton Silk", description: "Perfect blend of comfort and elegance", benefits: ["Comfortable", "Easy care", "Versatile"] },
  { name: "Georgette", description: "Lightweight and flowy for graceful movement", benefits: ["Lightweight", "Flowy", "Elegant"] },
  { name: "Chanderi", description: "Traditional fabric with modern appeal", benefits: ["Traditional", "Breathable", "Unique texture"] }
]

const trendingStyles = [
  { name: "Anarkali Kurtas", description: "Graceful and elegant, perfect for festive occasions", image: "/products/kurta_1.png" },
  { name: "Kurta-Palazzo Sets", description: "Comfortable and stylish for all-day celebrations", image: "/products/kurta_2.png" },
  { name: "Embroidered Suits", description: "Intricate designs for special celebrations", image: "/products/kurta_3.png" },
  { name: "Indo-Western Fusion", description: "Modern twist on traditional ethnic wear", image: "/products/kurta_4.png" }
]

export default function FestiveEthnicWearTrendsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center px-4 py-24">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
            <Calendar className="w-4 h-4 mr-2" />
            Festive Season 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Festive Ethnic Wear Trends 2025
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Discover the latest trends in ethnic wear for Diwali, Navratri, and the upcoming festive season. 
            From colors to fabrics, stay ahead of the fashion curve.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <span>By Ethnics by Aravalli</span>
            <span>•</span>
            <span>January 15, 2025</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-8">
              As we approach the festive season of 2025, the ethnic wear industry is buzzing with exciting new trends. 
              From Diwali to Navratri, this year promises to bring a perfect blend of tradition and contemporary fashion. 
              Let's explore what's trending in ethnic wear for the upcoming celebrations.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Trending Colors for Festive Season 2025</h2>
            <p className="text-gray-700 mb-8">
              Color plays a crucial role in festive ethnic wear, and 2025 brings a palette that celebrates both tradition and modernity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {trendingColors.map((color, idx) => (
                <div key={idx} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-3">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-gray-200" 
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <h3 className="text-lg font-semibold">{color.name}</h3>
                  </div>
                  <p className="text-gray-600">{color.description}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Popular Fabrics for Festive Ethnic Wear</h2>
            <p className="text-gray-700 mb-8">
              The choice of fabric can make or break your festive look. Here are the trending fabrics for 2025.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {trendingFabrics.map((fabric, idx) => (
                <div key={idx} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-3">{fabric.name}</h3>
                  <p className="text-gray-600 mb-4">{fabric.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-800">Benefits:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {fabric.benefits.map((benefit, benefitIdx) => (
                        <li key={benefitIdx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Trending Styles for Festive Season</h2>
            <p className="text-gray-700 mb-8">
              From traditional to contemporary, these styles are dominating the festive ethnic wear scene in 2025.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {trendingStyles.map((style, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={style.image}
                      alt={style.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{style.name}</h3>
                    <p className="text-gray-600">{style.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Styling Tips for Festive Ethnic Wear</h2>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-orange-800">Expert Tips from Ethnics by Aravalli</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Accessorize wisely:</strong> Choose jewelry that complements your outfit without overwhelming it</li>
                <li>• <strong>Consider the occasion:</strong> Different festivals call for different levels of formality</li>
                <li>• <strong>Comfort is key:</strong> Festive celebrations are long, so prioritize comfort alongside style</li>
                <li>• <strong>Mix and match:</strong> Don't be afraid to pair traditional pieces with modern accessories</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Ethnics by Aravalli for Festive Ethnic Wear?</h2>
            <p className="text-gray-700 mb-8">
              As a leading ethnic wear manufacturer in Jaipur, we understand the importance of staying ahead of trends 
              while maintaining the highest quality standards. Our festive collections are designed keeping in mind 
              the latest fashion trends and traditional aesthetics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Star className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600 text-sm">Finest fabrics and expert craftsmanship</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Trending Designs</h3>
                <p className="text-gray-600 text-sm">Latest styles and contemporary aesthetics</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">B2B Focus</h3>
                <p className="text-gray-600 text-sm">Wholesale pricing for retailers and boutiques</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Ready to Stock the Latest Festive Trends?</h2>
              <p className="text-orange-100 mb-6">
                Get your hands on our exclusive festive ethnic wear collection featuring the latest trends for 2025.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="secondary">
                  <Link href="/contact">Request Catalog</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  <Link href="https://wa.me/919828422208">WhatsApp Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 