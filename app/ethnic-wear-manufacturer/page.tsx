import React from 'react';
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata = {
  title: "Premium Ethnic Wear Manufacturer – Handcrafted Apparel for Boutiques",
  description:
    "Discover high-quality ethnic wear manufacturing with expert craftsmanship, sustainable fabrics, and custom designs. Partner with trusted manufacturers for boutique collections.",
  openGraph: {
    title: "Premium Ethnic Wear Manufacturer – Handcrafted Apparel for Boutiques",
    description: "Discover high-quality ethnic wear manufacturing with expert craftsmanship, sustainable fabrics, and custom designs. Partner with trusted manufacturers for boutique collections.",
    images: [
      {
        url: "/og-ethnic-wear-manufacturer.jpg", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Premium Ethnic Wear Manufacturer – Handcrafted Apparel for Boutiques",
      },
    ],
  },
  keywords: [
    "ethnic wear manufacturer",
    "premium ethnic wear",
    "custom ethnic fashion",
    "handcrafted ethnic apparel",
    "boutique supplier",
  ],
};

const capabilities = [
  "In-house design and pattern making for ethnic wear collections",
  "Advanced cutting and stitching units ensuring premium craftsmanship",
  "Hand embroidery and machine embroidery blending tradition with innovation",
  "Strict quality control processes for flawless ethnic fashion",
  "Custom packaging and labeling services tailored for boutiques and private labels",
  "Exclusive custom ethnic wear design development for retailers and brands",
  "Bulk production capacity for ethnic wear to meet global demand",
  "Fast sampling and prototyping for new ethnic wear collections",
];

const facilities = [
  {
    title: "Design Studio",
    image: "https://lh3.googleusercontent.com/p/AF1QipOHwu3Sxyf-MXB_sJ57cLGIQ1jOhID2nL39kznT=s680-w680-h510-rw",
    description:
      "Our design studio fuses creativity and technology, enabling expert designers to craft unique ethnic wear collections for global markets.",
  },
  {
    title: "Production Unit",
    image: "https://lh3.googleusercontent.com/p/AF1QipOSQ4UdNWJkeTGUSVvojWo3iB9ZBTX2vRS90zSd=s680-w680-h510-rw",
    description:
      "High-tech machinery and skilled artisans collaborate to manufacture premium ethnic wear with precision and attention to detail.",
  },
  {
    title: "Embroidery Section",
    image: "/manufacturing/embroidery.jpg",
    description:
      "Our embroidery unit features both traditional hand embroidery artisans and modern machine embroidery, ensuring intricate ethnic detailing.",
  },
  {
    title: "Quality Control",
    image: "/manufacturing/quality-control.jpg",
    description:
      "Stringent quality control at every stage guarantees superior ethnic wear craftsmanship and consistency before shipping.",
  },
];

