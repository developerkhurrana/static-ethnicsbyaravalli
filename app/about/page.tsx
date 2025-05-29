import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata = {
  title: "About Us",
  description: "Learn about our journey in creating premium ethnic wear for boutiques and retailers.",
}

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface TeamMember {
  name: string
  role: string
  image: string
}

interface Achievement {
  title: string
  description: string
  icon: React.ReactNode
}

const values = [
  {
    title: "Quality First",
    description:
      "We never compromise on the quality of our products, ensuring the finest materials and craftsmanship.",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description:
      "We constantly innovate in design and manufacturing to bring you the latest trends in ethnic wear.",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
      </svg>
    ),
  },
  {
    title: "Sustainability",
    description:
      "We are committed to sustainable practices in our manufacturing process and business operations.",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
      </svg>
    ),
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
              src="/images/about.jpg"
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
            <Button size="lg" asChild>
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
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 