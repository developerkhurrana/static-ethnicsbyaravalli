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
    image: "https://byshree.com/cdn/shop/articles/The-Rise-of-Sustainable-and-Ethical-Ethnic-Fashion.png?v=1695105858&width=2048",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Sustainability",
  },
  {
    id: 2,
    slug: "eco-friendly-dyes",
    title: "Revolutionizing Ethnic Wear with Natural Dyes",
    excerpt:
      "Explore how traditional natural dyeing techniques are making a comeback in contemporary ethnic wear.",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "March 12, 2024",
    readTime: "6 min read",
    category: "Sustainability",
  },
  {
    id: 3,
    slug: "summer-trends-2024",
    title: "Top Ethnic Wear Trends for Summer 2024",
    excerpt:
      "Stay ahead of the curve with our curated list of the hottest ethnic wear trends that will dominate this summer.",
    image: "https://www.ethnicplus.in/media/magefan_blog/ezgif-4-164a313f07.webp",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Trends",
  },
  {
    id: 4,
    slug: "festival-collection",
    title: "Festival Season Ethnic Wear Guide 2024",
    excerpt:
      "Discover the perfect ethnic ensembles for the upcoming festival season, combining traditional elements with contemporary style.",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "March 8, 2024",
    readTime: "5 min read",
    category: "Trends",
  },
  {
    id: 5,
    slug: "modern-traditional-styling",
    title: "How to Style Traditional Wear for Modern Occasions",
    excerpt:
      "Learn the art of blending traditional ethnic wear with contemporary styling for today's fashion-forward customers.",
    image: "https://c.ndtvimg.com/2024-10/g3sh1kr8_cakes_625x300_18_October_24.jpg",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Styling",
  },
  {
    id: 6,
    slug: "office-ethnic-wear",
    title: "Professional Ethnic Wear for the Modern Workplace",
    excerpt:
      "Discover how to incorporate ethnic wear into your professional wardrobe while maintaining a polished and contemporary look.",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "March 3, 2024",
    readTime: "5 min read",
    category: "Styling",
  },
  {
    id: 7,
    slug: "hand-embroidery-art",
    title: "The Art of Hand Embroidery in Ethnic Wear",
    excerpt:
      "Explore the rich heritage of hand embroidery techniques that make ethnic wear truly special and unique.",
    image: "https://media.istockphoto.com/id/1193642393/photo/female-needlework-on-fabric-material-close-up-view-unidentified-tribal-women-sewing-ethnic.jpg?s=612x612&w=0&k=20&c=lwQ5wV5wzrnbqdoi-KciE9ec55LQD3wUvtWAc5lNJ-w=",
    date: "February 28, 2024",
    readTime: "7 min read",
    category: "Craftsmanship",
  },
  {
    id: 8,
    slug: "block-printing",
    title: "The Revival of Traditional Block Printing",
    excerpt:
      "Explore the ancient art of block printing and its modern applications in contemporary ethnic wear.",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "February 25, 2024",
    readTime: "6 min read",
    category: "Craftsmanship",
  },
  {
    id: 9,
    slug: "successful-ethnic-boutique",
    title: "Building a Successful Ethnic Wear Boutique",
    excerpt:
      "Essential tips and strategies for retailers to create a thriving ethnic wear business in today's market.",
    image: "https://i.pinimg.com/736x/4c/19/e7/4c19e7132f4b4bdf2c1106ea8c44b53a.jpg",
    date: "February 20, 2024",
    readTime: "8 min read",
    category: "Business",
  },
  {
    id: 10,
    slug: "online-ethnic-retail",
    title: "The Future of Ethnic Wear E-commerce",
    excerpt:
      "Explore the evolving landscape of online ethnic wear retail and discover strategies for success in the digital marketplace.",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "February 18, 2024",
    readTime: "7 min read",
    category: "Business",
  },
  {
    id: 11,
    slug: "modern-bridal-wear",
    title: "The Evolution of Bridal Wear in Modern India",
    excerpt:
      "How contemporary bridal wear is adapting to modern preferences while maintaining traditional essence.",
    image: "https://cdn.shopify.com/s/files/1/2196/3271/files/Evolution_of_Indian_wedding_fashion_1024x1024.png?v=1680083169",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Bridal",
  },
  {
    id: 12,
    slug: "wedding-season-guide",
    title: "Complete Wedding Season Style Guide 2024",
    excerpt:
      "Your comprehensive guide to wedding season fashion, from engagement ceremonies to reception parties.",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "February 12, 2024",
    readTime: "8 min read",
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
              <div className="relative w-full h-[300px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  priority={post.id === 1}
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