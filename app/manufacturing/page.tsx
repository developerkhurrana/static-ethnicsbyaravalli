import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata = {
  title: "Manufacturing Excellence | Premium Ethnic Wear Manufacturer in Jaipur",
  description:
    "Explore our state-of-the-art manufacturing facilities, where traditional craftsmanship meets modern technology to create premium ethnic wear for boutiques and retailers.",
};

const capabilities = [
  "In-house conceptualisation and designing of women's ethnic wear, inspired by the latest trends and tailored for both everyday wearability and occasion-specific creations",
  "Garment embellishment featuring intricate traditional embroideries that showcase timeless artistry and cultural richness",
  "Graded patterns tailored to ensure a perfect fit and offer ready-made size options based on precise body measurements",
  "Advanced cutting and stitching units delivering premium craftsmanship with unwavering adherence to precise dimensions for consistently flawless garments",
  "Robust bulk production capacity designed to efficiently meet the growing demands of garment retailers with consistency and speed",
  "Strict quality control processes in place to ensure flawless ethnic fashion that upholds premium quality, precision, and consistency in every garment"
]


const facilities = [
  {
    title: "Pattern Making & Fabric Cutting",
    image: "https://res.cloudinary.com/dfye0gag9/image/upload/about_banner_1_q6jmud.jpg",
    description:
      "Dedicated infrastructure and skilled teams drive excellence through precise pattern making, focused fabric layering with integrated quality checks, and precision cutting—all contributing to impeccable garment outcomes.",
  },
  {
    title: "Stitching",
    image: "https://res.cloudinary.com/dfye0gag9/image/upload/IMG_3287_pfjlim.jpg",
    description:
      "Organised stitching unit equipped with top-tier infrastructure, efficient floor management, clear sizing instructions, real-time on-floor stitching quality checks, and a well-balanced workflow to ensure timely and flawless production.",
  },
  {
    title: "Hand Embroideries & Quality Control",
    image: "https://lh3.googleusercontent.com/p/AF1QipOSQ4UdNWJkeTGUSVvojWo3iB9ZBTX2vRS90zSd=s680-w680-h510-rw",
    description:
      "Skilled teams dedicated to intricate hand embroideries, detailed handwork, accurate measurement checks, meticulous thread cutting, and comprehensive final quality inspections to ensure excellence in every finished garment.",
  },
  {
    title: "Pressing, Packaging & Dispatch",
    image: "https://res.cloudinary.com/dfye0gag9/image/upload/f19f9eee-18ec-4459-bf88-132a2e1f2983.png",
    description:
      "Post-production units ensure high-quality garment pressing and secure packaging with dependable materials, safeguarding products during transit and enabling timely, reliable delivery through professional transport services.",
  },
];


export default function ManufacturingPage() {

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        title="Manufacturing Excellence"
        description="Ethnics By Aravalli exemplifies manufacturing excellence in women’s ethnic wear by seamlessly blending age-old craftsmanship with cutting-edge technology. Its state-of-the-art manufacturing facilities are designed to celebrate the essence of tradition while ensuring precision and consistency through modern methods. Every garment is a testament to meticulous attention—from innovative styling and refined cuts to expert stitching, exquisite embroideries, and delicate handwork. The brand doesn’t just stop at creation; it holds steadfast commitment to quality checks, elegant packaging, and timely dispatch. Ethnics By Aravalli stands as a trusted partner for retailers, fashion outlets, and boutiques, consistently honoring its promises and timelines with unwavering dedication."
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
            <Link href="/contact">
              <Button className="bg-[#D9A8A0] hover:bg-[#C08478] text-white border-0 rounded-full">
Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full aspect-video max-w-xl rounded-lg overflow-hidden shadow-lg border-2 border-white/20">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/_yLxnjdZf84"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full min-h-[220px]"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-8 text-center font-serif text-2xl font-semibold">
        Value Chains 
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