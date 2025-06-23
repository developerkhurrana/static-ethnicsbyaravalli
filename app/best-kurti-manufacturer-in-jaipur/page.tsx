import Image from 'next/image'
import Link from "next/link"
import { CheckCircle, Eye, Target, Shield, Zap, Users, Truck, Leaf, ArrowRight, Sparkles, BadgeCheck, Clock, Package, Scissors } from "lucide-react"

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
  title: 'Best Kurti Manufacturer in Jaipur - Ethnics by Aravalli',
  description: 'Boutique-ready, trend-setting, and ethically crafted kurtis. Discover why Ethnics by Aravalli is Jaipur&apos;s top choice for premium kurtis.',
  openGraph: {
    title: 'Best Kurti Manufacturer in Jaipur - Ethnics by Aravalli',
    description: 'Boutique-ready, trend-setting, and ethically crafted kurtis. Discover why Ethnics by Aravalli is Jaipur&apos;s top choice for premium kurtis.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://ethnicsbyaravalli.com/best-kurti-manufacturer-in-jaipur',
    siteName: 'Ethnics by Aravalli',
    images: [
      {
        url: 'https://ethnicsbyaravalli.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Kurti Manufacturer in Jaipur - Ethnics by Aravalli',
      },
    ],
  },
};

export default function BestKurtiManufacturerPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <Image
          src={heroBg}
          alt="Best Kurti Manufacturer in Jaipur"
          fill
          priority
          className="object-cover w-full h-full absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-4 py-24">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">Best Kurti Manufacturer in Jaipur</h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl">Boutique-Ready. Trend-Setting. Ethically Crafted. Trusted by 300+ retailers across India.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block">
              <button className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition">Get Catalog</button>
            </Link>
            <a href="#features" className="inline-block">
              <button className="bg-white/80 hover:bg-white text-[#2E1B1B] font-semibold px-8 py-3 rounded-full text-lg border border-[#D9A8A0] shadow-lg transition flex items-center gap-2">Why Choose Us <ArrowRight className="w-5 h-5" /></button>
            </a>
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
      <section id="features" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2E1B1B] mb-12">Why Choose Ethnics by Aravalli?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#F9F6F4] rounded-xl p-8 flex flex-col items-center text-center shadow-md">
            <Sparkles className="w-10 h-10 text-[#D9A8A0] mb-4" />
            <h3 className="font-bold text-xl mb-2">Trend-Driven Designs</h3>
            <p className="text-[#4A3A3A]">Fresh, fast-moving styles inspired by Jaipur&apos;s heritage and global trends.</p>
          </div>
          <div className="bg-[#F9F6F4] rounded-xl p-8 flex flex-col items-center text-center shadow-md">
            <Shield className="w-10 h-10 text-[#D9A8A0] mb-4" />
            <h3 className="font-bold text-xl mb-2">Strict Quality Control</h3>
            <p className="text-[#4A3A3A]">Every kurti passes multi-stage inspection for fit, finish, and durability.</p>
          </div>
          <div className="bg-[#F9F6F4] rounded-xl p-8 flex flex-col items-center text-center shadow-md">
            <Leaf className="w-10 h-10 text-[#D9A8A0] mb-4" />
            <h3 className="font-bold text-xl mb-2">Sustainable Fabrics</h3>
            <p className="text-[#4A3A3A]">Eco-friendly cottons, natural dyes, and responsible sourcing.</p>
          </div>
          <div className="bg-[#F9F6F4] rounded-xl p-8 flex flex-col items-center text-center shadow-md">
            <Package className="w-10 h-10 text-[#D9A8A0] mb-4" />
            <h3 className="font-bold text-xl mb-2">Custom Labeling</h3>
            <p className="text-[#4A3A3A]">Your brand, your way—private label and exclusive designs available.</p>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2E1B1B] mb-12">How Your Kurtis Are Made</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-[#D9A8A0] mb-2" />
            <span className="font-bold">Design</span>
            <span className="h-8 border-l-2 border-[#D9A8A0] md:border-l-0 md:border-t-2 md:w-8 md:h-0" />
          </div>
          <div className="flex flex-col items-center">
            <Leaf className="w-8 h-8 text-[#D9A8A0] mb-2" />
            <span className="font-bold">Fabric Sourcing</span>
            <span className="h-8 border-l-2 border-[#D9A8A0] md:border-l-0 md:border-t-2 md:w-8 md:h-0" />
          </div>
          <div className="flex flex-col items-center">
            <Scissors className="w-8 h-8 text-[#D9A8A0] mb-2" />
            <span className="font-bold">Cutting</span>
            <span className="h-8 border-l-2 border-[#D9A8A0] md:border-l-0 md:border-t-2 md:w-8 md:h-0" />
          </div>
          <div className="flex flex-col items-center">
            <BadgeCheck className="w-8 h-8 text-[#D9A8A0] mb-2" />
            <span className="font-bold">Stitching</span>
            <span className="h-8 border-l-2 border-[#D9A8A0] md:border-l-0 md:border-t-2 md:w-8 md:h-0" />
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-8 h-8 text-[#D9A8A0] mb-2" />
            <span className="font-bold">Quality Check</span>
            <span className="h-8 border-l-2 border-[#D9A8A0] md:border-l-0 md:border-t-2 md:w-8 md:h-0" />
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-8 h-8 text-[#D9A8A0] mb-2" />
            <span className="font-bold">Dispatch</span>
          </div>
        </div>
      </section>

      {/* Gallery/Showcase */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2E1B1B] mb-12">Gallery: Our Kurtis in Action</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((src: string, i: number) => (
            <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden shadow-md">
              <Image src={src} alt={`Kurti ${i + 1}`} width={400} height={600} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial/Quote */}
      {/* <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-[#F9F6F4] rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
          <Star className="w-10 h-10 text-[#D9A8A0] mb-4" />
          <blockquote className="text-xl italic text-[#4A3A3A] mb-4">"Ethnics by Aravalli helped us scale our boutique with unique, high-quality kurtis. Our customers love the fit and designs!"</blockquote>
          <span className="font-bold text-[#2E1B1B]">— Priya S., Boutique Owner, Delhi</span>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2E1B1B] mb-6">Ready to Stock Jaipur&apos;s Best Kurtis?</h2>
        <p className="text-lg text-[#4A3A3A] mb-8">Partner with Ethnics by Aravalli for boutique-ready, premium kurtis and experience the difference in quality and service.</p>
        <Link href="/contact">
          <button className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition">Get in Touch</button>
        </Link>
      </section>
    </div>
  )
} 