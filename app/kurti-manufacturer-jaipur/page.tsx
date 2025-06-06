import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Script from "next/script"
import { siteConfig } from "@/lib/constants"

export const metadata = {
  title: "Best Kurti Manufacturer in Jaipur | Ethnics by Aravalli",
  description:
    "Looking for premium Kurti manufacturing in Jaipur? Ethnics by Aravalli offers high-quality designs, sustainable fabrics, and bulk production for boutique owners. Contact us today!",
  openGraph: {
    title: "Best Kurti Manufacturer in Jaipur | Ethnics by Aravalli",
    description: "Looking for premium Kurti manufacturing in Jaipur? Ethnics by Aravalli offers high-quality designs, sustainable fabrics, and bulk production for boutique owners. Contact us today!",
    images: [
      {
        url: "/og-kurti-manufacturer-jaipur.jpg",
        width: 1200,
        height: 630,
        alt: "Premium Kurti Manufacturer in Jaipur - Ethnics by Aravalli",
      },
    ],
  },
  keywords: [
    "kurti manufacturer",
    "Jaipur ethnic wear supplier",
    "wholesale kurti",
    "custom kurtis",
    "best kurti manufacturer",
    "kurti manufacturer in Jaipur",
    "wholesale kurti supplier",
    "boutique kurti manufacturer",
    "private label kurtis",
    "Jaipur textile manufacturer",
  ],
};

export default function KurtiManufacturerJaipurPage() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Ethnics by Aravalli",
            "url": "https://ethnicsbyaravalli.com/kurti-manufacturer-jaipur",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": siteConfig.phone,
              "contactType": "Customer Service"
            }
          })
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative mb-20 mt-20">
          <div className="relative w-full h-[340px] md:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="https://ekohum.com/cdn/shop/files/DT9462_4.jpg?v=1732085776"
              alt="Premium Kurti Manufacturer in Jaipur - Ethnics by Aravalli"
              fill
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/10 flex flex-col justify-center items-center text-center rounded-3xl z-10">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                Leading Kurti Manufacturer in Jaipur
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto">
                Premium Quality, Sustainable Fabrics, Expert Craftsmanship
              </p>
              <Link href="/contact">
                <Button className="bg-[#D9A8A0] hover:bg-[#C08478] text-white border-0 rounded-full text-lg px-8 py-3 shadow-lg">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-8">
              Ethnics by Aravalli is a trusted kurti manufacturer in Jaipur, providing premium ethnic wear to boutique owners and retailers. Our kurtis blend traditional craftsmanship with modern elegance, ensuring exceptional quality, customization options, and ethical production.
            </p>
            <div className="flex justify-center">
              <Link href="/contact">
                <Button className="bg-[#D9A8A0] hover:bg-[#C08478] text-white border-0 rounded-full text-lg px-8 py-3 shadow-lg">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Why Choose Us as Your Kurti Manufacturer?
            </h2>
            <p className="text-lg text-gray-600">
              We specialize in high-end kurti production, offering premium quality and customization.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-[#D9A8A0]/10 rounded-full flex items-center justify-center mb-6">
                <Leaf className="h-6 w-6 text-[#D9A8A0]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Fabrics</h3>
              <p className="text-gray-600">
                Cotton, chanderi, muslin, rayon, silk - only the finest materials.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-[#D9A8A0]/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-[#D9A8A0]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Trend-Driven Designs</h3>
              <p className="text-gray-600">
                Latest patterns and styles for boutique retailers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-[#D9A8A0]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-[#D9A8A0]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Bulk Production</h3>
              <p className="text-gray-600">
                Wholesale supply with reliable scaling options.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-[#D9A8A0]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-[#D9A8A0]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Customization</h3>
              <p className="text-gray-600">
                Private labeling and exclusive branding for your business.
              </p>
            </div>
          </div>
        </section>

        {/* Manufacturing Process */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Our Kurti Manufacturing Process
            </h2>
            <p className="text-lg text-gray-600">
              From fabric selection to final quality check, we maintain the highest standards.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Fabric Selection & Cutting</h3>
              <p className="text-gray-600">
                We use high-quality textiles, ensuring comfort, durability, and vibrant prints.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Stitching & Embroidery Work</h3>
              <p className="text-gray-600">
                Artisans expertly craft our embroidered, handwork, and machine-stitched kurtis.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Quality Control Checks</h3>
              <p className="text-gray-600">
                Rigorous quality assurance ensuring durability and defect-free production.
              </p>
            </div>
          </div>
        </section>

        {/* Ethical Production */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ethical & Sustainable Production
            </h2>
            <p className="text-lg text-gray-600">
              We follow responsible fashion practices in everything we do.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Fair Trade & Ethical Labor</h3>
              <p className="text-gray-600">
                Supporting artisans with fair wages and safe working conditions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Sustainable Fabrics</h3>
              <p className="text-gray-600">
                Organic cotton, eco-friendly dyes, and minimal waste production.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Transparency</h3>
              <p className="text-gray-600">
                Verified sustainable fashion supplier with proper certifications.
              </p>
            </div>
          </div>
        </section>

        {/* Bulk Orders */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Bulk Orders & Customization Options
            </h2>
            <p className="text-lg text-gray-600">
              We cater to boutique owners, retailers, and wholesalers with flexible solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Exclusive Collections</h3>
              <p className="text-gray-600">
                Custom designs tailored specifically for your brand.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Private Labeling</h3>
              <p className="text-gray-600">
                Your logo, packaging, and tags for complete brand identity.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Competitive Pricing</h3>
              <p className="text-gray-600">
                Fast production without compromising on quality standards.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-24">
          <div className="bg-[#D9A8A0]/10 rounded-3xl p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Contact Us Today!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Looking for premium kurti manufacturing in Jaipur? Get in touch!
              </p>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-white/50 transition-colors"
                >
                  <Phone className="h-8 w-8 text-[#D9A8A0] mb-4" />
                  <p className="font-semibold">Call Us</p>
                  <p className="text-gray-600">{siteConfig.phone}</p>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-white/50 transition-colors"
                >
                  <Mail className="h-8 w-8 text-[#D9A8A0] mb-4" />
                  <p className="font-semibold">Email Us</p>
                  <p className="text-gray-600">{siteConfig.email}</p>
                </a>
                <a
                  href="https://maps.google.com/?q=26.858194,75.830806"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-white/50 transition-colors"
                >
                  <MapPin className="h-8 w-8 text-[#D9A8A0] mb-4" />
                  <p className="font-semibold">Visit Us</p>
                  <p className="text-gray-600">{siteConfig.address}</p>
                </a>
              </div>
              <Link href="/contact">
                <Button className="bg-[#D9A8A0] hover:bg-[#C08478] text-white border-0 rounded-full text-lg px-8 py-3 shadow-lg">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
} 