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
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-blue-100/60" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 text-center px-4 py-24 max-w-6xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300">
            <Factory className="w-4 h-4 mr-2" />
            Leading Kurta Manufacturer
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Kurta Manufacturer in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Jaipur
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Premium kurta manufacturer in Jaipur, India. Wholesale kurta manufacturer for retailers, boutiques & B2B. 
            Custom designs, bulk orders, private label manufacturing.
            <span className="font-semibold text-gray-800"> ISO certified quality.</span>
          </p>
          
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">20+</div>
              <div className="text-sm text-blue-700">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">100+</div>
              <div className="text-sm text-blue-700">Kurta Styles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-sm text-blue-700">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              <Link href="/contact">Get Kurta Catalog</Link>
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

      {/* SEO-Optimized Summary Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Premium Kurta Manufacturer in Jaipur - Your Trusted Partner for Ethnic Wear
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to <strong>Ethnics by Aravalli</strong>, your premier kurta manufacturer in Jaipur specializing in wholesale kurta manufacturing for retailers and boutiques. We are dedicated to crafting exceptional kurtas that combine traditional Indian aesthetics with contemporary comfort, offering boutique owners and retailers across India access to premium quality ethnic wear at competitive wholesale prices.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our extensive collection of kurtas encompasses everything from elegant cotton kurtas and luxurious silk kurtas to trendy designer kurtas and handcrafted embroidered kurtas. Each kurta in our collection is meticulously crafted using premium fabrics including pure cotton, silk, georgette, and other natural materials that ensure breathability, comfort, and durability. As a leading kurta manufacturer in Jaipur, we understand the diverse needs of modern women and create designs that celebrate both tradition and contemporary fashion trends.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether you're a boutique owner looking to stock the latest kurta trends, a retailer seeking reliable wholesale kurta suppliers, or a fashion entrepreneur wanting to partner with a trusted kurta manufacturer in India, our comprehensive range of kurtas caters to every business requirement. Our kurta collection is perfect for various occasions including daily wear, office wear, festivals, weddings, and special celebrations, making them ideal for retailers serving diverse customer segments.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              As a professional kurta manufacturer, we prioritize quality control at every stage of production. From design and pattern making to fabric selection, cutting, stitching, and final finishing, each kurta undergoes rigorous quality checks to ensure it meets our high standards. Our commitment to excellence has made us one of the most trusted kurta manufacturers in Jaipur, serving clients across India with reliable wholesale kurta supply and timely delivery services.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg my-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Explore Our Comprehensive Collection of Kurtas
              </h3>
              <p className="text-gray-700 mb-4">
                Our wholesale kurta catalog includes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Cotton Kurtas
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Silk Kurtas
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Designer Kurtas
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Embroidered Kurtas
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Anarkali Kurtas
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Kurta Sets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Custom Designs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Private Label
                </li>
              </ul>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Shopping for wholesale kurtas online has never been easier. Our user-friendly catalog system allows retailers and boutique owners to browse our extensive kurta collection, select their preferred styles, and place bulk orders with just a few clicks. We understand the importance of seamless business operations and strive to provide a hassle-free wholesale shopping experience with detailed product information, size charts, and competitive pricing.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our commitment to sustainable and ethical fashion practices sets us apart as a responsible kurta manufacturer. We work closely with trusted fabric suppliers who share our values, ensuring that all materials used in our kurtas are responsibly sourced and of the highest quality. By choosing Ethnics by Aravalli as your kurta manufacturer, you're supporting ethical manufacturing practices while offering your customers premium quality ethnic wear.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Experience the perfect blend of tradition and modernity with our exclusive collection of kurtas. Whether you're looking for comfortable daily wear kurtas, elegant silk kurtas for special occasions, or trendy designer kurtas for fashion-forward customers, our wholesale kurta collection has something for every occasion and customer preference. Partner with us, the leading kurta manufacturer in Jaipur, and elevate your retail business with premium quality kurtas that your customers will love.
            </p>
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