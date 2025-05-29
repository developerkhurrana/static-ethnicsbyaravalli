import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { siteConfig } from "@/lib/constants"

// This would typically come from a CMS or API
const collections = [
  {
    id: 1,
    name: "Bridal Lehengas",
    description: "Exquisite bridal wear collection with intricate embroidery",
    image: "/collections/bridal-lehenga.jpg",
    price: "₹15,000 onwards",
  },
  {
    id: 2,
    name: "Designer Sarees",
    description: "Contemporary sarees with traditional craftsmanship",
    image: "/collections/designer-saree.jpg",
    price: "₹8,000 onwards",
  },
  {
    id: 3,
    name: "Party Wear",
    description: "Stunning party wear for special occasions",
    image: "/collections/party-wear.jpg",
    price: "₹5,000 onwards",
  },
  {
    id: 4,
    name: "Casual Ethnic",
    description: "Comfortable and stylish daily wear collection",
    image: "/collections/casual-ethnic.jpg",
    price: "₹2,000 onwards",
  },
  {
    id: 5,
    name: "Indo-Western",
    description: "Modern fusion wear for the contemporary woman",
    image: "/collections/indo-western.jpg",
    price: "₹4,000 onwards",
  },
  {
    id: 6,
    name: "Festive Collection",
    description: "Traditional wear for festivals and celebrations",
    image: "/collections/festive.jpg",
    price: "₹6,000 onwards",
  },
]

export const metadata = {
  title: "Collections",
  description: "Explore our premium ethnic wear collections for boutiques and retailers.",
}

export default function CollectionsPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(
    /[^0-9]/g,
    ""
  )}`

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-12">
      <div className="container max-w-7xl flex-1 flex flex-col">
        <SectionHeader
          title="Our Collections"
          description="Explore our premium ethnic wear collections for boutiques and retailers."
          className="mb-12"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative overflow-hidden rounded-lg border bg-background"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={600}
                  height={450}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {collection.name}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium">
                  {collection.name}
                </h3>
                <p className="mb-4 text-muted-foreground">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{collection.price}</p>
                  <a
                    href={`${whatsappUrl}?text=Hi, I'm interested in your ${collection.name} collection.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Enquire Now
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 