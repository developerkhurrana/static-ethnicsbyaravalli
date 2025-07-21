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
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-green-100/60" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 text-center px-4 py-24 max-w-6xl mx-auto">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200 border border-green-300">
            <Factory className="w-4 h-4 mr-2" />
            Leading Kurta Sets Manufacturer
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Kurta Sets Manufacturer in{" "}
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Jaipur
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Premium kurta sets manufacturer in Jaipur, India. Wholesale kurta sets manufacturer for retailers, boutiques & B2B. 
            Custom designs, bulk orders, private label manufacturing.
            <span className="font-semibold text-gray-800"> ISO certified quality.</span>
          </p>
          
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">22+</div>
              <div className="text-sm text-green-700">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-1">100+</div>
              <div className="text-sm text-green-700">Kurta Set Styles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-1">24/7</div>
              <div className="text-sm text-green-700">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
              <Link href="/contact">Get Kurta Sets Catalog</Link>
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
                  <Button asChild className="w-full mt-4">
                    <Link href="/contact">Inquire for</Link>
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



      {/* SEO-Optimized Summary Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Premium Kurta Sets Manufacturer in Jaipur - Your Trusted Partner for Coordinated Ethnic Wear
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to <strong>Ethnics by Aravalli</strong>, your premier kurta sets manufacturer in Jaipur specializing in wholesale kurta set manufacturing for retailers and boutiques. We are dedicated to crafting exceptional kurta sets that combine traditional Indian aesthetics with contemporary comfort, offering boutique owners and retailers across India access to premium quality coordinated ethnic wear at competitive wholesale prices.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our extensive collection of kurta sets encompasses everything from elegant kurta-palazzo sets and traditional kurta-sharara sets to modern kurta-pant sets and stylish co-ord sets. Each kurta set in our collection is meticulously crafted using premium fabrics including pure cotton, silk, georgette, and other natural materials that ensure breathability, comfort, and durability. As a leading kurta sets manufacturer in Jaipur, we understand the diverse needs of modern women and create perfectly coordinated combinations that celebrate both tradition and contemporary fashion trends.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether you're a boutique owner looking to stock the latest kurta set trends, a retailer seeking reliable wholesale kurta set suppliers, or a fashion entrepreneur wanting to partner with a trusted kurta sets manufacturer in India, our comprehensive range of kurta sets caters to every business requirement. Our kurta set collection is perfect for various occasions including daily wear, office wear, festivals, weddings, parties, and special celebrations, making them ideal for retailers serving diverse customer segments.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              As a professional kurta sets manufacturer, we prioritize quality control at every stage of production. From design and pattern making to fabric selection, cutting, stitching, and final finishing, each kurta set undergoes rigorous quality checks to ensure it meets our high standards. Our commitment to excellence has made us one of the most trusted kurta sets manufacturers in Jaipur, serving clients across India with reliable wholesale kurta set supply and timely delivery services.
            </p>

            <div className="bg-green-50 p-6 rounded-lg my-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Explore Our Comprehensive Collection of Kurta Sets
              </h3>
              <p className="text-gray-700 mb-4">
                Our wholesale kurta set catalog includes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  Kurta-Palazzo Sets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  Kurta-Sharara Sets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  Kurta-Pant Sets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  Co-ord Sets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  Designer Kurta Sets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  Ethnic Kurta Sets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  Custom Designs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  Private Label
                </li>
              </ul>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Shopping for wholesale kurta sets online has never been easier. Our user-friendly catalog system allows retailers and boutique owners to browse our extensive kurta set collection, select their preferred styles, and place bulk orders with just a few clicks. We understand the importance of seamless business operations and strive to provide a hassle-free wholesale shopping experience with detailed product information, size charts, and competitive pricing.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our commitment to sustainable and ethical fashion practices sets us apart as a responsible kurta sets manufacturer. We work closely with trusted fabric suppliers who share our values, ensuring that all materials used in our kurta sets are responsibly sourced and of the highest quality. By choosing Ethnics by Aravalli as your kurta sets manufacturer, you're supporting ethical manufacturing practices while offering your customers premium quality coordinated ethnic wear.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Experience the perfect blend of coordination and style with our exclusive collection of kurta sets. Whether you're looking for comfortable daily wear kurta-palazzo sets, elegant kurta-sharara sets for special occasions, or modern kurta-pant sets for professional settings, our wholesale kurta set collection has something for every occasion and customer preference. Partner with us, the leading kurta sets manufacturer in Jaipur, and elevate your retail business with premium quality coordinated ethnic wear that your customers will love.
            </p>
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
            <Button asChild size="lg" variant="outline" className="border-white text-green-600 bg-white hover:bg-green-50 hover:text-green-700">
              <Link href="https://wa.me/919828422208">WhatsApp Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 