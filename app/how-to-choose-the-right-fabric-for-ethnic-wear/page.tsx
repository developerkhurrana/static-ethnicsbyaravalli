import Image from "next/image"
import { Metadata } from "next"
import { defaultMetadata } from "@/app/metadata"

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
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-6">
          How to Choose the Right Fabric for Ethnic Wear
        </h1>
        <div className="flex items-center text-gray-600 mb-8">
          <time dateTime="2025-06-10">June 10, 2025</time>
          <span className="mx-2">•</span>
          <span>By Ethnics by Aravalli</span>
          <span className="mx-2">•</span>
          <span>Fabric & Material Guide</span>
        </div>
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src="/blog/fabric-guide-hero.jpg"
            alt="Different types of ethnic wear fabrics displayed elegantly"
            fill
            className="object-cover"
            priority
          />
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="lead">
          Choosing the right fabric is the foundation of quality ethnic wear. From bridal lehengas to everyday kurtas, 
          fabric impacts comfort, fit, longevity, and aesthetic appeal. This comprehensive guide helps retailers and 
          fashion enthusiasts make the best fabric choices for every season and silhouette.
        </p>

        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Cotton vs. Silk – Which Works Best for Ethnic Wear?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-2">Cotton</h3>
              <ul className="list-disc pl-6">
                <li>Breathable and comfortable</li>
                <li>Ideal for daily wear</li>
                <li>Perfect for pujas and summer weddings</li>
                <li>Easy to maintain</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Silk</h3>
              <ul className="list-disc pl-6">
                <li>Rich in texture and drape</li>
                <li>Ideal for formal occasions</li>
                <li>Perfect for festive wear</li>
                <li>Premium choice for bridal wear</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Seasonal Fabric Choices – What to Use in Summer vs. Winter?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-2">Summer Fabrics</h3>
              <ul className="list-disc pl-6">
                <li>Khadi</li>
                <li>Mulmul</li>
                <li>Linen</li>
                <li>Cotton blends</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Winter Fabrics</h3>
              <ul className="list-disc pl-6">
                <li>Velvet</li>
                <li>Brocade</li>
                <li>Raw Silk</li>
                <li>Pashmina</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 italic">
            Pro tip: Layered styling with organza dupattas adds elegance across seasons.
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Sustainable Fabric Options – Eco-Friendly Choices for Retailers
          </h2>
          <p>
            The fashion industry is embracing sustainability, and ethnic wear is no exception. 
            Consider these eco-friendly options:
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li>Organic cotton</li>
            <li>Ahimsa silk</li>
            <li>Hemp</li>
            <li>Recycled fabrics</li>
          </ul>
          <p className="mt-4">
            These sustainable choices not only appeal to environmentally conscious consumers but 
            also offer unique selling points for retailers.
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Fabric Care & Maintenance – Ensuring Longevity
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Essential Care Tips</h3>
            <ul className="list-disc pl-6">
              <li>Use gentle detergents for delicate fabrics</li>
              <li>Dry-clean silk and embroidered garments</li>
              <li>Store in muslin cloth to preserve texture and color</li>
              <li>Keep away from direct sunlight</li>
              <li>Use proper hangers to maintain shape</li>
            </ul>
          </div>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
          <p>
            The right fabric doesn't just create a garment — it crafts an experience. 
            By understanding fabric properties, seasonal suitability, and care requirements, 
            retailers can build a collection that satisfies diverse customer needs while 
            maintaining quality and sustainability.
          </p>
        </section>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="list-disc pl-6">
            <li>Choose fabrics based on occasion and season</li>
            <li>Consider sustainability in fabric selection</li>
            <li>Proper care extends garment life</li>
            <li>Balance traditional appeal with modern comfort</li>
          </ul>
        </div>
      </div>
    </article>
  )
} 