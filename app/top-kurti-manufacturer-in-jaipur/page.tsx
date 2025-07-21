import Image from 'next/image'
import Link from "next/link"
import { Shield, Users, Truck, Leaf, ArrowRight, Sparkles, BadgeCheck, Clock, Package, Scissors } from "lucide-react"

const heroBg = '/products/hero_banner_1.jpg';
const galleryImages: string[] = [
  '/products/kurta_1.png',
  '/products/kurta_2.png',
  '/products/kurta_3.png',
  '/products/kurta_4.png',
  '/products/kurta_5.png',
  '/products/kalidaar_1.png',
  '/products/kalidaar_2.png',
  '/products/dupatta_1.png',
  '/products/dupatta_2.png',
];

export const metadata = {
  title: 'Top Kurti Manufacturer in Jaipur - Ethnics by Aravalli',
  description: 'Discover Jaipur\'s top kurti manufacturer for boutiques and retailers. Ethnics by Aravalli offers premium, ethically crafted kurtis with fast delivery and custom branding.',
  openGraph: {
    title: 'Top Kurti Manufacturer in Jaipur - Ethnics by Aravalli',
    description: 'Discover Jaipur\'s top kurti manufacturer for boutiques and retailers. Ethnics by Aravalli offers premium, ethically crafted kurtis with fast delivery and custom branding.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://ethnicsbyaravalli.com/top-kurti-manufacturer-in-jaipur',
    siteName: 'Ethnics by Aravalli',
    images: [
      {
        url: 'https://ethnicsbyaravalli.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Top Kurti Manufacturer in Jaipur - Ethnics by Aravalli',
      },
    ],
  },
};

