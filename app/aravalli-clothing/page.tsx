import Image from "next/image"
import Link from "next/link"
import { Shield, Users, Truck, Leaf, ArrowRight, Sparkles, BadgeCheck, Clock, Package } from "lucide-react"
import { ProductCard } from "@/components/product-card"

export const metadata = {
  title: "Aravalli Clothing – Premium Ethnic Wear Collection | Ethnics by Aravalli",
  description: "Explore the Aravalli Clothing collection: premium kurtas, dupattas, kalidaars, and more. Discover timeless ethnic wear crafted in Jaipur. Shop now!",
  keywords: "Aravalli Clothing, ethnic wear, kurtas, dupattas, kalidaars, Jaipur, premium ethnic wear, Ethnics by Aravalli",
  openGraph: {
    title: "Aravalli Clothing – Premium Ethnic Wear Collection | Ethnics by Aravalli",
    description: "Explore the Aravalli Clothing collection: premium kurtas, dupattas, kalidaars, and more. Discover timeless ethnic wear crafted in Jaipur. Shop now!",
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/aravalli-clothing"
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

const heroBg = "/products/hero_banner_1.jpg";

const products = [
  {
    name: "Aravalli Signature Kurta",
    description: "Classic straight-cut kurta with hand-block prints, crafted from premium Jaipur cotton.",
    images: ["/products/kurta_1.png", "/products/kurta_2.png"]
  },
  {
    name: "Aravalli Festive Kalidaar",
    description: "Elegant kalidaar silhouette with intricate embroidery, perfect for festive occasions.",
    images: ["/products/kalidaar_1.png", "/products/kalidaar_2.png"]
  },
  {
    name: "Aravalli Heritage Dupatta",
    description: "Lightweight dupatta featuring traditional motifs and vibrant colors.",
    images: ["/products/dupatta_1.png", "/products/dupatta_2.png"]
  },
  {
    name: "Aravalli Everyday Kurta",
    description: "Comfortable daily-wear kurta with subtle prints and a modern fit.",
    images: ["/products/kurta_3.png", "/products/kurta_4.png"]
  },
  {
    name: "Aravalli Double Layer Set",
    description: "Trendy double-layered ethnic set for a contemporary look.",
    images: ["/products/double_1.png"]
  },
  {
    name: "Aravalli Premium Kurta",
    description: "Luxurious kurta with rich fabric and detailed finishing, ideal for special events.",
    images: ["/products/kurta_5.png", "/products/kurta_6.png"]
  }
]

const features = [
  {
    icon: Sparkles,
    title: "Modern Ethnic Styles",
    description: "A curated collection blending Jaipur tradition with contemporary fashion."
  },
  {
    icon: Shield,
    title: "Quality Craftsmanship",
    description: "Every piece is made with premium fabrics and expert finishing."
  },
  {
    icon: Leaf,
    title: "Sustainable Fabrics",
    description: "Eco-friendly materials and responsible sourcing."
  },
  {
    icon: Package,
    title: "Boutique Packaging",
    description: "Beautifully packed for a premium unboxing experience."
  }
]

const stats = [
  { icon: Users, label: "500+ Happy Clients" },
  { icon: BadgeCheck, label: "100% In-House Production" },
  { icon: Truck, label: "Pan-India Delivery" },
  { icon: Clock, label: "Fast Turnaround" }
]

const faqs = [
  {
    q: "What is Aravalli Clothing?",
    a: "Aravalli Clothing is a curated collection of premium ethnic wear, including kurtas, dupattas, and kalidaars, crafted in Jaipur by Ethnics by Aravalli."
  },
  {
    q: "Are all products made in Jaipur?",
    a: "Yes, every piece in the Aravalli Clothing collection is designed and manufactured in Jaipur, blending traditional techniques with modern style."
  },
  {
    q: "Can I order Aravalli Clothing in bulk for my boutique?",
    a: "Absolutely! We offer special pricing and customization options for boutiques and bulk buyers. Please contact us for details."
  },
  {
    q: "What fabrics are used in Aravalli Clothing?",
    a: "We use premium fabrics such as pure cotton, silk blends, and handloom textiles, ensuring comfort and durability."
  },
  {
    q: "How do I place an order?",
    a: "You can place an order directly through our website, or contact us via WhatsApp or our contact form for personalized assistance."
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship Aravalli Clothing worldwide. Shipping options and rates are available at checkout or upon inquiry."
  }
]

export default function AravalliClothingPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <Image
          src={heroBg}
          alt="Aravalli Clothing Hero"
          fill
          priority
          className="object-cover w-full h-full absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-[#000]/70 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-4 py-24">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">Aravalli Clothing</h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl">Discover the essence of Jaipur&apos;s ethnic wear with the Aravalli Clothing collection. Each piece is a blend of tradition, craftsmanship, and contemporary design.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block">
              <button className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition">Get Catalog</button>
            </Link>
            <Link href="/kurti-manufacturer-in-jaipur" className="inline-block">
              <button className="bg-white/80 hover:bg-white text-[#2E1B1B] font-semibold px-8 py-3 rounded-full text-lg border border-[#D9A8A0] shadow-lg transition flex items-center gap-2">See More Styles <ArrowRight className="w-5 h-5" /></button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="max-w-5xl mx-auto -mt-12 mb-12 z-30 relative">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-6 md:gap-0">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[#2E1B1B]">
              <stat.icon className="w-6 h-6 text-[#D9A8A0]" />
              <span className="font-bold text-lg">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2E1B1B] mb-12">Why Choose Aravalli Clothing?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-[#F9F6F4] rounded-xl p-8 flex flex-col items-center text-center shadow-md">
              <feature.icon className="w-10 h-10 text-[#D9A8A0] mb-4" />
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-[#4A3A3A]">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
            Explore Our Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#D9A8A0] border-2"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center h-8 w-8 aspect-square rounded-full bg-[#D9A8A0] text-white font-bold text-base mr-2 leading-none">{idx + 1}</span>
                  <span className="font-semibold text-lg text-gray-900">{item.q}</span>
                </div>
                <div className="text-gray-700 text-base pl-10">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2E1B1B] mb-6">Ready to Stock Aravalli Clothing?</h2>
        <p className="text-lg text-[#4A3A3A] mb-8">Partner with us for boutique-ready, premium ethnic wear and experience the difference in quality and service.</p>
        <Link href="/contact">
          <button className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition">Get in Touch</button>
        </Link>
      </section>
    </main>
  )
} 