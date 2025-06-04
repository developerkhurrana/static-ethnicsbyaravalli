"use client"

import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from "react"
import { FlipWords } from "@/components/ui/flip-words"
import { Button } from "@/components/ui/button"
import { KeywordTicker } from "@/components/ui/keyword-ticker"

const heroImages = {
  desktop: [
    "/products/hero_banner_1.jpg",
    "/products/hero_banner_2.jpg",
    "/products/hero_banner_3.webp"
  ],
  mobile: ["/products/hero_mobile_banner.jpg"]
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const baseKeywords = [
  // With Jaipur
  "Cotton Kurta Manufacturer Jaipur",
  "Printed Cotton Kurta Set Jaipur",
  "Modal Kurta-Palazzo Manufacturer Jaipur",
  "Muslin Dress Jaipur",
  "Chanderi Kaftan Manufacturer Jaipur",
  "Viscose Palazzo Set Jaipur",
  "Pure Linen Co-Ord Set Manufacturer Jaipur",
  "Kurta-Alpona Salwar Jaipur",
  "Kurta-Pant-Dta Manufacturer Jaipur",
  "B2B Kurta Supplier Jaipur",
  "Ethnic Bottomwear Collection Jaipur",
  // With India
  "Kurta Manufacturer in India",
  "Kurta Set in India",
  "Ethnic Wear Manufacturer in India",
  "Kurta Exporter in India",
  "Designer Kurta for Women in India",
  // Without location
  "Cotton Kurta Set",
  "Muslin Kurta Set",
  "Chanderi Dress",
  "Viscose Co-Ord Set",
  "Kurta-Alpona Salwar",
  "Kaftan Dress",
  "Kurta-Sharara Dupatta Set",
  "Pure Linen Kaftan",
  "Co-Ord Sets for Women",
  "Ethnic Palazzo Pants",
  "Sharara Bottomwear Collection",
  "Kurta with Palazzo",
  "Kurta-Pant Set",
  "Kurta-Palazzo-Dupatta Set",
  "Women's Kurta Set Online",
  "Designer Kurta for Women",
  "Festive Wear Kurta Set"
];

const keywords = shuffle(baseKeywords);

const heroWords = ["Premium", "Trusted", "Quality"];

export default function HomeClient() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [heroWord, setHeroWord] = useState(heroWords[0])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroWords.length)
    setHeroWord(heroWords[randomIndex])
  }, [])

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Carousel */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {(isMobile ? heroImages.mobile : heroImages.desktop).map((image, index) => (
                <div key={index} className="embla__slide relative h-screen">
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
            
            {/* Navigation Buttons */}
            {!isMobile && (
              <>
                <button
                  className="embla__button embla__button--prev"
                  onClick={() => emblaApi?.scrollPrev()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  className="embla__button embla__button--next"
                  onClick={() => emblaApi?.scrollNext()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`space-y-8 ${isMobile ? 'flex flex-col justify-between h-[90vh]' : ''}`}>
            <div className={isMobile ? 'mt-16' : ''}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {heroWord}{"  "}
                <span className="inline-block">
                  <FlipWords
                    words={["Kurti", "Kurti Sets", "Suit Sets", "Co-ord Sets", "Kaftans", "Dresses", "Anarkalis", "Tops", "Tunics"]}
                    className="text-[#D9A8A0]"
                  />
                </span>
                Manufacturer in <br />Jaipur
              </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-24 md:mb-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[#D9A8A0] px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-[#C08478] w-full md:w-auto"
              >
                Contact Us
              </Link>
              <Link
                href="https://wa.me/919828422208"
                target="_blank"
                className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10 w-full md:w-auto"
              >
                Whatsapp Us
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        {(isMobile ? heroImages.mobile : heroImages.desktop).length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {(isMobile ? heroImages.mobile : heroImages.desktop).map((_, index) => (
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

      {/* Rest of your component content */}
    </div>
  )
} 