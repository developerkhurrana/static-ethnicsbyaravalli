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
  "In-house design and pattern making for ethnic wear collections",
  "Advanced cutting and stitching units ensuring premium craftsmanship",
  "Hand embroidery and machine embroidery blending tradition with innovation",
  "Strict quality control processes for flawless ethnic fashion",
  "Custom packaging and labeling services tailored for boutiques",
  "Exclusive custom design development for retailers",
  "Bulk production capacity to meet growing boutique demands",
  "Fast sampling and prototyping for quick product development",
];

const facilities = [
  {
    title: "Pattern Making",
    image: "https://res.cloudinary.com/dfye0gag9/image/upload/about_banner_1_q6jmud.jpg",
    description:
      "Our design studio combines creativity and technology, allowing expert designers to craft unique ethnic wear collections ready for the market.",
  },
  {
    title: "Cutting & Stitching",
    image: "https://res.cloudinary.com/dfye0gag9/image/upload/IMG_3287_pfjlim.jpg",
    description:
      "High-tech machinery and skilled artisans work together to manufacture premium ethnic wear with precision and attention to detail.",
  },
  {
    title: "Quality Control",
    image: "https://lh3.googleusercontent.com/p/AF1QipOSQ4UdNWJkeTGUSVvojWo3iB9ZBTX2vRS90zSd=s680-w680-h510-rw",
    description:
      "Our dedicated embroidery unit features both traditional hand embroidery artisans and modern machine embroidery techniques, ensuring intricate detailing.",
  },
  {
    title: "Packaging & Dispatch",
    image: "https://res.cloudinary.com/dfye0gag9/image/upload/f19f9eee-18ec-4459-bf88-132a2e1f2983.png",
    description:
      "Stringent quality control measures are in place at every stage to guarantee superior craftsmanship and consistency before shipping.",
  },
];


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