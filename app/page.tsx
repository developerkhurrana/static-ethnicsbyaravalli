"use client"

import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from "react"
import { FlipWords } from "@/components/ui/flip-words"
import { KeywordTicker } from "@/components/ui/keyword-ticker"
import { ProductCard } from "@/components/product-card"
// import { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "Premium, Trusted & Designer Kurti Manufacturer in Jaipur | Ethnics by Aravalli",
//   description: "Ethnics by Aravalli is a leading, trusted manufacturer of premium designer kurtis, kurta sets, and ethnic wear in Jaipur, India. B2B, bulk, and boutique orders welcome."
// };

const heroImages = {
  desktop: [
    "/products/hero_banner_1.jpg",
    "/products/hero_banner_2.jpg",
    "/products/hero_banner_4.jpg",
    "/products/hero_banner_3.webp"
  ],
  mobile: ["/products/hero_mobile_banner.jpg"]
}

// Removed unused shuffle function

const products = [
  {
    name: "Kurtas",
    description: "Our premium kurtas blend traditional craftsmanship with contemporary aesthetics, thoughtfully crafted using fine fabrics like cotton, linen, modal, muslin, chanderi and more. The result is apparel that offers effortless elegance, breathable comfort, and lasting appeal for the discerning customers of fashion retailers.",
    images: ["https://ekohum.com/cdn/shop/files/DS5853_2.jpg?v=1741256083", "https://ekohum.com/cdn/shop/files/DS5853_10.jpg?v=1741256083"]
  },
  {
    name: "Kurta Sets",
    description: "Our Kurta sets are elegant two-piece ethnic ensembles for women, thoughtfully paired with vibrant colours and stylish prints. Each set features a kurta top matched with coordinated bottoms, offering a variety of styles including pants, palazzos, shararas, and more.",
    images: ["https://ekohum.com/cdn/shop/files/DSC_0596.jpg?v=1717780319", "https://ekohum.com/cdn/shop/files/DSC_0651.jpg?v=1717780319"]
  },
  {
    name: "Suit Sets",
    description: "Our timeless ethnic suit sets are crafted from premium materials and tailored with elegant cuts, offering a blend of comfort and sophistication. Each kurta set comes paired with a matching bottom and dupatta, making it an ideal choice for festive celebrations, professional settings, and boutique showcases alike.",
    images: ["https://ekohum.com/cdn/shop/files/DW3962__1.jpg?v=1725534156", "https://ekohum.com/cdn/shop/files/DW3962_4.jpg?v=1725534157"]
  },
  {
    name: "Dresses",
    description: "Shop owners, elevate your collections with our stylish ethnic dresses that blend timeless silhouettes and contemporary design. Handcrafted with precision, each piece radiates sophistication while being tailored for the ease of everyday wear—perfect for discerning customers who value both tradition and trend.",
    images: ["https://ekohum.com/cdn/shop/files/DSC9845.jpg?v=1717778854", "https://ekohum.com/cdn/shop/files/DSC9855.jpg?v=1717778854"]
  },
  {
    name: "Kaftans",
    description: "Breezy and elegant, our kaftans are designed for those who cherish comfort without compromising on style. Featuring airy fabrics, intricate embroidery, and captivating prints, they're the perfect expression of effortless ethnic fusion—ideal for the customers of retailers who like everything from laid-back lounging to graceful gatherings.",
    images: ["https://ekohum.com/cdn/shop/files/1P1A4275f.jpg?v=1717779843", "https://ekohum.com/cdn/shop/files/1P1A4278f.jpg?v=1717779843"]
  },
  {
    name: "Anarkali Kurtas",
    description: "Step into timeless elegance with our Anarkali Kurtas—celebrated for their graceful layers, royal silhouette, and exquisite artisanal detailing. Each piece captures the essence of Indian heritage while embracing a refined, contemporary flair, making it a perfect choice for occasions that call for grandeur with ease.",
    images: ["https://ekohum.com/cdn/shop/files/DSC_1611_c8d72493-d7b7-4fd8-a066-43dd937a657d.jpg?v=1729164602", "https://ekohum.com/cdn/shop/files/DSC_1622_33b0f5b1-b840-4283-90cc-259f6794734e.jpg?v=1729164681"]
  }
]

const keywords = [
  "Kurti Manufacturer Jaipur",
  "Wholesale Ethnic Wear",
  "Boutique Supplier",
  "Premium Kurtas",
  "Ethnic Wear Manufacturer",
  "Jaipur Kurti Supplier",
  "Bulk Kurti Orders",
  "Designer Kurtis",
  "Traditional Wear",
  "Modern Ethnic Fashion"
]

