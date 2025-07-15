import React from 'react';
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Leaf, ShieldCheck, Users, BadgeCheck, Truck, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Script from "next/script"
import { siteConfig } from "@/lib/constants"

export const metadata = {
  title: "Ethnic Wear Manufacturer India | Custom & Wholesale Supplier",
  description: "India's leading ethnic wear manufacturer. Custom designs, sustainable fabrics, and fast turnaround for boutiques and designers. Contact us today!",
  openGraph: {
    title: "Ethnic Wear Manufacturer India | Custom & Wholesale Supplier",
    description: "India's leading ethnic wear manufacturer. Custom designs, sustainable fabrics, and fast turnaround for boutiques and designers. Contact us today!",
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
    "ethnic wear supplier",
    "ethnic wear exporter",
    "designer ethnic wear",
    "women's ethnic wear manufacturer",
    "men's ethnic wear manufacturer",
    "kids ethnic wear manufacturer",
    "private label ethnic wear",
    "bulk ethnic wear supplier",
    "ethnic wear for boutiques",
    "ethnic wear for retailers",
    "custom ethnic dress manufacturer",
    "kurti manufacturer",
    "lehenga manufacturer",
    "saree manufacturer",
    "salwar suit manufacturer",
    "ethnic gown manufacturer",
    "Indian ethnic wear manufacturer",
    "ethnic wear factory India",
    "ethnic wear OEM",
    "ethnic wear ODM",
    "sustainable ethnic wear",
  ],
};

const heroBg = "/products/hero_banner_1.jpg";

const stats = [
  { icon: Users, label: "500+ Happy Clients" },
  { icon: BadgeCheck, label: "100% In-House Production" },
  { icon: Truck, label: "Pan-India Delivery" },
  { icon: Clock, label: "Fast Turnaround" }
]

const features = [
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description: "We source premium, eco-friendly fabrics and implement sustainable manufacturing practices."
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Rigorous quality control at every stage ensures perfect finishing and durability."
  },
  {
    icon: CheckCircle2,
    title: "Custom Solutions",
    description: "Tailored manufacturing solutions to meet your specific design and quality requirements."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Efficient logistics and pan-India shipping for all orders."
  }
]

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
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center">
          <Image
            src={heroBg}
            alt="Ethnic Wear Manufacturer Hero"
            fill
            priority
            className="object-cover w-full h-full absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-[#D9A8A0]/70 z-10" />
          <div className="relative z-20 flex flex-col items-center text-center px-4 py-24">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">Ethnic Wear Manufacturer in India</h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl">Premium Quality, Sustainable Fabrics, Expert Craftsmanship</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-block">
                <button className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition">Contact Us</button>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2E1B1B] mb-12">Why Choose Us for Custom Ethnic Fashion?</h2>
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

        {/* Manufacturing Process */}
        <section className="mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Our Manufacturing Process
              </h2>
              <p className="text-lg text-gray-600">
                From design to delivery, we maintain the highest standards in ethnic wear manufacturing.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">3. Finishing & Packaging</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Final inspection</li>
                  <li>• Ironing and folding</li>
                  <li>• Premium packaging</li>
                  <li>• Branding and labeling</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">4. Dispatch & Delivery</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Secure shipping</li>
                  <li>• Pan-India & international delivery</li>
                  <li>• Real-time tracking</li>
                  <li>• On-time order fulfillment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What We Make Section */}
        <section className="py-16 md:py-24 bg-gray-50 mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Types of Ethnic Wear We Offer
              </h2>
              <p className="text-lg text-gray-600 max-w-7xl mx-auto text-justify">
                Explore our premium ethnic wear collection, crafted with precision in Jaipur.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {/* Kurtas */}
              <div className="group relative overflow-hidden rounded-lg h-[500px] flex flex-col">
                <div className="relative w-full h-72 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DS5853_2.jpg?v=1741256083"
                    alt="Kurtas Collection"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 rounded-lg w-full h-full"
                  />
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DS5853_10.jpg?v=1741256083"
                    alt="Kurtas Collection Hover"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg w-full h-full"
                  />
                </div>
                <div className="p-4 bg-white flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Kurtas</h3>
                    <p className="text-gray-600 mb-4 text-left w-full">Our premium kurtas blend traditional craftsmanship with modern designs, crafted with fine fabrics like cotton, muslin, and chanderi for effortless elegance and comfort.</p>
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
                <div className="relative w-full h-72 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DSC_0596.jpg?v=1717780319"
                    alt="Kurta Sets Collection"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 rounded-lg w-full h-full"
                  />
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DSC_0651.jpg?v=1717780319"
                    alt="Kurta Sets Collection Hover"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg w-full h-full"
                  />
                </div>
                <div className="p-4 bg-white flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Kurta Sets</h3>
                    <p className="text-gray-600 mb-4 text-left w-full">Elevate your wardrobe with our designer kurta sets, featuring intricate embroidery, tailored fits, and luxurious fabrics, perfect for contemporary ethnic fashion.</p>
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
                <div className="relative w-full h-72 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DW3962__1.jpg?v=1725534156"
                    alt="Suit Sets Collection"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 rounded-lg w-full h-full"
                  />
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DW3962_4.jpg?v=1725534157"
                    alt="Suit Sets Collection Hover"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg w-full h-full"
                  />
                </div>
                <div className="p-4 bg-white flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Suit Sets</h3>
                    <p className="text-gray-600 mb-4 text-left w-full">Explore timeless ethnic suit sets, designed with premium materials and elegant cuts, ideal for festive occasions, office wear, and boutique collections.</p>
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

        {/* Final CTA */}
        <section className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2E1B1B] mb-6">Ready to Stock Premium Ethnic Wear?</h2>
          <p className="text-lg text-[#4A3A3A] mb-8">Partner with us for boutique-ready, premium ethnic wear and experience the difference in quality and service.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition">Get in Touch</button>
            </Link>
            <Link href="https://wa.me/919828422208">
              <button className="bg-white border border-[#25D366] text-[#25D366] font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition hover:bg-[#25D366]/10 flex items-center gap-2">
                WhatsApp Us
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
} 