import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Gift, Users, Star, Calendar, ArrowRight } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export const metadata: Metadata = {
  title: "Festive Wear Collection 2025 | Women, Men, Kurta Sets, Suits, Sarees | Ethnics by Aravalli",
  description: "Explore the latest festive wear for women and men. Shop kurta sets, suits, sarees, and kurtis for Diwali, Navratri, and all celebrations. Premium festive ethnic wear manufacturer in Jaipur.",
  keywords: [
    "festive wear",
    "festive wear for women",
    "festive wear for men",
    "festive wear kurta sets",
    "festive wear suits for women",
    "festive wear sarees",
    "festive wear kurtis",
    "festive wear kurta for women",
    "festive ethnic wear",
    "Diwali festive wear",
    "Navratri festive wear",
    "wholesale festive wear",
    "festive collection 2025"
  ].join(', '),
  openGraph: {
    title: "Festive Wear Collection 2025 | Women, Men, Kurta Sets, Suits, Sarees | Ethnics by Aravalli",
    description: "Explore the latest festive wear for women and men. Shop kurta sets, suits, sarees, and kurtis for Diwali, Navratri, and all celebrations.",
    type: "website",
    locale: "en_IN",
    url: "https://ethnicsbyaravalli.com/festive-wear",
    siteName: "Ethnics by Aravalli",
    images: [
      {
        url: "https://ethnicsbyaravalli.com/products/hero_banner_1.jpg",
        width: 1200,
        height: 630,
        alt: "Festive Wear Collection 2025 - Ethnics by Aravalli",
      },
    ],
  },
  alternates: {
    canonical: "https://ethnicsbyaravalli.com/festive-wear"
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

const festiveCategories = [
  {
    name: "Kurtas",
    description: "Our premium kurtas blend traditional craftsmanship with contemporary aesthetics, thoughtfully crafted using fine fabrics like cotton, linen, modal, muslin, chanderi and more. The result is apparel that offers effortless elegance, breathable comfort, and lasting appeal for the discerning customers of fashion retailers.",
    image: "/products/kurta_1.png",
    link: "/contact",
    cta: "Inquire for Kurtas"
  },
  {
    name: "Kurta Sets",
    description: "Our Kurta sets are elegant two-piece ethnic ensembles for women, thoughtfully paired with vibrant colours and stylish prints. Each set features a kurta top matched with coordinated bottoms, offering a variety of styles including pants, palazzos, shararas, and more.",
    image: "/products/kurta_2.png",
    link: "/contact",
    cta: "Inquire for Kurta Sets"
  },
  {
    name: "Suit Sets",
    description: "Our timeless ethnic suit sets are crafted from premium materials and tailored with elegant cuts, offering a blend of comfort and sophistication. Each kurta set comes paired with a matching bottom and dupatta, making it an ideal choice for festive celebrations, professional settings, and boutique showcases alike.",
    image: "/products/kurta_3.png",
    link: "/contact",
    cta: "Inquire for Suit Sets"
  },
  {
    name: "Dresses",
    description: "Shop owners, elevate your collections with our stylish ethnic dresses that blend timeless silhouettes and contemporary design. Handcrafted with precision, each piece radiates sophistication while being tailored for the ease of everyday wear—perfect for discerning customers who value both tradition and trend.",
    image: "/products/kurta_4.png",
    link: "/contact",
    cta: "Inquire for Dresses"
  },
  {
    name: "Kaftans",
    description: "Breezy and elegant, our kaftans are designed for those who cherish comfort without compromising on style. Featuring airy fabrics, intricate embroidery, and captivating prints, they're the perfect expression of effortless ethnic fusion—ideal for the customers of retailers who like everything from laid-back lounging to graceful gatherings.",
    image: "/products/kurta_5.png",
    link: "/contact",
    cta: "Inquire for Kaftans"
  },
  {
    name: "Anarkali Kurtas",
    description: "Step into timeless elegance with our Anarkali Kurtas—celebrated for their graceful layers, royal silhouette, and exquisite artisanal detailing. Each piece captures the essence of Indian heritage while embracing a refined, contemporary flair, making it a perfect choice for occasions that call for grandeur with ease.",
    image: "/products/dupatta_1.png",
    link: "/contact",
    cta: "Inquire for Anarkalis"
  }
]

const festiveHighlights = [
  {
    icon: Sparkles,
    title: "Vibrant Festive Colors",
    description: "Celebrate with a palette of rich, festive hues and traditional motifs."
  },
  {
    icon: Gift,
    title: "Gift-Ready Packaging",
    description: "Beautiful packaging, perfect for gifting during the festive season."
  },
  {
    icon: Calendar,
    title: "Seasonal Collections",
    description: "New styles launched for every major festival and celebration."
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Handcrafted with attention to detail using the finest materials."
  }
]

export default function FestiveWearPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-orange-200 via-red-100 to-yellow-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-orange-100/60" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 text-center px-4 py-24 max-w-6xl mx-auto">
          <Badge className="mb-6 bg-orange-200 text-orange-900 hover:bg-orange-300 border border-orange-300">
            <Sparkles className="w-4 h-4 mr-2" />
            Festive Wear 2025
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-orange-900 mb-6 leading-tight drop-shadow-lg">
            Festive Wear Collection{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              2025
            </span>
          </h1>
          
                      <p className="text-xl md:text-2xl text-orange-800 mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover the latest festive wear for women. Shop premium kurta sets, suits, sarees, and kurtis for Diwali, Navratri, and all celebrations.
              <span className="font-semibold text-orange-900"> Wholesale prices for boutiques and retailers.</span>
            </p>
          
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-1">20+</div>
              <div className="text-sm text-orange-700">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-1">100+</div>
              <div className="text-sm text-orange-700">Festive Styles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-1">24/7</div>
              <div className="text-sm text-orange-700">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3">
              <Link href="/contact">Get Festive Catalog</Link>
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
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-orange-700">
            <div className="flex items-center">
              <Gift className="w-4 h-4 text-orange-500 mr-2" />
              Gift-Ready Packaging
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-red-500 mr-2" />
              Seasonal Collections
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              Premium Quality
            </div>
          </div>
        </div>
      </section>

      {/* Festive Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-900">
              Explore Our Festive Wear Categories
            </h2>
            <p className="text-lg text-orange-700 max-w-3xl mx-auto">
              Shop the best festive wear for every celebration. Premium quality, vibrant colors, and modern designs for women.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {festiveCategories.map((category, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 border-orange-200 h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg flex-shrink-0 aspect-[4/5]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-400/60 to-transparent" />
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

      {/* Festive Highlights */}
      <section className="py-16 md:py-24 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-900">
              Why Choose Our Festive Wear?
            </h2>
            <p className="text-lg text-orange-700 max-w-3xl mx-auto">
              Experience the best of festive fashion with Ethnics by Aravalli. Quality, style, and tradition in every piece.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {festiveHighlights.map((highlight, idx) => (
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

      {/* SEO-Optimized Summary Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Premium Festive Wear Manufacturer in Jaipur - Your Trusted Partner for Celebrations
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to <strong>Ethnics by Aravalli</strong>, your premier festive wear manufacturer in Jaipur specializing in wholesale ethnic wear for all celebrations. We are dedicated to crafting exceptional festive wear that combines traditional Indian aesthetics with contemporary comfort, offering boutique owners and retailers across India access to premium quality festive ethnic wear at competitive wholesale prices.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our extensive collection of festive wear for women encompasses everything from elegant kurta sets and designer suits to traditional sarees and trendy kurtis. Each festive piece in our collection is meticulously crafted using premium fabrics including pure cotton, silk, georgette, and other natural materials that ensure breathability, comfort, and durability. As a leading festive wear manufacturer in Jaipur, we understand the diverse needs of modern celebrations and create designs that celebrate both tradition and contemporary fashion trends.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether you're a boutique owner looking to stock the latest festive wear trends for Diwali, Navratri, or wedding season, a retailer seeking reliable wholesale festive wear suppliers, or a fashion entrepreneur wanting to partner with a trusted festive wear manufacturer in India, our comprehensive range of women's festive ethnic wear caters to every business requirement. Our festive collection is perfect for various occasions including Diwali celebrations, Navratri festivities, wedding ceremonies, family gatherings, and special celebrations, making them ideal for retailers serving women's ethnic wear customers.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              As a professional festive wear manufacturer, we prioritize quality control at every stage of production. From fabric selection and pattern making to cutting, stitching, and final finishing, each festive garment undergoes rigorous quality checks to ensure it meets our high standards. Our commitment to excellence has made us one of the most trusted festive wear manufacturers in Jaipur, serving clients across India with reliable wholesale festive wear supply and timely delivery services.
            </p>

            <div className="bg-orange-50 p-6 rounded-lg my-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Explore Our Comprehensive Collection of Festive Wear
              </h3>
              <p className="text-gray-700 mb-4">
                Our wholesale festive wear catalog includes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Festive Wear for Women
                </li>
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Festive Wear for Men
                </li>
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Designer Kurta Sets
                </li>
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Premium Suits for Women
                </li>
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Traditional Sarees
                </li>
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Trendy Kurtis
                </li>
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Diwali Collection
                </li>
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                  Navratri Special
                </li>
              </ul>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Shopping for wholesale festive wear online has never been easier. Our user-friendly catalog system allows retailers and boutique owners to browse our extensive festive collection, select their preferred styles, and place bulk orders with just a few clicks. We understand the importance of seasonal planning and strive to provide a hassle-free wholesale shopping experience with detailed product information, size charts, and competitive pricing for all festive occasions.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our commitment to sustainable and ethical fashion practices sets us apart as a responsible festive wear manufacturer. We work closely with trusted fabric suppliers who share our values, ensuring that all materials used in our festive wear are responsibly sourced and of the highest quality. By choosing Ethnics by Aravalli as your festive wear manufacturer, you're supporting ethical manufacturing practices while offering your customers premium quality festive ethnic wear for all celebrations.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Experience the perfect blend of tradition and modernity with our exclusive collection of festive wear for women. Whether you're looking for vibrant Diwali wear, elegant Navratri dresses, or comfortable wedding season outfits, our wholesale festive wear collection has something for every occasion and customer preference. Partner with us, the leading festive wear manufacturer in Jaipur, and elevate your retail business with premium quality women's festive ethnic wear that your customers will love for every celebration.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Celebrate in Style?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get your hands on our exclusive festive wear collection. Perfect for boutiques, retailers, and wholesalers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Request Festive Catalog</Link>
            </Button>
            <Button asChild size="lg" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white border-none shadow-md">
              <Link href="https://wa.me/919828422208">
                <FaWhatsapp className="w-5 h-5" /> WhatsApp Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 