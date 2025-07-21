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
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-blue-100/60" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 text-center px-4 py-24 max-w-6xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300">
            <Sparkles className="w-4 h-4 mr-2" />
            Premium Kaftan Manufacturer
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Kaftan Manufacturer in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Jaipur
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Premium kaftan manufacturer in Jaipur, India. Designer ethnic kaftans, comfortable loungewear, and stylish ethnic fusion at wholesale prices. 
            <span className="font-semibold text-gray-800"> Fast delivery across India.</span>
          </p>
          
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">15+</div>
              <div className="text-sm text-blue-700">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">50+</div>
              <div className="text-sm text-blue-700">Kaftan Styles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-sm text-blue-700">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              <Link href="/contact">Get Kaftan Catalog</Link>
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
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-700">
            <div className="flex items-center">
              <Award className="w-4 h-4 text-blue-500 mr-2" />
              ISO Certified
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 text-indigo-500 mr-2" />
              Pan India Delivery
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-purple-500 mr-2" />
              Quality Guaranteed
            </div>
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
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg w-full h-72 flex-shrink-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">{category.name}</h3>
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
                      <Link href="/contact">Inquire for</Link>
                    </Button>
                  </div>
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

      {/* SEO-Optimized Summary Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Premium Kaftan Manufacturer in Jaipur - Your Trusted Partner for Ethnic Kaftans
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to <strong>Ethnics by Aravalli</strong>, your premier kaftan manufacturer in Jaipur specializing in wholesale ethnic kaftan manufacturing for retailers and boutiques. We are dedicated to crafting exceptional kaftans that combine traditional comfort with contemporary style, offering boutique owners and retailers across India access to premium quality ethnic loungewear at competitive wholesale prices.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our extensive collection of kaftans encompasses everything from comfortable cotton kaftans and luxurious silk kaftans to trendy printed kaftans and handcrafted embroidered kaftans. Each kaftan in our collection is meticulously crafted using premium fabrics including pure cotton, silk, georgette, and other natural materials that ensure breathability, comfort, and durability. As a leading kaftan manufacturer in Jaipur, we understand the diverse needs of modern women and create designs that celebrate both comfort and contemporary fashion trends.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether you're a boutique owner looking to stock the latest kaftan trends, a retailer seeking reliable wholesale kaftan suppliers, or a fashion entrepreneur wanting to partner with a trusted kaftan manufacturer in India, our comprehensive range of kaftans caters to every business requirement. Our kaftan collection is perfect for various occasions including daily wear, loungewear, beach wear, <Link href="/festive-ethnic-wear-2025" className="text-blue-600 hover:text-blue-700 underline font-medium">festivals</Link>, parties, and special celebrations, making them ideal for retailers serving diverse customer segments.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              As a professional kaftan manufacturer, we prioritize quality control at every stage of production. From design and pattern making to fabric selection, cutting, stitching, and final finishing, each kaftan undergoes rigorous quality checks to ensure it meets our high standards. Our commitment to excellence has made us one of the most trusted kaftan manufacturers in Jaipur, serving clients across India with reliable wholesale kaftan supply and timely delivery services.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg my-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Explore Our Comprehensive Collection of Kaftans
              </h3>
              <p className="text-gray-700 mb-4">
                Our wholesale kaftan catalog includes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <Link href="/top-kurti-manufacturer-in-jaipur" className="hover:text-blue-600 transition-colors">Cotton Kaftans</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <Link href="/top-kurti-manufacturer-in-jaipur" className="hover:text-blue-600 transition-colors">Silk Kaftans</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <Link href="/top-kurti-manufacturer-in-jaipur" className="hover:text-blue-600 transition-colors">Printed Kaftans</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <Link href="/top-kurti-manufacturer-in-jaipur" className="hover:text-blue-600 transition-colors">Embroidered Kaftans</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <Link href="/top-kurti-manufacturer-in-jaipur" className="hover:text-blue-600 transition-colors">Designer Kaftans</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <Link href="/ethnic-wear-manufacturer" className="hover:text-blue-600 transition-colors">Ethnic Kaftans</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <Link href="/ethnic-wear-manufacturer" className="hover:text-blue-600 transition-colors">Custom Designs</Link>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <Link href="/top-kurti-wholesaler-in-jaipur" className="hover:text-blue-600 transition-colors">Private Label</Link>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Shopping for wholesale kaftans online has never been easier. Our user-friendly catalog system allows retailers and boutique owners to browse our extensive kaftan collection, select their preferred styles, and place bulk orders with just a few clicks. We understand the importance of seamless business operations and strive to provide a hassle-free wholesale shopping experience with detailed product information, size charts, and competitive pricing.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our commitment to sustainable and ethical fashion practices sets us apart as a responsible kaftan manufacturer. We work closely with trusted fabric suppliers who share our values, ensuring that all materials used in our kaftans are responsibly sourced and of the highest quality. By choosing Ethnics by Aravalli as your kaftan manufacturer, you're supporting ethical manufacturing practices while offering your customers premium quality ethnic loungewear.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Experience the perfect blend of comfort and style with our exclusive collection of kaftans. Whether you're looking for comfortable daily wear kaftans, elegant silk kaftans for special occasions, or trendy printed kaftans for fashion-forward customers, our wholesale kaftan collection has something for every occasion and customer preference. Partner with us, the leading kaftan manufacturer in Jaipur, and elevate your retail business with premium quality kaftans that your customers will love. Explore our complete <Link href="/ethnic-wear-manufacturer" className="text-blue-600 hover:text-blue-700 underline font-medium">ethnic wear collection</Link> for comprehensive business solutions.
            </p>
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