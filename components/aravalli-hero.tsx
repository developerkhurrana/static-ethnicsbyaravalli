"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Palette, Star, Calendar } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export default function AravalliHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-orange-200 via-red-100 to-yellow-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-orange-100/60" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 text-center px-4 py-24 max-w-6xl mx-auto">
        <Badge className="mb-6 bg-orange-200 text-orange-900 hover:bg-orange-300 border border-orange-300">
          <Sparkles className="w-4 h-4 mr-2" />
          Aravalli Clothing 2025
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-orange-900 mb-6 leading-tight drop-shadow-lg">
          Aravalli Clothing Collection{" "}
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            2025
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-orange-800 mb-8 max-w-4xl mx-auto leading-relaxed">
          Discover the essence of Jaipur's ethnic wear with the Aravalli Clothing collection. Each piece is a blend of tradition, craftsmanship, and contemporary design.
          <span className="font-semibold text-orange-900"> Wholesale prices for boutiques and retailers.</span>
        </p>
        
        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-1">20+</div>
            <div className="text-sm text-orange-700">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-1">500+</div>
            <div className="text-sm text-orange-700">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-1">100%</div>
            <div className="text-sm text-orange-700">In-House Production</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3">
            <Link href="/contact">Get Aravalli Catalog</Link>
          </Button>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3 flex items-center gap-2">
            <Link href="https://wa.me/916377012120">
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp Inquiry
            </Link>
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-orange-700">
          <div className="flex items-center">
            <Palette className="w-4 h-4 text-orange-500 mr-2" />
            Modern Ethnic Styles
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-red-500 mr-2" />
            Quality Craftsmanship
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-2" />
            Sustainable Fabrics
          </div>
        </div>
      </div>
    </section>
  )
}