export default function TopKurtiManufacturerPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src={heroBg}
          alt="Top Kurti Manufacturer in Jaipur"
          fill
          priority
          className="object-cover w-full h-full absolute inset-0 z-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pink-100/20" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob z-10"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000 z-10"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000 z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center text-center px-4 py-24 max-w-6xl mx-auto">
          <div className="mb-6 bg-pink-100 text-pink-800 hover:bg-pink-200 border border-pink-300 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="w-4 h-4 mr-2" />
            Top Kurti Manufacturer
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-6 leading-tight">
            Top Kurti Manufacturer in{" "}
            <span className="bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
              Jaipur
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Premium, boutique-ready kurtis crafted with care.
            <span className="font-semibold text-white"> Trusted by 300+ retailers for quality, style, and service.</span>
          </p>
          
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-200 mb-1">300+</div>
              <div className="text-sm text-pink-100">Boutiques Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-rose-200 mb-1">100%</div>
              <div className="text-sm text-pink-100">In-House Production</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-200 mb-1">24/7</div>
              <div className="text-sm text-pink-100">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact" className="inline-block">
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition">Get Catalog</button>
            </Link>
            <a href="#features" className="inline-block">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp Inquiry
              </button>
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-pink-100">
            <div className="flex items-center">
              <BadgeCheck className="w-4 h-4 text-pink-200 mr-2" />
              Quality Guaranteed
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 text-rose-200 mr-2" />
              Pan India Delivery
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-red-200 mr-2" />
              Trusted Manufacturer
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges / Stats Row */}
      <section className="max-w-5xl mx-auto -mt-12 mb-12 z-30 relative">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-6 md:gap-0">
          <div className="flex items-center gap-2 text-[#2E1B1B]">
            <Users className="w-6 h-6 text-[#D9A8A0]" />
            <span className="font-bold text-lg">300+ Boutiques Served</span>
          </div>
          <div className="flex items-center gap-2 text-[#2E1B1B]">
            <BadgeCheck className="w-6 h-6 text-[#D9A8A0]" />
            <span className="font-bold text-lg">100% In-House Production</span>
          </div>
          <div className="flex items-center gap-2 text-[#2E1B1B]">
            <Truck className="w-6 h-6 text-[#D9A8A0]" />
            <span className="font-bold text-lg">Fast Pan-India Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-[#2E1B1B]">
            <Clock className="w-6 h-6 text-[#D9A8A0]" />
            <span className="font-bold text-lg">Low MOQ for New Partners</span>
          </div>
        </div>
      </section>

      {/* Why Choose Us Feature Grid */}
      <section id="features" className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-800 text-sm font-medium mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Us for{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Premium Kurtis?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for premium kurti manufacturing in Jaipur
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Trend-Driven Designs
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Fresh, fast-moving styles inspired by Jaipur&apos;s heritage and global trends.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Strict Quality Control
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Every kurti passes multi-stage inspection for fit, finish, and durability.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Sustainable Fabrics
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Eco-friendly cottons, natural dyes, and responsible sourcing.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Custom Labeling
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Your brand, your way—private label and exclusive designs available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-800 text-sm font-medium mb-4">
              <Scissors className="w-4 h-4 mr-2" />
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How Your{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Kurtis Are Made
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From design to delivery, we maintain the highest standards in kurti manufacturing with a proven 6-step process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
            <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Design
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Creative design process with trend research and customer feedback
                </p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Fabric Sourcing
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Premium fabric selection from trusted suppliers
                </p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Scissors className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Cutting
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Precise cutting with advanced machinery
                </p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BadgeCheck className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Stitching
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Expert stitching with quality assurance
                </p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Quality Check
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Multi-stage quality inspection
                </p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Dispatch
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Secure packaging and fast delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery/Showcase */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-800 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Collection
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Gallery: Our{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Kurtis in Action
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our premium kurti collection showcasing quality craftsmanship and contemporary designs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((src: string, i: number) => (
              <div key={i} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image 
                    src={src} 
                    alt={`Kurti ${i + 1}`} 
                    width={400} 
                    height={600} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-bold drop-shadow-lg">Kurti Collection</h3>
                    <p className="text-sm text-white/90">Premium Quality</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Kurti #{i + 1}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Want to see more of our premium kurti collection?</p>
            <Link href="/contact">
              <button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get access to our catalog
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Summary Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Top Kurti Manufacturer in Jaipur - Premium Ethnic Wear Production Excellence
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to <strong>Ethnics by Aravalli</strong>, Jaipur's leading kurti manufacturer specializing in premium ethnic wear production for boutiques, retailers, and fashion entrepreneurs across India. We are dedicated to crafting exceptional kurtis that combine traditional Indian aesthetics with contemporary comfort, offering fashion businesses access to high-quality ethnic apparel at competitive wholesale prices with the reliability and expertise that only a top kurti manufacturer in Jaipur can provide.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our extensive collection of kurtis encompasses everything from elegant traditional designs to modern contemporary styles, each piece meticulously crafted using premium fabrics including pure cotton, silk, georgette, chiffon, and other natural materials that ensure breathability, comfort, and durability. As a top kurti manufacturer in Jaipur, we understand the diverse needs of modern fashion and create designs that celebrate both tradition and contemporary trends, making us the preferred choice for retailers seeking quality ethnic wear suppliers.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether you're a boutique owner looking to stock the latest kurti trends, a retailer seeking reliable wholesale kurti suppliers, or a fashion entrepreneur wanting to partner with a trusted kurti manufacturer in Jaipur, our comprehensive range of ethnic apparel caters to every business requirement. Our kurti collection is perfect for various occasions including daily wear, office wear, <Link href="/festive-ethnic-wear-2025" className="text-pink-600 hover:text-pink-700 underline font-medium">festivals</Link>, casual outings, and special celebrations, making them ideal for retailers serving diverse customer segments across different markets.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              As a professional kurti manufacturer in Jaipur, we prioritize quality control at every stage of production. From design and pattern making to fabric selection, cutting, stitching, and final finishing, each piece undergoes rigorous quality checks to ensure it meets our high standards. Our commitment to excellence has made us one of the most trusted kurti manufacturers in Jaipur, serving clients across the country with reliable wholesale kurti supply and timely delivery services.
            </p>

            <div className="bg-pink-50 p-6 rounded-lg my-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Explore Our Comprehensive Kurti Manufacturing Services
              </h3>
              <p className="text-gray-700 mb-4">
                Our wholesale kurti manufacturing catalog includes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                <li className="flex items-center">
                  <BadgeCheck className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                  Traditional Kurtis
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                  Contemporary Kurtis
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                  Designer Kurtis
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                  Casual Kurtis
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                  Party Wear Kurtis
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                  Office Wear Kurtis
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                  Custom Designs
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                  Private Label
                </li>
              </ul>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Shopping for wholesale kurtis from a top manufacturer in Jaipur has never been easier. Our user-friendly catalog system allows retailers and boutique owners to browse our extensive kurti collection, select their preferred styles, and place bulk orders with just a few clicks. We understand the importance of seamless business operations and strive to provide a hassle-free wholesale shopping experience with detailed product information, size charts, and competitive pricing that makes us the preferred choice among kurti manufacturers in Jaipur.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our commitment to sustainable and ethical fashion practices sets us apart as a responsible kurti manufacturer in Jaipur. We work closely with trusted fabric suppliers who share our values, ensuring that all materials used in our kurtis are responsibly sourced and of the highest quality. By choosing Ethnics by Aravalli as your kurti manufacturer, you're supporting ethical manufacturing practices while offering your customers premium quality ethnic apparel that meets international standards.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Experience the perfect blend of tradition and modernity with our exclusive collection of kurtis from Jaipur's top manufacturer. Whether you're looking for comfortable daily wear kurtis, elegant party wear pieces, or sophisticated office wear options, our wholesale kurti collection has something for every occasion and customer preference. Partner with us, Jaipur's leading kurti manufacturer, and elevate your retail business with premium quality ethnic apparel that your customers will love and trust. For wholesale pricing and bulk orders, explore our <Link href="/top-kurti-wholesaler-in-jaipur" className="text-pink-600 hover:text-pink-700 underline font-medium">wholesale kurti services</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Stock Jaipur&apos;s Top Kurtis?</h2>
        <p className="text-lg text-gray-600 mb-8">Partner with Ethnics by Aravalli for boutique-ready, premium kurtis and experience the difference in quality and service.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition">Get in Touch</button>
          </Link>
          <Link href="https://wa.me/919828422208">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
} 