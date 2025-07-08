"use client";

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  name: string
  description: string
  images: string[]
}

export function ProductCard({ name, description, images }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleMouseEnter = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const handleMouseLeave = () => {
    setCurrentImageIndex(0)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="relative aspect-[4/5]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={images[currentImageIndex]}
          alt={name}
          fill
          className="object-cover transition-opacity duration-300"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors" />
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          {/* <div className="flex gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center flex-1 rounded-md bg-[#D9A8A0] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#C08478] transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href={`https://wa.me/919828422208?text=Hi, I'm interested in ${name}`}
              target="_blank"
              className="inline-flex items-center justify-center flex-1 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </Link>
          </div> */}
        </div>
      </CardContent>
    </Card>
  )
} 