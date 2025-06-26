import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MapPin, Phone, Mail, Clock, Users, Award, Truck, Shield } from "lucide-react"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Wholesale Kurta Manufacturer in Jaipur | Cotton & Designer Kurtas",
  description: "Premium kurta manufacturer in Jaipur. Cotton, silk, and designer kurtas at wholesale prices for boutiques. Fast delivery. Get your catalog now!",
  keywords: "kurta manufacturer in Jaipur, wholesale kurta Jaipur, Jaipuri kurtas supplier, kurta manufacturer in India, cotton kurta manufacturer, kurta catalog WhatsApp, boutique kurta supplier, retail kurta wholesaler",
  openGraph: {
    title: "Wholesale Kurta Manufacturer in Jaipur | Cotton & Designer Kurtas",
    description: "Premium kurta manufacturer in Jaipur. Cotton, silk, and designer kurtas at wholesale prices for boutiques. Fast delivery. Get your catalog now!",
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/kurta-manufacturer-in-jaipur"
  }
}

const bestSellingCategories = [
  {
    name: "Cotton Kurta Sets",
    description: "Breathable cotton kurtas perfect for daily wear",
    image: "/products/kurta_1.png",
    features: ["Pure cotton fabric", "Comfortable fit", "Multiple colors", "Bulk pricing available"]
  },
  {
    name: "Designer Silk Kurtas",
    description: "Premium silk kurtas for special occasions",
    image: "/products/kurta_2.png",
    features: ["Pure silk fabric", "Embroidered designs", "Festive collection", "Wholesale rates"]
  },
  {
    name: "Printed Cotton Kurtas",
    description: "Trendy printed patterns for modern men and women",
    image: "/products/kurta_3.png",
    features: ["Latest prints", "Comfortable cotton", "Multiple sizes", "B2B pricing"]
  },
  {
    name: "Kurta-Palazzo Sets",
    description: "Complete ethnic sets for boutique collections",
    image: "/products/kurta_4.png",
    features: ["Matching sets", "Co-ordinated designs", "Bulk orders", "Custom sizing"]
  }
]

const whyChooseUs = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use only the finest fabrics and maintain strict quality control standards for every piece."
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

export default function KurtaManufacturerJaipur() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F9F6F4] to-[#F9F6F4] py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-[#D9A8A0] text-[#2E1B1B] hover:bg-[#C08478]">
                  <MapPin className="w-4 h-4 mr-2" />
                  {siteConfig.address}
                </Badge>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  Wholesale Kurta Manufacturer in Jaipur
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Premium wholesale kurta supplier for boutiques, retailers, and online sellers. 
                  Quality cotton and silk kurtas with competitive bulk pricing. 
                  <span className="font-semibold text-[#D9A8A0]"> 10+ years of trusted manufacturing.</span>
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I&apos;m interested in wholesale kurtas. Please share your catalog.`}>
                    <Button size="lg" className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] w-full sm:w-auto">
                      <Phone className="w-5 h-5 mr-2" />
                      Get WhatsApp Catalog
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      <Mail className="w-5 h-5 mr-2" />
                      Contact for Quote
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-gray-500">
                  📞 Call: {siteConfig.phone} | 📍 {siteConfig.address}
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/products/kurta_1.png"
                      alt="Cotton Kurta Manufacturer Jaipur"
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/products/kurta_3.png"
                      alt="Printed Kurta Wholesale Jaipur"
                      width={300}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/products/kurta_2.png"
                      alt="Designer Kurta Supplier Jaipur"
                      width={300}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/products/kurta_4.png"
                      alt="Kurta Set Manufacturer Jaipur"
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us as Your Kurta Supplier?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by 500+ boutiques and retailers across India for premium quality kurtas 
              and exceptional wholesale services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-[#D9A8A0] rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-[#2E1B1B]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Make Section */}
      <section className="py-20 bg-[#F9F6F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What We Make
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our best-selling kurta categories, crafted for quality and style. Customization and bulk orders available for boutiques and retailers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellingCategories.map((category, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-2">
                    {category.description}
                  </CardDescription>
                  <ul className="text-sm text-gray-500 space-y-1 mb-4">
                    {category.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-[#D9A8A0]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I&apos;m interested in your ${category.name.toLowerCase()}. Please share your kurta catalog.`}>
                    <Button size="sm" className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] w-full">
                      Get Catalog
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Kurta Order?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us for a custom quote, catalog, or to discuss your requirements. We respond quickly on WhatsApp and email!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I&apos;m interested in wholesale kurtas. Please share your catalog.`}>
              <Button size="lg" className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Mail className="w-5 h-5 mr-2" />
                Contact Form
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-gray-500 text-sm">
            📞 {siteConfig.phone} | 📍 {siteConfig.address}
          </div>
        </div>
      </section>
    </div>
  )
} 