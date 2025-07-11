import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Truck, Clock, Users, Award, Shield, Sparkles, Leaf, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Kaftan Manufacturer in Jaipur | Wholesale Ethnic Kaftans | Ethnics by Aravalli",
  description: "Premium kaftan manufacturer in Jaipur. Designer ethnic kaftans, comfortable loungewear, and stylish ethnic fusion at wholesale prices. Fast delivery across India.",
  keywords: [
    "kaftan manufacturer",
    "kaftan manufacturer in Jaipur",
    "ethnic kaftan manufacturer",
    "wholesale kaftans",
    "designer kaftan manufacturer",
    "kaftan supplier Jaipur",
    "ethnic kaftan supplier",
    "kaftan wholesale",
    "comfortable kaftan manufacturer",
    "stylish kaftan manufacturer",
    "kaftan manufacturer India",
    "ethnic wear kaftan",
    "boutique kaftan supplier",
    "kaftan manufacturer for retailers"
  ].join(', '),
  openGraph: {
    title: "Kaftan Manufacturer in Jaipur | Wholesale Ethnic Kaftans | Ethnics by Aravalli",
    description: "Premium kaftan manufacturer in Jaipur. Designer ethnic kaftans, comfortable loungewear, and stylish ethnic fusion at wholesale prices.",
    type: "website",
    locale: "en_IN",
    url: "https://ethnicsbyaravalli.com/kaftan-manufacturer",
    siteName: "Ethnics by Aravalli",
    images: [
      {
        url: "https://ethnicsbyaravalli.com/products/hero_banner_1.jpg",
        width: 1200,
        height: 630,
        alt: "Kaftan Manufacturer in Jaipur - Ethnics by Aravalli",
      },
    ],
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/kaftan-manufacturer"
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

const kaftanCategories = [
  {
    name: "Cotton Kaftans",
    description: "Breathable and comfortable cotton kaftans perfect for daily wear",
    image: "/products/kurta_1.png",
    features: ["Pure cotton fabric", "Comfortable fit", "Multiple colors", "Bulk pricing"],
    occasions: ["Daily wear", "Loungewear", "Beach wear", "Home wear"]
  },
  {
    name: "Silk Kaftans",
    description: "Luxurious silk kaftans for special occasions and celebrations",
    image: "/products/kurta_2.png",
    features: ["Pure silk fabric", "Elegant designs", "Festive collection", "Wholesale rates"],
    occasions: ["Festivals", "Parties", "Special occasions", "Celebrations"]
  },
  {
    name: "Printed Kaftans",
    description: "Trendy printed kaftans with modern designs and patterns",
    image: "/products/kurta_3.png",
    features: ["Latest prints", "Contemporary designs", "Multiple sizes", "B2B pricing"],
    occasions: ["Casual outings", "Beach trips", "Weekend wear", "Vacation"]
  },
  {
    name: "Embroidered Kaftans",
    description: "Handcrafted embroidered kaftans with intricate detailing",
    image: "/products/kurta_4.png",
    features: ["Hand embroidery", "Premium quality", "Designer pieces", "Custom sizing"],
    occasions: ["Weddings", "Receptions", "Cultural events", "Formal gatherings"]
  }
]

const whyChooseUs = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use only the finest fabrics and maintain strict quality control standards for every kaftan."
  },
  {
    icon: Users,
    title: "B2B Specialists",
    description: "Dedicated wholesale services for boutiques, retailers, and online sellers with bulk pricing."
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
    description: "Reliable shipping across India with tracking and timely delivery to your doorstep."
  },
  {
    icon: Shield,
    title: "Trusted Manufacturer",
    description: "10+ years of experience in ethnic wear manufacturing with 500+ satisfied clients."
  }
]

const kaftanFeatures = [
  {
    icon: Leaf,
    title: "Comfortable Fabrics",
    description: "Premium cotton, silk, and other natural fabrics for ultimate comfort."
  },
  {
    icon: Sparkles,
    title: "Trendy Designs",
    description: "Latest fashion trends combined with traditional ethnic aesthetics."
  },
  {
    icon: Package,
    title: "Bulk Packaging",
    description: "Professional packaging suitable for retail display and shipping."
  },
  {
    icon: Star,
    title: "Custom Sizing",
    description: "Available in multiple sizes with custom sizing options for bulk orders."
  }
]

export default function KaftanManufacturerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center px-4 py-24">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Premium Kaftan Manufacturer
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Kaftan Manufacturer in Jaipur
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Discover our collection of premium ethnic kaftans. Comfortable, stylish, and perfect for every occasion. 
            Wholesale prices for boutiques and retailers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Get Kaftan Catalog</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="https://wa.me/919828422208">WhatsApp Inquiry</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Kaftan Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Kaftan Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of kaftans designed for comfort, style, and elegance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kaftanCategories.map((category, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={500}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-800">Perfect for:</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.occasions.map((occasion, occasionIdx) => (
                        <Badge key={occasionIdx} variant="secondary" className="text-xs">
                          {occasion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full mt-4">
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
              Why Choose Ethnics by Aravalli for Kaftans?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for premium kaftan manufacturing and wholesale supply.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kaftan Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes Our Kaftans Special?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Features that set our kaftans apart in the market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kaftanFeatures.map((feature, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Stock Premium Kaftans?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your hands on our exclusive kaftan collection. 
            Perfect for boutiques, retailers, and wholesalers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Request Catalog</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="https://wa.me/919828422208">WhatsApp Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 