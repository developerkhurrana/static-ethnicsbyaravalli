import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Gift, Users, Star, Calendar, ArrowRight } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export const metadata: Metadata = {
  title: "Festive Wear Collection 2025 | Women, Men, Kurta Sets, Suits, Sarees | Ethnics by Aravalli",
  description: "Explore the latest festive wear for women and men. Shop kurta sets, suits, sarees, and kurtis for Diwali, Navratri, and all celebrations. Premium festive ethnic wear manufacturer in Jaipur.",
  keywords: [
    "festive wear",
    "festive wear for women",
    "festive wear for men",
    "festive wear kurta sets",
    "festive wear suits for women",
    "festive wear sarees",
    "festive wear kurtis",
    "festive wear kurta for women",
    "festive ethnic wear",
    "Diwali festive wear",
    "Navratri festive wear",
    "wholesale festive wear",
    "festive collection 2025"
  ].join(', '),
  openGraph: {
    title: "Festive Wear Collection 2025 | Women, Men, Kurta Sets, Suits, Sarees | Ethnics by Aravalli",
    description: "Explore the latest festive wear for women and men. Shop kurta sets, suits, sarees, and kurtis for Diwali, Navratri, and all celebrations.",
    type: "website",
    locale: "en_IN",
    url: "https://ethnicsbyaravalli.com/festive-wear",
    siteName: "Ethnics by Aravalli",
    images: [
      {
        url: "https://ethnicsbyaravalli.com/products/hero_banner_1.jpg",
        width: 1200,
        height: 630,
        alt: "Festive Wear Collection 2025 - Ethnics by Aravalli",
      },
    ],
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/festive-wear"
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

const festiveCategories = [
  {
    name: "Festive Wear for Women",
    description: "Elegant kurtas, suits, sarees, and kurtis designed for Diwali, Navratri, and all festive occasions. Premium fabrics, vibrant colors, and intricate embroidery.",
    image: "/products/kurta_1.png",
    link: "/festive-ethnic-wear-2025",
    cta: "Shop Women's Festive Wear"
  },
  {
    name: "Festive Wear for Men",
    description: "Classic and contemporary festive kurtas and sets for men. Perfect for celebrations and traditional gatherings.",
    image: "/products/kurta_2.png",
    link: "/contact",
    cta: "Inquire for Men's Collection"
  },
  {
    name: "Kurta Sets",
    description: "Designer kurta sets for women and men. Coordinated styles for a complete festive look.",
    image: "/products/kurta_3.png",
    link: "/suit-sets-manufacturer",
    cta: "Explore Kurta Sets"
  },
  {
    name: "Suits for Women",
    description: "Premium festive suits and suit sets for women. Perfect for Diwali parties and family gatherings.",
    image: "/products/kurta_4.png",
    link: "/suit-sets-manufacturer",
    cta: "Shop Festive Suits"
  },
  {
    name: "Sarees",
    description: "Traditional and modern sarees for festive occasions. Elegant drapes, rich colors, and beautiful prints.",
    image: "/products/dupatta_1.png",
    link: "/contact",
    cta: "Inquire for Sarees"
  },
  {
    name: "Kurtis",
    description: "Trendy and comfortable kurtis for women. Perfect for festive celebrations and everyday elegance.",
    image: "/products/kurta_5.png",
    link: "/kurti-manufacturer-in-jaipur",
    cta: "Shop Festive Kurtis"
  }
]

const festiveHighlights = [
  {
    icon: Sparkles,
    title: "Vibrant Festive Colors",
    description: "Celebrate with a palette of rich, festive hues and traditional motifs."
  },
  {
    icon: Gift,
    title: "Gift-Ready Packaging",
    description: "Beautiful packaging, perfect for gifting during the festive season."
  },
  {
    icon: Calendar,
    title: "Seasonal Collections",
    description: "New styles launched for every major festival and celebration."
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Handcrafted with attention to detail using the finest materials."
  }
]

export default function FestiveWearPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-orange-200 to-red-100">
        <div className="absolute inset-0 bg-orange-100/60" />
        <div className="relative z-10 text-center px-4 py-24">
          <Badge className="mb-4 bg-orange-200 text-orange-900 hover:bg-orange-300">
            <Sparkles className="w-4 h-4 mr-2" />
            Festive Wear 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6 drop-shadow-lg">
            Festive Wear Collection 2025
          </h1>
          <p className="text-xl md:text-2xl text-orange-800 mb-8 max-w-3xl mx-auto">
            Discover the latest festive wear for women and men. Shop premium kurta sets, suits, sarees, and kurtis for Diwali, Navratri, and all celebrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/contact">Get Festive Catalog</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="https://wa.me/919828422208">WhatsApp Inquiry</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Festive Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-900">
              Explore Our Festive Wear Categories
            </h2>
            <p className="text-lg text-orange-700 max-w-3xl mx-auto">
              Shop the best festive wear for every celebration. Premium quality, vibrant colors, and modern designs for women and men.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {festiveCategories.map((category, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 border-orange-200">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={500}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-400/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white drop-shadow">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-orange-800 mb-4">{category.description}</p>
                  <Button asChild className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                    <Link href={category.link}>{category.cta} <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Festive Highlights */}
      <section className="py-16 md:py-24 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-900">
              Why Choose Our Festive Wear?
            </h2>
            <p className="text-lg text-orange-700 max-w-3xl mx-auto">
              Experience the best of festive fashion with Ethnics by Aravalli. Quality, style, and tradition in every piece.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {festiveHighlights.map((highlight, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow border-orange-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <highlight.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-orange-900">{highlight.title}</h3>
                <p className="text-orange-700 text-sm">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Celebrate in Style?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get your hands on our exclusive festive wear collection. Perfect for boutiques, retailers, and wholesalers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Request Festive Catalog</Link>
            </Button>
            <Button asChild size="lg" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white border-none shadow-md">
              <Link href="https://wa.me/919828422208">
                <FaWhatsapp className="w-5 h-5" /> WhatsApp Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 