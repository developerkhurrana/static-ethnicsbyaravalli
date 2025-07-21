import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Truck, Clock, Users, Award, Shield, Sparkles, Leaf, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Suit Sets Manufacturer in Jaipur | Wholesale Ethnic Suit Sets | Ethnics by Aravalli",
  description: "Premium suit sets manufacturer in Jaipur. Designer ethnic suit sets, kurta-palazzo sets, and co-ord sets at wholesale prices. Fast delivery across India for boutiques and retailers.",
  keywords: [
    "suit sets manufacturer",
    "suit sets manufacturer in Jaipur",
    "ethnic suit sets manufacturer",
    "wholesale suit sets",
    "designer suit sets manufacturer",
    "suit sets supplier Jaipur",
    "ethnic suit sets supplier",
    "suit sets wholesale",
    "kurta palazzo sets manufacturer",
    "co-ord sets manufacturer",
    "suit sets manufacturer India",
    "ethnic wear suit sets",
    "boutique suit sets supplier",
    "suit sets manufacturer for retailers",
    "women suit sets manufacturer"
  ].join(', '),
  openGraph: {
    title: "Suit Sets Manufacturer in Jaipur | Wholesale Ethnic Suit Sets | Ethnics by Aravalli",
    description: "Premium suit sets manufacturer in Jaipur. Designer ethnic suit sets, kurta-palazzo sets, and co-ord sets at wholesale prices.",
    type: "website",
    locale: "en_IN",
    url: "https://ethnicsbyaravalli.com/suit-sets-manufacturer",
    siteName: "Ethnics by Aravalli",
    images: [
      {
        url: "https://ethnicsbyaravalli.com/products/hero_banner_1.jpg",
        width: 1200,
        height: 630,
        alt: "Suit Sets Manufacturer in Jaipur - Ethnics by Aravalli",
      },
    ],
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/suit-sets-manufacturer"
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

const suitSetCategories = [
  {
    name: "Kurta-Palazzo Sets",
    description: "Elegant kurta-palazzo combinations perfect for all occasions",
    image: "/products/kurta_1.png",
    features: ["Matching sets", "Comfortable fit", "Multiple colors", "Bulk pricing"],
    occasions: ["Daily wear", "Office wear", "Casual outings", "Weekend wear"]
  },
  {
    name: "Kurta-Sharara Sets",
    description: "Traditional kurta-sharara sets for festive and special occasions",
    image: "/products/kurta_2.png",
    features: ["Traditional designs", "Premium fabrics", "Festive collection", "Wholesale rates"],
    occasions: ["Festivals", "Weddings", "Special occasions", "Cultural events"]
  },
  {
    name: "Kurta-Pant Sets",
    description: "Modern kurta-pant combinations for contemporary ethnic wear",
    image: "/products/kurta_3.png",
    features: ["Modern designs", "Contemporary styling", "Multiple sizes", "B2B pricing"],
    occasions: ["Office wear", "Professional settings", "Modern events", "Corporate functions"]
  },
  {
    name: "Co-ord Sets",
    description: "Stylish co-ordinated sets with kurta and matching bottoms",
    image: "/products/kurta_4.png",
    features: ["Co-ordinated designs", "Versatile styling", "Designer pieces", "Custom sizing"],
    occasions: ["Parties", "Social gatherings", "Cocktail events", "Modern celebrations"]
  }
]

const whyChooseUs = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use only the finest fabrics and maintain strict quality control standards for every suit set."
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

const suitSetFeatures = [
  {
    icon: Leaf,
    title: "Matching Sets",
    description: "Perfectly coordinated kurta and bottom combinations for a complete look."
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

export default function SuitSetsManufacturerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-green-100/60" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 text-center px-4 py-24 max-w-6xl mx-auto">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200 border border-green-300">
            <Sparkles className="w-4 h-4 mr-2" />
            Premium Suit Sets Manufacturer
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Suit Sets Manufacturer in{" "}
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Jaipur
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Premium suit sets manufacturer in Jaipur, India. Designer ethnic suit sets, kurta-palazzo sets, and co-ord sets at wholesale prices. 
            <span className="font-semibold text-gray-800"> Fast delivery across India for boutiques and retailers.</span>
          </p>
          
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">18+</div>
              <div className="text-sm text-green-700">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-1">75+</div>
              <div className="text-sm text-green-700">Suit Set Styles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-1">24/7</div>
              <div className="text-sm text-green-700">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
              <Link href="/contact">Get Suit Sets Catalog</Link>
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
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-green-700">
            <div className="flex items-center">
              <Award className="w-4 h-4 text-green-500 mr-2" />
              ISO Certified
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 text-teal-500 mr-2" />
              Pan India Delivery
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-emerald-500 mr-2" />
              Quality Guaranteed
            </div>
          </div>
        </div>
      </section>

      {/* Suit Set Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Suit Set Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of suit sets designed for style, comfort, and elegance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {suitSetCategories.map((category, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="relative overflow-hidden rounded-t-lg h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">{category.name}</h3>
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
                  <Button asChild className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    <Link href="/contact">Inquire for</Link>
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
              Why Choose Ethnics by Aravalli for Suit Sets?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for premium suit set manufacturing and wholesale supply.
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

      {/* Suit Set Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes Our Suit Sets Special?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Features that set our suit sets apart in the market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {suitSetFeatures.map((feature, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-Optimized Summary Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Premium Suit Sets Manufacturer in Jaipur - Your Trusted Partner for Ethnic Suit Sets
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to <strong>Ethnics by Aravalli</strong>, your premier suit sets manufacturer in Jaipur specializing in wholesale ethnic suit set manufacturing for retailers and boutiques. We are dedicated to crafting exceptional suit sets that combine traditional Indian aesthetics with contemporary comfort, offering boutique owners and retailers across India access to premium quality coordinated ethnic wear at competitive wholesale prices.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our extensive collection of suit sets encompasses everything from elegant kurta-palazzo sets and traditional kurta-sharara sets to modern kurta-pant sets and stylish co-ord sets. Each suit set in our collection is meticulously crafted using premium fabrics including pure cotton, silk, georgette, and other natural materials that ensure breathability, comfort, and durability. As a leading suit sets manufacturer in Jaipur, we understand the diverse needs of modern women and create perfectly coordinated combinations that celebrate both tradition and contemporary fashion trends.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether you're a boutique owner looking to stock the latest suit set trends, a retailer seeking reliable wholesale suit set suppliers, or a fashion entrepreneur wanting to partner with a trusted suit sets manufacturer in India, our comprehensive range of suit sets caters to every business requirement. Our suit set collection is perfect for various occasions including daily wear, office wear, <Link href="/festive-ethnic-wear-2025" className="text-green-600 hover:text-green-700 underline font-medium">festivals</Link>, weddings, parties, and special celebrations, making them ideal for retailers serving diverse customer segments.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              As a professional suit sets manufacturer, we prioritize quality control at every stage of production. From design and pattern making to fabric selection, cutting, stitching, and final finishing, each suit set undergoes rigorous quality checks to ensure it meets our high standards. Our commitment to excellence has made us one of the most trusted suit sets manufacturers in Jaipur, serving clients across India with reliable wholesale suit set supply and timely delivery services.
            </p>

            <div className="bg-green-50 p-6 rounded-lg my-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Explore Our Comprehensive Collection of Suit Sets
              </h3>
              <p className="text-gray-700 mb-4">
                Our wholesale suit set catalog includes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <Link href="/kurta-sets-manufacturer" className="hover:text-green-600 transition-colors">Kurta-Palazzo Sets</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <Link href="/kurta-sets-manufacturer" className="hover:text-green-600 transition-colors">Kurta-Sharara Sets</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <Link href="/kurta-sets-manufacturer" className="hover:text-green-600 transition-colors">Kurta-Pant Sets</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <Link href="/kurta-sets-manufacturer" className="hover:text-green-600 transition-colors">Co-ord Sets</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <Link href="/top-kurti-manufacturer-in-jaipur" className="hover:text-green-600 transition-colors">Designer Suit Sets</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <Link href="/ethnic-wear-manufacturer" className="hover:text-green-600 transition-colors">Ethnic Suit Sets</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <Link href="/ethnic-wear-manufacturer" className="hover:text-green-600 transition-colors">Custom Designs</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <Link href="/top-kurti-wholesaler-in-jaipur" className="hover:text-green-600 transition-colors">Private Label</Link>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Shopping for wholesale suit sets online has never been easier. Our user-friendly catalog system allows retailers and boutique owners to browse our extensive suit set collection, select their preferred styles, and place bulk orders with just a few clicks. We understand the importance of seamless business operations and strive to provide a hassle-free wholesale shopping experience with detailed product information, size charts, and competitive pricing.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our commitment to sustainable and ethical fashion practices sets us apart as a responsible suit sets manufacturer. We work closely with trusted fabric suppliers who share our values, ensuring that all materials used in our suit sets are responsibly sourced and of the highest quality. By choosing Ethnics by Aravalli as your suit sets manufacturer, you're supporting ethical manufacturing practices while offering your customers premium quality coordinated ethnic wear.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Experience the perfect blend of coordination and style with our exclusive collection of suit sets. Whether you're looking for comfortable daily wear kurta-palazzo sets, elegant kurta-sharara sets for special occasions, or modern kurta-pant sets for professional settings, our wholesale suit set collection has something for every occasion and customer preference. Partner with us, the leading suit sets manufacturer in Jaipur, and elevate your retail business with premium quality coordinated ethnic wear that your customers will love. Explore our complete <Link href="/ethnic-wear-manufacturer" className="text-green-600 hover:text-green-700 underline font-medium">ethnic wear collection</Link> for comprehensive business solutions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Stock Premium Suit Sets?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Get your hands on our exclusive suit set collection. 
            Perfect for boutiques, retailers, and wholesalers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Request Catalog</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-green-600 bg-white hover:bg-green-50 hover:text-green-700">
              <Link href="https://wa.me/919828422208">WhatsApp Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 