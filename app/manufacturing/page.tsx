import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata = {
  title: "Manufacturing",
  description:
    "Discover our state-of-the-art manufacturing facilities and capabilities.",
}

const capabilities = [
  "In-house design and pattern making",
  "Advanced cutting and stitching units",
  "Hand embroidery and machine embroidery",
  "Quality control at every stage",
  "Packaging and labeling services",
  "Custom design development",
  "Bulk production capacity",
  "Fast sampling and prototyping",
]

const facilities = [
  {
    title: "Design Studio",
    image: "/manufacturing/design-studio.jpg",
    description:
      "Our design studio is equipped with the latest technology and staffed by experienced designers who create unique, market-ready designs.",
  },
  {
    title: "Production Unit",
    image: "/manufacturing/production.jpg",
    description:
      "State-of-the-art machinery and skilled workers ensure high-quality production with attention to detail.",
  },
  {
    title: "Embroidery Section",
    image: "/manufacturing/embroidery.jpg",
    description:
      "Dedicated embroidery section with both traditional hand embroidery artisans and modern machine embroidery units.",
  },
  {
    title: "Quality Control",
    image: "/manufacturing/quality-control.jpg",
    description:
      "Rigorous quality control processes ensure every piece meets our high standards before shipping.",
  },
]

export default function ManufacturingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        title="Manufacturing Excellence"
        description="Our state-of-the-art manufacturing facilities combine traditional craftsmanship with modern technology."
        className="mb-12"
      />

      <div className="mb-16 grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="mb-6 font-serif text-2xl font-semibold">
            Manufacturing Capabilities
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div
                key={capability}
                className="flex items-center gap-2 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{capability}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/become-retailer">
              <Button>
                Partner with Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="/manufacturing/overview.jpg"
            alt="Manufacturing facility overview"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-8 text-center font-serif text-2xl font-semibold">
          Our Facilities
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {facilities.map((facility) => (
            <div
              key={facility.title}
              className="group overflow-hidden rounded-lg border bg-card"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  width={600}
                  height={400}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-serif text-xl font-medium">
                  {facility.title}
                </h3>
                <p className="text-muted-foreground">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 