export default function EthnicWearManufacturerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative mb-20 mt-20">
        <div className="relative w-full h-[340px] md:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="https://ekohum.com/cdn/shop/files/DC3851_4.png?v=1742470185"
            alt="Premium Ethnic Wear Manufacturer - Hero"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/10 flex flex-col justify-center items-center text-center rounded-3xl z-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg">
              Premium Ethnic Wear Manufacturer
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto">
              Handcrafted Apparel for Boutiques & Designers Worldwide
            </p>
            <Link href="/contact">
              <Button className="bg-[#D9A8A0] hover:bg-[#C08478] text-white border-0 rounded-full text-lg px-8 py-3 shadow-lg">
                Contact Us for High-Quality Ethnic Wear
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 font-serif">Why Choose a Premium Ethnic Wear Manufacturer?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Ethnic wear embodies heritage, craftsmanship, and timeless appeal, making it essential for boutique owners to source from experienced manufacturers. At <strong>Ethnics by Aravalli</strong>, we specialize in premium ethnic apparel, blending traditional artistry with modern trends.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow border">
              <CheckCircle2 className="text-primary h-5 w-5" />
              <span>Trusted by boutique retailers & designers worldwide</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow border">
              <Leaf className="text-primary h-5 w-5" />
              <span>Sustainable manufacturing with ethically sourced fabrics</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow border">
              <ShieldCheck className="text-primary h-5 w-5" />
              <span>Customization options for unique brand identities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="mb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-semibold font-serif mb-2">Our Expertise in Ethnic Wear Manufacturing</h2>
            <div className="grid gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border flex items-center gap-4">
                <CheckCircle2 className="text-primary h-7 w-7 flex-shrink-0" />
                <span><strong>Kurtas & Suit Sets</strong> – Perfect for boutique collections</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border flex items-center gap-4">
                <CheckCircle2 className="text-primary h-7 w-7 flex-shrink-0" />
                <span><strong>Anarkalis & Kaftans</strong> – Handcrafted elegance with intricate embroidery</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border flex items-center gap-4">
                <Leaf className="text-primary h-7 w-7 flex-shrink-0" />
                <span><strong>Sustainable Ethnic Fashion</strong> – Supporting eco-conscious production methods</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border flex items-center gap-4">
                <ShieldCheck className="text-primary h-7 w-7 flex-shrink-0" />
                <span><strong>Customization & Private Labeling</strong> – Exclusive designs tailored to brand needs</span>
              </div>
            </div>
            <div className="bg-[#F8F4F2] rounded-xl p-6 border mt-4">
              <h3 className="font-semibold text-lg mb-2">Our Process:</h3>
              <ul className="list-disc ml-6 space-y-1 text-base">
                <li>Fabric Selection – Premium-quality materials suited for luxury ethnic wear</li>
                <li>Handwork & Embroidery – Traditional artistry meets contemporary aesthetics</li>
                <li>Quality Control (QC) – Ensuring precision in stitching & finishing</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="https://ekohum.com/cdn/shop/files/DSC6636.jpg?v=1717779665"
              alt="Ethnic wear manufacturer India - embroidery craftsmanship"
              width={520}
              height={380}
              className="rounded-2xl shadow-2xl object-cover border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* Ethical & Sustainable Production */}
      <section className="mb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center items-center order-2 md:order-1">
            <Image
              src="https://lh3.googleusercontent.com/p/AF1QipOHwu3Sxyf-MXB_sJ57cLGIQ1jOhID2nL39kznT=s680-w680-h510-rw"
              alt="Ethnic wear manufacturer India - quality control"
              width={520}
              height={380}
              className="rounded-2xl shadow-2xl object-cover border-4 border-white"
            />
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-semibold font-serif mb-2">Ethical & Sustainable Production Practices</h2>
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="font-semibold text-lg mb-2">Sustainability Focus:</h3>
              <ul className="list-disc ml-6 mb-4 space-y-1 text-base">
                <li>Organic cotton, handwoven textiles, and natural dyes</li>
                <li>Eco-friendly production with minimal waste</li>
              </ul>
              <h3 className="font-semibold text-lg mb-2">Ethical Manufacturing Standards:</h3>
              <ul className="list-disc ml-6 space-y-1 text-base">
                <li>Fair wages & safe working conditions</li>
                <li>Transparent sourcing & compliance certifications</li>
              </ul>
            </div>
            <div className="mt-4">
              <Link href="/contact">
                <Button className="bg-[#D9A8A0] hover:bg-[#C08478] text-white border-0 rounded-full text-base px-6 py-2 shadow">
                  Partner with an Ethical Manufacturer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to Partner Section */}
      <section className="mb-24">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border text-center">
          <h2 className="text-2xl md:text-3xl font-semibold font-serif mb-4">How to Partner with Us?</h2>
          <ol className="list-decimal ml-6 mb-4 space-y-2 text-left">
            <li>Submit a wholesale inquiry via our <Link href="/contact" className="text-primary underline">contact form</Link>.</li>
            <li>Choose from ready collections or request custom designs.</li>
            <li>Receive sample pieces before bulk order processing.</li>
          </ol>
          <p className="mb-4">We support boutique owners with bulk production, exclusive designs, and custom branding.</p>
          <div className="mt-6">
            <Link href="/contact">
              <Button className="bg-[#D9A8A0] hover:bg-[#C08478] text-white border-0 rounded-full text-base px-6 py-2 shadow">
                Start Your Ethnic Wear Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links
      <section className="mt-16 border-t pt-8">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">Explore More</h3>
          <ul className="flex flex-wrap gap-4">
            <li><Link href="/about" className="text-primary underline">About Us</Link></li>
            <li><Link href="/blog" className="text-primary underline">Blog</Link></li>
            <li><Link href="/contact" className="text-primary underline">Contact</Link></li>
          </ul>
        </div>
      </section> */}
    </div>
  )
} 