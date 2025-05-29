"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Package, Store, Truck, Scissors, Ruler, Factory, IndianRupee } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const heroImages = [
  "https://www.jaipuriadaah.com/cdn/shop/files/cvxfb_13_2000x.png?v=1748002519",
  "https://www.jaipuriadaah.com/cdn/shop/files/cvxfb_11_2000x.png?v=1748002519",
  "https://www.jaipuriadaah.com/cdn/shop/files/cvxfb_12_2000x.png?v=1748002519",
  "https://i.pinimg.com/736x/41/b5/ff/41b5ffb93e0c982515e312de103edc91.jpg"
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
              Wholesale Ethnicwear Direct from Jaipur
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Low MOQ · Fast Dispatch · Custom Prints
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#become-retailer"
                className="inline-flex items-center justify-center rounded-md bg-[#D9A8A0] px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-[#C08478]"
              >
                Become a Retailer
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
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
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make wholesale ethnic wear sourcing simple and profitable for retailers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our best-selling ethnic wear pieces
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.sku} className="overflow-hidden">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                    <p className="text-sm text-gray-600">Fabric: {product.fabric}</p>
                    <Link
                      href={`https://wa.me/919876543210?text=Hi, I'm interested in SKU ${product.sku}`}
                      target="_blank"
                      className="inline-flex items-center justify-center w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
                    >
                      📲 Enquire on WhatsApp
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Order
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple process to start your wholesale journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Retailer Section */}
      <section id="become-retailer" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Become a Retailer
              </h2>
              <p className="text-lg text-gray-600">
                Join our network of successful boutique owners
              </p>
            </div>
            <Card className="p-6">
              <form className="space-y-6">
                <div className="space-y-4">
                  <Input type="text" placeholder="Your Name" required />
                  <Input type="text" placeholder="Store Name" required />
                  <Input type="tel" placeholder="WhatsApp Number" required />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Product Interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suits">Designer Suits</SelectItem>
                      <SelectItem value="lehengas">Bridal Lehengas</SelectItem>
                      <SelectItem value="sarees">Designer Sarees</SelectItem>
                      <SelectItem value="custom">Custom Collection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  Send Me the Catalog on WhatsApp
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by 500+ Retailers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied boutique partners
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Ethnics by Aravalli</h3>
              <p className="text-gray-600">Made in Jaipur | Shipping Across India</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li>📞 +91 98765 43210</li>
                <li>✉️ hello@ethnicsbyaravalli.com</li>
                <li>📱 WhatsApp: +91 98765 43210</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Follow Us</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="https://instagram.com/ethnicsbyaravalli" target="_blank" className="hover:text-primary">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://facebook.com/ethnicsbyaravalli" target="_blank" className="hover:text-primary">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Address</h4>
              <p className="text-gray-600">
                Aravalli House<br />
                Jaipur, Rajasthan<br />
                India - 302001
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <Link
        href="https://wa.me/919876543210"
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

const benefits = [
  {
    title: "Low MOQ",
    description: "Start with as few as 10 pieces per design",
    icon: <IndianRupee className="w-6 h-6 text-primary" />,
  },
  {
    title: "Jaipur Manufacturing",
    description: "Direct from our workshop in Jaipur",
    icon: <Factory className="w-6 h-6 text-primary" />,
  },
  {
    title: "Pan-India Shipping",
    description: "Fast delivery to all major cities",
    icon: <Truck className="w-6 h-6 text-primary" />,
  },
  {
    title: "Custom Sizes",
    description: "Available in all standard sizes",
    icon: <Ruler className="w-6 h-6 text-primary" />,
  },
  {
    title: "Ready Stock",
    description: "Quick dispatch for in-stock items",
    icon: <Package className="w-6 h-6 text-primary" />,
  },
  {
    title: "Quality Fabrics",
    description: "Premium materials and craftsmanship",
    icon: <Scissors className="w-6 h-6 text-primary" />,
  },
]

const products = [
  {
    name: "Designer Suit Set",
    sku: "DS001",
    fabric: "Pure Silk",
    image: "/products/suit-1.jpg",
  },
  {
    name: "Bridal Lehenga",
    sku: "BL002",
    fabric: "Brocade",
    image: "/products/lehenga-1.jpg",
  },
  {
    name: "Designer Saree",
    sku: "DS003",
    fabric: "Cotton Silk",
    image: "/products/saree-1.jpg",
  },
]

const steps = [
  {
    title: "Browse Collection",
    description: "Explore our catalog of premium ethnic wear",
  },
  {
    title: "Contact Us",
    description: "Send us your requirements via WhatsApp",
  },
  {
    title: "Get Quote",
    description: "Receive pricing and delivery timeline",
  },
  {
    title: "Confirm & Dispatch",
    description: "Place order and get fast delivery",
  },
]

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    quote: "The quality and designs are exceptional. My customers love the collection!",
  },
  {
    name: "Rajesh Patel",
    location: "Mumbai",
    quote: "Best wholesale partner for ethnic wear. Great prices and fast delivery.",
  },
  {
    name: "Anita Desai",
    location: "Bangalore",
    quote: "Custom sizing and quick turnaround make them my go-to supplier.",
  },
]
