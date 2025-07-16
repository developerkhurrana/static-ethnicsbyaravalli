import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Truck, Clock, Users, Award, Shield, Sparkles, Calendar, Gift } from "lucide-react"

export const metadata: Metadata = {
  title: "Festive Ethnic Wear 2025 | Diwali Navratri Collection | Ethnics by Aravalli",
  description: "Premium festive ethnic wear for Diwali, Navratri, and celebrations 2025. Designer kurtas, suit sets, dresses, kaftans at wholesale prices. Fast delivery across India.",
  keywords: [
    "festive ethnic wear 2025",
    "Diwali ethnic wear",
    "Navratri collection",
    "festive kurtas",
    "celebration dresses",
    "ethnic wear manufacturer",
    "wholesale festive wear",
    "designer ethnic wear",
    "festive suit sets",
    "ethnic kaftans",
    "festive collection 2025",
    "Diwali kurta sets",
    "Navratri dresses",
    "celebration ethnic wear",
    "festive wholesale supplier"
  ].join(', '),
  openGraph: {
    title: "Festive Ethnic Wear 2025 | Diwali Navratri Collection | Ethnics by Aravalli",
    description: "Premium festive ethnic wear for Diwali, Navratri, and celebrations 2025. Designer kurtas, suit sets, dresses, kaftans at wholesale prices.",
    type: "website",
    locale: "en_IN",
    url: "https://ethnicsbyaravalli.com/festive-ethnic-wear-2025",
    siteName: "Ethnics by Aravalli",
    images: [
      {
        url: "https://ethnicsbyaravalli.com/products/hero_banner_1.jpg",
        width: 1200,
        height: 630,
        alt: "Festive Ethnic Wear Collection 2025 - Ethnics by Aravalli",
      },
    ],
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/festive-ethnic-wear-2025"
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
    name: "Diwali Collection 2025",
    description: "Elegant ethnic wear perfect for Diwali celebrations",
    image: "/products/kurta_1.png",
    features: ["Traditional designs", "Premium fabrics", "Festive colors", "Bulk pricing"],
    occasions: ["Diwali", "Family gatherings", "Temple visits", "Cultural events"]
  },
  {
    name: "Navratri Special",
    description: "Comfortable and stylish ethnic wear for Navratri festivities",
    image: "/products/kurta_2.png",
    features: ["Comfortable fit", "Vibrant colors", "Easy movement", "Wholesale rates"],
    occasions: ["Navratri", "Garba", "Dandiya", "Religious ceremonies"]
  },
  {
    name: "Wedding Season Collection",
    description: "Sophisticated ethnic wear for wedding celebrations",
    image: "/products/kurta_3.png",
    features: ["Luxury fabrics", "Intricate embroidery", "Designer pieces", "Custom sizing"],
    occasions: ["Weddings", "Receptions", "Engagement parties", "Sangeet"]
  },
  {
    name: "New Year Ethnic Wear",
    description: "Contemporary ethnic fusion for New Year celebrations",
    image: "/products/kurta_4.png",
    features: ["Modern designs", "Indo-western fusion", "Party wear", "B2B pricing"],
    occasions: ["New Year", "Corporate parties", "Social gatherings", "Cocktail events"]
  }
]

const whyChooseUs = [
  {
    icon: Award,
    title: "Festive Specialists",
    description: "10+ years of experience in creating ethnic wear for all major Indian festivals and celebrations."
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Quick turnaround times to ensure your festive collection reaches you well before celebrations begin."
  },
  {
    icon: Users,
    title: "B2B Focus",
    description: "Dedicated wholesale services for boutiques, retailers, and online sellers with bulk pricing."
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Premium fabrics and expert craftsmanship ensuring every piece meets the highest quality standards."
  }
]

const festiveHighlights = [
  {
    icon: Sparkles,
    title: "Trending Designs",
    description: "Latest festive trends and traditional motifs combined with contemporary styling."
  },
  {
    icon: Gift,
    title: "Gift-Ready Packaging",
    description: "Beautiful packaging perfect for gifting during festive seasons."
  },
  {
    icon: Calendar,
    title: "Seasonal Collections",
    description: "Timely collections launched before each major festival and celebration."
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Handcrafted with attention to detail using the finest materials available."
  }
]

export default function FestiveEthnicWearPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center px-4 py-24">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
            <Calendar className="w-4 h-4 mr-2" />
            Festive Season 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Festive Ethnic Wear Collection 2025
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Celebrate every occasion with our premium ethnic wear collection. 
            Designer kurtas, suit sets, dresses, and kaftans for Diwali, Navratri, and all celebrations.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Festive Collections 2025
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our curated ethnic wear collections designed specifically for India's most celebrated festivals and occasions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {festiveCategories.map((category, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="relative overflow-hidden rounded-t-lg h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="space-y-2 flex-grow">
                    <h4 className="font-semibold text-sm text-gray-800">Perfect for:</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.occasions.map((occasion, occasionIdx) => (
                        <Badge key={occasionIdx} variant="secondary" className="text-xs">
                          {occasion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                    <Link href="/contact">Inquire Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Ethnics by Aravalli for Festive Wear?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for premium ethnic wear during every festive season.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festive Highlights */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Festive Season Highlights
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What makes our festive collection special for retailers and boutiques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {festiveHighlights.map((highlight, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <highlight.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for the Festive Season?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get your hands on our exclusive festive ethnic wear collection. 
            Perfect for boutiques, retailers, and wholesalers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Request Catalog</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              <Link href="https://wa.me/919828422208">WhatsApp Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 