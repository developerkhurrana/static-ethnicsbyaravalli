"use client"

import Image from "next/image"
import Link from "next/link"
import { Package, Truck, Scissors, Ruler, Factory, IndianRupee } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from "react"
import { FlipWords } from "@/components/ui/flip-words"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"

const heroImages = [
  "/products/hero_banner.jpg"
]

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Background Carousel */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {heroImages.map((image, index) => (
                <div key={index} className="embla__slide relative min-h-[90vh]">
                  <Image
                    src={image}
                    alt={`Hero image ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Premium{"  "}
              <span className="inline-block">
                <FlipWords
                  words={["Kurti", "Kurti Sets", "Suit Sets", "Co-ord Sets", "Kaftans", "Dresses", "Anarkalis", "Tops", "Tunics"]}
                  className="text-[#D9A8A0]"
                />
              </span>
              Manufacturer in <br />Jaipur
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Custom Designs · Bulk Orders · Private Label · Fast Dispatch
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[#D9A8A0] px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-[#C08478]"
              >
                Contact Us
              </Link>
              <Link
                href="https://wa.me/919828422208"
                target="_blank"
                className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10"
              >
                Whatsapp Us
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Indicators - Only show if there are multiple images */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === selectedIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center justify-center text-center w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">Who We Are</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 drop-shadow">
              Ethnics by Aravalli is a premium manufacturer of Indian ethnic wear for women, based in Jaipur. We create beautiful, high-quality Kurtas, Dresses, Anarkalis, Kaftans, and more—crafted by skilled designers and artisans, using the finest fabrics and prints.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[#D9A8A0] px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-[#C08478]"
              >
                Contact Us
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What we make Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Make
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our premium collection of ethnic wear, crafted with precision in Jaipur.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-lg h-[500px] flex flex-col">
              <div className="relative overflow-hidden rounded-lg w-full h-[320px]">
                <Image
                  src="https://ekohum.com/cdn/shop/files/DB392_3.jpg?v=1740739949"
                  alt="Kurti Collection"
                  fill
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 absolute inset-0 rounded-lg"
                />
                <Image
                  src="https://ekohum.com/cdn/shop/files/DB392_8.jpg?v=1740739949"
                  alt="Kurti Collection Hover"
                  fill
                  className="w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0 rounded-lg"
                />
              </div>
              <div className="p-4 bg-white flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Kurti Collection</h3>
                  <p className="text-gray-600 mb-4">Premium kurtis with intricate embroidery and modern designs</p>
                </div>
                <Button className="w-full mt-auto" asChild>
                  <Link href="/contact">Inquire Now</Link>
                </Button>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg h-[500px] flex flex-col">
              <div className="relative overflow-hidden rounded-lg w-full h-[320px]">
                <Image
                  src="https://ekohum.com/cdn/shop/files/DW3962_1.jpg?v=1725534156"
                  alt="Suits Collection"
                  fill
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 absolute inset-0 rounded-lg"
                />
                <Image
                  src="https://ekohum.com/cdn/shop/files/DW3962_4.jpg?v=1725534157"
                  alt="Suits Collection Hover"
                  fill
                  className="w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0 rounded-lg"
                />
              </div>
              <div className="p-4 bg-white flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Suits Collection</h3>
                  <p className="text-gray-600 mb-4">Elegant suits with premium fabrics and contemporary designs</p>
                </div>
                <Button className="w-full mt-auto" asChild>
                  <Link href="/contact">Inquire Now</Link>
                </Button>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg h-[500px] flex flex-col">
              <div className="relative overflow-hidden rounded-lg w-full h-[320px]">
                <Image
                  src="https://ekohum.com/cdn/shop/files/DSC_1622_33b0f5b1-b840-4283-90cc-259f6794734e.jpg?v=1729164681"
                  alt="Double Layer Kalidaar"
                  fill
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 absolute inset-0 rounded-lg"
                />
                <Image
                  src="https://ekohum.com/cdn/shop/files/Untitled-9_37b1bb61-61c1-4175-b051-24e143efbae2.jpg?v=1729164548"
                  alt="Double Layer Kalidaar Hover"
                  fill
                  className="w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0 rounded-lg"
                />
              </div>
              <div className="p-4 bg-white flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Double Layer Kalidaar</h3>
                  <p className="text-gray-600 mb-4">Luxurious double layer kalidaar designs with premium fabrics</p>
                </div>
                <Button className="w-full mt-auto" asChild>
                  <Link href="/contact">Inquire Now</Link>
                </Button>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg h-[500px] flex flex-col">
              <div className="relative overflow-hidden rounded-lg w-full h-[320px]">
                <Image
                  src="https://ekohum.com/cdn/shop/files/DSC0406.jpg?v=1745399522"
                  alt="Kalidaar Collection"
                  fill
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 absolute inset-0 rounded-lg"
                />
                <Image
                  src="https://ekohum.com/cdn/shop/files/DSC0392.jpg?v=1745399522"
                  alt="Kalidaar Collection Hover"
                  fill
                  className="w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0 rounded-lg"
                />
              </div>
              <div className="p-4 bg-white flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Kalidaar Collection</h3>
                  <p className="text-gray-600 mb-4">Traditional kalidaar designs with modern aesthetics</p>
                </div>
                <Button className="w-full mt-auto" asChild>
                  <Link href="/contact">Inquire Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <Link
        href="https://wa.me/919828422208"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </Link>
    </div>
  )
}
