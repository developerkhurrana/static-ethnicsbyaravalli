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
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 text-center px-4 py-24 max-w-6xl mx-auto">
          <div className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-300 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            Festive Season 2025
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Festive Ethnic Wear{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Collection 2025
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Celebrate every occasion with our premium ethnic wear collection. 
            <span className="font-semibold text-gray-800"> Designer kurtas, suit sets, dresses, and kaftans for Diwali, Navratri, and all celebrations.</span>
          </p>
          
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-1">10+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-1">500+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3">
              <Link href="/contact">Get Festive Catalog</Link>
            </Button>
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3 flex items-center gap-2">
              <Link href="https://wa.me/919828422208">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp Inquiry
              </Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Award className="w-4 h-4 text-orange-500 mr-2" />
              Festive Specialists
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 text-red-500 mr-2" />
              Pan India Delivery
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-pink-500 mr-2" />
              Quality Guaranteed
            </div>
          </div>
        </div>
      </section>

      {/* Festive Categories */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4">
              <Gift className="w-4 h-4 mr-2" />
              Our Collections
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Festive{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Collections 2025
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our curated ethnic wear collections designed specifically for India's most celebrated festivals and occasions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {festiveCategories.map((category, idx) => (
              <div key={idx} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full">
                <div className="relative w-full h-80 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-bold drop-shadow-lg">{category.name}</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">{category.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-sm text-gray-800">Perfect for:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.occasions.map((occasion, occasionIdx) => (
                          <Badge key={occasionIdx} variant="secondary" className="text-xs bg-orange-100 text-orange-800 hover:bg-orange-200">
                            {occasion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 mt-auto">
                    <Link href="/contact">Inquire Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4">
              <Award className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Us for{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Festive Ethnic Wear?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for premium ethnic wear during every festive season.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, idx) => (
              <div key={idx} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festive Highlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Festive Highlights
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Festive Season{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Highlights
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What makes our festive collection special for retailers and boutiques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {festiveHighlights.map((highlight, idx) => (
              <div key={idx} className="group relative bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <highlight.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-Optimized Summary Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Premium Festive Ethnic Wear Collection 2025 - Celebrate Every Occasion in Style
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to <strong>Ethnics by Aravalli's</strong> exclusive festive ethnic wear collection for 2025, where tradition meets contemporary fashion to create the perfect celebration attire. Our comprehensive range of festive ethnic wear is designed to cater to every major Indian festival and celebration, offering boutique owners, retailers, and wholesalers access to premium quality ethnic apparel that captures the essence of Indian festivities while meeting modern fashion demands.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our festive ethnic wear collection 2025 encompasses everything from elegant Diwali ethnic wear and vibrant Navratri collection pieces to sophisticated wedding season ethnic wear and contemporary New Year celebration attire. Each piece in our festive collection is meticulously crafted using premium fabrics including silk, georgette, chiffon, and other luxurious materials that ensure both comfort and elegance during extended celebration periods. As a leading ethnic wear manufacturer specializing in festive collections, we understand the unique requirements of different celebrations and create designs that honor tradition while embracing contemporary styling.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              The Diwali ethnic wear segment of our festive collection features traditional designs with modern twists, perfect for family gatherings, temple visits, and cultural celebrations. Our Navratri collection emphasizes comfort and movement, with designs that allow for easy participation in traditional dances like Garba and Dandiya while maintaining elegant aesthetics. The wedding season ethnic wear includes sophisticated pieces with intricate embroidery and luxury fabrics, ideal for various wedding-related celebrations including receptions, engagement parties, and sangeet ceremonies.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our New Year ethnic wear collection offers contemporary ethnic fusion pieces that blend traditional Indian aesthetics with modern party wear sensibilities, perfect for corporate celebrations, social gatherings, and cocktail events. Each collection within our festive ethnic wear 2025 lineup is designed with careful attention to seasonal trends, cultural significance, and practical requirements, ensuring that retailers can offer their customers the perfect ethnic wear for every celebration throughout the year.
            </p>

            <div className="bg-orange-50 p-6 rounded-lg my-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Explore Our Comprehensive Festive Ethnic Wear Collections
              </h3>
              <p className="text-gray-700 mb-4">
                Our wholesale festive ethnic wear catalog includes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Diwali Ethnic Wear Collection
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Navratri Special Collection
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Wedding Season Ethnic Wear
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  New Year Celebration Wear
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Festive Kurtas & Kurta Sets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Designer Suit Sets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Ethnic Kaftans & Dresses
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Custom Festive Designs
                </li>
              </ul>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Shopping for wholesale festive ethnic wear has never been more convenient. Our comprehensive catalog system allows retailers and boutique owners to browse our extensive festive collection, select pieces that align with their customer preferences, and place bulk orders with competitive wholesale pricing. We understand the importance of timely delivery during festive seasons and ensure that all orders are processed and shipped well before celebrations begin, allowing retailers to stock their stores adequately for peak shopping periods.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our commitment to quality and authenticity in festive ethnic wear manufacturing sets us apart as a trusted partner for retailers across India. Each piece in our festive collection undergoes rigorous quality checks to ensure it meets our high standards for fabric quality, stitching precision, and finishing excellence. By choosing Ethnics by Aravalli as your festive ethnic wear supplier, you're partnering with a manufacturer that understands the cultural significance of Indian festivals and creates ethnic wear that honors these traditions while meeting contemporary fashion expectations.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Experience the perfect blend of tradition and modernity with our exclusive festive ethnic wear collection 2025. Whether you're looking for traditional Diwali ethnic wear, comfortable Navratri collection pieces, sophisticated wedding season attire, or contemporary New Year celebration wear, our comprehensive festive collection has something for every occasion and customer preference. Partner with us, India's leading festive ethnic wear manufacturer, and elevate your retail business with premium quality ethnic apparel that celebrates the rich cultural heritage of Indian festivals while meeting the demands of modern fashion-conscious consumers.
            </p>
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
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white border-0">
              <Link href="https://wa.me/919828422208" className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 