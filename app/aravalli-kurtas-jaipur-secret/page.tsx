import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Users, Truck, Award, Phone, Mail, BadgeCheck, Clock } from "lucide-react"
import { siteConfig } from "@/lib/constants"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Aravalli Kurtas – Jaipur's Premium Ethnic Wear for Boutiques",
  description: "Discover why Aravalli Kurtas by Ethnics by Aravalli are the top choice for retailers across India. Tradition meets trend in every stitch.",
  keywords: "Aravalli Kurtas, Jaipur ethnic wear, boutique supplier, kurti manufacturer Jaipur, wholesale kurtas, ethnic wear supplier",
  openGraph: {
    title: "Aravalli Kurtas – Jaipur's Premium Ethnic Wear for Boutiques",
    description: "Discover why Aravalli Kurtas by Ethnics by Aravalli are the top choice for retailers across India. Tradition meets trend in every stitch.",
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/aravalli-kurtas-jaipur-secret"
  }
}

const heroBg = "/products/hero_banner_1.jpg";

const features = [
  {
    icon: Award,
    title: "Crafted with Purpose",
    description: "Each Aravalli Kurta is born out of a deep respect for Indian craftsmanship. From the fine cotton we source from Rajasthan to the delicate embroidery curated in-house – we don&apos;t just manufacture, we preserve tradition.",
    points: [
      "100% locally sourced fabrics",
      "In-house design and pattern-making",
      "Hand-finished touches on premium lines"
    ]
  },
  {
    icon: Users,
    title: "Boutique-Ready Designs",
    description: "Retailers across India partner with us because we understand trends. Our team keeps a close eye on runway ethnic styles and street fashion to design kurtas that are ready to fly off boutique shelves.",
    points: [
      "Ready-to-sell catalogues updated monthly",
      "Custom branding and labeling options available",
      "Exclusive designs for bulk buyers"
    ]
  },
  {
    icon: Star,
    title: "Low MOQ, High Margin",
    description: "As a kurti manufacturer in Jaipur that works closely with startups and boutique owners, we ensure our pricing model supports you.",
    points: [
      "Start with low Minimum Order Quantities",
      "Unlock wholesale rates as you scale",
      "Easy reorder process via WhatsApp"
    ]
  },
  {
    icon: Truck,
    title: "Pan-India Delivery & Reliability",
    description: "From Sitapura to Siliguri, our logistics team ensures your kurtas reach you on time, every time. With dispatches happening daily, you never have to wait.",
    points: [
      "Bulk dispatches within 48 hours",
      "Easy tracking & dedicated support",
      "WhatsApp-first order flow for convenience"
    ]
  }
]

const stats = [
  { icon: Users, label: "500+ Happy Clients" },
  { icon: BadgeCheck, label: "100% In-House Production" },
  { icon: Truck, label: "Pan-India Delivery" },
  { icon: Clock, label: "Fast Turnaround" }
]

// const testimonials = [
//   {
//     quote: "We&apos;ve worked with many suppliers in Jaipur, but Aravalli Kurtas stand out – both in build quality and support.",
//     author: "Khushi Boutique",
//     location: "Mumbai"
//   },
//   {
//     quote: "My customers ask specifically for &ldquo;those Aravalli pieces&rdquo; now!",
//     author: "Alaya Fashion",
//     location: "Bengaluru"
//   }
// ]

export default function AravalliKurtasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <Image
          src={heroBg}
          alt="Aravalli Kurtas Hero"
          fill
          priority
          className="object-cover w-full h-full absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-[#000]/70 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-4 py-24">
          <Badge variant="secondary" className="bg-[#D9A8A0] text-[#2E1B1B] hover:bg-[#C08478] mb-6">
            <Star className="w-4 h-4 mr-2" />
            Jaipur&apos;s Premium Ethnic Wear
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
            Why Aravalli Kurtas Are <span className="text-[#D9A8A0]">Jaipur&apos;s Best Kept Secret</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl">What Every Boutique Owner Must Know</p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl">
            Jaipur has long been the heart of ethnic wear in India. Among its vibrant streets, age-old textile traditions and innovative fashion intersect. But there&apos;s one name that quietly leads the charge – Aravalli Kurtas by Ethnics by Aravalli.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I&apos;m interested in Aravalli Kurtas. Please share your latest kurta catalogue.`}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Phone className="w-5 h-5 mr-2" />
                Get Kurta Catalogue
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Contact for Quote
              </Button>
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2E1B1B] mb-4">
              The <span className="text-[#D9A8A0]">Aravalli Difference</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you&apos;re a boutique owner, a fashion buyer, or simply someone who appreciates timeless elegance, discover why Aravalli Kurtas are not just products – but a statement.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#F9F6F4] rounded-full flex items-center justify-center mr-4">
                      <feature.icon className="w-6 h-6 text-[#D9A8A0]" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-[#2E1B1B]">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-lg text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-[#D9A8A0] mr-3 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Hear it from{" "}
              <span className="text-amber-600">Retailers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what boutique owners across India have to say.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="flex items-start mb-4">
                    <Star className="w-5 h-5 text-amber-500 mr-1" />
                    <Star className="w-5 h-5 text-amber-500 mr-1" />
                    <Star className="w-5 h-5 text-amber-500 mr-1" />
                    <Star className="w-5 h-5 text-amber-500 mr-1" />
                    <Star className="w-5 h-5 text-amber-500 mr-1" />
                  </div>
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Discover the{" "}
            <span className="text-yellow-300">Aravalli Difference</span>?
          </h2>
          <p className="text-xl text-amber-100 mb-8 leading-relaxed">
            If you&apos;re still searching &ldquo;best kurti manufacturer in Jaipur&rdquo;, you&apos;re probably not alone. 
            But the smart ones? They already discovered the Aravalli difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=Hi, I&apos;m interested in Aravalli Kurtas. Please share your latest kurta catalogue and pricing.`}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Phone className="w-5 h-5 mr-2" />
                Get Kurta Catalogue Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
                <Mail className="w-5 h-5 mr-2" />
                Contact for Quote
              </Button>
            </Link>
          </div>
          <p className="text-amber-100 mt-6 text-sm">
            📞 {siteConfig.phone} | 📍 {siteConfig.address} | ⏰ Mon-Sat: 9 AM - 7 PM
          </p>
        </div>
      </section>
    </div>
  )
} 