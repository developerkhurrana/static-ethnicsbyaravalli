import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Truck, Clock, Users, Award, Shield, Sparkles, Leaf, Package, Factory, Scissors } from "lucide-react"

export const metadata: Metadata = {
  title: "Kurta Manufacturer in Jaipur | Wholesale Kurta Manufacturer India | Ethnics by Aravalli",
  description: "Leading kurta manufacturer in Jaipur, India. Wholesale kurta manufacturer for retailers, boutiques & B2B. Custom designs, bulk orders, private label. Get catalog & price list. ISO certified.",
  keywords: [
    "kurta manufacturer",
    "kurta manufacturer in Jaipur",
    "wholesale kurta manufacturer",
    "kurta manufacturer India",
    "kurta manufacturer for retailers",
    "kurta manufacturer for boutiques",
    "kurta manufacturer wholesale",
    "kurta manufacturer supplier",
    "kurta manufacturer exporter",
    "kurta manufacturer B2B",
    "kurta manufacturer bulk orders",
    "kurta manufacturer custom design",
    "kurta manufacturer private label",
    "kurta manufacturer OEM",
    "kurta manufacturer contract manufacturing",
    "kurta manufacturer made to order",
    "kurta manufacturer sample orders",
    "kurta manufacturer catalog",
    "kurta manufacturer price list",
    "kurta manufacturer minimum order quantity"
  ].join(', '),
  openGraph: {
    title: "Kurta Manufacturer in Jaipur | Wholesale Kurta Manufacturer India | Ethnics by Aravalli",
    description: "Leading kurta manufacturer in Jaipur, India. Wholesale kurta manufacturer for retailers, boutiques & B2B. Custom designs, bulk orders, private label.",
    type: "website",
    locale: "en_IN",
    url: "https://ethnicsbyaravalli.com/kurta-manufacturer",
    siteName: "Ethnics by Aravalli",
    images: [
      {
        url: "https://ethnicsbyaravalli.com/products/hero_banner_1.jpg",
        width: 1200,
        height: 630,
        alt: "Kurta Manufacturer in Jaipur - Ethnics by Aravalli",
      },
    ],
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/kurta-manufacturer"
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

const kurtaCategories = [
  {
    name: "Cotton Kurtas",
    description: "Breathable and comfortable cotton kurtas perfect for daily wear and casual occasions. Available in various colors and designs.",
    image: "/products/kurta_1.png",
    features: ["Pure cotton fabric", "Comfortable fit", "Multiple colors", "Bulk pricing available"],
    occasions: ["Daily wear", "Office wear", "Casual outings", "Weekend wear"]
  },
  {
    name: "Silk Kurtas",
    description: "Luxurious silk kurtas for special occasions and celebrations. Premium quality with elegant designs and finishes.",
    image: "/products/kurta_2.png",
    features: ["Pure silk fabric", "Elegant designs", "Festive collection", "Wholesale rates"],
    occasions: ["Festivals", "Weddings", "Special occasions", "Celebrations"]
  },
  {
    name: "Designer Kurtas",
    description: "Trendy designer kurtas with modern cuts and contemporary styling. Perfect for fashion-forward retailers.",
    image: "/products/kurta_3.png",
    features: ["Modern designs", "Contemporary styling", "Multiple sizes", "B2B pricing"],
    occasions: ["Parties", "Social gatherings", "Modern events", "Fashion shows"]
  },
  {
    name: "Embroidered Kurtas",
    description: "Handcrafted embroidered kurtas with intricate detailing and premium finishes. Traditional craftsmanship meets modern design.",
    image: "/products/kurta_4.png",
    features: ["Hand embroidery", "Premium quality", "Designer pieces", "Custom sizing"],
    occasions: ["Weddings", "Receptions", "Cultural events", "Formal gatherings"]
  }
]

const manufacturingProcess = [
  {
    step: "01",
    title: "Design & Pattern Making",
    description: "Expert designers create patterns and designs based on latest trends and customer requirements.",
    icon: Scissors
  },
  {
    step: "02",
    title: "Fabric Selection",
    description: "Careful selection of premium fabrics including cotton, silk, georgette, and other natural materials.",
    icon: Leaf
  },
  {
    step: "03",
    title: "Cutting & Stitching",
    description: "Precision cutting and expert stitching using advanced machinery and skilled artisans.",
    icon: Factory
  },
  {
    step: "04",
    title: "Quality Control",
    description: "Rigorous quality checks at every stage to ensure premium standards are maintained.",
    icon: Shield
  }
]

const whyChooseUs = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use only the finest fabrics and maintain strict quality control standards for every kurta."
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
    description: "Custom branding and labeling for your brand identity."
  },
  {
    icon: Scissors,
    title: "Custom Design Services",
    description: "Bespoke designs tailored to your specific requirements."
  },
  {
    icon: Clock,
    title: "Made to Order",
    description: "Flexible production schedules to meet your timeline."
  },
  {
    icon: Star,
    title: "Sample Orders",
    description: "Sample orders available for quality assessment."
  }
]

export default function KurtaManufacturerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center px-4 py-24">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Factory className="w-4 h-4 mr-2" />
            Leading Kurta Manufacturer
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Kurta Manufacturer in Jaipur
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Premium kurta manufacturer in Jaipur, India. Wholesale kurta manufacturer for retailers, boutiques & B2B. 
            Custom designs, bulk orders, private label manufacturing. ISO certified quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Get Kurta Catalog</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="https://wa.me/919828422208">WhatsApp Inquiry</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Kurta Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Kurta Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of kurtas designed for style, comfort, and elegance. 
              Perfect for retailers and boutiques looking for quality ethnic wear.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kurtaCategories.map((category, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg w-full h-72 flex-shrink-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                </div>
                <CardContent className="flex flex-col flex-1 p-6">
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
                  <div className="mt-auto pt-4">
                    <Button asChild className="w-full">
                      <Link href="/contact">Inquire Now</Link>
                    </Button>
                  </div>
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
              From design to delivery, we ensure quality at every step of the manufacturing process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {manufacturingProcess.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                
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
              Your trusted partner for premium kurta manufacturing and wholesale supply.
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

      {/* Services */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive kurta manufacturing services tailored to your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Partner with a Leading Kurta Manufacturer?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your hands on our exclusive kurta collection. 
            Perfect for boutiques, retailers, and wholesalers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Request Catalog</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-700"
            >
              <Link href="https://wa.me/919828422208">WhatsApp Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 