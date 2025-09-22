import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MapPin, Phone, Mail, Clock, Users, Award, Truck, Shield } from "lucide-react"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Festive Wear for Women Jaipur | Wholesale Manufacturers | Navratri 2025 Collection",
  description: "Premium festive wear for women in Jaipur from leading wholesale manufacturers. Navratri 2025 collection, kalidaar for women, ethnic wear, bulk supply. Export quality.",
  keywords: "festive wear for women Jaipur, wholesale ethnic wear manufacturers Jaipur, kalidaar for women Jaipur, ethnic wear for women in Jaipur, Navratri ethnic collection 2025 Jaipur, wholesale ethnic wear suppliers in Jaipur, Navratri festive wear manufacturers Jaipur, bulk kalidaar manufacturers Jaipur, ethnic wear wholesalers Jaipur Rajasthan, Jaipur festive wear for women bulk orders, B2B ethnic wear suppliers Jaipur, customized ethnic wear for women Jaipur manufacturers, Navratri 2025 ethnic wear manufacturers in Jaipur for bulk orders, best kalidaar for women wholesale suppliers Jaipur, festive ethnic wear for women manufacturers Jaipur Rajasthan, Jaipur-based ethnic wear manufacturers for Navratri retailers, export quality ethnic wear manufacturers Jaipur for Navratri 2025, bulk festive wear suppliers Jaipur for Navratri season, premium ethnic wear for women Jaipur manufacturers and exporters",
  openGraph: {
    title: "Festive Wear for Women Jaipur | Wholesale Manufacturers | Navratri 2025 Collection",
    description: "Premium festive wear for women in Jaipur from leading wholesale manufacturers. Navratri 2025 collection, kalidaar for women, ethnic wear, bulk supply.",
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/kurti-manufacturer-in-jaipur"
  }
}

const bestSellingCategories = [
  {
    name: "Festive Wear for Women",
    description: "Comprehensive festive wear collection for women including kurtas, suits, and ethnic dresses",
    image: "/products/kurta_1.png",
    features: ["Festive designs", "Contemporary styling", "Multiple sizes", "Bulk pricing available"]
  },
  {
    name: "Navratri Ethnic Collection 2025",
    description: "Premium ethnic wear for women designed specifically for Navratri 2025 celebrations",
    image: "/products/kurta_2.png",
    features: ["Navratri special designs", "Comfortable fit", "Festive collection", "Wholesale rates"]
  },
  {
    name: "Kalidaar for Women",
    description: "Exquisite kalidaar ethnic wear for women featuring traditional craftsmanship and contemporary styling",
    image: "/products/kurta_3.png",
    features: ["Traditional kalidaar cuts", "Premium fabrics", "Festive colors", "B2B pricing"]
  },
  {
    name: "Ethnic Wear for Women",
    description: "Handcrafted ethnic wear for women with intricate detailing and premium finishes",
    image: "/products/kurta_4.png",
    features: ["Hand embroidery", "Premium quality", "Designer pieces", "Custom sizing"]
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
                  Festive Wear for Women Jaipur
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Premium festive wear for women from Jaipur's leading wholesale manufacturers. 
                  Navratri 2025 collection, kalidaar for women, ethnic wear, bulk supply. 
                  <span className="font-semibold text-[#D9A8A0]"> Export quality, competitive pricing.</span>
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I&apos;m interested in festive wear for women. Please share your Navratri 2025 catalog.`}>
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
                      alt="Festive Wear for Women Jaipur"
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/products/kurta_3.png"
                      alt="Kalidaar for Women Jaipur"
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
                      alt="Navratri Ethnic Collection 2025 Jaipur"
                      width={300}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/products/kurta_4.png"
                      alt="Ethnic Wear for Women Jaipur"
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
              Why Choose Us as Your Festive Wear Supplier?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by 500+ boutiques and retailers across India for premium quality festive wear for women 
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

      {/* Best Selling Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Best-Selling Festive Wear Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most popular festive wear for women collections that are in high demand among 
              boutiques and retailers across India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellingCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={`${category.name} - Festive Wear Manufacturer Jaipur`}
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
                        <CheckCircle className="w-4 h-4 text-[#D9A8A0] mr-2 flex-shrink-0" />
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
                <Badge variant="secondary" className="bg-[#D9A8A0] text-[#2E1B1B] hover:bg-[#C08478]">
                  <MapPin className="w-4 h-4 mr-2" />
                  Located in Jaipur
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Your Trusted{" "}
                  <span className="text-[#D9A8A0]">Festive Wear Manufacturer</span>{" "}
                  in Malviya Nagar, Jaipur
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Strategically located in the heart of Jaipur&apos;s textile hub, we offer 
                  easy access for local buyers and reliable shipping for pan-India clients. 
                  Visit our manufacturing unit to see our quality firsthand.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-[#D9A8A0]" />
                    Location
                  </h3>
                  <p className="text-gray-600">{siteConfig.address}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-[#D9A8A0]" />
                    Business Hours
                  </h3>
                  <p className="text-gray-600">Mon-Sat: 9:00 AM - 7:00 PM</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-[#D9A8A0]" />
                    Contact
                  </h3>
                  <p className="text-gray-600">{siteConfig.phone}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-[#D9A8A0]" />
                    Service
                  </h3>
                  <p className="text-gray-600">B2B & Wholesale Only</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I&apos;m interested in visiting your festive wear manufacturing unit in Malviya Nagar, Jaipur.`}>
                  <Button size="lg" className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] w-full sm:w-auto">
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
                <MapPin className="w-16 h-16 text-[#D9A8A0] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Festive Wear Manufacturing Unit
                </h3>
                <p className="text-gray-600 mb-4">
                  {siteConfig.address}
                </p>
                <p className="text-sm text-gray-500">
                  Visit our facility to see our festive wear production process and quality standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#D9A8A0] to-[#C08478]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Partner with the Best{" "}
            <span className="text-yellow-300">Festive Wear Manufacturer in Jaipur</span>?
          </h2>
          <p className="text-xl text-rose-100 mb-8 leading-relaxed">
            Join 500+ successful boutiques and retailers who trust Ethnics by Aravalli 
            for their festive wear wholesale needs. Get competitive pricing and premium quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I&apos;m interested in festive wear for women. Please share your Navratri 2025 catalog.`}>
              <Button size="lg" className="bg-[#D9A8A0] hover:bg-[#C08478] text-white">
                <Phone className="w-5 h-5 mr-2" />
                Get WhatsApp Catalog Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-white text-[#D9A8A0] hover:bg-gray-100">
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

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions about Wholesale Festive Wear
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our festive wear manufacturing process and services.
            </p>
          </div>
          
          {/* Add FAQ content here */}
        </div>
      </section>
    </div>
  )
} 