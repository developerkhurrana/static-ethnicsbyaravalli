import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <Image
          src="/products/hero_banner_1.jpg"
          alt="Top Kurti Wholesaler in Jaipur"
          fill
          priority
          className="object-cover w-full h-full absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-4 py-24">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">Top Kurti Wholesaler in Jaipur</h1>
          <h2 className="text-lg md:text-2xl text-white/90 mb-6 max-w-2xl">Premium Kurtis at True Wholesale Prices – Direct from the Manufacturer</h2>
          <p className="text-white/80 mb-8 max-w-xl text-base md:text-lg">
            We are Jaipur&apos;s leading kurti manufacturer, supplying boutiques, retailers, and resellers across India and abroad. Get factory-direct pricing, bulk order support, and the latest styles – all under one roof.
          </p>
          <Link href="/contact" className="inline-block">
            <button className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition flex items-center gap-2">
              Get Wholesale Catalog <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Why Buy Wholesale from Us */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2E1B1B] mb-10">Why Choose Us as Your Kurti Wholesaler?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F9F6F4] rounded-xl p-8 shadow-md flex flex-col items-center text-center">
            <h3 className="font-bold text-xl mb-2">Direct from Manufacturer</h3>
            <p className="text-[#4A3A3A]">No middlemen, no markups. You get true factory prices and direct access to our production team for custom/bulk orders.</p>
          </div>
          <div className="bg-[#F9F6F4] rounded-xl p-8 shadow-md flex flex-col items-center text-center">
            <h3 className="font-bold text-xl mb-2">Bulk &amp; Private Label Orders</h3>
            <p className="text-[#4A3A3A]">We specialize in B2B, boutique, and reseller orders. Customization, private label, and fast dispatch available for all bulk clients.</p>
          </div>
          <div className="bg-[#F9F6F4] rounded-xl p-8 shadow-md flex flex-col items-center text-center">
            <h3 className="font-bold text-xl mb-2">Latest Styles, Best Quality</h3>
            <p className="text-[#4A3A3A]">Stay ahead of trends with our ever-evolving collection. Every kurti is crafted with premium fabrics and expert finishing.</p>
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
            Our Best-Selling Wholesale Kurtis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <div key={idx} className="bg-[#F9F6F4] rounded-xl shadow-md p-6 flex flex-col items-center text-center h-full">
                <Image src={product.image} alt={product.name} width={200} height={260} className="rounded-lg mb-4 object-cover" />
                <div className="flex flex-col justify-end flex-1 w-full mt-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-[#4A3A3A] text-sm">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2E1B1B] mb-8">How to Order Wholesale Kurtis</h2>
        <ol className="list-decimal list-inside space-y-4 text-lg text-[#4A3A3A]">
          <li><b>Contact Us:</b> Reach out via our <Link href="/contact" className="text-[#D9A8A0] underline">contact form</Link> or WhatsApp for your requirements.</li>
          <li><b>Get Catalog &amp; Pricing:</b> We&apos;ll send you our latest wholesale catalog and best prices.</li>
          <li><b>Place Your Order:</b> Confirm your selection, quantity, and any customizations.</li>
          <li><b>Fast Dispatch:</b> We manufacture and ship your order quickly, anywhere in India or abroad.</li>
        </ol>
      </section>

      {/* Final CTA */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2E1B1B] mb-6">Ready to Stock Your Store with Jaipur&apos;s Best Kurtis?</h2>
        <p className="text-lg text-[#4A3A3A] mb-8">Partner with the top kurti manufacturer and wholesaler in Jaipur. Get unbeatable prices, quality, and service.</p>
        <Link href="/contact">
          <button className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition">Get Wholesale Pricing</button>
        </Link>
      </section>
    </div>
  );
} 