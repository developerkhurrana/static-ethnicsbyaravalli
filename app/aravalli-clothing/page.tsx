import { Metadata } from "next"
import { ProductCard } from "@/components/product-card"
import Image from "next/image"

export const metadata: Metadata = {
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
  }
}

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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Aravalli Clothing
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Discover the essence of Jaipur's ethnic wear with the Aravalli Clothing collection. Each piece is a blend of tradition, craftsmanship, and contemporary design.
          </p>
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
                  <span className="inline-block w-8 h-8 flex items-center justify-center rounded-full bg-brand-primary text-white font-bold text-lg mr-2">{idx + 1}</span>
                  <span className="font-semibold text-lg text-gray-900">{item.q}</span>
                </div>
                <div className="text-gray-700 text-base pl-10">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 