import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Truck, Leaf, ArrowRight, Sparkles, BadgeCheck, Clock, Package, Star, Palette, Calendar } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { festiveWearImageLinks } from "@/lib/constants"
import AravalliHero from "@/components/aravalli-hero"

export const metadata: Metadata = {
  title: "Aravalli Clothing – Premium Ethnic Wear Collection 2025 | Ethnics by Aravalli",
  description: "Explore the Aravalli Clothing collection: premium kurtas, kurta sets, suits, dresses, kaftans, and anarkalis. Discover timeless ethnic wear crafted in Jaipur with modern designs.",
  keywords: [
    "Aravalli Clothing",
    "ethnic wear",
    "kurtas",
    "kurta sets", 
    "suit sets",
    "dresses",
    "kaftans",
    "anarkali kurtas",
    "Jaipur",
    "premium ethnic wear",
    "Ethnics by Aravalli",
    "wholesale ethnic wear"
  ].join(', '),
  openGraph: {
    title: "Aravalli Clothing – Premium Ethnic Wear Collection 2025 | Ethnics by Aravalli",
    description: "Explore the Aravalli Clothing collection: premium kurtas, kurta sets, suits, dresses, kaftans, and anarkalis. Discover timeless ethnic wear crafted in Jaipur.",
    type: "website",
    locale: "en_IN",
    url: "https://ethnicsbyaravalli.com/aravalli-clothing",
    siteName: "Ethnics by Aravalli",
    images: [
      {
        url: "https://ethnicsbyaravalli.com/products/hero_banner_1.jpg",
        width: 1200,
        height: 630,
        alt: "Aravalli Clothing Collection 2025 - Ethnics by Aravalli",
      },
    ],
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/aravalli-clothing"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const aravalliCategories = [
  {
    name: "Kurtas",
    description: "Our signature Aravalli kurtas blend traditional craftsmanship with contemporary aesthetics, thoughtfully crafted using fine fabrics like cotton, linen, modal, muslin, chanderi and more. The result is apparel that offers effortless elegance, breathable comfort, and lasting appeal for the discerning customers of fashion retailers.",
    image: festiveWearImageLinks[2], // festive-wearkurta_dzlyzn.jpg
    hoverImage: festiveWearImageLinks[5], // festive-wearkurta_hover_qlxbcc.jpg
    link: "/contact",
    cta: "Inquire for Kurtas"
  },
  {
    name: "Kurta Sets",
    description: "Our Aravalli Kurta sets are elegant two-piece ethnic ensembles for women, thoughtfully paired with vibrant colours and stylish prints. Each set features a kurta top matched with coordinated bottoms, offering a variety of styles including pants, palazzos, shararas, and more.",
    image: festiveWearImageLinks[1], // festive-wearkurta_set_g3hixx.jpg
    hoverImage: festiveWearImageLinks[0], // festive-wearkurta_set_hover_mjnqex.jpg
    link: "/contact",
    cta: "Inquire for Kurta Sets"
  },
  {
    name: "Suit Sets",
    description: "Our timeless Aravalli ethnic suit sets are crafted from premium materials and tailored with elegant cuts, offering a blend of comfort and sophistication. Each kurta set comes paired with a matching bottom and dupatta, making it an ideal choice for festive celebrations, professional settings, and boutique showcases alike.",
    image: festiveWearImageLinks[8], // festive-wearsuit_sets_lzrwx6.jpg
    hoverImage: festiveWearImageLinks[9], // festive-wearsuit_sets_hover_aqnrqr.jpg
    link: "/contact",
    cta: "Inquire for Suit Sets"
  },
  {
    name: "Dresses",
    description: "Shop owners, elevate your collections with our stylish Aravalli ethnic dresses that blend timeless silhouettes and contemporary design. Handcrafted with precision, each piece radiates sophistication while being tailored for the ease of everyday wear—perfect for discerning customers who value both tradition and trend.",
    image: festiveWearImageLinks[10], // festive-weardress_uio8lg.jpg
    hoverImage: festiveWearImageLinks[4], // festive-weardress_hover_ihowmn.jpg
    link: "/contact",
    cta: "Inquire for Dresses"
  },
  {
    name: "Kaftans",
    description: "Breezy and elegant, our Aravalli kaftans are designed for those who cherish comfort without compromising on style. Featuring airy fabrics, intricate embroidery, and captivating prints, they're the perfect expression of effortless ethnic fusion—ideal for the customers of retailers who like everything from laid-back lounging to graceful gatherings.",
    image: festiveWearImageLinks[6], // festive-wearkaftans_uu1fik.jpg
    hoverImage: festiveWearImageLinks[3], // festive-wearkaftans_hover_jgxltj.jpg
    link: "/contact",
    cta: "Inquire for Kaftans"
  },
  {
    name: "Anarkali Kurtas",
    description: "Step into timeless elegance with our Aravalli Anarkali Kurtas—celebrated for their graceful layers, royal silhouette, and exquisite artisanal detailing. Each piece captures the essence of Indian heritage while embracing a refined, contemporary flair, making it a perfect choice for occasions that call for grandeur with ease.",
    image: festiveWearImageLinks[11], // festive-wearanarkali_qaxwt7.jpg
    hoverImage: festiveWearImageLinks[7], // festive-wearanarkali_hover_mygrpv.jpg
    link: "/contact",
    cta: "Inquire for Anarkalis"
  }
]

const aravalliHighlights = [
  {
    icon: Sparkles,
    title: "Modern Ethnic Styles",
    description: "A curated collection blending Jaipur tradition with contemporary fashion."
  },
  {
    icon: Shield,
    title: "Quality Craftsmanship",
    description: "Every piece is made with premium fabrics and expert finishing."
  },
  {
    icon: Leaf,
    title: "Sustainable Fabrics",
    description: "Eco-friendly materials and responsible sourcing."
  },
  {
    icon: Package,
    title: "Boutique Packaging",
    description: "Beautifully packed for a premium unboxing experience."
  }
]

const stats = [
  { icon: Users, label: "500+ Happy Clients" },
  { icon: BadgeCheck, label: "100% In-House Production" },
  { icon: Truck, label: "Pan-India Delivery" },
  { icon: Clock, label: "Fast Turnaround" }
]

const faqs = [
  {
    q: "What is Aravalli Clothing?",
    a: "Aravalli Clothing is a curated collection of premium ethnic wear, including kurtas, kurta sets, suits, dresses, kaftans, and anarkalis, crafted in Jaipur by Ethnics by Aravalli."
  },
  {
    q: "Are all products made in Jaipur?",
    a: "Yes, every piece in the Aravalli Clothing collection is designed and manufactured in Jaipur, blending traditional techniques with modern style."
  },
  {
    q: "Can I order Aravalli Clothing in bulk for my boutique?",
    a: "Absolutely! We offer special pricing and customization options for boutiques and bulk buyers. Please contact us for details."
  },
  {
    q: "What fabrics are used in Aravalli Clothing?",
    a: "We use premium fabrics such as pure cotton, silk blends, and handloom textiles, ensuring comfort and durability."
  },
  {
    q: "How do I place an order?",
    a: "You can place an order directly through our website, or contact us via WhatsApp or our contact form for personalized assistance."
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship Aravalli Clothing worldwide. Shipping options and rates are available at checkout or upon inquiry."
  }
]

export default function AravalliClothingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
      {/* Hero Section with Auto-Slider */}
      <AravalliHero />

      {/* Aravalli Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-900">
              Explore Our Aravalli Clothing Categories
            </h2>
            <p className="text-lg text-orange-700 max-w-3xl mx-auto">
              Shop the best Aravalli ethnic wear for every occasion. Premium quality, vibrant colors, and modern designs for women.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aravalliCategories.map((category, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 border-orange-200 h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg flex-shrink-0 aspect-[4/5]">
                  {/* Main Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  {/* Hover Image */}
                  <Image
                    src={category.hoverImage}
                    alt={`${category.name} - Hover View`}
                    fill
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <p className="text-orange-800 mb-4 flex-1">{category.description}</p>
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                    <Link href={category.link}>{category.cta} <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Aravalli Clothing */}
      <section className="py-16 md:py-24 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-900">
              Why Choose Aravalli Clothing?
            </h2>
            <p className="text-lg text-orange-700 max-w-3xl mx-auto">
              Experience the best of ethnic fashion with Aravalli Clothing. Quality, style, and tradition in every piece.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aravalliHighlights.map((highlight, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow border-orange-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <highlight.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-orange-900">{highlight.title}</h3>
                <p className="text-orange-700 text-sm">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="bg-orange-50 rounded-xl shadow-sm border border-orange-100 p-6 flex flex-col gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-300 border-2"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center h-8 w-8 aspect-square rounded-full bg-orange-500 text-white font-bold text-base mr-2 leading-none">{idx + 1}</span>
                  <span className="font-semibold text-lg text-gray-900">{item.q}</span>
                </div>
                <div className="text-gray-700 text-base pl-10">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Stock Aravalli Clothing?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Partner with us for boutique-ready, premium ethnic wear and experience the difference in quality and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Request Aravalli Catalog</Link>
            </Button>
            <Button asChild size="lg" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white border-none shadow-md">
              <Link href="https://wa.me/916377012120">
                <FaWhatsapp className="w-5 h-5" /> WhatsApp Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 