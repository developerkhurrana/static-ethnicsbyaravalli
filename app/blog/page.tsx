import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata = {
  title: "Blog",
  description: "Latest trends, insights, and updates from the world of ethnic wear.",
}

const blogPosts = [
  {
    id: 1,
    slug: "sustainable-ethnic-fashion",
    title: "The Rise of Sustainable Ethnic Fashion",
    excerpt:
      "Discover how sustainable practices are transforming the ethnic wear industry and why it matters for your boutique.",
    image: "/blog/sustainable-fashion.jpg",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Sustainability",
  },
  {
    id: 2,
    slug: "summer-trends-2024",
    title: "Top Ethnic Wear Trends for Summer 2024",
    excerpt:
      "Stay ahead of the curve with our curated list of the hottest ethnic wear trends that will dominate this summer.",
    image: "/blog/summer-trends.jpg",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Trends",
  },
  {
    id: 3,
    slug: "modern-traditional-styling",
    title: "How to Style Traditional Wear for Modern Occasions",
    excerpt:
      "Learn the art of blending traditional ethnic wear with contemporary styling for today's fashion-forward customers.",
    image: "/blog/modern-styling.jpg",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Styling",
  },
  {
    id: 4,
    slug: "hand-embroidery-art",
    title: "The Art of Hand Embroidery in Ethnic Wear",
    excerpt:
      "Explore the rich heritage of hand embroidery techniques that make ethnic wear truly special and unique.",
    image: "/blog/embroidery.jpg",
    date: "February 28, 2024",
    readTime: "7 min read",
    category: "Craftsmanship",
  },
  {
    id: 5,
    slug: "successful-ethnic-boutique",
    title: "Building a Successful Ethnic Wear Boutique",
    excerpt:
      "Essential tips and strategies for retailers to create a thriving ethnic wear business in today's market.",
    image: "/blog/boutique-success.jpg",
    date: "February 20, 2024",
    readTime: "8 min read",
    category: "Business",
  },
  {
    id: 6,
    slug: "modern-bridal-wear",
    title: "The Evolution of Bridal Wear in Modern India",
    excerpt:
      "How contemporary bridal wear is adapting to modern preferences while maintaining traditional essence.",
    image: "/blog/bridal-wear.jpg",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Bridal",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-12">
      <div className="container max-w-7xl flex-1 flex flex-col">
        <SectionHeader
          title="Our Blog"
          description="Stay updated with the latest trends, insights, and stories from the world of ethnic wear."
          className="mb-12"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-lg border bg-background"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={450}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium">
                  {post.title}
                </h3>
                <p className="mb-4 flex-1 text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {post.category}
                  </span>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
} 