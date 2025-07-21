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
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <Image
            src={heroBg}
            alt="Ethnic Wear Manufacturer Hero"
            fill
            priority
            className="object-cover w-full h-full absolute inset-0 z-0"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-pink-900/40 z-10" />
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-pink-100/20" />
          <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob z-10"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000 z-10"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000 z-10"></div>
          
          <div className="relative z-10 text-center px-4 py-24 max-w-6xl mx-auto">
            <div className="mb-6 bg-pink-100 text-pink-800 hover:bg-pink-200 border border-pink-300 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Premium Ethnic Wear Manufacturer
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-6 leading-tight">
              Ethnic Wear Manufacturer in{" "}
              <span className="bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
                India
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              India's leading ethnic wear manufacturer. Custom designs, sustainable fabrics, and fast turnaround for boutiques and designers.
              <span className="font-semibold text-white"> Premium quality, expert craftsmanship.</span>
            </p>
            
            {/* Stats Section */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-200 mb-1">25+</div>
                <div className="text-sm text-pink-100">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-rose-200 mb-1">500+</div>
                <div className="text-sm text-pink-100">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-200 mb-1">24/7</div>
                <div className="text-sm text-pink-100">Support</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-3">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3 flex items-center gap-2">
                <Link href="https://wa.me/919828422208">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp Inquiry
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-pink-100">
              <div className="flex items-center">
                <BadgeCheck className="w-4 h-4 text-pink-200 mr-2" />
                ISO Certified
              </div>
              <div className="flex items-center">
                <Truck className="w-4 h-4 text-rose-200 mr-2" />
                Pan India Delivery
              </div>
              <div className="flex items-center">
                <ShieldCheck className="w-4 h-4 text-red-200 mr-2" />
                Quality Guaranteed
              </div>
            </div>
          </div>
        </section>



        {/* Why Choose Us Feature Grid */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-800 text-sm font-medium mb-4">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Why Choose Us
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Us for{" "}
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Custom Ethnic Fashion?
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover what makes us the preferred choice for premium ethnic wear manufacturing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Process */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-800 text-sm font-medium mb-4">
                <Leaf className="w-4 h-4 mr-2" />
                Our Process
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Manufacturing Process
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From design to delivery, we maintain the highest standards in ethnic wear manufacturing with a proven 4-step process.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
                <div className="absolute top-4 right-4 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 group-hover:text-pink-600 transition-colors duration-300 pr-16">
                  Design & Development
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Custom design consultation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Pattern making and sampling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Material selection and testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Prototype development</span>
                  </li>
                </ul>
              </div>
              
              <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
                <div className="absolute top-4 right-4 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 group-hover:text-pink-600 transition-colors duration-300 pr-16">
                  Production & Quality Control
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>State-of-the-art manufacturing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Multiple quality checkpoints</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Sustainable production practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Efficient turnaround times</span>
                  </li>
                </ul>
              </div>
              
              <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
                <div className="absolute top-4 right-4 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 group-hover:text-pink-600 transition-colors duration-300 pr-16">
                  Finishing & Packaging
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Final inspection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Ironing and folding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Premium packaging</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Branding and labeling</span>
                  </li>
                </ul>
              </div>
              
              <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
                <div className="absolute top-4 right-4 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  4
                </div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 group-hover:text-pink-600 transition-colors duration-300 pr-16">
                  Dispatch & Delivery
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Secure shipping</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Pan-India & international delivery</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Real-time tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>On-time order fulfillment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What We Make Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-800 text-sm font-medium mb-4">
                <Leaf className="w-4 h-4 mr-2" />
                Our Collections
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Types of{" "}
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Ethnic Wear We Offer
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our premium ethnic wear collection, crafted with precision in Jaipur.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Kurtas */}
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative w-full h-80 overflow-hidden">
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DS5853_2.jpg?v=1741256083"
                    alt="Kurtas Collection"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-bold drop-shadow-lg">Kurtas</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors duration-300">Kurtas</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">Our premium kurtas blend traditional craftsmanship with modern designs, crafted with fine fabrics like cotton, muslin, and chanderi for effortless elegance and comfort.</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105" 
                    asChild
                  >
                    <Link href="/contact">Inquire for Kurtas</Link>
                  </Button>
                </div>
              </div>
              
              {/* Kurta Sets */}
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative w-full h-80 overflow-hidden">
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DSC_0596.jpg?v=1717780319"
                    alt="Kurta Sets Collection"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-bold drop-shadow-lg">Kurta Sets</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors duration-300">Kurta Sets</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">Elevate your wardrobe with our designer kurta sets, featuring intricate embroidery, tailored fits, and luxurious fabrics, perfect for contemporary ethnic fashion.</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105" 
                    asChild
                  >
                    <Link href="/contact">Inquire for Kurta Sets</Link>
                  </Button>
                </div>
              </div>
              
              {/* Suit Sets */}
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative w-full h-80 overflow-hidden">
                  <Image
                    src="https://ekohum.com/cdn/shop/files/DW3962__1.jpg?v=1725534156"
                    alt="Suit Sets Collection"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-bold drop-shadow-lg">Suit Sets</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors duration-300">Suit Sets</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">Explore timeless ethnic suit sets, designed with premium materials and elegant cuts, ideal for festive occasions, office wear, and boutique collections.</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105" 
                    asChild
                  >
                    <Link href="/contact">Inquire for Suit Sets</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO-Optimized Summary Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-sm max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Premium Ethnic Wear Manufacturer in India - Your Trusted Partner for Custom Ethnic Fashion
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Welcome to <strong>Ethnics by Aravalli</strong>, India's leading ethnic wear manufacturer specializing in custom ethnic fashion production for boutiques, designers, and retailers. We are dedicated to crafting exceptional ethnic wear that combines traditional Indian aesthetics with contemporary comfort, offering fashion entrepreneurs across India access to premium quality ethnic apparel at competitive wholesale prices.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Our extensive collection of ethnic wear encompasses everything from elegant <Link href="/kurta-manufacturer" className="text-pink-600 hover:text-pink-700 underline font-medium">kurtas</Link> and traditional <Link href="/kurta-sets-manufacturer" className="text-pink-600 hover:text-pink-700 underline font-medium">kurta sets</Link> to modern <Link href="/suit-sets-manufacturer" className="text-pink-600 hover:text-pink-700 underline font-medium">suit sets</Link> and designer ethnic apparel. Each piece in our collection is meticulously crafted using premium fabrics including pure cotton, silk, georgette, chanderi, and other natural materials that ensure breathability, comfort, and durability. As a leading ethnic wear manufacturer in India, we understand the diverse needs of modern fashion and create designs that celebrate both tradition and contemporary trends.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Whether you're a boutique owner looking to stock the latest ethnic wear trends, a retailer seeking reliable wholesale ethnic wear suppliers, or a fashion entrepreneur wanting to partner with a trusted ethnic wear manufacturer in India, our comprehensive range of ethnic apparel caters to every business requirement. Our ethnic wear collection is perfect for various occasions including daily wear, office wear, <Link href="/festive-ethnic-wear-2025" className="text-pink-600 hover:text-pink-700 underline font-medium">festivals</Link>, weddings, parties, and special celebrations, making them ideal for retailers serving diverse customer segments.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                As a professional ethnic wear manufacturer, we prioritize quality control at every stage of production. From design and pattern making to fabric selection, cutting, stitching, and final finishing, each piece undergoes rigorous quality checks to ensure it meets our high standards. Our commitment to excellence has made us one of the most trusted ethnic wear manufacturers in India, serving clients across the country with reliable wholesale ethnic wear supply and timely delivery services.
              </p>

              <div className="bg-pink-50 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Explore Our Comprehensive Collection of Ethnic Wear
                </h3>
                <p className="text-gray-700 mb-4">
                  Our wholesale ethnic wear catalog includes:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                    <Link href="/kurta-manufacturer" className="hover:text-pink-600 transition-colors">Kurtas</Link>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                    <Link href="/kurta-sets-manufacturer" className="hover:text-pink-600 transition-colors">Kurta Sets</Link>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                    <Link href="/suit-sets-manufacturer" className="hover:text-pink-600 transition-colors">Suit Sets</Link>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                    <Link href="/dress-manufacturer" className="hover:text-pink-600 transition-colors">Designer Ethnic Wear</Link>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                    <Link href="/kaftan-manufacturer" className="hover:text-pink-600 transition-colors">Traditional Wear</Link>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                    <Link href="/top-kurti-manufacturer-in-jaipur" className="hover:text-pink-600 transition-colors">Custom Designs</Link>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                    <Link href="/top-kurti-wholesaler-in-jaipur" className="hover:text-pink-600 transition-colors">Private Label</Link>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
                    <Link href="/festive-wear" className="hover:text-pink-600 transition-colors">Sustainable Ethnic Wear</Link>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Shopping for wholesale ethnic wear online has never been easier. Our user-friendly catalog system allows retailers and boutique owners to browse our extensive ethnic wear collection, select their preferred styles, and place bulk orders with just a few clicks. We understand the importance of seamless business operations and strive to provide a hassle-free wholesale shopping experience with detailed product information, size charts, and competitive pricing.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Our commitment to sustainable and ethical fashion practices sets us apart as a responsible ethnic wear manufacturer. We work closely with trusted fabric suppliers who share our values, ensuring that all materials used in our ethnic wear are responsibly sourced and of the highest quality. By choosing Ethnics by Aravalli as your ethnic wear manufacturer, you're supporting ethical manufacturing practices while offering your customers premium quality ethnic apparel.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Experience the perfect blend of tradition and modernity with our exclusive collection of ethnic wear. Whether you're looking for comfortable daily wear <Link href="/kurta-manufacturer" className="text-pink-600 hover:text-pink-700 underline font-medium">kurtas</Link>, elegant <Link href="/kurta-sets-manufacturer" className="text-pink-600 hover:text-pink-700 underline font-medium">kurta sets</Link> for special occasions, or modern <Link href="/suit-sets-manufacturer" className="text-pink-600 hover:text-pink-700 underline font-medium">suit sets</Link> for professional settings, our wholesale ethnic wear collection has something for every occasion and customer preference. Partner with us, India's leading ethnic wear manufacturer, and elevate your retail business with premium quality ethnic apparel that your customers will love.
              </p>
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