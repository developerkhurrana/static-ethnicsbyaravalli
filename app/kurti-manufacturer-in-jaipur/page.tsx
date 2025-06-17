import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MapPin, Phone, Mail, Clock, Users, Award, Truck, Shield } from "lucide-react"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Kurti Manufacturer in Jaipur — Premium Wholesale Supplier | Ethnics by Aravalli",
  description: "Leading kurti manufacturer in Jaipur offering premium wholesale kurtis for boutiques & retailers. Cotton, silk & designer kurtis with bulk pricing. Located in Malviya Nagar, Jaipur. WhatsApp catalog available.",
  keywords: "kurti manufacturer in Jaipur, wholesale kurti Jaipur, Jaipuri kurtis supplier, kurti manufacturer in India, cotton kurti manufacturer, kurti catalog WhatsApp, boutique kurti supplier, retail kurti wholesaler",
  openGraph: {
    title: "Kurti Manufacturer in Jaipur — Premium Wholesale Supplier | Ethnics by Aravalli",
    description: "Leading kurti manufacturer in Jaipur offering premium wholesale kurtis for boutiques & retailers. Cotton, silk & designer kurtis with bulk pricing.",
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/kurti-manufacturer-in-jaipur"
  }
}

const bestSellingCategories = [
  {
    name: "Cotton Kurti Sets",
    description: "Breathable cotton kurtis perfect for daily wear",
    image: "/products/kurta_1.png",
    features: ["Pure cotton fabric", "Comfortable fit", "Multiple colors", "Bulk pricing available"]
  },
  {
    name: "Designer Silk Kurtis",
    description: "Premium silk kurtis for special occasions",
    image: "/products/kurta_2.png",
    features: ["Pure silk fabric", "Embroidered designs", "Festive collection", "Wholesale rates"]
  },
  {
    name: "Printed Cotton Kurtis",
    description: "Trendy printed patterns for modern women",
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

export default function KurtiManufacturerJaipur() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 to-pink-100 py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-rose-100 text-rose-800 hover:bg-rose-200">
                  <MapPin className="w-4 h-4 mr-2" />
                  {siteConfig.address}
                </Badge>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  Leading{" "}
                  <span className="text-rose-600">Kurti Manufacturer</span>{" "}
                  in Jaipur
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Premium wholesale kurti supplier for boutiques, retailers, and online sellers. 
                  Quality cotton and silk kurtis with competitive bulk pricing. 
                  <span className="font-semibold text-rose-600"> 10+ years of trusted manufacturing.</span>
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I'm interested in wholesale kurtis. Please share your catalog.`}>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
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
                      alt="Cotton Kurti Manufacturer Jaipur"
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/products/kurta_3.png"
                      alt="Printed Kurti Wholesale Jaipur"
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
                      alt="Designer Kurti Supplier Jaipur"
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
              Why Choose Ethnics by Aravalli as Your{" "}
              <span className="text-rose-600">Kurti Manufacturer in Jaipur</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by 500+ boutiques and retailers across India for premium quality kurtis 
              and exceptional wholesale services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-rose-600" />
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

      {/* Best Selling Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Best-Selling{" "}
              <span className="text-rose-600">Kurti Categories</span>{" "}
              for Wholesale
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most popular kurti collections that are in high demand among 
              boutiques and retailers across India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellingCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={`${category.name} - Kurti Manufacturer Jaipur`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Local Presence Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <MapPin className="w-4 h-4 mr-2" />
                  Located in Jaipur
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Your Trusted{" "}
                  <span className="text-rose-600">Kurti Manufacturer</span>{" "}
                  in Malviya Nagar, Jaipur
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Strategically located in the heart of Jaipur's textile hub, we offer 
                  easy access for local buyers and reliable shipping for pan-India clients. 
                  Visit our manufacturing unit to see our quality firsthand.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-rose-600" />
                    Location
                  </h3>
                  <p className="text-gray-600">{siteConfig.address}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-rose-600" />
                    Business Hours
                  </h3>
                  <p className="text-gray-600">Mon-Sat: 9:00 AM - 7:00 PM</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-rose-600" />
                    Contact
                  </h3>
                  <p className="text-gray-600">{siteConfig.phone}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-rose-600" />
                    Service
                  </h3>
                  <p className="text-gray-600">B2B & Wholesale Only</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I'm interested in visiting your manufacturing unit in Malviya Nagar, Jaipur.`}>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule Factory Visit
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Get Directions
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-200 rounded-lg p-8 text-center">
                <MapPin className="w-16 h-16 text-rose-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Manufacturing Unit
                </h3>
                <p className="text-gray-600 mb-4">
                  {siteConfig.address}
                </p>
                <p className="text-sm text-gray-500">
                  Visit our facility to see our production process and quality standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Partner with the Best{" "}
            <span className="text-yellow-300">Kurti Manufacturer in Jaipur</span>?
          </h2>
          <p className="text-xl text-rose-100 mb-8 leading-relaxed">
            Join 500+ successful boutiques and retailers who trust Ethnics by Aravalli 
            for their kurti wholesale needs. Get competitive pricing and premium quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I'm interested in wholesale kurtis from Ethnics by Aravalli. Please share your catalog and pricing.`}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Phone className="w-5 h-5 mr-2" />
                Get WhatsApp Catalog Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-white text-rose-600 hover:bg-gray-100">
                <Mail className="w-5 h-5 mr-2" />
                Request Quote
              </Button>
            </Link>
          </div>
          <p className="text-rose-100 mt-6 text-sm">
            📞 {siteConfig.phone} | 📍 {siteConfig.address} | ⏰ Mon-Sat: 9 AM - 7 PM
          </p>
        </div>
      </section>
    </div>
  )
} 