import Image from "next/image"
import { Metadata } from "next"
import { defaultMetadata } from "@/app/metadata"
import { Leaf, Sun, Snowflake, Sparkles, ShieldCheck, Phone } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "How to Choose the Right Fabric for Ethnic Wear | Complete Guide",
  description: "Master the art of selecting perfect fabrics for ethnic wear. Learn about cotton vs silk, seasonal choices, sustainable options, and fabric care for Indian ethnic garments.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "How to Choose the Right Fabric for Ethnic Wear | Complete Guide",
    description: "Master the art of selecting perfect fabrics for ethnic wear. Learn about cotton vs silk, seasonal choices, sustainable options, and fabric care for Indian ethnic garments.",
    type: "article",
    publishedTime: "2025-06-10T00:00:00.000Z",
    authors: ["Ethnics by Aravalli"],
    tags: ["ethnic wear", "fabric guide", "sustainable fashion", "Indian textiles"],
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: "How to Choose the Right Fabric for Ethnic Wear | Complete Guide",
    description: "Master the art of selecting perfect fabrics for ethnic wear. Learn about cotton vs silk, seasonal choices, sustainable options, and fabric care for Indian ethnic garments.",
  },
  keywords: [
    "ethnic wear fabrics",
    "cotton ethnic wear",
    "silk sarees",
    "sustainable ethnic fabrics",
    "Indian textile guide",
    "fabric care ethnic wear",
    "seasonal ethnic wear",
    "bridal wear fabrics",
    "eco-friendly fashion India",
    "ethnic wear wholesale"
  ],
}

export default function FabricGuidePage() {
  return (
    <article className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#F9F6F4] py-12 px-4">
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {[
            "/products/kurta_1.png",
            "/products/kurta_2.png",
            "/products/dupatta_1.png",
            "/products/kalidaar_1.png",
            "/products/double_1.png"
          ].map((src, idx) => (
            <div key={idx} className="w-32 h-44 rounded-xl overflow-hidden shadow-lg bg-white">
              <Image
                src={src}
                alt={`Ethnic fabric sample ${idx + 1}`}
                width={128}
                height={176}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2E1B1B] mb-4">
            How to Choose the Right Fabric for Ethnic Wear
          </h1>
          <p className="text-lg md:text-2xl text-[#4A3A3A] mb-6 max-w-2xl mx-auto">
            A modern guide for retailers & fashion lovers: comfort, sustainability, and style in every thread.
          </p>
          <div className="flex items-center justify-center text-gray-500 gap-4 text-sm">
            <span>June 10, 2025</span>
            <span className="mx-2">•</span>
            <span>By Ethnics by Aravalli</span>
            <span className="mx-2">•</span>
            <span>Fabric & Material Guide</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        {/* Intro Card */}
        <div className="bg-[#F9F6F4] rounded-2xl shadow-md p-8 text-center">
          <p className="text-xl text-[#2E1B1B] font-medium mb-2">Choosing the right fabric is the foundation of quality ethnic wear.</p>
          <p className="text-gray-700">From bridal lehengas to everyday kurtas, fabric impacts comfort, fit, longevity, and aesthetic appeal. This guide helps you make the best fabric choices for every season and silhouette.</p>
        </div>

        {/* Stepper/Timeline */}
        <div className="space-y-10">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6 border-l-4 border-[#D9A8A0]">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#D9A8A0]/20">
              <ShieldCheck className="w-8 h-8 text-[#D9A8A0]" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">1. Cotton vs. Silk – Which Works Best?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">Cotton</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Breathable and comfortable</li>
                    <li>Ideal for daily wear</li>
                    <li>Perfect for pujas and summer weddings</li>
                    <li>Easy to maintain</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Silk</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Rich in texture and drape</li>
                    <li>Ideal for formal occasions</li>
                    <li>Perfect for festive wear</li>
                    <li>Premium choice for bridal wear</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6 border-l-4 border-[#D9A8A0]">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#D9A8A0]/20">
              <Sun className="w-8 h-8 text-[#D9A8A0]" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">2. Seasonal Fabric Choices</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">Summer Fabrics</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Khadi</li>
                    <li>Mulmul</li>
                    <li>Linen</li>
                    <li>Cotton blends</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Winter Fabrics</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Velvet</li>
                    <li>Brocade</li>
                    <li>Raw Silk</li>
                    <li>Pashmina</li>
                  </ul>
                </div>
              </div>
              <p className="mt-3 italic text-[#C08478]">Pro tip: Layered styling with organza dupattas adds elegance across seasons.</p>
            </div>
          </div>

          {/* Step 3 - Sustainability Highlight */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6 border-l-4 border-green-500">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">3. Sustainable Fabric Options <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Eco-Friendly</span></h2>
              <ul className="list-disc pl-5 text-gray-700 mb-2">
                <li>Organic cotton</li>
                <li>Ahimsa silk</li>
                <li>Hemp</li>
                <li>Recycled fabrics</li>
              </ul>
              <p className="text-green-700">Sustainable choices appeal to eco-conscious customers and set your boutique apart.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6 border-l-4 border-[#D9A8A0]">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#D9A8A0]/20">
              <Sparkles className="w-8 h-8 text-[#D9A8A0]" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">4. Fabric Care & Maintenance</h2>
              <ul className="list-disc pl-5 text-gray-700 mb-2">
                <li>Use gentle detergents for delicate fabrics</li>
                <li>Dry-clean silk and embroidered garments</li>
                <li>Store in muslin cloth to preserve texture and color</li>
                <li>Keep away from direct sunlight</li>
                <li>Use proper hangers to maintain shape</li>
              </ul>
              <p className="text-[#C08478]">Proper care extends the life and beauty of ethnic garments.</p>
            </div>
          </div>
        </div>

        {/* Key Takeaways Card */}
        <div className="bg-[#F9F6F4] rounded-2xl shadow-md p-8 mt-12">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Choose fabrics based on occasion and season</li>
            <li>Consider sustainability in fabric selection</li>
            <li>Proper care extends garment life</li>
            <li>Balance traditional appeal with modern comfort</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-[#D9A8A0]/20 px-8 py-6 rounded-2xl shadow">
            <Phone className="w-6 h-6 text-[#D9A8A0]" />
            <span className="text-lg font-semibold text-[#2E1B1B]">Need help choosing fabrics for your boutique?</span>
            <Link href="/contact" className="ml-2 bg-[#D9A8A0] hover:bg-[#C08478] text-white font-semibold px-6 py-2 rounded-full transition">Contact Us</Link>
          </div>
        </div>
      </div>
    </article>
  )
} 