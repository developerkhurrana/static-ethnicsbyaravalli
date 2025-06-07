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
    image: "https://ekohum.com/cdn/shop/files/DSC_0596.jpg?v=1717780319",
  },
  {
    title: "Innovation",
    description:
      "We constantly innovate in design and manufacturing to bring you the latest trends in ethnic wear.",
    image: "https://ekohum.com/cdn/shop/files/DSC_0651.jpg?v=1717780319",
  },
  {
    title: "Commitment",
    description:
      "We are committed to sustainable practices in our manufacturing process and business operations.",
    image: "https://ekohum.com/cdn/shop/files/DS5853_2.jpg?v=1741256083",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-12">
      <div className="container max-w-7xl flex-1 flex flex-col">
        <SectionHeader
          title="About Us"
          description="Learn about our journey in creating premium ethnic wear for boutiques and retailers."
          className="mb-12"
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
            <h2 className="mb-4 font-serif text-2xl font-bold">
              Our Story
            </h2>
            <p className="mb-6 text-muted-foreground">
              Founded with a passion for traditional craftsmanship and modern design,
              we have been at the forefront of ethnic wear manufacturing for over a
              decade. Our journey began with a simple mission: to create
              high-quality ethnic wear that celebrates Indian heritage while
              meeting contemporary fashion needs.
            </p>
            <p className="mb-8 text-muted-foreground">
              Today, we are proud to be trusted partners for boutiques and
              retailers across the country, providing them with premium quality
              ethnic wear that their customers love.
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
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-serif text-xl font-medium">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 