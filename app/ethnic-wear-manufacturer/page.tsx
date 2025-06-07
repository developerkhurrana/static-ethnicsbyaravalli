import React from 'react';
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Leaf, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Script from "next/script"
import { siteConfig } from "@/lib/constants"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata = {
  title: "Premium Ethnic Wear Manufacturer in India | Custom Ethnic Fashion Production",
  description:
    "India&apos;s leading ethnic wear manufacturer offering premium quality, sustainable fabrics, and expert craftsmanship. Specializing in custom ethnic fashion production for boutiques and designers worldwide. Get competitive pricing and fast turnaround.",
  openGraph: {
    title: "Premium Ethnic Wear Manufacturer in India | Custom Ethnic Fashion Production",
    description: "India&apos;s leading ethnic wear manufacturer offering premium quality, sustainable fabrics, and expert craftsmanship. Specializing in custom ethnic fashion production for boutiques and designers worldwide.",
    images: [
      {
        url: "/og-ethnic-wear-manufacturer.jpg",
        width: 1200,
        height: 630,
        alt: "Premium Ethnic Wear Manufacturer in India - Custom Ethnic Fashion Production",
      },
    ],
  },
  keywords: [
    "ethnic wear manufacturer",
    "premium ethnic wear",
    "custom ethnic fashion",
    "handcrafted ethnic apparel",
    "boutique supplier",
    "ethnic wear manufacturer in India",
    "custom ethnic wear production",
    "wholesale ethnic wear",
    "ethnic fashion manufacturer",
    "traditional wear manufacturer",
  ],
};

export default function EthnicWearManufacturerPage() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": siteConfig.name,
            "description": "Premium ethnic wear manufacturer specializing in custom ethnic fashion production",
            "url": "https://ethnicsbyaravalli.com/ethnic-wear-manufacturer",
            "logo": "https://ethnicsbyaravalli.com/logo.png",
            "sameAs": [
              "https://www.instagram.com/ethnicsbyaravalli",
              "https://www.facebook.com/ethnicsbyaravalli"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            }
          })
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative mb-20 mt-20">
          <div className="relative w-full h-[340px] md:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="https://ekohum.com/cdn/shop/files/DT9462_6.jpg?v=1732085776"
              alt="Premium Ethnic Wear Manufacturer in India - Custom Ethnic Fashion Production"
              fill
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/10 flex flex-col justify-center items-center text-center rounded-3xl z-10">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                India&apos;s Leading Ethnic Wear Manufacturer
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto">
                Premium Quality, Sustainable Fabrics, Expert Craftsmanship
              </p>
              <Button className="px-8 py-3 rounded-full bg-gradient-to-b from-[#D9A8A0] to-[#C08478] text-white text-lg hover:shadow-xl transition duration-200 focus:ring-2 focus:ring-[#D9A8A0]/50">
                Contact Us
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Why Choose Our Ethnic Wear Manufacturing?
            </h2>
            <p className="text-lg text-gray-600">
              As a leading ethnic wear manufacturer in India, we combine traditional craftsmanship with modern production techniques to deliver exceptional quality.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-[#D9A8A0]/10 rounded-full flex items-center justify-center mb-6">
                <Leaf className="h-6 w-6 text-[#D9A8A0]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Sustainable Materials</h3>
              <p className="text-gray-600">
                We source premium, eco-friendly fabrics and implement sustainable manufacturing practices.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-[#D9A8A0]/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-[#D9A8A0]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                Rigorous quality control at every stage ensures perfect finishing and durability.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-[#D9A8A0]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-[#D9A8A0]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Custom Solutions</h3>
              <p className="text-gray-600">
                Tailored manufacturing solutions to meet your specific design and quality requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Manufacturing Process */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Our Manufacturing Process
            </h2>
            <p className="text-lg text-gray-600">
              From design to delivery, we maintain the highest standards in ethnic wear manufacturing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">1. Design & Development</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Custom design consultation</li>
                <li>• Pattern making and sampling</li>
                <li>• Material selection and testing</li>
                <li>• Prototype development</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">2. Production & Quality Control</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• State-of-the-art manufacturing</li>
                <li>• Multiple quality checkpoints</li>
                <li>• Sustainable production practices</li>
                <li>• Efficient turnaround times</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What We Make Section */}
        <section className="py-16 md:py-24 bg-gray-50 mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What We Make
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our premium ethnic wear collection, crafted with precision in Jaipur.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {/* Kurtas */}
              <div className="group relative overflow-hidden rounded-lg h-[500px] flex flex-col">
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DS5853_2.jpg?v=1741256083"
                    alt="Kurtas Collection"
                    fill
                    className="object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 rounded-lg"
                  />
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DS5853_10.jpg?v=1741256083"
                    alt="Kurtas Collection Hover"
                    fill
                    className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg"
                  />
                </div>
                <div className="p-4 bg-white flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Kurtas</h3>
                    <p className="text-gray-600 mb-4">Our premium kurtas blend traditional craftsmanship with modern designs, crafted with fine fabrics like cotton, muslin, and chanderi for effortless elegance and comfort.</p>
                  </div>
                  <Button 
                    className="w-full mt-auto px-8 py-2 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 hover:shadow-xl transition duration-200 focus:ring-2 focus:ring-gray-300/50" 
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              {/* Kurta Sets */}
              <div className="group relative overflow-hidden rounded-lg h-[500px] flex flex-col">
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DSC_0596.jpg?v=1717780319"
                    alt="Kurta Sets Collection"
                    fill
                    className="object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 rounded-lg"
                  />
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DSC_0651.jpg?v=1717780319"
                    alt="Kurta Sets Collection Hover"
                    fill
                    className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg"
                  />
                </div>
                <div className="p-4 bg-white flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Kurta Sets</h3>
                    <p className="text-gray-600 mb-4">Elevate your wardrobe with our designer kurta sets, featuring intricate embroidery, tailored fits, and luxurious fabrics, perfect for contemporary ethnic fashion.</p>
                  </div>
                  <Button 
                    className="w-full mt-auto px-8 py-2 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 hover:shadow-xl transition duration-200 focus:ring-2 focus:ring-gray-300/50" 
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              {/* Suit Sets */}
              <div className="group relative overflow-hidden rounded-lg h-[500px] flex flex-col">
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DW3962__1.jpg?v=1725534156"
                    alt="Suit Sets Collection"
                    fill
                    className="object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 rounded-lg"
                  />
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DW3962_4.jpg?v=1725534157"
                    alt="Suit Sets Collection Hover"
                    fill
                    className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg"
                  />
                </div>
                <div className="p-4 bg-white flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Suit Sets</h3>
                    <p className="text-gray-600 mb-4">Explore timeless ethnic suit sets, designed with premium materials and elegant cuts, ideal for festive occasions, office wear, and boutique collections.</p>
                  </div>
                  <Button 
                    className="w-full mt-auto px-8 py-2 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 hover:shadow-xl transition duration-200 focus:ring-2 focus:ring-gray-300/50" 
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-24">
          <div className="bg-[#D9A8A0]/10 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Start Your Ethnic Wear Collection?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Partner with India&apos;s trusted ethnic wear manufacturer for premium quality and exceptional service.
            </p>
            <Button className="px-8 py-3 rounded-full bg-gradient-to-b from-[#D9A8A0] to-[#C08478] text-white text-lg hover:shadow-xl transition duration-200 focus:ring-2 focus:ring-[#D9A8A0]/50">
              Contact Us
            </Button>
          </div>
        </section>
      </div>
    </>
  )
} 