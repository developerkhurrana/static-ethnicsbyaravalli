import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Users, Truck, Leaf, Sparkles, BadgeCheck, Clock, Package, Scissors } from "lucide-react";

export const metadata = {
  title: "Top Kurti Wholesaler in Jaipur | Direct from Manufacturer at Wholesale Prices",
  description: "Get premium kurtis at true wholesale prices direct from the leading manufacturer in Jaipur. Bulk orders, private label, and fast dispatch for boutiques and resellers.",
  keywords: "kurti wholesaler in Jaipur, wholesale kurtis, kurti manufacturer, bulk kurtis, factory price kurtis, B2B kurtis, private label kurtis, Jaipur kurti supplier, ethnic wear wholesale, boutique kurtis wholesale",
  openGraph: {
    title: "Top Kurti Wholesaler in Jaipur | Direct from Manufacturer at Wholesale Prices",
    description: "Get premium kurtis at true wholesale prices direct from the leading manufacturer in Jaipur. Bulk orders, private label, and fast dispatch for boutiques and resellers.",
    type: "website",
    locale: "en_IN",
    url: "https://ethnicsbyaravalli.com/top-kurti-wholesaler-in-jaipur"
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/top-kurti-wholesaler-in-jaipur"
  }
};

const products = [
  {
    name: "Cotton Kurtis",
    description: "Breathable, vibrant, and perfect for daily wear. Available in bulk at unbeatable prices.",
    image: "/products/kurta_1.png"
  },
  {
    name: "Designer Kurtis",
    description: "Trendy, boutique-ready styles with premium fabrics and finishing.",
    image: "/products/kurta_2.png"
  },
  {
    name: "Printed Kurtis",
    description: "Latest prints, modern fits, and a wide range of colors for every customer.",
    image: "/products/kurta_3.png"
  },
  {
    name: "Kurta Sets",
    description: "Coordinated sets for a complete ethnic look, ready for your store shelves.",
    image: "/products/kurta_4.png"
  }
];

export default function TopKurtiWholesalerPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/products/hero_banner_1.jpg"
          alt="Top Kurti Wholesaler in Jaipur"
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
            Top Wholesaler
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-6 leading-tight">
            Top Kurti Wholesaler in{" "}
            <span className="bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
              Jaipur
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Premium kurtis at true wholesale prices.
            <span className="font-semibold text-white"> Direct from manufacturer to your store.</span>
          </p>
          
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-200 mb-1">500+</div>
              <div className="text-sm text-pink-100">Retailers Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-rose-200 mb-1">50%</div>
              <div className="text-sm text-pink-100">Lower Prices</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-200 mb-1">24/7</div>
              <div className="text-sm text-pink-100">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact" className="inline-block">
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition flex items-center gap-2">
                Get Wholesale Catalog <ArrowRight className="w-5 h-5" />
              </button>
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
              Factory Direct Prices
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 text-rose-200 mr-2" />
              Pan India Delivery
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-red-200 mr-2" />
              Bulk Order Support
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges / Stats Row */}
      <section className="max-w-5xl mx-auto -mt-12 mb-12 z-30 relative">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-6 md:gap-0">
          <div className="flex items-center gap-2 text-[#2E1B1B]">
            <Users className="w-6 h-6 text-[#D9A8A0]" />
            <span className="font-bold text-lg">500+ Retailers Served</span>
          </div>
          <div className="flex items-center gap-2 text-[#2E1B1B]">
            <BadgeCheck className="w-6 h-6 text-[#D9A8A0]" />
            <span className="font-bold text-lg">Factory Direct Prices</span>
          </div>
          <div className="flex items-center gap-2 text-[#2E1B1B]">
            <Truck className="w-6 h-6 text-[#D9A8A0]" />
            <span className="font-bold text-lg">Fast Pan-India Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-[#2E1B1B]">
            <Clock className="w-6 h-6 text-[#D9A8A0]" />
            <span className="font-bold text-lg">Bulk Order Support</span>
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
              Why Choose Us as Your{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Kurti Wholesaler?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for wholesale kurti supply in Jaipur
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BadgeCheck className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Direct from Manufacturer
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  No middlemen, no markups. You get true factory prices and direct access to our production team for custom/bulk orders.
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
                  Bulk & Private Label Orders
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  We specialize in B2B, boutique, and reseller orders. Customization, private label, and fast dispatch available for all bulk clients.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Latest Styles, Best Quality
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Stay ahead of trends with our ever-evolving collection. Every kurti is crafted with premium fabrics and expert finishing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-800 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Best Sellers
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Best-Selling{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Wholesale Kurtis
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Premium quality kurtis that fly off the shelves - perfect for your retail business
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <div key={idx} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100 overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={200} 
                    height={260} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Best Seller
                  </div>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors duration-300">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pink-600">Wholesale Price</span>
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
        </div>
      </section>

      {/* How to Order */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-800 text-sm font-medium mb-4">
              <ArrowRight className="w-4 h-4 mr-2" />
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How to Order{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Wholesale Kurtis
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple 4-step process to get your wholesale kurti order started
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-pink-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Contact Us
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Reach out via our <Link href="/contact" className="text-pink-600 underline font-medium">contact form</Link> or WhatsApp for your requirements.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-pink-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Get Catalog & Pricing
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  We'll send you our latest wholesale catalog and best prices for your business.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-pink-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Place Your Order
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Confirm your selection, quantity, and any customizations for your business.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-pink-600">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Fast Dispatch
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  We manufacture and ship your order quickly, anywhere in India or abroad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Stock Your Store with Jaipur&apos;s Best Kurtis?</h2>
        <p className="text-lg text-gray-600 mb-8">Partner with the top kurti manufacturer and wholesaler in Jaipur. Get unbeatable prices, quality, and service.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition">Get Wholesale Pricing</button>
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
  );
} 