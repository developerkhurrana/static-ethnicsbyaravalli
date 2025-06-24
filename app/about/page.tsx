import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata = {
  title: "About Us",
  description: "Learn about our journey in creating premium ethnic wear for boutiques and retailers.",
}

const values = [
  {
    title: "Quality First",
    description:
      "We never compromise on the quality of our products, ensuring the finest materials and craftsmanship.",
    image: "https://lh3.googleusercontent.com/p/AF1QipOSQ4UdNWJkeTGUSVvojWo3iB9ZBTX2vRS90zSd=s680-w680-h510-rw",
  },
  {
    title: "Innovation",
    description:
      "We constantly innovate in design and manufacturing to bring you the latest trends in ethnic wear.",
    image: "https://res.cloudinary.com/dfye0gag9/image/upload/about_banner_1_q6jmud.jpg",
  },
  {
    title: "Commitment",
    description:
      "We are committed to sustainable practices in our manufacturing process and business operations.",
    image: "https://res.cloudinary.com/dfye0gag9/image/upload/IMG_3287_pfjlim.jpg",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-12">
      <div className="container max-w-7xl flex-1 flex flex-col">
        <SectionHeader
          title="About Us"
          description="Our journey began with a passion for preserving India’s rich textile traditions while reimagining ethnic wear for the contemporary woman. With a focus on craftsmanship, premium fabrics, and sophisticated design, we’ve spent years perfecting each silhouette to suit the evolving tastes of boutique shoppers and modern retailers. Every piece we create reflects a balance of cultural heritage and timeless elegance—crafted not just to be worn, but to be remembered."
          className="mb-12 [&>p]:text-justify"
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="https://lh3.googleusercontent.com/p/AF1QipMN1X472LIyKs9ShMxiTxWWwyFKPRlpygxcfe7Q=w744-h558-p-k-no"
              alt="Our manufacturing facility"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 font-serif text-2xl font-bold text-center lg:text-left">
              Our Story
            </h2>
            <p className="mb-6 text-muted-foreground text-center lg:text-left">
            Founded with a passion for traditional craftsmanship and contemporary design, we have emerged as a leading force in women’s ethnic wear manufacturing in Jaipur. Our journey began with a clear mission: to create premium ethnic wear that celebrates India’s cultural richness while meeting the evolving style needs of customers across boutiques, fashion retailers, multi-location branded stores, and independent outlets.
            </p>
            <p className="mb-8 text-muted-foreground text-center lg:text-left">
            At the heart of our process lies a deep dedication to quality and detail—from initial design conceptualization and precise pattern making to expert stitching and stringent quality checks. Every piece is thoughtfully crafted to reflect elegance and comfort. What truly sets us apart is our unwavering commitment to timelines and the promises we make to our retail partners, ensuring dependable service and consistent excellence.

            </p>
            <Button size="lg" asChild className="bg-[#D9A8A0] hover:bg-[#C08478] text-white border-0">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-12 text-center font-serif text-2xl font-bold">
            Our Values
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
              key={value.title}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group"
            >
              <Image
                src={value.image}
                alt={value.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="mb-2 font-serif text-xl font-medium text-white">
                  {value.title}
                </h3>
                <p className="text-white/90">{value.description}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 