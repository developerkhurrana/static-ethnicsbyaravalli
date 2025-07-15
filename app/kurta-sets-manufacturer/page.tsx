import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Truck, Clock, Users, Award, Shield, Sparkles, Leaf, Package, Factory, Scissors } from "lucide-react"

export const metadata: Metadata = {
  title: "Kurta Sets Manufacturer in Jaipur | Wholesale Kurta Sets Manufacturer India | Ethnics by Aravalli",
  description: "Leading kurta sets manufacturer in Jaipur, India. Wholesale kurta sets manufacturer for retailers, boutiques & B2B. Custom designs, bulk orders, private label. Get catalog & price list. ISO certified.",
  keywords: [
    "kurta sets manufacturer",
    "kurta sets manufacturer in Jaipur",
    "wholesale kurta sets manufacturer",
    "kurta sets manufacturer India",
    "kurta sets manufacturer for retailers",
    "kurta sets manufacturer for boutiques",
    "kurta sets manufacturer wholesale",
    "kurta sets manufacturer supplier",
    "kurta sets manufacturer exporter",
    "kurta sets manufacturer B2B",
    "kurta sets manufacturer bulk orders",
    "kurta sets manufacturer custom design",
    "kurta sets manufacturer private label",
    "kurta sets manufacturer OEM",
    "kurta sets manufacturer contract manufacturing",
    "kurta sets manufacturer made to order",
    "kurta sets manufacturer sample orders",
    "kurta sets manufacturer catalog",
    "kurta sets manufacturer price list",
    "kurta sets manufacturer minimum order quantity"
  ].join(', '),
  openGraph: {
    title: "Kurta Sets Manufacturer in Jaipur | Wholesale Kurta Sets Manufacturer India | Ethnics by Aravalli",
    description: "Leading kurta sets manufacturer in Jaipur, India. Wholesale kurta sets manufacturer for retailers, boutiques & B2B. Custom designs, bulk orders, private label.",
    type: "website",
    locale: "en_IN",
    url: "https://ethnicsbyaravalli.com/kurta-sets-manufacturer",
    siteName: "Ethnics by Aravalli",
    images: [
      {
        url: "https://ethnicsbyaravalli.com/products/hero_banner_1.jpg",
        width: 1200,
        height: 630,
        alt: "Kurta Sets Manufacturer in Jaipur - Ethnics by Aravalli",
      },
    ],
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/kurta-sets-manufacturer"
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

const kurtaSetCategories = [
  {
    name: "Kurta-Palazzo Sets",
    description: "Elegant kurta-palazzo combinations perfect for all occasions. Comfortable and stylish with coordinated designs.",
    image: "/products/kurta_1.png",
    features: ["Matching sets", "Comfortable fit", "Multiple colors", "Bulk pricing available"],
    occasions: ["Daily wear", "Office wear", "Casual outings", "Weekend wear"]
  },
  {
    name: "Kurta-Sharara Sets",
    description: "Traditional kurta-sharara sets for festive and special occasions. Perfect for celebrations and cultural events.",
    image: "/products/kurta_2.png",
    features: ["Traditional designs", "Premium fabrics", "Festive collection", "Wholesale rates"],
    occasions: ["Festivals", "Weddings", "Special occasions", "Cultural events"]
  },
  {
    name: "Kurta-Pant Sets",
    description: "Modern kurta-pant combinations for contemporary ethnic wear. Professional and stylish for modern occasions.",
    image: "/products/kurta_3.png",
    features: ["Modern designs", "Contemporary styling", "Multiple sizes", "B2B pricing"],
    occasions: ["Office wear", "Professional settings", "Modern events", "Corporate functions"]
  },
  {
    name: "Co-ord Sets",
    description: "Stylish co-ordinated sets with kurta and matching bottoms. Versatile designs for various occasions.",
    image: "/products/kurta_4.png",
    features: ["Co-ordinated designs", "Versatile styling", "Designer pieces", "Custom sizing"],
    occasions: ["Parties", "Social gatherings", "Cocktail events", "Modern celebrations"]
  }
]

const manufacturingProcess = [
  {
    step: "01",
    title: "Design & Pattern Making",
    description: "Expert designers create coordinated patterns and designs for kurta sets based on latest trends.",
    icon: Scissors
  },
  {
    step: "02",
    title: "Fabric Selection",
    description: "Careful selection of premium fabrics ensuring perfect coordination between kurta and bottom pieces.",
    icon: Leaf
  },
  {
    step: "03",
    title: "Cutting & Stitching",
    description: "Precision cutting and expert stitching to ensure perfect fit and coordination of all set components.",
    icon: Factory
  },
  {
    step: "04",
    title: "Quality Control",
    description: "Rigorous quality checks ensuring perfect coordination and premium standards for every kurta set.",
    icon: Shield
  }
]

const whyChooseUs = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use only the finest fabrics and maintain strict quality control standards for every kurta set."
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

const services = [
  {
    icon: Package,
    title: "Private Label Manufacturing",
    description: "Custom branding and labeling for your brand identity on kurta sets."
  },
  {
    icon: Scissors,
    title: "Custom Design Services",
    description: "Bespoke kurta set designs tailored to your specific requirements."
  },
  {
    icon: Clock,
    title: "Made to Order",
    description: "Flexible production schedules to meet your timeline for kurta sets."
  },
  {
    icon: Star,
    title: "Sample Orders",
    description: "Sample kurta set orders available for quality assessment."
  }
]

const kurtaSetBenefits = [
  {
    icon: CheckCircle,
    title: "Perfect Coordination",
    description: "Expertly matched kurta and bottom pieces for a complete look."
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

export default function KurtaSetsManufacturerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center px-4 py-24">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            <Factory className="w-4 h-4 mr-2" />
            Leading Kurta Sets Manufacturer
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Kurta Sets Manufacturer in Jaipur
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Premium kurta sets manufacturer in Jaipur, India. Wholesale kurta sets manufacturer for retailers, boutiques & B2B. 
            Custom designs, bulk orders, private label manufacturing. ISO certified quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/contact">Get Kurta Sets Catalog</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="https://wa.me/919828422208">WhatsApp Inquiry</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Kurta Set Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Kurta Set Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of kurta sets designed for style, comfort, and elegance. 
              Perfect for retailers and boutiques looking for coordinated ethnic wear.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kurtaSetCategories.map((category, idx) => (
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

      {/* Manufacturing Process */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Manufacturing Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From design to delivery, we ensure quality at every step of the kurta set manufacturing process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {manufacturingProcess.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <step.icon className="w-8 h-8 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-semibold">{step.step}</span>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Ethnics by Aravalli?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for premium kurta set manufacturing and wholesale supply.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kurta Set Benefits */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes Our Kurta Sets Special?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Features that set our kurta sets apart in the market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kurtaSetBenefits.map((benefit, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <benefit.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive kurta set manufacturing services tailored to your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <service.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Partner with a Leading Kurta Sets Manufacturer?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Get your hands on our exclusive kurta set collection. 
            Perfect for boutiques, retailers, and wholesalers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Request Catalog</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link href="https://wa.me/919828422208">WhatsApp Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 