function getRandomHeroWord() {
  const words = ["Premium", "Trusted", "Designer", "Leading", "Best", "Top", "Quality", "Professional"];
  return words[Math.floor(Math.random() * words.length)];
}

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [heroWord] = useState(getRandomHeroWord())

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
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
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

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
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                    quality={85}
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
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#D9A8A0] px-6 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-[#C08478] w-full md:w-auto"
                aria-label="Contact Ethnics by Aravalli"
              >
                <span className="mr-1">
                  {/* Using react-icons: MdEmail */}
                  {/** @ts-ignore */}
                  {require("react-icons/md").MdEmail({ size: 20 })}
                </span>
                Get in Touch
              </Link>
              <Link
                href="https://wa.me/919828422208?text=Hi%20Ethnics%20by%20Aravalli%2C%20I%27m%20interested%20in%20your%20Kurtis%20and%20ethnic%20wear%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#25D366] bg-[#25D366] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#128C7E] w-full md:w-auto"
              >
                {/* Using react-icons: FaWhatsapp */}
                {/** @ts-ignore */}
                {require("react-icons/fa").FaWhatsapp({ size: 20 })}
                Chat on WhatsApp
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

      {/* Why Choose Us Section */}
      <section className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-[url('https://res.cloudinary.com/dfye0gag9/image/upload/f_auto,q_auto,w_1200/about_banner_1_q6jmud.jpg')]">
        <div className="absolute inset-0 bg-black/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[60vh]">
            {/* Text Content */}
            <div className="flex flex-col justify-center md:items-start md:text-left items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">Who We Are</h2>
              <p className="text-base md:text-base text-white/90 max-w-2xl mb-8 drop-shadow">
                At Ethnics by Aravalli, a leading kurti manufacturer in Jaipur, we specialize in crafting premium Indian women&apos;s ethnic wear that celebrates tradition with a modern twist. From stylish Kurtis and elegant Kurta Sets to flowy Dresses, Anarkalis, and breezy Kaftans, every piece is thoughtfully designed and hand-manufactured by skilled artisans using the finest fabrics and vibrant Jaipuri prints. Our women&apos;s ethnic wear blends heritage craftsmanship with contemporary design, reflecting the rich culture of Jaipur while aligning with today&apos;s fashion trends.
                <br /> <br />📌 Direct from our manufacturing unit to your women wear retail hop—crafted with care, made to impress!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center items-center">
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
            {/* Video Content */}
            <div className="flex justify-center items-center w-full">
              <div className="relative w-full aspect-video max-w-xl rounded-lg overflow-hidden shadow-lg border-2 border-white/20">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/_yLxnjdZf84?autoplay=1&loop=1&playlist=_yLxnjdZf84"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full min-h-[220px]"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
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
            <p className="text-base text-gray-600 max-w-7xl mx-auto text-justify">
              Ethnic By Aravalli is a distinguished women&apos;s ethnic wear manufacturer rooted in the culturally vibrant city of Jaipur dedicated to supplying retailers, garment chains, and fashion outlets with its clothing that resonates with elegance, culture, and comfort. More than just a production house, it&apos;s a creative partner to retailers seeking garments that blend traditional artistry with modern sensibilities.<br/>
              With a meticulous eye for quality, Ethnic By Aravalli selects premium fabrics that undergo superior dyeing and printing processes. Every detail—from the choice of colors and motifs to the feel and fit of the fabric—is thoughtfully curated to match evolving style trends, comfort needs, and the spirit of every occasion satisfying every need of customers of women ethnic wear retailers.<br/>
              The in-house manufacturing capabilities of Ethnics By Aravalli enables it to create a wide array of garments kurtas, kurta sets, suit sets, dresses, anarkalis, kaftans, and tops. Each piece is a testament to expert pattern making, precise stitching, and the delicate use of intricate embroideries. With rigorous quality checks and careful packaging, the manufacturer ensures excellence from thread to finish.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Keyword Ticker */}
      <KeywordTicker keywords={keywords} className="border-t border-gray-100" />

      {/* Contact Section */}
      {/* <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4A3A3A]">Ethnics by Aravalli – Premium Ethnic Wear Manufacturers</h2>
          <p className="text-lg text-gray-700 mb-2">We create stunning ethnic wear directly for boutiques and retailers—no middlemen, just authentic craftsmanship and the best quality!</p>
          <p className="text-base text-gray-600 mb-2">📍 Based in Jaipur &nbsp; Crafted with care, delivered with excellence</p>
          <p className="text-base text-gray-600 mb-8">🛍️ Your boutique deserves the best. Let&apos;s create something beautiful together!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-[#D9A8A0] px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-[#C08478] w-full sm:w-auto"
            >
              Contact Us
            </Link>
            <Link
              href="https://wa.me/919828422208"
          target="_blank"
              className="inline-flex items-center justify-center rounded-md border border-[#D9A8A0] bg-transparent px-6 py-3 text-sm font-medium text-[#D9A8A0] shadow-sm transition-colors hover:bg-[#D9A8A0]/10 w-full sm:w-auto"
            >
              WhatsApp Us
            </Link>
          </div>
        </div>
      </section> */}

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
